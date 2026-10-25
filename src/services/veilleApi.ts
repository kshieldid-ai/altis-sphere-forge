/**
 * Client HTTP de la veille technologique (backend Django, app « veille »).
 *
 * Le backend agrège des flux RSS de médias IT et les rafraîchit toutes
 * les heures. L'URL vient de VITE_VEILLE_API_URL ; sans elle, la section
 * « Tendances tech » du blog n'est simplement pas affichée.
 */
const BASE_URL = ((import.meta.env.VITE_VEILLE_API_URL as string | undefined) ?? "").replace(/\/$/, "");

/** Délai au-delà duquel on abandonne (ms). */
const REQUEST_TIMEOUT = 10_000;

export type TechArticle = {
  title: string;
  link: string;
  summary: string;
  source: string;
  category: string;
  published: string | null;
};

export const isVeilleApiEnabled = BASE_URL !== "";

const isHttpUrl = (value: string) => /^https?:\/\//i.test(value);

async function getArticles(signal?: AbortSignal): Promise<TechArticle[]> {
  if (!isVeilleApiEnabled) return [];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  signal?.addEventListener("abort", () => controller.abort(), { once: true });

  try {
    const response = await fetch(`${BASE_URL}/`, { signal: controller.signal });
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    const data = (await response.json()) as { articles: TechArticle[] };
    return data.articles.filter((article) => isHttpUrl(article.link));
  } finally {
    clearTimeout(timer);
  }
}

export const veilleApi = { getArticles };
