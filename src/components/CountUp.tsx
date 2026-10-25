import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Props = {
  /** Valeur affichée, ex. « 10+ », « 24/7 », « 6 » : seul le nombre initial est animé. */
  value: string;
  /** Durée de l'incrémentation, en secondes */
  duration?: number;
  className?: string;
};

/** Compteur qui s'incrémente de 0 à la valeur cible à son apparition à l'écran. */
const CountUp = ({ value, duration = 1.8, className }: Props) => {
  const match = value.match(/^(\d+)(.*)$/);
  const isNumeric = match !== null;
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (!isNumeric || !inView) return;
    if (reduceMotion) {
      setCurrent(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, target, duration, reduceMotion, isNumeric]);

  // Valeur non numérique : affichée telle quelle
  if (!isNumeric) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {/* Les lecteurs d'écran lisent directement la valeur finale */}
      <span aria-hidden="true">
        {current}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
};

export default CountUp;
