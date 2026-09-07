import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  User, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Printer, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  Train
} from 'lucide-react';
import { BookingTarget, BookingRecord } from '../types';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface BookingModalProps {
  target: BookingTarget | null;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  target,
  onClose,
  lang,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [travelDate, setTravelDate] = useState(() => {
    // Default to a date 5 days from now
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedTier, setSelectedTier] = useState<string>('standard');
  const [pickupPoint, setPickupPoint] = useState('Gaya Railway Station');
  const [needPandit, setNeedPandit] = useState(true);
  const [seniorAssistance, setSeniorAssistance] = useState(false);
  const [satvikMeals, setSatvikMeals] = useState(true);
  const [specialRequests, setSpecialRequests] = useState('');

  // Determine package type
  const isPitruPaksha = target?.packageTitle?.toLowerCase().includes('pitru') || 
                        target?.packageId === 'gaya-ji' || 
                        target?.packageTitle?.toLowerCase().includes('gaya');

  const isKolkataTrip = target?.packageId?.includes('kolkata') || 
                        target?.packageTitle?.toLowerCase().includes('kolkata');

  // Initialize or reset when target changes
  useEffect(() => {
    if (target) {
      setStep('form');
      setConfirmedBooking(null);
      setCopied(false);

      if (isKolkataTrip) {
        if (target.defaultTier === 'direct') {
          setSelectedTier('direct');
          setGuestsCount(1);
          setPickupPoint('Kolkata Howrah / Sealdah / Airport (Direct Join)');
        } else if (target.defaultTier === 'couple') {
          setSelectedTier('couple');
          setGuestsCount(2);
          setPickupPoint('Patna Junction Railway Station (PNBE)');
        } else {
          setSelectedTier('origin');
          setGuestsCount(target.defaultGuests || 1);
          setPickupPoint('Gaya Railway Station (GAYA)');
        }
      } else if (isPitruPaksha) {
        if (target.defaultTier === 'single') {
          setSelectedTier('single');
          setGuestsCount(1);
        } else if (target.defaultTier === 'couple') {
          setSelectedTier('couple');
          setGuestsCount(2);
        } else {
          setSelectedTier('group');
          setGuestsCount(Math.max(6, target.defaultGuests || 6));
        }
      } else {
        setSelectedTier('standard');
        setGuestsCount(target.defaultGuests || 2);
      }
    }
  }, [target, isPitruPaksha, isKolkataTrip]);

  if (!target) return null;

  // Calculate pricing
  const calculateTotal = () => {
    if (isKolkataTrip) {
      if (selectedTier === 'direct') return 5999 * guestsCount;
      if (selectedTier === 'origin') return 8999 * guestsCount;
      if (selectedTier === 'couple') {
        const couples = Math.ceil(guestsCount / 2);
        return 19999 * Math.max(1, couples);
      }
      return 8999 * guestsCount;
    }

    if (isPitruPaksha) {
      if (selectedTier === 'single') return 4999 * guestsCount;
      if (selectedTier === 'couple') {
        const couples = Math.ceil(guestsCount / 2);
        return 9999 * couples;
      }
      if (selectedTier === 'group') return 3999 * guestsCount;
    }

    const base = target.basePrice || 4999;
    if (selectedTier === 'deluxe') return Math.round(base * 1.3) * guestsCount;
    if (selectedTier === 'luxury') return Math.round(base * 1.6) * guestsCount;
    return base * guestsCount;
  };

  const getUnitPrice = () => {
    if (isKolkataTrip) {
      if (selectedTier === 'direct') return 5999;
      if (selectedTier === 'origin') return 8999;
      if (selectedTier === 'couple') return 19999;
      return 8999;
    }

    if (isPitruPaksha) {
      if (selectedTier === 'single') return 4999;
      if (selectedTier === 'couple') return 9999;
      if (selectedTier === 'group') return 3999;
    }
    const base = target.basePrice || 4999;
    if (selectedTier === 'deluxe') return Math.round(base * 1.3);
    if (selectedTier === 'luxury') return Math.round(base * 1.6);
    return base;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const bookingId = `PY-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const total = calculateTotal();
    const unit = getUnitPrice();

    const record: BookingRecord = {
      id: bookingId,
      yatraId: target.packageId,
      yatraTitle: target.packageTitle,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim() || undefined,
      travelDate,
      guestsCount,
      tier: selectedTier,
      unitPrice: unit,
      totalEstimatedAmount: total,
      pickupPoint,
      needPandit,
      seniorAssistance,
      satvikMeals,
      specialRequests: specialRequests.trim() || undefined,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    // Save to Backend Database (MongoDB) & LocalStorage fallback
    try {
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      }).catch((apiErr) => console.warn('Database sync notification:', apiErr));

      const existing = localStorage.getItem('purva_yatra_bookings_list');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(record);
      localStorage.setItem('purva_yatra_bookings_list', JSON.stringify(list));
    } catch (err) {
      console.error('Error saving booking', err);
    }

    setConfirmedBooking(record);
    setStep('success');
  };

  const handleCopyCode = () => {
    if (!confirmedBooking) return;
    navigator.clipboard.writeText(confirmedBooking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const handleSendWhatsAppConfirmation = () => {
    if (!confirmedBooking) return;
    const msg = `Namaste Purva Yatra! 🙏\nI have submitted my booking request on your website.\n\n• *Booking ID:* ${confirmedBooking.id}\n• *Yatra:* ${confirmedBooking.yatraTitle}\n• *Name:* ${confirmedBooking.customerName}\n• *Phone:* ${confirmedBooking.customerPhone}\n• *Travel Date:* ${confirmedBooking.travelDate}\n• *Pilgrims:* ${confirmedBooking.guestsCount} Persons\n• *Total Estimate:* ₹${confirmedBooking.totalEstimatedAmount.toLocaleString('en-IN')}/-\n\nPlease verify our slot and share the confirmation voucher.`;
    window.open(createWhatsAppUrl(msg), '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Ribbon */}
        <div className="bg-[#0b1224] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#cca042]/40 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#cca042] to-[#926017] p-0.5 flex items-center justify-center shrink-0 shadow-md">
              <div className="w-full h-full rounded-[10px] bg-[#070e1e] flex items-center justify-center text-[#cca042] text-lg">
                🛕
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#cca042] font-bold">
                {step === 'form' ? 'Online Pilgrimage Booking' : 'Booking Confirmation Slip'}
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide leading-tight line-clamp-1">
                {target.packageTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto font-sans">
            
            {/* Yatra Overview Card */}
            <div className="bg-[#faf8f5] rounded-xl p-3.5 border border-gray-200 mb-5 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">
                  Selected Holy Destination
                </span>
                <span className="text-sm font-serif font-bold text-gray-900 block mt-0.5">
                  {target.packageTitle}
                </span>
                <span className="text-xs text-[#cca042] font-medium flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{target.duration || 'Flexible Duration'}</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">
                  Starting From
                </span>
                <span className="text-base sm:text-lg font-serif font-bold text-[#111827]">
                  ₹{target.basePrice ? target.basePrice.toLocaleString('en-IN') : '4,999'}/-
                </span>
                <span className="text-[9px] text-gray-400 block uppercase">All taxes included</span>
              </div>
            </div>

            {/* Package Tier Selection (Kolkata Durga Puja, Pitru Paksha or custom tiers) */}
            {isKolkataTrip ? (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Select Package Option *
                  </label>
                  <span className="text-[10px] bg-[#cca042]/20 text-[#85570e] font-bold px-2 py-0.5 rounded">
                    3 Nights / 4 Days Special
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* From Destination Gaya / Patna (Main Package) */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier('origin');
                      if (guestsCount < 1) setGuestsCount(1);
                      setPickupPoint('Gaya Railway Station (GAYA)');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      selectedTier === 'origin'
                        ? 'border-[#cca042] bg-[#cca042]/10 ring-2 ring-[#cca042]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-[#0b1224] text-[#ecc367] font-bold text-[8px] uppercase tracking-wider rounded shadow-xs">
                      {lang === 'hi' ? 'मुख्य पैकेज' : 'Main Package'}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs uppercase text-gray-900">
                        {lang === 'hi' ? 'गया / पटना से' : 'Ex-Bihar (Gaya/Patna)'}
                      </span>
                      <Train className="w-3.5 h-3.5 text-[#cca042]" />
                    </div>
                    <div className="text-sm font-serif font-bold text-[#926017] mt-1">₹8,999/-</div>
                    <div className="text-[10px] text-gray-600 font-semibold">
                      {lang === 'hi' ? 'प्रति व्यक्ति (ऑल-इन्क्लूसिव)' : 'Per Person (All-Inclusive)'}
                    </div>
                    <div className="text-[9px] text-gray-500 mt-1">
                      {lang === 'hi' ? 'राउंडट्रिप एसी ट्रैवल + 3N स्टे + भोजन' : 'Roundtrip Travel + 3N Stay + Meals'}
                    </div>
                  </button>

                  {/* Direct Kolkata (For those who join in Kolkata only) */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier('direct');
                      if (guestsCount < 1) setGuestsCount(1);
                      setPickupPoint('Kolkata Howrah / Sealdah / Airport (Direct Join)');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      selectedTier === 'direct'
                        ? 'border-[#cca042] bg-[#cca042]/10 ring-2 ring-[#cca042]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-emerald-600 text-white font-bold text-[8px] uppercase tracking-wider rounded shadow-xs">
                      {lang === 'hi' ? 'लोकल जॉइन' : 'Direct Join'}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs uppercase text-gray-900">
                        {lang === 'hi' ? 'कोलकाता में ही जॉइन' : 'Join in Kolkata'}
                      </span>
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-sm font-serif font-bold text-emerald-800 mt-1">₹5,999/-</div>
                    <div className="text-[10px] text-emerald-700 font-medium">
                      {lang === 'hi' ? 'सिर्फ कोलकाता में जॉइन करने पर' : 'For travelers joining in Kolkata'}
                    </div>
                    <div className="text-[9px] text-gray-500 mt-1">
                      {lang === 'hi' ? '3N होटल स्टे + भोजन + लोकल टूर' : '3N Hotel Stay + Meals + Pandals'}
                    </div>
                  </button>

                  {/* Couple Package */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier('couple');
                      setGuestsCount(2);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      selectedTier === 'couple'
                        ? 'border-[#cca042] bg-[#cca042]/10 ring-2 ring-[#cca042]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-rose-600 text-white font-bold text-[8px] uppercase tracking-wider rounded shadow-xs">
                      {lang === 'hi' ? 'प्राइवेट रूम' : 'Private Room'}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs uppercase text-gray-900">
                        {lang === 'hi' ? 'कपल स्पेशल पैकेज' : 'Couple Special'}
                      </span>
                      <span className="text-xs">❤️</span>
                    </div>
                    <div className="text-sm font-serif font-bold text-rose-700 mt-1">₹19,999/-</div>
                    <div className="text-[10px] text-gray-600">
                      {lang === 'hi' ? 'प्रति कपल (2 व्यक्ति)' : 'Per Couple (2 Persons)'}
                    </div>
                    <div className="text-[9px] text-rose-600 mt-1 font-medium">
                      {lang === 'hi' ? 'प्राइवेट एसी रूम + स्पेशल डिनर' : 'Private AC Room + Club Dinner'}
                    </div>
                  </button>
                </div>
                
                <div className="mt-2.5 p-2 bg-emerald-50/80 border border-emerald-200/70 rounded-lg text-[11px] text-emerald-950 flex items-start gap-1.5">
                  <span className="font-bold shrink-0">
                    {lang === 'hi' ? 'ℹ️ स्पष्टीकरण:' : 'ℹ️ Price Clarification:'}
                  </span>
                  <span>
                    {lang === 'hi'
                      ? <>मुख्य ऑल-इन्क्लूसिव पैकेज <strong>₹8,999/-</strong> है। <strong>₹5,999/-</strong> की दर केवल उन यात्रियों के लिए है जो सीधे कोलकाता में ही ग्रुप को जॉइन करेंगे।</>
                      : <>The main all-inclusive package is <strong>₹8,999/-</strong> (roundtrip from Gaya/Patna). The <strong>₹5,999/-</strong> rate is exclusively for travelers joining directly in Kolkata.</>}
                  </span>
                </div>

                <div className="mt-2 text-[10px] text-gray-600 bg-amber-50/80 border border-amber-200/60 p-2 rounded-lg flex items-center gap-1.5">
                  <span className="text-amber-700 font-bold">
                    {lang === 'hi' ? '🍱 भोजन विवरण:' : '🍱 Meal Clarity:'}
                  </span>
                  <span>
                    {lang === 'hi'
                      ? 'लंच और डिनर: 3 दिन • ब्रेकफास्ट: डे 2, डे 3 और डे 4 (डे 1 का ब्रेकफास्ट शामिल नहीं है)।'
                      : 'Lunch & Dinner on 3 days • Breakfast on Day 2, Day 3 & Day 4 (Day 1 breakfast is excluded).'}
                  </span>
                </div>
              </div>
            ) : isPitruPaksha ? (
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Select Package Tier *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  
                  {/* Single Tier */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier('single');
                      setGuestsCount(1);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedTier === 'single'
                        ? 'border-[#cca042] bg-[#cca042]/10 ring-2 ring-[#cca042]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs uppercase text-gray-900">Single</span>
                      <User className="w-3.5 h-3.5 text-[#cca042]" />
                    </div>
                    <div className="text-sm font-serif font-bold text-gray-900 mt-1">₹4,999/-</div>
                    <div className="text-[10px] text-gray-500">Per Person (1 Pilgrim)</div>
                  </button>

                  {/* Couple Tier */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier('couple');
                      setGuestsCount(2);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedTier === 'couple'
                        ? 'border-[#cca042] bg-[#cca042]/10 ring-2 ring-[#cca042]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs uppercase text-gray-900">Couple</span>
                      <span className="text-xs">❤️</span>
                    </div>
                    <div className="text-sm font-serif font-bold text-gray-900 mt-1">₹9,999/-</div>
                    <div className="text-[10px] text-gray-500">Per Couple (2 Pilgrims)</div>
                  </button>

                  {/* Group Tier */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier('group');
                      if (guestsCount < 6) setGuestsCount(6);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      selectedTier === 'group'
                        ? 'border-[#cca042] bg-[#cca042]/10 ring-2 ring-[#cca042]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-[#cca042] text-black font-bold text-[8px] uppercase tracking-wider rounded">
                      Best Value
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs uppercase text-gray-900">Group (6+)</span>
                      <Users className="w-3.5 h-3.5 text-[#cca042]" />
                    </div>
                    <div className="text-sm font-serif font-bold text-gray-900 mt-1">₹3,999/-</div>
                    <div className="text-[10px] text-gray-500">Per Person (Min 6)</div>
                  </button>

                </div>
              </div>
            ) : (
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Select Category Plan
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'standard', name: 'Standard', desc: 'Sanitized verified rooms' },
                    { id: 'deluxe', name: 'Deluxe AC', desc: 'Premium 3-Star near temple' },
                    { id: 'luxury', name: 'VIP Suite', desc: 'Heritage Stay + Private Guide' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        selectedTier === tier.id
                          ? 'border-[#cca042] bg-[#cca042]/10 ring-1 ring-[#cca042]'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <span className="font-bold text-xs text-gray-900 block">{tier.name}</span>
                      <span className="text-[10px] text-gray-500 block leading-tight">{tier.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pilgrim Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Primary Pilgrim Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#cca042] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#cca042] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Travel Date & Pilgrims Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Preferred Travel Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#cca042] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Number of Pilgrims (Guests) *
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg bg-[#faf8f5] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      const min = selectedTier === 'group' ? 6 : 1;
                      if (guestsCount > min) setGuestsCount(guestsCount - 1);
                    }}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm cursor-pointer transition-colors"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center font-bold text-xs text-gray-900">
                    {guestsCount} {guestsCount === 1 ? 'Person' : 'Persons'}
                  </div>
                  <button
                    type="button"
                    onClick={() => setGuestsCount(guestsCount + 1)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>
                {selectedTier === 'group' && guestsCount < 6 && (
                  <span className="text-[10px] text-amber-600 block mt-1">
                    * Group package requires minimum 6 persons
                  </span>
                )}
              </div>
            </div>

            {/* Pickup Point Selection */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Preferred Pick-up & Arrival Point
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={pickupPoint}
                  onChange={(e) => setPickupPoint(e.target.value)}
                  className="w-full bg-[#faf8f5] border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#cca042] focus:bg-white transition-all"
                >
                  <option value="Gaya Railway Station (GAYA)">Gaya Railway Station (GAYA)</option>
                  <option value="Gaya International Airport (GAY)">Gaya International Airport (GAY)</option>
                  <option value="Patna Airport (Jay Prakash Narayan Airport)">Patna Airport (PAT)</option>
                  <option value="Patna Junction Railway Station (PNBE)">Patna Junction (PNBE)</option>
                  <option value="Varanasi Cantt / Airport (BSB)">Varanasi Cantt / Airport (BSB)</option>
                  <option value="Kolkata Howrah / Sealdah / Airport">Kolkata Howrah / Sealdah / Airport</option>
                  <option value="Direct Hotel Check-in">Direct Hotel Check-in (Self Arrival)</option>
                </select>
              </div>
            </div>

            {/* Special Services Checkboxes */}
            <div className="mb-5 p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                {isKolkataTrip ? 'Curated Trip Inclusions & Support' : 'Included Special Assistance'}
              </div>

              {isKolkataTrip ? (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-gray-800">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>3 Nights Premium Hotel Stay + Meals (3 Lunch/Dinner + 3 Breakfast)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-800">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Dedicated AC Local Cabs for VIP Pandal Hopping, Victoria Memorial & Dakshineswar</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-800">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Special Newtown Club Group Dinner on Day 3 + Verified Safe Curated Crowd</span>
                  </div>
                </div>
              ) : (
                <>
                  <label className="flex items-center gap-2.5 text-xs text-gray-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needPandit}
                      onChange={(e) => setNeedPandit(e.target.checked)}
                      className="w-4 h-4 rounded text-[#cca042] focus:ring-[#cca042] accent-[#cca042]"
                    />
                    <span>Dedicated Vedic Teerth Purohit & Authentic Ritual Samagri arrangement</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-gray-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={seniorAssistance}
                      onChange={(e) => setSeniorAssistance(e.target.checked)}
                      className="w-4 h-4 rounded text-[#cca042] focus:ring-[#cca042] accent-[#cca042]"
                    />
                    <span>Senior citizen care (Ground floor room / e-rickshaw or wheelchair support)</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-gray-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={satvikMeals}
                      onChange={(e) => setSatvikMeals(e.target.checked)}
                      className="w-4 h-4 rounded text-[#cca042] focus:ring-[#cca042] accent-[#cca042]"
                    />
                    <span>Pure Satvik Vaishnav vegetarian breakfast & dining arrangement</span>
                  </label>
                </>
              )}
            </div>

            {/* Live Pricing Estimation Summary */}
            <div className="p-4 rounded-xl bg-[#faf7f0] border border-[#cca042]/50 mb-5">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Estimated Rate:</span>
                <span>
                  ₹{getUnitPrice().toLocaleString('en-IN')}{' '}
                  {isPitruPaksha && selectedTier === 'couple' ? 'per couple' : 'per person'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Pilgrims:</span>
                <span>{guestsCount} Person(s)</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>Convenience & Booking Fee:</span>
                <span className="text-emerald-700 font-semibold">₹0 (Complimentary)</span>
              </div>

              <div className="pt-2 border-t border-[#cca042]/30 flex items-center justify-between">
                <div>
                  <span className="font-serif font-bold text-sm text-gray-900 block">Total Estimated Cost:</span>
                  <span className="text-[10px] text-gray-500">Pay on arrival / after coordinator confirmation</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-serif font-bold text-[#111827]">
                    ₹{calculateTotal().toLocaleString('en-IN')}/-
                  </span>
                </div>
              </div>
            </div>

            {/* Confirmation CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-[#cca042] via-[#e2ba5e] to-[#cca042] text-black font-serif font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>CONFIRM BOOKING REQUEST</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-gray-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Verified Pilgrimage Partner • Instant Confirmation Slip Generated</span>
            </div>

          </form>
        ) : (
          /* STEP 2: Instant Booking Confirmation Screen */
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto font-sans text-center">
            
            {/* Green Success Badge */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#cca042] block">
              Har Har Mahadev • Jai Jagannath
            </span>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mt-1 uppercase">
              BOOKING REQUEST CONFIRMED!
            </h3>

            <p className="text-xs text-gray-600 max-w-md mx-auto mt-2">
              Namaste <span className="font-semibold text-gray-900">{confirmedBooking?.customerName}</span>, your pilgrimage booking has been registered with Purva Yatra.
            </p>

            {/* Official Booking Reference Box */}
            <div className="my-6 p-4 rounded-2xl bg-[#faf7f0] border-2 border-[#cca042] max-w-lg mx-auto text-left shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#cca042]/30 mb-3">
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-500 tracking-widest block">
                    BOOKING REFERENCE ID
                  </span>
                  <span className="text-lg font-mono font-bold text-[#111827] tracking-wider">
                    {confirmedBooking?.id}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:border-[#cca042] text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5 text-[#cca042]" />
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Summary Details */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Yatra Circuit:</span>
                  <span className="font-semibold text-gray-900 line-clamp-1">{confirmedBooking?.yatraTitle}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Travel Date:</span>
                  <span className="font-semibold text-gray-900">{confirmedBooking?.travelDate}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Pilgrims:</span>
                  <span className="font-semibold text-gray-900">{confirmedBooking?.guestsCount} Person(s)</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Total Estimate:</span>
                  <span className="font-serif font-bold text-gray-900">₹{confirmedBooking?.totalEstimatedAmount.toLocaleString('en-IN')}/-</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Pick-up Station:</span>
                  <span className="font-semibold text-gray-900 line-clamp-1">{confirmedBooking?.pickupPoint}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Status:</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Priority Locked
                  </span>
                </div>
              </div>

              {/* Inclusions summary */}
              <div className="mt-3 pt-3 border-t border-[#cca042]/20 text-[11px] text-gray-600 flex flex-wrap gap-2">
                {confirmedBooking?.needPandit && (
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    ✓ Vedic Purohit
                  </span>
                )}
                {confirmedBooking?.seniorAssistance && (
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                    ✓ Senior Citizen Care
                  </span>
                )}
                {confirmedBooking?.satvikMeals && (
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ✓ Satvik Meals
                  </span>
                )}
              </div>
            </div>

            {/* Next Steps Timeline */}
            <div className="max-w-md mx-auto text-left mb-6 p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <span className="font-bold text-[11px] uppercase tracking-wider text-gray-700 block mb-2">
                What happens next?
              </span>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#cca042] text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Our senior yatra coordinator will call on <strong className="text-gray-900">{confirmedBooking?.customerPhone}</strong> within 15 minutes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#cca042] text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Temple darshan timing & certified Pandit Ji slot will be finalized.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#cca042] text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>Confirmed hotel stay voucher and driver details will be shared.</span>
                </li>
              </ul>
            </div>

            {/* Voluntary Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleSendWhatsAppConfirmation}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Receive Updates on WhatsApp</span>
              </button>

              <button
                onClick={handlePrintSlip}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-gray-600" />
                <span>Print Booking Slip</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-[#0b1224] hover:bg-[#1f2937] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
