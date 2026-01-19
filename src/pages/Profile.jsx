import React from 'react';
import { Bookmark, ClipboardList, CheckCircle2, ArrowRight, Mail, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Context-ийг импортлох

const Profile = () => {
  // AuthContext-өөс хэрэглэгчийн мэдээлэл болон хадгалсан датаг авах
  const { user, savedItems } = useAuth();
  
  // Checklist-ийг localStorage-оос хэвээр нь уншина
  const checklists = JSON.parse(localStorage.getItem('scholarshipChecklists') || '{}');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
          <p className="text-slate-500 font-bold mb-4">Та нэвтрэх шаардлагатай.</p>
          <Link to="/login" className="px-8 py-3 bg-green-500 text-white rounded-2xl font-black shadow-lg shadow-green-200 inline-block">Нэвтрэх</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 1. Header хэсэг */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-green-200">
            {user.name ? user.name[0] : 'U'}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-800 mb-2">{user.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-green-500" />
                {user.email}
              </div>
              <div className="flex items-center gap-2">
                <Bookmark size={18} className="text-green-500" />
                {savedItems.length} Хадгалсан тэтгэлэг
              </div>
            </div>
          </div>
          <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-slate-600 transition-all">
            <Settings size={24} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* 2. Хадгалсан тэтгэлгүүд (Зүүн тал) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Bookmark className="text-green-500" /> Хадгалсан тэтгэлгүүд
            </h2>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
              Нийт {savedItems.length}
            </span>
          </div>

          {savedItems.length === 0 ? (
            <div className="p-16 border-2 border-dashed border-slate-200 rounded-[3rem] text-center space-y-4 bg-white">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Bookmark className="text-slate-200" />
              </div>
              <p className="text-slate-400 font-bold italic">Одоогоор хадгалсан тэтгэлэг алга.</p>
              <Link to="/" className="inline-block text-green-500 font-black hover:underline">Тэтгэлэг хайх →</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {savedItems.map(item => (
                <Link to={`/scholarship/${item.id}`} key={item.id} className="group bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-green-500/5 transition-all flex items-center gap-4">
                  {item.universityLogo ? (
                    <img src={item.universityLogo} className="w-14 h-14 rounded-2xl object-contain border p-2 bg-slate-50" alt="" />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 font-bold border">Logo</div>
                  )}
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-slate-800 truncate group-hover:text-green-600">{item.name}</h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{item.country} • {item.deadline}</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-green-500 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 3. Материалын явц (Баруун тал) */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200 sticky top-28">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <ClipboardList className="text-green-400" /> Материалын явц
            </h2>
            
            <div className="space-y-6">
              {Object.keys(checklists).length === 0 ? (
                <p className="text-slate-400 text-sm italic leading-relaxed">Аль нэг тэтгэлэг рүү орж материал дээрээ "check" хийж эхлээрэй.</p>
              ) : (
                Object.entries(checklists).map(([id, items]) => {
                  // savedItems дотроос тухайн тэтгэлгийг хайж олно
                  const scholarship = savedItems.find(s => String(s.id) === id);
                  const completed = items.filter(i => i.checked).length;
                  const percent = Math.round((completed / items.length) * 100);

                  // Зөвхөн хадгалагдсан байгаа тэтгэлгийн явцыг харуулна
                  if (!scholarship) return null;

                  return (
                    <div key={id} className="space-y-3">
                      <div className="flex justify-between items-end gap-2">
                        <span className="text-sm font-bold truncate text-slate-100">{scholarship.name}</span>
                        <span className="text-[10px] font-black text-green-400 whitespace-nowrap">{percent}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-400 h-full transition-all duration-1000" 
                          style={{ width: `${percent}%` }} 
                        />
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                        <CheckCircle2 size={12} className="text-green-400" /> {completed}/{items.length} БЭЛЭН БОЛСОН
                      </div>
                    </div>
                  );
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