import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

type Props = {
  eyebrow: string;
  tone?: "light" | "dark";
  title: ReactNode;
  intro?: ReactNode;
  /** "split" = eyebrow left / title right (editorial); "center" = stacked center */
  align?: "split" | "center";
  /** decorative index e.g. "01" shown beside the eyebrow */
  index?: string;
  className?: string;
};

/**
 * Editorial section header shared by both redesigned pages. The "split" variant
 * pins a small eyebrow (and optional index) to the left and lets the heading +
 * intro carry the right two-thirds — the asymmetry that breaks the boxy rhythm.
 */
export default function SectionHeading({
  eyebrow,
  tone = "light",
  title,
  intro,
  align = "split",
  index,
  className = "",
}: Props) {
  const dark = tone === "dark";
  const titleColor = dark ? "text-white" : "text-ink";
  const introColor = dark ? "text-white/70" : "text-[#50555b]";

  if (align === "center") {
    return (
      <div className={`mx-auto max-w-[640px] text-center ${className}`}>
        <Reveal className="flex justify-center">
          <Eyebrow label={eyebrow} tone={dark ? "dark" : "light"} />
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`mt-6 section-title ${titleColor}`}>{title}</h2>
        </Reveal>
        {intro && (
          <Reveal delay={0.12}>
            <p className={`mt-4 text-body leading-[1.7] ${introColor}`}>{intro}</p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between ${className}`}
    >
      <Reveal className="flex shrink-0 items-center gap-4">
        {index && (
          <span
            className={`font-alt text-[13px] font-medium tabular-nums tracking-[0.2em] ${
              dark ? "text-brand-cyan" : "text-brand-blue"
            }`}
          >
            {index}
          </span>
        )}
        <Eyebrow label={eyebrow} tone={dark ? "dark" : "light"} />
      </Reveal>
      <div className="lg:w-[60%]">
        <Reveal>
          <h2 className={`section-title ${titleColor}`}>{title}</h2>
        </Reveal>
        {intro && (
          <Reveal delay={0.08}>
            <p className={`mt-4 text-body leading-[1.7] ${introColor}`}>{intro}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
