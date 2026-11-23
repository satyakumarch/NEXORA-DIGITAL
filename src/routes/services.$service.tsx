import { createFileRoute, notFound } from "@tanstack/react-router";
import { ServicePage } from "@/components/content-pages";
import { services } from "@/lib/content";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/services/$service")({
  loader: ({ params }) => {
    const item = services.find((x) => x.slug === params.service);
    if (!item) throw notFound();
    return { title: item.title, description: item.description };
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData ? loaderData.title : "Unavailable Service",
      loaderData ? loaderData.description : "This content could not be found.",
    ),
  component: Detail,
});
function Detail() {
  const { service } = Route.useParams();
  return <ServicePage slug={service} />;
}
