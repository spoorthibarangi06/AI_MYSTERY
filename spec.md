# AI MYSTERY ROOM
## Master Software Specification (SSOT)

**Project Name:** AI Mystery Room  
**Project Type:** AI-Powered Interactive Mystery Investigation Platform  
**Development Methodology:** Spec-Driven Development  
**Specification Version:** 1.0  
**Target Platform:** Responsive Web Application  
**Frontend:** React + Vite  
**Backend:** Node.js + Express.js  
**Database:** MongoDB  
**AI Provider:** Google Gemini  

---

# 1. PROJECT OVERVIEW

## 1.1 Project Description

AI Mystery Room is an AI-powered interactive mystery investigation platform where users can create their own mystery challenges by providing a short scenario, story, or situation.

The backend uses Google's Gemini AI to transform the user's input into a complete fictional investigation.

The AI generates:
- A detailed mystery storyline.
- Multiple suspects with different backgrounds and motives.
- One hidden culprit.
- Fictional WhatsApp conversations.
- AI-generated investigation photographs.
- CCTV-style recordings and surveillance evidence.
- Witness statements.
- Physical evidence and documents.
- An investigation timeline.
- A final explanation revealing how the culprit committed the incident.

The user enters an interactive investigation room and explores all the available evidence.

After analysing the clues, the user must identify the culprit by selecting one suspect.

The system evaluates the user's answer and reveals the actual culprit along with a detailed explanation of the investigation.

## 1.2 Problem Statement

Most traditional mystery-solving games provide predefined stories and fixed investigations.

Users cannot easily create unique mysteries based on their own imagination.

AI Mystery Room addresses this limitation by allowing users to generate personalised mystery investigations using generative AI.

## 1.3 Main Objective

Build an interactive platform where users can turn a simple story idea into a complete AI-generated detective investigation and solve it by analysing different forms of evidence.

## 1.4 Core Product Experience

The application should feel like entering a real detective investigation room.

The user should:
1. Create a mystery scenario.
2. Wait while AI constructs the investigation.
3. Enter the mystery room.
4. Examine suspects and their profiles.
5. Read fictional conversations.
6. Inspect images and documents.
7. Watch CCTV-style recordings.
8. Connect the clues.
9. Identify the culprit.
10. Receive the final verdict.

## 1.5 Core Design Principle

**Every mystery must be logically solvable.**

The generated investigation must have:
- Exactly one intended culprit.
- A believable motive.
- A logical opportunity.
- A consistent timeline.
- Multiple supporting clues.
- Evidence that connects to the actual culprit.
- A final explanation supported by the evidence.

The application must not generate random evidence that has no connection to the actual solution.

---

# 2. TECHNOLOGY STACK

## 2.1 Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

## 2.2 Backend

- Node.js
- Express.js
- REST API architecture
- JWT authentication
- bcrypt password hashing

## 2.3 Database

- MongoDB
- Mongoose ODM

## 2.4 AI Integration

**Primary AI Provider: Google Gemini**

Gemini will be responsible for:
- Understanding user-provided scenarios.
- Creating mystery storylines.
- Generating suspect profiles.
- Establishing motives and alibis.
- Generating investigation clues.
- Creating fictional WhatsApp conversations.
- Generating witness statements.
- Constructing investigation timelines.
- Creating the final mystery explanation.
- Evaluating the user's accusation.

Use Google's supported image-generation capabilities or another compatible image-generation API for visual evidence.

For video evidence, integrate a compatible video-generation provider if available. Do not assume Gemini's text API alone can generate actual video files.

If actual video generation is unavailable, provide CCTV-style reconstructed footage using generated surveillance images, timestamps, and descriptions.

All AI requests must be made through the backend.

## 2.5 Development Tools

- Antigravity – AI-assisted development environment.
- Git and GitHub – Version control.
- MongoDB Atlas – Cloud database.
- Google AI Studio – Gemini API key.
- Postman – API testing.

---

# 3. USER ROLES

The MVP will support one primary user role.

## 3.1 Registered User

Users can:
- Register and log in.
- Create a new mystery.
- Select mystery categories.
- Choose difficulty.
- Generate investigations.
- View their previous mysteries.
- Continue incomplete investigations.
- Examine suspects and evidence.
- Mark evidence as reviewed.
- Bookmark important clues.
- Submit their final accusation.
- View investigation results.
- Delete their own mysteries.

Guest mode and administrator functionality are outside the initial MVP.

