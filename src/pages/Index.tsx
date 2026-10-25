import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Clock,
  Cloud,
  Headphones,
  Network,
  Quote,
  Router,
  ShieldCheck,
  Users,
  Wifi,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import BrandImageCard from "@/components/BrandImageCard";
import CountUp from "@/components/CountUp";
import ScrollReveal from "@/components/ScrollReveal";
import Seo from "@/components/Seo";
import heroVideo from "@/assets/dernier.mp4";
import heroPoster from "@/assets/hero-bg.jpg";
import aboutPhoto from "@/assets/service-it.jpg";
import whyPhoto from "@/assets/IMG-20260607-WA0035.jpg";
import domotiquePhoto from "@/assets/service-domotique.jpg";
import { SITE_URL, ORG_ID } from "@/lib/site";
import { serviceOffers, clientTestimonials, webProjects } from "@/data/services";

// Photo existante en premier, puis 5 photos du service Internet & Connectivité
const connectivityImages = serviceOffers.find((s) => s.id === "internet")?.images ?? [];
const aboutSlides = [
  { src: aboutPhoto, alt: "Technicien ALTIS SPHERE en intervention sur une baie réseau" },
  ...[2, 1, 3, 7, 8].map((i) => connectivityImages[i]).filter(Boolean),
];

const stats = [
  { value: "10+", label: "Ans d'expérience" },
  { value: String(serviceOffers.length), label: "Domaines d'expertise" },
  { value: "24/7", label: "Support technique" },
  { value: String(webProjects.length), label: "Réalisations web" },
];

const solutionLinks = [
  { icon: Network, label: "Réseaux d'entreprise", path: "/solutions" },
  { icon: Cloud, label: "Cloud & infrastructure IT", path: "/solutions" },
  { icon: ShieldCheck, label: "Sécurité des systèmes", path: "/solutions" },
  { icon: Router, label: "Équipements réseau et informatiques", path: "/produits" },
  { icon: Headphones, label: "Support et maintenance", path: "/services#support" },
];

const reasons = [
  { icon: Clock, title: "Réactivité", desc: "Déploiement rapide et support joignable quand vous en avez besoin." },
  { icon: Award, title: "Expérience", desc: "Une équipe certifiée, plus de 10 ans dans les réseaux et l'informatique." },
  { icon: Users, title: "Proximité", desc: "Un interlocuteur dédié qui suit votre dossier de bout en bout." },
  { icon: Wrench, title: "Travail soigné", desc: "Matériel professionnel, installations propres et documentées." },
];

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[36rem] items-center overflow-hidden bg-navy lg:min-h-[44rem]">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {reduceMotion ? (
          <img src={heroPoster} alt="" className="h-full w-full object-cover" />
        ) : (
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={heroPoster} disablePictureInPicture>
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        {/* Voile bleu nuit : contraste du texte blanc garanti */}
        <div className="absolute inset-0 bg-navy/75" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--navy)/0.9),transparent_70%)]" />
      </div>
      <div className="diagonal-bands -z-10 hidden md:block" aria-hidden="true" />

      <div className="container py-20 lg:py-28">
        <div className="max-w-4xl">
          <p className="section-kicker text-sky">Services IT & connectivité · Lubumbashi</p>
          <h1 className="mt-6 text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.5rem]">
            Votre infrastructure IT entre de bonnes mains.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-white/80">
            ALTIS SPHERE GROUP conçoit, installe et maintient vos réseaux, vos accès internet (fibre, Starlink),
            votre sécurité informatique et vos sites web, en RD Congo.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/services">
                Nos services <ArrowRight size={16} />
              </Link>
            </Button>
            <QuoteRequestModal triggerVariant="on-dark" triggerSize="lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section className="py-24 lg:py-28">
    <div className="container feature-grid lg:items-center">
      <ScrollReveal className="lg:pr-6">
        <BrandImageCard
          images={aboutSlides}
          caption={<>ALTIS SPHERE<br />Votre partenaire IT</>}
          badge={{ value: "10+", label: "Ans d'expérience" }}
        />
      </ScrollReveal>

      <ScrollReveal>
        <p className="section-kicker">À propos de l'entreprise</p>
        <h2 className="section-title mt-4">Connectivité, infrastructure et sécurité informatique</h2>
        <p className="section-lead">
          ALTIS SPHERE GROUP est une entreprise de services informatiques basée à Lubumbashi. Nous accompagnons
          entreprises et particuliers, de l'accès internet au système d'information complet.
        </p>
        <p className="mt-4 text-base leading-[1.75]">
          Étude, installation, configuration puis maintenance : vous gardez un seul interlocuteur, qui connaît votre
          installation et reste joignable.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { icon: Wifi, title: "Connectivité", sub: "Fibre, Starlink, Wi-Fi" },
            { icon: ShieldCheck, title: "Sécurité & IT", sub: "Réseaux, cloud, protection" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-4 rounded-2xl border bg-card p-5">
              <span className="icon-shell h-12 w-12">
                <f.icon size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold text-foreground">{f.title}</p>
                <p className="text-sm">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="hero" size="lg" className="mt-9" asChild>
          <Link to="/a-propos">
            En savoir plus <ArrowRight size={16} />
          </Link>
        </Button>
      </ScrollReveal>
    </div>
  </section>
);

