import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type Slide = { src: string; label?: string };

/**
 * Centered-slide carousel: the active image is prominent, neighbours peek at
 * the edges. Two round nav buttons (light = prev, blue = next), matching Figma.
 */
export default function Carousel({ slides, fluid = false }: { slides: Slide[]; fluid?: boolean }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const n = slides.length;
  const go = (d: number) => setIndex((i) => (i + d + n) % n);
  const heightClass = fluid ? "h-[320px] sm:h-[460px] lg:h-[540px]" : "h-[280px] sm:h-[350px]";

  return (
    <div className="select-none">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex items-center gap-5"
          animate={{ x: `calc(50% - ${index * 64.5}% - 32.25%)` }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT }}
        >
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <div
                key={i}
                className={`relative ${heightClass} w-[59%] shrink-0 overflow-hidden rounded-[16px]`}
                style={{ opacity: active ? 1 : 0.5, transform: `scale(${active ? 1 : 0.94})`, transition: "opacity .5s, transform .5s" }}
              >
                <img src={s.src} alt={s.label ?? ""} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-brand-deep/45" />
                <span className="absolute inset-0 flex items-center justify-center text-[14px] font-semibold uppercase tracking-[3px] text-white/80">
                  ✳ STARTRADER
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-3">
        <button
          type="button" aria-label="Previous" onClick={() => go(-1)}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-brand-blue hover:text-brand-blue"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          type="button" aria-label="Next" onClick={() => go(1)}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brand-blue text-white transition-colors hover:brightness-110"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
