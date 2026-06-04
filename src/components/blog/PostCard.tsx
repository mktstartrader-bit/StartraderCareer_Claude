import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/blog";
import { formatDate } from "@/data/blog";

/** Article preview card used on the StarBlog grid and in "Related reads". */
export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/starblog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[15px] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={post.cover}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-[10px] bg-brand-blue px-3 py-1 text-[12px] font-medium text-white">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-[12px] text-[#50555b]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readMins} min read</span>
        </div>
        <h3 className="mt-3 text-[18px] font-medium leading-[1.3] text-ink transition-colors group-hover:text-brand-blue">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-[14px] leading-[22px] text-[#50555b]">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-brand-blue">
          Read More
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
