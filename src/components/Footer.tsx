import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Mail, MessageCircle, Phone, MapPin } from "lucide-react";
import altisLogo from "@/assets/altis-logo.png";

const serviceLinks = [
  { label: "Internet & connectivité", path: "/services#internet" },
  { label: "Solutions IT", path: "/services#it" },
  { label: "Cybersécurité", path: "/services#cyber" },
  { label: "Solution CCTV", path: "/services#cctv" },
  { label: "Développement web", path: "/services#web" },
  { label: "Support technique", path: "/services#support" },
  { label: "Équipements IT", path: "/services#equipements" },
];

const companyLinks = [
  { label: "À propos", path: "/a-propos" },
  { label: "Produits", path: "/produits" },
  { label: "Solutions", path: "/solutions" },
  { label: "Domotique", path: "/domotique" },
  { label: "Blog", path: "/blog" },
  { label: "Téléchargements", path: "/altis-download" },
];

const contacts: { icon: typeof Mail; label: string; href?: string; external?: boolean }[] = [
  { icon: Phone, label: "+243 998 914 448", href: "tel:+243998914448" },
  { icon: Phone, label: "+243 993 653 332", href: "tel:+243993653332" },
  { icon: MessageCircle, label: "WhatsApp : +243 993 653 332", href: "https://wa.me/qr/65WOO3RNAPOLN1", external: true },
  { icon: Mail, label: "support@altisphere-group.com", href: "mailto:support@altisphere-group.com" },
  { icon: MapPin, label: "110, Av. Biayi, Kalubwe, Lubumbashi, RD Congo" },
];

const headingClass = "text-[0.8125rem] font-bold uppercase tracking-[0.15em] text-sky";
const linkClass = "text-[0.9375rem] text-white/70 transition-colors hover:text-white";

/** Bandeau d'appel à l'action, à cheval entre la page et le pied de page. */
const CtaBanner = () => (
  <div className="bg-[linear-gradient(to_bottom,hsl(var(--background))_50%,hsl(var(--navy))_50%)]">
    <div className="container">
      <div className="relative isolate overflow-hidden rounded-2xl bg-primary px-7 py-10 shadow-[0_25px_50px_-20px_hsl(var(--primary)/0.6)] sm:px-12 lg:py-12">
        <div className="diagonal-bands -z-10 opacity-60" aria-hidden="true" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[0.8125rem] font-bold uppercase tracking-[0.15em] text-white/80 before:h-0.5 before:w-7 before:bg-current">
              Besoin d'une solution technique ?
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-white sm:text-3xl lg:text-[2.25rem]">
              Travaillons ensemble sur votre projet
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-[3.25rem] shrink-0 items-center justify-center gap-2 self-start rounded-[0.625rem] bg-white px-7 text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-navy transition-colors hover:bg-white/90 lg:self-auto"
          >
            Nous contacter <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <footer>
      {/* Inutile sur la page Contact, qui est déjà la destination */}
      {pathname !== "/contact" && <CtaBanner />}

      <div className="bg-navy">
        <div className="container py-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
            <div className="space-y-5">
              <Link to="/" className="inline-flex">
                {/* Logo passé en blanc pour le fond sombre */}
                <img
                  src={altisLogo}
                  alt="ALTIS SPHERE GROUP"
                  width={128}
                  height={44}
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-auto brightness-0 invert"
                />
              </Link>
              <p className="max-w-xs text-[0.9375rem] leading-[1.75] text-white/70">
                Services informatiques et connectivité internet pour les entreprises et les particuliers, depuis Lubumbashi.
              </p>
            </div>

            <div>
              <h2 className={headingClass}>Services</h2>
              <ul className="mt-5 space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={headingClass}>Entreprise</h2>
              <ul className="mt-5 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={headingClass}>Contact</h2>
              <ul className="mt-5 space-y-4">
                {contacts.map((c) => {
                  const content = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.625rem] bg-white/[0.07] text-sky">
                        <c.icon size={17} aria-hidden="true" />
                      </span>
                      <span className="pt-2 leading-6">{c.label}</span>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a
                          href={c.href}
                          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className={`flex items-start gap-3.5 ${linkClass}`}
                        >
                          {content}
                        </a>
                      ) : (
                        <p className="flex items-start gap-3.5 text-[0.9375rem] text-white/70">{content}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-navy-deep">
          <div className="container flex flex-col gap-3 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} ALTIS SPHERE GROUP. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link to="/politique-de-confidentialite" className="hover:text-white">Confidentialité</Link>
              <Link to="/cgv" className="hover:text-white">CGV</Link>
              <Link to="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
