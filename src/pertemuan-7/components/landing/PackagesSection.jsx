import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

/* ── Data ────────────────────────────────── */
const PACKAGES = [
  {
    id: "pkg-001",
    name: "Bali Magical 5 Days",
    location: "Bali, Indonesia",
    img: "https://picsum.photos/seed/p-bali1/800/500",
    rating: 4.9, reviews: 1240,
    duration: "5D4N", category: "Honeymoon",
    originalPrice: 3500000, discountedPrice: 2499000, discount: "29%",
    badge: "Best Seller", badgeColor: "#F59E0B",
    seatsLeft: 5,
    facilities: ["Hotel 4★", "Transport", "Makan 3×", "Tour Guide", "Asuransi", "Airport"],
  },
  {
    id: "pkg-002",
    name: "Lombok Eksotis 3 Days",
    location: "Lombok, NTB",
    img: "https://picsum.photos/seed/p-lombok1/800/500",
    rating: 4.8, reviews: 890,
    duration: "3D2N", category: "Pantai",
    originalPrice: 2200000, discountedPrice: 1699000, discount: "23%",
    badge: "Promo", badgeColor: "#EC4899",
    seatsLeft: 8,
    facilities: ["Hotel 3★", "Transport", "Makan 3×", "Tour Guide", "Asuransi"],
  },
  {
    id: "pkg-003",
    name: "Bromo Sunrise Adventure",
    location: "Bromo, Jawa Timur",
    img: "https://picsum.photos/seed/p-bromo1/800/500",
    rating: 4.8, reviews: 720,
    duration: "2D1N", category: "Gunung",
    originalPrice: 1500000, discountedPrice: 1199000, discount: "20%",
    badge: "Best Seller", badgeColor: "#F59E0B",
    seatsLeft: 12,
    facilities: ["Hotel 3★", "Transport", "Sarapan", "Tour Guide"],
  },
  {
    id: "pkg-004",
    name: "Raja Ampat Dive Paradise",
    location: "Raja Ampat, Papua Barat",
    img: "https://picsum.photos/seed/p-raja1/800/500",
    rating: 5.0, reviews: 560,
    duration: "5D4N", category: "Pantai",
    originalPrice: 7500000, discountedPrice: 5999000, discount: "20%",
    badge: "Premium", badgeColor: "#8B5CF6",
    seatsLeft: 4,
    facilities: ["Resort", "Speedboat", "All Inclusive", "Dive Guide", "Asuransi", "Airport"],
  },
  {
    id: "pkg-005",
    name: "Yogyakarta Heritage Tour",
    location: "Yogyakarta, DIY",
    img: "https://picsum.photos/seed/p-yogya1/800/500",
    rating: 4.7, reviews: 1560,
    duration: "3D2N", category: "Family",
    originalPrice: 1200000, discountedPrice: 899000, discount: "25%",
    badge: null, badgeColor: null,
    seatsLeft: 15,
    facilities: ["Hotel 3★", "Transport", "Makan 2×", "Tour Guide"],
  },
  {
    id: "pkg-006",
    name: "Komodo Island Explorer",
    location: "Komodo, NTT",
    img: "https://picsum.photos/seed/p-komodo1/800/500",
    rating: 4.9, reviews: 480,
    duration: "3D2N", category: "Gunung",
    originalPrice: 4500000, discountedPrice: 3699000, discount: "18%",
    badge: "Best Seller", badgeColor: "#F59E0B",
    seatsLeft: 6,
    facilities: ["Hotel 4★", "Kapal", "Makan 3×", "Ranger Guide", "Asuransi"],
  },
  {
    id: "pkg-007",
    name: "Bali Family Adventure",
    location: "Bali, Indonesia",
    img: "https://picsum.photos/seed/p-toba1/800/500",
    rating: 4.7, reviews: 640,
    duration: "4D3N", category: "Family",
    originalPrice: 2800000, discountedPrice: 2199000, discount: "21%",
    badge: null, badgeColor: null,
    seatsLeft: 10,
    facilities: ["Hotel 4★", "Transport", "Makan 3×", "Tour Guide", "Asuransi"],
  },
  {
    id: "pkg-008",
    name: "Labuan Bajo Honeymoon",
    location: "Labuan Bajo, NTT",
    img: "https://picsum.photos/seed/p-labuan1/800/500",
    rating: 4.9, reviews: 720,
    duration: "4D3N", category: "Honeymoon",
    originalPrice: 5500000, discountedPrice: 4299000, discount: "22%",
    badge: "Promo", badgeColor: "#EC4899",
    seatsLeft: 3,
    facilities: ["Resort 5★", "Private Boat", "All Inclusive", "Tour Guide", "Asuransi", "Airport"],
  },
];

const CATS = ["Semua", "Best Seller", "Pantai", "Gunung", "Family", "Honeymoon"];
const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

