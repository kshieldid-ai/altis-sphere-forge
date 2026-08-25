import networkBg from "@/assets/network-bg.jpg.asset.json";

/**
 * Décor de fond partagé aux pages internes.
 * Image fixe, très désaturée en clair, superposée de voiles dégradés
 * pour préserver le contraste du texte (accessibilité AA).
 */
const PageBackground = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <img
      src={networkBg.url}
      alt=""
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover object-center opacity-[0.12] mix-blend-luminosity"
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/0.14),transparent_45%),radial-gradient(circle_at_85%_10%,hsl(var(--accent)/0.12),transparent_40%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/0.72),hsl(var(--background)/0.88)_45%,hsl(var(--background)/0.97))]" />
    <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
  </div>
);

export default PageBackground;
