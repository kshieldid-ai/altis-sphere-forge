import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Props = {
  /** Libellé court affiché dans le fil d'Ariane */
  crumb: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Contenu optionnel sous le texte (boutons…) */
  children?: ReactNode;
};

/** En-tête commun des pages internes : fil d'Ariane, titre, chapô. */
const PageHeader = ({ crumb, title, lead, children }: Props) => (
  <header className="border-b bg-muted pt-16 lg:pt-[4.5rem]">
    <div className="container py-12 lg:py-16">
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Accueil</Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span aria-current="page" className="text-foreground">{crumb}</span>
      </nav>
      <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h1>
      {lead ? <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{lead}</p> : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  </header>
);

export default PageHeader;
