import React from 'react';
import { LayoutGrid, Bookmark } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // useNavigate нэмсэн
import { countries } from '../../data/countries';

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Шилжилт хийх функц

  // Нүүр хуудас руу шилжиж, категори сонгох функц
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (location.pathname !== '/') {
      navigate('/'); // Хэрэв нүүр хуудас дээр биш бол нүүр хуудас руу шилжүүлнэ
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col gap-6 p-4 border-r border-slate-100 min-h-[calc(100vh-4rem)] sticky top-20 z-10 bg-white">
        
        <div className="relative z-20">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-3 mb-3 italic">Main Menu</p>
          <div className="flex flex-col gap-1">
            
            {/* All Opportunities - Засварласан хэсэг */}
            <button
              onClick={() => handleCategoryClick('All')}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all cursor-pointer active:scale-95 ${
                activeCategory === 'All' && location.pathname === '/'
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LayoutGrid size={20} />
              <span>All Opportunities</span>
            </button>

            {/* Saved Items */}
            <Link
              to="/saved"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all active:scale-95 ${
                location.pathname === '/saved'
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Bookmark size={20} />
              <span>Saved Items</span>
            </Link>

          </div>
        </div>

        {/* Popular Countries */}
        <div className="relative z-20">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-3 mb-3 italic">Popular Countries</p>
          <div className="flex flex-col gap-1">
            {countries && countries.slice(0, 13).map((country) => (
              <button 
                key={country.id} 
                onClick={() => handleCategoryClick(country.name)} // Засварласан хэсэг
                className={`flex items-center justify-between px-4 py-2 text-sm font-medium rounded-xl transition-all group active:scale-95 ${
                  activeCategory === country.name && location.pathname === '/'
                  ? 'bg-green-100 text-green-700' 
                  : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
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
        <button
          onClick={() => handleCategoryClick('All')} // Засварласан хэсэг
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            activeCategory === 'All' && location.pathname === '/' ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500'
          }`}
        >
          <LayoutGrid size={18} /> All
        </button>
        <Link
          to="/saved"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            location.pathname === '/saved' ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500'
          }`}
        >
          <Bookmark size={18} /> Saved
        </Link>
        {/* Мобайл дээр улсууд сонгогдоход мөн адил handleCategoryClick ашиглаж болно */}
      </div>
    </>
  );
};

export default Sidebar;
