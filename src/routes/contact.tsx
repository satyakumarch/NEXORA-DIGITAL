import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ContactPage } from "@/components/contact-page";
import { pageHead } from "@/lib/seo";
const searchSchema = z.object({
  service: z.string().optional().catch(""),
  plan: z.enum(["Starter", "Growth", "Premium"]).optional().catch(undefined),
});
export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () =>
    pageHead(
      "Contact Nexora Digital — Start a Project",
      "Discuss your website, marketing, branding or automation project with Nexora Digital. Contact us by email or WhatsApp, or prepare a project inquiry.",
    ),
  component: Contact,
});
function Contact() {
  const search = Route.useSearch();
  return <ContactPage selectedService={search.service ?? ""} selectedPlan={search.plan ?? ""} />;
}
