import { Router } from 'express';
import pool from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const router = Router();

// All student routes require authentication + student role
router.use(authenticate, authorize('student'));

// ──────────────── DASHBOARD ────────────────
router.get('/dashboard', async (req, res) => {
  try {
    const studentId = req.user.id;

    const [enrolledCourses] = await pool.query('SELECT COUNT(*) as count FROM courseEnrollments WHERE studentId = ?', [studentId]);
    const [completedCourses] = await pool.query("SELECT COUNT(*) as count FROM courseEnrollments WHERE studentId = ? AND status = 'completed'", [studentId]);
    const [avgCompletion] = await pool.query('SELECT COALESCE(AVG(completionPercentage), 0) as avg FROM courseEnrollments WHERE studentId = ?', [studentId]);
    const [pendingAssignments] = await pool.query(`
      SELECT COUNT(*) as count FROM assignments a
      JOIN courses c ON a.courseId = c.id
      JOIN courseEnrollments ce ON ce.courseId = c.id
      WHERE ce.studentId = ? AND a.isPublished = 1
      AND a.id NOT IN (SELECT assignmentId FROM assignmentSubmissions WHERE studentId = ?)
    `, [studentId, studentId]);
    const [avgGrade] = await pool.query('SELECT COALESCE(AVG(percentage), 0) as avg FROM grades WHERE studentId = ?', [studentId]);

    // Current courses with progress
    const [currentCourses] = await pool.query(`
      SELECT c.title, c.category, c.image, ce.completionPercentage, ce.status, u.fullName as mentorName
      FROM courseEnrollments ce
      JOIN courses c ON ce.courseId = c.id
      JOIN users u ON c.mentorId = u.id
      WHERE ce.studentId = ?
      ORDER BY ce.enrolledAt DESC LIMIT 5
    `, [studentId]);

    // Upcoming assignments
    const [upcomingAssignments] = await pool.query(`
      SELECT a.id, a.title, a.dueDate, a.maxScore, c.title as courseTitle
      FROM assignments a
      JOIN courses c ON a.courseId = c.id
      JOIN courseEnrollments ce ON ce.courseId = c.id
      WHERE ce.studentId = ? AND a.isPublished = 1 AND a.dueDate > NOW()
      AND a.id NOT IN (SELECT assignmentId FROM assignmentSubmissions WHERE studentId = ?)
      ORDER BY a.dueDate ASC LIMIT 5
    `, [studentId, studentId]);

    // Upcoming events
    const [upcomingEvents] = await pool.query(`
      SELECT e.id, e.title, e.eventType, e.startDate, e.location, u.fullName as mentorName
      FROM events e
      JOIN users u ON e.mentorId = u.id
      WHERE e.isPublished = 1 AND e.startDate > NOW()
      ORDER BY e.startDate ASC LIMIT 5
    `, [studentId]);

    res.json({
      success: true,
      data: {
        stats: {
          enrolledCourses: enrolledCourses[0].count,
          completedCourses: completedCourses[0].count,
          avgCompletion: Math.round(avgCompletion[0].avg),
          pendingAssignments: pendingAssignments[0].count,
          avgGrade: Math.round(avgGrade[0].avg)
        },
        currentCourses,
        upcomingAssignments,
        upcomingEvents
      }
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── MY COURSES ────────────────
router.get('/courses', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT c.*, ce.completionPercentage, ce.status as enrollmentStatus, ce.enrolledAt, ce.id as enrollmentId,
        ce.completedTopics,
        u.fullName as mentorName,
        (SELECT COUNT(*) FROM courseEnrollments WHERE courseId = c.id) as totalStudents,
        (SELECT COUNT(*) FROM courseContent WHERE courseId = c.id AND status = 'active') as contentCount
      FROM courseEnrollments ce
      JOIN courses c ON ce.courseId = c.id
      JOIN users u ON c.mentorId = u.id
      WHERE ce.studentId = ?
      ORDER BY ce.enrolledAt DESC
    `, [req.user.id]);

    res.json({ success: true, data: { courses } });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Browse available courses
router.get('/courses/browse', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;

    let query = `
      SELECT c.*, u.fullName as mentorName,
        (SELECT COUNT(*) FROM courseEnrollments WHERE courseId = c.id) as totalStudents,
        (SELECT COUNT(*) FROM courseEnrollments WHERE courseId = c.id AND studentId = ?) as isEnrolled,
        (SELECT COUNT(*) FROM courseContent WHERE courseId = c.id AND status = 'active') as contentCount,
        (SELECT COUNT(*) FROM courseSubjects WHERE courseId = c.id) as subjectCount
      FROM courses c
      JOIN users u ON c.mentorId = u.id
      WHERE c.isPublished = 1 AND c.status = 'active'
    `;
    const params = [req.user.id];

    if (category) { query += ' AND c.category = ?'; params.push(category); }
    if (difficulty) { query += ' AND c.difficulty = ?'; params.push(difficulty); }
    if (search) { query += ' AND (c.title LIKE ? OR c.description LIKE ? OR c.courseCode LIKE ?)'; params.push(`%${search}%`, `%${search}%`, `%${search}%`); }

    query += ' ORDER BY c.createdAt DESC';
    const [courses] = await pool.query(query, params);

    res.json({ success: true, data: { courses } });
  } catch (error) {
    console.error('Browse courses error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Enroll in a course
router.post('/courses/:id/enroll', async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user.id;

    const [existing] = await pool.query(
      'SELECT id FROM courseEnrollments WHERE courseId = ? AND studentId = ?',
      [courseId, studentId]
    );

    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Already enrolled in this course.' });
    }

    const [course] = await pool.query('SELECT maxStudents FROM courses WHERE id = ? AND isPublished = 1 AND status = ?', [courseId, 'active']);
    if (course.length === 0) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    const [enrollCount] = await pool.query('SELECT COUNT(*) as count FROM courseEnrollments WHERE courseId = ?', [courseId]);
    if (enrollCount[0].count >= course[0].maxStudents) {
      return res.status(400).json({ success: false, message: 'Course is full.' });
    }

    await pool.query(
      "INSERT INTO courseEnrollments (courseId, studentId, completedTopics) VALUES (?, ?, '[]')",
      [courseId, studentId]
    );

    res.status(201).json({ success: true, message: 'Enrolled successfully!' });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Unenroll from a course
router.post('/courses/:id/unenroll', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM courseEnrollments WHERE courseId = ? AND studentId = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Not enrolled in this course.' });
    }
    res.json({ success: true, message: 'Unenrolled successfully.' });
  } catch (error) {
    console.error('Unenroll error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Course Viewer - Get course detail with content for enrolled student
router.get('/courses/:id/view', async (req, res) => {
  try {
    const [enrollment] = await pool.query(
      'SELECT * FROM courseEnrollments WHERE courseId = ? AND studentId = ?',
      [req.params.id, req.user.id]
    );

    if (enrollment.length === 0) {
      return res.status(403).json({ success: false, message: 'Not enrolled in this course.' });
    }

    const [courses] = await pool.query(`
      SELECT c.*, u.fullName as mentorName
      FROM courses c JOIN users u ON c.mentorId = u.id WHERE c.id = ?
    `, [req.params.id]);

    if (courses.length === 0) return res.status(404).json({ success: false, message: 'Course not found.' });

    const course = courses[0];
    course.enrollment = enrollment[0];

    // Parse completedTopics
    let completedTopics = [];
    try { completedTopics = JSON.parse(enrollment[0].completedTopics || '[]'); } catch { completedTopics = []; }
    course.enrollment.completedTopics = completedTopics;

    // Get subjects with topics
    const [subjects] = await pool.query(
      'SELECT * FROM courseSubjects WHERE courseId = ? ORDER BY sortOrder ASC, createdAt ASC',
      [req.params.id]
    );
    for (const sub of subjects) {
      const [topics] = await pool.query('SELECT * FROM courseTopics WHERE subjectId = ? ORDER BY sortOrder ASC', [sub.id]);
      sub.topics = topics;
    }
    course.subjects = subjects;

    // Get content
    const [content] = await pool.query(`
      SELECT cc.*, cs.title as subjectTitle
      FROM courseContent cc
      LEFT JOIN courseSubjects cs ON cc.subjectId = cs.id
      WHERE cc.courseId = ? AND cc.status = 'active'
      ORDER BY cc.sortOrder ASC, cc.createdAt ASC
    `, [req.params.id]);
    course.content = content;

    res.json({ success: true, data: { course } });
  } catch (error) {
    console.error('Course viewer error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Update progress - mark topics completed
router.put('/courses/:id/progress', async (req, res) => {
  try {
    // Accept both 'progress' and 'completionPercentage' for compatibility
    const { completedTopics, progress, completionPercentage } = req.body;
    const progressValue = progress !== undefined ? progress : completionPercentage;

    const updates = [];
    const params = [];

    if (completedTopics !== undefined) {
      updates.push('completedTopics = ?');
      params.push(JSON.stringify(completedTopics));
    }
    if (progressValue !== undefined) {
      updates.push('completionPercentage = ?');
      params.push(progressValue);
      if (progressValue >= 100) {
        updates.push("status = 'completed'", 'completedAt = NOW()');
      } else {
        updates.push("status = 'active'");
      }
    }

    if (updates.length === 0) return res.status(400).json({ success: false, message: 'No updates provided.' });

    params.push(req.params.id, req.user.id);
    await pool.query(
      `UPDATE courseEnrollments SET ${updates.join(', ')} WHERE courseId = ? AND studentId = ?`,
      params
    );

    // Return updated enrollment data
    const [enrollment] = await pool.query(
      'SELECT * FROM courseEnrollments WHERE courseId = ? AND studentId = ?',
      [req.params.id, req.user.id]
    );

    let enrollmentData = null;
    if (enrollment.length > 0) {
      enrollmentData = enrollment[0];
      try { enrollmentData.completedTopics = JSON.parse(enrollmentData.completedTopics || '[]'); } catch { enrollmentData.completedTopics = []; }
    }

    res.json({ success: true, message: 'Progress updated.', data: { enrollment: enrollmentData } });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── CERTIFICATE ────────────────
router.get('/certificate/:courseId', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT ce.completionPercentage, ce.status as enrollmentStatus, ce.completedAt, ce.enrolledAt,
        c.title as courseTitle, c.courseCode, c.category,
        u.fullName as studentName,
        m.fullName as mentorName
      FROM courseEnrollments ce
      JOIN courses c ON ce.courseId = c.id
      JOIN users u ON ce.studentId = u.id
      JOIN users m ON c.mentorId = m.id
      WHERE ce.courseId = ? AND ce.studentId = ?
    `, [req.params.courseId, req.user.id]);

    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Enrollment not found.' });
    const enrollment = rows[0];
    if (enrollment.enrollmentStatus !== 'completed' && enrollment.completionPercentage < 100) {
      return res.status(400).json({ success: false, message: 'Course not yet completed.' });
    }

    res.json({
      success: true,
      data: {
        studentName: enrollment.studentName,
        courseTitle: enrollment.courseTitle,
        courseCode: enrollment.courseCode,
        category: enrollment.category,
        mentorName: enrollment.mentorName,
        completedAt: enrollment.completedAt,
        enrolledAt: enrollment.enrolledAt,
      }
    });
  } catch (error) {
    console.error('Certificate data error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get course materials (legacy)
router.get('/courses/:id/materials', async (req, res) => {
  try {
    const [enrollment] = await pool.query(
      'SELECT id FROM courseEnrollments WHERE courseId = ? AND studentId = ?',
      [req.params.id, req.user.id]
    );

    if (enrollment.length === 0) {
      return res.status(403).json({ success: false, message: 'Not enrolled in this course.' });
    }

    const [materials] = await pool.query(
      'SELECT * FROM courseMaterials WHERE courseId = ? ORDER BY orderIndex',
      [req.params.id]
    );

    res.json({ success: true, data: { materials } });
  } catch (error) {
    console.error('Get materials error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── MY ASSIGNMENTS ────────────────
router.get('/assignments', async (req, res) => {
  try {
    const [assignments] = await pool.query(`
      SELECT a.*, c.title as courseTitle,
        asub.submittedAt, asub.score, asub.feedback, asub.id as submissionId
      FROM assignments a
      JOIN courses c ON a.courseId = c.id
      JOIN courseEnrollments ce ON ce.courseId = c.id
      LEFT JOIN assignmentSubmissions asub ON asub.assignmentId = a.id AND asub.studentId = ?
      WHERE ce.studentId = ? AND a.isPublished = 1
      ORDER BY a.dueDate ASC
    `, [req.user.id, req.user.id]);

    res.json({ success: true, data: { assignments } });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Submit an assignment
router.post('/assignments/:id/submit', async (req, res) => {
  try {
    const { content, fileUrl } = req.body;

    // Check if already submitted
    const [existing] = await pool.query(
      'SELECT id FROM assignmentSubmissions WHERE assignmentId = ? AND studentId = ?',
      [req.params.id, req.user.id]
    );

    if (existing.length > 0) {
      // Update existing submission
      await pool.query(
        'UPDATE assignmentSubmissions SET content = ?, fileUrl = ?, submittedAt = NOW() WHERE assignmentId = ? AND studentId = ?',
        [content, fileUrl, req.params.id, req.user.id]
      );
      return res.json({ success: true, message: 'Submission updated successfully.' });
    }

    await pool.query(
      'INSERT INTO assignmentSubmissions (assignmentId, studentId, content, fileUrl) VALUES (?, ?, ?, ?)',
      [req.params.id, req.user.id, content, fileUrl]
    );

    res.status(201).json({ success: true, message: 'Assignment submitted successfully!' });
  } catch (error) {
    console.error('Submit assignment error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── MY GRADES ────────────────
router.get('/grades', async (req, res) => {
  try {
    const [grades] = await pool.query(`
      SELECT g.*, c.title as courseTitle, a.title as assignmentTitle, at.title as testTitle
      FROM grades g
      LEFT JOIN courses c ON g.courseId = c.id
      LEFT JOIN assignments a ON g.assignmentId = a.id
      LEFT JOIN aptitudeTests at ON g.testId = at.id
      WHERE g.studentId = ?
      ORDER BY g.gradedAt DESC
    `, [req.user.id]);

    // Calculate overall stats
    const [overallStats] = await pool.query(`
      SELECT
        COALESCE(AVG(percentage), 0) as avgPercentage,
        COUNT(*) as totalGrades,
        SUM(CASE WHEN percentage >= 90 THEN 1 ELSE 0 END) as excellentCount,
        SUM(CASE WHEN percentage >= 75 AND percentage < 90 THEN 1 ELSE 0 END) as goodCount,
        SUM(CASE WHEN percentage >= 50 AND percentage < 75 THEN 1 ELSE 0 END) as averageCount,
        SUM(CASE WHEN percentage < 50 THEN 1 ELSE 0 END) as needsImprovementCount
      FROM grades WHERE studentId = ?
    `, [req.user.id]);

    res.json({ success: true, data: { grades, stats: overallStats[0] } });
  } catch (error) {
    console.error('Get grades error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── MY PROGRESS ────────────────
router.get('/progress', async (req, res) => {
  try {
    // Course progress
    const [courseProgress] = await pool.query(`
      SELECT c.title, c.category, ce.completionPercentage, ce.status, ce.enrolledAt, ce.completedAt
      FROM courseEnrollments ce
      JOIN courses c ON ce.courseId = c.id
      WHERE ce.studentId = ?
      ORDER BY ce.enrolledAt DESC
    `, [req.user.id]);

    // Assignment completion
    const [assignmentStats] = await pool.query(`
      SELECT
        COUNT(DISTINCT a.id) as totalAssignments,
        COUNT(DISTINCT asub.id) as submittedCount,
        COUNT(DISTINCT CASE WHEN asub.score IS NOT NULL THEN asub.id END) as gradedCount,
        COALESCE(AVG(CASE WHEN asub.score IS NOT NULL THEN (asub.score / a.maxScore * 100) END), 0) as avgScore
      FROM assignments a
      JOIN courses c ON a.courseId = c.id
      JOIN courseEnrollments ce ON ce.courseId = c.id
      LEFT JOIN assignmentSubmissions asub ON asub.assignmentId = a.id AND asub.studentId = ?
      WHERE ce.studentId = ? AND a.isPublished = 1
    `, [req.user.id, req.user.id]);

    // Aptitude test history
    const [aptitudeHistory] = await pool.query(`
      SELECT ata.*, at.title as testTitle, at.totalMarks as maxMarks
      FROM aptitudeTestAttempts ata
      JOIN aptitudeTests at ON ata.testId = at.id
      WHERE ata.studentId = ?
      ORDER BY ata.startedAt DESC
    `, [req.user.id]);

    // Coding submissions
    const [codingStats] = await pool.query(`
      SELECT
        COUNT(*) as totalSubmissions,
        SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as acceptedCount,
        COUNT(DISTINCT problemId) as problemsAttempted
      FROM codingSubmissions WHERE studentId = ?
    `, [req.user.id]);

    // Compute overall progress
    const totalCourses = courseProgress.length;
    const completedCourses = courseProgress.filter(c => c.status === 'completed').length;
    const overallProgress = totalCourses > 0 ? Math.round(courseProgress.reduce((sum, c) => sum + (c.completionPercentage || 0), 0) / totalCourses) : 0;

    res.json({
      success: true,
      data: {
        progress: courseProgress,
        overall: { totalCourses, completedCourses, overallProgress },
        assignmentStats: assignmentStats[0],
        aptitudeHistory,
        codingStats: codingStats[0]
      }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── CODING PRACTICE ────────────────
router.get('/coding-problems', async (req, res) => {
  try {
    const { difficulty, category } = req.query;

    let query = `
      SELECT cp.id, cp.title, cp.description, cp.difficulty, cp.category, cp.sampleInput, cp.sampleOutput,
        (SELECT COUNT(*) FROM codingSubmissions WHERE problemId = cp.id AND studentId = ?) as mySubmissions,
        (SELECT status FROM codingSubmissions WHERE problemId = cp.id AND studentId = ? ORDER BY submittedAt DESC LIMIT 1) as lastStatus
      FROM codingProblems cp
      WHERE 1=1
    `;
    const params = [req.user.id, req.user.id];

    if (difficulty) { query += ' AND cp.difficulty = ?'; params.push(difficulty); }
    if (category) { query += ' AND cp.category = ?'; params.push(category); }

    query += ' ORDER BY FIELD(cp.difficulty, "easy", "medium", "hard"), cp.createdAt DESC';
    const [problems] = await pool.query(query, params);

    res.json({ success: true, data: { problems } });
  } catch (error) {
    console.error('Get problems error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.get('/coding-problems/:id', async (req, res) => {
  try {
    const [problems] = await pool.query(
      'SELECT * FROM codingProblems WHERE id = ?',
      [req.params.id]
    );

    if (problems.length === 0) {
      return res.status(404).json({ success: false, message: 'Problem not found.' });
    }

    const [submissions] = await pool.query(
      'SELECT id, language, status, executionTime, memory, submittedAt FROM codingSubmissions WHERE problemId = ? AND studentId = ? ORDER BY submittedAt DESC',
      [req.params.id, req.user.id]
    );

    res.json({ success: true, data: { problem: problems[0], submissions } });
  } catch (error) {
    console.error('Get problem error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ── Local Code Execution Engine (child_process) ──
const EXEC_TIMEOUT = 15000; // 15 seconds
const MAX_OUTPUT = 100 * 1024; // 100KB

// Check if a command is available on this system
function commandExists(cmd) {
  try {
    execSync(process.platform === 'win32' ? `where ${cmd}` : `which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch { return false; }
}

// Resolve the best available command from a list of candidates
function resolveCmd(candidates) {
  for (const cmd of candidates) {
    if (commandExists(cmd)) return cmd;
  }
  return null;
}

// Language configuration for local execution
const LANG_CONFIG = {
  python:     { candidates: ['python', 'python3', 'py'], ext: 'py', type: 'interpreted' },
  javascript: { candidates: ['node'], ext: 'js', type: 'interpreted' },
  typescript: { candidates: ['npx'], ext: 'ts', type: 'interpreted', args: ['tsx'] },
  java:       { candidates: ['javac'], ext: 'java', type: 'compiled', runCmd: 'java' },
  cpp:        { candidates: ['g++'], ext: 'cpp', type: 'compiled' },
  c:          { candidates: ['gcc'], ext: 'c', type: 'compiled' },
  go:         { candidates: ['go'], ext: 'go', type: 'run', runArgs: ['run'] },
  rust:       { candidates: ['rustc'], ext: 'rs', type: 'compiled' },
  php:        { candidates: ['php'], ext: 'php', type: 'interpreted' },
  ruby:       { candidates: ['ruby'], ext: 'rb', type: 'interpreted' },
  bash:       { candidates: ['bash', 'sh'], ext: 'sh', type: 'interpreted' },
  perl:       { candidates: ['perl'], ext: 'pl', type: 'interpreted' },
  lua:        { candidates: ['lua'], ext: 'lua', type: 'interpreted' },
  r:          { candidates: ['Rscript'], ext: 'r', type: 'interpreted' },
  kotlin:     { candidates: ['kotlinc'], ext: 'kt', type: 'compiled-kt' },
  dart:       { candidates: ['dart'], ext: 'dart', type: 'run', runArgs: ['run'] },
  swift:      { candidates: ['swift'], ext: 'swift', type: 'interpreted' },
  scala:      { candidates: ['scala'], ext: 'scala', type: 'interpreted' },
};

// Cache resolved commands at startup
const resolvedCmds = {};
for (const [lang, cfg] of Object.entries(LANG_CONFIG)) {
  resolvedCmds[lang] = resolveCmd(cfg.candidates);
}
console.log('Available execution languages:', Object.entries(resolvedCmds).filter(([, v]) => v).map(([k, v]) => `${k}(${v})`).join(', '));

// Run a process and capture output
function runProcess(cmd, args, cwd, stdin, timeout) {
  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    let killed = false;

    const proc = spawn(cmd, args, {
      cwd,
      timeout,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: process.platform === 'win32',
    });

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
      if (stdout.length > MAX_OUTPUT) {
        stdout = stdout.slice(0, MAX_OUTPUT) + '\n[Output truncated]';
        proc.kill('SIGKILL');
        killed = true;
      }
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
      if (stderr.length > MAX_OUTPUT) {
        stderr = stderr.slice(0, MAX_OUTPUT) + '\n[Output truncated]';
      }
    });

    proc.on('error', (err) => {
      resolve({ stdout, stderr: stderr || err.message, code: -1, signal: null, killed });
    });

    proc.on('close', (code, signal) => {
      resolve({ stdout, stderr, code, signal, killed });
    });

    // Write stdin if provided
    if (stdin) {
      proc.stdin.write(stdin);
    }
    proc.stdin.end();

    // Fallback timeout (in case spawn timeout doesn't work on all platforms)
    setTimeout(() => {
      if (!proc.killed) {
        proc.kill('SIGKILL');
        killed = true;
      }
    }, timeout + 1000);
  });
}

// Execute code locally
async function executeLocally(language, code, stdin = '') {
  const lang = language || 'python';
  const cfg = LANG_CONFIG[lang];

  if (!cfg) {
    return { output: `Language "${lang}" is not supported.`, status: 'error' };
  }

  const cmd = resolvedCmds[lang];
  if (!cmd) {
    return { output: `Language "${lang}" is not available on this server. Install the runtime and restart the server.`, status: 'error' };
  }

  // Create temp directory
  const execId = Date.now() + '-' + Math.random().toString(36).slice(2, 8);
  const execDir = path.join(os.tmpdir(), 'sowberry-exec', execId);
  fs.mkdirSync(execDir, { recursive: true });

  try {
    const startTime = Date.now();
    let fileName;
    let output = '';
    let status = 'success';

    // For Java, extract public class name or use Main
    if (lang === 'java') {
      const classMatch = code.match(/public\s+class\s+(\w+)/);
      const className = classMatch ? classMatch[1] : 'Main';
      fileName = `${className}.java`;
    } else {
      fileName = `code.${cfg.ext}`;
    }

    const filePath = path.join(execDir, fileName);
    fs.writeFileSync(filePath, code, 'utf8');

    if (cfg.type === 'interpreted') {
      // Interpreted: run directly
      const args = cfg.args ? [...cfg.args, filePath] : [filePath];
      const result = await runProcess(cmd, args, execDir, stdin, EXEC_TIMEOUT);

      if (result.stdout) output += result.stdout;
      if (result.stderr) {
        output += (output ? '\n' : '') + `[Error]\n${result.stderr}`;
        if (!result.stdout) status = 'error';
      }
      if (result.killed || result.signal === 'SIGKILL') {
        output += '\n[Time Limit Exceeded]';
        status = 'error';
      }
    } else if (cfg.type === 'compiled') {
      // Compiled: compile then run
      const outName = process.platform === 'win32' ? 'program.exe' : 'program';
      const outPath = path.join(execDir, outName);
      let compileArgs;

      if (lang === 'java') {
        compileArgs = [filePath];
      } else {
        // C/C++/Rust: compile to binary
        compileArgs = [filePath, '-o', outPath];
      }

      const compResult = await runProcess(cmd, compileArgs, execDir, '', EXEC_TIMEOUT);

      if (compResult.code !== 0) {
        output = `[Compilation Error]\n${compResult.stderr || compResult.stdout}`;
        status = 'error';
      } else {
        // Run the compiled program
        let runCmd, runArgs;
        if (lang === 'java') {
          const classMatch = code.match(/public\s+class\s+(\w+)/);
          const className = classMatch ? classMatch[1] : 'Main';
          runCmd = cfg.runCmd || 'java';
          runArgs = ['-cp', execDir, className];
        } else {
          runCmd = outPath;
          runArgs = [];
        }

        const runResult = await runProcess(runCmd, runArgs, execDir, stdin, EXEC_TIMEOUT);

        if (runResult.stdout) output += runResult.stdout;
        if (runResult.stderr) {
          output += (output ? '\n' : '') + `[Error]\n${runResult.stderr}`;
          if (!runResult.stdout) status = 'error';
        }
        if (runResult.killed || runResult.signal === 'SIGKILL') {
          output += '\n[Time Limit Exceeded]';
          status = 'error';
        }
      }
    } else if (cfg.type === 'run') {
      // Languages with `run` subcommand (go run, dart run)
      const args = [...(cfg.runArgs || []), filePath];
      const result = await runProcess(cmd, args, execDir, stdin, EXEC_TIMEOUT);

      if (result.stdout) output += result.stdout;
      if (result.stderr) {
        output += (output ? '\n' : '') + `[Error]\n${result.stderr}`;
        if (!result.stdout) status = 'error';
      }
      if (result.killed || result.signal === 'SIGKILL') {
        output += '\n[Time Limit Exceeded]';
        status = 'error';
      }
    }

    const elapsed = Date.now() - startTime;

    return {
      output: (output || '').trim() || '(No output)',
      status,
      language: lang,
      executionTime: `${elapsed}ms`,
    };
  } finally {
    // Clean up temp files
    try {
      fs.rmSync(execDir, { recursive: true, force: true });
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

// ── Execute code endpoint ──
router.post('/execute', async (req, res) => {
  try {
    const { code, language, stdin } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: 'Code is required.' });
    }

    const result = await executeLocally(language, code, stdin || '');

    res.json({
      success: true,
      data: {
        output: result.output,
        status: result.status,
        language: result.language,
        executionTime: result.executionTime,
      }
    });
  } catch (error) {
    console.error('Execute code error:', error);
    res.status(500).json({ success: false, message: 'Failed to execute code. Please try again.' });
  }
});

// Submit code (save to DB + execute for problem solving)
router.post('/coding-problems/:id/submit', async (req, res) => {
  try {
    const { code, language, stdin } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: 'Code is required.' });
    }

    const lang = language || 'python';
    let output = '';
    let status = 'pending';

    // Try to execute locally
    try {
      const result = await executeLocally(lang, code, stdin || '');
      output = result.output;
      status = result.status === 'success' ? 'accepted' : (result.status === 'error' && result.output.includes('[Compilation Error]') ? 'compile_error' : 'wrong_answer');
    } catch (execErr) {
      console.error('Execution during submit:', execErr);
    }

    const [result] = await pool.query(
      'INSERT INTO codingSubmissions (problemId, studentId, code, language, status) VALUES (?, ?, ?, ?, ?)',
      [req.params.id, req.user.id, code, lang, status]
    );

    res.status(201).json({
      success: true,
      message: 'Code submitted successfully!',
      data: { id: result.insertId, output: output.trim() || 'Code submitted for evaluation.', status }
    });
  } catch (error) {
    console.error('Submit code error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── GAME CHALLENGES ────────────────

// GET all game challenges with unlock status
router.get('/game-challenges', async (req, res) => {
  try {
    const [challenges] = await pool.query(
      `SELECT gc.*, 
        (SELECT COUNT(*) FROM gameUnlocks WHERE challengeSlug = gc.slug AND studentId = ?) > 0 as unlocked
       FROM gameChallenges gc ORDER BY gc.sortOrder`,
      [req.user.id]
    );
    res.json({ success: true, data: challenges });
  } catch (error) {
    console.error('Get game challenges error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET single game challenge by slug
router.get('/game-challenges/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gameChallenges WHERE slug = ?', [req.params.slug]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Challenge not found.' });
    const challenge = rows[0];
    // Parse testCases JSON
    challenge.testCases = typeof challenge.testCases === 'string' ? JSON.parse(challenge.testCases) : challenge.testCases;
    const [unlockRows] = await pool.query('SELECT id FROM gameUnlocks WHERE challengeSlug = ? AND studentId = ?', [req.params.slug, req.user.id]);
    challenge.unlocked = unlockRows.length > 0;
    res.json({ success: true, data: challenge });
  } catch (error) {
    console.error('Get game challenge error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST submit code for a game challenge – validates using server-side Python execution
router.post('/game-challenges/:slug/submit', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: 'Code is required.' });
    }

    // Fetch challenge
    const [rows] = await pool.query('SELECT * FROM gameChallenges WHERE slug = ?', [req.params.slug]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Challenge not found.' });
    const challenge = rows[0];
    const testCases = typeof challenge.testCases === 'string' ? JSON.parse(challenge.testCases) : challenge.testCases;

    // Extract the function name from the boilerplate
    const fnMatch = challenge.boilerplate.match(/def\s+(\w+)\s*\(/);
    const funcName = fnMatch ? fnMatch[1] : null;
    if (!funcName) {
      return res.status(400).json({ success: false, message: 'Could not determine function name from challenge.' });
    }

    // Build a test runner that executes the user's code and runs assertions
    let testRunner = code + '\n\n# === AUTO-GENERATED TEST RUNNER ===\n_all_passed = True\n_results = []\n';

    testCases.forEach((tc, i) => {
      testRunner += `\ntry:\n    _result_${i} = ${funcName}(${tc.input})\n`;
      testRunner += `    _expected_${i} = ${tc.expected}\n`;
      testRunner += `    if str(_result_${i}) != str(_expected_${i}):\n        _all_passed = False\n        _results.append(f"Test ${i + 1}: FAILED (got {_result_${i}}, expected {_expected_${i}})")\n    else:\n        _results.append(f"Test ${i + 1}: PASSED")\n`;
      testRunner += `except Exception as e:\n    _all_passed = False\n    _results.append(f"Test ${i + 1}: ERROR - {e}")\n`;
    });

    testRunner += '\nfor r in _results:\n    print(r)\nif _all_passed:\n    print("ALL_TESTS_PASSED")\n';

    // Execute using the server-side Python runner
    const result = await executeLocally('python', testRunner, '');

    const passed = result.output && result.output.includes('ALL_TESTS_PASSED');

    // If passed, unlock the game
    if (passed) {
      await pool.query(
        'INSERT IGNORE INTO gameUnlocks (studentId, challengeSlug) VALUES (?, ?)',
        [req.user.id, req.params.slug]
      );
    }

    res.json({
      success: true,
      passed,
      output: result.output || '',
      message: passed ? 'All tests passed! Game unlocked!' : 'Some tests failed. Check your output.'
    });
  } catch (error) {
    console.error('Submit game challenge error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET unlocked games list
router.get('/game-unlocks', async (req, res) => {
  try {
    const [unlocks] = await pool.query(
      'SELECT challengeSlug FROM gameUnlocks WHERE studentId = ?',
      [req.user.id]
    );
    res.json({ success: true, data: unlocks.map(u => u.challengeSlug) });
  } catch (error) {
    console.error('Get game unlocks error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── APTITUDE TESTS ────────────────
router.get('/aptitude-tests', async (req, res) => {
  try {
    const [tests] = await pool.query(`
      SELECT at.id, at.title, at.description, at.category, at.difficulty, at.icon,
             at.duration, at.totalQuestions, at.totalMarks, at.createdAt,
             u.fullName as mentorName,
        (SELECT COUNT(*) FROM aptitudeTestAttempts WHERE testId = at.id AND studentId = ?) as myAttempts,
        (SELECT score FROM aptitudeTestAttempts WHERE testId = at.id AND studentId = ? ORDER BY startedAt DESC LIMIT 1) as lastScore,
        (SELECT MAX(score) FROM aptitudeTestAttempts WHERE testId = at.id AND studentId = ? AND status = 'completed') as bestScore
      FROM aptitudeTests at
      JOIN users u ON at.mentorId = u.id
      WHERE at.isPublished = 1
      ORDER BY at.category, at.difficulty, at.createdAt DESC
    `, [req.user.id, req.user.id, req.user.id]);

    res.json({ success: true, tests });
  } catch (error) {
    console.error('Get tests error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Start an aptitude test attempt
router.post('/aptitude-tests/:id/start', async (req, res) => {
  try {
    const testId = req.params.id;

    const [test] = await pool.query('SELECT * FROM aptitudeTests WHERE id = ? AND isPublished = 1', [testId]);
    if (test.length === 0) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

    const [result] = await pool.query(
      "INSERT INTO aptitudeTestAttempts (testId, studentId, totalMarks, status) VALUES (?, ?, ?, 'inProgress')",
      [testId, req.user.id, test[0].totalMarks]
    );

    const [questions] = await pool.query(
      'SELECT id, question, optionA, optionB, optionC, optionD, marks, explanation, orderIndex FROM aptitudeQuestions WHERE testId = ? ORDER BY orderIndex',
      [testId]
    );

    res.status(201).json({
      success: true,
      attemptId: result.insertId,
      test: { title: test[0].title, duration: test[0].duration, totalMarks: test[0].totalMarks, category: test[0].category },
      questions
    });
  } catch (error) {
    console.error('Start test error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Submit aptitude test answers
router.post('/aptitude-tests/:attemptId/submit', async (req, res) => {
  try {
    const { answers } = req.body; // [{questionId, selectedOption}]

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'Answers are required.' });
    }

    let totalScore = 0;
    const results = [];

    for (const answer of answers) {
      const [question] = await pool.query(
        'SELECT id, question, optionA, optionB, optionC, optionD, correctOption, marks, explanation FROM aptitudeQuestions WHERE id = ?',
        [answer.questionId]
      );

      const isCorrect = question.length > 0 && question[0].correctOption === answer.selectedOption;
      if (isCorrect) totalScore += question[0].marks;

      await pool.query(
        'INSERT INTO aptitudeAnswers (attemptId, questionId, selectedOption, isCorrect) VALUES (?, ?, ?, ?)',
        [req.params.attemptId, answer.questionId, answer.selectedOption, isCorrect ? 1 : 0]
      );

      if (question.length > 0) {
        results.push({
          questionId: question[0].id,
          question: question[0].question,
          optionA: question[0].optionA,
          optionB: question[0].optionB,
          optionC: question[0].optionC,
          optionD: question[0].optionD,
          correctOption: question[0].correctOption,
          selectedOption: answer.selectedOption,
          isCorrect,
          explanation: question[0].explanation,
          marks: question[0].marks
        });
      }
    }

    // Update attempt
    await pool.query(
      "UPDATE aptitudeTestAttempts SET score = ?, completedAt = NOW(), status = 'completed' WHERE id = ? AND studentId = ?",
      [totalScore, req.params.attemptId, req.user.id]
    );

    // Get attempt details for grade record
    const [attempt] = await pool.query('SELECT testId, totalMarks FROM aptitudeTestAttempts WHERE id = ?', [req.params.attemptId]);
    if (attempt.length > 0) {
      const percentage = (totalScore / attempt[0].totalMarks) * 100;
      await pool.query(
        'INSERT INTO grades (studentId, testId, gradeType, score, maxScore, percentage) VALUES (?, ?, ?, ?, ?, ?)',
        [req.user.id, attempt[0].testId, 'aptitude', totalScore, attempt[0].totalMarks, percentage]
      );
    }

    res.json({
      success: true,
      message: 'Test submitted successfully!',
      score: totalScore,
      totalMarks: attempt[0]?.totalMarks || 0,
      results
    });
  } catch (error) {
    console.error('Submit test error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get aptitude test attempt result
router.get('/aptitude-tests/attempts/:id', async (req, res) => {
  try {
    const attemptId = req.params.id;

    const [attempt] = await pool.query(`
      SELECT ata.*, at.title, at.totalQuestions, at.duration, at.totalMarks as maxMarks
      FROM aptitudeTestAttempts ata
      JOIN aptitudeTests at ON ata.testId = at.id
      WHERE ata.id = ? AND ata.studentId = ?
    `, [attemptId, req.user.id]);

    if (attempt.length === 0) {
      return res.status(404).json({ success: false, message: 'Attempt not found.' });
    }

    const [answers] = await pool.query(`
      SELECT aa.*, aq.question, aq.optionA, aq.optionB, aq.optionC, aq.optionD, aq.correctOption, aq.explanation, aq.marks
      FROM aptitudeAnswers aa
      JOIN aptitudeQuestions aq ON aa.questionId = aq.id
      WHERE aa.attemptId = ?
    `, [attemptId]);

    // Calculate stats
    const answered = answers.length;
    let score = 0;
    answers.forEach(a => { if(a.isCorrect) score += a.marks; });

    res.json({
      success: true,
      data: {
        attempt: attempt[0],
        results: answers,
        score,
        total: attempt[0].maxMarks,
        answered,
        questions: attempt[0].totalQuestions
      }
    });

  } catch (error) {
    console.error('Get attempt error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── STUDY MATERIALS ────────────────
router.get('/study-materials', async (req, res) => {
  try {
    const { category } = req.query;

    let query = `
      SELECT sm.*, c.title as courseTitle, u.fullName as mentorName
      FROM studyMaterials sm
      LEFT JOIN courses c ON sm.courseId = c.id
      JOIN users u ON sm.mentorId = u.id
      WHERE sm.courseId IN (SELECT courseId FROM courseEnrollments WHERE studentId = ?)
         OR sm.courseId IS NULL
    `;
    const params = [req.user.id];

    if (category) { query += ' AND sm.category = ?'; params.push(category); }
    query += ' ORDER BY sm.createdAt DESC';

    const [materials] = await pool.query(query, params);
    res.json({ success: true, data: { materials } });
  } catch (error) {
    console.error('Get materials error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── EVENTS ────────────────
router.get('/events', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT e.*, u.fullName as mentorName,
        (SELECT COUNT(*) FROM eventRegistrations WHERE eventId = e.id) as registrationCount,
        (SELECT COUNT(*) FROM eventRegistrations WHERE eventId = e.id AND studentId = ?) as isRegistered
      FROM events e
      JOIN users u ON e.mentorId = u.id
      WHERE e.isPublished = 1
      ORDER BY e.startDate ASC
    `, [req.user.id]);

    res.json({ success: true, data: { events } });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Register for an event
router.post('/events/:id/register', async (req, res) => {
  try {
    const [existing] = await pool.query(
      'SELECT id FROM eventRegistrations WHERE eventId = ? AND studentId = ?',
      [req.params.id, req.user.id]
    );

    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Already registered for this event.' });
    }

    await pool.query(
      'INSERT INTO eventRegistrations (eventId, studentId) VALUES (?, ?)',
      [req.params.id, req.user.id]
    );

    res.status(201).json({ success: true, message: 'Registered for event successfully!' });
  } catch (error) {
    console.error('Register event error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── DISCUSSIONS ────────────────
router.get('/discussions', async (req, res) => {
  try {
    const [discussions] = await pool.query(`
      SELECT d.*, c.title as courseTitle, u.fullName as authorName, u.role as authorRole,
        (SELECT COUNT(*) FROM discussionReplies WHERE discussionId = d.id) as replyCount
      FROM discussions d
      LEFT JOIN courses c ON d.courseId = c.id
      JOIN users u ON d.userId = u.id
      WHERE d.courseId IN (SELECT courseId FROM courseEnrollments WHERE studentId = ?)
         OR d.courseId IS NULL
      ORDER BY d.createdAt DESC
    `, [req.user.id]);

    res.json({ success: true, data: { discussions } });
  } catch (error) {
    console.error('Get discussions error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/discussions/:id/reply', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Content is required.' });

    await pool.query(
      'INSERT INTO discussionReplies (discussionId, userId, content) VALUES (?, ?, ?)',
      [req.params.id, req.user.id, content]
    );

    res.status(201).json({ success: true, message: 'Reply posted successfully.' });
  } catch (error) {
    console.error('Reply error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── NOTIFICATIONS ────────────────
router.get('/notifications', async (req, res) => {
  try {
    const [notifications] = await pool.query(
      'SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC LIMIT 20',
      [req.user.id]
    );
    const [unreadCount] = await pool.query(
      'SELECT COUNT(*) as count FROM notifications WHERE userId = ? AND isRead = 0',
      [req.user.id]
    );
    res.json({ success: true, data: { notifications, unreadCount: unreadCount[0].count } });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── DOUBTS (Student) ────────────────

// List my doubts
router.get('/doubts', async (req, res) => {
  try {
    const [doubts] = await pool.query(`
      SELECT d.*, c.title as courseTitle, m.fullName as mentorName,
        (SELECT COUNT(*) FROM doubtReplies WHERE doubtId = d.id) as replyCount
      FROM doubts d
      LEFT JOIN courses c ON d.courseId = c.id
      LEFT JOIN users m ON d.assignedMentorId = m.id
      WHERE d.studentId = ?
      ORDER BY d.createdAt DESC
    `, [req.user.id]);
    res.json({ success: true, data: { doubts } });
  } catch (error) {
    console.error('Student get doubts error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Create a doubt
router.post('/doubts', async (req, res) => {
  try {
    const { courseId, title, description, priority } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Doubt title is required.' });
    const [result] = await pool.query(
      'INSERT INTO doubts (studentId, courseId, title, description, priority) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, courseId || null, title, description || null, priority || 'medium']
    );
    res.status(201).json({ success: true, message: 'Doubt posted successfully. A mentor will respond soon.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Student create doubt error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get doubt detail with replies
router.get('/doubts/:id', async (req, res) => {
  try {
    const [doubts] = await pool.query(`
      SELECT d.*, c.title as courseTitle, m.fullName as mentorName
      FROM doubts d
      LEFT JOIN courses c ON d.courseId = c.id
      LEFT JOIN users m ON d.assignedMentorId = m.id
      WHERE d.id = ? AND d.studentId = ?
    `, [req.params.id, req.user.id]);
    if (doubts.length === 0) return res.status(404).json({ success: false, message: 'Doubt not found.' });
    const [replies] = await pool.query(`
      SELECT dr.*, u.fullName as authorName, u.role as authorRole
      FROM doubtReplies dr JOIN users u ON dr.userId = u.id
      WHERE dr.doubtId = ? ORDER BY dr.createdAt ASC
    `, [req.params.id]);
    res.json({ success: true, data: { doubt: doubts[0], replies } });
  } catch (error) {
    console.error('Student get doubt error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Student reply to own doubt (follow-up)
router.post('/doubts/:id/reply', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Reply content is required.' });
    const [doubts] = await pool.query('SELECT id FROM doubts WHERE id = ? AND studentId = ?', [req.params.id, req.user.id]);
    if (doubts.length === 0) return res.status(404).json({ success: false, message: 'Doubt not found.' });
    await pool.query('INSERT INTO doubtReplies (doubtId, userId, content) VALUES (?, ?, ?)', [req.params.id, req.user.id, content]);
    res.status(201).json({ success: true, message: 'Reply posted.' });
  } catch (error) {
    console.error('Student reply doubt error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── PROFILE REQUESTS ────────────────

// Create a profile edit or account deletion request
router.post('/profile-requests', async (req, res) => {
  try {
    const { type, requestData, reason } = req.body;

    if (!type || !['edit', 'delete'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid request type. Must be "edit" or "delete".' });
    }

    if (type === 'edit' && (!requestData || Object.keys(requestData).length === 0)) {
      return res.status(400).json({ success: false, message: 'Please provide the fields you want to edit.' });
    }

    if (!reason || reason.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide a reason for your request.' });
    }

    // Check for existing pending request of same type
    const [existing] = await pool.query(
      "SELECT id FROM profileRequests WHERE studentId = ? AND type = ? AND status = 'pending'",
      [req.user.id, type]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: `You already have a pending ${type} request. Please wait for admin to review it.` });
    }

    await pool.query(
      'INSERT INTO profileRequests (studentId, type, requestData, reason) VALUES (?, ?, ?, ?)',
      [req.user.id, type, type === 'edit' ? JSON.stringify(requestData) : null, reason.trim()]
    );

    res.status(201).json({ success: true, message: `Your ${type} request has been submitted. You will be notified once admin reviews it.` });
  } catch (error) {
    console.error('Create profile request error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get own profile requests
router.get('/profile-requests', async (req, res) => {
  try {
    const [requests] = await pool.query(
      `SELECT pr.*, u.fullName as reviewerName
       FROM profileRequests pr
       LEFT JOIN users u ON pr.reviewedBy = u.id
       WHERE pr.studentId = ?
       ORDER BY pr.createdAt DESC`,
      [req.user.id]
    );

    res.json({ success: true, data: { requests } });
  } catch (error) {
    console.error('Get profile requests error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Cancel a pending request
router.delete('/profile-requests/:id', async (req, res) => {
  try {
    const [requests] = await pool.query(
      "SELECT id FROM profileRequests WHERE id = ? AND studentId = ? AND status = 'pending'",
      [req.params.id, req.user.id]
    );

    if (requests.length === 0) {
      return res.status(404).json({ success: false, message: 'Request not found or already processed.' });
    }

    await pool.query('DELETE FROM profileRequests WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Request cancelled successfully.' });
  } catch (error) {
    console.error('Cancel profile request error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
