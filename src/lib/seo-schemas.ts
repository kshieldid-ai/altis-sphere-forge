import { SITE_URL, ORG_ID, SITE_ID } from "@/lib/site";

export { SITE_URL, ORG_ID };

/** Fil d'Ariane structure : Accueil > Page courante */
export const breadcrumb = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
  ],
});

/** Schema de page generique rattache a l'organisation */
export const webPage = (name: string, path: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name,
  description,
  url: `${SITE_URL}${path}`,
  inLanguage: "fr",
  isPartOf: { "@id": SITE_ID },
  about: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
});

/** Offre de service rattachee a l'organisation */
export const serviceSchema = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: name,
  url: `${SITE_URL}${path}`,
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "Republique democratique du Congo" },
});
