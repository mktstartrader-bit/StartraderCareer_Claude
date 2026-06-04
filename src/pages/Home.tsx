import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Eyebrow from "@/components/ui/Eyebrow";
import VideoPlayer from "@/components/ui/VideoPlayer";
import CtaBand from "@/components/sections/CtaBand";
import { EASE_OUT } from "@/lib/motion";

import heroImg from "@/assets/home/hero.jpg";
import videoThumb from "@/assets/home/video-thumb.jpg";
import ceoTexture from "@/assets/home/ceo-texture.jpg";
import ceoImg from "@/assets/home/ceo.png";
import teamImg from "@/assets/home/team.jpg";
import ctaPeople from "@/assets/home/cta-people.png";

const BANNER_VIDEO = "/banner-video.mp4";

const STORY_CARDS = [
  { title: "STARSCOUT", to: "/starscout", desc: "Explore open positions and take the next step in your career with STARTRADER." },
  { title: "About us", to: "/about", desc: "Learn more about the team, vision, and values driving STARTRADER’s journey." },
  { title: "STARLIFE", to: "/starlife", desc: "Have a look at our vibrant culture, events, and behind-the-scenes moments at STARTRADER." },
];
const STORY_CARDS_WIDE = [
  { title: "STARSOCIAL", to: "/starsocial", desc: "Explore STARTRADER’s initiatives to support communities and create lasting impact." },
  { title: "STARBLOG", to: "/starblog", desc: "Dive into insights, stories, and updates, from market trends to team moments and event highlights." },
];

const TEAM_ROWS = [
  { label: "What we believe", desc: "A strong company culture starts with listening, trust, and the freedom to contribute in meaningful ways." },
  { label: "What we’re building", desc: "An environment where collaboration leads, growth is shared, and every effort is respected." },
];

function StoryCard({ title, desc, to }: { title: string; desc: string; to: string }) {
  return (
    <Link
      to={to}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-card bg-white p-[30px] shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(0,71,187,0.5)]"
    >
      {/* brand gradient fills the card on hover */}
      <span className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-blue to-brand-navy opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <h3 className="text-[22px] font-semibold uppercase text-ink transition-colors duration-300 group-hover:text-white">
          {title}
        </h3>
        <span className="translate-x-2 text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>

      {/* animated divider: base hairline + brand-cyan fill that sweeps in */}
      <span className="relative mt-4 block h-px w-full overflow-hidden bg-line/80 transition-colors duration-300 group-hover:bg-white/25">
        <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-brand-cyan transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </span>

      <p className="mt-4 text-body text-ink/70 transition-colors duration-300 group-hover:text-white/85">{desc}</p>
    </Link>
  );
}

