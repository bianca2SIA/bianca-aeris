import ScrollReveal from "./ScrollReveal";

const STEPS = [
  {
    number: "01",
    icon: "travel_explore",
    title: "Cari Destinasi",
    desc: "Jelajahi ratusan destinasi wisata menarik di Indonesia dan temukan tujuan liburan impianmu.",
    color: "#4F7DF3",
    bg: "#EEF4FF",
  },
  {
    number: "02",
    icon: "card_travel",
    title: "Pilih Paket",
    desc: "Bandingkan paket wisata, baca itinerary lengkap, dan pilih paket yang paling sesuai budget.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    number: "03",
    icon: "edit_note",
    title: "Isi Data",
    desc: "Lengkapi data peserta perjalanan dengan mudah melalui form yang sederhana dan aman.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    number: "04",
    icon: "payments",
    title: "Pembayaran",
    desc: "Selesaikan pembayaran dengan berbagai metode yang tersedia. Aman, cepat, dan terjamin.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    number: "05",
    icon: "check_circle",
    title: "Konfirmasi",
    desc: "Terima e-tiket dan konfirmasi perjalananmu langsung di email dan dashboard member.",
    color: "#EC4899",
    bg: "#FDF2F8",
  },
  {
    number: "06",
    icon: "flight_takeoff",
    title: "Berangkat Liburan",
    desc: "Saatnya berangkat! Nikmati perjalanan seru bersama tour guide profesional TravelGo.",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-16 md:py-20 bg-[#F8FAFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
              Cara Memesan
            </p>
            <h2 className="text-[30px] md:text-[40px] font-black text-[#1D3557] leading-tight">
              Liburan impian dimulai dari{" "}
              <span className="text-[#4F7DF3]">6 langkah mudah</span>
            </h2>
            <p className="mt-4 text-[#64748B] text-[15px] max-w-xl mx-auto leading-relaxed">
              Dari mencari destinasi hingga berangkat liburan, semua prosesnya
              mudah, cepat, dan menyenangkan di TravelGo.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          <div className="absolute top-[28px] left-[calc(100%/12)] right-[calc(100%/12)] h-0.5 bg-gradient-to-r from-[#4F7DF3] via-[#10B981] to-[#0EA5E9] opacity-20 z-0" />
          <div className="grid grid-cols-6 gap-4 relative z-10">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 80} direction="up">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm relative z-10 border-4 border-white"
                    style={{ background: step.bg }}
                  >
                    <span className="material-symbols-outlined text-[24px]" style={{ color: step.color }}>
                      {step.icon}
                    </span>
                  </div>
                  <span className="text-[11px] font-black mb-2" style={{ color: step.color }}>{step.number}</span>
                  <h3 className="text-[14px] font-bold text-[#1D3557] mb-1.5">{step.title}</h3>
                  <p className="text-[12px] text-[#64748B] leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative">
          <div className="absolute left-7 top-7 bottom-7 w-0.5 bg-gradient-to-b from-[#4F7DF3] to-[#0EA5E9] opacity-20" />
          <div className="flex flex-col gap-6 relative z-10">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 80} direction="right">
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm"
                    style={{ background: step.bg }}
                  >
                    <span className="material-symbols-outlined text-[24px]" style={{ color: step.color }}>{step.icon}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-[11px] font-black block mb-0.5" style={{ color: step.color }}>{step.number}</span>
                    <h3 className="text-[15px] font-bold text-[#1D3557] mb-1">{step.title}</h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
