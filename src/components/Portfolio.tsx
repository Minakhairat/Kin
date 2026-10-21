import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { Language, PortfolioItem } from '../types';
import { useInstagramFeed } from '../hooks/useInstagramFeed';
import {
  Play,
  Instagram,
  RefreshCw,
  Heart,
  Eye,
  Maximize2,
  ExternalLink,
  Search,
} from 'lucide-react';

interface PortfolioProps {
  lang: Language;
  onOpenVideoModal: (item: PortfolioItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  lang,
  onOpenVideoModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'podcasts' | 'reels' | 'commercials'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingInlineId, setPlayingInlineId] = useState<string | null>(null);

  // Automatic real-time Instagram feed hook
  const { posts, loading, lastSynced, refetch } = useInstagramFeed();

  // Filter items
  const filteredItems = posts.filter((item) => {
    const matchesFilter = filter === 'all' || item.category === filter;
    if (!matchesFilter) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.titleAr.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.summaryAr.toLowerCase().includes(q) ||
      item.summaryEn.toLowerCase().includes(q) ||
      item.instagramCaptionAr.toLowerCase().includes(q) ||
      (item.instagramShortcode && item.instagramShortcode.toLowerCase().includes(q))
    );
  });

  const toggleInlinePlay = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingInlineId((prev) => (prev === itemId ? null : itemId));
  };

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
              {lang === 'ar' ? 'فيديوهات وأعمال استوديو KIN الحقيقية' : 'Live Real Videos & Works'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#141211]/70 leading-relaxed">
              {lang === 'ar'
                ? 'فيديوهات حقيقية بكامل الشاشة وبأعلى جودة تصوير، مأخوذة مباشرة من حساب الإنستجرام الرسمي (@kin.media.production) مع الصور الواقعية للبرامج وجلسات الاستوديو بالكوربة.'
                : 'Real high-definition videos in clean fullscreen without social post frames, captured directly from our official Instagram (@kin.media.production) and Korba studio sessions.'}
            </p>
          </div>

          {/* Follow & Sync Trigger */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-end">
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#141211] hover:bg-[#C82626] rounded-lg transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'متابعة @kin.media.production' : 'Follow @kin'}</span>
            </a>

            <button
              onClick={() => refetch()}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#141211] bg-white border border-black/15 hover:border-black/30 rounded-lg transition-colors cursor-pointer"
              title={lang === 'ar' ? 'تحديث الفيد التلقائي' : 'Sync Instagram Feed'}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#C82626] ${loading ? 'animate-spin' : ''}`} />
              <span>
                {loading
                  ? (lang === 'ar' ? 'جارِ المزامنة...' : 'Syncing...')
                  : (lang === 'ar' ? 'مزامنة الفيد' : 'Sync Feed')}
              </span>
            </button>
          </div>
        </div>

        {/* Live Instagram Channel Status Banner */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-black/8 shadow-2xs mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shrink-0 shadow-sm p-0.5">
              <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#141211]">
                <span>kin.media.production</span>
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] font-bold" title="Verified Studio Account">✓</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  {lang === 'ar' ? 'فيديوهات حقيقية من أرض الواقع' : 'Real-World Production'}
                </span>
              </div>
              <p className="text-xs text-[#141211]/60 mt-0.5">
                {lang === 'ar'
                  ? 'الكوربة، مصر الجديدة · كل الصور والفيديوهات مأخوذة من جلسات التصوير الحية للاستوديو'
                  : 'Korba, Heliopolis · All photos and videos captured live from our actual studio sets'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#141211]/70">
            <span className="flex items-center gap-1.5 font-sans font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{posts.length} {lang === 'ar' ? 'فيديو حقيقي متزامن' : 'Live Synced Videos'}</span>
              {lastSynced && (
                <span className="text-[10px] text-black/40 font-mono">
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
              <span>{lang === 'ar' ? 'الحساب بالإنستجرام ↗' : 'Instagram ↗'}</span>
            </a>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-black/10 rounded-xl shadow-2xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#141211] text-white shadow-xs'
                  : 'text-[#141211]/70 hover:text-[#141211]'
              }`}
            >
              {lang === 'ar' ? `الكل (${posts.length})` : `All (${posts.length})`}
            </button>
            <button
              onClick={() => setFilter('reels')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filter === 'reels'
                  ? 'bg-[#141211] text-white shadow-xs'
                  : 'text-[#141211]/70 hover:text-[#141211]'
              }`}
            >
              {lang === 'ar' ? 'ريلز عمودية 9:16' : 'Reels 9:16'}
            </button>
            <button
              onClick={() => setFilter('podcasts')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filter === 'podcasts'
                  ? 'bg-[#141211] text-white shadow-xs'
                  : 'text-[#141211]/70 hover:text-[#141211]'
              }`}
            >
              {lang === 'ar' ? 'بودكاست ولقاءات' : 'Podcasts'}
            </button>
            <button
              onClick={() => setFilter('commercials')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filter === 'commercials'
                  ? 'bg-[#141211] text-white shadow-xs'
                  : 'text-[#141211]/70 hover:text-[#141211]'
              }`}
            >
              {lang === 'ar' ? 'إعلانات تجارية' : 'Commercials'}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 md:max-w-xs">
            <input
              type="text"
              placeholder={lang === 'ar' ? 'بحث في الفيديوهات أو الموضوعات...' : 'Search real videos...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-8 pe-3 py-2 bg-white border border-black/10 rounded-xl text-xs text-[#141211] placeholder-[#141211]/40 focus:outline-none focus:border-[#C82626] transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-[#141211]/40 absolute top-3 start-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-2.5 end-2.5 text-xs text-black/40 hover:text-black"
              >
                ×
              </button>
            )}
          </div>

        </div>

        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-black/8 p-8 space-y-3">
            <Instagram className="w-10 h-10 text-black/30 mx-auto" />
            <h3 className="text-base font-bold text-[#141211]">
              {lang === 'ar' ? 'لم يتم العثور على نتائج مطابقة للبحث' : 'No matching videos found'}
            </h3>
            <p className="text-xs text-[#141211]/60">
              {lang === 'ar' ? 'يرجى تجربة البحث بكلمات أخرى.' : 'Please try another search keyword.'}
            </p>
          </div>
        ) : (
          /* Grid of Real Videos & Authentic Photos */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {filteredItems.map((item, idx) => {
              const isWide = item.category === 'commercials' || (idx === 0 && filter === 'all');
              const isReel = item.aspectRatio === '9:16';
              const isPlayingInline = playingInlineId === item.id;
              const videoSource = item.videoUrl || './assets/instagram/DefBSyaMN0Z.mp4';

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl overflow-hidden bg-white border border-black/8 hover:border-black/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                    isWide ? 'lg:col-span-8' : 'lg:col-span-4'
                  }`}
                >
                  {/* Media Frame: Clean HTML5 Video or Real Instagram Photo */}
                  <div
                    className={`relative overflow-hidden bg-black ${
                      isReel ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[16/10]'
                    }`}
                  >
                    {isPlayingInline ? (
                      /* Clean Native HTML5 Video Player (NO Instagram Post UI) */
                      <div className="relative w-full h-full bg-black flex items-center justify-center">
                        <video
                          src={videoSource}
                          poster={item.coverImage}
                          autoPlay
                          controls
                          playsInline
                          loop
                          className="w-full h-full object-contain bg-black"
                        />
                        <button
                          onClick={(e) => toggleInlinePlay(item.id, e)}
                          className="absolute top-3 end-3 px-2 py-1 bg-black/80 hover:bg-[#C82626] text-white rounded text-[11px] font-bold border border-white/20 transition-colors cursor-pointer z-20 shadow-md"
                        >
                          ✕ {lang === 'ar' ? 'إغلاق' : 'Close'}
                        </button>
                      </div>
                    ) : (
                      /* Authentic Real Photo Cover with Direct Fullscreen Play Trigger */
                      <div
                        onClick={() => onOpenVideoModal(item)}
                        className="w-full h-full cursor-pointer relative"
                      >
                        <img
                          src={item.coverImage}
                          alt={lang === 'ar' ? item.titleAr : item.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />

                        {/* Contrast Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs text-white pointer-events-none">
                          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded font-mono font-semibold">
                            <span className="w-2 h-2 rounded-full bg-[#C82626] animate-pulse" />
                            <span>{item.aspectRatio}</span>
                          </span>
                          <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded font-mono text-white/90">
                            {item.duration}
                          </span>
                        </div>

                        {/* Center Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-14 h-14 rounded-full bg-[#C82626] group-hover:bg-[#a31d1d] group-hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all duration-200">
                            <Play className="w-6 h-6 fill-white translate-x-0.5" />
                          </div>
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="absolute bottom-3 inset-x-4 text-white pointer-events-none">
                          <p className="text-[11px] text-[#C82626] font-mono font-semibold">{item.client}</p>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1">
                            {lang === 'ar' ? item.titleAr : item.titleEn}
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-6 bg-white space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Summary */}
                      <p className="text-xs text-[#141211]/80 leading-relaxed line-clamp-3">
                        {lang === 'ar' ? item.summaryAr : item.summaryEn}
                      </p>
                    </div>

                    {/* Bottom Actions: Clean Fullscreen & Inline Play */}
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
                        {/* Play Inline Native Toggle */}
                        <button
                          onClick={(e) => toggleInlinePlay(item.id, e)}
                          className="px-2.5 py-1 text-xs font-semibold text-[#141211] bg-black/5 hover:bg-[#C82626] hover:text-white rounded transition-colors cursor-pointer"
                        >
                          {isPlayingInline
                            ? (lang === 'ar' ? 'إيقاف' : 'Stop')
                            : (lang === 'ar' ? 'تشغيل هنا' : 'Play Here')}
                        </button>

                        {/* Clean Fullscreen Player */}
                        <button
                          onClick={() => onOpenVideoModal(item)}
                          className="px-3 py-1 text-xs font-bold text-white bg-[#C82626] hover:bg-[#a31d1d] rounded transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Maximize2 className="w-3 h-3" />
                          <span>{lang === 'ar' ? 'ملء الشاشة' : 'Fullscreen'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