---

# 4. APPLICATION FLOW

The complete application workflow:

1. User visits the website.
2. User registers or logs in.
3. User reaches the dashboard.
4. User clicks Create New Mystery.
5. User enters a story or scenario.
6. User selects category, difficulty, and suspect count.
7. User clicks Generate Mystery.
8. Backend receives the request.
9. Gemini generates the complete internal mystery blueprint.
10. Backend validates the blueprint.
11. AI generates the different evidence types.
12. Generated assets are stored.
13. Mystery and evidence are saved in MongoDB.
14. User is redirected to the investigation room.
15. User examines the available evidence.
16. User selects the suspected culprit.
17. User submits the accusation.
18. Backend compares the selected suspect with the hidden culprit.
19. The application reveals the verdict and complete explanation.

---

# 5. WEBSITE PAGES AND ROUTES

## 5.1 Landing Page

**Route:** `/`

Purpose: Introduce the platform and encourage users to create a mystery.

### Navigation Bar
- AI Mystery Room logo.
- Home.
- How It Works.
- Login.
- Sign Up.

### Hero Section

Main heading:

"Every Mystery Has a Secret. Can You Uncover It?"

Supporting text:

"Create your own mystery, investigate AI-generated evidence, connect the clues, and discover who is behind the story."

Buttons:
- Create Your Mystery.
- How It Works.

Visual direction:
- Dark detective investigation environment.
- Investigation board.
- Photographs connected with red strings.
- Evidence documents.
- Suspicious character photographs.

### How It Works Section

Display four steps:

1. Create Your Story.
2. AI Builds Your Investigation.
3. Examine the Evidence.
4. Identify the Culprit.

### Features Section

Highlight:
- AI-generated mysteries.
- Dynamic suspects.
- Realistic fictional evidence.
- Interactive investigation rooms.
- Multiple evidence formats.
- Final detective verdict.

### Footer

Include:
- About.
- How It Works.
- Privacy Policy.
- Terms and Conditions.

## 5.2 Registration Page

**Route:** `/register`

Fields:
- Full name.
- Email.
- Password.
- Confirm password.

Requirements:
- All fields are required.
- Validate email format.
- Minimum password length: 8 characters.
- Passwords must match.
- Prevent duplicate email registration.
- Hash passwords using bcrypt.

After successful registration, redirect to dashboard.

## 5.3 Login Page

**Route:** `/login`

Fields:
- Email.
- Password.

Requirements:
- Validate credentials through backend.
- Generate JWT authentication token.
- Display appropriate errors.
- Redirect to dashboard after successful login.
- Protect authenticated routes.

## 5.4 Dashboard

**Route:** `/dashboard`

Purpose: Display the user's mystery collection.

### Dashboard Header

Display:
- Welcome message.
- User name.
- Create New Mystery button.

### Statistics

Display:
- Total Mysteries.
- Completed Mysteries.
- Ongoing Investigations.
- Correct Accusations.

### Mystery Cards

Each mystery card contains:
- Mystery title.
- Short description.
- Category.
- Difficulty.
- Creation date.
- Number of suspects.
- Status.

Available actions:
- Continue Investigation.
- View Result.
- Delete Mystery.

### Empty State

If there are no mysteries:

"Your investigation room is empty. Create your first mystery and start solving."

Include a Create Mystery button.

## 5.5 Create Mystery Page

**Route:** `/create-mystery`

This page collects the information required to generate a mystery.

### Input Fields

**1. Mystery Title**

Optional.

If empty, Gemini generates a suitable title.

**2. Story / Scenario**

Required text area.

Example:

"A wealthy businessman is found unconscious in his locked office. Four people were present in the building that night. His business partner, personal assistant, wife, and security guard all have different explanations about what happened."

Validation:
- Minimum 30 characters.
- Maximum 2,000 characters.
- Display character count.

**3. Mystery Category**

Options:
- Murder Mystery.
- Theft.
- Missing Person.
- Cybercrime.
- Corporate Espionage.
- Hidden Identity.
- General Mystery.

**4. Difficulty Level**

Options:
- Easy.
- Medium.
- Hard.

**5. Number of Suspects**

Options:
- 3.
- 4.
- 5.
- 6.

Default: 4.

### Generate Button

On clicking:
- Validate input.
- Send data to backend.
- Create a mystery record.
- Start asynchronous AI generation.
- Navigate to generation screen.

Prevent duplicate generation requests from repeated clicks.

---

