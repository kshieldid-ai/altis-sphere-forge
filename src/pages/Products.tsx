import { motion } from "framer-motion";
import { Router, Antenna, HardDrive, Monitor } from "lucide-react";

const products = [
  { icon: Router, category: "Équipements réseau", items: ["Routeurs professionnels", "Switches managés", "Points d'accès Wi-Fi", "Câblage structuré"] },
  { icon: Monitor, category: "Matériel informatique", items: ["Postes de travail", "Ordinateurs portables", "Écrans professionnels", "Périphériques"] },
  { icon: Antenna, category: "Solutions de connectivité", items: ["Antennes Starlink", "Modems fibre", "Amplificateurs de signal", "Équipements 4G/5G"] },
  { icon: HardDrive, category: "Stockage & Serveurs", items: ["Serveurs rack", "NAS entreprise", "Solutions de sauvegarde", "Disques SSD/HDD"] },
];

const Products = () => (
  <div className="pt-24">
    <section className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14 max-w-3xl">
          <span className="section-kicker">Produits</span>
          <h1 className="section-title mt-4">Des équipements sélectionnés pour des infrastructures exigeantes.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Équipements de qualité professionnelle pour vos infrastructures IT, avec une présentation plus premium et structurée.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {products.map((p, i) => (
            <motion.div
              key={p.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="service-shell"
            >
              <div className="icon-shell">
                <p.icon size={22} className="text-primary-foreground" />
              </div>
              <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{p.category}</h2>
              <ul className="mt-5 space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm leading-7 text-muted-foreground">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Products;
