import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import altisLogo from "@/assets/altis-logo.png";

const Footer = () =>
  <footer className="border-t border-border bg-card">
    <div className="container py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={altisLogo} alt="ALTIS SPHERE" className="h-8 w-auto" />
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Solutions informatiques et connectivité internet pour particuliers et entreprises.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            Services
          </h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Internet & Connectivité", path: "/services" },
              { label: "Solutions IT", path: "/services" },
              { label: "Cybersécurité", path: "/services" },
              { label: "Développement Web", path: "/services" },
              { label: "Support Technique", path: "/services" },
              { label: "Domotique / Maison intelligente", path: "/domotique" },
            ].map((service) => (
              <Link
                key={service.label}
                to={service.path}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {service.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            Entreprise
          </h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "À propos", path: "/a-propos" },
              { label: "Blog", path: "/blog" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            Contact
          </h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <a href="mailto:contact@altissphere.com" className="flex items-center gap-2 transition-colors hover:text-primary">
              <Mail size={16} /> contact@altissphere.com
            </a>
            <a href="tel:+243998914448" className="flex items-center gap-2 transition-colors hover:text-primary">
              <Phone size={16} /> +243 998 914 448
            </a>
            <a href="tel:+243993653332" className="flex items-center gap-2 transition-colors hover:text-primary">
              <Phone size={16} /> +243 993 653 332
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> 10, Avenue Biayi, Kalubwe, Lubumbashi, RD Congo
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ALTIS SPHERE. Tous droits réservés.
      </div>
    </div>
  </footer>;

export default Footer;
