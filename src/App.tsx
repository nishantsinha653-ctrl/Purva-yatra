/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PopularYatras } from './components/PopularYatras';
import { StrangerTrips } from './components/StrangerTrips';
import { WhyPurvaYatra } from './components/WhyPurvaYatra';
import { FeaturedSpotlight } from './components/FeaturedSpotlight';
import { RegionalExplorer } from './components/RegionalExplorer';
import { YatraCalculator } from './components/YatraCalculator';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PackageModal } from './components/PackageModal';
import { BookingModal } from './components/BookingModal';
import { FloatingActions } from './components/FloatingActions';
import { OtpAuthModal } from './components/OtpAuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AuthProvider } from './context/AuthContext';
import { AdminDashboard } from './components/AdminDashboard';
import { YATRA_PACKAGES } from './data/yatras';
import { YatraPackage, BookingTarget } from './types';

export default function App() {
  if (window.location.pathname.startsWith('/admin')) return <AdminDashboard />;
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [selectedPackage, setSelectedPackage] = useState<YatraPackage | null>(null);
  const [bookingTarget, setBookingTarget] = useState<BookingTarget | null>(null);
  const [inquiryTargetPackage, setInquiryTargetPackage] = useState<string | undefined>(undefined);
  
  // Quick Search filters from Hero
  const [filterState, setFilterState] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleHeroSearch = (destination: string, category: string) => {
    setFilterState(destination);
    setFilterCategory(category);
  };

  const handleOpenInquiry = (packageName?: string) => {
    setInquiryTargetPackage(packageName || 'Gaya Ji - Vishnupad & Mangalagauri');
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartBooking = (target: BookingTarget | YatraPackage, tier?: string) => {
    if ('title' in target) {
      setBookingTarget({
        packageTitle: target.title,
        packageId: target.id,
        duration: target.duration,
        basePrice: target.startingPrice,
        image: target.image,
        defaultTier: tier,
      });
    } else {
      setBookingTarget(target);
    }
  };

  // Find spotlight package (Gaya Ji)
  const spotlightPackage = YATRA_PACKAGES.find((p) => p.id === 'gaya-ji') || YATRA_PACKAGES[0];

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#faf8f5] text-[#1f2937] flex flex-col selection:bg-[#cca042] selection:text-black">
        
        {/* Navigation Header */}
        <Navbar
          onOpenInquiry={handleOpenInquiry}
          lang={lang}
          setLang={setLang}
        />

        {/* Hero Section */}
        <Hero
          onSearch={handleHeroSearch}
          lang={lang}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          
          {/* Popular Yatras Section (Matches mockup) */}
          <PopularYatras
            packages={YATRA_PACKAGES}
            onSelectPackage={(pkg) => setSelectedPackage(pkg)}
            onBookPackage={(pkg) => handleStartBooking(pkg)}
            lang={lang}
            filterState={filterState}
            filterCategory={filterCategory}
          />

          {/* Stranger Trips Block (Community & Solo Traveler Group Departures) */}
          <StrangerTrips
            lang={lang}
            onBookStrangerTrip={(tripTitle, defaultTier) => {
              const tier = defaultTier || 'origin';
              const basePrice = tier === 'direct' ? 5999 : tier === 'couple' ? 19999 : 8999;
              handleStartBooking({ 
                packageTitle: tripTitle, 
                packageId: 'kolkata-durga-puja-2026',
                duration: '4 Days / 3 Nights',
                basePrice, 
                defaultTier: tier
              }, tier);
            }}
          />

          {/* Why Purva Yatra (Matches mockup) */}
          <WhyPurvaYatra lang={lang} />

          {/* Featured Package Spotlight & Special Highlight: Pind Daan (Matches mockup) */}
          <FeaturedSpotlight
            packageData={spotlightPackage}
            onOpenInquiry={handleOpenInquiry}
            onViewDetails={(pkg) => setSelectedPackage(pkg)}
            onStartBooking={(tier) => handleStartBooking(spotlightPackage, tier)}
            lang={lang}
          />

          {/* East India & Himalayan Focus (Regional Explorer) */}
          <RegionalExplorer
            packages={YATRA_PACKAGES}
            onSelectPackage={(pkg) => setSelectedPackage(pkg)}
            lang={lang}
          />

          {/* Custom Yatra Budget Calculator */}
          <YatraCalculator lang={lang} />

          {/* What Our Travelers Say (Testimonials) */}
          <Testimonials lang={lang} />

          {/* Contact & Connect / Quick Quote Request */}
          <ContactSection
            initialPackage={inquiryTargetPackage}
            lang={lang}
          />

        </main>

        {/* Footer */}
        <Footer />

        {/* Detailed Itinerary Modal */}
        <PackageModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onBook={handleOpenInquiry}
          onStartBooking={(pkg, defaultTier) => handleStartBooking(pkg, defaultTier)}
          lang={lang}
        />

        {/* Interactive In-App Booking Modal */}
        <BookingModal
          target={bookingTarget}
          onClose={() => setBookingTarget(null)}
          lang={lang}
        />

        {/* Email OTP login + traveler profile */}
        <OtpAuthModal lang={lang} />
        <UserProfileModal
          lang={lang}
          onSelectPackage={(pkg) => setSelectedPackage(pkg)}
        />
        {/* Floating WhatsApp and Call buttons */}
        <FloatingActions />

      </div>
    </AuthProvider>
  );
}
