import { Link } from "react-router-dom";

/* ── Data ────────────────────────────── */
const STAT_CARDS = [
  { label: "Total Booking", value: "1,284", color: "#4F7DF3" },
  { label: "Pendapatan", value: "Rp 48Jt", color: "#10B981" },
  { label: "Customer", value: "346", color: "#F59E0B" },
];
const CHART_BARS = [40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95];
const RECENT_BOOKINGS = [
  { name: "Bianca B. — Bali Escape", status: "Confirmed" },
  { name: "Ahmad R. — Lombok Trip", status: "Pending" },
  { name: "Salsa A. — Bromo Tour", status: "Confirmed" },
];
const SIDEBAR_ICONS = ["card_travel", "check_box", "group", "chat_bubble", "local_offer"];
const AVATAR_IDS = [44, 32, 60, 90];

/* ── Mini dashboard inside hero ──────── */
function DashboardMockup() {
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
          app.travelgo.com/dashboard
        </div>
      </div>

      {/* Dashboard body */}
      <div className="flex h-[300px]">
        {/* Mini sidebar */}
        <div className="w-[44px] bg-[#1D3557] flex flex-col items-center pt-4 gap-4 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#4F7DF3] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[14px]">dashboard</span>
          </div>
          {SIDEBAR_ICONS.map((icon) => (
            <span key={icon} className="material-symbols-outlined text-white/30 text-[15px]">
              {icon}
            </span>
          ))}
        </div>

        {/* Content area */}
        <div className="flex-1 bg-[#F4F5F7] p-3 overflow-hidden">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2 mb-2.5">
            {STAT_CARDS.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-2.5 shadow-sm">
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wide">{stat.label}</p>
                <p className="text-[13px] font-black mt-0.5" style={{ color: stat.color }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Mini bar chart */}
          <div className="bg-white rounded-xl p-2.5 shadow-sm mb-2.5">
            <p className="text-[8px] text-gray-500 font-bold mb-2">Grafik Booking</p>
            <div className="flex items-end gap-0.5 h-[44px]">
              {CHART_BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{ height: `${h}%`, background: i >= 10 ? "#4F7DF3" : "#EEF4FF" }}
                />
              ))}
            </div>
          </div>

          {/* Mini table */}
          <div className="bg-white rounded-xl p-2.5 shadow-sm">
            <p className="text-[8px] text-gray-500 font-bold mb-1.5">Booking Terbaru</p>
            {RECENT_BOOKINGS.map((row, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                <span className="text-[8px] text-gray-600 font-medium">{row.name}</span>
                <span
                  className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${
                    row.status === "Pending" ? "bg-yellow-50 text-yellow-600" : "bg-[#EEF4FF] text-[#4F7DF3]"
                  }`}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
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
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F7DF3]/10 border border-[#4F7DF3]/20 text-[#4F7DF3] text-[11px] font-bold tracking-[0.15em] uppercase mb-6">
            <span className="material-symbols-outlined text-[13px]">rocket_launch</span>
            TravelGo CRM Platform
          </div>

          {/* Heading */}
          <h1 className="text-[36px] md:text-[48px] lg:text-[44px] xl:text-[52px] leading-[1.1] font-black text-[#1D3557] tracking-tight">
            Kelola Bisnis Travel{" "}
            <span className="text-[#4F7DF3] relative inline-block">
              Lebih Mudah
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6C40 2 80 1 120 3C160 5 185 4 198 6"
                  stroke="#4F7DF3"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              </svg>
            </span>{" "}
            Bersama TravelGo CRM
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-[16px] text-[#64748B] leading-relaxed">
            Kelola customer, paket wisata, booking, transaksi, promo, dan
            laporan dalam satu dashboard modern yang dirancang khusus untuk
            bisnis travel.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="h-12 px-7 rounded-2xl bg-[#4F7DF3] text-white font-bold flex items-center gap-2.5 shadow-lg shadow-[#4F7DF3]/25 hover:bg-[#3B6AE8] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-[14px]"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              Mulai Gratis
            </Link>

            <Link
              to="/login"
              className="h-12 px-7 rounded-2xl border-2 border-[#1D3557]/20 text-[#1D3557] font-bold flex items-center gap-2.5 hover:bg-[#1D3557] hover:text-white hover:border-[#1D3557] transition-all duration-300 text-[14px]"
            >
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              Lihat Demo
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
                  alt="user avatar"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-sm text-[#64748B]">
              <span className="font-black text-[#1D3557]">500+</span> perusahaan travel sudah
              menggunakan TravelGo CRM
            </p>
          </div>
        </div>

        {/* ── RIGHT: Dashboard Mockup ── */}
        <div className="relative hidden lg:block">
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#4F7DF3]/8 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-6 w-48 h-48 rounded-full bg-[#1D3557]/6 blur-2xl pointer-events-none" />

          <DashboardMockup />

          {/* Floating badge: growth */}
          <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg shadow-black/8 px-3.5 py-2.5 flex items-center gap-2.5 border border-[#E5E7EB]">
            <div className="w-8 h-8 rounded-xl bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#10B981] text-[16px]">trending_up</span>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 font-semibold leading-none mb-0.5">Pendapatan bulan ini</p>
              <p className="text-[13px] font-black text-[#10B981]">+24%</p>
            </div>
          </div>

          {/* Floating badge: notification */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg shadow-black/8 px-3.5 py-2.5 flex items-center gap-2.5 border border-[#E5E7EB]">
            <div className="w-8 h-8 rounded-xl bg-[#4F7DF3]/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#4F7DF3] text-[16px]">notifications_active</span>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 font-semibold leading-none mb-0.5">Booking baru masuk</p>
              <p className="text-[13px] font-black text-[#1D3557]">3 menunggu konfirmasi</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}
