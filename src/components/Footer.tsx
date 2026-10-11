import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import altisLogo from "@/assets/altis-logo.png";

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-foreground/[0.06] bg-background/80">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,hsl(var(--primary)/0.08),transparent_30%),radial-gradient(circle_at_right,hsl(var(--accent)/0.05),transparent_25%)]" />
    <div className="container relative py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
        <div className="space-y-5">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={altisLogo}
              alt="Logo ALTIS SPHERE GROUP"
              width={105}
              height={36}
              loading="lazy"
              decoding="async"
              className="h-9 w-auto"
            />
          </Link>
          <p className="max-w-sm text-sm leading-7 text-foreground/40">
            Solutions informatiques et connectivité internet pour particuliers et entreprises.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/90">Services</h2>
          <div className="flex flex-col gap-2.5">
            {[
              { label: "Internet & Connectivité", path: "/services#internet" },
              { label: "Solutions IT", path: "/services#it" },
              { label: "Cybersécurité", path: "/services#cyber" },
              { label: "Développement Web", path: "/services#web" },
              { label: "Support Technique", path: "/services#support" },
              { label: "Domotique / Maison intelligente", path: "/domotique" },
            ].map((service) => (
              <Link key={service.label} to={service.path} className="text-sm text-foreground/40 transition-colors hover:text-primary">
                {service.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/90">Entreprise</h2>
          <div className="flex flex-col gap-2.5">
            {[
              { label: "À propos", path: "/a-propos" },
              { label: "Blog", path: "/blog" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-foreground/40 transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/90">Contact</h2>
          <div className="flex flex-col gap-3 text-sm text-foreground/40">
            <a href="mailto:support@altisphere-group.com" className="flex items-center gap-3 transition-colors hover:text-primary">
              <Mail size={16} /> support@altisphere-group.com
            </a>
            <a href="tel:+243998914448" className="flex items-center gap-3 transition-colors hover:text-primary">
              <Phone size={16} /> +243 998 914 448
            </a>
            <a href="tel:+243993653332" className="flex items-center gap-3 transition-colors hover:text-primary">
              <Phone size={16} /> +243 993 653 332
            </a>
            <span className="flex items-start gap-3 leading-7">
              <MapPin size={16} className="mt-1 flex-shrink-0" /> 110, Av. Biayi, Kalubwe, Lubumbashi, RD Congo
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-foreground/[0.06] pt-8 text-center text-sm text-foreground/40">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link to="/mentions-legales" className="transition-colors hover:text-primary">Mentions légales</Link>
          <span className="text-foreground/20">•</span>
          <Link to="/politique-de-confidentialite" className="transition-colors hover:text-primary">Confidentialité</Link>
          <span className="text-foreground/20">•</span>
          <Link to="/cgv" className="transition-colors hover:text-primary">CGV</Link>
        </div>
        © {new Date().getFullYear()} ALTIS SPHERE GROUP. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
