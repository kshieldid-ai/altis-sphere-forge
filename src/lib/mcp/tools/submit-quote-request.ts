import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "submit_quote_request",
  title: "Envoyer une demande de devis",
  description: "Enregistre une nouvelle demande de devis pour ALTIS SPHERE GROUP.",
  inputSchema: {
    nom: z.string().describe("Nom du contact"),
    email: z.string().describe("Adresse email du contact"),
    telephone: z.string().describe("Numéro de téléphone"),
    service: z.string().describe("Service concerné, par exemple 'Cybersécurité'"),
    description: z.string().describe("Description du besoin"),
    entreprise: z.string().optional().describe("Nom de l'entreprise"),
    budget: z.string().optional().describe("Budget estimé"),
    delai: z.string().optional().describe("Délai souhaité"),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Non authentifié" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("devis_requests")
      .insert({
        nom: input.nom.trim(),
        email: input.email.trim(),
        telephone: input.telephone.trim(),
        service: input.service.trim(),
        description: input.description.trim(),
        entreprise: input.entreprise?.trim() || null,
        budget: input.budget?.trim() || null,
        delai: input.delai?.trim() || null,
      })
      .select("id, created_at")
      .maybeSingle();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Demande de devis enregistrée (${data?.id ?? "ok"}).` }],
      structuredContent: { request: data },
    };
  },
});
