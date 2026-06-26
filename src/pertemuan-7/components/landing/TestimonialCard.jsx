/**
 * TestimonialCard — Reusable kartu testimonial
 *
 * Props:
 *   name      {string}  Nama pemberi testimoni
 *   position  {string}  Posisi/jabatan
 *   company   {string}  Nama perusahaan
 *   avatar    {string}  URL foto avatar
 *   rating    {number}  Rating 1–5
 *   comment   {string}  Isi testimonial
 */
export default function TestimonialCard({ name, position, company, avatar, rating, comment }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl p-7 border border-[#E5E7EB] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">

      {/* Quote icon */}
      <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] flex items-center justify-center mb-5 flex-shrink-0">
        <span className="material-symbols-outlined text-[#4F7DF3] text-[20px]">format_quote</span>
      </div>

      {/* Star rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`material-symbols-outlined text-[18px] ${
              i < rating ? "text-[#F59E0B]" : "text-gray-200"
            }`}
            style={{ fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0" }}
          >
            star
          </span>
        ))}
      </div>

      {/* Comment */}
      <p className="text-[#475569] text-[14px] leading-relaxed flex-1 mb-6 italic">
        "{comment}"
      </p>

      {/* Avatar + info */}
      <div className="flex items-center gap-3 pt-5 border-t border-[#F1F5F9]">
        <img
          src={avatar}
          alt={name}
          className="w-11 h-11 rounded-full object-cover border-2 border-[#EEF4FF] flex-shrink-0"
          loading="lazy"
        />
        <div>
          <p className="text-[14px] font-bold text-[#1D3557] leading-snug">{name}</p>
          <p className="text-[12px] text-[#64748B]">
            {position} · <span className="text-[#4F7DF3] font-semibold">{company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
