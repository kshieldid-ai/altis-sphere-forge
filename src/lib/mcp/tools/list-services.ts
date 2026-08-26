import { defineTool } from "@lovable.dev/mcp-js";

const services = [
  { nom: "Internet & Connectivité", description: "Fibre optique, Starlink, VSAT et réseaux d'entreprise." },
  { nom: "Solutions IT pour entreprises", description: "Infrastructure, serveurs, cloud et virtualisation." },
  { nom: "Cybersécurité", description: "Audit, protection des données, pare-feu et sensibilisation." },
  { nom: "Développement Web & Applications", description: "Sites vitrines, applications métiers et plateformes web." },
  { nom: "Support & Maintenance", description: "Assistance technique, maintenance préventive et curative." },
  { nom: "Équipements informatiques", description: "Vente et installation de matériel informatique et réseau." },
  { nom: "Domotique / Maison intelligente", description: "Maison connectée, sécurité, éclairage et véhicule connecté." },
];

export default defineTool({
  name: "list_services",
  title: "Lister les services",
  description: "Liste les services proposés par ALTIS SPHERE GROUP avec une courte description.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services },
  }),
});
