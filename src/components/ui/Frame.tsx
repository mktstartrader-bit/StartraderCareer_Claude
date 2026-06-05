import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type Tint = "none" | "duotone" | "scrim" | "navy" | "blue";

const TINT: Record<Tint, string> = {
  none: "",
  // cohesive brand-blue cast over every photo (the shared "image treatment")
  duotone:
    "bg-gradient-to-br from-brand-navy/40 via-brand-blue/10 to-transparent mix-blend-multiply",
  // legibility gradient for captions sitting on the image
  scrim: "bg-gradient-to-t from-brand-deep/85 via-brand-deep/15 to-transparent",
  navy: "bg-brand-navy/25",
  blue: "bg-gradient-to-t from-brand-blue/55 via-brand-blue/5 to-transparent",
};

type Props = {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  rounded?: string;
  tint?: Tint;
  /** hairline ring; pass a ring-* utility string, or false to disable */
  ringClass?: string | false;
  /** hover zoom (ignored when parallax is set) */
  zoom?: boolean;
  eager?: boolean;
  /** self-contained parallax: the oversized image drifts ±px inside a fixed frame */
  parallax?: number;
  /** extra overlay layers rendered above the tint (chips, labels, gradients) */
  overlay?: ReactNode;
  children?: ReactNode;
};

/**
 * Art-directed image frame shared across the redesigned STARLIFE / ABOUT pages:
 * rounded + masked, a subtle brand-tinted duotone wash, a hairline ring and
 * depth. Optionally parallaxes its own image (no clipped corners) or zooms on
 * hover. One consistent photo treatment so the pages read as one product.
 */
export default function Frame({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  rounded = "rounded-[24px]",
  tint = "duotone",
  ringClass = "ring-1 ring-line/60",
  zoom = true,
  eager = false,
  parallax,
  overlay,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const d = parallax ?? 0;
  const y = useTransform(scrollYProgress, [0, 1], [d, -d]);

  return (
    <div
      ref={ref}
      className={[
        "group relative isolate overflow-hidden",
        rounded,
        ringClass || "",
        className,
      ].join(" ")}
    >
      {parallax ? (
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={reduce ? undefined : { y, willChange: "transform" }}
          className={`absolute inset-x-0 top-[-14%] h-[128%] w-full object-cover ${imgClassName}`}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={[
            "h-full w-full object-cover",
            zoom
              ? "transition-transform duration-[700ms] ease-out-soft group-hover:scale-[1.06]"
              : "",
            imgClassName,
          ].join(" ")}
        />
      )}

      {tint !== "none" && (
        <span className={`pointer-events-none absolute inset-0 ${TINT[tint]}`} />
      )}
      {overlay}
      {children}
    </div>
  );
}
