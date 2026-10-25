import { Router, Antenna, HardDrive, Monitor, Cctv, Check } from "lucide-react";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { breadcrumb, webPage } from "@/lib/seo-schemas";

const products = [
  { icon: Router, category: "Équipements réseau", items: ["Routeurs professionnels", "Switches managés", "Points d'accès Wi-Fi", "Câblage structuré"] },
  { icon: Monitor, category: "Matériel informatique", items: ["Postes de travail", "Ordinateurs portables", "Écrans professionnels", "Périphériques"] },
  { icon: Antenna, category: "Solutions de connectivité", items: ["Antennes Starlink", "Modems fibre", "Amplificateurs de signal", "Équipements 4G/5G"] },
  { icon: HardDrive, category: "Stockage & serveurs", items: ["Serveurs rack", "NAS entreprise", "Solutions de sauvegarde", "Disques SSD/HDD"] },
  { icon: Cctv, category: "Vidéosurveillance (CCTV)", items: ["Caméras IP et HD", "Caméras PTZ motorisées", "Enregistreurs NVR/DVR", "Écrans de supervision"] },
];

const productsJsonLd = [
  webPage("Produits & équipements IT", "/produits", "Routeurs, switches, antennes Starlink, serveurs, NAS, caméras de vidéosurveillance et matériel informatique professionnel."),
  breadcrumb("Produits", "/produits"),
];

const Products = () => (
  <>
    <Seo
      title="Produits & Équipements IT | ALTIS SPHERE"
      description="Routeurs, switches, antennes Starlink, serveurs, NAS, caméras de vidéosurveillance et matériel informatique professionnel sélectionnés par ALTIS SPHERE."
      path="/produits"
      jsonLd={productsJsonLd}
    />
    <PageHeader
      crumb="Produits"
      title="Produits et équipements"
      lead="Du matériel de qualité professionnelle, sélectionné pour sa fiabilité, fourni et installé par nos techniciens."
    />

    <section className="py-20 lg:py-24">
      <div className="container grid gap-6 md:grid-cols-2">
        {products.map((p, i) => (
          // Nombre impair de catégories : la dernière occupe toute la largeur
          <ScrollReveal
            key={p.category}
            delay={i * 0.05}
            className={i === products.length - 1 && products.length % 2 === 1 ? "md:col-span-2" : undefined}
          >
            <div className="service-shell h-full">
              <div className="flex items-center gap-3">
                <span className="icon-shell">
                  <p.icon size={24} aria-hidden="true" />
                </span>
                <h2 className="text-xl font-bold">{p.category}</h2>
              </div>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Check size={16} className="shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  </>
);

export default Products;
