# Changelog - AI Mystery Room

All notable changes and phase completions are documented in this file in accordance with the Master Specification (SSOT).

## [1.1.0] - 2026-10-31

### Realistic Case File & Evidence Variety System
- **Dynamic Category-Based Generation:** Upgraded Gemini blueprint and evidence generation prompts to dynamically select evidence formats tailored to the crime category (e.g. medical reports & crime scene photos for Murder; emails & access logs for Cybercrime; phone call logs & witness statements for Missing Persons).
- **Specialized Realistic Viewers:**
  - `PoliceReportView`: Official precinct memorandum with case numbers, intake narrative, scene observations, and officer conclusions.
  - `MedicalReportView`: Autopsy and clinical pathology findings with trauma assessment, toxicology analysis, and certified examiner sign-offs.
  - `EmailView`: Desktop email client with verified DKIM badges, header chains, and attachment previews.
  - `CallLogView`: Subpoenaed telecommunications call records table with cell tower locations and flagged anomalous calls.
  - `FinancialRecordView`: Forensic bank statement and audit ledger with debit/credit tracking and offshore transfer alerts.
  - `AccessLogView`: Biometric and RFID keycard access manifest with GRANTED/DENIED security status.
  - `HandwrittenNoteView`: Paper artifact rendering with forensic handwriting examination and side-by-side transcription.
  - `PhotoEvidenceView`: High-resolution photographic evidence inspector with zoom-in capability and yellow evidence tent tags.
  - `WitnessStatementView`: Deposition transcript with witness capacity, sworn statement, and digital signature acknowledgment.
  - Enhanced `ChatMessageView`: WhatsApp layout with delivery checkmarks, online state indicator, and encryption divider pills.
- **Case File Dashboard:**
  - Upgraded evidence browser inside the Investigation Room with category tabs (*All Evidence, Digital Evidence, Visual Evidence, Official Reports, Witness Statements, Physical & Financial*).
  - Added suspect filter to view all clues linked to a specific person of interest.
  - Added review status filter (*Bookmarked, Reviewed, Unreviewed*) and real-time keyword search.
- **Database & Pipeline Compatibility:**
  - Extended `Evidence` model with `category`, `source`, `metadata`, and expanded type support while maintaining backward compatibility.

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