# 6. MYSTERY GENERATION SCREEN

**Route:** `/generating/:mysteryId`

Purpose: Display generation progress while AI creates the investigation.

Show the following stages:

1. Analysing your story.
2. Creating the mystery storyline.
3. Building suspect profiles.
4. Establishing motives and alibis.
5. Generating evidence.
6. Preparing the investigation room.

The progress indicator must reflect actual backend generation stages.

Do not display fake percentage progress.

### Failure Handling

If generation fails:
- Display an error message.
- Provide a retry option.
- Preserve the original scenario.
- Avoid duplicate mystery records.

Only redirect to the investigation room when all mandatory generation stages are complete.

---

# 7. INVESTIGATION ROOM

**Route:** `/mystery/:mysteryId`

This is the main feature of the application.

The investigation room must provide a realistic detective workspace where users can inspect different types of evidence.

## 7.1 Layout

Create a dark investigation interface with:

**Left Sidebar**
- Case Overview.
- Suspects.
- Evidence.
- Messages.
- CCTV Footage.
- Investigation Timeline.
- Final Accusation.

**Main Content**
- Display the currently selected investigation section.

**Top Navigation**
- Mystery title.
- Case ID.
- Difficulty.
- Investigation status.
- Dashboard navigation.

## 7.2 Case Overview

Display:
- Mystery introduction.
- Incident location.
- Incident date and time.
- Description of the incident.
- Initial investigation details.
- Objective of the investigation.

Do not reveal the culprit.

## 7.3 Suspect Profiles

Each suspect must have:

- Unique suspect ID.
- Full name.
- Age.
- Occupation.
- Profile photograph.
- Background.
- Relationship to the incident.
- Possible motive.
- Initial alibi.
- Suspicious observations.

When a suspect is clicked, open a detailed profile.

IMPORTANT:

Never expose the hidden culprit status or secret solution in public suspect responses.

All suspects should appear believable. Do not make the culprit obviously suspicious simply because they are the culprit.

## 7.4 Evidence Management

The investigation must contain multiple forms of evidence.

### A. WhatsApp-Style Messages

Generate fictional chat conversations.

Each conversation should contain:
- Sender name.
- Receiver name.
- Timestamp.
- Message text.
- Conversation ID.
- Related suspect IDs.

UI:
- Familiar messaging layout.
- Different alignment for sender and receiver.
- Timestamps.
- Contact name.
- Scrollable conversation window.

The conversations must contain relevant clues, suspicious interactions, or conflicting information.

All conversations must be fictional and clearly identified as generated investigation evidence.

### B. AI-Generated Images

Generate relevant fictional investigation photographs.

Examples:
- Crime scene.
- Suspicious object.
- Broken equipment.
- Office or room photographs.
- Important documents.
- Evidence found at the location.

Each image must contain:
- Evidence ID.
- Image title.
- Description.
- Image URL.
- Discovery location.
- Related suspects.

Users can click an image to view it in an enlarged modal.

### C. CCTV Evidence

CCTV evidence must contain:
- Camera location.
- Recording date.
- Recording time.
- Recording duration, when available.
- Video or reconstructed image.
- Evidence description.
- Important observations.

If actual AI-generated video is available:
- Display a video player.
- Allow playback and pausing.

If video generation is unavailable:
- Display CCTV-style generated images.
- Include timestamps.
- Include a fictional recording transcript or observation summary.

Do not display a fake video player for an image.

### D. Witness Statements

Each statement must contain:
- Witness name.
- Interview time.
- Statement content.
- Related suspects.
- Evidence references.

Statements may contain incomplete or conflicting information, but the final mystery must remain logically solvable.

### E. Physical Evidence and Documents

Examples:
- Receipts.
- Letters.
- Keys.
- Fingerprints.
- Notes.
- Contracts.
- Photographs.
- Digital documents.

Each evidence record must contain:
- Evidence ID.
- Title.
- Type.
- Description.
- Discovery location.
- Timestamp.
- Related suspect IDs.

## 7.5 Evidence Interaction

Users must be able to:

- Open evidence.
- View detailed descriptions.
- Zoom into photographs.
- Play generated videos.
- Review messages.
- Mark evidence as reviewed.
- Bookmark evidence.
- Revisit bookmarked evidence.

All progress must be saved in MongoDB.

## 7.6 Investigation Timeline

Display all important events chronologically.

Each timeline event must include:
- Event ID.
- Event title.
- Date and time.
- Event description.
- Related suspects.
- Related evidence.

