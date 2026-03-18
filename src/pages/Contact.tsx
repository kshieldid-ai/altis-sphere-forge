import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAntiBot } from "@/hooks/use-anti-bot";
import AntiBotFields from "@/components/AntiBotFields";

const contactSchema = z.object({
  nom: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  telephone: z.string().trim().min(1, "Téléphone requis").max(30),
  entreprise: z.string().trim().max(200).optional(),
  service: z.string().trim().min(1, "Sujet requis").max(200),
  description: z.string().trim().min(1, "Message requis").max(2000),
});

const contactItems = [
  { icon: Mail, label: "Email", value: "contact@altissphere.com", href: "mailto:contact@altissphere.com" },
  { icon: Phone, label: "Téléphone", value: "+243 998 914 448 / +243 993 653 332", href: "tel:+243998914448" },
  { icon: MapPin, label: "Adresse", value: "10, Avenue Biayi, Kalubwe, Lubumbashi, RD Congo" },
];

const Contact = () => {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", entreprise: "", service: "", description: "" });
  const [loading, setLoading] = useState(false);
  const antiBot = useAntiBot();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const botError = antiBot.validate();
    if (botError === "__silent__") return;
    if (botError) {
      toast.error(botError);
      antiBot.refreshChallenge();
      return;
    }

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
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
    });
    setLoading(false);

    if (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      console.error(error);
      return;
    }

    toast.success("Message envoyé ! Nous vous recontacterons rapidement.");
    setForm({ nom: "", email: "", telephone: "", entreprise: "", service: "", description: "" });
  };

  return (
    <div className="pt-24">
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
              <p className="mt-3 text-lg leading-8 text-foreground/82">Même formulaire, même contenu, avec une lecture plus premium et plus rassurante.</p>
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

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              onSubmit={handleSubmit}
              className="rounded-[1.75rem] border border-border/70 bg-card/82 p-7 backdrop-blur-xl lg:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom *</label>
                  <Input placeholder="Votre nom" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input type="email" placeholder="votre@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Téléphone</label>
                  <Input placeholder="+243 ..." value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sujet *</label>
                  <Input placeholder="Sujet du message" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium">Message *</label>
                <Textarea placeholder="Décrivez votre projet ou question..." rows={6} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>

              <Button variant="hero" size="lg" type="submit" disabled={loading} className="mt-6">
                {loading ? "Envoi..." : "Envoyer"} <Send size={18} />
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
