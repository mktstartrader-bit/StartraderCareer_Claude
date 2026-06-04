import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaBand from "@/components/sections/CtaBand";
import CollageHero from "@/components/sections/CollageHero";
import { EASE_OUT } from "@/lib/motion";

import woman from "@/assets/life/woman.jpg";
import b1 from "@/assets/blog/b1.jpg";
import b2 from "@/assets/blog/b2.jpg";
import b3 from "@/assets/blog/b3.jpg";
import b4 from "@/assets/blog/b4.jpg";
import b5 from "@/assets/blog/b5.jpg";
import b6 from "@/assets/blog/b6.jpg";
import v1 from "@/assets/blog/v1.jpg";
import v2 from "@/assets/blog/v2.jpg";
import ctaPeople from "@/assets/life/cta-people.png";

const TABS = ["All", "People & culture", "Achievements", "Market insights"];

const POSTS = [
  { img: b1, cat: "Achievements" },
  { img: b2, cat: "People & culture" },
  { img: b3, cat: "Market insights" },
  { img: b4, cat: "Achievements" },
  { img: b5, cat: "People & culture" },
  { img: b6, cat: "Market insights" },
];
const POST_TITLE = "Unwrapping moments of joy: STARTRADER’s Christmas celebration";
const POST_EXCERPT = "Santa Claus visited our office on Christmas! He did not come only to give gifts.......";

const EPISODES = [
  { n: "01", cat: "People and culture", thumb: woman },
  { n: "02", cat: "Achievements", thumb: v1 },
  { n: "03", cat: "Market Insights", thumb: woman },
  { n: "04", cat: "People and culture", thumb: v1 },
  { n: "05", cat: "Achievements", thumb: woman },
];

function PlayTriangle({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" />
    </span>
  );
}
function YoutubeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 002.42 7.2 26 26 0 002 12a26 26 0 00.42 4.81 2.5 2.5 0 001.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 001.76-1.77A26 26 0 0022 12a26 26 0 00-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
    </svg>
  );
}

function PostCard({ img, cat }: { img: string; cat: string }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[15px] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative h-[200px] overflow-hidden">
        <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-[10px] bg-brand-blue px-3 py-1 text-[12px] font-medium text-white">{cat}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[18px] font-medium leading-[1.3] text-ink transition-colors group-hover:text-brand-blue">{POST_TITLE}</h3>
        <p className="mt-3 text-[14px] leading-[22px] text-[#50555b]">
          {POST_EXCERPT}
          <a href="#" className="font-medium text-brand-blue">Read More</a>
        </p>
      </div>
    </article>
  );
}

