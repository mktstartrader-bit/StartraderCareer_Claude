import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import RevealMask from "@/components/motion/RevealMask";
import Eyebrow from "@/components/ui/Eyebrow";
import Frame from "@/components/ui/Frame";
import Accordion from "@/components/ui/Accordion";
import ImageMarquee from "@/components/ui/ImageMarquee";
import ImpactCta from "@/components/sections/ImpactCta";

import csr2 from "@/assets/social/csr2.jpg";
import swiper06 from "@/assets/social/swiper06.webp";
import swiper07 from "@/assets/social/swiper07.webp";
import ndTeam from "@/assets/social/nd-team-photo.webp";
import ndDress from "@/assets/social/nd-emirati-dress.webp";
import ndSweetsFlags from "@/assets/social/nd-sweets-flags.webp";
import ndOfficeSweets from "@/assets/social/nd-office-sweets.webp";
import socialMark from "@/assets/social/mark.webp";
import ctaPeople from "@/assets/life/cta-people.png";
import teamImg from "@/assets/home/team.jpg";

const CSR_SLIDES = [
  { src: swiper06, label: "STARTRADER CSR initiative" },
  { src: ndTeam, label: "STARTRADER Dubai team group photo on UAE National Day" },
  { src: swiper07, label: "STARTRADER CSR initiative" },
  { src: ndDress, label: "STARTRADER colleagues in Emirati dress at UAE National Day celebration" },
  { src: ndSweetsFlags, label: "Arabic sweets with STARTRADER and UAE flags for National Day" },
  { src: ndOfficeSweets, label: "UAE National Day sweets with STARTRADER and UAE flags in the office" },
];

