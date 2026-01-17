import React from 'react';

const Input = ({ label, icon: Icon, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>}
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-3 text-slate-400" size={18} />}
        <input 
          className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all ${Icon ? 'pl-10' : 'px-4'} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;