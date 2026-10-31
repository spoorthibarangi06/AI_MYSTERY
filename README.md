# AI Mystery Room 🕵️‍♂️🔍

> An AI-Powered Interactive Mystery Investigation Platform built with React, Vite, Node.js, Express, MongoDB, and Google Gemini.

Turn any story idea or scenario into a fully-realized, logically solvable detective investigation room. Inspect suspect dossiers, WhatsApp conversations, surveillance CCTV footage, and forensic crime scene evidence to uncover the true culprit.

---

## 🚀 Features

- **Personalized Mystery Generation:** Provide a short prompt (30–2,000 characters) and choose your category, difficulty, and suspect count.
- **Logically Solvable Puzzle Engine:** Governed by strict SSOT rules guaranteeing exactly one culprit, consistent timelines, believable motives, and multi-evidence correlation clues.
- **Interactive Investigation Room:**
  - Case Overview & Incident Briefing
  - Believable Suspect Dossiers (backgrounds, stated alibis, suspicious quirks)
  - WhatsApp-Style Extracted Dialogues with timestamps
  - CCTV Surveillance Terminal with scanlines, timestamps, and anomaly reports
  - Forensic Documents, Stamped Ledgers, and Physical Clues
  - Chronological Investigation Timeline
  - Clue Bookmarking & Review Progress Persistence
- **Single-Indictment Accusation System:** Submit your final accusation and reasoning to receive an evaluated verdict and detailed culprit reveal.
- **Detective Performance Tracking:** Measure your reviewed evidence percentage and solve accuracy.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, React Router v7, Axios, Lucide React
- **Backend:** Node.js, Express.js (REST API, JWT Authentication, bcryptjs)
- **Database:** MongoDB with Mongoose ODM
- **AI Engine:** Google Gemini (`@google/generative-ai`) with structured JSON parsing, bounded retries, and high-fidelity procedural fallbacks

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+) & npm
- MongoDB (running locally on port 27017 or a free cloud MongoDB Atlas cluster)
- Google Gemini API Key (optional for testing—procedural fallback activates if unconfigured)

### 1. Installation

```bash
# Clone or open the project folder
cd mystry

# Install all dependencies (both server and client)
npm run install:all
```

Or manually:
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Environment Configuration

Copy the example environment file inside `server/`:
```bash
cp server/.env.example server/.env
```

Configure your variables in `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai_mystery_room
JWT_SECRET=your_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_from_ai_studio
GEMINI_MODEL=gemini-1.5-flash
CLIENT_URL=http://localhost:5173
```

### 3. Running the Application

Open two terminal windows:

**Terminal 1: Start Backend API**
```bash
npm run server
# Server boots at http://localhost:5000
```

**Terminal 2: Start Frontend Client**
```bash
npm run client
# Vite app boots at http://localhost:5173
```

---

## 📂 Project Structure

```
mystry/
├── client/                     # Frontend React + Vite app
│   ├── src/
│   │   ├── components/         # Modular layout, mystery, suspect, evidence components
│   │   ├── context/            # AuthContext (JWT session state)
│   │   ├── pages/              # Landing, Login, Register, Dashboard, Create, Room, Result
│   │   ├── services/           # Axios API connectors
│   │   └── routes/             # ProtectedRoute wrapper
│   └── tailwind.config.js      # Custom noir detective palette & typography
├── server/                     # Backend Express REST API
│   ├── config/                 # MongoDB & Gemini AI SDK setup
│   ├── controllers/            # Auth, Mystery, Evidence, Accusation controllers
│   ├── middleware/             # JWT Protect, Validation, Global Error Handlers
│   ├── models/                 # Mongoose schemas (User, Mystery, Suspect, Evidence, Solution)
│   ├── prompts/                # Dedicated blueprint, evidence & evaluation Gemini prompts
│   ├── services/               # Pipeline orchestrator, Gemini caller, Zod validation
│   └── routes/                 # Express API routing tables
├── spec.md                     # Master Software Specification (SSOT)
├── ARCHITECTURE.md             # System architecture & AI pipeline documentation
├── API.md                      # Complete REST API reference
└── CHANGELOG.md                # Implementation milestones
```
