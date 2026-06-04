export type NavLink = { label: string; to: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "StarScout", to: "/starscout" },
  { label: "About Us", to: "/about" },
  { label: "StarLife", to: "/starlife" },
  { label: "StarSocial", to: "/starsocial" },
  { label: "StarBlog", to: "/starblog" },
];

export type Social = { name: string; href: string; key: string; highlight?: boolean };

export const SOCIALS: Social[] = [
  { name: "Facebook", key: "facebook", href: "#" },
  { name: "Instagram", key: "instagram", href: "#" },
  { name: "LinkedIn", key: "linkedin", href: "#", highlight: true },
  { name: "Twitter", key: "twitter", href: "#" },
  { name: "YouTube", key: "youtube", href: "#" },
  { name: "TikTok", key: "tiktok", href: "#" },
];
