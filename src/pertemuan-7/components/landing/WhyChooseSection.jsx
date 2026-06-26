import ScrollReveal from "./ScrollReveal";

const REASONS = [
  {
    icon: "local_offer",
    title: "Harga Terbaik",
    desc: "Dapatkan paket wisata dengan harga terjangkau tanpa mengorbankan kualitas layanan dan kenyamanan perjalananmu.",
    color: "#4F7DF3",
    bg: "#EEF4FF",
  },
  {
    icon: "touch_app",
    title: "Booking Mudah",
    desc: "Pesan paket wisata dalam hitungan menit langsung dari smartphone. Praktis, cepat, tanpa antri.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    icon: "verified",
    title: "Destinasi Terpercaya",
    desc: "Semua destinasi wisata telah diverifikasi dan dikurasi oleh tim travel profesional TravelGo.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: "person_pin",
    title: "Tour Guide Profesional",
    desc: "Pemandu wisata berpengalaman siap menemani perjalananmu dan memastikan pengalaman yang berkesan.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    icon: "support_agent",
    title: "Customer Support 24 Jam",
    desc: "Tim customer support kami siap membantu 24 jam sehari, 7 hari seminggu untuk perjalananmu.",
    color: "#EC4899",
    bg: "#FDF2F8",
  },
  {
    icon: "lock",
    title: "Pembayaran Aman",
    desc: "Setiap transaksi dilindungi enkripsi SSL dan sistem keamanan berlapis agar perjalananmu aman.",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
];

export default function WhyChooseSection() {
  return (
    <section id="why" className="py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
              Kenapa TravelGo?
            </p>
            <h2 className="text-[28px] md:text-[36px] font-black text-[#1D3557] leading-tight">
              Kenapa memilih{" "}
              <span className="text-[#4F7DF3]">TravelGo?</span>
            </h2>
            <p className="mt-4 text-[#64748B] text-[15px] max-w-xl mx-auto leading-relaxed">
              TravelGo hadir dengan berbagai keunggulan untuk memastikan
              setiap perjalananmu menjadi pengalaman yang tak terlupakan.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid 3×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 70} direction="up">
              <div className="group flex items-start gap-4 p-6 rounded-2xl border border-[#E5E7EB] bg-white hover:shadow-md hover:-translate-y-1 hover:border-[#4F7DF3]/20 transition-all duration-300">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: item.bg }}
                >
                  <span className="material-symbols-outlined text-[22px]" style={{ color: item.color }}>{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#1D3557] mb-1.5 group-hover:text-[#4F7DF3] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
