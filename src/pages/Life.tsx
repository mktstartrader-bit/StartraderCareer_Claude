import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import RevealMask from "@/components/motion/RevealMask";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import MaskReveal from "@/components/motion/MaskReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import Frame from "@/components/ui/Frame";
import Accordion from "@/components/ui/Accordion";
import VideoTile from "@/components/ui/VideoTile";
import ImpactCta from "@/components/sections/ImpactCta";
import { EASE_OUT } from "@/lib/motion";

import woman from "@/assets/life/woman.jpg";
import culture from "@/assets/life/culture.jpg";
import ctaPeople from "@/assets/life/cta-people.png";
import icInclusivity from "@/assets/life/ic-inclusivity.svg";
import icService from "@/assets/life/ic-service.svg";
import icAchievement from "@/assets/life/ic-achievement.svg";
import icIdea from "@/assets/life/ic-idea.svg";


/* ── real STARLIFE clips (public/starlife/*.mp4), arranged into one bento ── */
const TILES = [
  { src: "/starlife/life.mp4", label: "Life at STARTRADER", cls: "col-span-2 h-[260px] sm:h-[320px] lg:col-span-8 lg:row-span-2 lg:h-auto" },
  { src: "/starlife/national-day.mp4", label: "National Day", cls: "col-span-1 h-[200px] sm:h-[244px] lg:col-span-4 lg:h-auto" },
  { src: "/starlife/year-end-party.mp4", label: "Year-End Party", cls: "col-span-1 h-[200px] sm:h-[244px] lg:col-span-4 lg:h-auto" },
  { src: "/starlife/football-match.mp4", label: "Football Match", cls: "col-span-2 sm:col-span-1 h-[200px] sm:h-[244px] lg:col-span-4 lg:h-auto" },
  { src: "/starlife/volunteering.mp4", label: "Volunteering", cls: "col-span-1 h-[200px] sm:h-[244px] lg:col-span-4 lg:h-auto" },
  { src: "/starlife/celebrations.mp4", label: "Celebrations", cls: "col-span-1 h-[200px] sm:h-[244px] lg:col-span-4 lg:h-auto" },
];

const FEATURES = [
  { icon: icInclusivity, title: "Strong", desc: "We are driven by people with the skills, mindset, and confidence to thrive in the financial markets industry." },
  { icon: icService, title: "Trustworthy", desc: "We believe in people who work with honesty, responsibility, and respect for the trust placed in them." },
  { icon: icAchievement, title: "Ambitious", desc: "We grow with people who aim higher, take ownership, and bring new ideas to the table." },
  { icon: icIdea, title: "Resilient", desc: "We value people who adapt, stay steady through challenges, and keep progressing with purpose." },
];

