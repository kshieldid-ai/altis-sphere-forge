import { useState } from "react";
import { CheckCircle2, Clock, Mail, MessageCircle } from "lucide-react";
import { z } from "zod";
import { altisApi, ApiError, type DevisResponse } from "@/services/altisApi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAntiBot } from "@/hooks/use-anti-bot";
import AntiBotFields from "@/components/AntiBotFields";

// ⚠ Doit rester synchronisé avec ServiceChoices dans altis/models.py.
//    Contrôle : curl http://localhost:8000/api/altis/services/
const serviceOptions = [
  "Internet & Connectivité",
  "Solutions IT pour entreprises",
  "Cybersécurité",
  "Développement Web & Applications",
  "Support & Maintenance",
  "Équipements informatiques",
  "Domotique / Maison intelligente",
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

// Libellés lisibles pour les erreurs renvoyées par Django
const fieldLabels: Record<string, string> = {
  nom: "Nom",
  email: "Email",
  telephone: "Téléphone",
  entreprise: "Entreprise",
  service: "Service",
  description: "Description",
  budget: "Budget",
  delai: "Délai",
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState(initialForm);

  /** Non-null une fois la demande enregistrée : sert d'écran de confirmation. */
  const [receipt, setReceipt] = useState<DevisResponse | null>(null);
  /** Email saisi, réaffiché dans l'écran de succès. */
  const [confirmedEmail, setConfirmedEmail] = useState("");

  const antiBot = useAntiBot();

  const whatsappMessage = encodeURIComponent(
    "Bonjour, je souhaite demander un devis pour vos services informatiques.",
  );

  const clearFieldError = (name: string) =>
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return; // garde anti double-soumission

    const botError = antiBot.validate();
    if (botError === "__silent__") return;
    if (botError) {
      toast.error(botError);
      antiBot.refreshChallenge();
      return;
    }

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
    setFieldErrors({});

    try {
      const created = await altisApi.submitDevis({
        nom: result.data.nom,
        email: result.data.email,
        telephone: result.data.telephone,
        entreprise: result.data.entreprise ?? "",
        service: result.data.service,
        description: result.data.description,
        budget: result.data.budget ?? "",
        delai: result.data.delai ?? "",
        // Honeypot unique, géré par useAntiBot (champ caché "website_url")
        website: antiBot.honeypot,
      });

      setConfirmedEmail(result.data.email);
      setReceipt(created);
      setForm(initialForm);
      antiBot.refreshChallenge();

      toast.success("Demande de devis envoyée", {
        description: `Référence #${created.id} — notre équipe vous répond sous 24 h.`,
        duration: 6000,
      });
    } catch (err) {
      if (err instanceof ApiError && err.status === 400) {
        // Django renvoie { "champ": ["message"] }
        const mapped: Record<string, string> = {};
        Object.entries(err.fields).forEach(([key, value]) => {
          mapped[key] = Array.isArray(value) ? value[0] : String(value);
        });
        setFieldErrors(mapped);

        const [firstKey] = Object.keys(mapped);
        const label = fieldLabels[firstKey] ?? firstKey;
        toast.error(`${label} : ${mapped[firstKey]}`);
      } else if (err instanceof ApiError) {
        toast.error(err.message);
      } else {
        toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setReceipt(null);
    setConfirmedEmail("");
    setLoading(false);
    setFieldErrors({});
    setForm(initialForm);
    antiBot.refreshChallenge();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) resetAll();
  };

  const ErrorText = ({ name }: { name: string }) =>
    fieldErrors[name] ? (
      <p className="text-xs text-destructive">{fieldErrors[name]}</p>
    ) : null;

  const formattedDate = receipt
    ? new Date(receipt.created_at).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size={triggerSize} className={triggerClassName} translate="no">
          Demander un devis
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-card p-0 shadow-2xl">
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="relative rounded-xl border border-border/60 bg-card/95 p-6 sm:p-8">
          <DialogHeader className="mb-6 space-y-3 text-left">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Devis</p>
              <DialogTitle className="mt-2 text-2xl font-bold sm:text-3xl">
                {receipt ? "Demande bien reçue" : "Demander un devis"}
              </DialogTitle>
            </div>
            <DialogDescription className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {receipt
                ? "Votre demande a été enregistrée et transmise à notre équipe commerciale."
                : "Parlez-nous de votre besoin et notre équipe vous recontactera rapidement avec une proposition adaptée."}
            </DialogDescription>
          </DialogHeader>

          {receipt ? (
            /* ══════════ ÉCRAN DE CONFIRMATION ══════════ */
            <div className="space-y-6">
              <div className="rounded-2xl border border-primary/25 bg-primary/5 p-6 text-center sm:p-8">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CheckCircle2 size={34} strokeWidth={2.2} />
                </div>

                <h3 className="text-xl font-semibold sm:text-2xl">
                  Merci, votre demande est enregistrée
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Un membre de l'équipe ALTIS SPHERE GROUP analyse votre besoin et
                  revient vers vous avec une proposition chiffrée.
                </p>

                <div className="mx-auto mt-6 grid max-w-md gap-3 text-left">
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="text-sm font-bold">#</span>
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Référence
                      </p>
                      <p className="font-semibold tabular-nums">
                        DEVIS-{String(receipt.id).padStart(5, "0")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Réponse attendue à
                      </p>
                      <p className="truncate font-medium">{confirmedEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Clock size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Reçue le
                      </p>
                      <p className="font-medium">{formattedDate}</p>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-xs text-muted-foreground">
                  Conservez la référence ci-dessus pour tout échange avec notre équipe.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="hero" className="flex-1" onClick={() => setOpen(false)}>
                  Fermer
                </Button>
                <Button variant="hero-outline" className="flex-1" onClick={resetAll}>
                  Envoyer une autre demande
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-background/70 p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Besoin d'une réponse immédiate ? Écrivez-nous directement sur WhatsApp.
                </p>
                <Button variant="hero-outline" size="lg" className="mt-4 w-full" asChild>
                  <a href={`https://wa.me/243993653332?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
                    <MessageCircle size={18} /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            /* ══════════ FORMULAIRE ══════════ */
            <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="space-y-4 rounded-2xl border border-border bg-background/70 p-5">
                  <div>
                    <h3 className="text-lg font-semibold">Informations client</h3>
                    <p className="text-sm text-muted-foreground">Renseignez vos coordonnées pour être recontacté.</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="quote-nom">Nom</Label>
                      <Input
                        id="quote-nom"
                        value={form.nom}
                        onChange={(e) => { setForm({ ...form, nom: e.target.value }); clearFieldError("nom"); }}
                        placeholder="Votre nom complet"
                      />
                      <ErrorText name="nom" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-email">Email</Label>
                      <Input
                        id="quote-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => { setForm({ ...form, email: e.target.value }); clearFieldError("email"); }}
                        placeholder="vous@entreprise.com"
                      />
                      <ErrorText name="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-phone">Téléphone</Label>
                      <Input
                        id="quote-phone"
                        value={form.telephone}
                        onChange={(e) => { setForm({ ...form, telephone: e.target.value }); clearFieldError("telephone"); }}
                        placeholder="+243 ..."
                      />
                      <ErrorText name="telephone" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="quote-entreprise">Entreprise (optionnel)</Label>
                      <Input
                        id="quote-entreprise"
                        value={form.entreprise}
                        onChange={(e) => { setForm({ ...form, entreprise: e.target.value }); clearFieldError("entreprise"); }}
                        placeholder="Nom de votre entreprise"
                      />
                      <ErrorText name="entreprise" />
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
                    <Select
                      value={form.service}
                      onValueChange={(value) => {
                        setForm({ ...form, service: value as (typeof serviceOptions)[number] });
                        clearFieldError("service");
                      }}
                    >
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
                    <ErrorText name="service" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quote-description">Description du projet</Label>
                    <Textarea
                      id="quote-description"
                      rows={6}
                      value={form.description}
                      onChange={(e) => { setForm({ ...form, description: e.target.value }); clearFieldError("description"); }}
                      placeholder="Décrivez votre besoin, le contexte, les objectifs et toute information utile..."
                    />
                    <div className="flex justify-between">
                      <ErrorText name="description" />
                      <span className="text-xs text-muted-foreground">{form.description.length} / 2000</span>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="quote-budget">Budget estimé (optionnel)</Label>
                      <Input
                        id="quote-budget"
                        value={form.budget}
                        onChange={(e) => { setForm({ ...form, budget: e.target.value }); clearFieldError("budget"); }}
                        placeholder="Ex: 2 000 - 5 000 $"
                      />
                      <ErrorText name="budget" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-delai">Délai souhaité (optionnel)</Label>
                      <Input
                        id="quote-delai"
                        value={form.delai}
                        onChange={(e) => { setForm({ ...form, delai: e.target.value }); clearFieldError("delai"); }}
                        placeholder="Ex: Sous 2 semaines"
                      />
                      <ErrorText name="delai" />
                    </div>
                  </div>
                </div>

                {/* Honeypot (caché) + CAPTCHA arithmétique */}
                <div className="space-y-4 rounded-2xl border border-border bg-background/70 p-5">
                  <AntiBotFields {...antiBot} />
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
                  <a href={`https://wa.me/243993653332?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
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
