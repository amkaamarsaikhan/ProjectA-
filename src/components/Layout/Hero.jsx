import React from 'react';
import { Globe2, Users, ArrowRight } from 'lucide-react';

const Hero = ({ onFilterChange, currentFilter }) => {
  return (
    <div className="relative bg-white py-16 sm:py-24 border-b border-slate-100">
      {/* Чимэглэлийн зөөлөн өнгөнүүд */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Дэлхийн боловсролыг <span className="text-emerald-600">Монгол залууст</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
            Монголчуудад зориулсан тусгай квоттой тэтгэлгүүд болон дэлхийн шилдэг олон улсын хөтөлбөрүүдийг нэг дороос.
          </p>
        </div>

        {/* Төрлөөр ялгасан хэсэг */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          
          {/* 1. Монгол Улсын Квоттой тэтгэлэг */}
          <div 
            onClick={() => onFilterChange('Quota-based')}
            className={`relative group p-8 rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
              currentFilter === 'Quota-based' 
              ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500' 
              : 'bg-white border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
              Монгол квот
            </div>
            <div className="h-12 w-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-6 shadow-sm">
              <Users className="text-white h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Засгийн газрын квот</h3>
            <p className="text-slate-600 mb-6">
              MEXT, GKS, Унгарын тэтгэлэг зэрэг Монгол Улсад жил бүр тусгайлан олгодог квоттой хөтөлбөрүүд. 
              <span className="text-emerald-600 block mt-2 font-medium">Сонгогдох магадлал: Өндөр</span>
            </p>
            <button className="flex items-center text-emerald-600 font-bold group-hover:gap-2 transition-all">
              Квоттой тэтгэлэг үзэх <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          {/* 2. Олон улсын өрсөлдөөнт тэтгэлэг */}
          <div 
            onClick={() => onFilterChange('Global Competition')}
            className={`relative group p-8 rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
              currentFilter === 'Global Competition' 
              ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
              : 'bg-white border-slate-200 hover:border-blue-200'
            }`}
          >
            <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              Олон улсын
            </div>
            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6 shadow-sm">
              <Globe2 className="text-white h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Олон улсын өрсөлдөөн</h3>
            <p className="text-slate-600 mb-6">
              Fulbright, Chevening, Erasmus зэрэг дэлхийн шилдэг залуустай нэгэн зэрэг өрсөлддөг нэр хүндтэй тэтгэлгүүд.
              <span className="text-blue-600 block mt-2 font-medium">Сонгогдох магадлал: Өрсөлдөөнтэй</span>
            </p>
            <button className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
              Дэлхийн тэтгэлэг үзэх <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-slate-100 pt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">400+</div>
            <div className="text-slate-500 text-sm font-medium">Жил бүрийн квот</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">20+</div>
            <div className="text-slate-500 text-sm font-medium">Улс орнууд</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">100%</div>
            <div className="text-slate-500 text-sm font-medium">Бүрэн тэтгэлэг</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">Үнэгүй</div>
            <div className="text-slate-500 text-sm font-medium">Зөвлөгөө, мэдээлэл</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;