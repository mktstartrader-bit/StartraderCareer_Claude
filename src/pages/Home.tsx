import { Link } from "react-router-dom";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaBand from "@/components/sections/CtaBand";

import heroImg from "@/assets/home/hero.jpg";
import ceoBg from "@/assets/home/ceo-bg.jpg";
import ceoImg from "@/assets/home/ceo.png";
import teamImg from "@/assets/home/team.jpg";
import ctaPeople from "@/assets/home/cta-people.png";

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
      className="group flex h-full flex-col rounded-card bg-white p-[30px] shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
    >
      <h3 className="text-[22px] font-semibold uppercase text-ink transition-colors group-hover:text-brand-blue">
        {title}
      </h3>
      <span className="mt-4 h-px w-full bg-line" />
      <p className="mt-4 text-body text-ink/70">{desc}</p>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="bg-white">
      {/* ───────── HERO ───────── */}
      <section className="relative flex h-[clamp(600px,56vw,800px)] items-center overflow-hidden">
        <Parallax className="absolute inset-0" distance={50}>
          <img src={heroImg} alt="" className="h-full w-full scale-110 object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
        <div className="shell relative">
          <Reveal>
            <h1 className="hero-title max-w-[651px] text-white">
              Carve your path to success with STARTRADER
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <Link
              to="/starscout"
              className="mt-7 inline-flex items-center justify-center rounded-btn bg-brand-blue px-5 py-[10px] text-[16px] font-medium text-white transition-all duration-300 ease-out hover:brightness-110 hover:shadow-[0_14px_30px_-10px_rgba(0,71,187,0.6)]"
            >
              Explore, Evolve, Extend
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── HERO MEDIA / VIDEO ───────── */}
      <section className="relative h-[clamp(320px,44vw,638px)] w-full overflow-hidden bg-brand-deep">
        <Parallax className="absolute inset-0" distance={40}>
          <img src={heroImg} alt="" className="h-full w-full scale-110 object-cover opacity-30" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/80 to-brand-navy/90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Reveal>
            <button
              type="button"
              aria-label="Play video"
              className="group flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lift backdrop-blur transition-transform duration-300 ease-out hover:scale-105"
            >
              <span className="ml-1 block h-0 w-0 border-y-[12px] border-l-[20px] border-y-transparent border-l-brand-blue transition-colors group-hover:border-l-brand-navy" />
            </button>
          </Reveal>
        </div>
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
      <section className="relative overflow-hidden">
        <img src={ceoBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-white/40" />
        <div className="shell relative grid grid-cols-1 items-end gap-10 pt-16 lg:grid-cols-[450px_1fr] lg:gap-16">
          <Reveal className="relative">
            <div className="mx-auto h-[clamp(380px,42vw,535px)] w-full max-w-[450px] overflow-hidden">
              <img src={ceoImg} alt="Mr. Peter Karsten, CEO of STARTRADER" className="h-full w-full object-cover object-top" />
            </div>
          </Reveal>
          <Reveal className="pb-20 lg:pb-28" delay={0.1}>
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
