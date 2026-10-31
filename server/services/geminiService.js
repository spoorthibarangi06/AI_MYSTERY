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
        { evidenceId: "ev_1", type: "message", title: "Encrypted Telegram Conversation", description: "Chat retrieved from suspect's phone." },
        { evidenceId: "ev_2", type: "cctv", title: "Corridor Camera 04 Feed", description: "Stairwell footage recorded at 11:36 PM." },
        { evidenceId: "ev_3", type: "witness_statement", title: "Patrol Guard Statement", description: "Deposition regarding the false garden alarm." },
        { evidenceId: "ev_4", type: "document", title: "Security Firmware Log", description: "Audit trail of camera sensor overrides." },
        { evidenceId: "ev_5", type: "image", title: "Pry Markings on Master Junction", description: "Forensic photo of the electrical fuse panel." }
      ]
    };
  }

  // Fallback for evidence batch
  return [
    {
      evidenceId: "ev_1",
      type: "message",
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
      evidenceId: "ev_2",
      type: "cctv",
      title: "West Stairwell Camera 04",
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
      evidenceId: "ev_3",
      type: "witness_statement",
      title: "Officer Vance Witness Interview",
      description: "Official statement taken 40 minutes post-incident by Detective Miller.",
      discoveryLocation: "Security Station Desk",
      timestamp: "Incident Night",
      relatedSuspectIds: ["suspect_2", "suspect_4"],
      content: {
        witnessName: "Officer David Vance",
        interviewTime: "12:20 AM",
        statement: "At exactly 11:28 PM, the terminal sounded an intrusion alert from the rear rose garden. Elena told me she would monitor the main bank while I went outside. When I got to the garden, a wire was cut on purpose to trip the circuit. By the time I walked back inside, Elena claimed everything had been quiet."
      }
    },
    {
      evidenceId: "ev_4",
      type: "document",
      title: "Firmware Maintenance Audit Log",
      description: "System kernel dump showing timestamps of administrative terminal logins.",
      discoveryLocation: "IT Control Hub",
      timestamp: "11:15 PM",
      relatedSuspectIds: ["suspect_2"],
      content: {
        details: "Kernel Log #8824: Terminal #02 (Basement) initiated an administrative override at 11:31:04 PM. Firmware hotfix 'SecLoop-v4' applied under credential 'E_ROSTOVA_SEC'. 4-minute telemetry pause authorized.",
        imagePrompt: "Terminal screen showing glowing green code matrix with highlighted security bypass authorization."
      }
    },
    {
      evidenceId: "ev_5",
      type: "physical_evidence",
      title: "Damp Muddy Boot Impression",
      description: "High-contrast forensic cast taken from the marble threshold just outside the vault entrance.",
      discoveryLocation: "Vault Entrance Threshold",
      timestamp: "11:55 PM",
      relatedSuspectIds: ["suspect_2"],
      content: {
        details: "Tread analysis matches specialized tactical combat footwear size 38 EU, containing trace elements of peat moss consistent with the gallery's exterior rose garden.",
        imagePrompt: "Forensic yellow evidence marker next to a crisp muddy boot print on polished dark marble floor."
      }
    }
  ];
};
