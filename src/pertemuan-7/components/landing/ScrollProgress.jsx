import { useEffect, useState } from "react";

/**
 * ScrollProgress — Progress bar tipis di bawah navbar
 * Menunjukkan seberapa jauh user sudah scroll halaman
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(pct, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-[68px] left-0 right-0 z-40 h-[3px] bg-transparent pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll progress"
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #4F7DF3, #10B981)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}
