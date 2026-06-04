import type { Variants, Transition } from "framer-motion";

/**
 * One motion language for the whole product.
 * ease-out / spring, 200–600ms, staggered reveals.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const T_BASE: Transition = { duration: 0.6, ease: EASE_OUT };
export const T_FAST: Transition = { duration: 0.32, ease: EASE_OUT };
export const SPRING: Transition = { type: "spring", stiffness: 260, damping: 26 };

/** Default in-view trigger: fire once, a little before fully on screen. */
export const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: T_BASE },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: T_BASE },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: T_BASE },
};

/** Container that staggers its children's reveals. */
export const staggerParent = (stagger = 0.09, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: T_BASE },
};

/** Page enter/exit transition (route changes). */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.28, ease: EASE_OUT } },
};
