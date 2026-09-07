import { YatraPackage, Review, RegionInfo } from '../types';
import vishnupadImage from '../assets/images/vishnupad_mandir_gaya_1788464154212.jpg';
import tarapithImage from '../assets/images/tarapith_mandir_temple_1788464397236.jpg';
import kashiVishwanathImage from '../assets/images/kashi_vishwanath_mandir_1788464696292.jpg';
import badrinathImage from '../assets/images/badrinath_mandir_dham_1788464714232.jpg';
import kedarnathImage from '../assets/images/kedarnath_mandir_jyotirlinga_1788464727379.jpg';
import puriJagannathImage from '../assets/images/puri_jagannath_mandir_1788465063206.jpg';
import deogharBaidyanathImage from '../assets/images/deoghar_baidyanath_mandir_1788465083204.jpg';
import kolkataKaliImage from '../assets/images/kolkata_kali_mandir_1788465104852.jpg';
import haridwarRishikeshImage from '../assets/images/haridwar_rishikesh_ganga_aarti_1788465244528.jpg';
import nainitalImage from '../assets/images/nainital_naina_devi_lake_1788465258057.jpg';
import neebKaroriBabaImage from '../assets/images/neeb_karori_baba_kainchi_dham_1788616231742.jpg';
import kasolImage from '../assets/images/kasol_himachal_stranger_1788617022817.jpg';
import darjeelingImage from '../assets/images/darjeeling_tea_himalayas_1788617049205.jpg';
import goaImage from '../assets/images/goa_beach_sunset_stranger_1788617066381.jpg';
import kolkataDurgaPujaImage from '../assets/images/kolkata_durga_puja_pandal_1788709042902.jpg';

