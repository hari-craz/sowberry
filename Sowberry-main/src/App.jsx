import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import SessionManager from './components/SessionManager'

// Lazy-loaded pages — each gets a loading screen during code-split transitions
const Home = React.lazy(() => import('./pages/Home'))
const AuthPage = React.lazy(() => import('./pages/auth/AuthPage'))
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'))
const AdminSettings = React.lazy(() => import('./pages/admin/AdminSettings'))
const SystemReports = React.lazy(() => import('./pages/admin/SystemReports'))
const PerformanceAnalytics = React.lazy(() => import('./pages/admin/PerformanceAnalytics'))
const ManageStudents = React.lazy(() => import('./pages/admin/ManageStudents'))
const CoursesOverview = React.lazy(() => import('./pages/admin/CoursesOverview'))
const ManageMentors = React.lazy(() => import('./pages/admin/ManageMentors'))
const AdminProfile = React.lazy(() => import('./pages/admin/AdminProfile'))
const ManageRequests = React.lazy(() => import('./pages/admin/ManageRequests'))
const MentorDashboard = React.lazy(() => import('./pages/mentor/MentorDashboard'))
const MentorDoubts = React.lazy(() => import('./pages/mentor/Doubts'))
const NewProblemSolving = React.lazy(() => import('./pages/mentor/NewProblemSolving'))
const StudentsProgress = React.lazy(() => import('./pages/mentor/StudentsProgress'))
const NewEvents = React.lazy(() => import('./pages/mentor/NewEvents'))
const NewAptitude = React.lazy(() => import('./pages/mentor/NewAptitude'))
const NewAssignments = React.lazy(() => import('./pages/mentor/NewAssignments'))
const MentorDiscussion = React.lazy(() => import('./pages/mentor/MentorDiscussion'))
const MentorProfile = React.lazy(() => import('./pages/mentor/MentorProfile'))
const StudentDashboard = React.lazy(() => import('./pages/student/StudentDashboard'))
const LearningGames = React.lazy(() => import('./pages/student/LearningGames'))
const StudyMaterial = React.lazy(() => import('./pages/student/StudyMaterial'))
const MyCourses = React.lazy(() => import('./pages/student/MyCourses'))
const CodingPractice = React.lazy(() => import('./pages/student/CodingPractice'))
const AptitudeTests = React.lazy(() => import('./pages/student/AptitudeTests'))
const AptitudeResult = React.lazy(() => import('./pages/student/AptitudeResult'))
const CodeEditor = React.lazy(() => import('./pages/student/CodeEditor'))
const MyAssignments = React.lazy(() => import('./pages/student/MyAssignments'))
const MyGrades = React.lazy(() => import('./pages/student/MyGrades'))
const MyProgress = React.lazy(() => import('./pages/student/MyProgress'))
const CourseViewer = React.lazy(() => import('./pages/student/CourseViewer'))
const MyDoubts = React.lazy(() => import('./pages/student/MyDoubts'))
const StudentProfile = React.lazy(() => import('./pages/student/StudentProfile'))

