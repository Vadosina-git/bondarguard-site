import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Имя слишком короткое").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/, "Некорректный формат телефона"),
  consent: z.union([z.literal("on"), z.literal(true), z.boolean()]).refine((v) => v === "on" || v === true, {
    message: "Нужно согласие на обработку данных",
  }),
  source: z.string().optional(),
  website: z.string().max(0, "bot").optional(), // honeypot
});

export type LeadInput = z.infer<typeof leadSchema>;
