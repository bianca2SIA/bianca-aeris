import ScrollReveal from "./ScrollReveal";

const PARTNERS = [
  { name: "Maskapai Partner",    icon: "airlines",        color: "#4F7DF3", bg: "#EEF4FF",  desc: "Penerbangan terjadwal ke seluruh Indonesia" },
  { name: "Hotel Partner",       icon: "hotel",           color: "#10B981", bg: "#ECFDF5",  desc: "Akomodasi nyaman di setiap destinasi" },
  { name: "Taman Wisata",        icon: "forest",          color: "#F59E0B", bg: "#FFFBEB",  desc: "Destinasi alam & wisata keluarga terbaik" },
  { name: "Kemenpar RI",         icon: "account_balance", color: "#8B5CF6", bg: "#F5F3FF",  desc: "Lisensi resmi dari Kementerian Pariwisata" },
  { name: "ASITA Tour",          icon: "travel_explore",  color: "#EC4899", bg: "#FDF2F8",  desc: "Asosiasi travel agent Indonesia terpercaya" },
  { name: "Asuransi Wisata",     icon: "health_and_safety",color: "#0EA5E9",bg: "#F0F9FF",  desc: "Perlindungan perjalanan komprehensif" },
];

export default function TrustedSection() {
  return (
    <section id="trusted" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
              Partner Resmi
            </p>
            <h2 className="text-[22px] md:text-[28px] font-black text-[#1D3557]">
              Dipercaya & bermitra dengan{" "}
              <span className="text-[#4F7DF3]">institusi terbaik</span>
            </h2>
            <p className="mt-3 text-[#64748B] text-[14px] max-w-lg mx-auto leading-relaxed">
              TravelGo bekerja sama dengan maskapai, hotel, dan lembaga wisata
              terpercaya untuk memastikan liburanmu sempurna.
            </p>
          </div>
        </ScrollReveal>

        {/* Partner grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNERS.map((partner, i) => (
            <ScrollReveal key={partner.name} delay={i * 60} direction="up">
              <div className="group flex flex-col items-center text-center p-4 rounded-2xl border border-[#E5E7EB] hover:border-[#4F7DF3]/20 hover:shadow-md transition-all duration-300">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: partner.bg }}
                >
                  <span className="material-symbols-outlined text-[22px]" style={{ color: partner.color }}>
                    {partner.icon}
                  </span>
                </div>
                <p className="text-[11px] font-bold text-[#1D3557] leading-tight mb-1">{partner.name}</p>
                <p className="text-[9px] text-[#94A3B8] leading-snug hidden lg:block">{partner.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
