import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Swal, { getSwalOpts } from '../../utils/swal';
import { mentorApi } from '../../utils/api';

const NewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [detailCourse, setDetailCourse] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // info, subjects, content
  const [form, setForm] = useState({ title: '', courseCode: '', description: '', category: '', courseType: 'theory', difficulty: 'beginner', semester: '', duration: '', maxStudents: 50, subjects: [{ title: '', code: '', description: '' }] });

  const fetchCourses = async () => {
    setLoading(true);
    const res = await mentorApi.getCourses();
    if (res.success) setCourses(res.courses || []);
    setLoading(false);
  };

  useEffect(() => { fetchCourses(); }, []);

  const openCreate = () => {
    setEditCourse(null);
    setForm({ title: '', courseCode: '', description: '', category: '', courseType: 'theory', difficulty: 'beginner', semester: '', duration: '', maxStudents: 50, subjects: [{ title: '', code: '', description: '' }] });
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditCourse(c);
    setForm({
      title: c.title, courseCode: c.courseCode || '', description: c.description || '', category: c.category || '',
      courseType: c.courseType || 'theory', difficulty: c.difficulty || 'beginner', semester: c.semester || '',
      duration: c.duration || '', maxStudents: c.maxStudents || 50, subjects: []
    });
    setShowModal(true);
  };

  const openDetail = async (c) => {
    setDetailLoading(true);
    setDetailCourse(null);
    setActiveTab('info');
    const res = await mentorApi.getCourseDetail(c.id);
    if (res.success) setDetailCourse(res.course);
    else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    setDetailLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    // Filter out empty subjects
    payload.subjects = form.subjects.filter(s => s.title.trim());
    const res = editCourse ? await mentorApi.updateCourse(editCourse.id, payload) : await mentorApi.createCourse(payload);
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: editCourse ? 'Updated!' : 'Created!', text: editCourse ? 'Course updated.' : 'Course submitted for approval.', timer: 2000, showConfirmButton: false });
      setShowModal(false); fetchCourses();
    } else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
  };

  const handleDelete = (id, title) => {
    Swal.fire({ ...getSwalOpts(), title: 'Delete Course?', text: `Remove "${title}" and all its content?`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete' })
      .then(async r => { if (r.isConfirmed) { const res = await mentorApi.deleteCourse(id); if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Deleted!', timer: 1500, showConfirmButton: false }); fetchCourses(); if (detailCourse?.id === id) setDetailCourse(null); } } });
  };

  const addSubjectRow = () => setForm({ ...form, subjects: [...form.subjects, { title: '', code: '', description: '' }] });
  const removeSubjectRow = (i) => setForm({ ...form, subjects: form.subjects.filter((_, idx) => idx !== i) });
  const updateSubjectRow = (i, field, val) => {
    const updated = [...form.subjects];
    updated[i] = { ...updated[i], [field]: val };
    setForm({ ...form, subjects: updated });
  };

  // ──────── Detail View: Add Subject ────────
  const addSubjectToDetail = async () => {
    const { value } = await Swal.fire({ ...getSwalOpts(), title: 'Add Unit/Subject', html: `<input id="sw-sTitle" class="swal2-input" placeholder="Unit Title"><input id="sw-sCode" class="swal2-input" placeholder="Unit Code (optional)"><textarea id="sw-sDesc" class="swal2-textarea" placeholder="Description (optional)"></textarea>`,
      showCancelButton: true, confirmButtonText: 'Add',
      preConfirm: () => {
        const title = document.getElementById('sw-sTitle').value;
        if (!title) { Swal.showValidationMessage('Title is required'); return false; }
        return { title, code: document.getElementById('sw-sCode').value, description: document.getElementById('sw-sDesc').value };
      }
    });
    if (value) {
      const res = await mentorApi.addSubject(detailCourse.id, value);
      if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Added!', timer: 1000, showConfirmButton: false }); openDetail(detailCourse); }
      else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
  };

  const deleteSubject = (id) => {
    Swal.fire({ ...getSwalOpts(), title: 'Delete Subject?', text: 'This will also delete all topics in this subject.', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete' })
      .then(async r => { if (r.isConfirmed) { const res = await mentorApi.deleteSubject(id); if (res.success) openDetail(detailCourse); } });
  };

  // ──────── Detail View: Add Topic ────────
  const addTopic = async (subjectId) => {
    const { value } = await Swal.fire({ ...getSwalOpts(), title: 'Add Topic', html: `<input id="sw-tTitle" class="swal2-input" placeholder="Topic Title"><textarea id="sw-tDesc" class="swal2-textarea" placeholder="Description (optional)"></textarea>`,
      showCancelButton: true, confirmButtonText: 'Add',
      preConfirm: () => {
        const title = document.getElementById('sw-tTitle').value;
        if (!title) { Swal.showValidationMessage('Title is required'); return false; }
        return { title, description: document.getElementById('sw-tDesc').value };
      }
    });
    if (value) {
      const res = await mentorApi.addTopic(subjectId, value);
      if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Added!', timer: 1000, showConfirmButton: false }); openDetail(detailCourse); }
    }
  };

  const deleteTopic = async (id) => {
    const r = await Swal.fire({ ...getSwalOpts(), title: 'Delete Topic?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete' });
    if (r.isConfirmed) { await mentorApi.deleteTopic(id); openDetail(detailCourse); }
  };

  // ──────── Detail View: Add Content ────────
  const addContent = async () => {
    const subjects = detailCourse?.subjects || [];
    let subOpts = '<option value="0">General (No Subject)</option>';
    subjects.forEach(s => subOpts += `<option value="${s.id}">${s.title}</option>`);

    const { value } = await Swal.fire({ ...getSwalOpts(), title: 'Add Content', width: '600px',
      html: `<div style="text-align:left"><div style="margin-bottom:8px"><label style="font-weight:600;font-size:13px">Subject</label><select id="sw-ctSub" class="swal2-select" style="width:100%">${subOpts}</select></div>
        <div style="margin-bottom:8px"><label style="font-weight:600;font-size:13px">Title *</label><input id="sw-ctTitle" class="swal2-input" style="margin:4px 0" placeholder="Content title"></div>
        <div style="margin-bottom:8px"><label style="font-weight:600;font-size:13px">Type</label><select id="sw-ctType" class="swal2-select" style="width:100%" onchange="document.getElementById('sw-ctData-label').textContent = this.value === 'video' ? 'Video URL' : this.value === 'pdf' ? 'PDF URL / Path' : 'Text Content'"><option value="video">Video</option><option value="pdf">PDF</option><option value="text">Text</option></select></div>
        <div style="margin-bottom:8px"><label id="sw-ctData-label" style="font-weight:600;font-size:13px">Video URL</label><textarea id="sw-ctData" class="swal2-textarea" style="margin:4px 0" rows="3" placeholder="Enter URL or content"></textarea></div>
        <div style="margin-bottom:8px"><label style="font-weight:600;font-size:13px">Description</label><textarea id="sw-ctDesc" class="swal2-textarea" style="margin:4px 0" rows="2" placeholder="Optional description"></textarea></div></div>`,
      showCancelButton: true, confirmButtonText: 'Add Content',
      preConfirm: () => {
        const title = document.getElementById('sw-ctTitle').value;
        if (!title) { Swal.showValidationMessage('Title is required'); return false; }
        return {
          subjectId: parseInt(document.getElementById('sw-ctSub').value) || 0,
          title, contentType: document.getElementById('sw-ctType').value,
          contentData: document.getElementById('sw-ctData').value,
          description: document.getElementById('sw-ctDesc').value
        };
      }
    });
    if (value) {
      const res = await mentorApi.addContent(detailCourse.id, value);
      if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Added!', timer: 1000, showConfirmButton: false }); openDetail(detailCourse); }
    }
  };

  const deleteContent = async (id) => {
    const r = await Swal.fire({ ...getSwalOpts(), title: 'Delete Content?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete' });
    if (r.isConfirmed) { await mentorApi.deleteContent(id); openDetail(detailCourse); }
  };

  const [contentList, setContentList] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);

  const loadContent = async (courseId) => {
    setContentLoading(true);
    const res = await mentorApi.getCourseContent(courseId);
    if (res.success) setContentList(res.content || []);
    setContentLoading(false);
  };

  useEffect(() => {
    if (detailCourse && activeTab === 'content') loadContent(detailCourse.id);
  }, [activeTab, detailCourse]);

  const statusColors = { draft: 'bg-gray-100 text-gray-600', pending: 'bg-amber-100 text-amber-700', active: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700', inactive: 'bg-gray-200 text-gray-500' };
  const contentIcons = { video: 'ri-video-line', pdf: 'ri-file-pdf-2-line', text: 'ri-file-text-line' };

  // ──────── Detail Panel ────────
  if (detailCourse || detailLoading) {
    return (
      <DashboardLayout pageTitle="Course Detail" role="mentor">
        <div className="space-y-6">
          <button onClick={() => setDetailCourse(null)} className="text-sm text-primary hover:underline flex items-center gap-1"><i className="ri-arrow-left-line"></i>Back to Courses</button>
          {detailLoading ? null : detailCourse && (
            <>
              {/* Course Header Card */}
              <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">{detailCourse.title}</h1>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[detailCourse.status] || statusColors.draft}`}>{detailCourse.status}</span>
                    </div>
                    {detailCourse.courseCode && <p className="text-sm text-gray-500 mb-1"><i className="ri-hashtag mr-1"></i>{detailCourse.courseCode}</p>}
                    <p className="text-xs text-gray-500 mb-2">{detailCourse.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                      {detailCourse.category && <span className="px-2 py-0.5 rounded-md bg-gray-100 dark-theme:bg-gray-800">{detailCourse.category}</span>}
                      {detailCourse.courseType && <span className="px-2 py-0.5 rounded-md bg-blue-50 dark-theme:bg-blue-900/20 text-blue-600">{detailCourse.courseType}</span>}
                      {detailCourse.difficulty && <span className="px-2 py-0.5 rounded-md bg-purple-50 dark-theme:bg-purple-900/20 text-purple-600">{detailCourse.difficulty}</span>}
                      {detailCourse.semester && <span className="px-2 py-0.5 rounded-md bg-teal-50 dark-theme:bg-teal-900/20 text-teal-600">Sem {detailCourse.semester}</span>}
                      {detailCourse.duration && <span className="px-2 py-0.5 rounded-md bg-gray-100 dark-theme:bg-gray-800">{detailCourse.duration}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <div className="text-center px-3 py-2 bg-blue-50 dark-theme:bg-blue-900/20 rounded-xl"><p className="font-bold text-blue-600">{detailCourse.enrollmentCount || 0}</p><p className="text-gray-400">Enrolled</p></div>
                    <div className="text-center px-3 py-2 bg-green-50 dark-theme:bg-green-900/20 rounded-xl"><p className="font-bold text-green-600">{detailCourse.contentCount || 0}</p><p className="text-gray-400">Content</p></div>
                    <div className="text-center px-3 py-2 bg-purple-50 dark-theme:bg-purple-900/20 rounded-xl"><p className="font-bold text-purple-600">{(detailCourse.subjects || []).length}</p><p className="text-gray-400">Units</p></div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex bg-cream dark-theme:bg-gray-800 rounded-xl p-1 w-fit">
                {['info', 'subjects', 'content'].map(t => (
                  <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${activeTab === t ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}>{t === 'info' ? 'Subjects & Topics' : t}</button>
                ))}
              </div>

              {/* Subjects & Topics Tab */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">Units / Subjects</h2>
                    <button onClick={addSubjectToDetail} className="px-3 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-dark flex items-center gap-1"><i className="ri-add-line"></i>Add Unit</button>
                  </div>
                  {(detailCourse.subjects || []).length === 0 ? <p className="text-sm text-gray-400 text-center py-8">No units added yet. Add units to structure your course.</p> :
                    (detailCourse.subjects || []).map((sub, si) => (
                      <div key={sub.id} className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 overflow-hidden">
                        <div className="p-4 flex items-center justify-between bg-gray-50 dark-theme:bg-gray-800/50">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{si + 1}</span>
                              <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm">{sub.title}</h3>
                              {sub.code && <span className="text-[10px] text-gray-400">({sub.code})</span>}
                            </div>
                            {sub.description && <p className="text-xs text-gray-500 mt-1 ml-8">{sub.description}</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => addTopic(sub.id)} className="px-2 py-1 rounded-lg bg-blue-50 dark-theme:bg-blue-900/20 text-blue-600 text-[10px] font-medium hover:bg-blue-100"><i className="ri-add-line mr-0.5"></i>Topic</button>
                            <button onClick={() => deleteSubject(sub.id)} className="w-7 h-7 rounded-lg bg-red-50 dark-theme:bg-red-900/20 text-red-500 flex items-center justify-center hover:bg-red-100"><i className="ri-delete-bin-line text-xs"></i></button>
                          </div>
                        </div>
                        {(sub.topics || []).length > 0 && (
                          <div className="p-4 space-y-2">
                            {sub.topics.map((topic, ti) => (
                              <div key={topic.id} className="flex items-center justify-between pl-8 py-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400">{si + 1}.{ti + 1}</span>
                                  <span className="text-sm text-gray-700 dark-theme:text-gray-300">{topic.title}</span>
                                </div>
                                <button onClick={() => deleteTopic(topic.id)} className="text-red-400 hover:text-red-600"><i className="ri-close-line text-sm"></i></button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  }
                </div>
              )}

              {/* Subjects Tab (same as info but simpler, can be kept) */}
              {activeTab === 'subjects' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">Manage Subjects</h2>
                    <button onClick={addSubjectToDetail} className="px-3 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-dark flex items-center gap-1"><i className="ri-add-line"></i>Add Subject</button>
                  </div>
                  {(detailCourse.subjects || []).map(sub => (
                    <div key={sub.id} className="bg-white dark-theme:bg-gray-900 rounded-xl p-4 border border-sand dark-theme:border-gray-800 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-800 dark-theme:text-gray-100">{sub.title}</h3>
                        <p className="text-xs text-gray-400">{sub.code || 'No code'} • {sub.topicCount || 0} topics • {sub.contentCount || 0} content</p>
                      </div>
                      <button onClick={() => deleteSubject(sub.id)} className="px-2 py-1 rounded-lg bg-red-50 text-red-500 text-xs hover:bg-red-100"><i className="ri-delete-bin-line"></i></button>
                    </div>
                  ))}
                </div>
              )}

              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">Course Content</h2>
                    <button onClick={addContent} className="px-3 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-dark flex items-center gap-1"><i className="ri-add-line"></i>Add Content</button>
                  </div>
                  {contentLoading ? null :
                  contentList.length === 0 ? <p className="text-sm text-gray-400 text-center py-8">No content added yet</p> :
                  <div className="space-y-3">
                    {contentList.map(c => (
                      <div key={c.id} className="bg-white dark-theme:bg-gray-900 rounded-xl p-4 border border-sand dark-theme:border-gray-800 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.contentType === 'video' ? 'bg-blue-100 text-blue-600' : c.contentType === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          <i className={`${contentIcons[c.contentType] || 'ri-file-line'} text-lg`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 dark-theme:text-gray-100 truncate">{c.title}</h4>
                          <p className="text-[11px] text-gray-400">{c.subjectTitle || 'General'} • {c.contentType}</p>
                        </div>
                        <button onClick={() => deleteContent(c.id)} className="w-8 h-8 rounded-lg bg-red-50 dark-theme:bg-red-900/20 text-red-500 flex items-center justify-center hover:bg-red-100"><i className="ri-delete-bin-line text-sm"></i></button>
                      </div>
                    ))}
                  </div>}
                </div>
              )}
            </>
          )}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Courses" role="mentor">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div><h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">My Courses</h1><p className="text-sm text-gray-500 mt-1">{courses.length} courses</p></div>
          <button onClick={openCreate} className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark flex items-center gap-2"><i className="ri-add-line"></i>New Course</button>
        </div>

        {loading ? null :
        courses.length === 0 ? <div className="text-center py-20 text-gray-400"><i className="ri-book-open-line text-4xl mb-3 block"></i><p>No courses yet. Create your first course!</p></div> :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map(c => (
            <div key={c.id} className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-28 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                <i className="ri-book-open-line text-4xl text-primary/40"></i>
                <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[c.status] || statusColors.draft}`}>{c.status}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm">{c.title}</h3>
                </div>
                {c.courseCode && <p className="text-[10px] text-gray-400 mb-1"><i className="ri-hashtag mr-0.5"></i>{c.courseCode}</p>}
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{c.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <span>{c.category || 'General'}</span><span>•</span><span>{c.courseType || 'theory'}</span><span>•</span><span>{c.difficulty}</span>
                  {c.semester && <><span>•</span><span>Sem {c.semester}</span></>}
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                  <span><i className="ri-user-line mr-0.5"></i>{c.enrollmentCount || 0} enrolled</span>
                  <span><i className="ri-stack-line mr-0.5"></i>{c.subjectCount || 0} units</span>
                  <span><i className="ri-file-text-line mr-0.5"></i>{c.contentCount || 0} content</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openDetail(c)} className="flex-1 py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20"><i className="ri-eye-line mr-1"></i>View</button>
                  <button onClick={() => openEdit(c)} className="flex-1 py-2 rounded-xl bg-blue-50 dark-theme:bg-blue-900/20 text-blue-600 text-xs font-medium hover:bg-blue-100"><i className="ri-edit-line mr-1"></i>Edit</button>
                  <button onClick={() => handleDelete(c.id, c.title)} className="py-2 px-3 rounded-xl bg-red-50 dark-theme:bg-red-900/20 text-red-600 text-xs font-medium hover:bg-red-100"><i className="ri-delete-bin-line"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-xl mx-4 border border-sand dark-theme:border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">{editCourse ? 'Edit Course' : 'New Course'}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 dark-theme:hover:bg-gray-800 flex items-center justify-center"><i className="ri-close-line text-lg text-gray-500"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Course Title *" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
                <input type="text" placeholder="Course Code (e.g. CS201)" value={form.courseCode} onChange={e => setForm({ ...form, courseCode: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              </div>
              <textarea placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm resize-none" />
              <div className="grid grid-cols-3 gap-3">
                <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
                <select value={form.courseType} onChange={e => setForm({ ...form, courseType: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm">
                  <option value="theory">Theory</option><option value="practical">Practical</option><option value="lab">Lab</option>
                </select>
                <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm">
                  <option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <select value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm">
                  <option value="">Semester</option>
                  {[1,2,3,4,5,6,7,8].map(i => <option key={i} value={i}>Sem {i}</option>)}
                </select>
                <input type="text" placeholder="Duration (e.g. 6 weeks)" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
                <input type="number" placeholder="Max Students" value={form.maxStudents} onChange={e => setForm({ ...form, maxStudents: parseInt(e.target.value) || 50 })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              </div>

              {/* Subjects (on create only) */}
              {!editCourse && (
                <div className="border border-sand dark-theme:border-gray-700 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-600 dark-theme:text-gray-400">Units / Subjects (optional)</label>
                    <button type="button" onClick={addSubjectRow} className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-medium hover:bg-primary/20"><i className="ri-add-line mr-0.5"></i>Add Unit</button>
                  </div>
                  {form.subjects.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="text" placeholder={`Unit ${i + 1} title`} value={s.title} onChange={e => updateSubjectRow(i, 'title', e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-xs outline-none focus:border-primary" />
                      <input type="text" placeholder="Code" value={s.code} onChange={e => updateSubjectRow(i, 'code', e.target.value)} className="w-20 px-3 py-2 rounded-lg bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-xs outline-none focus:border-primary" />
                      {form.subjects.length > 1 && <button type="button" onClick={() => removeSubjectRow(i)} className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100"><i className="ri-close-line text-xs"></i></button>}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-sand dark-theme:border-gray-700 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">{editCourse ? 'Update' : 'Submit for Approval'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
export default NewCourses;