export default function Home() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="bg-white">
      {/* ───────── HERO ───────── */}
      <section ref={heroRef} className="relative flex h-[clamp(600px,56vw,800px)] items-center overflow-hidden">
        <Parallax className="absolute inset-0" distance={60}>
          <img src={heroImg} alt="" className="h-full w-full scale-110 object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

        <motion.div className="shell relative" style={reduce ? undefined : { y: heroTextY, opacity: heroTextOpacity }}>
          <Stagger className="max-w-[651px]" stagger={0.14}>
            <StaggerItem>
              <h1 className="hero-title text-white">Carve your path to success with STARTRADER</h1>
            </StaggerItem>
            <StaggerItem>
              <Link
                to="/starscout"
                className="mt-7 inline-flex items-center justify-center rounded-btn bg-brand-blue px-5 py-[10px] text-[16px] font-medium text-white transition-all duration-300 ease-out hover:brightness-110 hover:shadow-[0_14px_30px_-10px_rgba(0,71,187,0.6)]"
              >
                Explore, Evolve, Extend
              </Link>
            </StaggerItem>
          </Stagger>
        </motion.div>

        {/* scroll cue */}
        {!reduce && (
          <motion.div
            className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/70"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.div>
        )}
      </section>

      {/* ───────── BANNER VIDEO ───────── */}
      <section className="relative h-[clamp(320px,44vw,638px)] w-full overflow-hidden bg-brand-deep">
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <VideoPlayer src={BANNER_VIDEO} poster={videoThumb} />
        </motion.div>
      </section>

      {/* ───────── STARSTORY ───────── */}
      <section className="bg-navy-grad py-[90px] text-white">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <Reveal className="shrink-0">
              <Eyebrow label="STARSTORY" tone="dark" />
            </Reveal>
            <div className="lg:w-[58%]">
              <Reveal>
                <h2 className="section-title text-white">STARSTORY</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-body text-white/75">
                  Every great venture starts with a simple idea. Ours was to demystify trading and
                  empower individuals worldwide to achieve financial independence, and we grew to
                  become a globally-leading broker.
                </p>
              </Reveal>
            </div>
          </div>

          <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STORY_CARDS.map((c) => (
              <StaggerItem key={c.title} className="h-full">
                <StoryCard {...c} />
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2" delay={0.1}>
            {STORY_CARDS_WIDE.map((c) => (
              <StaggerItem key={c.title} className="h-full">
                <StoryCard {...c} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ───────── CEO MESSAGE ───────── */}
      <section className="relative overflow-hidden pb-16 lg:pb-0">
        <img src={ceoTexture} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-white/30" />
        <div className="shell relative grid grid-cols-1 gap-10 pt-16 lg:min-h-[620px] lg:grid-cols-[450px_1fr] lg:items-end lg:gap-16 lg:pt-24">
          {/* Peter — anchored to the bottom of the section */}
          <Reveal className="relative lg:self-end">
            <div className="mx-auto h-[clamp(360px,44vw,560px)] w-full max-w-[450px] overflow-hidden">
              <img src={ceoImg} alt="Mr. Peter Karsten, CEO of STARTRADER" className="block h-full w-full object-cover object-top" />
            </div>
          </Reveal>
          {/* Message — vertically centered in the section */}
          <Reveal delay={0.1} className="lg:self-center lg:pb-12">
            <h2 className="text-[22px] font-medium text-ink">Our CEO’s message to the people</h2>
            <p className="mt-2 text-body text-brand-blue">Mr. Peter Karsten, CEO of STARTRADER</p>
            <p className="mt-5 max-w-[644px] text-body text-ink">
              <span className="text-brand-blue">“</span>
              Great platforms are built by great people — and at STARTRADER, we’re proud to build
              the kind of place where talent grows, leaders rise, and every contribution counts.
              <span className="text-brand-blue">”</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── TEAM / WHO WE ARE ───────── */}
      <section className="bg-navy-grad py-[90px] text-white">
        <div className="shell">
          <Reveal>
            <Eyebrow label="WHO WE ARE" tone="dark" />
          </Reveal>
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <Reveal>
              <h2 className="section-title max-w-[454px] text-white">A team that moves with purpose</h2>
            </Reveal>
            <Reveal className="lg:w-[55%]" delay={0.1}>
              <p className="text-body text-white/70">
                At STARTRADER, everyone plays a part in shaping how we grow: from the developers
                behind our platforms to the people who guide and support our clients every day.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[450px_1fr] lg:gap-16">
            <Reveal>
              <Parallax className="h-[273px] w-full max-w-[450px] overflow-hidden rounded-[14px]" distance={26}>
                <img src={teamImg} alt="" className="h-full w-full scale-110 object-cover" />
              </Parallax>
            </Reveal>

            <div>
              {TEAM_ROWS.map((row, i) => (
                <Reveal key={row.label} delay={i * 0.08}>
                  <div
                    className={`grid grid-cols-1 gap-2 py-4 md:grid-cols-[230px_1fr] md:gap-8 ${
                      i > 0 ? "border-t border-white/15" : ""
                    }`}
                  >
                    <h3 className="text-[16px] font-medium text-white">{row.label}</h3>
                    <p className="text-body text-white/80">{row.desc}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.18}>
                <Link
                  to="/about"
                  className="mt-6 inline-flex h-[45px] items-center justify-center rounded-btn bg-white px-10 text-[16px] font-medium text-brand-blue transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lift"
                >
                  Know More
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CTA BAND ───────── */}
      <CtaBand
        title="Your next big opportunity is closer than you think!"
        buttonLabel="Find It Now"
        buttonTo="/starscout"
        image={ctaPeople}
        imageAlt="STARTRADER team members"
      />
    </div>
  );
}
