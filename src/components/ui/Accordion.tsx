import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export type AccordionItem = { q: string; a: string };

type Props = {
  items: AccordionItem[];
  /** index open by default */
  defaultOpen?: number;
  tone?: "light" | "dark";
  /** show an editorial 01 / 02 index before each row */
  numbered?: boolean;
};

export default function Accordion({ items, defaultOpen = 0, tone = "light", numbered = false }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduce = useReducedMotion();
  const dark = tone === "dark";

  return (
    <div className="w-full">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={it.q}
            onMouseEnter={() => setOpen(i)}
            className={[
              "group rounded-[10px] border-t px-3 transition-colors duration-300 first:border-t-0",
              dark ? "border-white/15 hover:bg-white/[0.06]" : "border-line hover:bg-[rgba(218,227,237,0.45)]",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-baseline gap-4">
                {numbered && (
                  <span
                    className={[
                      "font-alt text-[13px] font-medium tabular-nums tracking-[0.18em] transition-colors duration-300",
                      isOpen ? "text-brand-blue" : dark ? "text-white/40" : "text-ink/35",
                    ].join(" ")}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <span
                  className={[
                    "text-[16px] transition-all duration-300",
                    dark ? "text-white" : "text-ink",
                    isOpen ? "font-medium opacity-100" : "font-normal opacity-50",
                  ].join(" ")}
                >
                  {it.q}
                </span>
              </span>
              <span
                className={[
                  "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[5px] transition-colors duration-300",
                  isOpen ? "bg-brand-blue text-white" : dark ? "bg-white/15 text-white" : "bg-line text-ink",
                ].join(" ")}
              >
                <motion.svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className={`pb-6 pr-12 text-body ${dark ? "text-white/70" : "text-[#50555b]"}`}>{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
