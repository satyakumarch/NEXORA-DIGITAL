import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/content-pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/portfolio/")({
  head: () =>
    pageHead(
      "Original Website, Branding & Automation Concepts",
      "Explore clearly labeled sample concepts for education, restaurants, real estate, e-commerce and AI customer support.",
    ),
  component: PortfolioPage,
});
