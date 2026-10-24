import { type ReactNode, useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type AnimationKey =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "rotate-in"
  | "blur-in"
  | "flip-x"
  | "flip-y";

const ANIMATIONS: Record<AnimationKey, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  "zoom-out": {
    hidden: { opacity: 0, scale: 1.15 },
    visible: { opacity: 1, scale: 1 },
  },
  "rotate-in": {
    hidden: { opacity: 0, rotate: -6, y: 20 },
    visible: { opacity: 1, rotate: 0, y: 0 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "flip-x": {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { opacity: 1, rotateX: 0 },
  },
  "flip-y": {
    hidden: { opacity: 0, rotateY: -90 },
    visible: { opacity: 1, rotateY: 0 },
  },
};

const ANIMATION_KEYS = Object.keys(ANIMATIONS) as AnimationKey[];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type ScrollRevealProps = {
  children: ReactNode;
  /** Délai supplémentaire en secondes (ajouté à une valeur aléatoire) */
  delay?: number;
  /** Forcer une animation précise au lieu d'une aléatoire */
  animation?: AnimationKey;
  className?: string;
  /** Rejouer à chaque entrée dans le viewport (défaut : une seule fois) */
  repeat?: boolean;
};

/**
 * Enveloppe son contenu et applique une animation aléatoire déclenchée
 * lorsque l'élément entre dans le viewport pendant le scroll.
 */
const ScrollReveal = ({
  children,
  delay = 0,
  animation,
  className,
  repeat = false,
}: ScrollRevealProps) => {
  const reduceMotion = useReducedMotion();
  const { chosen, baseDelay } = useMemo(() => {
    const chosen = animation ?? pickRandom(ANIMATION_KEYS);
    const baseDelay = Math.random() * 0.25;
    return { chosen, baseDelay };
  }, [animation]);

  if (reduceMotion) {
    return <motion.div className={className}>{children}</motion.div>;
  }

  return (
    <motion.div
      className={className}
      variants={ANIMATIONS[chosen]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "-80px" }}
      transition={{ duration: 0.7, delay: baseDelay + delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
