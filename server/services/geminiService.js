import { getGeminiModel } from '../config/gemini.js';

/**
 * Safely parse JSON from Gemini text responses, stripping markdown wrappers if present.
 */
export const cleanAndParseJSON = (rawText) => {
  if (!rawText) return null;
  let cleaned = rawText.trim();

  // Strip markdown code fences ```json ... ``` or ``` ... ```
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '');
    cleaned = cleaned.replace(/\s*```$/, '');
  }

  // Find first { or [ and last } or ]
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');

  let start = -1;
  let end = -1;

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    start = firstBrace;
    end = cleaned.lastIndexOf('}');
  } else if (firstBracket !== -1) {
    start = firstBracket;
    end = cleaned.lastIndexOf(']');
  }

  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.substring(start, end + 1);
  }

  return JSON.parse(cleaned);
};

/**
 * Request structured completion from Google Gemini with retries.
 */
export const callGemini = async (prompt, maxRetries = 2) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn('[GeminiService] GEMINI_API_KEY is not set. Using intelligent procedural scenario synthesizer fallback.');
    return generateLocalFallback(prompt);
  }

  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const model = getGeminiModel();
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 4096,
        },
      });

      const text = result.response.text();
      const parsed = cleanAndParseJSON(text);
      if (parsed) return parsed;
      throw new Error('Gemini response could not be parsed into valid JSON.');
    } catch (err) {
      console.error(`[GeminiService] Attempt ${attempt} failed: ${err.message}`);
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  console.warn(`[GeminiService] Gemini calls failed (${lastError.message}). Falling back to local procedural generator.`);
  return generateLocalFallback(prompt);
};

/**
 * High-quality fallback generator so the user can test the full game loop
 * even before configuring an external Google Gemini API key.
 */
const generateLocalFallback = (prompt) => {
  if (prompt.includes('CRITICAL RULES FOR LOGICAL MYSTERY PUZZLE DESIGN')) {
    // Blueprint fallback
    return {
      title: "The Midnight Vault Enigma",
      story: "At 11:45 PM on a stormy Tuesday, the secure vault inside the St. Claire Gallery was breached. The legendary 'Eye of Osiris' sapphire vanished without tripping the thermal sensors. Four key personnel had security clearance that night, each offering conflicting accounts and questionable alibis.",
      location: "St. Claire Gallery, 4th Floor Vault",
      incidentDate: "October 14, 2026, 11:45 PM",
      suspects: [
        {
          suspectId: "suspect_1",
          name: "Arthur Pendelton",
          age: 48,
          occupation: "Head Curator",
          background: "Curated the exhibition for over 15 years. Rumored to be under deep personal debt.",
          motive: "Massive unpaid debt from private antiquities acquisitions.",
          alibi: "Claims he was in his 2nd floor library inventorying manifests all evening.",
          publicDetails: "Fidgets with his pocket watch. Refused eye contact when asked about the security override codes."
        },
        {
          suspectId: "suspect_2",
          name: "Elena Rostova",
          age: 34,
          occupation: "Lead Security Technician",
          background: "Designed the biometric alarm firmware installed last autumn.",
          motive: "Denied promised equity in the gallery's recent corporate acquisition.",
          alibi: "Claims she was monitoring camera feeds from the basement command terminal.",
          publicDetails: "Calm, precise, wearing rubber-soled combat boots with damp mud stains."
        },
        {
          suspectId: "suspect_3",
          name: "Julian Cross",
          age: 29,
          occupation: "Private Collector & Patron",
          background: "Wealthy investor whose bid on the sapphire was rejected last month.",
          motive: "Obsessed with acquiring the jewel to complete his private dynasty collection.",
          alibi: "Claims he was dining at the Ritz Club across town until 12:15 AM.",
          publicDetails: "Arrogant demeanor, smelling faintly of high-grade copper cleaner."
        },
        {
          suspectId: "suspect_4",
          name: "Clara Finch",
          age: 41,
          occupation: "Senior Archivist",
          background: "Holds the physical master keys to the secondary display chambers.",
          motive: "Faced imminent termination due to museum restructuring.",
          alibi: "Claims she locked up the lower exhibits and departed at 10:30 PM.",
          publicDetails: "Nervous, hands stained with ink, carrying an oversized trench coat."
        }
      ],
      solution: {
        culpritSuspectId: "suspect_2",
        actualMotive: "Elena encoded a 4-minute diagnostic blind spot into the vault camera firmware during the recent security update.",
        method: "Used her override credentials to simulate a sensor recalibration, bypassed the thermal sweep, and pocketed the sapphire before resetting the telemetry.",
        opportunity: "Between 11:32 PM and 11:40 PM, while the secondary security patrol was dispatched to investigate a false perimeter ping she deliberately triggered.",
        explanation: "Elena used her insider knowledge of the firmware architecture to create an artificial blind spot. While Arthur had the financial motive, physical evidence and timestamped surveillance transcripts prove that Elena manipulated the system clock from the command terminal and traversed the rear stairwell.",
        evidenceReasoning: [
          "The WhatsApp chat shows Elena warning her contact about an automated camera reset scheduled at 11:30 PM.",
          "CCTV camera 04 shows a technician with damp combat boots crossing the west stairwell at 11:36 PM, directly contradicting Elena's claim of remaining in the basement terminal.",
          "The forensic document reveals an unauthorized firmware patch uploaded 2 hours prior to the heist with Elena's digital signature."
        ]
      },
      timeline: [
        {
          eventId: "event_1",
          title: "Gallery Public Closing",
          dateTime: "10:00 PM",
          description: "All public doors sealed and main gallery alarm armed.",
          relatedSuspects: ["suspect_1", "suspect_4"],
          relatedEvidence: ["ev_1"]
        },
        {
          eventId: "event_2",
          title: "False Perimeter Alarm",
          dateTime: "11:28 PM",
          description: "Perimeter sensor triggered in the garden, drawing Officer Vance away from the elevator bank.",
          relatedSuspects: ["suspect_2"],
          relatedEvidence: ["ev_2"]
        },
        {
          eventId: "event_3",
          title: "Firmware Recalibration Window",
          dateTime: "11:35 PM",
          description: "Vault sensor data feeds freeze on a 4-minute looped diagnostic buffer.",
          relatedSuspects: ["suspect_2"],
          relatedEvidence: ["ev_3", "ev_4"]
        },
        {
          eventId: "event_4",
          title: "Breach Discovered",
          dateTime: "11:58 PM",
          description: "Officer discovers the empty display pedestal and triggers silent police alarm.",
          relatedSuspects: ["suspect_1", "suspect_2", "suspect_3", "suspect_4"],
          relatedEvidence: ["ev_5"]
        }
      ],
      evidencePlan: [
        { evidenceId: "EV-001", type: "police_report", category: "official_report", title: "Initial Crime Scene Incident Report", description: "Responding detective intake briefing." },
        { evidenceId: "EV-002", type: "message", category: "digital", title: "Encrypted WhatsApp Conversation", description: "Recovered message thread from an unlinked burner SIM." },
        { evidenceId: "EV-003", type: "cctv", category: "visual", title: "West Stairwell Camera 04 Feed", description: "Surveillance snapshot capturing movement during perimeter dispatch." },
        { evidenceId: "EV-004", type: "access_log", category: "digital", title: "Terminal Biometric & Door Access Manifest", description: "Audit logs of electronic keycard swipes." },
        { evidenceId: "EV-005", type: "medical_report", category: "official_report", title: "Forensic Examination Report", description: "Toxicology and trauma analysis on the incapacitated guard." },
        { evidenceId: "EV-006", type: "call_log", category: "digital", title: "Carrier Subpoena: Mobile Call Records", description: "Cellular logs cross-referenced with tower locations." },
        { evidenceId: "EV-007", type: "handwritten_note", category: "physical", title: "Crumpled Memorandum Fragment", description: "Recovered from the lower maintenance locker." }
      ]
    };
  }

  // Fallback for evidence batch
  return [
    {
      evidenceId: "EV-001",
      type: "police_report",
      category: "official_report",
      source: "Metro Police Crime Scene Division",
      title: "Initial Crime Scene Incident Report",
      description: "Official intake dossier compiled by lead responding officer Detective R. Miller.",
      discoveryLocation: "4th Floor Vault Room",
      timestamp: "11:50 PM",
      relatedSuspectIds: ["suspect_1", "suspect_2"],
      content: {
        caseNumber: "CR-2026-8841-A",
        reportingOfficer: "Detective Ray Miller, Badge #904",
        incidentSummary: "At approximately 11:45 PM, units responded to an automated silent alert at the St. Claire Gallery. Perimeter doors were intact; vault heavy door was unlocked via administrative bypass credentials.",
        primaryObservations: [
          "No kinetic forced entry on vault door mechanism; bypass executed with authorized technician passcode.",
          "Exterior garden perimeter sensor tripped at 11:28 PM, luring secondary security guard away.",
          "4-minute diagnostic telemetry freeze occurred between 11:34 PM and 11:38 PM."
        ],
        officerConclusions: "The incident indicates high technical competence and inside knowledge of the firmware architecture.",
        status: "ACTIVE INVESTIGATION"
      }
    },
    {
      evidenceId: "EV-002",
      type: "message",
      category: "digital",
      source: "Subpoenaed Mobile Device Extraction",
      title: "Encrypted WhatsApp Conversation",
      description: "Recovered message thread from an unlinked burner SIM found in the maintenance locker.",
      discoveryLocation: "Maintenance locker B-3",
      timestamp: "10:45 PM",
      relatedSuspectIds: ["suspect_1", "suspect_2"],
      content: {
        sender: "Elena Rostova",
        receiver: "Unknown Contact",
        messages: [
          { sender: "Unknown Contact", text: "Is the patch loaded into the west wing server?", time: "10:42 PM" },
          { sender: "Elena Rostova", text: "Uploaded. The camera loop will run from 11:33 to 11:38. Be ready.", time: "10:45 PM" },
          { sender: "Unknown Contact", text: "Don't leave boot prints this time.", time: "10:46 PM" }
        ]
      }
    },
    {
      evidenceId: "EV-003",
      type: "cctv",
      category: "visual",
      source: "Building Physical Security Video Server",
      title: "West Stairwell Camera 04 Feed",
      description: "Surveillance snapshot capturing suspicious movement during the alarm dispatch.",
      discoveryLocation: "Security Terminal Server 01",
      timestamp: "11:36 PM",
      relatedSuspectIds: ["suspect_2"],
      content: {
        cameraLocation: "West Stairwell - 3rd Floor Landing",
        recordingTime: "11:34 PM - 11:38 PM",
        observations: [
          "Timestamp 11:36:12 - Figure with technician badge and rubber-soled boots traverses stairwell toward vault.",
          "Figure glances up directly into camera, shielding face with a tablet."
        ],
        transcript: "The recording confirms someone used the maintenance stairwell at 11:36 PM while the primary patrol was away inspecting the perimeter."
      }
    },
    {
      evidenceId: "EV-004",
      type: "access_log",
      category: "digital",
      source: "Central Access Control Database",
      title: "Terminal Biometric & Door Access Manifest",
      description: "Electronic keycard swipe audit logs from the 3rd and 4th floors.",
      discoveryLocation: "Security Command Hub",
      timestamp: "11:15 PM - 11:45 PM",
      relatedSuspectIds: ["suspect_2", "suspect_4"],
      content: {
        facility: "St. Claire Gallery - High Security Zone",
        terminalId: "Reader Bank #04 - West Wing",
        logs: [
          { time: "11:10 PM", badgeId: "ID-4091", userName: "Arthur Pendelton", door: "Curator Library Door", status: "GRANTED" },
          { time: "11:29 PM", badgeId: "ID-8824", userName: "Elena Rostova", door: "Basement IT Substation", status: "GRANTED" },
          { time: "11:35 PM", badgeId: "ID-8824", userName: "Elena Rostova", door: "West Stairwell Fire Exit", status: "GRANTED" },
          { time: "11:37 PM", badgeId: "ID-8824", userName: "Elena Rostova", door: "Vault Ante-Chamber Gate", status: "GRANTED" },
          { time: "11:42 PM", badgeId: "ID-1002", userName: "Julian Cross", door: "Main Atrium Turnstile", status: "DENIED" }
        ],
        notes: "Card #8824 (assigned to Elena) was swiped at the Vault Gate precisely during the camera loop."
      }
    },
    {
      evidenceId: "EV-005",
      type: "medical_report",
      category: "official_report",
      source: "Office of the Chief Medical Examiner",
      title: "Forensic Medical Examination Report",
      description: "Toxicology and clinical examination of the security guard found unconscious.",
      discoveryLocation: "Ground Floor Security Booth",
      timestamp: "12:15 AM",
      relatedSuspectIds: ["suspect_2"],
      content: {
        examId: "ME-2026-092",
        examinerName: "Dr. Evelyn Ward, Chief Forensic Toxicologist",
        subjectName: "Officer David Vance (Security Guard)",
        estimatedTimeOfTrauma: "11:30 PM",
        causeOfTraumaOrDeath: "Acute Isoflurane Inhalation / Rapid Sedation",
        externalInjuries: "Minor dermal abrasion on cervical collar; no signs of blunt head trauma.",
        toxicology: "High-concentration aerosolized halogenated anesthetic detected in nasal swab.",
        notes: "Agent delivered via aerosol canister requiring technician-level handling precautions."
      }
    },
    {
      evidenceId: "EV-006",
      type: "call_log",
      category: "digital",
      source: "Apex Cellular Carrier Subpoena",
      title: "Carrier Subpoena: Mobile Call Records",
      description: "Official call detail records (CDR) obtained under emergency court warrant.",
      discoveryLocation: "Apex Telecom Legal Compliance",
      timestamp: "Incident Night (10:00 PM - 12:00 AM)",
      relatedSuspectIds: ["suspect_2", "suspect_3"],
      content: {
        subscriber: "Elena Rostova",
        phoneNumber: "+1 (555) 018-9921",
        carrier: "Apex Telecom Wireless",
        records: [
          { time: "10:15 PM", type: "Outgoing", number: "+1 (555) 014-9900", contact: "Julian Cross", duration: "03m 14s", cellTower: "Tower 12 - West River", flagged: true },
          { time: "11:22 PM", type: "Incoming", number: "+1 (555) 019-0021", contact: "Burner SIM", duration: "00m 45s", cellTower: "Tower 04 - Gallery District", flagged: true },
          { time: "11:48 PM", type: "Outgoing", number: "+1 (555) 018-7711", contact: "Taxi Service", duration: "01m 02s", cellTower: "Tower 04 - Gallery District", flagged: false }
        ]
      }
    },
    {
      evidenceId: "EV-007",
      type: "handwritten_note",
      category: "physical",
      source: "Scene Recovery Processing Unit",
      title: "Crumpled Memorandum Fragment",
      description: "Recovered from the lower maintenance trash receptacle behind Terminal #02.",
      discoveryLocation: "Maintenance Waste Receptacle B-2",
      timestamp: "Incident Night",
      relatedSuspectIds: ["suspect_2"],
      content: {
        discoveryPlace: "Lower maintenance trash receptacle, crumpled inside a blue surgical glove box.",
        handwritingAnalysis: "Fast right-slanting cursive script matching Elena Rostova's personnel file signatures.",
        transcription: "Override code: 9942-FIRM. Remember to scrub buffer logs from Server 2 before morning shift arrives.",
      }
    }
  ];
};
