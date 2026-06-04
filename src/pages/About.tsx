import { Link } from "react-router-dom";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaBand from "@/components/sections/CtaBand";
import CollageHero from "@/components/sections/CollageHero";

import woman from "@/assets/life/woman.jpg";
import mission from "@/assets/about/mission.webp";
import vision from "@/assets/about/vision.webp";
import valuesBg from "@/assets/about/values-bg.jpg";
import force from "@/assets/about/force.webp";
import awardsImg from "@/assets/about/awards.jpg";
import awAffli from "@/assets/about/awards/affli.svg";
import awFrx from "@/assets/about/awards/frx.svg";
import awWiki from "@/assets/about/awards/wiki.svg";
import awSmrt from "@/assets/about/awards/smrt.svg";
import awExp from "@/assets/about/awards/exp.svg";
import awCrp from "@/assets/about/awards/crp.svg";
import awWlt from "@/assets/about/awards/wlt.svg";
import awArg from "@/assets/about/awards/arg.svg";
import awCpy from "@/assets/about/awards/cpy.svg";
import flagAu from "@/assets/about/flag-au.png";
import flagAe from "@/assets/about/flag-ae.png";
import flagSc from "@/assets/about/flag-sc.png";
import flagMu from "@/assets/about/flag-mu.png";
import p1 from "@/assets/about/p1.png";
import p2 from "@/assets/about/p2.png";
import p3 from "@/assets/about/p3.png";
import p4 from "@/assets/about/p4.png";
import p5 from "@/assets/about/p5.png";
import ctaPeople from "@/assets/life/cta-people.png";

const VALUES = [
  "We stay ambitious, advancing in global financial markets.",
  "We are strong in the platforms and tools that power trading decisions.",
  "We build trust through transparency and regulatory integrity.",
  "We remain resilient through changing market conditions.",
];

const AWARD_BADGES = [awAffli, awFrx, awWiki, awSmrt, awExp, awCrp, awWlt, awArg, awCpy];

const COUNTRIES = [
  { flag: flagAu, name: "Australia", text: "STARTRADER Prime Global Pty Ltd is an Australian financial services licensee regulated by the ASIC, with ACN 156005668 and License No. 421210." },
  { flag: flagAe, name: "United Arab Emirates", text: "STARTRADER Global Financial Consultation & Financial Analysis LLC is regulated by the CMA under License No. 20200000241." },
  { flag: flagSc, name: "Seychelles", text: "STARTRADER Limited is a Securities Dealer regulated by the FSA of Seychelles, with License No. SD049 and Registration No. 8427362-1." },
  { flag: flagMu, name: "Mauritius", text: "STARTRADER Global Financial Consultation & Financial Analysis LLC is regulated by the SCA under License No. 20200000241." },
  { flag: flagSc, name: "Seychelles", text: "STARTRADER Limited is a Securities Dealer regulated by the FSA of Seychelles, with License No. SD049 and Registration No. 8427362-1." },
];

const PRODUCTS_WIDE = [
  { img: p1, title: "Smart trading tools", desc: "Charts, insights, and drawing features." },
  { img: p2, title: "Flexible accounts", desc: "From beginner to ECN — tailored for every trader." },
];
const PRODUCTS = [
  { img: p3, title: "1,000+ instruments", desc: "Forex, indices, stocks, metals, and more." },
  { img: p4, title: "Strong trading conditions", desc: "Spreads from 0.0, leverage up to 1:1000." },
  { img: p5, title: "Multiple platforms", desc: "MT4, MT5, WebTrader, and our app." },
];

