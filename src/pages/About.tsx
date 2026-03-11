import { motion } from "framer-motion";
import { Target, Eye, Lightbulb } from "lucide-react";

const About = () => (
  <div className="pt-20">
    <section className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">À propos</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold mt-3 mb-6">
            Qui est <span className="gradient-text">ALTIS SPHERE</span> ?
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            ALTIS SPHERE est une entreprise spécialisée dans les services informatiques et les solutions de connectivité internet. 
            Nous accompagnons les particuliers et les entreprises dans leur transformation numérique avec des solutions sur mesure, 
            fiables et innovantes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Target, title: "Mission", desc: "Fournir des solutions IT et de connectivité performantes, accessibles et sécurisées à tous." },
            { icon: Eye, title: "Vision", desc: "Devenir le partenaire technologique de référence, en connectant chaque entreprise au monde numérique." },
            { icon: Lightbulb, title: "Expertise", desc: "Une équipe certifiée avec plus de 10 ans d'expérience dans les technologies de l'information et les réseaux." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-xl bg-card border border-border text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
