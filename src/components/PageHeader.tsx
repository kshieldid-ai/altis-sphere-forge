import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import pageBanner from "@/assets/hero-bg.jpg";

type Props = {
  /** Libellé court affiché dans le fil d'Ariane */
  crumb: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Contenu optionnel sous le texte (boutons…) */
  children?: ReactNode;
};

/** Bandeau sombre des pages internes : fil d'Ariane, titre, chapô. */
const PageHeader = ({ crumb, title, lead, children }: Props) => (
  <header className="relative isolate overflow-hidden bg-navy">
    <img src={pageBanner} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
    <div className="absolute inset-0 -z-10 bg-navy/75" aria-hidden="true" />
    <div className="diagonal-bands -z-10 hidden md:block" aria-hidden="true" />

    <div className="container py-16 lg:py-24">
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-2.5 text-[0.8125rem] font-bold uppercase tracking-[0.12em]">
        <Link to="/" className="text-white/80 hover:text-white">Accueil</Link>
        <span className="text-white/40" aria-hidden="true">/</span>
        <span aria-current="page" className="text-sky">{crumb}</span>
      </nav>
      <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]">
        {title}
      </h1>
      {lead ? <p className="mt-5 max-w-2xl text-base leading-[1.75] text-white/75 sm:text-lg">{lead}</p> : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  </header>
);

export default PageHeader;
