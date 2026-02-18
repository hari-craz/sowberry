import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { mentorApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const MentorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await mentorApi.getDashboard();
      if (res.success) {
        setStats({ ...(res.stats || {}), recentSubmissions: res.recentSubmissions || [], upcomingEvents: res.upcomingEvents || [] });
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <DashboardLayout pageTitle="Dashboard" role="mentor">
      {loading ? null : (
        <div className="space-y-6">
          {/* Welcome */}
          <div className="bg-gray-950 rounded-2xl p-6 text-white">
            <h1 className="text-2xl font-bold mb-1">Welcome, <span className="text-primary-light">{user?.fullName || 'Mentor'}!</span></h1>
            <p className="text-white/60 text-sm">Here&apos;s an overview of your teaching activities</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'My Courses', value: stats?.totalCourses || 0, icon: 'ri-book-open-line', bg: 'bg-primary/10', tc: 'text-primary' },
              { label: 'My Students', value: stats?.totalStudents || 0, icon: 'ri-user-line', bg: 'bg-blue-500/10', tc: 'text-blue-500' },
              { label: 'Assignments', value: stats?.totalAssignments || 0, icon: 'ri-task-line', bg: 'bg-green-500/10', tc: 'text-green-500' },
              { label: 'Pending Reviews', value: stats?.pendingSubmissions || 0, icon: 'ri-time-line', bg: 'bg-amber-500/10', tc: 'text-amber-500' },
            ].map((s, i) => (
              <div key={i} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}><i className={`${s.icon} ${s.tc} text-lg`}></i></div>
                  <div><p className="text-xs text-gray-400">{s.label}</p><p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">{s.value}</p></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-4">Recent Submissions</h3>
              <div className="space-y-3">
                {(stats?.recentSubmissions || []).length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">No recent submissions</p>
                ) : stats.recentSubmissions.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><i className="ri-file-text-line text-primary text-sm"></i></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark-theme:text-gray-200 truncate">{s.studentName} — {s.assignmentTitle}</p>
                      <span className="text-xs text-gray-400">{new Date(s.submittedAt).toLocaleDateString()}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${s.score !== null ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {s.score !== null ? `${s.score}pts` : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {(stats?.upcomingEvents || []).length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">No upcoming events</p>
                ) : stats.upcomingEvents.map((e, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center"><i className="ri-calendar-event-line text-blue-500 text-sm"></i></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark-theme:text-gray-200 truncate">{e.title}</p>
                      <span className="text-xs text-gray-400">{new Date(e.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
export default MentorDashboard;
