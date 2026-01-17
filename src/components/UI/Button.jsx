import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    outline: 'border-2 border-slate-200 text-slate-600 hover:border-green-500 hover:text-green-500',
    ghost: 'text-slate-500 hover:bg-slate-100'
  };

  return (
    <button 
      className={`px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;