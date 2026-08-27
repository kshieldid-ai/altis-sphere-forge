import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/site";
import altisLogo from "@/assets/altis-logo.png";

// altisLogo est un chemin relatif genere par Vite ("/assets/altis-logo-<hash>.png").
// Les crawlers Open Graph exigent une URL absolue.
const DEFAULT_IMAGE = `${SITE_URL}${altisLogo}`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const Seo = ({ title, description, path, type = "website", image, jsonLd, noindex = false }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const img = image ?? DEFAULT_IMAGE;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang="fr" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}
      {!noindex && <link rel="canonical" href={url} />}
      <meta property="og:site_name" content="ALTIS SPHERE GROUP" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
