import { useState } from 'react'
import { TrendingUp, AlertCircle, MessageSquare, Star, MapPin, Building2 } from 'lucide-react'
import { projects } from '../data/projects'
import { personaWeights, scoreProject } from '../data/personas'
import type { BuyerPersona as BuyerPersonaType } from '../types'

const personaColors: Record<BuyerPersonaType, { bg: string; badge: string; border: string; accent: string }> = {
  bachelor: { bg: 'from-violet-50 to-purple-50', badge: 'bg-violet-100 text-violet-800', border: 'border-violet-200', accent: 'text-violet-700' },
  family: { bg: 'from-blue-50 to-sky-50', badge: 'bg-blue-100 text-blue-800', border: 'border-blue-200', accent: 'text-blue-700' },
  investor: { bg: 'from-emerald-50 to-teal-50', badge: 'bg-emerald-100 text-emerald-800', border: 'border-emerald-200', accent: 'text-emerald-700' },
  nri: { bg: 'from-amber-50 to-yellow-50', badge: 'bg-amber-100 text-amber-800', border: 'border-amber-200', accent: 'text-amber-700' },
  luxury: { bg: 'from-rose-50 to-pink-50', badge: 'bg-rose-100 text-rose-800', border: 'border-rose-200', accent: 'text-rose-700' },
}

