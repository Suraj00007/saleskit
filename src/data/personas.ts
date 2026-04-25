import type { PersonaWeights, Project, PersonaScore, BuyerPersona } from '../types'

export const personaWeights: PersonaWeights[] = [
  {
    persona: 'bachelor',
    label: 'Bachelor / Young Professional',
    description: 'Single or couple, 25–35 yrs, prioritises lifestyle, connectivity, and rental potential.',
    icon: '🎯',
    accessibilityWeights: {
      metro: 1.0,
      cafe: 0.95,
      pub: 0.85,
      coworking: 0.9,
      itHub: 0.8,
      supermarket: 0.6,
      hospital: 0.3,
      school: 0.0,
      mall: 0.7,
      airport: 0.4,
    },
    featureWeights: {
      priceValue: 0.85,
      amenities: 0.7,
      premiumAmenities: 0.6,
      seniorFriendly: 0.0,
      builderReputation: 0.5,
      possessionTimeline: 0.5,
      futureGrowth: 0.7,
      density: 0.3,
      remoteBuying: 0.2,
      specifications: 0.4,
    },
    keyPriorities: [
      'Metro / transport connectivity',
      'Cafés, co-working spaces, pubs within 2 km',
      'Rental yield & capital appreciation',
      'Lifestyle amenities (pool, gym, lounge)',
      'Affordable entry price',
    ],
  },
  {
    persona: 'family',
    label: 'Family Buyer',
    description: 'Couple with children or parents, 32–50 yrs, prioritises safety, schools, and community.',
    icon: '👨‍👩‍👧‍👦',
    accessibilityWeights: {
      school: 1.0,
      hospital: 0.95,
      supermarket: 0.9,
      mall: 0.75,
      metro: 0.65,
      itHub: 0.5,
      cafe: 0.4,
      pub: 0.0,
      coworking: 0.2,
      airport: 0.3,
    },
    featureWeights: {
      priceValue: 0.8,
      amenities: 0.9,
      premiumAmenities: 0.4,
      seniorFriendly: 0.75,
      builderReputation: 0.85,
      possessionTimeline: 0.7,
      futureGrowth: 0.6,
      density: 0.6,
      remoteBuying: 0.1,
      specifications: 0.7,
    },
    keyPriorities: [
      'Reputed schools within 2 km',
      'Hospitals & emergency care nearby',
      'Large children\'s play areas & parks',
      'Gated community safety & security',
      'Spacious layouts with good specifications',
    ],
  },
  {
    persona: 'investor',
    label: 'Investor',
    description: 'Purely return-driven, 30–55 yrs, focuses on appreciation, rental demand, and exit liquidity.',
    icon: '📈',
    accessibilityWeights: {
      itHub: 1.0,
      metro: 0.95,
      airport: 0.5,
      coworking: 0.7,
      supermarket: 0.4,
      cafe: 0.5,
      mall: 0.4,
      hospital: 0.3,
      school: 0.3,
      pub: 0.3,
    },
    featureWeights: {
      priceValue: 0.95,
      amenities: 0.5,
      premiumAmenities: 0.4,
      seniorFriendly: 0.1,
      builderReputation: 0.9,
      possessionTimeline: 0.85,
      futureGrowth: 1.0,
      density: 0.4,
      remoteBuying: 0.3,
      specifications: 0.5,
    },
    keyPriorities: [
      'Capital appreciation potential (12%+ YoY)',
      'Rental yield (4%+)',
      'IT hub & upcoming metro proximity',
      'Builder on-time delivery track record',
      'Pre-launch / under-construction entry price',
    ],
  },
  {
    persona: 'nri',
    label: 'NRI Buyer',
    description: 'Non-Resident Indian, buying remotely; values trust, transparency, and easy remote transactions.',
    icon: '✈️',
    accessibilityWeights: {
      airport: 1.0,
      itHub: 0.7,
      metro: 0.6,
      hospital: 0.6,
      school: 0.5,
      mall: 0.5,
      supermarket: 0.4,
      cafe: 0.3,
      pub: 0.2,
      coworking: 0.3,
    },
    featureWeights: {
      priceValue: 0.7,
      amenities: 0.6,
      premiumAmenities: 0.65,
      seniorFriendly: 0.4,
      builderReputation: 1.0,
      possessionTimeline: 0.75,
      futureGrowth: 0.85,
      density: 0.5,
      remoteBuying: 1.0,
      specifications: 0.7,
    },
    keyPriorities: [
      'Trusted, reputed builder with clean track record',
      'Online / remote buying & documentation support',
      'Virtual tour availability',
      'NRI-friendly payment plans & FEMA compliance',
      'Strong capital appreciation for long-term hold',
    ],
  },
  {
    persona: 'luxury',
    label: 'Luxury Buyer',
    description: 'High-net-worth individual, 35–60 yrs; values exclusivity, premium finishes, and low density.',
    icon: '💎',
    accessibilityWeights: {
      airport: 0.8,
      metro: 0.4,
      mall: 0.7,
      cafe: 0.6,
      hospital: 0.7,
      school: 0.5,
      itHub: 0.3,
      supermarket: 0.5,
      pub: 0.4,
      coworking: 0.3,
    },
    featureWeights: {
      priceValue: 0.3,
      amenities: 0.8,
      premiumAmenities: 1.0,
      seniorFriendly: 0.4,
      builderReputation: 0.9,
      possessionTimeline: 0.6,
      futureGrowth: 0.7,
      density: 1.0,
      remoteBuying: 0.4,
      specifications: 1.0,
    },
    keyPriorities: [
      'Low density project (fewer units per acre)',
      'Premium amenities (rooftop lounge, infinity pool, spa)',
      'High-end specifications (Kohler, Fenesta, Kajaria)',
      'Brand-name builder with luxury portfolio',
      'Premium location (lake view, green corridor)',
    ],
  },
]

