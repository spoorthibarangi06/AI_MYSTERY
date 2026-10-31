export const getBatchEvidenceGenerationPrompt = ({ blueprint }) => {
  return `You are a master forensic detective, intelligence analyst, and investigative document specialist.

CASE BLUEPRINT:
- Title: "${blueprint.title}"
- Story: "${blueprint.story}"
- Scene Location: "${blueprint.location}"
- Incident Date: "${blueprint.incidentDate}"
- Hidden Culprit: "${blueprint.solution.culpritSuspectId}"
- Solution Overview: "${blueprint.solution.explanation}"
- Key Deductive Clues: ${JSON.stringify(blueprint.solution.evidenceReasoning || [])}
- Suspects:
${blueprint.suspects.map((s) => `  * ${s.suspectId}: ${s.name} (${s.occupation}) - Alibi: "${s.alibi}", Motive: "${s.motive}"`).join('\n')}

EVIDENCE PLAN FROM BLUEPRINT:
${JSON.stringify(blueprint.evidencePlan || [], null, 2)}

TASK:
Generate a realistic, immersive collection of investigative evidence files for this case.
Match the types requested in the evidence plan or select 5 to 7 varied, authentic formats relevant to the crime.

ALLOWED EVIDENCE TYPES & STRUCTURES:

1. 'police_report':
   category: "official_report"
   source: "Department of Forensic Services / Precinct Special Unit"
   content: {
     "caseNumber": "PD-2026-9041",
     "reportingOfficer": "Detective Marcus Cole, Badge #412",
     "incidentSummary": "Official narrative of initial response and scene securing...",
     "primaryObservations": [
       "No forced entry at the front entrance.",
       "Rear perimeter motion sensor tripped at 11:28 PM."
     ],
     "officerConclusions": "Preliminary assessment indicating premeditated insider access.",
     "status": "ACTIVE INVESTIGATION"
   }

2. 'medical_report':
   category: "official_report"
   source: "Office of the Chief Medical Examiner / Forensic Pathology"
   content: {
     "examId": "ME-8834-A",
     "examinerName": "Dr. Aris Thorne, Lead Forensic Pathologist",
     "subjectName": "Victim / Patient Name",
     "estimatedTimeOfTrauma": "11:30 PM - 11:45 PM",
     "causeOfTraumaOrDeath": "Blunt force trauma / Sedative toxicity / etc.",
     "externalInjuries": "Bruising pattern consistent with rubber-gripped tool...",
     "toxicology": "Trace elements of neuromuscular blocking agent...",
     "notes": "Corroborates the timeline of rapid incapacitation."
   }

3. 'message' (WhatsApp / Encrypted Chat):
   category: "digital"
   source: "Subpoenaed Mobile Device Extraction"
   content: {
     "sender": "Suspect Name",
     "receiver": "Contact Name",
     "messages": [
       { "sender": "Name 1", "text": "Are the security cameras still cycling?", "time": "10:14 PM" },
       { "sender": "Name 2", "text": "Yes, but be swift. The patrol returns in ten minutes.", "time": "10:17 PM" }
     ]
   }

4. 'cctv':
   category: "visual"
   source: "Security Video Management Server"
   content: {
     "cameraLocation": "Corridor West Wing - Cam 04",
     "recordingTime": "11:34 PM - 11:38 PM",
     "observations": [
       "Figure wearing dark outerwear enters frame avoiding overhead light sensor.",
       "Individual uses digital keycard on secure door."
     ],
     "transcript": "Surveillance capture directly contradicts the suspect's stated alibi of being off-premises."
   }

5. 'witness_statement':
   category: "witness_statement"
   source: "Formal Deposition Division"
   content: {
     "witnessName": "Witness Full Name",
     "witnessRole": "Security Guard / Night Custodian / Receptionist",
     "interviewTime": "1:15 AM",
     "investigator": "Detective Sarah Vance",
     "statement": "Narrative testimony from the witness detailing what they saw or heard...",
     "discrepancies": "Noted hesitation when asked about the master passkey."
   }

6. 'email':
   category: "digital"
   source: "Corporate Exchange Server Archive"
   content: {
     "from": "executive@corporation.com",
     "to": "partner@privateclient.org",
     "cc": "audit@consultancy.com",
     "subject": "Confidential: Urgency regarding the pending audit discrepancy",
     "date": "Incident Day, 4:45 PM",
     "body": "Detailed email text revealing hidden conflict, secret demands, or covert meeting requests...",
     "attachments": ["Q3_Financial_Deficit.pdf", "Encrypted_Key.bin"]
   }

7. 'call_log':
   category: "digital"
   source: "Cellular Carrier Warrant Record"
   content: {
     "subscriber": "Suspect Full Name",
     "phoneNumber": "+1 (555) 019-8432",
     "carrier": "Apex Telecom",
     "records": [
       { "time": "10:12 PM", "type": "Incoming", "number": "+1 (555) 014-2289", "contact": "Unknown Burner", "duration": "01m 45s", "cellTower": "Tower 4B - Downtown", "flagged": true },
       { "time": "11:05 PM", "type": "Outgoing", "number": "+1 (555) 019-3310", "contact": "Alibi Witness", "duration": "00m 12s", "cellTower": "Tower 7A - Museum District", "flagged": false }
     ]
   }

8. 'financial_record':
   category: "physical"
   source: "Forensic Financial Intelligence Unit"
   content: {
     "institution": "Zurich Heritage Bank",
     "accountName": "Suspect or Shell Entity",
     "accountNumber": "CH93-****-****-4912",
     "transactions": [
       { "date": "Incident Week", "description": "Offshore Wire - Cayman Trust", "type": "Credit", "amount": "$150,000.00", "balance": "$182,450.00", "flagged": true },
       { "date": "Incident Day", "description": "Cash Withdrawal - ATM 08", "type": "Debit", "amount": "$5,000.00", "balance": "$177,450.00", "flagged": false }
     ],
     "forensicNotes": "Massive unexplained influx immediately prior to the incident."
   }

9. 'access_log':
   category: "digital"
   source: "Building Physical Security Database"
   content: {
     "facility": "St. Claire Executive Suites & Vault",
     "terminalId": "Reader #07 - Vault Ante-Room",
     "logs": [
       { "time": "10:45 PM", "badgeId": "ID-0922", "userName": "Suspect One", "door": "Lower Atrium Door", "status": "GRANTED" },
       { "time": "11:32 PM", "badgeId": "ID-0418", "userName": "Suspect Two", "door": "Secure Archive Entry", "status": "GRANTED" },
       { "time": "11:36 PM", "badgeId": "ID-0418", "userName": "Suspect Two", "door": "Emergency Fire Exit", "status": "DENIED" }
     ],
     "notes": "Electronic footprint pinpoints location at the exact minute of the incident."
   }

10. 'handwritten_note':
    category: "physical"
    source: "Crime Scene Recovery Unit"
    content: {
      "discoveryPlace": "Found crumpled in the executive wastebasket",
      "handwritingAnalysis": "Hastily written cursive script, high pressure strokes indicating agitation.",
      "transcription": "The audit is scheduled for tomorrow morning. Move the asset tonight or everything we built is finished.",
      "paperType": "Monogrammed hotel letterhead"
    }

11. 'photo' or 'physical_evidence':
    category: "visual" or "physical"
    source: "Mobile Crime Laboratory"
    content: {
      "details": "Forensic close-up examination of physical item, scratched deadbolt, chemical residue, or footprint.",
      "imagePrompt": "Cinematic high-contrast photograph of evidence marked with yellow evidence tent #03."
    }

OUTPUT REQUIREMENTS:
- Return ONLY a valid JSON array of evidence objects.
- Each evidence item must have:
  "evidenceId": "EV-001", "EV-002", etc.
  "type": one of the allowed types above
  "category": "digital" | "visual" | "official_report" | "witness_statement" | "physical"
  "title": descriptive title
  "source": realistic investigative department / subpoena origin
  "description": 1-2 sentences of investigative context
  "discoveryLocation": specific location
  "timestamp": matching the timeline
  "relatedSuspectIds": ["suspect_1", ...]
  "content": { ...type-specific content as detailed above... }
`;
};
