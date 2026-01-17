import React from 'react';
import { Clock } from 'lucide-react';

// Export default-ийг шууд функц зарлах үед нь нэмлээ
export default function DeadlineTimer({ deadline }) {
  
  // Өгөгдсөн deadline-аас одоог хүртэлх хоногийг тооцоолох
  const calculateDaysLeft = (date) => {
    if (!date) return 0;
    const targetDate = new Date(date);
    const now = new Date();
    
    // Миллисекундээс хоног руу шилжүүлэх
    const diffTime = targetDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft(deadline);
  
  // Төлөвөөс хамаарч өнгө өөрчлөх (Status Styling)
  const getStatusStyles = () => {
    if (daysLeft <= 0) {
      return 'bg-slate-100 text-slate-500 border-slate-200';
    }
    if (daysLeft <= 7) {
      return 'bg-red-50 text-red-600 border-red-200';
    }
    if (daysLeft <= 30) {
      return 'bg-orange-50 text-orange-600 border-orange-200';
    }
    return 'bg-green-50 text-green-600 border-green-200';
  };

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border transition-colors ${getStatusStyles()}`}>
      <Clock size={12} strokeWidth={3} />
      <span className="uppercase tracking-tight">
        {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
      </span>
    </div>
  );
}