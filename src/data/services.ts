import type { LucideIcon } from "lucide-react";
import { Wifi, Server, Shield, Code, Headphones, Monitor } from "lucide-react";
import serviceInternet from "@/assets/service-internet.jpg";
import serviceIt from "@/assets/service-it.jpg";
import serviceCyber from "@/assets/service-cybersecurity.jpg";
import serviceDev from "@/assets/service-dev.jpg";
import serviceSupport from "@/assets/service-support.jpg";
import serviceEquipements from "@/assets/service-equipements.jpg";
import fibreSoudure from "@/assets/IMG-20260607-WA0035.jpg";
import fibreChantier from "@/assets/IMG-20260627-WA0116.jpg";
import fibreSwitch from "@/assets/blog-starlink-fibre.jpg";
import cyberShield from "@/assets/blog-cybersecurity.jpg";

export type ServiceImage = {
  src: string;
  alt: string;
};

export type ServiceProject = {
  label: string;
  url: string;
};

export const webProjects: ServiceProject[] = [
  { label: "AFFAGRIPEL Lualaba", url: "https://www.affagripel-lualaba.com" },
  { label: "MKS Engineering", url: "https://mksengineering.net" },
  { label: "MAA Solar Solutions", url: "https://maasolarsolutions.in" },
];

export const clientTestimonials = [
  {
    name: "AFFAGRIPEL Lualaba",
    role: "Ministère provincial — Kolwezi, RDC",
    url: "https://www.affagripel-lualaba.com",
    text: "Notre vitrine institutionnelle est claire, rapide et simple à mettre à jour. L’équipe a compris les enjeux d’un service public et livré un site à la hauteur de notre mission.",
  },
  {
    name: "MKS Engineering",
    role: "Pièces moteur performance — Costa Mesa, USA",
    url: "https://mksengineering.net",
    text: "Le nouveau site met enfin nos pièces et notre savoir-faire en avant. Catalogue lisible, parcours fluide, et un rendu vraiment professionnel pour nos clients internationaux.",
  },
  {
    name: "MAA Solar Solutions",
    role: "Installation solaire — Gujarat, Inde",
    url: "https://maasolarsolutions.in",
    text: "Nous avions besoin d’un site qui inspire confiance dès le premier regard. C’est le cas : services, contact et image de marque sont alignés avec notre activité sur le terrain.",
  },
];

export type ServiceOffer = {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  items: string[];
  images: ServiceImage[];
  projects?: ServiceProject[];
};

export const serviceOffers: ServiceOffer[] = [
  {
    id: "internet",
    icon: Wifi,
    title: "Internet & Connectivité",
    subtitle: "Nos solutions de connectivité professionnelles",
    desc: "Fibre, Starlink et solutions de connectivité sur mesure.",
    items: [
      "Installation et déploiement de fibre optique.",
      "Solutions Internet haut débit pour entreprises.",
      "Mise en place de liaisons de secours (backup Internet).",
      "Solutions Starlink pour les zones isolées.",
      "Réseaux Wi-Fi professionnels et couverture multi-sites.",
      "VPN sécurisés pour le télétravail.",
      "Audit et optimisation des performances réseau.",
      "Surveillance de la disponibilité et de la qualité de service.",
    ],
    images: [
      { src: fibreSoudure, alt: "Soudure de fibre optique sur un chantier ALTIS SPHERE" },
      { src: fibreChantier, alt: "Préparation d’un manchon fibre sur site" },
      { src: serviceInternet, alt: "Installation Starlink sur toiture" },
    ],
  },
  {
    id: "it",
    icon: Server,
    title: "Solutions IT",
    subtitle: "Infrastructure et services informatiques",
    desc: "Infrastructure réseau, cloud et services managés.",
    items: [
      "Conception et déploiement d'infrastructures informatiques.",
      "Serveurs physiques et virtualisés.",
      "Solutions Cloud (Microsoft 365, Azure, Google Workspace).",
      "Migration de données et d'applications.",
      "Sauvegarde et reprise après sinistre.",
      "Gestion centralisée des postes et équipements.",
      "Services managés et supervision proactive.",
      "Conseil et accompagnement en transformation numérique.",
    ],
    images: [
      { src: serviceIt, alt: "Baie serveur et infrastructure réseau déployée par ALTIS SPHERE" },
      { src: fibreSwitch, alt: "Cœur de réseau fibre et commutation professionnelle" },
    ],
  },
  {
    id: "cyber",
    icon: Shield,
    title: "Cybersécurité",
    subtitle: "Protection de votre système d'information",
    desc: "Protection avancée de vos systèmes et données.",
    items: [
      "Audit de sécurité et analyse des vulnérabilités.",
      "Firewall nouvelle génération.",
      "Protection antivirus et anti-ransomware.",
      "Gestion des accès et authentification multifacteur (MFA).",
      "Sécurisation des messageries professionnelles.",
      "Surveillance SOC et détection des menaces.",
      "Sensibilisation des utilisateurs à la cybersécurité.",
      "Plans de continuité et de reprise d'activité.",
    ],
    images: [
      { src: serviceCyber, alt: "Protection des accès et des données d’entreprise" },
      { src: cyberShield, alt: "Bouclier de cybersécurité et supervision des menaces" },
    ],
  },
  {
    id: "web",
    icon: Code,
    title: "Développement Web",
    subtitle: "Création de solutions digitales sur mesure",
    desc: "Sites web et applications performantes.",
    items: [
      "Création de sites vitrines et e-commerce.",
      "Développement d'applications web métier.",
      "Intégration de systèmes et API.",
      "Optimisation SEO et performances.",
      "Design UX/UI moderne et responsive.",
      "Maintenance, évolutions et mises à jour.",
      "Hébergement et gestion des noms de domaine.",
      "Développement de portails clients et extranet.",
    ],
    images: [
      { src: serviceDev, alt: "Conception et suivi d’un projet web sur mesure" },
    ],
    projects: webProjects,
  },
  {
    id: "support",
    icon: Headphones,
    title: "Support Technique",
    subtitle: "Assistance et maintenance informatique",
    desc: "Maintenance et assistance informatique 24/7.",
    items: [
      "Support utilisateur à distance et sur site.",
      "Assistance téléphonique 24h/24 et 7j/7.",
      "Maintenance préventive et corrective.",
      "Gestion des incidents et tickets.",
      "Mise à jour des systèmes et logiciels.",
      "Surveillance proactive des équipements.",
      "Surveillance vidéo / CCTV : installation, maintenance et supervision.",
      "Support Microsoft 365 et solutions Cloud.",
      "Contrats de maintenance adaptés à vos besoins.",
    ],
    images: [
      { src: serviceSupport, alt: "Maintenance corrective d’équipements informatiques" },
    ],
  },
  {
    id: "equipements",
    icon: Monitor,
    title: "Équipements IT",
    subtitle: "Matériel informatique et réseau",
    desc: "Routeurs, serveurs, antennes et matériel réseau.",
    items: [
      "Fourniture de routeurs et switches professionnels.",
      "Serveurs et solutions de stockage.",
      "Antennes Wi-Fi et équipements radio.",
      "Postes de travail, ordinateurs portables et fixes.",
      "Imprimantes et périphériques.",
      "Vidéosurveillance et contrôle d'accès.",
      "Installation, configuration et maintenance.",
      "Renouvellement et gestion de parc informatique.",
    ],
    images: [
      { src: serviceEquipements, alt: "Parc d’équipements informatiques et postes de travail" },
    ],
  },
];
