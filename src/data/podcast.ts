import b1 from "@/assets/blog/b1.jpg";
import b2 from "@/assets/blog/b2.jpg";
import b3 from "@/assets/blog/b3.jpg";
import b4 from "@/assets/blog/b4.jpg";
import b5 from "@/assets/blog/b5.jpg";
import woman from "@/assets/life/woman.jpg";

export type Episode = {
  n: string;
  title: string;
  category: string;
  guest: string;
  excerpt: string;
  thumb: string;
  /**
   * Dummy media source for the prototype. We reuse the STARLIFE clips in
   * /public/starlife — they carry real audio tracks, so the player actually
   * plays sound and the seek bar reflects real duration.
   */
  src: string;
};

/** First entry is the "Featured" episode shown in the big card on load. */
export const EPISODES: Episode[] = [
  {
    n: "01",
    title: "Building a career that compounds",
    category: "People & culture",
    guest: "With Peter Karsten, CEO, STARTRADER",
    excerpt:
      "What does it take to grow inside a fast-moving broker? Our CEO shares the mindset, the missteps, and the moments that shaped a global team.",
    thumb: woman,
    src: "/starlife/life.mp4",
  },
  {
    n: "02",
    title: "Inside our trading desk",
    category: "Market insights",
    guest: "With Lena Ortiz, Head of Dealing",
    excerpt:
      "Before the bell rings, the desk is already awake. A walk through the rhythm and rituals of a live trading morning.",
    thumb: b3,
    src: "/starlife/national-day.mp4",
  },
  {
    n: "03",
    title: "From intern to team lead",
    category: "People & culture",
    guest: "With Aamir Khan, Business Development",
    excerpt:
      "Eighteen months, one steep curve. The story of what happens when you’re trusted with real responsibility early.",
    thumb: b2,
    src: "/starlife/year-end-party.mp4",
  },
  {
    n: "04",
    title: "What our 30+ awards really mean",
    category: "Achievements",
    guest: "With Sofia Reyes, Brand & Communications",
    excerpt:
      "Trophies are nice; trust is better. Unpacking the discipline that sits behind every badge on the shelf.",
    thumb: b4,
    src: "/starlife/football-match.mp4",
  },
  {
    n: "05",
    title: "The culture behind the numbers",
    category: "People & culture",
    guest: "With Priya Nair, People & Culture",
    excerpt:
      "Performance is the output; culture is the operating system. What we protect when the pressure is on.",
    thumb: b5,
    src: "/starlife/celebrations.mp4",
  },
  {
    n: "06",
    title: "Reading the markets",
    category: "Market insights",
    guest: "With Daniel Wu, Dealing Desk",
    excerpt:
      "When the tape turns wild, process beats prediction. A trader’s playbook for staying steady through volatility.",
    thumb: b1,
    src: "/starlife/volunteering.mp4",
  },
];
