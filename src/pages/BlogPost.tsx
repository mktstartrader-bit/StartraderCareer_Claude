import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Seo from "@/components/Seo";
import PostCard from "@/components/blog/PostCard";
import CtaBand from "@/components/sections/CtaBand";
import { getPost, relatedPosts, formatDate } from "@/data/blog";
import ctaPeople from "@/assets/life/cta-people.png";

/** Tracks which section heading is currently in view to highlight the index. */
function useActiveSection(ids: string[]) {
  const key = ids.join(",");
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const list = key ? key.split(",") : [];
    if (!list.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] },
    );
    list.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [key]);
  return active;
}

function NotFound() {
  return (
    <div className="bg-white">
      <Seo title="Article not found" description="The article you’re looking for doesn’t exist." path="/starblog" />
      <section className="shell flex min-h-[60vh] flex-col items-center justify-center py-[120px] text-center">
        <h1 className="text-[clamp(28px,3.6vw,42px)] font-medium tracking-[-1px] text-ink">Article not found</h1>
        <p className="mt-3 text-body text-[#50555b]">It may have moved, or the link is incomplete.</p>
        <Link to="/starblog" className="mt-7 inline-flex h-[46px] items-center justify-center rounded-btn bg-brand-blue px-8 text-[15px] font-medium text-white transition-all duration-300 hover:brightness-110">
          Back to StarBlog
        </Link>
      </section>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  const ids = post ? post.sections.map((s) => s.id) : [];
  const active = useActiveSection(ids);

  // stable across scroll-driven re-renders so <Seo> doesn't rebuild head tags
  const jsonLd = useMemo(() => {
    if (!post) return undefined;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: `${origin}${post.cover}`,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Person", name: post.author, jobTitle: post.authorRole },
      publisher: {
        "@type": "Organization",
        name: "STARTRADER",
        logo: { "@type": "ImageObject", url: `${origin}/favicon.svg` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${origin}/starblog/${post.slug}` },
      articleSection: post.category,
      wordCount: post.sections.reduce((n, s) => n + s.body.join(" ").split(/\s+/).length, 0),
    };
  }, [post]);

  if (!post) return <NotFound />;

  const related = relatedPosts(post.slug, 3);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white">
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.cover}
        path={`/starblog/${post.slug}`}
        type="article"
        jsonLd={jsonLd}
      />

      {/* ── header ─────────────────────────────────────────────────── */}
      <header className="bg-[rgba(218,227,237,0.4)] pb-[50px] pt-[110px]">
        <div className="shell">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-[13px] text-[#50555b]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="transition-colors hover:text-brand-blue">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/starblog" className="transition-colors hover:text-brand-blue">StarBlog</Link></li>
              <li aria-hidden>/</li>
              <li className="text-ink/70" aria-current="page">{post.category}</li>
            </ol>
          </nav>

          <Reveal>
            <span className="mt-6 inline-block rounded-[10px] bg-brand-blue px-3 py-1 text-[12px] font-medium text-white">
              {post.category}
            </span>
            <h1 className="mt-4 max-w-[820px] text-[clamp(30px,4vw,46px)] font-medium leading-[1.12] tracking-[-1px] text-ink">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[#50555b]">
              <span className="font-medium text-ink">{post.author}</span>
              <span className="text-ink/40">·</span>
              <span>{post.authorRole}</span>
              <span className="text-ink/40">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="text-ink/40">·</span>
              <span>{post.readMins} min read</span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* cover */}
      <div className="shell -mt-2">
        <Reveal className="overflow-hidden rounded-[18px] shadow-card">
          <img src={post.cover} alt={post.title} className="h-[280px] w-full object-cover sm:h-[420px]" />
        </Reveal>
      </div>

      {/* ── body + index ───────────────────────────────────────────── */}
      <section className="shell py-[60px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
          {/* table of contents (index) */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-brand-blue">In this article</p>
            <nav className="mt-4 border-l border-line">
              <ul className="space-y-1">
                {post.sections.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollTo(s.id)}
                      className={`-ml-px block border-l-2 py-1.5 pl-4 text-left text-[14px] leading-[1.4] transition-colors ${
                        active === s.id
                          ? "border-brand-blue font-medium text-brand-blue"
                          : "border-transparent text-[#50555b] hover:text-ink"
                      }`}
                    >
                      {s.heading}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* article */}
          <article className="max-w-[720px]">
            <p className="text-[19px] leading-[1.6] text-ink">{post.lead}</p>
            {post.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 pt-10">
                <h2 className="text-[clamp(22px,2.6vw,28px)] font-medium tracking-[-0.5px] text-ink">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-4 text-[16px] leading-[1.7] text-[#50555b]">{p}</p>
                ))}
              </section>
            ))}

            {/* share / back */}
            <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
              <Link to="/starblog" className="inline-flex items-center gap-2 text-[14px] font-medium text-brand-blue transition-colors hover:text-brand-navy">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All articles
              </Link>
              <span className="text-[13px] text-[#50555b]">Written by {post.author}</span>
            </div>
          </article>
        </div>
      </section>

      {/* ── related posts ──────────────────────────────────────────── */}
      <section className="bg-[rgba(218,227,237,0.4)] py-[70px]">
        <div className="shell">
          <Reveal>
            <h2 className="text-[clamp(24px,3vw,34px)] font-medium tracking-[-1px] text-ink">Related reads</h2>
            <p className="mt-2 text-body text-[#50555b]">More from the world of STARTRADER.</p>
          </Reveal>
          <Stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <StaggerItem key={p.slug} className="h-full">
                <PostCard post={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

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
