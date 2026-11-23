import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/content-pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead(
      "Websites, Marketing, SEO & AI Automation Services",
      "Explore website development, social media marketing, branding, SEO, Google Ads management and AI automation from Nexora Digital.",
    ),
  component: ServicesPage,
});
