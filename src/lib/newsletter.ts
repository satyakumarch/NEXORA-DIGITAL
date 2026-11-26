import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254),
  consent: z.literal(true, { error: "Please agree to receive newsletter emails." }),
});