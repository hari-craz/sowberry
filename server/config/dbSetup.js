/*
  Sowberry Database Setup Script
  Database: sowberry (MySQL)
  Naming: camelCase

  Run: node config/dbSetup.js
*/

import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'sowberry';

async function setup() {
  // Connect without database first to create it
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  });

  console.log('🌱 Connected to MySQL server');

  // Create database
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await connection.query(`USE \`${DB_NAME}\``);
  console.log(`✅ Database "${DB_NAME}" ready`);

  // ──────────────────── TABLES ────────────────────

  // 1. users
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      username VARCHAR(100) NOT NULL UNIQUE,
      fullName VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20) DEFAULT NULL,
      countryCode VARCHAR(10) DEFAULT '+91',
      role ENUM('admin', 'mentor', 'student') NOT NULL DEFAULT 'student',
      profileImage VARCHAR(500) DEFAULT NULL,
      college VARCHAR(255) DEFAULT NULL,
      department VARCHAR(255) DEFAULT NULL,
      year VARCHAR(20) DEFAULT NULL,
      rollNumber VARCHAR(100) DEFAULT NULL,
      gender VARCHAR(20) DEFAULT NULL,
      dateOfBirth DATE DEFAULT NULL,
      address TEXT DEFAULT NULL,
      bio TEXT DEFAULT NULL,
      github VARCHAR(500) DEFAULT NULL,
      linkedin VARCHAR(500) DEFAULT NULL,
      hackerrank VARCHAR(500) DEFAULT NULL,
      leetcode VARCHAR(500) DEFAULT NULL,
      isVerified TINYINT(1) DEFAULT 0,
      isActive TINYINT(1) DEFAULT 1,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_role (role),
      INDEX idx_email (email)
    ) ENGINE=InnoDB
  `);

  // 2. otpCodes
  await connection.query(`
    CREATE TABLE IF NOT EXISTS otpCodes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT DEFAULT NULL,
      email VARCHAR(255) NOT NULL,
      code VARCHAR(10) NOT NULL,
      expiresAt DATETIME NOT NULL,
      isUsed TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_email_code (email, code)
    ) ENGINE=InnoDB
  `);

  // 3. courses (enhanced with Azhagii-style fields)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      courseCode VARCHAR(50) DEFAULT NULL,
      description TEXT,
      image VARCHAR(500) DEFAULT NULL,
      thumbnail VARCHAR(500) DEFAULT NULL,
      syllabus VARCHAR(500) DEFAULT NULL,
      duration VARCHAR(50) DEFAULT NULL,
      mentorId INT NOT NULL,
      category VARCHAR(100) DEFAULT NULL,
      courseType ENUM('theory', 'practical', 'lab') DEFAULT 'theory',
      difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
      semester VARCHAR(20) DEFAULT NULL,
      regulation VARCHAR(50) DEFAULT NULL,
      academicYear VARCHAR(20) DEFAULT NULL,
      maxStudents INT DEFAULT 100,
      isPublished TINYINT(1) DEFAULT 0,
      status ENUM('draft', 'pending', 'active', 'rejected', 'inactive') DEFAULT 'draft',
      approvedBy INT DEFAULT NULL,
      approvedAt DATETIME DEFAULT NULL,
      rejectionReason TEXT DEFAULT NULL,
      rating DECIMAL(2,1) DEFAULT 0.0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (mentorId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (approvedBy) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_mentor (mentorId),
      INDEX idx_published (isPublished),
      INDEX idx_status (status)
    ) ENGINE=InnoDB
  `);

  // 4. courseEnrollments (enhanced with topic tracking)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courseEnrollments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      studentId INT NOT NULL,
      enrolledAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completionPercentage DECIMAL(5,2) DEFAULT 0.00,
      status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
      completedTopics JSON DEFAULT ('[]'),
      completedAt DATETIME DEFAULT NULL,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_enrollment (courseId, studentId),
      INDEX idx_student (studentId)
    ) ENGINE=InnoDB
  `);

  // 4b. courseSubjects (Units within a course - from Azhagii)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courseSubjects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      code VARCHAR(50) DEFAULT NULL,
      description TEXT,
      sortOrder INT DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      INDEX idx_course (courseId)
    ) ENGINE=InnoDB
  `);

  // 4c. courseTopics (Topics within subjects - from Azhagii)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courseTopics (
      id INT AUTO_INCREMENT PRIMARY KEY,
      subjectId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      sortOrder INT DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (subjectId) REFERENCES courseSubjects(id) ON DELETE CASCADE,
      INDEX idx_subject (subjectId)
    ) ENGINE=InnoDB
  `);

  // 4d. courseContent (Video/PDF/Text content per course - from Azhagii)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courseContent (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      subjectId INT DEFAULT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      contentType ENUM('video', 'pdf', 'text') DEFAULT 'text',
      contentData TEXT COMMENT 'URL for video, file path for PDF, text content for text',
      sortOrder INT DEFAULT 0,
      status ENUM('active', 'inactive') DEFAULT 'active',
      uploadedBy INT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (subjectId) REFERENCES courseSubjects(id) ON DELETE SET NULL,
      FOREIGN KEY (uploadedBy) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_course (courseId),
      INDEX idx_subject (subjectId)
    ) ENGINE=InnoDB
  `);

  // 5. courseMaterials
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courseMaterials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      fileUrl VARCHAR(500) DEFAULT NULL,
      fileType VARCHAR(50) DEFAULT NULL,
      orderIndex INT DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      INDEX idx_course (courseId)
    ) ENGINE=InnoDB
  `);

  // 6. assignments
  await connection.query(`
    CREATE TABLE IF NOT EXISTS assignments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      mentorId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      dueDate DATETIME NOT NULL,
      maxScore INT DEFAULT 100,
      isPublished TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (mentorId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_course (courseId),
      INDEX idx_mentor (mentorId)
    ) ENGINE=InnoDB
  `);

  // 7. assignmentSubmissions
  await connection.query(`
    CREATE TABLE IF NOT EXISTS assignmentSubmissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      assignmentId INT NOT NULL,
      studentId INT NOT NULL,
      content TEXT,
      fileUrl VARCHAR(500) DEFAULT NULL,
      submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      score INT DEFAULT NULL,
      feedback TEXT,
      gradedAt DATETIME DEFAULT NULL,
      gradedBy INT DEFAULT NULL,
      FOREIGN KEY (assignmentId) REFERENCES assignments(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (gradedBy) REFERENCES users(id) ON DELETE SET NULL,
      UNIQUE KEY unique_submission (assignmentId, studentId),
      INDEX idx_student (studentId)
    ) ENGINE=InnoDB
  `);

  // 8. aptitudeTests
  await connection.query(`
    CREATE TABLE IF NOT EXISTS aptitudeTests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mentorId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      duration INT DEFAULT 30 COMMENT 'in minutes',
      totalQuestions INT DEFAULT 0,
      totalMarks INT DEFAULT 0,
      isPublished TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (mentorId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_mentor (mentorId)
    ) ENGINE=InnoDB
  `);

  // 9. aptitudeQuestions
  await connection.query(`
    CREATE TABLE IF NOT EXISTS aptitudeQuestions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      testId INT NOT NULL,
      question TEXT NOT NULL,
      optionA VARCHAR(500) NOT NULL,
      optionB VARCHAR(500) NOT NULL,
      optionC VARCHAR(500) NOT NULL,
      optionD VARCHAR(500) NOT NULL,
      correctOption ENUM('A', 'B', 'C', 'D') NOT NULL,
      marks INT DEFAULT 1,
      explanation TEXT,
      orderIndex INT DEFAULT 0,
      FOREIGN KEY (testId) REFERENCES aptitudeTests(id) ON DELETE CASCADE,
      INDEX idx_test (testId)
    ) ENGINE=InnoDB
  `);

  // 10. aptitudeTestAttempts
  await connection.query(`
    CREATE TABLE IF NOT EXISTS aptitudeTestAttempts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      testId INT NOT NULL,
      studentId INT NOT NULL,
      startedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completedAt DATETIME DEFAULT NULL,
      score INT DEFAULT 0,
      totalMarks INT DEFAULT 0,
      status ENUM('inProgress', 'completed', 'abandoned') DEFAULT 'inProgress',
      FOREIGN KEY (testId) REFERENCES aptitudeTests(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_student (studentId)
    ) ENGINE=InnoDB
  `);

  // 11. aptitudeAnswers
  await connection.query(`
    CREATE TABLE IF NOT EXISTS aptitudeAnswers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      attemptId INT NOT NULL,
      questionId INT NOT NULL,
      selectedOption ENUM('A', 'B', 'C', 'D') DEFAULT NULL,
      isCorrect TINYINT(1) DEFAULT 0,
      FOREIGN KEY (attemptId) REFERENCES aptitudeTestAttempts(id) ON DELETE CASCADE,
      FOREIGN KEY (questionId) REFERENCES aptitudeQuestions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);

  // 12. codingProblems
  await connection.query(`
    CREATE TABLE IF NOT EXISTS codingProblems (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mentorId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'easy',
      category VARCHAR(100) DEFAULT NULL,
      inputFormat TEXT,
      outputFormat TEXT,
      constraints TEXT,
      sampleInput TEXT,
      sampleOutput TEXT,
      boilerplate TEXT DEFAULT NULL,
      testCases JSON DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (mentorId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_mentor (mentorId),
      INDEX idx_difficulty (difficulty)
    ) ENGINE=InnoDB
  `);

  // 12b. gameChallenges — stores coding challenges + game card data for Learning Games
  await connection.query(`
    CREATE TABLE IF NOT EXISTS gameChallenges (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(100) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      boilerplate TEXT,
      hint TEXT,
      testCases JSON DEFAULT NULL,
      gameType VARCHAR(50) NOT NULL,
      gameTitle VARCHAR(255) NOT NULL,
      gameDescription VARCHAR(500),
      gameIcon VARCHAR(100),
      gameColor VARCHAR(100),
      gameAlgorithm VARCHAR(100),
      difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
      sortOrder INT DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB
  `);

  // 12c. gameUnlocks — tracks which games a student has unlocked
  await connection.query(`
    CREATE TABLE IF NOT EXISTS gameUnlocks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      challengeSlug VARCHAR(100) NOT NULL,
      unlockedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_student_challenge (studentId, challengeSlug),
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);

  // 13. codingSubmissions
  await connection.query(`
    CREATE TABLE IF NOT EXISTS codingSubmissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      problemId INT NOT NULL,
      studentId INT NOT NULL,
      code TEXT NOT NULL,
      language VARCHAR(50) DEFAULT 'javascript',
      status ENUM('pending', 'accepted', 'wrongAnswer', 'runtimeError', 'timeLimitExceeded') DEFAULT 'pending',
      executionTime INT DEFAULT NULL COMMENT 'in ms',
      memory INT DEFAULT NULL COMMENT 'in KB',
      submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (problemId) REFERENCES codingProblems(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_student (studentId),
      INDEX idx_problem (problemId)
    ) ENGINE=InnoDB
  `);

  // 14. events
  await connection.query(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mentorId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      eventType ENUM('webinar', 'workshop', 'liveSession', 'hackathon', 'other') DEFAULT 'liveSession',
      startDate DATETIME NOT NULL,
      endDate DATETIME NOT NULL,
      location VARCHAR(500) DEFAULT NULL COMMENT 'URL or physical location',
      maxParticipants INT DEFAULT 100,
      isPublished TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (mentorId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_mentor (mentorId)
    ) ENGINE=InnoDB
  `);

  // 15. eventRegistrations
  await connection.query(`
    CREATE TABLE IF NOT EXISTS eventRegistrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      eventId INT NOT NULL,
      studentId INT NOT NULL,
      registeredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status ENUM('registered', 'attended', 'cancelled') DEFAULT 'registered',
      FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_registration (eventId, studentId)
    ) ENGINE=InnoDB
  `);

  // 16. discussions
  await connection.query(`
    CREATE TABLE IF NOT EXISTS discussions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT DEFAULT NULL,
      userId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_course (courseId)
    ) ENGINE=InnoDB
  `);

  // 17. discussionReplies
  await connection.query(`
    CREATE TABLE IF NOT EXISTS discussionReplies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      discussionId INT NOT NULL,
      userId INT NOT NULL,
      content TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (discussionId) REFERENCES discussions(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);

  // 18. studyMaterials
  await connection.query(`
    CREATE TABLE IF NOT EXISTS studyMaterials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT DEFAULT NULL,
      mentorId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      fileUrl VARCHAR(500) DEFAULT NULL,
      fileType VARCHAR(50) DEFAULT NULL,
      category VARCHAR(100) DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE SET NULL,
      FOREIGN KEY (mentorId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_course (courseId)
    ) ENGINE=InnoDB
  `);

  // 19. grades
  await connection.query(`
    CREATE TABLE IF NOT EXISTS grades (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      courseId INT DEFAULT NULL,
      assignmentId INT DEFAULT NULL,
      testId INT DEFAULT NULL,
      gradeType ENUM('assignment', 'aptitude', 'course', 'overall') DEFAULT 'assignment',
      score DECIMAL(8,2) DEFAULT 0,
      maxScore DECIMAL(8,2) DEFAULT 100,
      percentage DECIMAL(5,2) DEFAULT 0,
      gradedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE SET NULL,
      FOREIGN KEY (assignmentId) REFERENCES assignments(id) ON DELETE SET NULL,
      FOREIGN KEY (testId) REFERENCES aptitudeTests(id) ON DELETE SET NULL,
      INDEX idx_student (studentId)
    ) ENGINE=InnoDB
  `);

  // 20. notifications
  await connection.query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      message TEXT,
      type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
      isRead TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user (userId),
      INDEX idx_unread (userId, isRead)
    ) ENGINE=InnoDB
  `);

  // 21. systemSettings
  await connection.query(`
    CREATE TABLE IF NOT EXISTS systemSettings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      settingKey VARCHAR(100) NOT NULL UNIQUE,
      settingValue TEXT,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB
  `);

  // 22. activityLogs
  await connection.query(`
    CREATE TABLE IF NOT EXISTS activityLogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT DEFAULT NULL,
      action VARCHAR(100) NOT NULL,
      description TEXT,
      ipAddress VARCHAR(45) DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_user (userId),
      INDEX idx_created (createdAt)
    ) ENGINE=InnoDB
  `);

  // 23. profileRequests — student edit/delete account requests
  await connection.query(`
    CREATE TABLE IF NOT EXISTS profileRequests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      type ENUM('edit', 'delete') NOT NULL,
      requestData JSON DEFAULT NULL,
      reason TEXT DEFAULT NULL,
      status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
      adminNote TEXT DEFAULT NULL,
      reviewedBy INT DEFAULT NULL,
      reviewedAt DATETIME DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (reviewedBy) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_student (studentId),
      INDEX idx_status (status),
      INDEX idx_type (type)
    ) ENGINE=InnoDB
  `);

  // 24. contactMessages
  await connection.query(`
    CREATE TABLE IF NOT EXISTS contactMessages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20) DEFAULT NULL,
      subject VARCHAR(255) DEFAULT NULL,
      message TEXT NOT NULL,
      isRead TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_unread (isRead)
    ) ENGINE=InnoDB
  `);

  // 27. doubts
  await connection.query(`
    CREATE TABLE IF NOT EXISTS doubts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      courseId INT DEFAULT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status ENUM('open', 'in-progress', 'resolved', 'closed') DEFAULT 'open',
      assignedMentorId INT DEFAULT NULL,
      priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE SET NULL,
      FOREIGN KEY (assignedMentorId) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_student (studentId),
      INDEX idx_mentor (assignedMentorId),
      INDEX idx_status (status)
    ) ENGINE=InnoDB
  `);

  // 28. doubtReplies
  await connection.query(`
    CREATE TABLE IF NOT EXISTS doubtReplies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      doubtId INT NOT NULL,
      userId INT NOT NULL,
      content TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (doubtId) REFERENCES doubts(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);

  console.log('✅ All 28 tables created successfully');

  // ──────────────── ALTER for existing databases ────────────────
  // These run safely even if columns already exist
  const alterQueries = [
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS courseCode VARCHAR(50) DEFAULT NULL AFTER title",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS thumbnail VARCHAR(500) DEFAULT NULL AFTER image",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS syllabus VARCHAR(500) DEFAULT NULL AFTER thumbnail",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS courseType ENUM('theory', 'practical', 'lab') DEFAULT 'theory' AFTER category",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS semester VARCHAR(20) DEFAULT NULL AFTER difficulty",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS regulation VARCHAR(50) DEFAULT NULL AFTER semester",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS academicYear VARCHAR(20) DEFAULT NULL AFTER regulation",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS status ENUM('draft', 'pending', 'active', 'rejected', 'inactive') DEFAULT 'draft' AFTER isPublished",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS approvedBy INT DEFAULT NULL AFTER status",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS approvedAt DATETIME DEFAULT NULL AFTER approvedBy",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS rejectionReason TEXT DEFAULT NULL AFTER approvedAt",
    "ALTER TABLE courseEnrollments ADD COLUMN IF NOT EXISTS completedTopics JSON DEFAULT ('[]') AFTER status",
  ];

  for (const q of alterQueries) {
    try { await connection.query(q); } catch (e) { /* column may already exist */ }
  }
  console.log('✅ Schema migrations applied');

  // ──────────────────── SEED DATA ────────────────────

  // Hash password
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const mentorPassword = await bcrypt.hash('Mentor@123', 10);
  const studentPassword = await bcrypt.hash('Student@123', 10);

  // Seed Admin User
  await connection.query(`
    INSERT IGNORE INTO users (email, username, fullName, password, phone, countryCode, role, isVerified, isActive)
    VALUES ('admin@sowberry.com', 'sowadmin', 'Sowmiya Admin', ?, '8825756388', '+91', 'admin', 1, 1)
  `, [hashedPassword]);

  // Seed Mentors
  const mentors = [
    ['mentor1@sowberry.com', 'jayanthan_m', 'Jayanthan S', '8825756381', 'mentor'],
    ['mentor2@sowberry.com', 'prithika_m', 'Prithika K', '8825756382', 'mentor'],
    ['mentor3@sowberry.com', 'sreelekha_m', 'Sreelekha S', '8825756383', 'mentor'],
  ];

  for (const m of mentors) {
    await connection.query(`
      INSERT IGNORE INTO users (email, username, fullName, password, phone, countryCode, role, isVerified, isActive)
      VALUES (?, ?, ?, ?, ?, '+91', ?, 1, 1)
    `, [m[0], m[1], m[2], mentorPassword, m[3], m[4]]);
  }

  // Seed Students
  const students = [
    ['student1@sowberry.com', 'aarav_s', 'Aarav Kumar', '9442556781'],
    ['student2@sowberry.com', 'diya_s', 'Diya Sharma', '9442556782'],
    ['student3@sowberry.com', 'arjun_s', 'Arjun Patel', '9442556783'],
    ['student4@sowberry.com', 'ananya_s', 'Ananya Roy', '9442556784'],
    ['student5@sowberry.com', 'rohan_s', 'Rohan Singh', '9442556785'],
  ];

  for (const s of students) {
    await connection.query(`
      INSERT IGNORE INTO users (email, username, fullName, password, phone, countryCode, role, isVerified, isActive)
      VALUES (?, ?, ?, ?, ?, '+91', 'student', 1, 1)
    `, [s[0], s[1], s[2], studentPassword, s[3]]);
  }

  console.log('✅ Seed users created');
  console.log('   Admin:   admin@sowberry.com / Admin@123');
  console.log('   Mentor:  mentor1@sowberry.com / Mentor@123');
  console.log('   Student: student1@sowberry.com / Student@123');

  // Seed Courses
  const [mentorRows] = await connection.query(`SELECT id FROM users WHERE role = 'mentor' LIMIT 3`);

  if (mentorRows.length > 0) {
    const seedCourses = [
      ['Web Development Bootcamp', 'CS101', 'Master HTML, CSS, JavaScript and modern frameworks to build responsive websites.', '8 weeks', mentorRows[0].id, 'Web Development', 'theory', 'beginner', '1', 1, 'active', 4.8],
      ['Data Science Fundamentals', 'DS201', 'Learn statistics, Python, data analysis, machine learning and visualization tools.', '12 weeks', mentorRows[0].id, 'Data Science', 'theory', 'intermediate', '3', 1, 'active', 4.0],
      ['Digital Marketing Masterclass', 'MK101', 'Comprehensive training in SEO, social media, email, content marketing and analytics.', '6 weeks', mentorRows[1 % mentorRows.length].id, 'Marketing', 'theory', 'beginner', '1', 1, 'active', 4.9],
      ['UI/UX Design Essentials', 'DG301', 'Master user interface design principles and create stunning, user-friendly digital experiences.', '10 weeks', mentorRows[1 % mentorRows.length].id, 'Design', 'practical', 'intermediate', '4', 1, 'active', 4.6],
      ['Mobile App Development', 'CS401', 'Build native iOS and Android applications using React Native and modern mobile frameworks.', '14 weeks', mentorRows[2 % mentorRows.length].id, 'Mobile Development', 'lab', 'advanced', '6', 1, 'active', 4.3],
      ['Cybersecurity Fundamentals', 'CY201', 'Learn to identify vulnerabilities, implement security measures, and protect digital assets.', '12 weeks', mentorRows[2 % mentorRows.length].id, 'Cybersecurity', 'theory', 'intermediate', '3', 1, 'active', 5.0],
    ];

    for (const c of seedCourses) {
      await connection.query(`
        INSERT IGNORE INTO courses (title, courseCode, description, duration, mentorId, category, courseType, difficulty, semester, isPublished, status, rating)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, c);
    }

    // Seed enrollments
    const [studentRows] = await connection.query(`SELECT id FROM users WHERE role = 'student'`);
    const [courseRows] = await connection.query(`SELECT id FROM courses`);

    if (studentRows.length > 0 && courseRows.length > 0) {
      for (let i = 0; i < studentRows.length; i++) {
        const studentId = studentRows[i].id;
        // Enroll each student in 2-3 courses
        for (let j = 0; j <= (i % 3); j++) {
          const courseId = courseRows[j % courseRows.length].id;
          const completion = Math.floor(Math.random() * 80) + 10;
          await connection.query(`
            INSERT IGNORE INTO courseEnrollments (courseId, studentId, completionPercentage, status)
            VALUES (?, ?, ?, 'active')
          `, [courseId, studentId, completion]);
        }
      }
    }

    // Seed Assignments
    if (courseRows.length > 0) {
      const assignments = [
        [courseRows[0].id, mentorRows[0].id, 'Build a Landing Page', 'Create a responsive landing page using HTML and CSS', '2026-03-01 23:59:59', 100, 1],
        [courseRows[0].id, mentorRows[0].id, 'JavaScript Todo App', 'Build an interactive todo application with vanilla JS', '2026-03-15 23:59:59', 100, 1],
        [courseRows[1 % courseRows.length].id, mentorRows[0].id, 'Data Analysis Project', 'Analyze the provided dataset using Python pandas', '2026-03-10 23:59:59', 100, 1],
      ];

      for (const a of assignments) {
        await connection.query(`
          INSERT IGNORE INTO assignments (courseId, mentorId, title, description, dueDate, maxScore, isPublished)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, a);
      }
    }

    // Seed Aptitude Tests
    const aptitudeTests = [
      [mentorRows[0].id, 'Logical Reasoning Test', 'Test your logical thinking and reasoning abilities', 30, 10, 10, 1],
      [mentorRows[0].id, 'Quantitative Aptitude', 'Numerical ability and mathematical reasoning', 45, 15, 15, 1],
    ];

    for (const t of aptitudeTests) {
      await connection.query(`
        INSERT IGNORE INTO aptitudeTests (mentorId, title, description, duration, totalQuestions, totalMarks, isPublished)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, t);
    }

    // Seed questions for first test
    const [testRows] = await connection.query(`SELECT id FROM aptitudeTests LIMIT 1`);
    if (testRows.length > 0) {
      const questions = [
        [testRows[0].id, 'What comes next in the series: 2, 6, 12, 20, ?', '28', '30', '32', '36', 'B', 1, 'Differences: 4, 6, 8, 10. Next: 20+10=30', 1],
        [testRows[0].id, 'If A = 1, B = 2, ..., Z = 26, what is the sum of HELLO?', '50', '52', '48', '46', 'B', 1, 'H=8, E=5, L=12, L=12, O=15 => 52', 2],
        [testRows[0].id, 'Which number is odd one out: 2, 5, 11, 17, 23, 29, 30?', '5', '23', '30', '29', 'C', 1, '30 is not a prime number', 3],
      ];

      for (const q of questions) {
        await connection.query(`
          INSERT IGNORE INTO aptitudeQuestions (testId, question, optionA, optionB, optionC, optionD, correctOption, marks, explanation, orderIndex)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, q);
      }
    }

    // Seed Coding Problems
    const codingProblems = [
      [mentorRows[0].id, 'Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.', 'easy', 'Arrays', 'An array of integers and a target integer', 'Two indices', 'Array length 2 to 10^4', '[2,7,11,15]\n9', '[0,1]', JSON.stringify([{input: '[2,7,11,15]\n9', output: '[0,1]'}, {input: '[3,2,4]\n6', output: '[1,2]'}])],
      [mentorRows[0].id, 'Palindrome Check', 'Given a string, determine if it is a palindrome.', 'easy', 'Strings', 'A string', 'true or false', 'String length 1 to 10^5', 'racecar', 'true', JSON.stringify([{input: 'racecar', output: 'true'}, {input: 'hello', output: 'false'}])],
    ];

    for (const p of codingProblems) {
      await connection.query(`
        INSERT IGNORE INTO codingProblems (mentorId, title, description, difficulty, category, inputFormat, outputFormat, constraints, sampleInput, sampleOutput, testCases)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, p);
    }

    // Seed Events
    const seedEvents = [
      [mentorRows[0].id, 'React Masterclass', 'Deep dive into React hooks, context, and advanced patterns', 'webinar', '2026-03-01 10:00:00', '2026-03-01 12:00:00', 'https://meet.sowberry.com/react-masterclass', 200, 1],
      [mentorRows[1 % mentorRows.length].id, 'Design Thinking Workshop', 'Learn design thinking methodology for solving complex UX problems', 'workshop', '2026-03-05 14:00:00', '2026-03-05 17:00:00', 'https://meet.sowberry.com/design-workshop', 50, 1],
    ];

    for (const e of seedEvents) {
      await connection.query(`
        INSERT IGNORE INTO events (mentorId, title, description, eventType, startDate, endDate, location, maxParticipants, isPublished)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, e);
    }

    // Seed Discussions
    await connection.query(`
      INSERT IGNORE INTO discussions (courseId, userId, title, content)
      VALUES (?, ?, 'Welcome to Web Development!', 'Feel free to ask any questions about the course content here.')
    `, [courseRows[0].id, mentorRows[0].id]);

    // Seed Study Materials
    await connection.query(`
      INSERT IGNORE INTO studyMaterials (courseId, mentorId, title, description, fileType, category)
      VALUES (?, ?, 'HTML & CSS Basics Guide', 'Comprehensive reference guide for HTML tags and CSS properties', 'pdf', 'Reference')
    `, [courseRows[0].id, mentorRows[0].id]);

    // Seed Course Subjects & Content (Azhagii-style)
    if (courseRows.length >= 2) {
      // Add subjects for first course (Web Development Bootcamp)
      await connection.query(`
        INSERT IGNORE INTO courseSubjects (courseId, title, code, description, sortOrder)
        VALUES (?, 'HTML Fundamentals', 'U1', 'Learn the building blocks of web pages', 1)
      `, [courseRows[0].id]);
      await connection.query(`
        INSERT IGNORE INTO courseSubjects (courseId, title, code, description, sortOrder)
        VALUES (?, 'CSS Styling', 'U2', 'Master CSS for beautiful layouts and designs', 2)
      `, [courseRows[0].id]);
      await connection.query(`
        INSERT IGNORE INTO courseSubjects (courseId, title, code, description, sortOrder)
        VALUES (?, 'JavaScript Basics', 'U3', 'Introduction to programming with JavaScript', 3)
      `, [courseRows[0].id]);

      const [subjectRows] = await connection.query('SELECT id FROM courseSubjects WHERE courseId = ? ORDER BY sortOrder', [courseRows[0].id]);

      if (subjectRows.length >= 3) {
        // Topics for HTML unit
        await connection.query(`INSERT IGNORE INTO courseTopics (subjectId, title, description, sortOrder) VALUES (?, 'Introduction to HTML', 'What is HTML and how the web works', 1)`, [subjectRows[0].id]);
        await connection.query(`INSERT IGNORE INTO courseTopics (subjectId, title, description, sortOrder) VALUES (?, 'HTML Tags & Elements', 'Common HTML tags and their usage', 2)`, [subjectRows[0].id]);
        await connection.query(`INSERT IGNORE INTO courseTopics (subjectId, title, description, sortOrder) VALUES (?, 'Forms & Tables', 'Creating forms and tables in HTML', 3)`, [subjectRows[0].id]);

        // Topics for CSS unit 
        await connection.query(`INSERT IGNORE INTO courseTopics (subjectId, title, description, sortOrder) VALUES (?, 'CSS Selectors & Properties', 'How to target and style HTML elements', 1)`, [subjectRows[1].id]);
        await connection.query(`INSERT IGNORE INTO courseTopics (subjectId, title, description, sortOrder) VALUES (?, 'Flexbox & Grid', 'Modern CSS layout techniques', 2)`, [subjectRows[1].id]);

        // Content for HTML unit
        await connection.query(`
          INSERT IGNORE INTO courseContent (courseId, subjectId, title, description, contentType, contentData, sortOrder, status, uploadedBy)
          VALUES (?, ?, 'Introduction to HTML', 'Watch this introductory video about HTML basics', 'video', 'https://www.youtube.com/watch?v=qz0aGYrrlhU', 1, 'active', ?)
        `, [courseRows[0].id, subjectRows[0].id, mentorRows[0].id]);
        await connection.query(`
          INSERT IGNORE INTO courseContent (courseId, subjectId, title, description, contentType, contentData, sortOrder, status, uploadedBy)
          VALUES (?, ?, 'HTML Elements Reference', 'Complete reference of all HTML5 elements and their attributes', 'text', 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. Every HTML page has a structure that includes DOCTYPE, html, head, and body tags. Common elements include headings (h1-h6), paragraphs (p), links (a), images (img), and divs.', 2, 'active', ?)
        `, [courseRows[0].id, subjectRows[0].id, mentorRows[0].id]);

        // Content for CSS unit
        await connection.query(`
          INSERT IGNORE INTO courseContent (courseId, subjectId, title, description, contentType, contentData, sortOrder, status, uploadedBy)
          VALUES (?, ?, 'CSS Crash Course', 'Complete CSS tutorial from basics to advanced', 'video', 'https://www.youtube.com/watch?v=yfoY53QXEnI', 1, 'active', ?)
        `, [courseRows[0].id, subjectRows[1].id, mentorRows[0].id]);
      }
    }
  }

  // Seed System Settings
  const settings = [
    ['siteName', 'Sowberry Academy'],
    ['siteEmail', 'berries@sowberry.com'],
    ['sitePhone', '+91 8825756388'],
    ['maxFileUploadSize', '10'],
    ['maintenanceMode', 'false'],
    ['studentRegistration', 'true'],
    ['mentorRegistration', 'true'],
  ];

  for (const s of settings) {
    await connection.query(`
      INSERT IGNORE INTO systemSettings (settingKey, settingValue) VALUES (?, ?)
    `, s);
  }

  console.log('✅ Seed data inserted');
  console.log('');
  console.log('🌱 Sowberry database setup complete!');
  console.log('─────────────────────────────────────');
  console.log('Database: sowberry');
  console.log('Tables: 28');
  console.log('');
  console.log('Login Credentials:');
  console.log('  Admin:   admin@sowberry.com    / Admin@123');
  console.log('  Mentor:  mentor1@sowberry.com  / Mentor@123');
  console.log('  Student: student1@sowberry.com / Student@123');

  await connection.end();
  process.exit(0);
}

setup().catch(err => {
  console.error('❌ Setup failed:', err.message);
  process.exit(1);
});
