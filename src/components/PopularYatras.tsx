import React, { useState } from 'react';
import { Clock, MapPin, Star, MessageCircle, ArrowRight, Sparkles, Filter, Calendar } from 'lucide-react';
import { YatraPackage } from '../types';
import { getYatraWhatsAppUrl } from '../utils/whatsapp';

interface PopularYatrasProps {
  packages: YatraPackage[];
  onSelectPackage: (pkg: YatraPackage) => void;
  onBookPackage?: (pkg: YatraPackage) => void;
  lang: 'en' | 'hi';
  filterState?: string;
  filterCategory?: string;
}

export const PopularYatras: React.FC<PopularYatrasProps> = ({
  packages,
  onSelectPackage,
  onBookPackage,
  lang,
  filterState = 'all',
  filterCategory = 'all',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'durga-puja' | 'stranger-trip' | 'pind-daan' | 'shaktipeeth' | 'jyotirlinga' | 'himalayas'>('all');
  const [showAll, setShowAll] = useState(false);

  // Filter packages according to active tab and passed filters
  const filteredPackages = packages.filter((pkg) => {
    if (filterState !== 'all' && pkg.id !== filterState) return false;
    if (filterCategory !== 'all' && pkg.category !== filterCategory) return false;

    if (activeTab === 'durga-puja') return pkg.durgaPujaSpecial || pkg.id === 'kolkata-durga-puja-2026';
    if (activeTab === 'stranger-trip') return pkg.strangerTripSpecial || pkg.category === 'Stranger Trip Special' || pkg.id.includes('stranger');
    if (activeTab === 'pind-daan') return pkg.pindDaanSpecial || pkg.id === 'gaya-ji' || pkg.id === 'varanasi';
    if (activeTab === 'shaktipeeth') return pkg.category === 'Shaktipeeth';
    if (activeTab === 'jyotirlinga') return pkg.category === 'Jyotirlinga';
    if (activeTab === 'himalayas') return pkg.category === 'Himalayan Dham' || pkg.state === 'Uttarakhand';

    return true;
  });

  // Limit to 6 by default to match screenshot, or show all if toggled
  const displayedPackages = showAll ? filteredPackages : filteredPackages.slice(0, 6);

  return (
    <section id="yatras" className="py-16 sm:py-24 bg-[#ffffff] text-[#1f2937] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-gray-500 text-xs font-sans tracking-[0.3em] uppercase font-semibold">
              {lang === 'hi' ? 'पवित्र तीर्थ यात्राएं' : 'Sacred Pilgrimage Circuits'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light tracking-[0.15em] text-[#111827] font-serif uppercase">
            POPULAR YATRAS
          </h2>
          <div className="w-16 h-[2px] bg-[#cca042] mx-auto mt-3" />
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-sans font-light">
            {lang === 'hi'
              ? 'अनुभवी गाइड, स्वच्छ होटल एवं आरामदायक निजी वाहनों के साथ पूर्वी भारत और हिमालय की सबसे लोकप्रिय यात्राएं'
              : 'Handcrafted pilgrimage packages with dedicated Vedic Teerth Purohits, sanitized verified stays, and private chauffeurs.'}
          </p>
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: lang === 'hi' ? 'सभी यात्राएं (All)' : 'All Yatras' },
            { id: 'durga-puja', label: lang === 'hi' ? 'दुर्गा पूजा' : 'Durga Puja' },
            { id: 'stranger-trip', label: lang === 'hi' ? '🔥 स्ट्रेंजर ट्रिप (Solo Sangha)' : '🔥 Stranger Trips (Solo)' },
            { id: 'pind-daan', label: lang === 'hi' ? 'गया जी / पिंडदान विशेष' : 'Pind Daan & Shraddh' },
            { id: 'shaktipeeth', label: lang === 'hi' ? 'शक्तिपीठ (Maa Tarapith)' : 'Shaktipeeth (Tarapith)' },
            { id: 'jyotirlinga', label: lang === 'hi' ? 'ज्योतिर्लिंग (Kashi / Baidyanath)' : 'Jyotirlingas' },
            { id: 'himalayas', label: lang === 'hi' ? 'हिमालय (Badri / Kedar)' : 'Himalayan Dham' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all cursor-pointer font-sans ${
                activeTab === tab.id
                  ? 'bg-[#0b1224] text-white shadow-md border border-[#0b1224]'
                  : 'bg-white text-gray-700 hover:text-black hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Yatras Cards Grid matching screenshot layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedPackages.map((pkg) => {
            const waUrl = getYatraWhatsAppUrl(pkg.title, pkg.duration, pkg.startingPrice);

            return (
              <div
                key={pkg.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#cca042] transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl"
              >
                {/* Image Container with Dark Overlay Title Bar */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-gray-900">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 bg-[#cca042] text-black font-bold text-[10px] tracking-widest uppercase shadow-sm">
                      {pkg.category}
                    </span>
                    {pkg.spotlight && (
                      <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-[#edd085] border border-white/20 font-bold text-[10px] tracking-widest uppercase shadow-sm">
                        Most Popular
                      </span>
                    )}
                    {pkg.strangerTripSpecial && (
                      <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-[10px] tracking-widest uppercase shadow-sm">
                        Solo Friendly
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 border border-gray-200 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                    <span>{pkg.rating}</span>
                    <span className="text-[10px] text-gray-500">({pkg.reviewsCount})</span>
                  </div>

                  {/* Dark Navy Strip Title at bottom of photo matching mockup */}
                  <div className="absolute bottom-0 inset-x-0 bg-[#0c1833] border-t border-[#1e293b] px-4 py-3 text-center">
                    <h3 className="text-white font-serif font-light text-lg tracking-wider group-hover:text-[#edd085] transition-colors">
                      {pkg.title.split(' - ')[0]}
                    </h3>
                    <p className="text-[11px] text-gray-300 truncate font-sans tracking-wide">
                      {pkg.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location & Duration Strip */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b border-gray-100 font-sans">
                      <span className="flex items-center gap-1.5 truncate text-gray-700 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#cca042] shrink-0" />
                        <span className="truncate">{pkg.location}</span>
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-gray-700 shrink-0 ml-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{pkg.duration}</span>
                      </span>
                    </div>

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pkg.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#faf8f5] text-gray-700 border border-gray-200"
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4 font-sans font-light">
                      {pkg.overview}
                    </p>
                  </div>

                  {/* Price & Action Footer */}
                  <div className="pt-3 border-t border-gray-100">
                    {pkg.id === 'kolkata-durga-puja-2026' ? (
                      <div>
                        {/* Kolkata Durga Puja 3-Tier Rates */}
                        <div className="mb-3 bg-gradient-to-r from-[#fef8ea] to-[#fbf4de] border border-[#ecd292] rounded-lg p-2.5 font-sans">
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-[10px] font-bold text-[#926017] uppercase tracking-wider">
                              {lang === 'hi' ? 'कोलकाता दुर्गा पूजा 2026 • 3 विकल्प' : 'Kolkata Durga Puja 2026 • 3 Tiers'}
                            </span>
                            <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                              {lang === 'hi' ? 'फर्स्ट स्ट्रेंजर ट्रिप' : 'First Stranger Trip'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-1.5 text-center">
                            <div className="bg-white/95 p-1.5 rounded border-2 border-[#cca042] shadow-xs">
                              <span className="text-[9px] text-[#926017] font-bold block leading-tight">
                                {lang === 'hi' ? 'गया/पटना से' : 'Ex-Bihar (Full)'}
                              </span>
                              <span className="text-xs font-bold text-[#926017] font-serif">
                                ₹8,999
                              </span>
                              <span className="text-[8px] text-gray-500 block leading-none">
                                {lang === 'hi' ? '/व्यक्ति (ऑल-इन्क्लूसिव)' : '/person (All-Inclusive)'}
                              </span>
                            </div>

                            <div className="bg-white/95 p-1.5 rounded border border-emerald-300 shadow-xs">
                              <span className="text-[9px] text-emerald-800 font-bold block leading-tight">
                                {lang === 'hi' ? 'कोलकाता में जॉइन' : 'Join in Kolkata'}
                              </span>
                              <span className="text-xs font-bold text-gray-900 font-serif">
                                ₹5,999
                              </span>
                              <span className="text-[8px] text-emerald-700 font-medium block leading-none">
                                {lang === 'hi' ? '/व्यक्ति (लोकल जॉइन)' : '/person (Local Join)'}
                              </span>
                            </div>

                            <div className="bg-white/95 p-1.5 rounded border border-rose-300 shadow-xs">
                              <span className="text-[9px] text-rose-700 font-bold block leading-tight">
                                {lang === 'hi' ? 'कपल रूम' : 'Couple Pax'}
                              </span>
                              <span className="text-xs font-bold text-rose-700 font-serif">
                                ₹19,999
                              </span>
                              <span className="text-[8px] text-gray-500 block leading-none">
                                {lang === 'hi' ? '/कपल (प्राइवेट रूम)' : '/couple (Private Room)'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">
                              {lang === 'hi' ? 'मुख्य पैकेज (गया / पटना से ऑल-इन्क्लूसिव)' : 'Main Package (Ex-Bihar All-Inclusive)'}
                            </span>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold font-serif text-[#926017]">
                                ₹8,999
                              </span>
                              <span className="text-xs text-gray-400 font-sans line-through">
                                ₹11,999
                              </span>
                              <span className="text-xs text-gray-600 font-sans">
                                {lang === 'hi' ? '/ व्यक्ति' : '/ person'}
                              </span>
                            </div>
                            <div className="mt-1 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded inline-flex items-center gap-1 font-medium">
                              <span className="font-bold">
                                {lang === 'hi' ? '📍 कोलकाता जॉइनिंग:' : '📍 Kolkata Joining:'}
                              </span>
                              <span>
                                {lang === 'hi' 
                                  ? '₹5,999 (जो कोलकाता में ही ट्रिप जॉइन करेंगे)' 
                                  : '₹5,999 (For travelers who join the trip in Kolkata)'}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#cca042] bg-[#0b1224] px-2 py-1 rounded shadow-xs font-sans self-start sm:self-auto">
                            3N / 4D Special
                          </span>
                        </div>
                      </div>
                    ) : pkg.id === 'gaya-ji' ? (
                      <div>
                        {/* Pitru Paksha Special Banner & 3-tier rates from flyer */}
                        <div className="mb-3 bg-gradient-to-r from-[#fef8ea] to-[#fbf4de] border border-[#ecd292] rounded-lg p-2.5 font-sans">
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-[10px] font-bold text-[#926017] uppercase tracking-wider">
                              {lang === 'hi' ? 'पितृपक्ष 2026 विशेष पैकेज' : 'Pitru Paksha 2026 Special'}
                            </span>
                            <span className="text-[9px] bg-[#926017] text-white px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                              25 Sep – 10 Oct
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-1.5 text-center">
                            <div className="bg-white/90 p-1 rounded border border-[#ecd292]/60 shadow-xs">
                              <span className="text-[9px] text-gray-500 font-semibold block leading-tight">
                                {lang === 'hi' ? 'ग्रुप (6+)' : 'Group (6+)'}
                              </span>
                              <span className="text-xs font-bold text-[#926017] font-serif">
                                ₹3,999
                              </span>
                              <span className="text-[8px] text-gray-500 block leading-none">/person</span>
                            </div>

                            <div className="bg-white/90 p-1 rounded border border-[#ecd292]/60 shadow-xs">
                              <span className="text-[9px] text-gray-500 font-semibold block leading-tight">
                                {lang === 'hi' ? 'सिंगल' : 'Single'}
                              </span>
                              <span className="text-xs font-bold text-[#926017] font-serif">
                                ₹4,999
                              </span>
                              <span className="text-[8px] text-gray-500 block leading-none">/person</span>
                            </div>

                            <div className="bg-white/90 p-1 rounded border border-[#ecd292]/60 shadow-xs">
                              <span className="text-[9px] text-gray-500 font-semibold block leading-tight">
                                {lang === 'hi' ? 'कपल' : 'Couple'}
                              </span>
                              <span className="text-xs font-bold text-[#926017] font-serif">
                                ₹9,999
                              </span>
                              <span className="text-[8px] text-gray-500 block leading-none">/couple</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-baseline justify-between mb-4">
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">
                              {lang === 'hi' ? 'शुरुआती मूल्य' : 'Starting From'}
                            </span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-2xl font-light font-serif text-[#926017] font-semibold">
                                ₹3,999
                              </span>
                              <span className="text-xs text-gray-500 font-sans">
                                {lang === 'hi' ? '/ व्यक्ति (ग्रुप)' : '/ person (group)'}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 font-sans">
                            2 Days / 1 Night
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-baseline justify-between mb-4 bg-[#faf8f5] p-3 rounded-lg border border-gray-200">
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">
                            {lang === 'hi' ? 'पैकेज मूल्य' : 'Package Pricing'}
                          </span>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="text-xl font-medium font-serif text-[#926017] font-semibold">
                              {lang === 'hi' ? 'पूछताछ पर उपलब्ध' : 'Enquiry'}
                            </span>
                            <span className="text-xs text-gray-500 font-sans">
                              {lang === 'hi' ? '(कस्टम कोट)' : '(Custom Quote)'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#926017] bg-[#fef9ee] px-2.5 py-1 rounded border border-[#ecd292] font-sans">
                          {lang === 'hi' ? 'बेस्ट ऑफर' : 'On Request'}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 font-sans">
                      <button
                        onClick={() => onSelectPackage(pkg)}
                        className="py-2.5 px-3 rounded text-xs font-bold tracking-wider uppercase bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                      </button>

                      <button
                        onClick={() => {
                          if (onBookPackage) {
                            onBookPackage(pkg);
                          } else {
                            window.open(waUrl, '_blank');
                          }
                        }}
                        className="py-2.5 px-3 rounded text-xs font-bold tracking-wider uppercase bg-[#cca042] hover:bg-[#b88c34] text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Now</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* View More / Toggle All button */}
        {filteredPackages.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs uppercase tracking-widest border border-gray-300 transition-all shadow-sm cursor-pointer inline-flex items-center gap-2 font-sans"
            >
              <span>{showAll ? 'Show Less Yatras' : `View All (${filteredPackages.length}) Yatras`}</span>
              <ArrowRight className={`w-4 h-4 text-gray-500 transition-transform ${showAll ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
