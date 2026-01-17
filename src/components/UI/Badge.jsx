import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-600',
    success: 'bg-green-50 text-green-600 border border-green-100',
    danger: 'bg-red-50 text-red-600 border border-red-100',
    warning: 'bg-orange-50 text-orange-600 border border-orange-100'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;