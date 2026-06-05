import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import RevealMask from "@/components/motion/RevealMask";
import MaskReveal from "@/components/motion/MaskReveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Eyebrow from "@/components/ui/Eyebrow";
import Frame from "@/components/ui/Frame";
import Counter from "@/components/ui/Counter";
import ImpactCta from "@/components/sections/ImpactCta";
import { EASE_OUT } from "@/lib/motion";

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

const PRODUCTS = [
  { img: p1, title: "Smart trading tools", desc: "Charts, insights, and drawing features.", cls: "lg:col-span-3" },
  { img: p2, title: "Flexible accounts", desc: "From beginner to ECN — tailored for every trader.", cls: "lg:col-span-3" },
  { img: p3, title: "1,000+ instruments", desc: "Forex, indices, stocks, metals, and more.", cls: "lg:col-span-2" },
  { img: p4, title: "Strong trading conditions", desc: "Spreads from 0.0, leverage up to 1:1000.", cls: "lg:col-span-2" },
  { img: p5, title: "Multiple platforms", desc: "MT4, MT5, WebTrader, and our app.", cls: "lg:col-span-2" },
];

function Tick() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.6" />
      <path d="M8 12.5l2.5 2.5 5-5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-white pt-[104px] pb-[72px] lg:pt-[150px] lg:pb-[120px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[8%] -top-[12%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(0,71,187,0.16),transparent_68%)] blur-2xl" />
        <div className="absolute -bottom-[24%] -left-[10%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(22,233,215,0.12),transparent_70%)] blur-2xl" />
      </div>

      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        {/* text */}
        <div className="relative z-10">
          <RevealMask className="pb-[0.12em]" delay={0.05}>
            <h1 className="text-[clamp(34px,4.6vw,52px)] font-medium leading-[1.1] tracking-[-1.2px] text-ink">
              <span className="font-semibold text-black">STARTRADER:</span>
              <br />
              Built by people,
              <br />
              powered by purpose
            </h1>
          </RevealMask>

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-[560px] text-body leading-[1.75] text-[#50555b]">
              STARTRADER isn’t just a globally leading broker, it’s a collective of talent charting
              new paths, challenging norms, and building success together.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 hidden items-center gap-3 lg:flex">
            <span className="relative flex h-9 w-5 justify-center rounded-full border border-line">
              <motion.span
                className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-blue"
                animate={reduce ? undefined : { y: [0, 9, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="font-alt text-[11px] uppercase tracking-[0.28em] text-ink/45">Our Story</span>
          </Reveal>
        </div>

        {/* layered image composition */}
        <div className="relative mx-auto h-[420px] w-full max-w-[540px] sm:h-[500px] lg:h-[600px] lg:max-w-none">
          <div className="absolute left-[5%] top-[7%] hidden h-[80%] w-[62%] -rotate-[6deg] rounded-[30px] ring-1 ring-brand-blue/15 lg:block" />

          {/* main */}
          <Reveal y={24} className="absolute left-0 top-0 h-[84%] w-[64%]">
            <Frame
              src={force}
              eager
              parallax={26}
              rounded="rounded-[30px]"
              ringClass="ring-1 ring-white/40"
              className="h-full w-full shadow-glow"
              alt="The people of STARTRADER"
            />
          </Reveal>

          {/* overlapping secondary, white-matted */}
          <Reveal y={30} delay={0.18} className="absolute bottom-0 right-0 h-[48%] w-[58%]">
            <Frame
              src={woman}
              parallax={48}
              rounded="rounded-[22px]"
              ringClass={false}
              className="h-full w-full bg-white p-[6px] shadow-lift"
              imgClassName="rounded-[18px]"
              alt="Building success together"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────── OUR MISSION / VALUES / VISION (elevated bento) ─────────── */
function MissionValuesVision() {
  return (
    <section className="bg-white py-[80px] lg:py-[104px]">
      <Stagger className="shell grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        {/* Mission */}
        <StaggerItem className="group flex flex-col overflow-hidden rounded-[22px] border border-line/50 bg-white shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lift">
          <div className="h-[200px] w-full overflow-hidden">
            <Frame src={mission} rounded="rounded-none" ringClass={false} className="h-full w-full" alt="" />
          </div>
          <div className="flex flex-1 flex-col p-7">
            <h3 className="text-[18px] font-semibold text-brand-blue">Our Mission</h3>
            <p className="mt-3 text-body text-[#50555b]">
              To make global trading accessible, trusted, and empowering, while creating
              opportunities for people to grow, contribute, and build their future in global markets.
            </p>
          </div>
        </StaggerItem>

        {/* Values — the elevated brand anchor */}
        <StaggerItem className="group relative overflow-hidden rounded-[22px] bg-gradient-to-b from-brand-blue to-brand-navy p-8 text-white shadow-glow transition-all duration-300 ease-out lg:-translate-y-5 hover:-translate-y-7">
          <img src={valuesBg} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18] transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-[0.28]" />
          <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:40px_40px] [mask-image:radial-gradient(circle_at_50%_0%,#000,transparent_70%)]" />
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
        <StaggerItem className="group flex flex-col overflow-hidden rounded-[22px] border border-line/50 bg-white shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lift">
          <div className="h-[200px] w-full overflow-hidden">
            <Frame src={vision} rounded="rounded-none" ringClass={false} className="h-full w-full" alt="" />
          </div>
          <div className="flex flex-1 flex-col p-7">
            <h3 className="text-[18px] font-semibold text-brand-blue">Our Vision</h3>
            <p className="mt-3 text-body text-[#50555b]">
              We equip traders and partners with the access, tools, and support they need to grow
              with confidence in global financial markets.
            </p>
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}

/* ─────────────── A GLOBAL FORCE (editorial split) ─────────────── */
function GlobalForce() {
  return (
    <section className="relative overflow-hidden bg-[rgba(218,227,237,0.45)] py-[88px] lg:py-[120px]">
      <span className="pointer-events-none absolute right-[2%] top-1/2 hidden -translate-y-1/2 rotate-90 select-none font-alt text-[13px] uppercase tracking-[0.5em] text-ink/20 xl:block">
        Our Company
      </span>

      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16">
        {/* content */}
        <div className="relative z-10">
          <Reveal>
            <Eyebrow label="OUR COMPANY" tone="light" />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 max-w-[460px] text-[clamp(26px,3.2vw,38px)] font-medium leading-[1.12] tracking-[-1px] text-ink">
              STARTRADER, A Global Force Shaped by Talent.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[640px] text-body leading-[1.75] text-[#50555b]">
              As a reputed forex and CFD broker with over 30 global awards, STARTRADER continues
              to grow through innovation, market expertise, and the people behind its progress.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-[640px] text-body leading-[1.75] text-[#50555b]">
              Our global presence is reflected in major partnerships, including Official Partner
              of the NBA, Official Partner of the Porsche Carrera Cup Middle East, and Official
              Sponsor of the UAE National Cricket Team for the ICC Men’s T20 World Cup 2026.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-[640px] text-body leading-[1.75] text-[#50555b]">
              Joining STARTRADER means becoming part of a company that values ambition,
              collaboration, and continuous growth.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <Link
              to="/starscout"
              className="mt-8 inline-flex h-[46px] items-center justify-center rounded-btn bg-brand-blue px-8 text-[15px] font-medium text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_14px_30px_-10px_rgba(0,71,187,0.6)]"
            >
              Apply Now!
            </Link>
          </Reveal>
        </div>

        {/* art-directed image */}
        <div className="relative mx-auto h-[380px] w-full max-w-[560px] sm:h-[460px] lg:h-[520px] lg:max-w-none">
          <div className="absolute -left-4 -top-4 hidden h-[88%] w-[78%] rounded-[28px] ring-1 ring-brand-blue/15 lg:block" />
          <MaskReveal radius={26} className="absolute right-0 top-0 h-full w-full lg:w-[92%]">
            <Frame
              src={force}
              parallax={30}
              rounded="rounded-[26px]"
              ringClass="ring-1 ring-white/40"
              className="h-full w-full shadow-glow"
              alt="STARTRADER, a global force shaped by talent"
            />
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── OUR AWARDS (animated counter) ───────────────────── */
function Awards() {
  return (
    <section className="bg-white py-[88px] lg:py-[112px]">
      <div className="shell">
        <Reveal className="mx-auto max-w-[560px] text-center">
          <h2 className="section-title text-ink">Our Awards</h2>
          <p className="mx-auto mt-4 max-w-[420px] text-body leading-[1.7] text-[#50555b]">
            We’ve crossed many milestones. Each one made possible by the people who lead the way.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:mt-16 lg:grid-cols-[0.92fr_1.08fr]">
          {/* image + big animated counter */}
          <MaskReveal radius={24} className="h-[320px] w-full sm:h-[400px] lg:h-auto lg:min-h-[400px]">
            <Frame
              src={awardsImg}
              parallax={28}
              tint="scrim"
              rounded="rounded-[24px]"
              ringClass={false}
              className="h-full w-full"
              alt="STARTRADER award-winning team"
              overlay={
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <div className="flex items-end gap-2 text-white">
                    <Counter to={30} duration={1.8} className="font-alt text-[clamp(52px,7vw,84px)] font-semibold leading-[0.9] tabular-nums tracking-[-2px]" />
                    <span className="mb-2 font-alt text-[clamp(28px,4vw,46px)] font-semibold leading-none text-brand-cyan">+</span>
                  </div>
                  <p className="mt-2 font-alt text-[13px] uppercase tracking-[0.22em] text-white/80">Global awards</p>
                </div>
              }
            />
          </MaskReveal>

          {/* badge wall */}
          <Reveal delay={0.08}>
            <div className="flex h-full items-center rounded-[24px] border border-line/50 bg-[rgba(218,227,237,0.4)] p-8 lg:p-10">
              <Stagger className="grid w-full grid-cols-2 items-center gap-x-8 gap-y-9 sm:grid-cols-3" stagger={0.06}>
                {AWARD_BADGES.map((b, i) => (
                  <StaggerItem key={i} className="flex items-center justify-center">
                    <img
                      src={b}
                      alt="STARTRADER award"
                      className="h-auto w-full max-w-[150px] opacity-90 transition-all duration-300 ease-out hover:scale-110 hover:opacity-100"
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── GLOBAL PRESENCE ─────────────────────── */
function GlobalPresence() {
  return (
    <section className="relative overflow-hidden bg-[rgba(218,227,237,0.45)] py-[88px] lg:py-[112px]">
      <div className="pointer-events-none absolute -right-[6%] top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,71,187,0.1),transparent_70%)] blur-2xl" />

      <div className="shell relative">
        <Reveal className="mx-auto max-w-[600px] text-center">
          <h2 className="section-title text-ink">Global presence</h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body leading-[1.7] text-[#50555b]">
            From our humble beginnings, we’ve expanded our reach across the globe. Our commitment to
            regulatory compliance and excellence has led us to secure multiple licenses:
          </p>
        </Reveal>

        <Stagger className="mx-auto mt-12 flex max-w-[1200px] flex-wrap justify-center gap-6 lg:mt-16">
          {COUNTRIES.map((c, i) => (
            <StaggerItem
              key={i}
              className="group relative isolate w-full overflow-hidden rounded-[20px] border border-line/50 bg-white p-7 shadow-card transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-glow sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <span className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-blue to-brand-navy opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
              <div className="flex items-center gap-4">
                <img src={c.flag} alt="" className="h-11 w-11 rounded-lg object-cover ring-1 ring-black/5" />
                <h3 className="text-[17px] font-medium text-ink transition-colors duration-300 group-hover:text-white">{c.name}</h3>
              </div>
              <span className="relative mt-4 block h-px w-full overflow-hidden bg-line transition-colors duration-300 group-hover:bg-white/25">
                <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-brand-cyan transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
              <p className="mt-4 text-[13px] leading-[21px] text-[#50555b] transition-colors duration-300 group-hover:text-white/85">{c.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ─────────────────── OUR PRODUCTS (dark glass bento) ─────────────────── */
function Products() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-navy-radial py-[96px] text-white lg:py-[130px]">
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:64px_64px] [mask-image:radial-gradient(circle_at_50%_18%,#000,transparent_72%)]" />
      <div className="pointer-events-none absolute -left-[6%] top-[14%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,71,187,0.4),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute -right-[8%] bottom-[6%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(22,233,215,0.16),transparent_70%)] blur-2xl" />

      <div className="shell relative">
        <Reveal className="mx-auto max-w-[620px] text-center">
          <div className="mb-6 flex justify-center">
            <Eyebrow label="OUR PRODUCTS" tone="dark" />
          </div>
          <h2 className="section-title text-white">Our Products</h2>
          <p className="mx-auto mt-4 max-w-[460px] text-body leading-[1.7] text-white/70">
            You bring ambition, we’ll provide the stage for it to shine.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {PRODUCTS.map((p, i) => (
            <StaggerItem
              key={p.title}
              className={`group relative overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-[6px] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-cyan/40 hover:shadow-glow-cyan ${p.cls}`}
            >
              <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-cyan/0 blur-2xl transition-all duration-500 group-hover:bg-brand-cyan/15" />

              <div className="flex h-[150px] items-center justify-center">
                <img src={p.img} alt="" className="max-h-[140px] w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105" />
              </div>

              <div className="relative mt-6 h-px w-full overflow-hidden bg-white/12">
                <motion.span
                  className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-brand-blue to-brand-cyan"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: EASE_OUT, delay: reduce ? 0 : 0.08 * i }}
                />
              </div>

              <h3 className="mt-5 text-[20px] font-medium tracking-[-0.4px] text-white transition-colors duration-300 group-hover:text-brand-cyan">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-[22px] text-white/65">{p.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="bg-white">
      <Hero />
      <MissionValuesVision />
      <GlobalForce />
      <Awards />
      <GlobalPresence />
      <Products />
      <ImpactCta
        title="Ready to start your chapter?"
        buttonLabel="Get A Glimpse"
        buttonTo="/starlife"
        image={ctaPeople}
        imageAlt="STARTRADER team"
      />
    </div>
  );
}