// ── Scoring engine ─────────────────────────────────────────────────────────

function scoreAccessibility(project: Project, weights: PersonaWeights): number {
  const { accessibility } = project
  const w = weights.accessibilityWeights
  let score = 0
  let maxScore = 0

  const distanceScore = (km: number, ideal: number, worst: number): number => {
    if (km <= ideal) return 1
    if (km >= worst) return 0
    return 1 - (km - ideal) / (worst - ideal)
  }

  const entries: [keyof typeof accessibility, number, number][] = [
    ['metro', 0.5, 5],
    ['hospital', 0.5, 5],
    ['school', 0.5, 5],
    ['supermarket', 0.3, 3],
    ['cafe', 0.2, 3],
    ['pub', 0.3, 4],
    ['coworking', 0.3, 3],
    ['mall', 1.0, 8],
    ['itHub', 0.5, 5],
    ['airport', 20, 60],
  ]

  for (const [key, ideal, worst] of entries) {
    const weight = w[key] ?? 0
    if (weight === 0) continue
    maxScore += weight
    score += weight * distanceScore(accessibility[key], ideal, worst)
  }

  return maxScore > 0 ? (score / maxScore) * 100 : 0
}

function scoreFeatures(project: Project, weights: PersonaWeights): number {
  const fw = weights.featureWeights
  let score = 0
  let maxScore = 0

  const add = (weight: number, value: number) => {
    maxScore += weight
    score += weight * value
  }

  // price value: lower sqft price in segment = better score
  add(fw.priceValue, project.avgPricePerSqft < 8500 ? 1 : project.avgPricePerSqft < 9000 ? 0.7 : 0.4)

  // amenities count (normalised to 15)
  add(fw.amenities, Math.min(project.amenities.length / 14, 1))

  // premium amenities
  add(fw.premiumAmenities, Math.min(project.premiumAmenities.length / 5, 1))

  // senior friendly (out of 6 features)
  const sfScore = Object.values(project.seniorFriendly).filter(Boolean).length / 6
  add(fw.seniorFriendly, sfScore)

  // builder reputation (out of 5)
  add(fw.builderReputation, project.builderReputation / 5)

  // possession timeline
  const timelineScore =
    project.possessionStatus === 'ready' ? 1 :
    project.possessionStatus === 'under_construction' ? (project.builderOnTimeDelivery ? 0.75 : 0.4) : 0.3
  add(fw.possessionTimeline, timelineScore)

  // future growth
  const fgScore =
    project.futureGrowth.appreciationPotential === 'high' ? 1 :
    project.futureGrowth.appreciationPotential === 'medium' ? 0.6 : 0.3
  add(fw.futureGrowth, fgScore * 0.6 + (project.futureGrowth.rentalYield / 5) * 0.4)

  // density
  const densityScore = project.density === 'low' ? 1 : project.density === 'medium' ? 0.65 : 0.3
  add(fw.density, densityScore)

  // remote buying
  add(fw.remoteBuying, project.remoteBuyingOptions ? 1 : 0)

  // specifications quality (builder tier proxy)
  const specScore = project.builderTier === 'tier1' ? 1 : project.builderTier === 'tier2' ? 0.6 : 0.3
  add(fw.specifications, specScore)

  return maxScore > 0 ? (score / maxScore) * 100 : 0
}

