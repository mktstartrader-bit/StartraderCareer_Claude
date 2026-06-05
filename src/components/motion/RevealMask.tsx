import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

/**
 * Kinetic line-mask reveal (the inner content slides up out of an overflow clip).
 *
 * The OUTER clip is the observed element — it sits in normal flow and is always
 * in view, so `whileInView` fires reliably and propagates the variant to the
 * inner slide. (Observing the inner directly would deadlock: its initial offset
 * pushes it outside the clip → 0 intersection → the trigger never fires.)
 */
export default function RevealMask({ children, className = "", delay = 0, duration = 0.8 }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: {} }}
    >
      <motion.div
        variants={{
          hidden: { y: "115%" },
          show: { y: 0, transition: { duration, ease: EASE_OUT, delay } },
        }}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
