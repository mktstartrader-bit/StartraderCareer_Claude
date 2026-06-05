import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import ImpactCta from "@/components/sections/ImpactCta";
import CollageHero from "@/components/sections/CollageHero";
import Seo from "@/components/Seo";
import PostCard from "@/components/blog/PostCard";
import StarcastPlayer from "@/components/blog/StarcastPlayer";
import { POSTS } from "@/data/blog";
import { EASE_OUT } from "@/lib/motion";

import woman from "@/assets/life/woman.jpg";
import b1 from "@/assets/blog/b1.jpg";
import b3 from "@/assets/blog/b3.jpg";
import b5 from "@/assets/blog/b5.jpg";
import v1 from "@/assets/blog/v1.jpg";
import v2 from "@/assets/blog/v2.jpg";
import ctaPeople from "@/assets/life/cta-people.png";

const TABS = ["All", "People & culture", "Achievements", "Market insights"];
const PAGE_SIZE = 6;

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

export default function Blog() {
  const [tab, setTab] = useState("All");
  const [page, setPage] = useState(1);
  const gridTop = useRef<HTMLDivElement>(null);

  const filtered = tab === "All" ? POSTS : POSTS.filter((p) => p.category.toLowerCase() === tab.toLowerCase());
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectTab = (t: string) => {
    setTab(t);
    setPage(1);
  };
  const goToPage = (p: number) => {
    setPage(Math.min(totalPages, Math.max(1, p)));
    gridTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white">
      <Seo
        title="StarBlog"
        description="Ideas, insights and moments that matter — straight from the people who live them at STARTRADER."
        path="/starblog"
        image={b1}
      />

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
                  onClick={() => selectTab(t)}
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

          <div ref={gridTop} className="scroll-mt-24" />
          <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {paged.map((p, i) => (
                <motion.div
                  key={`${tab}-${page}-${p.slug}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.05 }}
                >
                  <PostCard post={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-[5px]">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-[8px] text-[15px] text-ink/60 transition-colors hover:text-brand-blue disabled:opacity-40 disabled:hover:text-ink/60"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  aria-current={p === page}
                  className={`flex h-9 w-9 items-center justify-center rounded-[8px] text-[14px] transition-colors ${
                    p === page ? "bg-brand-blue font-medium text-white" : "text-ink hover:bg-[rgba(218,227,237,0.6)]"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-[8px] text-[15px] text-ink/60 transition-colors hover:text-brand-blue disabled:opacity-40 disabled:hover:text-ink/60"
              >
                ›
              </button>
            </div>
          )}
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

          {/* interactive featured player + episode list */}
          <div className="mt-12">
            <StarcastPlayer />
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
      <ImpactCta
        title="It’s more than a blog, it’s our story, in real time."
        buttonLabel="Join Us"
        buttonTo="/starscout"
        image={ctaPeople}
        imageAlt="STARTRADER team"
      />
    </div>
  );
}
