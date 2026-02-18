import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { studentApi } from '../../utils/api';

const BUILTIN_MATERIALS = [
  { id: 'b1', title: 'Introduction to HTML & CSS', description: 'Learn the fundamentals of web page structure and styling.', type: 'document', courseName: 'Web Development', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' },
  { id: 'b2', title: 'JavaScript ES6+ Guide', description: 'Modern JavaScript features — arrow functions, destructuring, promises and more.', type: 'document', courseName: 'Web Development', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
  { id: 'b3', title: 'React Official Tutorial', description: 'Step-by-step guide to building a React application.', type: 'link', courseName: 'Web Development', url: 'https://react.dev/learn' },
  { id: 'b4', title: 'Data Structures — Arrays & Linked Lists', description: 'Comprehensive guide to linear data structures with examples.', type: 'pdf', courseName: 'Data Structures & Algorithms', url: 'https://www.geeksforgeeks.org/data-structures/' },
  { id: 'b5', title: 'Sorting Algorithms Visualized', description: 'Animated visualizations of Bubble, Selection, Merge and Quick sort.', type: 'video', courseName: 'Data Structures & Algorithms', url: 'https://visualgo.net/en/sorting' },
  { id: 'b6', title: 'Python Crash Course', description: 'Variables, loops, functions and OOP in Python 3.', type: 'document', courseName: 'Python Programming', url: 'https://docs.python.org/3/tutorial/' },
  { id: 'b7', title: 'SQL Fundamentals', description: 'SELECT, JOIN, GROUP BY and subqueries explained with examples.', type: 'notes', courseName: 'Database Management', url: 'https://www.w3schools.com/sql/' },
  { id: 'b8', title: 'Git & GitHub Basics', description: 'Version control essentials — commit, branch, merge and pull requests.', type: 'link', courseName: 'Software Engineering', url: 'https://docs.github.com/en/get-started' },
  { id: 'b9', title: 'Machine Learning with Scikit-Learn', description: 'Beginner guide to classification, regression and clustering.', type: 'document', courseName: 'Machine Learning', url: 'https://scikit-learn.org/stable/tutorial/' },
  { id: 'b10', title: 'CSS Flexbox & Grid Cheat Sheet', description: 'Quick reference for modern CSS layout techniques.', type: 'presentation', courseName: 'Web Development', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
  { id: 'b11', title: 'Operating System Concepts', description: 'Processes, threads, memory management and file systems.', type: 'pdf', courseName: 'Operating Systems', url: 'https://www.geeksforgeeks.org/operating-systems/' },
  { id: 'b12', title: 'Networking Fundamentals', description: 'TCP/IP, DNS, HTTP and network security basics.', type: 'notes', courseName: 'Computer Networks', url: 'https://www.cloudflare.com/learning/' },
];

const StudyMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewingMaterial, setViewingMaterial] = useState(null);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchMaterials = async () => {
      const res = await studentApi.getStudyMaterials();
      const dbMaterials = res.success ? (res.materials || []) : [];
      const allMats = [...dbMaterials, ...BUILTIN_MATERIALS.filter(b => !dbMaterials.some(d => d.title === b.title))];
      setMaterials(allMats);
      setLoading(false);
    };
    fetchMaterials();
  }, []);

  const filtered = materials.filter(m => {
    const matchSearch = m.title?.toLowerCase().includes(search.toLowerCase()) || m.courseName?.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || (m.type || 'document') === filterType;
    return matchSearch && matchType;
  });

  const types = ['all', 'pdf', 'video', 'document', 'link', 'presentation', 'notes'];
  const typeIcons = { pdf: 'ri-file-pdf-2-line', video: 'ri-video-line', document: 'ri-file-text-line', link: 'ri-link', presentation: 'ri-slideshow-line', notes: 'ri-sticky-note-line' };
  const typeColors = { pdf: 'bg-red-500/15 text-red-400', video: 'bg-blue-500/15 text-blue-400', document: 'bg-green-500/15 text-green-400', link: 'bg-primary/15 text-primary', presentation: 'bg-amber-500/15 text-amber-400', notes: 'bg-teal-500/15 text-teal-400' };

  const openMaterial = (m) => {
    if (m.url) setViewingMaterial(m);
  };

  if (viewingMaterial) {
    return (
      <DashboardLayout pageTitle="Study Material" role="student">
        <div className="space-y-4 h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => setViewingMaterial(null)} className="px-3 py-2 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-gray-500 dark-theme:text-gray-400 text-sm hover:bg-cream-dark dark-theme:hover:bg-gray-700 transition-colors flex items-center gap-1.5 flex-shrink-0">
                <i className="ri-arrow-left-line"></i>Back
              </button>
              <div className="min-w-0">
                <h2 className="font-bold text-gray-800 dark-theme:text-gray-100 truncate">{viewingMaterial.title}</h2>
                <p className="text-xs text-gray-500 dark-theme:text-gray-400">{viewingMaterial.courseName || 'General'}</p>
              </div>
            </div>
            <a href={viewingMaterial.url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors flex items-center gap-1.5 flex-shrink-0">
              <i className="ri-external-link-line"></i>Open in Tab
            </a>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
            <iframe
              src={viewingMaterial.url}
              title={viewingMaterial.title}
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Study Material" role="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Study Materials</h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">{materials.length} resources available</p>
          </div>
          <div className="relative w-full sm:w-64">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark-theme:text-gray-500 text-sm"></i>
            <input type="text" placeholder="Search materials..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-800 dark-theme:text-gray-100 placeholder-gray-400 dark-theme:placeholder-gray-500" />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {types.map(t => (
            <button key={t} onClick={() => setFilterType(t)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filterType === t ? 'bg-primary text-white' : 'bg-cream dark-theme:bg-gray-800 text-gray-500 dark-theme:text-gray-500 border border-sand dark-theme:border-gray-700 hover:border-gray-400 dark-theme:hover:border-gray-600'}`}>
              {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {loading ? null :
        filtered.length === 0 ? <div className="text-center py-20 text-gray-400 dark-theme:text-gray-500"><i className="ri-file-text-line text-4xl mb-3 block"></i><p>{search ? 'No matching materials found' : 'No study materials available'}</p></div> :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m, i) => {
            const mType = m.type || 'document';
            return (
              <div key={m.id || i} onClick={() => openMaterial(m)} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[mType] || typeColors.document}`}>
                    <i className={`${typeIcons[mType] || typeIcons.document} text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm truncate group-hover:text-primary transition-colors">{m.title}</h3>
                    <p className="text-[11px] text-gray-400 dark-theme:text-gray-500 mt-0.5">{m.courseName || 'General'}</p>
                  </div>
                </div>
                {m.description && <p className="text-xs text-gray-500 dark-theme:text-gray-400 line-clamp-2 mb-3">{m.description}</p>}
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${typeColors[mType] || typeColors.document}`}>{mType}</span>
                  <span className="text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><i className="ri-eye-line"></i>View</span>
                </div>
              </div>
            );
          })}
        </div>}
      </div>
    </DashboardLayout>
  );
};
export default StudyMaterial;
