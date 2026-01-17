import React from 'react';
import { LayoutGrid, Globe, ShieldCheck, Bookmark } from 'lucide-react';
import { countries } from '../../data/countries';

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  const menuItems = [
    { id: 'All', icon: <LayoutGrid size={20} />, label: 'All Opportunities' },
    { id: 'Saved', icon: <Bookmark size={20} />, label: 'Saved Items' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col gap-6 p-4 border-r border-slate-100 min-h-[calc(100vh-4rem)] sticky top-20 z-10 bg-white">
        
        {/* Main Menu хэсэг */}
        <div className="relative z-20">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-3 mb-3 italic">Main Menu</p>
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  console.log("Clicked category:", item.id); // Ажиллаж байгааг шалгах
                  setActiveCategory(item.id);
                }}
                type="button"
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                  activeCategory === item.id 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="pointer-events-none">{item.icon}</span>
                <span className="pointer-events-none">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Улсуудаар шүүх хэсэг */}
        <div className="relative z-20">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-3 mb-3 italic">Popular Countries</p>
          <div className="flex flex-col gap-1">
            {countries && countries.slice(0, 13).map((country) => (
              <button 
                key={country.id} 
                type="button"
                onClick={() => {
                  console.log("Clicked country:", country.name);
                  setActiveCategory(country.name);
                }}
                className={`flex items-center justify-between px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer group active:scale-95 ${
                  activeCategory === country.name 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 pointer-events-none">
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Category Scroll */}
      <div className="lg:hidden flex overflow-x-auto gap-2 p-4 no-scrollbar bg-white/90 backdrop-blur-md sticky top-16 z-40 border-b border-slate-100">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveCategory(item.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
              activeCategory === item.id 
              ? 'bg-green-500 text-white shadow-md' 
              : 'bg-slate-100 text-slate-500 border border-transparent hover:bg-slate-200'
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;