import { createFileRoute } from "@tanstack/react-router";
import { PricingPage } from "@/components/content-pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/pricing/")({
  head: () =>
    pageHead(
      "Flexible Website & Digital Marketing Pricing",
      "Compare Starter, Growth and Premium starting packages and request a custom quotation for your digital project.",
    ),
  component: PricingPage,
});
