import React from 'react';
import Hero from '../components/Layout/Hero'
import ScholarshipList from './ScholarshipList';

const Home = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="space-y-10">
   
      <Hero 
      /> 
      <ScholarshipList 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
    </div>
  );
};

export default Home;