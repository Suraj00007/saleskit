import React from 'react'
import { Bot, User, Copy, Check } from 'lucide-react'
import { useState, useCallback } from 'react'
import { MiniDashboard } from './MiniDashboard'
import type { AIMessage } from './AIAgent'

// ── Inline markdown tokenizer (XSS-safe) ─────────────────────────────────────

function InlineMd({ text }: { text: string }) {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return (
    <>
      {tokens.map((tok, i) => {
        if (tok.startsWith('**') && tok.endsWith('**'))
          return <strong key={i} className="font-bold">{tok.slice(2, -2)}</strong>
        if (tok.startsWith('*') && tok.endsWith('*'))
          return <em key={i} className="italic">{tok.slice(1, -1)}</em>
        if (tok.startsWith('`') && tok.endsWith('`'))
          return <code key={i} className="bg-black/10 px-1.5 py-0.5 rounded text-[11px] font-mono">{tok.slice(1, -1)}</code>
        return <span key={i}>{tok}</span>
      })}
    </>
  )
}

function RenderLines({ text, className = '' }: { text: string; className?: string }) {
  const lines = text.split('\n').filter((l, i, arr) => !(l.trim() === '' && arr[i - 1]?.trim() === ''))
  const items: React.ReactElement[] = []
  let listBuf: { num: string | null; content: string }[] = []

  const flushList = (key: string) => {
    if (listBuf.length === 0) return
    const isNum = listBuf[0].num !== null
    items.push(
      isNum ? (
        <ol key={key} className="space-y-1.5 ml-1 my-2">
          {listBuf.map((li, j) => (
            <li key={j} className="flex gap-2.5 items-start">
              <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-current/15 flex items-center justify-center text-[10px] font-bold">
                {li.num}
              </span>
              <span className="leading-relaxed"><InlineMd text={li.content} /></span>
            </li>
          ))}
        </ol>
      ) : (
        <ul key={key} className="space-y-1.5 ml-1 my-2">
          {listBuf.map((li, j) => (
            <li key={j} className="flex gap-2 items-start">
              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-current/40" />
              <span className="leading-relaxed"><InlineMd text={li.content} /></span>
            </li>
          ))}
        </ul>
      )
    )
    listBuf = []
  }

  lines.forEach((line, i) => {
    const numMatch = line.match(/^(\d+)\.\s+(.+)/)
    const bulletMatch = line.match(/^[-•]\s+(.+)/)

    if (numMatch) {
      listBuf.push({ num: numMatch[1], content: numMatch[2] })
    } else if (bulletMatch) {
      listBuf.push({ num: null, content: bulletMatch[1] })
    } else {
      flushList(`list-${i}`)
      if (line.trim()) {
        items.push(
          <p key={`p-${i}`} className="leading-relaxed mb-1">
            <InlineMd text={line} />
          </p>
        )
      } else {
        items.push(<div key={`br-${i}`} className="h-2" />)
      }
    }
  })
  flushList('list-end')

  return <div className={`text-sm ${className}`}>{items}</div>
}

// ── Section parsing + theming ─────────────────────────────────────────────────

interface Section {
  heading: string | null
  content: string
}

