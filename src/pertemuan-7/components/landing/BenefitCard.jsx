/**
 * BenefitCard — Reusable kartu fitur Landing Page PRD V1
 *
 * Props:
 *   icon        {string}  Material Symbols icon name
 *   title       {string}  Judul kartu
 *   description {string}  Deskripsi singkat
 *   index       {number}  Urutan card (untuk konsistensi)
 */
export default function BenefitCard({ icon, title, description }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl p-7 border border-[#E5E7EB] shadow-sm hover:shadow-md hover:border-[#4F7DF3]/25 hover:-translate-y-1.5 transition-all duration-300 cursor-default h-full">
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center mb-5 flex-shrink-0 group-hover:bg-[#4F7DF3] transition-colors duration-300">
        <span className="material-symbols-outlined text-[#4F7DF3] text-[22px] group-hover:text-white transition-colors duration-300">
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[16px] font-bold text-[#1D3557] mb-2.5 group-hover:text-[#4F7DF3] transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#64748B] text-sm leading-relaxed flex-1">{description}</p>

      {/* Bottom accent */}
      <div className="mt-5 h-0.5 w-6 rounded-full bg-[#4F7DF3]/25 group-hover:w-full group-hover:bg-[#4F7DF3]/40 transition-all duration-500" />
    </div>
  );
}
