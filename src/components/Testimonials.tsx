import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/yatras';

interface TestimonialsProps {
  lang: 'en' | 'hi';
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 sm:py-24 bg-[#ffffff] text-[#1f2937] relative overflow-hidden border-b border-gray-200">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-gray-500 text-xs font-sans tracking-[0.3em] uppercase font-semibold">
            {lang === 'hi' ? 'भक्तों के अनुभव' : 'Sacred Traveler Experiences'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-light font-serif uppercase tracking-[0.15em] text-[#111827]">
          WORDS FROM DEVOTEES
        </h2>
        <div className="w-16 h-[2px] bg-[#cca042] mx-auto mt-3 mb-12" />

        {/* Featured Testimonial Card */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-8 sm:p-14 relative shadow-lg">
          <Quote className="w-10 h-10 text-gray-200 absolute top-6 left-6 pointer-events-none" />

          {/* 5 Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
            ))}
          </div>

          <p className="text-base sm:text-xl text-gray-700 font-serif italic leading-relaxed max-w-3xl mx-auto font-light">
            "{current.comment}"
          </p>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-sans">
            <span className="font-serif font-medium text-[#111827] text-lg tracking-wide">
              {current.name}
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="text-gray-500">
              {current.location}
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="text-[#926017] bg-[#fef9ee] border border-[#f5e6c8] px-3 py-1 rounded-full text-xs inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              {current.yatraName}
            </span>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="p-2.5 rounded-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 transition-colors cursor-pointer shadow-sm"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5 items-center">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'bg-[#0b1224] w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextReview}
              className="p-2.5 rounded-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 transition-colors cursor-pointer shadow-sm"
              aria-label="Next Review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Numbers & Trust Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-10 border-t border-gray-200 text-center font-sans">
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#926017]">25,000+</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Devotees Accompanied</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#926017]">99.4%</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Punctuality Record</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#926017]">120+</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Certified Vedic Pandits</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#926017]">4.9 / 5.0</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Verified Pilgrim Rating</div>
          </div>
        </div>

      </div>
    </section>
  );
};
