import { useState, useMemo } from 'react';

/**
 * Өгөгдлийг категор болон хайлтаар шүүх Custom Hook
 */
export const useFilter = (data = []) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // useMemo ашиглан өгөгдөл өөрчлөгдөх бүрт шүүлтүүрийг дахин тооцоолно
  const filteredItems = useMemo(() => {
    return data.filter((item) => {
      // 1. Категороор шүүх
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      
      // 2. Хайлтаар шүүх (Нэр болон Улсаар)
      const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.country?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [data, activeCategory, searchQuery]);

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredItems
  };
};