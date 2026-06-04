import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerParent, staggerChild, VIEWPORT } from "@/lib/motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

/** Grid/list container that reveals its <Stagger.Item> children in sequence. */
export function Stagger({ children, className, stagger = 0.09, delay = 0 }: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
};

export function StaggerItem({ children, className, as = "div" }: ItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  if (reduce) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <MotionTag className={className} variants={staggerChild}>
      {children}
    </MotionTag>
  );
}