function ScoreBar({ score, isOwn }: { score: number; isOwn: boolean }) {
  const color = score >= 75 ? 'bg-emerald-500' : score >= 55 ? 'bg-yellow-400' : 'bg-red-400'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${isOwn ? 'bg-blue-500' : color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-sm font-bold w-10 text-right ${isOwn ? 'text-blue-600' : score >= 75 ? 'text-emerald-600' : score >= 55 ? 'text-yellow-600' : 'text-red-500'}`}>
        {score}
      </span>
    </div>
  )
}

export default function BuyerPersona() {
  const [activPersona, setActivePersona] = useState<BuyerPersonaType>('bachelor')
  const [expandedProject, setExpandedProject] = useState<string | null>('motiveminds-vista')

  const weights = personaWeights.find(pw => pw.persona === activPersona)!
  const scores = projects
    .map(p => scoreProject(p, weights))
    .sort((a, b) => b.score - a.score)

  // ownScore used implicitly via scores array ordering
  const colors = personaColors[activPersona]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Buyer Persona Recommendation</h2>
        <p className="text-sm text-gray-500">Select a buyer type to see how each project scores for that persona — and get on-site talking points.</p>
      </div>

      {/* Persona Selector */}
      <div className="grid grid-cols-5 gap-2">
        {personaWeights.map(pw => {
          const c = personaColors[pw.persona]
          const isActive = pw.persona === activPersona
          return (
            <button
              key={pw.persona}
              onClick={() => { setActivePersona(pw.persona); setExpandedProject('motiveminds-vista') }}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${
                isActive
                  ? `${c.border} ${c.badge} shadow-sm scale-105`
                  : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
              }`}
            >
              <span className="text-2xl">{pw.icon}</span>
              <span className="text-[10px] font-semibold text-center leading-tight">
                {pw.label.split(' ')[0]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active persona description + priorities */}
      <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl border ${colors.border} p-5`}>
        <div className="flex items-start gap-3">
          <span className="text-3xl">{weights.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-base font-bold ${colors.accent}`}>{weights.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                Persona
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{weights.description}</p>
            <div>
              <div className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">What matters most to them</div>
              <ul className="space-y-1">
                {weights.keyPriorities.map((p, i) => (
                  <li key={i} className="flex gap-2 text-xs text-gray-700">
                    <span className={`font-bold shrink-0 ${colors.accent}`}>{i + 1}.</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Score ranking */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-4">
          Project Ranking for <span className={colors.accent}>{weights.label}</span>
        </h3>
        <div className="space-y-3">
          {scores.map((s, rank) => (
            <div key={s.projectId} className={`flex items-center gap-3 ${s.isOwn ? 'opacity-100' : 'opacity-80'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                rank === 0 ? 'bg-yellow-400 text-white' :
                rank === 1 ? 'bg-gray-300 text-gray-700' :
                rank === 2 ? 'bg-orange-300 text-white' :
                'bg-gray-100 text-gray-500'
              }`}>
                {rank + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span className={`text-xs font-semibold truncate ${s.isOwn ? 'text-blue-700' : 'text-gray-700'}`}>
                    {s.projectName}
                  </span>
                  {s.isOwn && (
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold shrink-0">OUR PROJECT</span>
                  )}
                </div>
                <ScoreBar score={s.score} isOwn={s.isOwn} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project deep-dives */}
      <div className="space-y-3">
        {scores.map((s, rank) => {
          const project = projects.find(p => p.id === s.projectId)!
          const isExpanded = expandedProject === s.projectId
          const isOwn = s.isOwn

          return (
            <div
              key={s.projectId}
              className={`rounded-2xl border overflow-hidden transition-all ${
                isOwn ? 'border-blue-200 shadow-md' : 'border-gray-100 shadow-sm'
              }`}
            >
              {/* Card header */}
              <button
                className={`w-full flex items-center gap-3 p-4 text-left ${isOwn ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'} transition-colors`}
                onClick={() => setExpandedProject(isExpanded ? null : s.projectId)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
                  rank === 0 ? 'bg-yellow-400 text-white' :
                  rank === 1 ? 'bg-gray-300 text-gray-700' :
                  rank === 2 ? 'bg-orange-300 text-white' :
                  'bg-gray-100 text-gray-500'
                }`}>{rank + 1}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-bold ${isOwn ? 'text-blue-800' : 'text-gray-800'}`}>{project.name}</span>
                    {isOwn && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">OUR PROJECT</span>}
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{project.builder}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isOwn ? 'bg-blue-500' : s.score >= 75 ? 'bg-emerald-500' : s.score >= 55 ? 'bg-yellow-400' : 'bg-red-400'}`}
                        style={{ width: `${s.score}%` }}
                      />
                    </div>
                    <span className={`text-xs font-black ${isOwn ? 'text-blue-700' : s.score >= 75 ? 'text-emerald-600' : 'text-gray-600'}`}>
                      {s.score}/100
                    </span>
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className={`border-t ${isOwn ? 'border-blue-100 bg-blue-50/30' : 'border-gray-100 bg-white'} p-4 space-y-4`}>

                  {/* Key facts row */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                      <div className="text-xs text-gray-400 mb-0.5">Avg ₹/sqft</div>
                      <div className="text-sm font-bold text-gray-800">₹{project.avgPricePerSqft.toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                      <div className="text-xs text-gray-400 mb-0.5">Rental Yield</div>
                      <div className="text-sm font-bold text-gray-800">{project.futureGrowth.rentalYield}% p.a.</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                      <div className="text-xs text-gray-400 mb-0.5">Possession</div>
                      <div className="text-sm font-bold text-gray-800">{project.possessionTimeline}</div>
                    </div>
                  </div>

                  {/* Strengths for this persona */}
                  {s.strengths.length > 0 && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={14} className="text-emerald-600 shrink-0" />
                        <span className="text-xs font-bold text-emerald-800">Strengths for {weights.label}</span>
                      </div>
                      <ul className="space-y-1">
                        {s.strengths.map((str, i) => (
                          <li key={i} className="text-xs text-emerald-700 flex gap-1">
                            <span className="text-emerald-500 shrink-0">✓</span> {str}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Gaps for this persona */}
                  {s.gaps.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle size={14} className="text-red-500 shrink-0" />
                        <span className="text-xs font-bold text-red-700">Gaps vs this persona's needs</span>
                      </div>
                      <ul className="space-y-1">
                        {s.gaps.map((g, i) => (
                          <li key={i} className="text-xs text-red-600 flex gap-1">
                            <span className="text-red-400 shrink-0">!</span> {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Talking points */}
                  {s.talkingPoints.length > 0 && (
                    <div className={`${isOwn ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'} border rounded-xl p-3`}>
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare size={14} className={isOwn ? 'text-blue-600' : 'text-gray-500'} />
                        <span className={`text-xs font-bold ${isOwn ? 'text-blue-800' : 'text-gray-700'}`}>Talking Points</span>
                      </div>
                      <ul className="space-y-1">
                        {s.talkingPoints.map((tp, i) => (
                          <li key={i} className={`text-xs flex gap-1 ${isOwn ? 'text-blue-700' : 'text-gray-600'}`}>
                            <span className="shrink-0">→</span> {tp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Accessibility snapshot for this persona */}
                  <div>
                    <div className="text-xs font-bold text-gray-600 mb-2 flex items-center gap-1">
                      <MapPin size={12} /> Key Distances
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(weights.accessibilityWeights)
                        .filter(([, w]) => (w ?? 0) >= 0.6)
                        .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
                        .slice(0, 6)
                        .map(([key]) => {
                          const km = project.accessibility[key as keyof typeof project.accessibility]
                          const label = key.charAt(0).toUpperCase() + key.slice(1)
                          const good = key === 'airport' ? km <= 40 : km <= 2
                          return (
                            <div
                              key={key}
                              className={`rounded-lg p-2 text-center border ${good ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}
                            >
                              <div className="text-[10px] text-gray-500">{label}</div>
                              <div className={`text-xs font-bold ${good ? 'text-emerald-700' : 'text-red-600'}`}>{km} km</div>
                            </div>
                          )
                        })}
                    </div>
                  </div>

                  {/* Builder reputation */}
                  <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
                    <Building2 size={16} className="text-gray-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-700 truncate">{project.builder}</div>
                      <div className="text-[10px] text-gray-400">{project.builderCompletedProjects} projects · {project.builderYearsInMarket} yrs</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(n => (
                        <Star
                          key={n}
                          size={12}
                          className={n <= project.builderReputation ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
