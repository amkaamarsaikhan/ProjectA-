import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import scholarshipData from '../data/scholarships.json';
import { useScholarshipLogic } from '../hooks/useScholarshipLogic';
import ScholarshipCard from '../components/Scholarship/ScholarshipCard';
import Input from '../components/UI/Input';
import { Search, FilterX } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Explore <span className="text-green-500">Scholarships</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
             Current Filter: <span className="text-green-600 font-bold">{activeCategory}</span> | {filteredData.length} opportunities
          </p>
        </div>
        
        <div className="w-full md:w-96 group">
          <Input 
            icon={Search}
            placeholder="Search country, university..."
            value={searchQuery}
            onChange={handleInputChange}
            className="bg-slate-50 border-none rounded-2xl"
          />
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredData.map((item) => (
            <ScholarshipCard key={item.id} scholarship={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
          <FilterX size={48} className="text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700">No matching scholarships</h3>
          <button 
            onClick={() => {
              setSearchQuery(''); 
              setSearchParams({});
              setActiveCategory('All'); 
            }} 
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ScholarshipList;