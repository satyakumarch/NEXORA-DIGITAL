import { createFileRoute } from "@tanstack/react-router";
import { BlogPage } from "@/components/content-pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead(
      "Practical Digital Marketing & Technology Insights",
      "Original articles on website development, digital marketing, SEO, AI automation and business growth from Nexora Digital.",
    ),
  component: BlogPage,
});
