import React, { useState } from 'react';
import { Search, Bell, User, Menu, X, LogOut, ChevronDown, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/?search=${searchValue}`);
      setIsMenuOpen(false);
    }
  };

  // Login товч дээр дарахад шууд /login хуудас руу шилжүүлнэ
  const handleLoginClick = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* 1. Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-green-500 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-green-500/20">
              <img src={logoImg} alt="Logo" className="w-8 h-8 object-contain" style={{ mixBlendMode: 'multiply', filter: 'contrast(1.2)' }} />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight hidden sm:block">
              Project<span className="text-green-500">A+</span>
            </span>
          </Link>

          {/* 2. Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search for scholarships..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500/10 transition-all outline-none"
            />
          </form>

          {/* 3. Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-all active:scale-95"
                >
                  <div className="w-8 h-8 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {user.name ? user.name[0] : 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-black text-slate-700">{user.name}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-[60]">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 font-medium"
                    >
                      <User size={16} /> My Profile
                    </Link>
                    <button
                      onClick={() => { logout(); setIsProfileOpen(false); navigate('/'); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-bold transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/signup" className="text-sm font-bold text-slate-600 hover:text-slate-900 px-2">
                  Sign Up
                </Link>
                <button
                  onClick={handleLoginClick}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95 text-sm"
                >
                  Login
                </button>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-4 space-y-4 shadow-xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-100 rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>

          <div className="space-y-2">
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block p-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700">
                  My Profile
                </Link>
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }}
                  className="w-full p-3 bg-red-50 rounded-xl text-sm font-bold text-red-500 text-left flex items-center gap-2"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/signup" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-3 bg-slate-100 rounded-xl text-sm font-bold text-slate-700"
                >
                  <UserPlus size={18} /> Sign Up
                </Link>
                <button
                  onClick={handleLoginClick}
                  className="p-3 bg-slate-900 rounded-xl text-sm font-bold text-white shadow-md shadow-slate-900/20"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;