import star from "@/assets/brand/star.svg";
import wordmark from "@/assets/brand/wordmark.svg";
import careers from "@/assets/brand/careers.svg";

/**
 * STARTRADER CAREERS wordmark, composed from the original Figma vectors
 * (star + STARTRADER + CAREERS) so it stays crisp at any size.
 * Aspect ratio is locked to the source logo (187.36 × 35.1).
 */
export default function Logo({ height = 35, className }: { height?: number; className?: string }) {
  const width = height * (187.36 / 35.1);
  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-block", width, height }}
      role="img"
      aria-label="STARTRADER Careers"
    >
      <img src={star} alt="" style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "15.15%" }} />
      <img
        src={wordmark}
        alt=""
        style={{ position: "absolute", left: "19.21%", top: "30.77%", width: "80.81%", height: "38.46%" }}
      />
      <img
        src={careers}
        alt=""
        style={{ position: "absolute", left: "19.21%", top: "78.23%", width: "30.74%", height: "21.77%" }}
      />
    </span>
  );
}
