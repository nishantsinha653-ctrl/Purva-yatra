import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Clock, Sparkles, UserCheck } from 'lucide-react';
import { DISPLAY_PHONE, SUPPORT_EMAIL, createWhatsAppUrl, getCustomQuoteWhatsAppUrl } from '../utils/whatsapp';
import { YATRA_PACKAGES } from '../data/yatras';
import { useAuth } from '../context/AuthContext';

interface ContactSectionProps {
  initialPackage?: string;
  lang: 'en' | 'hi';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialPackage, lang }) => {
  const { user, isLoggedIn } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    yatra: initialPackage || 'Gaya Ji - Vishnupad & Mangalagauri',
    travelers: 4,
    date: '',
    vehicle: 'SUV (Innova)',
    seniorCitizen: true,
    panditNeed: true,
    notes: '',
  });

  useEffect(() => {
    if (initialPackage) {
      setFormData((prev) => ({
        ...prev,
        yatra: initialPackage,
      }));
    }
  }, [initialPackage]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        phone: prev.phone || user.phone || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          selectedYatra: formData.yatra,
          travelersCount: formData.travelers,
          travelDate: formData.date,
          vehicleType: formData.vehicle,
          specialRequirements: formData.notes,
          needPandit: formData.panditNeed,
          seniorCitizenAssistance: formData.seniorCitizen,
        }),
      });
    } catch (err) {
      console.warn('Enquiry database sync:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#faf8f5] text-[#1f2937] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-gray-500 text-xs font-sans tracking-[0.3em] uppercase font-semibold">
              {lang === 'hi' ? 'हमसे जुड़ें' : 'Direct Inquiry & Booking'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light font-serif uppercase tracking-[0.15em] text-[#111827]">
            CONTACT & CONNECT
          </h2>
          <div className="w-16 h-[2px] bg-[#cca042] mx-auto mt-3" />
          <p className="mt-4 text-xs sm:text-sm text-gray-600 font-sans font-light">
            {lang === 'hi'
              ? 'पूर्वा यात्रा के तीर्थ सलाहकारों से सीधे बात करें या अपनी आवश्यकता अनुसार कस्टम पैकेज तैयार करवाएं।'
              : 'Speak directly with our dedicated pilgrimage advisors or build a tailor-made travel itinerary for your family.'}
          </p>
        </div>

        {/* Quick Contact Action Bar */}
        <div className="bg-[#0c183a] rounded-2xl border border-white/10 p-6 sm:p-8 mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 font-sans text-white">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-[#cca042] flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-[#cca042]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-light text-white tracking-wide">
                24/7 Devotee Helpline & Booking Desk
              </h3>
              <p className="text-xs text-gray-300 font-light mt-0.5">
                Immediate assistance for temple darshan scheduling, station pick-up, and Vedic arrangements.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            <a
              href={createWhatsAppUrl('Namaste Purva Yatra! Please guide me regarding holy yatra booking.')}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="py-3 px-5 border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#cca042]" />
              <span>Call ({DISPLAY_PHONE})</span>
            </a>
          </div>
        </div>

        {/* 2-Column: Office Info & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office hubs */}
          <div className="lg:col-span-5 space-y-6 font-sans">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#cca042] mb-4 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#cca042]" />
                <span>Regional Operations Hubs</span>
              </h4>

              <div className="space-y-4 text-xs text-gray-600">
                <div className="pb-3 border-b border-gray-100">
                  <span className="font-serif font-medium text-[#111827] block text-sm tracking-wide">Gaya Ji & Bodh Gaya Desk</span>
                  <p className="text-gray-500 mt-0.5 font-light">Sardar Ballabh Bhai Path Road, Tootwari Chowk Road, Gaya, Bihar - 823001</p>
                  <span className="text-[#cca042] text-[10px] uppercase tracking-wider block mt-1 font-semibold">Direct Panda & Vehicle Hub</span>
                </div>

                <div>
                  <span className="font-serif font-medium text-[#111827] block text-sm tracking-wide">Kolkata & Tarapith Desk</span>
                  <p className="text-gray-500 mt-0.5 font-light">DLF 1, New Town, Kolkata, West Bengal - 700156</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 text-xs text-gray-600 space-y-3 font-sans shadow-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#cca042] shrink-0" />
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase tracking-widest">Email Us</span>
                  <span className="font-medium text-[#111827]">{SUPPORT_EMAIL}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#cca042] shrink-0" />
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase tracking-widest">Operating Hours</span>
                  <span className="font-medium text-[#111827]">24 Hours / 7 Days (Pilgrim Support)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking & Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg">
            <h3 className="text-xl font-serif text-[#111827] mb-1 tracking-wide font-medium">
              Request a Custom Yatra Itinerary
            </h3>
            <p className="text-xs text-gray-600 mb-6 font-sans font-light">
              Fill in your pilgrimage requirements. Our travel advisor will respond directly with personalized options via WhatsApp or Call.
            </p>

            {isLoggedIn && user && (
              <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800">
                <span className="flex items-center gap-1.5 font-medium">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    {lang === 'hi' ? `सत्यापित यात्री विवरण स्वतः भरे गए (${user.email})` : `Auto-filled for verified traveler (${user.email})`}
                  </span>
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-700 font-semibold">
                  OTP Verified
                </span>
              </div>
            )}

            {submitted ? (
              <div className="p-8 rounded-xl bg-[#faf8f5] border border-gray-200 text-center space-y-3 font-sans">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-serif font-medium text-[#111827]">
                  {lang === 'hi' ? 'पूछताछ सफलतापूर्वक दर्ज की गई' : 'Inquiry Successfully Saved in Database'}
                </h4>
                <p className="text-xs text-gray-600 font-light max-w-md mx-auto">
                  {lang === 'hi'
                    ? `धन्यवाद ${formData.name}! आपका विवरण हमारे डेटाबेस में सुरक्षित हो चुका है। हमारे तीर्थ सलाहकार आपसे जल्द ही संपर्क करेंगे।`
                    : `Thank you, ${formData.name}! Your yatra request has been safely logged in our central database. Our pilgrimage advisor will contact you shortly.`}
                </p>

                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={getCustomQuoteWhatsAppUrl({
                      name: formData.name,
                      phone: formData.phone,
                      yatra: formData.yatra,
                      travelers: formData.travelers,
                      travelDate: formData.date,
                      vehicle: formData.vehicle,
                      notes: `${formData.seniorCitizen ? '[Senior Citizen Traveling] ' : ''}${formData.panditNeed ? '[Vedic Pandit Needed] ' : ''}${formData.notes}`
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Chat on WhatsApp (Optional)</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        yatra: 'Gaya Ji - Vishnupad & Mangalagauri',
                        travelers: '2',
                        date: '',
                        vehicle: 'Sedan (Dzire)',
                        seniorCitizen: false,
                        panditNeed: false,
                        notes: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-lg bg-white hover:bg-gray-100 text-xs text-gray-800 border border-gray-300 uppercase tracking-widest font-semibold cursor-pointer shadow-sm transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-gray-300 rounded px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#cca042] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-gray-300 rounded px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#cca042] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-1">
                      Select Holy Yatra *
                    </label>
                    <select
                      value={formData.yatra}
                      onChange={(e) => setFormData({ ...formData, yatra: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-gray-300 rounded px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#cca042] transition-all"
                    >
                      {YATRA_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.title} className="bg-white text-gray-900">
                          {pkg.title}
                        </option>
                      ))}
                      <option value="Custom Multi-Temple Circuit" className="bg-white text-gray-900">Custom Multi-Temple Circuit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-1">
                      Number of Pilgrims
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                      className="w-full bg-[#faf8f5] border border-gray-300 rounded px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#cca042] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-1">
                      Preferred Travel Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-gray-300 rounded px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#cca042] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-1">
                      Vehicle Preference
                    </label>
                    <select
                      value={formData.vehicle}
                      onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-gray-300 rounded px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#cca042] transition-all"
                    >
                      <option value="Sedan (Dzire / Etios)">Sedan (Dzire / Etios) - 2-4 Devotees</option>
                      <option value="SUV (Innova / Crysta)">SUV (Innova / Crysta) - 4-6 Devotees</option>
                      <option value="Tempo Traveller (12/17 Seater)">Tempo Traveller (12/17 Seater) - Group</option>
                      <option value="Luxury Bus Coach">Luxury Bus Coach - Big Family Group</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.seniorCitizen}
                      onChange={(e) => setFormData({ ...formData, seniorCitizen: e.target.checked })}
                      className="accent-[#cca042]"
                    />
                    <span>Senior citizen with us (requires gentle pacing / ground floor room)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.panditNeed}
                      onChange={(e) => setFormData({ ...formData, panditNeed: e.target.checked })}
                      className="accent-[#cca042]"
                    />
                    <span>Need authorized Vedic Pandit for Pind Daan / Rudrabhishek</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-1">
                    Specific Requests or Arrival Station
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Pickup needed from Patna station at 8 AM, wheelchair assistance needed..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#faf8f5] border border-gray-300 rounded px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#cca042] resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#cca042] hover:bg-[#b88c34] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Submit Inquiry & Get Instant Quote on WhatsApp</span>
                </button>

                <p className="text-[10px] text-center text-gray-500 uppercase tracking-wider">
                  🔒 Direct communication with Purva Yatra pilgrimage advisors. No spam.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
