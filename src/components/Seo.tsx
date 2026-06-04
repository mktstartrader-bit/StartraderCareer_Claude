import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
  /** absolute or root-relative image URL for social cards */
  image?: string;
  /** root-relative path, e.g. "/starblog/my-post" — becomes the canonical + og:url */
  path?: string;
  type?: "website" | "article";
  /** JSON-LD structured data object (e.g. a BlogPosting) */
  jsonLd?: Record<string, unknown>;
};

const SITE_NAME = "STARTRADER Careers";
const DEFAULT_TITLE = "STARTRADER Careers — Carve your path to success";
const DEFAULT_DESCRIPTION =
  "Carve your path to success with STARTRADER. Explore careers, culture, and stories at a globally-leading broker.";

const MANAGED = "data-seo-managed";

function upsertMeta(key: "name" | "property", value: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, value);
    el.setAttribute(MANAGED, "");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute(MANAGED, "");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Client-side <head> manager for this SPA: sets title, description, canonical,
 * Open Graph / Twitter cards and optional JSON-LD structured data. Resets to
 * the site defaults on unmount so each route owns its own metadata.
 */
export default function Seo({ title, description, image, path, type = "website", jsonLd }: Props) {
  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = path ? `${origin}${path}` : origin;
    const fullTitle = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE;
    const img = image ? (image.startsWith("http") ? image : `${origin}${image}`) : undefined;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertLink("canonical", url);

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:card", img ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    if (img) {
      upsertMeta("property", "og:image", img);
      upsertMeta("name", "twitter:image", img);
    }

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(MANAGED, "");
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      // restore defaults and drop the tags we added so the next route starts clean
      document.title = DEFAULT_TITLE;
      const descEl = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (descEl) descEl.setAttribute("content", DEFAULT_DESCRIPTION);
      document.head.querySelectorAll(`[${MANAGED}]`).forEach((n) => {
        // keep the persistent canonical/description handled above; remove social + jsonld
        if (n.tagName === "META" && n.getAttribute("name") === "description") return;
        n.remove();
      });
      if (script) script.remove();
    };
  }, [title, description, image, path, type, jsonLd]);

  return null;
}
