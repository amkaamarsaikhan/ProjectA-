import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import scholarshipData from '../data/scholarships.json';
import { useScholarshipLogic } from '../hooks/useScholarshipLogic';
import ScholarshipCard from '../components/Scholarship/ScholarshipCard';
import Input from '../components/UI/Input';
import { Search, FilterX } from 'lucide-react'; // <--- Энд 'lucide-center'-ийг 'lucide-react' болгож засав

const ScholarshipList = ({ activeCategory, setActiveCategory }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get('search') || '';

  const { searchQuery, setSearchQuery, filteredData } = useScholarshipLogic(scholarshipData, activeCategory);

  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery, setSearchQuery]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchParams(value ? { search: value } : {});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
            Explore <span className="text-green-500 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Scholarships</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            {activeCategory !== 'All' ? `Category: ${activeCategory} | ` : ''}
            {searchQuery ? `Found ${filteredData.length} results for "${searchQuery}"` : `Discover ${filteredData.length} global opportunities`}
          </p>
        </div>
        
        <div className="w-full md:w-96 group">
          <Input 
            icon={Search}
            placeholder="Country, university or name..."
            value={searchQuery}
            onChange={handleInputChange}
            className="shadow-sm group-focus-within:shadow-green-500/10 transition-all"
          />
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8">
          {filteredData.map((item) => (
            <ScholarshipCard key={item.id} scholarship={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
          <div className="p-5 bg-slate-50 rounded-full mb-5">
            <FilterX size={48} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">No results found</h3>
          <p className="text-slate-400 text-sm mt-2 max-w-xs text-center">Try a different keyword or browse by categories.</p>
          <button 
            onClick={() => {
              setSearchQuery(''); 
              setSearchParams({});
              setActiveCategory('All'); 
            }} 
            className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ScholarshipList;