import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Hero from './components/Layout/Hero';
import ScholarshipList from './pages/ScholarshipList';
import ScholarshipDetail from './pages/ScholarshipDetail'; // 1. Импортоо нэмнэ
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import SavedItemsPage from './pages/SavedItemsPage';

const AppContent = () => {
  const [filterType, setFilterType] = useState('All');
  const location = useLocation();

  // Sidebar-ыг нуух хуудсууд (Auth, Profile болон Тэтгэлгийн дэлгэрэнгүй хуудас)
  const isSpecialPage = [
    '/login', 
    '/signup', 
    '/profile'
  ].includes(location.pathname) || location.pathname.startsWith('/scholarship/');

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <div className="flex flex-1 w-full">
        {!isSpecialPage && (
          <aside className="hidden lg:block w-64 border-r border-slate-50 py-8 sticky top-20 h-[calc(100vh-5rem)]">
            <Sidebar 
              activeCategory={filterType} 
              setActiveCategory={setFilterType} 
            />
          </aside>
        )}

        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col">
                <Hero onFilterChange={setFilterType} currentFilter={filterType} />
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
                  <ScholarshipList 
                    activeCategory={filterType} 
                    setActiveCategory={setFilterType}
                  />
                </div>
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/scholarship/:id" element={<ScholarshipDetail />} />
            <Route path="/saved" element={<SavedItemsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;