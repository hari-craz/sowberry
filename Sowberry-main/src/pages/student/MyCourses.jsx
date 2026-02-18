import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import Swal, { getSwalOpts } from '../../utils/swal';
import { studentApi } from '../../utils/api';
import { generateCertificate } from '../../utils/certificateGenerator';

const CAT_COLORS = {
  'Web Development': 'from-blue-500 to-indigo-500',
  'Data Structures': 'from-violet-500 to-purple-500',
  'Python': 'from-green-500 to-emerald-500',
  'Machine Learning': 'from-orange-500 to-red-500',
  'Database': 'from-amber-500 to-yellow-500',
  'Programming': 'from-cyan-500 to-blue-500',
  'Software Engineering': 'from-teal-500 to-cyan-500',
  'General': 'from-gray-500 to-gray-600',
};

const MyCourses = () => {
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState([]);
  const [browse, setBrowse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('enrolled');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');

  const fetchData = async () => {
    setLoading(true);
    const [eRes, bRes] = await Promise.all([studentApi.getCourses(), studentApi.browseCourses()]);
    if (eRes.success) setEnrolled(eRes.courses || []);
    if (bRes.success) setBrowse(bRes.courses || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleEnroll = async (courseId) => {
    const res = await studentApi.enrollCourse(courseId);
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Enrolled!', text: 'You have been enrolled in the course.', timer: 1500, showConfirmButton: false });
      fetchData();
    } else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
  };

  const handleUnenroll = (courseId, title) => {
    Swal.fire({ ...getSwalOpts(), title: 'Unenroll?', text: `Leave "${title}"? Your progress will be lost.`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', cancelButtonColor: '#333', confirmButtonText: 'Unenroll' })
      .then(async r => {
        if (r.isConfirmed) {
          const res = await studentApi.unenrollCourse(courseId);
          if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Unenrolled', timer: 1500, showConfirmButton: false }); fetchData(); }
          else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
        }
      });
  };

  const handleDownloadCertificate = async (courseId) => {
    try {
      const res = await studentApi.getCertificate(courseId);
      if (res.success) {
        generateCertificate(res);
        Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Certificate Downloaded!', text: 'Your certificate has been saved.', timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Could not generate certificate.' });
      }
    } catch (err) {
      console.error('Certificate download error:', err);
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: 'Failed to download certificate.' });
    }
  };

  const categories = ['All', ...new Set(browse.map(c => c.category || 'General').filter(Boolean))];
  const filteredBrowse = browse.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !search || (c.title || '').toLowerCase().includes(q) || (c.courseCode || '').toLowerCase().includes(q) || (c.category || '').toLowerCase().includes(q);
    const matchCat = catFilter === 'All' || (c.category || 'General') === catFilter;
    return matchSearch && matchCat;
  });

  const getGradient = (cat) => CAT_COLORS[cat] || CAT_COLORS.General;

  return (
    <DashboardLayout pageTitle="My Courses" role="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">My Courses</h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">{enrolled.length} enrolled, {browse.length} available</p>
          </div>
          <div className="flex bg-cream dark-theme:bg-gray-800 rounded-xl p-1 border border-sand dark-theme:border-gray-700">
            <button onClick={() => setTab('enrolled')} className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${tab === 'enrolled' ? 'bg-primary text-white' : 'text-gray-500 dark-theme:text-gray-500 hover:text-gray-800 dark-theme:hover:text-gray-100'}`}>Enrolled ({enrolled.length})</button>
            <button onClick={() => setTab('browse')} className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${tab === 'browse' ? 'bg-primary text-white' : 'text-gray-500 dark-theme:text-gray-500 hover:text-gray-800 dark-theme:hover:text-gray-100'}`}>Browse</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Enrolled', value: enrolled.length, icon: 'ri-book-open-line', color: 'text-primary' },
            { label: 'In Progress', value: enrolled.filter(c => (c.completionPercentage || 0) > 0 && (c.completionPercentage || 0) < 100).length, icon: 'ri-loader-4-line', color: 'text-blue-400' },
            { label: 'Completed', value: enrolled.filter(c => (c.completionPercentage || 0) === 100).length, icon: 'ri-check-double-line', color: 'text-green-400' },
            { label: 'Available', value: browse.length, icon: 'ri-compass-3-line', color: 'text-violet-400' },
          ].map((s, i) => (
            <div key={i} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-4 border border-sand dark-theme:border-gray-800 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-cream dark-theme:bg-gray-800 flex items-center justify-center ${s.color}`}><i className={`${s.icon} text-lg`}></i></div>
              <div><p className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">{s.value}</p><p className="text-[10px] text-gray-500 dark-theme:text-gray-400">{s.label}</p></div>
            </div>
          ))}
        </div>

        {loading ? null :
        tab === 'enrolled' ? (
          enrolled.length === 0 ? <div className="text-center py-20 text-gray-400 dark-theme:text-gray-500"><i className="ri-book-open-line text-4xl mb-3 block"></i><p>No enrolled courses. Browse and enroll!</p></div> :
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolled.map(c => {
              const pct = c.completionPercentage || c.progress || 0;
              const cat = c.category || 'General';
              return (
                <div key={c.id || c.courseId} className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                  <div className={`h-1.5 bg-gradient-to-r ${getGradient(cat)}`}></div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">{cat}</span>
                      {c.courseCode && <span className="text-[10px] text-gray-400 dark-theme:text-gray-500"><i className="ri-hashtag mr-0.5"></i>{c.courseCode}</span>}
                    </div>
                    <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 text-sm mb-1 group-hover:text-primary transition-colors">{c.title}</h3>
                    <p className="text-[11px] text-gray-500 dark-theme:text-gray-400 line-clamp-2 mb-2">{c.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 dark-theme:text-gray-500 mb-3">
                      {c.mentorName && <span><i className="ri-user-line mr-0.5"></i>{c.mentorName}</span>}
                      <span><i className="ri-stack-line mr-0.5"></i>{c.contentCount || 0} content</span>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-[10px] mb-1"><span className="text-gray-500 dark-theme:text-gray-400">Progress</span><span className={pct === 100 ? 'text-green-400 font-medium' : 'text-primary'}>{pct}%</span></div>
                      <div className="w-full h-1.5 bg-cream dark-theme:bg-gray-800 rounded-full"><div className={`h-1.5 rounded-full transition-all ${pct === 100 ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${pct}%` }}></div></div>
                    </div>
                    <div className="flex gap-2">
                      {pct >= 100 ? (
                        <>
                          <button onClick={() => handleDownloadCertificate(c.courseId || c.id)} className="flex-1 py-2.5 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors"><i className="ri-award-line mr-1"></i>Certificate</button>
                          <button onClick={() => navigate(`/student/course-viewer/${c.courseId || c.id}`)} className="py-2.5 px-3 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors" title="Review Course"><i className="ri-eye-line"></i></button>
                        </>
                      ) : (
                        <button onClick={() => navigate(`/student/course-viewer/${c.courseId || c.id}`)} className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors"><i className="ri-play-circle-line mr-1"></i>Continue</button>
                      )}
                      <button onClick={() => handleUnenroll(c.courseId || c.id, c.title)} className="py-2.5 px-3 rounded-xl bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition-colors" title="Unenroll"><i className="ri-logout-box-r-line"></i></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-64">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark-theme:text-gray-500 text-sm"></i>
                <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-sm text-gray-800 dark-theme:text-gray-100 placeholder-gray-400 dark-theme:placeholder-gray-500 outline-none focus:border-primary" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(c => (
                  <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${catFilter === c ? 'bg-primary text-white' : 'bg-cream dark-theme:bg-gray-800 text-gray-500 dark-theme:text-gray-500 border border-sand dark-theme:border-gray-700 hover:border-gray-400 dark-theme:hover:border-gray-600'}`}>{c}</button>
                ))}
              </div>
            </div>
            {filteredBrowse.length === 0 ? <div className="text-center py-20 text-gray-400 dark-theme:text-gray-500"><i className="ri-search-line text-4xl mb-3 block"></i><p>{search || catFilter !== 'All' ? 'No matching courses' : 'No courses available'}</p></div> :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBrowse.map(c => {
                const cat = c.category || 'General';
                return (
                  <div key={c.id} className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                    <div className={`h-1.5 bg-gradient-to-r ${getGradient(cat)}`}></div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500/10 text-green-400">{cat}</span>
                        {c.difficulty && <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${c.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' : c.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>{c.difficulty}</span>}
                        {c.courseCode && <span className="text-[10px] text-gray-400 dark-theme:text-gray-500"><i className="ri-hashtag mr-0.5"></i>{c.courseCode}</span>}
                      </div>
                      <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 text-sm mb-1 group-hover:text-primary transition-colors">{c.title}</h3>
                      <p className="text-[11px] text-gray-500 dark-theme:text-gray-400 line-clamp-2 mb-2">{c.description}</p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 dark-theme:text-gray-500 mb-4 flex-wrap">
                        <span><i className="ri-user-line mr-0.5"></i>{c.mentorName || 'Instructor'}</span>
                        {c.courseType && <span>â€¢ {c.courseType}</span>}
                        <span>â€¢ <i className="ri-stack-line mr-0.5"></i>{c.contentCount || 0} items</span>
                        <span>â€¢ <i className="ri-book-2-line mr-0.5"></i>{c.subjectCount || 0} units</span>
                      </div>
                      {c.isEnrolled ? (
                        <button disabled className="w-full py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 text-gray-400 dark-theme:text-gray-500 text-xs font-medium cursor-not-allowed border border-sand dark-theme:border-gray-700"><i className="ri-check-line mr-1"></i>Already Enrolled</button>
                      ) : (
                        <button onClick={() => handleEnroll(c.id)} className="w-full py-2.5 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors"><i className="ri-add-line mr-1"></i>Enroll Now</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};
export default MyCourses;