export const YATRA_PACKAGES: YatraPackage[] = [
  {
    id: 'kolkata-durga-puja-2026',
    title: 'Kolkata Durga Puja Group Trip 2026',
    hindiTitle: 'कोलकाता दुर्गा पूजा ग्रुप ट्रिप 2026',
    subtitle: 'First Stranger Trip in Bihar • 3 Nights / 4 Days (Gaya Ji / Patna ⇄ Kolkata or Direct Join)',
    location: 'Kolkata, West Bengal (Gaya Ji / Patna ⇄ Kolkata or Direct Join)',
    state: 'West Bengal',
    category: 'Durga Puja Special',
    durgaPujaSpecial: true,
    strangerTripSpecial: true,
    featured: true,
    spotlight: true,
    duration: '4 Days / 3 Nights',
    days: 4,
    nights: 3,
    startingPrice: 8999,
    originalPrice: 11999,
    priceOnEnquiry: false,
    pricingTiers: [
      {
        type: 'Origin',
        name: 'From Destination (Gaya Ji / Patna)',
        hindiName: 'गया जी / पटना से (मुख्य ऑल-इन्क्लूसिव पैकेज)',
        duration: '4 Days / 3 Nights',
        price: 8999,
        priceUnit: 'PER PERSON',
        badge: 'मुख्य ऑल-इन्क्लूसिव पैकेज',
        inclusions: [
          'AC Traveller / Vande Bharat transport from Gaya Ji / Patna & back',
          '3 Nights stay at a premium hotel (2/3/4 sharing basis)',
          'Lunch & Dinner on 3 days; Breakfast on Day 2, Day 3 & Day 4',
          'Explore Newtown areas, Eco Park & Victoria Memorial',
          'Howrah Bridge, Dakshineswar Kali Mandir & Ganga Ghat',
          'Exclusive group dinner in Newtown club on Day 3',
          'Welcome meet & stranger socializing session',
          'Professional on-ground trip coordinator throughout the trip',
          'Safe, curated and like-minded crowd'
        ]
      },
      {
        type: 'Direct',
        name: 'Direct Kolkata Joining',
        hindiName: 'सिर्फ कोलकाता में जॉइन करने वालों के लिए',
        duration: '4 Days / 3 Nights',
        price: 5999,
        priceUnit: 'PER PERSON',
        badge: 'कोलकाता में जॉइनिंग',
        inclusions: [
          '3 Nights stay at premium hotel (2/3/4 sharing basis)',
          'Lunch & Dinner on 3 days; Breakfast on Day 2, Day 3 & Day 4',
          'Local AC transport for sightseeing & pandal hopping',
          'Eco Park, Victoria Memorial, Dakshineswar Mandir & Pandals',
          'Welcome meet & stranger socializing session',
          'Exclusive group dinner in Newtown club on Day 3',
          'Dedicated on-ground trip coordinator & safe curated crowd'
        ]
      },
      {
        type: 'Couple',
        name: 'Couple Package (Private AC Room)',
        hindiName: 'कपल पैकेज (प्राइवेट रूम)',
        duration: '4 Days / 3 Nights',
        price: 19999,
        priceUnit: 'PER COUPLE',
        badge: 'Private Room for 2',
        inclusions: [
          'Guaranteed private AC room for 2 persons (3 nights)',
          'Round-trip AC transport (from Gaya/Patna or Kolkata transit)',
          'Lunch & Dinner on 3 days; Breakfast on Day 2, Day 3 & Day 4',
          'Romantic pandal hopping & group photoshoot',
          'Eco Park, Victoria Memorial, Howrah Bridge & Dakshineswar',
          'Special group dinner in Newtown club on Day 3',
          'Dedicated trip coordinator & 24x7 support'
        ]
      }
    ],
    mealClarity: 'Lunch & Dinner: 3 days • Breakfast: Day 2, Day 3 & Day 4 (Day 1 breakfast is excluded)',
    image: kolkataDurgaPujaImage,
    rating: 4.98,
    reviewsCount: 1420,
    pickupLocation: 'Gaya Ji / Patna (AC Traveller / Vande Bharat) OR Direct Kolkata Hotel/Station',
    tags: [
      'First Stranger Trip in Bihar',
      'Durga Puja 2026',
      'AC Traveller / Vande Bharat',
      '3 Nights Premium Hotel',
      'Eco Park & Victoria Memorial',
      'Dakshineswar Kali Mandir',
      'Newtown Club Group Dinner',
      'Safe Solo & Curated Crowd'
    ],
    sacredSignificance: 'Kolkata Durga Puja is a UNESCO Intangible Cultural Heritage marvel of art, divine Shakti devotion, luminous pandals, and infectious joy. Experience the sacred soul and electric nightlife of the City of Joy with a safe, verified group.',
    overview: 'Join the First Stranger Trip in Bihar for Kolkata Durga Puja 2026! 4 days of Kolkata culture, pandals & group experiences with curated transport from Gaya Ji / Patna by AC Traveller or Vande Bharat (or join directly in Kolkata). Stay in premium hotels, enjoy pandal hopping, Victoria Memorial, Eco Park, Dakshineswar Kali Mandir, and an exclusive Day 3 group dinner in Newtown clubs.',
    itinerary: [
      {
        day: 1,
        title: 'Departure & Welcome',
        description: 'Departure from Gaya Ji / Patna by AC Traveller or Vande Bharat. Meal halt along the journey. Reach Kolkata, hotel check-in and freshen up. Welcome meet and stranger socializing session. Explore Newtown areas and pandals with Purva Yatra cabs.',
        stayLocation: 'Premium Hotel, Kolkata (2/3/4 sharing or Private Room)',
        meals: 'Lunch & Dinner (Day 1 breakfast is excluded)'
      },
      {
        day: 2,
        title: 'City of Joy & Heritage',
        description: 'Breakfast at the hotel. Explore Eco Park and Victoria Memorial. Group lunch and explore Kolkata\'s famous Durga Puja pandals. Dinner and evening leisure.',
        stayLocation: 'Premium Hotel, Kolkata',
        meals: 'Breakfast, Lunch & Dinner'
      },
      {
        day: 3,
        title: 'Iconic Landmarks & Newtown Club Dinner',
        description: 'Breakfast; explore Howrah Bridge, Dakshineswar Kali Mandir and Ganga Ghat; sightseeing and exclusive pandal hopping; special group dinner in Newtown clubs.',
        stayLocation: 'Premium Hotel, Kolkata',
        meals: 'Breakfast, Lunch & Special Newtown Club Dinner'
      },
      {
        day: 4,
        title: 'Group Photoshoot & Return Departure',
        description: 'Breakfast; group photoshoot and memory sharing; checkout and departure for Gaya Ji / Patna with cherished lifetime friendships.',
        stayLocation: 'Return to Gaya Ji / Patna or Onward Journey',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      '01 TRANSPORT: AC Traveller / Vande Bharat transport from Gaya Ji / Patna to Kolkata and back (or local transit for direct joiners)',
      '02 PREMIUM STAY: 3 nights stay at a premium hotel (2/3/4 sharing basis, private room for couples)',
      '03 MEALS: Lunch and dinner on 3 days; breakfast on Day 2, Day 3 and Day 4',
      '04 WELCOME: Welcome meet and stranger socializing sessions',
      '05 ACTIVITIES: Curated evening interaction, bonding activities and ice-breaker events',
      '06 SIGHTSEEING: Eco Park, Dakshineswar Kali Mandir, Victoria Memorial, Newtown and Kolkata pandals',
      '07 GROUP DINNER: Exclusive group dinner in Newtown club on Day 3',
      '08 COORDINATOR: Professional on-ground trip coordinator throughout the trip',
      '09 CROWD: Safe, curated and like-minded crowd'
    ],
    exclusions: [
      'Day 1 breakfast (excluded as per meal clarity)',
      'Personal cafe, bakery, and street food expenses',
      'Optional activities or personal shopping outside group itinerary',
      'Alcohol / personal beverages'
    ],
    termsAndConditions: [
      'Socializing/group trip for meeting new people; no dating or matchmaking guarantee.',
      'Participants must be 18+ with a valid government ID.',
      'Booking is confirmed only after payment and subject to seat availability.',
      'Package pricing: Direct Kolkata Join @ ₹5,999 per person, Ex-Gaya/Patna @ ₹8,999 per person, Couple Package @ ₹19,999 per couple, all-inclusive as per itinerary.',
      'Food inclusion: Lunch & Dinner on 3 days, and Breakfast on Day 2, Day 3 & Day 4. Day 1 breakfast is excluded.',
      'Room allotment on a same-gender, 2/3/4 sharing basis based on availability (private room for couples).',
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
    id: 'gaya-ji',
    title: 'Gaya Ji - Pitru Paksha 2026 Special (Vishnupad & Pind Daan)',
    hindiTitle: 'गया जी - पितृपक्ष 2026 विशेष (विष्णुपद एवं पिंडदान)',
    subtitle: 'Vishnupad Temple, Sita Kund, Falgu River, Akshayavat & Bodh Gaya',
    location: 'Gaya Ji & Bodh Gaya, Bihar',
    state: 'Bihar',
    category: 'Pind Daan Special',
    duration: '2 Days / 1 Night',
    days: 2,
    nights: 1,
    startingPrice: 3999,
    originalPrice: 4999,
    priceOnEnquiry: false,
    pitruPakshaSpecial: {
      dates: '25 September – 10 October 2026',
      durationDays: '16 Days of Sacred Pilgrimage',
      subtext: 'Perform sacred rituals for your ancestors and seek their blessings. Vishnupad Temple & Sita Kund.'
    },
    pricingTiers: [
      {
        type: 'Single',
        name: 'Single Package',
        hindiName: 'सिंगल पैकेज',
        duration: '2 Days / 1 Night',
        price: 4999,
        priceUnit: 'PER PERSON',
        inclusions: [
          'Comfortable Stay',
          'Pick-up & Drop',
          'Pind Daan Assistance',
          'Temple Darshan (Vishnupad & Sita Kund)',
          'Local Sightseeing',
          'Travel Assistance',
          '24x7 Support'
        ]
      },
      {
        type: 'Couple',
        name: 'Couple Package',
        hindiName: 'कपल पैकेज',
        duration: '2 Days / 1 Night',
        price: 9999,
        priceUnit: 'PER COUPLE',
        inclusions: [
          'Comfortable Stay',
          'Pick-up & Drop',
          'Pind Daan Assistance',
          'Temple Darshan (Vishnupad & Sita Kund)',
          'Local Sightseeing',
          'Travel Assistance',
          '24x7 Support'
        ]
      },
      {
        type: 'Group',
        name: 'Group Package',
        hindiName: 'ग्रुप पैकेज',
        duration: '2 Days / 1 Night',
        price: 3999,
        priceUnit: 'PER PERSON',
        minPersons: 'MINIMUM 6 PERSONS',
        inclusions: [
          'Comfortable Stay',
          'Pick-up & Drop',
          'Pind Daan Assistance',
          'Temple Darshan (Vishnupad & Sita Kund)',
          'Local Sightseeing',
          'Travel Assistance',
          '24x7 Support'
        ]
      }
    ],
    image: vishnupadImage,
    featured: true,
    spotlight: true,
    pindDaanSpecial: true,
    rating: 4.98,
    reviewsCount: 1650,
    pickupLocation: 'Gaya Railway Station / Patna Airport / Bodh Gaya',
    tags: ['Pitru Paksha 2026', 'Vishnupad Mandir', 'Sita Kund Pind Daan', 'Akshayavat', '24x7 Support'],
    sacredSignificance: 'Lord Vishnu stamped his right foot on the chest of demon Gayasur at Vishnupad. Performing Shraddh and Pind Daan here during sacred Pitru Paksha (25 Sep – 10 Oct 2026) liberates seven generations of ancestors and bestows profound peace upon descendants.',
    overview: 'Complete sacred Pitru Paksha 2026 pilgrimage to Gaya Ji with dedicated Vedic Teerth Purohit (Panda) facilitation, verified comfortable stay, AC station/airport pickup & drop, and complete assistance at Vishnupad Temple, Falgu River, Sita Kund, and Akshayavat. Travellers from Odisha, West Bengal, Tamil Nadu, Rajasthan, Gujarat, Maharashtra & across India are warmly welcome.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Gaya Ji, Pickup & Falgu Ghat / Sita Kund',
        description: 'Warm welcome by Purva Yatra representative at Gaya Railway Station or Patna Airport. Smooth transfer to verified comfortable AC hotel. Afternoon visit to sacred Falgu river ghats and Sita Kund (The sacred place of Mother Sita). Introductory briefing and sankalp preparation with the family Vedic Purohit.',
        stayLocation: 'Comfortable Hotel near Vishnupad, Gaya',
        meals: 'Dinner (Satvik)'
      },
      {
        day: 2,
        title: 'Pind Daan at Vishnupad Temple & Akshayavat, Bodh Gaya Darshan & Departure',
        description: 'Early morning holy snan and comprehensive Pind Daan, Tarpan & Shraddh rituals at the Lotus Footprint of Lord Vishnu (Vishnupad Mandir) and the eternal banyan tree (Akshayavat) facilitated by authorized Vedic Pandas. Local sightseeing and darshan at Bodh Gaya Mahabodhi Temple. Timely drop at Gaya Station / Patna Airport with sacred prasadam kit.',
        stayLocation: 'Departure',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      'Comfortable Stay in verified hotel near Vishnupad Temple',
      'Pick-up & Drop from Gaya Railway Station / Airport',
      'Pind Daan Assistance with authorized Vedic Panda',
      'Temple Darshan (Vishnupad Temple & Sita Kund)',
      'Local Sightseeing & Bodh Gaya Mahabodhi tour',
      'Dedicated Travel Assistance & family support',
      '24x7 On-Ground & Phone Support'
    ],
    exclusions: [
      'Personal Dakshina / Purohit Dan fees',
      'Pind Daan Samagri cost (arranged at authentic MRP on request)',
      'Train/Flight tickets to and from Gaya/Patna'
    ]
  },
  {
    id: 'tarapith',
    title: 'Tarapith - Maa Tara Shaktipeeth',
    hindiTitle: 'तारापीठ - माँ तारा शक्तिपीठ',
    subtitle: 'Sacred Tantrik Peeth, Bamakhepa Ashram & Bakreshwar',
    location: 'Birbhum, West Bengal',
    state: 'West Bengal',
    category: 'Shaktipeeth',
    duration: '2 Days / 1 Night',
    days: 2,
    nights: 1,
    startingPrice: 0,
    originalPrice: undefined,
    priceOnEnquiry: true,
    image: tarapithImage,
    featured: true,
    rating: 4.8,
    reviewsCount: 890,
    pickupLocation: 'Rampurhat Railway Station / Kolkata',
    tags: ['Maa Tara Mandir', 'Shaktipeeth', 'Bamakhepa Ashram', 'Bakreshwar'],
    sacredSignificance: 'Where the third eye (Tara) of Sati fell. Known as one of the most powerful Siddhapeeths where devotee saint Sadhak Bamakhepa attained divine realization.',
    overview: 'Witness the divine grace of Goddess Tara with hassle-free VIP puja queue facilitation, peaceful stay, and spiritual visit to the Mahasmashan and Bamakhepa shrine.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival Rampurhat & Maa Tara Sandhya Aarti',
        description: 'Pick up from Rampurhat railway station or Kolkata. Transfer to hotel in Tarapith. Afternoon rest. In the evening, special darshan of Maa Tara Devi followed by divine Sandhya Aarti and visit to Sadhak Bamakhepa Ashram.',
        stayLocation: 'Deluxe Hotel, Tarapith',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Morning Bhog Darshan & Bakreshwar Thermal Springs Excursion',
        description: 'Early morning Nirmalya and Sparsha darshan. Post-breakfast, excursion to Bakreshwar (famous Shiva temple and natural therapeutic hot sulphur springs). Return transfer to Rampurhat or Kolkata.',
        stayLocation: 'Departure',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      'Dedicated AC Sedan / SUV for transfers',
      '1 Night accommodation in top-rated family hotel',
      'Puja queue assistance & temple Purohit contact',
      'Daily breakfast & pure satvik meals'
    ],
    exclusions: ['Temple special entry tickets if opting for VIP queue', 'Personal offerings']
  },
  {
    id: 'varanasi',
    title: 'Varanasi - Kashi Vishwanath & Ganga Aarti',
    hindiTitle: 'वाराणसी - काशी विश्वनाथ एवं महाआरती',
    subtitle: 'Kashi Vishwanath Corridor, Dashashwamedh Ghat & Sarnath',
    location: 'Varanasi, Uttar Pradesh',
    state: 'Bihar', // Grouped with nearby pilgrimage corridor
    category: 'Jyotirlinga',
    duration: '3 Days / 2 Nights',
    days: 3,
    nights: 2,
    startingPrice: 0,
    originalPrice: undefined,
    priceOnEnquiry: true,
    image: kashiVishwanathImage,
    featured: true,
    rating: 4.95,
    reviewsCount: 2150,
    pickupLocation: 'Varanasi Cantt Station / Airport',
    tags: ['Kashi Vishwanath', 'Subah-e-Banaras', 'Ganga Boat Ride', 'Sarnath'],
    sacredSignificance: 'The eternal abode of Lord Shiva upon his Trishul. Taking a holy dip at Manikarnika or Dashashwamedh grants Moksha and spiritual liberation.',
    overview: 'Immerse yourself in the eternal city of light. Marvel at the grand evening Ganga Maha Aarti from private reserved boats and experience the grand Kashi Vishwanath temple corridor.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival Varanasi & Spectacular Evening Ganga Aarti',
        description: 'Pickup from Varanasi airport or railway station. Check into hotel. Evening private boat ride along Dashashwamedh, Manikarnika, and Assi Ghats to witness the world-renowned Ganga Maha Aarti.',
        stayLocation: 'Hotel near Godowlia / Ghats, Varanasi',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Kashi Vishwanath Corridor, Annapurna & Kaal Bhairav',
        description: 'Morning Sparsh darshan at Shri Kashi Vishwanath Jyotirlinga, Maa Annapurna Mandir, and Vishalakshi Shaktipeeth. Afternoon visit to Sankat Mochan Hanuman temple and the guardian of Kashi - Baba Kaal Bhairav.',
        stayLocation: 'Hotel near Godowlia / Ghats, Varanasi',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Subah-e-Banaras, Sarnath & Departure',
        description: 'Early morning serene boat ride during sunrise. Post-breakfast, half-day excursion to historic Sarnath where Lord Buddha delivered his first sermon. Drop at Varanasi airport or station.',
        stayLocation: 'Departure',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      'AC private vehicle for transfers & Sarnath tour',
      '2 Nights stay in sanitized AC hotel',
      'Exclusive private evening boat ride for Ganga Aarti',
      'Experienced local Kashi tour guide'
    ],
    exclusions: ['Sugam Darshan VIP ticket passes', 'Personal shopping & rickshaw fees']
  },
  {
    id: 'stranger-trip-kasol',
    title: 'Stranger Trip - Kasol & Parvati Valley Backpacking (Himachal)',
    hindiTitle: 'स्ट्रेंजर ट्रिप - कसोल व पार्वती वैली हिमाचल',
    subtitle: 'Manikaran Hot Springs, Chalal Pine Forest Trail, Tosh Village & Riverside Bonfire',
    location: 'Kasol, Tosh & Parvati Valley, Himachal Pradesh',
    state: 'Himachal Pradesh',
    category: 'Stranger Trip Special',
    strangerTripSpecial: true,
    duration: '4 Days / 3 Nights',
    days: 4,
    nights: 3,
    startingPrice: 0,
    originalPrice: undefined,
    priceOnEnquiry: true,
    image: kasolImage,
    featured: true,
    rating: 4.96,
    reviewsCount: 1240,
    pickupLocation: 'Delhi NCR / Chandigarh Pickup',
    tags: ['Stranger Trip Special', 'Solo Travelers Sangha', 'Kasol Riverside Camp', 'Manikaran Sahib', 'Tosh Village Snowpoint'],
    sacredSignificance: 'Experience the mystical Parvati Valley where Lord Shiva is believed to have meditated for three thousand years. Dip in sacred Manikaran sulphur hot springs and bond with fellow solo travelers under the whispering deodars.',
    overview: 'Escape into the magical mountains of Himachal with an energetic group of solo backpackers. Walk along the crystal-clear Parvati river, explore the fairytale wooden village of Tosh, enjoy cafe hopping in Kasol, and gather around a warm evening bonfire with acoustic guitar jamming.',
    itinerary: [
      {
        day: 1,
        title: 'Overnight Volvo from Delhi to Kasol',
        description: 'Meet your squad at Delhi pickup point. Icebreaker introductions and games on board. Overnight comfortable journey through the Himalayan foothills along the Beas river.',
        stayLocation: 'Luxury AC Volvo',
        meals: 'Snacks'
      },
      {
        day: 2,
        title: 'Kasol Arrival, Riverside Camps & Chalal Nature Walk',
        description: 'Arrive in Kasol. Check in to scenic riverside wooden camps. Afternoon nature hike through fragrant pine forests to Chalal village. Starlit evening bonfire with barbecue and acoustic music by the Parvati river.',
        stayLocation: 'Riverside Wooden Cottages, Kasol',
        meals: 'Dinner'
      },
      {
        day: 3,
        title: 'Manikaran Sahib Gurudwara & Tosh Mountain Village',
        description: 'Morning visit to holy Manikaran Sahib for sacred hot spring snan and langar. Scenic drive to Tosh village with panoramic snow-capped Himalayan peaks. Enjoy hot ginger tea and cafe crawling.',
        stayLocation: 'Riverside Wooden Cottages, Kasol',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Kasol Flea Market, Souvenirs & Departure to Delhi',
        description: 'Explore the vibrant Kasol market for handcrafted woolen shawls and artifacts. Farewell lunch at famous cafes. Board the return Volvo to Delhi with lifelong friends.',
        stayLocation: 'Departure',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      'Delhi to Kasol & back in sanitized AC Volvo / Luxury Urbania',
      '2 Nights cozy riverside camp stay on twin/triple sharing (same gender)',
      'Daily wholesome breakfast & evening bonfire dinners',
      'Guided village hikes to Chalal & Tosh snow viewpoint',
      'Dedicated Trip Captain coordinating icebreakers and 24/7 safety'
    ],
    exclusions: ['Personal cafe and shopping bills', 'Entry tickets or personal expenses']
  },

  {
    id: 'badrinath',
    title: 'Badrinath - Badri Vishal Pilgrimage',
    hindiTitle: 'बद्रीनाथ - श्री बद्री विशाल यात्रा',
    subtitle: 'Tapt Kund, Mana Last Village, Saraswati River & Joshimath',
    location: 'Chamoli, Uttarakhand',
    state: 'Uttarakhand',
    category: 'Himalayan Dham',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    startingPrice: 0,
    originalPrice: undefined,
    priceOnEnquiry: true,
    image: badrinathImage,
    featured: true,
    rating: 4.9,
    reviewsCount: 760,
    pickupLocation: 'Haridwar / Rishikesh / Dehradun',
    tags: ['Chardham Dham', 'Badri Vishal', 'Mana Village', 'Alaknanda'],
    sacredSignificance: 'One of the four supreme Chardham pillars established by Adi Shankaracharya nestled between Nar and Narayana mountain ranges.',
    overview: 'A comfortable mountain pilgrimage from Haridwar to Badrinath with experienced hill drivers, scenic halts at Devprayag & Rudraprayag, and dedicated darshan assistance.',
    itinerary: [
      {
        day: 1,
        title: 'Haridwar / Rishikesh to Joshimath / Pipalkoti',
        description: 'Scenic drive along Ganga and Alaknanda rivers, passing sacred Prayags (Devprayag, Rudraprayag, Karnaprayag). Overnight in Joshimath/Pipalkoti.',
        stayLocation: 'Himalayan Guest House / Hotel',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Joshimath to Shri Badrinath Dham',
        description: 'Ascend to Badrinath (3,133m). Take a holy dip in natural hot sulphur Tapt Kund and enter the sanctum for Badri Vishal darshan and evening Swarna Aarti.',
        stayLocation: 'Hotel near Temple, Badrinath',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Mana Village, Vyas Gufa & Joshimath Return',
        description: 'Visit Mana (India’s first village), Bhim Pul, Saraswati River emergence, and Vyas Gufa where the Mahabharata was scripted. Afternoon return drive to Joshimath.',
        stayLocation: 'Hotel, Joshimath',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Joshimath to Rishikesh',
        description: 'Leisurely downhill drive with stopover at Dhari Devi Temple. Evening arrival in Rishikesh for Ram Jhula walk.',
        stayLocation: 'Hotel, Rishikesh',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 5,
        title: 'Rishikesh / Haridwar Departure',
        description: 'Morning visit to Parmarth Niketan or Triveni Ghat. Departure transfer.',
        stayLocation: 'Departure',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      'Experienced mountain driver with commercial vehicle permit',
      'All toll taxes, parking, and driver night allowances',
      'Clean hotel stays with hot running water',
      'Daily breakfast & wholesome dinners',
      'Chardham biometric registration guidance'
    ],
    exclusions: ['Helicopter tickets if requested', 'Special Puja token fees']
  },
  {
    id: 'kedarnath',
    title: 'Kedarnath - Baba Kedar Jyotirlinga',
    hindiTitle: 'केदारनाथ - बाबा केदार ज्योतिर्लिंग दर्शन',
    subtitle: 'Guptkashi, Sonprayag, Mandakini Valley & Helicopter / Trek',
    location: 'Rudraprayag, Uttarakhand',
    state: 'Uttarakhand',
    category: 'Jyotirlinga',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    startingPrice: 0,
    originalPrice: undefined,
    priceOnEnquiry: true,
    image: kedarnathImage,
    featured: true,
    rating: 4.95,
    reviewsCount: 1120,
    pickupLocation: 'Haridwar / Dehradun',
    tags: ['Highest Jyotirlinga', 'Mandakini River', 'Bhairavnath Mandir', 'Himalayan Darshan'],
    sacredSignificance: 'The foremost of the Panch Kedar and one of the 12 Jyotirlingas of Mahadev situated at 3,584 meters above sea level beneath snow-capped Himalayan peaks.',
    overview: 'Witness the majesty of Baba Kedarnath with complete logistics handled: confirmed stay at base camps, helicopter or mule booking guidance, and round-the-clock coordinator on ground.',
    itinerary: [
      {
        day: 1,
        title: 'Haridwar to Guptkashi / Phata',
        description: 'Morning pickup from Haridwar. Drive via Mandakini river valley through Devprayag and Rudraprayag to Guptkashi/Phata.',
        stayLocation: 'Resort / Hotel in Guptkashi',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Guptkashi to Kedarnath Sanctum (Trek or Helipad)',
        description: 'Early morning transfer to Sonprayag/Gaurikund or Helipad. Ascend to Kedarnath. Check-in at top camp and participate in evening Sandhya Maha Aarti at Kedarnath temple.',
        stayLocation: 'Clean Guest Camp near Kedarnath Mandir',
        meals: 'Dinner'
      },
      {
        day: 3,
        title: 'Kedarnath Morning Darshan & Descent to Guptkashi',
        description: 'Early morning Nirmalya darshan and trek to Bhairavnath Temple for panoramic views. Descend to Gaurikund and transfer back to Guptkashi.',
        stayLocation: 'Hotel in Guptkashi',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Guptkashi to Rishikesh',
        description: 'Drive back to the spiritual yoga capital Rishikesh. Check in and witness Ganga Aarti at Triveni Ghat.',
        stayLocation: 'Hotel in Rishikesh',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 5,
        title: 'Rishikesh Departure',
        description: 'Morning meditation along the banks of Holy Ganga. Drop at Haridwar / Dehradun railway station or airport.',
        stayLocation: 'Departure',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      'Private vehicle for Haridwar-Guptkashi-Rishikesh circuit',
      'Assistance with Kedarnath Helicopter & Yatra registration passes',
      'Pre-booked clean night stay on the top near temple',
      'Experienced emergency medical guide contact'
    ],
    exclusions: ['Helicopter tickets, mule or pony charges', 'Personal porter fees']
  },
  {
    id: 'puri-jagannath',
    title: 'Puri Jagannath Dham & Konark Sun Temple',
    hindiTitle: 'पुरी जगन्नाथ धाम एवं कोणार्क सूर्य मंदिर',
    subtitle: 'Shree Mandir Darshan, Mahaprasad, Golden Beach & Chilika Lake',
    location: 'Puri, Odisha',
    state: 'Odisha',
    category: 'Spiritual Teerth',
    duration: '4 Days / 3 Nights',
    days: 4,
    nights: 3,
    startingPrice: 0,
    originalPrice: undefined,
    priceOnEnquiry: true,
    image: puriJagannathImage,
    featured: true,
    rating: 4.9,
    reviewsCount: 1340,
    pickupLocation: 'Puri Station / Bhubaneswar Airport',
    tags: ['Mahaprabhu Jagannath', 'Konark Sun Temple', 'Ananda Bazar', 'Chilika Lake'],
    sacredSignificance: 'One of the Char Dham sacred pilgrimages where Lord Jagannath, Balabhadra and Subhadra bestow divine grace and the miraculous Mahaprasad.',
    overview: 'Experience the grandeur of Mahaprabhu Jagannath with traditional Sevayat coordination, authentic 56-Bhog Mahaprasad experience, and scenic drives along Marine Drive.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival Bhubaneswar / Puri & Golden Beach Sunset',
        description: 'Pickup from Bhubaneswar airport or Puri station. Check-in at hotel near beach. Evening stroll along Puri Sea Beach and visit to Gundicha temple.',
        stayLocation: 'Hotel near Beach, Puri',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Shri Jagannath Temple Darshan & Mahaprasad',
        description: 'Early morning sanctum darshan with registered Sevayat assistance. Taste divine Chhappan Bhog Mahaprasad at Ananda Bazar. Afternoon visit to Lokanath Shiva temple and Bedi Hanuman.',
        stayLocation: 'Hotel, Puri',
        meals: 'Breakfast & Mahaprasad Dinner'
      },
      {
        day: 3,
        title: 'Konark Sun Temple & Chandrabhaga Beach',
        description: 'Excursion via scenic Marine Drive to UNESCO World Heritage Konark Sun Temple (Black Pagoda) and Chandrabhaga Beach. Evening handicraft shopping in Raghurajpur heritage village.',
        stayLocation: 'Hotel, Puri',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Chilika Lake (Satapada) Dolphins & Bhubaneswar Drop',
        description: 'Morning boat ride in Chilika Lake to spot Irrawaddy dolphins and visit Rajhans Island. Drop at Bhubaneswar railway station or airport with Lingaraj temple stop.',
        stayLocation: 'Departure',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      'AC Cab throughout Puri-Konark-Bhubaneswar circuit',
      '3 Nights stay in premium family hotel',
      'Registered Panda assistance at Jagannath Temple',
      'Chhappan Bhog Mahaprasad experience',
      'Chilika boating tickets included'
    ],
    exclusions: ['Special temple line donations', 'Flight/Train tickets']
  },
  {
    id: 'baidyanath-deoghar',
    title: 'Deoghar - Baba Baidyanath Jyotirlinga',
    hindiTitle: 'देवघर - बाबा बैद्यनाथ धाम ज्योतिर्लिंग',
    subtitle: 'Kamna Linga Darshan, Basukinath & Trikut Pahar',
    location: 'Deoghar, Jharkhand',
    state: 'Jharkhand',
    category: 'Jyotirlinga',
    duration: '2 Days / 1 Night',
    days: 2,
    nights: 1,
    startingPrice: 0,
    originalPrice: undefined,
    priceOnEnquiry: true,
    image: deogharBaidyanathImage,
    featured: true,
    rating: 4.8,
    reviewsCount: 980,
    pickupLocation: 'Jasidih / Deoghar Airport',
    tags: ['Baba Baidyanath', 'Jyotirlinga', 'Basukinath Dham', 'Trikut Ropeway'],
    sacredSignificance: 'One of the twelve sacred Jyotirlingas where Ravana enshrined Lord Shiva. Known as Kamna Linga that fulfills every heartfelt wish of devotees.',
    overview: 'Seamless darshan at Baba Baidyanath temple with VIP coupon facilitation, excursion to Basukinath court, and reliable transfers from Jasidih station or newly opened Deoghar Airport.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival Jasidih / Deoghar & Baba Baidyanath Darshan',
        description: 'Welcome pickup from Jasidih or Deoghar. Hotel check-in. Afternoon VIP queue darshan at Baba Baidyanath Dham and Maa Parvati temple tied with sacred gathbandhan ribbon. Evening Shivganga Aarti.',
        stayLocation: 'Hotel near Tower Chowk, Deoghar',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Basukinath Faujdari Court & Trikut Pahar',
        description: 'Morning drive to Basukinath (45 km) to complete the traditional pilgrimage. Later visit scenic Trikut Pahar and Tapovan caves. Return drop at Jasidih or Deoghar.',
        stayLocation: 'Departure',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      'AC transport with local expert driver',
      '1 Night stay in clean family hotel',
      'Darshan facilitation and Panda guidance',
      'Peda prasadam packet from Ghormara'
    ],
    exclusions: ['VIP Sheeghra Darshanam pass fee', 'Personal pujas']
  },
  {
    id: 'gangasagar-kolkata',
    title: 'Gangasagar & Kolkata Temple Circuit',
    hindiTitle: 'गंगासागर एवं कोलकाता मंदिर यात्रा',
    subtitle: 'Kapil Muni Ashram, Dakshineswar Kali & Kalighat',
    location: 'Kolkata & Sagar Island, West Bengal',
    state: 'West Bengal',
    category: 'Spiritual Teerth',
    duration: '3 Days / 2 Nights',
    days: 3,
    nights: 2,
    startingPrice: 0,
    originalPrice: undefined,
    priceOnEnquiry: true,
    image: kolkataKaliImage,
    featured: false,
    rating: 4.8,
    reviewsCount: 680,
    pickupLocation: 'Howrah / Sealdah / Kolkata Airport',
    tags: ['Kapil Muni Ashram', 'Gangasagar Confluence', 'Dakshineswar', 'Kalighat'],
    sacredSignificance: '"Sab Teerth Baar Baar, Gangasagar Ek Baar". The divine confluence where the holy river Ganga merges into the Bay of Bengal.',
    overview: 'Take the sacred dip at the confluence of Ganga & ocean at Kapil Muni Ashram, followed by blessings at Ramakrishna Paramhansa’s Dakshineswar and Maa Kalighat.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival Kolkata, Kalighat & Dakshineswar',
        description: 'Pickup in Kolkata. Visit holy Kalighat Shaktipeeth, Dakshineswar Kali temple on the banks of Hooghly, and Belur Math.',
        stayLocation: 'Hotel, Kolkata',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Full Day Gangasagar Teerth Snan',
        description: 'Early morning drive to Harwood Point / Lot No 8. Board vessel to Kachuberia, proceed to Sagar Island. Take holy dip at Ganga-Sagar confluence and offer puja at Kapil Muni Ashram. Return to Kolkata.',
        stayLocation: 'Hotel, Kolkata',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Victoria Memorial & Kolkata Departure',
        description: 'Leisurely morning visit to Victoria Memorial or sweet shopping. Drop at Howrah or airport.',
        stayLocation: 'Departure',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      'Private AC Cab for Kolkata and Lot 8 transfers',
      'Both-way ferry tickets for Sagar Island',
      '2 Nights hotel stay in Kolkata',
      'Local assistance for snan and darshan'
    ],
    exclusions: ['Toto / rickshaw at Sagar Island', 'Personal offerings']
  },
  {
    id: 'haridwar-rishikesh',
    title: 'Haridwar & Rishikesh - Divine Ganga & Yoga Teerth',
    hindiTitle: 'हरिद्वार एवं ऋषिकेश - दिव्य गंगा व तपोभूमि यात्रा',
    subtitle: 'Har Ki Pauri Maha Aarti, Mansa Devi Ropeway, Ram Jhula & Triveni Ghat',
    location: 'Haridwar & Rishikesh, Uttarakhand',
    state: 'Uttarakhand',
    category: 'Spiritual Teerth',
    duration: '3 Days / 2 Nights',
    days: 3,
    nights: 2,
    startingPrice: 0,
    originalPrice: undefined,
    priceOnEnquiry: true,
    image: haridwarRishikeshImage,
    featured: true,
    rating: 4.9,
    reviewsCount: 1280,
    pickupLocation: 'Haridwar / Dehradun Railway Station or Jolly Grant Airport',
    tags: ['Har Ki Pauri Aarti', 'Triveni Ghat', 'Ram Jhula & Laxman Jhula', 'Mansa Devi Ropeway', 'Parmarth Niketan'],
    sacredSignificance: 'Haridwar is the gateway to the sacred Himalayas where nectar drops fell at Brahma Kund during Samudra Manthan. Bathing at Har Ki Pauri and witnessing the divine evening Maha Aarti liberates the soul. Rishikesh is the revered abode of sages on Mother Ganga.',
    overview: 'Experience the divine spiritual vibration of Haridwar and Rishikesh with pre-arranged ghat access, reserved seating for Har Ki Pauri Ganga Aarti, Mansa Devi & Chandi Devi ropeway tickets, and tranquil ashram visits in Rishikesh.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival Haridwar, Mansa Devi & Har Ki Pauri Maha Aarti',
        description: 'Warm reception at Haridwar / Dehradun station. Transfer to your riverside hotel. Afternoon cable car ride to Maa Mansa Devi and Chandi Devi hill temples. In the evening, witness the soul-stirring world-famous Ganga Maha Aarti at Har Ki Pauri with thousands of floating earthen lamps.',
        stayLocation: 'Comfort Hotel near Ganga Ghat, Haridwar',
        meals: 'Dinner (Satvik)'
      },
      {
        day: 2,
        title: 'Holy Ganga Snan & Rishikesh Ashram Circuit',
        description: 'Early morning sacred holy dip at Har Ki Pauri ghats. After breakfast, scenic drive to Rishikesh. Walk across the iconic Ram Jhula & Janki Jhula, visit historic Geeta Bhawan, Swarg Ashram, and attend the devotional sunset Ganga Aarti at Parmarth Niketan / Triveni Ghat.',
        stayLocation: 'Riverside Resort / Hotel, Rishikesh or Haridwar',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Shantikunj Gayatri Teerth & Departure',
        description: 'Morning visit to Shantikunj (world headquarters of Gayatri Pariwar) and Bharat Mata Mandir. Time for authentic Ayurvedic souvenir shopping. Timely drop at Haridwar / Dehradun Railway Station or Jolly Grant Airport with Ganga Jal Prasad kit.',
        stayLocation: 'Departure',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      'Sanitized private AC vehicle for all transfers and sightseeing between Haridwar & Rishikesh',
      '2 Nights verified stay in clean, family-friendly hotel near Ganga',
      'Mansa Devi & Chandi Devi ropeway (Udan Khatola) tickets',
      'Dedicated local guide for Har Ki Pauri evening Aarti guidance',
      'Daily hygienic breakfast and pure vegetarian satvik dinners',
      'Complimentary Purva Yatra sealed holy Ganga Jal container & Prasad kit'
    ],
    exclusions: ['Personal puja samagri', 'Adventure activities like river rafting or bungee']
  },
  {
    id: 'nainital-naina-devi',
    title: 'Nainital & Kainchi Dham - Neeb Karori Baba Mandir & Naina Devi',
    hindiTitle: 'नैनीताल एवं कैंची धाम - नीब करौरी बाबा आश्रम व माँ नैना देवी',
    subtitle: 'Neeb Karori Baba Mandir, Kainchi Dham Ashram & Sacred Naini Lake',
    location: 'Nainital & Kainchi Dham, Uttarakhand',
    state: 'Uttarakhand',
    category: 'Spiritual Teerth',
    duration: '3 Days / 2 Nights',
    days: 3,
    nights: 2,
    startingPrice: 0,
    originalPrice: undefined,
    priceOnEnquiry: true,
    image: neebKaroriBabaImage,
    featured: true,
    rating: 4.95,
    reviewsCount: 1140,
    pickupLocation: 'Kathgodam Railway Station / Pantnagar Airport / Delhi',
    tags: ['Neeb Karori Baba Mandir', 'Kainchi Dham Ashram', 'Maa Naina Devi', 'Naini Lake Parikrama', 'Mukteshwar Mahadev'],
    sacredSignificance: 'Kainchi Dham is the internationally revered tapobhumi and mandir of Param Pujya Neeb Karori Baba (Maharaj-ji), drawing millions of seekers and devotees for spiritual solace and miracles. Nainital also enshrines the Maa Naina Devi Shaktipeeth on the emerald lake shore.',
    overview: 'A profoundly blessed pilgrimage to the divine Kainchi Dham Mandir of Param Pujya Neeb Karori Baba along with the blessings of Maa Naina Devi Shaktipeeth and Mukteshwar Mahadev amidst the tranquil pine hills of Kumaon.',
    itinerary: [
      {
        day: 1,
        title: 'Kathgodam to Nainital & Maa Naina Devi Darshan',
        description: 'Pickup from Kathgodam Railway Station or Pantnagar Airport. Drive through the picturesque Kumaon foothills to Nainital. Check in to your hotel overlooking the hills. Afternoon darshan at Maa Naina Devi Shaktipeeth on the northern shore of Naini Lake followed by a serene rowing boat parikrama.',
        stayLocation: 'Comfort Hill Hotel, Nainital',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Pilgrimage to Kainchi Dham (Neem Karoli Baba Ashram)',
        description: 'Morning drive along scenic mountain curves to the sacred Kainchi Dham Ashram of revered Neem Karoli Baba. Participate in morning prayers, Hanuman Chalisa recitations, and seek divine blessings. Afternoon excursion to Mukteshwar Mahadev (350-year-old Shiva temple) with majestic views of Trishul & Nanda Devi peaks.',
        stayLocation: 'Comfort Hill Hotel, Nainital',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Hanuman Garhi, Himalayan Viewpoint & Departure',
        description: 'Early morning visit to Hanuman Garhi temple offering panoramic sunrise and valley views. Brief shopping for local pine handicrafts and famous Bal Mithai sweets. Timely transfer to Kathgodam Railway Station or Pantnagar Airport with cherished divine memories.',
        stayLocation: 'Departure',
        meals: 'Breakfast'
      }
    ],
    inclusions: [
      'Private sanitized AC cab from Kathgodam / Pantnagar for the full tour',
      '2 Nights accommodation in verified comfortable hotel in Nainital',
      'Scenic Naini Lake boat ride ticket near Naina Devi temple',
      'Special coordination for darshan at Kainchi Dham Ashram',
      'Daily hygienic breakfast and pure vegetarian dinner'
    ],
    exclusions: ['Pony / horse ride charges', 'Personal photography fees']
  }
];

