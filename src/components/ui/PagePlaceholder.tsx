import Eyebrow from "./Eyebrow";

export default function PagePlaceholder({ title, eyebrow }: { title: string; eyebrow: string }) {
  return (
    <section className="flex min-h-[70vh] items-center bg-navy-grad pt-[70px] text-white">
      <div className="shell text-center">
        <div className="flex justify-center">
          <Eyebrow label={eyebrow} tone="dark" />
        </div>
        <h1 className="hero-title mt-6">{title}</h1>
        <p className="mt-4 text-body text-white/70">This page is coming next in the build.</p>
      </div>
    </section>
  );
}
