import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Eyebrow from "@/components/ui/Eyebrow";
import Accordion from "@/components/ui/Accordion";
import ImpactCta from "@/components/sections/ImpactCta";
import IconFeatures from "@/components/sections/IconFeatures";
import { EASE_OUT } from "@/lib/motion";

import star from "@/assets/scout/star.svg";
import icRequirements from "@/assets/scout/ic-requirements.svg";
import icClick from "@/assets/scout/ic-click.svg";
import icInterview from "@/assets/scout/ic-interview.svg";
import icEnvelope from "@/assets/scout/ic-envelope.svg";
import people from "@/assets/scout/people.jpg";
import ctaPeople from "@/assets/life/cta-people.png";

type Job = { title: string; type: string; location: string; dept: string; about: string };
const JOBS: Job[] = [
  { title: "Customer Support Expert", type: "Full-Time", location: "Malaysia", dept: "Customer Support", about: "Be the voice of STARTRADER — guide clients with clarity and care, resolve queries fast, and turn every interaction into a great experience." },
  { title: "Business Development Executive", type: "Full-Time", location: "Malaysia", dept: "Business Development", about: "Open new markets and grow lasting partnerships. You'll identify opportunities, build relationships, and help expand our global footprint." },
  { title: "Marketing Executive", type: "Full-Time", location: "Malaysia", dept: "Marketing", about: "Craft campaigns that move people. Own content, channels, and analytics to grow brand reach and engagement across regions." },
  { title: "Multimedia Designer", type: "Full-Time", location: "Malaysia", dept: "Design", about: "Bring our brand to life across video, motion, and graphics — designing assets that are as sharp as they are on-brand." },
  { title: "Customer Support", type: "Full-Time", location: "Malaysia", dept: "Customer Support", about: "Support our clients day to day with empathy and precision, ensuring every question finds a fast, helpful answer." },
];

const FILTERS = [
  { key: "dept", label: "Departments", options: ["Marketing", "Customer Support", "Business Development", "Design"] },
  { key: "location", label: "Locations", options: ["Malaysia"] },
  { key: "type", label: "Job Types", options: ["Full-Time"] },
] as const;

const LOOK_FOR = [
  { q: "They bring more than a resume.", a: "We're not only interested in your years of experience — we want to feel the energy behind your words, the stories that shaped who you are today." },
  { q: "They are different and unique.", a: "Distinct perspectives make stronger teams. We look for people who think differently and aren't afraid to bring fresh ideas forward." },
  { q: "They’re ready to grow.", a: "Ambition matters. We look for people eager to learn, stretch themselves, and grow alongside a fast-moving global company." },
];

const STEPS = [
  { icon: icRequirements, title: "01. Application Submission", desc: "Share your skills and experience by submitting your CV." },
  { icon: icClick, title: "02. Screening & Selection", desc: "We will review your application to match your qualifications with the needs of our teams." },
  { icon: icInterview, title: "03. Interview", desc: "If shortlisted, you will be invited for an interview where you can showcase your strengths." },
  { icon: icEnvelope, title: "04. Offer", desc: "Successful candidates receive an offer and are welcomed into a world of opportunity and growth." },
];

type FilterKey = "dept" | "location" | "type";
type FilterState = Record<FilterKey, string | null>;

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-[5px] bg-[rgba(218,227,237,0.5)] px-2.5 py-1 text-[12px] font-medium text-ink/70">{children}</span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg width="13" height="13" viewBox="0 0 24 24" fill="none" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE_OUT }}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

