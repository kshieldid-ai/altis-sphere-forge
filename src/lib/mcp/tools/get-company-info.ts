import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_company_info",
  title: "Informations entreprise",
  description:
    "Retourne les informations publiques d'ALTIS SPHERE GROUP : activité, adresse, téléphones, email et site web.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      nom: "ALTIS SPHERE GROUP",
      activite:
        "Services IT et connectivité : Internet & Starlink, solutions IT entreprises, cybersécurité, développement web, support & maintenance, équipements informatiques et domotique.",
      adresse: "110, Av. Biayi, Kalubwe, Lubumbashi, RD Congo",
      telephones: ["+243 998 914 448", "+243 993 653 332"],
      siteWeb: "https://altisphere-group.com",
      zone: "Lubumbashi, République Démocratique du Congo",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
