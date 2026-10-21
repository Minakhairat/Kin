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
  Heart,
  MessageCircle,
  Eye,
  Smartphone,
  Tv,
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
  // Screen size mode: 'reel' (exact Instagram 9:16 phone proportions) vs 'fit' (theater fit)
  const [screenMode, setScreenMode] = useState<'reel' | 'fit'>('reel');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl transition-opacity animate-in fade-in duration-200">
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl bg-[#141211] text-white rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Minimal Header & Screen Ratio Controls */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-b border-white/10 bg-black/85 backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <span className="text-[11px] font-mono text-[#C82626] font-bold uppercase tracking-wider shrink-0 px-2 py-0.5 rounded bg-[#C82626]/10 border border-[#C82626]/20">
              {item.aspectRatio}
            </span>
            <span className="text-xs text-white/40 shrink-0 hidden sm:inline">·</span>
            <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[180px] sm:max-w-md">
              {lang === 'ar' ? item.titleAr : item.titleEn}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Screen Size Match Selector: Exact Instagram Reel 9:16 vs Theater Fit */}
            {isVertical && (
              <div className="flex items-center bg-white/10 p-0.5 rounded-lg border border-white/10 me-1">
                <button
                  onClick={() => setScreenMode('reel')}
                  className={`px-2 py-1 text-[11px] font-semibold rounded flex items-center gap-1 transition-all cursor-pointer ${
                    screenMode === 'reel'
                      ? 'bg-[#C82626] text-white shadow-xs'
                      : 'text-white/70 hover:text-white'
                  }`}
                  title={lang === 'ar' ? 'حجم ريلز إنستجرام 9:16' : 'Instagram Reel 9:16 View'}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{lang === 'ar' ? 'حجم ريلز إنستجرام 9:16' : '9:16 Reel Size'}</span>
                </button>
                <button
                  onClick={() => setScreenMode('fit')}
                  className={`px-2 py-1 text-[11px] font-semibold rounded flex items-center gap-1 transition-all cursor-pointer ${
                    screenMode === 'fit'
                      ? 'bg-[#C82626] text-white shadow-xs'
                      : 'text-white/70 hover:text-white'
                  }`}
                  title={lang === 'ar' ? 'عرض ممتد' : 'Theater Fit View'}
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{lang === 'ar' ? 'عرض ممتد' : 'Expanded'}</span>
                </button>
              </div>
            )}

            {/* Prev / Next controls */}
            {allItems.length > 1 && onSelectItem && (
              <div className="flex items-center gap-1 me-1 sm:me-2 border-e border-white/10 pe-1.5 sm:pe-2">
                <button
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  className="p-1 rounded text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title={lang === 'ar' ? 'الفيديو السابق' : 'Previous Video'}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" />
                </button>
                <span className="text-[10px] sm:text-[11px] font-mono text-white/50">
                  {currentIndex + 1}/{allItems.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={!hasNext}
                  className="p-1 rounded text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title={lang === 'ar' ? 'الفيديو التالي' : 'Next Video'}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" />
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

        {/* Modal Main Area */}
        <div className="overflow-y-auto flex flex-col lg:flex-row flex-1 items-stretch">
          
          {/* Video Stage: Perfectly sized to match Instagram Video Dimensions */}
          <div className="flex-1 bg-black/95 flex items-center justify-center relative min-h-[460px] sm:min-h-[580px] p-3 sm:p-6 group">
            
            {/* The Screen Container */}
            <div
              className={`relative overflow-hidden transition-all duration-300 ${
                isVertical
                  ? screenMode === 'reel'
                    ? 'w-full max-w-[390px] aspect-[9/16] max-h-[78vh] rounded-3xl border-2 sm:border-4 border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10 bg-black flex items-center justify-center'
                    : 'w-full max-h-[82vh] aspect-[9/16] rounded-xl overflow-hidden bg-black flex items-center justify-center'
                  : 'w-full aspect-video max-h-[78vh] rounded-xl overflow-hidden bg-black flex items-center justify-center'
              }`}
            >
              {/* Instagram Reel Native Aspect 9:16 Video */}
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
                className={`w-full h-full bg-black ${
                  isVertical
                    ? screenMode === 'reel'
                      ? 'object-cover'
                      : 'object-contain'
                    : 'object-contain'
                }`}
              />

              {/* Instagram Reel Branding Badge Overlay (Top Corner, subtle) */}
              <div className="absolute top-4 start-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[11px] font-mono pointer-events-none z-10 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C82626] animate-pulse" />
                <span>@kin.media.production</span>
              </div>
            </div>

          </div>

          {/* Sidebar: Authentic Instagram Caption, Engagement Social Proof & Studio Specs */}
          <div className="w-full lg:w-96 p-6 border-t lg:border-t-0 lg:border-s border-white/10 bg-[#181615] flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* Category & Handle */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#C82626] bg-[#C82626]/10 rounded border border-[#C82626]/20">
                  {item.category.toUpperCase()}
                </span>

                <a
                  href={item.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-white/70 hover:text-[#C82626] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@kin.media.production</span>
                </a>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-lg font-black text-white tracking-tight leading-snug">
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="mt-1 text-xs text-white/60 font-mono">
                  {lang === 'ar' ? 'تم الإنتاج باستوديو KIN بالكوربة' : 'Produced at KIN Studio Korba'} · {item.duration}
                </p>
              </div>

              {/* SOCIAL PROOF ENGAGEMENT METRICS BAR */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-semibold text-white/90">
                    {lang === 'ar' ? 'تفاعل الجمهور على إنستجرام' : 'Instagram Engagement'}
                  </span>
                  <span className="text-[10px] font-mono text-[#C82626]">
                    {lang === 'ar' ? 'حساب موثق' : 'VERIFIED'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <div className="flex items-center justify-center gap-1 text-rose-400">
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span className="text-xs font-bold text-white">{item.likes?.toLocaleString()}</span>
                    </div>
                    <span className="text-[10px] text-white/50 block mt-0.5">{lang === 'ar' ? 'إعجاب' : 'Likes'}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <div className="flex items-center justify-center gap-1 text-sky-400">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold text-white">{item.comments?.toLocaleString()}</span>
                    </div>
                    <span className="text-[10px] text-white/50 block mt-0.5">{lang === 'ar' ? 'تعليق' : 'Comments'}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <div className="flex items-center justify-center gap-1 text-amber-400">
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold text-white">{item.views}</span>
                    </div>
                    <span className="text-[10px] text-white/50 block mt-0.5">{lang === 'ar' ? 'مشاهدة' : 'Views'}</span>
                  </div>
                </div>
              </div>

              {/* Real Instagram Caption */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white/80 max-h-36 overflow-y-auto space-y-1.5 scrollbar-thin">
                <div className="flex items-center gap-1 text-[11px] font-mono text-white/50">
                  <Instagram className="w-3 h-3 text-[#C82626]" />
                  <span>{lang === 'ar' ? 'كابشن الفيديو الأصلي:' : 'Original Caption:'}</span>
                </div>
                <p className="leading-relaxed whitespace-pre-line text-[11px] text-white/85">
                  {lang === 'ar' ? item.instagramCaptionAr : item.instagramCaptionEn}
                </p>
              </div>

              {/* Studio Specs */}
              {item.specs && (
                <div className="space-y-2 text-xs border-t border-white/10 pt-4">
                  <h4 className="font-bold text-white/90 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C82626]" />
                    <span>{lang === 'ar' ? 'المواصفات الفنية للإنتاج:' : 'Technical Specs:'}</span>
                  </h4>
                  <ul className="space-y-1.5 text-white/70 text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C82626] font-bold">▪</span>
                      <span>{lang === 'ar' ? item.specs.camerasAr : item.specs.camerasEn}</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C82626] font-bold">▪</span>
                      <span>{lang === 'ar' ? item.specs.soundAr : item.specs.soundEn}</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C82626] font-bold">▪</span>
                      <span>{lang === 'ar' ? item.specs.deliverablesAr : item.specs.deliverablesEn}</span>
                    </li>
                  </ul>
                </div>
              )}

            </div>

            {/* Actions: Direct WhatsApp Booking & Share */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onClose();
                  onBookProject(item.category);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#C82626] hover:bg-[#a31d1d] text-white text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'ar' ? 'احجز جلسة تصوير مماثلة' : 'Book a Similar Session'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleShare}
                  className="py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'مشاركة' : 'Share')}</span>
                </button>

                <a
                  href={item.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#C82626]" />
                  <span>{lang === 'ar' ? 'عرض على IG' : 'View on IG'}</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
