export const SITE_URL = "https://altis-sphere-forge.lovable.app";
export const ORG_ID = `${SITE_URL}/#organization`;

/** Fil d'Ariane structuré : Accueil > Page courante */
export const breadcrumb = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
  ],
});

/** Schéma de page générique rattaché à l'organisation */
export const webPage = (name: string, path: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name,
  description,
  url: `${SITE_URL}${path}`,
  inLanguage: "fr",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
});

/** Offre de service rattachée à l'organisation */
export const serviceSchema = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: name,
  url: `${SITE_URL}${path}`,
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "République démocratique du Congo" },
});
