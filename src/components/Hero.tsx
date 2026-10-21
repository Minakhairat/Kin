import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { Language } from '../types';
import { Play, Pause, MessageCircle, ArrowRight, ArrowLeft, Volume2, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

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
  const [isPlaying, setIsPlaying] = useState(true);

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

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
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#141211] bg-white border border-black/15 hover:border-black/40 hover:bg-black/5 transition-all rounded cursor-pointer"
              >
                <span>{lang === 'ar' ? 'استعراض الباكدجات والأسعار' : 'Explore Packages & Rates'}</span>
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-[#141211] group">
              
              {/* Media Image with Studio Grading */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={COMPANY_INFO.images.heroStudio}
                  alt="KIN Media Production Studio - Multi-Camera Podcast Set"
                  className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                  referrerPolicy="no-referrer"
                />

                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

                {/* Studio Live Indicator Tag */}
                <div className="absolute top-4 start-4 flex items-center gap-2 px-3 py-1 bg-black/75 backdrop-blur-md rounded text-white text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#C82626] animate-pulse" />
                  <span className="font-semibold tracking-wider">REC // 4K MULTI-CAM</span>
                </div>

                {/* Audio Wave Sim */}
                <div className="absolute top-4 end-4 flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded text-white/90 text-xs">
                  <Volume2 className="w-3.5 h-3.5 text-[#C82626]" />
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-[#C82626] h-full animate-[pulse_1s_infinite]" />
                    <span className="w-0.5 bg-white h-2/3" />
                    <span className="w-0.5 bg-[#C82626] h-full animate-[pulse_1.4s_infinite]" />
                    <span className="w-0.5 bg-white h-1/2" />
                  </div>
                </div>

                {/* Center Interactive Reel Play Trigger */}
                <button
                  onClick={() =>
                    onOpenVideoModal({
                      id: 'hero-showreel',
                      titleAr: 'شوريل استوديو KIN الرسمي — الكوربة، القاهرة',
                      titleEn: 'Official KIN Studio Showreel — Korba, Cairo',
                      category: 'podcasts',
                      client: '@kin.media.production',
                      duration: '02:15',
                      aspectRatio: '16:9',
                      coverImage: COMPANY_INFO.images.heroStudio,
                      summaryAr: 'جولة استكشافية حصرية داخل استوديو KIN بالكوربة: جلسات تصوير بودكاست متعددة الكاميرات، إضاءات سينمائية، وصناعة ريلز شهرية بجودة تلفزيونية.',
                      summaryEn: 'An exclusive walkthrough inside KIN Studio in Korba: multi-cam podcast sessions, broadcast audio chains, and monthly reels production.',
                      instagramUrl: 'https://www.instagram.com/reel/DeklES2xHNB/',
                      instagramShortcode: 'DeklES2xHNB',
                      instagramEmbedUrl: 'https://www.instagram.com/reel/DeklES2xHNB/embed/',
                      instagramCaptionAr: 'لقطات من داخل ستوديو KIN بالكوربة. إضاءات، كاميرات، وصوت استوديو احترافي لخدمة فكرتك. #KeepItNeat #KinMedia #Heliopolis',
                      instagramCaptionEn: 'Inside KIN Studio in Korba. Cinematic lighting, broadcast cameras, and studio sound to elevate your story. #KeepItNeat #KinMedia #Heliopolis',
                      likes: 3420,
                      views: '48.9K',
                      specs: {
                        camerasAr: 'Sony Cinema Line (FX6 / FX3) بدقة 4K ProRes',
                        camerasEn: 'Sony Cinema Line (FX6 / FX3) 4K ProRes',
                        soundAr: 'مايكات إذاعية Shure SM7B مع عزل صوتي كامل',
                        soundEn: 'Shure SM7B broadcast chain with acoustic suite',
                        deliverablesAr: 'مونتاج سينمائي كامل + مقاطع مجهزة للريلز والـ Shorts',
                        deliverablesEn: 'Full broadcast master + cutdown vertical shorts',
                        colorGradeAr: 'تلوين نقي يحافظ على درجات البشرة الطبيعية',
                        colorGradeEn: 'Signature Neat editorial grade with skin preservation',
                      },
                    })
                  }
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#C82626] hover:bg-[#a31d1d] text-white flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-10"
                  aria-label="Play Studio Showreel"
                >
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </button>

                {/* Bottom Frame Details */}
                <div className="absolute bottom-4 inset-x-4 flex items-end justify-between text-white">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#C82626] font-semibold">
                      {lang === 'ar' ? 'شوريل الاستوديو' : 'Official Showreel'}
                    </p>
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {lang === 'ar' ? 'جلسات البودكاست والريلز في ستوديو KIN' : 'Podcasts & Reels at KIN Studio'}
                    </h2>
                  </div>
                  <div className="text-xs font-mono text-white/70 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                    TC 00:02:15:00
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Bar inside container */}
              <div className="bg-[#141211] p-4 text-xs text-white/80 flex items-center justify-between border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C82626]" />
                  {lang === 'ar' ? 'أعلى مواصفات تصوير وعزل صوتي' : 'Broadcast multi-cam & acoustic isolation'}
                </span>
                <button
                  onClick={() => onOpenBooking()}
                  className="text-[#C82626] hover:text-white font-semibold transition-colors underline cursor-pointer"
                >
                  {lang === 'ar' ? 'احجز ميعادك' : 'Book a session'}
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Full-Width 4-Column Proof & Trust Strip (adjacent below hero split) */}
        <div className="mt-16 pt-8 border-t border-black/8 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#141211] tracking-tight">
              100%
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C82626] mt-1">
              {lang === 'ar' ? 'إنتاج داخلي كامل' : 'In-House Pipeline'}
            </span>
            <p className="text-xs text-[#141211]/60 mt-1">
              {lang === 'ar' ? 'تخطيط، تصوير، مونتاج تحت سقف واحد' : 'Plan, shoot, and edit under one roof'}
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#141211] tracking-tight">
              3+
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C82626] mt-1">
              {lang === 'ar' ? 'كاميرات سينمائية' : 'Cinema Cameras'}
            </span>
            <p className="text-xs text-[#141211]/60 mt-1">
              {lang === 'ar' ? 'زوايا كلوز ووايد متزامنة لكل متحدث' : 'Close-up & wide angles per speaker'}
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#141211] tracking-tight">
              3–5
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C82626] mt-1">
              {lang === 'ar' ? 'أيام عمل للتسليم' : 'Days Turnaround'}
            </span>
            <p className="text-xs text-[#141211]/60 mt-1">
              {lang === 'ar' ? 'مواعيد تسليم ثابتة دون تأخير' : 'Guaranteed punctual delivery queue'}
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#141211] tracking-tight">
              الكوربة
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C82626] mt-1">
              {lang === 'ar' ? 'مصر الجديدة' : 'Heliopolis Studio'}
            </span>
            <p className="text-xs text-[#141211]/60 mt-1">
              {lang === 'ar' ? '24 شارع غرناطة، هدوء وعزل صوتي' : '24 Granada St, easy access & lounge'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
