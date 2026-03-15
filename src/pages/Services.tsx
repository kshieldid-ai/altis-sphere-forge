import { motion } from "framer-motion";
import { Wifi, Server, Shield, Code, Headphones, Monitor } from "lucide-react";
import serviceInternet from "@/assets/service-internet.jpg";
import serviceIt from "@/assets/service-it.jpg";
import serviceCyber from "@/assets/service-cybersecurity.jpg";
import serviceDev from "@/assets/service-dev.jpg";
import serviceSupport from "@/assets/service-support.jpg";
import serviceEquipements from "@/assets/service-equipements.jpg";

const servicesList = [
  { icon: Wifi, title: "Internet & Connectivité", image: serviceInternet, items: ["Installation fibre optique", "Solutions Starlink", "Connexion haut débit entreprise", "Réseau Wi-Fi professionnel"] },
  { icon: Server, title: "Solutions IT pour entreprises", image: serviceIt, items: ["Infrastructure réseau", "Cloud computing", "Serveurs dédiés et mutualisés", "Virtualisation"] },
  { icon: Shield, title: "Cybersécurité", image: serviceCyber, items: ["Audit de sécurité", "Pare-feu et antivirus", "Protection des données", "Formation sécurité"] },
  { icon: Code, title: "Développement Web & Applications", image: serviceDev, items: ["Sites web sur mesure", "Applications métier", "E-commerce", "Applications mobiles"] },
  { icon: Headphones, title: "Support & Maintenance", image: serviceSupport, items: ["Support technique 24/7", "Maintenance préventive", "Infogérance", "Dépannage informatique"] },
  { icon: Monitor, title: "Équipements informatiques", image: serviceEquipements, items: ["Routeurs & switches", "Antennes et matériel réseau", "Serveurs", "Postes de travail"] },
];

const ServicesPage = () => (
  <div className="pt-20">
    <section className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Services</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold mt-3 mb-4">Nos Services</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Une gamme complète de services informatiques et de connectivité pour répondre à tous vos besoins.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-card border border-border hover:border-primary/40 transition-colors overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4">
                  <s.icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
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
