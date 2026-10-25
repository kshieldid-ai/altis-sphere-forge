import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ScrollRevealProps = {
  children: ReactNode;
  /** Délai supplémentaire en secondes */
  delay?: number;
  className?: string;
};

/**
 * Apparition discrète (fondu + léger décalage vertical) à l'entrée
 * dans le viewport. Une seule fois, et désactivée si l'utilisateur
 * a demandé à réduire les animations.
 */
const ScrollReveal = ({ children, delay = 0, className }: ScrollRevealProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
