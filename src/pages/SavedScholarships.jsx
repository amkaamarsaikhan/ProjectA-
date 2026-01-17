import React from 'react';
import { useAuth } from '../context/AuthContext';
import ScholarshipCard from '../components/Scholarship/ScholarshipCard';
import { BookmarkX, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedScholarships = () => {
  const { savedItems } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-4 mb-10">
        <Link to="/" className="p-3 hover:bg-white shadow-sm rounded-2xl transition-all border border-slate-100">
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            My Saved <span className="text-green-500">Checklist</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">You have {savedItems.length} items pinned</p>
        </div>
      </div>

      {savedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedItems.map((item) => (
            <ScholarshipCard key={item.id} scholarship={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
          <div className="p-6 bg-slate-50 rounded-full mb-6">
            <BookmarkX size={48} className="text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-700">No saved scholarships</h2>
          <p className="text-slate-400 mt-2 max-w-xs text-center">Your saved items will appear here. Start exploring!</p>
          <Link to="/" className="mt-8 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">
            Browse Opportunities
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedScholarships;