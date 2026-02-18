import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
dotenv.config();

// Route imports
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import mentorRoutes from './routes/mentor.js';
import studentRoutes from './routes/student.js';
import publicRoutes from './routes/public.js';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ──────────────── MIDDLEWARE ────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logger (development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });
}

// ──────────────── ROUTES ────────────────
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/mentor', mentorRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/public', publicRoutes);

// ──────────────── API UI TEMPLATE ────────────────
const apiUIPage = () => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  const uptimeStr = `${hours}h ${minutes}m ${seconds}s`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sowberry API</title>
  <link href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" rel="stylesheet"/>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #f9f6f1; color: #1a1a1a; min-height: 100vh; }
    .container { max-width: 960px; margin: 0 auto; padding: 40px 24px 60px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { display: inline-flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .logo-icon { width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, #c96442, #a78058); display: flex; align-items: center; justify-content: center; }
    .logo-icon i { font-size: 24px; color: #fff; }
    .logo-text { font-size: 28px; font-weight: 700; color: #1a1a1a; }
    .logo-text span { background: linear-gradient(135deg, #c96442, #a78058); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
    .badge-live { background: #e6f9ee; color: #1a7a3a; }
    .badge-live .dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    .subtitle { color: #6b6b69; font-size: 15px; max-width: 500px; margin: 0 auto; line-height: 1.6; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 32px; }
    .stat-card { background: #fff; border: 1px solid #e8e0d4; border-radius: 14px; padding: 18px; text-align: center; }
    .stat-value { font-size: 20px; font-weight: 700; color: #c96442; }
    .stat-label { font-size: 11px; color: #8b8b89; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; font-weight: 500; }
    .section-title { font-size: 13px; font-weight: 600; color: #8b8b89; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; padding-left: 2px; }
    .endpoints { display: grid; gap: 10px; margin-bottom: 36px; }
    .endpoint { background: #fff; border: 1px solid #e8e0d4; border-radius: 14px; padding: 18px 20px; display: flex; align-items: flex-start; gap: 14px; transition: all 0.15s; }
    .endpoint:hover { border-color: #c96442; box-shadow: 0 2px 12px rgba(201, 100, 66, 0.08); }
    .ep-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .ep-icon i { font-size: 18px; }
    .ep-title { font-size: 15px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
    .ep-path { font-size: 12px; font-weight: 500; color: #c96442; font-family: 'SF Mono', 'Fira Code', monospace; margin-bottom: 6px; }
    .ep-desc { font-size: 13px; color: #6b6b69; line-height: 1.5; }
    .ep-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }
    .ep-tag { font-size: 10px; font-weight: 500; padding: 3px 8px; border-radius: 6px; background: #f0ebe3; color: #6b6b69; }
    .auth { background: #fef3ee; } .auth .ep-icon { background: #fde8d8; } .auth .ep-icon i { color: #c96442; }
    .admin { background: #f0f5ff; } .admin .ep-icon { background: #dbe8ff; } .admin .ep-icon i { color: #4b7bec; }
    .mentor { background: #f0faf4; } .mentor .ep-icon { background: #d4f0de; } .mentor .ep-icon i { color: #22a355; }
    .student { background: #fef9ee; } .student .ep-icon { background: #fef0d0; } .student .ep-icon i { color: #d4a843; }
    .public { background: #f8f0fa; } .public .ep-icon { background: #eeddf5; } .public .ep-icon i { color: #9b59b6; }
    .footer { text-align: center; padding-top: 24px; border-top: 1px solid #e8e0d4; }
    .footer p { font-size: 12px; color: #a8a8a6; }
    .footer a { color: #c96442; text-decoration: none; font-weight: 500; }
    .footer a:hover { text-decoration: underline; }
    .try-btn { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; color: #c96442; background: rgba(201,100,66,0.08); padding: 4px 10px; border-radius: 6px; text-decoration: none; margin-top: 6px; transition: background 0.15s; }
    .try-btn:hover { background: rgba(201,100,66,0.15); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <div class="logo-icon"><i class="ri-seedling-fill"></i></div>
        <div class="logo-text">Sowberry <span>API</span></div>
      </div>
      <div>
        <span class="badge badge-live"><span class="dot"></span> Live &amp; Running</span>
      </div>
      <p class="subtitle">Backend API server for Sowberry Academy — powering learning management for students, mentors, and administrators.</p>
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">v1.0.0</div>
        <div class="stat-label">Version</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${uptimeStr}</div>
        <div class="stat-label">Uptime</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${PORT}</div>
        <div class="stat-label">Port</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${process.env.NODE_ENV || 'dev'}</div>
        <div class="stat-label">Environment</div>
      </div>
    </div>

    <div class="section-title">API Endpoints</div>
    <div class="endpoints">

      <div class="endpoint auth">
        <div class="ep-icon"><i class="ri-shield-keyhole-line"></i></div>
        <div>
          <div class="ep-title">Authentication</div>
          <div class="ep-path">/api/auth</div>
          <div class="ep-desc">User authentication, registration, password recovery, and profile management.</div>
          <div class="ep-tags">
            <span class="ep-tag">POST /login</span>
            <span class="ep-tag">POST /register</span>
            <span class="ep-tag">POST /forgot-password</span>
            <span class="ep-tag">POST /verify-otp</span>
            <span class="ep-tag">POST /reset-password</span>
            <span class="ep-tag">GET /me</span>
            <span class="ep-tag">PUT /profile</span>
            <span class="ep-tag">PUT /change-password</span>
          </div>
        </div>
      </div>

      <div class="endpoint admin">
        <div class="ep-icon"><i class="ri-admin-line"></i></div>
        <div>
          <div class="ep-title">Admin Panel</div>
          <div class="ep-path">/api/admin</div>
          <div class="ep-desc">Administrative controls for managing users, courses, analytics, reports, and system settings.</div>
          <div class="ep-tags">
            <span class="ep-tag">GET /dashboard</span>
            <span class="ep-tag">GET /students</span>
            <span class="ep-tag">GET /mentors</span>
            <span class="ep-tag">GET /courses</span>
            <span class="ep-tag">GET /analytics</span>
            <span class="ep-tag">GET /reports</span>
            <span class="ep-tag">GET /settings</span>
            <span class="ep-tag">GET /notifications</span>
            <span class="ep-tag">GET /contact-messages</span>
          </div>
        </div>
      </div>

      <div class="endpoint mentor">
        <div class="ep-icon"><i class="ri-user-star-line"></i></div>
        <div>
          <div class="ep-title">Mentor</div>
          <div class="ep-path">/api/mentor</div>
          <div class="ep-desc">Mentor tools for course creation, assignments, aptitude tests, events, and student tracking.</div>
          <div class="ep-tags">
            <span class="ep-tag">GET /dashboard</span>
            <span class="ep-tag">CRUD /courses</span>
            <span class="ep-tag">CRUD /assignments</span>
            <span class="ep-tag">GET /students-progress</span>
            <span class="ep-tag">CRUD /problems</span>
            <span class="ep-tag">CRUD /aptitude-tests</span>
            <span class="ep-tag">CRUD /events</span>
            <span class="ep-tag">CRUD /discussions</span>
            <span class="ep-tag">CRUD /study-materials</span>
          </div>
        </div>
      </div>

      <div class="endpoint student">
        <div class="ep-icon"><i class="ri-graduation-cap-line"></i></div>
        <div>
          <div class="ep-title">Student</div>
          <div class="ep-path">/api/student</div>
          <div class="ep-desc">Student portal for courses, assignments, grades, progress tracking, coding practice, and tests.</div>
          <div class="ep-tags">
            <span class="ep-tag">GET /dashboard</span>
            <span class="ep-tag">GET /courses</span>
            <span class="ep-tag">POST /enroll</span>
            <span class="ep-tag">GET /assignments</span>
            <span class="ep-tag">GET /grades</span>
            <span class="ep-tag">GET /progress</span>
            <span class="ep-tag">GET /coding-problems</span>
            <span class="ep-tag">GET /aptitude-tests</span>
            <span class="ep-tag">GET /study-materials</span>
            <span class="ep-tag">GET /notifications</span>
          </div>
        </div>
      </div>

      <div class="endpoint public">
        <div class="ep-icon"><i class="ri-global-line"></i></div>
        <div>
          <div class="ep-title">Public</div>
          <div class="ep-path">/api/public</div>
          <div class="ep-desc">Public-facing endpoints — no authentication required.</div>
          <div class="ep-tags">
            <span class="ep-tag">GET /courses</span>
            <span class="ep-tag">POST /contact</span>
            <span class="ep-tag">POST /newsletter</span>
          </div>
        </div>
      </div>

    </div>

    <div class="section-title">Quick Links</div>
    <div class="endpoints">
      <div class="endpoint" style="background:#fff;">
        <div class="ep-icon" style="background:#f0ebe3;"><i class="ri-heart-pulse-line" style="color:#c96442;"></i></div>
        <div>
          <div class="ep-title">Health Check</div>
          <div class="ep-path">GET /api/health</div>
          <div class="ep-desc">Verify the API server is running and responsive.</div>
          <a href="/api/health" class="try-btn"><i class="ri-external-link-line"></i> Try it</a>
        </div>
      </div>
      <div class="endpoint" style="background:#fff;">
        <div class="ep-icon" style="background:#f0ebe3;"><i class="ri-computer-line" style="color:#c96442;"></i></div>
        <div>
          <div class="ep-title">Frontend App</div>
          <div class="ep-path">http://localhost:5173</div>
          <div class="ep-desc">The Sowberry Academy web application for students, mentors, and admins.</div>
          <a href="http://localhost:5173" class="try-btn"><i class="ri-external-link-line"></i> Open App</a>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} <a href="http://localhost:5173">Sowberry Academy</a> &middot; API v1.0.0 &middot; ${new Date().toISOString()}</p>
    </div>
  </div>
</body>
</html>`;
};

// Root route
app.get('/', (req, res) => {
  if (req.headers.accept?.includes('application/json')) {
    return res.json({
      success: true,
      message: 'Sowberry API Server',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: { health: '/api/health', auth: '/api/auth', admin: '/api/admin', mentor: '/api/mentor', student: '/api/student', public: '/api/public' }
    });
  }
  res.send(apiUIPage());
});

// API root
app.get('/api', (req, res) => {
  if (req.headers.accept?.includes('application/json')) {
    return res.json({
      success: true,
      message: 'Sowberry API is running!',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        health: 'GET /api/health',
        auth: '/api/auth (login, register, forgot-password, verify-otp, reset-password, me, profile, change-password)',
        admin: '/api/admin (dashboard, students, mentors, courses, analytics, reports, settings, notifications, contact-messages)',
        mentor: '/api/mentor (dashboard, courses, assignments, students-progress, problems, aptitude-tests, events, discussions, study-materials)',
        student: '/api/student (dashboard, courses, assignments, grades, progress, coding-problems, aptitude-tests, study-materials, events, discussions, notifications)',
        public: '/api/public (courses, contact, newsletter)'
      }
    });
  }
  res.send(apiUIPage());
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Sowberry API is running!', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  console.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ──────────────── START SERVER ────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('🌱 ─────────────────────────────────────');
  console.log(`   Sowberry API Server`);
  console.log(`   Port: ${PORT}`);
  console.log(`   Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   API:  http://localhost:${PORT}/api`);
  console.log('🌱 ─────────────────────────────────────');
  console.log('');
});

export default app;
