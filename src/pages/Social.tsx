import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Accordion from "@/components/ui/Accordion";
import Carousel from "@/components/ui/Carousel";
import CtaBand from "@/components/sections/CtaBand";
import CollageHero from "@/components/sections/CollageHero";

import woman from "@/assets/life/woman.jpg";
import csr1 from "@/assets/social/csr1.jpg";
import csr2 from "@/assets/social/csr2.jpg";
import csr3 from "@/assets/social/csr3.jpg";
import init from "@/assets/social/init.jpg";
import ctaPeople from "@/assets/life/cta-people.png";
import teamImg from "@/assets/home/team.jpg";

const INITIATIVES = [
  { q: "Education & child welfare", a: "Our work calls everyone to put on their binoculars of creativity and innovation to easily discover opportunities budding along the way. With STARTRADER, your abilities are challenged to improve and shine." },
  { q: "Sustainability & environmental care", a: "We invest in greener operations and community programmes that protect the environment and build a more sustainable future for the next generation." },
  { q: "Disaster relief & humanitarian aid", a: "When crises strike, we move quickly — supporting relief efforts and standing with the communities that need help the most." },
  { q: "Community empowerment", a: "From mentorship to local partnerships, we help people gain the skills, confidence, and resources to shape their own success." },
];

export default function Social() {
  return (
    <div className="bg-white">
      {/* ───────── HERO ───────── */}
      <CollageHero marquee bg="bg-[rgba(218,227,237,0.2)]" images={[woman, csr1, csr2, csr3]}>
        <Reveal>
          <h1 className="text-[clamp(38px,5vw,50px)] font-medium leading-[1.05] text-ink">STARSOCIAL</h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-[16px] font-medium text-brand-blue">Our values go beyond numbers and growth.</p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-3 max-w-[534px] text-body text-[#50555b]">
            We believe in making a real impact, not just in markets, but in communities. That’s why
            we give back at every step, aiming to create meaningful change where it matters most.
          </p>
        </Reveal>
      </CollageHero>

      {/* ───────── CSR CAROUSEL ───────── */}
      <section className="bg-white py-[80px]">
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
          <Reveal className="mt-12">
            <Carousel slides={[{ src: csr1 }, { src: csr2 }, { src: csr3 }]} />
          </Reveal>
        </div>
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
                <img src={init} alt="STARTRADER initiatives" className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion items={INITIATIVES} tone="light" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── CTA BAND ───────── */}
      <CtaBand
        title="Responsibility drives us, innovation defines us."
        buttonLabel="Experience STARTRADER"
        buttonTo="/starscout"
        image={ctaPeople}
        imageAlt="STARTRADER team"
      />
    </div>
  );
}