export const REGIONS_DATA: RegionInfo[] = [
  {
    id: 'bihar',
    name: 'Bihar',
    hindiName: 'बिहार',
    description: 'The sacred land of enlightenment and liberation. Home to Vishnupad Pind Daan, Bodh Gaya, ancient Nalanda, and Rajgir.',
    keyTemples: ['Gaya Ji Vishnupad Mandir', 'Maa Mangalagauri Shaktipeeth', 'Mahabodhi Temple Bodh Gaya', 'Rajgir Vishwa Shanti Stupa', 'Takht Sri Patna Sahib'],
    bannerImage: vishnupadImage,
    bestTime: 'September to March (Special Pitru Paksha season)'
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    hindiName: 'पश्चिम बंगाल',
    description: 'The divine citadel of Shakti and devotion. From fiery Tarapith and Kalighat to peaceful Gangasagar and Mayapur ISKCON.',
    keyTemples: ['Tarapith Maa Tara Temple', 'Dakshineswar Kali Mandir', 'Kalighat Shaktipeeth', 'Gangasagar Kapil Muni Ashram', 'Belur Math'],
    bannerImage: tarapithImage,
    bestTime: 'October to April'
  },
  {
    id: 'jharkhand',
    name: 'Jharkhand',
    hindiName: 'झारखण्ड',
    description: 'Abode of Mahadev and Siddhapeeths amidst lush Sal forests. Center of Baba Baidyanath Jyotirlinga and Parasnath Jain Teerth.',
    keyTemples: ['Baba Baidyanath Jyotirlinga Deoghar', 'Basukinath Dham', 'Maa Chhinnamastika Rajrappa', 'Shikharji Parasnath', 'Bhadrakali Itkhori'],
    bannerImage: deogharBaidyanathImage,
    bestTime: 'All Year Round (Special Shravan & Winter months)'
  },
  {
    id: 'odisha',
    name: 'Odisha',
    hindiName: 'ओडिशा',
    description: 'The supreme abode of the Lord of the Universe. Pristine beaches, monumental stone architecture, and sacred 56 Bhog.',
    keyTemples: ['Shree Jagannath Temple Puri', 'Konark Sun Temple', 'Bhubaneswar Lingaraj Temple', 'Mukteshwar Mandir', 'Gundicha Mandir'],
    bannerImage: puriJagannathImage,
    bestTime: 'October to March (Rath Yatra in July)'
  },
  {
    id: 'himalayas',
    name: 'Uttarakhand & Himalayas',
    hindiName: 'उत्तराखंड एवं हिमालय',
    description: 'Devbhoomi — the land where gods reside. Towering peaks, glacial holy rivers, and the supreme shrines of Badri, Kedar, Haridwar and sacred Kumaon.',
    keyTemples: ['Shri Badrinath Dham', 'Kedarnath Jyotirlinga', 'Haridwar Har Ki Pauri', 'Rishikesh Triveni Ghat', 'Maa Naina Devi (Nainital)', 'Kainchi Dham (Neem Karoli Baba)'],
    bannerImage: kedarnathImage,
    bestTime: 'All Year Round (May to June & Sep to Nov for High Altitudes; All Year for Haridwar & Nainital)'
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: '1',
    name: 'Rameshwar Prasad & Sunita Agarwal',
    location: 'Kolkata, West Bengal',
    yatraName: 'Gaya Ji Pind Daan & Bodh Gaya',
    rating: 5,
    date: 'August 2026',
    comment: 'Purva Yatra made our dream of taking our 78-year-old father to Gaya Ji for Pitru Paksha so easy. The Vedic panda was polite, vehicle was waiting at the station, and hotel was just 5 minutes walk from Vishnupad. Truly travel with faith, return with blessings!',
    verified: true
  },
  {
    id: '2',
    name: 'Dr. Prabhat Mishra & Family',
    location: 'Patna, Bihar',
    yatraName: 'Varanasi Kashi Vishwanath Special',
    rating: 5,
    date: 'July 2026',
    comment: 'The private boat arranged for Ganga Aarti at Dashashwamedh Ghat was the highlight of our lives! Clean AC Innova with a very cultured driver. Zero hidden charges. Highly recommended for families.',
    verified: true
  },
  {
    id: '3',
    name: 'Ananya & Bikash Chakraborty',
    location: 'Durgapur, West Bengal',
    yatraName: 'Tarapith & Bakreshwar Weekend',
    rating: 5,
    date: 'August 2026',
    comment: 'Hassle-free darshan of Maa Tara without getting stuck in the crowd. Hotel food was authentic Bengali satvik. Will book Baidyanath Dham with Purva Yatra next month!',
    verified: true
  },
  {
    id: '4',
    name: 'Deepak & Shweta Kulkarni',
    location: 'Ranchi, Jharkhand',
    yatraName: 'Puri Jagannath & Konark Tour',
    rating: 5,
    date: 'June 2026',
    comment: 'The Sevayat at Shree Mandir was arranged by Purva Yatra and guided us with immense reverence right into the sanctum. Mahaprasad arrangement was divine. Thank you team Purva Yatra!',
    verified: true
  }
];

