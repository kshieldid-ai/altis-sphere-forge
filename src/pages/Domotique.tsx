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
  Sun,
  Moon,
  Car,
  MapPin,
  Fuel,
  Power,
  BellRing,
  Route,
  DoorOpen,
  Plug,
  Clock,
  Eye,
  ExternalLink,
  Gauge,
  Activity,
  Signal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import QuoteRequestModal from "@/components/QuoteRequestModal";

/* ── Smart Home features ── */
const smartHomeFeatures = [
  {
    icon: Lightbulb,
    title: "Éclairage intelligent",
    description: "Allumage, extinction et réglage d'intensité de chaque pièce à distance.",
    status: "Actif",
    statusColor: "text-green-400",
  },
  {
    icon: Thermometer,
    title: "Climatisation & Température",
    description: "Pilotage du chauffage et de la climatisation, programmation intelligente.",
    status: "22 °C",
    statusColor: "text-accent",
  },
  {
    icon: Camera,
    title: "Caméras de surveillance",
    description: "Flux HD en direct, détection de mouvement et alertes sécurité instantanées.",
    status: "3 caméras",
    statusColor: "text-primary",
  },
  {
    icon: Lock,
    title: "Serrures & Accès",
    description: "Contrôle des serrures, portes, portails et garages depuis votre smartphone.",
    status: "Verrouillé",
    statusColor: "text-green-400",
  },
  {
    icon: Plug,
    title: "Prises intelligentes",
    description: "Gestion des prises connectées et de tous vos appareils électroniques.",
    status: "8 appareils",
    statusColor: "text-accent",
  },
  {
    icon: Clock,
    title: "Automatisation & Scénarios",
    description: "Mode nuit, absence, présence — vos routines s'exécutent automatiquement.",
    status: "5 scénarios",
    statusColor: "text-primary",
  },
];

/* ── Connected Vehicle features ── */
const vehicleFeatures = [
  {
    icon: Lock,
    title: "Verrouillage à distance",
    description: "Verrouillez ou déverrouillez votre véhicule en un clic, où que vous soyez.",
  },
  {
    icon: MapPin,
    title: "Localisation GPS",
    description: "Suivez la position de votre véhicule en temps réel sur la carte.",
  },
  {
    icon: Fuel,
    title: "Niveau carburant / batterie",
    description: "Consultez le niveau de carburant ou de charge batterie instantanément.",
  },
  {
    icon: Power,
    title: "Démarrage à distance",
    description: "Démarrez le moteur et activez la climatisation avant de monter à bord.",
  },
  {
    icon: BellRing,
    title: "Alertes sécurité",
    description: "Notifications d'intrusion, de choc ou de remorquage en temps réel.",
  },
  {
    icon: Route,
    title: "Suivi des trajets",
    description: "Historique complet des déplacements, distance parcourue et consommation.",
  },
];

