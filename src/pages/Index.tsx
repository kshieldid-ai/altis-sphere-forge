import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import HeroPingPongVideo from "@/components/HeroPingPongVideo";
import { Star, Zap, Users, Award, ArrowUpRight, House } from "lucide-react";
import heroVideo from "@/assets/dernier.mp4";
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
  { icon: Zap, title: "Rapidité", desc: "Déploiement rapide et support réactif." },
  { icon: Award, title: "Expertise", desc: "Équipe certifiée avec +10 ans d'expérience." },
  { icon: Users, title: "Proximité", desc: "Un interlocuteur dédié pour chaque client." },
  { icon: Star, title: "Qualité", desc: "Solutions premium et garantie de satisfaction." },
];

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[32rem] flex-col overflow-hidden pt-28 md:min-h-[42rem] md:pt-32 lg:min-h-[100svh]">
      <div className="absolute inset-0" aria-hidden="true">
        <HeroPingPongVideo src={heroVideo} reduceMotion={!!reduceMotion} />
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,hsl(var(--background)/0.88)_0%,hsl(var(--background)/0.55)_44%,hsl(var(--background)/0.30)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.15),transparent_35%),radial-gradient(circle_at_82%_18%,hsl(var(--accent)/0.10),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/0.30)_0%,transparent_28%,hsl(var(--background)/0.65)_84%,hsl(var(--background)))]" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      <div className="container relative z-10 flex flex-1 flex-col justify-center pb-20 pt-8 md:pb-28">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.35fr)_22rem] xl:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="inline-flex rounded-full border border-foreground/[0.12] bg-foreground/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary backdrop-blur-xl">
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
                <div key={label} className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.04] p-4">
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
    <Carousel
      opts={{ align: "start", duration: reduceMotion ? 0 : 28 }}
      setApi={setApi}
      className="w-full"
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.src}>
            <div className="h-64 overflow-hidden md:h-80">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 z-10 h-9 w-9 border-foreground/20 bg-background/80 text-foreground backdrop-blur hover:bg-background" />
      <CarouselNext className="right-3 z-10 h-9 w-9 border-foreground/20 bg-background/80 text-foreground backdrop-blur hover:bg-background" />
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Aller à l’image ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              current === index ? "w-6 bg-primary" : "w-1.5 bg-foreground/25 hover:bg-foreground/40",
            )}
          />
        ))}
      </div>
    </Carousel>
  );
};

const Services = () => (
  <section className="py-24">
    <ScrollReveal>
      <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <span className="section-kicker">Nos Services</span>
          <h2 className="section-title mt-4">Un écosystème de services pensé comme une signature de marque.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Une gamme complète de services informatiques et de connectivité pour répondre à tous vos besoins.
          </p>
        </div>
        <div className="editorial-panel">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Signature</p>
          <p className="mt-3 text-lg leading-8 text-foreground/90">Des services pensés pour la performance, la sécurité et la continuité de vos activités.</p>
        </div>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2">
        {serviceOffers.map((s, i) => (
          <motion.article
            key={s.id}
            id={s.id}
            scroll-mt-24
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="overflow-hidden rounded-none border border-foreground/[0.08] bg-foreground/[0.04]"
          >
            {s.images.length > 3 ? (
              <ServiceGallery images={s.images} />
            ) : (
              <div className={s.images.length > 1 ? "grid grid-cols-2" : ""}>
                {s.images.map((image, index) => {
                  const isHero = s.images.length === 3 && index === 0;
                  return (
                    <div
                      key={image.src}
                      className={isHero ? "col-span-2 h-52 overflow-hidden" : "h-44 overflow-hidden"}
                    >
                      <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                  );
                })}
              </div>
            )}
            <div className="p-6 lg:p-7">
              <div className="icon-shell h-11 w-11 rounded-2xl">
                <s.icon size={20} className="text-primary-foreground" />
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">{s.title}</h3>
              <p className="mt-3 text-sm font-medium text-primary">{s.subtitle}</p>
              <ul className="mt-5 space-y-2.5">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {s.projects ? <ServiceProjects projects={s.projects} /> : null}
            </div>
          </motion.article>
        ))}

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-none border border-foreground/[0.08] bg-foreground/[0.04] md:col-span-2"
        >
          <div className="grid xl:grid-cols-[1.15fr_0.85fr]">
            <div className="h-64 xl:h-full">
              <img src={featuredDomotique.image} alt={featuredDomotique.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-6 lg:p-7">
              <div className="icon-shell h-11 w-11 rounded-2xl">
                <featuredDomotique.icon size={20} className="text-primary-foreground" />
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">{featuredDomotique.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {featuredDomotique.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>
      </div>
      </div>
    </ScrollReveal>
  </section>
);

const WhyUs = () => (
  <section className="py-24">
    <ScrollReveal>
      <div className="container">
      <div className="feature-grid rounded-none border border-foreground/[0.08] bg-foreground/[0.04] p-8 backdrop-blur-xl lg:p-10">
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
              className="rounded-3xl border border-foreground/[0.08] bg-foreground/[0.03] p-6"
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
    </ScrollReveal>
  </section>
);

const Testimonials = () => (
  <section className="py-24">
    <ScrollReveal>
      <div className="container">
      <div className="mb-12 max-w-2xl">
        <span className="section-kicker">Témoignages</span>
        <h2 className="section-title mt-4">Des retours clients qui confirment la promesse.</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {clientTestimonials.map((t, i) => (
          <motion.article
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-none border border-foreground/[0.08] bg-foreground/[0.04] p-7 backdrop-blur-xl"
          >
            <div className="flex gap-1 text-primary">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-foreground/90">“{t.text}”</p>
            <div className="mt-8 border-t border-foreground/[0.08] pt-5">
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
              >
                {t.name}
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.role}</p>
            </div>
          </motion.article>
        ))}
      </div>
      </div>
    </ScrollReveal>
  </section>
);

const CTA = () => (
  <section className="pb-24 pt-12">
    <ScrollReveal>
      <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-none border border-foreground/[0.12] bg-[linear-gradient(135deg,hsl(var(--primary)/0.15),hsl(var(--accent)/0.06),hsl(var(--background)/0.90))] p-10 md:p-14"
      >
        <div className="absolute inset-0 grid-pattern opacity-10" />
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
    </ScrollReveal>
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
