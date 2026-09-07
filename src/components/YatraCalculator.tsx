import React, { useState } from 'react';
import { Calculator, Users, Calendar, Car, Hotel, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { getCustomQuoteWhatsAppUrl } from '../utils/whatsapp';

interface YatraCalculatorProps {
  lang: 'en' | 'hi';
}

export const YatraCalculator: React.FC<YatraCalculatorProps> = ({ lang }) => {
  const [destination, setDestination] = useState('Gaya Ji & Bodh Gaya');
  const [travelers, setTravelers] = useState(4);
  const [days, setDays] = useState(3);
  const [hotelType, setHotelType] = useState<'budget' | 'comfort' | 'deluxe'>('comfort');
  const [vehicle, setVehicle] = useState<'Sedan (Dzire)' | 'SUV (Innova)' | 'Tempo Traveller'>('SUV (Innova)');
  const [addPandit, setAddPandit] = useState(true);

  // Approximate calculation logic
  const hotelRates = { budget: 1200, comfort: 2200, deluxe: 3800 };
  const vehicleRates = { 'Sedan (Dzire)': 2400, 'SUV (Innova)': 3800, 'Tempo Traveller': 5500 };
  
  const roomsNeeded = Math.ceil(travelers / 2);
  const totalHotelCost = roomsNeeded * hotelRates[hotelType] * (days - 1);
  const totalVehicleCost = vehicleRates[vehicle] * days;
  const driverAndAssistance = days * 600;
  const pujaCoordination = addPandit ? 1500 : 0;

  const totalEstimate = totalHotelCost + totalVehicleCost + driverAndAssistance + pujaCoordination;
  const perPersonEstimate = Math.round(totalEstimate / travelers);

  const handleWhatsAppQuote = () => {
    const waUrl = getCustomQuoteWhatsAppUrl({
      name: 'Website Devotee',
      phone: 'Contact via WhatsApp',
      yatra: destination,
      travelers: travelers,
      vehicle: vehicle,
      notes: `Estimated ${days} Days trip with ${hotelType.toUpperCase()} stay. ${addPandit ? 'Pandit arrangement requested.' : ''} Estimated ~₹${perPersonEstimate}/person.`
    });
    window.open(waUrl, '_blank');
  };

  return (
    <section id="group-tours" className="py-20 sm:py-28 bg-[#ffffff] text-[#1f2937] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fef9ee] border border-[#f5e6c8] text-[#926017] text-[10px] uppercase tracking-widest mb-3 rounded-full font-semibold">
            <Calculator className="w-3.5 h-3.5 text-[#cca042]" />
            <span>{lang === 'hi' ? 'तुरंत बजट अनुमान' : 'Instant Cost Estimator'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light tracking-wide text-[#111827] uppercase">
            Custom Yatra Budget Calculator
          </h2>
          <div className="w-12 h-[2px] bg-[#cca042] mx-auto mt-4" />
          <p className="mt-4 text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto font-sans">
            {lang === 'hi'
              ? 'अपने परिवार के आकार और सुविधानुसार यात्रा खर्च का तुरंत पारदर्शी अनुमान लगाएं।'
              : 'Transparent, zero-hidden-cost estimates based on your family count, vehicle preference, and hotel category.'}
          </p>
        </div>

        <div className="bg-[#faf8f5] border border-gray-200 rounded-2xl overflow-hidden p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-md">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6 font-sans">
            
            {/* Destination Selection */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-700 mb-2 font-semibold">
                Target Shrine / Pilgrimage Circuit
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#cca042] transition-all"
              >
                <option value="Gaya Ji & Bodh Gaya">Gaya Ji & Bodh Gaya (Vishnupad & Mangalagauri)</option>
                <option value="Tarapith & Bakreshwar">Tarapith (Maa Tara) & Bakreshwar</option>
                <option value="Varanasi Kashi Vishwanath">Varanasi (Kashi Vishwanath & Ganga Aarti)</option>
                <option value="Stranger Trip Kasol">🔥 Stranger Trip - Kasol & Parvati Valley (Himachal)</option>
                <option value="Stranger Trip Darjeeling">🔥 Stranger Trip - Darjeeling & Kanchenjunga</option>
                <option value="Stranger Trip Puri">🔥 Stranger Trip - Puri Golden Beach & Konark Explorer</option>
                <option value="Stranger Trip Goa">🔥 Stranger Trip - Goa Coastal & Heritage Adventure</option>
                <option value="Puri Jagannath & Konark">Puri Jagannath Dham & Konark Sun Temple</option>
                <option value="Deoghar Baidyanath Dham">Deoghar Baba Baidyanath & Basukinath</option>
                <option value="Kedarnath & Badrinath">Kedarnath & Badrinath Dham</option>
                <option value="Haridwar & Rishikesh">Haridwar & Rishikesh (Har Ki Pauri & Ganga Aarti)</option>
                <option value="Nainital & Kainchi Dham">Nainital & Kainchi Dham (Neeb Karori Baba Mandir)</option>
              </select>
            </div>

            {/* Travelers & Duration Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-gray-600 flex items-center gap-1.5 font-light">
                    <Users className="w-3.5 h-3.5 text-[#cca042]" />
                    <span>Pilgrims Count:</span>
                  </span>
                  <span className="font-serif font-medium text-[#926017] text-sm">{travelers} Devotees</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={16}
                  value={travelers}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setTravelers(val);
                    if (val > 6) setVehicle('Tempo Traveller');
                    else if (val > 4) setVehicle('SUV (Innova)');
                  }}
                  className="w-full accent-[#cca042] cursor-pointer"
                />
              </div>

              <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-gray-600 flex items-center gap-1.5 font-light">
                    <Calendar className="w-3.5 h-3.5 text-[#cca042]" />
                    <span>Trip Duration:</span>
                  </span>
                  <span className="font-serif font-medium text-[#926017] text-sm">{days} Days / {days - 1} N</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={8}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-[#cca042] cursor-pointer"
                />
              </div>
            </div>

            {/* Hotel Type Radio */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-700 mb-2 font-semibold">
                Hotel / Accommodation Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'budget', name: 'Clean Dharamshala', desc: 'Attached washroom, lift' },
                  { id: 'comfort', name: 'Comfort AC (3-Star)', desc: 'Near temple, breakfast' },
                  { id: 'deluxe', name: 'Premium Deluxe', desc: 'Luxury stay & dining' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHotelType(item.id as any)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      hotelType === item.id
                        ? 'bg-white border-[#cca042] text-gray-900 shadow-sm ring-1 ring-[#cca042]'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium block text-xs">{item.name}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5 font-light">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Type Radio */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-700 mb-2 font-semibold">
                Dedicated Private AC Vehicle
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Sedan (Dzire)', 'SUV (Innova)', 'Tempo Traveller'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVehicle(v)}
                    className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      vehicle === v
                        ? 'bg-white border-[#cca042] text-gray-900 shadow-sm ring-1 ring-[#cca042]'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium block text-xs">{v}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pandit Assistance Checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addPandit}
                  onChange={(e) => setAddPandit(e.target.checked)}
                  className="accent-[#cca042]"
                />
                <span className="font-light text-gray-700">
                  Include certified Vedic Teerth Purohit / Panda coordination for rituals
                </span>
              </label>
            </div>

          </div>

          {/* Result Estimate Card */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-center flex flex-col justify-between h-full shadow-lg font-sans">
            <div>
              <span className="inline-block px-3 py-1 bg-[#fef9ee] text-[#926017] text-[10px] uppercase tracking-widest border border-[#f5e6c8] mb-4 rounded-full font-semibold">
                Estimated Family Budget
              </span>

              <div className="mb-6">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">
                  Approx. Cost Per Person
                </span>
                <div className="text-4xl sm:text-5xl font-serif font-bold text-[#926017]">
                  ₹{perPersonEstimate.toLocaleString('en-IN')}*
                </div>
                <span className="text-xs text-gray-500 mt-1 block font-light">
                  Total for {travelers} devotees: ~₹{totalEstimate.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="text-left space-y-2.5 py-4 border-y border-gray-100 text-xs text-gray-600 font-light">
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="font-medium text-gray-900">{destination.split('(')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hotel:</span>
                  <span className="font-medium text-gray-900 capitalize">{hotelType} AC Rooms</span>
                </div>
                <div className="flex justify-between">
                  <span>Vehicle:</span>
                  <span className="font-medium text-gray-900">{vehicle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Purohit Coordination:</span>
                  <span className="font-medium text-[#926017]">{addPandit ? 'Included' : 'Not Requested'}</span>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 mt-3 italic font-light">
                *Estimated base price. Final quote includes exact season discounts, train pickup & tax.
              </p>
            </div>

            <div className="mt-6 pt-4">
              <button
                onClick={handleWhatsAppQuote}
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Get Exact Itinerary on WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
