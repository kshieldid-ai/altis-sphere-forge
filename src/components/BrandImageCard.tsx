import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Texte en surimpression, en bas à gauche */
  caption?: ReactNode;
  /** Badge flottant (chiffre clé), en bas à droite */
  badge?: { value: string; label: string };
  className?: string;
};

/** Photo arrondie avec bandes diagonales de marque et légende. */
const BrandImageCard = ({ src, alt, caption, badge, className }: Props) => (
  <div className={cn("relative", badge && "pb-8 pr-6", className)}>
    <div className="relative isolate overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_hsl(var(--navy)/0.45)]">
      <img src={src} alt={alt} loading="lazy" className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(var(--navy)/0.85),hsl(var(--navy)/0.15)_55%,transparent)]" aria-hidden="true" />
      <div className="diagonal-bands w-2/3" aria-hidden="true" />
      {caption ? (
        <p className="absolute bottom-7 left-7 right-7 text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl">
          {caption}
        </p>
      ) : null}
    </div>

    {badge ? (
      <div className="absolute bottom-0 right-0 w-36 rounded-xl border-b-4 border-primary bg-card px-4 py-5 text-center shadow-[0_20px_40px_-15px_hsl(var(--navy)/0.35)]">
        <p className="text-4xl font-bold tracking-[-0.03em] text-primary">{badge.value}</p>
        <p className="mt-1 text-sm font-bold leading-5 text-foreground">{badge.label}</p>
      </div>
    ) : null}
  </div>
);

export default BrandImageCard;
