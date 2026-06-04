import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, VIEWPORT, EASE_OUT } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** translate distance in px (defaults 28) */
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Scroll reveal: fade + slide up as it enters the viewport.
 * Respects prefers-reduced-motion (renders static).
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
      variants={fadeUp}
    >
      {children}
    </MotionTag>
  );
}
