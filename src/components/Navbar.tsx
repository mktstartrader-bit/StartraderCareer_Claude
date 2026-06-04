import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";
import { NAV_LINKS } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.8)",
          boxShadow: scrolled
            ? "0 8px 30px 0 rgba(0,20,137,0.10)"
            : "4px 4px 15px 0px rgba(217,217,217,0.25)",
        }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="h-[70px] w-full backdrop-blur-[7.5px]"
      >
        <nav className="shell relative flex h-full items-center justify-between">
          <Link to="/" aria-label="STARTRADER Careers home" className="relative z-10 shrink-0">
            <Logo height={34} />
          </Link>

          {/* Centered links (desktop) */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[30px] text-[14px] uppercase lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    [
                      "relative font-medium transition-colors duration-300 ease-out hover:text-brand-blue",
                      isActive ? "text-brand-blue" : "font-normal text-ink",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <span className="relative">
                      {l.label}
                      <span
                        className={[
                          "absolute -bottom-[6px] left-0 h-[2px] w-full origin-left rounded-full bg-brand-blue transition-transform duration-300 ease-out",
                          isActive ? "scale-x-100" : "scale-x-0",
                        ].join(" ")}
                      />
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/starscout"
              className="hidden h-[45px] w-[130px] items-center justify-center rounded-btn bg-brand-blue text-[16px] font-medium text-white transition-all duration-300 ease-out hover:brightness-110 hover:shadow-[0_14px_30px_-10px_rgba(0,71,187,0.6)] sm:flex"
            >
              Join Us
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-btn text-ink lg:hidden"
            >
              <div className="flex w-5 flex-col gap-[5px]">
                <span className={`h-[2px] w-full bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`h-[2px] w-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`h-[2px] w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -12 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="absolute inset-x-0 top-[70px] origin-top border-t border-line/60 bg-white/95 backdrop-blur-md shadow-nav lg:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      [
                        "block border-b border-line/40 py-3 text-[15px] uppercase tracking-wide",
                        isActive ? "font-semibold text-brand-blue" : "text-ink",
                      ].join(" ")
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <Link
                to="/starscout"
                className="mt-4 flex h-[46px] items-center justify-center rounded-btn bg-brand-blue text-[15px] font-medium text-white"
              >
                Join Us
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
