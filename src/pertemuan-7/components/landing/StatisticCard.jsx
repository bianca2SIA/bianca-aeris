import { useEffect, useRef, useState } from "react";

/**
 * StatisticCard — Reusable kartu statistik dengan count-up animation
 *
 * Props:
 *   icon        {string}  Material Symbols icon name
 *   value       {string}  Nilai statistik, contoh: "1000+", "98%", "24/7"
 *   label       {string}  Judul singkat
 *   description {string}  Deskripsi satu baris
 *   color       {string}  Warna aksen (hex)
 *   bgColor     {string}  Warna background icon (hex)
 */
export default function StatisticCard({
  icon,
  value,
  label,
  description,
  color = "#4F7DF3",
  bgColor = "#EEF4FF",
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  /* Trigger animation saat card masuk viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transition: "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease" }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
        style={{ background: bgColor }}
      >
        <span
          className="material-symbols-outlined text-[26px]"
          style={{ color }}
        >
          {icon}
        </span>
      </div>

      {/* Value */}
      <p
        className="text-[40px] font-black leading-none mb-2 tracking-tight"
        style={{ color }}
      >
        {value}
      </p>

      {/* Label */}
      <p className="text-[15px] font-bold text-[#1D3557] mb-1.5">{label}</p>

      {/* Description */}
      <p className="text-[13px] text-[#64748B] leading-relaxed">{description}</p>
    </div>
  );
}