Use a vertical timeline design.

Ensure that timeline events are consistent with the evidence.

## 7.7 Final Accusation

Display all suspects as selectable cards.

The user must:
1. Select one suspect.
2. Optionally enter their explanation.
3. Click Submit Final Accusation.
4. Confirm the decision.

MVP rules:
- Only one final accusation per mystery.
- Once submitted, the accusation cannot be changed.
- Save the selected suspect and reasoning.
- Reveal the correct culprit only after submission.

---

# 8. VERDICT AND RESULTS PAGE

**Route:** `/mystery/:mysteryId/result`

After submission, display the investigation result.

## 8.1 Verdict

If correct:

"Case Solved! You identified the culprit."

If incorrect:

"Case Closed. Your accusation was incorrect."

## 8.2 Culprit Reveal

Display:
- Culprit name.
- Profile image.
- Background.
- Actual motive.
- Method.
- Opportunity.
- Explanation of the incident.

## 8.3 Evidence-Based Explanation

Explain how the clues connect to the culprit.

Example:

1. The WhatsApp conversation established that the suspect knew the victim's schedule.
2. The CCTV evidence contradicted the suspect's original alibi.
3. A recovered document revealed a hidden financial motive.
4. The investigation timeline confirmed that the suspect had the opportunity.

The explanation must reference the actual generated evidence.

Do not invent new evidence after the accusation.

## 8.4 Detective Performance

Display:
- Correct or incorrect accusation.
- Number of evidence items reviewed.
- Total evidence items.
- Investigation completion time, if tracked.

## 8.5 Actions

- Return to Dashboard.
- Revisit Investigation.
- Create Another Mystery.

---

# 9. GEMINI AI ARCHITECTURE

This section defines the most important backend functionality.

## 9.1 General Architecture

Gemini must generate the investigation through a structured pipeline.

The application must NOT generate each evidence item independently without a shared source of truth.

Use the following approach:

### Stage 1: Mystery Blueprint Generation

Input:
- User scenario.
- Category.
- Difficulty.
- Suspect count.

Gemini generates a complete internal mystery blueprint containing:
- Story.
- Suspects.
- Hidden culprit.
- Motives.
- Alibis.
- Timeline.
- Actual solution.
- Evidence requirements.
- Clue relationships.

This blueprint is the foundation of the entire investigation.

### Stage 2: Blueprint Validation

Validate:
- Exactly one culprit.
- Correct suspect count.
- Unique suspect IDs.
- Valid suspect references.
- Consistent timeline.
- Valid hidden solution.
- Minimum number of meaningful clues.
- No missing required fields.

If invalid, request a correction from Gemini with a maximum of three attempts.

If still invalid, mark generation as failed and preserve the original request.

### Stage 3: Evidence Generation

Generate all evidence using the validated blueprint.

Separate evidence-generation tasks may be used for:
- WhatsApp conversations.
- Witness statements.
- Physical evidence.
- Investigation photographs.
- CCTV evidence.
- Timeline descriptions.

Every generation prompt must include the relevant blueprint details.

### Stage 4: Consistency Validation

Validate that:
- Evidence references existing suspects.
- Conversations use the correct character names.
- Timestamps match the investigation timeline.
- Evidence does not contradict the hidden solution.
- The intended culprit can be identified through multiple clues.
- Red herrings are plausible but do not make the puzzle unfair.

### Stage 5: Asset Generation

Generate images and optional videos.

Store the resulting assets in persistent cloud storage.

Do not store large image or video binaries directly inside MongoDB.

### Stage 6: Save Investigation

Save all validated records.

Set mystery status to `ready` only when all mandatory generation stages succeed.

---

# 10. MYSTERY GENERATION RULES

## 10.1 Difficulty

### Easy
- 3–4 suspects.
- 5–7 evidence items.
- Direct clues.
- Simple timeline.
- Few red herrings.

### Medium
- 4–5 suspects.
- 8–12 evidence items.
- Multiple conflicting alibis.
- Some misleading evidence.
- Requires connecting different clues.

### Hard
- 5–6 suspects.
- 12–16 evidence items.
- Complex timeline.
- Multiple interconnected clues.
- Strong red herrings.
- Requires deeper deduction.

The selected suspect count must always take priority over default difficulty settings.

## 10.2 Logical Mystery Rules

