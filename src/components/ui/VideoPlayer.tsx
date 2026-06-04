import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Click-to-play video. The poster (thumbnail) shows instantly; the heavy video
 * file is only fetched once the user hits play — keeps the homepage fast.
 */
export default function VideoPlayer({ src, poster }: { src: string; poster: string }) {
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  if (playing) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        className="h-full w-full bg-black object-cover"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play STARTRADER banner video"
      className="group relative block h-full w-full overflow-hidden"
    >
      <img
        src={poster}
        alt="STARTRADER — Dream Chasers"
        className="h-full w-full scale-105 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-brand-deep/25 transition-colors duration-300 group-hover:bg-brand-deep/10" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex h-[88px] w-[88px] items-center justify-center">
          {!reduce && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full bg-white/30"
                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="absolute inset-0 rounded-full bg-white/30"
                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
              />
            </>
          )}
          <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-lift transition-transform duration-300 group-hover:scale-110">
            <span className="ml-1 block h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-brand-blue transition-colors group-hover:border-l-brand-navy" />
          </span>
        </span>
      </span>
    </button>
  );
}
