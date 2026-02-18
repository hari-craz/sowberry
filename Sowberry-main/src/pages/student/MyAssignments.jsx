import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import DataTable from '../../components/DataTable';
import Swal, { getSwalOpts } from '../../utils/swal';
import { studentApi } from '../../utils/api';

const MyAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(null);

  const fetchAssignments = async () => {
    setLoading(true);
    const res = await studentApi.getAssignments();
    if (res.success) setAssignments(res.assignments || []);
    setLoading(false);
  };

  useEffect(() => { fetchAssignments(); }, []);

  const handleSubmit = async (assignment) => {
    const { value: content } = await Swal.fire({ ...getSwalOpts(), title: `Submit: ${assignment.title}`,
      input: 'textarea',
      inputPlaceholder: 'Paste your answer or solution here...',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      confirmButtonColor: '#6366f1',
      inputValidator: v => !v && 'Please enter your submission'
    });
    if (content) {
      setSubmitting(assignment.id);
      const res = await studentApi.submitAssignment(assignment.id, { content });
      setSubmitting(null);
      if (res.success) {
        Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Submitted!', timer: 1500, showConfirmButton: false });
        fetchAssignments();
      } else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
  };

  const getStatusStyle = (status) => {
    const styles = { pending: 'bg-amber-500/15 text-amber-400', submitted: 'bg-blue-500/15 text-blue-400', graded: 'bg-green-500/15 text-green-400', late: 'bg-red-500/15 text-red-400' };
    return styles[status] || styles.pending;
  };

  const columns = [
    { key: 'title', label: 'Assignment', sortable: true, render: (_, a) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="ri-task-line text-primary text-sm"></i></div>
        <div>
          <span className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm">{a.title}</span>
          {a.feedback && <p className="text-[10px] text-green-600 dark-theme:text-green-400 mt-0.5"><i className="ri-chat-1-line mr-0.5"></i>{a.feedback}</p>}
        </div>
      </div>
    ), exportValue: (a) => a.title },
    { key: 'courseName', label: 'Course', sortable: true, render: (v) => v || 'Course' },
    { key: 'dueDate', label: 'Due Date', sortable: true, render: (v) => v ? new Date(v).toLocaleDateString() : 'No deadline', exportValue: (a) => a.dueDate ? new Date(a.dueDate).toLocaleDateString() : 'No deadline' },
    { key: 'maxScore', label: 'Max Score', sortable: true, render: (v) => <span className="font-medium">{v || 100} pts</span>, exportValue: (a) => a.maxScore || 100 },
    { key: 'grade', label: 'Grade', sortable: true, visible: true, render: (v) => v != null ? <span className="text-green-600 font-medium">{v}</span> : <span className="text-gray-400">—</span>, exportValue: (a) => a.grade ?? '—' },
    { key: 'status', label: 'Status', sortable: true, render: (v) => (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${getStatusStyle(v)}`}>{v || 'pending'}</span>
    ), exportValue: (a) => a.status || 'pending' },
    { key: 'actions', label: 'Action', render: (_, a) => (
      (!a.status || a.status === 'pending') ? (
        <button onClick={(e) => { e.stopPropagation(); handleSubmit(a); }} disabled={submitting === a.id}
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-dark disabled:opacity-50 transition-colors">
          {submitting === a.id ? 'Submitting...' : 'Submit'}
        </button>
      ) : <span className="text-xs text-gray-400">—</span>
    ) },
  ];

  return (
    <DashboardLayout pageTitle="My Assignments" role="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">My Assignments</h1>

        <DataTable
          columns={columns}
          data={assignments}
          loading={loading}
          searchPlaceholder="Search assignments..."
          storageKey="sowberry_assignments_cols"
          exportTitle="My Assignments Report"
          exportFileName="Sowberry_My_Assignments"
          emptyIcon="ri-task-line"
          emptyMessage="No assignments yet"
        />
      </div>
    </DashboardLayout>
  );
};
export default MyAssignments;
