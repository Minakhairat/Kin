import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/content';
import { Language, PortfolioItem } from '../types';
import { Play, Film, Volume2, Sparkles, Filter } from 'lucide-react';

interface PortfolioProps {
  lang: Language;
  onOpenVideoModal: (item: PortfolioItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ lang, onOpenVideoModal }) => {
  const [filter, setFilter] = useState<'all' | 'podcasts' | 'reels' | 'commercials'>('all');

  const filteredItems = filter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-[#FAFAFA] border-b border-black/8 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C82626] mb-3">
              {lang === 'ar' ? 'سجل الأعمال' : 'Selected Works'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141211] tracking-tight leading-tight text-balance">
              {lang === 'ar' ? 'أعمال استوديو KIN الأخيرة' : 'Recent Productions & Case Studies'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#141211]/70 leading-relaxed">
              {lang === 'ar'
                ? 'نماذج حية من حلقات البودكاست المتعددة الكاميرات، الريلز الرأسية الفايرال، والإعلانات التجارية السينمائية.'
                : 'Selected broadcast podcast episodes, high-retention vertical reels, and bespoke commercial films.'}
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-black/10 rounded-lg shadow-2xs self-start md:self-end">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#141211] text-white shadow-xs'
                  : 'text-[#141211]/70 hover:text-[#141211]'
              }`}
            >
              {lang === 'ar' ? 'الكل' : 'All'}
            </button>
            <button
              onClick={() => setFilter('podcasts')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                filter === 'podcasts'
                  ? 'bg-[#141211] text-white shadow-xs'
                  : 'text-[#141211]/70 hover:text-[#141211]'
              }`}
            >
              {lang === 'ar' ? 'بودكاست' : 'Podcasts'}
            </button>
            <button
              onClick={() => setFilter('reels')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                filter === 'reels'
                  ? 'bg-[#141211] text-white shadow-xs'
                  : 'text-[#141211]/70 hover:text-[#141211]'
              }`}
            >
              {lang === 'ar' ? 'ريلز 9:16' : 'Reels 9:16'}
            </button>
            <button
              onClick={() => setFilter('commercials')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                filter === 'commercials'
                  ? 'bg-[#141211] text-white shadow-xs'
                  : 'text-[#141211]/70 hover:text-[#141211]'
              }`}
            >
              {lang === 'ar' ? 'إعلانات' : 'Commercials'}
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {filteredItems.map((item, idx) => {
            // Give the first item or specific items wider bento presence
            const isWide = item.category === 'commercials' || idx === 0;
            const isReel = item.aspectRatio === '9:16';

            return (
              <div
                key={item.id}
                onClick={() => onOpenVideoModal(item)}
                className={`group relative rounded-2xl overflow-hidden bg-white border border-black/8 hover:border-black/30 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isWide ? 'lg:col-span-8' : 'lg:col-span-4'
                }`}
              >
                {/* Visual Cover Container */}
                <div className={`relative overflow-hidden ${isReel ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[16/10]'}`}>
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Indicators */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs text-white">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded font-mono font-semibold">
                      {item.aspectRatio} · {item.category.toUpperCase()}
                    </span>
                    <span className="px-2 py-1 bg-[#141211]/80 backdrop-blur-md rounded font-mono text-white/90">
                      {item.duration}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#C82626] group-hover:bg-[#a31d1d] group-hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all duration-200">
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Image Subtext */}
                  <div className="absolute bottom-3 inset-x-4 text-white">
                    <p className="text-xs text-[#C82626] font-mono font-semibold uppercase">{item.client}</p>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1">{item.title}</h3>
                  </div>
                </div>

                {/* Card Content & Metadata (Strictly zero-pill) */}
                <div className="p-6 bg-white space-y-4">
                  <p className="text-xs sm:text-sm text-[#141211]/75 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>

                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="pt-3 border-t border-black/6 flex items-center justify-between text-xs text-[#141211]/60 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span>{item.specs.cameras.split(' ')[0]}</span>
                      <span aria-hidden="true">/</span>
                      <span>4K Pro</span>
                    </div>
                    <span className="text-[#C82626] font-sans font-semibold group-hover:underline">
                      {lang === 'ar' ? 'عرض التفاصيل والتشغيل ←' : 'View Specs & Play →'}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
