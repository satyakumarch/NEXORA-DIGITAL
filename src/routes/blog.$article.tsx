import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticlePage } from "@/components/content-pages";
import { articles } from "@/lib/content";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/blog/$article")({
  loader: ({ params }) => {
    const item = articles.find((x) => x.slug === params.article);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData ? loaderData.title : "Unavailable Article",
      loaderData ? loaderData.excerpt : "This content could not be found.",
    ),
  component: Detail,
});
function Detail() {
  const { article } = Route.useParams();
  return <ArticlePage slug={article} />;
}
