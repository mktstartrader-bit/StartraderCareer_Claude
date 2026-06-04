import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Eyebrow from "@/components/ui/Eyebrow";

export type Feature = { icon: string; title: string; desc: string };

type Props = {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  items: Feature[];
};

/**
 * Dark navy-gradient section: eyebrow + heading (+ subtitle), then a row of
 * columns — each a white icon tile, a top hairline, a title and a description.
 * Shared by STARLIFE "Why set your course with us?" and STARSCOUT "Your journey".
 */
export default function IconFeatures({ eyebrow, heading, subtitle, items }: Props) {
  return (
    <section className="bg-navy-grad py-[90px] text-white">
      <div className="shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-14">
          <Reveal className="shrink-0">
            <Eyebrow label={eyebrow} tone="dark" />
          </Reveal>
          <Reveal>
            <h2 className="text-[clamp(28px,3.6vw,40px)] font-medium tracking-[-1px] text-white">{heading}</h2>
            {subtitle && <p className="mt-2 font-alt text-[14px] leading-[30px] text-line">{subtitle}</p>}
          </Reveal>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f) => (
            <StaggerItem key={f.title}>
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[10px] bg-white">
                <img src={f.icon} alt="" className="h-[34px] w-[34px]" />
              </div>
              <h3 className="mt-6 text-[16px] font-medium tracking-[-0.5px] text-white">{f.title}</h3>
              <p className="mt-3 max-w-[230px] text-[14px] leading-[20px] text-white/75">{f.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
