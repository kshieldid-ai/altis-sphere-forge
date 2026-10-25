import {
  Lightbulb,
  Thermometer,
  Lock,
  Camera,
  Plug,
  Clock,
  Moon,
  DoorOpen,
  Sun,
  ShieldCheck,
  MapPin,
  Fuel,
  Power,
  BellRing,
  Route,
  Check,
} from "lucide-react";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { breadcrumb, serviceSchema } from "@/lib/seo-schemas";
import serviceDomotique from "@/assets/service-domotique.jpg";

const smartHomeFeatures = [
  { icon: Lightbulb, title: "Éclairage intelligent", description: "Allumage, extinction et réglage d'intensité de chaque pièce à distance." },
  { icon: Thermometer, title: "Climatisation & température", description: "Pilotage du chauffage et de la climatisation, programmation horaire." },
  { icon: Camera, title: "Caméras de surveillance", description: "Flux HD en direct, détection de mouvement et alertes instantanées." },
  { icon: Lock, title: "Serrures & accès", description: "Contrôle des serrures, portes, portails et garages depuis votre smartphone." },
  { icon: Plug, title: "Prises intelligentes", description: "Gestion des prises connectées et de vos appareils électriques." },
  { icon: Clock, title: "Automatisation & scénarios", description: "Mode nuit, absence, présence : vos routines s'exécutent automatiquement." },
];

const scenarios = [
  { icon: Moon, label: "Mode nuit", description: "Lumières tamisées, portes verrouillées, alarme activée." },
  { icon: DoorOpen, label: "Mode absence", description: "Simulation de présence, surveillance renforcée." },
  { icon: Sun, label: "Mode présence", description: "Éclairage adaptatif, climatisation optimale." },
  { icon: ShieldCheck, label: "Mode sécurité", description: "Toutes les caméras actives, alertes maximales." },
];

const vehicleFeatures = [
  { icon: Lock, title: "Verrouillage à distance", description: "Verrouillez ou déverrouillez votre véhicule où que vous soyez." },
  { icon: MapPin, title: "Localisation GPS", description: "Position du véhicule en temps réel sur la carte." },
  { icon: Fuel, title: "Carburant / batterie", description: "Niveau de carburant ou de charge consultable à tout moment." },
  { icon: Power, title: "Démarrage à distance", description: "Démarrage du moteur et de la climatisation avant de monter à bord." },
  { icon: BellRing, title: "Alertes sécurité", description: "Notifications d'intrusion, de choc ou de remorquage." },
  { icon: Route, title: "Suivi des trajets", description: "Historique des déplacements, distance parcourue et consommation." },
];

const benefits = [
  "Installation clé en main par nos techniciens certifiés",
  "Compatibilité KNX, Z-Wave, Zigbee, Google Home, Apple HomeKit",
  "Formation à l'utilisation incluse",
  "Support et maintenance à distance",
  "Solutions pour particuliers et professionnels",
  "Devis gratuit et sur mesure",
];

const domotiqueJsonLd = [
  serviceSchema("Domotique & maison intelligente", "Éclairage, climat, sécurité et véhicules connectés pilotés à distance.", "/domotique"),
  breadcrumb("Domotique", "/domotique"),
];

const FeatureCard = ({ icon: Icon, title, description }: { icon: typeof Lock; title: string; description: string }) => (
  <div className="service-shell h-full">
    <span className="icon-shell">
      <Icon size={24} aria-hidden="true" />
    </span>
    <h3 className="mt-6 text-lg font-bold">{title}</h3>
    <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{description}</p>
  </div>
);

const DomotiquePage = () => (
  <>
    <Seo
      title="Domotique & Maison Intelligente | ALTIS SPHERE"
      description="Éclairage, climat, sécurité, véhicules connectés : ALTIS SPHERE installe et configure votre maison intelligente à Lubumbashi."
      path="/domotique"
      jsonLd={domotiqueJsonLd}
    />
    <PageHeader
      crumb="Domotique"
      title="Domotique et maison intelligente"
      lead="Pilotez l'éclairage, la climatisation, la sécurité et les accès de votre maison ou de vos locaux depuis une seule application."
    >
      <div className="flex flex-wrap gap-3">
        <QuoteRequestModal triggerVariant="hero" triggerSize="lg" />
      </div>
    </PageHeader>

    {/* ═══ Maison intelligente ═══ */}
    <section className="py-20 lg:py-24">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <p className="section-kicker">Maison intelligente</p>
            <h2 className="section-title mt-3">Votre habitat, piloté depuis votre smartphone</h2>
            <p className="section-lead">
              Lumières, climatisation, sécurité, accès et automatisations : chaque équipement est relié à une interface
              unique, utilisable sur place comme à distance.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <img
              src={serviceDomotique}
              alt="Installation domotique réalisée par ALTIS SPHERE"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {smartHomeFeatures.map((f, i) => (
            <ScrollReveal key={f.title} delay={(i % 3) * 0.05}>
              <FeatureCard {...f} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ Scénarios ═══ */}
    <section className="border-y bg-muted py-20 lg:py-24">
      <div className="container">
        <ScrollReveal className="max-w-2xl">
          <p className="section-kicker">Automatisation</p>
          <h2 className="section-title mt-3">Des scénarios prêts à l'emploi</h2>
          <p className="section-lead">Un mode s'active en un geste, et la maison s'adapte automatiquement.</p>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((s) => (
            <div key={s.label} className="rounded-lg border bg-card p-6">
              <s.icon size={22} className="text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-bold">{s.label}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ Véhicule connecté ═══ */}
    <section className="py-20 lg:py-24">
      <div className="container">
        <ScrollReveal className="max-w-2xl">
          <p className="section-kicker">Véhicule connecté</p>
          <h2 className="section-title mt-3">Votre véhicule, sous contrôle à distance</h2>
          <p className="section-lead">
            Verrouillage, localisation, démarrage à distance : vous gardez la main sur votre véhicule depuis votre smartphone.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicleFeatures.map((f, i) => (
            <ScrollReveal key={f.title} delay={(i % 3) * 0.05}>
              <FeatureCard {...f} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ Avantages + devis ═══ */}
    <section className="border-t bg-muted py-20 lg:py-24">
      <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="section-kicker">Pourquoi ALTIS SPHERE</p>
          <h2 className="section-title mt-3">Expertise locale, standards internationaux</h2>
          <p className="section-lead">
            Nos installations sont pensées pour le contexte local : alimentation électrique variable, chaleur et
            connectivité hétérogène.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm leading-6">
                <Check size={16} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-7 shadow-sm lg:p-8">
          <h3 className="text-xl font-bold">Obtenez votre devis gratuit</h3>
          <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
            Décrivez votre projet domotique : notre équipe vous propose une solution personnalisée avec chiffrage sous 24 h.
          </p>
          <QuoteRequestModal triggerVariant="hero" triggerSize="lg" triggerClassName="mt-6 w-full" />
          <p className="mt-3 text-center text-xs text-muted-foreground">Sans engagement.</p>
        </div>
      </div>
    </section>
  </>
);

export default DomotiquePage;
