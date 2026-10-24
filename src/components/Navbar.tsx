import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion, useAnimation } from "framer-motion";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import altisLogo from "@/assets/altis-logo.png";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "À propos", path: "/a-propos" },
  { label: "Services", path: "/services" },
  { label: "Produits", path: "/produits" },
  { label: "Solutions", path: "/solutions" },
  { label: "Domotique", path: "/domotique" },
  { label: "Blog", path: "/blog" },
  { label: "Téléchargement", path: "/altis-download" },
  { label: "Contact", path: "/contact" },
];

/** Bouton de bascule entre le thème clair et sombre. */
const ThemeToggle = ({ className = "" }: { className?: string }) => {
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
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/[0.08] bg-foreground/[0.04] text-foreground/70 transition-all duration-300 hover:bg-foreground/[0.08] hover:text-foreground",
        className,
      ].join(" ")}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            <Moon size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            <Sun size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

/**
 * Enveloppe le logo et lui applique une animation de rotation à 360 degrés.
 */
const AnimatedLogo = () => {
  const controls = useAnimation();

  useEffect(() => {
    const startAnimation = async () => {
      while (true) {
        await controls.start({ rotateY: 360, transition: { duration: 2, ease: "easeInOut" } });
        controls.set({ rotateY: 0 }); // Reset to 0 before repeating
        
        // First bounce
        await controls.start({ y: -20, transition: { duration: 0.3, ease: "easeOut" } });
        await controls.start({ y: 0, transition: { duration: 0.3, ease: "easeIn" } });
        // Second bounce
        await controls.start({ y: -10, transition: { duration: 0.2, ease: "easeOut" } });
        await controls.start({ y: 0, transition: { duration: 0.2, ease: "easeIn" } });

        await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for 1 second after last bounce
      }
    };
    startAnimation();
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      className="relative flex items-center"
    >
      <img
        src={altisLogo}
        alt="Logo ALTIS SPHERE GROUP"
        width={117}
        height={40}
        fetchPriority="high"
        decoding="async"
        className="relative z-10 h-10 w-auto"
      />
      <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 h-2 w-20 rounded-full bg-black/30 blur-sm z-0" />
    </motion.div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/[0.06] bg-background/60 backdrop-blur-2xl">
      <nav aria-label="Navigation principale" className="container flex h-20 items-center justify-between gap-6">
        <Link to="/" aria-label="ALTIS SPHERE GROUP — accueil" className="flex items-center">
          <AnimatedLogo />
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-foreground/[0.08] bg-foreground/[0.04] px-3 py-2 lg:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? "page" : undefined}
                className={[
                  "rounded-full px-4 py-2 text-sm transition-all duration-300",
                  active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "text-foreground/50 hover:bg-foreground/[0.06] hover:text-foreground/80",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <QuoteRequestModal triggerVariant="hero" triggerSize="sm" />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="rounded-full border border-foreground/[0.08] bg-foreground/[0.04] p-2.5"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-foreground/[0.06] bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Navigation mobile" className="container flex flex-col gap-2 py-5">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "rounded-2xl px-4 py-3 text-sm transition-colors",
                      active ? "bg-primary text-primary-foreground" : "bg-foreground/[0.04] text-foreground/50 hover:text-foreground/80",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <QuoteRequestModal triggerVariant="hero" triggerSize="sm" triggerClassName="w-full" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
