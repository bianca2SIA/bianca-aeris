import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const TABS = [
  {
    id: "paket",
    label: "Paket Wisata",
    icon: "card_travel",
    title: "Paket Wisata Terlengkap",
    desc: "Temukan ratusan paket wisata ke berbagai destinasi terbaik di Indonesia. Dari wisata alam, budaya, petualangan, hingga bulan madu yang berkesan.",
    points: [
      "300+ paket destinasi di seluruh Indonesia",
      "Filter paket sesuai budget dan durasi",
      "Lihat itinerary lengkap sebelum memesan",
      "Bandingkan paket dan pilih yang terbaik",
    ],
    packages: [
      { name: "Bali Beach Escape",   price: "Rp 2,5Jt", days: "3D2N", color: "#4F7DF3", icon: "wb_sunny"    },
      { name: "Lombok Eksotis",      price: "Rp 1,9Jt", days: "2D1N", color: "#10B981", icon: "waves"       },
      { name: "Bromo Sunrise Tour",  price: "Rp 1,2Jt", days: "2D1N", color: "#F59E0B", icon: "landscape"   },
      { name: "Raja Ampat Dive",     price: "Rp 5,8Jt", days: "5D4N", color: "#EC4899", icon: "water"       },
    ],
    mockupType: "packages",
  },
  {
    id: "booking",
    label: "Booking Online",
    icon: "calendar_month",
    title: "Booking Online Mudah & Cepat",
    desc: "Pesan paket wisata impianmu hanya dalam 5 menit. Pilih paket, isi data peserta, lakukan pembayaran, dan e-tiket langsung dikirim ke emailmu.",
    points: [
      "Booking selesai hanya dalam 5 menit",
      "Pilih tanggal dan jumlah peserta fleksibel",
      "E-tiket digital dikirim otomatis via email",
      "Konfirmasi booking real-time",
    ],
    bookings: [
      { dest: "Bali Beach Escape",   date: "12 Jul 2026", status: "Terkonfirmasi", color: "text-[#4F7DF3] bg-[#EEF4FF]" },
      { dest: "Lombok Eksotis",      date: "20 Agu 2026", status: "Menunggu",      color: "text-yellow-600 bg-yellow-50" },
      { dest: "Bromo Sunrise Tour",  date: "05 Sep 2026", status: "Terkonfirmasi", color: "text-[#4F7DF3] bg-[#EEF4FF]" },
      { dest: "Raja Ampat Dive",     date: "10 Okt 2026", status: "Selesai",       color: "text-[#10B981] bg-[#ECFDF5]" },
    ],
    mockupType: "bookings",
  },
  {
    id: "promo",
    label: "Promo Menarik",
    icon: "local_offer",
    title: "Promo & Diskon Wisata Eksklusif",
    desc: "Dapatkan penawaran terbaik dengan flash sale, early bird, dan promo eksklusif khusus member TravelGo. Liburan seru dengan harga lebih hemat.",
    points: [
      "Flash sale dengan diskon hingga 50%",
      "Early bird promo untuk pemesanan jauh hari",
      "Promo eksklusif untuk Gold & Platinum Member",
      "Bundling paket untuk grup dan keluarga",
    ],
    promos: [
      { name: "Flash Sale Lebaran",  disc: "50%", type: "Flash Sale",   color: "#EC4899", bg: "#FDF2F8" },
      { name: "Early Bird Bali",     disc: "30%", type: "Early Bird",   color: "#8B5CF6", bg: "#F5F3FF" },
      { name: "Couple Package",      disc: "20%", type: "Couple",       color: "#4F7DF3", bg: "#EEF4FF" },
      { name: "Promo Gold Member",   disc: "10%", type: "Member Only",  color: "#F59E0B", bg: "#FFFBEB" },
    ],
    mockupType: "promos",
  },
  {
    id: "member",
    label: "Member Benefit",
    icon: "card_membership",
    title: "Keistimewaan Member TravelGo",
    desc: "Daftar sebagai member dan nikmati berbagai keistimewaan eksklusif. Dari diskon spesial hingga tour guide pribadi, semua untuk pengalaman liburan terbaik.",
    points: [
      "Diskon 10–20% untuk semua paket wisata",
      "Priority booking slot tanpa antri",
      "Akses early bird dan flash sale eksklusif",
      "Kumpulkan poin reward setiap booking",
    ],
    tiers: [
      { name: "Silver",   price: "Gratis",       perk: "Akses semua paket",        color: "#64748B", bg: "#F8FAFF"  },
      { name: "Gold",     price: "Rp 99K/bln",   perk: "Diskon 10% + priority",    color: "#4F7DF3", bg: "#EEF4FF"  },
      { name: "Platinum", price: "Rp 249K/bln",  perk: "Diskon 20% + VIP service", color: "#F59E0B", bg: "#FFFBEB"  },
    ],
    mockupType: "tiers",
  },
  {
    id: "payment",
    label: "Pembayaran Aman",
    icon: "security",
    title: "Pembayaran Aman & Terjamin",
    desc: "Setiap transaksi di TravelGo dilindungi sistem keamanan berlapis dengan enkripsi SSL. Tersedia berbagai metode pembayaran yang praktis dan terpercaya.",
    points: [
      "Enkripsi SSL 256-bit untuk setiap transaksi",
      "Transfer bank, e-wallet, kartu kredit & QRIS",
      "Sistem refund mudah jika terjadi pembatalan",
      "Riwayat transaksi tersimpan di dashboard",
    ],
    methods: [
      { name: "Transfer Bank",   icon: "account_balance", color: "#4F7DF3", bg: "#EEF4FF" },
      { name: "GoPay / OVO",     icon: "payments",        color: "#10B981", bg: "#ECFDF5" },
      { name: "Kartu Kredit",    icon: "credit_card",     color: "#F59E0B", bg: "#FFFBEB" },
      { name: "QRIS",            icon: "qr_code",         color: "#8B5CF6", bg: "#F5F3FF" },
    ],
    mockupType: "payment",
  },
];

