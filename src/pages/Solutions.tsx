import { motion } from "framer-motion";
import { Network, Cloud, ShieldCheck } from "lucide-react";

const solutions = [
  { icon: Network, title: "Réseaux d'entreprise", desc: "Conception, déploiement et gestion de réseaux d'entreprise performants et sécurisés. LAN, WAN, VPN, SD-WAN." },
  { icon: Cloud, title: "Cloud & Infrastructure IT", desc: "Migration cloud, hébergement, infrastructure as a service. Solutions Azure, AWS et cloud privé." },
  { icon: ShieldCheck, title: "Sécurité des systèmes", desc: "Audit, monitoring, SOC managé, conformité RGPD. Protection complète de votre système d'information." },
];

const Solutions = () => (
  <div className="pt-24">
    <section className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <span className="section-kicker">Solutions</span>
            <h1 className="section-title mt-4">Solutions pour entreprises</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Des solutions complètes pour accompagner la transformation numérique de votre entreprise.
            </p>
          </div>
          <div className="editorial-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Approche</p>
            <p className="mt-3 text-lg leading-8 text-foreground/82">Une lecture plus premium, plus structurée et plus intentionnelle, sans retirer aucun élément du site.</p>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="service-shell"
            >
              <div className="icon-shell">
                <s.icon size={22} className="text-primary-foreground" />
              </div>
              <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{s.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Solutions;
