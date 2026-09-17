import PageBackground from "@/components/PageBackground";
import { motion } from "framer-motion";
import { House } from "lucide-react";
import serviceDomotique from "@/assets/service-domotique.jpg";
import Seo from "@/components/Seo";
import { breadcrumb, serviceSchema } from "@/lib/seo-schemas";
import { serviceOffers } from "@/data/services";
import ServiceProjects from "@/components/ServiceProjects";

const featuredDomotique = {
  icon: House,
  title: "Domotique / Maison intelligente",
  image: serviceDomotique,
  items: ["Éclairage intelligent", "Sécurité connectée", "Gestion du climat", "Pilotage centralisé"],
};


const servicesJsonLd = [
  serviceSchema("Services IT & connectivité", "Fibre, Starlink, cybersécurité, développement web, équipements IT, support 24/7 et domotique.", "/services"),
  breadcrumb("Services", "/services"),
];

const ServicesPage = () => (
  <div className="relative isolate pt-24">
      <PageBackground />
    <Seo
      title="Services IT & Connectivité | ALTIS SPHERE"
      description="Fibre, Starlink, cybersécurité, développement web, équipements IT, support 24/7 et domotique — les services complets d'ALTIS SPHERE."
      path="/services"
      jsonLd={servicesJsonLd}
    />
    <section className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="section-kicker">Services</span>
            <h1 className="section-title mt-4">Nos Services</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Une gamme complète de services informatiques et de connectivité pour répondre à tous vos besoins.
            </p>
          </div>
          <div className="editorial-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Signature</p>
            <p className="mt-3 text-lg leading-8 text-foreground/90">Une mise en page plus affirmée, plus luxueuse et plus équilibrée, sans retirer le moindre service.</p>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {serviceOffers.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="overflow-hidden rounded-none border border-border/70 bg-card/78"
            >
              <div className={s.images.length > 1 ? "grid grid-cols-2" : ""}>
                {s.images.map((image, index) => (
                  <div
                    key={image.src}
                    className={s.images.length === 3 && index === 0 ? "col-span-2 h-52 overflow-hidden" : "h-44 overflow-hidden"}
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="p-6 lg:p-7">
                <div className="icon-shell h-11 w-11 rounded-2xl">
                  <s.icon size={20} className="text-primary-foreground" />
                </div>
                <h2 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">{s.title}</h2>
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
            className="overflow-hidden rounded-none border border-border/70 bg-card/78 md:col-span-2"
          >
            <div className="grid xl:grid-cols-[1.15fr_0.85fr]">
              <div className="h-64 xl:h-full">
                <img src={featuredDomotique.image} alt={featuredDomotique.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-6 lg:p-7">
                <div className="icon-shell h-11 w-11 rounded-2xl">
                  <featuredDomotique.icon size={20} className="text-primary-foreground" />
                </div>
                <h2 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">{featuredDomotique.title}</h2>
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
    </section>
  </div>
);

export default ServicesPage;
