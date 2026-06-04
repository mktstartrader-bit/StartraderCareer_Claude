type Props = { label: string; tone?: "dark" | "light"; className?: string };

/**
 * Pill eyebrow with a leading dot — "● STARSTORY".
 * tone="dark" → for dark sections (white text). tone="light" → light sections.
 */
export default function Eyebrow({ label, tone = "dark", className }: Props) {
  const isDark = tone === "dark";
  return (
    <span
      className={[
        "inline-flex items-center gap-[10px] rounded-full border px-5 py-2 text-[14px] font-medium uppercase leading-[30px]",
        isDark ? "border-white/25 text-white" : "border-[rgba(28,31,42,0.35)] text-ink",
        className ?? "",
      ].join(" ")}
    >
      <span className="h-[10px] w-[10px] rounded-full bg-brand-blue" />
      {label}
    </span>
  );
}
