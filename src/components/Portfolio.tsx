import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { Language, PortfolioItem } from '../types';
import { useInstagramFeed } from '../hooks/useInstagramFeed';
import { Play, Instagram, ExternalLink, RefreshCw, Heart, Eye } from 'lucide-react';

interface PortfolioProps {
  lang: Language;
  onOpenVideoModal: (item: PortfolioItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ lang, onOpenVideoModal }) => {
  const [filter, setFilter] = useState<'all' | 'podcasts' | 'reels' | 'commercials'>('all');

  // Automatic real-time Instagram feed hook
  const { posts, loading, lastSynced, refetch } = useInstagramFeed();

  const filteredItems = filter === 'all'
    ? posts
    : posts.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-[#FAFAFA] border-b border-black/8 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C82626] mb-3">
              <Instagram className="w-4 h-4" />
              <span>@kin.media.production</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#141211]/60">KEEP IT NEAT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141211] tracking-tight leading-tight text-balance">
              {lang === 'ar' ? 'فيديوهات وأعمال استوديو KIN' : 'Featured Works & Instagram Feed'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#141211]/70 leading-relaxed">
              {lang === 'ar'
                ? 'فيديوهات حية مأخوذة مباشرة من حساب الإنستجرام الرسمي (@kin.media.production) مع كابشنز أصلية مترجمة بالكامل ومواصفات الإنتاج.'
                : 'Real-time video feed synchronized directly with our official Instagram account (@kin.media.production) with fully localized captions and production specs.'}
            </p>
          </div>

          {/* Instagram Action Strip & Sync Trigger */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-end">
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#141211] hover:bg-[#C82626] rounded-lg transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'متابعة على إنستجرام' : 'Follow on Instagram'}</span>
            </a>

            <button
              onClick={() => refetch()}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#141211] bg-white border border-black/15 hover:border-black/30 rounded-lg transition-colors cursor-pointer"
              title={lang === 'ar' ? 'تحديث وتزامن الفيديوهات من إنستجرام' : 'Sync Instagram Feed'}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#C82626] ${loading ? 'animate-spin' : ''}`} />
              <span>
                {loading
                  ? (lang === 'ar' ? 'جارِ التحديث...' : 'Updating...')
                  : (lang === 'ar' ? 'تحديث الفيد' : 'Refresh Feed')}
              </span>
            </button>
          </div>
        </div>

        {/* Live Instagram Connection Banner */}
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-black/8 shadow-2xs mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#141211]">
                <span>@kin.media.production</span>
                <span className="text-sky-500 text-[11px]" title="Official Studio Page">✓</span>
              </div>
              <p className="text-[11px] text-[#141211]/60">
                {lang === 'ar'
                  ? 'مصر الجديدة، القاهرة · ستوديو إنتاج بودكاست وريلز وإعلانات سينمائية'
                  : 'Heliopolis, Cairo · Media Studio for Podcasts, Reels & Commercials'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#141211]/70">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-sans font-semibold text-emerald-700">
                {lang === 'ar' ? 'متزامن تلقائياً' : 'Live Synced'}
              </span>
              {lastSynced && (
                <span className="text-[10px] text-black/40">
                  ({lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                </span>
              )}
            </span>
            <span aria-hidden="true" className="text-black/20">|</span>
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C82626] font-sans font-semibold hover:underline flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'مشاهدة الحساب كاملاً' : 'View Full Profile'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-white border border-black/10 rounded-lg shadow-2xs">
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
              onClick={() => setFilter('commercials')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                filter === 'commercials'
                  ? 'bg-[#141211] text-white shadow-xs'
                  : 'text-[#141211]/70 hover:text-[#141211]'
              }`}
            >
              {lang === 'ar' ? 'إعلانات تجارية' : 'Commercials'}
            </button>
          </div>

          <span className="text-xs text-[#141211]/50 font-mono">
            {filteredItems.length} {lang === 'ar' ? 'أعمال معروضة' : 'Posts shown'}
          </span>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {filteredItems.map((item, idx) => {
            const isWide = item.category === 'commercials' || (idx === 0 && filter === 'all');
            const isReel = item.aspectRatio === '9:16';

            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl overflow-hidden bg-white border border-black/8 hover:border-black/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  isWide ? 'lg:col-span-8' : 'lg:col-span-4'
                }`}
              >
                {/* Visual Cover Container */}
                <div
                  onClick={() => onOpenVideoModal(item)}
                  className={`relative overflow-hidden cursor-pointer ${
                    isReel ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[16/10]'
                  }`}
                >
                  <img
                    src={item.coverImage}
                    alt={lang === 'ar' ? item.titleAr : item.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

                  {/* Top Indicators */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded font-mono font-semibold">
                      <Instagram className="w-3 h-3 text-[#C82626]" />
                      <span>{item.aspectRatio}</span>
                    </span>
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded font-mono text-white/90">
                      {item.duration}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#C82626] group-hover:bg-[#a31d1d] group-hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all duration-200">
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Image Overlay */}
                  <div className="absolute bottom-3 inset-x-4 text-white">
                    <p className="text-xs text-[#C82626] font-mono font-semibold">{item.client}</p>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1">
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </h3>
                  </div>
                </div>

                {/* Card Content & Localized Instagram Caption */}
                <div className="p-6 bg-white space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Authentic Instagram Caption Preview */}
                    <div className="p-3 bg-[#FAFAFA] rounded-lg border border-black/5 text-xs text-[#141211]/80 leading-relaxed font-sans line-clamp-3">
                      <span className="font-bold text-[#141211] me-1">@kin.media.production:</span>
                      {lang === 'ar' ? item.instagramCaptionAr : item.instagramCaptionEn}
                    </div>

                    {/* Localized Summary */}
                    <p className="text-xs text-[#141211]/70 leading-relaxed line-clamp-2">
                      {lang === 'ar' ? item.summaryAr : item.summaryEn}
                    </p>
                  </div>

                  {/* Bottom Actions & Engagement Meta */}
                  <div className="pt-4 border-t border-black/6 flex items-center justify-between text-xs text-[#141211]/70">
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      {item.views && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-[#C82626]" />
                          <span>{item.views}</span>
                        </span>
                      )}
                      {item.likes && (
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                          <span>{item.likes.toLocaleString()}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenVideoModal(item)}
                        className="text-xs font-bold text-[#141211] hover:text-[#C82626] transition-colors cursor-pointer"
                      >
                        {lang === 'ar' ? 'تشغيل الفيديو' : 'Play Video'}
                      </button>

                      <a
                        href={item.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-black/50 hover:text-[#C82626] transition-colors"
                        title={lang === 'ar' ? 'مشاهدة المنشور على إنستجرام' : 'View on Instagram'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
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
