import { Link } from "react-router-dom";

const scrollToPackages = () => {
  const el = document.getElementById("paket");
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
};

/* ── Data ────────────────────────────── */
const DESTINATIONS = [
  { name: "Bali",      icon: "wb_sunny",    price: "Rp 2,5Jt", days: "3D2N", color: "#4F7DF3" },
  { name: "Lombok",    icon: "waves",       price: "Rp 1,9Jt", days: "2D1N", color: "#10B981" },
  { name: "Bromo",     icon: "landscape",   price: "Rp 1,2Jt", days: "2D1N", color: "#F59E0B" },
  { name: "Labuan Bajo", icon: "water",     price: "Rp 5,8Jt", days: "5D4N", color: "#EC4899" },
];

const BOOKINGS_PREVIEW = [
  { dest: "Bali Beach Escape",  date: "12 Jul 2026", status: "Terkonfirmasi" },
  { dest: "Lombok Eksotis",     date: "20 Agu 2026", status: "Menunggu"      },
  { dest: "Bromo Sunrise",      date: "05 Sep 2026", status: "Terkonfirmasi" },
];

const AVATAR_IDS = [44, 32, 60, 90];

/* ── Travel Mockup ──────────────────── */
function TravelMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-[#4F7DF3]/10 border border-[#E5E7EB] overflow-hidden">
      {/* Browser bar */}
      <div className="bg-[#F8FAFF] px-4 py-2.5 flex items-center gap-3 border-b border-[#E5E7EB]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-[10px] text-gray-400 border border-[#E5E7EB] font-medium">
          travelgo.com/destinasi
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Search bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F8FAFF] border border-[#E5E7EB]">
          <span className="material-symbols-outlined text-[#4F7DF3] text-[16px]">travel_explore</span>
          <span className="text-[11px] text-gray-400 font-medium">Cari destinasi impianmu…</span>
        </div>

        {/* Heading */}
        <p className="text-[11px] font-black text-[#1D3557] uppercase tracking-wide">Destinasi Populer</p>

        {/* Destination cards */}
        <div className="grid grid-cols-2 gap-2">
          {DESTINATIONS.map((dest) => (
            <div key={dest.name} className="rounded-xl border border-[#E5E7EB] p-2.5">
              <div
                className="w-7 h-7 rounded-lg mb-2 flex items-center justify-center"
                style={{ background: `${dest.color}15` }}
              >
                <span className="material-symbols-outlined text-[15px]" style={{ color: dest.color }}>
                  {dest.icon}
                </span>
              </div>
              <p className="text-[10px] font-bold text-[#1D3557] leading-none mb-0.5">{dest.name}</p>
              <p className="text-[9px] text-gray-400">{dest.days}</p>
              <p className="text-[11px] font-black mt-0.5" style={{ color: dest.color }}>{dest.price}</p>
            </div>
          ))}
        </div>

        {/* Active bookings */}
        <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
          <div className="px-3 py-2 bg-[#EEF4FF] border-b border-[#E5E7EB]">
            <p className="text-[9px] font-black text-[#4F7DF3] uppercase tracking-wide">Booking Saya</p>
          </div>
          {BOOKINGS_PREVIEW.map((b) => (
            <div key={b.dest} className="flex items-center justify-between px-3 py-1.5 border-b border-[#F8FAFF] last:border-0">
              <div>
                <p className="text-[9px] font-bold text-[#1D3557]">{b.dest}</p>
                <p className="text-[8px] text-gray-400">{b.date}</p>
              </div>
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                b.status === "Menunggu" ? "bg-yellow-50 text-yellow-600" : "bg-[#EEF4FF] text-[#4F7DF3]"
              }`}>
                {b.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── HeroSection ─────────────────────── */
export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-68px)] bg-gradient-to-br from-white via-[#F2F6FF] to-[#EBF0FF] flex items-center pt-[68px]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center w-full">

        {/* ── LEFT ── */}
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F7DF3]/10 border border-[#4F7DF3]/20 text-[#4F7DF3] text-[11px] font-bold tracking-[0.15em] uppercase mb-6">
            <span className="material-symbols-outlined text-[13px]">flight_takeoff</span>
            Website Travel #1 Indonesia
          </div>

          {/* Heading */}
          <h1 className="text-[36px] md:text-[48px] lg:text-[44px] xl:text-[52px] leading-[1.1] font-black text-[#1D3557] tracking-tight">
            Jelajahi Destinasi{" "}
            <span className="text-[#4F7DF3] relative inline-block">
              Impian
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M2 6C40 2 80 1 120 3C160 5 185 4 198 6" stroke="#4F7DF3" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
              </svg>
            </span>{" "}
            Bersama TravelGo
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-[16px] text-[#64748B] leading-relaxed">
            Temukan ratusan paket wisata terbaik di Indonesia dengan proses
            booking yang mudah, aman, dan nyaman. Dari Sabang sampai Merauke,
            semua ada di TravelGo.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={scrollToPackages}
              className="h-12 px-7 rounded-2xl bg-[#4F7DF3] text-white font-bold flex items-center gap-2.5 shadow-lg shadow-[#4F7DF3]/25 hover:bg-[#3B6AE8] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-[14px]"
            >
              <span className="material-symbols-outlined text-[18px]">travel_explore</span>
              Jelajahi Paket
            </button>
            <Link
              to="/register"
              className="h-12 px-7 rounded-2xl border-2 border-[#1D3557]/20 text-[#1D3557] font-bold flex items-center gap-2.5 hover:bg-[#1D3557] hover:text-white hover:border-[#1D3557] transition-all duration-300 text-[14px]"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Daftar Member
            </Link>
          </div>

          {/* Trust indicator */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {AVATAR_IDS.map((id) => (
                <img
                  key={id}
                  src={`https://randomuser.me/api/portraits/thumb/men/${id}.jpg`}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                  alt="wisatawan TravelGo"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-sm text-[#64748B]">
              <span className="font-black text-[#1D3557]">15.000+</span> wisatawan sudah
              liburan bersama TravelGo
            </p>
          </div>
        </div>

        {/* ── RIGHT: Travel Mockup ── */}
        <div className="relative hidden lg:block">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#4F7DF3]/8 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-6 w-48 h-48 rounded-full bg-[#1D3557]/6 blur-2xl pointer-events-none" />

          <TravelMockup />

          {/* Floating: promo */}
          <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg shadow-black/8 px-3.5 py-2.5 flex items-center gap-2.5 border border-[#E5E7EB]">
            <div className="w-8 h-8 rounded-xl bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#10B981] text-[16px]">local_offer</span>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 font-semibold leading-none mb-0.5">Promo Spesial</p>
              <p className="text-[13px] font-black text-[#10B981]">Diskon 30% OFF</p>
            </div>
          </div>

          {/* Floating: booking */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg shadow-black/8 px-3.5 py-2.5 flex items-center gap-2.5 border border-[#E5E7EB]">
            <div className="w-8 h-8 rounded-xl bg-[#4F7DF3]/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#4F7DF3] text-[16px]">calendar_month</span>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 font-semibold leading-none mb-0.5">Booking baru masuk</p>
              <p className="text-[13px] font-black text-[#1D3557]">Paket Bali — 3D2N</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
