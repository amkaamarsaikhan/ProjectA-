import React, { useState } from 'react';
import { CheckCircle2, Circle, ListChecks } from 'lucide-react';

const RequirementChecklist = ({ materials = [] }) => {
  // Материал бүрийн төлөвийг (checked/unchecked) хадгалах state
  const [checkedItems, setCheckedItems] = useState({});

  // Чагтыг солих функц
  const toggleItem = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Хэдэн хувьтай бэлтгэл хангагдсаныг тооцоолох
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = materials.length > 0 
    ? Math.round((completedCount / materials.length) * 100) 
    : 0;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ListChecks className="text-green-400" size={24} />
          <h3 className="text-lg font-black text-white">Material Checklist</h3>
        </div>
        <span className="text-xs font-bold bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
          {progressPercent}% Done
        </span>
      </div>

      {/* Progress Bar - Процесс харуулах шугам */}
      <div className="w-full h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-3">
        {materials.length > 0 ? (
          materials.map((material, index) => (
            <button
              key={index}
              onClick={() => toggleItem(index)}
              className={`w-full flex items-start gap-3 p-3 rounded-2xl transition-all border ${
                checkedItems[index] 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              {checkedItems[index] ? (
                <CheckCircle2 size={20} className="text-green-500 mt-0.5 shrink-0" />
              ) : (
                <Circle size={20} className="text-white/30 mt-0.5 shrink-0" />
              )}
              <span className={`text-sm text-left leading-relaxed ${
                checkedItems[index] ? 'text-white font-medium' : 'text-white/60'
              }`}>
                {material}
              </span>
            </button>
          ))
        ) : (
          <p className="text-white/40 text-sm italic">No materials listed.</p>
        )}
      </div>

      {completedCount === materials.length && materials.length > 0 && (
        <div className="mt-6 p-3 bg-green-500 rounded-2xl text-center animate-bounce">
          <p className="text-white text-xs font-black uppercase">✨ Ready to apply!</p>
        </div>
      )}
    </div>
  );
};

export default RequirementChecklist;