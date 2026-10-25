import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Mail, MapPin, Phone } from "lucide-react";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import altisLogo from "@/assets/altis-logo.png";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "À propos", path: "/a-propos" },
  { label: "Services", path: "/services" },
  { label: "Produits", path: "/produits" },
  { label: "Solutions", path: "/solutions" },
  { label: "Domotique", path: "/domotique" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const isActive = (pathname: string, path: string) =>
  path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);

/** Bouton de bascule entre le thème clair et sombre. */
const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted ? (theme === "system" ? resolvedTheme : theme) : "light";
  const isDark = current === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      title={isDark ? "Thème clair" : "Thème sombre"}
      className={cn("inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors", className)}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
};

/** Bandeau d'informations au-dessus du menu (écrans larges). */
const TopBar = () => (
  <div className="hidden bg-navy text-[0.875rem] text-white/70 lg:block">
    <div className="container flex h-11 items-center justify-between gap-6">
      <div className="flex items-center gap-7">
        <span className="font-bold text-white">ALTIS SPHERE GROUP — Services IT & connectivité</span>
        <a href="mailto:support@altisphere-group.com" className="flex items-center gap-2 hover:text-white">
          <Mail size={15} className="text-sky" aria-hidden="true" /> support@altisphere-group.com
        </a>
        <span className="hidden items-center gap-2 xl:flex">
          <MapPin size={15} className="text-sky" aria-hidden="true" /> 110, Av. Biayi, Kalubwe, Lubumbashi
        </span>
      </div>
      <div className="flex items-center gap-4">
        <a href="tel:+243998914448" className="flex items-center gap-2 hover:text-white">
          <Phone size={15} className="text-sky" aria-hidden="true" /> +243 998 914 448
        </a>
        <ThemeToggle className="text-white/70 hover:bg-white/10 hover:text-white" />
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Referme le menu mobile à chaque changement de page
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <TopBar />
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-background transition-shadow duration-300",
          scrolled && "shadow-[0_10px_30px_-15px_hsl(var(--navy)/0.25)]",
        )}
      >
        <nav aria-label="Navigation principale" className="container flex h-[4.5rem] items-center justify-between gap-6 lg:h-[4.75rem]">
          <Link to="/" aria-label="ALTIS SPHERE GROUP — accueil" className="flex shrink-0 items-center">
            <img
              src={altisLogo}
              alt="ALTIS SPHERE GROUP"
              width={128}
              height={44}
              fetchPriority="high"
              decoding="async"
              className="h-10 w-auto lg:h-11"
            />
          </Link>

          <ul className="hidden h-full items-center gap-1 xl:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.path);
              return (
                <li key={item.path} className="h-full">
                  <Link
                    to={item.path}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-full items-center px-3 text-[0.8125rem] font-bold uppercase tracking-[0.08em] transition-colors",
                      "after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-t after:bg-primary after:transition-opacity",
                      active ? "text-primary after:opacity-100" : "text-foreground after:opacity-0 hover:text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center xl:flex">
            <QuoteRequestModal triggerVariant="hero" triggerSize="sm" triggerClassName="h-11 px-6" />
          </div>

          <div className="flex items-center gap-1 xl:hidden">
            <ThemeToggle className="text-foreground hover:bg-secondary lg:hidden" />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[0.625rem] text-foreground hover:bg-secondary"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {open && (
          <div id="menu-mobile" className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t bg-background xl:hidden">
            <ul className="container flex flex-col py-3">
              {navItems.map((item) => {
                const active = isActive(pathname, item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block border-b py-3.5 text-[0.875rem] font-bold uppercase tracking-[0.08em] last:border-b-0",
                        active ? "text-primary" : "text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pb-3 pt-5">
                <QuoteRequestModal triggerVariant="hero" triggerSize="lg" triggerClassName="w-full" />
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
