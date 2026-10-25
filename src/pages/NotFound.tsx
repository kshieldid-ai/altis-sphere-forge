import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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

  return (
    <>
      <Seo
        title="Page introuvable (404) | ALTIS SPHERE GROUP"
        description="La page demandée n'existe pas ou a été déplacée. Retrouvez nos services IT, connectivité et domotique depuis l'accueil."
        path={location.pathname}
        noindex
      />
      <section className="flex min-h-[70vh] items-center py-24">
        <div className="container max-w-2xl">
          <p className="section-kicker">Erreur 404</p>
          <h1 className="section-title mt-4">Cette page n'existe pas.</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Le lien est peut-être obsolète ou l'adresse mal saisie. Voici quelques pages utiles pour poursuivre votre visite.
          </p>

          <nav aria-label="Liens utiles" className="mt-8 divide-y border-y">
            {helpfulLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center justify-between py-3.5 text-[0.9375rem] font-medium hover:text-primary"
              >
                {link.label}
                <ArrowRight size={16} className="text-muted-foreground" />
              </Link>
            ))}
          </nav>

          <Button variant="hero" size="lg" className="mt-8" asChild>
            <Link to="/">Revenir à l'accueil</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default NotFound;
