import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Sparkles, MapPin, User } from 'lucide-react';
import { WHATSAPP_NUMBER, DISPLAY_PHONE, createWhatsAppUrl } from '../utils/whatsapp';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenInquiry: (packageName?: string) => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, openLoginModal, openProfileModal } = useAuth();

  interface NavLinkItem {
    name: string;
    href: string;
    isHot?: boolean;
    isFestive?: boolean;
  }

  const navLinks: NavLinkItem[] = [
    { name: lang === 'hi' ? 'होम' : 'HOME', href: '#home' },
    { name: lang === 'hi' ? 'पितृपक्ष गया जी' : 'PITRU PAKSHA 2026', href: '#pitru-paksha' },
    { name: lang === 'hi' ? 'यात्राएं' : 'YATRAS', href: '#yatras' },
    { name: lang === 'hi' ? 'स्ट्रेंजर ट्रिप्स' : 'STRANGER TRIPS', href: '#stranger-trips', isHot: true },
    { name: lang === 'hi' ? 'हमारे बारे में' : 'ABOUT US', href: '#about' },
    { name: lang === 'hi' ? 'संपर्क' : 'CONTACT', href: '#contact' },
  ];

  const handleWhatsAppClick = () => {
    const defaultMsg = "Namaste Purva Yatra! 🙏\nI want to plan a spiritual pilgrimage / travel package with Purva Yatra. Please share details and best quotes.";
    window.open(createWhatsAppUrl(defaultMsg), '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b1224]/95 backdrop-blur-md text-white shadow-xl border-b border-white/10">
      {/* Top Utility Bar */}
      <div className="bg-[#060b16] border-b border-white/5 px-4 py-2 text-xs text-gray-300 font-sans">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#cca042] font-medium tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#cca042]" />
              <span>{lang === 'hi' ? 'आस्था से यात्रा, आशीर्वाद के साथ वापसी' : 'Travel with Faith, Return with Blessings'}</span>
            </span>
            <span className="hidden sm:inline-block text-white/20">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-gray-400 tracking-wider">
              <MapPin className="w-3 h-3 text-[#cca042]" />
              <span>Curated East India & Himalayan Heritage Journeys</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a 
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`} 
              className="inline-flex items-center gap-1.5 text-gray-200 hover:text-[#cca042] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#cca042]" />
              <span className="font-semibold tracking-wider">{DISPLAY_PHONE}</span>
            </a>

            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-0.5 rounded text-[10px] uppercase tracking-widest bg-white/10 hover:bg-white/20 text-gray-200 border border-white/15 transition-all font-sans cursor-pointer"
              title="Toggle Language"
            >
              {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Slogan */}
          <a href="#home" className="flex items-center gap-3.5 group text-left">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#cca042] to-[#f4deb2] flex items-center justify-center p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b1224] rounded-full flex items-center justify-center">
                {/* Spiritual Temple / Lotus Emblem */}
                <svg className="w-5 h-5 text-[#cca042]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 7.5L20 8.5L16 12.5L17 18L12 15L7 18L8 12.5L4 8.5L9.5 7.5L12 2Z" opacity="0.25"/>
                  <path d="M12 3C12 3 8 8 8 13C8 16 10 18 12 18C14 18 16 16 16 13C16 8 12 3 12 3Z"/>
                  <path d="M12 18V21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-light tracking-[0.2em] font-serif text-white uppercase">
                <span className="text-[#cca042] font-normal">PURVA </span>
                <span className="text-white">YATRA</span>
              </div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 font-sans">
                {lang === 'hi' ? 'आस्था से यात्रा, आशीर्वाद के साथ वापसी' : 'Travel with Faith, Return with Blessings'}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs tracking-widest uppercase font-sans text-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`hover:text-[#cca042] border-b-2 border-transparent hover:border-[#cca042] pb-1 transition-all flex items-center gap-1.5 ${
                  link.isFestive ? 'text-[#edd085] font-semibold' : ''
                }`}
              >
                <span>{link.name}</span>
                {link.isFestive && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-gradient-to-r from-[#cca042] to-[#eed79b] text-black tracking-normal leading-none animate-pulse">
                    FESTIVE
                  </span>
                )}
                {link.isHot && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#cca042] text-black tracking-normal leading-none">
                    NEW
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Action CTAs - Matches Mockup "GET QUOTE ON WHATSAPP" */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={isLoggedIn ? openProfileModal : openLoginModal}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-[#cca042] border border-white/15 transition-colors cursor-pointer shrink-0"
              aria-label={isLoggedIn ? 'My Profile' : 'Login'}
              title={isLoggedIn ? (user?.name || 'My Profile') : 'Login'}
            >
              {isLoggedIn ? (
                <span className="text-xs font-bold uppercase">
                  {(user?.name ? user.name[0] : 'Y').toUpperCase()}
                </span>
              ) : (
                <User className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="px-4 py-2.5 bg-[#cca042] hover:bg-[#b88c34] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black" />
              <span>GET QUOTE ON WHATSAPP</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={handleWhatsAppClick}
              className="p-2 bg-[#cca042] text-black hover:bg-[#b88c34] transition-colors"
              aria-label="WhatsApp Quote"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/10 text-white hover:bg-white/20 border border-white/15 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b1224] border-b border-white/10 px-6 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-xs tracking-widest uppercase font-sans text-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#cca042] py-2 border-b border-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <div className="flex items-center gap-1.5">
                  {link.isFestive && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#cca042] text-black tracking-normal leading-none">
                      FESTIVE
                    </span>
                  )}
                  {link.isHot && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#cca042] text-black tracking-normal leading-none">
                      NEW
                    </span>
                  )}
                </div>
              </a>
            ))}
          </nav>
          
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5 font-sans">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              className="w-full py-3 bg-[#cca042] hover:bg-[#b88c34] text-black text-xs font-bold uppercase tracking-wider text-center shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>GET QUOTE ON WHATSAPP</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3 border border-white/15 bg-white/5 text-white text-xs font-bold uppercase tracking-wider text-center"
            >
              {lang === 'hi' ? 'यात्रा प्लान करें' : 'Plan Your Yatra'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                isLoggedIn ? openProfileModal() : openLoginModal();
              }}
              className="w-full py-3 border border-white/15 bg-white/5 text-[#cca042] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>{isLoggedIn ? (user?.name || (lang === 'hi' ? 'मेरी प्रोफाइल' : 'My Profile')) : (lang === 'hi' ? 'लॉगिन' : 'Login')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
