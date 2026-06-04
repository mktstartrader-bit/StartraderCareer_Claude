import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import SocialIcon from "./ui/SocialIcon";
import { NAV_LINKS, SOCIALS } from "@/data/site";
import Reveal from "./motion/Reveal";

export default function Footer() {
  return (
    <footer className="bg-white">
      <Reveal as="div" className="shell py-14">
        {/* Row 1 — logo · connector line · socials */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
          <Link to="/" aria-label="STARTRADER Careers home" className="shrink-0">
            <Logo height={34} />
          </Link>
          <span className="hidden h-px flex-1 bg-line md:block" />
          <ul className="flex items-center gap-[15px]">
            {SOCIALS.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  aria-label={s.name}
                  className={[
                    "flex h-[35px] w-[35px] items-center justify-center rounded-full border transition-all duration-300 ease-out hover:-translate-y-0.5",
                    s.highlight
                      ? "border-brand-blue bg-brand-blue text-white hover:brightness-110"
                      : "border-line text-ink hover:border-brand-blue hover:bg-brand-blue hover:text-white",
                  ].join(" ")}
                >
                  <SocialIcon name={s.key} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Row 2 — nav · privacy */}
        <div className="mt-9 flex flex-col items-center gap-5 md:flex-row md:justify-between">
          <ul className="flex flex-wrap items-center justify-center gap-x-[30px] gap-y-3 text-[14px] uppercase">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    [
                      "transition-colors duration-300 hover:text-brand-blue",
                      isActive ? "font-medium text-brand-blue" : "text-ink",
                    ].join(" ")
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a href="#" className="text-[14px] uppercase text-ink transition-colors hover:text-brand-blue">
            Privacy &amp; policy
          </a>
        </div>

        <div className="mt-8 h-px w-full bg-line" />

        <p className="mt-7 text-center text-[12px] capitalize leading-[25px] text-ink">
          ©2026 STARTRADER CAREERS. All Rights Reserved.
        </p>
      </Reveal>
    </footer>
  );
}
