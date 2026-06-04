import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** total travel in px across the scroll window (positive = moves up) */
  distance?: number;
};

/**
 * Subtle parallax: child drifts as the element passes through the viewport.
 * Used on hero images and photo collages. Disabled under reduced-motion.
 */
export default function Parallax({ children, className, distance = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={reduce ? undefined : { y, willChange: "transform" }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
