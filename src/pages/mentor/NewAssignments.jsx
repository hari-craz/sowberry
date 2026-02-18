import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AdminLayout from '../../components/AdminLayout';
import Swal, { getSwalOpts } from '../../utils/swal';
import { mentorApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const NewAssignments = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const Layout = isAdmin ? AdminLayout : DashboardLayout;
  const layoutProps = isAdmin ? {} : { pageTitle: 'Assignments', role: 'mentor' };
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', courseId: '', dueDate: '', maxScore: 100, isPublished: false });

  const fetchData = async () => {
    setLoading(true);
    const [aRes, cRes] = await Promise.all([mentorApi.getAssignments(), mentorApi.getCourses()]);
    if (aRes.success) setAssignments(aRes.assignments || []);
    if (cRes.success) setCourses(cRes.courses || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditItem(null); setForm({ title: '', description: '', courseId: courses[0]?.id || '', dueDate: '', maxScore: 100, isPublished: false }); setShowModal(true); };
  const openEdit = (a) => { setEditItem(a); setForm({ title: a.title, description: a.description || '', courseId: a.courseId, dueDate: a.dueDate?.split('T')[0] || '', maxScore: a.maxScore, isPublished: !!a.isPublished }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = editItem ? await mentorApi.updateAssignment(editItem.id, form) : await mentorApi.createAssignment(form);
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: editItem ? 'Updated!' : 'Created!', timer: 1500, showConfirmButton: false});
      setShowModal(false); fetchData();
    } else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message});
  };

  const handleDelete = (id) => {
    Swal.fire({ ...getSwalOpts(), title: 'Delete?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete'})
      .then(async r => { if (r.isConfirmed) { await mentorApi.deleteAssignment(id); fetchData(); } });
  };

  const viewSubmissions = async (assignmentId) => {
    const res = await mentorApi.getSubmissions(assignmentId);
    if (res.success) { setSubmissions(res.submissions || []); setShowSubmissions(assignmentId); }
  };

  const gradeSubmission = async (subId) => {
    const { value } = await Swal.fire({ ...getSwalOpts(), title: 'Grade Submission', input: 'number', inputLabel: 'Score', inputPlaceholder: 'Enter score',
      showCancelButton: true, confirmButtonColor: '#d4a574',
      inputValidator: v => { if (!v || v < 0) return 'Enter a valid score'; }
    });
    if (value !== undefined) {
      const { value: feedback } = await Swal.fire({ ...getSwalOpts(), title: 'Feedback', input: 'textarea', inputPlaceholder: 'Optional feedback...', showCancelButton: true, confirmButtonColor: '#d4a574'});
      const res = await mentorApi.gradeSubmission(subId, { score: parseInt(value), feedback: feedback || '' });
      if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Graded!', timer: 1500, showConfirmButton: false}); viewSubmissions(showSubmissions); }
    }
  };

  return (
    <Layout {...layoutProps}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div><h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Assignments</h1><p className="text-sm text-gray-500 mt-1">{assignments.length} assignments</p></div>
          <button onClick={openCreate} className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark flex items-center gap-2"><i className="ri-add-line"></i>New Assignment</button>
        </div>

        {loading ? null :
        assignments.length === 0 ? <div className="text-center py-20 text-gray-400"><i className="ri-task-line text-4xl mb-3 block"></i><p>No assignments yet</p></div> :
        <div className="space-y-4">
          {assignments.map(a => (
            <div key={a.id} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><i className="ri-task-line text-primary"></i></div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm">{a.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{a.courseName || 'No course'} • Max Score: {a.maxScore} • Due: {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : 'No deadline'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => viewSubmissions(a.id)} className="px-3 py-1.5 rounded-lg bg-gray-100 dark-theme:bg-gray-800 text-xs text-gray-600 dark-theme:text-gray-400 hover:bg-gray-200"><i className="ri-file-list-line mr-1"></i>Submissions</button>
                  <button onClick={() => openEdit(a)} className="px-3 py-1.5 rounded-lg bg-blue-50 dark-theme:bg-blue-900/20 text-xs text-blue-600 hover:bg-blue-100"><i className="ri-edit-line"></i></button>
                  <button onClick={() => handleDelete(a.id)} className="px-3 py-1.5 rounded-lg bg-red-50 dark-theme:bg-red-900/20 text-xs text-red-600 hover:bg-red-100"><i className="ri-delete-bin-line"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-lg mx-4 border border-sand dark-theme:border-gray-800">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">{editItem ? 'Edit' : 'New'} Assignment</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"><i className="ri-close-line text-lg text-gray-500"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <textarea placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm resize-none" />
              <select required value={form.courseId} onChange={e => setForm({ ...form, courseId: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm">
                <option value="">Select Course</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
                <input type="number" placeholder="Max Score" value={form.maxScore} onChange={e => setForm({ ...form, maxScore: parseInt(e.target.value) || 100 })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} className="rounded border-gray-300 text-primary focus:ring-primary" /> Publish
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-sand text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">{editItem ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submissions Modal */}
      {showSubmissions && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl mx-4 border border-sand dark-theme:border-gray-800 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">Submissions</h3>
              <button onClick={() => setShowSubmissions(null)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"><i className="ri-close-line text-lg text-gray-500"></i></button>
            </div>
            {submissions.length === 0 ? <p className="text-center py-10 text-gray-400">No submissions yet</p> :
            <div className="space-y-3">
              {submissions.map(s => (
                <div key={s.id} className="flex items-center justify-between p-4 rounded-xl bg-cream dark-theme:bg-gray-800">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark-theme:text-gray-200">{s.studentName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Submitted: {new Date(s.submittedAt).toLocaleString()}</p>
                    {s.content && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.content}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    {s.score !== null ? (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">{s.score}/{s.maxScore}</span>
                    ) : (
                      <button onClick={() => gradeSubmission(s.id)} className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs hover:bg-primary-dark">Grade</button>
                    )}
                  </div>
                </div>
              ))}
            </div>}
          </div>
        </div>
      )}
    </Layout>
  );
};
export default NewAssignments;
