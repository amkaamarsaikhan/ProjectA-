import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Hero from './components/Layout/Hero';
import ScholarshipList from './pages/ScholarshipList';
import scholarshipsData from './data/scholarships.json';

function App() {
  const [filterType, setFilterType] = useState('All');

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        
        <div className="flex flex-1 max-w-7xl mx-auto w-full">
          <aside className="hidden lg:block w-64 border-r border-slate-50 py-8">
            <Sidebar 
              activeCategory={filterType} 
              setActiveCategory={setFilterType} 
            />
          </aside>

          <main className="flex-1 px-4 sm:px-8 py-8 bg-white text-slate-800">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero onFilterChange={setFilterType} currentFilter={filterType} />
                  <div className="mt-12">
                    <ScholarshipList 
                      activeCategory={filterType} 
                      setActiveCategory={setFilterType}
                    />
                  </div>
                </>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;