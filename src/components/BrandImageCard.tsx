import { useCallback, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CountUp from "@/components/CountUp";
import { cn } from "@/lib/utils";

export type BrandImage = { src: string; alt: string };

type Props = {
  /** Une image, ou plusieurs pour un diaporama */
  images: BrandImage[];
  /** Texte en surimpression, en bas à gauche */
  caption?: ReactNode;
  /** Badge flottant (chiffre clé), en bas à droite */
  badge?: { value: string; label: string };
  /** Délai entre deux images du diaporama (ms) */
  interval?: number;
  className?: string;
};

/** Les deux bandes diagonales (mêmes positions que .diagonal-bands). */
const BANDS = [
  { className: "right-[18%] w-[4.5rem] bg-primary/55", delay: 0 },
  { className: "right-[4%] w-28 bg-sky/[0.12]", delay: 0.12 },
];

/**
 * Bandes diagonales qui balaient l'image depuis la droite.
 * `cycle` change à chaque photo : les bandes sont remontées et rejouent l'entrée.
 */
const AnimatedBands = ({ cycle, animated }: { cycle: number; animated: boolean }) => (
  <div className="pointer-events-none absolute inset-y-0 right-0 w-2/3 overflow-hidden" aria-hidden="true">
    {BANDS.map((band) => (
      <motion.div
        key={`${band.className}-${cycle}`}
        // L'inclinaison passe par framer-motion : une classe skew-x serait écrasée par son transform
        className={cn("absolute -inset-y-[10%]", band.className)}
        initial={animated ? { x: "160%", skewX: -22, opacity: 0 } : false}
        animate={{ x: 0, skewX: -22, opacity: 1 }}
        transition={{ duration: 0.9, delay: band.delay, ease: [0.22, 1, 0.36, 1] }}
      />
    ))}
  </div>
);

const roundButton =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-navy/30 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-navy";

/** Photo arrondie avec bandes diagonales de marque, légende et diaporama optionnel. */
const BrandImageCard = ({ images, caption, badge, interval = 5000, className }: Props) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const isSlider = images.length > 1;

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + images.length) % images.length),
    [images.length],
  );

  // Défilement automatique, suspendu au survol / focus et si animations réduites
  useEffect(() => {
    if (!isSlider || paused || reduceMotion) return;
    const timer = setInterval(() => go(1), interval);
    return () => clearInterval(timer);
  }, [isSlider, paused, reduceMotion, interval, go]);

  return (
    <div className={cn("relative", badge && "pb-8 pr-6", className)}>
      <div
        className="relative isolate overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_hsl(var(--navy)/0.45)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        {...(isSlider && { role: "region", "aria-roledescription": "carrousel", "aria-label": "Photos de nos réalisations" })}
      >
        <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]">
          {images.map((image, i) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              aria-hidden={i !== index}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(var(--navy)/0.85),hsl(var(--navy)/0.15)_55%,transparent)]" aria-hidden="true" />
        <AnimatedBands cycle={index} animated={isSlider && !reduceMotion} />

        {isSlider ? (
          <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-4">
            <div className="flex gap-1.5">
              {images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Afficher la photo ${i + 1} sur ${images.length}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-sky" : "w-5 bg-white/50 hover:bg-white/80",
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="Photo précédente" className={roundButton}>
                <ArrowLeft size={17} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Photo suivante" className={roundButton}>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        ) : null}

        {caption ? (
          <p className="absolute bottom-7 left-7 right-7 text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl">
            {caption}
          </p>
        ) : null}
      </div>

      {badge ? (
        <div className="absolute bottom-0 right-0 w-36 rounded-xl border-b-4 border-primary bg-card px-4 py-5 text-center shadow-[0_20px_40px_-15px_hsl(var(--navy)/0.35)]">
          <CountUp value={badge.value} className="block text-4xl font-bold tracking-[-0.03em] text-primary" />
          <p className="mt-1 text-sm font-bold leading-5 text-foreground">{badge.label}</p>
        </div>
      ) : null}
    </div>
  );
};

export default BrandImageCard;
