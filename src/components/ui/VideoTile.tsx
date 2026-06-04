import { useEffect, useRef, useState } from "react";

/**
 * Autoplaying, muted, looped video tile for gallery mosaics. The video only
 * plays while it's on screen (IntersectionObserver) so a wall of clips never
 * decodes all at once. Click toggles sound; keeps the gradient + label overlay
 * used across the photo mosaics.
 */
export default function VideoTile({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => setMuted((m) => !m)}
      aria-label={muted ? `Unmute ${label}` : `Mute ${label}`}
      className={`group relative block overflow-hidden rounded-[12px] ${className}`}
    >
      <video
        ref={ref}
        src={src}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/30 to-transparent" />
      <span className="absolute bottom-4 left-4 text-[13px] font-medium uppercase tracking-wide text-white/85">{label}</span>

      {/* sound state pill */}
      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-deep/40 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-brand-blue">
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" />
            <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" />
            <path d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </button>
  );
}
