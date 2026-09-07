import React, { useState } from 'react';
import { ChevronRight, MessageCircle, MapPin, Calendar, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';
import heroScenicImage from '../assets/images/mountain_train_hero_1788804854848.jpg';

interface HeroProps {
  onSearch: (destination: string, category: string) => void;
  lang: 'en' | 'hi';
}

export const Hero: React.FC<HeroProps> = ({ onSearch, lang }) => {
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleWhatsAppUs = () => {
    const msg = "Namaste Purva Yatra! 🙏\nI want to plan a pilgrimage tour for my family. Please share details and packages.";
    window.open(createWhatsAppUrl(msg), '_blank');
  };

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDestination === 'gaya-ji' || selectedCategory === 'Pind Daan Special') {
      const pitruSection = document.getElementById('pitru-paksha');
      if (pitruSection) {
        pitruSection.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onSearch(selectedDestination, selectedCategory);
    const yatraSection = document.getElementById('yatras');
    if (yatraSection) {
      yatraSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-[#faf7f2] text-[#1f2937] overflow-hidden border-b border-gray-200">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow matching Mockup */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[#cca042] text-xs sm:text-sm tracking-[0.25em] uppercase font-sans font-semibold">
              {lang === 'hi' ? 'पूर्वी भारत का विश्वसनीय यात्रा एवं तीर्थ साझीदार' : "East India's Trusted Travel & Pilgrimage Partner"}
            </span>
          </div>

          {/* Main Title: Travel with Faith, Return with Blessings */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light uppercase tracking-tight text-[#111827] leading-[1.18]">
            {lang === 'hi' ? (
              <>
                आस्था से यात्रा, <br />
                <span className="font-normal text-[#cca042]">आशीर्वाद के साथ वापसी</span>
              </>
            ) : (
              <>
                TRAVEL WITH FAITH, <br />
                <span className="font-normal text-[#cca042]">RETURN WITH BLESSINGS</span>
              </>
            )}
          </h1>

          {/* Slogan & narrative */}
          <p className="mt-3 text-xs sm:text-sm tracking-[0.25em] uppercase font-sans font-medium text-[#6b7280]">
            {lang === 'hi' ? 'आपकी यात्रा, हमारा दायित्व • PURVA YATRA' : 'Your Journey, Our Responsibility • Purva Yatra'}
          </p>

          <p className="mt-4 text-sm sm:text-base text-[#4b5563] max-w-2xl mx-auto leading-relaxed font-sans font-light">
            {lang === 'hi'
              ? 'गया जी पिंडदान, काशी विश्वनाथ, तारापीठ, पुरी जगन्नाथ, बाबा बैद्यनाथ एवं चारधाम के लिए स्वच्छ होटल, सुरक्षित वाहन और अधिकृत पुरोहित व्यवस्था।'
              : 'Dedicated pilgrimage arrangements, authentic Vedic Teerth Purohits, sanitized stays, and private sanitised fleet across Gaya Ji, Kashi, Tarapith, Puri, Deoghar, and the Himalayas.'}
          </p>

          {/* CTA Action Buttons matching Mockup: Explore Packages & WhatsApp Us */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#yatras"
              className="px-7 py-3.5 bg-[#cca042] hover:bg-[#b88c34] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <span>{lang === 'hi' ? 'यात्रा पैकेज देखें' : 'Explore Packages'}</span>
            </a>

            <button
              onClick={handleWhatsAppUs}
              className="px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-[#25D366] text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
              <span>{lang === 'hi' ? 'व्हाट्सएप करें' : 'WhatsApp Us'}</span>
            </button>
          </div>

          {/* Scenic Panoramic Photo matching Mockup with Mountain Train */}
          <div className="mt-10 relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src={heroScenicImage}
              alt="Scenic Mountain Rail Pilgrimage and Himalayan Journey"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-sans">
              <span className="flex items-center gap-1.5 font-medium tracking-wide drop-shadow-md">
                <MapPin className="w-3.5 h-3.5 text-[#cca042]" />
                <span>Himalayan &amp; Sacred Pilgrim Corridors</span>
              </span>
              <span className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] text-[#edd085] border border-white/10 tracking-widest uppercase">
                Est. 1992
              </span>
            </div>
          </div>

          {/* Trust points */}
          <div className="mt-8 pt-6 border-t border-gray-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs tracking-wider uppercase font-sans text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#cca042]" />
              <span>{lang === 'hi' ? '100% स्वच्छ एवं सत्यापित होटल' : 'Curated Sanitized Stays'}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#cca042]" />
              <span>{lang === 'hi' ? 'अधिकृत वैदिक तीर्थ पुरोहित' : 'Vedic Purohit Facilitation'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#cca042]" />
              <span>{lang === 'hi' ? 'वरिष्ठ नागरिक विशेष देखभाल' : 'Senior Pilgrim Assistance'}</span>
            </div>
          </div>

        </div>

        {/* Quick Search & Filter Panel */}
        <div className="mt-10 max-w-4xl mx-auto bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-md">
          <form onSubmit={handleSearchClick} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
            
            {/* Destination Select */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gray-700 mb-1.5">
                {lang === 'hi' ? 'तीर्थ स्थल / गंतव्य' : 'Destination / Shrine'}
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full bg-[#faf8f5] text-gray-800 text-xs rounded-md pl-8 pr-3 py-2.5 border border-gray-300 focus:outline-none focus:border-[#cca042]"
                >
                  <option value="all">{lang === 'hi' ? 'सभी तीर्थ स्थल (All Yatras)' : 'All Holy Yatras'}</option>
                  <option value="kolkata-durga-puja-2026">🪔 {lang === 'hi' ? 'कोलकाता दुर्गा पूजा 2026 (गया ➔ कोलकाता)' : 'Kolkata Durga Puja 2026 (Gaya ➔ Kolkata)'}</option>
                  <option value="gaya-ji">Gaya Ji (Vishnupad & Pind Daan)</option>
                  <option value="tarapith">Tarapith (Maa Tara Shaktipeeth)</option>
                  <option value="varanasi">Varanasi (Kashi Vishwanath)</option>
                  <option value="stranger-trip-kasol">🔥 {lang === 'hi' ? 'स्ट्रेंजर ट्रिप - कसोल व पार्वती वैली (हिमाचल)' : 'Stranger Trip - Kasol & Parvati Valley (Himachal)'}</option>
                  <option value="puri-jagannath">Puri (Jagannath Dham)</option>
                  <option value="baidyanath-deoghar">Deoghar (Baba Baidyanath)</option>
                  <option value="badrinath">Badrinath (Chardham)</option>
                  <option value="kedarnath">Kedarnath (Jyotirlinga)</option>
                  <option value="haridwar-rishikesh">Haridwar & Rishikesh (Ganga Aarti)</option>
                  <option value="nainital-naina-devi">Nainital & Kainchi Dham (Neeb Karori Baba Mandir)</option>
                  <option value="gangasagar-kolkata">Gangasagar & Kolkata</option>
                </select>
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gray-700 mb-1.5">
                {lang === 'hi' ? 'यात्रा श्रेणी' : 'Yatra Category'}
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#faf8f5] text-gray-800 text-xs rounded-md pl-8 pr-3 py-2.5 border border-gray-300 focus:outline-none focus:border-[#cca042]"
                >
                  <option value="all">{lang === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}</option>
                  <option value="Durga Puja Special">🪔 {lang === 'hi' ? 'कोलकाता दुर्गा पूजा 2026' : 'Kolkata Durga Puja 2026'}</option>
                  <option value="Stranger Trip Special">🔥 Stranger Trips (Solo Travelers)</option>
                  <option value="Pind Daan Special">Pind Daan & Shraddh Special</option>
                  <option value="Shaktipeeth">Maha Shaktipeeths</option>
                  <option value="Jyotirlinga">Sacred Jyotirlingas</option>
                  <option value="Himalayan Dham">Himalayan Yatras</option>
                  <option value="Spiritual Teerth">Heritage Teerth Circuits</option>
                </select>
              </div>
            </div>

            {/* Travel Type / Special Need */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gray-700 mb-1.5">
                {lang === 'hi' ? 'सुविधा' : 'Special Preference'}
              </label>
              <div className="w-full bg-[#faf8f5] text-gray-700 text-xs rounded-md px-3 py-2.5 border border-gray-300 flex items-center justify-between">
                <span>Family & Senior Care</span>
                <span className="text-[10px] text-[#926017] font-bold bg-[#fef3c7] px-1.5 py-0.5 rounded border border-[#fde68a]">
                  Included
                </span>
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="pt-2 sm:pt-5">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#cca042] hover:bg-[#b88c34] text-black font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{lang === 'hi' ? 'यात्रा खोजें' : 'Search Yatras'}</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
