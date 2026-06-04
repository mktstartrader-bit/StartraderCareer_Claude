import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

type Props = {
  children: ReactNode; // the left-hand text block
  images: string[]; // tiled into the diagonal collage (9 used)
  bg?: string; // section background utility
};

/**
 * Shared hero for STARLIFE / ABOUT / STARSOCIAL: left text, right diagonal
 * tiled photo collage (rotated 18°, parallax). Mobile shows a scroll strip.
 */
export default function CollageHero({ children, images, bg = "bg-[rgba(218,227,237,0.25)]" }: Props) {
  const tiles = Array.from({ length: 9 }, (_, i) => images[i % images.length]);
  return (
    <section className={`relative overflow-hidden ${bg} pt-[70px]`}>
      <div className="shell relative grid grid-cols-1 items-center gap-10 py-16 lg:min-h-[630px] lg:grid-cols-[1fr_0.9fr]">
        <div className="relative z-10">{children}</div>
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
