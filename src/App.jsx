import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // AuthContext-ийг импортлох
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Hero from './components/Layout/Hero';
import ScholarshipList from './pages/ScholarshipList';
import ScholarshipDetail from './pages/ScholarshipDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import SavedItemsPage from './pages/SavedItemsPage';
import AdminPanel from './pages/AdminPanel'; // Админ хуудсаа импортлох

const AppContent = () => {
  const [filterType, setFilterType] = useState('All');
  const { user, loading } = useAuth(); // loading төлөвийг нэмж авна
  const location = useLocation();

  // 1. Firebase хэрэглэгчийг таньж дуустал түр хүлээнэ (Цагаан дэлгэц эсвэл Redirect-ээс сэргийлнэ)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Sidebar-ыг нуух хуудсууд
  const isSpecialPage = [
    '/login', 
    '/signup', 
    '/profile',
    '/admin'
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
            
            {/* 2. Админ хуудасны хамгаалалттай зам */}
            <Route 
              path="/admin" 
              element={
                user && user.email === "amarjargal202107@gmail.com" ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
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