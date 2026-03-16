import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const serviceOptions = [
  "Internet & Connectivité",
  "Solutions IT pour entreprises",
  "Cybersécurité",
  "Développement Web & Applications",
  "Support & Maintenance",
  "Équipements informatiques",
] as const;

const quoteSchema = z.object({
  nom: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  telephone: z.string().trim().min(1, "Téléphone requis").max(30),
  entreprise: z.string().trim().max(120).optional(),
  service: z.enum(serviceOptions, { message: "Service requis" }),
  description: z.string().trim().min(1, "Description requise").max(2000),
  budget: z.string().trim().max(120).optional(),
  delai: z.string().trim().max(120).optional(),
});

const initialForm = {
  nom: "",
  email: "",
  telephone: "",
  entreprise: "",
  service: undefined as (typeof serviceOptions)[number] | undefined,
  description: "",
  budget: "",
  delai: "",
};

type QuoteRequestModalProps = {
  triggerClassName?: string;
  triggerSize?: "default" | "sm" | "lg" | "icon";
  triggerVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "hero" | "hero-outline";
};

const QuoteRequestModal = ({
  triggerClassName,
  triggerSize = "lg",
  triggerVariant = "hero",
}: QuoteRequestModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(initialForm);

  const whatsappMessage = encodeURIComponent(
    "Bonjour, je souhaite demander un devis pour vos services informatiques.",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = quoteSchema.safeParse({
      ...form,
      entreprise: form.entreprise || undefined,
      budget: form.budget || undefined,
      delai: form.delai || undefined,
    });

    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Veuillez vérifier le formulaire.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("devis_requests").insert({
      nom: result.data.nom,
      email: result.data.email,
      telephone: result.data.telephone,
      entreprise: result.data.entreprise || null,
      service: result.data.service,
      description: result.data.description,
      budget: result.data.budget || null,
      delai: result.data.delai || null,
    });

    setLoading(false);

    if (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      return;
    }

    setSubmitted(true);
    setForm(initialForm);
    toast.success("Demande de devis envoyée avec succès.");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSubmitted(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size={triggerSize} className={triggerClassName}>
          Demander un devis
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-card p-0 shadow-2xl">
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="relative rounded-xl border border-border/60 bg-card/95 p-6 sm:p-8">
          <DialogHeader className="mb-6 space-y-3 text-left">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Devis</p>
              <DialogTitle className="mt-2 text-2xl font-bold sm:text-3xl">Demander un devis</DialogTitle>
            </div>
            <DialogDescription className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Parlez-nous de votre besoin et notre équipe vous recontactera rapidement avec une proposition adaptée.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="space-y-6 rounded-2xl border border-border bg-background/70 p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Send size={22} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Demande envoyée</h3>
                <p className="text-sm text-muted-foreground">
                  Merci pour votre demande de devis. Notre équipe vous contactera dans les 24 heures.
                </p>
              </div>
              <Button variant="hero" onClick={() => setOpen(false)}>
                Fermer
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 rounded-2xl border border-border bg-background/70 p-5">
                  <div>
                    <h3 className="text-lg font-semibold">Informations client</h3>
                    <p className="text-sm text-muted-foreground">Renseignez vos coordonnées pour être recontacté.</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="quote-nom">Nom</Label>
                      <Input id="quote-nom" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Votre nom complet" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-email">Email</Label>
                      <Input id="quote-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="vous@entreprise.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-phone">Téléphone</Label>
                      <Input id="quote-phone" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} placeholder="+243 ..." />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="quote-entreprise">Entreprise (optionnel)</Label>
                      <Input id="quote-entreprise" value={form.entreprise} onChange={(e) => setForm({ ...form, entreprise: e.target.value })} placeholder="Nom de votre entreprise" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-2xl border border-border bg-background/70 p-5">
                  <div>
                    <h3 className="text-lg font-semibold">Informations sur la demande</h3>
                    <p className="text-sm text-muted-foreground">Décrivez le service souhaité et le contexte de votre projet.</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Service demandé</Label>
                    <Select value={form.service} onValueChange={(value) => setForm({ ...form, service: value as (typeof serviceOptions)[number] })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisissez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quote-description">Description du projet</Label>
                    <Textarea
                      id="quote-description"
                      rows={6}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Décrivez votre besoin, le contexte, les objectifs et toute information utile..."
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="quote-budget">Budget estimé (optionnel)</Label>
                      <Input id="quote-budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="Ex: 2 000 - 5 000 $" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-delai">Délai souhaité (optionnel)</Label>
                      <Input id="quote-delai" value={form.delai} onChange={(e) => setForm({ ...form, delai: e.target.value })} placeholder="Ex: Sous 2 semaines" />
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" disabled={loading} className="w-full sm:w-auto">
                  {loading ? "Envoi en cours..." : "Envoyer la demande de devis"}
                </Button>
              </form>

              <aside className="flex h-full flex-col justify-between rounded-2xl border border-border bg-background/70 p-5">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Contact rapide</p>
                    <h3 className="mt-2 text-xl font-semibold">Ou contactez-nous directement</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Pour une réponse immédiate, ouvrez WhatsApp avec un message déjà prêt à envoyer à notre équipe.
                  </p>
                </div>

                <Button variant="hero-outline" size="lg" className="mt-6 w-full" asChild>
                  <a href={`https://wa.me/?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
                    <MessageCircle size={18} /> WhatsApp
                  </a>
                </Button>
              </aside>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
