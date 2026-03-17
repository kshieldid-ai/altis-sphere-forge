import { motion } from "framer-motion";
import { Wifi, Server, Shield, Code, Headphones, Monitor, House } from "lucide-react";
import serviceInternet from "@/assets/service-internet.jpg";
import serviceIt from "@/assets/service-it.jpg";
import serviceCyber from "@/assets/service-cybersecurity.jpg";
import serviceDev from "@/assets/service-dev.jpg";
import serviceSupport from "@/assets/service-support.jpg";
import serviceEquipements from "@/assets/service-equipements.jpg";
import serviceDomotique from "@/assets/service-domotique.jpg";

const servicesList = [
  { icon: Wifi, title: "Internet & Connectivité", image: serviceInternet, items: ["Installation fibre optique", "Solutions Starlink", "Connexion haut débit entreprise", "Réseau Wi-Fi professionnel"] },
  { icon: Server, title: "Solutions IT pour entreprises", image: serviceIt, items: ["Infrastructure réseau", "Cloud computing", "Serveurs dédiés et mutualisés", "Virtualisation"] },
  { icon: Shield, title: "Cybersécurité", image: serviceCyber, items: ["Audit de sécurité", "Pare-feu et antivirus", "Protection des données", "Formation sécurité"] },
  { icon: Code, title: "Développement Web & Applications", image: serviceDev, items: ["Sites web sur mesure", "Applications métier", "E-commerce", "Applications mobiles"] },
  { icon: Headphones, title: "Support & Maintenance", image: serviceSupport, items: ["Support technique 24/7", "Maintenance préventive", "Infogérance", "Dépannage informatique"] },
  { icon: Monitor, title: "Équipements informatiques", image: serviceEquipements, items: ["Routeurs & switches", "Antennes et matériel réseau", "Serveurs", "Postes de travail"] },
  { icon: House, title: "Domotique / Maison intelligente", image: serviceDomotique, items: ["Éclairage intelligent", "Sécurité connectée", "Gestion du climat", "Pilotage centralisé"] },
];

const ServicesPage = () => (
  <div className="pt-20">
    <section className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Services</span>
          <h1 className="mt-3 mb-4 text-4xl font-bold lg:text-5xl">Nos Services</h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Une gamme complète de services informatiques et de connectivité pour répondre à tous vos besoins.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {servicesList.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-lg gradient-bg">
                  <s.icon size={20} className="text-primary-foreground" />
                </div>
                <h3 className="mb-3 text-base font-semibold leading-snug">{s.title}</h3>
                <ul className="space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ServicesPage;
