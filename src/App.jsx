import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import ScholarshipList from './pages/ScholarshipList';
import ScholarshipDetail from './pages/ScholarshipDetail'; // Энэ файлыг импортлоно
import Profile from './pages/Profile'; // Профайл хуудсаа импортлоно
import SavedScholarships from './pages/SavedScholarships';

function App() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <Router>
      <MainLayout activeCategory={activeCategory} setActiveCategory={setActiveCategory}>
        <Routes>
          {/* Нүүр хуудас */}
          <Route path="/" element={<Home activeCategory={activeCategory} setActiveCategory={setActiveCategory} />} />
          
          {/* Тэтгэлгийн жагсаалт */}
          <Route path="/scholarships" element={<ScholarshipList activeCategory={activeCategory} setActiveCategory={setActiveCategory} />} />
          
          {/* Тэтгэлгийн дэлгэрэнгүй (ID-аар) */}
          <Route path="/scholarship/:id" element={<ScholarshipDetail />} />
          
          {/* Хадгалсан тэтгэлгүүд */}
          <Route path="/saved" element={<SavedScholarships />} />
          
          {/* Хэрэглэгчийн профайл */}
          <Route path="/profile" element={<Profile />} />
          
          {/* 404 Хуудас (Буруу хаяг оруулбал) */}
          <Route path="*" element={<div className="p-20 text-center font-bold">404 - Page Not Found</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;