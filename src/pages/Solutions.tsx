import { Network, Cloud, ShieldCheck } from "lucide-react";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { breadcrumb, serviceSchema } from "@/lib/seo-schemas";

const solutions = [
  { icon: Network, title: "Réseaux d'entreprise", desc: "Conception, déploiement et gestion de réseaux d'entreprise performants et sécurisés. LAN, WAN, VPN, SD-WAN." },
  { icon: Cloud, title: "Cloud & infrastructure IT", desc: "Migration cloud, hébergement, infrastructure as a service. Solutions Azure, AWS et cloud privé." },
  { icon: ShieldCheck, title: "Sécurité des systèmes", desc: "Audit, monitoring, SOC managé, conformité RGPD. Protection complète de votre système d'information." },
];

const steps = [
  { title: "Diagnostic", desc: "Visite sur site et analyse de l'existant." },
  { title: "Proposition", desc: "Architecture, matériel et chiffrage détaillé." },
  { title: "Déploiement", desc: "Installation, configuration et tests." },
  { title: "Suivi", desc: "Maintenance, supervision et assistance." },
];

const solutionsJsonLd = [
  serviceSchema("Solutions IT pour entreprises", "Réseaux d'entreprise, cloud & infrastructure, sécurité des systèmes.", "/solutions"),
  breadcrumb("Solutions", "/solutions"),
];

const Solutions = () => (
  <>
    <Seo
      title="Solutions IT pour entreprises | ALTIS SPHERE"
      description="Réseaux d'entreprise, cloud & infrastructure, sécurité des systèmes — des solutions IT complètes pour la transformation numérique."
      path="/solutions"
      jsonLd={solutionsJsonLd}
    />
    <PageHeader
      crumb="Solutions"
      title="Solutions pour entreprises"
      lead="Des projets complets pour structurer, héberger et sécuriser le système d'information de votre entreprise."
    />

    <section className="py-20 lg:py-24">
      <div className="container grid gap-6 md:grid-cols-3">
        {solutions.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.05}>
            <div className="service-shell h-full">
              <span className="icon-shell">
                <s.icon size={24} aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-xl font-bold">{s.title}</h2>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>

    <section className="border-t bg-muted py-20 lg:py-24">
      <div className="container">
        <p className="section-kicker">Méthode</p>
        <h2 className="section-title mt-3">Comment nous travaillons</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-primary pt-5">
              <span className="text-sm font-bold tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </>
);

export default Solutions;
