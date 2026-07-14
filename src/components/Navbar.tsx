import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import altisLogo from "@/assets/altis-logo-original.png.asset.json";

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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/78 backdrop-blur-2xl">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center">
          <img src={altisLogo.url} alt="ALTIS SPHERE" className="h-10 w-auto" />
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-2 lg:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={[
                  "rounded-full px-4 py-2 text-sm transition-all duration-300",
                  active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <QuoteRequestModal triggerVariant="hero" triggerSize="sm" />
        </div>

        <button className="rounded-full border border-border/70 bg-card/60 p-2.5 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-border/60 bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="container flex flex-col gap-2 py-5">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={[
                      "rounded-2xl px-4 py-3 text-sm transition-colors",
                      active ? "bg-primary text-primary-foreground" : "bg-card/65 text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <QuoteRequestModal triggerVariant="hero" triggerSize="sm" triggerClassName="w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
