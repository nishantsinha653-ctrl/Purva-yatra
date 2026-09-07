export const WHATSAPP_NUMBER = '918757901936';
export const DISPLAY_PHONE = '+91 87579 01936';
export const SUPPORT_EMAIL = 'support@purvayatra.com';

export function createWhatsAppUrl(message: string, targetPhoneNumber?: string): string {
  const encoded = encodeURIComponent(message);
  const cleanNumber = targetPhoneNumber ? targetPhoneNumber.replace(/\D/g, '') : WHATSAPP_NUMBER;
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}

export function getYatraWhatsAppUrl(yatraTitle: string, duration?: string, price?: number): string {
  if (price && price > 0) {
    const msg = `Namaste Purva Yatra! 🙏\nI am interested in booking the *${yatraTitle}* (${duration || 'Pilgrimage Package'} - Starting ₹${price.toLocaleString('en-IN')}).\nPlease share full itinerary details, availability, and best quote for my family.`;
    return createWhatsAppUrl(msg);
  }
  const msg = `Namaste Purva Yatra! 🙏\nI would like to enquire about the *${yatraTitle}* (${duration || 'Package'}).\nPlease share availability, inclusions, and custom quote for our travel dates.`;
  return createWhatsAppUrl(msg);
}

export function getPindDaanWhatsAppUrl(): string {
  const msg = `Namaste Purva Yatra team! 🙏\nI want to inquire about *Gaya Ji Pind Daan & Shraddh rituals*. Please provide details regarding Vedic Panda arrangement, hotel stay near Vishnupad, and complete ritual facilitation.`;
  return createWhatsAppUrl(msg);
}

export function getPitruPakshaTierWhatsAppUrl(tier: 'single' | 'couple' | 'group'): string {
  const tierDetails = {
    single: { name: 'Single Package (₹4,999/- per person)', guests: '1 Person (Solo)' },
    couple: { name: 'Couple Package (₹9,999/- per couple)', guests: '2 Persons (Couple)' },
    group: { name: 'Group Package (₹3,999/- per person, min 6)', guests: '6+ Persons (Family/Group)' },
  };

  const selected = tierDetails[tier];
  const msg = `Namaste Purva Yatra! 🙏\nI want to book the *Gaya Ji Pitru Paksha 2026*:\n• *Package:* ${selected.name}\n• *Duration:* 2 Days / 1 Night\n• *Travelers:* ${selected.guests}\n• *Dates:* 25 Sept – 10 Oct 2026\n\nPlease share booking steps, stay options near Vishnupad Mandir & Panditji arrangements.`;
  return createWhatsAppUrl(msg);
}

export function getKolkataDurgaPujaWhatsAppUrl(tier?: 'direct' | 'origin' | 'couple'): string {
  if (tier === 'direct') {
    const msg = `Namaste Purva Yatra! 🙏
I want to join the *First Stranger Trip in Bihar - Kolkata Durga Puja 2026* as a *Direct Kolkata Joiner*:
• *Package:* Direct Kolkata Joining (₹5,999/- per person)
• *Duration:* 4 Days / 3 Nights
• *Inclusions:* 3 Nights Premium Hotel, Meals (3L + 3D + 3B), Local Pandal Cabs & Newtown Club Dinner
Please share registration process and hotel joining details.`;
    return createWhatsAppUrl(msg);
  }

  if (tier === 'origin') {
    const msg = `Namaste Purva Yatra! 🙏
I want to book the *First Stranger Trip in Bihar - Kolkata Durga Puja 2026*:
• *Package:* From Destination Ex-Gaya Ji / Patna (₹8,999/- per person)
• *Duration:* 4 Days / 3 Nights
• *Transport:* AC Traveller / Vande Bharat (Round Trip)
• *Inclusions:* 3 Nights Premium Hotel, Meals (3L + 3D + 3B), Local Pandals, Victoria Memorial, Eco Park & Newtown Club Dinner
Please share seat availability and booking steps.`;
    return createWhatsAppUrl(msg);
  }

  if (tier === 'couple') {
    const msg = `Namaste Purva Yatra! 🙏
I want to book the *Couple Special Package* for *Kolkata Durga Puja 2026*:
• *Package:* Couple Package (₹19,999/- per couple)
• *Duration:* 4 Days / 3 Nights
• *Stay:* Guaranteed Private Premium Double AC Room
• *Inclusions:* Round-trip Travel, Romantic Pandal Hopping, All Meals & Newtown Club Dinner
Please confirm private room availability and booking voucher.`;
    return createWhatsAppUrl(msg);
  }

  const defaultMsg = `Namaste Purva Yatra! 🙏
I am interested in the *First Stranger Trip in Bihar - Kolkata Durga Puja Group Trip 2026* (3 Nights / 4 Days):
• Direct Kolkata Join: ₹5,999/-
• From Gaya Ji / Patna: ₹8,999/-
• Couple Package: ₹19,999/-
Please share itinerary brochure, seat availability, and booking guidelines.`;
  return createWhatsAppUrl(defaultMsg);
}

export function getCustomQuoteWhatsAppUrl(data: {
  name: string;
  phone: string;
  yatra: string;
  travelers: number;
  travelDate?: string;
  vehicle?: string;
  notes?: string;
}): string {
  const msg = `Namaste Purva Yatra! 🙏
I would like a custom quote for our upcoming yatra:
• *Name:* ${data.name}
• *Phone:* ${data.phone}
• *Destination / Yatra:* ${data.yatra}
• *Number of Pilgrims:* ${data.travelers}
• *Preferred Travel Date:* ${data.travelDate || 'Flexible'}
• *Vehicle Preference:* ${data.vehicle || 'Standard AC Cab'}
${data.notes ? `• *Special Note:* ${data.notes}\n` : ''}
Please send me the package options and estimated price. Dhanyawad!`;
  return createWhatsAppUrl(msg);
}
