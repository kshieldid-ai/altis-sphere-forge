import blogCyber from "@/assets/blog-cybersecurity.jpg";
import blogStarlink from "@/assets/blog-starlink-fibre.jpg";
import blogTendances from "@/assets/blog-tendances-it.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "securiser-reseau-entreprise-2026",
    title: "Comment sécuriser votre réseau d'entreprise en 2026",
    category: "Cybersécurité",
    date: "10 mars 2026",
    excerpt: "Découvrez les meilleures pratiques pour protéger votre infrastructure contre les menaces actuelles.",
    image: blogCyber,
    content: [
      "La cybersécurité n'est plus une option pour les entreprises, mais une nécessité absolue. En 2026, les menaces évoluent plus vite que jamais et aucune infrastructure n'est à l'abri.",
      "La première étape consiste à réaliser un audit complet de votre réseau. Identifiez les points d'entrée vulnérables, les équipements obsolètes et les accès non sécurisés. Cette cartographie vous permettra de prioriser les actions.",
      "La segmentation du réseau est une mesure essentielle. En séparant les zones sensibles (serveurs, bases de données) du reste de l'infrastructure, vous limitez la propagation d'une éventuelle intrusion.",
      "La formation des collaborateurs reste le maillon le plus critique. Plus de 80 % des breaches trouvent leur origine dans une erreur humaine : phishing, mot de passe faible, usage d'outils non autorisés. Une sensibilisation régulière réduit drastiquement ce risque.",
      "Enfin, la surveillance continue et les sauvegardes régulières (testées) garantissent votre capacité à réagir rapidement et à restaurer votre activité en cas d'incident.",
    ],
  },
  {
    slug: "starlink-vs-fibre",
    title: "Starlink vs Fibre : quelle solution choisir ?",
    category: "Connectivité",
    date: "5 mars 2026",
    excerpt: "Comparatif complet des solutions de connectivité pour les zones rurales et urbaines.",
    image: blogStarlink,
    content: [
      "Le choix entre Starlink et la fibre optique dépend de plusieurs facteurs : votre localisation, vos besoins en débit, votre budget et votre tolérance à la latence.",
      "La fibre optique offre des débits très élevés (jusqu'à plusieurs Gbps) et une latence extrêmement faible, idéale pour les entreprises situées en zone urbaine desservie. C'est la solution la plus stable et la plus économique sur le long terme.",
      "Starlink, quant à lui, apporte une connectivité haut débit là où la fibre n'est pas disponible : zones rurales, sites isolés, zones minières. Le débit est suffisant pour la plupart des usages professionnels et le déploiement est rapide.",
      "Pour les entreprises critiques, la combinaison des deux solutions (fibre + Starlink en secours) offre la meilleure redondance et garantit une disponibilité maximale.",
      "Chez ALTIS SPHERE, nous réalisons une étude de votre site pour vous recommander la solution la plus adaptée à vos besoins réels.",
    ],
  },
  {
    slug: "tendances-it-2026",
    title: "Les tendances IT à surveiller cette année",
    category: "Innovation",
    date: "28 février 2026",
    excerpt: "IA, edge computing, 5G privée : les technologies qui vont transformer votre entreprise.",
    image: blogTendances,
    content: [
      "L'année 2026 confirme l'accélération de plusieurs tendances IT qui redéfinissent la manière dont les entreprises opèrent.",
      "L'intelligence artificielle générative sort de la phase d'expérimentation pour s'intégrer dans les processus métiers : support client automatisé, analyse de données prédictive, génération de contenus. Les entreprises qui adoptent l'IA gagnent en productivité.",
      "L'edge computing rapproche le traitement des données de la source, réduisant la latence et les coûts de bande passante. Essentiel pour l'IoT industriel et les applications temps réel.",
      "Les réseaux 5G privés permettent aux entreprises de disposer de leur propre infrastructure mobile sécurisée, idéale pour les sites industriels, les entrepôts et les campus.",
      "Enfin, la consolidation des solutions cloud et la montée en puissance du multicloud managé offrent plus de flexibilité tout en maîtrisant les coûts.",
    ],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);
