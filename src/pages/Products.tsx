import { motion } from "framer-motion";
import { Router, Antenna, HardDrive, Monitor } from "lucide-react";

const products = [
  { icon: Router, category: "Équipements réseau", items: ["Routeurs professionnels", "Switches managés", "Points d'accès Wi-Fi", "Câblage structuré"] },
  { icon: Monitor, category: "Matériel informatique", items: ["Postes de travail", "Ordinateurs portables", "Écrans professionnels", "Périphériques"] },
  { icon: Antenna, category: "Solutions de connectivité", items: ["Antennes Starlink", "Modems fibre", "Amplificateurs de signal", "Équipements 4G/5G"] },
  { icon: HardDrive, category: "Stockage & Serveurs", items: ["Serveurs rack", "NAS entreprise", "Solutions de sauvegarde", "Disques SSD/HDD"] },
];

const Products = () => (
  <div className="pt-20">
    <section className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Produits</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold mt-3 mb-4">Nos Produits</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Équipements de qualité professionnelle pour vos infrastructures IT.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-xl bg-card border border-border"
            >
              <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4">
                <p.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-4">{p.category}</h3>
              <ul className="space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
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
