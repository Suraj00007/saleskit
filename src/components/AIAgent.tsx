import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Sparkles, RotateCcw, AlertTriangle } from 'lucide-react'
import ChatMessage from './ChatMessage'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  displayContent: string   // stripped of ---STRUCTURED--- block
  isStreaming?: boolean
  structuredData?: {
    dashboardTrigger: 'competitor' | 'persona' | null
    persona: string | null
    quickReplies: string[]
  } | null
  timestamp: Date
}

function parseStructured(raw: string) {
  const match = raw.match(/---STRUCTURED---\s*([\s\S]*?)\s*---END---/)
  if (!match) return null
  try {
    return JSON.parse(match[1])
  } catch {
    return null
  }
}

function getDisplay(raw: string) {
  return raw.replace(/---STRUCTURED---[\s\S]*?---END---/g, '').trim()
}

// ── Suggested questions ────────────────────────────────────────────────────────

const SUGGESTIONS = [
  { icon: '🎯', label: 'Bachelor pitch', q: 'How do I pitch MotiveMinds Vista to a bachelor buyer on-site? Give me the exact script.' },
  { icon: '👨‍👩‍👧‍👦', label: 'Family pitch', q: 'A family of 4 is visiting today — school-going kids and elderly parents. How should I pitch our project to them?' },
  { icon: '📈', label: 'Investor ROI', q: 'An investor is asking about returns compared to Prestige and Sobha. Walk me through the ROI case for our project.' },
  { icon: '✈️', label: 'NRI objection', q: 'An NRI says they\'re worried about buying remotely without seeing the flat. How do I handle this?' },
  { icon: '🏆', label: 'Beat Mana', q: 'A customer says Mana Foresta is 20% cheaper — why should they pay more for our project?' },
  { icon: '💎', label: 'Luxury angle', q: 'I have a luxury HNI buyer who has seen Prestige Elm Park. How do I position our project as more exclusive?' },
]

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ onSuggest }: { onSuggest: (q: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8">
      {/* Logo */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-xl shadow-indigo-900/40">
        <Sparkles size={28} className="text-white" />
      </div>
      <h2 className="text-xl font-black text-white mb-1">SalesKit AI</h2>
      <p className="text-sm text-slate-400 text-center max-w-xs mb-8">
        Your on-site sales intelligence. Ask about competitor gaps, buyer pitches, objection handling, and ROI cases.
      </p>

      {/* Suggestion grid */}
      <div className="w-full max-w-xl grid grid-cols-2 gap-2.5">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => onSuggest(s.q)}
            className="group relative flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-indigo-500/60 hover:bg-slate-700/60 transition-all duration-200 text-left overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl shrink-0 mt-0.5">{s.icon}</span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-indigo-300 mb-0.5">{s.label}</div>
              <div className="text-[11px] text-slate-400 leading-snug line-clamp-2">{s.q}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── API-not-configured banner ─────────────────────────────────────────────────

function ApiNotConfigured() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-8">
      <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4">
        <AlertTriangle size={24} className="text-amber-400" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">API Key Not Configured</h3>
      <p className="text-sm text-slate-400 text-center max-w-sm mb-4">
        SalesKit AI needs an Anthropic API key to work.
      </p>
      <div className="bg-slate-800 rounded-xl p-4 w-full max-w-sm border border-slate-700 text-left">
        <div className="text-xs font-bold text-slate-300 mb-2">Setup instructions:</div>
        <ol className="space-y-2 text-xs text-slate-400">
          <li className="flex gap-2"><span className="text-indigo-400 font-bold shrink-0">1.</span>Create a <code className="bg-slate-700 px-1 rounded">.env</code> file in the project root</li>
          <li className="flex gap-2"><span className="text-indigo-400 font-bold shrink-0">2.</span>Add: <code className="bg-slate-700 px-1 rounded">ANTHROPIC_API_KEY=your_key_here</code></li>
          <li className="flex gap-2"><span className="text-indigo-400 font-bold shrink-0">3.</span>Restart with <code className="bg-slate-700 px-1 rounded">npm run dev</code></li>
        </ol>
      </div>
    </div>
  )
}

// ── Main AIAgent component ────────────────────────────────────────────────────

