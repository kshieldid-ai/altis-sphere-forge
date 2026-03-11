import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wifi, Shield, Code, Server, Headphones, Monitor, ChevronRight, Star, Zap, Users, Award } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

/* ── Hero ── */
const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    />
    <div className="absolute inset-0 bg-background/80" />
    <div className="absolute inset-0 grid-pattern opacity-30" />

    <div className="container relative z-10 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
          Services IT & Connectivité Internet
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
          Connectez votre avenir avec{" "}
          <span className="gradient-text">ALTIS SPHERE</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
          Solutions informatiques complètes et connectivité internet haute performance pour propulser votre entreprise vers l'excellence.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Demander un devis <ChevronRight size={18} />
            </Link>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <Link to="/services">Nos services</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── Services ── */
const services = [
  { icon: Wifi, title: "Internet & Connectivité", desc: "Fibre, Starlink et solutions de connectivité sur mesure." },
  { icon: Server, title: "Solutions IT", desc: "Infrastructure réseau, cloud et services managés." },
  { icon: Shield, title: "Cybersécurité", desc: "Protection avancée de vos systèmes et données." },
  { icon: Code, title: "Développement Web", desc: "Sites web et applications performantes." },
  { icon: Headphones, title: "Support Technique", desc: "Maintenance et assistance informatique 24/7." },
  { icon: Monitor, title: "Équipements IT", desc: "Routeurs, serveurs, antennes et matériel réseau." },
];

const Services = () => (
  <section className="py-24 bg-card">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-medium uppercase tracking-wider">Nos Services</span>
        <h2 className="font-heading text-3xl lg:text-4xl font-bold mt-3 mb-4">
          Des solutions pour chaque besoin
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          De la connectivité internet à la cybersécurité, nous couvrons l'ensemble de vos besoins technologiques.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-xl bg-background border border-border hover:border-primary/40 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4">
              <s.icon size={22} className="text-primary-foreground" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Why Us ── */
const reasons = [
  { icon: Zap, title: "Rapidité", desc: "Déploiement rapide et support réactif." },
  { icon: Award, title: "Expertise", desc: "Équipe certifiée avec +10 ans d'expérience." },
  { icon: Users, title: "Proximité", desc: "Un interlocuteur dédié pour chaque client." },
  { icon: Star, title: "Qualité", desc: "Solutions premium et garantie de satisfaction." },
];

const WhyUs = () => (
  <section className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-medium uppercase tracking-wider">Pourquoi nous</span>
        <h2 className="font-heading text-3xl lg:text-4xl font-bold mt-3 mb-4">
          Pourquoi choisir ALTIS SPHERE ?
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-6"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <r.icon size={24} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold mb-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Testimonials ── */
const testimonials = [
  { name: "Marie D.", role: "Directrice, PME", text: "ALTIS SPHERE a transformé notre infrastructure réseau. Service impeccable et équipe réactive." },
  { name: "Thomas L.", role: "Entrepreneur", text: "Installation Starlink ultra rapide. Enfin une connexion fiable pour notre zone rurale !" },
  { name: "Sophie M.", role: "DSI, Groupe industriel", text: "Leur expertise en cybersécurité nous a permis de sécuriser l'ensemble de nos systèmes." },
];

const Testimonials = () => (
  <section className="py-24 bg-card">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-medium uppercase tracking-wider">Témoignages</span>
        <h2 className="font-heading text-3xl lg:text-4xl font-bold mt-3 mb-4">
          Ce que disent nos clients
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-6 rounded-xl bg-background border border-border"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
            <div>
              <p className="font-heading font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── CTA ── */
const CTA = () => (
  <section className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl gradient-bg p-12 md:p-16 text-center overflow-hidden"
      >
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative z-10">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Prêt à transformer votre infrastructure IT ?
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
            Contactez-nous pour un diagnostic gratuit et un devis personnalisé.
          </p>
          <Button variant="outline" size="lg" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-semibold" asChild>
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── Page ── */
const Index = () => (
  <>
    <Hero />
    <Services />
    <WhyUs />
    <Testimonials />
    <CTA />
  </>
);

export default Index;
