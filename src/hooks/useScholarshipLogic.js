import { useState, useMemo } from 'react';

export const useScholarshipLogic = (data, activeCategory) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      // 1. Хайлтаар шүүх (Нэр болон Улсаар)
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Sidebar-ын төрлөөр шүүх
      // item.category болон item.country-той тулгаж шалгана
      const matchesCategory = 
        activeCategory === 'All' || 
        item.category === activeCategory || 
        item.country === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchQuery, activeCategory]); // <--- activeCategory энд заавал байх ёстой!

  return { searchQuery, setSearchQuery, filteredData };
};