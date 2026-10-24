import { Link } from "react-router-dom";
import { Target, Eye, Lightbulb, ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { breadcrumb, webPage } from "@/lib/seo-schemas";

const pillars = [
  { icon: Target, title: "Mission", desc: "Fournir des solutions IT et de connectivité performantes, accessibles et sécurisées à tous." },
  { icon: Eye, title: "Vision", desc: "Devenir le partenaire technologique de référence, en connectant chaque entreprise au monde numérique." },
  { icon: Lightbulb, title: "Expertise", desc: "Une équipe certifiée avec plus de 10 ans d'expérience dans les technologies de l'information et les réseaux." },
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
    <PageHeader
      crumb="À propos"
      title="Qui sommes-nous ?"
      lead="ALTIS SPHERE GROUP est une entreprise de services informatiques et de connectivité internet basée à Lubumbashi."
    />

    <section className="py-16 lg:py-20">
      <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <ScrollReveal className="max-w-2xl space-y-5 text-base leading-8 text-foreground/90">
          <p>
            Nous accompagnons les particuliers et les entreprises dans leur transformation numérique avec des solutions
            sur mesure, fiables et durables : accès internet par fibre ou Starlink, réseaux d'entreprise, sécurité
            informatique, développement web et domotique.
          </p>
          <p>
            Nos équipes interviennent de l'étude au déploiement, puis assurent la maintenance. Vous gardez un seul
            interlocuteur, qui connaît votre installation.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <aside className="editorial-panel bg-muted">
            <h2 className="text-base font-semibold">Nous trouver</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Adresse</dt>
                <dd className="mt-0.5">110, Av. Biayi, Kalubwe, Lubumbashi, RD Congo</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Téléphone</dt>
                <dd className="mt-0.5"><a href="tel:+243998914448" className="hover:text-primary">+243 998 914 448</a></dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="mt-0.5"><a href="mailto:support@altisphere-group.com" className="hover:text-primary">support@altisphere-group.com</a></dd>
              </div>
            </dl>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Nous contacter <ArrowRight size={16} />
            </Link>
          </aside>
        </ScrollReveal>
      </div>

      <div className="container mt-16 grid gap-6 md:grid-cols-3">
        {pillars.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.05}>
            <div className="service-shell h-full">
              <span className="icon-shell">
                <item.icon size={20} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  </>
);

export default About;
