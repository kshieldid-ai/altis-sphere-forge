import { motion } from "framer-motion";
import {
  Home,
  Lightbulb,
  Thermometer,
  Lock,
  Camera,
  Wifi,
  Smartphone,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import serviceDomotique from "@/assets/service-domotique.jpg";
import QuoteRequestModal from "@/components/QuoteRequestModal";

const offers = [
  {
    icon: Lightbulb,
    title: "Éclairage intelligent",
    description:
      "Contrôlez l'ambiance lumineuse de chaque pièce depuis votre smartphone ou via des scénarios automatisés.",
  },
  {
    icon: Thermometer,
    title: "Gestion climatique",
    description:
      "Thermostats connectés, chauffage et climatisation pilotés intelligemment pour économiser de l'énergie.",
  },
  {
    icon: Lock,
    title: "Sécurité & contrôle d'accès",
    description:
      "Serrures connectées, vidéophones et alarmes intégrés pour protéger votre maison ou entreprise.",
  },
  {
    icon: Camera,
    title: "Vidéosurveillance IP",
    description:
      "Caméras HD accessibles à distance, enregistrement cloud et alertes de mouvement en temps réel.",
  },
  {
    icon: Wifi,
    title: "Réseau & connectivité",
    description:
      "Infrastructure Wi-Fi optimisée pour assurer la connexion stable de tous vos équipements domotiques.",
  },
  {
    icon: Smartphone,
    title: "Application de contrôle",
    description:
      "Une interface unique pour piloter l'ensemble de vos systèmes domotiques depuis n'importe où.",
  },
];

const benefits = [
  "Installation clé en main par nos techniciens certifiés",
  "Compatibilité avec les principales plateformes (KNX, Z-Wave, Zigbee, Google Home, Apple HomeKit)",
  "Formations à l'utilisation incluses",
  "Support et maintenance à distance",
  "Solutions adaptées aux particuliers et aux professionnels",
  "Devis gratuit et sur mesure",
];

const DomotiquePage = () => (
  <div className="pt-20">
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={serviceDomotique}
          alt="Domotique et Maison intelligente"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="grid-pattern absolute inset-0 opacity-20" />
      </div>
      <div className="container relative py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
            <Home size={14} />
            Domotique
          </div>
          <h1 className="font-heading text-4xl font-bold leading-tight lg:text-6xl">
            Maison & Bâtiment{" "}
            <span className="gradient-text">Intelligent</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Transformez votre espace de vie ou de travail en un environnement
            connecté, confortable et économe en énergie grâce à nos solutions
            domotiques sur mesure.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <QuoteRequestModal triggerVariant="hero" triggerSize="lg" />
            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Offers grid */}
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Nos offres
          </span>
          <h2 className="font-heading mt-3 text-3xl font-bold lg:text-4xl">
            Ce que nous proposons
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Une gamme complète de services domotiques pour connecter, automatiser et
            sécuriser votre habitat ou vos locaux professionnels.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="mb-4 w-12 h-12 rounded-lg gradient-bg flex items-center justify-center">
                <offer.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading mb-2 text-lg font-semibold">
                {offer.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {offer.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits + CTA */}
    <section className="border-t border-border bg-card/50 py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Pourquoi nous choisir
            </span>
            <h2 className="font-heading mt-3 text-3xl font-bold lg:text-4xl">
              Une expertise locale, une technologie mondiale
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              ALTIS SPHERE déploie des solutions domotiques certifiées adaptées au
              contexte africain : alimentation électrique variable, chaleur, et
              connectivité hétérogène.
            </p>
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-8 shadow-lg"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <Zap size={20} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-primary">
                  Passez à l'action
                </p>
                <h3 className="font-heading text-xl font-bold">
                  Obtenez votre devis gratuit
                </h3>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Décrivez votre projet et notre équipe vous propose une solution
              domotique personnalisée avec chiffrage sous 24 h.
            </p>
            <div className="space-y-3">
              <QuoteRequestModal
                triggerVariant="hero"
                triggerSize="lg"
                triggerClassName="w-full"
              />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck size={14} className="text-primary" />
                Devis gratuit, sans engagement
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

export default DomotiquePage;