1. There must be exactly one intended culprit.
2. The culprit must have a believable motive.
3. The culprit must have had an opportunity.
4. Evidence must support the final explanation.
5. At least three meaningful clues must support the intended solution.
6. At least one clue should require connecting information from two evidence sources.
7. Red herrings must not create another equally valid culprit.
8. All timestamps must be logically consistent.
9. All evidence must belong to the same fictional investigation.
10. The final explanation must not introduce facts that were never established.

---

# 11. GEMINI PROMPT ENGINEERING

Create a dedicated prompt-management system.

Suggested files:

- `mysteryBlueprintPrompt.js`
- `evidenceGenerationPrompt.js`
- `imageGenerationPrompt.js`
- `cctvGenerationPrompt.js`
- `solutionEvaluationPrompt.js`

## 11.1 System Role

Gemini must act as:

"An expert mystery writer, crime investigator, detective puzzle designer, and logical storytelling specialist."

## 11.2 Blueprint Prompt Requirements

The prompt must instruct Gemini to:

- Understand the user's original scenario.
- Expand it into an engaging fictional investigation.
- Generate the required number of suspects.
- Assign exactly one culprit.
- Create believable motives and alibis.
- Construct a consistent timeline.
- Create a hidden solution.
- Define clues that support the solution.
- Include plausible red herrings.
- Make the investigation solvable.
- Return structured JSON.

## 11.3 Evidence Prompt Requirements

Every evidence-generation request must receive:
- Mystery blueprint.
- Relevant suspect information.
- Timeline information.
- Relevant clue relationships.
- Evidence type.
- Expected output schema.

The model must not introduce unsupported characters or contradictory facts.

## 11.4 Structured Output

Use Gemini structured JSON output where supported.

Validate the response using Zod or an equivalent schema-validation library.

Do not directly save unvalidated AI output.

## 11.5 AI Failure Handling

Handle:
- Invalid JSON.
- Missing fields.
- API quota limits.
- API unavailability.
- Timeout.
- Inconsistent evidence.
- Image-generation failure.
- Video-generation failure.

Use bounded retries and record generation errors.

If an optional visual asset fails, the rest of the investigation should remain usable with an explicit fallback state.

---

# 12. DATABASE SCHEMA

Use MongoDB and Mongoose.

## 12.1 Users

Collection: `users`

Fields:
- `_id`
- `name`
- `email`
- `passwordHash`
- `createdAt`
- `updatedAt`

Email must have a unique index.

## 12.2 Mysteries

Collection: `mysteries`

Fields:
- `_id`
- `userId`
- `title`
- `originalPrompt`
- `category`
- `difficulty`
- `suspectCount`
- `story`
- `location`
- `incidentDate`
- `status`
- `generationStage`
- `generationError`
- `createdAt`
- `updatedAt`
- `completedAt`

Statuses:
- `generating`
- `ready`
- `failed`
- `completed`

## 12.3 Suspects

Collection: `suspects`

Fields:
- `_id`
- `mysteryId`
- `suspectId`
- `name`
- `age`
- `occupation`
- `profileImage`
- `background`
- `motive`
- `alibi`
- `publicDetails`
- `createdAt`

The public suspect schema must not contain a readable culprit indicator.

## 12.4 Evidence

Collection: `evidence`

Fields:
- `_id`
- `mysteryId`
- `evidenceId`
- `type`
- `title`
- `description`
- `content`
- `assetUrl`
- `relatedSuspectIds`
- `discoveryLocation`
- `timestamp`
- `createdAt`

Supported evidence types:
- `message`
- `image`
- `cctv`
- `witness_statement`
- `physical_evidence`
- `document`

## 12.5 Solutions

Collection: `solutions`

Fields:
- `_id`
- `mysteryId`
- `culpritSuspectId`
- `actualMotive`
- `method`
- `opportunity`
- `explanation`
- `evidenceReasoning`
- `createdAt`

This collection is confidential.

Only backend services responsible for evaluating accusations and revealing completed results may access it.

## 12.6 Investigation Progress

Collection: `investigationProgress`

Fields:
- `_id`
- `userId`
- `mysteryId`
- `reviewedEvidenceIds`
- `bookmarkedEvidenceIds`
- `lastVisitedAt`
- `createdAt`
- `updatedAt`

Create a unique index on `userId + mysteryId`.

## 12.7 Accusations

Collection: `accusations`

Fields:
- `_id`
- `userId`
- `mysteryId`
- `selectedSuspectId`
- `reasoning`
- `isCorrect`
- `submittedAt`
- `resultExplanation`

