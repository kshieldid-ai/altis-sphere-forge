import networkBg from "@/assets/hero-bg.jpg";

/**
 * Décor de fond partagé aux pages internes.
 * Image fixe, très désaturée en clair, superposée de voiles dégradés
 * pour préserver le contraste du texte (accessibilité AA).
 */
const PageBackground = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <img
      src={networkBg}
      alt=""
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover object-center opacity-[0.06] mix-blend-luminosity"
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/0.08),transparent_45%),radial-gradient(circle_at_85%_10%,hsl(var(--accent)/0.06),transparent_40%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/0.85),hsl(var(--background)/0.90)_45%,hsl(var(--background)/0.95))]" />
    <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
  </div>
);

export default PageBackground;
