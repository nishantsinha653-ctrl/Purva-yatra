import { StrangerTripBatch } from '../types';
import kasolImage from '../assets/images/kasol_himachal_stranger_1788617022817.jpg';
import kolkataDurgaPujaImage from '../assets/images/kolkata_durga_puja_pandal_1788709042902.jpg';

export const STRANGER_TRIPS_DATA: StrangerTripBatch[] = [
  {
    id: 'kolkata-durga-puja-stranger',
    title: 'First Stranger Trip in Bihar - Kolkata Durga Puja Group Trip 2026',
    hindiTitle: 'बिहार का पहला स्ट्रेंजर ट्रिप - कोलकाता दुर्गा पूजा 2026',
    subtitle: 'Gaya Ji / Patna → Kolkata → Gaya Ji / Patna • 3 Nights / 4 Days of Culture, Pandals & Community',
    destination: 'Kolkata, West Bengal (From Gaya Ji / Patna or Direct Kolkata)',
    dates: 'Durga Puja 2026 Special Batch (3 Nights / 4 Days)',
    duration: '4 Days / 3 Nights',
    price: 8999,
    originalPrice: 11999,
    totalSeats: 20,
    seatsBooked: 14,
    image: kolkataDurgaPujaImage,
    vibe: 'UNESCO Heritage Pandals, Dhak Beats, Eco Park, Victoria Memorial & Newtown Club Dinner',
    tripCaptain: 'Purva Yatra Trip Lead & Kolkata Cultural Coordinators',
    ageGroup: '18+ Years (Solo Seekers, Friends & Couples)',
    category: 'Durga Puja & Heritage',
    route: 'GAYA JI / PATNA → KOLKATA → GAYA JI / PATNA',
    mealClarity: 'Lunch & Dinner: 3 days • Breakfast: Day 2, Day 3 & Day 4 (Day 1 breakfast is excluded)',
    pricingTiers: [
      {
        type: 'origin',
        name: 'From Gaya Ji / Patna (Ex-Bihar)',
        hindiName: 'गया जी / पटना से (मुख्य ऑल-इन्क्लूसिव पैकेज)',
        price: 8999,
        unit: 'PER PERSON',
        desc: 'All-inclusive round-trip transport from Gaya/Patna by AC Traveller or Vande Bharat, 3 nights hotel stay, all meals, pandal hopping & Newtown club dinner.',
        badge: 'मुख्य ऑल-इन्क्लूसिव पैकेज'
      },
      {
        type: 'direct',
        name: 'Direct Kolkata Joining',
        hindiName: 'सिर्फ कोलकाता में जॉइन करने वालों के लिए',
        price: 5999,
        unit: 'PER PERSON',
        desc: 'यह दर केवल उन यात्रियों के लिए है जो सीधे कोलकाता में ही उपस्थित होकर ट्रिप जॉइन करेंगे। इसमें 3 रातें होटल स्टे, भोजन, लोकल पंडाल कैब व क्लब डिनर शामिल है।',
        badge: 'कोलकाता में जॉइनिंग'
      },
      {
        type: 'couple',
        name: 'Couple Special Package',
        hindiName: 'कपल स्पेशल पैकेज (प्राइवेट एसी रूम)',
        price: 19999,
        unit: 'PER COUPLE',
        desc: '2 यात्रियों के लिए गारंटीड प्राइवेट एसी डबल रूम (3 रातें), गया/पटना से यात्रा, रोमांटिक पंडाल भ्रमण, सभी भोजन व स्पेशल क्लब डिनर।',
        badge: 'प्राइवेट रूम (2 व्यक्ति)'
      }
    ],
    highlights: [
      'First official curated Stranger Group Trip organized from Bihar for Kolkata Durga Puja',
      'Travel together from Gaya Ji / Patna in comfortable AC Traveller or Vande Bharat',
      '3 Nights premium hotel accommodation (verified same-gender 2/3/4 sharing; private room for couple)',
      'Famous Pandal Hopping: Newtown, Eco Park, Santosh Mitra Square & historic heritage pandals',
      'Iconic Landmark Sightseeing: Victoria Memorial, Howrah Bridge, Dakshineswar Kali Mandir & Ganga Ghat',
      'Special grand group dinner in Newtown club on Day 3',
      'Welcome meet, stranger socializing icebreakers, group photoshoot & memory sharing',
      'Professional on-ground trip coordinator throughout the trip with safe, curated crowd'
    ],
    inclusions: [
      '01 TRANSPORT: AC Traveller / Vande Bharat transport from Gaya Ji / Patna to Kolkata and back',
      '02 PREMIUM STAY: 3 nights stay at a premium hotel (2/3/4 sharing basis, private room for couples)',
      '03 MEALS: Lunch and dinner on 3 days; breakfast on Day 2, Day 3 and Day 4',
      '04 WELCOME: Welcome meet and stranger socializing sessions',
      '05 ACTIVITIES: Curated evening interaction, bonding activities and ice-breaker events',
      '06 SIGHTSEEING: Eco Park, Dakshineswar Kali Mandir, Victoria Memorial, Newtown and Kolkata pandals',
      '07 GROUP DINNER: Exclusive group dinner in Newtown club on Day 3',
      '08 COORDINATOR: Professional on-ground trip coordinator throughout the trip',
      '09 CROWD: Safe, curated and like-minded crowd'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Departure & Welcome',
        desc: 'Departure from Gaya Ji / Patna by AC Traveller or Vande Bharat. Meal halt along the journey. Reach Kolkata, hotel check-in and freshen up. Welcome meet and stranger socializing session. Explore Newtown areas and pandals with Purva Yatra cabs.'
      },
      {
        day: 2,
        title: 'City of Joy & Heritage',
        desc: 'Breakfast at the hotel. Explore Eco Park and Victoria Memorial. Group lunch and explore Kolkata\'s famous Durga Puja pandals. Dinner and evening leisure.'
      },
      {
        day: 3,
        title: 'Iconic Landmarks + Newtown Club Dinner',
        desc: 'Breakfast; explore Howrah Bridge, Dakshineswar Kali Mandir and Ganga Ghat; sightseeing and exclusive pandal hopping; special group dinner in Newtown clubs.'
      },
      {
        day: 4,
        title: 'Group Photoshoot & Return Departure',
        desc: 'Breakfast; group photoshoot and memory sharing; checkout and departure for Gaya Ji / Patna.'
      }
    ],
    terms: [
      'Socializing/group trip for meeting new people; no dating or matchmaking guarantee.',
      'Participants must be 18+ with a valid government ID.',
      'Booking is confirmed only after payment and subject to seat availability.',
      'Package starts from ₹5,999 (Direct Kolkata) / ₹8,999 (Ex-Gaya/Patna) / ₹19,999 (Couple), all-inclusive as per itinerary.',
      'Food inclusion: Lunch & Dinner on 3 days, and Breakfast on Day 2, Day 3 & Day 4. Day 1 breakfast is excluded.',
      'Room allotment on a same-gender, 2/3/4 sharing basis based on availability (private room for couple package).',
      'Respectful behavior is mandatory; harassment, abuse, or creating discomfort leads to immediate removal.',
      'Organizers only provide a platform for interaction; personal disputes are participants\' own responsibility.',
      'Participants are responsible for their own safety, belongings, and conduct.',
      'Alcohol/drug-related nuisance or violence leads to immediate removal without refund.',
      'Property or transport damage must be paid for by the responsible participant.',
      'Strict adherence to timings is required; delays/no-shows may miss transport/meals without refund.',
      'Itinerary may change due to weather, traffic, or logistics.',
      'Optional activities are at participants\' own cost and risk.',
      'No refund for unused services, missed meals, or no-shows.',
      'Photos/videos may be taken during the trip for promotional purposes.',
      'Booking confirms acceptance of all Terms & Conditions.'
    ]
  },
  {
    id: 'kasol-himachal-stranger',
    title: 'Stranger Trip - Kasol & Parvati Valley (Himachal)',
    hindiTitle: 'स्ट्रेंजर ट्रिप - कसोल व पार्वती वैली (हिमाचल सोलो ट्राइब)',
    subtitle: 'Manikaran Hot Springs, Chalal Pine Trail, Tosh Village & Riverside Acoustic Bonfire',
    destination: 'Kasol & Parvati Valley, Himachal',
    dates: 'Next Departure: 26 Sep – 29 Sep',
    duration: '4 Days / 3 Nights',
    price: 6499,
    originalPrice: 8200,
    totalSeats: 14,
    seatsBooked: 10,
    image: kasolImage,
    vibe: 'Riverside Camps, Pine Forest Walks & Starlit Acoustic Bonfires',
    tripCaptain: 'Rohan Sharma (Himachal Trek Leader & Guitarist)',
    ageGroup: '20 - 35 years',
    category: 'Himachal & Parvati',
    highlights: [
      'Scenic riverside camp stay by the turquoise Parvati River in Kasol',
      'Pine forest nature trek to fairy-tale Chalal village & local cafe hopping',
      'Holy snan at natural sulphur hot springs of Manikaran Sahib & community langar',
      'Excursion to snow-facing wooden village of Tosh with panoramic mountain vistas',
      'Nightly acoustic guitar jamming, stargazing bonfire & fun icebreakers'
    ],
    inclusions: [
      'Delhi to Kasol & back in comfortable AC Volvo / Urbania',
      '2 Nights cozy riverside wooden camp / cottage stay (same-gender twin sharing)',
      'Daily wholesome mountain breakfast & delicious bonfire dinners',
      'Guided nature walks to Chalal and Tosh village snow viewpoints',
      'Dedicated Trip Captain & female co-host for 100% solo safety'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Kasol Scenic Journey',
        desc: 'Meet your squad at Delhi pickup point. Icebreakers and games aboard comfortable Volvo as we ascend the Himalayan foothills along the Beas River.'
      },
      {
        day: 2,
        title: 'Kasol Riverside Check-in & Chalal Pine Trail',
        desc: 'Arrive in Kasol. Check in to scenic riverside camps. Afternoon trek through whispering pine woods to Chalal. Evening bonfire with acoustic guitar by the river.'
      },
      {
        day: 3,
        title: 'Manikaran Sahib Springs & Tosh Mountain Village',
        desc: 'Morning holy dip in sacred hot springs of Manikaran Sahib Gurudwara. Scenic drive to Tosh village for cafe hopping and breathtaking mountain vistas.'
      },
      {
        day: 4,
        title: 'Kasol Flea Market, Souvenirs & Return Volvo',
        desc: 'Explore the vibrant local markets for Tibetan handicrafts and woolen shawls. Group farewell brunch before boarding evening Volvo back to Delhi.'
      }
    ]
  }
];

