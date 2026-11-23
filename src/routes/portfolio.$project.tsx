import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectPage } from "@/components/content-pages";
import { projects } from "@/lib/content";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/portfolio/$project")({
  loader: ({ params }) => {
    const item = projects.find((x) => x.slug === params.project);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData ? loaderData.name : "Unavailable Project",
      loaderData ? loaderData.objective : "This content could not be found.",
    ),
  component: Detail,
});
function Detail() {
  const { project } = Route.useParams();
  return <ProjectPage slug={project} />;
}
