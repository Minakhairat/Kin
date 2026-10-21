/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, PortfolioItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyKin } from './components/WhyKin';
import { ServicesOverview } from './components/ServicesOverview';
import { PricingCalculator } from './components/PricingCalculator';
import { Portfolio } from './components/Portfolio';
import { StudioAbout } from './components/StudioAbout';
import { BookingContact } from './components/BookingContact';
import { Footer } from './components/Footer';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { PosterModal } from './components/PosterModal';
import { BookingModal } from './components/BookingModal';
import { useInstagramFeed } from './hooks/useInstagramFeed';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [pricingCategory, setPricingCategory] = useState<'podcasts' | 'reels'>('podcasts');
  
  // Modals state
  const [activeVideoModal, setActiveVideoModal] = useState<PortfolioItem | null>(null);
  const [activePosterModal, setActivePosterModal] = useState<'podcasts' | 'reels' | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPkgId, setBookingPkgId] = useState<string | undefined>('podcast-doubleday');
  const [bookingAddons, setBookingAddons] = useState<string[]>([]);
  const [bookingTotal, setBookingTotal] = useState<number | undefined>(undefined);

  // Real-time Instagram feed state
  const { posts } = useInstagramFeed();

  // Sync RTL / LTR on html root
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleOpenBooking = (pkgId?: string, customAddons?: string[], calculatedTotal?: number) => {
    if (pkgId) setBookingPkgId(pkgId);
    if (customAddons) setBookingAddons(customAddons);
    if (calculatedTotal) setBookingTotal(calculatedTotal);
    setIsBookingModalOpen(true);
  };

  const handleSelectServiceFromOverview = (category: 'podcasts' | 'reels' | 'commercials') => {
    if (category === 'commercials') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setPricingCategory(category);
      const el = document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAFAFA] text-[#141211] font-brand selection:bg-[#C82626] selection:text-white ${lang === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
      
      {/* 3-Zone Clean Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLang}
        onOpenBooking={() => handleOpenBooking('podcast-doubleday')}
      />

      <main>
        {/* Hero Section with Clean Real Video Player */}
        <Hero
          lang={lang}
          onOpenBooking={() => handleOpenBooking('podcast-doubleday')}
          onOpenVideoModal={(item) => setActiveVideoModal(item)}
        />

        {/* 6 Core Strength Pillars (Why KIN) */}
        <WhyKin lang={lang} />

        {/* Specialized Production Services */}
        <ServicesOverview
          lang={lang}
          onSelectService={handleSelectServiceFromOverview}
          onOpenBooking={handleOpenBooking}
        />

        {/* Official Packages & Real-Time Interactive Calculator */}
        <PricingCalculator
          lang={lang}
          activeCategory={pricingCategory}
          onCategoryChange={setPricingCategory}
          onOpenBooking={handleOpenBooking}
          onViewPoster={(type) => setActivePosterModal(type)}
        />

        {/* Portfolio with Real Videos in Clean Fullscreen */}
        <Portfolio
          lang={lang}
          onOpenVideoModal={(item) => setActiveVideoModal(item)}
        />

        {/* Studio & Korba Heritage */}
        <StudioAbout
          lang={lang}
          onOpenBooking={() => handleOpenBooking('podcast-doubleday')}
        />

        {/* Booking Form, Direct Numbers & Korba Studio Map */}
        <BookingContact
          lang={lang}
          preselectedPackageId={bookingPkgId}
          preselectedAddons={bookingAddons}
          calculatedTotal={bookingTotal}
        />
      </main>

      {/* Clean Minimalist Footer */}
      <Footer lang={lang} />

      {/* Pure Fullscreen Cinema Video Player Modal */}
      {activeVideoModal && (
        <VideoPlayerModal
          item={activeVideoModal}
          allItems={posts}
          lang={lang}
          onClose={() => setActiveVideoModal(null)}
          onSelectItem={(newItem) => setActiveVideoModal(newItem)}
          onBookProject={(cat) => {
            handleOpenBooking(cat === 'reels' ? 'reels-pro' : 'podcast-doubleday');
          }}
        />
      )}

      {/* Official Price Sheet Poster Modal */}
      {activePosterModal && (
        <PosterModal
          initialType={activePosterModal}
          lang={lang}
          onClose={() => setActivePosterModal(null)}
        />
      )}

      {/* Quick Session Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        initialPackageId={bookingPkgId}
        initialAddons={bookingAddons}
        calculatedTotal={bookingTotal}
        lang={lang}
        onClose={() => setIsBookingModalOpen(false)}
      />

    </div>
  );
}
