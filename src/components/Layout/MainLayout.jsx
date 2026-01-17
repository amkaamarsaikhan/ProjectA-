import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children, activeCategory, setActiveCategory }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4 md:p-6">
        {/* Энд setActiveCategory дамжиж байгаа эсэхийг сайн шалгаарай */}
        <Sidebar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;