export function scoreProject(project: Project, weights: PersonaWeights): PersonaScore {
  const accScore = scoreAccessibility(project, weights) * 0.45
  const featScore = scoreFeatures(project, weights) * 0.55
  const totalScore = Math.round(accScore + featScore)

  const strengths: string[] = []
  const gaps: string[] = []
  const talkingPoints: string[] = []

  // derive strengths from key priorities
  for (const priority of weights.keyPriorities) {
    const lp = priority.toLowerCase()

    if (lp.includes('metro') && project.accessibility.metro <= 1.5)
      strengths.push(`Metro only ${project.accessibility.metro} km away`)
    if (lp.includes('café') || lp.includes('cafe')) {
      if (project.accessibility.cafe <= 0.8) strengths.push(`Cafés within ${project.accessibility.cafe} km`)
      else if (project.accessibility.cafe > 2) gaps.push(`Cafés are ${project.accessibility.cafe} km away`)
    }
    if (lp.includes('co-working')) {
      if (project.accessibility.coworking <= 1) strengths.push(`Co-working spaces ${project.accessibility.coworking} km away`)
    }
    if (lp.includes('school')) {
      if (project.accessibility.school <= 2) strengths.push(`Schools within ${project.accessibility.school} km`)
      else gaps.push(`Nearest school ${project.accessibility.school} km — plan ahead`)
    }
    if (lp.includes('hospital')) {
      if (project.accessibility.hospital <= 2) strengths.push(`Hospital ${project.accessibility.hospital} km away`)
    }
    if (lp.includes('rental')) {
      talkingPoints.push(`Rental yield: ${project.futureGrowth.rentalYield}% p.a.`)
    }
    if (lp.includes('appreciation')) {
      talkingPoints.push(`Projected appreciation: ${project.futureGrowth.capitalAppreciation}% YoY`)
    }
    if (lp.includes('builder')) {
      if (project.builderReputation >= 4 && project.builderOnTimeDelivery)
        strengths.push(`${project.builder} — ${project.builderCompletedProjects} projects, on-time delivery`)
      else if (!project.builderOnTimeDelivery)
        gaps.push(`${project.builder} has delayed delivery history`)
    }
    if (lp.includes('remote') || lp.includes('nri')) {
      if (project.remoteBuyingOptions) strengths.push('Full remote buying support available')
      else gaps.push('No remote / online buying support')
    }
    if (lp.includes('density') || lp.includes('low density')) {
      if (project.density === 'low' || project.density === 'medium')
        strengths.push(`Low-density project (${project.totalUnits} units on ${project.totalAcres} acres)`)
      else gaps.push(`High-density project (${project.totalUnits} units)`)
    }
    if (lp.includes('premium amenities') || lp.includes('infinity') || lp.includes('lounge')) {
      if (project.premiumAmenities.length >= 3) strengths.push(project.premiumAmenities.join(', '))
      else if (project.premiumAmenities.length === 0) gaps.push('No premium amenities (rooftop, spa, etc.)')
    }
  }

  // add infrastructure talking points
  if (project.futureGrowth.upcomingInfrastructure.length > 0)
    talkingPoints.push(...project.futureGrowth.upcomingInfrastructure.map(i => `Upcoming: ${i}`))

  return {
    projectId: project.id,
    projectName: project.name,
    score: totalScore,
    isOwn: project.isOwn,
    strengths: [...new Set(strengths)].slice(0, 5),
    gaps: [...new Set(gaps)].slice(0, 4),
    talkingPoints: [...new Set(talkingPoints)].slice(0, 5),
  }
}

export function getPersonaWeights(persona: BuyerPersona): PersonaWeights {
  return personaWeights.find(p => p.persona === persona)!
}
