import React, { useState, useEffect } from 'react';
import { Bookmark, ClipboardList, CheckCircle2, LayoutGrid, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [checklists, setChecklists] = useState({});

  useEffect(() => {
    const loadData = () => {
      setSavedScholarships(JSON.parse(localStorage.getItem('savedScholarships') || '[]'));
      setChecklists(JSON.parse(localStorage.getItem('scholarshipChecklists') || '{}'));
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-green-200">
          U
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Миний Профайл</h1>
          <p className="text-slate-500 font-medium">Тэтгэлэгт бэлдэх явц болон хадгалсан материалууд</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Хадгалсан тэтгэлгүүд */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Bookmark className="text-green-500" /> Хадгалсан тэтгэлгүүд
            </h2>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
              Нийт {savedScholarships.length}
            </span>
          </div>

          {savedScholarships.length === 0 ? (
            <div className="p-16 border-2 border-dashed border-slate-200 rounded-[3rem] text-center space-y-4 bg-slate-50/50">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Bookmark className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold italic">Одоогоор хадгалсан тэтгэлэг алга.</p>
              <Link to="/" className="inline-block text-green-500 font-bold hover:underline">Тэтгэлэг хайх →</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {savedScholarships.map(item => (
                <Link to={`/scholarship/${item.id}`} key={item.id} className="group bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all flex items-center gap-4">
                  <img src={item.universityLogo} className="w-14 h-14 rounded-2xl object-contain border p-2" alt="" />
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-slate-800 truncate group-hover:text-green-600">{item.name}</h3>
                    <p className="text-xs text-slate-500">{item.country} • {item.deadline}</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-green-500" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Checklist-ийн явц */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200 sticky top-28">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <ClipboardList className="text-green-500" /> Материалын явц
            </h2>
            
            <div className="space-y-6">
              {Object.keys(checklists).length === 0 ? (
                <p className="text-slate-400 text-sm italic">Аль нэг тэтгэлэг рүү орж материал дээрээ "check" хийж эхлээрэй.</p>
              ) : (
                Object.entries(checklists).map(([id, items]) => {
                  const scholarship = savedScholarships.find(s => String(s.id) === id);
                  const completed = items.filter(i => i.checked).length;
                  const percent = Math.round((completed / items.length) * 100);

                  return (percent > 0 && (
                    <div key={id} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold truncate max-w-[150px]">{scholarship?.name || `ID: ${id}`}</span>
                        <span className="text-[10px] font-black text-green-400">{percent}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full transition-all duration-700" style={{ width: `${percent}%` }} />
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <CheckCircle2 size={12} className="text-green-500" /> {completed}/{items.length} бэлэн
                      </div>
                    </div>
                  ));
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;