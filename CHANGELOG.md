# Changelog - AI Mystery Room

All notable changes and phase completions are documented in this file in accordance with the Master Specification (SSOT).

## [1.0.0] - 2026-10-31

### Phase 1: Project Setup
- Initialized Git version control and project root structure.
- Created React 19 + Vite frontend in `client/` with Tailwind CSS, Lucide icons, and React Router.
- Built Node.js + Express backend in `server/` with Mongoose ODM, JWT authentication, and bcryptjs.
- Configured detective noir theme (`#0B0F14`, `#121923`, `#18212D`, `#D94B4B`, `#D6A85F`) and Space Grotesk / Inter fonts.
- Established client-to-server proxy and REST API architecture.

### Phase 2: Authentication & Dashboard
- Created JWT registration and login endpoints with password hashing and validation.
- Built `AuthContext` with session persistence and client-side `ProtectedRoute` guards.
- Created detective Dashboard with dynamic statistics (Total, Solved, Ongoing, Correct Accusations) and case search.

### Phase 3 & 4: Mystery Generation & Evidence Synthesis
- Integrated Google Gemini SDK with dedicated prompt architecture (`mysteryBlueprintPrompt`, `evidenceGenerationPrompt`, `evaluationPrompt`).
- Implemented Zod schema validation ensuring strict solvability rules (1 culprit, valid IDs, 3+ interconnected clues).
- Added multi-format evidence generators: WhatsApp chat dialogues, CCTV surveillance frames with CRT scanlines, witness depositions, and physical forensic documents.
- Integrated background processing with real-time multi-stage status polling.

### Phase 5 & 6: Investigation Room & Verdict Evaluation
- Developed interactive Investigation Room with sidebar navigation, suspect dossier inspection, and vertical case timeline.
- Built evidence inspection modals with bookmarking and review progress synchronization saved to MongoDB.
- Implemented final accusation modal with confirmation step and duplicate submission guard.
- Built Result and Verdict page declassifying the true culprit, actual motive, execution method, and step-by-step evidence deduction.

### Phase 7: Documentation & Quality Hardening
- Authored `README.md`, `API.md`, `ARCHITECTURE.md`, `CHANGELOG.md`, and `.env.example`.