export const WHY_US_PILLARS = [
  {
    id: 'stay',
    title: 'Comfortable Stay',
    hindiTitle: 'सुविधाजनक एवं स्वच्छ आवास',
    description: 'Pre-inspected hygienic hotels and family-friendly dharamshalas situated within walking distance of temple sanctums.',
    icon: 'Hotel',
    badge: 'Clean & Verified'
  },
  {
    id: 'transport',
    title: 'Safe Transport',
    hindiTitle: 'सुरक्षित एवं आरामदायक वाहन',
    description: 'Sanitized private AC cabs (Dzire, Innova, Tempo Traveller) driven by experienced, polite, non-smoking local chauffeurs.',
    icon: 'Car',
    badge: 'GPS Monitored'
  },
  {
    id: 'support',
    title: 'Experienced Support',
    hindiTitle: 'प्रमाणित पुरोहित एवं 24/7 सहायता',
    description: 'On-ground tour coordinators and authorized Vedic Teerth Purohits to ensure peaceful, authentic pujas and rituals without exploitation.',
    icon: 'ShieldCheck',
    badge: 'Certified Pandas'
  },
  {
    id: 'family',
    title: 'Family & Group Packages',
    hindiTitle: 'परिवार एवं वरिष्ठ नागरिक विशेष',
    description: 'Specially paced itineraries with wheelchair support, ground-floor room priority, and pure Satvik vegetarian dining.',
    icon: 'Users',
    badge: 'Senior Citizen Friendly'
  },
  {
    id: 'custom',
    title: 'Customized Trips',
    hindiTitle: 'अपनी पसंद का यात्रा प्लान',
    description: 'Custom travel plans tailored to your arrival station, budget, number of family members, and specific ritual requirements.',
    icon: 'Compass',
    badge: '100% Flexible'
  },
  {
    id: 'regional',
    title: 'East India & Himalayan Focus',
    hindiTitle: 'पूर्वी भारत एवं हिमालय में विशेषज्ञता',
    description: 'Decades of deep on-ground roots across Bihar, West Bengal, Jharkhand, Odisha, and Uttarakhand pilgrimages.',
    icon: 'Sparkles',
    badge: 'Regional Pioneers'
  }
];
