import { useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { altisApi, ApiError, type SubmissionResponse } from "@/services/altisApi";
import { useAntiBot } from "@/hooks/use-anti-bot";
import AntiBotFields from "@/components/AntiBotFields";
import Seo from "@/components/Seo";
import { breadcrumb, webPage } from "@/lib/seo-schemas";
import PageHeader from "@/components/PageHeader";

const contactSchema = z.object({
  nom: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  telephone: z.string().trim().max(30).optional(),
  entreprise: z.string().trim().max(200).optional(),
  sujet: z.string().trim().min(1, "Sujet requis").max(200),
  message: z.string().trim().min(10, "Message trop court (10 caractères minimum)").max(2000),
});

const initialForm = {
  nom: "",
  email: "",
  telephone: "",
  entreprise: "",
  sujet: "",
  message: "",
};

// Libellés lisibles pour les erreurs renvoyées par Django
const fieldLabels: Record<string, string> = {
  nom: "Nom",
  email: "Email",
  telephone: "Téléphone",
  entreprise: "Entreprise",
  sujet: "Sujet",
  message: "Message",
};

const contactItems = [
  { icon: Mail, label: "Email", value: "support@altisphere-group.com", href: "mailto:support@altisphere-group.com" },
  { icon: Phone, label: "Téléphone", value: "+243 998 914 448 / +243 993 653 332", href: "tel:+243998914448" },
  { icon: MapPin, label: "Adresse", value: "110, Av. Biayi, Kalubwe, Lubumbashi, RD Congo" },
];

const contactJsonLd = [
  webPage("Contact ALTIS SPHERE GROUP", "/contact", "Formulaire de contact, adresse et téléphones d'ALTIS SPHERE GROUP à Lubumbashi."),
  breadcrumb("Contact", "/contact"),
];

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  /** Non-null une fois le message enregistré : bascule vers l'écran de succès. */
  const [receipt, setReceipt] = useState<SubmissionResponse | null>(null);
  const [confirmedEmail, setConfirmedEmail] = useState("");

  const antiBot = useAntiBot();

  const clearFieldError = (name: string) =>
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // garde anti double-soumission

    const botError = antiBot.validate();
    if (botError === "__silent__") return;
    if (botError) {
      toast.error(botError);
      antiBot.refreshChallenge();
      return;
    }

    const result = contactSchema.safeParse({
      ...form,
      telephone: form.telephone || undefined,
      entreprise: form.entreprise || undefined,
    });

    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Veuillez vérifier le formulaire.");
      return;
    }

    setLoading(true);
    setFieldErrors({});

    try {
      const created = await altisApi.submitContact({
        nom: result.data.nom,
        email: result.data.email,
        telephone: result.data.telephone ?? "",
        entreprise: result.data.entreprise ?? "",
        sujet: result.data.sujet,
        message: result.data.message,
        website: antiBot.honeypot,
      });

      setConfirmedEmail(result.data.email);
      setReceipt(created);
      setForm(initialForm);
      antiBot.refreshChallenge();

      toast.success("Message envoyé", {
        description: `Référence #${created.id} — nous vous répondons sous 24 h.`,
        duration: 6000,
      });
    } catch (err) {
      if (err instanceof ApiError && err.status === 400) {
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
    setFieldErrors({});
    setForm(initialForm);
    antiBot.refreshChallenge();
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
    <>
      <Seo
        title="Contact | ALTIS SPHERE — Lubumbashi, RD Congo"
        description="Contactez ALTIS SPHERE à Lubumbashi : formulaire, téléphone +243 998 914 448, email support@altisphere-group.com."
        path="/contact"
        jsonLd={contactJsonLd}
      />
      <PageHeader
        crumb="Contact"
        title="Contactez-nous"
        lead="Une question, un projet ? Écrivez-nous ou appelez-nous : nous répondons sous 24 heures ouvrées."
      />

      <section className="py-16 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-6">
            <ul className="divide-y rounded-lg border bg-card">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-start gap-4 p-5">
                  <span className="icon-shell h-10 w-10">
                    <item.icon size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="mt-1 block break-words text-sm leading-6 text-muted-foreground hover:text-primary">
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} className="shrink-0 text-primary" aria-hidden="true" />
              Réponse sous 24 heures ouvrées.
            </p>
          </aside>

          {receipt ? (
            /* ══════════ ÉCRAN DE CONFIRMATION ══════════ */
            <div className="rounded-lg border bg-card p-7 shadow-sm lg:p-9" role="status">
              <div className="flex items-start gap-4">
                <CheckCircle2 size={28} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h2 className="text-xl font-semibold">Merci, votre message est bien arrivé</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Un membre de l'équipe ALTIS SPHERE GROUP prend connaissance de votre demande et revient vers vous rapidement.
                  </p>
                </div>
              </div>

              <dl className="mt-7 divide-y rounded-md border text-sm">
                <div className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-muted-foreground">Référence</dt>
                  <dd className="font-semibold tabular-nums">CONTACT-{String(receipt.id).padStart(5, "0")}</dd>
                </div>
                <div className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-muted-foreground">Réponse à</dt>
                  <dd className="truncate font-medium">{confirmedEmail}</dd>
                </div>
                <div className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-muted-foreground">Reçu le</dt>
                  <dd className="font-medium">{formattedDate}</dd>
                </div>
              </dl>

              <p className="mt-4 text-xs text-muted-foreground">
                Conservez cette référence pour tout échange avec notre équipe.
              </p>

              <Button variant="hero-outline" className="mt-6" onClick={resetAll}>
                Envoyer un autre message
              </Button>
            </div>
          ) : (
            /* ══════════ FORMULAIRE ══════════ */
            <form onSubmit={handleSubmit} noValidate className="rounded-lg border bg-card p-6 shadow-sm lg:p-8">
              <h2 className="text-lg font-semibold">Envoyer un message</h2>
              <p className="mt-1 text-sm text-muted-foreground">Les champs marqués d'un * sont obligatoires.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-nom" className="text-sm font-medium">Nom *</label>
                  <Input
                    id="contact-nom"
                    name="nom"
                    autoComplete="name"
                    value={form.nom}
                    onChange={(e) => { setForm({ ...form, nom: e.target.value }); clearFieldError("nom"); }}
                  />
                  <ErrorText name="nom" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium">Email *</label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nom@entreprise.com"
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); clearFieldError("email"); }}
                  />
                  <ErrorText name="email" />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-tel" className="text-sm font-medium">Téléphone</label>
                  <Input
                    id="contact-tel"
                    name="telephone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+243 ..."
                    value={form.telephone}
                    onChange={(e) => { setForm({ ...form, telephone: e.target.value }); clearFieldError("telephone"); }}
                  />
                  <ErrorText name="telephone" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-entreprise" className="text-sm font-medium">Entreprise</label>
                  <Input
                    id="contact-entreprise"
                    name="entreprise"
                    autoComplete="organization"
                    value={form.entreprise}
                    onChange={(e) => { setForm({ ...form, entreprise: e.target.value }); clearFieldError("entreprise"); }}
                  />
                  <ErrorText name="entreprise" />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label htmlFor="contact-sujet" className="text-sm font-medium">Sujet *</label>
                <Input
                  id="contact-sujet"
                  name="sujet"
                  value={form.sujet}
                  onChange={(e) => { setForm({ ...form, sujet: e.target.value }); clearFieldError("sujet"); }}
                />
                <ErrorText name="sujet" />
              </div>

              <div className="mt-4 space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium">Message *</label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Décrivez votre projet ou votre question"
                  rows={6}
                  value={form.message}
                  onChange={(e) => { setForm({ ...form, message: e.target.value }); clearFieldError("message"); }}
                />
                <div className="flex justify-between">
                  <ErrorText name="message" />
                  <span className="ml-auto text-xs tabular-nums text-muted-foreground">{form.message.length} / 2000</span>
                </div>
              </div>

              <div className="mt-4">
                <AntiBotFields {...antiBot} />
              </div>

              <Button variant="hero" size="lg" type="submit" disabled={loading} className="mt-6">
                {loading ? "Envoi en cours…" : "Envoyer le message"} <Send size={16} />
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
