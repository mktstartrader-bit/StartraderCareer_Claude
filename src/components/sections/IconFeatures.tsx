import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Eyebrow from "@/components/ui/Eyebrow";
import { EASE_OUT } from "@/lib/motion";

export type Feature = { icon: string; title: string; desc: string };

type Props = {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  items: Feature[];
};

/**
 * Dark navy-gradient section: eyebrow + heading (+ subtitle), then a row of
 * columns — each a white icon tile, a divider line UNDER the tile that sweeps
 * in (blue→cyan), a title and a description. Tiles lift + glow on hover.
 * Shared by STARLIFE "Why set your course with us?" and STARSCOUT "Your journey".
 */
export default function IconFeatures({ eyebrow, heading, subtitle, items }: Props) {
  const reduce = useReducedMotion();
  return (
    <section className="bg-navy-grad py-[90px] text-white">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <Reveal className="shrink-0">
            <Eyebrow label={eyebrow} tone="dark" />
          </Reveal>
          <div className="lg:w-[62%]">
            <Reveal>
              <h2 className="text-[clamp(28px,3.6vw,40px)] font-medium tracking-[-1px] text-white lg:whitespace-nowrap">{heading}</h2>
            </Reveal>
            {subtitle && (
              <Reveal delay={0.08}>
                <p className="mt-2 font-alt text-[14px] leading-[30px] text-line">{subtitle}</p>
              </Reveal>
            )}
          </div>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f, i) => (
            <StaggerItem key={f.title} className="group cursor-default">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[12px] bg-white shadow-[0_8px_24px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-[0_16px_38px_-10px_rgba(22,233,215,0.6)]">
                <img src={f.icon} alt="" className="h-[34px] w-[34px] transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* divider UNDER the icon tile — sweeps in blue→cyan on view, brightens on hover */}
              <div className="relative mt-6 h-px w-full overflow-hidden bg-white/15">
                <motion.span
                  className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-brand-blue to-brand-cyan"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: EASE_OUT, delay: reduce ? 0 : 0.12 * i }}
                />
              </div>

              <h3 className="mt-5 text-[16px] font-medium tracking-[-0.5px] text-white transition-colors duration-300 group-hover:text-brand-cyan">
                {f.title}
              </h3>
              <p className="mt-3 max-w-[230px] text-[14px] leading-[20px] text-white/75">{f.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
