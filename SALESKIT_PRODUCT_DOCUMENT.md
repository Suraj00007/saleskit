# SalesKit — Complete Product Document
### Real Estate Sales Intelligence Platform by MotiveMinds
**Version 1.0 | Built April 2026**

---

## Table of Contents

1. [What Is SalesKit](#1-what-is-saleskit)
2. [The Problem It Solves](#2-the-problem-it-solves)
3. [How It Works — Overview](#3-how-it-works--overview)
4. [Feature 1 — Competitor Analysis](#4-feature-1--competitor-analysis)
5. [Feature 2 — Buyer Persona Recommendation](#5-feature-2--buyer-persona-recommendation)
6. [Feature 3 — AI Sales Agent](#6-feature-3--ai-sales-agent)
7. [The Scoring Engine](#7-the-scoring-engine)
8. [Data Architecture](#8-data-architecture)
9. [Technical Stack](#9-technical-stack)
10. [How a Salesperson Uses It On-Site](#10-how-a-salesperson-uses-it-on-site)
11. [Cost & API Usage](#11-cost--api-usage)
12. [What Can Be Customised](#12-what-can-be-customised)
13. [Complete Feature Checklist](#13-complete-feature-checklist)

---

## 1. What Is SalesKit

SalesKit is a **mobile-friendly web application** built specifically for real estate sales teams. It runs on any phone, tablet, or laptop — no app store download needed — and is designed to be used **live during a customer site visit**.

It has three layers:

| Layer | Name | What It Does |
|---|---|---|
| Layer 1 | Competitor Analysis | Shows where your project wins and where it lags vs every competitor — row by row, with colour-coded highlights |
| Layer 2 | Buyer Persona Recommendation | Scores all projects for a specific buyer type (bachelor, family, investor, NRI, luxury) and generates talking points |
| Layer 3 | AI Sales Agent | A Claude AI-powered chat assistant that answers questions, generates pitch scripts, handles objections, and triggers live dashboards |

All three layers use the **same underlying project data** — so every answer, every score, every comparison is grounded in real numbers from your market.

---

## 2. The Problem It Solves

### What happens today (without SalesKit)

A salesperson takes a customer on a site visit. The customer asks:

- *"How does this compare to Prestige down the road?"*
- *"My friend bought in Sobha — why is yours better?"*
- *"We have school-going children and elderly parents — is this the right choice?"*
- *"What's the ROI if I buy this as an investment?"*

The salesperson either:
1. Gives a vague, unconfident answer
2. Promises to "get back" — losing the moment
3. Makes up numbers — which the customer can verify and distrust

**The result: lost leads, low conversion, damaged credibility.**

### What SalesKit does instead

It puts the answers — with exact data — in the salesperson's hands **within 10 seconds**, on their phone, while standing in front of the customer. The salesperson speaks with confidence because they're backed by facts.

---

## 3. How It Works — Overview

```
┌─────────────────────────────────────────────────────┐
│                   SalesKit App                       │
│                                                      │
│  ┌────────────┐  ┌────────────┐  ┌───────────────┐  │
│  │ Competitor │  │   Buyer    │  │   AI Agent    │  │
│  │  Analysis  │  │  Persona   │  │  (Claude AI)  │  │
│  └────────────┘  └────────────┘  └───────────────┘  │
│         │               │                │           │
│         └───────────────┴────────────────┘           │
│                         │                            │
│              ┌──────────▼──────────┐                 │
│              │   Project Data      │                 │
│              │  (projects.ts)      │                 │
│              │  5 projects with    │                 │
│              │  40+ attributes     │                 │
│              └─────────────────────┘                 │
└─────────────────────────────────────────────────────┘
```

**Single source of truth:** All data lives in one file (`projects.ts`). Update a number there and it reflects everywhere — comparison tables, persona scores, and AI answers — automatically.

---

## 4. Feature 1 — Competitor Analysis

### What It Is

A comprehensive side-by-side comparison table of your project against up to 4 competitor projects. Every attribute is compared, colour-coded, and explained.

### Projects Covered (configurable)

| Project | Builder | Tier | Type |
|---|---|---|---|
| MotiveMinds Vista | MotiveMinds Realty | Tier 1 | **Our Project** |
| Prestige Elm Park | Prestige Group | Tier 1 | Competitor |
| Sobha Silicon Oasis | Sobha Limited | Tier 1 | Competitor |
| Mana Foresta | Mana Projects | Tier 2 | Competitor |
| Panch Urban Greens | Panch Builders | Tier 2 | Competitor |

### The Comparison Matrix — 9 Categories, 40 Rows

#### Category 1: Pricing
| What Is Compared | Why It Matters |
|---|---|
| Average price per sqft | Core value comparison — the first thing every buyer asks |
| Starting price for 2BHK | Affordability entry point |
| Starting price for 3BHK | Main family unit comparison |
| Builder tier (Tier 1 / Tier 2) | Signals quality, trust, resale value |

#### Category 2: Amenities
| What Is Compared | Why It Matters |
|---|---|
| Total amenity count | Volume comparison — more amenities = higher lifestyle value |
| Premium amenities list | Sky lounge, infinity pool, spa — unique differentiators |
| Swimming pool presence | Non-negotiable for most mid-to-premium buyers |
| Co-working space in clubhouse | Unique to MotiveMinds Vista — drives bachelor/investor demand |

#### Category 3: Senior Friendly
| What Is Compared | Why It Matters |
|---|---|
| Senior-specific gymnasium | Low-impact equipment for elderly residents |
| Indoor game room | Chess, carrom, board games — keeps seniors engaged |
| Reading desk / library area | Quiet intellectual space for retired residents |
| 24/7 ambulance service | Critical for families with elderly parents |
| Dedicated walking track | Flat, safe, marked path for morning/evening walks |
| Senior care room | On-site first response / rest room for emergencies |

#### Category 4: Banking & Loans
| What Is Compared | Why It Matters |
|---|---|
| List of all approved banks | More banks = easier loan approval for buyers |
| Number of approved banks | MotiveMinds has 6 — highest in the micro-market |
| SBI approval specifically | Most trusted government bank — a key decision signal for families and NRIs |

*MotiveMinds Vista approved banks: SBI, HDFC, ICICI, Axis Bank, Kotak Mahindra, Bank of Baroda*

#### Category 5: Builder Reputation
| What Is Compared | Why It Matters |
|---|---|
| Star rating (1–5) | Overall market trust score |
| Completed projects count | Track record — Prestige has 280, MotiveMinds has 22 (honest positioning) |
| Years in market | Longevity and stability |
| On-time delivery record | YES/NO — the single most important trust signal |

#### Category 6: Possession
| What Is Compared | Why It Matters |
|---|---|
| Possession status | Ready / Under Construction / Upcoming |
| Possession timeline | Exact date (e.g. Jun 2027) — investors use this to plan |

#### Category 7: Accessibility (Distances in km)
| Location | Why It Matters |
|---|---|
| Metro station | Transport connectivity — critical for bachelors and investors |
| Hospital | Emergency care — critical for families |
| School | Education — the #1 priority for family buyers |
| Supermarket | Daily convenience |
| Café / Restaurant | Lifestyle — critical for bachelors |
| IT Hub / Tech Park | Work proximity — drives rental demand |
| Mall | Weekend lifestyle and retail |
| Airport | Critical for NRI buyers and frequent travellers |

#### Category 8: Future Growth
| What Is Compared | Why It Matters |
|---|---|
| Appreciation potential | LOW / MEDIUM / HIGH — based on infrastructure pipeline |
| Rental yield (% per annum) | Annual rental income as % of purchase price |
| Capital appreciation (% YoY) | Projected annual price increase |
| Upcoming infrastructure | Metro Phase 2, Peripheral Ring Road, ORR widening — specific projects with timelines |

#### Category 9: Specifications
| What Is Compared | Why It Matters |
|---|---|
| Flooring | Brand and tile size (e.g. Kajaria 800x800 vs generic 600x600) |
| Windows | uPVC Fenesta vs standard aluminium — huge quality difference |
| Bathroom fittings | Kohler/Jaquar vs Parryware/Cera — affects resale value |
| Paint brand | Asian Paints Royale vs Berger — finishing quality |

#### Category 10: Project Details
| What Is Compared | Why It Matters |
|---|---|
| Total units | Fewer units = lower density = more exclusivity |
| Total land (acres) | More land = more open space, gardens, parking |
| Density level | Low / Medium / High — luxury buyers demand Low |
| Virtual tour available | NRI buyers specifically need this |
| Remote buying support | NRI buyers need online documentation support |
| NRI-friendly status | FEMA compliance, NRI payment plans |

---

### Colour Coding System

Every cell in the comparison table is colour-coded automatically:

| Colour | Meaning | Example |
|---|---|---|
| **Green** | Our project leads vs all competitors | Metro: 1.2 km (best in segment) |
| **Yellow** | On par — within acceptable range | Rental yield: 4.2% (similar to Sobha 4.5%) |
| **Red** | We lag behind at least one competitor | Price/sqft: ₹8,400 (Mana is cheaper at ₹7,650) |

The comparison is **directional** — lower is better for distances and price, higher is better for amenity count and yield.

---

### Live Win/Gap Scorecard

At the top of the comparison screen, a live scorecard shows:

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│     22       │  │      8       │  │     10       │
│ Where We     │  │ Where We     │  │ On Par /     │
│    Lead      │  │    Lag       │  │   Info       │
└──────────────┘  └──────────────┘  └──────────────┘
```

This updates in real time as the salesperson toggles competitors on/off.

---

### Winning Points & Honest Gap Cards

Below the scorecard, two cards are always visible:

**Our Winning Points (green card):**
- Only project in micro-market with rooftop sky lounge + infinity pool
- Metro-adjacent with 6 approved bank loans — highest in segment
- On-time delivery track record across 22 projects since 2006

**Honest Gap Areas (red card):**
- Slightly higher price per sqft vs Mana
- Possession 18 months away

This transparency builds customer trust — a salesperson who admits gaps and explains them is more believable than one who claims to be perfect.

---

### Competitor Toggle

The salesperson can choose which competitors to include in the current comparison — useful if they know the customer has seen specific projects.

Example: If the customer visited Prestige and Sobha, toggle off Mana and Panch to show a focused 3-way comparison.

---

### Collapsible Categories

Each of the 9 categories can be expanded or collapsed. On a mobile phone during a site visit, the salesperson expands only the categories relevant to the current conversation.

---

## 5. Feature 2 — Buyer Persona Recommendation

### What It Is

A scoring engine that evaluates all projects through the lens of a specific buyer's priorities and ranks them accordingly. The salesperson selects the buyer type and instantly sees which project suits that buyer best — and why.

### The 5 Buyer Personas

#### Persona 1: 🎯 Bachelor / Young Professional
**Profile:** Single or couple, 25–35 years old, working in IT sector, renting now and considering first purchase or investment

**What they care about most:**
1. Metro / transport connectivity (walk to station or 5-min ride)
2. Cafés and restaurants within 1 km
3. Co-working spaces in the building or nearby
4. Pubs and nightlife proximity
5. Rental potential (if buying as investment)

**What they don't care about:**
- Schools (never mention)
- Senior citizen facilities
- Hospital distance (low priority)

**Scoring weights:** Metro distance × 1.0, Café proximity × 0.95, Co-working × 0.9, Rental yield × 0.7

---

#### Persona 2: 👨‍👩‍👧‍👦 Family Buyer
**Profile:** Couple with children or elderly parents, 32–50 years, looking for a forever home or upgrade

**What they care about most:**
1. School distance (within 2 km is ideal)
2. Hospital and emergency care proximity
3. Supermarket for daily shopping
4. Safety — gated community, CCTV, guard
5. Parks and children's play areas
6. Senior citizen amenities if parents are moving in

**What they don't care about:**
- Pubs/nightlife (negative signal)
- Co-working spaces (low priority)

**Scoring weights:** School distance × 1.0, Hospital × 0.95, Supermarket × 0.9, Senior friendly × 0.75

---

#### Persona 3: 📈 Investor
**Profile:** Purely return-driven buyer, 30–55 years, may not live in the property

**What they care about most:**
1. Capital appreciation % per year
2. Rental yield % per annum
3. IT hub and upcoming metro proximity (drives tenant demand)
4. Builder on-time delivery track record (reduces risk)
5. Under-construction pricing advantage

**Key data points they ask for:**
- 12% projected YoY appreciation
- 4.2% rental yield
- Phase 2 Metro arriving 2027
- Peripheral Ring Road 2026

**Scoring weights:** Future growth × 1.0, IT Hub distance × 1.0, Builder on-time delivery × 0.9, Price value × 0.95

---

#### Persona 4: ✈️ NRI Buyer
**Profile:** Non-Resident Indian, buying from abroad, cannot physically inspect the property

**What they care about most:**
1. Builder trust and track record (can't visit multiple times)
2. Remote buying capability — online documentation, FEMA compliance
3. Virtual tour availability
4. Capital appreciation for long-term hold
5. Airport distance (for their visits)

**Their core fear:** "I can't see it in person — what if something goes wrong?"

**Scoring weights:** Builder reputation × 1.0, Remote buying support × 1.0, Airport distance × 1.0

---

#### Persona 5: 💎 Luxury / HNI Buyer
**Profile:** High Net Worth Individual, 35–60 years, not price-sensitive, buying for lifestyle and status

**What they care about most:**
1. Low density — fewer units per acre (exclusivity)
2. Premium amenities — rooftop sky lounge, infinity pool, spa, mini theatre
3. Brand-name specifications — Kohler bathrooms, Fenesta windows, Kajaria 800x800 tiles
4. Premium location — lake view, green corridor, prestigious address
5. Builder brand name in the luxury segment

**What they don't care about:**
- Price per sqft (not the decision driver)
- Supermarket distance (they have staff)

**Scoring weights:** Density × 1.0, Premium amenities × 1.0, Specifications quality × 1.0

---

### How the Scoring Works

Each project is scored out of 100 for each persona using two components:

**45% — Accessibility Score**
Based on the distances to locations that matter for that persona.
Example for bachelor: Metro distance, café proximity, co-working are weighted heavily. School distance is weighted zero.

**55% — Feature Score**
Based on project attributes: price value, amenities, builder reputation, possession timeline, future growth, density, remote buying support, specification quality.

Each attribute is weighted differently per persona. An investor cares about future growth (weight 1.0) but not about density (weight 0.4). A luxury buyer cares about density (weight 1.0) but not about price value (weight 0.3).

**The result:** A score from 0–100 for every project for every persona, updated automatically whenever project data changes.

---

### What the Salesperson Sees

After selecting a persona:

**1. Persona description card**
Shows who this buyer is, what their top 5 priorities are, and what the pitch angle should be.

**2. Score ranking**
All 5 projects ranked 1–5 with score bars. Our project is highlighted in blue. If we rank #1 for that persona, the salesperson leads with this.

**3. Project deep-dive cards (expandable)**
For each project:
- Key facts: Price/sqft, rental yield, possession timeline
- Strengths for this persona (e.g. "Metro only 1.2 km away")
- Gaps vs this persona's needs (honest: "Nearest café is 2.5 km — plan ahead")
- Talking points (e.g. "Projected appreciation: 12% YoY")
- Key distances relevant to this persona
- Builder reputation with star rating

---

## 6. Feature 3 — AI Sales Agent

### What It Is

A conversational AI chat assistant powered by Anthropic's Claude, embedded directly in SalesKit. It knows all your project data and competitor data, and uses that knowledge to answer questions, generate pitch scripts, and handle objections in real time.

---

### How It Is Different From General AI Tools (ChatGPT, etc.)

| Generic AI | SalesKit AI |
|---|---|
| Knows nothing about your project | Has all 5 projects' data pre-loaded |
| Gives generic real estate advice | Cites your exact numbers (₹8,400/sqft, 1.2 km metro) |
| No sales structure | Every answer contains a Pitch Script section |
| Text-only response | Triggers visual comparison dashboards after answers |
| No objection handling | Has pre-built objection scripts for common pushbacks |
| Forgets previous messages | Remembers full conversation for context |

---

### The System Prompt (What the AI Knows)

Before every message, Claude receives a detailed briefing containing:

**Your project data:**
- MotiveMinds Vista — all 40+ attributes (pricing, amenities, distances, specifications, builder details, growth data)

**All competitor data:**
- Prestige Elm Park, Sobha Silicon Oasis, Mana Foresta, Panch Urban Greens — same depth of data

**Buyer persona intelligence:**
- Bachelor: what to say, what to never say, what numbers to cite
- Family: school distance first, safety second, never mention pubs
- Investor: full ROI narrative, infrastructure timeline
- NRI: address the remote buying fear directly
- Luxury: density and premium amenities above everything

**Objection handling scripts:**
- "Mana is 20% cheaper" → full counter script
- "Prestige is a bigger brand" → brand vs value analysis
- "Possession is 18 months away" → turn it into an investment advantage
- "I want to see a ready flat" → virtual tour + completed project visit offer

**Response format rules:**
- Always use section headers with emojis
- Always cite exact numbers
- Always include a Pitch Script section
- Be honest about gaps, then pivot

---

### Response Format — What Comes Back

Every AI response is structured into **themed sections** that render as visual cards:

| Section Type | Visual Style | Example Heading |
|---|---|---|
| Why We Win | Emerald green card | `## 🏆 Why MotiveMinds Vista Wins` |
| Pitch Script | Blue dashed cue card | `## 🎯 Pitch Script for Bachelor Buyer` |
| Honest Concerns | Amber warning card | `## ⚠️ Areas Where We Lag` |
| Investment Case | Teal growth card | `## 📈 ROI & Investment Analysis` |
| Persona Fit | Purple card | `## 👨‍👩‍👧‍👦 Family Buyer Fit Analysis` |
| General Info | Dark grey card | `## 📋 Project Comparison Overview` |

---

### The Pitch Script Section (Most Valuable)

Every AI answer includes a **Pitch Script** — actual words the salesperson can say:

```
📋 PITCH SCRIPT — BACHELOR BUYER

OPENER:
"Sir, I can see you're in tech and value connectivity.
Let me show you something most people miss about this location..."

KEY POINTS:
1. "Our metro station is 1.2 km away — that's a 3-minute e-rickshaw or
   15-minute walk. No other project on Sarjapur Road matches this."

2. "We have a co-working space inside the clubhouse. For someone in your
   field, that means zero commute on work-from-home days."

3. "If you ever want to rent this out, the rental yield is 4.2% per annum.
   On a ₹94L investment, that's ₹33,000/month in rent."

CLOSER:
"Would you like to walk through the sample flat? I can also show you
the rooftop sky lounge — it's unlike anything else in this micro-market."
```

The salesperson can **read this directly** or use it as talking points. They don't need to memorise anything.

---

### Auto-Triggered Inline Dashboard

After every relevant AI response, a live data panel appears automatically inside the chat:

**When the question is about competitors:**
A 10-metric dark comparison table appears showing:
- Average ₹/sqft
- Metro distance
- IT Hub distance
- Amenity count
- Premium amenity count
- Approved banks count
- Rental yield
- Capital appreciation
- Density level
- On-time delivery (Yes/No)

All with colour indicators — our project highlighted, green for wins, red for losses.

**When the question is about a buyer type:**
A score ranking panel appears showing all 5 projects ranked for that persona, with score bars and our project's key strengths for that buyer type.

The salesperson can **show this panel directly to the customer** on their phone — it's visual, clean, and data-backed.

---

### Quick Reply Chips

After every AI response, 3 follow-up question chips appear automatically. These are generated by the AI based on what was just discussed — so the conversation flows naturally without typing.

Example after a bachelor pitch response:
- `"What about the investment angle for bachelor buyers?"`
- `"How does our metro distance compare to Sobha?"`
- `"What if the bachelor asks about Prestige instead?"`

One tap sends the next question instantly.

---

### 6 Quick-Start Questions (Empty State)

When a salesperson opens the AI tab for the first time during a visit, they see 6 pre-loaded question tiles covering the most common scenarios:

| Tile | Pre-loaded Question |
|---|---|
| 🎯 Bachelor pitch | "How do I pitch MotiveMinds Vista to a bachelor buyer on-site? Give me the exact script." |
| 👨‍👩‍👧‍👦 Family pitch | "A family of 4 is visiting today — school-going kids and elderly parents. How should I pitch our project?" |
| 📈 Investor ROI | "An investor is asking about returns compared to Prestige and Sobha. Walk me through the ROI case." |
| ✈️ NRI objection | "An NRI says they're worried about buying remotely without seeing the flat. How do I handle this?" |
| 🏆 Beat Mana | "A customer says Mana Foresta is 20% cheaper — why should they pay more for our project?" |
| 💎 Luxury angle | "I have a luxury HNI buyer who has seen Prestige Elm Park. How do I position our project as more exclusive?" |

---

### Streaming Responses

The AI response streams word-by-word as Claude generates it — the salesperson sees the answer building in real time, just like watching someone type. This means:
- No waiting for a loading spinner
- The salesperson starts reading while the answer is still being written
- Average response appears within 2–3 seconds of sending

---

### Conversation Memory

The AI remembers the full conversation within a session. If the salesperson asks:
- Message 1: "How do I pitch to a family buyer?"
- Message 3: "What about the school distances specifically?"

The AI knows Message 3 is still about the family buyer context. No need to repeat yourself.

Sessions are **per visit** — a "New Chat" button resets the conversation for the next customer.

---

### Copy Response Button

Every AI response has a one-tap copy button. The salesperson can copy the entire pitch script and paste it into WhatsApp to send to the customer after the visit.

---

### API Not Configured Screen

If the Anthropic API key is missing, the AI tab shows a clear setup screen with step-by-step instructions instead of a broken experience.

---

## 7. The Scoring Engine

The scoring engine calculates a 0–100 score for every project–persona combination. It runs entirely in the browser — no API call needed.

### Formula

```
Total Score = (Accessibility Score × 45%) + (Feature Score × 55%)
```

### Accessibility Score Calculation

For each persona, every location type (metro, café, school, etc.) has a **weight between 0 and 1**:
- Bachelor: Metro weight = 1.0, School weight = 0.0
- Family: School weight = 1.0, Pub weight = 0.0
- Investor: IT Hub weight = 1.0, Co-working weight = 0.7

For each location, the distance is converted to a 0–1 score:
- At or below "ideal" distance → score 1.0 (full marks)
- At or above "worst" distance → score 0.0 (zero marks)
- In between → proportional score

Example: Metro with ideal = 0.5 km, worst = 5 km
- Project with metro at 1.2 km → score = 0.84
- Project with metro at 3.0 km → score = 0.44
- Project with metro at 5.0 km → score = 0.0

### Feature Score Calculation

10 feature dimensions, each scored 0–1 and weighted per persona:

| Dimension | How Scored |
|---|---|
| Price value | Sqft < ₹8,500 → 1.0, < ₹9,000 → 0.7, above → 0.4 |
| Amenities | Count divided by 14 (max in segment) |
| Premium amenities | Count divided by 5 (max possible) |
| Senior friendly | Count of features out of 6 |
| Builder reputation | Star rating divided by 5 |
| Possession timeline | Ready → 1.0, Under-construction + on-time → 0.75, delayed history → 0.4 |
| Future growth | High appreciation → 1.0, blended with rental yield |
| Density | Low → 1.0, Medium → 0.65, High → 0.3 |
| Remote buying | Yes → 1.0, No → 0 |
| Specifications | Tier 1 builder → 1.0, Tier 2 → 0.6, Tier 3 → 0.3 |

---

## 8. Data Architecture

### Project Data Model

Every project (own and competitor) stores the following attributes:

```
Project
├── Identity
│   ├── ID, name, builder, builder tier
│   ├── Location, micro-market
│   └── isOwn (true/false — marks our project)
│
├── Pricing
│   ├── Average price per sqft
│   └── Variants (2BHK, 3BHK, etc.) with size range, price range, starting price
│
├── Amenities
│   ├── Standard amenities list
│   ├── Premium amenities list
│   ├── Common areas list
│   └── Premium location features
│
├── Senior Friendly (6 boolean flags)
│   ├── Gymnasium, Indoor game room, Reading desk
│   └── Ambulance service, Walking track, Senior care room
│
├── Banking
│   └── List of approved lender banks
│
├── Builder
│   ├── Reputation score (1–5 stars)
│   ├── Completed projects count
│   ├── Years in market
│   └── On-time delivery (boolean)
│
├── Possession
│   ├── Status (ready / under_construction / upcoming)
│   └── Timeline (e.g. "Jun 2027")
│
├── Accessibility (distances in km)
│   ├── Metro, hospital, school, supermarket
│   └── Café, pub, co-working, mall, IT hub, airport
│
├── Future Growth
│   ├── Upcoming infrastructure (list with timelines)
│   ├── Appreciation potential (low/medium/high)
│   ├── Rental yield (% per annum)
│   └── Capital appreciation (% per year)
│
├── Specifications
│   ├── Flooring, windows, kitchen
│   └── Bathroom, structure, paint brand
│
├── Project Scale
│   ├── Total units, total acres
│   └── Density level (low/medium/high)
│
├── NRI/Remote Features
│   ├── Remote buying options (boolean)
│   ├── Virtual tour (boolean)
│   └── NRI-friendly (boolean)
│
└── Sales Intelligence
    ├── Highlights (our winning pitch points)
    └── Concerns (honest internal gaps)
```

### Current Projects in the Database

**1. MotiveMinds Vista** *(Our Project — Tier 1)*
- Location: Sarjapur Road, Sarjapur–Bellandur Micro-Market
- Pricing: ₹8,400/sqft avg | 2BHK from ₹94L | 3BHK from ₹133L
- Key wins: 6 approved banks (highest in segment), rooftop sky lounge + infinity pool (unique), 1.2 km metro, co-working in clubhouse, on-time delivery for all 22 projects
- Builder: MotiveMinds Realty, 22 completed, 18 years, on-time: YES
- Possession: Jun 2027 (under construction)
- Scale: 420 units on 5.2 acres (medium density)
- Appreciation: HIGH | Rental yield: 4.2% | Capital appreciation: 12% YoY

**2. Prestige Elm Park** *(Competitor — Tier 1)*
- Pricing: ₹9,300/sqft avg | 2BHK from ₹99L
- Key differentiators: Prestige brand name, 680 units (higher density), 4 approved banks
- Weakness vs us: ₹900/sqft more expensive, 2.5 km to metro (vs our 1.2 km), no co-working, no ambulance, no senior care room
- Builder: 280 completed projects, 35 years, on-time: YES

**3. Sobha Silicon Oasis** *(Competitor — Tier 1)*
- Pricing: ₹9,000/sqft avg | 2BHK from ₹92L
- Key differentiators: **Ready to move in**, Sobha in-house construction (no sub-contractors), highest rental yield (4.5%)
- Weakness vs us: No co-working, no ambulance, no virtual tour, 3.0 km to metro
- Builder: 140 completed projects, 28 years, on-time: YES

**4. Mana Foresta** *(Competitor — Tier 2)*
- Pricing: ₹7,650/sqft avg | 2BHK from ₹80L ← cheapest in segment
- Key differentiators: Lowest price, largest land (7 acres)
- Weakness vs us: No premium amenities, only 2 approved banks, delayed delivery history, no NRI support, no virtual tour, 4.5 km to metro
- Builder: 12 completed projects, 10 years, on-time: NO

**5. Panch Urban Greens** *(Competitor — Tier 2)*
- Pricing: ₹7,800/sqft avg | 2BHK from ₹77L
- Key differentiators: Good metro proximity (2.0 km), reasonable price
- Weakness vs us: No premium amenities, unproven builder (7 years), no NRI support, upcoming (not yet under construction)
- Builder: 8 completed projects, 7 years, on-time: NO

---

## 9. Technical Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI framework — component-based, fast re-renders |
| TypeScript | Type-safe code — prevents data errors |
| Tailwind CSS v4 | Utility-first styling — mobile-responsive by default |
| Vite 8 | Build tool — instant hot reload in development, fast production builds |
| Lucide React | Icon library — clean, consistent iconography |

### Backend (AI Server)

| Technology | Purpose |
|---|---|
| Node.js + Express 5 | HTTP server handling API requests |
| tsx | Runs TypeScript server files directly — no compilation step needed |
| Anthropic SDK | Official Claude API client — handles authentication and streaming |
| Server-Sent Events (SSE) | Streams AI response tokens to browser in real time |
| dotenv | Loads API key from `.env` file |

### Development Tooling

| Technology | Purpose |
|---|---|
| concurrently | Runs Vite + Express simultaneously with one command |
| ESLint | Code quality enforcement |

### How the Two Servers Work Together

```
npm run dev
    │
    ├── Vite (port 5173) ──── Serves React app + hot reload
    │       │
    │       └── Proxy /api/* ──→ Express (port 3001)
    │
    └── Express (port 3001) ── Handles AI chat requests
            │
            └── Anthropic API ── Claude claude-sonnet-4-6 model
```

Vite proxies all `/api/*` requests to Express. The browser only talks to Vite. In production, Express serves the built React files too.

### AI Streaming Architecture

```
Browser                    Vite Proxy             Express              Anthropic
   │                           │                     │                     │
   │── POST /api/chat ─────────→│── forward ─────────→│                     │
   │                           │                     │── stream request ───→│
   │                           │                     │                     │
   │←── SSE: data: {text} ─────←│←── SSE forward ────←│←── token chunks ────│
   │←── SSE: data: {text} ─────←│                     │                     │
   │←── SSE: data: {done:true}─←│                     │                     │
   │                           │                     │                     │
   [parse structured data]
   [render formatted cards]
   [show inline dashboard]
```

---

## 10. How a Salesperson Uses It On-Site

### Typical Site Visit Flow

**Before the visit (2 minutes)**
1. Open SalesKit on phone/tablet
2. Check the Competitor Analysis tab — refresh memory on where we win
3. Note the honest gap areas so they're not caught off guard

**During the visit — Scenario A: Customer has seen Prestige**
1. Customer says: "We visited Prestige last week — it's a bigger brand"
2. Salesperson opens AI Agent tab → taps the quick start chip or types the question
3. AI responds in 3 seconds with: why our project offers better value, price comparison, our unique features Prestige doesn't have
4. **Competitor comparison dashboard auto-appears** — salesperson turns phone to show customer the 10-metric table
5. Customer sees the data, conversation shifts from brand perception to actual numbers

**During the visit — Scenario B: Family buyer, children and parents**
1. Salesperson opens Buyer Persona tab → taps "Family"
2. Sees our project scores for family priorities: school distance (1.5 km — excellent), hospital (1.8 km), senior amenities (full suite including ambulance)
3. Opens AI Agent → types "family buyer with school-going kids and elderly parents"
4. Gets exact pitch script with talking points
5. **Persona score dashboard auto-appears** — shows our project ranked #1 for family buyers vs all 4 competitors

**During the visit — Scenario C: Investor pushes on ROI**
1. Customer: "What's the actual return if I put ₹1.3 crore here?"
2. AI Agent: full ROI breakdown — 4.2% rental yield = ₹45,500/month rental income, 12% appreciation means ₹1.3 crore becomes ₹1.46 crore by possession at Jun 2027
3. Upcoming infrastructure (Phase 2 Metro 2027, Peripheral Ring Road 2026) cited as appreciation catalysts
4. Honest note: Sobha has slightly higher yield at 4.5%, but no appreciation headroom (already ready-to-move)

**After the visit**
1. Copy the AI's pitch summary → paste into WhatsApp to customer
2. Full conversation history available until "New Chat" is tapped
3. New chat for next customer visit

---

## 11. Cost & API Usage

### Pricing Model
Anthropic charges per token. 1 token ≈ 0.75 words.

### Cost per AI Chat Message

| Component | Tokens | Cost |
|---|---|---|
| System prompt (project data + personas) | ~2,000 input | $0.0018 |
| User question | ~50 input | $0.00004 |
| Conversation history (last 8 messages) | ~400 input | $0.00036 |
| AI response | ~800 output | $0.0024 |
| **Total per message** | **~3,250** | **~$0.005 (~₹0.40)** |

### Monthly Cost Estimate

| Team Size | Site Visits/Day | Questions/Visit | Monthly Cost |
|---|---|---|---|
| 5 salespeople | 3 visits | 4 questions | ~$3/month (~₹250) |
| 10 salespeople | 5 visits | 5 questions | ~$10/month (~₹850) |
| 20 salespeople | 8 visits | 6 questions | ~$38/month (~₹3,200) |

### Model Used
`claude-sonnet-4-6` — Anthropic's mid-tier model. Best balance of quality, speed, and cost. Responses arrive within 2–4 seconds.

### Spend Control
Spend limits can be set at console.anthropic.com to cap monthly usage.

---

## 12. What Can Be Customised

### Adding a New Project (Competitor or Partner)

Edit `src/data/projects.ts` — add a new object to the `projects` array with all attributes filled in. The project will automatically appear in:
- Competitor comparison matrix (as a new column)
- Buyer persona rankings
- AI agent's knowledge base (via the system prompt builder)

### Changing Your Own Project Details

Same file — update the `MotiveMinds Vista` object. All numbers in the AI's answers update automatically.

### Adding New Objection Scripts

Edit `server.ts` — in the `buildSystemPrompt()` function, add new objection scenarios to the "OBJECTION HANDLING SCRIPTS" section. The AI will use them in relevant conversations.

### Adding New Buyer Personas

Edit `src/data/personas.ts` — add a new `PersonaWeights` object with the persona's accessibility weights and feature weights. It will appear as a new tab in the Buyer Persona screen.

### Changing the AI Model

Edit `server.ts` — change `model: 'claude-sonnet-4-6'` to any other Anthropic model. Options:
- `claude-haiku-4-5` — faster, cheaper, slightly less capable
- `claude-opus-4-7` — most capable, 5× more expensive

### Adding New Comparison Rows

Edit `src/components/CompetitorMatrix.tsx` — add a new entry to the `rows` array with a label, data getter function, and comparison direction.

---

## 13. Complete Feature Checklist

### Application Shell
- [x] Sticky top navigation bar with branding
- [x] Project banner showing our project's key stats
- [x] Three-tab navigation (Competitor Analysis / Buyer Persona / AI Agent)
- [x] AI Agent tab highlighted with "NEW" badge
- [x] Mobile-responsive layout (works on phone, tablet, laptop)
- [x] Project banner hidden on AI tab to maximise chat space

### Competitor Analysis
- [x] 40-row comparison matrix
- [x] 9 collapsible categories
- [x] Automatic colour coding (green / yellow / red)
- [x] Live Win/Gap/OnPar scorecard at top
- [x] Our Winning Points card (green)
- [x] Honest Gap Areas card (red)
- [x] Competitor toggle buttons (show/hide individual competitors)
- [x] Highlight toggle (turn colour coding on/off)
- [x] Tooltip hints on ambiguous metrics
- [x] Horizontal scroll for many-column view on mobile
- [x] Sticky first column (attribute label stays visible while scrolling)

### Buyer Persona
- [x] 5 persona selector buttons with icons and colour themes
- [x] Persona description card (who they are, what they care about)
- [x] Ranked score list with progress bars for all 5 projects
- [x] Gold/silver/bronze ranking medals
- [x] Expandable project cards for deep-dive
- [x] Key facts row (price, yield, possession) per project
- [x] Strengths list for that persona
- [x] Gaps list for that persona
- [x] Talking points list
- [x] Key distance grid (only distances relevant to that persona)
- [x] Builder reputation stars

### AI Agent
- [x] Dark-themed chat interface
- [x] 6 quick-start suggestion tiles with pre-loaded questions
- [x] Real-time streaming responses (word-by-word appearance)
- [x] Blinking cursor during streaming
- [x] Section-parsed rich response cards (themed by content)
- [x] Green card for winning arguments
- [x] Blue dashed "cue card" for pitch scripts
- [x] Amber card for honest concerns
- [x] Teal card for investment/growth data
- [x] Inline markdown rendering (bold, italic, bullet lists, numbered lists)
- [x] Auto-triggered competitor comparison dashboard after relevant answers
- [x] Auto-triggered persona score dashboard after persona questions
- [x] Quick reply chips (3 per response)
- [x] Conversation history sent with each message (last 8 messages)
- [x] "New Chat" button to reset for next customer
- [x] Copy response button with confirmation tick
- [x] API health check on page load
- [x] Setup instructions screen if API key missing
- [x] "Thinking…" streaming badge
- [x] Spinning loader on send button while streaming
- [x] Shift+Enter for new line, Enter to send

### Scoring Engine
- [x] Per-persona weighted scoring for all 5 projects
- [x] Accessibility score component (45% of total)
- [x] Feature score component (55% of total)
- [x] Ideal/worst distance range per location type
- [x] Directional comparison logic (lower-is-better vs higher-is-better)
- [x] Automatic strength detection from persona priorities
- [x] Automatic gap detection from persona priorities
- [x] Talking points generated from future growth data

### Backend / AI Server
- [x] Express server on port 3001
- [x] Anthropic SDK integration (claude-sonnet-4-6)
- [x] Server-Sent Events (SSE) streaming
- [x] System prompt auto-built from live project data
- [x] Full project context in system prompt (all 5 projects, 40+ attributes each)
- [x] Buyer persona intelligence in system prompt
- [x] Objection handling scripts in system prompt
- [x] Response format rules in system prompt
- [x] Structured data block at end of every AI response (`---STRUCTURED---`)
- [x] Client parses structured data for dashboard triggers + quick replies
- [x] `/api/health` endpoint for API key status check
- [x] Error handling with user-friendly messages
- [x] `.env` file for API key (never committed to git)
- [x] `.gitignore` blocks `.env` from version control

### Developer Experience
- [x] Single command to start both servers (`npm run dev`)
- [x] TypeScript throughout (zero `any` types)
- [x] Full type definitions for all data models
- [x] Production build (`npm run build`) — outputs optimised static files
- [x] `.env.example` template for new team members

---

*Document prepared by MotiveMinds Consulting Pvt Ltd | SalesKit v1.0 | April 2026*
*Built with React 19, TypeScript, Tailwind CSS v4, Anthropic Claude*