/* ── Mini mockups ── */
function PackagesMockup({ packages }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {packages.map(p => (
        <div key={p.name} className="bg-white rounded-xl border border-[#E5E7EB] p-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="w-7 h-7 rounded-lg mb-2 flex items-center justify-center" style={{ background: `${p.color}15` }}>
            <span className="material-symbols-outlined text-[15px]" style={{ color: p.color }}>{p.icon}</span>
          </div>
          <p className="text-[10px] font-bold text-[#1D3557] leading-snug mb-1">{p.name}</p>
          <p className="text-[9px] text-gray-400 mb-1">{p.days}</p>
          <p className="text-[11px] font-black" style={{ color: p.color }}>{p.price}</p>
        </div>
      ))}
    </div>
  );
}

function BookingsMockup({ bookings }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-center justify-between">
        <p className="text-[12px] font-bold text-[#1D3557]">Booking Saya</p>
        <span className="text-[10px] text-[#4F7DF3] font-semibold">Lihat Semua</span>
      </div>
      <div className="divide-y divide-[#F8FAFF]">
        {bookings.map(b => (
          <div key={b.dest} className="flex items-center justify-between px-4 py-2.5">
            <div>
              <p className="text-[10px] font-bold text-[#1D3557]">{b.dest}</p>
              <p className="text-[9px] text-gray-400">{b.date}</p>
            </div>
            <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${b.color}`}>{b.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromosMockup({ promos }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {promos.map(p => (
        <div key={p.name} className="rounded-xl border border-[#E5E7EB] p-3 shadow-sm" style={{ background: p.bg }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md text-white" style={{ background: p.color }}>{p.type}</span>
            <span className="text-[14px] font-black" style={{ color: p.color }}>{p.disc}</span>
          </div>
          <p className="text-[10px] font-bold text-[#1D3557] leading-snug">{p.name}</p>
        </div>
      ))}
    </div>
  );
}

function TiersMockup({ tiers }) {
  return (
    <div className="space-y-2.5">
      {tiers.map(t => (
        <div key={t.name} className="flex items-center gap-3 p-3 rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: t.bg }}>
            <span className="material-symbols-outlined text-[16px]" style={{ color: t.color }}>workspace_premium</span>
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-[#1D3557]">{t.name} Member</p>
            <p className="text-[10px] text-gray-400">{t.perk}</p>
          </div>
          <p className="text-[10px] font-black" style={{ color: t.color }}>{t.price}</p>
        </div>
      ))}
    </div>
  );
}

function PaymentMockup({ methods }) {
  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        {methods.map(m => (
          <div key={m.name} className="flex items-center gap-2.5 p-3 rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: m.bg }}>
              <span className="material-symbols-outlined text-[15px]" style={{ color: m.color }}>{m.icon}</span>
            </div>
            <p className="text-[10px] font-bold text-[#1D3557]">{m.name}</p>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-[#ECFDF5] border border-[#10B981]/20 flex items-center gap-2.5">
        <span className="material-symbols-outlined text-[#10B981] text-[18px]">verified_user</span>
        <div>
          <p className="text-[10px] font-bold text-[#10B981]">Transaksi 100% Aman</p>
          <p className="text-[9px] text-[#10B981]/70">Dilindungi enkripsi SSL 256-bit</p>
        </div>
      </div>
    </div>
  );
}

function renderMockup(tab) {
  switch (tab.mockupType) {
    case "packages": return <PackagesMockup packages={tab.packages} />;
    case "bookings": return <BookingsMockup bookings={tab.bookings} />;
    case "promos":   return <PromosMockup promos={tab.promos} />;
    case "tiers":    return <TiersMockup tiers={tab.tiers} />;
    case "payment":  return <PaymentMockup methods={tab.methods} />;
    default:         return null;
  }
}

export default function CRMFeaturesSection() {
  const [active, setActive] = useState("paket");
  const tab = TABS.find(t => t.id === active) ?? TABS[0];

  return (
    <section id="crm-features" className="py-16 md:py-20 bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
              Layanan TravelGo
            </p>
            <h2 className="text-[30px] md:text-[40px] font-black text-[#1D3557] leading-tight">
              Semua layanan untuk liburanmu,{" "}
              <span className="text-[#4F7DF3]">dalam satu platform</span>
            </h2>
            <p className="mt-4 text-[#64748B] text-[15px] max-w-xl mx-auto leading-relaxed">
              Dari menemukan paket wisata hingga pembayaran aman, TravelGo
              menyediakan semua yang kamu butuhkan untuk liburan sempurna.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab buttons */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {TABS.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 ${
                  active === t.id
                    ? "bg-[#4F7DF3] text-white shadow-md shadow-[#4F7DF3]/25"
                    : "bg-white text-[#64748B] border border-[#E5E7EB] hover:border-[#4F7DF3]/30 hover:text-[#4F7DF3]"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: info */}
          <div key={tab.id} className="transition-all duration-300">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EEF4FF] text-[#4F7DF3] text-[11px] font-bold mb-5">
              <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
              {tab.label}
            </div>
            <h3 className="text-[26px] md:text-[32px] font-black text-[#1D3557] leading-tight mb-4">{tab.title}</h3>
            <p className="text-[#64748B] text-[15px] leading-relaxed mb-7">{tab.desc}</p>
            <ul className="space-y-3">
              {tab.points.map(point => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#4F7DF3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-white text-[12px]">check</span>
                  </div>
                  <p className="text-[14px] text-[#475569]">{point}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: mockup */}
          <div key={`${tab.id}-mockup`} className="transition-all duration-300">
            {renderMockup(tab)}
          </div>
        </div>
      </div>
    </section>
  );
}
