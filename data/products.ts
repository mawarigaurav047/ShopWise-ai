import { Product } from '../types/index';

export const products: Product[] = [
  // ─── ACs ────────────────────────────────────────────────────────────────────
  {
    id: 'samsung-ac-1-5ton',
    name: 'Samsung WindFree 1.5 Ton 5-Star Inverter Split AC',
    brand: 'Samsung',
    category: 'acs',
    price: 42990,
    originalPrice: 55000,
    discount: 22,
    rating: 4.5,
    reviewCount: 2847,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b4123a21?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1631549916768-4119b4123a21?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606115757624-6d1b89a4d5e3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'The Samsung WindFree™ 1.5 Ton 5-Star Inverter Split AC provides silent, draft-free cooling via 23,000 micro air holes. Its Triple Inverter+ compressor dynamically adjusts capacity for up to 77% energy savings compared to non-inverter models. Perfect for medium-sized bedrooms.',
    specs: [
      { label: 'Capacity', value: '1.5 Ton' },
      { label: 'Star Rating', value: '5 Star BEE 2024' },
      { label: 'Inverter', value: 'Triple Inverter+' },
      { label: 'Cooling Capacity', value: '5.00 kW' },
      { label: 'Annual Energy', value: '826.44 units' },
      { label: 'Noise Level', value: '19 dB (Indoor)' },
      { label: 'ISEER Value', value: '5.00' },
      { label: 'Refrigerant', value: 'R32 (Eco-friendly)' },
      { label: 'Wi-Fi Control', value: 'Yes (SmartThings App)' },
      { label: 'Auto Clean', value: 'Yes' },
      { label: 'Air Purification', value: 'HEPA-like Filter, Dehumidifier' },
      { label: 'Warranty', value: '1 Year Comprehensive + 5 Year Compressor' },
    ],
    aiMatch: {
      score: 94,
      whyMatches:
        'This Samsung AC perfectly aligns with your preference for energy efficiency and low noise. The 5-Star BEE rating translates to ~₹4,800 electricity savings annually compared to a 3-Star model. The WindFree™ technology eliminates direct cold air drafts, ideal for children\'s rooms or users sensitive to cold air.',
      keyStrengths: [
        '5-Star BEE 2024 certified — up to 77% energy savings vs non-inverter',
        'WindFree™ cooling: 23,000 micro holes for draft-free, whisper-quiet comfort',
        'R32 eco-friendly refrigerant with zero Ozone Depletion Potential',
        'SmartThings Wi-Fi control — schedule and monitor from anywhere',
        'Auto-Clean function prevents bacteria build-up and mold on evaporator',
      ],
      potentialDrawback:
        'The WindFree™ mode is best for maintaining temperature — initial cooling to target temp may take slightly longer (3–5 min more) versus standard direct-blast ACs.',
      efficiencyBadge: '5 Star BEE',
    },
    stock: 34,
    isTrending: true,
    isFeatured: true,
    tags: ['inverter', 'wifi', 'energy-efficient', 'split-ac'],
  },

  // ─── Laptops ─────────────────────────────────────────────────────────────────
  {
    id: 'apple-macbook-air-m2',
    name: 'Apple MacBook Air 13" M2 Chip (2023)',
    brand: 'Apple',
    category: 'laptops',
    price: 99900,
    originalPrice: 119900,
    discount: 17,
    rating: 4.8,
    reviewCount: 5621,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496181130204-7552cc14f1d0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'The MacBook Air powered by Apple Silicon M2 is the world\'s best consumer laptop for battery life and performance-per-watt. With a fanless design, the 13.6" Liquid Retina display, and up to 18 hours of battery life, it\'s ideal for students, creators, and professionals who demand a silent, thin companion.',
    specs: [
      { label: 'Chip', value: 'Apple M2 (8-Core CPU, 10-Core GPU)' },
      { label: 'RAM', value: '8 GB Unified Memory' },
      { label: 'Storage', value: '512 GB SSD' },
      { label: 'Display', value: '13.6" Liquid Retina (2560×1664, 500 nits)' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Weight', value: '1.24 kg' },
      { label: 'Ports', value: '2× USB-C (Thunderbolt 4), MagSafe 3' },
      { label: 'Camera', value: '1080p FaceTime HD' },
      { label: 'Audio', value: '4-Speaker Sound System, 3-Mic Array' },
      { label: 'OS', value: 'macOS Sonoma' },
      { label: 'Color Options', value: 'Midnight, Starlight, Space Gray, Silver' },
      { label: 'Warranty', value: '1 Year Apple Warranty (AppleCare+ available)' },
    ],
    aiMatch: {
      score: 97,
      whyMatches:
        'For users prioritizing premium build quality, battery longevity, and content creation, the M2 MacBook Air is our highest-confidence recommendation. The M2 neural engine accelerates AI/ML workloads and photo/video editing 40% faster than Intel equivalents while consuming a fraction of the power.',
      keyStrengths: [
        '18-hour battery — outlasts any Windows laptop in its class',
        'Fanless silent design — zero throttling during normal workloads',
        'M2 chip outperforms most Core i7 laptops in CPU & GPU benchmarks',
        'macOS ecosystem — seamless iPhone/iPad handoff, AirDrop, Continuity Camera',
        '500 nit Liquid Retina display with True Tone and P3 wide color gamut',
      ],
      potentialDrawback:
        'Only 2 USB-C ports (no HDMI or SD slot without a dongle). Base 8 GB RAM may feel constrained when running multiple heavy apps simultaneously — 16 GB upgrade recommended for power users.',
      efficiencyBadge: 'Energy Saver Certified',
    },
    stock: 22,
    isTrending: true,
    isFeatured: true,
    tags: ['apple', 'm2', 'ultrabook', 'creative', 'silent'],
  },

  // ─── TVs ──────────────────────────────────────────────────────────────────────
  {
    id: 'samsung-tv-55-4k',
    name: 'Samsung 55" Crystal 4K UHD Smart TV (UA55CUE60)',
    brand: 'Samsung',
    category: 'tvs',
    price: 44990,
    originalPrice: 67990,
    discount: 34,
    rating: 4.4,
    reviewCount: 3289,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1461151304267-38374e22e7e8?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Bring cinema into your living room with Samsung\'s 55" Crystal 4K UHD display. Powered by the Crystal Processor 4K, it upscales HD content to stunning 4K and features a 4K AI upscaler. Tizen OS gives access to 3,000+ apps. The slim design and AirSlim profile make it wall-mount-ready.',
    specs: [
      { label: 'Screen Size', value: '55 Inches (138.8 cm)' },
      { label: 'Resolution', value: '4K UHD (3840×2160)' },
      { label: 'Panel Type', value: 'Crystal UHD (LED-LCD)' },
      { label: 'Processor', value: 'Crystal Processor 4K' },
      { label: 'HDR', value: 'HDR10+, HLG' },
      { label: 'Refresh Rate', value: '60 Hz (Native)' },
      { label: 'Smart OS', value: 'Tizen OS 8.0' },
      { label: 'Connectivity', value: '3× HDMI 2.0, 2× USB, ARC, Wi-Fi 5' },
      { label: 'Audio', value: '20 W (Dolby Digital Plus)' },
      { label: 'Voice Assistants', value: 'Alexa, Google Assistant, Bixby' },
      { label: 'Gaming', value: 'Game Mode, VRR, FreeSync' },
      { label: 'Warranty', value: '1 Year Comprehensive' },
    ],
    aiMatch: {
      score: 88,
      whyMatches:
        'For users seeking a large-screen 4K experience under ₹50,000, this Samsung TV delivers excellent value. The Crystal Processor 4K intelligently upscales streaming content from OTT platforms like Netflix and Prime. Tizen OS is one of the most fluid and intuitive smart TV interfaces available.',
      keyStrengths: [
        'Crystal Processor 4K with AI upscaling for non-4K content',
        'HDR10+ support — brighter highlights with dynamic metadata per scene',
        'Tizen OS with access to Disney+, Netflix, Prime Video natively',
        'Multiple voice assistants built-in — Alexa, Google, Bixby',
        'Game Mode with VRR & FreeSync for responsive gaming',
      ],
      potentialDrawback:
        'Native 60 Hz refresh rate (not 120 Hz) — may exhibit minor motion blur during fast-paced sports or action games compared to premium QLED/OLED models.',
      efficiencyBadge: '4 Star BEE',
    },
    stock: 18,
    isTrending: true,
    isFeatured: false,
    tags: ['4k', 'smart-tv', 'samsung', 'tizen', 'hdr'],
  },

  // ─── Refrigerators ────────────────────────────────────────────────────────────
  {
    id: 'samsung-fridge-340l',
    name: 'Samsung 340L 3-Door Convertible Frost-Free Refrigerator',
    brand: 'Samsung',
    category: 'refrigerators',
    price: 34990,
    originalPrice: 48000,
    discount: 27,
    rating: 4.3,
    reviewCount: 1934,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Samsung\'s 340L 3-Door convertible refrigerator features a DigitalInverter Compressor for quiet, energy-efficient operation. The Convertible 5-in-1 technology lets you switch between modes (Normal, Extra Fridge, Seasonal, Home Alone, Vacation) as per your needs. All-round cooling ensures fresh food for longer.',
    specs: [
      { label: 'Capacity', value: '340 Litres (Gross)' },
      { label: 'Configuration', value: '3-Door (French Door Style)' },
      { label: 'Star Rating', value: '3 Star BEE 2024' },
      { label: 'Compressor', value: 'Digital Inverter (10 Year Warranty)' },
      { label: 'Annual Energy', value: '287 kWh' },
      { label: 'Convertible Modes', value: '5-in-1 (Normal, Extra Fridge, Seasonal, Home Alone, Vacation)' },
      { label: 'Frost Free', value: 'Yes (All-around cooling)' },
      { label: 'Refrigerant', value: 'R600a (Environment-friendly)' },
      { label: 'Stabilizer Free', value: '100–300 V range' },
      { label: 'Deodorizer', value: 'Yes (Deodorizing Filter)' },
      { label: 'Color', value: 'Elegant Inox / Satin Brown' },
      { label: 'Warranty', value: '1 Year Product + 10 Year Compressor' },
    ],
    aiMatch: {
      score: 85,
      whyMatches:
        'Ideal for medium-sized Indian families (3–5 members). The 5-in-1 convertible feature means you never waste electricity running an empty freezer — saving up to ₹2,200/year. DigitalInverter Compressor adjusts cooling demand dynamically for 48% energy savings vs conventional compressors.',
      keyStrengths: [
        '5-in-1 Convertible technology — freeze, chill, or switch off sections on demand',
        'Digital Inverter Compressor with 10-year warranty and quieter operation',
        'All-Around Cooling ensures even temperature distribution in all compartments',
        'R600a refrigerant with zero ozone depletion and lower global warming potential',
        'Stabilizer-free operation from 100–300V — ideal for Indian voltage fluctuations',
      ],
      potentialDrawback:
        '3-Star BEE rating (not 5-Star) — 4-Star/5-Star models consume ~30 kWh less per year. For maximum energy savings, consider the 5-Star variant at a ~₹5,000 premium.',
      efficiencyBadge: '3 Star BEE',
    },
    stock: 27,
    isTrending: false,
    isFeatured: true,
    tags: ['convertible', 'frost-free', 'inverter', '3-door'],
  },

  // ─── Washing Machines ─────────────────────────────────────────────────────────
  {
    id: 'lg-washer-8kg',
    name: 'LG 8 kg AI Direct Drive Front Load Washing Machine',
    brand: 'LG',
    category: 'washing-machines',
    price: 38990,
    originalPrice: 52000,
    discount: 25,
    rating: 4.6,
    reviewCount: 3102,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'LG\'s 8 kg AI Direct Drive washing machine uses artificial intelligence to automatically detect fabric weight and type, then selects the optimal wash cycle. The 6 Motion DD technology mimics hand-wash motions, protecting delicate fabrics. ThinQ Wi-Fi lets you start/monitor cycles remotely.',
    specs: [
      { label: 'Capacity', value: '8 kg' },
      { label: 'Type', value: 'Front Load, Fully Automatic' },
      { label: 'Motor', value: 'AI Direct Drive (10 Year Warranty)' },
      { label: 'Star Rating', value: '5 Star BEE' },
      { label: 'RPM', value: '1400 RPM' },
      { label: 'Programs', value: '14 Wash Programs' },
      { label: 'Wash Technology', value: '6 Motion DD (Tumbling, Scrubbing, Swinging, Rolling, Stepping, Filtration)' },
      { label: 'Steam Wash', value: 'Yes (TrueSteam)' },
      { label: 'Wi-Fi Control', value: 'Yes (LG ThinQ App)' },
      { label: 'Child Lock', value: 'Yes' },
      { label: 'Annual Energy', value: '170 kWh' },
      { label: 'Warranty', value: '2 Year Comprehensive + 10 Year Motor' },
    ],
    aiMatch: {
      score: 92,
      whyMatches:
        'Best-in-class washing machine for families who value fabric care and energy efficiency. AI Direct Drive detects load weight and optimises motor speed — reducing energy consumption by 25% versus conventional motors. TrueSteam removes 99.9% allergens, making it ideal for households with allergy-prone members.',
      keyStrengths: [
        'AI Direct Drive detects load automatically — protects fabrics and saves energy',
        '6 Motion DD mimics hand-wash action for superior fabric care',
        'TrueSteam reduces allergens by 99.9% — excellent for allergy sufferers',
        '5-Star BEE rating with only 170 kWh annual consumption',
        'ThinQ Wi-Fi remote start, download additional wash cycles via app',
      ],
      potentialDrawback:
        'Front-load machines require a slightly bent posture for loading/unloading, which may be inconvenient for elderly users. A pedestal stand (sold separately, ₹3,500) can raise the drum to a comfortable height.',
      efficiencyBadge: '5 Star BEE',
    },
    stock: 15,
    isTrending: true,
    isFeatured: true,
    tags: ['front-load', 'ai-wash', '5-star', 'steam-wash', 'wi-fi'],
  },

  // ─── Mobiles ──────────────────────────────────────────────────────────────────
  {
    id: 'samsung-galaxy-s24',
    name: 'Samsung Galaxy S24 5G (256GB, Cobalt Violet)',
    brand: 'Samsung',
    category: 'mobiles',
    price: 74999,
    originalPrice: 89999,
    discount: 17,
    rating: 4.7,
    reviewCount: 8923,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'The Galaxy S24 brings Galaxy AI to the masses — featuring Circle to Search, Live Translate, and a professional-grade 50 MP triple-camera system. Snapdragon 8 Gen 3 powers through demanding tasks, while the 4,000 mAh battery and vapor chamber cooling ensure all-day performance.',
    specs: [
      { label: 'Processor', value: 'Snapdragon 8 Gen 3 (For Galaxy)' },
      { label: 'Display', value: '6.2" Dynamic AMOLED 2X (2340×1080, 120 Hz)' },
      { label: 'RAM + Storage', value: '8 GB + 256 GB (UFS 4.0)' },
      { label: 'Main Camera', value: '50 MP (f/1.8) + 10 MP (3× Optical Zoom) + 12 MP Ultra-wide' },
      { label: 'Selfie Camera', value: '12 MP (f/2.2)' },
      { label: 'Battery', value: '4,000 mAh (25W Fast Charge, 15W Wireless)' },
      { label: 'OS', value: 'Android 14 + One UI 6.1 (Galaxy AI)' },
      { label: 'AI Features', value: 'Circle to Search, Live Translate, Chat Assist, Generative Edit' },
      { label: 'Build', value: 'Armor Aluminum frame, Corning Gorilla Glass Victus 2' },
      { label: 'IP Rating', value: 'IP68 (2 m / 30 min)' },
      { label: 'Connectivity', value: '5G, Wi-Fi 7, Bluetooth 5.3, NFC, UWB' },
      { label: 'Warranty', value: '1 Year Samsung Warranty' },
    ],
    aiMatch: {
      score: 93,
      whyMatches:
        'The Galaxy S24 is our top recommendation for users who want a future-proof AI-powered smartphone under ₹80,000. Galaxy AI features like Circle to Search and Live Translate are genuinely useful — not just marketing. The Snapdragon 8 Gen 3 variant (India) consistently outperforms the Exynos version shipped globally.',
      keyStrengths: [
        'Galaxy AI on-device: Circle to Search, Live Translate, Generative Edit photos',
        'Snapdragon 8 Gen 3 (India) — fastest chip in any Android phone this year',
        'ProVisual Engine: 50 MP adaptive pixel sensor with RAW capture support',
        'IP68 water resistance — submersible up to 2 m for 30 minutes',
        'Wi-Fi 7 + Bluetooth 5.3 + UWB for ultra-precise device sharing',
      ],
      potentialDrawback:
        'Only 25W wired charging — rivals like OnePlus 12 (100W) and iQOO 12 (120W) charge significantly faster. Battery life is solid for a 6.2" device but cannot rival the S24 Plus/Ultra.',
      efficiencyBadge: null,
    },
    stock: 54,
    isTrending: true,
    isFeatured: true,
    tags: ['5g', 'galaxy-ai', 'flagship', 'snapdragon', 'amoled'],
  },

  // ─── Extra: Bosch Washer ──────────────────────────────────────────────────────
  {
    id: 'bosch-washer-7kg',
    name: 'Bosch 7 kg 5-Star Front Load Washing Machine (WAJ2416SIN)',
    brand: 'Bosch',
    category: 'washing-machines',
    price: 32990,
    originalPrice: 42000,
    discount: 21,
    rating: 4.5,
    reviewCount: 2187,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'German engineering meets Indian requirements. The Bosch WAJ2416SIN offers an EcoSilence Drive brushless motor with a 10-year warranty, AntiVibration walls for near-silent operation, and AllergyPlus wash that eliminates 99.9% of allergens at just 40°C — saving hot water and energy.',
    specs: [
      { label: 'Capacity', value: '7 kg' },
      { label: 'Type', value: 'Front Load, Fully Automatic' },
      { label: 'Star Rating', value: '5 Star BEE' },
      { label: 'Motor', value: 'EcoSilence Drive (10 Year Warranty)' },
      { label: 'RPM', value: '1200 RPM' },
      { label: 'Wash Programs', value: '15 Programs' },
      { label: 'AllergyPlus', value: 'Yes (40°C allergen removal)' },
      { label: 'Anti-vibration', value: 'Yes (AntiVibration Design)' },
      { label: 'Annual Energy', value: '165 kWh' },
      { label: 'Warranty', value: '2 Year Comprehensive + 10 Year Motor' },
    ],
    aiMatch: {
      score: 89,
      whyMatches:
        'Exceptional choice for users prioritising German reliability and quiet operation. Bosch\'s EcoSilence Drive runs at just 47 dB — quieter than a library. The AllergyPlus program removes allergens without needing high temperatures, saving energy and protecting coloured fabrics.',
      keyStrengths: [
        'EcoSilence Drive brushless motor — quieter, more efficient, longer lasting',
        'AllergyPlus wash removes allergens at 40°C (no high heat needed)',
        'AntiVibration walls reduce noise and vibration — apartment-friendly',
        '5-Star BEE certified with only 165 kWh annual energy consumption',
        'Bosch German engineering — trusted reliability with a 10-year motor warranty',
      ],
      potentialDrawback:
        'No Wi-Fi or smart app connectivity — wash cycles must be configured manually on the machine. Also no steam-wash function, which competitors like LG offer at a similar price.',
      efficiencyBadge: '5 Star BEE',
    },
    stock: 19,
    isTrending: false,
    isFeatured: false,
    tags: ['bosch', 'german-engineering', '5-star', 'silent', 'front-load'],
  },

  // ─── Extra: Voltas AC ─────────────────────────────────────────────────────────
  {
    id: 'voltas-ac-1-5ton-5star',
    name: 'Voltas 1.5 Ton 5-Star Inverter Split AC (185V Vectra Platina)',
    brand: 'Voltas',
    category: 'acs',
    price: 37490,
    originalPrice: 47000,
    discount: 20,
    rating: 4.2,
    reviewCount: 1852,
    image: 'https://images.unsplash.com/photo-1606115757624-6d1b89a4d5e3?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1606115757624-6d1b89a4d5e3?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Voltas 185V Vectra Platina is India\'s most trusted AC brand\'s flagship offering. The Intellisense Inverter technology adjusts cooling capacity to maintain optimal temperature with minimal energy use. Auto-Adjustable Inverter handles Indian voltage fluctuations (100–290V) without a stabilizer.',
    specs: [
      { label: 'Capacity', value: '1.5 Ton' },
      { label: 'Star Rating', value: '5 Star BEE 2024' },
      { label: 'Inverter', value: 'Intellisense Inverter' },
      { label: 'Cooling Capacity', value: '5.2 kW' },
      { label: 'Annual Energy', value: '840.83 units' },
      { label: 'Noise Level', value: '31 dB (Indoor)' },
      { label: 'Refrigerant', value: 'R32' },
      { label: 'Wi-Fi Control', value: 'Yes (Voltas app)' },
      { label: 'Auto Cleaner', value: 'Yes' },
      { label: 'Warranty', value: '1 Year Comprehensive + 5 Year Compressor' },
    ],
    aiMatch: {
      score: 82,
      whyMatches:
        'Ideal budget-friendly 5-Star inverter AC with proven reliability from India\'s #1 AC brand. Intellisense inverter ensures good energy savings while the broad voltage tolerance (100–290V) makes it suitable for areas with unstable power supply.',
      keyStrengths: [
        '5-Star BEE 2024 certified — strong energy savings vs non-inverter models',
        'Intellisense Inverter adapts cooling load dynamically',
        'Stabilizer-free operation (100–290V) — ideal for Tier 2/3 cities',
        'Auto Clean feature maintains hygiene of indoor unit',
        'Voltas brand — #1 AC market share in India, nationwide service network',
      ],
      potentialDrawback:
        'Noise level at 31 dB is higher than Samsung WindFree (19 dB). Wi-Fi app interface is less polished compared to Samsung SmartThings or LG ThinQ. No PM 2.5 air purification.',
      efficiencyBadge: '5 Star BEE',
    },
    stock: 42,
    isTrending: false,
    isFeatured: false,
    tags: ['voltas', 'inverter', 'stabilizer-free', '5-star'],
  },

  // ─── Smart IoT & AI Appliances ─────────────────────────────────────────────
  {
    id: "ap-dyson-purifier",
    name: "Dyson Purifier Cool Gen1 Smart Air Purifier",
    brand: "Dyson",
    category: "air-purifiers",
    price: 32900,
    originalPrice: 39900,
    discount: 17,
    rating: 4.6,
    reviewCount: 842,
    stock: 25,
    isTrending: false,
    isDeal: true,
    inStock: true,
    image: "https://images.unsplash.com/photo-1628127334796-cb6b0db37fc4?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1628127334796-cb6b0db37fc4?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Intelligently purifies and cools you. Automatically senses, captures and traps pollutants for cleaner air.",
    specs: [
      { label: "Brand", value: "Dyson" },
      { label: "Coverage Area", value: "Up to 450 sq. ft." },
      { label: "Filter", value: "HEPA H13 & Activated Carbon" },
      { label: "Sensors", value: "IoT AQI, Temp, Humidity" },
      { label: "Connectivity", value: "Wi-Fi & App Control" },
      { label: "Warranty", value: "2 Years Comprehensive" }
    ],
    specifications: {
      Brand: "Dyson",
      "Coverage Area": "Up to 450 sq. ft.",
      Filter: "HEPA H13 & Activated Carbon",
      Sensors: "IoT AQI, Temp, Humidity",
      Connectivity: "Wi-Fi & App Control",
      Warranty: "2 Years Comprehensive"
    },
    features: [
      "Real-time LCD display showing AQI and PM2.5 levels",
      "Captures 99.95% of ultrafine particles",
      "Voice control via Alexa, Siri, and Google Assistant",
      "Oscillates up to 350 degrees"
    ],
    warranty: "2 Years on Product",
    seller: "Dyson India",
    aiMatch: {
      score: 89,
      whyMatches: [
        "Excellent for urban environments with fluctuating air quality.",
        "IoT sensors provide real-time monitoring directly to your smartphone.",
        "Fits comfortably within a premium home appliance budget."
      ],
      keyStrengths: ["Medical-grade HEPA", "Real-time IoT sensors", "Aesthetic design"],
      potentialDrawback: "Replacement filters can be expensive annually",
      targetUser: "Health-conscious tech enthusiasts needing air quality monitoring",
      efficiencyBadge: "Best Premium"
    },
    pros: ["Whisper quiet on night mode", "Excellent app integration", "Doubles as a cooling fan"],
    cons: ["High maintenance cost for filters", "Large physical footprint"],
    aiReviewSummary: {
      praise: ["Noticeable improvement in indoor allergies", "App is highly responsive", "Beautiful design"],
      complaints: ["Filters need replacing every 6-12 months"],
      verdict: "A premium, sensor-rich purifier ideal for smart homes, though maintenance costs should be factored in."
    }
  },
  {
    id: "ref-lg-instaview",
    name: "LG 655L InstaView Side-by-Side Smart Refrigerator",
    brand: "LG",
    category: "refrigerators",
    price: 98990,
    originalPrice: 135990,
    discount: 27,
    rating: 4.8,
    reviewCount: 312,
    stock: 12,
    isTrending: true,
    isDeal: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1584992236310-6edddc085ff9?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1584992236310-6edddc085ff9?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Knock twice to see inside without losing cool air. Features DoorCooling+ and ThinQ Wi-Fi connectivity.",
    specs: [
      { label: "Brand", value: "LG" },
      { label: "Capacity", value: "655 Litres" },
      { label: "Energy Rating", value: "4 Star" },
      { label: "Type", value: "Side-by-Side" },
      { label: "Compressor", value: "Smart Inverter" },
      { label: "Connectivity", value: "ThinQ Wi-Fi" },
      { label: "Warranty", value: "1 Year Product, 10 Years Compressor" }
    ],
    specifications: {
      Brand: "LG",
      Capacity: "655 Litres",
      "Energy Rating": "4 Star",
      Type: "Side-by-Side",
      Compressor: "Smart Inverter",
      Connectivity: "ThinQ Wi-Fi",
      Warranty: "1 Year Product, 10 Years Compressor"
    },
    features: [
      "InstaView Door-in-Door (Knock twice to illuminate)",
      "ThinQ App integration for remote temperature control",
      "Hygiene Fresh+ minimizes bacteria and odors",
      "Non-plumbed water and ice dispenser"
    ],
    warranty: "1 Year Comprehensive, 10 Years on Compressor",
    seller: "LG Brand Store",
    aiMatch: {
      score: 93,
      whyMatches: [
        "Smart Inverter compressor offers superior energy efficiency for a large capacity.",
        "ThinQ IoT connectivity allows for remote diagnostics and temperature alerts.",
        "Massive 655L capacity is perfect for large families."
      ],
      keyStrengths: ["InstaView window", "Remote IoT diagnostics", "Built-in ice maker"],
      potentialDrawback: "Requires significant kitchen space and clearance for both doors",
      targetUser: "Large households looking for a highly connected, premium kitchen centerpiece",
      efficiencyBadge: "Best Overall"
    },
    pros: ["Ice maker doesn't require plumbing", "Keeps produce fresh significantly longer", "Very quiet"],
    cons: ["Heavy and difficult to move", "Door-in-door latch can feel stiff initially"],
    aiReviewSummary: {
      praise: ["Kids love the knock-to-view feature", "Huge freezer space", "App alerts you if the door is left open"],
      complaints: ["Fingerprints show easily on the glass panel"],
      verdict: "A top-tier smart refrigerator that successfully blends novelty features with robust, efficient cooling."
    }
  },
  {
    id: "hp-sony-xm5",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    brand: "Sony",
    category: "headphones",
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    rating: 4.8,
    reviewCount: 4120,
    stock: 35,
    isTrending: true,
    isDeal: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Industry-leading noise cancellation with Auto NC Optimizer, 30-hour battery life, and crystal-clear hands-free calling.",
    specs: [
      { label: "Brand", value: "Sony" },
      { label: "Type", value: "Over-Ear Wireless" },
      { label: "Battery Life", value: "Up to 30 Hours" },
      { label: "Noise Cancellation", value: "Active (Auto Optimizer)" },
      { label: "Microphone", value: "4 beamforming mics" },
      { label: "Weight", value: "250g" },
      { label: "Warranty", value: "1 Year Manufacturer" }
    ],
    specifications: {
      Brand: "Sony",
      Type: "Over-Ear Wireless",
      "Battery Life": "Up to 30 Hours",
      "Noise Cancellation": "Active (Auto Optimizer)",
      Microphone: "4 beamforming mics",
      Weight: "250g",
      Warranty: "1 Year Manufacturer"
    },
    features: [
      "Integrated Processor V1 for unmatched noise cancellation",
      "Speak-to-Chat technology automatically pauses music",
      "Multipoint connection lets you pair two devices",
      "Quick charge: 3 minutes gives 3 hours of playback"
    ],
    warranty: "1 Year Manufacturer Warranty",
    seller: "Sony Audio Official",
    aiMatch: {
      score: 95,
      whyMatches: [
        "Unbeatable active noise cancellation for deep-focus coding or studying.",
        "30-hour battery life easily survives long commutes and travel.",
        "Multipoint pairing seamlessly switches between your phone and laptop."
      ],
      keyStrengths: ["Industry-leading ANC", "Extremely lightweight", "Fast charging"],
      potentialDrawback: "Not water or sweat resistant for heavy gym use",
      targetUser: "Professionals and students who need ultimate focus and quiet environments",
      efficiencyBadge: "Best Overall"
    },
    pros: ["Incredible sound quality", "Very comfortable for glasses wearers", "Superb microphone for calls"],
    cons: ["Case is quite bulky", "No IP rating for water resistance"],
    aiReviewSummary: {
      praise: ["Blocks out airplane engine noise completely", "Very light on the head", "Seamless Bluetooth switching"],
      complaints: ["Earcups can get warm after 4 hours of use"],
      verdict: "The absolute gold standard for noise-cancelling headphones if budget permits and gym use isn't a priority."
    }
  },
  {
    id: "lap-asus-g14",
    name: "ASUS ROG Zephyrus G14 (AMD Ryzen 9, RTX 4060, 16GB RAM)",
    brand: "ASUS",
    category: "laptops",
    price: 135990,
    originalPrice: 155990,
    discount: 13,
    rating: 4.7,
    reviewCount: 892,
    stock: 18,
    isTrending: true,
    isDeal: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80"
    ],
    description: "A 14-inch powerhouse combining portability with desktop-class gaming and rendering performance.",
    specs: [
      { label: "Brand", value: "ASUS" },
      { label: "Processor", value: "AMD Ryzen 9 7940HS" },
      { label: "RAM", value: "16GB DDR5" },
      { label: "Storage", value: "1TB PCIe 4.0 NVMe SSD" },
      { label: "GPU", value: "NVIDIA GeForce RTX 4060 8GB GDDR6" },
      { label: "Display", value: "14-inch QHD+ 165Hz Nebula Display" },
      { label: "Weight", value: "1.65 kg" },
      { label: "Warranty", value: "1 Year Global Warranty" }
    ],
    specifications: {
      Brand: "ASUS",
      Processor: "AMD Ryzen 9 7940HS",
      RAM: "16GB DDR5",
      Storage: "1TB PCIe 4.0 NVMe SSD",
      GPU: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      Display: "14-inch QHD+ 165Hz Nebula Display",
      Weight: "1.65 kg",
      Warranty: "1 Year Global Warranty"
    },
    features: [
      "ROG Nebula Display with 100% DCI-P3 color coverage",
      "MUX Switch with NVIDIA Advanced Optimus",
      "Liquid metal thermal cooling",
      "AniMe Matrix LED display on the lid"
    ],
    warranty: "1 Year Global Warranty",
    seller: "ROG Authorized Retailer",
    aiMatch: {
      score: 92,
      whyMatches: [
        "Dedicated RTX 4060 handles AAA gaming, 3D rendering, and heavy AI workloads easily.",
        "14-inch form factor at 1.65kg makes it highly portable for a gaming machine.",
        "Ryzen 9 processor provides excellent power efficiency when unplugged."
      ],
      keyStrengths: ["Massive GPU power in a small chassis", "Gorgeous 165Hz display", "Good battery for a gaming laptop"],
      potentialDrawback: "Fans get very loud under heavy gaming loads",
      targetUser: "Gamers and creative professionals who need high performance in a portable package",
      efficiencyBadge: "Best Performance"
    },
    pros: ["Incredible performance-to-size ratio", "Keyboard feels great to type on", "Subtle design fits in offices"],
    cons: ["Gets physically hot under load", "Webcam is only 1080p standard"],
    aiReviewSummary: {
      praise: ["Runs Cyberpunk 2077 smoothly", "Screen colors are incredibly vibrant", "Doesn't look like a bulky gaming laptop"],
      complaints: ["Armoury Crate software can be buggy"],
      verdict: "The undisputed king of 14-inch gaming laptops, balancing raw power with everyday portability."
    }
  },
  {
    id: "mw-ifb-30l",
    name: "IFB 30 L Convection Microwave Oven",
    brand: "IFB",
    category: "microwaves",
    price: 14490,
    originalPrice: 17990,
    discount: 19,
    rating: 4.3,
    reviewCount: 1205,
    stock: 22,
    isTrending: false,
    isDeal: true,
    inStock: true,
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Versatile 30L convection microwave perfect for baking, grilling, reheating, and defrosting.",
    specs: [
      { label: "Brand", value: "IFB" },
      { label: "Capacity", value: "30 Litres" },
      { label: "Type", value: "Convection" },
      { label: "Control", value: "Touch Key Pad (Membrane)" },
      { label: "Cavity Material", value: "Stainless Steel" },
      { label: "Warranty", value: "1 Year on Product, 3 Years on Magnetron" }
    ],
    specifications: {
      Brand: "IFB",
      Capacity: "30 Litres",
      Type: "Convection",
      Control: "Touch Key Pad (Membrane)",
      "Cavity Material": "Stainless Steel",
      Warranty: "1 Year on Product, 3 Years on Magnetron"
    },
    features: [
      "101 Auto-cook menu options",
      "Steam clean and deodorize functions",
      "Overheating protection",
      "Child safety lock"
    ],
    warranty: "1 Year Comprehensive, 3 Years Magnetron",
    seller: "ShopWise Direct",
    aiMatch: {
      score: 88,
      whyMatches: [
        "30L capacity is highly suitable for medium-to-large families.",
        "Convection features allow for baking cakes and grilling, not just reheating.",
        "Auto-cook menus simplify complex Indian recipes."
      ],
      keyStrengths: ["Baking & Grilling support", "Stainless steel cavity", "Child lock"],
      potentialDrawback: "Takes up significant counter space",
      targetUser: "Families who want an all-in-one appliance for reheating, baking, and grilling",
      efficiencyBadge: "Best Value"
    },
    pros: ["Very easy to clean interior", "Starter kit included in the box", "Even heating"],
    cons: ["Touchpad requires a firm press", "The glass door is quite dark, hard to see inside"],
    aiReviewSummary: {
      praise: ["Great for baking pizzas and cakes", "Sturdy build quality", "Deodorize function works well"],
      complaints: ["Installation demo by brand takes a few days to arrange"],
      verdict: "A reliable, multi-purpose microwave that offers excellent value for aspiring home bakers."
    }
  },
  {
    id: "tv-lg-oled-c3",
    name: "LG 65\" OLED evo C3 4K Smart TV",
    brand: "LG",
    category: "tvs",
    price: 169990,
    originalPrice: 249990,
    discount: 32,
    rating: 4.9,
    reviewCount: 630,
    stock: 10,
    isTrending: true,
    isDeal: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1593789382576-54f4895a6d34?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1593789382576-54f4895a6d34?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Premium OLED evo technology with self-lit pixels for infinite contrast, deep blacks, and 120Hz gaming.",
    specs: [
      { label: "Brand", value: "LG" },
      { label: "Screen Size", value: "65 Inches" },
      { label: "Resolution", value: "4K Ultra HD (3840 x 2160)" },
      { label: "Refresh Rate", value: "120 Hz" },
      { label: "Panel", value: "OLED evo" },
      { label: "Sound Output", value: "40 Watts (Dolby Atmos)" },
      { label: "Warranty", value: "1 Year Comprehensive" }
    ],
    specifications: {
      Brand: "LG",
      "Screen Size": "65 Inches",
      Resolution: "4K Ultra HD (3840 x 2160)",
      "Refresh Rate": "120 Hz",
      Panel: "OLED evo",
      "Sound Output": "40 Watts (Dolby Atmos)",
      Warranty: "1 Year Comprehensive"
    },
    features: [
      "α9 AI Processor Gen6 for ultimate picture scaling",
      "Dolby Vision IQ and Dolby Atmos",
      "0.1ms response time with G-Sync & FreeSync for gaming",
      "webOS 23 with ThinQ AI"
    ],
    warranty: "1 Year Comprehensive Warranty",
    seller: "LG Brand Store",
    aiMatch: {
      score: 97,
      whyMatches: [
        "OLED evo panel delivers the absolute best contrast and black levels for cinematic viewing.",
        "120Hz refresh rate and G-Sync make this the ultimate companion for PS5 or Xbox Series X.",
        "Generous 65-inch size is perfect for large living room setups (10-12 ft viewing distance)."
      ],
      keyStrengths: ["Perfect black levels", "120Hz gaming features", "Extremely thin profile"],
      potentialDrawback: "OLED panels carry a slight risk of burn-in if static news channels are watched all day",
      targetUser: "Home theater enthusiasts and serious console gamers who refuse to compromise on picture quality",
      efficiencyBadge: "Best Premium"
    },
    pros: ["Mind-blowing picture quality", "Magic remote is very intuitive", "4x HDMI 2.1 ports"],
    cons: ["Very expensive", "Screen can be reflective in bright, sunlit rooms"],
    aiReviewSummary: {
      praise: ["HDR movies look stunning", "Zero lag while gaming", "Interface is snappy and ad-free"],
      complaints: ["Built-in speakers are decent, but a TV this good demands a separate soundbar"],
      verdict: "The pinnacle of current TV technology, offering an unmatched visual experience for both movies and gaming."
    }
  },
];



// Helper: get products by category
export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

// Helper: get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

// Helper: get featured/trending
export function getTrendingProducts(): Product[] {
  return products.filter((p) => p.isTrending);
}
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

// Uppercase alias for mockAiSearch compatibility
export const PRODUCTS = products;