const CULTURE_ITEMS = [
  { q: "Explore uncharted opportunities", a: "Our work calls everyone to put on their binoculars of creativity and innovation to easily discover opportunities budding along the way. With STARTRADER, your abilities are challenged to improve and shine." },
  { q: "They are different and unique.", a: "Every explorer brings a distinct perspective. We celebrate individuality and the fresh thinking that comes when diverse minds work toward a shared goal." },
  { q: "They’re ready to grow.", a: "Our people are eager to learn, take on new challenges, and rise alongside the company — turning ambition into lasting progress." },
];

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-white pt-[104px] pb-[72px] lg:pt-[140px] lg:pb-[110px]">
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ── text ── */}
        <div>
          <RevealMask className="pb-[0.1em]" delay={0.05}>
            <h1 className="text-[clamp(44px,5.6vw,68px)] font-medium leading-[0.98] tracking-[-1.5px] text-ink">
              STARLIFE
            </h1>
          </RevealMask>

          <Reveal delay={0.18}>
            <p className="mt-7 max-w-[460px] text-[18px] font-medium leading-[1.5] text-brand-blue">
              We work hard, no doubt! We don’t settle for average.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="mt-4 max-w-[500px] text-body leading-[1.75] text-[#50555b]">
              But we also know that success is best celebrated together. That’s why we party even
              harder, building stronger bonds, fueling motivation, and making every achievement
              more meaningful.
            </p>
          </Reveal>

          {/* scroll cue (ornamental) */}
          <Reveal delay={0.36} className="mt-10 hidden items-center gap-3 lg:flex">
            <span className="relative flex h-9 w-5 justify-center rounded-full border border-line">
              <motion.span
                className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-blue"
                animate={reduce ? undefined : { y: [0, 9, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="font-alt text-[11px] uppercase tracking-[0.28em] text-ink/45">Scroll</span>
          </Reveal>
        </div>

        {/* ── single image ── */}
        <Reveal y={24}>
          <Frame
            src={woman}
            eager
            parallax={24}
            rounded="rounded-[28px]"
            ringClass="ring-1 ring-line/60"
            className="h-[340px] w-full shadow-lift sm:h-[440px] lg:h-[560px]"
            alt="Life at STARTRADER"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────── HAVE A LOOK (bento gallery) ─────────────────── */
function Gallery() {
  return (
    <section className="bg-white py-[88px] lg:py-[112px]">
      <div className="shell">
        <SectionHeading
          eyebrow="STARLIFE"
          title="Have a look at our STARLIFE"
          intro="We don’t just work together; we celebrate together. Our team comes together for cultural festivals, wellness events, and year-end celebrations that bring energy and camaraderie to the workplace."
        />
      </div>

      <div className="shell mt-12 lg:mt-16">
        <Stagger className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-12 lg:[grid-auto-rows:252px]">
          {TILES.map((t) => (
            <StaggerItem key={t.src} className={t.cls}>
              <VideoTile src={t.src} label={t.label} className="h-full w-full shadow-card ring-1 ring-line/50" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ─────────────── A CULTURE OF AMBITION (sticky + accordion) ─────────────── */
function Culture() {
  return (
    <section className="relative overflow-hidden bg-[rgba(218,227,237,0.45)] py-[88px] lg:py-[120px]">
      {/* faint vertical ornament */}
      <span className="pointer-events-none absolute left-[2%] top-1/2 hidden -translate-y-1/2 -rotate-90 select-none font-alt text-[13px] uppercase tracking-[0.5em] text-ink/25 xl:block">
        Join Us
      </span>

      <div className="shell relative">
        <SectionHeading eyebrow="OUR CULTURE" title="A culture of ambition and opportunity" />

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:mt-16 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16">
          {/* sticky, mask-revealed image */}
          <div className="lg:sticky lg:top-[104px]">
            <MaskReveal radius={26} className="h-[400px] w-full sm:h-[470px] lg:h-[560px]">
              <Frame
                src={culture}
                parallax={32}
                rounded="rounded-[26px]"
                ringClass="ring-1 ring-white/40"
                className="h-full w-full shadow-glow"
                alt="A culture of ambition and opportunity"
              />
            </MaskReveal>
          </div>

          {/* accordion */}
          <Reveal delay={0.1} className="lg:pt-1">
            <Accordion items={CULTURE_ITEMS} tone="light" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── WHY SET YOUR COURSE (dark feature bento) ─────────────── */
function Why() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-navy-radial py-[96px] text-white lg:py-[130px]">
      {/* grid texture + glow blobs */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:64px_64px] [mask-image:radial-gradient(circle_at_50%_20%,#000,transparent_72%)]" />
      <div className="pointer-events-none absolute -left-[6%] top-[12%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,71,187,0.4),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute -right-[8%] bottom-[4%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(22,233,215,0.16),transparent_70%)] blur-2xl" />

      <div className="shell relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        {/* sticky heading */}
        <div className="lg:sticky lg:top-[112px]">
          <Reveal>
            <Eyebrow label="WHY CHOOSE US" tone="dark" />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.08] tracking-[-1px] text-white">
              Why set your course with us?
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 font-alt text-[14px] leading-[30px] text-line">Our exploration group is:</p>
          </Reveal>
        </div>

        {/* 2×2 glass card bento */}
        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <StaggerItem
              key={f.title}
              className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-[6px] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-cyan/40 hover:shadow-glow-cyan"
            >
              {/* hover glow */}
              <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-cyan/0 blur-2xl transition-all duration-500 group-hover:bg-brand-cyan/15" />

              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-[14px] bg-white shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-10px_rgba(22,233,215,0.6)]">
                <img src={f.icon} alt="" className="h-[32px] w-[32px] transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* divider sweep blue→cyan */}
              <div className="relative mt-6 h-px w-full overflow-hidden bg-white/12">
                <motion.span
                  className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-brand-blue to-brand-cyan"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: EASE_OUT, delay: reduce ? 0 : 0.1 * i }}
                />
              </div>

              <h3 className="mt-5 text-[18px] font-medium tracking-[-0.4px] text-white transition-colors duration-300 group-hover:text-brand-cyan">
                {f.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[22px] text-white/72">{f.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default function Life() {
  return (
    <div className="bg-white">
      <Hero />
      <Gallery />
      <Culture />
      <Why />
      <ImpactCta
        title={
          <>
            It isn’t just about work,
            <br />
            it’s about making an impact.
          </>
        }
        buttonLabel="See How We Give Back"
        buttonTo="/starsocial"
        image={ctaPeople}
        imageAlt="STARTRADER team"
      />
    </div>
  );
}
