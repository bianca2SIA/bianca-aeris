import BenefitCard from "./BenefitCard";

const BENEFITS = [
  {
    icon: "smartphone",
    title: "Booking Online Mudah",
    description:
      "Pesan paket wisata favoritmu dalam hitungan menit. Tidak perlu antri, tidak perlu ribet — cukup pilih, isi data, bayar, dan konfirmasi langsung.",
  },
  {
    icon: "card_travel",
    title: "Paket Wisata Terlengkap",
    description:
      "Temukan 300+ paket wisata terbaik ke berbagai destinasi di Indonesia. Dari wisata alam, budaya, petualangan, hingga bulan madu yang romantis.",
  },
  {
    icon: "groups",
    title: "Tour Guide Profesional",
    description:
      "Nikmati perjalanan lebih nyaman bersama pemandu wisata berpengalaman yang siap menemani dan memastikan setiap momen perjalananmu berkesan.",
  },
  {
    icon: "verified",
    title: "Pembayaran Aman",
    description:
      "Setiap transaksi dilindungi enkripsi SSL dan sistem keamanan berlapis. Tersedia berbagai metode pembayaran yang terjamin dan terpercaya.",
  },
];

export default function BenefitSection() {
  return (
    <section id="features" className="py-16 md:py-20 bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* ── Section heading ── */}
        <div className="text-center mb-12">
          <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
            Kenapa Memilih TravelGo?
          </p>

          <h2 className="text-[30px] md:text-[40px] font-black text-[#1D3557] leading-tight">
            Semua yang kamu butuhkan{" "}
            <span className="text-[#4F7DF3]">untuk liburan sempurna</span>
          </h2>

          <p className="mt-4 text-[#64748B] text-[15px] max-w-xl mx-auto leading-relaxed">
            TravelGo hadir sebagai partner liburanmu yang terpercaya — dari
            memilih destinasi hingga perjalanan selesai dengan aman dan nyaman.
          </p>
        </div>

        {/* ── Cards grid ── */}
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
