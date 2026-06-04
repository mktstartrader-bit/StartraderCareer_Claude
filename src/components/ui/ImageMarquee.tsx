import type { CSSProperties } from "react";

type Slide = { src: string; label?: string };

/**
 * Full-width strip of images that auto-scrolls horizontally and pauses on
 * hover/focus. The list is duplicated so the loop is seamless at -50%.
 */
export default function ImageMarquee({ slides, speed = 45 }: { slides: Slide[]; speed?: number }) {
  const list = [...slides, ...slides];
  return (
    <div className="marquee group relative overflow-hidden">
      {/* soft edge fades against the white section */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24" />

      <ul
        className="marquee-track flex w-max gap-5 px-[15px]"
        style={{ "--marquee-duration": `${speed}s` } as CSSProperties}
      >
        {list.map((s, i) => {
          const dup = i >= slides.length;
          return (
            <li
              key={i}
              aria-hidden={dup}
              className="group/item relative h-[200px] w-[300px] shrink-0 overflow-hidden rounded-[16px] shadow-card sm:h-[240px] sm:w-[360px]"
            >
              <img
                src={s.src}
                alt={dup ? "" : s.label ?? ""}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/item:scale-105"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
