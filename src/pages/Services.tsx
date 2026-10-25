import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceExpandCard from "@/components/ServiceExpandCard";
import { breadcrumb, serviceSchema } from "@/lib/seo-schemas";
import { serviceOffers } from "@/data/services";

const servicesJsonLd = [
  serviceSchema("Services IT & connectivité", "Fibre, Starlink, cybersécurité, développement web, équipements IT, support 24/7 et domotique.", "/services"),
  breadcrumb("Services", "/services"),
];

const relatedLinks = [
  { label: "Solutions pour entreprises", path: "/solutions" },
  { label: "Équipements réseau", path: "/produits" },
  { label: "Domotique et maison intelligente", path: "/domotique" },
];

const ServicesPage = () => {
  const [openService, setOpenService] = useState<string | null>(null);

  return (
    <>
      <Seo
        title="Services IT & Connectivité | ALTIS SPHERE"
        description="Fibre, Starlink, cybersécurité, développement web, équipements IT, support 24/7 et domotique — les services complets d'ALTIS SPHERE."
        path="/services"
        jsonLd={servicesJsonLd}
      />
      <PageHeader
        crumb="Services"
        title="Nos services"
        lead="De la connectivité internet à la cybersécurité, chaque prestation est réalisée par nos équipes, de l'étude à la maintenance."
      />

      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceOffers.map((s) => (
              <ScrollReveal key={s.id}>
                <ServiceExpandCard
                  service={s}
                  open={openService === s.id}
                  onOpenChange={(next) => setOpenService(next ? s.id : null)}
                />
              </ScrollReveal>
            ))}
          </div>

          <nav aria-label="Pages associées" className="mt-12 border-t pt-8">
            <p className="text-sm font-bold">Voir aussi</p>
            <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {relatedLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
                    {l.label} <ArrowRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
