import { motion } from "framer-motion";
import { Network, Cloud, ShieldCheck } from "lucide-react";

const solutions = [
  { icon: Network, title: "Réseaux d'entreprise", desc: "Conception, déploiement et gestion de réseaux d'entreprise performants et sécurisés. LAN, WAN, VPN, SD-WAN." },
  { icon: Cloud, title: "Cloud & Infrastructure IT", desc: "Migration cloud, hébergement, infrastructure as a service. Solutions Azure, AWS et cloud privé." },
  { icon: ShieldCheck, title: "Sécurité des systèmes", desc: "Audit, monitoring, SOC managé, conformité RGPD. Protection complète de votre système d'information." },
];

const Solutions = () => (
  <div className="pt-20">
    <section className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Solutions</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold mt-3 mb-4">Solutions pour entreprises</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Des solutions complètes pour accompagner la transformation numérique de votre entreprise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
            >
              <div className="w-14 h-14 rounded-lg gradient-bg flex items-center justify-center mb-6">
                <s.icon size={26} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Solutions;
