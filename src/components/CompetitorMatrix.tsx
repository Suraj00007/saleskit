import { useState } from 'react'
import { ChevronDown, ChevronUp, Info, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { Project, CompareStatus } from '../types'
import { ownProject, projects } from '../data/projects'

interface RowDef {
  label: string
  category: string
  getValue: (p: Project) => string | number
  compareDirection: 'lower_better' | 'higher_better' | 'info'
  tooltip?: string
}

const rows: RowDef[] = [
  // Pricing
  { label: 'Avg Price / sqft', category: 'Pricing', getValue: p => `₹${p.avgPricePerSqft.toLocaleString()}`, compareDirection: 'lower_better', tooltip: 'Lower price per sqft = better value for buyer' },
  { label: 'Starting Price (2BHK)', category: 'Pricing', getValue: p => { const v = p.variants.find(x => x.type === '2BHK'); return v ? `₹${v.startingPrice}L` : '—' }, compareDirection: 'lower_better' },
  { label: 'Starting Price (3BHK)', category: 'Pricing', getValue: p => { const v = p.variants.find(x => x.type === '3BHK'); return v ? `₹${v.startingPrice}L` : '—' }, compareDirection: 'lower_better' },
  { label: 'Builder Tier', category: 'Pricing', getValue: p => p.builderTier === 'tier1' ? 'Tier 1' : p.builderTier === 'tier2' ? 'Tier 2' : 'Tier 3', compareDirection: 'higher_better' },

  // Amenities
  { label: 'Total Amenities', category: 'Amenities', getValue: p => p.amenities.length, compareDirection: 'higher_better' },
  { label: 'Premium Amenities', category: 'Amenities', getValue: p => p.premiumAmenities.length > 0 ? p.premiumAmenities.join(', ') : 'None', compareDirection: 'info' },
  { label: 'Swimming Pool', category: 'Amenities', getValue: p => p.amenities.includes('Swimming Pool') ? '✓' : '✗', compareDirection: 'higher_better' },
  { label: 'Co-Working Space', category: 'Amenities', getValue: p => p.premiumAmenities.some(a => a.toLowerCase().includes('co-work')) ? '✓' : '✗', compareDirection: 'higher_better' },

  // Senior Friendly
  { label: 'Senior Gymnasium', category: 'Senior Friendly', getValue: p => p.seniorFriendly.gymnasium ? '✓' : '✗', compareDirection: 'higher_better' },
  { label: 'Indoor Game Room', category: 'Senior Friendly', getValue: p => p.seniorFriendly.indoorGameRoom ? '✓' : '✗', compareDirection: 'higher_better' },
  { label: 'Reading Desk', category: 'Senior Friendly', getValue: p => p.seniorFriendly.readingDesk ? '✓' : '✗', compareDirection: 'higher_better' },
  { label: '24/7 Ambulance', category: 'Senior Friendly', getValue: p => p.seniorFriendly.ambulanceService ? '✓' : '✗', compareDirection: 'higher_better' },
  { label: 'Senior Care Room', category: 'Senior Friendly', getValue: p => p.seniorFriendly.seniorCareRoom ? '✓' : '✗', compareDirection: 'higher_better' },

  // Banking
  { label: 'Approved Banks', category: 'Banking', getValue: p => p.approvedBankers.join(', '), compareDirection: 'info' },
  { label: 'No. of Approved Banks', category: 'Banking', getValue: p => p.approvedBankers.length, compareDirection: 'higher_better' },
  { label: 'SBI Approved', category: 'Banking', getValue: p => p.approvedBankers.includes('SBI') ? '✓' : '✗', compareDirection: 'higher_better' },

  // Builder
  { label: 'Builder Reputation', category: 'Builder', getValue: p => '★'.repeat(p.builderReputation) + '☆'.repeat(5 - p.builderReputation), compareDirection: 'higher_better' },
  { label: 'Completed Projects', category: 'Builder', getValue: p => p.builderCompletedProjects, compareDirection: 'higher_better' },
  { label: 'Years in Market', category: 'Builder', getValue: p => `${p.builderYearsInMarket} yrs`, compareDirection: 'higher_better' },
  { label: 'On-Time Delivery', category: 'Builder', getValue: p => p.builderOnTimeDelivery ? '✓ Yes' : '✗ No', compareDirection: 'higher_better' },

  // Possession
  { label: 'Possession Status', category: 'Possession', getValue: p => p.possessionStatus === 'ready' ? 'Ready to Move' : p.possessionStatus === 'under_construction' ? 'Under Construction' : 'Upcoming', compareDirection: 'info' },
  { label: 'Possession Timeline', category: 'Possession', getValue: p => p.possessionTimeline, compareDirection: 'info' },

  // Accessibility
  { label: 'Metro Distance', category: 'Accessibility', getValue: p => `${p.accessibility.metro} km`, compareDirection: 'lower_better' },
  { label: 'Hospital Distance', category: 'Accessibility', getValue: p => `${p.accessibility.hospital} km`, compareDirection: 'lower_better' },
  { label: 'School Distance', category: 'Accessibility', getValue: p => `${p.accessibility.school} km`, compareDirection: 'lower_better' },
  { label: 'Supermarket Distance', category: 'Accessibility', getValue: p => `${p.accessibility.supermarket} km`, compareDirection: 'lower_better' },
  { label: 'Café Distance', category: 'Accessibility', getValue: p => `${p.accessibility.cafe} km`, compareDirection: 'lower_better' },
  { label: 'IT Hub Distance', category: 'Accessibility', getValue: p => `${p.accessibility.itHub} km`, compareDirection: 'lower_better' },
  { label: 'Airport Distance', category: 'Accessibility', getValue: p => `${p.accessibility.airport} km`, compareDirection: 'lower_better' },

  // Future Growth
  { label: 'Appreciation Potential', category: 'Future Growth', getValue: p => p.futureGrowth.appreciationPotential.toUpperCase(), compareDirection: 'higher_better' },
  { label: 'Rental Yield (p.a.)', category: 'Future Growth', getValue: p => `${p.futureGrowth.rentalYield}%`, compareDirection: 'higher_better' },
  { label: 'Capital Appreciation', category: 'Future Growth', getValue: p => `${p.futureGrowth.capitalAppreciation}% YoY`, compareDirection: 'higher_better' },
  { label: 'Upcoming Infrastructure', category: 'Future Growth', getValue: p => p.futureGrowth.upcomingInfrastructure.join('; ') || 'None', compareDirection: 'info' },

  // Specifications
  { label: 'Flooring', category: 'Specifications', getValue: p => p.specifications.flooring, compareDirection: 'info' },
  { label: 'Windows', category: 'Specifications', getValue: p => p.specifications.windows, compareDirection: 'info' },
  { label: 'Bathroom Fittings', category: 'Specifications', getValue: p => p.specifications.bathroom, compareDirection: 'info' },
  { label: 'Paint Brand', category: 'Specifications', getValue: p => p.specifications.paintBrand, compareDirection: 'info' },

  // Project Details
  { label: 'Total Units', category: 'Project Details', getValue: p => p.totalUnits, compareDirection: 'lower_better', tooltip: 'Fewer units = lower density = more privacy' },
  { label: 'Total Acres', category: 'Project Details', getValue: p => `${p.totalAcres} acres`, compareDirection: 'higher_better' },
  { label: 'Density', category: 'Project Details', getValue: p => p.density.charAt(0).toUpperCase() + p.density.slice(1), compareDirection: 'info' },
  { label: 'Virtual Tour', category: 'Project Details', getValue: p => p.virtualTour ? '✓' : '✗', compareDirection: 'higher_better' },
  { label: 'Remote Buying', category: 'Project Details', getValue: p => p.remoteBuyingOptions ? '✓' : '✗', compareDirection: 'higher_better' },
  { label: 'NRI Friendly', category: 'Project Details', getValue: p => p.nriFriendly ? '✓' : '✗', compareDirection: 'higher_better' },
]

function getNumericValue(val: string | number): number | null {
  if (typeof val === 'number') return val
  const n = parseFloat(val.replace(/[^0-9.]/g, ''))
  return isNaN(n) ? null : n
}

function compareStatus(
  ownVal: string | number,
  compVals: (string | number)[],
  dir: RowDef['compareDirection'],
): CompareStatus {
  if (dir === 'info') return 'na'
  const ownNum = getNumericValue(ownVal)
  const compNums = compVals.map(getNumericValue).filter((n): n is number => n !== null)
  if (ownNum === null || compNums.length === 0) return 'na'

  const best = dir === 'lower_better' ? Math.min(...compNums) : Math.max(...compNums)
  if (dir === 'lower_better') {
    if (ownNum <= best * 1.05) return 'better'
    if (ownNum <= best * 1.15) return 'same'
    return 'worse'
  } else {
    if (ownNum >= best * 0.95) return 'better'
    if (ownNum >= best * 0.85) return 'same'
    return 'worse'
  }
}

function cellStatus(
  projectId: string,
  _ownVal: string | number,
  allVals: Record<string, string | number>,
  dir: RowDef['compareDirection'],
): CompareStatus {
  if (dir === 'info') return 'na'
  const val = allVals[projectId]
  const num = getNumericValue(val)
  if (num === null) return 'na'

  const all = Object.values(allVals).map(getNumericValue).filter((n): n is number => n !== null)
  if (all.length === 0) return 'na'

  const best = dir === 'lower_better' ? Math.min(...all) : Math.max(...all)
  const worst = dir === 'lower_better' ? Math.max(...all) : Math.min(...all)

  if (dir === 'lower_better') {
    if (num <= best * 1.05) return 'better'
    if (num >= worst * 0.95) return 'worse'
    return 'same'
  } else {
    if (num >= best * 0.95) return 'better'
    if (num <= worst * 1.05) return 'worse'
    return 'same'
  }
}

const statusBg: Record<CompareStatus, string> = {
  better: 'bg-emerald-50 text-emerald-800 font-semibold',
  worse: 'bg-red-50 text-red-700',
  same: 'bg-yellow-50 text-yellow-800',
  na: 'bg-white text-gray-700',
}

const ownStatusBg: Record<CompareStatus, string> = {
  better: 'bg-emerald-100 text-emerald-900 font-bold',
  worse: 'bg-red-100 text-red-900 font-bold',
  same: 'bg-yellow-100 text-yellow-900 font-bold',
  na: 'bg-blue-50 text-blue-900 font-bold',
}

const categories = [...new Set(rows.map(r => r.category))]

export default function CompetitorMatrix() {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(
    projects.filter(p => !p.isOwn).map(p => p.id)
  )
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories)
  )
  const [highlightOwnWins, setHighlightOwnWins] = useState(true)

  const shownProjects = [
    ownProject,
    ...projects.filter(p => !p.isOwn && selectedCompetitors.includes(p.id)),
  ]

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  const toggleCompetitor = (id: string) => {
    setSelectedCompetitors(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const ownWins = rows.filter(row => {
    const ownVal = row.getValue(ownProject)
    const compVals = shownProjects.filter(p => !p.isOwn).map(p => row.getValue(p))
    return compareStatus(ownVal, compVals, row.compareDirection) === 'better'
  }).length

  const ownGaps = rows.filter(row => {
    const ownVal = row.getValue(ownProject)
    const compVals = shownProjects.filter(p => !p.isOwn).map(p => row.getValue(p))
    return compareStatus(ownVal, compVals, row.compareDirection) === 'worse'
  }).length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Competitor Comparison Matrix</h2>
        <p className="text-sm text-gray-500 mb-4">Compare {ownProject.name} against nearby projects. Green = we lead · Red = we lag.</p>

        {/* Scorecard */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-emerald-50 rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-emerald-700">{ownWins}</div>
            <div className="text-xs text-emerald-600 font-medium">Where We Lead</div>
          </div>
          <div className="flex-1 bg-red-50 rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-red-600">{ownGaps}</div>
            <div className="text-xs text-red-500 font-medium">Where We Lag</div>
          </div>
          <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-blue-700">{rows.length - ownWins - ownGaps}</div>
            <div className="text-xs text-blue-600 font-medium">On Par / Info</div>
          </div>
        </div>

        {/* Competitor toggles */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs text-gray-500 self-center font-medium">Compare vs:</span>
          {projects.filter(p => !p.isOwn).map(p => (
            <button
              key={p.id}
              onClick={() => toggleCompetitor(p.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                selectedCompetitors.includes(p.id)
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-500 border-gray-200'
              }`}
            >
              {p.builder} — {p.name}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={highlightOwnWins}
            onChange={e => setHighlightOwnWins(e.target.checked)}
            className="rounded"
          />
          Highlight our project's wins & gaps with colour
        </label>
      </div>

      {/* Quick Win / Gap Cards */}
      <div className="grid grid-cols-1 gap-3">
        {/* Wins */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-emerald-600" />
            <span className="text-sm font-bold text-emerald-800">Our Winning Points</span>
          </div>
          <ul className="space-y-1">
            {ownProject.highlights.map((h, i) => (
              <li key={i} className="text-xs text-emerald-700 flex gap-1">
                <span className="text-emerald-500 shrink-0">•</span> {h}
              </li>
            ))}
          </ul>
        </div>
        {/* Gaps */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={16} className="text-red-500" />
            <span className="text-sm font-bold text-red-700">Honest Gap Areas</span>
          </div>
          <ul className="space-y-1">
            {ownProject.concerns.map((c, i) => (
              <li key={i} className="text-xs text-red-600 flex gap-1">
                <span className="text-red-400 shrink-0">•</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Category tables */}
      {categories.map(cat => {
        const catRows = rows.filter(r => r.category === cat)
        const isExpanded = expandedCategories.has(cat)

        return (
          <div key={cat} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              onClick={() => toggleCategory(cat)}
            >
              <span className="font-bold text-gray-800">{cat}</span>
              <span className="text-gray-400">{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
            </button>

            {isExpanded && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-t border-gray-100">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 w-40 sticky left-0 bg-gray-50">Attribute</th>
                      {/* Own project */}
                      <th className="text-center px-4 py-3 min-w-[160px]">
                        <div className="text-xs font-black text-blue-700 uppercase tracking-wide">{ownProject.name}</div>
                        <div className="text-[10px] text-blue-500">{ownProject.builder}</div>
                      </th>
                      {/* Competitors */}
                      {shownProjects.filter(p => !p.isOwn).map(p => (
                        <th key={p.id} className="text-center px-4 py-3 min-w-[160px]">
                          <div className="text-xs font-semibold text-gray-700">{p.name}</div>
                          <div className="text-[10px] text-gray-400">{p.builder} · {p.builderTier === 'tier1' ? 'T1' : 'T2'}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {catRows.map((row, i) => {
                      const allVals: Record<string, string | number> = {}
                      shownProjects.forEach(p => { allVals[p.id] = row.getValue(p) })

                      const ownVal = allVals[ownProject.id]
                      const ownSt = highlightOwnWins
                        ? compareStatus(ownVal, shownProjects.filter(p => !p.isOwn).map(p => allVals[p.id]), row.compareDirection)
                        : 'na'

                      return (
                        <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <td className="px-4 py-3 text-xs font-medium text-gray-600 sticky left-0 bg-inherit whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              {row.label}
                              {row.tooltip && (
                                <span title={row.tooltip} className="text-gray-300 cursor-help">
                                  <Info size={11} />
                                </span>
                              )}
                            </div>
                          </td>
                          {/* Own project cell */}
                          <td className={`px-4 py-3 text-center text-xs ${highlightOwnWins ? ownStatusBg[ownSt] : 'bg-blue-50/40 text-blue-900 font-semibold'}`}>
                            <div className="flex items-center justify-center gap-1">
                              {highlightOwnWins && ownSt === 'better' && <TrendingUp size={12} className="text-emerald-600 shrink-0" />}
                              {highlightOwnWins && ownSt === 'worse' && <TrendingDown size={12} className="text-red-500 shrink-0" />}
                              {highlightOwnWins && ownSt === 'same' && <Minus size={12} className="text-yellow-500 shrink-0" />}
                              <span className="break-words max-w-[140px]">{String(ownVal)}</span>
                            </div>
                          </td>
                          {/* Competitor cells */}
                          {shownProjects.filter(p => !p.isOwn).map(p => {
                            const st = highlightOwnWins ? cellStatus(p.id, ownVal, allVals, row.compareDirection) : 'na'
                            return (
                              <td key={p.id} className={`px-4 py-3 text-center text-xs ${highlightOwnWins ? statusBg[st] : 'text-gray-700'}`}>
                                <span className="break-words max-w-[140px]">{String(allVals[p.id])}</span>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
