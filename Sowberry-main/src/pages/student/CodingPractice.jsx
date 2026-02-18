import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { studentApi } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const CodingPractice = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await studentApi.getCodingProblems();
      if (res.success) setProblems(res.problems || []);
      setLoading(false);
    };
    fetchProblems();
  }, []);

  const filteredProblems = filter === 'all' ? problems : problems.filter(p => p.difficulty === filter);
  const diffColors = { easy: 'bg-green-100 text-green-700', medium: 'bg-amber-100 text-amber-700', hard: 'bg-red-100 text-red-700' };

  return (
    <DashboardLayout pageTitle="Coding Practice" role="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div><h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Coding Practice</h1><p className="text-sm text-gray-500 mt-1">{filteredProblems.length} problems</p></div>
          <div className="flex bg-cream dark-theme:bg-gray-800 rounded-xl p-1">
            {['all', 'easy', 'medium', 'hard'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${filter === f ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}>{f}</button>
            ))}
          </div>
        </div>

        {loading ? null :
        filteredProblems.length === 0 ? <div className="text-center py-20 text-gray-400"><i className="ri-code-s-slash-line text-4xl mb-3 block"></i><p>No problems available</p></div> :
        <div className="space-y-3">
          {filteredProblems.map((p, i) => (
            <div key={p.id || i} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="text-sm font-bold text-primary">{i + 1}</span></div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm">{p.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{p.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${diffColors[p.difficulty] || diffColors.easy}`}>{p.difficulty}</span>
                      {p.category && <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark-theme:bg-gray-800 text-gray-600">{p.category}</span>}
                    </div>
                  </div>
                </div>
                <button onClick={() => navigate(`/student/code-editor?problem=${p.id}`)} className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-dark flex-shrink-0">
                  <i className="ri-code-line mr-1"></i>Solve
                </button>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </DashboardLayout>
  );
};
export default CodingPractice;
