import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { EASE_OUT } from "@/lib/motion";
import footerStar from "@/assets/brand/footer-star.svg";

type Props = {
  title: ReactNode;
  buttonLabel: string;
  buttonTo: string;
  image?: string;
  imageAlt?: string;
  variant?: "light" | "dark";
};

/**
 * The recurring closing CTA band. Light card (rgba 218,227,237/.35) or dark
 * navy gradient, with an optional people cutout, a faint rotating star and a
 * small square accent — exactly as the Figma frames.
 */
export default function CtaBand({ title, buttonLabel, buttonTo, image, imageAlt, variant = "light" }: Props) {
  const dark = variant === "dark";
  return (
    <section className={`${dark ? "bg-white" : "bg-white"} py-[90px]`}>
      <div className="shell">
        <Reveal>
          <div
            className={[
              "relative overflow-hidden rounded-card",
              dark ? "bg-navy-grad" : "border border-line/40 bg-[rgba(218,227,237,0.35)]",
            ].join(" ")}
          >
            <div className={`grid grid-cols-1 items-center ${image ? "lg:grid-cols-2" : ""}`}>
              <div className={`px-8 py-12 sm:px-14 lg:py-20 ${!image ? "lg:px-20 text-center lg:text-left" : ""}`}>
                <h2 className={`section-title max-w-[560px] ${dark ? "text-white" : "text-ink"} ${!image ? "mx-auto lg:mx-0" : ""}`}>
                  {title}
                </h2>
                <Link
                  to={buttonTo}
                  className={[
                    "mt-8 inline-flex h-[45px] items-center justify-center rounded-btn px-5 text-[16px] font-medium transition-all duration-300 ease-out",
                    dark
                      ? "bg-white text-brand-blue hover:-translate-y-0.5 hover:shadow-lift"
                      : "bg-brand-blue text-white hover:brightness-110 hover:shadow-[0_14px_30px_-10px_rgba(0,71,187,0.6)]",
                  ].join(" ")}
                >
                  {buttonLabel}
                </Link>
              </div>

              {image && (
                <div className="relative h-[300px] sm:h-[360px] lg:h-[420px]">
                  <motion.img
                    src={footerStar} alt="" aria-hidden
                    className={`absolute right-6 top-1/2 w-[280px] -translate-y-1/2 ${dark ? "opacity-[0.10] invert" : "opacity-[0.06]"}`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                  />
                  <span className={`absolute right-24 top-8 h-12 w-12 rounded-md ${dark ? "bg-white/10" : "bg-brand-blue/10"}`} />
                  <motion.img
                    src={image} alt={imageAlt ?? ""}
                    className="absolute bottom-0 right-6 h-full w-auto max-w-none object-contain object-bottom sm:right-10"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  />
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
