import React from 'react';
import { Hotel, Car, ShieldCheck, Users, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { WHY_US_PILLARS } from '../data/yatras';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface WhyPurvaYatraProps {
  lang: 'en' | 'hi';
}

export const WhyPurvaYatra: React.FC<WhyPurvaYatraProps> = ({ lang }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hotel':
        return <Hotel className="w-5 h-5 text-[#cca042]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#cca042]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#cca042]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#cca042]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#cca042]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#cca042]" />;
    }
  };

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#faf8f5] text-[#1f2937] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-gray-500 text-xs font-sans tracking-[0.3em] uppercase font-semibold">
              {lang === 'hi' ? 'हमारी विशेषताएं' : 'OUR SACRED COMMITMENT'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light tracking-[0.15em] text-[#111827] font-serif uppercase">
            WHY PURVA YATRA
          </h2>
          <div className="w-16 h-[2px] bg-[#cca042] mx-auto mt-3" />
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-sans font-light">
            {lang === 'hi'
              ? 'तीर्थ यात्रा केवल घूमना नहीं, अपितु आत्मिक शांति का मार्ग है। हम हर कदम पर आपके और आपके परिवार के साथ हैं।'
              : 'Pilgrimage is not merely sightseeing; it is a sacred pursuit of inner tranquility. We accompany your family with reverence.'}
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_US_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="p-6 rounded-xl bg-white border border-gray-200/80 hover:border-[#cca042] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#fef9ee] border border-[#f5e6c8] flex items-center justify-center">
                    {getIcon(pillar.icon)}
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-[#fef3c7] text-[#926017] border border-[#fde68a]">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg font-light tracking-wide text-[#111827] font-serif mb-1">
                  {pillar.title}
                </h3>
                {lang === 'hi' && (
                  <p className="text-xs font-serif text-[#cca042] mb-2 italic">
                    {pillar.hindiTitle}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2 font-sans font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[10px] text-gray-500 font-sans tracking-widest uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Quality Standards</span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight trust banner */}
        <div className="mt-14 bg-[#0c183a] rounded-xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-[#cca042] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#cca042]" />
            </div>
            <div>
              <h4 className="font-serif font-light text-lg sm:text-xl text-white tracking-wide">
                Taking Elder Parents for Darshan?
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 font-sans font-light mt-1">
                We provide ground-floor rooms, battery car bookings, wheelchair assistance, and gentle pacing for senior citizens.
              </p>
            </div>
          </div>
          <a
            href={createWhatsAppUrl('Namaste Purva Yatra! I am planning a pilgrimage for senior citizen family members. Please suggest safe and comfortable package options.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 bg-[#cca042] hover:bg-[#b88c34] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer font-sans"
          >
            Inquire Senior Package
          </a>
        </div>

      </div>
    </section>
  );
};