function FilterDropdown({
  label, options, value, open, onToggle, onChange,
}: {
  label: string; options: readonly string[]; value: string | null;
  open: boolean; onToggle: () => void; onChange: (v: string | null) => void;
}) {
  const active = value !== null;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={[
          "flex items-center gap-2 rounded-full border px-5 py-2 text-[14px] transition-colors duration-200",
          active ? "border-brand-blue bg-brand-blue text-white" : "border-line bg-white text-ink hover:border-brand-blue",
        ].join(" ")}
      >
        {value ?? label}
        <Chevron open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute left-1/2 z-30 mt-2 min-w-[200px] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-white p-1.5 text-left shadow-lift"
          >
            <li>
              <button type="button" onClick={() => onChange(null)} className={`block w-full rounded-xl px-4 py-2 text-left text-[14px] transition-colors hover:bg-line/50 ${value === null ? "font-medium text-brand-blue" : "text-ink"}`}>
                All {label}
              </button>
            </li>
            {options.map((o) => (
              <li key={o}>
                <button type="button" onClick={() => onChange(o)} className={`block w-full rounded-xl px-4 py-2 text-left text-[14px] transition-colors hover:bg-line/50 ${value === o ? "font-medium text-brand-blue" : "text-ink"}`}>
                  {o}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function JobRow({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  return (
    <div className="rounded-[20px] border-b-4 border-line bg-white shadow-card transition-all duration-300 hover:border-brand-blue hover:shadow-lift">
      <div className="flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={() => setOpen((v) => !v)} className="flex flex-1 items-start gap-3 text-left">
          <img src={star} alt="" className="mt-1 h-[18px] w-[15px] shrink-0" />
          <span>
            <span className="block text-[16px] font-medium text-ink">{job.title}</span>
            <span className="mt-3 flex flex-wrap gap-2">
              <Tag>{job.type}</Tag>
              <Tag>{job.location}</Tag>
              <Tag>{job.dept}</Tag>
            </span>
          </span>
        </button>
        <div className="flex items-center gap-3">
          <Link to="#" className="inline-flex h-[46px] items-center justify-center rounded-btn bg-brand-blue px-8 text-[15px] font-medium text-white transition-all duration-300 ease-out hover:brightness-110 hover:shadow-[0_14px_30px_-10px_rgba(0,71,187,0.6)]">
            View Job
          </Link>
          <button type="button" aria-label="Expand" onClick={() => setOpen((v) => !v)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-line/60 text-ink transition-colors hover:bg-line">
            <Chevron open={open} />
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="border-t border-line px-7 py-5 text-body text-[#50555b]">{job.about}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Pagination() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3, 4, 5];
  const btn = "flex h-8 w-8 items-center justify-center rounded-[6px] text-[14px] transition-colors";
  return (
    <div className="mt-10 flex items-center justify-center gap-[5px]">
      <button className={`${btn} text-ink/60 hover:text-brand-blue`} onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Previous">‹</button>
      {pages.map((p) => (
        <button key={p} onClick={() => setPage(p)} className={`${btn} ${p === page ? "bg-brand-blue text-white" : "text-ink hover:bg-line/60"}`}>{p}</button>
      ))}
      <button className={`${btn} text-ink/60 hover:text-brand-blue`} onClick={() => setPage((p) => Math.min(5, p + 1))} aria-label="Next">›</button>
    </div>
  );
}

export default function Scout() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({ dept: null, location: null, type: null });
  const [openMenu, setOpenMenu] = useState<FilterKey | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // close any open dropdown when clicking outside the filter bar
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const anyFilter = query || filters.dept || filters.location || filters.type;
  const jobs = JOBS.filter(
    (j) =>
      (!filters.dept || j.dept === filters.dept) &&
      (!filters.location || j.location === filters.location) &&
      (!filters.type || j.type === filters.type) &&
      (!query || j.title.toLowerCase().includes(query.toLowerCase()) || j.dept.toLowerCase().includes(query.toLowerCase()))
  );

  const setFilter = (key: FilterKey, v: string | null) => {
    setFilters((f) => ({ ...f, [key]: v }));
    setOpenMenu(null);
  };

  return (
    <div className="bg-white">
      {/* ───────── HERO + SEARCH ───────── */}
      <section className="bg-gradient-to-b from-[rgba(218,227,237,0.6)] via-[rgba(218,227,237,0.3)] to-white pt-[110px]">
        <div className="shell">
          <Reveal className="text-center">
            <h1 className="text-[clamp(34px,4.6vw,50px)] font-medium tracking-[-1px] text-ink">Our job openings</h1>
            <p className="mx-auto mt-3 max-w-[560px] text-body text-[#50555b]">
              With great starting salary which starts from K. Let’s join us quickly then.
            </p>
          </Reveal>

          {/* search */}
          <Reveal delay={0.08} className="mx-auto mt-8 flex max-w-[780px] items-center gap-3">
            <div className="flex h-[60px] flex-1 items-center gap-3 rounded-full bg-white px-6 shadow-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink/50">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a role, team or location"
                className="h-full w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink/40"
              />
            </div>
            <button className="h-[60px] shrink-0 rounded-full bg-brand-blue px-9 text-[16px] font-medium text-white transition-all duration-300 hover:brightness-110">
              Search
            </button>
          </Reveal>

          {/* filters — centered, with working dropdowns */}
          <Reveal delay={0.14}>
            <div ref={filterRef} className="mx-auto mt-5 flex max-w-[820px] flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => { setFilters({ dept: null, location: null, type: null }); setQuery(""); setOpenMenu(null); }}
                className={[
                  "rounded-full px-5 py-2 text-[14px] transition-colors duration-200",
                  anyFilter ? "border border-line bg-white text-ink hover:border-brand-blue" : "bg-brand-blue text-white",
                ].join(" ")}
              >
                All
              </button>
              {FILTERS.map((f) => (
                <FilterDropdown
                  key={f.key}
                  label={f.label}
                  options={f.options}
                  value={filters[f.key as FilterKey]}
                  open={openMenu === f.key}
                  onToggle={() => setOpenMenu((m) => (m === f.key ? null : (f.key as FilterKey)))}
                  onChange={(v) => setFilter(f.key as FilterKey, v)}
                />
              ))}
            </div>
          </Reveal>

          {/* listings + talent card */}
          <div className="mt-12 grid grid-cols-1 gap-6 pb-[90px] lg:grid-cols-[325px_1fr]">
            <Reveal>
              <div className="rounded-[10px] bg-gradient-to-b from-brand-blue to-brand-navy p-8 text-center text-white lg:sticky lg:top-24">
                <h3 className="text-[18px] font-semibold">Our talent pool</h3>
                <p className="mt-4 text-[14px] leading-[22px] text-white/80">
                  Your dream job isn’t listed? No worries! Share your CV and stay in our talent orbit for future missions.
                </p>
                <Link to="#" className="mt-6 inline-flex h-[46px] items-center justify-center rounded-btn bg-white px-8 text-[15px] font-medium text-brand-blue transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                  Apply Now!
                </Link>
              </div>
            </Reveal>

            <div>
              {jobs.length > 0 ? (
                <Stagger key={`${filters.dept}-${filters.location}-${filters.type}-${query}`} className="flex flex-col gap-4">
                  {jobs.map((j) => (
                    <StaggerItem key={j.title}>
                      <JobRow job={j} />
                    </StaggerItem>
                  ))}
                </Stagger>
              ) : (
                <div className="rounded-[20px] border border-line bg-white p-12 text-center text-body text-[#50555b]">
                  No roles match your filters right now — try clearing them or check back soon.
                </div>
              )}
              <Pagination />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── MORE THAN CAREERS / EVERY STORY MATTERS ───────── */}
      <section className="relative overflow-hidden bg-[rgba(218,227,237,0.35)] py-[90px]">
        <span className="pointer-events-none absolute left-[-30px] top-1/2 hidden -translate-y-1/2 -rotate-90 select-none text-[100px] font-bold tracking-[-1px] text-[rgba(218,227,237,0.6)] lg:block">
          JOIN US
        </span>
        <div className="shell relative">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-14">
            <Reveal className="shrink-0">
              <Eyebrow label="WHO WE LOOK FOR" tone="light" />
            </Reveal>
            <Reveal>
              <h2 className="text-[clamp(28px,3.6vw,40px)] font-medium tracking-[-1px] text-ink">More than careers</h2>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
            <Reveal>
              <div className="h-[360px] w-full overflow-hidden rounded-[14px] sm:h-[400px]">
                <img src={people} alt="STARTRADER people" className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="text-[22px] font-medium text-ink">Every story matters</h3>
              <p className="mt-2 text-body text-[#50555b]">Everyone who lands here brings something unique.</p>
              <p className="mt-5 text-body text-ink">Here’s what we look for in the people who choose to apply:</p>
              <div className="mt-4">
                <Accordion items={LOOK_FOR} tone="light" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── YOUR JOURNEY (process) ───────── */}
      <IconFeatures eyebrow="OUR PROCESS" heading="Your journey to STARTRADER" items={STEPS} />

      {/* ───────── CTA BAND ───────── */}
      <ImpactCta
        title="Join STARTRADER and be part of a team driving progress in global trading."
        buttonLabel="Get A Glimpse"
        buttonTo="/starlife"
        image={ctaPeople}
        imageAlt="STARTRADER team"
      />
    </div>
  );
}
