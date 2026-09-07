export interface YatraPackage {
  id: string;
  title: string;
  hindiTitle?: string;
  subtitle: string;
  location: string;
  state: 'Bihar' | 'West Bengal' | 'Jharkhand' | 'Odisha' | 'Uttarakhand' | 'Assam' | 'Himachal Pradesh' | 'Goa';
  category: 'Spiritual Teerth' | 'Shaktipeeth' | 'Jyotirlinga' | 'Pind Daan Special' | 'Himalayan Dham' | 'Stranger Trip Special' | 'Durga Puja Special';
  duration: string;
  nights: number;
  days: number;
  startingPrice: number;
  originalPrice?: number;
  priceOnEnquiry?: boolean;
  pricingTiers?: {
    type: 'Single' | 'Couple' | 'Group' | 'Direct' | 'Origin' | string;
    name: string;
    hindiName?: string;
    duration: string;
    price: number;
    priceUnit: string; // e.g. 'PER PERSON', 'PER COUPLE'
    minPersons?: string;
    badge?: string;
    inclusions: string[];
  }[];
  pitruPakshaSpecial?: {
    dates: string;
    durationDays: string;
    subtext: string;
  };
  mealClarity?: string;
  termsAndConditions?: string[];
  image: string;
  featured?: boolean;
  spotlight?: boolean;
  pindDaanSpecial?: boolean;
  strangerTripSpecial?: boolean;
  durgaPujaSpecial?: boolean;
  rating: number;
  reviewsCount: number;
  pickupLocation: string;
  tags: string[];
  overview: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
    stayLocation: string;
    meals?: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  sacredSignificance: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  yatraName: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
  verified: boolean;
}

export interface RegionInfo {
  id: string;
  name: string;
  hindiName: string;
  description: string;
  keyTemples: string[];
  bannerImage: string;
  bestTime: string;
}

export interface InquiryFormData {
  fullName: string;
  phone: string;
  email?: string;
  selectedYatra: string;
  travelersCount: number;
  travelDate: string;
  vehicleType: 'Sedan (Dzire)' | 'SUV (Innova)' | 'Tempo Traveller' | 'Bus/Coach';
  specialRequirements: string;
  needPandit: boolean;
  seniorCitizenAssistance: boolean;
}

export interface StrangerTripBatch {
  id: string;
  title: string;
  hindiTitle?: string;
  subtitle: string;
  destination: string;
  dates: string;
  duration: string;
  price: number;
  originalPrice: number;
  totalSeats: number;
  seatsBooked: number;
  image: string;
  vibe: string;
  tripCaptain: string;
  ageGroup: string;
  highlights: string[];
  inclusions: string[];
  itinerary: { day: number; title: string; desc: string }[];
  category: 'Himachal & Parvati' | 'Northeast & Hills' | 'Coastal & Beach' | 'Teerth & Heritage' | 'Riverside & Camping' | 'Mystic & Ashram' | 'Heritage & Ghats' | 'Himalayan Trek' | 'Durga Puja & Heritage';
  route?: string;
  mealClarity?: string;
  terms?: string[];
  pricingTiers?: {
    type: 'direct' | 'origin' | 'couple' | 'single' | 'group' | string;
    name: string;
    hindiName?: string;
    price: number;
    unit: string;
    desc: string;
    badge?: string;
  }[];
}

export interface UserProfile {
  email: string;
  name?: string;
  phone?: string;
  city?: string;
  loggedInAt: string;
  savedYatras?: string[];
}

export interface OtpSession {
  email: string;
  name?: string;
  otp: string;
  expiresAt: number;
}

export interface BookingTarget {
  packageTitle: string;
  packageId?: string;
  duration?: string;
  basePrice?: number;
  image?: string;
  defaultTier?: 'direct' | 'origin' | 'couple' | 'single' | 'group' | 'standard' | 'deluxe' | string;
  defaultGuests?: number;
}

export interface BookingRecord {
  id: string;
  yatraId?: string;
  yatraTitle: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  travelDate: string;
  guestsCount: number;
  tier?: string;
  unitPrice: number;
  totalEstimatedAmount: number;
  pickupPoint: string;
  needPandit: boolean;
  seniorAssistance: boolean;
  satvikMeals: boolean;
  specialRequests?: string;
  status: 'Confirmed' | 'Reviewing';
  createdAt: string;
}
