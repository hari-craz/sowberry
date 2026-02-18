import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal, { getSwalOpts } from '../utils/swal';
import { useAuth } from '../context/AuthContext';

const studentNav = [
  { path: '/student', icon: 'ri-dashboard-line', label: 'Dashboard' },
  { path: '/student/my-courses', icon: 'ri-book-open-line', label: 'My Courses' },
  { path: '/student/my-assignments', icon: 'ri-task-line', label: 'Assignments' },
  { path: '/student/my-doubts', icon: 'ri-chat-3-line', label: 'My Doubts' },
  { path: '/student/my-grades', icon: 'ri-bar-chart-box-line', label: 'My Grades' },
  { path: '/student/my-progress', icon: 'ri-line-chart-line', label: 'My Progress' },
  { path: '/student/coding-practice', icon: 'ri-code-s-slash-line', label: 'Coding Practice' },
  { path: '/student/code-editor', icon: 'ri-terminal-box-line', label: 'Code Editor' },
  { path: '/student/aptitude-tests', icon: 'ri-question-answer-line', label: 'Aptitude Tests' },
  { path: '/student/study-material', icon: 'ri-file-text-line', label: 'Study Material' },
  { path: '/student/learning-games', icon: 'ri-gamepad-line', label: 'Learning Games' },
];

const mentorNav = [
  { path: '/mentor', icon: 'ri-dashboard-line', label: 'Dashboard' },
  { path: '/mentor/new-assignments', icon: 'ri-task-line', label: 'Assignments' },
  { path: '/mentor/doubts', icon: 'ri-chat-3-line', label: 'Student Doubts' },
  { path: '/mentor/students-progress', icon: 'ri-line-chart-line', label: 'Student Progress' },
];

const DashboardLayout = ({ children, pageTitle, role = 'student' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const profileRef = useRef(null);

  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme || 'light');

  useEffect(() => {
    if (theme === 'dark-theme') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark-theme' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', newTheme);
  };

  const navItems = role === 'mentor' ? mentorNav : studentNav;

  const handleSignOut = () => {
    Swal.fire({ ...getSwalOpts(), title: 'Sign Out?', text: 'Are you sure you want to sign out?', icon: 'question',
      showCancelButton: true, confirmButtonColor: '#d4a574', confirmButtonText: 'Yes, sign out'}).then(result => {
      if (result.isConfirmed) { logout(); navigate('/auth'); }
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-cream dark-theme:bg-gray-950">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-gray-950 dark-theme:bg-gray-900 flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
            <i className="ri-seedling-fill text-primary-light text-lg"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[15px] text-white leading-tight">Sowberry</span>
            <span className="text-[10px] font-medium tracking-wider text-gray-500 uppercase">{role === 'mentor' ? 'MENTOR' : 'STUDENT'}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150
                ${location.pathname === item.path
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              onClick={() => setSidebarOpen(false)}
            >
              <i className={`${item.icon} text-base`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
          {user?.role === 'admin' && role === 'mentor' && (
            <Link
              to="/admin"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-primary-light hover:bg-white/5 hover:text-white transition-all duration-150"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="ri-arrow-left-line text-base"></i>
              <span>Back to Admin</span>
            </Link>
          )}
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-all duration-150">
            <i className="ri-logout-box-line text-base"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white dark-theme:bg-gray-900 border-b border-sand dark-theme:border-gray-800 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 dark-theme:text-gray-400 hover:bg-cream-dark dark-theme:hover:bg-gray-800 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="ri-menu-line text-lg"></i>
            </button>
            <h2 className="text-[15px] font-semibold text-gray-800 dark-theme:text-gray-200">{pageTitle}</h2>
          </div>
          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark-theme:text-gray-400 hover:bg-cream-dark dark-theme:hover:bg-gray-800 hover:text-gray-700 dark-theme:hover:text-gray-200 transition-colors"
            >
              <i className={theme === 'dark-theme' ? 'ri-moon-line text-base' : 'ri-sun-line text-base'}></i>
            </button>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative ml-1">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-cream-dark dark-theme:hover:bg-gray-800 transition-colors"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || (role === 'mentor' ? 'Mentor' : 'Student'))}&size=28&background=c96442&color=fff&bold=true`}
                  alt="User"
                  className="w-7 h-7 rounded-md"
                />
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-[13px] font-medium text-gray-700 dark-theme:text-gray-200 leading-tight">{user?.fullName || (role === 'mentor' ? 'Mentor' : 'Student')}</span>
                  <span className="text-[10px] text-gray-400 capitalize">{role}</span>
                </div>
                <i className={`ri-arrow-down-s-line text-gray-400 text-sm hidden sm:block transition-transform ${profileOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-11 w-48 bg-white dark-theme:bg-gray-900 rounded-xl shadow-lg border border-sand dark-theme:border-gray-800 overflow-hidden z-50 py-1">
                  {/* User Info */}
                  <div className="px-3 py-2.5 border-b border-sand dark-theme:border-gray-800">
                    <p className="text-[13px] font-semibold text-gray-700 dark-theme:text-gray-200">{user?.fullName || (role === 'mentor' ? 'Mentor' : 'Student')}</p>
                    <p className="text-[11px] text-gray-400 truncate">{user?.email || ''}</p>
                  </div>
                  {/* Menu Items */}
                  <Link
                    to={role === 'mentor' ? '/mentor' : '/student'}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark-theme:text-gray-200 hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors"
                  >
                    <i className="ri-dashboard-line text-sm"></i> Dashboard
                  </Link>
                  <Link
                    to={role === 'mentor' ? '/mentor/profile' : '/student/profile'}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark-theme:text-gray-200 hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors"
                  >
                    <i className="ri-user-line text-sm"></i> My Profile
                  </Link>
                  {role === 'student' && (
                    <Link
                      to="/student/my-progress"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark-theme:text-gray-200 hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors"
                    >
                      <i className="ri-line-chart-line text-sm"></i> My Progress
                    </Link>
                  )}
                  {role === 'mentor' && (
                    <Link
                      to="/mentor/students-progress"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark-theme:text-gray-200 hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors"
                    >
                      <i className="ri-line-chart-line text-sm"></i> Student Progress
                    </Link>
                  )}
                  <div className="border-t border-sand dark-theme:border-gray-800 my-1"></div>
                  <button
                    onClick={() => { setProfileOpen(false); handleSignOut(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-danger hover:bg-danger/5 transition-colors"
                  >
                    <i className="ri-logout-box-line text-sm"></i> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
