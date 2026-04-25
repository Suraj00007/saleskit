import type { Project } from '../types'

export const projects: Project[] = [
  // ── OUR PROJECT ────────────────────────────────────────────────────────────
  {
    id: 'motiveminds-vista',
    name: 'MotiveMinds Vista',
    builder: 'MotiveMinds Realty',
    builderTier: 'tier1',
    isOwn: true,
    location: 'Sarjapur Road, Bangalore',
    micromarket: 'Sarjapur – Bellandur',

    variants: [
      { type: '2BHK', sizeSqft: [1150, 1280], pricePerSqft: [8200, 8500], startingPrice: 94 },
      { type: '3BHK', sizeSqft: [1620, 1850], pricePerSqft: [8200, 8600], startingPrice: 133 },
      { type: '3.5BHK', sizeSqft: [2050, 2250], pricePerSqft: [8300, 8800], startingPrice: 170 },
    ],
    avgPricePerSqft: 8400,

    amenities: [
      'Swimming Pool', 'Club House', 'Gymnasium', 'Children\'s Play Area',
      'Landscaped Gardens', 'Jogging Track', 'Indoor Badminton Court',
      'Multipurpose Hall', 'Library', 'Yoga / Meditation Room',
      'BBQ Zone', 'Amphitheatre', 'Senior Citizen Corner', 'EV Charging Points',
    ],
    premiumAmenities: [
      'Rooftop Sky Lounge', 'Infinity Pool', 'Co-Working Space in Clubhouse',
      'Mini Theatre', 'Spa & Sauna',
    ],
    commonAreas: ['Central Park (2.5 acres)', 'Open Amphitheatre', 'Podium Garden', 'Reflexology Path'],
    premiumLocation: ['3 km from Bellandur Lake', '2 km from Outer Ring Road', 'Adjacent IT Corridor'],

    seniorFriendly: {
      gymnasium: true,
      indoorGameRoom: true,
      readingDesk: true,
      ambulanceService: true,
      dedicatedWalkingTrack: true,
      seniorCareRoom: true,
    },
    approvedBankers: ['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Kotak Mahindra', 'Bank of Baroda'],

    builderReputation: 5,
    builderCompletedProjects: 22,
    builderYearsInMarket: 18,
    builderOnTimeDelivery: true,

    possessionStatus: 'under_construction',
    possessionTimeline: 'Jun 2027',

    accessibility: {
      metro: 1.2,
      hospital: 1.8,
      school: 1.5,
      supermarket: 0.8,
      cafe: 0.5,
      pub: 2.0,
      coworking: 0.6,
      mall: 3.5,
      itHub: 1.0,
      airport: 38,
    },

    futureGrowth: {
      upcomingInfrastructure: [
        'Phase 2 Metro (Sarjapur) – 2027',
        'Peripheral Ring Road – 2026',
        'Namma Metro Extension – 2028',
      ],
      appreciationPotential: 'high',
      rentalYield: 4.2,
      capitalAppreciation: 12,
    },

    specifications: {
      flooring: 'Vitrified Tiles (800x800) – Kajaria',
      windows: 'uPVC French Windows – Fenesta',
      kitchen: 'Modular Kitchen with Granite Countertop',
      bathroom: 'EWC – Kohler / Jaguar',
      structure: 'RCC Shear Wall Construction',
      paintBrand: 'Asian Paints Royale',
    },

    totalUnits: 420,
    totalAcres: 5.2,
    density: 'medium',
    remoteBuyingOptions: true,
    virtualTour: true,
    nriFriendly: true,

    highlights: [
      'Only project in micro-market with rooftop sky lounge + infinity pool',
      'Metro-adjacent with 6 approved bank loans — highest in segment',
      'On-time delivery track record across 22 projects since 2006',
    ],
    concerns: ['Slightly higher price per sqft vs Mana', 'Possession 18 months away'],
  },

  // ── PRESTIGE (Tier 1) ──────────────────────────────────────────────────────
  {
    id: 'prestige-elm-park',
    name: 'Prestige Elm Park',
    builder: 'Prestige Group',
    builderTier: 'tier1',
    isOwn: false,
    location: 'Sarjapur Road, Bangalore',
    micromarket: 'Sarjapur – Bellandur',

    variants: [
      { type: '2BHK', sizeSqft: [1100, 1250], pricePerSqft: [9000, 9400], startingPrice: 99 },
      { type: '3BHK', sizeSqft: [1600, 1900], pricePerSqft: [9000, 9600], startingPrice: 144 },
      { type: '4BHK', sizeSqft: [2400, 2800], pricePerSqft: [9200, 9800], startingPrice: 221 },
    ],
    avgPricePerSqft: 9300,

    amenities: [
      'Swimming Pool', 'Club House', 'Gymnasium', 'Children\'s Play Area',
      'Landscaped Gardens', 'Jogging Track', 'Tennis Court',
      'Multipurpose Hall', 'Indoor Games Room', 'EV Charging Points',
    ],
    premiumAmenities: ['Rooftop Lounge', 'Spa'],
    commonAreas: ['Central Lawn (1.8 acres)', 'Podium Garden'],
    premiumLocation: ['Near Bellandur Lake', 'IT Corridor Access'],

    seniorFriendly: {
      gymnasium: true,
      indoorGameRoom: true,
      readingDesk: false,
      ambulanceService: false,
      dedicatedWalkingTrack: true,
      seniorCareRoom: false,
    },
    approvedBankers: ['SBI', 'HDFC', 'ICICI', 'Axis Bank'],

    builderReputation: 5,
    builderCompletedProjects: 280,
    builderYearsInMarket: 35,
    builderOnTimeDelivery: true,

    possessionStatus: 'under_construction',
    possessionTimeline: 'Mar 2027',

    accessibility: {
      metro: 2.5,
      hospital: 2.2,
      school: 1.8,
      supermarket: 1.2,
      cafe: 1.0,
      pub: 2.5,
      coworking: 1.5,
      mall: 4.0,
      itHub: 1.5,
      airport: 40,
    },

    futureGrowth: {
      upcomingInfrastructure: ['Metro Phase 2 – 2027', 'Peripheral Ring Road – 2026'],
      appreciationPotential: 'high',
      rentalYield: 3.8,
      capitalAppreciation: 10,
    },

    specifications: {
      flooring: 'Vitrified Tiles (600x600) – RAK Ceramics',
      windows: 'Aluminium Sliding Windows',
      kitchen: 'Granite Counter Platform',
      bathroom: 'EWC – Kohler',
      structure: 'RCC Frame Structure',
      paintBrand: 'Asian Paints',
    },

    totalUnits: 680,
    totalAcres: 6.5,
    density: 'high',
    remoteBuyingOptions: true,
    virtualTour: true,
    nriFriendly: true,

    highlights: [
      'Prestige brand commands strong resale premium',
      'Larger land parcel with tennis court',
    ],
    concerns: ['Higher price per sqft', 'Higher density (680 units)', 'No ambulance service'],
  },

  // ── SOBHA (Tier 1) ─────────────────────────────────────────────────────────
  {
    id: 'sobha-silicon-oasis',
    name: 'Sobha Silicon Oasis',
    builder: 'Sobha Limited',
    builderTier: 'tier1',
    isOwn: false,
    location: 'Hosa Road, Sarjapur, Bangalore',
    micromarket: 'Sarjapur – Bellandur',

    variants: [
      { type: '2BHK', sizeSqft: [1050, 1200], pricePerSqft: [8800, 9200], startingPrice: 92 },
      { type: '3BHK', sizeSqft: [1550, 1800], pricePerSqft: [8800, 9400], startingPrice: 136 },
    ],
    avgPricePerSqft: 9000,

    amenities: [
      'Swimming Pool', 'Club House', 'Gymnasium', 'Children\'s Play Area',
      'Jogging Track', 'Badminton Court', 'Multipurpose Hall',
    ],
    premiumAmenities: ['Rooftop Terrace Garden'],
    commonAreas: ['Central Lawn', 'Open Spaces'],
    premiumLocation: ['IT Corridor Access', 'Near Wipro SEZ'],

    seniorFriendly: {
      gymnasium: true,
      indoorGameRoom: false,
      readingDesk: true,
      ambulanceService: false,
      dedicatedWalkingTrack: true,
      seniorCareRoom: false,
    },
    approvedBankers: ['SBI', 'HDFC', 'ICICI'],

    builderReputation: 5,
    builderCompletedProjects: 140,
    builderYearsInMarket: 28,
    builderOnTimeDelivery: true,

    possessionStatus: 'ready',
    possessionTimeline: 'Ready to move in',

    accessibility: {
      metro: 3.0,
      hospital: 2.8,
      school: 2.5,
      supermarket: 1.5,
      cafe: 1.8,
      pub: 3.0,
      coworking: 2.0,
      mall: 5.0,
      itHub: 0.8,
      airport: 42,
    },

    futureGrowth: {
      upcomingInfrastructure: ['Namma Metro Extension – 2028'],
      appreciationPotential: 'medium',
      rentalYield: 4.5,
      capitalAppreciation: 8,
    },

    specifications: {
      flooring: 'Vitrified Tiles (800x800) – Somany',
      windows: 'uPVC Sliding Windows',
      kitchen: 'Modular Kitchen – Sobha in-house',
      bathroom: 'EWC – Jaquar',
      structure: 'Sobha in-house construction (no sub-contractor)',
      paintBrand: 'Dulux',
    },

    totalUnits: 310,
    totalAcres: 4.0,
    density: 'medium',
    remoteBuyingOptions: true,
    virtualTour: false,
    nriFriendly: true,

    highlights: [
      'Sobha in-house construction quality — no sub-contractors',
      'Ready to move in — immediate possession',
      'Highest rental yield in segment (4.5%)',
    ],
    concerns: ['No ambulance service', 'Higher price vs Mana', 'Farther from upcoming metro'],
  },

  // ── MANA (Tier 2) ──────────────────────────────────────────────────────────
  {
    id: 'mana-foresta',
    name: 'Mana Foresta',
    builder: 'Mana Projects',
    builderTier: 'tier2',
    isOwn: false,
    location: 'Carmelram, Sarjapur Road, Bangalore',
    micromarket: 'Sarjapur – Bellandur',

    variants: [
      { type: '2BHK', sizeSqft: [1080, 1220], pricePerSqft: [7400, 7800], startingPrice: 80 },
      { type: '3BHK', sizeSqft: [1500, 1750], pricePerSqft: [7400, 7900], startingPrice: 111 },
      { type: '3BHK Premium', sizeSqft: [1900, 2100], pricePerSqft: [7600, 8000], startingPrice: 145 },
    ],
    avgPricePerSqft: 7650,

    amenities: [
      'Swimming Pool', 'Club House', 'Gymnasium', 'Children\'s Play Area',
      'Jogging Track', 'Indoor Games Room', 'Multipurpose Hall',
    ],
    premiumAmenities: [],
    commonAreas: ['Central Park', 'Open Green Spaces'],
    premiumLocation: ['Green Corridor', 'Near Eco Zone'],

    seniorFriendly: {
      gymnasium: true,
      indoorGameRoom: true,
      readingDesk: false,
      ambulanceService: false,
      dedicatedWalkingTrack: false,
      seniorCareRoom: false,
    },
    approvedBankers: ['SBI', 'HDFC'],

    builderReputation: 3,
    builderCompletedProjects: 12,
    builderYearsInMarket: 10,
    builderOnTimeDelivery: false,

    possessionStatus: 'under_construction',
    possessionTimeline: 'Dec 2027',

    accessibility: {
      metro: 4.5,
      hospital: 3.2,
      school: 2.0,
      supermarket: 1.8,
      cafe: 2.5,
      pub: 4.0,
      coworking: 3.0,
      mall: 6.5,
      itHub: 3.5,
      airport: 45,
    },

    futureGrowth: {
      upcomingInfrastructure: ['Peripheral Ring Road – 2026'],
      appreciationPotential: 'medium',
      rentalYield: 3.2,
      capitalAppreciation: 9,
    },

    specifications: {
      flooring: 'Vitrified Tiles (600x600) – Generic Brand',
      windows: 'Aluminium Sliding Windows',
      kitchen: 'Granite Counter Platform',
      bathroom: 'EWC – Parryware',
      structure: 'RCC Frame Structure',
      paintBrand: 'Berger',
    },

    totalUnits: 520,
    totalAcres: 7.0,
    density: 'high',
    remoteBuyingOptions: false,
    virtualTour: false,
    nriFriendly: false,

    highlights: [
      'Lowest price per sqft in the micro-market',
      'Large land parcel — more open space',
    ],
    concerns: ['No premium amenities', 'Delayed possession history', 'Only 2 approved banks', 'Not NRI-friendly'],
  },

  // ── PANCHSHIL / PANCH (Tier 2) ─────────────────────────────────────────────
  {
    id: 'panch-urban-greens',
    name: 'Panch Urban Greens',
    builder: 'Panch Builders',
    builderTier: 'tier2',
    isOwn: false,
    location: 'Marathahalli, Sarjapur Road, Bangalore',
    micromarket: 'Sarjapur – Bellandur',

    variants: [
      { type: '2BHK', sizeSqft: [1020, 1180], pricePerSqft: [7600, 8000], startingPrice: 77 },
      { type: '3BHK', sizeSqft: [1450, 1700], pricePerSqft: [7600, 8100], startingPrice: 110 },
    ],
    avgPricePerSqft: 7800,

    amenities: [
      'Swimming Pool', 'Club House', 'Gymnasium', 'Children\'s Play Area',
      'Landscaped Gardens', 'Jogging Track', 'Indoor Badminton Court',
    ],
    premiumAmenities: [],
    commonAreas: ['Central Lawn', 'Podium Park'],
    premiumLocation: ['Near Marathahalli Bridge', 'ORR Access'],

    seniorFriendly: {
      gymnasium: true,
      indoorGameRoom: false,
      readingDesk: false,
      ambulanceService: false,
      dedicatedWalkingTrack: true,
      seniorCareRoom: false,
    },
    approvedBankers: ['SBI', 'HDFC', 'ICICI'],

    builderReputation: 3,
    builderCompletedProjects: 8,
    builderYearsInMarket: 7,
    builderOnTimeDelivery: false,

    possessionStatus: 'upcoming',
    possessionTimeline: 'Mar 2028',

    accessibility: {
      metro: 2.0,
      hospital: 1.5,
      school: 1.2,
      supermarket: 0.9,
      cafe: 0.8,
      pub: 1.5,
      coworking: 1.2,
      mall: 2.5,
      itHub: 2.0,
      airport: 35,
    },

    futureGrowth: {
      upcomingInfrastructure: ['ORR Widening – 2025'],
      appreciationPotential: 'medium',
      rentalYield: 3.5,
      capitalAppreciation: 7,
    },

    specifications: {
      flooring: 'Vitrified Tiles (600x600) – Nitco',
      windows: 'Aluminium Sliding Windows',
      kitchen: 'Granite Counter',
      bathroom: 'EWC – Cera',
      structure: 'RCC Frame Structure',
      paintBrand: 'Berger',
    },

    totalUnits: 380,
    totalAcres: 4.8,
    density: 'high',
    remoteBuyingOptions: false,
    virtualTour: false,
    nriFriendly: false,

    highlights: [
      'Good metro proximity (2 km)',
      'Reasonable price point',
    ],
    concerns: ['No premium amenities', 'Newer builder (7 years)', 'Delivery track record unproven', 'Not NRI-friendly'],
  },
]

export const ownProject = projects.find(p => p.isOwn)!
export const competitorProjects = projects.filter(p => !p.isOwn)