Create a unique index on `userId + mysteryId`.

---

# 13. BACKEND API SPECIFICATION

Base URL: `/api`

All private routes require authentication.

## 13.1 Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login user |
| GET | `/auth/me` | Get current user |

## 13.2 Mystery APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/mysteries` | Start mystery generation |
| GET | `/mysteries` | List user's mysteries |
| GET | `/mysteries/:id` | Get mystery overview |
| GET | `/mysteries/:id/status` | Get generation status |
| DELETE | `/mysteries/:id` | Delete mystery |

## 13.3 Investigation APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/mysteries/:id/suspects` | Get public suspects |
| GET | `/mysteries/:id/evidence` | Get evidence |
| GET | `/mysteries/:id/evidence/:evidenceId` | Get evidence details |
| GET | `/mysteries/:id/timeline` | Get timeline |

## 13.4 Progress APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/mysteries/:id/progress` | Get progress |
| PUT | `/mysteries/:id/progress` | Update reviewed evidence |
| PUT | `/mysteries/:id/bookmarks` | Update bookmarks |

## 13.5 Accusation APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/mysteries/:id/accusation` | Submit accusation |
| GET | `/mysteries/:id/result` | Get final result |

## 13.6 API Response Format

Success:

{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

Error:

{
  "success": false,
  "message": "Something went wrong",
  "error": "ERROR_CODE"
}

All APIs must:
- Validate request bodies.
- Validate route parameters.
- Check authentication.
- Check mystery ownership.
- Return appropriate HTTP status codes.
- Avoid exposing internal AI responses.
- Avoid exposing confidential solution information.

---

# 14. PROJECT FOLDER STRUCTURE

Use the following modular structure.

client/
  src/
    assets/
    components/
      common/
      layout/
      mystery/
      evidence/
      suspects/
      dashboard/
    pages/
      LandingPage.jsx
      LoginPage.jsx
      RegisterPage.jsx
      DashboardPage.jsx
      CreateMysteryPage.jsx
      GeneratingPage.jsx
      InvestigationPage.jsx
      ResultPage.jsx
    context/
      AuthContext.jsx
    hooks/
    services/
      api.js
      authService.js
      mysteryService.js
    routes/
      ProtectedRoute.jsx
    utils/
    App.jsx
    main.jsx

server/
  config/
    db.js
    gemini.js
  controllers/
    authController.js
    mysteryController.js
    evidenceController.js
    accusationController.js
  middleware/
    authMiddleware.js
    errorMiddleware.js
    validationMiddleware.js
  models/
    User.js
    Mystery.js
    Suspect.js
    Evidence.js
    Solution.js
    InvestigationProgress.js
    Accusation.js
  routes/
    authRoutes.js
    mysteryRoutes.js
    evidenceRoutes.js
    accusationRoutes.js
  services/
    geminiService.js
    mysteryGenerationService.js
    evidenceGenerationService.js
    assetGenerationService.js
    validationService.js
    accusationService.js
  prompts/
    mysteryBlueprintPrompt.js
    evidenceGenerationPrompt.js
    evaluationPrompt.js
  utils/
  server.js

---

# 15. UI/UX DESIGN REQUIREMENTS

## 15.1 Design Direction

Theme: Premium Dark Detective Investigation Workspace.

The website should feel like a modern detective investigation platform.

Design references:
- Investigation rooms.
- Classified case files.
- Crime boards.
- Digital surveillance systems.
- Premium dark SaaS dashboards.

## 15.2 Colour Palette

Primary Background: `#0B0F14`

Secondary Background: `#121923`

Card Background: `#18212D`

Primary Accent: `#D94B4B`

Secondary Accent: `#D6A85F`

Primary Text: `#F3F4F6`

Secondary Text: `#9CA3AF`

Borders: `#293444`

Success: `#34D399`

Error: `#EF4444`

## 15.3 Typography

- Inter – Body text.
- Space Grotesk – Headings.

## 15.4 Design Rules

- Use consistent card layouts.
- Use subtle borders and shadows.
- Use smooth hover transitions.
- Use clear typography.
- Use consistent spacing.
- Use readable evidence viewers.
- Use loading skeletons.
- Use toast notifications.
- Use confirmation modals for destructive actions.

Avoid:
- Excessive gradients.
- Excessive animations.
- Overcrowded screens.
- Bright colours everywhere.
- Generic template-like dashboards.

## 15.5 Investigation Workspace

Make this page visually distinctive.

Use:
- Persistent navigation sidebar on desktop.
- Evidence cards.
- Suspect profile panels.
- Chat conversation viewer.
- Image preview modal.
- CCTV viewer.
- Vertical timeline.
- Final accusation panel.

## 15.6 Responsive Design

Desktop:
- Full investigation workspace.
- Sidebar.
- Multi-column evidence grid.

Tablet:
- Collapsible sidebar.
- Two-column evidence grid.

Mobile:
- Single-column layout.
- Drawer navigation.
- Touch-friendly controls.
- Responsive evidence viewers.

---

# 16. SECURITY REQUIREMENTS

1. Hash passwords using bcrypt.
2. Keep Gemini API keys in backend environment variables.
3. Never expose hidden culprit information before accusation.
4. Use JWT authentication.
5. Validate and sanitise user input.
6. Verify mystery ownership on every private endpoint.
7. Apply rate limiting to authentication and AI generation.
8. Validate all AI-generated JSON.
9. Prevent users from accessing other users' mysteries.
10. Use secure HTTP headers.
11. Never store actual private WhatsApp conversations or real CCTV recordings.
12. Clearly label all generated investigation material as fictional.
13. Do not allow arbitrary executable content in uploaded or generated evidence.
14. Avoid exposing internal stack traces or secrets.

Environment variables:

PORT=
MONGODB_URI=
JWT_SECRET=
GEMINI_API_KEY=
GEMINI_MODEL=
CLIENT_URL=
ASSET_STORAGE_URL=
ASSET_STORAGE_SECRET=

Provide a `.env.example` file.

---

# 17. ERROR HANDLING

| Error | Expected Behaviour |
|---|---|
| Empty scenario | Show validation error |
| Invalid credentials | Show login error |
| Gemini API failure | Provide retry option |
| Invalid JSON response | Retry validation/generation |
| Image generation failure | Display placeholder |
| Video generation failure | Use CCTV stills |
| MongoDB failure | Display service error |
| Mystery not found | Show 404 |
| Unauthorized request | Return 401 |
| Access to another user's mystery | Return 403 |
| Duplicate accusation | Reject submission |
| Missing evidence | Show appropriate fallback |

All errors must be logged safely.

---

# 18. PERFORMANCE REQUIREMENTS

- Lazy-load images.
- Optimise generated images.
- Use asynchronous AI generation.
- Avoid blocking long-running Express requests.
- Use database indexes.
- Paginate dashboard data when necessary.
- Avoid unnecessary API calls.
- Cache static resources.
- Track generation status.
- Store media in cloud object storage.

Use a background job mechanism for long-running generation. Redis and BullMQ can be introduced if necessary.

---

# 19. MVP FEATURES AND PRIORITIES

## Must Have

- User authentication.
- Dashboard.
- Custom mystery creation.
- Mystery category selection.
- Difficulty selection.
- Suspect count selection.
- Gemini mystery generation.
- Hidden culprit.
- AI-generated fictional messages.
- AI-generated images.
- CCTV-style evidence.
- Witness statements.
- Physical evidence.
- Investigation timeline.
- Interactive investigation room.
- Final accusation.
- Verdict and explanation.
- Investigation progress persistence.
- Responsive design.

## Future Enhancements

Do not implement these in the first version:

- Multiplayer investigations.
- Real-time collaborative rooms.
- Public mystery sharing.
- Leaderboards.
- Detective ranking.
- Voice-based investigation.
- AI interrogation conversations.
- Multiple endings.
- Hint system.
- Social sharing.
- Public mystery marketplace.

---

# 20. ACCEPTANCE CRITERIA

The MVP is complete only when the following work correctly.

### Authentication
- Users can register.
- Users can log in.
- Passwords are securely hashed.
- Private pages are protected.

### Mystery Generation
- Users can submit scenarios.
- Users can select difficulty and suspect count.
- Gemini generates structured mystery blueprints.
- Exactly one intended culprit exists.
- Generated mysteries are saved in MongoDB.

### Evidence
- Each mystery contains multiple evidence types.
- Messages are displayed in chat format.
- Images can be opened.
- CCTV evidence can be inspected.
- Witness statements are available.
- Timeline is logically consistent.

### Investigation
- Users can inspect suspects.
- Users can inspect evidence.
- Users can bookmark clues.
- Users can mark evidence as reviewed.
- Progress is saved.
- The culprit is hidden.

### Accusation
- Users can select a suspect.
- Users can submit one accusation.
- The backend evaluates the selection.
- Duplicate accusations are prevented.
- Results reveal the actual culprit.

### Security
- Users cannot access another user's mysteries.
- Hidden solutions are protected.
- API keys are never exposed.
- Authentication is enforced.

---

# 21. IMPLEMENTATION PHASES

Antigravity must implement the application in the following order.

## Phase 1: Project Setup

- Create React + Vite frontend.
- Create Express backend.
- Configure MongoDB.
- Configure Tailwind.
- Create folder structure.
- Set up environment variables.
- Establish frontend-backend communication.

Deliverable: Running full-stack foundation.

## Phase 2: Authentication and Dashboard

- Registration.
- Login.
- JWT authentication.
- Protected routes.
- Dashboard.
- Mystery listing.

Deliverable: Functional user account system.

## Phase 3: Mystery Generation

- Gemini integration.
- Prompt engineering.
- Blueprint generation.
- JSON validation.
- Suspect generation.
- Hidden solution generation.
- Background generation status.

Deliverable: Functional AI mystery generation.

## Phase 4: Evidence Generation

- WhatsApp-style conversations.
- Witness statements.
- Physical evidence.
- Image generation.
- CCTV evidence.
- Evidence validation.

Deliverable: Complete generated investigations.

## Phase 5: Investigation Room

- Case overview.
- Suspect profiles.
- Evidence viewer.
- Chat interface.
- Image modal.
- CCTV viewer.
- Timeline.
- Bookmarking.
- Review tracking.

Deliverable: Interactive investigation environment.

## Phase 6: Accusation and Results

- Suspect selection.
- Accusation API.
- Result evaluation.
- Culprit reveal.
- Final explanation.
- Performance summary.

Deliverable: Complete mystery-solving experience.

## Phase 7: Testing and Refinement

- Test all APIs.
- Test AI generation.
- Test evidence consistency.
- Test authentication.
- Test security.
- Test persistence.
- Test responsiveness.
- Fix bugs.

Deliverable: Production-ready MVP.

---

# 22. ANTIGRAVITY DEVELOPMENT INSTRUCTIONS

**THIS SECTION IS MANDATORY.**

Antigravity must treat this document as the Single Source of Truth for the entire application.

## 22.1 General Rules

1. Read the entire specification before writing code.
2. Follow the specified MERN architecture.
3. Use Gemini as the primary AI provider.
4. Follow the database schemas.
5. Follow the API contracts.
6. Maintain modular code.
7. Keep frontend and backend responsibilities separate.
8. Never expose hidden mystery solutions.
9. Do not hardcode mystery results.
10. Do not replace real AI functionality with static dummy data.
11. Do not leave major features as non-functional placeholders.
12. Handle errors and loading states properly.
13. Maintain responsive design.
14. Avoid unnecessary dependencies.
15. Do not implement future enhancements without approval.

## 22.2 Spec-Driven Development Workflow

Before implementing each feature:

1. Read the relevant requirements.
2. Identify frontend components.
3. Identify backend endpoints.
4. Identify database changes.
5. Identify AI dependencies.
6. Implement the feature.
7. Test against the acceptance criteria.
8. Update documentation.

Do not implement the entire application in one uncontrolled code-generation step.

## 22.3 Required Documentation

Maintain:

- `SPEC.md` – Complete project specification.
- `README.md` – Project setup and instructions.
- `API.md` – API documentation.
- `ARCHITECTURE.md` – System architecture.
- `CHANGELOG.md` – Implementation changes.
- `.env.example` – Environment variable template.

Do not silently modify the SSOT.

If a technical requirement needs to change:
- Explain why.
- Document the proposed change.
- Keep the specification and implementation synchronised.

## 22.4 Development Behaviour

- Work phase by phase.
- Test each phase before moving forward.
- Reuse existing components.
- Maintain consistent UI.
- Avoid unnecessary rewrites.
- Fix existing bugs before adding dependent features.
- Do not claim a feature is complete until it has been tested.

## 22.5 Final Goal

Build a fully functional AI Mystery Room platform where a user can provide a simple story, receive a complete fictional investigation, inspect multiple forms of AI-generated evidence, identify the culprit, and receive a logical final verdict.

The priority is to deliver a complete end-to-end mystery-solving experience rather than simply generating an attractive website.

**Follow this specification throughout the entire development lifecycle.**