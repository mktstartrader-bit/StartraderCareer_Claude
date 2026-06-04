import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

type Props = {
  children: ReactNode; // the left-hand text block
  images: string[];
  bg?: string; // section background utility
  /** when true, the right side is a continuously auto-scrolling photo marquee */
  marquee?: boolean;
};

const EDGE_MASK =
  "linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)";

function MarqueeColumn({
  images,
  dir,
  duration,
  reduce,
}: {
  images: string[];
  dir: "up" | "down";
  duration: number;
  reduce: boolean | null;
}) {
  // tripled so the loop point (−33.33%) is seamless and the column never empties
  const list = [...images, ...images, ...images];
  return (
    <div className="h-full w-[168px] shrink-0 overflow-hidden">
      <motion.div
        animate={reduce ? undefined : { y: dir === "up" ? ["0%", "-33.3333%"] : ["-33.3333%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {list.map((s, i) => (
          <div key={i} className="mb-4 h-[210px] w-[168px] overflow-hidden rounded-[14px] shadow-lift">
            <img src={s} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Shared hero for STARLIFE / ABOUT / STARSOCIAL: left text block, right photo
 * collage. Default = a tilted parallax grid; `marquee` = continuously scrolling
 * columns with softly-masked top/bottom edges (used on About).
 */
export default function CollageHero({ children, images, bg = "bg-[rgba(218,227,237,0.25)]", marquee = false }: Props) {
  const reduce = useReducedMotion();
  const tiles = Array.from({ length: 9 }, (_, i) => images[i % images.length]);

  // rotate the image list per column so the three columns differ
  const colA = images;
  const colB = [...images.slice(1), ...images.slice(0, 1)];
  const colC = [...images.slice(2), ...images.slice(0, 2)];

  return (
    <section className={`relative overflow-hidden ${bg} pt-[70px]`}>
      <div className="shell relative grid grid-cols-1 items-center gap-10 py-16 lg:min-h-[630px] lg:grid-cols-[1fr_0.9fr]">
        <div className="relative z-10">{children}</div>

        {marquee ? (
          <div
            className="hidden h-[540px] justify-end gap-4 lg:flex"
            style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
          >
            <MarqueeColumn images={colA} dir="up" duration={30} reduce={reduce} />
            <MarqueeColumn images={colB} dir="down" duration={36} reduce={reduce} />
            <MarqueeColumn images={colC} dir="up" duration={26} reduce={reduce} />
          </div>
        ) : (
          <div className="relative hidden h-[520px] lg:block">
            <Parallax className="absolute -right-[12%] -top-10 h-[680px] w-[760px]" distance={40}>
              <div className="origin-center rotate-[18deg]">
                <div className="grid grid-cols-3 gap-4">
                  {tiles.map((s, i) => (
                    <div key={i} className="h-[230px] overflow-hidden rounded-[12px] shadow-lift">
                      <img src={s} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </Parallax>
          </div>
        )}
      </div>

      {/* mobile strip */}
      <div className="shell flex gap-4 overflow-x-auto pb-12 lg:hidden">
        {images.slice(0, 4).map((s, i) => (
          <Reveal key={i} className="h-[200px] w-[150px] shrink-0 overflow-hidden rounded-[10px] shadow-lift sm:h-[240px] sm:w-[178px]">
            <img src={s} alt="" className="h-full w-full object-cover" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
