export const getMysteryBlueprintPrompt = ({ originalPrompt, category, difficulty, suspectCount }) => {
  return `You are an expert mystery writer, crime investigator, detective puzzle designer, and logical storytelling specialist.

Your task is to transform the user's premise into a rich, immersive, and LOGICALLY SOLVABLE detective investigation blueprint.

USER INPUT:
- Scenario / Story: "${originalPrompt}"
- Mystery Category: ${category || 'General Mystery'}
- Difficulty Level: ${difficulty || 'Medium'}
- Number of Suspects: ${suspectCount || 4}

CRITICAL RULES FOR LOGICAL MYSTERY PUZZLE DESIGN:
1. Exactly ONE intended culprit among the suspects.
2. The culprit must have a believable motive, method, and opportunity.
3. Every suspect must have a distinct personality, believable relationship to the incident, an initial alibi, and a plausible motive (red herrings).
4. No suspect should look obviously guilty at a glance—all suspects must appear believable.
5. The puzzle must be solvable through deductive reasoning: there must be at least 3 distinct clues that together uniquely identify the culprit and invalidate their alibi or implicate their method/motive.
6. The timeline must be completely consistent and airtight.
7. DYNAMIC EVIDENCE VARIETY RULE:
   Do NOT generate the same fixed evidence types for every mystery. Tailor the evidence plan realistically to the crime category:
   - Murder Mystery: e.g., 'medical_report' (autopsy/coroner), 'police_report', 'photo', 'cctv', 'witness_statement', 'message'.
   - Cybercrime: e.g., 'email', 'access_log' (server/IP logs), 'financial_record', 'message', 'police_report'.
   - Theft: e.g., 'cctv', 'access_log' (keycard audit), 'witness_statement', 'message', 'police_report'.
   - Missing Person: e.g., 'call_log', 'message', 'witness_statement', 'photo', 'police_report'.
   - Corporate Espionage: e.g., 'email', 'financial_record', 'access_log', 'witness_statement', 'cctv'.
   - Hidden Identity / General: Choose 5-7 varied, realistic evidence formats from:
     ['message', 'cctv', 'police_report', 'witness_statement', 'medical_report', 'email', 'call_log', 'financial_record', 'access_log', 'photo', 'handwritten_note', 'document'].

8. Return ONLY a valid JSON object matching the exact schema below.

JSON OUTPUT STRUCTURE:
{
  "title": "A compelling detective case title",
  "story": "A rich, detailed case overview describing the crime, incident scene, time, discovery, and what is at stake.",
  "location": "Specific setting/venue of the incident",
  "incidentDate": "E.g. October 14, 2026, 11:45 PM",
  "suspects": [
    {
      "suspectId": "suspect_1",
      "name": "Full Name",
      "age": 38,
      "occupation": "Job Title",
      "background": "Detailed backstory and relationship to the victim/scene.",
      "motive": "Apparent motive or suspicious conflict.",
      "alibi": "Initial statement of where they were and what they were doing at the time of the incident.",
      "publicDetails": "Observable demeanor, physical description, or notable behavioral quirks during interrogation."
    }
  ],
  "solution": {
    "culpritSuspectId": "suspect_1",
    "actualMotive": "The true hidden motive behind the action.",
    "method": "Exactly how the culprit committed the act without immediate detection.",
    "opportunity": "The exact breach in time/space where the culprit had the opening.",
    "explanation": "A complete narrative synthesis revealing how the crime was executed and how the clues tie together.",
    "evidenceReasoning": [
      "Step 1: Pointing out the flaw in the alibi...",
      "Step 2: Connecting the message exchange to the secret motive...",
      "Step 3: Correlating the physical evidence with the surveillance timestamp..."
    ]
  },
  "timeline": [
    {
      "eventId": "event_1",
      "title": "Initial Movement",
      "dateTime": "10:15 PM",
      "description": "Chronological factual event description.",
      "relatedSuspects": ["suspect_1"],
      "relatedEvidence": ["EV-001"]
    }
  ],
  "evidencePlan": [
    {
      "evidenceId": "EV-001",
      "type": "police_report",
      "category": "official_report",
      "source": "Metropolitan Police Department",
      "title": "Initial Crime Scene Incident Report",
      "description": "Official intake report from the responding detective unit."
    },
    {
      "evidenceId": "EV-002",
      "type": "medical_report",
      "category": "official_report",
      "source": "Office of the Chief Medical Examiner",
      "title": "Forensic Pathology Preliminary Report",
      "description": "Examination of victim injuries, time of trauma, and toxicology notes."
    },
    {
      "evidenceId": "EV-003",
      "type": "message",
      "category": "digital",
      "source": "Subpoenaed Mobile Device Backup",
      "title": "Encrypted WhatsApp Exchange",
      "description": "Recovered chat thread establishing suspicious scheduling."
    },
    {
      "evidenceId": "EV-004",
      "type": "cctv",
      "category": "visual",
      "source": "Facility Security Terminal 02",
      "title": "Service Corridor Camera 04 Log",
      "description": "Surveillance capture contradicting stated alibi."
    },
    {
      "evidenceId": "EV-005",
      "type": "access_log",
      "category": "digital",
      "source": "Central IT Access Server",
      "title": "Biometric & Keycard Access Manifest",
      "description": "Door badge scans recorded during the critical time window."
    }
  ]
}`;
};
