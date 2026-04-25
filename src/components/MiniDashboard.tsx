import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { projects, ownProject } from '../data/projects'
import { personaWeights, scoreProject } from '../data/personas'
import type { BuyerPersona } from '../types'

// ── Competitor mini-table ─────────────────────────────────────────────────────

interface MetricRow {
  label: string
  getValue: (id: string) => string
  lowerIsBetter?: boolean
}

const MINI_METRICS: MetricRow[] = [
  { label: 'Avg ₹/sqft',    getValue: id => `₹${projects.find(p=>p.id===id)!.avgPricePerSqft.toLocaleString()}`, lowerIsBetter: true },
  { label: 'Metro',          getValue: id => `${projects.find(p=>p.id===id)!.accessibility.metro} km`, lowerIsBetter: true },
  { label: 'IT Hub',         getValue: id => `${projects.find(p=>p.id===id)!.accessibility.itHub} km`, lowerIsBetter: true },
  { label: 'Amenities',      getValue: id => `${projects.find(p=>p.id===id)!.amenities.length}` },
  { label: 'Premium Amen.', getValue: id => `${projects.find(p=>p.id===id)!.premiumAmenities.length}` },
  { label: 'Banks',          getValue: id => `${projects.find(p=>p.id===id)!.approvedBankers.length}` },
  { label: 'Rental Yield',  getValue: id => `${projects.find(p=>p.id===id)!.futureGrowth.rentalYield}%` },
  { label: 'Appreciation',  getValue: id => `${projects.find(p=>p.id===id)!.futureGrowth.capitalAppreciation}% YoY` },
  { label: 'Density',        getValue: id => projects.find(p=>p.id===id)!.density.charAt(0).toUpperCase() + projects.find(p=>p.id===id)!.density.slice(1), lowerIsBetter: true },
  { label: 'On-time Del.',  getValue: id => projects.find(p=>p.id===id)!.builderOnTimeDelivery ? '✓ Yes' : '✗ No' },
]

function numOf(val: string): number | null {
  const n = parseFloat(val.replace(/[^0-9.]/g, ''))
  return isNaN(n) ? null : n
}

function getStatus(ownVal: string, compVals: string[], lowerIsBetter?: boolean): 'better' | 'worse' | 'same' | 'na' {
  const ownN = numOf(ownVal)
  const compNs = compVals.map(numOf).filter((n): n is number => n !== null)
  if (ownN === null || compNs.length === 0) return 'na'
  const best = lowerIsBetter ? Math.min(...compNs) : Math.max(...compNs)
  if (lowerIsBetter) {
    if (ownN <= best * 1.05) return 'better'
    if (ownN <= best * 1.18) return 'same'
    return 'worse'
  } else {
    if (ownN >= best * 0.95) return 'better'
    if (ownN >= best * 0.82) return 'same'
    return 'worse'
  }
}

export function CompetitorMini() {
  const competitors = projects.filter(p => !p.isOwn)
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left py-2 pr-3 font-semibold text-white/70 whitespace-nowrap w-28">Metric</th>
            <th className="text-center py-2 px-2 font-black text-white whitespace-nowrap">
              {ownProject.name.split(' ').slice(-1)[0]}
              <span className="ml-1 text-[9px] bg-white/20 px-1 py-0.5 rounded">OURS</span>
            </th>
            {competitors.map(c => (
              <th key={c.id} className="text-center py-2 px-2 font-semibold text-white/80 whitespace-nowrap">
                {c.builder.split(' ')[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MINI_METRICS.map((row, i) => {
            const ownVal = row.getValue(ownProject.id)
            const compVals = competitors.map(c => row.getValue(c.id))
            const st = getStatus(ownVal, compVals, row.lowerIsBetter)
            return (
              <tr key={row.label} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                <td className="py-1.5 pr-3 text-white/60 whitespace-nowrap">{row.label}</td>
                <td className="py-1.5 px-2 text-center font-bold">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] ${
                    st === 'better' ? 'bg-emerald-400/20 text-emerald-300' :
                    st === 'worse'  ? 'bg-red-400/20 text-red-300' :
                    st === 'same'   ? 'bg-yellow-400/20 text-yellow-200' :
                    'text-white'
                  }`}>
                    {st === 'better' && <TrendingUp size={10} />}
                    {st === 'worse'  && <TrendingDown size={10} />}
                    {st === 'same'   && <Minus size={10} />}
                    {ownVal}
                  </span>
                </td>
                {competitors.map(c => (
                  <td key={c.id} className="py-1.5 px-2 text-center text-white/70">{row.getValue(c.id)}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ── Persona score bars ────────────────────────────────────────────────────────

export function PersonaMini({ persona }: { persona: BuyerPersona }) {
  const weights = personaWeights.find(pw => pw.persona === persona)
  if (!weights) return null
  const scores = projects
    .map(p => scoreProject(p, weights))
    .sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-2">
      {scores.map((s, rank) => (
        <div key={s.projectId} className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
            rank === 0 ? 'bg-yellow-400 text-gray-900' :
            rank === 1 ? 'bg-gray-300 text-gray-700' :
            rank === 2 ? 'bg-orange-400 text-white' :
            'bg-white/20 text-white/60'
          }`}>{rank + 1}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] font-semibold truncate ${s.isOwn ? 'text-white' : 'text-white/75'}`}>
                {s.projectName}
              </span>
              <span className={`text-xs font-black ml-2 shrink-0 ${
                s.isOwn ? 'text-emerald-300' :
                s.score >= 65 ? 'text-yellow-300' : 'text-white/50'
              }`}>{s.score}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  s.isOwn ? 'bg-emerald-400' :
                  s.score >= 65 ? 'bg-yellow-400' : 'bg-white/30'
                }`}
                style={{ width: `${s.score}%` }}
              />
            </div>
          </div>
        </div>
      ))}
      {/* Top strengths for our project */}
      {(() => {
        const ownScore = scores.find(s => s.isOwn)
        if (!ownScore || ownScore.strengths.length === 0) return null
        return (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Our Strengths for {weights.label}</div>
            {ownScore.strengths.slice(0, 3).map((str, i) => (
              <div key={i} className="text-[11px] text-emerald-300 flex gap-1 mt-0.5">
                <span className="shrink-0">✓</span>{str}
              </div>
            ))}
          </div>
        )
      })()}
    </div>
  )
}

// ── Wrapper shown below AI message ────────────────────────────────────────────

interface MiniDashboardProps {
  trigger: 'competitor' | 'persona'
  persona: string | null
}

export function MiniDashboard({ trigger, persona }: MiniDashboardProps) {
  const [open, setOpen] = useState(true)
  const validPersona = (persona as BuyerPersona) || 'bachelor'
  const personaLabel = personaWeights.find(pw => pw.persona === validPersona)?.label || 'Buyer'
  const personaIcon = personaWeights.find(pw => pw.persona === validPersona)?.icon || '📊'

  const title = trigger === 'competitor'
    ? '📊 Live Comparison Dashboard'
    : `${personaIcon} ${personaLabel} — Score Ranking`

  return (
    <div className="mt-3 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-blue-400 rounded-full" />
          <span className="text-sm font-bold text-white">{title}</span>
        </div>
        <span className="text-white/40">{open ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</span>
      </button>

      {open && (
        <div className="px-4 pb-4">
          {trigger === 'competitor'
            ? <CompetitorMini />
            : <PersonaMini persona={validPersona} />
          }
        </div>
      )}
    </div>
  )
}
