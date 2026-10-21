import React, { useState, useEffect, useRef } from 'react';
import { PortfolioItem, Language } from '../types';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Sparkles,
  Calendar,
  Share2,
  Check,
} from 'lucide-react';

interface VideoPlayerModalProps {
  item: PortfolioItem | null;
  allItems?: PortfolioItem[];
  lang: Language;
  onClose: () => void;
  onBookProject: (serviceCategory: string) => void;
  onSelectItem?: (item: PortfolioItem) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  item,
  allItems = [],
  lang,
  onClose,
  onBookProject,
  onSelectItem,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (allItems.length > 1 && onSelectItem && item) {
        const curIdx = allItems.findIndex((it) => it.id === item.id);
        if (e.key === 'ArrowRight' && curIdx > 0) {
          onSelectItem(allItems[curIdx - 1]);
        } else if (e.key === 'ArrowLeft' && curIdx < allItems.length - 1) {
          onSelectItem(allItems[curIdx + 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, allItems, onSelectItem, item]);

  useEffect(() => {
    // Autoplay when item changes
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [item?.id]);

  if (!item) return null;

  const isVertical = item.aspectRatio === '9:16';
  const videoSource = item.videoUrl || './assets/instagram/DefBSyaMN0Z.mp4';
  const currentIndex = allItems.findIndex((it) => it.id === item.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allItems.length - 1;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      if (videoRef.current?.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.instagramUrl || window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleNext = () => {
    if (hasNext && onSelectItem) {
      onSelectItem(allItems[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (hasPrev && onSelectItem) {
      onSelectItem(allItems[currentIndex - 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl transition-opacity">
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl bg-[#141211] text-white rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Minimal Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-black/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-xs font-mono text-[#C82626] font-bold uppercase tracking-wider shrink-0">
              {item.category.toUpperCase()} · {item.aspectRatio}
            </span>
            <span className="text-xs text-white/40 shrink-0">·</span>
            <span className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              {lang === 'ar' ? item.titleAr : item.titleEn}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next controls */}
            {allItems.length > 1 && onSelectItem && (
              <div className="flex items-center gap-1 me-2 border-e border-white/10 pe-2">
                <button
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  className="p-1 rounded text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title={lang === 'ar' ? 'الفيديو السابق' : 'Previous Video'}
                >
                  <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                </button>
                <span className="text-[11px] font-mono text-white/50">
                  {currentIndex + 1}/{allItems.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={!hasNext}
                  className="p-1 rounded text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title={lang === 'ar' ? 'الفيديو التالي' : 'Next Video'}
                >
                  <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                </button>
              </div>
            )}

            <button
              onClick={toggleFullScreen}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={lang === 'ar' ? 'ملء الشاشة بالكامل' : 'Fullscreen'}
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Area: Pure Clean Fullscreen Player */}
        <div className="overflow-y-auto flex flex-col lg:flex-row flex-1 items-stretch">
          
          {/* Pure Full Screen Video Stage (NO Instagram Post Chrome) */}
          <div className="flex-1 bg-black flex items-center justify-center relative min-h-[420px] sm:min-h-[580px] p-2 sm:p-4 group">
            <video
              ref={videoRef}
              src={videoSource}
              poster={item.coverImage}
              autoPlay
              playsInline
              loop
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className={`rounded-xl shadow-2xl bg-black ${
                isVertical
                  ? 'max-h-[75vh] w-auto aspect-[9/16] object-cover'
                  : 'max-h-[75vh] w-full aspect-video object-contain'
              }`}
            />
          </div>

          {/* Side Drawer: Studio Specifications & Info */}
          <div className="w-full lg:w-96 p-6 bg-[#181615] border-t lg:border-t-0 lg:border-s border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* Category & Title */}
              <div>
                <span className="text-[11px] font-mono text-[#C82626] font-bold uppercase tracking-wider block mb-1">
                  {item.category === 'podcasts'
                    ? (lang === 'ar' ? 'بودكاست ولقاءات استوديو KIN' : 'Studio Broadcast Podcast')
                    : item.category === 'reels'
                    ? (lang === 'ar' ? 'ريلز عمودية 9:16' : 'Vertical Cinema Reels')
                    : (lang === 'ar' ? 'إنتاج تجاري وسينمائي' : 'Cinematic Commercial')}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-xs text-white/60 mt-1 font-mono">
                  @kin.media.production · {lang === 'ar' ? 'تصوير استوديو الكوربة' : 'Korba Studio Production'}
                </p>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 leading-relaxed font-sans">
                {lang === 'ar' ? item.summaryAr : item.summaryEn}
              </div>

              {/* Production Technical Specs */}
              {item.specs && (
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-white/60">
                    {lang === 'ar' ? 'مواصفات وتجهيزات التصوير' : 'Studio Production Rig & Specs'}
                  </p>
                  <div className="space-y-2 text-xs text-white/70 bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-2">
                      <span className="text-[#C82626] font-bold">▪</span>
                      <span>
                        <strong className="text-white font-semibold">
                          {lang === 'ar' ? 'الكاميرات:' : 'Cameras:'}{' '}
                        </strong>
                        {lang === 'ar' ? item.specs.camerasAr : item.specs.camerasEn}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C82626] font-bold">▪</span>
                      <span>
                        <strong className="text-white font-semibold">
                          {lang === 'ar' ? 'الصوت:' : 'Sound:'}{' '}
                        </strong>
                        {lang === 'ar' ? item.specs.soundAr : item.specs.soundEn}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C82626] font-bold">▪</span>
                      <span>
                        <strong className="text-white font-semibold">
                          {lang === 'ar' ? 'التسليم:' : 'Deliverables:'}{' '}
                        </strong>
                        {lang === 'ar' ? item.specs.deliverablesAr : item.specs.deliverablesEn}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Share & Instagram Links */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleShare}
                  className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? (lang === 'ar' ? 'تم نسخ الرابط!' : 'Link Copied!') : (lang === 'ar' ? 'مشاركة الفيديو' : 'Share Video')}</span>
                </button>

                <a
                  href={item.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#C82626]" />
                  <span>{lang === 'ar' ? 'إنستجرام ↗' : 'Instagram ↗'}</span>
                </a>
              </div>

            </div>

            {/* Direct Booking CTA */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onBookProject(item.category);
                }}
                className="w-full py-3.5 px-4 text-xs font-bold text-white bg-[#C82626] hover:bg-[#a31d1d] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {lang === 'ar'
                    ? 'احجز جلسة استوديو مماثلة بالكوربة'
                    : 'Book a Similar Studio Session in Korba'}
                </span>
              </button>
              <p className="text-[10px] text-center text-white/50 font-mono">
                {lang === 'ar'
                  ? 'KEEP IT NEAT — فريق واحد يخطط ويصور ويمنتج'
                  : 'KEEP IT NEAT — One team to plan, shoot, and edit'}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
