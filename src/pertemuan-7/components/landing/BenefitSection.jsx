import BenefitCard from "./BenefitCard";

const BENEFITS = [
  {
    icon: "bolt",
    title: "Booking Cepat",
    description:
      "Proses pemesanan paket wisata lebih cepat dan terstruktur. Dari konfirmasi hingga pembayaran, semua dikelola dalam satu alur yang efisien.",
  },
  {
    icon: "group",
    title: "Customer Management",
    description:
      "Kelola data pelanggan secara terpusat. Pantau riwayat booking, preferensi, dan hubungi customer dengan mudah langsung dari dashboard.",
  },
  {
    icon: "card_travel",
    title: "Paket Wisata",
    description:
      "Tambah, edit, dan kelola ratusan paket wisata dengan mudah. Atur harga, fasilitas, itinerary, dan ketersediaan dalam hitungan detik.",
  },
  {
    icon: "bar_chart",
    title: "Dashboard Realtime",
    description:
      "Pantau performa bisnis travel Anda secara real-time. Lihat grafik pendapatan, statistik booking, dan laporan bisnis yang akurat.",
  },
];

export default function BenefitSection() {
  return (
    <section id="features" className="py-16 md:py-20 bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* ── Section heading ── */}
        <div className="text-center mb-12">
          <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
            Kenapa TravelGo CRM?
          </p>

          <h2 className="text-[30px] md:text-[40px] font-black text-[#1D3557] leading-tight">
            Semua yang dibutuhkan bisnis travel{" "}
            <span className="text-[#4F7DF3]">ada di sini</span>
          </h2>

          <p className="mt-4 text-[#64748B] text-[15px] max-w-xl mx-auto leading-relaxed">
            Platform CRM yang dirancang khusus untuk kebutuhan operasional
            perusahaan travel, dari yang kecil hingga skala enterprise.
          </p>
        </div>

        {/* ── Cards grid — items-stretch agar tinggi identik ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {BENEFITS.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
