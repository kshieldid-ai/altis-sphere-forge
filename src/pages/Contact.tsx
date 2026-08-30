import PageBackground from "@/components/PageBackground";
import { useState } from "react";
import { motion } from "framer-motion";
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
    <div className="relative isolate pt-24">
      <PageBackground />
      <Seo
        title="Contact | ALTIS SPHERE — Lubumbashi, RD Congo"
        description="Contactez ALTIS SPHERE à Lubumbashi : formulaire, téléphone +243 998 914 448, email support@altisphere-group.com."
        path="/contact"
        jsonLd={contactJsonLd}
      />
      <section className="py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <span className="section-kicker">Contact</span>
              <h1 className="section-title mt-4">Contactez-nous</h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                Une question, un projet ? N'hésitez pas à nous contacter.
              </p>
            </div>
            <div className="editorial-panel">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Échange direct</p>
              <p className="mt-3 text-lg leading-8 text-foreground/90">
                Notre équipe lit chaque message et vous répond sous 24 heures ouvrées.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4">
              {contactItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[1.5rem] border border-border/70 bg-card/75 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="icon-shell h-11 w-11 rounded-2xl">
                      <item.icon size={18} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="mt-2 block text-sm leading-7 text-muted-foreground transition-colors hover:text-foreground">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {receipt ? (
              /* ══════════ ÉCRAN DE CONFIRMATION ══════════ */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[1.75rem] border border-primary/25 bg-primary/5 p-7 backdrop-blur-xl lg:p-9"
              >
                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckCircle2 size={34} strokeWidth={2.2} />
                  </div>

                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Merci, votre message est bien arrivé
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Un membre de l'équipe ALTIS SPHERE GROUP prend connaissance de
                    votre demande et revient vers vous rapidement.
                  </p>
                </div>

                <div className="mx-auto mt-7 grid max-w-md gap-3 text-left">
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="text-sm font-bold">#</span>
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Référence</p>
                      <p className="font-semibold tabular-nums">
                        CONTACT-{String(receipt.id).padStart(5, "0")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Réponse attendue à</p>
                      <p className="truncate font-medium">{confirmedEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Clock size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Reçu le</p>
                      <p className="font-medium">{formattedDate}</p>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Conservez cette référence pour tout échange avec notre équipe.
                </p>

                <Button variant="hero-outline" size="lg" className="mt-7 w-full" onClick={resetAll}>
                  Envoyer un autre message
                </Button>
              </motion.div>
            ) : (
              /* ══════════ FORMULAIRE ══════════ */
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                onSubmit={handleSubmit}
                noValidate
                className="rounded-[1.75rem] border border-border/70 bg-card/82 p-7 backdrop-blur-xl lg:p-9"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="contact-nom" className="text-sm font-medium">Nom *</label>
                    <Input
                      id="contact-nom"
                      name="nom"
                      autoComplete="name"
                      placeholder="Votre nom"
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
                      placeholder="votre@email.com"
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
                      placeholder="Nom de votre entreprise"
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
                    placeholder="Sujet du message"
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
                    placeholder="Décrivez votre projet ou votre question..."
                    rows={6}
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); clearFieldError("message"); }}
                  />
                  <div className="flex justify-between">
                    <ErrorText name="message" />
                    <span className="text-xs text-muted-foreground">{form.message.length} / 2000</span>
                  </div>
                </div>

                <div className="mt-4">
                  <AntiBotFields {...antiBot} />
                </div>

                <Button variant="hero" size="lg" type="submit" disabled={loading} className="mt-6">
                  {loading ? "Envoi..." : "Envoyer"} <Send size={18} />
                </Button>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
