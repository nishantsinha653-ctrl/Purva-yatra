import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Heart, 
  Users, 
  User, 
  Car, 
  Hotel, 
  Compass, 
  Clock, 
  PhoneCall, 
  Globe2, 
  Info,
  ChevronRight
} from 'lucide-react';
import { YatraPackage } from '../types';
import { getPitruPakshaTierWhatsAppUrl, getPindDaanWhatsAppUrl, createWhatsAppUrl } from '../utils/whatsapp';
import vishnupadImage from '../assets/images/vishnupad_mandir_gaya_1788464154212.jpg';
import sitaKundImage from '../assets/images/sita_kund_gaya_ji_1788709374096.jpg';

interface FeaturedSpotlightProps {
  packageData: YatraPackage;
  onOpenInquiry: (packageName: string) => void;
  onViewDetails: (pkg: YatraPackage) => void;
  onStartBooking?: (tier: 'single' | 'couple' | 'group') => void;
  lang: 'en' | 'hi';
}

export const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({
  packageData,
  onOpenInquiry,
  onViewDetails,
  onStartBooking,
  lang,
}) => {
  const [selectedTier, setSelectedTier] = useState<'single' | 'couple' | 'group'>('group');
  const [selectedState, setSelectedState] = useState<string>('All India');

  const inclusions = [
    'Comfortable Stay',
    'Pick-up & Drop',
    'Pind Daan Assistance',
    'Temple Darshan',
    'Local Sightseeing',
    'Travel Assistance',
    '24x7 Support',
  ];

  const statesList = [
    'Odisha',
    'West Bengal',
    'Tamil Nadu',
    'Rajasthan',
    'Gujarat',
    'Maharashtra',
    'Across India',
  ];

  const handleStateClick = (stateName: string) => {
    setSelectedState(stateName);
    const msg = `Namaste Purva Yatra! 🙏\nWe are planning to travel from *${stateName}* to Gaya Ji for *Pitru Paksha 2026*.\nPlease share package details, train/flight arrival guidance, and priest booking arrangements.`;
    window.open(createWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="pitru-paksha" className="py-16 sm:py-24 bg-[#050a18] text-white relative overflow-hidden border-b border-[#cca042]/30">
      
      {/* Background ambient lighting and pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#cca042_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#cca042]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#926017]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Master Poster Container with Royal Gold Border & Ornate Framing */}
        <div className="rounded-3xl bg-gradient-to-b from-[#091124] via-[#070e1e] to-[#040814] border-2 border-[#cca042] shadow-[0_20px_70px_-15px_rgba(204,160,66,0.35)] p-5 sm:p-8 lg:p-12 relative overflow-hidden">
          
          {/* Top Corner Filigree / Traditional Floral Accents */}
          <div className="absolute top-3 left-3 text-[#cca042]/40 text-xl select-none pointer-events-none font-serif">
            ❖
          </div>
          <div className="absolute top-3 right-3 text-[#cca042]/40 text-xl select-none pointer-events-none font-serif">
            ❖
          </div>
          <div className="absolute bottom-3 left-3 text-[#cca042]/40 text-xl select-none pointer-events-none font-serif">
            ❖
          </div>
          <div className="absolute bottom-3 right-3 text-[#cca042]/40 text-xl select-none pointer-events-none font-serif">
            ❖
          </div>

          {/* 1. Header with Official Emblem & Book Now Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-[#cca042]/30">
            
            {/* Left Brand Badge */}
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#cca042] to-[#926017] p-0.5 shadow-md flex items-center justify-center shrink-0">
                <div className="w-full h-full rounded-full bg-[#070e1e] flex flex-col items-center justify-center text-[#cca042]">
                  <span className="text-lg">🛕</span>
                  <span className="text-[8px] font-bold tracking-widest text-[#eed79b]">PY</span>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase font-bold text-white leading-tight">
                  PURVA <span className="text-[#cca042]">YATRA</span>
                </h3>
                <div className="text-[10px] sm:text-xs font-sans tracking-[0.3em] uppercase text-[#eed79b] font-medium">
                  TRAVEL • TOURS • PILGRIMAGE
                </div>
                <div className="text-[9px] font-serif italic text-gray-400 tracking-wider mt-0.5">
                  YOUR JOURNEY. OUR RESPONSIBILITY.
                </div>
              </div>
            </div>

            {/* Right Booking CTA */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (onStartBooking) {
                    onStartBooking(selectedTier);
                  } else {
                    onOpenInquiry('Gaya Ji Pitru Paksha 2026');
                  }
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#cca042] via-[#e2ba5e] to-[#cca042] text-black font-serif font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>BOOK YOUR PILGRIMAGE NOW</span>
                <ChevronRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </div>

          {/* 2. Main Headline: GAYA JI PITRU PAKSHA 2026 */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            <div className="inline-flex items-center justify-center gap-2 mb-2 px-5 py-1.5 rounded-full bg-[#cca042]/15 border border-[#cca042]/40 text-[#edd085] text-xs uppercase tracking-[0.25em] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#cca042]" />
              <span>{lang === 'hi' ? 'मोक्ष धाम गया जी विशेष' : 'HOLY MOKSHA TEERTH SPECIAL'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-[0.1em] text-white uppercase font-bold drop-shadow-[0_4px_20px_rgba(204,160,66,0.35)] leading-tight">
              GAYA JI <span className="text-[#cca042]">PITRU PAKSHA</span> 2026
            </h2>

            {/* Dates Ribbon */}
            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#0d1833] border border-[#cca042]/60 shadow-md">
              <Calendar className="w-4 h-4 text-[#cca042]" />
              <span className="font-serif font-bold tracking-[0.2em] text-sm sm:text-base text-[#fbf0d3]">
                25 SEPTEMBER – 10 OCTOBER 2026
              </span>
            </div>

            {/* 16 Days Pill */}
            <div className="mt-3">
              <div className="inline-block px-6 py-1.5 rounded-full bg-gradient-to-r from-[#cca042] via-[#ecd292] to-[#cca042] text-black font-serif font-bold text-xs sm:text-sm tracking-[0.25em] uppercase shadow">
                16 DAYS OF SACRED PILGRIMAGE
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm font-sans tracking-[0.1em] text-gray-300 uppercase max-w-2xl mx-auto font-medium">
              {lang === 'hi'
                ? 'अपने पूर्वजों के लिए पवित्र पिंडदान व तर्पण कर्म करें और उनका आशीर्वाद प्राप्त करें।'
                : 'Perform sacred rituals for your ancestors and seek their blessings.'}
            </p>

            {/* 4 Central Pillar Values (Pind Daan, Ancestral Blessings, Spiritual Experience, Safe & Comfortable) */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <span className="text-2xl mb-1">🙏</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                  PIND DAAN & RITUALS
                </span>
                <span className="text-[9px] text-gray-400">Authentic Vedic Purohit</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <span className="text-2xl mb-1">🪔</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                  ANCESTRAL BLESSINGS
                </span>
                <span className="text-[9px] text-gray-400">Pitru Moksha & Shanti</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <span className="text-2xl mb-1">🏛️</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                  SPIRITUAL EXPERIENCE
                </span>
                <span className="text-[9px] text-gray-400">Vishnupad, Falgu & Bodh Gaya</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <span className="text-2xl mb-1">🛡️</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                  SAFE & COMFORTABLE
                </span>
                <span className="text-[9px] text-gray-400">Clean Hotel & AC Vehicles</span>
              </div>
            </div>
          </div>

          {/* 3. Core Architecture: Left Photo Arch + 3 Pricing Tiers + Right Photo Arch & Services */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
            
            {/* Left Arch: Vishnupad Temple */}
            <div className="lg:col-span-3 flex flex-col items-center">
              <div className="w-full rounded-2xl overflow-hidden border-2 border-[#cca042] shadow-xl relative bg-black/60 group">
                <div className="h-64 sm:h-80 overflow-hidden">
                  <img
                    src={vishnupadImage}
                    alt="Vishnupad Temple Gaya Ji"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                
                {/* Temple Description Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-center">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#edd085] uppercase tracking-wider">
                    VISHNUPAD TEMPLE
                  </h4>
                  <p className="text-[11px] text-gray-300 font-sans italic mt-0.5">
                    The Abode of Lord Vishnu's Sacred Footprint
                  </p>
                </div>
              </div>

              {/* Sub-note under left photo */}
              <div className="mt-3 text-center text-[10px] text-gray-400 max-w-xs font-sans">
                Main shrine for ritual offerings & Darshan of the holy 40 cm footprint carved in basalt.
              </div>
            </div>

            {/* Center: The 3 Package Tiers (Single, Couple, Group) */}
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-3.5">
              
              {/* Card 1: Single Package */}
              <div 
                onClick={() => setSelectedTier('single')}
                className={`rounded-2xl p-4.5 border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTier === 'single'
                    ? 'bg-gradient-to-b from-[#142347] to-[#0d1835] border-[#cca042] shadow-xl scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10'
                }`}
              >
                <div>
                  <div className="text-center pb-3 border-b border-white/10">
                    <span className="font-serif font-bold text-xs uppercase tracking-[0.15em] text-[#cca042] block">
                      SINGLE PACKAGE
                    </span>
                    <span className="text-[10px] text-gray-400 block mt-0.5 uppercase tracking-wider">
                      2 DAYS / 1 NIGHT
                    </span>
                    <div className="mt-2 text-2xl font-serif font-bold text-white">
                      ₹4,999/-
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-300 font-medium">
                      PER PERSON
                    </span>
                  </div>

                  {/* 7 Inclusions List */}
                  <ul className="mt-3.5 space-y-1.5 text-[11px] text-gray-200">
                    {inclusions.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#cca042] shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#cca042]/20 flex items-center justify-center text-[#cca042] mb-2">
                    <User className="w-4 h-4" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onStartBooking) {
                        onStartBooking('single');
                      } else {
                        window.open(getPitruPakshaTierWhatsAppUrl('single'), '_blank');
                      }
                    }}
                    className="w-full py-2 rounded-lg bg-[#cca042] hover:bg-[#b88c34] text-black font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Book Single
                  </button>
                </div>
              </div>

              {/* Card 2: Couple Package */}
              <div 
                onClick={() => setSelectedTier('couple')}
                className={`rounded-2xl p-4.5 border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTier === 'couple'
                    ? 'bg-gradient-to-b from-[#142347] to-[#0d1835] border-[#cca042] shadow-xl scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10'
                }`}
              >
                <div>
                  <div className="text-center pb-3 border-b border-white/10">
                    <span className="font-serif font-bold text-xs uppercase tracking-[0.15em] text-[#cca042] block">
                      COUPLE PACKAGE
                    </span>
                    <span className="text-[10px] text-gray-400 block mt-0.5 uppercase tracking-wider">
                      2 DAYS / 1 NIGHT
                    </span>
                    <div className="mt-2 text-2xl font-serif font-bold text-white">
                      ₹9,999/-
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-300 font-medium">
                      PER COUPLE
                    </span>
                  </div>

                  {/* 7 Inclusions List */}
                  <ul className="mt-3.5 space-y-1.5 text-[11px] text-gray-200">
                    {inclusions.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#cca042] shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#cca042]/20 flex items-center justify-center text-[#cca042] mb-2">
                    <Heart className="w-4 h-4 fill-[#cca042]" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onStartBooking) {
                        onStartBooking('couple');
                      } else {
                        window.open(getPitruPakshaTierWhatsAppUrl('couple'), '_blank');
                      }
                    }}
                    className="w-full py-2 rounded-lg bg-[#cca042] hover:bg-[#b88c34] text-black font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Book Couple
                  </button>
                </div>
              </div>

              {/* Card 3: Group Package (Featured) */}
              <div 
                onClick={() => setSelectedTier('group')}
                className={`rounded-2xl p-4.5 border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                  selectedTier === 'group'
                    ? 'bg-gradient-to-b from-[#1b2b54] to-[#101b38] border-[#cca042] shadow-2xl scale-[1.03]'
                    : 'bg-white/10 hover:bg-white/15 border-[#cca042]/60'
                }`}
              >
                {/* Popular Pill */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#cca042] to-[#eed79b] text-black text-[9px] font-extrabold uppercase tracking-widest shadow">
                    BEST VALUE
                  </span>
                </div>

                <div>
                  <div className="text-center pb-3 border-b border-white/10 pt-1">
                    <span className="font-serif font-bold text-xs uppercase tracking-[0.15em] text-[#eed79b] block">
                      GROUP PACKAGE
                    </span>
                    <span className="text-[9px] text-[#cca042] block mt-0.5 uppercase tracking-wider font-semibold">
                      2 DAYS / 1 NIGHT (MIN 6 PERSONS)
                    </span>
                    <div className="mt-2 text-2xl font-serif font-bold text-[#fbf0d3]">
                      ₹3,999/-
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-300 font-medium">
                      PER PERSON
                    </span>
                  </div>

                  {/* 7 Inclusions List */}
                  <ul className="mt-3.5 space-y-1.5 text-[11px] text-gray-200">
                    {inclusions.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#cca042] shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#cca042]/20 flex items-center justify-center text-[#cca042] mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onStartBooking) {
                        onStartBooking('group');
                      } else {
                        window.open(getPitruPakshaTierWhatsAppUrl('group'), '_blank');
                      }
                    }}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-[#cca042] to-[#e2ba5e] hover:brightness-110 text-black font-extrabold text-[11px] uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    Book Group (Save ₹1000)
                  </button>
                </div>
              </div>

            </div>

            {/* Right Arch & Services Column: Sita Kund + Our Services */}
            <div className="lg:col-span-3 flex flex-col space-y-4">
              
              {/* Sita Kund Framed Arch */}
              <div className="w-full rounded-2xl overflow-hidden border-2 border-[#cca042] shadow-xl relative bg-black/60 group">
                <div className="h-44 sm:h-48 overflow-hidden">
                  <img
                    src={sitaKundImage}
                    alt="Sita Kund Gaya Ji"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 inset-x-0 p-3 text-center">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#edd085] uppercase tracking-wider">
                    SITA KUND
                  </h4>
                  <p className="text-[10px] text-gray-300 font-sans italic mt-0.5">
                    The Sacred Place of Mother Sita
                  </p>
                </div>
              </div>

              {/* OUR SERVICES Sidebar Panel matching right vertical bar of poster */}
              <div className="bg-gradient-to-b from-[#101b38] to-[#0a1228] p-4 rounded-2xl border border-[#cca042]/50 shadow-md">
                <div className="text-center pb-2 mb-3 border-b border-[#cca042]/30">
                  <span className="font-serif font-bold text-xs uppercase tracking-[0.2em] text-[#cca042]">
                    OUR SERVICES
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-200">
                  <div className="flex items-center gap-1.5 p-1.5 rounded bg-white/5">
                    <span>🛏️</span>
                    <span className="font-medium">Comfortable Stay</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded bg-white/5">
                    <span>🚗</span>
                    <span className="font-medium">Pick-up & Drop</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded bg-white/5">
                    <span>🛕</span>
                    <span className="font-medium">Temple Darshan</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded bg-white/5">
                    <span>🌱</span>
                    <span className="font-medium">Pind Daan Assist</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded bg-white/5">
                    <span>🚐</span>
                    <span className="font-medium">Local Transport</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded bg-white/5">
                    <span>👥</span>
                    <span className="font-medium">Family & Groups</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded bg-white/5">
                    <span>🎧</span>
                    <span className="font-medium">Travel Support</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded bg-white/5">
                    <span>⏰</span>
                    <span className="font-medium">24x7 Assistance</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* 4. Travellers From Across India Section (Matching bottom map banner) */}
          <div className="bg-gradient-to-r from-[#0c1630] via-[#101f42] to-[#0c1630] rounded-2xl p-5 border border-[#cca042]/40 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#cca042]/20 border border-[#cca042] flex items-center justify-center text-[#cca042] shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#cca042] font-semibold">
                    ALL-INDIA PILGRIM SERVICES
                  </div>
                  <h4 className="text-sm sm:text-base font-serif text-white font-bold">
                    TRAVELLERS FROM ACROSS INDIA ARE WELCOME
                  </h4>
                </div>
              </div>

              {/* State Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {statesList.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStateClick(st)}
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/10 hover:bg-[#cca042] hover:text-black text-gray-200 border border-white/15 transition-all cursor-pointer"
                  >
                    {st}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* 5. Bottom 5 Core Pillars (Car & Tempo Rental, Hotel Booking, Sightseeing, Family & Group, Custom Packages) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center">
              <span className="text-xl mb-1">🚗</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                CAR & TEMPO RENTAL
              </span>
              <span className="text-[9px] text-gray-400 mt-0.5">AC Sedan, Innova, Tempo</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center">
              <span className="text-xl mb-1">🏨</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                HOTEL BOOKING
              </span>
              <span className="text-[9px] text-gray-400 mt-0.5">Near Vishnupad Mandir</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center">
              <span className="text-xl mb-1">🚩</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                SIGHTSEEING TOURS
              </span>
              <span className="text-[9px] text-gray-400 mt-0.5">Bodh Gaya, Barabar Caves</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center">
              <span className="text-xl mb-1">👨‍👩‍👧‍👦</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                FAMILY & GROUP TOURS
              </span>
              <span className="text-[9px] text-gray-400 mt-0.5">Senior-Citizen Friendly</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center col-span-2 sm:col-span-1">
              <span className="text-xl mb-1">📋</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                CUSTOMIZED PACKAGES
              </span>
              <span className="text-[9px] text-gray-400 mt-0.5">Vedic Purohit Scheduling</span>
            </div>
          </div>

          {/* 6. Closing Tagline & Dual Actions */}
          <div className="mt-8 pt-6 border-t border-[#cca042]/30 text-center">
            <p className="font-serif text-sm sm:text-base tracking-[0.2em] text-[#cca042] font-semibold uppercase mb-4">
              WE TAKE CARE OF YOUR JOURNEY, SO YOU CAN FOCUS ON YOUR FAITH.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (onStartBooking) {
                    onStartBooking(selectedTier);
                  } else {
                    window.open(getPitruPakshaTierWhatsAppUrl(selectedTier), '_blank');
                  }
                }}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#cca042] via-[#e2ba5e] to-[#cca042] text-black font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Book Online ({selectedTier.toUpperCase()} PACKAGE)</span>
              </button>

              <button
                onClick={() => onViewDetails(packageData)}
                className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Complete Gaya Ji Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => window.open(getPitruPakshaTierWhatsAppUrl(selectedTier), '_blank')}
                className="py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider shadow flex items-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Help</span>
              </button>

              <button
                onClick={() => onOpenInquiry('Gaya Ji Pitru Paksha 2026')}
                className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer border border-white/10"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request Call Back</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
