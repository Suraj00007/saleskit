export type BuilderTier = 'tier1' | 'tier2' | 'tier3'
export type PossessionStatus = 'ready' | 'under_construction' | 'upcoming'
export type AppreciationPotential = 'low' | 'medium' | 'high'
export type BuyerPersona = 'bachelor' | 'family' | 'investor' | 'nri' | 'luxury'

export interface Accessibility {
  metro: number        // km
  hospital: number
  school: number
  supermarket: number
  cafe: number
  pub: number
  coworking: number
  mall: number
  itHub: number
  airport: number
}

export interface SeniorFriendly {
  gymnasium: boolean
  indoorGameRoom: boolean
  readingDesk: boolean
  ambulanceService: boolean
  dedicatedWalkingTrack: boolean
  seniorCareRoom: boolean
}

export interface FutureGrowth {
  upcomingInfrastructure: string[]
  appreciationPotential: AppreciationPotential
  rentalYield: number        // annual %
  capitalAppreciation: number // projected annual %
}

export interface Specifications {
  flooring: string
  windows: string
  kitchen: string
  bathroom: string
  structure: string
  paintBrand: string
}

export interface Variant {
  type: string           // '2BHK', '3BHK', etc.
  sizeSqft: [number, number]  // [min, max]
  pricePerSqft: [number, number]
  startingPrice: number  // in lakhs
}

export interface Project {
  id: string
  name: string
  builder: string
  builderTier: BuilderTier
  isOwn: boolean          // true = our project
  location: string
  micromarket: string

  variants: Variant[]
  avgPricePerSqft: number

  amenities: string[]
  premiumAmenities: string[]    // pool, sky lounge, etc.
  commonAreas: string[]
  premiumLocation: string[]     // near lake, IT corridor, etc.

  seniorFriendly: SeniorFriendly
  approvedBankers: string[]

  builderReputation: number     // 1-5
  builderCompletedProjects: number
  builderYearsInMarket: number
  builderOnTimeDelivery: boolean // track record

  possessionStatus: PossessionStatus
  possessionTimeline: string    // e.g. "Dec 2026"

  accessibility: Accessibility

  futureGrowth: FutureGrowth
  specifications: Specifications

  totalUnits: number
  totalAcres: number
  density: 'low' | 'medium' | 'high'  // units/acre

  remoteBuyingOptions: boolean
  virtualTour: boolean
  nriFriendly: boolean

  highlights: string[]    // 2-3 line pitch points
  concerns: string[]      // honest gaps (internal use)
}

// ── Persona scoring ──────────────────────────────────────────────────────────

export interface PersonaWeights {
  persona: BuyerPersona
  label: string
  description: string
  icon: string
  accessibilityWeights: Partial<Record<keyof Accessibility, number>>  // 0–1
  featureWeights: {
    priceValue: number
    amenities: number
    premiumAmenities: number
    seniorFriendly: number
    builderReputation: number
    possessionTimeline: number
    futureGrowth: number
    density: number
    remoteBuying: number
    specifications: number
  }
  keyPriorities: string[]   // talking points for this persona
}

// ── Comparison result ─────────────────────────────────────────────────────────

export type CompareStatus = 'better' | 'same' | 'worse' | 'na'

export interface CompareRow {
  label: string
  category: string
  ownValue: string | number
  competitorValues: Record<string, string | number>
  ownStatus: CompareStatus   // how does 'own' compare to best competitor
  unit?: string
  tooltip?: string
}

export interface PersonaScore {
  projectId: string
  projectName: string
  score: number       // 0–100
  isOwn: boolean
  strengths: string[]
  gaps: string[]
  talkingPoints: string[]
}