const Services = () => (
  <section className="bg-muted pb-24 pt-24 lg:pt-28">
    <div className="container">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <p className="section-kicker">Nos services</p>
        <h2 className="section-title mt-4">Des services IT complets pour votre activité</h2>
      </ScrollReveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serviceOffers.map((s, i) => (
          <ScrollReveal key={s.id} delay={(i % 3) * 0.06}>
            <article className="service-shell flex h-full flex-col">
              <span className="icon-shell">
                <s.icon size={24} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-xl">{s.title}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.7]">{s.desc}</p>
              <Link
                to={`/services#${s.id}`}
                className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-primary hover:gap-3"
                aria-label={`En savoir plus : ${s.title}`}
              >
                En savoir plus <ArrowRight size={16} />
              </Link>
            </article>
          </ScrollReveal>
        ))}
      </div>

      {/* Bandeau de chiffres clés */}
      <ScrollReveal className="mt-14">
        <dl className="grid overflow-hidden rounded-2xl bg-primary text-white shadow-[0_25px_50px_-20px_hsl(var(--primary)/0.6)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-white/15 px-6 py-9 text-center sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp value={s.value} className="block text-5xl font-bold tracking-[-0.03em]" />
                <span className="mt-2 block font-bold text-white/85">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>
    </div>
  </section>
);

const Domotique = () => (
  <section className="relative isolate overflow-hidden bg-navy py-24 text-center lg:py-32">
    <img src={domotiquePhoto} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
    <div className="absolute inset-0 -z-10 bg-navy/70" aria-hidden="true" />
    <div className="container max-w-3xl">
      <p className="section-kicker text-sky">Domotique</p>
      <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
        Votre maison intelligente, pilotée depuis votre smartphone
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-[1.75] text-white/80">
        Éclairage, climatisation, caméras, accès et véhicule connecté : nous installons et configurons l'ensemble.
      </p>
      <Button variant="hero" size="lg" className="mt-9" asChild>
        <Link to="/domotique">
          Découvrir la domotique <ArrowRight size={16} />
        </Link>
      </Button>
    </div>
  </section>
);

const Solutions = () => (
  <section className="py-24 lg:py-28">
    <div className="container feature-grid lg:items-center">
      <ScrollReveal>
        <p className="section-kicker">Solutions pour entreprises</p>
        <h2 className="section-title mt-4">Un système d'information structuré et sécurisé</h2>
        <p className="section-lead">
          Nous concevons et déployons les réseaux, l'hébergement et la sécurité de votre entreprise, puis nous en
          assurons le suivi. Chaque projet commence par une visite sur site et un diagnostic de l'existant.
        </p>
        <p className="mt-4 text-base leading-[1.75]">
          Pour les sites isolés, nous combinons fibre, Starlink et liaisons de secours afin de garantir la continuité
          de vos activités.
        </p>
        <Button variant="hero" size="lg" className="mt-9" asChild>
          <Link to="/contact">
            Parler de votre projet <ArrowRight size={16} />
          </Link>
        </Button>
      </ScrollReveal>

      <ScrollReveal>
        <p className="section-kicker">Nos solutions</p>
        <ul className="mt-5 divide-y overflow-hidden rounded-2xl border bg-card">
          {solutionLinks.map((s) => (
            <li key={s.label}>
              <Link to={s.path} className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted sm:p-5">
                <span className="icon-shell h-12 w-12">
                  <s.icon size={22} aria-hidden="true" />
                </span>
                <span className="flex-1 font-bold text-foreground">{s.label}</span>
                <ArrowRight size={18} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </div>
  </section>
);

const WhyUs = () => (
  <section className="bg-muted py-24 lg:py-28">
    <div className="container feature-grid lg:items-center">
      <ScrollReveal className="lg:pr-6">
        <BrandImageCard
          images={[{ src: whyPhoto, alt: "Soudure de fibre optique sur un chantier ALTIS SPHERE" }]}
          caption={<>Des installations<br />faites pour durer</>}
        />
      </ScrollReveal>

      <ScrollReveal>
        <p className="section-kicker">Pourquoi nous choisir</p>
        <h2 className="section-title mt-4">Un partenaire technique local, joignable et rigoureux</h2>
        <ul className="mt-8 divide-y">
          {reasons.map((r) => (
            <li key={r.title} className="flex gap-5 py-5 first:pt-0 last:pb-0">
              <span className="icon-shell">
                <r.icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg">{r.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-[1.7]">{r.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="pb-24 pt-24 lg:pt-28">
    <div className="container">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <p className="section-kicker">Références</p>
        <h2 className="section-title mt-4">Ils nous ont confié leur projet</h2>
      </ScrollReveal>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {clientTestimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.06}>
            <figure className="service-shell flex h-full flex-col">
              <Quote size={32} className="text-primary/25" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-[1.75] text-foreground/85">
                <p>{t.text}</p>
              </blockquote>
              <figcaption className="mt-7 border-t pt-5">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-foreground hover:text-primary"
                >
                  {t.name}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <p className="mt-0.5 text-sm">{t.role}</p>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ALTIS SPHERE GROUP — Services IT & connectivité internet",
  url: `${SITE_URL}/`,
  inLanguage: "fr",
  about: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
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
    <About />
    <Services />
    <Domotique />
    <Solutions />
    <WhyUs />
    <Testimonials />
  </>
);

export default Index;
