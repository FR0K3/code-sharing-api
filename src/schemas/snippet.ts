import { z } from "zod";

export const createSnippetSchema = z.object({
  code: z.string().min(1, "Code cannot be empty").max(100_000),
  language: z.string().min(1).default("plaintext"),
  theme: z.string().min(1).default("vs-dark"),
});

export const idParamSchema = z.object({ id: z.string().length(21) });

export type CreateSnippetInput = z.infer<typeof createSnippetSchema>;