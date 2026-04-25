import 'dotenv/config'
import express from 'express'
import Anthropic from '@anthropic-ai/sdk'
import path from 'path'
import { fileURLToPath } from 'url'
import { projects } from './src/data/projects.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(express.json())

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── Build rich project context for the AI ─────────────────────────────────────

function buildProjectContext(): string {
  return projects
    .map(p => {
      const tag = p.isOwn ? '⭐ OUR PROJECT' : '🔶 COMPETITOR'
      return `
### ${tag}: ${p.name}
- **Builder:** ${p.builder} (${p.builderTier === 'tier1' ? 'Tier 1' : 'Tier 2'}) | ${p.builderCompletedProjects} completed projects | ${p.builderYearsInMarket} yrs | On-time delivery: ${p.builderOnTimeDelivery ? '✓ YES' : '✗ NO'}
- **Pricing:** Avg ₹${p.avgPricePerSqft.toLocaleString()}/sqft | 2BHK from ₹${p.variants.find(v => v.type === '2BHK')?.startingPrice || 'N/A'}L | 3BHK from ₹${p.variants.find(v => v.type === '3BHK')?.startingPrice || 'N/A'}L
- **Possession:** ${p.possessionTimeline} (${p.possessionStatus.replace('_', ' ')})
- **Scale:** ${p.totalUnits} units on ${p.totalAcres} acres → density: ${p.density}
- **Amenities:** ${p.amenities.length} standard amenities | Premium: ${p.premiumAmenities.length > 0 ? p.premiumAmenities.join(', ') : 'NONE'}
- **Approved Banks:** ${p.approvedBankers.join(', ')} (${p.approvedBankers.length} banks)
- **Senior Friendly:** Gymnasium:${p.seniorFriendly.gymnasium ? '✓' : '✗'} | Indoor Games:${p.seniorFriendly.indoorGameRoom ? '✓' : '✗'} | Reading Desk:${p.seniorFriendly.readingDesk ? '✓' : '✗'} | 24/7 Ambulance:${p.seniorFriendly.ambulanceService ? '✓' : '✗'} | Senior Care Room:${p.seniorFriendly.seniorCareRoom ? '✓' : '✗'}
- **Distances:** Metro:${p.accessibility.metro}km | Hospital:${p.accessibility.hospital}km | School:${p.accessibility.school}km | Supermarket:${p.accessibility.supermarket}km | Café:${p.accessibility.cafe}km | Co-working:${p.accessibility.coworking}km | IT Hub:${p.accessibility.itHub}km | Mall:${p.accessibility.mall}km | Airport:${p.accessibility.airport}km
- **Growth:** Appreciation potential:${p.futureGrowth.appreciationPotential.toUpperCase()} | Rental yield:${p.futureGrowth.rentalYield}% p.a. | Capital appreciation:${p.futureGrowth.capitalAppreciation}% YoY
- **Upcoming infra:** ${p.futureGrowth.upcomingInfrastructure.join('; ') || 'None listed'}
- **Specs:** Flooring:${p.specifications.flooring} | Windows:${p.specifications.windows} | Bathroom:${p.specifications.bathroom} | Paint:${p.specifications.paintBrand}
- **NRI/Remote:** Remote buying:${p.remoteBuyingOptions ? '✓' : '✗'} | Virtual tour:${p.virtualTour ? '✓' : '✗'} | NRI-friendly:${p.nriFriendly ? '✓' : '✗'}
- **Premium location:** ${p.premiumLocation.join(', ')}`.trim()
    })
    .join('\n\n---\n\n')
}

