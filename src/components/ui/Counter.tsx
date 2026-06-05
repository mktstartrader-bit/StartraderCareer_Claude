import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  /** target value to count up to */
  to: number;
  from?: number;
  /** seconds */
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** group thousands with commas (1,000) */
  separator?: boolean;
  className?: string;
};

/**
 * Animated count-up. Fires once when scrolled into view; eases out so the number
 * settles rather than stops dead. Respects prefers-reduced-motion (renders the
 * final value immediately). Used for ABOUT's awards / presence figures — the
 * resting text always equals the exact frozen copy (e.g. "30+").
 */
export default function Counter({
  to,
  from = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = false,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setVal(from + (to - from) * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, from, duration]);

  const fmt = (n: number) => {
    const fixed = n.toFixed(decimals);
    if (!separator) return fixed;
    const [int, dec] = fixed.split(".");
    const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return dec ? `${grouped}.${dec}` : grouped;
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {fmt(val)}
      {suffix}
    </span>
  );
}
