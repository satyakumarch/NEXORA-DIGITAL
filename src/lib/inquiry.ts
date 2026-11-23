import { z } from "zod";
export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid business email."),
  company: z.string().trim().min(2, "Please enter your company name.").max(160),
  country: z.string().trim().min(2, "Please enter your country.").max(80),
  service: z.string().min(1, "Please select a service."),
  budget: z.string().min(1, "Please select a budget."),
  description: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters.")
    .max(5000),
});
export type Inquiry = z.infer<typeof inquirySchema>;
export function canSubmitInquiry(endpoint: string) {
  return /^https:\/\//.test(endpoint);
}