// Error Boundary to catch runtime errors and show a visible message
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('React Error Boundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '40px auto' }}>
          <h1 style={{ color: '#c96442', fontSize: '24px', marginBottom: '16px' }}>Something went wrong</h1>
          <p style={{ color: '#666', marginBottom: '12px' }}>The application encountered an error. Please try refreshing the page.</p>
          <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto', color: '#e8e8e8' }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '16px', padding: '10px 24px', background: '#c96442', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/auth" replace />;
  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <Router basename="/">
        <AuthProvider>
          <SessionManager />
          <Suspense fallback={null}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/system-reports" element={<ProtectedRoute allowedRoles={['admin']}><SystemReports /></ProtectedRoute>} />
          <Route path="/admin/performance-analytics" element={<ProtectedRoute allowedRoles={['admin']}><PerformanceAnalytics /></ProtectedRoute>} />
          <Route path="/admin/manage-students" element={<ProtectedRoute allowedRoles={['admin']}><ManageStudents /></ProtectedRoute>} />
          <Route path="/admin/courses-overview" element={<ProtectedRoute allowedRoles={['admin']}><CoursesOverview /></ProtectedRoute>} />
          <Route path="/admin/manage-mentors" element={<ProtectedRoute allowedRoles={['admin']}><ManageMentors /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><AdminProfile /></ProtectedRoute>} />
          <Route path="/admin/manage-requests" element={<ProtectedRoute allowedRoles={['admin']}><ManageRequests /></ProtectedRoute>} />
          
          {/* Mentor Routes */}
          <Route path="/mentor" element={<ProtectedRoute allowedRoles={['mentor']}><MentorDashboard /></ProtectedRoute>} />
          <Route path="/mentor/doubts" element={<ProtectedRoute allowedRoles={['mentor']}><MentorDoubts /></ProtectedRoute>} />
          <Route path="/mentor/students-progress" element={<ProtectedRoute allowedRoles={['mentor']}><StudentsProgress /></ProtectedRoute>} />
          <Route path="/mentor/profile" element={<ProtectedRoute allowedRoles={['mentor']}><MentorProfile /></ProtectedRoute>} />
          <Route path="/mentor/new-assignments" element={<ProtectedRoute allowedRoles={['mentor']}><NewAssignments /></ProtectedRoute>} />
          
          {/* Admin-accessible Mentor features (same pages, admin layout) */}
          <Route path="/admin/assignments" element={<ProtectedRoute allowedRoles={['admin']}><NewAssignments /></ProtectedRoute>} />
          <Route path="/admin/doubts" element={<ProtectedRoute allowedRoles={['admin']}><MentorDoubts /></ProtectedRoute>} />
          <Route path="/admin/students-progress" element={<ProtectedRoute allowedRoles={['admin']}><StudentsProgress /></ProtectedRoute>} />
          
          {/* Admin-only Content Management (moved from mentor) */}
          <Route path="/admin/problem-solving" element={<ProtectedRoute allowedRoles={['admin']}><NewProblemSolving /></ProtectedRoute>} />
          <Route path="/admin/aptitude" element={<ProtectedRoute allowedRoles={['admin']}><NewAptitude /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute allowedRoles={['admin']}><NewEvents /></ProtectedRoute>} />
          <Route path="/admin/discussion" element={<ProtectedRoute allowedRoles={['admin']}><MentorDiscussion /></ProtectedRoute>} />
          
          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/learning-games" element={<ProtectedRoute allowedRoles={['student']}><LearningGames /></ProtectedRoute>} />
          <Route path="/student/study-material" element={<ProtectedRoute allowedRoles={['student']}><StudyMaterial /></ProtectedRoute>} />
          <Route path="/student/my-courses" element={<ProtectedRoute allowedRoles={['student']}><MyCourses /></ProtectedRoute>} />
          <Route path="/student/coding-practice" element={<ProtectedRoute allowedRoles={['student']}><CodingPractice /></ProtectedRoute>} />
          <Route path="/student/aptitude-tests" element={<ProtectedRoute allowedRoles={['student']}><AptitudeTests /></ProtectedRoute>} />
          <Route path="/student/aptitude-tests/result/:attemptId" element={<ProtectedRoute allowedRoles={['student']}><AptitudeResult /></ProtectedRoute>} />
          <Route path="/student/code-editor" element={<ProtectedRoute allowedRoles={['student']}><CodeEditor /></ProtectedRoute>} />
          <Route path="/student/my-assignments" element={<ProtectedRoute allowedRoles={['student']}><MyAssignments /></ProtectedRoute>} />
          <Route path="/student/my-grades" element={<ProtectedRoute allowedRoles={['student']}><MyGrades /></ProtectedRoute>} />
          <Route path="/student/my-progress" element={<ProtectedRoute allowedRoles={['student']}><MyProgress /></ProtectedRoute>} />
          <Route path="/student/my-doubts" element={<ProtectedRoute allowedRoles={['student']}><MyDoubts /></ProtectedRoute>} />
          <Route path="/student/course-viewer/:id" element={<ProtectedRoute allowedRoles={['student']}><CourseViewer /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><StudentProfile /></ProtectedRoute>} />
        </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
    </ErrorBoundary>
  )
}

export default App
