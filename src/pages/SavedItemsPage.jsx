import React from 'react';
import { useAuth } from '../context/AuthContext';
import ScholarshipCard from '../components/Scholarship/ScholarshipCard'; // Замаа шалгаарай
import { BookmarkX } from 'lucide-react';

const SavedItemsPage = () => {
  const { savedItems } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Saved Scholarships</h1>
          <p className="text-slate-500 mt-2">You have {savedItems.length} items in your wishlist.</p>
        </div>

        {savedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
            <div className="p-4 bg-slate-50 rounded-full mb-4">
              <BookmarkX size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-medium text-lg">No scholarships saved yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedItems.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedItemsPage;