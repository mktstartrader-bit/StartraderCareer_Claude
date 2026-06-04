import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { EPISODES } from "@/data/podcast";

function fmt(t: number) {
  if (!isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ── animated audio signal (equalizer bars) ─────────────────────────── */
const SEEDS = [0.45, 0.8, 0.6, 1, 0.55, 0.9, 0.7];

function Equalizer({ playing, bars = 5, className = "" }: { playing: boolean; bars?: number; className?: string }) {
  const reduce = useReducedMotion();
  const seeds = Array.from({ length: bars }, (_, i) => SEEDS[i % SEEDS.length]);
  return (
    <span className={`flex items-end gap-[3px] ${className}`} aria-hidden>
      {seeds.map((seed, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-current"
          initial={{ height: "30%" }}
          animate={
            playing && !reduce
              ? { height: [`${22 + seed * 20}%`, `${55 + seed * 45}%`, `${28 + seed * 12}%`] }
              : { height: "26%" }
          }
          transition={
            playing && !reduce
              ? { duration: 0.55 + seed * 0.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.07 }
              : { duration: 0.3 }
          }
        />
      ))}
    </span>
  );
}

/* ── full-width signal strip shown in the featured card ─────────────── */
function SignalStrip({ playing }: { playing: boolean }) {
  const reduce = useReducedMotion();
  const bars = Array.from({ length: 40 }, (_, i) => SEEDS[i % SEEDS.length]);
  return (
    <div className="flex h-[34px] items-center gap-[3px] text-brand-cyan/80" aria-hidden>
      {bars.map((seed, i) => (
        <motion.span
          key={i}
          className="w-[3px] flex-1 rounded-full bg-current"
          initial={{ height: "18%" }}
          animate={
            playing && !reduce
              ? { height: [`${14 + seed * 16}%`, `${40 + seed * 55}%`, `${18 + seed * 14}%`] }
              : { height: "16%" }
          }
          transition={
            playing && !reduce
              ? { duration: 0.5 + seed * 0.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: (i % 8) * 0.06 }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

/* ── draggable / clickable / keyboard seek bar ──────────────────────── */
function SeekBar({
  value,
  max,
  onSeek,
  onScrubStart,
  onScrubEnd,
}: {
  value: number;
  max: number;
  onSeek: (ratio: number) => void;
  onScrubStart: () => void;
  onScrubEnd: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const ratio = max > 0 ? Math.min(1, value / max) : 0;

  const ratioFromX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return (clientX - r.left) / r.width;
  };

  const down = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    onScrubStart();
    onSeek(ratioFromX(e.clientX));
  };
  const move = (e: React.PointerEvent) => {
    if (e.buttons === 0) return;
    onSeek(ratioFromX(e.clientX));
  };
  const up = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    onScrubEnd();
  };
  const key = (e: React.KeyboardEvent) => {
    if (max <= 0) return;
    const step = 5 / max; // 5-second nudges
    if (e.key === "ArrowRight") { e.preventDefault(); onSeek(ratio + step); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); onSeek(ratio - step); }
    else if (e.key === "Home") { e.preventDefault(); onSeek(0); }
    else if (e.key === "End") { e.preventDefault(); onSeek(1); }
  };

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.round(max) || 0}
      aria-valuenow={Math.round(value)}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onKeyDown={key}
      className="group relative h-[18px] flex-1 cursor-pointer touch-none select-none outline-none"
    >
      {/* rail */}
      <span className="absolute left-0 top-1/2 h-[5px] w-full -translate-y-1/2 rounded-full bg-[rgba(218,227,237,0.4)]" />
      {/* fill */}
      <span
        className="absolute left-0 top-1/2 h-[5px] -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan"
        style={{ width: `${ratio * 100}%` }}
      />
      {/* thumb */}
      <span
        className="absolute top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-brand-cyan bg-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform duration-150 group-focus-visible:scale-125 group-hover:scale-110"
        style={{ left: `${ratio * 100}%` }}
      />
    </div>
  );
}

function PlayIcon({ playing, size = 16 }: { playing: boolean; size?: number }) {
  return playing ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ) : (
    <span className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" />
  );
}

export default function StarcastPlayer() {
  const mediaRef = useRef<HTMLVideoElement>(null);
  const dragging = useRef(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const ep = EPISODES[index];

  const play = useCallback(() => {
    mediaRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);
  const pause = useCallback(() => {
    mediaRef.current?.pause();
    setPlaying(false);
  }, []);
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, play, pause]);

  const goTo = useCallback((i: number) => {
    setIndex(((i % EPISODES.length) + EPISODES.length) % EPISODES.length);
    setCurrent(0);
    setPlaying(true);
  }, []);

  const selectEpisode = (i: number) => (i === index ? toggle() : goTo(i));

  // when the episode changes, load the new source and (if we intend to) play
  useEffect(() => {
    const m = mediaRef.current;
    if (!m) return;
    setDuration(0);
    m.load();
    if (playing) m.play().catch(() => setPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const seek = (r: number) => {
    const m = mediaRef.current;
    const d = m?.duration || duration;
    if (!m || !d || !isFinite(d)) return;
    const t = Math.max(0, Math.min(1, r)) * d;
    m.currentTime = t;
    setCurrent(t);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[500px_1fr]">
      {/* hidden media engine — kept in the layout (1px) so iOS will play it */}
      <video
        ref={mediaRef}
        src={ep.src}
        playsInline
        preload="metadata"
        className="pointer-events-none absolute h-px w-px opacity-0"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          if (!dragging.current) setCurrent(e.currentTarget.currentTime);
        }}
        onEnded={() => goTo(index + 1)}
      />

      {/* ── featured player ─────────────────────────────────────────── */}
      <div className="rounded-[20px] border border-line/20 bg-gradient-to-b from-[rgba(0,20,137,0.6)] to-[rgba(13,13,75,0.6)] p-7 backdrop-blur-[7px]">
        <div className="flex items-start gap-4">
          <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[12px]">
            <img src={ep.thumb} alt="" className="h-full w-full object-cover" />
            {playing && (
              <span className="absolute inset-0 flex items-center justify-center bg-brand-deep/45 text-white">
                <Equalizer playing bars={4} className="h-4 text-brand-cyan" />
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[12px] uppercase tracking-wide text-brand-cyan">Featured · Episode {ep.n}</p>
            <h3 className="mt-1 text-[20px] font-medium leading-tight text-white">{ep.title}</h3>
            <p className="mt-1 text-[13px] text-white/60">{ep.guest}</p>
          </div>
        </div>

        <p className="mt-5 min-h-[66px] text-[14px] leading-[22px] text-white/75">{ep.excerpt}</p>

        <SignalStrip playing={playing} />

        {/* transport */}
        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous episode"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M7 6v12H5V6h2zm12 0v12l-9-6 9-6z" />
            </svg>
          </button>
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-white text-brand-blue transition-transform hover:scale-105"
          >
            <PlayIcon playing={playing} size={18} />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next episode"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17 6v12h2V6h-2zM5 6v12l9-6-9-6z" />
            </svg>
          </button>

          <SeekBar
            value={current}
            max={duration}
            onSeek={seek}
            onScrubStart={() => (dragging.current = true)}
            onScrubEnd={() => (dragging.current = false)}
          />
          <span className="shrink-0 text-[12px] tabular-nums text-white/60">
            {fmt(current)} / {fmt(duration)}
          </span>
        </div>
      </div>

      {/* ── episode list ────────────────────────────────────────────── */}
      <Stagger className="rounded-[20px] border border-line/20 bg-gradient-to-b from-[rgba(0,20,137,0.6)] to-[rgba(13,13,75,0.6)] p-3 backdrop-blur-[7px]">
        {EPISODES.map((e, i) => {
          const active = i === index;
          const isPlaying = active && playing;
          return (
            <StaggerItem key={e.n}>
              <button
                onClick={() => selectEpisode(i)}
                aria-current={active}
                className={`flex w-full items-center gap-4 rounded-[14px] px-4 py-3 text-left transition-colors ${
                  active ? "bg-white/10 ring-1 ring-white/15" : "hover:bg-white/5"
                }`}
              >
                <span className="flex w-6 shrink-0 justify-center">
                  {isPlaying ? (
                    <Equalizer playing bars={3} className="h-3 text-brand-cyan" />
                  ) : (
                    <span className={`text-[13px] ${active ? "text-brand-cyan" : "text-white/40"}`}>{e.n}</span>
                  )}
                </span>
                <img src={e.thumb} alt="" className="h-[56px] w-[56px] shrink-0 rounded-[10px] object-cover" />
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-[15px] font-medium ${active ? "text-white" : "text-white/90"}`}>
                    {e.title}
                  </span>
                  <span className="text-[12px] text-white/55">{e.category}</span>
                </span>
                <span className="hidden shrink-0 rounded-full border border-white/20 px-3 py-1 text-[12px] text-white/70 sm:block">
                  {active && duration ? fmt(duration) : "Listen"}
                </span>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                    active ? "bg-brand-blue text-white" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <PlayIcon playing={isPlaying} size={14} />
                </span>
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
