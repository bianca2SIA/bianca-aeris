import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const PLANS = [
  {
    id: "silver",
    name: "Silver Member",
    price: "Gratis",
    period: "selamanya",
    desc: "Mulai perjalananmu tanpa biaya. Akses paket wisata pilihan dan booking online mudah.",
    color: "#64748B",
    bg: "bg-white",
    border: "border-[#E5E7EB]",
    badge: null,
    btnClass: "border-2 border-[#E5E7EB] text-[#1D3557] hover:bg-[#F8FAFF]",
    btnText: "Daftar Gratis",
    btnTo: "/register",
    features: [
      "Akses ke semua paket wisata",
      "Booking online mudah",
      "E-tiket digital",
      "Riwayat perjalanan",
      "Customer support standar",
    ],
  },
  {
    id: "gold",
    name: "Gold Member",
    price: "Rp 99.000",
    period: "per bulan",
    desc: "Untuk wisatawan aktif yang ingin mendapatkan harga terbaik dan prioritas booking.",
    color: "#4F7DF3",
    bg: "bg-[#1D3557]",
    border: "border-[#4F7DF3]",
    badge: "Paling Populer",
    btnClass: "bg-[#4F7DF3] text-white shadow-lg shadow-[#4F7DF3]/30 hover:bg-[#3B6AE8]",
    btnText: "Pilih Gold",
    btnTo: "/register",
    features: [
      "Semua fitur Silver",
      "Diskon 10% semua paket",
      "Priority booking slot",
      "Exclusive member deals",
      "Early bird promo akses",
      "Reschedule gratis 1x",
      "Dedicated support",
    ],
  },
  {
    id: "platinum",
    name: "Platinum Member",
    price: "Rp 249.000",
    period: "per bulan",
    desc: "Pengalaman wisata premium dengan layanan VIP dan keistimewaan eksklusif.",
    color: "#10B981",
    bg: "bg-white",
    border: "border-[#E5E7EB]",
    badge: null,
    btnClass: "border-2 border-[#10B981] text-[#10B981] hover:bg-[#ECFDF5]",
    btnText: "Pilih Platinum",
    btnTo: "/register",
    features: [
      "Semua fitur Gold",
      "Diskon 20% semua paket",
      "Tour guide pribadi gratis",
      "Lounge airport access",
      "Cancel & reschedule gratis",
      "Concierge service 24/7",
      "Gift paket liburan tahunan",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
              Paket Member
            </p>
            <h2 className="text-[30px] md:text-[40px] font-black text-[#1D3557] leading-tight">
              Pilih membership yang{" "}
              <span className="text-[#4F7DF3]">sesuai gaya liburanmu</span>
            </h2>
            <p className="mt-4 text-[#64748B] text-[15px] max-w-xl mx-auto leading-relaxed">
              Daftar gratis sebagai Silver Member atau upgrade ke Gold/Platinum
              untuk mendapatkan diskon dan keistimewaan eksklusif.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={i * 80}>
              <div
                className={`relative rounded-2xl border-2 p-7 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${plan.bg} ${plan.border} ${plan.id === "gold" ? "scale-105 shadow-xl" : "shadow-sm"}`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-[#4F7DF3] text-white text-[11px] font-black shadow-lg shadow-[#4F7DF3]/30 whitespace-nowrap">
                      ⭐ {plan.badge}
                    </span>
                  </div>
                )}

                <p className={`text-[11px] font-black tracking-widest uppercase mb-3 ${plan.id === "gold" ? "text-[#4F7DF3]" : "text-[#94A3B8]"}`}>
                  {plan.name}
                </p>

                <div className="mb-2">
                  <span className={`text-[36px] font-black leading-none ${plan.id === "gold" ? "text-white" : "text-[#1D3557]"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-[13px] ml-1 ${plan.id === "gold" ? "text-white/60" : "text-[#94A3B8]"}`}>
                    {plan.period}
                  </span>
                </div>

                <p className={`text-[13px] leading-relaxed mb-6 ${plan.id === "gold" ? "text-white/70" : "text-[#64748B]"}`}>
                  {plan.desc}
                </p>

                <ul className="space-y-2.5 flex-1 mb-7">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <div className="w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: plan.id === "gold" ? "#4F7DF3" : `${plan.color}20` }}>
                        <span className="material-symbols-outlined text-[11px]" style={{ color: plan.id === "gold" ? "white" : plan.color }}>check</span>
                      </div>
                      <span className={`text-[13px] ${plan.id === "gold" ? "text-white/85" : "text-[#475569]"}`}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.btnTo}
                  className={`w-full h-11 rounded-xl font-bold text-[14px] flex items-center justify-center transition-all duration-200 ${plan.btnClass}`}
                >
                  {plan.btnText}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <p className="mt-10 text-center text-[13px] text-[#94A3B8]">
            Semua membership termasuk akses ke ratusan paket wisata dan update promo berkala.
            Ada pertanyaan?{" "}
            <button
              type="button"
              onClick={() => { const el = document.getElementById("contact"); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" }); }}
              className="text-[#4F7DF3] font-bold hover:underline"
            >
              Tanya travel consultant kami
            </button>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
