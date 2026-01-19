import { useState, useMemo } from 'react';

export const useScholarshipLogic = (data, activeCategory) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!data) return [];

    const searchLower = searchQuery.toLowerCase().trim();

    return data.filter((item) => {
      // 1. Хайлтын логик (Нэр, Улс, Их сургуулиар)
      const matchesSearch = 
        searchLower === '' ||
        item.name.toLowerCase().includes(searchLower) ||
        item.country.toLowerCase().includes(searchLower) ||
        (item.university && item.university.toLowerCase().includes(searchLower));
      
      // 2. Sidebar-ын шүүлтүүр (Ангилал эсвэл Улсаар)
      const matchesCategory = 
        activeCategory === 'All' || 
        item.category === activeCategory || 
        item.country === activeCategory;

      if (searchLower !== '') {
        return matchesSearch;
      }
      
      return matchesCategory;
    });
  }, [data, searchQuery, activeCategory]);

  return { searchQuery, setSearchQuery, filteredData };
};