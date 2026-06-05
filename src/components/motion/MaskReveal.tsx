import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** direction the brand cover panel slides away toward */
  from?: "bottom" | "top" | "left";
  /** corner radius (px) */
  radius?: number;
};

const EXIT = {
  bottom: { y: "-101%", x: "0%" },
  top: { y: "101%", x: "0%" },
  left: { x: "101%", y: "0%" },
};

/**
 * Scroll-driven image reveal: a brand-navy panel covers the frame, then wipes
 * away (with the image settling from a faint zoom) as it enters the viewport.
 *
 * The OBSERVED element is the un-clipped outer frame, so `whileInView` always
 * fires — unlike a self-clipping clip-path mask, which deadlocks when its
 * initial state hides the very element the observer is watching.
 */
export default function MaskReveal({
  children,
  className = "",
  delay = 0,
  from = "bottom",
  radius = 24,
}: Props) {
  const reduce = useReducedMotion();
  const style = { borderRadius: radius };

  if (reduce) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: {} }}
    >
      <motion.div
        className="h-full w-full"
        style={{ willChange: "transform" }}
        variants={{
          hidden: { scale: 1.08 },
          show: { scale: 1, transition: { duration: 1.05, ease: EASE_OUT, delay } },
        }}
      >
        {children}
      </motion.div>

      <motion.span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-brand-navy to-brand-blue"
        variants={{
          hidden: { x: "0%", y: "0%" },
          show: { ...EXIT[from], transition: { duration: 0.85, ease: EASE_OUT, delay } },
        }}
      />
    </motion.div>
  );
}
