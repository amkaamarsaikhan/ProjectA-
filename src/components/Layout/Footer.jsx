import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="text-slate-500 text-sm">
            © 2026 <span className="font-bold text-slate-800">Project A+</span>. All rights reserved.
          </p>
        </div>
        <div className="flex gap-8 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-green-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-green-500 transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;