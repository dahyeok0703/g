import { z } from 'zod';

// Schema for Claude's curation output (spec §6.3). The model is instructed to
// return JSON only; we validate it here and fall back to the rule engine on
// any parse/validation failure.

const hex = z
  .string()
  .regex(/^#[0-9a-fA-F]{3,8}$/, 'expected hex color');

export const aiLookSchema = z.object({
  mood: z.string().min(1).max(40),
  items: z
    .object({
      outer: z.string().optional(),
      top: z.string().optional(),
      bottom: z.string().optional(),
      shoes: z.string().optional(),
      accent: z.string().optional(),
    })
    .partial(),
  palette: z.object({ base: hex, sub: hex, accent: hex }),
  reason: z.string().min(1).max(400),
  tip: z.string().min(1).max(200),
  imageQueries: z
    .object({
      outer: z.string().optional(),
      top: z.string().optional(),
      bottom: z.string().optional(),
      shoes: z.string().optional(),
      accent: z.string().optional(),
    })
    .partial()
    .optional(),
});

export const aiResponseSchema = z.object({
  looks: z.array(aiLookSchema).min(1).max(3),
});

export type AiLook = z.infer<typeof aiLookSchema>;
export type AiResponse = z.infer<typeof aiResponseSchema>;
