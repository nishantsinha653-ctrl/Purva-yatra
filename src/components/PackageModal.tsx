import React, { useEffect, useState } from 'react';
import { X, Clock, MapPin, CheckCircle2, XCircle, Star, MessageCircle, Phone, Calendar, ShieldCheck, Sparkles, FileText, ChevronDown, ChevronUp, Train } from 'lucide-react';
import { YatraPackage } from '../types';
import { getYatraWhatsAppUrl, DISPLAY_PHONE } from '../utils/whatsapp';

interface PackageModalProps {
  pkg: YatraPackage | null;
  onClose: () => void;
  onBook: (packageName: string) => void;
  onStartBooking?: (pkg: YatraPackage, defaultTier?: string) => void;
  lang: 'en' | 'hi';
}

export const PackageModal: React.FC<PackageModalProps> = ({ pkg, onClose, onBook, onStartBooking, lang }) => {
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (pkg) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pkg, onClose]);

  if (!pkg) return null;

  const waUrl = pkg.id === 'gaya-ji' 
    ? getYatraWhatsAppUrl(pkg.title, pkg.duration, pkg.startingPrice)
    : getYatraWhatsAppUrl(pkg.title, pkg.duration);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      
      {/* Modal Container */}
      <div 
        className="bg-white text-gray-900 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-200 relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner Header */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-black shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-[#cca042] text-black font-bold text-[10px] uppercase tracking-wider rounded-sm shadow">
              {pkg.category}
            </span>
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white font-semibold text-[10px] uppercase tracking-wider border border-white/20 rounded-sm">
              {pkg.state}
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex items-center gap-3 text-xs text-[#cca042] mb-1 font-sans">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{pkg.location}</span>
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{pkg.duration}</span>
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#cca042] text-[#cca042]" />
                <span className="text-white font-medium">{pkg.rating} ({pkg.reviewsCount} reviews)</span>
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-serif text-white tracking-wide font-medium">
              {pkg.title}
            </h2>
            <p className="text-xs text-gray-300 truncate font-sans font-light">
              {pkg.subtitle}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-gray-700 font-sans">
          
          {/* Price & Pickup Bar */}
          {pkg.id === 'kolkata-durga-puja-2026' ? (
            <div className="bg-[#faf8f5] border border-[#ecd292] rounded-xl p-4 sm:p-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-gray-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded uppercase tracking-wider">
                      First Stranger Trip in Bihar
                    </span>
                    <span className="text-xs font-bold text-[#926017] uppercase tracking-wider">
                      Kolkata Durga Puja 2026 Special
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-600 block mt-0.5">
                    Gaya Ji / Patna ⇄ Kolkata (Or Direct Join in Kolkata)
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-white bg-[#0b1224] px-2.5 py-1 rounded shadow-xs">
                  4 Days / 3 Nights
                </span>
              </div>

              {/* 3 Packages Grid from PDF */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 text-center">
                {/* Ex-Bihar Destination Start (Main All-Inclusive Package) */}
                <div className="bg-white p-3.5 rounded-xl border-2 border-[#cca042] shadow-sm relative flex flex-col justify-between">
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0b1224] text-[#ecc367] font-bold text-[9px] uppercase tracking-wider rounded shadow-xs whitespace-nowrap">
                    {lang === 'hi' ? 'मुख्य ऑल-इन्क्लूसिव पैकेज' : 'Main All-Inclusive Package'}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-[#926017] uppercase mt-1">
                      {lang === 'hi' ? 'गया / पटना से (पूरी यात्रा)' : 'Ex-Bihar (Gaya / Patna)'}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {lang === 'hi' ? 'Ex-Bihar Roundtrip' : 'Full Roundtrip Travel'}
                    </div>
                    <div className="my-1.5">
                      <span className="text-2xl font-serif font-bold text-[#926017]">
                        ₹8,999
                      </span>
                      <span className="text-[10px] text-gray-500 block font-semibold uppercase">
                        {lang === 'hi' ? 'प्रति व्यक्ति' : 'Per Person'}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-600 leading-tight">
                      {lang === 'hi' 
                        ? 'गया/पटना से राउंडट्रिप एसी ट्रेवलर/ट्रेन + 3 रातें होटल स्टे + भोजन + लोकल पंडाल दर्शन + क्लब डिनर।'
                        : 'Round-trip AC Traveller / train from Gaya/Patna + 3N hotel stay + all meals + local pandals + club dinner.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onStartBooking) onStartBooking(pkg, 'origin');
                      else onBook(pkg.title);
                    }}
                    className="mt-3 w-full py-1.5 bg-gradient-to-r from-[#cca042] to-[#b3852b] hover:brightness-105 text-black text-[11px] font-bold rounded cursor-pointer transition-all shadow-xs"
                  >
                    Select Ex-Bihar (₹8,999)
                  </button>
                </div>

                {/* Direct Kolkata (For those who join in Kolkata only) */}
                <div className="bg-white p-3.5 rounded-xl border border-emerald-300 shadow-xs flex flex-col justify-between relative">
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-700 text-white font-bold text-[8px] uppercase tracking-wider rounded shadow-xs whitespace-nowrap">
                    {lang === 'hi' ? 'सिर्फ कोलकाता में जॉइन करने पर' : 'Direct Kolkata Join'}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-gray-900 uppercase mt-1">Direct Kolkata Joining</div>
                    <div className="text-[10px] text-emerald-700 font-medium">
                      {lang === 'hi' ? '(जो कोलकाता में ही जुड़ेंगे)' : '(Join directly in Kolkata)'}
                    </div>
                    <div className="my-1.5">
                      <span className="text-2xl font-serif font-bold text-gray-900">
                        ₹5,999
                      </span>
                      <span className="text-[10px] text-gray-500 block font-semibold uppercase">
                        {lang === 'hi' ? 'प्रति व्यक्ति' : 'Per Person'}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-600 leading-tight">
                      {lang === 'hi'
                        ? 'यह दर सिर्फ उन यात्रियों के लिए है जो सीधे कोलकाता आकर जॉइन करेंगे। 3N होटल स्टे, भोजन, लोकल पंडाल व क्लब डिनर शामिल।'
                        : 'For travelers joining directly in Kolkata. Includes 3N hotel stay, meals, local pandal cabs & Newtown club dinner.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onStartBooking) onStartBooking(pkg, 'direct');
                      else onBook(pkg.title);
                    }}
                    className="mt-3 w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded cursor-pointer transition-colors shadow-xs"
                  >
                    Select Direct Kolkata (₹5,999)
                  </button>
                </div>

                {/* Couple Package */}
                <div className="bg-white p-3.5 rounded-xl border border-rose-300 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold bg-rose-100 text-rose-800 uppercase tracking-wider px-2 py-0.5 rounded inline-block">
                      {lang === 'hi' ? 'प्राइवेट एसी रूम' : 'Private AC Room'}
                    </span>
                    <div className="text-xs font-bold text-gray-900 uppercase mt-1">
                      {lang === 'hi' ? 'कपल स्पेशल पैकेज' : 'Couple Special Package'}
                    </div>
                    <div className="my-1.5">
                      <span className="text-2xl font-serif font-bold text-rose-700">
                        ₹19,999
                      </span>
                      <span className="text-[10px] text-gray-500 block font-semibold uppercase">
                        {lang === 'hi' ? 'प्रति कपल (2 व्यक्ति)' : 'Per Couple (2 Pax)'}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-600 leading-tight">
                      {lang === 'hi'
                        ? '2 यात्रियों के लिए गारंटीड प्राइवेट रूम, यात्रा, रोमांटिक पंडाल भ्रमण, सभी भोजन व स्पेशल क्लब डिनर।'
                        : 'Guaranteed private AC room for 2, round-trip travel, romantic pandal hopping, all meals & club dinner.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onStartBooking) onStartBooking(pkg, 'couple');
                      else onBook(pkg.title);
                    }}
                    className="mt-3 w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded cursor-pointer transition-colors shadow-xs"
                  >
                    Select Couple (₹19,999)
                  </button>
                </div>
              </div>

              {/* Pricing Clarity Notice */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-xs text-emerald-900 flex items-start gap-2 mb-2">
                <span className="font-bold shrink-0">
                  {lang === 'hi' ? 'ℹ️ दर स्पष्टीकरण:' : 'ℹ️ Price Clarification:'}
                </span>
                <span>
                  {lang === 'hi'
                    ? <>मुख्य ऑल-इन्क्लूसिव पैकेज <strong>₹8,999/-</strong> (गया जी / पटना से राउंडट्रिप) है। <strong>₹5,999/-</strong> की दर केवल उन लोगों के लिए है जो सीधे कोलकाता में ही ट्रिप जॉइन करना चाहते हैं।</>
                    : <>The main all-inclusive package is <strong>₹8,999/-</strong> (round-trip from Gaya Ji / Patna). The <strong>₹5,999/-</strong> rate is exclusively for travelers joining directly in Kolkata.</>}
                </span>
              </div>

              {/* Meal Clarity Banner */}
              <div className="bg-amber-50/90 border border-amber-200/80 rounded-lg p-2.5 text-xs text-amber-950 flex items-start gap-2">
                <span className="font-bold shrink-0">🍱 Meal Clarity:</span>
                <span>
                  {lang === 'hi'
                    ? 'लंच और डिनर 3 दिन • ब्रेकफास्ट डे 2, डे 3 और डे 4 (डे 1 का ब्रेकफास्ट शामिल नहीं है)।'
                    : 'Lunch & Dinner on 3 days • Breakfast on Day 2, Day 3 & Day 4 (Day 1 breakfast is excluded).'}
                </span>
              </div>
            </div>
          ) : pkg.id === 'gaya-ji' ? (
            <div className="bg-[#faf8f5] border border-[#ecd292] rounded-xl p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-gray-200">
                <div>
                  <span className="text-xs font-bold text-[#926017] uppercase tracking-wider block">
                    Gaya Ji Pitru Paksha 2026 Special (25 September – 10 October 2026)
                  </span>
                  <span className="text-[11px] text-gray-600">
                    16 Days of Sacred Pilgrimage • Vishnupad Temple & Sita Kund
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  2 Days / 1 Night
                </span>
              </div>

              {/* 3 Packages Grid from flyer */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 text-center">
                <div className="bg-white p-3 rounded-lg border-2 border-[#cca042] shadow-xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Group Package
                  </span>
                  <div className="my-1">
                    <span className="text-2xl font-serif font-bold text-[#926017]">
                      ₹3,999
                    </span>
                    <span className="text-[10px] text-gray-500 block font-semibold uppercase">
                      Per Person
                    </span>
                  </div>
                  <span className="text-[9px] text-[#926017] bg-[#fef8ea] py-0.5 px-1.5 rounded font-medium">
                    Min 6 Persons (2D/1N)
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Single Package
                  </span>
                  <div className="my-1">
                    <span className="text-2xl font-serif font-bold text-[#926017]">
                      ₹4,999
                    </span>
                    <span className="text-[10px] text-gray-500 block font-semibold uppercase">
                      Per Person
                    </span>
                  </div>
                  <span className="text-[9px] text-gray-500 bg-gray-100 py-0.5 px-1.5 rounded font-medium">
                    Solo Pilgrim (2D/1N)
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Couple Package
                  </span>
                  <div className="my-1">
                    <span className="text-2xl font-serif font-bold text-[#926017]">
                      ₹9,999
                    </span>
                    <span className="text-[10px] text-gray-500 block font-semibold uppercase">
                      Per Couple
                    </span>
                  </div>
                  <span className="text-[9px] text-gray-500 bg-gray-100 py-0.5 px-1.5 rounded font-medium">
                    2 Persons (2D/1N)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200 text-xs">
                <span className="text-gray-600 text-[11px]">
                  Includes: Comfortable Stay, Pick-up & Drop, Pind Daan Assistance, Temple Darshan, Local Sightseeing, Travel Assistance & 24x7 Support.
                </span>
                <span className="font-semibold text-gray-900 text-[11px]">
                  Pickup & Drop: {pkg.pickupLocation}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-[#faf8f5] border border-gray-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block">
                  Package Pricing
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-serif font-bold text-[#926017]">
                    Enquiry
                  </span>
                  <span className="text-xs text-gray-500">(पूछताछ पर उपलब्ध - Best Rates on Request)</span>
                </div>
                <span className="text-xs text-gray-500 mt-0.5 block">
                  Customized package quote based on your specific dates, group size, and vehicle choice.
                </span>
              </div>

              <div className="text-left sm:text-right text-xs">
                <span className="text-gray-500 block text-[10px] uppercase tracking-widest">Pickup & Drop Station:</span>
                <span className="font-semibold text-gray-900">{pkg.pickupLocation}</span>
              </div>
            </div>
          )}

          {/* Sacred Significance */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#926017] flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#cca042]" />
              <span>Sacred Significance & Teerth Mahatmya</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-800 italic bg-[#fef9ee] p-3.5 rounded border border-[#f5e6c8] leading-relaxed font-light">
              "{pkg.sacredSignificance}"
            </p>
          </div>

          {/* Day-by-Day Itinerary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#cca042]" />
              <span>Day-Wise Detailed Itinerary</span>
            </h3>

            <div className="space-y-4">
              {pkg.itinerary.map((item) => (
                <div
                  key={item.day}
                  className="relative pl-6 pb-2 border-l border-[#cca042]/40 last:border-transparent"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#cca042] border-2 border-white shadow-sm flex items-center justify-center text-[9px] font-bold text-black">
                    {item.day}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900">
                      Day {item.day}: {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1 font-light">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2 text-[11px] text-gray-600 font-medium">
                      <span className="bg-[#faf8f5] border border-gray-200 px-2 py-0.5 rounded">
                        🏨 Night Stay: {item.stayLocation}
                      </span>
                      {item.meals && (
                        <span className="bg-[#faf8f5] border border-gray-200 px-2 py-0.5 rounded text-[#926017]">
                          🍲 Meals: {item.meals}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions and Exclusions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Package Inclusions</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2.5 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>Package Exclusions</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-500">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">✗</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Terms & Conditions (From Official PDF) */}
          {pkg.termsAndConditions && pkg.termsAndConditions.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowTerms(!showTerms)}
                className="w-full flex items-center justify-between p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#926017]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                    Important Terms & Conditions ({pkg.termsAndConditions.length} Points)
                  </span>
                </div>
                {showTerms ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {showTerms && (
                <div className="mt-3 p-4 bg-white rounded-xl border border-gray-200 space-y-2 text-xs text-gray-600 max-h-64 overflow-y-auto">
                  {pkg.termsAndConditions.map((term, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-[#926017] shrink-0 text-[11px]">{idx + 1}.</span>
                      <p className="leading-relaxed">{term}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Sticky Footer CTAs */}
        <div className="p-4 sm:p-5 bg-[#faf8f5] border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0 font-sans">
          <div className="text-xs text-gray-500 hidden sm:block">
            Need custom modification or larger group discount?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                if (onStartBooking) {
                  onStartBooking(pkg);
                } else {
                  onBook(pkg.title);
                }
              }}
              className="flex-1 sm:flex-initial py-2.5 px-5 bg-gradient-to-r from-[#cca042] via-[#e2ba5e] to-[#cca042] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-black" />
              <span>Book Online Now</span>
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial py-2.5 px-4 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer text-center shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
