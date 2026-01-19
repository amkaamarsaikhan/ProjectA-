import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, GraduationCap, ChevronRight, Bookmark } from 'lucide-react';
import DeadlineTimer from './DeadlineTimer';
import { useAuth } from '../../context/AuthContext'; // 1. AuthContext-ийг импортлох

const ScholarshipCard = ({ scholarship }) => {
  // 2. AuthContext-өөс хэрэгцээт функц, датаг авах
  const { toggleSave, savedItems } = useAuth();

  // 3. Энэ тэтгэлэг хадгалагдсан эсэхийг Context-оос шалгах
  const isSaved = savedItems.some(item => item.id === scholarship.id);

  const handleToggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Карт руу үсрэхээс сэргийлэх
    toggleSave(scholarship); // Context-ийн функцийг дуудах
  };

  return (
    <div className="group relative bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 flex flex-col justify-between h-full">
      {/* Хадгалах товчлуур */}
      <button 
        onClick={handleToggleSave}
        className={`absolute top-6 right-6 z-10 p-2.5 rounded-xl transition-all active:scale-90 ${
          isSaved 
            ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
            : 'bg-slate-50 text-slate-400 hover:text-green-500'
        }`}
      >
        <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
      </button>

      <div>
        <div className="flex justify-between items-start mb-5">
          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
            {scholarship.category}
          </span>
          <div className="mr-10">
             <DeadlineTimer deadline={scholarship.deadline} />
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-green-600 transition-colors leading-tight pr-8">
          {scholarship.name}
        </h3>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={16} className="text-green-500" />
            <span>{scholarship.country}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <GraduationCap size={16} className="text-green-500" />
            <span>{scholarship.level}</span>
          </div>
        </div>

        <p className="text-sm text-slate-400 line-clamp-2 mb-6 italic">
          "{scholarship.description}"
        </p>
      </div>

      <Link 
        to={`/scholarship/${scholarship.id}`}
        className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 text-slate-700 font-bold rounded-2xl group-hover:bg-green-500 group-hover:text-white transition-all active:scale-95"
      >
        View Details
        <ChevronRight size={18} />
      </Link>
    </div>
  );
};

export default ScholarshipCard;