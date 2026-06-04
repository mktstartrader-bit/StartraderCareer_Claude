import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Eyebrow from "@/components/ui/Eyebrow";
import Accordion from "@/components/ui/Accordion";
import CtaBand from "@/components/sections/CtaBand";
import IconFeatures from "@/components/sections/IconFeatures";
import CollageHero from "@/components/sections/CollageHero";

import woman from "@/assets/life/woman.jpg";
import culture from "@/assets/life/culture.jpg";
import ctaPeople from "@/assets/life/cta-people.png";
import icInclusivity from "@/assets/life/ic-inclusivity.svg";
import icService from "@/assets/life/ic-service.svg";
import icAchievement from "@/assets/life/ic-achievement.svg";
import icIdea from "@/assets/life/ic-idea.svg";

import heroImg from "@/assets/home/hero.jpg";
import teamImg from "@/assets/home/team.jpg";

const GALLERY = [
  { src: heroImg, label: "Modern work" },
  { src: woman, label: "Celebration" },
  { src: teamImg, label: "High five" },
];
const GALLERY2 = [
  { src: culture, label: "Indoors" },
  { src: teamImg, label: "Discussion" },
  { src: heroImg, label: "Together" },
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

export default function Life() {
  return (
    <div className="bg-white">
      {/* ───────── HERO ───────── */}
      <CollageHero marquee bg="bg-[rgba(218,227,237,0.2)]" images={[woman, teamImg, heroImg, culture]}>
        <Reveal>
          <h1 className="text-[clamp(38px,5vw,50px)] font-medium leading-[1.05] text-ink">STARLIFE</h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-[16px] font-medium text-brand-blue">
            We work hard, no doubt! We don’t settle for average.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-3 max-w-[581px] text-body text-[#50555b]">
            But we also know that success is best celebrated together. That’s why we party even
            harder, building stronger bonds, fueling motivation, and making every achievement
            more meaningful.
          </p>
        </Reveal>
      </CollageHero>

      {/* ───────── HAVE A LOOK AT OUR STARLIFE ───────── */}
      <section className="bg-white py-[80px]">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <Reveal className="shrink-0">
              <Eyebrow label="STARLIFE" tone="light" />
            </Reveal>
            <div className="lg:w-[62%]">
              <Reveal>
                <h2 className="text-[clamp(28px,3.6vw,40px)] font-medium tracking-[-1px] text-ink">
                  Have a look at our STARLIFE
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-4 text-body leading-[1.6] text-[#50555b]">
                  We don’t just work together; we celebrate together. Our team comes together for
                  cultural festivals, wellness events, and year-end celebrations that bring energy
                  and camaraderie to the workplace.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* full-bleed mosaic */}
        <div className="mt-12 space-y-[15px]">
          <Stagger className="grid grid-cols-1 gap-[15px] px-[15px] sm:grid-cols-3 lg:grid-cols-[592fr_226fr_592fr]">
            {GALLERY.map((g, i) => (
              <StaggerItem key={i} className="group relative h-[220px] overflow-hidden rounded-[12px] sm:h-[300px]">
                <img src={g.src} alt={g.label} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/30 to-transparent" />
                <span className="absolute bottom-4 left-4 text-[13px] font-medium uppercase tracking-wide text-white/85">{g.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="grid grid-cols-1 gap-[15px] px-[15px] sm:grid-cols-3 lg:grid-cols-[406fr_545fr_460fr]" delay={0.08}>
            {GALLERY2.map((g, i) => (
              <StaggerItem key={i} className="group relative h-[220px] overflow-hidden rounded-[12px] sm:h-[300px]">
                <img src={g.src} alt={g.label} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/30 to-transparent" />
                <span className="absolute bottom-4 left-4 text-[13px] font-medium uppercase tracking-wide text-white/85">{g.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ───────── A CULTURE OF AMBITION ───────── */}
      <section className="relative overflow-hidden bg-[rgba(218,227,237,0.35)] py-[90px]">
        <span className="pointer-events-none absolute left-[-30px] top-1/2 hidden -translate-y-1/2 -rotate-90 select-none text-[100px] font-bold tracking-[-1px] text-[rgba(218,227,237,0.6)] lg:block">
          JOIN US
        </span>
        <div className="shell relative">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-16">
            <Reveal className="shrink-0">
              <Eyebrow label="OUR CULTURE" tone="light" />
            </Reveal>
            <Reveal>
              <h2 className="max-w-[470px] text-[clamp(28px,3.6vw,40px)] font-medium leading-[1.1] tracking-[-1px] text-ink">
                A culture of ambition and opportunity
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
            <Reveal>
              <div className="h-[360px] w-full overflow-hidden rounded-[14px] sm:h-[400px]">
                <img src={culture} alt="STARTRADER culture" className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion items={CULTURE_ITEMS} tone="light" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── WHY SET YOUR COURSE ───────── */}
      <IconFeatures
        eyebrow="WHY CHOOSE US"
        heading="Why set your course with us?"
        subtitle="Our exploration group is:"
        items={FEATURES}
      />

      {/* ───────── CTA BAND ───────── */}
      <CtaBand
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
