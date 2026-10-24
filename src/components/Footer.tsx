import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import altisLogo from "@/assets/altis-logo.png";

const serviceLinks = [
  { label: "Internet & connectivité", path: "/services#internet" },
  { label: "Solutions IT", path: "/services#it" },
  { label: "Cybersécurité", path: "/services#cyber" },
  { label: "Développement web", path: "/services#web" },
  { label: "Support technique", path: "/services#support" },
  { label: "Domotique", path: "/domotique" },
];

const companyLinks = [
  { label: "À propos", path: "/a-propos" },
  { label: "Produits", path: "/produits" },
  { label: "Solutions", path: "/solutions" },
  { label: "Blog", path: "/blog" },
  { label: "Téléchargements", path: "/altis-download" },
  { label: "Contact", path: "/contact" },
];

const linkClass = "text-sm text-muted-foreground transition-colors hover:text-primary";

const Footer = () => (
  <footer className="border-t bg-muted">
    <div className="container py-14">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div className="space-y-4">
          <Link to="/" className="inline-flex">
            <img
              src={altisLogo}
              alt="ALTIS SPHERE GROUP"
              width={105}
              height={36}
              loading="lazy"
              decoding="async"
              className="h-9 w-auto"
            />
          </Link>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            Services informatiques et connectivité internet pour les entreprises et les particuliers, depuis Lubumbashi.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Entreprise</h2>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="mailto:support@altisphere-group.com" className="flex items-center gap-3 hover:text-primary">
                <Mail size={16} className="shrink-0" /> support@altisphere-group.com
              </a>
            </li>
            <li>
              <a href="tel:+243998914448" className="flex items-center gap-3 hover:text-primary">
                <Phone size={16} className="shrink-0" /> +243 998 914 448
              </a>
            </li>
            <li>
              <a href="tel:+243993653332" className="flex items-center gap-3 hover:text-primary">
                <Phone size={16} className="shrink-0" /> +243 993 653 332
              </a>
            </li>
            <li className="flex items-start gap-3 leading-6">
              <MapPin size={16} className="mt-1 shrink-0" /> 110, Av. Biayi, Kalubwe, Lubumbashi, RD Congo
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ALTIS SPHERE GROUP. Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link to="/politique-de-confidentialite" className="hover:text-primary">Confidentialité</Link>
          <Link to="/cgv" className="hover:text-primary">CGV</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
