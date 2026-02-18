import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import Swal, { getSwalOpts } from '../../utils/swal';
import { studentApi } from '../../utils/api';

const CourseViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeContent, setActiveContent] = useState(null);
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [completedTopics, setCompletedTopics] = useState([]);

  const fetchCourse = async () => {
    setLoading(true);
    const res = await studentApi.getCourseView(id);
    if (res.success) {
      const courseData = res.course;
      const enrollmentData = courseData?.enrollment || null;
      setCourse(courseData);
      setEnrollment(enrollmentData);
      setCompletedTopics(enrollmentData?.completedTopics || []);
      // Expand first subject by default
      if (courseData?.subjects?.length > 0) {
        setExpandedSubjects({ [courseData.subjects[0].id]: true });
      }
      // Auto-select first content
      if (courseData?.content?.length > 0) {
        setActiveContent(courseData.content[0]);
      }
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Could not load course' });
    }
    setLoading(false);
  };

  useEffect(() => { fetchCourse(); }, [id]);

  const toggleSubject = (subjectId) => {
    setExpandedSubjects(prev => ({ ...prev, [subjectId]: !prev[subjectId] }));
  };

  const toggleTopic = async (topicId) => {
    let updated;
    if (completedTopics.includes(topicId)) {
      updated = completedTopics.filter(t => t !== topicId);
    } else {
      updated = [...completedTopics, topicId];
    }
    setCompletedTopics(updated);

    // Calculate progress
    const allTopics = (course?.subjects || []).reduce((acc, s) => acc + (s.topics?.length || 0), 0);
    const newProgress = allTopics > 0 ? Math.round((updated.length / allTopics) * 100) : 0;

    const res = await studentApi.updateCourseProgress(id, { progress: newProgress, completedTopics: updated });
    if (res.success) {
      setEnrollment(prev => ({ ...prev, completionPercentage: newProgress }));
    }
  };

  const totalTopics = (course?.subjects || []).reduce((acc, s) => acc + (s.topics?.length || 0), 0);
  const progress = enrollment?.completionPercentage || 0;

  const contentIcons = { video: 'ri-play-circle-line', pdf: 'ri-file-pdf-2-line', text: 'ri-file-text-line' };
  const contentColors = { video: 'text-blue-500 bg-blue-500/10', pdf: 'text-red-500 bg-red-500/10', text: 'text-green-500 bg-green-500/10' };

  if (loading) {
    return (
      <DashboardLayout pageTitle="Course Viewer" role="student">
        <div className="flex items-center justify-center py-20"><i className="ri-loader-4-line animate-spin text-2xl text-primary"></i></div>
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout pageTitle="Course Viewer" role="student">
        <div className="text-center py-20">
          <i className="ri-error-warning-line text-5xl text-gray-300 mb-4 block"></i>
          <p className="text-gray-500 mb-4">Course not found or not accessible</p>
          <button onClick={() => navigate('/student/my-courses')} className="px-4 py-2 rounded-xl bg-primary text-white text-sm">Back to Courses</button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle={course.title} role="student">
      <div className="space-y-5">
        {/* Back + Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/student/my-courses')} className="w-8 h-8 rounded-lg bg-gray-100 dark-theme:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark-theme:hover:bg-gray-700"><i className="ri-arrow-left-line text-gray-600 dark-theme:text-gray-300"></i></button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">{course.title}</h1>
            <p className="text-xs text-gray-400">{course.mentorName && `By ${course.mentorName} • `}{course.category || 'General'} • {course.courseType || 'Theory'}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-4 border border-sand dark-theme:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 dark-theme:text-gray-400">Course Progress</span>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{completedTopics.length}/{totalTopics} topics</span>
              <span className="font-bold text-primary">{progress}%</span>
            </div>
          </div>
          <div className="w-full h-2.5 bg-gray-200 dark-theme:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Sidebar - Subjects & Topics */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-sm font-bold text-gray-700 dark-theme:text-gray-300 px-1">Course Structure</h2>
            {(course.subjects || []).length === 0 ? (
              <div className="bg-white dark-theme:bg-gray-900 rounded-xl p-4 border border-sand dark-theme:border-gray-800 text-center">
                <p className="text-xs text-gray-400">No units available</p>
              </div>
            ) : (
              (course.subjects || []).map((sub, si) => (
                <div key={sub.id} className="bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 overflow-hidden">
                  <button onClick={() => toggleSubject(sub.id)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark-theme:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">{si + 1}</span>
                      <span className="text-sm font-medium text-gray-800 dark-theme:text-gray-100 text-left">{sub.title}</span>
                    </div>
                    <i className={`ri-arrow-${expandedSubjects[sub.id] ? 'up' : 'down'}-s-line text-gray-400`}></i>
                  </button>
                  {expandedSubjects[sub.id] && (sub.topics || []).length > 0 && (
                    <div className="px-3 pb-3 space-y-1">
                      {sub.topics.map((topic, ti) => {
                        const isCompleted = completedTopics.includes(topic.id);
                        return (
                          <div key={topic.id} className="flex items-center gap-2 pl-8 py-1.5 group">
                            <button onClick={() => toggleTopic(topic.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isCompleted ? 'bg-green-500/100 border-green-500 text-white' : 'border-gray-300 dark-theme:border-gray-600 hover:border-primary'}`}>
                              {isCompleted && <i className="ri-check-line text-xs"></i>}
                            </button>
                            <span className={`text-xs ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700 dark-theme:text-gray-300'}`}>{si + 1}.{ti + 1} {topic.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Course Info */}
            <div className="bg-white dark-theme:bg-gray-900 rounded-xl p-4 border border-sand dark-theme:border-gray-800 space-y-2">
              <h3 className="text-xs font-bold text-gray-600 dark-theme:text-gray-400 uppercase">Course Info</h3>
              {course.courseCode && <div className="flex justify-between text-xs"><span className="text-gray-400">Code</span><span className="text-gray-700 dark-theme:text-gray-300">{course.courseCode}</span></div>}
              {course.difficulty && <div className="flex justify-between text-xs"><span className="text-gray-400">Difficulty</span><span className="text-gray-700 dark-theme:text-gray-300 capitalize">{course.difficulty}</span></div>}
              {course.duration && <div className="flex justify-between text-xs"><span className="text-gray-400">Duration</span><span className="text-gray-700 dark-theme:text-gray-300">{course.duration}</span></div>}
              {course.semester && <div className="flex justify-between text-xs"><span className="text-gray-400">Semester</span><span className="text-gray-700 dark-theme:text-gray-300">{course.semester}</span></div>}
              <div className="flex justify-between text-xs"><span className="text-gray-400">Content</span><span className="text-gray-700 dark-theme:text-gray-300">{(course.content || []).length} items</span></div>
            </div>
          </div>

          {/* Main Content Viewer */}
          <div className="lg:col-span-2 space-y-4">
            {/* Content List */}
            {(course.content || []).length === 0 ? (
              <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-12 border border-sand dark-theme:border-gray-800 text-center">
                <i className="ri-folder-open-line text-5xl text-gray-300 mb-3 block"></i>
                <p className="text-gray-500 text-sm">No content available for this course yet</p>
              </div>
            ) : (
              <>
                {/* Active Content Display */}
                {activeContent && (
                  <div className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 overflow-hidden">
                    <div className="px-5 py-4 border-b border-sand dark-theme:border-gray-800 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm">{activeContent.title}</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">{activeContent.subjectTitle || 'General'} • {activeContent.contentType}</p>
                      </div>
                      <span className={`w-8 h-8 rounded-lg ${contentColors[activeContent.contentType] || 'bg-gray-100 text-gray-500'} flex items-center justify-center`}>
                        <i className={`${contentIcons[activeContent.contentType] || 'ri-file-line'} text-lg`}></i>
                      </span>
                    </div>
                    <div className="p-5">
                      {activeContent.contentType === 'video' && activeContent.contentData && (
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          {activeContent.contentData.includes('youtube') || activeContent.contentData.includes('youtu.be') ? (
                            <iframe
                              src={activeContent.contentData.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                              className="absolute inset-0 w-full h-full rounded-xl"
                              frameBorder="0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                          ) : (
                            <video src={activeContent.contentData} controls className="absolute inset-0 w-full h-full rounded-xl object-contain bg-black" />
                          )}
                        </div>
                      )}
                      {activeContent.contentType === 'pdf' && activeContent.contentData && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-end">
                            <a href={activeContent.contentData} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 inline-flex items-center gap-1.5 transition-colors"><i className="ri-external-link-line"></i>Open in Tab</a>
                          </div>
                          <div className="rounded-xl overflow-hidden border border-sand dark-theme:border-gray-800" style={{ height: '75vh' }}>
                            <iframe src={activeContent.contentData} title={activeContent.title} className="w-full h-full border-0" />
                          </div>
                        </div>
                      )}
                      {activeContent.contentType === 'text' && (
                        <div className="prose prose-sm dark-theme:prose-invert max-w-none">
                          <div className="bg-cream dark-theme:bg-gray-800 rounded-xl p-5 text-sm text-gray-700 dark-theme:text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {activeContent.contentData}
                          </div>
                        </div>
                      )}
                      {activeContent.description && (
                        <p className="mt-4 text-xs text-gray-500 border-t border-sand dark-theme:border-gray-800 pt-3">{activeContent.description}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Content List */}
                <div className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800">
                  <div className="px-5 py-3 border-b border-sand dark-theme:border-gray-800">
                    <h3 className="text-sm font-bold text-gray-700 dark-theme:text-gray-300">All Content ({(course.content || []).length})</h3>
                  </div>
                  <div className="divide-y divide-sand dark-theme:divide-gray-800">
                    {(course.content || []).map(c => (
                      <button key={c.id} onClick={() => setActiveContent(c)} className={`w-full px-5 py-3 flex items-center gap-3 text-left hover:bg-gray-50 dark-theme:hover:bg-gray-800/50 transition-colors ${activeContent?.id === c.id ? 'bg-primary/5 dark-theme:bg-primary/10' : ''}`}>
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${contentColors[c.contentType] || 'bg-gray-100 text-gray-500'}`}>
                          <i className={`${contentIcons[c.contentType] || 'ri-file-line'} text-sm`}></i>
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${activeContent?.id === c.id ? 'text-primary' : 'text-gray-700 dark-theme:text-gray-300'}`}>{c.title}</p>
                          <p className="text-[10px] text-gray-400">{c.subjectTitle || 'General'}</p>
                        </div>
                        {activeContent?.id === c.id && <i className="ri-play-fill text-primary"></i>}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseViewer;
