import { Helmet } from "react-helmet-async";

const SITE_URL = "https://altis-sphere-forge.lovable.app";
const DEFAULT_IMAGE = `${SITE_URL}/__l5e/assets-v1/1aa74791-2c99-4c87-8748-188c99cd2981/altis-logo-2026.png`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const Seo = ({ title, description, path, type = "website", image, jsonLd }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const img = image ?? DEFAULT_IMAGE;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={img} />
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
