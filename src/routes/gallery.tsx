import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ProjectCard, CTA } from "@/components/page-parts";
import { projects } from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => pageHead("Design & Photo Gallery", "Explore Nexora Digital’s original sample website and branding concepts for education, hospitality, real estate and retail."),
  component: Gallery,
});

function Gallery() {
  return <>
    <PageHero eyebrow="Photo gallery" title="Ideas worth a closer look." description="Original website and branding samples, not commissioned client work." />
    <section className="section"><div className="container project-grid">
      {projects.filter((project) => project.image).map((project) => <ProjectCard key={project.slug} project={project} />)}
    </div></section>
    <CTA />
  </>;
}