/* ── Scenarios ── */
const scenarios = [
  { icon: Moon, label: "Mode Nuit", description: "Lumières tamisées, portes verrouillées, alarme activée" },
  { icon: DoorOpen, label: "Mode Absence", description: "Simulation de présence, surveillance renforcée" },
  { icon: Sun, label: "Mode Présence", description: "Éclairage adaptatif, climatisation optimale" },
  { icon: ShieldCheck, label: "Mode Sécurité", description: "Toutes caméras actives, alertes maximales" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const DomotiquePage = () => (
  <div className="pt-20">
    {/* ═══ HERO ═══ */}
    <section className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent/10" />
        <div className="grid-pattern absolute inset-0 opacity-15" />
        {/* Decorative glows */}
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="container relative py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-kicker mb-6">
              <Home size={14} className="mr-2" />
              Domotique & Maison Intelligente
            </div>
            <h1 className="section-title">
              Contrôlez votre <span className="gradient-text">univers connecté</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Une plateforme unifiée pour piloter votre maison, vos équipements et vos
              véhicules connectés — en temps réel, depuis n'importe où dans le monde.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://app.monsite.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl gradient-bg px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
              >
                Lancer l'application
                <ExternalLink size={16} />
              </a>
              <QuoteRequestModal triggerVariant="hero" triggerSize="lg" />
            </div>
          </motion.div>

          {/* Dashboard Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl border border-border/70 bg-card/80 p-6 backdrop-blur-2xl shadow-2xl">
              {/* Mini header */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="icon-shell h-10 w-10 rounded-xl">
                    <Activity size={18} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tableau de bord</p>
                    <p className="text-sm font-semibold">Ma Maison</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  <Signal size={12} />
                  En ligne
                </div>
              </div>
              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Appareils", value: "14", icon: Wifi },
                  { label: "Température", value: "22°C", icon: Thermometer },
                  { label: "Énergie", value: "4.2 kW", icon: Zap },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border/60 bg-secondary/50 p-3 text-center"
                  >
                    <stat.icon size={16} className="mx-auto mb-1 text-primary" />
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
              {/* Mini device list */}
              <div className="space-y-2">
                {[
                  { name: "Salon — Lumière", status: true, icon: Lightbulb },
                  { name: "Entrée — Serrure", status: true, icon: Lock },
                  { name: "Garage — Portail", status: false, icon: DoorOpen },
                ].map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/30 px-4 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <d.icon size={16} className="text-muted-foreground" />
                      <span className="text-sm">{d.name}</span>
                    </div>
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${d.status ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" : "bg-muted-foreground/40"}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Glow behind card */}
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* ═══ SMART HOME DASHBOARD ═══ */}
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="section-kicker">
            <Home size={14} className="mr-2" />
            Maison Intelligente
          </span>
          <h2 className="section-title mt-5">
            Votre maison, <span className="gradient-text">votre contrôle</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Gérez chaque aspect de votre habitat connecté depuis une interface unique — lumières,
            climatisation, sécurité, accès et automatisations.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {smartHomeFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Card className="group h-full border-border/60 bg-card/70 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="icon-shell">
                      <f.icon size={20} className="text-primary-foreground" />
                    </div>
                    <span className={`text-xs font-medium ${f.statusColor}`}>
                      {f.status}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ SCENARIOS ═══ */}
    <section className="border-y border-border/50 bg-secondary/20 py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="section-kicker">
            <Zap size={14} className="mr-2" />
            Automatisation
          </span>
          <h2 className="section-title mt-5">
            Scénarios <span className="gradient-text">intelligents</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Activez un mode de vie en un clic — votre maison s'adapte automatiquement.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group cursor-pointer rounded-2xl border border-border/60 bg-card/60 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <s.icon size={26} className="text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">{s.label}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ CONNECTED VEHICLE ═══ */}
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="section-kicker">
            <Car size={14} className="mr-2" />
            Véhicule Connecté
          </span>
          <h2 className="section-title mt-5">
            Votre véhicule, <span className="gradient-text">toujours sous contrôle</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Verrouillage, localisation, démarrage à distance — gardez le contrôle total
            sur votre véhicule depuis votre smartphone.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicleFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Card className="group h-full border-border/60 bg-card/70 backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="mb-4 icon-shell">
                    <f.icon size={20} className="text-primary-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ CTA — Lancer l'application ═══ */}
    <section className="relative overflow-hidden border-t border-border/50 py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/8" />
      <div className="grid-pattern absolute inset-0 opacity-10" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl gradient-bg shadow-lg shadow-primary/30">
            <Gauge size={30} className="text-primary-foreground" />
          </div>
          <h2 className="section-title">
            Prêt à tout <span className="gradient-text">contrôler ?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Accédez à votre tableau de bord intelligent et prenez le contrôle de votre maison,
            vos équipements et vos véhicules connectés — en un seul endroit.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://app.monsite.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl gradient-bg px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]"
            >
              Lancer l'application de contrôle
              <ExternalLink size={18} />
            </a>
            <QuoteRequestModal triggerVariant="hero" triggerSize="lg" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck size={14} className="text-primary" />
            Connexion sécurisée — Vos données sont protégées
          </div>
        </motion.div>
      </div>
    </section>

    {/* ═══ Avantages ═══ */}
    <section className="border-t border-border/50 bg-card/40 py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-kicker">
              <ShieldCheck size={14} className="mr-2" />
              Pourquoi ALTIS SPHERE
            </span>
            <h2 className="section-title mt-5">
              Expertise locale, <span className="gradient-text">technologie mondiale</span>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              ALTIS SPHERE déploie des solutions domotiques certifiées adaptées au contexte
              africain : alimentation électrique variable, chaleur, et connectivité hétérogène.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Installation clé en main par nos techniciens certifiés",
                "Compatibilité KNX, Z-Wave, Zigbee, Google Home, Apple HomeKit",
                "Formations à l'utilisation incluses",
                "Support et maintenance à distance 24/7",
                "Solutions pour particuliers et professionnels",
                "Devis gratuit et sur mesure",
              ].map((b) => (
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
            className="editorial-panel"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="icon-shell h-10 w-10 rounded-xl">
                <Zap size={20} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Passez à l'action
                </p>
                <h3 className="text-xl font-bold">Obtenez votre devis gratuit</h3>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Décrivez votre projet domotique et notre équipe vous propose une solution
              personnalisée avec chiffrage sous 24 h.
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
