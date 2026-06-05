import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { EASE_OUT } from "@/lib/motion";
import footerStar from "@/assets/brand/footer-star.svg";

type Props = {
  title: ReactNode;
  buttonLabel: string;
  buttonTo: string;
  image: string;
  imageAlt?: string;
  /** "dark" = navy-radial (STARLIFE / ABOUT); "light" = soft brand tint */
  tone?: "dark" | "light";
};

/**
 * The shared closing finale across the redesigned pages: a full-width banner
 * with a giant star watermark and a people cutout that fades up. One bespoke CTA
 * treatment so the pages read as a single high-end product. `tone="light"` keeps
 * the same composition over a soft brand tint instead of the navy gradient.
 */
export default function ImpactCta({ title, buttonLabel, buttonTo, image, imageAlt, tone = "dark" }: Props) {
  const reduce = useReducedMotion();
  const dark = tone === "dark";
  const starOpacity = dark ? 0.06 : 0.05;

  return (
    <section className="bg-white py-[88px] lg:py-[110px]">
      <div className="shell">
        <Reveal>
          <div
            className={[
              "relative overflow-hidden rounded-[30px]",
              dark ? "bg-navy-radial text-white shadow-glow" : "border border-line/60 text-ink shadow-card",
            ].join(" ")}
            style={dark ? undefined : { background: "rgba(218, 227, 237, 0.20)" }}
          >
            {/* faint grid texture (dark only — the white lines vanish on light) */}
            {dark && (
              <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:56px_56px] [mask-image:radial-gradient(circle_at_30%_40%,#000,transparent_75%)]" />
            )}

            {/* giant star watermark */}
            <motion.img
              src={footerStar}
              alt=""
              aria-hidden
              className={[
                "pointer-events-none absolute -right-10 top-1/2 h-[150%] w-auto -translate-y-1/2",
                dark ? "invert" : "",
              ].join(" ")}
              style={{ opacity: starOpacity }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: starOpacity, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            />

            <div className="relative grid grid-cols-1 items-center lg:grid-cols-2">
              <div className="px-8 py-14 sm:px-14 lg:py-20">
                <h2 className={`section-title max-w-[520px] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
                <Link
                  to={buttonTo}
                  className={[
                    "mt-8 inline-flex h-[46px] items-center justify-center rounded-btn px-6 text-[16px] font-medium transition-all duration-300 ease-out hover:-translate-y-0.5",
                    dark
                      ? "bg-white text-brand-blue hover:shadow-lift"
                      : "bg-brand-blue text-white hover:brightness-110 hover:shadow-[0_14px_30px_-10px_rgba(0,71,187,0.6)]",
                  ].join(" ")}
                >
                  {buttonLabel}
                </Link>
              </div>

              {/* people cutout (transparent png) */}
              <div className="relative h-[300px] sm:h-[360px] lg:h-[440px]">
                <motion.img
                  src={image}
                  alt={imageAlt ?? ""}
                  className={[
                    "absolute bottom-0 right-6 h-full w-auto max-w-none object-contain object-bottom sm:right-10",
                    dark
                      ? "drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
                      : "drop-shadow-[0_24px_44px_rgba(0,20,137,0.22)]",
                  ].join(" ")}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
