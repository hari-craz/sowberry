import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { studentApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ enrolledCourses: 0, completedCourses: 0, pendingAssignments: 0, avgGrade: 0 });
  const [recentCourses, setRecentCourses] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await studentApi.getDashboard();
      if (res.success) {
        setStats(res.stats || stats);
        setRecentCourses(res.currentCourses || []);
        setUpcomingAssignments(res.upcomingAssignments || []);
      }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  const statCards = [
    { label: 'Enrolled Courses', value: stats.enrolledCourses, icon: 'ri-book-open-line', color: 'from-blue-500 to-blue-600' },
    { label: 'Completed', value: stats.completedCourses, icon: 'ri-check-double-line', color: 'from-green-500 to-green-600' },
    { label: 'Pending Tasks', value: stats.pendingAssignments, icon: 'ri-task-line', color: 'from-amber-500 to-amber-600' },
    { label: 'Avg Grade', value: `${stats.avgGrade}%`, icon: 'ri-bar-chart-box-line', color: 'from-purple-500 to-purple-600' },
  ];

  if (loading) return <DashboardLayout pageTitle="Dashboard" role="student"><div className="flex items-center justify-center py-20"><i className="ri-loader-4-line animate-spin text-2xl text-primary"></i></div></DashboardLayout>;

  return (
    <DashboardLayout pageTitle="Dashboard" role="student">
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold">Welcome back, {user?.fullName?.split(' ')[0] || 'Student'}! 👋</h1>
          <p className="text-white/80 text-sm mt-1">Keep up the learning momentum!</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <div key={i} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${s.color} flex items-center justify-center mb-3`}><i className={`${s.icon} text-white`}></i></div>
              <p className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800">
            <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 mb-4">Recent Courses</h3>
            {recentCourses.length === 0 ? <p className="text-sm text-gray-400 text-center py-6">No courses yet</p> :
            <div className="space-y-3">
              {recentCourses.slice(0, 5).map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-cream dark-theme:bg-gray-800 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><i className="ri-book-open-line text-primary text-sm"></i></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark-theme:text-gray-100 truncate">{c.title}</p>
                    <p className="text-[11px] text-gray-400">{c.mentorName || 'Mentor'}</p>
                  </div>
                  <div className="w-16">
                    <div className="w-full h-1.5 bg-gray-200 dark-theme:bg-gray-700 rounded-full"><div className="h-1.5 bg-primary rounded-full" style={{ width: `${c.progress || 0}%` }}></div></div>
                    <p className="text-[10px] text-gray-400 text-right mt-0.5">{c.progress || 0}%</p>
                  </div>
                </div>
              ))}
            </div>}
          </div>

          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800">
            <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 mb-4">Upcoming Assignments</h3>
            {upcomingAssignments.length === 0 ? <p className="text-sm text-gray-400 text-center py-6">No pending assignments</p> :
            <div className="space-y-3">
              {upcomingAssignments.slice(0, 5).map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-cream dark-theme:bg-gray-800 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark-theme:bg-amber-900/30 flex items-center justify-center"><i className="ri-task-line text-amber-600 text-sm"></i></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark-theme:text-gray-100 truncate">{a.title}</p>
                    <p className="text-[11px] text-gray-400">{a.courseName}</p>
                  </div>
                  <span className="text-[10px] text-red-500 font-medium">{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : 'No due'}</span>
                </div>
              ))}
            </div>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default StudentDashboard;