function parseSections(markdown: string): Section[] {
  const clean = markdown.replace(/---STRUCTURED---[\s\S]*?---END---/g, '').trim()
  const parts = clean.split(/^## /m)
  return parts
    .map((part, i) => {
      if (i === 0) return { heading: null, content: part.trim() }
      const nl = part.indexOf('\n')
      return {
        heading: nl === -1 ? part.trim() : part.slice(0, nl).trim(),
        content: nl === -1 ? '' : part.slice(nl + 1).trim(),
      }
    })
    .filter(s => s.content.length > 0 || s.heading !== null)
}

type SectionTheme = 'win' | 'pitch' | 'concern' | 'growth' | 'persona' | 'info'

function getTheme(heading: string | null): SectionTheme {
  if (!heading) return 'info'
  const h = heading.toLowerCase()
  if (/pitch|script|say|words|opener|closer|close|handle/.test(h)) return 'pitch'
  if (/win|advantage|why choose|beats|better|lead|best|unique/.test(h)) return 'win'
  if (/concern|gap|honest|lag|limitation|caveat|watch/.test(h)) return 'concern'
  if (/invest|return|roi|yield|appreciation|growth/.test(h)) return 'growth'
  if (/bachelor|family|investor|nri|luxury|persona|buyer/.test(h)) return 'persona'
  return 'info'
}

const THEME_STYLES: Record<SectionTheme, {
  wrapper: string; header: string; content: string; border: string
}> = {
  win:     { wrapper: 'bg-emerald-950/40', header: 'bg-emerald-500/20 text-emerald-300', content: 'text-emerald-100', border: 'border-emerald-500/30' },
  pitch:   { wrapper: 'bg-blue-950/40',    header: 'bg-blue-500/20 text-blue-200',       content: 'text-blue-100',    border: 'border-blue-400/40 border-dashed' },
  concern: { wrapper: 'bg-amber-950/30',   header: 'bg-amber-500/20 text-amber-300',     content: 'text-amber-100',   border: 'border-amber-500/30' },
  growth:  { wrapper: 'bg-teal-950/40',    header: 'bg-teal-500/20 text-teal-300',       content: 'text-teal-100',    border: 'border-teal-500/30' },
  persona: { wrapper: 'bg-purple-950/40',  header: 'bg-purple-500/20 text-purple-300',   content: 'text-purple-100',  border: 'border-purple-500/30' },
  info:    { wrapper: 'bg-slate-800/60',   header: 'bg-slate-700/60 text-slate-200',     content: 'text-slate-200',   border: 'border-slate-600/40' },
}

// ── Streaming indicator ───────────────────────────────────────────────────────

function StreamingView({ text }: { text: string }) {
  const display = text.split('---STRUCTURED---')[0]
  return (
    <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
      {display}
      <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse ml-0.5 rounded-sm align-middle" />
    </div>
  )
}

// ── Formatted AI message card ─────────────────────────────────────────────────

function FormattedAICard({ message }: { message: AIMessage }) {
  const [copied, setCopied] = useState(false)
  const sections = parseSections(message.displayContent)

  const copyAll = useCallback(() => {
    navigator.clipboard.writeText(message.displayContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [message.displayContent])

  return (
    <div className="space-y-2">
      {sections.map((sec, i) => {
        const theme = getTheme(sec.heading)
        const styles = THEME_STYLES[theme]

        if (theme === 'pitch') {
          return (
            <div key={i} className={`rounded-xl border-2 ${styles.border} overflow-hidden`}>
              {sec.heading && (
                <div className={`px-4 py-2.5 flex items-center gap-2 ${styles.header}`}>
                  <span className="text-base">📋</span>
                  <span className="text-xs font-black uppercase tracking-widest">{sec.heading.replace(/^[^\w]+/, '')}</span>
                </div>
              )}
              <div className={`px-4 py-3 ${styles.wrapper}`}>
                <RenderLines text={sec.content} className={styles.content} />
              </div>
            </div>
          )
        }

        return (
          <div key={i} className={`rounded-xl border ${styles.border} overflow-hidden`}>
            {sec.heading && (
              <div className={`px-4 py-2 ${styles.header}`}>
                <span className="text-xs font-bold">{sec.heading}</span>
              </div>
            )}
            <div className={`px-4 py-3 ${styles.wrapper}`}>
              <RenderLines text={sec.content} className={styles.content} />
            </div>
          </div>
        )
      })}

      {/* Copy button */}
      <button
        onClick={copyAll}
        className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-300 transition-colors mt-1"
      >
        {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
        {copied ? 'Copied!' : 'Copy response'}
      </button>

      {/* Inline dashboard */}
      {message.structuredData?.dashboardTrigger && (
        <MiniDashboard
          trigger={message.structuredData.dashboardTrigger}
          persona={message.structuredData.persona}
        />
      )}
    </div>
  )
}

// ── ChatMessage (public component) ────────────────────────────────────────────

interface ChatMessageProps {
  message: AIMessage
  onQuickReply: (text: string) => void
}

export default function ChatMessage({ message, onQuickReply }: ChatMessageProps) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex items-end gap-2 max-w-[80%]">
          <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed shadow-lg">
            {message.displayContent}
          </div>
          <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center shrink-0 mb-0.5">
            <User size={14} className="text-slate-300" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-5 animate-fade-in-up">
      <div className="flex items-start gap-2 w-full">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mt-0.5 shadow-lg">
          <Bot size={16} className="text-white" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Label */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-indigo-400">SalesKit AI</span>
            <span className="text-[10px] text-slate-600">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {message.isStreaming && (
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full animate-pulse">
                thinking…
              </span>
            )}
          </div>

          {/* Content */}
          {message.isStreaming
            ? <StreamingView text={message.displayContent} />
            : <FormattedAICard message={message} />
          }

          {/* Quick replies */}
          {!message.isStreaming && message.structuredData?.quickReplies && message.structuredData.quickReplies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.structuredData.quickReplies.map((qr, i) => (
                <button
                  key={i}
                  onClick={() => onQuickReply(qr)}
                  className="text-xs px-3 py-1.5 rounded-full border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 transition-all duration-150 text-left"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
