import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";

const helpfulLinks = [
  { label: "Nos services IT et connectivité", path: "/services" },
  { label: "Nos solutions pour entreprises", path: "/solutions" },
  { label: "Nos produits et équipements", path: "/produits" },
  { label: "Contacter ALTIS SPHERE GROUP", path: "/contact" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Seo
        title="Page introuvable (404) | ALTIS SPHERE GROUP"
        description="La page demandée n'existe pas ou a été déplacée. Retrouvez nos services IT, connectivité et domotique depuis l'accueil."
        path={location.pathname}
        noindex
      />
      <section className="flex min-h-screen items-center justify-center py-32">
        <div className="container max-w-2xl text-center">
          <span className="section-kicker">Erreur 404</span>
          <h1 className="section-title mt-4">Cette page n'existe pas.</h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Le lien est peut-être obsolète ou l'adresse mal saisie. Voici quelques pages utiles pour poursuivre votre visite.
          </p>

          <nav aria-label="Liens utiles" className="mt-10 grid gap-3 sm:grid-cols-2">
            {helpfulLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="rounded-2xl border border-border/70 bg-card/70 px-5 py-4 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10">
            <Button variant="hero" size="lg" asChild>
              <Link to="/">Revenir à l'accueil</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
