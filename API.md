# AI Mystery Room - REST API Specification

Base URL: `/api`  
All private endpoints require the `Authorization: Bearer <JWT>` header.

---

## 1. Authentication Endpoints

### `POST /api/auth/register`
Register a new investigator account.
- **Access:** Public
- **Body:**
```json
{
  "name": "Detective Miller",
  "email": "miller@precinct.org",
  "password": "Password123"
}
```
- **Response (201):**
```json
{
  "success": true,
  "message": "Account registered successfully",
  "data": {
    "_id": "6724...",
    "name": "Detective Miller",
    "email": "miller@precinct.org",
    "token": "eyJhbGciOi..."
  }
}
```

### `POST /api/auth/login`
Authenticate existing investigator credentials.
- **Access:** Public
- **Body:**
```json
{
  "email": "miller@precinct.org",
  "password": "Password123"
}
```
- **Response (200):** Same user payload and JWT token.

### `GET /api/auth/me`
Retrieve currently authenticated user profile.
- **Access:** Private

---

## 2. Mystery Case Endpoints

### `POST /api/mysteries`
Initiate asynchronous mystery generation pipeline with Gemini.
- **Access:** Private
- **Body:**
```json
{
  "title": "Optional Title",
  "prompt": "Scenario description (30 to 2000 characters)...",
  "category": "Murder Mystery | Theft | Cybercrime | ...",
  "difficulty": "Easy | Medium | Hard",
  "suspectCount": 4
}
```
- **Response (201):**
```json
{
  "success": true,
  "message": "Mystery investigation generation initiated",
  "data": {
    "_id": "6724...",
    "status": "generating",
    "generationStage": "Analysing your story"
  }
}
```

### `GET /api/mysteries`
List all cases created by the authenticated user along with dashboard statistics.
- **Access:** Private

### `GET /api/mysteries/:id`
Get full overview details of a case file (verifies ownership).
- **Access:** Private

### `GET /api/mysteries/:id/status`
Poll the real-time AI generation stage.
- **Access:** Private
- **Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "generating | ready | failed | completed",
    "generationStage": "Generating evidence",
    "generationError": null
  }
}
```

### `DELETE /api/mysteries/:id`
Permanently delete case file and cascading evidence records.
- **Access:** Private

---

## 3. Investigation Endpoints

### `GET /api/mysteries/:id/suspects`
Retrieve public suspect dossiers (omits confidential culprit information).
- **Access:** Private

### `GET /api/mysteries/:id/evidence`
Retrieve full evidence collection for the case (WhatsApp chats, CCTV, witness statements, physical documents).
- **Access:** Private

### `GET /api/mysteries/:id/timeline`
Retrieve chronological event chain for cross-referencing alibis.
- **Access:** Private

### `GET /api/mysteries/:id/progress`
Retrieve reviewed and bookmarked clue IDs for the user.
- **Access:** Private

### `PUT /api/mysteries/:id/progress`
Update reviewed evidence items.
- **Access:** Private
- **Body:**
```json
{
  "reviewedEvidenceIds": ["ev_1", "ev_2"]
}
```

### `PUT /api/mysteries/:id/bookmarks`
Update bookmarked clue items.
- **Access:** Private
- **Body:**
```json
{
  "bookmarkedEvidenceIds": ["ev_3"]
}
```

---

## 4. Accusation & Verdict Endpoints

### `POST /api/mysteries/:id/accusation`
Submit the user's single definitive indictment.
- **Access:** Private
- **Body:**
```json
{
  "selectedSuspectId": "suspect_2",
  "reasoning": "The CCTV timestamp at 11:36 PM directly disproved Elena's stated basement alibi..."
}
```
- **Response (201):** Returns full verdict, reveals true culprit, actual motive, method, opportunity, and evidence reasoning.

### `GET /api/mysteries/:id/result`
Retrieve the finalized verdict report after an accusation has been submitted.
- **Access:** Private
