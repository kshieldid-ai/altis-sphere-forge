import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import { Check, Clock, Award, Users, Wrench, ArrowRight, ArrowUpRight, House, Phone } from "lucide-react";
import heroVideo from "@/assets/dernier.mp4";
import heroPoster from "@/assets/hero-bg.jpg";
import serviceDomotique from "@/assets/service-domotique.jpg";
import Seo from "@/components/Seo";
import { SITE_URL, ORG_ID } from "@/lib/site";
import { serviceOffers, clientTestimonials } from "@/data/services";
import ServiceProjects from "@/components/ServiceProjects";
import ScrollReveal from "@/components/ScrollReveal";

const featuredDomotique = {
  icon: House,
  title: "Domotique / Maison intelligente",
  image: serviceDomotique,
  items: ["Éclairage intelligent", "Sécurité connectée", "Gestion du climat", "Pilotage centralisé"],
};

const reasons = [
  { icon: Clock, title: "Réactivité", desc: "Déploiement rapide et support joignable quand vous en avez besoin." },
  { icon: Award, title: "Expérience", desc: "Une équipe certifiée, plus de 10 ans dans les réseaux et l'informatique." },
  { icon: Users, title: "Proximité", desc: "Un interlocuteur dédié qui suit votre dossier de bout en bout." },
  { icon: Wrench, title: "Travail soigné", desc: "Matériel professionnel, installations propres et documentées." },
];

