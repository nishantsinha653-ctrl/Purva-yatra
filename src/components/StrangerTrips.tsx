import React, { useState } from 'react';
import { 
  Users, ShieldCheck, Flame, Calendar, MapPin, 
  Sparkles, CheckCircle2, ChevronRight, X, 
  HeartHandshake, Compass, HelpCircle, MessageCircle
} from 'lucide-react';
import { STRANGER_TRIPS_DATA } from '../data/strangerTrips';
import { StrangerTripBatch } from '../types';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface StrangerTripsProps {
  lang: 'en' | 'hi';
  onBookStrangerTrip?: (tripTitle: string, defaultTier?: string) => void;
}

export const StrangerTrips: React.FC<StrangerTripsProps> = ({ lang, onBookStrangerTrip }) => {
  const [activeModalTrip, setActiveModalTrip] = useState<StrangerTripBatch | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const trip = STRANGER_TRIPS_DATA[0];

  const handleWhatsAppBooking = (trip: StrangerTripBatch) => {
    const message = `Namaste Purva Yatra! 🙏\nI want to make an enquiry for the Stranger Trip batch:\n*${trip.title}*\nDates: ${trip.dates}\nPlease let me know slot availability, package pricing, and how to register.`;
    window.open(createWhatsAppUrl(message), '_blank');
  };

  const faqs = [
    {
      qEn: 'Can I join this trip completely alone?',
      qHi: 'क्या मैं इस ट्रिप पर बिल्कुल अकेले आ सकता/सकती हूँ?',
      aEn: 'Yes, absolutely! Over 80% of travelers on our Stranger Trips join solo. You will be welcomed into a warm, inclusive group of 12-16 like-minded seekers, and by Day 2, strangers feel like close friends.',
      aHi: 'हाँ, बिल्कुल! हमारे स्ट्रेंजर ट्रिप्स में 80% से ज्यादा लोग अकेले (Solo) ही जुड़ते हैं। 12-16 समान विचारधारा वाले साथियों के साथ आप तुरंत सहज महसूस करेंगे और सफर खत्म होते-होते सब परिवार जैसे बन जाते हैं।'
    },
    {
      qEn: 'Is it completely safe for solo female travelers?',
      qHi: 'क्या यह महिला सोलो यात्रियों (Solo Female) के लिए पूरी तरह सुरक्षित है?',
      aEn: 'Safety is our highest priority. All travelers undergo mandatory ID/KYC verification. Rooms are strictly shared with same-gender co-travelers, and each trip is supervised by a certified Trip Captain with female co-ordinators.',
      aHi: 'सुरक्षा हमारी पहली प्राथमिकता है। सभी यात्रियों का अनिवार्य आईडी/केवाईसी सत्यापन होता है। कमरे केवल समान-लिंग (फीमेल-टू-फीमेल) साथियों के साथ शेयर होते हैं और साथ में अनुभवी ट्रिप कैप्टन रहते हैं।'
    },
    {
      qEn: 'How are hotel rooms and roommates assigned?',
      qHi: 'होटल रूम और रूममेट्स कैसे तय होते हैं?',
      aEn: 'Stays are twin or triple sharing basis with same-gender solo travelers of similar age groups. If you prefer a private single room, that can also be arranged for a modest single supplement fee upon request.',
      aHi: 'कमरे समान लिंग और लगभग समान आयु वर्ग के सोलो यात्रियों के साथ ट्विन या ट्रिपल शेयरिंग में दिए जाते हैं। यदि आपको अलग प्राइवेट रूम चाहिए, तो वह भी मामूली अतिरिक्त शुल्क पर उपलब्ध कराया जा सकता है।'
    },
    {
      qEn: 'What is the usual age group on these trips?',
      qHi: 'इन स्ट्रेंजर ट्रिप्स में आमतौर पर किस उम्र के लोग आते हैं?',
      aEn: 'Most participants are young professionals, university students, and enthusiastic seekers aged between 19 to 42 years who love culture, mountains, spirituality, and good community conversations.',
      aHi: 'अधिकांश प्रतिभागी 19 से 42 वर्ष की आयु के युवा, प्रोफेशनल्स और उत्साही यात्री होते हैं जो आध्यात्म, प्रकृति, संस्कृति और नई दोस्ती में विश्वास रखते हैं।'
    }
  ];

  return (
    <section id="stranger-trips" className="py-20 bg-gradient-to-b from-[#0b1224] via-[#0f172a] to-[#080d1a] text-white relative overflow-hidden border-y border-[#cca042]/20">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#cca042]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#cca042]/15 border border-[#cca042]/30 text-[#e6bf65] text-xs font-semibold uppercase tracking-widest mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#cca042]" />
            <span>{lang === 'hi' ? 'स्ट्रेंजर ट्रिप्स • सोलो ट्रेवलर्स कम्युनिटी' : 'STRANGER TRIPS • SOLO TRAVEL SANGHA'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight mb-4">
            {lang === 'hi' ? (
              <>
                अजनबियों के संग पावन यात्रा — <span className="text-[#cca042] italic">सफ़र जो परिवार बना दे</span>
              </>
            ) : (
              <>
                Travel With Strangers, <span className="text-[#cca042] italic">Return As Family</span>
              </>
            )}
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {lang === 'hi'
              ? 'दोस्तों के प्लान कैंसिल होने का इंतजार क्यों? अकेले निकलिए और हमारे साथ 12-16 चुनिंदा सोलो यात्रियों के सुरक्षित ग्रुप में शामिल हो जाइए। घाटों पर आरती, कैंपफ़ायर और जीवन भर की नई दोस्ती!'
              : 'Don’t wait for friends who cancel plans! Step out solo and join verified, small-group departures (12-16 people) with certified trip captains, shared bonfires, and unforgettable spiritual memories.'}
          </p>
        </div>

        {/* Single Unified Stranger Trip Promise */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-white/[0.07] border border-[#cca042]/30 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#cca042]/20 border border-[#cca042]/40 text-[#cca042] flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-7 h-7 text-[#cca042]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                  {lang === 'hi' ? '100% सुरक्षित, सत्यापित व महिला-अनुकूल सोलो यात्रा' : '100% Safe, Verified & Female-Friendly Solo Travel'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#cca042]/20 text-[#cca042] text-[11px] font-semibold border border-[#cca042]/40">
                  {lang === 'hi' ? 'शून्य सोलो सरचार्ज' : 'Zero Solo Surcharge'}
                </span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {lang === 'hi'
                  ? 'अनिवार्य सरकारी आईडी सत्यापन, समर्पित महिला कोऑर्डिनेटर्स, सुरक्षित ट्विन-शेयरिंग और प्रमाणित ट्रिप कैप्टन की देखरेख में अजनबियों के संग परिवार जैसा आत्मीय सफर।'
                  : 'Mandatory government ID verification, dedicated female coordinators, safe same-gender twin sharing, and certified trip captains ensuring an unforgettable community experience.'}
              </p>
            </div>
          </div>
        </div>

        {/* Single Featured Community Batch Showcase */}
        <div className="max-w-4xl mx-auto mb-16">
          {(() => {
            const seatsLeft = trip.totalSeats - trip.seatsBooked;
            const percentageBooked = Math.round((trip.seatsBooked / trip.totalSeats) * 100);

            return (
              <div
                key={trip.id}
                className="bg-[#111a30] rounded-2xl overflow-hidden border border-[#cca042]/40 shadow-2xl flex flex-col md:flex-row group transition-all duration-300 hover:border-[#cca042]/70"
              >
                {/* Image Banner */}
                <div className="relative md:w-5/12 min-h-[260px] md:min-h-full overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111a30] via-transparent to-black/40 md:bg-gradient-to-r md:from-transparent md:to-[#111a30]" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#cca042] text-xs font-bold uppercase tracking-wider border border-[#cca042]/50">
                      {trip.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold tracking-wide shadow-sm flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Solo Friendly
                    </span>
                  </div>

                  {/* Slots Left Alert */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-red-500/90 text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 animate-pulse">
                      <Flame className="w-3.5 h-3.5" />
                      {seatsLeft} {lang === 'hi' ? 'सीटें बाकी' : 'slots left'}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-between">
                  <div>
                    {/* Location & Dates */}
                    <div className="flex flex-wrap items-center justify-between text-xs text-gray-300 gap-2 mb-2.5 font-sans">
                      <span className="inline-flex items-center gap-1 text-[#cca042] font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        {trip.destination}
                      </span>
                      <span className="inline-flex items-center gap-1 text-gray-300">
                        <Calendar className="w-3.5 h-3.5" />
                        {trip.dates}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif text-white font-normal mb-2 group-hover:text-[#cca042] transition-colors">
                      {lang === 'hi' && trip.hindiTitle ? trip.hindiTitle : trip.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed">
                      {trip.subtitle}
                    </p>

                    {/* Progress Bar for seats */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-300 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#cca042]" />
                          {lang === 'hi' ? 'बैच बुकिंग स्थिति' : 'Batch Registration'}
                        </span>
                        <span className="font-semibold text-[#cca042]">
                          {trip.seatsBooked}/{trip.totalSeats} {lang === 'hi' ? 'बुक' : 'Booked'} ({percentageBooked}%)
                        </span>
                      </div>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-[#cca042] h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentageBooked}%` }}
                        />
                      </div>
                    </div>

                    {/* Trip Captain & Age Group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300 mb-4 bg-white/5 rounded-lg p-2.5">
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase tracking-wider">{lang === 'hi' ? 'ट्रिप कैप्टन' : 'Trip Captain'}</span>
                        <span className="font-medium text-white">{trip.tripCaptain}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase tracking-wider">{lang === 'hi' ? 'उम्र वर्ग' : 'Age Group'}</span>
                        <span className="font-medium text-white">{trip.ageGroup}</span>
                      </div>
                    </div>

                    {/* Highlights bullets */}
                    <div className="space-y-1.5 mb-5">
                      {trip.highlights.slice(0, 3).map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#cca042] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA Buttons */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    {trip.pricingTiers && trip.pricingTiers.length > 0 ? (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#cca042] font-semibold">
                            {lang === 'hi' ? '3 पैकेज विकल्प उपलब्ध' : '3 Package Options Available'}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {lang === 'hi' ? '3 रातें / 4 दिन' : '4 Days / 3 Nights'}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center font-sans">
                          <div className="bg-[#cca042]/10 p-1.5 rounded border border-[#cca042]/50">
                            <span className="text-[9px] text-[#cca042] block font-bold">
                              {lang === 'hi' ? 'गया/पटना से' : 'Ex-Bihar (Full)'}
                            </span>
                            <span className="text-sm font-bold text-[#cca042] font-serif">₹8,999</span>
                            <span className="text-[8px] text-gray-300 block">
                              {lang === 'hi' ? '/व्यक्ति (ऑल-इन्क्लूसिव)' : '/person (All-Inclusive)'}
                            </span>
                          </div>
                          <div className="bg-white/5 p-1.5 rounded border border-emerald-500/40">
                            <span className="text-[9px] text-emerald-400 block font-bold">
                              {lang === 'hi' ? 'कोलकाता में जॉइन' : 'Join in Kolkata'}
                            </span>
                            <span className="text-sm font-bold text-white font-serif">₹5,999</span>
                            <span className="text-[8px] text-emerald-300 block">
                              {lang === 'hi' ? '/व्यक्ति (लोकल जॉइन)' : '/person (Local Join)'}
                            </span>
                          </div>
                          <div className="bg-white/5 p-1.5 rounded border border-rose-500/30">
                            <span className="text-[9px] text-rose-400 block font-bold">
                              {lang === 'hi' ? 'कपल पैकेज' : 'Couple Pax'}
                            </span>
                            <span className="text-sm font-bold text-white font-serif">₹19,999</span>
                            <span className="text-[8px] text-gray-300 block">
                              {lang === 'hi' ? '/कपल (प्राइवेट रूम)' : '/couple (Private Room)'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-gray-400">
                          {lang === 'hi' ? 'पैकेज मूल्य' : 'Package Pricing'}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-[#cca042] font-serif">
                            {lang === 'hi' ? 'पूछताछ पर उपलब्ध' : 'Enquiry'}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-bold text-[#cca042] font-serif">₹8,999/-</span>
                          <span className="text-xs text-gray-400 line-through">₹11,999</span>
                          <span className="text-[10px] text-gray-300">
                            {lang === 'hi' ? '/ व्यक्ति (गया/पटना से)' : '/ person (Ex-Bihar)'}
                          </span>
                        </div>
                        <div className="text-[11px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                          <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded font-bold">
                            {lang === 'hi' ? 'कोलकाता जॉइनिंग' : 'Kolkata Joining'}
                          </span>
                          <span>
                            {lang === 'hi' 
                              ? <>सिर्फ <strong>₹5,999/-</strong> (जो कोलकाता में ही जुड़ेंगे)</>
                              : <>Only <strong>₹5,999/-</strong> (For travelers who join in Kolkata)</>}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={() => setActiveModalTrip(trip)}
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {lang === 'hi' ? 'विवरण' : 'Details'}
                        </button>

                        <button
                          onClick={() => {
                            if (onBookStrangerTrip) {
                              onBookStrangerTrip(trip.title, 'origin');
                            } else {
                              handleWhatsAppBooking(trip);
                            }
                          }}
                          className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                        >
                          {lang === 'hi' ? 'बुक करें' : 'Book Online'}
                        </button>

                        <button
                          onClick={() => handleWhatsAppBooking(trip)}
                          className="px-3.5 py-2 rounded-lg bg-[#cca042] hover:bg-[#b88c34] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-black" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Community Banner with CTA */}
        <div className="bg-gradient-to-r from-amber-500/15 via-[#cca042]/20 to-amber-500/15 border border-[#cca042]/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-serif text-white font-normal mb-2 flex items-center gap-2">
              <Users className="w-6 h-6 text-[#cca042]" />
              <span>{lang === 'hi' ? 'अपना खुद का स्ट्रेंजर ग्रुप बनाना चाहते हैं?' : 'Want to Request a Custom Stranger Batch?'}</span>
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm">
              {lang === 'hi'
                ? 'यदि आप 2-4 दोस्त हैं या किसी खास तिथि पर सोलो ग्रुप ट्रिप चाहते हैं, तो हमें बताएं। हम समान विचारधारा वाले यात्रियों का बैच तैयार करेंगे।'
                : 'Have flexible dates or want a specific destination like Spiti, Jagannath Puri, or Meghalaya with solo peers? Let us know, and we will curate a dedicated batch.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => {
                const message = "Namaste Purva Yatra! 🙏\nI want to inquire about upcoming Stranger Trips / Custom Solo Group Departures. Please connect me with the community captain.";
                window.open(createWhatsAppUrl(message), '_blank');
              }}
              className="px-6 py-3 bg-[#cca042] hover:bg-[#b88c34] text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>{lang === 'hi' ? 'व्हाट्सएप पर बात करें' : 'Chat With Trip Lead'}</span>
            </button>
          </div>
        </div>

        {/* FAQs for Stranger Trips */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#cca042] uppercase tracking-widest font-semibold mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>{lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'FREQUENTLY ASKED QUESTIONS'}</span>
            </div>
            <h3 className="text-2xl font-serif text-white font-normal">
              {lang === 'hi' ? 'पहली बार स्ट्रेंजर ट्रिप पर आ रहे हैं?' : 'First Time on a Stranger Trip?'}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="font-medium text-white text-sm sm:text-base">
                      {lang === 'hi' ? faq.qHi : faq.qEn}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 text-[#cca042] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 bg-white/[0.02]">
                      {lang === 'hi' ? faq.aHi : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Full Itinerary & Details Modal */}
      {activeModalTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0f172a] border border-[#cca042]/40 rounded-2xl max-w-2xl w-full my-8 text-white shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-[#111a30]">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#cca042]/20 text-[#cca042] text-[11px] font-bold uppercase tracking-wider mb-2">
                  <Users className="w-3 h-3" />
                  Stranger Trip Departure
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white">
                  {lang === 'hi' && activeModalTrip.hindiTitle ? activeModalTrip.hindiTitle : activeModalTrip.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#cca042]" />
                  {activeModalTrip.destination} • {activeModalTrip.dates}
                </p>
              </div>

              <button
                onClick={() => setActiveModalTrip(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-300">
              
              {/* Trip Captain & Vibe */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 block">
                    {lang === 'hi' ? 'ट्रिप कैप्टन / गाइड' : 'Certified Trip Captain'}
                  </span>
                  <span className="font-semibold text-white text-sm">{activeModalTrip.tripCaptain}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 block">
                    {lang === 'hi' ? 'वाइब व माहौल' : 'Trip Vibe'}
                  </span>
                  <span className="font-semibold text-[#cca042] text-sm">{activeModalTrip.vibe}</span>
                </div>
              </div>

              {/* Day-by-day Itinerary */}
              <div>
                <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#cca042]" />
                  <span>{lang === 'hi' ? 'दिन-प्रतिदिन का कार्यक्रम' : 'Day-wise Itinerary'}</span>
                </h4>
                <div className="space-y-3">
                  {activeModalTrip.itinerary.map((item) => (
                    <div key={item.day} className="bg-white/5 rounded-lg p-3.5 border border-white/5">
                      <div className="font-semibold text-white text-xs sm:text-sm text-[#cca042] mb-1">
                        Day {item.day}: {item.title}
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#cca042]" />
                  <span>{lang === 'hi' ? 'पैकेज में क्या शामिल है?' : 'What’s Included?'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalTrip.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-300 bg-white/5 p-2 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Tiers (if available) */}
              {activeModalTrip.pricingTiers && activeModalTrip.pricingTiers.length > 0 && (
                <div>
                  <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#cca042]" />
                    <span>{lang === 'hi' ? 'पैकेज विकल्प व मूल्य' : 'Package Options & Pricing'}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeModalTrip.pricingTiers.map((tier, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
                        <div>
                          {tier.badge && (
                            <span className="text-[9px] px-2 py-0.5 rounded bg-[#cca042]/20 text-[#cca042] font-semibold uppercase tracking-wider inline-block mb-1">
                              {tier.badge}
                            </span>
                          )}
                          <div className="font-bold text-white text-xs">{tier.name}</div>
                          <div className="my-1">
                            <span className="text-xl font-bold text-[#cca042] font-serif">₹{tier.price.toLocaleString('en-IN')}</span>
                            <span className="text-[10px] text-gray-400 block">{tier.unit}</span>
                          </div>
                          <p className="text-[11px] text-gray-300 leading-tight">{tier.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const tripTitle = activeModalTrip.title;
                            setActiveModalTrip(null);
                            if (onBookStrangerTrip) {
                              onBookStrangerTrip(tripTitle, tier.type);
                            }
                          }}
                          className="mt-2.5 w-full py-1.5 bg-[#cca042] hover:bg-[#b88c34] text-black font-bold text-[11px] rounded transition-colors cursor-pointer"
                        >
                          Book this Tier
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meal Clarity */}
              {activeModalTrip.mealClarity && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2">
                  <span className="font-bold text-amber-300">🍱 Meal Clarity:</span>
                  <span>{activeModalTrip.mealClarity}</span>
                </div>
              )}

              {/* Solo female safety note */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-200 leading-relaxed">
                  <strong className="block text-white mb-0.5">
                    {lang === 'hi' ? 'सोलो महिला सुरक्षा गारंटी' : 'Solo Female Friendly & Safe'}
                  </strong>
                  {lang === 'hi'
                    ? 'प्रत्येक ग्रुप में कम से कम 35-45% सोलो महिला यात्री होती हैं। कमरे केवल महिला साथियों के साथ शेयर होते हैं और 24/7 सहायता उपलब्ध रहती है।'
                    : 'Over 35-45% of our community travelers are solo women. Strict same-gender room allocation and female-friendly safety protocols are strictly followed.'}
                </div>
              </div>

              {/* Terms & Conditions */}
              {activeModalTrip.terms && activeModalTrip.terms.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#cca042] block mb-2">
                    Terms & Conditions ({activeModalTrip.terms.length} Guidelines)
                  </span>
                  <div className="space-y-1.5 text-xs text-gray-300 max-h-48 overflow-y-auto">
                    {activeModalTrip.terms.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#cca042] font-bold">{idx + 1}.</span>
                        <p>{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-white/10 bg-[#111a30] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-400 block">{lang === 'hi' ? 'पैकेज मूल्य' : 'Package Pricing'}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#cca042] font-serif">
                    {lang === 'hi' ? 'पूछताछ पर उपलब्ध' : 'Enquiry'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {lang === 'hi' ? '(कस्टम कोटेशन)' : '(Custom Quote on Request)'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const tripTitle = activeModalTrip.title;
                    setActiveModalTrip(null);
                    if (onBookStrangerTrip) {
                      onBookStrangerTrip(tripTitle);
                    } else {
                      const contactEl = document.getElementById('contact');
                      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {lang === 'hi' ? 'ऑनलाइन इन्क्वायरी' : 'Send Inquiry'}
                </button>

                <button
                  onClick={() => handleWhatsAppBooking(activeModalTrip)}
                  className="px-5 py-2.5 rounded-lg bg-[#cca042] hover:bg-[#b88c34] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>{lang === 'hi' ? 'व्हाट्सएप पर स्लॉट बुक करें' : 'Book Seat on WhatsApp'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
