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
7. Return ONLY a valid JSON object matching the exact schema below. Do not wrap with markdown code fences if possible, or use standard json format.

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
      "relatedEvidence": ["ev_msg_1"]
    }
  ],
  "evidencePlan": [
    {
      "evidenceId": "ev_msg_1",
      "type": "message",
      "title": "Encrypted Chat Fragment",
      "description": "Text exchange hinting at secret meeting."
    },
    {
      "evidenceId": "ev_img_1",
      "type": "image",
      "title": "Crime Scene Photograph",
      "description": "Photograph of the desk and broken window latch."
    },
    {
      "evidenceId": "ev_cctv_1",
      "type": "cctv",
      "title": "Hallway Camera Feed #4",
      "description": "Time-stamped recording of the rear corridor."
    },
    {
      "evidenceId": "ev_wit_1",
      "type": "witness_statement",
      "title": "Security Guard Deposition",
      "description": "Statement regarding access keys."
    },
    {
      "evidenceId": "ev_doc_1",
      "type": "document",
      "title": "Financial Audit Report / Ledger",
      "description": "Discrepancy record."
    }
  ]
}`;
};
