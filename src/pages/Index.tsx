import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import { Wifi, Shield, Code, Server, Headphones, Monitor, ArrowRight, Star, Zap, Users, Award } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Seo from "@/components/Seo";

const services = [
  { icon: Wifi, title: "Internet & Connectivité", desc: "Fibre, Starlink et solutions de connectivité sur mesure." },
  { icon: Server, title: "Solutions IT", desc: "Infrastructure réseau, cloud et services managés." },
  { icon: Shield, title: "Cybersécurité", desc: "Protection avancée de vos systèmes et données." },
  { icon: Code, title: "Développement Web", desc: "Sites web et applications performantes." },
  { icon: Headphones, title: "Support Technique", desc: "Maintenance et assistance informatique 24/7." },
  { icon: Monitor, title: "Équipements IT", desc: "Routeurs, serveurs, antennes et matériel réseau." },
];

const reasons = [
  { icon: Zap, title: "Rapidité", desc: "Déploiement rapide et support réactif." },
  { icon: Award, title: "Expertise", desc: "Équipe certifiée avec +10 ans d'expérience." },
  { icon: Users, title: "Proximité", desc: "Un interlocuteur dédié pour chaque client." },
  { icon: Star, title: "Qualité", desc: "Solutions premium et garantie de satisfaction." },
];

const testimonials = [
  { name: "Marie D.", role: "Directrice, PME", text: "ALTIS SPHERE a transformé notre infrastructure réseau. Service impeccable et équipe réactive." },
  { name: "Thomas L.", role: "Entrepreneur", text: "Installation Starlink ultra rapide. Enfin une connexion fiable pour notre zone rurale !" },
  { name: "Sophie M.", role: "DSI, Groupe industriel", text: "Leur expertise en cybersécurité nous a permis de sécuriser l'ensemble de nos systèmes." },
];

const Hero = () => (
  <section className="relative isolate overflow-hidden pt-28 md:pt-32">
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt="Infrastructure réseau et connectivité déployée par ALTIS SPHERE GROUP"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/65" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.26),transparent_30%),radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.18),transparent_24%),linear-gradient(180deg,hsl(var(--background)/0.15),hsl(var(--background)))]" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
    </div>

    <div className="container relative z-10 pb-20 pt-8 md:pb-28">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.35fr)_22rem] xl:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <span className="inline-flex rounded-full border border-primary/20 bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary backdrop-blur-xl">
            Services IT & Connectivité Internet
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Une présence digitale plus <span className="gradient-text">forte</span>, plus rapide, plus sûre.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/90 sm:text-lg">
            ALTIS SPHERE conçoit des expériences connectées, des infrastructures IT fiables et des solutions web premium pour entreprises et particuliers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <QuoteRequestModal triggerVariant="hero" triggerSize="lg" />
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/services">Explorer nos services</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="editorial-panel space-y-5"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Impact</p>
            <p className="mt-3 text-3xl font-bold">Connectivité, sécurité et performance réunies.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {[
              ["24/7", "Support réactif"],
              ["360°", "Couverture IT"],
              ["Premium", "Exécution soignée"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-border/70 bg-background/55 p-4">
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section className="py-24">
    <div className="container">
      <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span className="section-kicker">Nos Services</span>
          <h2 className="section-title mt-4">Un écosystème de services pensé comme une signature de marque.</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          De la connectivité internet à la cybersécurité, chaque offre s'intègre dans une expérience cohérente, maîtrisée et orientée résultats.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="service-shell group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="icon-shell">
                <s.icon size={22} className="text-primary-foreground" />
              </div>
              <ArrowRight className="mt-1 text-primary transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </div>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{s.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <nav aria-label="Pages clés" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <Link to="/services" className="text-primary underline-offset-4 hover:underline">Découvrir le détail de nos services IT</Link>
        <Link to="/solutions" className="text-primary underline-offset-4 hover:underline">Voir nos solutions pour entreprises</Link>
        <Link to="/produits" className="text-primary underline-offset-4 hover:underline">Parcourir nos équipements réseau</Link>
        <Link to="/domotique" className="text-primary underline-offset-4 hover:underline">Explorer la domotique et la maison intelligente</Link>
      </nav>
    </div>
  </section>
);

const WhyUs = () => (
  <section className="py-24">
    <div className="container">
      <div className="feature-grid rounded-[2rem] border border-border/70 bg-card/60 p-8 backdrop-blur-xl lg:p-10">
        <div className="max-w-xl">
          <span className="section-kicker">Pourquoi nous</span>
          <h2 className="section-title mt-4">Une direction technique solide, avec une exécution visible dès le premier regard.</h2>
          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            Nous combinons expertise technique, accompagnement humain et exigences de qualité pour créer des solutions qui tiennent dans le temps.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-border/70 bg-background/65 p-6"
            >
              <div className="icon-shell h-12 w-12 rounded-2xl">
                <r.icon size={20} className="text-primary-foreground" />
              </div>
              <h2 className="mt-6 text-xl font-semibold tracking-[-0.03em]">{r.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24">
    <div className="container">
      <div className="mb-12 max-w-2xl">
        <span className="section-kicker">Témoignages</span>
        <h2 className="section-title mt-4">Des retours clients qui confirment la promesse.</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.article
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-[1.75rem] border border-border/70 bg-card/75 p-7 backdrop-blur-xl"
          >
            <div className="flex gap-1 text-primary">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-foreground/90">“{t.text}”</p>
            <div className="mt-8 border-t border-border/70 pt-5">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.role}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="pb-24 pt-12">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.18),hsl(var(--accent)/0.08),hsl(var(--card)/0.96))] p-10 md:p-14"
      >
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="section-kicker">Passons à l’action</span>
            <h2 className="section-title mt-4">Prêt à transformer votre infrastructure IT&nbsp;?</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-foreground/90 sm:text-base">
              Contactez-nous pour un diagnostic gratuit, un cadrage précis et un devis personnalisé adapté à votre contexte.
            </p>
          </div>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ALTIS SPHERE GROUP — Services IT & connectivité internet",
  url: "https://altis-sphere-forge.lovable.app/",
  inLanguage: "fr",
  about: { "@id": "https://altis-sphere-forge.lovable.app/#organization" },
  publisher: { "@id": "https://altis-sphere-forge.lovable.app/#organization" },
};

const Index = () => (
  <>
    <Seo
      title="ALTIS SPHERE GROUP | Services IT & connectivité internet à Lubumbashi"
      description="ALTIS SPHERE GROUP — services IT, fibre, Starlink, cybersécurité, développement web et domotique pour entreprises et particuliers en RD Congo."
      path="/"
      jsonLd={homeJsonLd}
    />
    <Hero />
    <Services />
    <WhyUs />
    <Testimonials />
    <CTA />
  </>
);

export default Index;
