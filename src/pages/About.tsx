import { motion } from "framer-motion";
import { Target, Eye, Lightbulb } from "lucide-react";
import Seo from "@/components/Seo";
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
  <div className="pt-24">
    <Seo
      title="À propos d'ALTIS SPHERE | Mission, vision et expertise IT"
      description="Découvrez ALTIS SPHERE : notre mission, notre vision et notre expertise en services IT et connectivité internet en RD Congo."
      path="/a-propos"
      jsonLd={aboutJsonLd}
    />
    <section className="py-24">
      <div className="container space-y-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <span className="section-kicker">À propos</span>
            <h1 className="section-title mt-4">Qui est <span className="gradient-text">ALTIS SPHERE</span> ?</h1>
            <p className="mt-6 text-base leading-8 text-foreground/78">
              ALTIS SPHERE est une entreprise spécialisée dans les services informatiques et les solutions de connectivité internet.
              Nous accompagnons les particuliers et les entreprises dans leur transformation numérique avec des solutions sur mesure,
              fiables et innovantes.
            </p>
          </div>
          <div className="editorial-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Positionnement</p>
            <p className="mt-3 text-lg leading-8 text-foreground/82">
              Une présence technique crédible, portée par une esthétique exigeante et un accompagnement concret.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="service-shell"
            >
              <div className="icon-shell h-12 w-12 rounded-2xl">
                <item.icon size={20} className="text-primary-foreground" />
              </div>
              <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
