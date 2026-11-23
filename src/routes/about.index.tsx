import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/content-pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/about/")({
  head: () =>
    pageHead(
      "About Our Nepal-Based Digital Growth Agency",
      "Meet Nexora Digital: a growing Nepal-based agency with an international outlook, thoughtful design and honest digital growth partnerships.",
    ),
  component: AboutPage,
});
