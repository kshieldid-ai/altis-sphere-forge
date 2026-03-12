import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(20).optional(),
  subject: z.string().trim().min(1, "Sujet requis").max(200),
  message: z.string().trim().min(1, "Message requis").max(2000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      subject: result.data.subject,
      message: result.data.message,
    });
    setLoading(false);
    if (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      console.error(error);
      return;
    }
    toast.success("Message envoyé ! Nous vous recontacterons rapidement.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="pt-20">
      <section className="py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Contact</span>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold mt-3 mb-4">Contactez-nous</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Une question, un projet ? N'hésitez pas à nous contacter.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info */}
            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email", value: "contact@altissphere.com", href: "mailto:contact@altissphere.com" },
                { icon: Phone, label: "Téléphone", value: "+243 998 914 448 / +243 993 653 3322", href: "tel:+243998914448" },
                { icon: MapPin, label: "Adresse", value: "10, Avenue Biayi, Kalubwe, Lubumbashi, RD Congo" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 p-8 rounded-xl bg-card border border-border space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom *</label>
                  <Input placeholder="Votre nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input type="email" placeholder="votre@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Téléphone</label>
                  <Input placeholder="+33 ..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sujet *</label>
                  <Input placeholder="Sujet du message" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message *</label>
                <Textarea placeholder="Décrivez votre projet ou question..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <Button variant="hero" size="lg" type="submit">
                Envoyer <Send size={18} />
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
