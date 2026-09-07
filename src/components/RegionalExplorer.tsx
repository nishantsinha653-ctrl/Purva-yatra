import React, { useState } from 'react';
import { MapPin, Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { REGIONS_DATA } from '../data/yatras';
import { YatraPackage } from '../types';

interface RegionalExplorerProps {
  packages: YatraPackage[];
  onSelectPackage: (pkg: YatraPackage) => void;
  lang: 'en' | 'hi';
}

export const RegionalExplorer: React.FC<RegionalExplorerProps> = ({ packages, onSelectPackage, lang }) => {
  const [selectedRegionId, setSelectedRegionId] = useState('bihar');

  const selectedRegion = REGIONS_DATA.find((r) => r.id === selectedRegionId) || REGIONS_DATA[0];

  // Find related packages
  const regionStateMap: Record<string, string> = {
    'bihar': 'Bihar',
    'west-bengal': 'West Bengal',
    'jharkhand': 'Jharkhand',
    'odisha': 'Odisha',
    'himalayas': 'Uttarakhand'
  };

  const relatedPackages = packages.filter(
    (p) => p.state === regionStateMap[selectedRegionId]
  );

  return (
    <section id="holidays" className="py-16 sm:py-24 bg-[#faf8f5] text-[#1f2937] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-gray-500 text-xs font-sans tracking-[0.3em] uppercase font-semibold">
              Regional Spiritual Circuits
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light tracking-[0.15em] text-[#111827] font-serif uppercase">
            EAST INDIA & HIMALAYAN CIRCUITS
          </h2>
          <div className="w-16 h-[2px] bg-[#cca042] mx-auto mt-3" />
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-sans font-light">
            {lang === 'hi'
              ? 'बिहार, पश्चिम बंगाल, झारखण्ड, ओडिशा एवं हिमालय के पवित्र धामों में हमारी स्थानीय टीम और वाहनों की प्रत्यक्ष उपस्थिति।'
              : 'Our deep local presence and dedicated fleet across the spiritual heartlands of Eastern India and Himalayan heights.'}
          </p>
        </div>

        {/* State Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 font-sans">
          {REGIONS_DATA.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegionId(region.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2 ${
                selectedRegionId === region.id
                  ? 'bg-[#0b1224] text-white shadow-md border border-[#0b1224]'
                  : 'bg-white text-gray-700 hover:text-black hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#cca042]" />
              <span>{region.name}</span>
              {lang === 'hi' && <span className="text-[10px] opacity-80">({region.hindiName})</span>}
            </button>
          ))}
        </div>

        {/* Region Content Display */}
        <div className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-lg p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Image & Key Temples */}
          <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-sm bg-gray-900">
            <img
              src={selectedRegion.bannerImage}
              alt={selectedRegion.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[10px] font-bold text-[#edd085] uppercase tracking-widest block mb-1 font-sans">
                Best Visiting Season: {selectedRegion.bestTime}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-light text-white tracking-wide">
                {selectedRegion.name} Pilgrimage Circuit
              </h3>
            </div>
          </div>

          {/* Details & Key Temples List */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-serif text-[#111827] mb-2 tracking-wide font-medium">
                Sacred Temples & Shrines in {selectedRegion.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-sans font-light">
                {selectedRegion.description}
              </p>

              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-700 mb-3 font-sans">
                Key Temples Covered by Purva Yatra:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 font-sans">
                {selectedRegion.keyTemples.map((temple, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded bg-[#faf8f5] border border-gray-200 text-xs font-medium text-gray-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#cca042] shrink-0" />
                    <span className="truncate">{temple}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Packages from this state */}
            {relatedPackages.length > 0 && (
              <div className="pt-4 border-t border-gray-100 font-sans">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Available Packages in {selectedRegion.name}:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {relatedPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => onSelectPackage(pkg)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-white hover:bg-gray-50 border border-gray-300 text-xs text-gray-800 font-medium transition-all cursor-pointer shadow-sm"
                    >
                      <span>{pkg.title.split(' - ')[0]}</span>
                      <span className="text-[#926017] font-semibold">₹{pkg.startingPrice.toLocaleString('en-IN')}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