function Tick() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.6" />
      <path d="M8 12.5l2.5 2.5 5-5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function About() {
  return (
    <div className="bg-white">
      {/* ───────── HERO ───────── */}
      <CollageHero marquee bg="bg-[rgba(218,227,237,0.2)]" images={[woman, force, mission, vision]}>
        <Reveal>
          <h1 className="text-[clamp(34px,4.6vw,48px)] font-medium leading-[1.12] tracking-[-1px] text-ink">
            <span className="font-semibold text-black">STARTRADER:</span>
            <br />
            Built by people,
            <br />
            powered by purpose
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[581px] text-body text-[#50555b]">
            STARTRADER isn’t just a globally leading broker, it’s a collective of talent charting
            new paths, challenging norms, and building success together.
          </p>
        </Reveal>
      </CollageHero>

      {/* ───────── MISSION / VALUES / VISION ───────── */}
      <section className="bg-white py-[70px]">
        <Stagger className="shell grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Mission */}
          <StaggerItem className="group flex flex-col overflow-hidden rounded-card border border-line/40 bg-[rgba(218,227,237,0.35)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-lift">
            <div className="p-7">
              <h3 className="text-[18px] font-semibold text-brand-blue">Our Mission</h3>
              <p className="mt-3 text-body text-[#50555b]">
                To make global trading accessible, trusted, and empowering, while creating
                opportunities for people to grow, contribute, and build their future in global markets.
              </p>
            </div>
            <div className="mt-auto px-7 pb-7">
              <div className="overflow-hidden rounded-[12px]">
                <img src={mission} alt="" className="h-[180px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
              </div>
            </div>
          </StaggerItem>

          {/* Values (blue gradient) */}
          <StaggerItem className="group relative overflow-hidden rounded-card bg-gradient-to-b from-brand-blue to-brand-navy p-7 text-white transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-22px_rgba(0,71,187,0.65)]">
            <img src={valuesBg} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18] transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-[0.3]" />
            <div className="relative">
              <h3 className="text-[18px] font-semibold">Our Values</h3>
              <ul className="mt-5 space-y-4">
                {VALUES.map((v) => (
                  <li key={v} className="flex gap-3 text-[14px] leading-[20px] text-white/90">
                    <Tick />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Vision */}
          <StaggerItem className="group flex flex-col overflow-hidden rounded-card border border-line/40 bg-[rgba(218,227,237,0.35)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-lift">
            <div className="p-7">
              <h3 className="text-[18px] font-semibold text-brand-blue">Our Vision</h3>
              <p className="mt-3 text-body text-[#50555b]">
                We equip traders and partners with the access, tools, and support they need to grow
                with confidence in global financial markets.
              </p>
            </div>
            <div className="mt-auto px-7 pb-7">
              <div className="overflow-hidden rounded-[12px]">
                <img src={vision} alt="" className="h-[180px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* ───────── A GLOBAL FORCE ───────── */}
      <section className="bg-white pb-[80px]">
        <div className="shell">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-6 overflow-hidden rounded-card border border-line/40 bg-[rgba(218,227,237,0.35)] p-8 sm:p-12 lg:grid-cols-[1fr_372px] lg:gap-6">
              <div>
                <Eyebrow label="OUR COMPANY" tone="light" />
                <h2 className="mt-6 max-w-[449px] text-[clamp(26px,3.2vw,36px)] font-medium leading-[1.15] tracking-[-1px] text-ink">
                  STARTRADER, A Global Force Shaped by Talent.
                </h2>
                <p className="mt-5 max-w-[671px] text-body text-[#50555b]">
                  As a reputed forex and CFD broker with over 30 global awards, STARTRADER continues
                  to grow through innovation, market expertise, and the people behind its progress.
                </p>
                <p className="mt-4 max-w-[681px] text-body text-[#50555b]">
                  Our global presence is reflected in major partnerships, including Official Partner
                  of the NBA, Official Partner of the Porsche Carrera Cup Middle East, and Official
                  Sponsor of the UAE National Cricket Team for the ICC Men’s T20 World Cup 2026.
                </p>
                <p className="mt-4 max-w-[671px] text-body text-[#50555b]">
                  Joining STARTRADER means becoming part of a company that values ambition,
                  collaboration, and continuous growth.
                </p>
                <Link to="/starscout" className="mt-7 inline-flex h-[46px] items-center justify-center rounded-btn bg-brand-blue px-8 text-[15px] font-medium text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_14px_30px_-10px_rgba(0,71,187,0.6)]">
                  Apply Now!
                </Link>
              </div>
              <div className="h-[300px] w-full overflow-hidden rounded-[14px] lg:h-[452px]">
                <img src={force} alt="STARTRADER global force" className="h-full w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── OUR AWARDS ───────── */}
      <section className="bg-white py-[60px]">
        <div className="shell">
          <Reveal className="text-center">
            <h2 className="text-[clamp(28px,3.6vw,42px)] font-medium tracking-[-1px] text-ink">Our Awards</h2>
            <p className="mx-auto mt-3 max-w-[420px] text-body text-[#50555b]">
              We’ve crossed many milestones. Each one made possible by the people who lead the way.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[350px_1fr]">
            <Reveal>
              <div className="h-[300px] w-full overflow-hidden rounded-[14px] lg:h-[383px]">
                <img src={awardsImg} alt="" className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-card border border-line/40 bg-[rgba(218,227,237,0.35)] p-8 lg:h-[383px]">
                <Stagger className="grid h-full grid-cols-1 items-center gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {AWARD_BADGES.map((b, i) => (
                    <StaggerItem key={i} className="flex items-center justify-center">
                      <img
                        src={b}
                        alt="STARTRADER award"
                        className="h-auto w-full max-w-[220px] transition-transform duration-300 ease-out hover:scale-105"
                      />
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── GLOBAL PRESENCE ───────── */}
      <section className="bg-white py-[60px]">
        <div className="shell">
          <Reveal className="text-center">
            <h2 className="text-[clamp(28px,3.6vw,42px)] font-medium tracking-[-1px] text-ink">Global presence</h2>
            <p className="mx-auto mt-3 max-w-[560px] text-body text-[#50555b]">
              From our humble beginnings, we’ve expanded our reach across the globe. Our commitment to
              regulatory compliance and excellence has led us to secure multiple licenses:
            </p>
          </Reveal>

          <Stagger className="mx-auto mt-12 flex max-w-[1200px] flex-wrap justify-center gap-6">
            {COUNTRIES.map((c, i) => (
              <StaggerItem
                key={i}
                className="group relative isolate w-full overflow-hidden rounded-card border border-line/40 bg-[rgba(218,227,237,0.35)] p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-22px_rgba(0,71,187,0.5)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <span className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-blue to-brand-navy opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                <img src={c.flag} alt="" className="h-10 w-10 rounded-md object-cover" />
                <h3 className="mt-4 text-[16px] font-medium text-ink transition-colors duration-300 group-hover:text-white">{c.name}</h3>
                <span className="relative mt-3 block h-px w-full overflow-hidden bg-line transition-colors duration-300 group-hover:bg-white/25">
                  <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-brand-cyan transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </span>
                <p className="mt-3 text-[13px] leading-[20px] text-[#50555b] transition-colors duration-300 group-hover:text-white/85">{c.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ───────── OUR PRODUCTS (dark) ───────── */}
      <section className="bg-navy-grad py-[90px] text-white">
        <div className="shell">
          <Reveal className="text-center">
            <div className="flex justify-center">
              <Eyebrow label="OUR PRODUCTS" tone="dark" />
            </div>
            <h2 className="mt-6 text-[clamp(28px,3.6vw,42px)] font-medium tracking-[-1px] text-white">Our Products</h2>
            <p className="mx-auto mt-3 max-w-[460px] text-body text-white/70">
              You bring ambition, we’ll provide the stage for it to shine.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PRODUCTS_WIDE.map((p) => (
              <StaggerItem key={p.title} className="group overflow-hidden rounded-card border border-white/10 bg-gradient-to-b from-[rgba(0,20,137,0.6)] to-[rgba(13,13,75,0.6)] p-8 backdrop-blur-[7px]">
                <div className="flex h-[160px] items-center justify-center">
                  <img src={p.img} alt="" className="max-h-[150px] w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-6 text-[20px] font-medium text-white">{p.title}</h3>
                <p className="mt-1 text-[14px] text-white/65">{p.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3" delay={0.08}>
            {PRODUCTS.map((p) => (
              <StaggerItem key={p.title} className="group overflow-hidden rounded-card border border-white/10 bg-gradient-to-b from-[rgba(0,20,137,0.6)] to-[rgba(13,13,75,0.6)] p-8 backdrop-blur-[7px]">
                <div className="flex h-[150px] items-center justify-center">
                  <img src={p.img} alt="" className="max-h-[140px] w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-6 text-[20px] font-medium text-white">{p.title}</h3>
                <p className="mt-1 text-[14px] text-white/65">{p.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ───────── CTA BAND ───────── */}
      <CtaBand
        title="Ready to start your chapter?"
        buttonLabel="Get A Glimpse"
        buttonTo="/starlife"
        image={ctaPeople}
        imageAlt="STARTRADER team"
      />
    </div>
  );
}
