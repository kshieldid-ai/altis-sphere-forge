import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useAnimation, useReducedMotion } from "framer-motion";
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

/**
 * Logo animé : rotation à 360 degrés, deux rebonds, pause, en boucle,
 * avec une ombre portée au sol. Figé si l'utilisateur réduit les animations.
 */
const AnimatedLogo = () => {
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;

    const startAnimation = async () => {
      while (!cancelled) {
        await controls.start({ rotateY: 360, transition: { duration: 2, ease: "easeInOut" } });
        controls.set({ rotateY: 0 });

        // Premier rebond
        await controls.start({ y: -20, transition: { duration: 0.3, ease: "easeOut" } });
        await controls.start({ y: 0, transition: { duration: 0.3, ease: "easeIn" } });
        // Second rebond
        await controls.start({ y: -10, transition: { duration: 0.2, ease: "easeOut" } });
        await controls.start({ y: 0, transition: { duration: 0.2, ease: "easeIn" } });

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
    startAnimation();

    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [controls, reduceMotion]);

  return (
    <motion.div animate={controls} className="relative flex items-center">
      <img
        src={altisLogo}
        alt="ALTIS SPHERE GROUP"
        width={128}
        height={44}
        fetchPriority="high"
        decoding="async"
        className="relative z-10 h-10 w-auto lg:h-11"
      />
      <div className="absolute bottom-[-5px] left-1/2 z-0 h-2 w-20 -translate-x-1/2 rounded-full bg-black/30 blur-sm" aria-hidden="true" />
    </motion.div>
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

type MobileMenuProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

/** Volet de navigation mobile : panneau bleu nuit qui glisse depuis la droite. */
const MobileMenu = ({ open, pathname, onClose }: MobileMenuProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    // Bloque le défilement de la page et ferme avec Échap
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const roundButton =
    "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <motion.div
            className="absolute inset-0 bg-navy-deep/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto bg-navy px-6 pb-8 pt-5 sm:max-w-sm"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between">
              <Link to="/" aria-label="ALTIS SPHERE GROUP — accueil">
                <img src={altisLogo} alt="ALTIS SPHERE GROUP" width={128} height={44} className="h-11 w-auto brightness-0 invert" />
              </Link>
              <div className="flex items-center gap-3">
                <ThemeToggle className={roundButton} />
                <button ref={closeRef} type="button" onClick={onClose} aria-label="Fermer le menu" className={roundButton}>
                  <X size={20} />
                </button>
              </div>
            </div>

            <nav aria-label="Navigation mobile" className="mt-8">
              <ul>
                {navItems.map((item) => {
                  const active = isActive(pathname, item.path);
                  return (
                    <li key={item.path} className="border-b border-white/10">
                      <Link
                        to={item.path}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block py-4 text-[0.9375rem] font-bold uppercase tracking-[0.08em] transition-colors",
                          active ? "text-sky" : "text-white hover:text-sky",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-8">
              <QuoteRequestModal triggerVariant="hero" triggerSize="lg" triggerClassName="w-full" />
            </div>

            <ul className="mt-8 space-y-4 text-[0.9375rem] text-white/80">
              <li>
                <a href="mailto:support@altisphere-group.com" className="flex items-center gap-3.5 hover:text-white">
                  <Mail size={18} className="shrink-0 text-sky" aria-hidden="true" /> support@altisphere-group.com
                </a>
              </li>
              <li>
                <a href="tel:+243998914448" className="flex items-center gap-3.5 hover:text-white">
                  <Phone size={18} className="shrink-0 text-sky" aria-hidden="true" /> +243 998 914 448
                </a>
              </li>
              <li>
                <a href="tel:+243993653332" className="flex items-center gap-3.5 hover:text-white">
                  <Phone size={18} className="shrink-0 text-sky" aria-hidden="true" /> +243 993 653 332
                </a>
              </li>
              <li className="flex items-start gap-3.5">
                <MapPin size={18} className="mt-1 shrink-0 text-sky" aria-hidden="true" /> 110, Av. Biayi, Kalubwe, Lubumbashi, RD Congo
              </li>
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = useCallback(() => setOpen(false), []);

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
            <AnimatedLogo />
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

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[0.625rem] text-foreground hover:bg-secondary xl:hidden"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            <Menu size={26} />
          </button>
        </nav>

        <MobileMenu open={open} pathname={pathname} onClose={closeMenu} />
      </header>
    </>
  );
};

export default Navbar;
