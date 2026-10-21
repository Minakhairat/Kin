import React, { useState } from 'react';
import { COMPANY_INFO, PORTFOLIO_ITEMS } from '../data/content';
import { Language, PortfolioItem } from '../types';
import {
  Play,
  Pause,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Sparkles,
  MapPin,
  CheckCircle2,
  Instagram,
  Film,
  ExternalLink,
} from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
  onOpenVideoModal: (item: any) => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenBooking,
  onOpenVideoModal,
}) => {
  const [isPlayingReel, setIsPlayingReel] = useState(false);
  const [selectedFeaturedIndex, setSelectedFeaturedIndex] = useState(0);

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  // 3 featured authentic videos from @kin.media.production
  const featuredVideos: PortfolioItem[] = [
    PORTFOLIO_ITEMS[0], // DefBSyaMN0Z - Turning imagination into reality
    PORTFOLIO_ITEMS[1], // DeCh05EMrkI - Podcast full broadcast
    PORTFOLIO_ITEMS[2], // DeoYX4fF-Bw - REEL IT IN workshop
  ];

  const currentFeatured = featuredVideos[selectedFeaturedIndex] || PORTFOLIO_ITEMS[0];
  const embedSrc = currentFeatured.instagramEmbedUrl || `https://www.instagram.com/reel/${currentFeatured.instagramShortcode}/embed/`;

  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-black/8">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14121108_1px,transparent_1px),linear-gradient(to_bottom,#14121108_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column (Typographic Hierarchy) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Kicker / Subtitle */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C82626] mb-4">
              <span>{lang === 'ar' ? 'ستوديو إنتاج متكامل في مصر الجديدة' : 'Creative Production Studio in Heliopolis'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#141211]/60">KEEP IT NEAT</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#141211] tracking-tight leading-[1.15] mb-6 text-balance">
              {lang === 'ar' ? (
                <>
                  فريق واحد بيخطط ويصور ويمنتج <span className="text-[#C82626] inline-block">تحت سقف واحد</span>
                </>
              ) : (
                <>
                  One team to plan, shoot, and edit <span className="text-[#C82626] inline-block">under one roof</span>
                </>
              )}
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-[#141211]/80 leading-relaxed mb-8 max-w-xl text-balance">
              {lang === 'ar'
                ? 'استوديو KIN في قلب الكوربة بمصر الجديدة. بنحول فكرتك لبرنامج بودكاست احترافي متصور بكاميرات متعددة، أو محتوى ريلز شهري منظم يبني حضور حقيقي لبراندك بدون أي فوضى.'
                : 'Based in the historic Korba district of Heliopolis. We turn your vision into multi-cam broadcast podcasts and strategic monthly reels that grow your personal brand.'}
            </p>

            {/* Primary Action Row */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumbers[0]}?text=${encodeURIComponent(
                  lang === 'ar'
                    ? 'مرحباً، أود حجز جلسة تصوير في استوديو KIN Media Production'
                    : 'Hello, I want to book a production session at KIN Media Production Studio'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-[#C82626] hover:bg-[#a31d1d] active:scale-[0.98] transition-all rounded shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'ar' ? 'احجز دلوقتي عبر واتساب' : 'Book Now on WhatsApp'}</span>
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#141211] bg-white border border-black/15 hover:border-black/40 hover:bg-black/5 transition-all rounded cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#C82626]" />
                <span>{lang === 'ar' ? 'مشاهدة فيديوهات إنستجرام' : 'Watch Instagram Reels'}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Location & Contact Meta */}
            <div className="flex items-center gap-3 text-xs text-[#141211]/70 border-t border-black/8 pt-4">
              <MapPin className="w-4 h-4 text-[#C82626] shrink-0" />
              <span>
                {lang === 'ar'
                  ? '24 شارع غرناطة، الكوربة، مصر الجديدة — الدور الثاني، شقة 9'
                  : '24 Granada St., Korba, Heliopolis, Cairo — 2nd Floor, Apt 9'}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Container & Interactive Showreel Frame */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-[#141211] group flex flex-col">
              
              {/* Featured Selector Tabs */}
              <div className="p-2.5 bg-black/70 border-b border-white/10 flex items-center justify-between gap-2 overflow-x-auto text-xs">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#C82626] animate-pulse" />
                  <span className="font-mono text-white/90 text-[11px] font-bold">@kin.media.production</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {featuredVideos.map((vid, idx) => (
                    <button
                      key={vid.id}
                      onClick={() => {
                        setSelectedFeaturedIndex(idx);
                        setIsPlayingReel(true);
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                        selectedFeaturedIndex === idx
                          ? 'bg-[#C82626] text-white shadow-xs'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {idx === 0
                        ? (lang === 'ar' ? 'ريل سينمائي' : 'Cinema Reel')
                        : idx === 1
                        ? (lang === 'ar' ? 'بودكاست' : 'Podcast')
                        : (lang === 'ar' ? 'ورشة ريلز' : 'Workshop')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Media Container: Either Live Instagram Embed or Interactive Preview */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-black flex items-center justify-center">
                {isPlayingReel ? (
                  /* Pure Clean Native Video Player (NO Instagram Post Chrome) */
                  <div className="relative w-full h-full bg-black flex items-center justify-center">
                    <video
                      src={currentFeatured.videoUrl || './assets/instagram/DefBSyaMN0Z.mp4'}
                      poster={currentFeatured.coverImage}
                      autoPlay
                      controls
                      playsInline
                      loop
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setIsPlayingReel(false)}
                      className="absolute top-3 end-3 px-2 py-1 bg-black/80 hover:bg-[#C82626] text-white text-[11px] font-bold rounded border border-white/20 transition-colors z-20 cursor-pointer shadow-md"
                    >
                      ✕ {lang === 'ar' ? 'إغلاق الفيديو' : 'Close Video'}
                    </button>
                  </div>
                ) : (
                  /* Video Poster with Direct Play Button */
                  <div
                    onClick={() => setIsPlayingReel(true)}
                    className="w-full h-full cursor-pointer relative"
                  >
                    <img
                      src={currentFeatured.coverImage}
                      alt={lang === 'ar' ? currentFeatured.titleAr : currentFeatured.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Cinematic Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

                    {/* Studio Live Indicator Tag */}
                    <div className="absolute top-4 start-4 flex items-center gap-2 px-3 py-1 bg-black/75 backdrop-blur-md rounded text-white text-xs font-mono">
                      <span className="w-2 h-2 rounded-full bg-[#C82626] animate-pulse" />
                      <span className="font-semibold tracking-wider">LIVE INSTAGRAM REEL</span>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute top-4 end-4 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded text-white/90 text-xs font-mono">
                      {currentFeatured.duration}
                    </div>

                    {/* Center Big Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlayingReel(true);
                        }}
                        className="w-16 h-16 rounded-full bg-[#C82626] hover:bg-[#a31d1d] text-white flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-10"
                        aria-label="Play Reel"
                      >
                        <Play className="w-7 h-7 fill-white translate-x-0.5" />
                      </button>
                    </div>

                    {/* Bottom Frame Details */}
                    <div className="absolute bottom-4 inset-x-4 flex items-end justify-between text-white">
                      <div className="max-w-md">
                        <p className="text-[11px] uppercase tracking-widest text-[#C82626] font-semibold font-mono">
                          {currentFeatured.category.toUpperCase()} · @kin.media.production
                        </p>
                        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 mt-0.5">
                          {lang === 'ar' ? currentFeatured.titleAr : currentFeatured.titleEn}
                        </h2>
                      </div>
                      <div className="text-xs font-mono text-white/70 bg-black/60 px-2 py-1 rounded backdrop-blur-sm shrink-0">
                        {currentFeatured.views}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Bar inside container */}
              <div className="bg-[#141211] p-3.5 text-xs text-white/80 flex items-center justify-between border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingReel(true)}
                    className="text-white hover:text-[#C82626] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-[#C82626]" />
                    <span>{lang === 'ar' ? 'تشغيل الريل هنا' : 'Play Live Here'}</span>
                  </button>

                  <span className="text-white/30">|</span>

                  <button
                    onClick={() => onOpenVideoModal(currentFeatured)}
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'شاشة كاملة ومواصفات' : 'Fullscreen & Specs'}
                  </button>
                </div>

                <a
                  href={currentFeatured.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C82626] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>{lang === 'ar' ? 'فتح بإنستجرام ↗' : 'Instagram ↗'}</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
