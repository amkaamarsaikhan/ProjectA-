import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe2, Building2, ExternalLink, GraduationCap, CheckCircle2 } from 'lucide-react';
import scholarshipData from '../data/scholarships.json';
import DeadlineTimer from '../components/Scholarship/DeadlineTimer';

const ScholarshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 1. Тэтгэлгийн мэдээллийг олох
  const scholarship = scholarshipData.find(s => String(s.id) === String(id));

  // 2. Checklist-ийн төлөвийг удирдах (localStorage-оос авах эсвэл анхны утга)
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    if (scholarship) {
      const savedChecklists = JSON.parse(localStorage.getItem('scholarshipChecklists') || '{}');
      
      if (savedChecklists[id]) {
        // Өмнө нь хадгалсан checklist байвал түүнийг ашиглана
        setMaterials(savedChecklists[id]);
      } else {
        // Байхгүй бол json-оос ирсэн материалыг checked: false төлөвтэй бэлдэнэ
        const initialMaterials = (scholarship.materials || []).map(m => ({
          name: m,
          checked: false
        }));
        setMaterials(initialMaterials);
      }
    }
  }, [id, scholarship]);

  // 3. Checklist өөрчлөх ба хадгалах функц
  const handleCheck = (index) => {
    const updated = [...materials];
    updated[index].checked = !updated[index].checked;
    setMaterials(updated);

    // LocalStorage руу хадгалах
    const allChecklists = JSON.parse(localStorage.getItem('scholarshipChecklists') || '{}');
    allChecklists[id] = updated;
    localStorage.setItem('scholarshipChecklists', JSON.stringify(allChecklists));
    
    // Профайл хуудас руу мэдэгдэл илгээх
    window.dispatchEvent(new Event('storage'));
  };

  if (!scholarship) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-bold text-slate-800">Scholarship not found</h2>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-green-500 text-white rounded-xl font-bold">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-12">
      {/* Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-green-600 font-bold transition-all group w-fit"
        >
          <div className="p-2 rounded-xl group-hover:bg-green-50 transition-all">
            <ArrowLeft size={20} />
          </div>
          Back to list
        </button>
        <DeadlineTimer deadline={scholarship.deadline} />
      </div>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-14">
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="w-28 h-28 bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 flex items-center justify-center p-5 border border-slate-50 shrink-0">
              <img src={scholarship.universityLogo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 italic">
                  <Globe2 size={12} /> {scholarship.country}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 italic">
                  <GraduationCap size={12} /> {scholarship.level}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-[1.1]">
                {scholarship.name}
              </h1>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800">Overview</h3>
            <p className="text-slate-500 leading-relaxed text-lg italic">"{scholarship.description}"</p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-800">Eligibility & Requirements</h3>
            <ul className="grid md:grid-cols-2 gap-5">
              {(scholarship.requirements || []).map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar - Application Tracker */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl shadow-slate-300">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-3">Application Tracker</h3>
              
              {/* Checklist UI */}
              <div className="space-y-3">
                {materials.map((item, index) => (
                  <label 
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border ${
                      item.checked ? 'bg-green-500/10 border-green-500/20' : 'bg-slate-800/50 border-transparent hover:bg-slate-800'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      className="hidden"
                      checked={item.checked}
                      onChange={() => handleCheck(index)}
                    />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      item.checked ? 'bg-green-500 border-green-500' : 'border-slate-600'
                    }`}>
                      {item.checked && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <span className={`text-sm font-medium ${item.checked ? 'text-green-400 line-through' : 'text-slate-300'}`}>
                      {item.name}
                    </span>
                  </label>
                ))}
              </div>

              <a 
                href={scholarship.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-8 flex items-center justify-center gap-2 w-full py-4.5 rounded-2xl bg-green-500 text-white font-black hover:bg-green-400 transition-all shadow-xl shadow-green-500/20 active:scale-[0.98] h-14"
              >
                Visit Official Website <ExternalLink size={18} />
              </a>
            </div>

            <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex gap-4">
              <span className="text-2xl">💡</span>
              <p className="text-amber-900 text-[13px] font-bold leading-relaxed italic">
                Tip: Prepare your Personal Statement at least 2 months before the deadline!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetail;