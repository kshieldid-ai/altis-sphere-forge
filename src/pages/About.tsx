import { Link } from "react-router-dom";
import { Target, Eye, Lightbulb, ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import BrandImageCard from "@/components/BrandImageCard";
import { Button } from "@/components/ui/button";
import aboutPhoto from "@/assets/IMG-20260627-WA0116.jpg";
import { breadcrumb, webPage } from "@/lib/seo-schemas";

const pillars = [
  { icon: Target, title: "Mission", desc: "Fournir des solutions IT et de connectivité performantes, accessibles et sécurisées à tous." },
  { icon: Eye, title: "Vision", desc: "Devenir le partenaire technologique de référence, en connectant chaque entreprise au monde numérique." },
  { icon: Lightbulb, title: "Expertise", desc: "Une équipe certifiée avec plus de 10 ans d'expérience dans les technologies de l'information et les réseaux." },
];

const contactFacts = [
  { icon: MapPin, label: "110, Av. Biayi, Kalubwe, Lubumbashi, RD Congo" },
  { icon: Phone, label: "+243 998 914 448", href: "tel:+243998914448" },
  { icon: Mail, label: "support@altisphere-group.com", href: "mailto:support@altisphere-group.com" },
];

const aboutJsonLd = [
  webPage("À propos d'ALTIS SPHERE GROUP", "/a-propos", "Mission, vision et expertise IT d'ALTIS SPHERE GROUP en RD Congo."),
  breadcrumb("À propos", "/a-propos"),
];

const About = () => (
  <>
    <Seo
      title="À propos d'ALTIS SPHERE | Mission, vision et expertise IT"
      description="Découvrez ALTIS SPHERE : notre mission, notre vision et notre expertise en services IT et connectivité internet en RD Congo."
      path="/a-propos"
      jsonLd={aboutJsonLd}
    />
    <PageHeader crumb="À propos" title="Qui sommes-nous ?" />

    <section className="py-24 lg:py-28">
      <div className="container feature-grid lg:items-center">
        <ScrollReveal className="lg:pr-6">
          <BrandImageCard
            images={[{ src: aboutPhoto, alt: "Préparation d'un manchon de fibre optique sur un chantier ALTIS SPHERE" }]}
            caption={<>ALTIS SPHERE<br />Votre partenaire IT</>}
            badge={{ value: "10+", label: "Ans d'expérience" }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <p className="section-kicker">À propos de l'entreprise</p>
          <h2 className="section-title mt-4">Services informatiques et connectivité internet</h2>
          <p className="section-lead">
            ALTIS SPHERE GROUP est une entreprise de services informatiques basée à Lubumbashi. Nous accompagnons les
            particuliers et les entreprises avec des solutions sur mesure, fiables et durables : accès internet par fibre
            ou Starlink, réseaux d'entreprise, sécurité informatique, développement web et domotique.
          </p>
          <p className="mt-4 text-base leading-[1.75]">
            Nos équipes interviennent de l'étude au déploiement, puis assurent la maintenance. Vous gardez un seul
            interlocuteur, qui connaît votre installation.
          </p>

          <ul className="mt-8 space-y-3">
            {contactFacts.map((f) => (
              <li key={f.label} className="flex items-center gap-3.5">
                <span className="icon-shell h-10 w-10 rounded-[0.625rem]">
                  <f.icon size={18} aria-hidden="true" />
                </span>
                {f.href ? (
                  <a href={f.href} className="font-medium text-foreground hover:text-primary">{f.label}</a>
                ) : (
                  <span className="font-medium text-foreground">{f.label}</span>
                )}
              </li>
            ))}
          </ul>

          <Button variant="hero" size="lg" className="mt-9" asChild>
            <Link to="/contact">
              Nous contacter <ArrowRight size={16} />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>

    <section className="bg-muted py-24 lg:py-28">
      <div className="container">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Nos valeurs</p>
          <h2 className="section-title mt-4">Ce qui guide notre travail</h2>
        </ScrollReveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.06}>
              <div className="service-shell h-full">
                <span className="icon-shell">
                  <item.icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7]">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
