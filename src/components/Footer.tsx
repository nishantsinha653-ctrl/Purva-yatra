import React from 'react';
import { Phone, Mail, MapPin, Sparkles, ShieldCheck, MessageCircle } from 'lucide-react';
import { DISPLAY_PHONE, SUPPORT_EMAIL, createWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#0b1224] text-gray-400 text-xs border-t border-[#cca042]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 border border-[#cca042]/40 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-[#cca042]" />
              </div>
              <div>
                <span className="text-xl font-light font-serif text-white tracking-widest block">
                  PURVA <span className="text-[#cca042]">YATRA</span>
                </span>
                <p className="text-[10px] text-[#cca042] uppercase tracking-widest mt-0.5 font-medium">
                  Travel with Faith, Return with Blessings
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed font-light">
              East India's premier pilgrimage & heritage travel partner. Dedicated to delivering hassle-free, spiritually elevating journeys across Bihar, Bengal, Jharkhand, Odisha, and Uttarakhand.
            </p>

            <div className="flex items-center gap-2 text-gray-300 text-[11px] pt-1 font-light">
              <ShieldCheck className="w-4 h-4 text-[#cca042]" />
              <span>Govt. Approved Tourism Operator</span>
            </div>
          </div>

          {/* Popular Pilgrimage Circuits */}
          <div>
            <h4 className="text-white font-serif font-light text-sm uppercase tracking-widest mb-4 pb-2 border-b border-gray-800">
              Popular Yatras
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <a href="#yatras" className="hover:text-[#cca042] transition-colors">
                  Gaya Ji Vishnupad & Pind Daan
                </a>
              </li>
              <li>
                <a href="#yatras" className="hover:text-[#cca042] transition-colors">
                  Varanasi Kashi Vishwanath & Ganga Aarti
                </a>
              </li>
              <li>
                <a href="#yatras" className="hover:text-[#cca042] transition-colors">
                  Tarapith Maa Tara Shaktipeeth
                </a>
              </li>
              <li>
                <a href="#yatras" className="hover:text-[#cca042] transition-colors">
                  Deoghar Baba Baidyanath Jyotirlinga
                </a>
              </li>
              <li>
                <a href="#yatras" className="hover:text-[#cca042] transition-colors">
                  Puri Jagannath Dham & Konark Sun Temple
                </a>
              </li>
              <li>
                <a href="#yatras" className="hover:text-[#cca042] transition-colors">
                  Kedarnath & Badrinath Chardham
                </a>
              </li>
            </ul>
          </div>

          {/* Regional Hubs */}
          <div>
            <h4 className="text-white font-serif font-light text-sm uppercase tracking-widest mb-4 pb-2 border-b border-gray-800">
              Regional Operations
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#cca042] shrink-0 mt-0.5" />
                <span>Gaya & Bodh Gaya: Tootwari Chowk Road, Gaya (Bihar - 823001)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#cca042] shrink-0 mt-0.5" />
                <span>Kolkata Desk: DLF 1, New Town, Kolkata (West Bengal)</span>
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div>
            <h4 className="text-white font-serif font-light text-sm uppercase tracking-widest mb-4 pb-2 border-b border-gray-800">
              Devotee Support
            </h4>
            <div className="space-y-3.5">
              <p className="text-gray-400 text-xs font-light">
                Have questions about temple darshan rules, train arrivals, or special Puja?
              </p>
              <a
                href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-[#cca042] font-semibold text-sm hover:underline"
              >
                <Phone className="w-4 h-4 text-[#cca042]" />
                <span>{DISPLAY_PHONE}</span>
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#cca042]" />
                <span>{SUPPORT_EMAIL}</span>
              </a>

              <a
                href={createWhatsAppUrl("Namaste Purva Yatra! 🙏 I would like to book a pilgrimage tour.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white/5 border border-[#cca042]/40 hover:border-[#cca042] text-white text-xs uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-[#cca042] text-[#0b1224]" />
                <span>Direct WhatsApp Helpline</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-gray-500 text-[11px] font-light">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-medium">Purva Yatra</span> (पूर्वा यात्रा). All Rights Reserved. 
            <span className="text-[#cca042] ml-2 italic">Travel with Faith, Return with Blessings</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-gray-500">
            <span>Pind Daan Facilitation</span>
            <span className="text-gray-700">•</span>
            <span>Senior Care Pilgrimages</span>
            <span className="text-gray-700">•</span>
            <span>East India Specialist</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
