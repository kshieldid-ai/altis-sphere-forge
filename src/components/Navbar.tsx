import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import altisLogo from "@/assets/altis-logo.png";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "À propos", path: "/a-propos" },
  { label: "Services", path: "/services" },
  { label: "Produits", path: "/produits" },
  { label: "Solutions", path: "/solutions" },
  { label: "Domotique", path: "/domotique" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const isActive = (pathname: string, path: string) =>
  pathname === path || pathname.startsWith(`${path}/`);

/** Bouton de bascule entre le thème clair et sombre. */
const ThemeToggle = () => {
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Referme le menu mobile à chaque changement de page
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background">
      <nav aria-label="Navigation principale" className="container flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link to="/" aria-label="ALTIS SPHERE GROUP — accueil" className="flex shrink-0 items-center">
          <img
            src={altisLogo}
            alt="ALTIS SPHERE GROUP"
            width={117}
            height={40}
            fetchPriority="high"
            decoding="async"
            className="h-9 w-auto lg:h-10"
          />
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-[0.9375rem] font-medium transition-colors",
                    "after:absolute after:inset-x-3 after:-bottom-[17px] after:h-0.5 after:bg-primary after:opacity-0 after:transition-opacity",
                    active ? "text-primary after:opacity-100" : "text-foreground/75 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 xl:flex">
          <ThemeToggle />
          <QuoteRequestModal triggerVariant="hero" triggerSize="sm" />
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-secondary"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="menu-mobile" className="border-t bg-background xl:hidden">
          <ul className="container flex flex-col py-3">
            {[{ label: "Accueil", path: "/" }, ...navItems].map((item) => {
              const active = item.path === "/" ? pathname === "/" : isActive(pathname, item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block border-l-2 px-4 py-3 text-[0.9375rem] font-medium",
                      active ? "border-primary bg-accent text-primary" : "border-transparent text-foreground/80 hover:bg-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="px-4 pb-2 pt-4">
              <QuoteRequestModal triggerVariant="hero" triggerSize="default" triggerClassName="w-full" />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
