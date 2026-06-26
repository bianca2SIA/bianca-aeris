/* ─────────────────────────────────────────────
   TrustedSection — Logo partner placeholder
   Menggunakan styled div sebagai logo placeholder
   (tidak memerlukan gambar eksternal)
───────────────────────────────────────────── */

const PARTNERS = [
  { name: "Nusantara Travel",  icon: "flight_takeoff",  color: "#4F7DF3" },
  { name: "Garuda Trip",       icon: "airlines",         color: "#10B981" },
  { name: "Pesona Wisata",     icon: "landscape",        color: "#F59E0B" },
  { name: "Archipelago Tour",  icon: "public",           color: "#EC4899" },
  { name: "Bumi Indah Travel", icon: "explore",          color: "#8B5CF6" },
  { name: "Horizon Agency",    icon: "travel_explore",   color: "#0EA5E9" },
];

export default function TrustedSection() {
  return (
    <section id="trusted" className="py-14 md:py-16 bg-[#F8FAFF] border-y border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Label */}
        <p className="text-center text-[11px] font-black tracking-[0.2em] uppercase text-[#94A3B8] mb-10">
          Dipercaya oleh ratusan perusahaan travel terkemuka
        </p>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center justify-center gap-2.5 px-4 py-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#4F7DF3]/25 hover:shadow-sm transition-all duration-300 cursor-default"
            >
              {/* Icon placeholder sebagai logo */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${partner.color}15` }}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ color: partner.color }}
                >
                  {partner.icon}
                </span>
              </div>

              {/* Company name */}
              <p className="text-[11px] font-bold text-[#94A3B8] group-hover:text-[#64748B] text-center leading-tight transition-colors duration-200">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
