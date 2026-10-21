import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { Language } from '../types';
import { Menu, X, PhoneCall, Calendar } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenBooking: (pkgId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: lang === 'ar' ? 'الخدمات' : 'Services' },
    { href: '#pricing', label: lang === 'ar' ? 'الباكدجات والأسعار' : 'Pricing' },
    { href: '#portfolio', label: lang === 'ar' ? 'أعمالنا' : 'Portfolio' },
    { href: '#studio', label: lang === 'ar' ? 'الاستوديو' : 'The Studio' },
    { href: '#contact', label: lang === 'ar' ? 'تواصل معنا' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/8 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <img
            src={COMPANY_INFO.logo}
            alt="Kin Media Production Logo"
            className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#141211]/80">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#C82626] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C82626] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions (Lang Switch + CTA) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleLang}
            className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded border border-black/15 text-[#141211] hover:bg-black/5 transition-colors whitespace-nowrap shrink-0"
            title="Switch Language"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#C82626] hover:bg-[#a51e1e] active:scale-[0.98] transition-all rounded shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{lang === 'ar' ? 'احجز جلستك' : 'Book Session'}</span>
          </button>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumbers[0]}?text=${encodeURIComponent(
              lang === 'ar' ? 'مرحباً استوديو KIN، أود الاستفسار عن باقات التصوير' : 'Hello KIN Studio, I would like to inquire about production packages'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden p-2 text-white bg-[#C82626] rounded"
            aria-label="WhatsApp"
          >
            <PhoneCall className="w-4 h-4" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#141211] hover:bg-black/5 rounded transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 bg-white px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#141211] hover:text-[#C82626] transition-colors py-2 border-b border-black/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-[#C82626] rounded shadow cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{lang === 'ar' ? 'احجز استوديو الآن' : 'Book Studio Now'}</span>
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumbers[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-[#141211] bg-black/5 rounded hover:bg-black/10 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{lang === 'ar' ? 'واتساب مباشر: 01280700319' : 'Direct WhatsApp'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