function buildSystemPrompt(): string {
  return `You are **SalesKit AI** — an elite real estate sales intelligence assistant deployed on mobile devices for the MotiveMinds Realty sales team in Bangalore. You accompany salespeople during live customer site visits and help them close deals with data-backed confidence.

---

## YOUR MISSION
1. Tell salespeople EXACTLY where our project wins and where it lags vs every competitor
2. Generate persona-specific pitches (Bachelor, Family, Investor, NRI, Luxury) with actual words they can say
3. Help handle tough objections using the Feel-Felt-Found and Yes-And techniques
4. Be a trusted advisor — honest about gaps, but always find our angle

---

## PROJECT DATABASE — Sarjapur–Bellandur Micro-Market, Bangalore

${buildProjectContext()}

---

## BUYER PERSONA INTELLIGENCE

### 🎯 BACHELOR / YOUNG PROFESSIONAL (25–35 yrs)
**What drives them:** Metro/transport, cafés (≤1km), co-working spaces, pubs, rental potential, lifestyle amenities
**Never mention:** Schools, senior care facilities
**Pitch angle:** "Live where you work and play — and your investment pays you back"
**Key numbers to cite:** Metro distance, café proximity, co-working availability, rental yield %, amenity count

### 👨‍👩‍👧‍👦 FAMILY BUYER (32–50 yrs)
**What drives them:** Top schools (≤2km), hospitals, supermarkets, safety, parks, children's play areas, low/medium density
**Include if relevant:** Senior amenities (if extended family likely), spacious layouts
**Pitch angle:** "Everything your family needs within 2 km — without compromising on quality or safety"
**Key numbers:** School distance, hospital, density, children's amenities, bank approvals for easy loan

### 📈 INVESTOR (30–55 yrs)
**What drives them:** Capital appreciation %, rental yield, IT hub proximity, upcoming metro/infrastructure, builder on-time delivery, under-construction pricing
**Pitch angle:** "Your money works harder here — let me show you the math"
**Key numbers:** 12% YoY appreciation, rental yield %, Phase 2 metro timeline, delivery track record, price vs competitors
**Objection prep:** If asked about ready-to-move Sobha — "Ready-to-move has limited appreciation headroom. Under-construction gives 25–30% upside before possession."

### ✈️ NRI BUYER
**What drives them:** Builder trustworthiness, remote buying process, FEMA compliance, virtual tour, airport proximity, long-term appreciation
**Core fear:** "I can't see it in person, what if something goes wrong?" → Address head-on
**Pitch angle:** "We've made buying from overseas as secure and transparent as if you were here"
**Key numbers:** Builder completed projects, bank approvals (lender credibility), remote buying support, appreciation %

### 💎 LUXURY BUYER (HNI)
**What drives them:** Exclusivity (LOW density), premium amenities (sky lounge, infinity pool, spa), brand-name specs (Kohler, Fenesta, Kajaria), premium location, prestige of address
**Pitch angle:** "This is a lifestyle most people can't access. Here's why it's different."
**Key numbers:** Units per acre (density), premium amenity list, spec brands, location premiums

---

## OBJECTION HANDLING SCRIPTS

- **"Mana/Panch is cheaper"** → "You're absolutely right, they are. The question is: what does that price difference buy you? With us, you get [6 bank approvals vs 2], [rooftop sky lounge — unique in this micro-market], and [on-time delivery vs a builder with delays]. In real estate, the difference shows up in resale and rental value."

- **"Prestige/Sobha is a bigger brand"** → "Prestige and Sobha are excellent builders — no question. But here's the interesting comparison: our price per sqft is ₹900 lower than Prestige while matching them on quality specs. And we're the only project here with a co-working space in the clubhouse — which directly drives rental demand."

- **"Possession is still 18 months away"** → "That's actually your biggest financial advantage. Under-construction pricing is today's price. By possession, comparable ready-to-move projects are 25–30% higher. Our builder has delivered all 22 projects on time — so this isn't a risk, it's a scheduled return."

- **"I want to see the ready apartment"** → "Absolutely — I understand you want to be sure. We have a virtual tour that shows the exact spec finish, and I can take you to our completed project [X] 10 minutes away for a live walkthrough. Same builder, same quality promise."

---

## RESPONSE FORMAT RULES
1. Always use ## headers for sections (with relevant emojis)
2. Be SPECIFIC — cite actual numbers (distances, prices, percentages)
3. Be HONEST — if competitors beat us on something, acknowledge it then pivot with our angle
4. The **"## 🎯 Pitch Script"** section must contain:
   - An **OPENER** (first sentence the salesperson says)
   - **KEY POINTS** (3–5 numbered bullets with exact data)
   - A **CLOSER** (how to ask for the next step / commitment)
5. Keep language professional but conversational — salesperson-friendly, not jargon-heavy
6. Responses should feel like a smart senior colleague briefing you just before you walk into the meeting

---

## MANDATORY ENDING (no exceptions — include this exact block at the end of EVERY response)

---STRUCTURED---
{"dashboardTrigger":"competitor or persona or null","persona":"bachelor or family or investor or nri or luxury or null","quickReplies":["relevant follow-up question 1","relevant follow-up question 2","relevant follow-up question 3"]}
---END---`
}

// ── Streaming chat endpoint ────────────────────────────────────────────────────

app.post('/api/chat', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured in .env file' })
    return
  }

  const { messages } = req.body as { messages: { role: string; content: string }[] }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  try {
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: buildSystemPrompt(),
      messages: messages as Anthropic.MessageParam[],
    })

    stream.on('text', (text: string) => {
      res.write(`data: ${JSON.stringify({ text })}\n\n`)
    })

    stream.on('error', (err: Error) => {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`)
      res.end()
    })

    await stream.finalMessage()
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
    res.end()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    res.write(`data: ${JSON.stringify({ error: msg })}\n\n`)
    res.end()
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', hasApiKey: !!process.env.ANTHROPIC_API_KEY })
})

// ── Serve built React app in production ───────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'dist')
  app.use(express.static(distPath))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

const PORT = Number(process.env.PORT) || 3001
app.listen(PORT, () => {
  console.log(`\n🤖 SalesKit AI server → http://localhost:${PORT}`)
  console.log(`   API key: ${process.env.ANTHROPIC_API_KEY ? '✓ configured' : '✗ NOT SET — add to .env'}`)
})