export default function Blog() {
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? POSTS : POSTS.filter((p) => p.cat.toLowerCase() === tab.toLowerCase());

  return (
    <div className="bg-white">
      {/* ───────── HERO ───────── */}
      <CollageHero marquee bg="bg-[rgba(218,227,237,0.2)]" images={[woman, b1, b3, b5]}>
        <Reveal>
          <h1 className="text-[clamp(38px,5vw,50px)] font-medium leading-[1.05] text-ink">STARBLOG</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-[481px] text-body text-[#50555b]">
            The space where STARTRADER speaks for Itself. Ideas. Insights. Moments that matter, all
            from the people who live them.
          </p>
        </Reveal>
      </CollageHero>

      {/* ───────── OUR BLOG ARTICLES ───────── */}
      <section className="bg-[rgba(218,227,237,0.4)] py-[80px]">
        <div className="shell">
          <Reveal className="text-center">
            <div className="flex justify-center">
              <Eyebrow label="OUR BLOGS" tone="light" />
            </div>
            <h2 className="mt-6 text-[clamp(28px,3.6vw,42px)] font-medium tracking-[-1px] text-ink">Our blog articles</h2>
            <p className="mt-3 text-body text-[#50555b]">A quick read from the world of STARTRADER.</p>
          </Reveal>

          {/* filter tabs */}
          <Reveal className="mt-8 flex justify-center">
            <div className="flex flex-wrap justify-center gap-1 rounded-full bg-[rgba(218,227,237,0.6)] p-1.5">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="relative rounded-full px-5 py-2 text-[14px] transition-colors duration-300"
                >
                  {tab === t && (
                    <motion.span layoutId="blogTab" className="absolute inset-0 rounded-full bg-brand-blue" transition={{ duration: 0.35, ease: EASE_OUT }} />
                  )}
                  <span className={`relative z-10 ${tab === t ? "font-medium text-white" : "text-ink"}`}>{t}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={`${tab}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.05 }}
                >
                  <PostCard img={p.img} cat={p.cat} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ───────── INSIGHTS BEYOND THE SCREEN (dark) ───────── */}
      <section className="bg-navy-grad py-[90px] text-white">
        <div className="shell">
          <Reveal className="text-center">
            <div className="flex justify-center">
              <Eyebrow label="STARCAST" tone="dark" />
            </div>
            <h2 className="mt-6 text-[clamp(28px,3.6vw,42px)] font-medium tracking-[-1px] text-white">Insights Beyond the Screen</h2>
            <p className="mx-auto mt-3 max-w-[688px] text-body text-white/70">
              From expert discussions to event moments and market-focused content, our YouTube and
              podcast channels bring STARTRADER’s voice, vision, and global presence closer to you.
            </p>
          </Reveal>

          {/* featured + episode list */}
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[500px_1fr]">
            {/* featured player */}
            <Reveal className="rounded-[20px] border border-line/20 bg-gradient-to-b from-[rgba(0,20,137,0.6)] to-[rgba(13,13,75,0.6)] p-7 backdrop-blur-[7px]">
              <div className="flex items-start gap-4">
                <img src={woman} alt="" className="h-[64px] w-[64px] rounded-[12px] object-cover" />
                <div className="min-w-0">
                  <p className="text-[12px] uppercase tracking-wide text-brand-cyan">Featured · Episode 12</p>
                  <h3 className="mt-1 text-[20px] font-medium leading-tight text-white">Building a career that compounds</h3>
                  <p className="mt-1 text-[13px] text-white/60">With Peter Karsten, CEO, STARTRADER</p>
                </div>
              </div>
              <p className="mt-5 text-[14px] leading-[22px] text-white/75">
                What does it take to grow inside a fast-moving broker? Our CEO shares the mindset, the
                missteps, and the moments that shaped a global team.
              </p>
              {/* player */}
              <div className="mt-7 flex items-center gap-4">
                <button className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-white text-brand-blue transition-transform hover:scale-105">
                  <PlayTriangle />
                </button>
                <div className="relative h-[5px] flex-1 rounded-full bg-[rgba(218,227,237,0.4)]">
                  <span className="absolute left-0 top-0 h-full w-[28%] rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan" />
                  <span className="absolute left-[28%] top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-brand-cyan bg-white" />
                </div>
                <span className="shrink-0 text-[12px] text-white/60">12:58</span>
              </div>
            </Reveal>

            {/* episode list */}
            <Reveal delay={0.08} className="rounded-[20px] border border-line/20 bg-gradient-to-b from-[rgba(0,20,137,0.6)] to-[rgba(13,13,75,0.6)] p-3 backdrop-blur-[7px]">
              <Stagger className="flex flex-col">
                {EPISODES.map((e) => (
                  <StaggerItem key={e.n} className="group flex items-center gap-4 rounded-[14px] px-4 py-3 transition-colors hover:bg-white/5">
                    <span className="w-6 shrink-0 text-[13px] text-white/40">{e.n}</span>
                    <img src={e.thumb} alt="" className="h-[56px] w-[56px] shrink-0 rounded-[10px] object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-medium text-white">Inside our trading desk</p>
                      <p className="text-[12px] text-white/55">{e.cat}</p>
                    </div>
                    <span className="hidden shrink-0 rounded-full border border-white/20 px-3 py-1 text-[12px] text-white/70 sm:block">38 min</span>
                    <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-brand-blue">
                      <PlayTriangle />
                    </button>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          </div>

          {/* video cards */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal className="group relative h-[260px] overflow-hidden rounded-[20px] sm:h-[350px]">
              <img src={v1} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[12px] text-white">3:24 min</span>
              <button className="absolute left-1/2 top-1/2 flex h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-blue transition-transform group-hover:scale-110"><PlayTriangle /></button>
              <div className="absolute bottom-5 left-5">
                <span className="flex items-center gap-2 text-[13px] font-medium text-white"><YoutubeMark className="h-4 w-4 text-[#f61c0d]" /> STARTRADER</span>
                <p className="mt-1 text-[16px] font-medium text-white">This is STARTRADER — one team, one mission</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-6">
              {[v2, v1].map((vsrc, i) => (
                <Reveal key={i} delay={i * 0.06} className="group relative h-[160px] overflow-hidden rounded-[20px]">
                  <img src={vsrc} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[12px] text-white">3:24 min</span>
                  <button className="absolute left-6 top-1/2 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-blue transition-transform group-hover:scale-110"><PlayTriangle /></button>
                  <div className="absolute bottom-4 left-[76px]">
                    <span className="flex items-center gap-2 text-[12px] font-medium text-white"><YoutubeMark className="h-4 w-4 text-[#f61c0d]" /> STARTRADER</span>
                    <p className="mt-0.5 text-[14px] font-medium text-white">This is STARTRADER — one team, one mission</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* subscribe bar */}
          <Reveal className="mt-6 flex flex-col items-center justify-between gap-5 rounded-[20px] border border-line/20 bg-gradient-to-r from-[rgba(0,20,137,0.6)] to-[rgba(0,71,187,0.6)] px-8 py-6 backdrop-blur-[7px] md:flex-row">
            <p className="text-center text-[15px] text-white/85 md:text-left">
              Subscribe for new episodes, event recaps and trader stories every week.
            </p>
            <a href="#" className="inline-flex h-[45px] shrink-0 items-center gap-2 rounded-btn bg-[#f61c0d] px-6 text-[15px] font-medium text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_14px_30px_-10px_rgba(246,28,13,0.6)]">
              <YoutubeMark className="h-5 w-5" /> Visit Our Channel
            </a>
          </Reveal>
        </div>
      </section>

      {/* ───────── CTA BAND ───────── */}
      <CtaBand
        title="It’s more than a blog, it’s our story, in real time."
        buttonLabel="Join Us"
        buttonTo="/starscout"
        image={ctaPeople}
        imageAlt="STARTRADER team"
      />
    </div>
  );
}
