import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import altisLogo from "@/assets/altis-logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={altisLogo} alt="ALTIS SPHERE" className="h-8 w-auto" />
            <span className="font-heading text-lg font-bold">
              ALTIS <span className="gradient-text">SPHERE</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Solutions informatiques et connectivité internet pour particuliers et entreprises.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground">
            Services
          </h4>
          <div className="flex flex-col gap-2">
            {["Internet & Connectivité", "Solutions IT", "Cybersécurité", "Développement Web", "Support Technique"].map(
              (s) => (
                <Link key={s} to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {s}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Liens */}
        <div className="space-y-4">
          <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground">
            Entreprise
          </h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "À propos", path: "/a-propos" },
              { label: "Blog", path: "/blog" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground">
            Contact
          </h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <a href="mailto:contact@altissphere.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={16} /> contact@altissphere.com
            </a>
            <a href="tel:+243000000000" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={16} /> +243 0 00 00 00 00
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> 10, Avenue Biayi, Kalubwe, Lubumbashi, RD Congo
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ALTIS SPHERE. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