const heroDomains = [
  { label: "Fibre optique & Starlink", href: "/services#internet" },
  { label: "Réseaux & infrastructure IT", href: "/services#it" },
  { label: "Cybersécurité", href: "/services#cyber" },
  { label: "Développement web", href: "/services#web" },
  { label: "Domotique", href: "/domotique" },
];

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-navy pt-16 text-white lg:pt-[4.5rem]">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {reduceMotion ? (
          <img src={heroPoster} alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroPoster}
            disablePictureInPicture
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        {/* Voile uni : garantit le contraste du texte blanc */}
        <div className="absolute inset-0 bg-navy/80" />
      </div>

      <div className="container grid gap-12 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center lg:py-32">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-white/75">Lubumbashi · République démocratique du Congo</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            Services informatiques et connectivité internet pour les entreprises.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
            ALTIS SPHERE GROUP conçoit, installe et maintient vos réseaux, vos accès internet (fibre, Starlink),
            votre sécurité informatique et vos sites web, pour les professionnels comme pour les particuliers.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <QuoteRequestModal triggerVariant="hero" triggerSize="lg" triggerClassName="bg-white text-primary hover:bg-white/90" />
            <Button variant="on-dark" size="lg" asChild>
              <Link to="/services">Voir nos services</Link>
            </Button>
          </div>
        </div>

        <nav aria-label="Nos domaines" className="hidden border-l border-white/25 pl-8 lg:block">
          <p className="text-sm font-semibold text-white">Nos domaines</p>
          <ul className="mt-4 space-y-1">
            {heroDomains.map((d) => (
              <li key={d.href}>
                <Link to={d.href} className="group flex items-center justify-between py-2 text-[0.9375rem] text-white/80 hover:text-white">
                  {d.label}
                  <ArrowRight size={16} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

const ServiceGallery = ({ images }: { images: { src: string; alt: string }[] }) => {
  const reduceMotion = useReducedMotion();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <Carousel opts={{ align: "start", duration: reduceMotion ? 0 : 28 }} setApi={setApi} className="w-full">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.src}>
            <div className="h-60 overflow-hidden md:h-72">
              <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 z-10 h-9 w-9 rounded-md border bg-background text-foreground hover:bg-secondary" />
      <CarouselNext className="right-3 z-10 h-9 w-9 rounded-md border bg-background text-foreground hover:bg-secondary" />
      <p className="absolute bottom-3 right-3 rounded bg-navy/80 px-2 py-0.5 text-xs tabular-nums text-white">
        {current + 1} / {images.length}
      </p>
    </Carousel>
  );
};

const CheckList = ({ items }: { items: string[] }) => (
  <ul className="mt-5 space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
        <Check size={16} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Services = () => (
  <section className="py-20 lg:py-24">
    <div className="container">
      <ScrollReveal className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Nos services</p>
          <h2 className="section-title mt-3">Ce que nous faisons</h2>
          <p className="section-lead">
            Connectivité, infrastructure, sécurité, web et support : un seul prestataire pour l'ensemble de votre système d'information.
          </p>
        </div>
        <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          Tous les services <ArrowRight size={16} />
        </Link>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-2">
        {serviceOffers.map((s) => (
          <ScrollReveal key={s.id}>
            <article id={s.id} className="h-full scroll-mt-24 overflow-hidden rounded-lg border bg-card shadow-sm">
              {s.images.length > 3 ? (
                <div className="relative">
                  <ServiceGallery images={s.images} />
                </div>
              ) : (
                <div className={s.images.length > 1 ? "grid grid-cols-2 gap-px bg-border" : ""}>
                  {s.images.map((image, index) => {
                    const isHero = s.images.length === 3 && index === 0;
                    return (
                      <div key={image.src} className={isHero ? "col-span-2 h-52 overflow-hidden" : "h-44 overflow-hidden"}>
                        <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover" />
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="p-6 lg:p-7">
                <div className="flex items-center gap-3">
                  <span className="icon-shell h-10 w-10">
                    <s.icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{s.subtitle}</p>
                <CheckList items={s.items} />
                {s.projects ? <ServiceProjects projects={s.projects} /> : null}
              </div>
            </article>
          </ScrollReveal>
        ))}

        <ScrollReveal className="md:col-span-2">
          <article className="grid overflow-hidden rounded-lg border bg-card shadow-sm lg:grid-cols-2">
            <div className="h-64 lg:h-full">
              <img src={featuredDomotique.image} alt={featuredDomotique.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3">
                <span className="icon-shell h-10 w-10">
                  <featuredDomotique.icon size={20} aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold">{featuredDomotique.title}</h3>
              </div>
              <CheckList items={featuredDomotique.items} />
              <Link to="/domotique" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Découvrir la domotique <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const WhyUs = () => (
  <section className="border-y bg-muted py-20 lg:py-24">
    <div className="container feature-grid lg:items-center">
      <ScrollReveal className="max-w-xl">
        <p className="section-kicker">Pourquoi nous choisir</p>
        <h2 className="section-title mt-3">Un partenaire technique local, joignable et rigoureux.</h2>
        <p className="section-lead">
          Nous intervenons de l'étude à la maintenance, avec le même interlocuteur. Chaque installation est
          dimensionnée pour durer et documentée pour vos équipes.
        </p>
      </ScrollReveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {reasons.map((r, i) => (
          <ScrollReveal key={r.title} delay={i * 0.05}>
            <div className="h-full rounded-lg border bg-card p-6">
              <span className="icon-shell">
                <r.icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{r.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-20 lg:py-24">
    <div className="container">
      <ScrollReveal className="mb-12 max-w-2xl">
        <p className="section-kicker">Références</p>
        <h2 className="section-title mt-3">Ils nous ont confié leur projet</h2>
      </ScrollReveal>
      <div className="grid gap-6 lg:grid-cols-3">
        {clientTestimonials.map((t) => (
          <ScrollReveal key={t.name}>
            <figure className="flex h-full flex-col rounded-lg border bg-card p-7">
              <blockquote className="flex-1 text-[0.9375rem] leading-7 text-foreground/90">
                <p>« {t.text} »</p>
              </blockquote>
              <figcaption className="mt-6 border-t pt-5">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary"
                >
                  {t.name}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="bg-primary text-primary-foreground">
    <div className="container flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Un projet réseau, internet ou web ?</h2>
        <p className="mt-3 text-base leading-7 text-white/85">
          Décrivez-nous votre besoin : nous revenons vers vous avec un diagnostic et un devis détaillé, sans engagement.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg" asChild className="bg-white font-semibold text-primary hover:bg-white/90">
          <Link to="/contact">Nous contacter</Link>
        </Button>
        <Button variant="on-dark" size="lg" asChild>
          <a href="tel:+243998914448">
            <Phone size={16} /> +243 998 914 448
          </a>
        </Button>
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
    <Services />
    <WhyUs />
    <Testimonials />
    <CTA />
  </>
);

export default Index;
