import PageBackground from "@/components/PageBackground";
import { motion } from "framer-motion";
import { Wifi, Server, Shield, Code, Headphones, Monitor, House } from "lucide-react";
import serviceInternet from "@/assets/service-internet.jpg";
import serviceIt from "@/assets/service-it.jpg";
import serviceCyber from "@/assets/service-cybersecurity.jpg";
import serviceDev from "@/assets/service-dev.jpg";
import serviceSupport from "@/assets/service-support.jpg";
import serviceEquipements from "@/assets/service-equipements.jpg";
import serviceDomotique from "@/assets/service-domotique.jpg";
import Seo from "@/components/Seo";
import { breadcrumb, serviceSchema } from "@/lib/seo-schemas";

const servicesList = [
  { icon: Wifi, title: "Internet & Connectivité", image: serviceInternet, items: ["Installation fibre optique", "Solutions Starlink", "Connexion haut débit entreprise", "Réseau Wi-Fi professionnel"] },
  { icon: Server, title: "Solutions IT pour entreprises", image: serviceIt, items: ["Infrastructure réseau", "Cloud computing", "Serveurs dédiés et mutualisés", "Virtualisation"] },
  { icon: Shield, title: "Cybersécurité", image: serviceCyber, items: ["Audit de sécurité", "Pare-feu et antivirus", "Protection des données", "Formation sécurité"] },
  { icon: Code, title: "Développement Web & Applications", image: serviceDev, items: ["Sites web sur mesure", "Applications métier", "E-commerce", "Applications mobiles"] },
  { icon: Headphones, title: "Support & Maintenance", image: serviceSupport, items: ["Support technique 24/7", "Maintenance préventive", "Infogérance", "Dépannage informatique"] },
  { icon: Monitor, title: "Équipements informatiques", image: serviceEquipements, items: ["Routeurs & switches", "Antennes et matériel réseau", "Serveurs", "Postes de travail"] },
  { icon: House, title: "Domotique / Maison intelligente", image: serviceDomotique, items: ["Éclairage intelligent", "Sécurité connectée", "Gestion du climat", "Pilotage centralisé"], featured: true },
];


const servicesJsonLd = [
  serviceSchema("Services IT & connectivité", "Fibre, Starlink, cybersécurité, développement web, équipements IT, support 24/7 et domotique.", "/services"),
  breadcrumb("Services", "/services"),
];

const ServicesPage = () => (
  <div className="pt-24">
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

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {servicesList.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={[
                "overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/78 transition-transform duration-300 hover:-translate-y-1",
                s.featured ? "md:col-span-2 xl:col-span-4" : "",
              ].join(" ")}
            >
              <div className={s.featured ? "grid xl:grid-cols-[1.15fr_0.85fr]" : ""}>
                <div className={s.featured ? "h-64 xl:h-full" : "h-48 overflow-hidden"}>
                  <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6 lg:p-7">
                  <div className="icon-shell h-11 w-11 rounded-2xl">
                    <s.icon size={20} className="text-primary-foreground" />
                  </div>
                  <h2 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">{s.title}</h2>
                  <ul className="mt-5 space-y-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                        <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ServicesPage;
