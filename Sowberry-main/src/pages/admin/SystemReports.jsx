import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import DataTable from '../../components/DataTable';
import { adminApi } from '../../utils/api';

const SystemReports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await adminApi.getReports();
      if (res.success) { const { success, message, ...data } = res; setReports(data); }
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <AdminLayout pageTitle="System Reports"><div className="flex items-center justify-center py-20"><i className="ri-loader-4-line animate-spin text-2xl text-primary"></i></div></AdminLayout>;

  const logs = reports?.activityLogs || [];

  const columns = [
    { key: 'fullName', label: 'User', sortable: true, render: (_, log) => (
      <span className="font-medium text-gray-700 dark-theme:text-gray-300">{log.fullName || log.userId || 'System'}</span>
    ), exportValue: (log) => log.fullName || log.userId || 'System' },
    { key: 'action', label: 'Action', sortable: true, render: (v) => (
      <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">{v}</span>
    ) },
    { key: 'description', label: 'Description', sortable: false, render: (v) => (
      <span className="text-gray-500 dark-theme:text-gray-400">{v}</span>
    ) },
    { key: 'createdAt', label: 'Date', sortable: true, render: (v) => new Date(v).toLocaleString(), exportValue: (log) => new Date(log.createdAt).toLocaleString() },
  ];

  return (
    <AdminLayout pageTitle="System Reports">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">System Reports</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><i className="ri-user-line text-primary text-lg"></i></div>
            <div><p className="text-xs text-gray-400">Total Users</p><p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">{reports?.totalUsers || 0}</p></div></div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><i className="ri-check-double-line text-green-500 text-lg"></i></div>
            <div><p className="text-xs text-gray-400">Total Submissions</p><p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">{reports?.totalSubmissions || 0}</p></div></div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><i className="ri-book-open-line text-blue-500 text-lg"></i></div>
            <div><p className="text-xs text-gray-400">Total Enrollments</p><p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">{reports?.totalEnrollments || 0}</p></div></div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><i className="ri-mail-line text-amber-500 text-lg"></i></div>
            <div><p className="text-xs text-gray-400">Contact Messages</p><p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">{reports?.totalContactMessages || 0}</p></div></div>
          </div>
        </div>

        {/* Activity Logs DataTable */}
        <div>
          <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 mb-4">Recent Activity Logs</h3>
          <DataTable
            columns={columns}
            data={logs}
            loading={false}
            searchPlaceholder="Search logs..."
            storageKey="sowberry_activity_logs_cols"
            exportTitle="Activity Logs Report"
            exportFileName="Sowberry_Activity_Logs"
            emptyIcon="ri-file-list-3-line"
            emptyMessage="No activity logs yet"
          />
        </div>
      </div>
    </AdminLayout>
  );
};
export default SystemReports;