/* ── Card ────────────────────────────────── */
function PackageCard({ pkg, onBook }) {
  return (
    <article className="group bg-white rounded-2xl border border-[#E8ECF0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">

      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "180px" }}>
        <img
          src={pkg.img}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {pkg.badge && (
            <span className="px-2 py-0.5 rounded-full text-white text-[9px] font-black" style={{ background: pkg.badgeColor }}>
              {pkg.badge}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-black">
            -{pkg.discount}
          </span>
        </div>

        {/* Bottom chips */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          {pkg.seatsLeft <= 8 && (
            <span className="px-2 py-0.5 rounded-full bg-white/90 text-red-500 text-[9px] font-black">
              Sisa {pkg.seatsLeft} seat
            </span>
          )}
          <span className="ml-auto px-2 py-0.5 rounded-full bg-white/90 text-[#1D3557] text-[9px] font-bold">
            {pkg.duration}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name */}
        <h3 className="text-[14px] font-black text-[#1D3557] leading-tight mb-1 group-hover:text-[#4F7DF3] transition-colors">
          {pkg.name}
        </h3>

        {/* Location */}
        <p className="text-[11px] text-[#94A3B8] mb-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-[12px] text-[#4F7DF3]">location_on</span>
          {pkg.location}
        </p>

        {/* Stars + reviews */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <span key={s} className={`text-[11px] ${s <= Math.round(pkg.rating) ? "text-[#F59E0B]" : "text-[#E5E7EB]"}`}>★</span>
            ))}
          </div>
          <span className="text-[11px] font-bold text-[#1D3557]">{pkg.rating}</span>
          <span className="text-[10px] text-[#94A3B8]">({pkg.reviews})</span>
        </div>

        {/* Facilities — 4 chips max */}
        <div className="flex flex-wrap gap-1 mb-4">
          {pkg.facilities.slice(0, 4).map(f => (
            <span key={f} className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[9px] text-[#475569] font-medium">
              {f}
            </span>
          ))}
          {pkg.facilities.length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[9px] text-[#94A3B8]">
              +{pkg.facilities.length - 4} lagi
            </span>
          )}
        </div>

        {/* Price block + CTA */}
        <div className="mt-auto">
          <p className="text-[10px] text-[#94A3B8] line-through">{fmt(pkg.originalPrice)}</p>
          <p className="text-[18px] font-black text-[#4F7DF3] leading-none">{fmt(pkg.discountedPrice)}</p>
          <p className="text-[9px] text-[#94A3B8] mb-3">per orang · sudah termasuk pajak</p>

          <button
            type="button"
            onClick={() => onBook(pkg)}
            className="w-full h-9 rounded-xl bg-[#4F7DF3] text-white font-bold text-[12px] hover:bg-[#3B6AE8] active:scale-95 transition-all duration-200 shadow-sm shadow-[#4F7DF3]/20"
          >
            Booking Sekarang
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── Section ─────────────────────────────── */
export default function PackagesSection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Semua");

  const filtered =
    selected === "Semua" ? PACKAGES :
    selected === "Best Seller" ? PACKAGES.filter(p => p.badge === "Best Seller") :
    PACKAGES.filter(p => p.category === selected);

  const handleBook = (pkg) => {
    localStorage.setItem("travelgo_pending_booking", JSON.stringify({
      packageId: pkg.id,
      packageName: pkg.name,
      location: pkg.location,
      duration: pkg.duration,
      price: pkg.discountedPrice,
      originalPrice: pkg.originalPrice,
      discount: pkg.discount,
      img: pkg.img,
      selectedAt: new Date().toISOString(),
    }));
    navigate("/register");
  };

  return (
    <section id="paket" className="py-14 md:py-16 bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-2">Paket Wisata</p>
            <h2 className="text-[28px] md:text-[36px] font-black text-[#1D3557] leading-tight">
              Pilih paket liburanmu <span className="text-[#4F7DF3]">sekarang</span>
            </h2>
            <p className="mt-3 text-[#64748B] text-[14px] max-w-lg mx-auto">
              Harga transparan, fasilitas lengkap, tour guide profesional.
              Booking dalam 5 menit, berangkat kapan saja.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal delay={40}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATS.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelected(cat)}
                className={`h-9 px-4 rounded-xl text-[12px] font-bold transition-all duration-200 ${
                  selected === cat
                    ? "bg-[#4F7DF3] text-white shadow-md shadow-[#4F7DF3]/25"
                    : "bg-white text-[#64748B] border border-[#E5E7EB] hover:border-[#4F7DF3]/40 hover:text-[#4F7DF3]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid — 4 col desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {filtered.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 45} direction="up">
              <PackageCard pkg={pkg} onBook={handleBook} />
            </ScrollReveal>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-14 text-center">
              <span className="material-symbols-outlined text-[40px] text-[#E5E7EB] block mb-2">travel_explore</span>
              <p className="text-[14px] text-[#94A3B8]">Paket untuk kategori ini segera hadir.</p>
            </div>
          )}
        </div>

        {/* Trust bar */}
        <ScrollReveal delay={120}>
          <div className="mt-10 pt-8 border-t border-[#E5E7EB] flex flex-wrap justify-center gap-8">
            {[
              { icon: "verified",    text: "Harga Transparan" },
              { icon: "headset_mic", text: "Support 24/7"     },
              { icon: "lock",        text: "Pembayaran Aman"  },
              { icon: "undo",        text: "Refund Mudah"     },
            ].map(t => (
              <div key={t.text} className="flex items-center gap-2 text-[12px] text-[#64748B]">
                <span className="material-symbols-outlined text-[#4F7DF3] text-[15px]">{t.icon}</span>
                {t.text}
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
