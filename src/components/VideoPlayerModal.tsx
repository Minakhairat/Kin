import React, { useState, useEffect } from 'react';
import { PortfolioItem, Language } from '../types';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Sparkles } from 'lucide-react';

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Simulate progress when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!item) return null;

  const isVertical = item.aspectRatio === '9:16';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity">
      <div
        className="relative w-full max-w-5xl bg-[#141211] text-white rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#C82626] font-bold uppercase tracking-wider">
              {item.category.toUpperCase()} · {item.aspectRatio}
            </span>
            <span className="text-xs text-white/50">·</span>
            <span className="text-sm font-bold text-white truncate max-w-sm">
              {lang === 'ar' ? item.titleAr : item.titleEn}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Body */}
        <div className="overflow-y-auto p-6 flex flex-col lg:flex-row gap-6 items-center lg:items-stretch">
          
          {/* Video Preview Frame */}
          <div className="flex-1 flex items-center justify-center bg-black/60 rounded-xl overflow-hidden p-2 relative group w-full">
            <div
              className={`relative overflow-hidden rounded-lg shadow-2xl border border-white/10 ${
                isVertical ? 'aspect-[9/16] w-full max-w-[280px]' : 'aspect-video w-full'
              }`}
            >
              <img
                src={item.coverImage}
                alt={lang === 'ar' ? item.titleAr : item.titleEn}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

              {/* Center Play/Pause button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#C82626] hover:bg-[#a31d1d] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white translate-x-0.5" />}
              </button>

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-2">
                {/* Scrub Bar */}
                <div
                  className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress(Math.round((clickX / rect.width) * 100));
                  }}
                >
                  <div
                    className="bg-[#C82626] h-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-white/80 font-mono">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white">
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#C82626]" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <span>{item.duration}</span>
                  </div>
                  <span className="text-[11px] text-[#C82626]">KIN PRO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs & Details Pane */}
          <div className="w-full lg:w-80 flex flex-col justify-between space-y-6 shrink-0">
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-[#C82626] mb-1">
                {lang === 'ar' ? 'بيانات العمل من إنستجرام' : 'Instagram Project Details'}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {lang === 'ar' ? item.titleAr : item.titleEn}
              </h3>
              <p className="text-xs text-white/60 mb-3 font-mono">
                {lang === 'ar' ? 'الحساب:' : 'Account:'} {item.client}
              </p>

              {/* Instagram Caption */}
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-white/85 leading-relaxed mb-4">
                <span className="text-[#C82626] font-bold block mb-1">
                  {lang === 'ar' ? 'وصف الفيديو (Caption):' : 'Post Caption:'}
                </span>
                {lang === 'ar' ? item.instagramCaptionAr : item.instagramCaptionEn}
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-white/50 block font-mono">{lang === 'ar' ? 'الكاميرات والعدسات:' : 'Cameras & Rigs:'}</span>
                  <span className="font-semibold text-white/90">{lang === 'ar' ? item.specs.camerasAr : item.specs.camerasEn}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-mono">{lang === 'ar' ? 'هندسة الصوت:' : 'Sound Setup:'}</span>
                  <span className="font-semibold text-white/90">{lang === 'ar' ? item.specs.soundAr : item.specs.soundEn}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-mono">{lang === 'ar' ? 'المخرجات والتسليم:' : 'Deliverables:'}</span>
                  <span className="font-semibold text-white/90">{lang === 'ar' ? item.specs.deliverablesAr : item.specs.deliverablesEn}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-mono">{lang === 'ar' ? 'تلوين سينمائي:' : 'Color Grading:'}</span>
                  <span className="font-semibold text-white/90">{lang === 'ar' ? item.specs.colorGradeAr : item.specs.colorGradeEn}</span>
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
                <span>{lang === 'ar' ? 'مشاهدة الريل على إنستجرام ↗' : 'Watch Reel on Instagram ↗'}</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onBookProject(item.category);
                }}
                className="w-full py-3 text-xs font-bold text-white bg-[#C82626] hover:bg-[#a31d1d] rounded-lg transition-colors shadow cursor-pointer text-center block"
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
