import { useEffect, useRef, useState } from "react";

/**
 * ScrollReveal — Wrapper HOC untuk fade-in animation saat elemen masuk viewport
 *
 * Props:
 *   children   {ReactNode}
 *   delay      {number}   delay dalam ms (default 0)
 *   direction  {string}   "up" | "down" | "left" | "right" (default "up")
 *   className  {string}   kelas tambahan untuk wrapper div
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const base = "transition-all duration-700 ease-out";

  const states = {
    up:    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    down:  visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8",
    left:  visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
    right: visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
  };

  return (
    <div
      ref={ref}
      className={`${base} ${states[direction] ?? states.up} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
