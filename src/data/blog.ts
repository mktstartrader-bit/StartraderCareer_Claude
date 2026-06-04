import b1 from "@/assets/blog/b1.jpg";
import b2 from "@/assets/blog/b2.jpg";
import b3 from "@/assets/blog/b3.jpg";
import b4 from "@/assets/blog/b4.jpg";
import b5 from "@/assets/blog/b5.jpg";
import b6 from "@/assets/blog/b6.jpg";

export type BlogCategory = "People & culture" | "Achievements" | "Market insights";

export type BlogSection = {
  /** slug used as the in-page anchor + table-of-contents target */
  id: string;
  heading: string;
  body: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  cover: string;
  author: string;
  authorRole: string;
  /** ISO date — rendered in a <time> element and used for SEO/JSON-LD */
  date: string;
  readMins: number;
  /** lead paragraph shown under the title before the first section */
  lead: string;
  sections: BlogSection[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "startrader-christmas-celebration",
    title: "Unwrapping moments of joy: STARTRADER’s Christmas celebration",
    category: "People & culture",
    excerpt:
      "Santa Claus visited our office this Christmas — and he didn’t come only to give gifts. Here’s how the team turned an ordinary day into a memory.",
    cover: b1,
    author: "Mia Chen",
    authorRole: "People & Culture",
    date: "2025-12-22",
    readMins: 4,
    lead: "Some celebrations are about the calendar. Others are about the people. Our Christmas was firmly the second kind — a day where the trading floor went quiet and the laughter got loud.",
    sections: [
      {
        id: "a-day-off-the-charts",
        heading: "A day off the charts",
        body: [
          "For one afternoon, spreads and candlesticks gave way to fairy lights and a very convincing Santa. Teams from every department swapped desks for a shared table, and the only thing trending was the playlist.",
          "It’s easy to forget, in a fast-moving broker, how much of our progress runs on the relationships behind the screens. Days like this are where those relationships get their oxygen.",
        ],
      },
      {
        id: "more-than-gifts",
        heading: "More than gifts",
        body: [
          "Santa’s sack held the usual surprises, but the real gift was the time. New joiners met the people whose names they’d only seen in emails. Veterans told the stories that don’t make it into onboarding decks.",
          "That cross-pollination — the kind you can’t schedule — is exactly what keeps a global team feeling like one team.",
        ],
      },
      {
        id: "what-we-carry-forward",
        heading: "What we carry forward",
        body: [
          "Celebration isn’t a break from the work; it’s part of how the work stays human. We headed back to our desks the next morning a little more connected, and a lot more motivated.",
          "Here’s to the moments that matter — and to a new year of building them together.",
        ],
      },
    ],
  },
  {
    slug: "thirty-global-awards-what-they-mean",
    title: "Thirty global awards, and what they actually mean for traders",
    category: "Achievements",
    excerpt:
      "Trophies are nice. Trust is better. We unpack what our 30+ industry awards signal about the experience behind the brand.",
    cover: b4,
    author: "Sofia Reyes",
    authorRole: "Brand & Communications",
    date: "2025-11-14",
    readMins: 5,
    lead: "An award is a headline. What sits underneath it — the conditions, the platforms, the people answering at 2am — is the real story. Here’s how we read our own shelf.",
    sections: [
      {
        id: "awards-as-evidence",
        heading: "Awards as evidence, not decoration",
        body: [
          "Every recognition we’ve earned maps back to something a trader can feel: tighter spreads, faster execution, clearer support. We treat them as evidence that the fundamentals are working — not as the goal itself.",
        ],
      },
      {
        id: "the-work-behind-them",
        heading: "The work behind them",
        body: [
          "Behind each badge is a team that chose the unglamorous option: better infrastructure, stricter compliance, slower-but-safer launches. Awards are the visible tip of a lot of invisible discipline.",
          "That’s why we share them with the whole company — they belong to dealing, to tech, to support, to everyone who held the line on quality.",
        ],
      },
      {
        id: "what-comes-next",
        heading: "What comes next",
        body: [
          "Recognition is a checkpoint, never a finish line. The bar we care about is the one our clients set every single day.",
        ],
      },
    ],
  },
  {
    slug: "inside-our-trading-desk",
    title: "Inside our trading desk: a morning in the engine room",
    category: "Market insights",
    excerpt:
      "Before the markets open, the desk is already awake. A look at the rhythm, the rituals, and the reads that shape a trading day.",
    cover: b3,
    author: "Daniel Wu",
    authorRole: "Dealing Desk",
    date: "2025-10-30",
    readMins: 6,
    lead: "Markets don’t wait, so neither does the desk. The hours before the bell are where the day is quietly won or lost.",
    sections: [
      {
        id: "before-the-bell",
        heading: "Before the bell",
        body: [
          "The first reads aren’t prices — they’re overnight headlines, central-bank whispers, and the tone of Asian sessions. The desk assembles a picture before a single order lands.",
        ],
      },
      {
        id: "reading-the-flow",
        heading: "Reading the flow",
        body: [
          "Liquidity has a personality. Part of the craft is sensing when a move has conviction behind it and when it’s just noise looking for a reaction.",
          "Good dealers aren’t fortune tellers; they’re fast, disciplined readers of what’s actually in front of them.",
        ],
      },
      {
        id: "staying-steady",
        heading: "Staying steady",
        body: [
          "Volatility rewards calm. The desks that thrive are the ones with a process they trust when the screens turn red.",
        ],
      },
    ],
  },
  {
    slug: "from-intern-to-team-lead",
    title: "From intern to team lead in eighteen months",
    category: "People & culture",
    excerpt:
      "Ambition meets opportunity. One STARTRADER story about what happens when you’re handed real responsibility — early.",
    cover: b2,
    author: "Aamir Khan",
    authorRole: "Business Development",
    date: "2025-09-18",
    readMins: 4,
    lead: "The fastest way to grow is to be trusted before you feel ready. That’s the bet we make on our people — and the bet they keep paying back.",
    sections: [
      {
        id: "thrown-in",
        heading: "Thrown in (on purpose)",
        body: [
          "Week three meant a live client call. Month two meant owning a small market. The learning curve was steep — and that was the point.",
        ],
      },
      {
        id: "mentors-not-managers",
        heading: "Mentors, not just managers",
        body: [
          "Responsibility without support is just pressure. What made the difference was a team that corrected fast, praised faster, and never let a stumble become a setback.",
        ],
      },
      {
        id: "the-compounding-effect",
        heading: "The compounding effect",
        body: [
          "Small wins, stacked weekly, become a career that compounds. Eighteen months later, the intern is the one onboarding the next cohort.",
        ],
      },
    ],
  },
  {
    slug: "culture-behind-the-numbers",
    title: "The culture behind the numbers",
    category: "People & culture",
    excerpt:
      "Performance is the output. Culture is the operating system. A candid look at what we protect when the pressure is on.",
    cover: b5,
    author: "Priya Nair",
    authorRole: "People & Culture",
    date: "2025-08-27",
    readMins: 5,
    lead: "You can’t see culture on a P&L, but you can feel it in every decision a team makes when no one is watching.",
    sections: [
      {
        id: "what-we-protect",
        heading: "What we protect",
        body: [
          "Transparency, ownership, and respect aren’t posters on a wall — they’re the tie-breakers we reach for when two good options collide.",
        ],
      },
      {
        id: "hiring-for-it",
        heading: "Hiring for it",
        body: [
          "We hire for trajectory and temperament, not just résumés. Skills can be taught; the willingness to grow with a team is rarer and harder to fake.",
        ],
      },
      {
        id: "keeping-it-alive",
        heading: "Keeping it alive",
        body: [
          "Culture decays quietly if you let it. Ours stays alive because people at every level are expected to defend it — loudly when needed.",
        ],
      },
    ],
  },
  {
    slug: "reading-the-markets-volatility-playbook",
    title: "Reading the markets: a volatility playbook",
    category: "Market insights",
    excerpt:
      "When the tape gets wild, process beats prediction. The principles our team leans on when volatility spikes.",
    cover: b6,
    author: "Lena Ortiz",
    authorRole: "Head of Dealing",
    date: "2025-07-09",
    readMins: 6,
    lead: "Volatility doesn’t reward the boldest trader — it rewards the most prepared one. Here’s the playbook we keep close.",
    sections: [
      {
        id: "respect-the-range",
        heading: "Respect the range",
        body: [
          "Wide ranges mean wider risk. Position sizing — not conviction — is the first lever we adjust when the market starts swinging.",
        ],
      },
      {
        id: "plan-the-exit-first",
        heading: "Plan the exit first",
        body: [
          "The entry is the easy part. We define where we’re wrong before we define where we’re right, so emotion never writes the exit.",
        ],
      },
      {
        id: "zoom-out",
        heading: "Zoom out",
        body: [
          "A single candle lies; the trend rarely does. Stepping back to the higher timeframe is the cheapest edge there is.",
        ],
      },
    ],
  },
  {
    slug: "one-team-across-time-zones",
    title: "One team, across time zones",
    category: "People & culture",
    excerpt:
      "A global broker never really sleeps. How a single team stays connected from Dubai to Kuala Lumpur to Sydney.",
    cover: b2,
    author: "Mia Chen",
    authorRole: "People & Culture",
    date: "2025-06-19",
    readMins: 4,
    lead: "Distance is just a logistics problem. Belonging is a culture problem — and that’s the one we actually work on.",
    sections: [
      {
        id: "follow-the-sun",
        heading: "Follow the sun",
        body: [
          "When one desk clocks off, another picks up the thread. The handover isn’t just tasks — it’s context, tone, and the small notes that keep clients feeling like they’re talking to one company.",
        ],
      },
      {
        id: "rituals-that-travel",
        heading: "Rituals that travel",
        body: [
          "Shared standups, recorded town halls, and the occasional 2am celebration emoji keep us in sync. Culture survives time zones when it’s built to be asynchronous.",
        ],
      },
    ],
  },
  {
    slug: "on-the-global-stage",
    title: "On the global stage: what our partnerships say about us",
    category: "Achievements",
    excerpt:
      "From the NBA to the Porsche Carrera Cup, our partnerships aren’t just logos — they’re a statement of ambition.",
    cover: b4,
    author: "Sofia Reyes",
    authorRole: "Brand & Communications",
    date: "2025-05-22",
    readMins: 4,
    lead: "You can tell a lot about a company by the company it keeps. Ours chooses arenas where performance is measured in milliseconds and millimetres.",
    sections: [
      {
        id: "why-sport",
        heading: "Why sport",
        body: [
          "Elite sport and elite trading share a spine: preparation, discipline, and the nerve to execute under pressure. Standing beside those teams keeps us honest about our own standards.",
        ],
      },
      {
        id: "more-than-a-logo",
        heading: "More than a logo",
        body: [
          "A partnership only matters if it changes how you show up. Ours push us to sharpen the product, the brand, and the experience traders feel every day.",
        ],
      },
    ],
  },
  {
    slug: "spreads-from-zero-explained",
    title: "Spreads from zero, explained",
    category: "Market insights",
    excerpt:
      "“Spreads from 0.0” sounds great on a banner. Here’s what it actually means for the cost of your trade.",
    cover: b3,
    author: "Daniel Wu",
    authorRole: "Dealing Desk",
    date: "2025-04-15",
    readMins: 5,
    lead: "The spread is the quiet tax on every position. Understanding it is one of the fastest ways to get better at the math of trading.",
    sections: [
      {
        id: "what-a-spread-is",
        heading: "What a spread really is",
        body: [
          "It’s the gap between the buy and sell price — the market’s built-in cost of doing business. Tighter spreads mean more of a move belongs to you, not to friction.",
        ],
      },
      {
        id: "reading-the-fine-print",
        heading: "Reading the fine print",
        body: [
          "“From 0.0” describes the best case, not the average. The honest question is what spreads look like when volatility hits — and that’s where execution quality shows.",
        ],
      },
    ],
  },
  {
    slug: "behind-thirty-awards-discipline",
    title: "The discipline behind a winning year",
    category: "Achievements",
    excerpt:
      "Awards cluster around teams that do the boring things well. A look at the habits that quietly stack up wins.",
    cover: b6,
    author: "Sofia Reyes",
    authorRole: "Brand & Communications",
    date: "2025-03-11",
    readMins: 4,
    lead: "Nobody wins an award for the thing they did last week. They win it for the habits they kept for a year.",
    sections: [
      {
        id: "small-things-often",
        heading: "Small things, done often",
        body: [
          "Faster fixes, clearer docs, tighter testing — none of it is glamorous, and all of it compounds into the kind of reliability juries notice.",
        ],
      },
      {
        id: "shared-credit",
        heading: "Shared credit",
        body: [
          "We name the teams, not just the trophy. Recognition that’s shared widely is recognition that actually changes behaviour.",
        ],
      },
    ],
  },
  {
    slug: "a-day-in-customer-support",
    title: "A day in customer support",
    category: "People & culture",
    excerpt:
      "The team that turns hard moments into loyal clients. What a shift on the support desk actually looks like.",
    cover: b5,
    author: "Aamir Khan",
    authorRole: "Customer Support",
    date: "2025-02-08",
    readMins: 5,
    lead: "When a client reaches out, they’re rarely calm and rarely early. Support is where the brand promise meets reality.",
    sections: [
      {
        id: "first-response",
        heading: "The first response",
        body: [
          "Speed matters, but tone matters more. The goal in the first reply isn’t to solve everything — it’s to make sure the person feels heard.",
        ],
      },
      {
        id: "turning-it-around",
        heading: "Turning it around",
        body: [
          "A well-handled problem builds more loyalty than a flawless experience ever could. Our best stories start with something that went wrong.",
        ],
      },
    ],
  },
  {
    slug: "leverage-without-the-jargon",
    title: "Leverage, without the jargon",
    category: "Market insights",
    excerpt:
      "Up to 1:1000 sounds powerful — and it is, in both directions. A plain-English guide to using leverage wisely.",
    cover: b1,
    author: "Lena Ortiz",
    authorRole: "Head of Dealing",
    date: "2025-01-20",
    readMins: 6,
    lead: "Leverage doesn’t make you right more often. It just makes being right — or wrong — count for more.",
    sections: [
      {
        id: "what-it-does",
        heading: "What it actually does",
        body: [
          "Leverage lets a small amount of capital control a larger position. It amplifies outcomes — which is exactly why it deserves respect, not enthusiasm.",
        ],
      },
      {
        id: "using-it-wisely",
        heading: "Using it wisely",
        body: [
          "The pros size positions by risk, then let leverage follow. Beginners do it backwards. The order is the whole lesson.",
        ],
      },
    ],
  },
];

export function getPost(slug: string | undefined): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Same-category posts first, then fill from the rest — never the post itself. */
export function relatedPosts(slug: string, count = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return POSTS.slice(0, count);
  const sameCat = POSTS.filter((p) => p.slug !== slug && p.category === current.category);
  const others = POSTS.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...others].slice(0, count);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
