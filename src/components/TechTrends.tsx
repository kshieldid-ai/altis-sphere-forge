import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { veilleApi, isVeilleApiEnabled, type TechArticle } from "@/services/veilleApi";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const ALL = "Tout";

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" });
const relativeFormat = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });

/** « il y a 3 heures » le jour même, sinon « 23 octobre ». */
const formatDate = (iso: string | null) => {
  if (!iso) return "";
  const date = new Date(iso);
  const hours = Math.round((date.getTime() - Date.now()) / 3_600_000);
  if (hours > -24) return hours === 0 ? "à l'instant" : relativeFormat.format(hours, "hour");
  return dateFormat.format(date);
};

const ArticleCard = ({ article }: { article: TechArticle }) => (
  <article className="flex h-full flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_hsl(var(--navy)/0.25)]">
    <p className="text-sm text-muted-foreground">
      <span className="font-bold text-primary">{article.category}</span>
      {article.published ? (
        <>
          <span aria-hidden="true"> · </span>
          <time dateTime={article.published}>{formatDate(article.published)}</time>
        </>
      ) : null}
    </p>
    <h3 className="mt-2 text-lg font-bold leading-snug">
      <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
        {article.title}
      </a>
    </h3>
    {article.summary ? (
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">{article.summary}</p>
    ) : (
      <div className="flex-1" />
    )}
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
      aria-label={`Lire sur ${article.source} : ${article.title}`}
    >
      Lire sur {article.source} <ExternalLink size={14} />
    </a>
  </article>
);

/** Veille technologique : actualités IT récupérées automatiquement par le backend. */
const TechTrends = () => {
  const [category, setCategory] = useState(ALL);
  const { data: articles = [], isPending, isError } = useQuery({
    queryKey: ["veille"],
    queryFn: ({ signal }) => veilleApi.getArticles(signal),
    enabled: isVeilleApiEnabled,
    retry: 1,
    staleTime: 15 * 60_000,
  });

  // Section masquée si l'API n'est pas configurée ou ne répond pas
  if (!isVeilleApiEnabled || isError || (!isPending && articles.length === 0)) return null;

  const categories = [ALL, ...new Set(articles.map((article) => article.category))];
  const visible = category === ALL ? articles : articles.filter((article) => article.category === category);

  return (
    <section aria-labelledby="tendances-tech" className="border-t bg-muted/40 py-20 lg:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <h2 id="tendances-tech" className="text-3xl font-bold tracking-[-0.02em]">Tendances tech</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Les dernières actualités de l'informatique, de la cybersécurité et du cloud, reprises automatiquement
            de médias spécialisés et mises à jour toutes les heures.
          </p>
        </div>

        {!isPending && categories.length > 2 ? (
          <div role="group" aria-label="Filtrer par thème" className="mt-8 flex flex-wrap gap-2">
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(name)}
                aria-pressed={category === name}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-bold transition-colors",
                  category === name ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary hover:text-primary",
                )}
              >
                {name}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy={isPending}>
          {isPending
            ? Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-56 rounded-2xl" />)
            : visible.map((article) => <ArticleCard key={article.link} article={article} />)}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Sources : {[...new Set(articles.map((article) => article.source))].join(", ")}. Chaque article reste la propriété de son éditeur.
        </p>
      </div>
    </section>
  );
};

export default TechTrends;