export default function AIAgent() {
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [apiConfigured, setApiConfigured] = useState<boolean | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const streamingIdRef = useRef<string | null>(null)

  // Check API health on mount
  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(d => setApiConfigured(d.hasApiKey))
      .catch(() => setApiConfigured(false))
  }, [])

  // Auto-scroll to bottom when new content arrives
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return

    const userMsg: AIMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      displayContent: text.trim(),
      timestamp: new Date(),
    }

    const assistantId = crypto.randomUUID()
    streamingIdRef.current = assistantId

    const assistantMsg: AIMessage = {
      id: assistantId,
      role: 'assistant',
      displayContent: '',
      isStreaming: true,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg, assistantMsg])
    setInput('')
    setIsStreaming(true)

    // Build history for API (last 8 pairs for context)
    const history = [...messages, userMsg]
      .slice(-8)
      .map(m => ({ role: m.role, content: m.displayContent }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!response.ok || !response.body) {
        throw new Error(`Server error ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let rawContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() ?? ''

        for (const part of parts) {
          if (!part.startsWith('data: ')) continue
          try {
            const data = JSON.parse(part.slice(6))

            if (data.error) throw new Error(data.error)

            if (data.text) {
              rawContent += data.text
              const display = rawContent.split('---STRUCTURED---')[0]
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId
                    ? { ...m, displayContent: display }
                    : m
                )
              )
            }

            if (data.done) {
              const structured = parseStructured(rawContent)
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId
                    ? {
                        ...m,
                        displayContent: getDisplay(rawContent),
                        isStreaming: false,
                        structuredData: structured,
                      }
                    : m
                )
              )
            }
          } catch (parseErr) {
            // non-JSON line, skip
          }
        }
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Unknown error'
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? {
                ...m,
                displayContent: `⚠️ Error: ${errMsg}\n\nPlease check your API key and server connection.`,
                isStreaming: false,
                structuredData: null,
              }
            : m
        )
      )
    } finally {
      setIsStreaming(false)
      streamingIdRef.current = null
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, isStreaming])

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  if (apiConfigured === null) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-sm text-slate-500 animate-pulse">Connecting to SalesKit AI…</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/60">

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800/60 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Sparkles size={15} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-black text-white leading-none">SalesKit AI</div>
            <div className="text-[10px] text-slate-500 leading-none mt-0.5">Powered by Claude</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {apiConfigured && (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
          )}
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 transition-colors px-2 py-1 rounded-lg hover:bg-slate-800"
            >
              <RotateCcw size={11} />
              New chat
            </button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth">
        {!apiConfigured ? (
          <ApiNotConfigured />
        ) : messages.length === 0 ? (
          <EmptyState onSuggest={sendMessage} />
        ) : (
          <div className="max-w-3xl mx-auto space-y-1">
            {messages.map(m => (
              <ChatMessage key={m.id} message={m} onQuickReply={sendMessage} />
            ))}
          </div>
        )}
      </div>

      {/* Input area */}
      {apiConfigured && (
        <div className="shrink-0 px-4 pb-4 pt-3 bg-slate-950 border-t border-slate-800/60">
          <div className="max-w-3xl mx-auto">
            <div className={`flex items-end gap-2 bg-slate-800/80 rounded-2xl border transition-all duration-200 ${
              isStreaming ? 'border-slate-700/40' : 'border-slate-700/60 focus-within:border-indigo-500/60 focus-within:bg-slate-800'
            }`}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={isStreaming}
                placeholder={isStreaming ? 'SalesKit AI is responding…' : 'Ask about competitors, buyer pitches, objections… (Enter to send)'}
                rows={1}
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 px-4 py-3 resize-none outline-none max-h-32 leading-relaxed disabled:opacity-40"
                style={{ fieldSizing: 'content' } as React.CSSProperties}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isStreaming}
                className={`m-2 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                  input.trim() && !isStreaming
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/40'
                    : 'bg-slate-700/60 text-slate-600 cursor-not-allowed'
                }`}
              >
                {isStreaming
                  ? <span className="w-3 h-3 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
                  : <Send size={15} />
                }
              </button>
            </div>
            <div className="text-[10px] text-slate-600 text-center mt-2">
              Shift+Enter for new line · Responses include live comparison dashboards
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
