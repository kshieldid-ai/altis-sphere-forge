import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageBackground from "@/components/PageBackground";
import Seo from "@/components/Seo";
import { breadcrumb, serviceSchema } from "@/lib/seo-schemas";
import { serviceOffers } from "@/data/services";
import ServiceExpandCard from "@/components/ServiceExpandCard";
import ScrollReveal from "@/components/ScrollReveal";

const servicesJsonLd = [
  serviceSchema("Services IT & connectivité", "Fibre, Starlink, cybersécurité, développement web, équipements IT, support 24/7 et domotique.", "/services"),
  breadcrumb("Services", "/services"),
];

const ServicesPage = () => {
  const [openService, setOpenService] = useState<string | null>(null);

  return (
    <div className="relative isolate pt-24">
      <PageBackground />
      <Seo
        title="Services IT & Connectivité | ALTIS SPHERE"
        description="Fibre, Starlink, cybersécurité, développement web, équipements IT, support 24/7 et domotique — les services complets d'ALTIS SPHERE."
        path="/services"
        jsonLd={servicesJsonLd}
      />
      <section className="py-24">
        <ScrollReveal>
          <div className="container">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="section-kicker">Services</span>
              <h1 className="section-title mt-4">Nos Services</h1>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              De la connectivité internet à la cybersécurité, chaque offre s'intègre dans une expérience cohérente, maîtrisée et orientée résultats.
            </p>
          </div>

          <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
            {serviceOffers.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ServiceExpandCard
                  service={s}
                  open={openService === s.id}
                  onOpenChange={(next) => setOpenService(next ? s.id : null)}
                />
              </motion.div>
            ))}
          </div>

          <nav aria-label="Pages clés" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link to="/solutions" className="text-primary underline-offset-4 hover:underline">Voir nos solutions pour entreprises</Link>
            <Link to="/produits" className="text-primary underline-offset-4 hover:underline">Parcourir nos équipements réseau</Link>
            <Link to="/domotique" className="text-primary underline-offset-4 hover:underline">Explorer la domotique et la maison intelligente</Link>
          </nav>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default ServicesPage;
