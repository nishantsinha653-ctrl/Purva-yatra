import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { DISPLAY_PHONE, createWhatsAppUrl } from '../utils/whatsapp';

export const FloatingActions: React.FC = () => {
  const handleWhatsApp = () => {
    const defaultMsg = "Namaste Purva Yatra! 🙏\nI want to plan a pilgrimage tour with Purva Yatra - Travel with Faith, Return with Blessings. Please send quotes and itinerary details.";
    window.open(createWhatsAppUrl(defaultMsg), '_blank');
  };

  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-2 group">
        <div className="bg-white text-gray-800 text-[11px] py-1.5 px-3 border border-gray-200 shadow-lg rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-medium">
          Chat on WhatsApp with Yatra Expert 🙏
        </div>
        <button
          onClick={handleWhatsApp}
          className="w-13 h-13 bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative rounded-full"
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          <MessageCircle className="w-6 h-6 fill-white" />
        </button>
      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 p-2.5 sm:hidden flex items-center gap-2 shadow-xl">
        <a
          href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
          className="flex-1 py-2.5 px-3 bg-[#faf8f5] text-gray-800 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-gray-300 hover:bg-gray-100 rounded"
        >
          <Phone className="w-3.5 h-3.5 text-[#cca042]" />
          <span>Call Desk</span>
        </a>

        <button
          onClick={handleWhatsApp}
          className="flex-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md rounded"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp Quote</span>
        </button>
      </div>
    </>
  );
};