const INITIATIVES = [
  { q: "Education & child welfare", a: "Our work calls everyone to put on their binoculars of creativity and innovation to easily discover opportunities budding along the way. With STARTRADER, your abilities are challenged to improve and shine." },
  { q: "Sustainability & environmental care", a: "We invest in greener operations and community programmes that protect the environment and build a more sustainable future for the next generation." },
  { q: "Disaster relief & humanitarian aid", a: "When crises strike, we move quickly — supporting relief efforts and standing with the communities that need help the most." },
  { q: "Community empowerment", a: "From mentorship to local partnerships, we help people gain the skills, confidence, and resources to shape their own success." },
];

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[rgba(218,227,237,0.2)] pt-[104px] pb-[72px] lg:pt-[150px] lg:pb-[120px]">
      {/* brand glows + faint wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[8%] -top-[12%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(0,71,187,0.16),transparent_68%)] blur-2xl" />
        <div className="absolute -bottom-[24%] -left-[10%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(22,233,215,0.12),transparent_70%)] blur-2xl" />
      </div>

      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        {/* text */}
        <div className="relative z-10">
          <RevealMask className="pb-[0.1em]" delay={0.05}>
            <h1 className="text-[clamp(44px,5.6vw,68px)] font-medium leading-[0.98] tracking-[-1.5px] text-ink">
              STARSOCIAL
            </h1>
          </RevealMask>

          <Reveal delay={0.18}>
            <p className="mt-7 max-w-[460px] text-[18px] font-medium leading-[1.5] text-brand-blue">
              Our values go beyond numbers and growth.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="mt-4 max-w-[500px] text-body leading-[1.75] text-[#50555b]">
              We believe in making a real impact, not just in markets, but in communities. That’s why
              we give back at every step, aiming to create meaningful change where it matters most.
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

        {/* layered image composition */}
        <div className="relative mx-auto h-[420px] w-full max-w-[540px] sm:h-[500px] lg:h-[600px] lg:max-w-none">
          {/* depth: rotated outline behind */}
          <div className="absolute left-[5%] top-[7%] hidden h-[80%] w-[62%] -rotate-[6deg] rounded-[30px] ring-1 ring-brand-blue/15 lg:block" />

          {/* main */}
          <Reveal y={24} className="absolute left-0 top-0 h-[84%] w-[64%]">
            <Frame
              src={csr2}
              eager
              parallax={26}
              rounded="rounded-[30px]"
              ringClass="ring-1 ring-white/40"
              className="h-full w-full shadow-glow"
              alt="STARTRADER giving back to the community"
            />
          </Reveal>

          {/* overlapping secondary, white-matted */}
          <Reveal y={30} delay={0.18} className="absolute bottom-0 right-0 h-[48%] w-[58%]">
            <Frame
              src={ndTeam}
              parallax={48}
              rounded="rounded-[22px]"
              ringClass={false}
              className="h-full w-full bg-white p-[6px] shadow-lift"
              imgClassName="rounded-[18px]"
              alt="The STARTRADER team"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Social() {
  return (
    <div className="bg-white">
      {/* ───────── HERO ───────── */}
      <Hero />

      {/* ───────── CSR CAROUSEL ───────── */}
      <section className="overflow-hidden bg-white py-[80px]">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <Reveal className="shrink-0">
              <Eyebrow label="CSR" tone="light" />
            </Reveal>
            <div className="lg:w-[62%]">
              <Reveal>
                <h2 className="text-[clamp(28px,3.6vw,40px)] font-medium tracking-[-1px] text-ink">
                  Learn more about our past CSR initiatives
                </h2>
              </Reveal>
            </div>
          </div>
        </div>
        {/* full-bleed auto-scrolling strip (pauses on hover) */}
        <Reveal className="mt-12">
          <ImageMarquee slides={CSR_SLIDES} />
        </Reveal>
      </section>

      {/* ───────── WE GROW IN BUSINESS AND IN SPIRIT ───────── */}
      <section className="bg-white py-[60px]">
        <div className="shell grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative h-[320px] w-full overflow-hidden rounded-[16px] sm:h-[400px]">
              <img src={teamImg} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-brand-deep/45" />
              <span className="absolute inset-0 flex items-center justify-center text-[14px] font-semibold uppercase tracking-[3px] text-white/80">
                ✳ STARTRADER
              </span>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow label="OUR IMPACT" tone="light" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 max-w-[443px] text-[clamp(28px,3.6vw,40px)] font-medium leading-[1.1] tracking-[-1px] text-ink">
                We grow in business and in spirit!
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-body text-[#50555b]">
                We believe that success goes beyond financial growth. As such, we aim to create a
                meaningful difference in people’s lives. Our commitment to corporate social
                responsibility reflects our dedication to giving back, fostering positive change in
                the society.
              </p>
              <p className="mt-4 text-[16px] leading-[30px] text-ink">
                <span className="capitalize">The STARTRADERs </span>
                believe that success is in expanding business and giving back to the community.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── MAKING A DIFFERENCE (accordion) ───────── */}
      <section className="relative overflow-hidden bg-[rgba(218,227,237,0.35)] py-[90px]">
        <span className="pointer-events-none absolute left-[-30px] top-1/2 hidden -translate-y-1/2 -rotate-90 select-none text-[100px] font-bold tracking-[-1px] text-[rgba(218,227,237,0.6)] lg:block">
          JOIN US
        </span>
        <div className="shell relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <Reveal className="shrink-0">
              <Eyebrow label="OUR INITIATIVES" tone="light" />
            </Reveal>
            <div className="lg:w-[62%]">
              <Reveal>
                <h2 className="max-w-[470px] text-[clamp(28px,3.6vw,40px)] font-medium leading-[1.1] tracking-[-1px] text-ink">
                  Making a difference, One Initiative at a time
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#50555b]">
                  Striving to create change in the world, we work on several initiatives:
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
            <Reveal>
              <div className="h-[360px] w-full overflow-hidden rounded-[14px] sm:h-[400px]">
                <img src={socialMark} alt="STARTRADER initiatives" className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion items={INITIATIVES} tone="light" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── CTA BAND ───────── */}
      <ImpactCta
        title="Responsibility drives us, innovation defines us."
        buttonLabel="Experience STARTRADER"
        buttonTo="/starscout"
        image={ctaPeople}
        imageAlt="STARTRADER team"
      />
    </div>
  );
}
