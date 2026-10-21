import React, { useState, useEffect } from 'react';
import { PortfolioItem, Language } from '../types';
import { X, Play, Pause, Volume2, VolumeX, Instagram, Film, Sparkles, ExternalLink, Check } from 'lucide-react';

interface VideoPlayerModalProps {
  item: PortfolioItem | null;
  lang: Language;
  onClose: () => void;
  onBookProject: (serviceCategory: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  item,
  lang,
  onClose,
  onBookProject,
}) => {
  // Default to live Instagram embed player for authentic playback
  const [activePlayer, setActivePlayer] = useState<'instagram' | 'cinema'>('instagram');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const isVertical = item.aspectRatio === '9:16';
  const embedUrl = item.instagramEmbedUrl || (item.instagramShortcode
    ? `https://www.instagram.com/reel/${item.instagramShortcode}/embed/`
    : `https://www.instagram.com/reel/DeklES2xHNB/embed/`);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.instagramUrl || window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md transition-opacity">
      <div
        className="relative w-full max-w-5xl bg-[#141211] text-white rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/60">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <span className="text-xs font-mono text-[#C82626] font-bold uppercase tracking-wider shrink-0">
              {item.category.toUpperCase()} · {item.aspectRatio}
            </span>
            <span className="text-xs text-white/40 shrink-0">·</span>
            <span className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              {lang === 'ar' ? item.titleAr : item.titleEn}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Player Selector Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-black/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 p-0.5 bg-white/10 rounded-lg">
            <button
              onClick={() => setActivePlayer('instagram')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activePlayer === 'instagram'
                  ? 'bg-[#C82626] text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'مشغل إنستجرام المباشر' : 'Live Instagram Reel'}</span>
            </button>
            <button
              onClick={() => setActivePlayer('cinema')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activePlayer === 'cinema'
                  ? 'bg-white/20 text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'عرض الاستوديو السينمائي' : 'Studio Cinema Cut'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-white/60">
            <span className="text-[11px] font-mono">@kin.media.production</span>
            <button
              onClick={handleShare}
              className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[11px] text-white/80 transition-colors cursor-pointer flex items-center gap-1"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <ExternalLink className="w-3 h-3" />}
              <span>{copiedLink ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'نسخ الرابط' : 'Share')}</span>
            </button>
          </div>
        </div>

        {/* Player Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-center lg:items-stretch">
          
          {/* Video Preview Frame */}
          <div className="flex-1 flex items-center justify-center bg-black/80 rounded-xl overflow-hidden p-2 sm:p-3 relative group w-full min-h-[380px] sm:min-h-[500px]">
            {activePlayer === 'instagram' ? (
              /* Live Instagram Reel Embed */
              <div
                className={`relative w-full overflow-hidden rounded-lg shadow-2xl bg-black flex items-center justify-center ${
                  isVertical ? 'max-w-[360px] h-[520px] sm:h-[580px]' : 'w-full h-[460px] sm:h-[520px]'
                }`}
              >
                <iframe
                  src={embedUrl}
                  title={lang === 'ar' ? item.titleAr : item.titleEn}
                  className="w-full h-full border-0 rounded-lg bg-black"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              /* KIN Studio Cinema Player */
              <div
                className={`relative overflow-hidden rounded-lg shadow-2xl border border-white/10 bg-black flex flex-col justify-between ${
                  isVertical ? 'aspect-[9/16] w-full max-w-[320px]' : 'aspect-video w-full'
                }`}
              >
                <img
                  src={item.coverImage}
                  alt={lang === 'ar' ? item.titleAr : item.titleEn}
                  className={`w-full h-full object-cover transition-transform duration-1000 ${
                    isPlaying ? 'scale-105 filter brightness-105' : 'scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Ambient dynamic studio scanlines & vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

                {/* Live REC indicator */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between text-xs font-mono pointer-events-none">
                  <span className="flex items-center gap-1.5 px-2 py-0.5 bg-black/60 rounded text-white/90">
                    <span className="w-2 h-2 rounded-full bg-[#C82626] animate-pulse" />
                    <span>REC 4K PRO</span>
                  </span>
                  <span className="px-2 py-0.5 bg-black/60 rounded text-white/80">
                    {item.duration}
                  </span>
                </div>

                {/* Center Cinema Play / Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#C82626] hover:bg-[#a31d1d] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-white" />
                  ) : (
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  )}
                </button>

                {/* Cinema Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 to-transparent flex flex-col gap-2 z-10">
                  <div className="flex items-center justify-between text-xs text-white/80 font-mono">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-white cursor-pointer"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-white cursor-pointer"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-[#C82626]" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <span className="text-[11px] text-white/60">{item.duration}</span>
                    </div>

                    <button
                      onClick={() => setActivePlayer('instagram')}
                      className="text-[11px] text-[#C82626] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>{lang === 'ar' ? 'فتح مشغل إنستجرام' : 'Open Instagram View'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Technical Specs & Details Pane */}
          <div className="w-full lg:w-80 flex flex-col justify-between space-y-5 shrink-0">
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-[#C82626] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'بيانات العمل من إنستجرام' : 'Instagram Project Details'}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-snug">
                {lang === 'ar' ? item.titleAr : item.titleEn}
              </h3>
              <p className="text-xs text-white/60 mb-3 font-mono flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-[#C82626]" />
                <span>{item.client}</span>
              </p>

              {/* Instagram Caption */}
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-white/85 leading-relaxed mb-4 max-h-40 overflow-y-auto">
                <span className="text-[#C82626] font-bold block mb-1">
                  {lang === 'ar' ? 'وصف الفيديو (Instagram Caption):' : 'Post Caption:'}
                </span>
                {lang === 'ar' ? item.instagramCaptionAr : item.instagramCaptionEn}
              </div>

              {/* Production Technical Specs */}
              <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-white/50 block font-mono text-[11px]">{lang === 'ar' ? 'الكاميرات والعدسات:' : 'Cameras & Rigs:'}</span>
                  <span className="font-semibold text-white/90">
                    {lang === 'ar' ? item.specs.camerasAr : item.specs.camerasEn}
                  </span>
                </div>
                <div>
                  <span className="text-white/50 block font-mono text-[11px]">{lang === 'ar' ? 'هندسة الصوت:' : 'Sound Setup:'}</span>
                  <span className="font-semibold text-white/90">
                    {lang === 'ar' ? item.specs.soundAr : item.specs.soundEn}
                  </span>
                </div>
                <div>
                  <span className="text-white/50 block font-mono text-[11px]">{lang === 'ar' ? 'المخرجات والتسليم:' : 'Deliverables:'}</span>
                  <span className="font-semibold text-white/90">
                    {lang === 'ar' ? item.specs.deliverablesAr : item.specs.deliverablesEn}
                  </span>
                </div>
                <div>
                  <span className="text-white/50 block font-mono text-[11px]">{lang === 'ar' ? 'التلوين السينمائي:' : 'Color Grading:'}</span>
                  <span className="font-semibold text-white/90">
                    {lang === 'ar' ? item.specs.colorGradeAr : item.specs.colorGradeEn}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href={item.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4 text-[#C82626]" />
                <span>{lang === 'ar' ? 'مشاهدة الريل على إنستجرام ↗' : 'Watch Reel on Instagram ↗'}</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onBookProject(item.category);
                }}
                className="w-full py-3 text-xs font-bold text-white bg-[#C82626] hover:bg-[#a31d1d] rounded-lg transition-colors shadow-md cursor-pointer text-center block"
              >
                {lang === 'ar' ? 'طلب إنتاج مشروع مماثل' : 'Commission Similar Production'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
