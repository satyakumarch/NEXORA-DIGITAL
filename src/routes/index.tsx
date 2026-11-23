import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "Digital Marketing & Website Development Agency Nepal",
      "Nexora Digital builds websites, marketing strategies, brands and AI automation for ambitious businesses in Nepal and around the world.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Nexora Digital",
          slogan: "We Build. We Market. We Automate.",
          email: "satyaku246@gmail.com",
          description: "A growing Nepal-based digital growth agency with an international outlook.",
          areaServed: ["Nepal", "Worldwide"],
        }),
      },
    ],
  }),
  component: HomePage,
});
