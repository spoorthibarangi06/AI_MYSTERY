export const getEvaluationPrompt = ({ solution, selectedSuspect, userReasoning, suspects }) => {
  const isCorrect = solution.culpritSuspectId === selectedSuspect.suspectId;
  return `You are the Chief Detective and forensic evaluation specialist for the Mystery Room.

CASE GROUND TRUTH:
- True Culprit ID: "${solution.culpritSuspectId}"
- Actual Motive: "${solution.actualMotive}"
- Method: "${solution.method}"
- Opportunity: "${solution.opportunity}"
- Solution Narrative: "${solution.explanation}"
- Key Evidence Clues: ${JSON.stringify(solution.evidenceReasoning)}

USER ACCUSATION:
- Accused Suspect ID: "${selectedSuspect.suspectId}"
- Accused Suspect Name: "${selectedSuspect.name}"
- Suspect Occupation: "${selectedSuspect.occupation}"
- User's Deductive Reasoning: "${userReasoning || 'No additional reasoning provided.'}"
- Result: ${isCorrect ? 'CORRECT' : 'INCORRECT'}

TASK:
Provide an expert detective evaluation of the user's accusation.
- If CORRECT: Commend the user's deductive skill, analyze how their reasoning aligned with the clues, and reinforce the airtight logical chain that convicted the culprit.
- If INCORRECT: Respectfully deconstruct why the accused was a plausible red herring, highlight what clue the user overlooked (e.g., conflicting timestamps, forged alibi, or hidden motive), and reveal how the true culprit actually committed the act without inventing new facts.

Return ONLY a valid JSON object:
{
  "isCorrect": ${isCorrect},
  "summary": "${isCorrect ? 'Case Solved! Your deduction uncovered the culprit.' : 'Case Closed. The evidence points to another suspect.'}",
  "detailedFeedback": "2-3 paragraphs of immersive detective debriefing evaluating the user's hypothesis against the forensic evidence.",
  "keyOverlookedOrConnectedClues": [
    "Clue 1 breakdown...",
    "Clue 2 breakdown..."
  ]
}`;
};
