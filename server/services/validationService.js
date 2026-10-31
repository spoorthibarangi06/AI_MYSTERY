import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createMysterySchema = z.object({
  title: z.string().optional(),
  prompt: z
    .string()
    .min(30, 'Scenario must be at least 30 characters')
    .max(2000, 'Scenario cannot exceed 2000 characters'),
  category: z.enum([
    'Murder Mystery',
    'Theft',
    'Missing Person',
    'Cybercrime',
    'Corporate Espionage',
    'Hidden Identity',
    'General Mystery',
  ]).default('General Mystery'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).default('Medium'),
  suspectCount: z.number().int().min(3).max(6).default(4),
});

export const accusationSchema = z.object({
  selectedSuspectId: z.string().min(1, 'Please select a suspect'),
  reasoning: z.string().optional(),
});

export const blueprintZodSchema = z.object({
  title: z.string().min(3),
  story: z.string().min(20),
  location: z.string().min(2),
  incidentDate: z.string().min(3),
  suspects: z
    .array(
      z.object({
        suspectId: z.string(),
        name: z.string(),
        age: z.number().optional().default(35),
        occupation: z.string().default('Unknown'),
        background: z.string(),
        motive: z.string(),
        alibi: z.string(),
        publicDetails: z.string().optional().default(''),
      })
    )
    .min(3),
  solution: z.object({
    culpritSuspectId: z.string(),
    actualMotive: z.string(),
    method: z.string(),
    opportunity: z.string(),
    explanation: z.string(),
    evidenceReasoning: z.array(z.string()).default([]),
  }),
  timeline: z
    .array(
      z.object({
        eventId: z.string(),
        title: z.string(),
        dateTime: z.string(),
        description: z.string(),
        relatedSuspects: z.array(z.string()).optional().default([]),
        relatedEvidence: z.array(z.string()).optional().default([]),
      })
    )
    .default([]),
  evidencePlan: z
    .array(
      z.object({
        evidenceId: z.string(),
        type: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .optional()
    .default([]),
});

export const validateBlueprint = (blueprint, expectedSuspectCount) => {
  const parsed = blueprintZodSchema.safeParse(blueprint);
  if (!parsed.success) {
    return { valid: false, errors: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`) };
  }

  const data = parsed.data;
  const suspectIds = new Set(data.suspects.map((s) => s.suspectId));

  // 1. Check unique suspect IDs
  if (suspectIds.size !== data.suspects.length) {
    return { valid: false, errors: ['Suspect IDs must be unique'] };
  }

  // 2. Check culprit matches one of the suspects
  if (!suspectIds.has(data.solution.culpritSuspectId)) {
    return {
      valid: false,
      errors: [
        `Culprit ID "${data.solution.culpritSuspectId}" does not match any suspect (${Array.from(suspectIds).join(', ')})`,
      ],
    };
  }

  // 3. Check suspect count matches if strict
  if (expectedSuspectCount && data.suspects.length !== expectedSuspectCount) {
    // Tolerant if within 1, but note in warnings
    console.warn(`[Validation Warning] Suspect count expected ${expectedSuspectCount}, received ${data.suspects.length}`);
  }

  return { valid: true, data };
};
