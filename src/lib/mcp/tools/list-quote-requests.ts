import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_quote_requests",
  title: "Lister les demandes de devis",
  description:
    "Liste les demandes de devis reçues. Réservé aux administrateurs : les autres comptes ne voient aucune donnée.",
  inputSchema: {
    limit: z.number().int().optional().describe("Nombre maximum de demandes à retourner (défaut 20, max 100)"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Non authentifié" }], isError: true };
    }
    const take = Math.min(Math.max(limit ?? 20, 1), 100);
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("devis_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(take);

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const rows = data ?? [];
    return {
      content: [
        {
          type: "text",
          text: rows.length
            ? JSON.stringify(rows, null, 2)
            : "Aucune demande visible (accès administrateur requis).",
        },
      ],
      structuredContent: { requests: rows },
    };
  },
});
