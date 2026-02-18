import { Router } from 'express';
import pool from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// ──────────────── COLLEGE SEARCH (CSV) ────────────────
let collegeCache = null;

function loadColleges() {
  if (collegeCache) return collegeCache;
  try {
    const csvPath = path.join(__dirname, '..', '..', 'public', 'college.csv');
    const raw = fs.readFileSync(csvPath, 'utf-8');
    const lines = raw.split('\n').slice(1); // skip header
    const names = new Set();
    for (const line of lines) {
      if (!line.trim()) continue;
      // CSV columns: S.No., University Name, College Name, College Type, State Name, District Name
      // College Name is the 3rd column — parse carefully for quoted fields
      const cols = parseCSVLine(line);
      if (cols.length >= 3) {
        let name = cols[2].trim();
        // Strip (Id: C-XXXXX) suffix
        name = name.replace(/\s*\(Id:\s*C-\d+\)\s*$/, '').trim();
        if (name) names.add(name);
      }
    }
    collegeCache = Array.from(names).sort();
    console.log(`Loaded ${collegeCache.length} unique colleges from CSV`);
    return collegeCache;
  } catch (err) {
    console.error('Error loading college CSV:', err);
    return [];
  }
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        result.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

router.post('/colleges/search', (req, res) => {
  try {
    const { keyword } = req.body;
    if (!keyword || keyword.trim().length < 2) {
      return res.json({ success: true, data: { colleges: [] } });
    }
    const colleges = loadColleges();
    const query = keyword.trim().toLowerCase();
    const matches = colleges.filter(c => c.toLowerCase().includes(query)).slice(0, 50);
    res.json({ success: true, data: { colleges: matches } });
  } catch (error) {
    console.error('College search error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── ACADEMIC YEAR & ROLL NUMBER CONFIG ────────────────
const MKC_COLLEGE = 'M.Kumarasamy College of Engineering';
const ROLL_PREFIX = '9276';
const DEPT_CODES = {
  'AIDS': 'BAD', 'AIML': 'BAM', 'CSE': 'BCS', 'CSBS': 'BCB',
  'CYBER': 'BSC', 'ECE': 'BEC', 'EEE': 'BEE', 'MECH': 'BME',
  'CIVIL': 'BCE', 'IT': 'BIT', 'VLSI': 'BEV'
};

// Special dept code overrides per academic year
// AIML IV year used 'BAL' only in 2025-2026; from 2026-2027 it reverts to 'BAM'
const SPECIAL_DEPT_OVERRIDES = {
  '2025-2026': { 'AIML': { 'IV year': 'BAL' } }
};

function getAcademicYear() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const year = now.getFullYear();
  // Academic year starts in June
  const startYear = month >= 6 ? year : year - 1;
  const endYear = startYear + 1;
  const y = startYear % 100; // last 2 digits
  const academicYear = `${startYear}-${endYear}`;
  return {
    academicYear,
    yearCodes: {
      'I year':   ROLL_PREFIX + String(y).padStart(2, '0'),
      'II year':  ROLL_PREFIX + String(y - 1).padStart(2, '0'),
      'III year': ROLL_PREFIX + String(y - 2).padStart(2, '0'),
      'IV year':  ROLL_PREFIX + String(y - 3).padStart(2, '0'),
    },
    deptCodes: DEPT_CODES,
    // Only include overrides if they exist for this academic year
    specialDeptOverrides: SPECIAL_DEPT_OVERRIDES[academicYear] || {},
    targetCollege: MKC_COLLEGE,
  };
}

router.get('/academic-year', (req, res) => {
  try {
    const data = getAcademicYear();
    res.json({ success: true, data });
  } catch (error) {
    console.error('Academic year error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── DEPARTMENT SEARCH (CSV) ────────────────
let departmentCache = null;

function loadDepartments() {
  if (departmentCache) return departmentCache;
  try {
    const csvPath = path.join(__dirname, '..', '..', 'public', 'departments.csv');
    const raw = fs.readFileSync(csvPath, 'utf-8');
    const lines = raw.split('\n').slice(1); // skip header
    const departments = [];
    for (const line of lines) {
      if (!line.trim()) continue;
      const cols = parseCSVLine(line);
      if (cols.length >= 3) {
        const code = cols[0].trim();
        const degree = cols[1].trim();
        const name = cols[2].trim();
        if (code && degree && name) {
          departments.push({ code, degree, name, label: `${degree} - ${name}` });
        }
      }
    }
    departmentCache = departments.sort((a, b) => a.label.localeCompare(b.label));
    console.log(`Loaded ${departmentCache.length} departments from CSV`);
    return departmentCache;
  } catch (err) {
    console.error('Error loading departments CSV:', err);
    return [];
  }
}

router.post('/departments/search', (req, res) => {
  try {
    const { keyword } = req.body;
    if (!keyword || keyword.trim().length < 2) {
      return res.json({ success: true, data: { departments: [] } });
    }
    const departments = loadDepartments();
    const query = keyword.trim().toLowerCase();
    const matches = departments.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.code.toLowerCase().includes(query) ||
      d.degree.toLowerCase().includes(query) ||
      d.label.toLowerCase().includes(query)
    ).slice(0, 50);
    res.json({ success: true, data: { departments: matches } });
  } catch (error) {
    console.error('Department search error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── CONTACT FORM (Public) ────────────────
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    await pool.query(
      'INSERT INTO contactMessages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, subject || null, message]
    );

    res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you soon.' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── PUBLIC COURSES (Browse without auth) ────────────────
router.get('/courses', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT c.id, c.title, c.description, c.image, c.duration, c.category, c.difficulty, c.rating,
        u.fullName as mentorName,
        (SELECT COUNT(*) FROM courseEnrollments WHERE courseId = c.id) as totalStudents
      FROM courses c
      JOIN users u ON c.mentorId = u.id
      WHERE c.isPublished = 1
      ORDER BY c.rating DESC, c.createdAt DESC
    `);

    res.json({ success: true, data: { courses } });
  } catch (error) {
    console.error('Public courses error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── NEWSLETTER (Public) ────────────────
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    // For now, log it. In production, integrate with email service
    console.log('Newsletter subscription:', email);

    res.json({ success: true, message: 'Subscribed to newsletter successfully!' });
  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
