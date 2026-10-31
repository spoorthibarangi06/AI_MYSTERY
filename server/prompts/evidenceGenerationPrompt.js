export const getEvidenceGenerationPrompt = ({ blueprint, evidencePlanItem }) => {
  return `You are a master forensic detective and investigative scenario writer.

We have an established mystery case blueprint:
- Case Title: "${blueprint.title}"
- Summary: "${blueprint.story}"
- Scene Location: "${blueprint.location}"
- Incident Date: "${blueprint.incidentDate}"
- Hidden Culprit: "${blueprint.solution.culpritSuspectId}"
- Suspects List:
${blueprint.suspects.map((s) => `  * ${s.suspectId}: ${s.name} (${s.occupation}) - Alibi: "${s.alibi}", Motive: "${s.motive}"`).join('\n')}

EVIDENCE ITEM TO EXPAND:
- ID: "${evidencePlanItem.evidenceId}"
- Type: "${evidencePlanItem.type}"
- Title: "${evidencePlanItem.title}"
- Description: "${evidencePlanItem.description}"

TASK:
Generate the detailed investigative content for this evidence item.
It must fit seamlessly into the overall puzzle. Clues must logically tie into the timeline and suspect alibis without being blindly obvious. All characters mentioned must be from the suspects list or realistic background figures (police, receptionist, etc.).

Return ONLY a valid JSON object matching this schema:
{
  "evidenceId": "${evidencePlanItem.evidenceId}",
  "type": "${evidencePlanItem.type}",
  "title": "${evidencePlanItem.title}",
  "description": "Comprehensive investigative analysis and forensic note explaining how this was retrieved.",
  "discoveryLocation": "Specific room, phone device, corridor, or file cabinet where found",
  "timestamp": "Timestamp matching the timeline (e.g. 10:42 PM)",
  "relatedSuspectIds": ["suspect_1"],
  "content": {
    // If type === 'message':
    // "sender": "Character Name",
    // "receiver": "Character Name",
    // "messages": [
    //    { "sender": "Name", "text": "...", "time": "10:35 PM" }
    // ]
    //
    // If type === 'cctv':
    // "cameraLocation": "Corridor West Wing - Cam 3",
    // "recordingTime": "11:15 PM - 11:22 PM",
    // "observations": ["Point 1...", "Point 2..."],
    // "transcript": "Detailed visual surveillance description of footage..."
    //
    // If type === 'witness_statement':
    // "witnessName": "Name",
    // "interviewTime": "1:00 AM",
    // "statement": "Direct quote testimony of the witness..."
    //
    // If type === 'physical_evidence' or 'document' or 'image':
    // "details": "Forensic laboratory notes, markings, serial numbers, fingerprint impressions, or document text...",
    // "imagePrompt": "A highly atmospheric, realistic cinematic photo description of this clue for visual generation"
  }
}`;
};

export const getBatchEvidenceGenerationPrompt = ({ blueprint }) => {
  return `You are a master forensic detective and investigative scenario writer.

CASE BLUEPRINT:
- Title: "${blueprint.title}"
- Story: "${blueprint.story}"
- Scene Location: "${blueprint.location}"
- Incident Date: "${blueprint.incidentDate}"
- Hidden Culprit: "${blueprint.solution.culpritSuspectId}"
- Solution Overview: "${blueprint.solution.explanation}"
- Suspects:
${blueprint.suspects.map((s) => `  * ${s.suspectId}: ${s.name} (${s.occupation}) - Alibi: "${s.alibi}", Motive: "${s.motive}"`).join('\n')}

EVIDENCE PLAN:
${JSON.stringify(blueprint.evidencePlan || [], null, 2)}

TASK:
Generate the full collection of evidence items for this investigation.
Ensure there is a rich mix:
1. At least one WhatsApp-style message chat ('message') showing suspicious interactions.
2. At least one CCTV surveillance record ('cctv') with timestamped footage analysis.
3. At least one Witness Statement ('witness_statement') with nuanced testimony.
4. Physical evidence / document items ('physical_evidence', 'document', 'image') with forensic notes.

Return ONLY a valid JSON array of evidence items matching this structure:
[
  {
    "evidenceId": "ev_1",
    "type": "message",
    "title": "Encrypted WhatsApp Chat",
    "description": "Exported message history retrieved from the victim's phone.",
    "discoveryLocation": "Victim's mobile device",
    "timestamp": "10:20 PM",
    "relatedSuspectIds": ["suspect_1", "suspect_2"],
    "content": {
      "sender": "Suspect One",
      "receiver": "Suspect Two",
      "messages": [
        { "sender": "Suspect One", "text": "Are we still doing this tonight?", "time": "10:14 PM" },
        { "sender": "Suspect Two", "text": "Wait until the guard takes his break at 10:30.", "time": "10:17 PM" }
      ]
    }
  },
  {
    "evidenceId": "ev_2",
    "type": "cctv",
    "title": "East Corridor Camera 04",
    "description": "Surveillance log from the corridor leading to the private office.",
    "discoveryLocation": "Security Control Room Server",
    "timestamp": "10:32 PM",
    "relatedSuspectIds": ["suspect_1"],
    "content": {
      "cameraLocation": "East Corridor Camera 04",
      "recordingTime": "10:30 PM - 10:35 PM",
      "observations": [
        "A figure wearing a navy trench coat enters frame at 10:32 PM.",
        "The figure avoids the primary light sensor."
      ],
      "transcript": "Surveillance shows a silhouette entering through the service stairs at 10:32 PM..."
    }
  },
  {
    "evidenceId": "ev_3",
    "type": "witness_statement",
    "title": "Security Guard Official Statement",
    "description": "Interview recorded on-scene by the lead detective.",
    "discoveryLocation": "Ground Floor Reception",
    "timestamp": "11:50 PM",
    "relatedSuspectIds": ["suspect_2"],
    "content": {
      "witnessName": "Officer Marcus Vance",
      "interviewTime": "11:50 PM",
      "statement": "I checked the logbook around 10:15 PM. Everything seemed quiet, but I noticed the rear exit door was unlatched when I returned from my patrol."
    }
  },
  {
    "evidenceId": "ev_4",
    "type": "document",
    "title": "Discrepancy Audit Sheet",
    "description": "Found hidden inside the safe behind the oil painting.",
    "discoveryLocation": "Private Office Safe",
    "timestamp": "Incident Night",
    "relatedSuspectIds": ["suspect_1"],
    "content": {
      "details": "Audit records indicating an unauthorized wire transfer of $240,000 scheduled for release at midnight.",
      "imagePrompt": "A vintage desk with an illuminated ledger sheet showing stamped confidential seals and red ink corrections."
    }
  },
  {
    "evidenceId": "ev_5",
    "type": "image",
    "title": "Broken Latch on Service Door",
    "description": "Forensic close-up photograph of the emergency staircase entrance.",
    "discoveryLocation": "Rear Emergency Exit",
    "timestamp": "11:10 PM",
    "relatedSuspectIds": ["suspect_1"],
    "content": {
      "details": "Scratch marks on the deadbolt suggest forced entry or improper key use from someone unfamiliar with the newly installed lock.",
      "imagePrompt": "Close up photo of a metallic heavy door latch with scratch marks illuminated by flashlight in a dark corridor."
    }
  }
]`;
};
