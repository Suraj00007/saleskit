import { useState } from 'react'
import { BarChart2, Users, Sparkles, MapPin } from 'lucide-react'
import CompetitorMatrix from './components/CompetitorMatrix'
import BuyerPersona from './components/BuyerPersona'
import AIAgent from './components/AIAgent'
import { ownProject } from './data/projects'
import './index.css'

type Tab = 'competitor' | 'persona' | 'ai'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('competitor')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top nav */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart2 size={16} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-black text-gray-900 leading-none">SalesKit</div>
                <div className="text-[10px] text-gray-400 leading-none mt-0.5">by MotiveMinds</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={12} />
              <span className="hidden sm:inline">{ownProject.location}</span>
              <span className="sm:hidden">Sarjapur Rd</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project banner — hidden on AI tab for max chat space */}
      {activeTab !== 'ai' && (
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shrink-0">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-medium text-blue-200 mb-0.5 uppercase tracking-wide">Our Project</div>
                <h1 className="text-xl font-black leading-none">{ownProject.name}</h1>
                <p className="text-sm text-blue-200 mt-1">{ownProject.builder} · {ownProject.micromarket}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-200">Starting</div>
                <div className="text-lg font-black">₹{ownProject.variants[0].startingPrice}L</div>
                <div className="text-[10px] text-blue-300">₹{ownProject.avgPricePerSqft.toLocaleString()}/sqft</div>
              </div>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {ownProject.highlights.map((h, i) => (
                <span key={i} className="text-[10px] bg-white/20 text-white px-2 py-1 rounded-full leading-none">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200 shrink-0">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('competitor')}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'competitor'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart2 size={15} />
              <span className="hidden sm:inline">Competitor Analysis</span>
              <span className="sm:hidden">Compare</span>
            </button>

            <button
              onClick={() => setActiveTab('persona')}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'persona'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users size={15} />
              <span className="hidden sm:inline">Buyer Persona</span>
              <span className="sm:hidden">Persona</span>
            </button>

            {/* AI tab — highlighted with gradient */}
            <button
              onClick={() => setActiveTab('ai')}
              className={`relative flex items-center gap-2 px-4 py-3.5 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'ai'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-indigo-500'
              }`}
            >
              <Sparkles size={15} className={activeTab === 'ai' ? 'text-indigo-600' : ''} />
              <span className="hidden sm:inline">AI Agent</span>
              <span className="sm:hidden">AI</span>
              {/* "New" badge */}
              <span className="absolute -top-0.5 -right-0.5 sm:static sm:ml-1 text-[9px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-1.5 py-0.5 rounded-full font-bold leading-none">
                NEW
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'ai' ? (
        // AI tab: full remaining viewport height as a dark chat container
        <div
          className="flex-1 max-w-5xl w-full mx-auto px-4 py-4"
          style={{ height: 'calc(100vh - 113px)' }}
        >
          <AIAgent />
        </div>
      ) : (
        <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-5">
          {activeTab === 'competitor' ? <CompetitorMatrix /> : <BuyerPersona />}
        </div>
      )}
    </div>
  )
}
