import ScrollReveal from "./ScrollReveal";

const STAT_TOP = [
  { label: "Wisatawan Aktif",   value: "15.284", change: "+24%", icon: "group",           color: "#10B981", bg: "#ECFDF5" },
  { label: "Destinasi Tersedia",value: "300+",   change: "+12%", icon: "travel_explore",  color: "#4F7DF3", bg: "#EEF4FF" },
  { label: "Booking Bulan Ini", value: "1.843",  change: "+18%", icon: "calendar_month",  color: "#F59E0B", bg: "#FFFBEB" },
  { label: "Rating Wisatawan",  value: "4.9/5",  change: "+5%",  icon: "star",            color: "#8B5CF6", bg: "#F5F3FF" },
];

const BOOKING_BARS = [
  { month: "Jan", val: 55 }, { month: "Feb", val: 70 }, { month: "Mar", val: 45 },
  { month: "Apr", val: 85 }, { month: "Mei", val: 60 }, { month: "Jun", val: 95 },
  { month: "Jul", val: 75 },
];

const TRENDING_LINE = [30, 50, 40, 65, 55, 80, 70];

const POPULAR_DESTINATIONS = [
  { dest: "Bali",        bookings: "4.280", pct: 90, color: "#4F7DF3" },
  { dest: "Lombok",      bookings: "2.840", pct: 65, color: "#10B981" },
  { dest: "Bromo",       bookings: "1.960", pct: 50, color: "#F59E0B" },
  { dest: "Raja Ampat",  bookings: "1.240", pct: 35, color: "#EC4899" },
];

const RECENT_BOOKINGS = [
  { icon: "calendar_month", text: "Booking baru: Rina K. — Bali Beach Escape 3D2N",  time: "3 mnt lalu",  color: "#4F7DF3" },
  { icon: "payments",       text: "Pembayaran berhasil: BKG-115 Rp 2,5Jt Lombok",    time: "18 mnt lalu", color: "#10B981" },
  { icon: "person_add",     text: "Member baru: Fajar Nugroho — Gold Member",          time: "1 jam lalu",  color: "#F59E0B" },
  { icon: "local_offer",    text: "Promo Flash Sale Lebaran aktif (diskon 50%)",       time: "3 jam lalu",  color: "#EC4899" },
];

export default function AnalyticsSection() {
  return (
    <section id="analytics" className="py-16 md:py-20 bg-[#1D3557] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
              Statistik Wisata
            </p>
            <h2 className="text-[30px] md:text-[40px] font-black text-white leading-tight">
              Ribuan wisatawan{" "}
              <span className="text-[#4F7DF3]">sudah liburan bersama kami</span>
            </h2>
            <p className="mt-4 text-white/55 text-[15px] max-w-xl mx-auto leading-relaxed">
              Data real-time yang mencerminkan kepercayaan ribuan wisatawan
              Indonesia dalam merencanakan perjalanan bersama TravelGo.
            </p>
          </div>
        </ScrollReveal>

        {/* Analytics mockup */}
        <ScrollReveal delay={100}>
          <div className="bg-[#F4F5F7] rounded-2xl p-4 md:p-5 space-y-4">

            {/* Top stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {STAT_TOP.map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]/60">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                      <span className="material-symbols-outlined text-[16px]" style={{ color: stat.color }}>{stat.icon}</span>
                    </div>
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: stat.bg, color: stat.color }}>{stat.change}</span>
                  </div>
                  <p className="text-[9px] text-gray-400 font-semibold mb-0.5">{stat.label}</p>
                  <p className="text-[15px] font-black" style={{ color: stat.color }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* Booking bar chart */}
              <div className="md:col-span-2 bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]/60">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[12px] font-bold text-gray-700">Booking Wisatawan Bulanan</p>
                  <span className="text-[10px] font-semibold text-[#4F7DF3] bg-[#EEF4FF] px-2 py-0.5 rounded-lg">2026</span>
                </div>
                <div className="flex items-end gap-2 h-[90px]">
                  {BOOKING_BARS.map((bar, i) => (
                    <div key={bar.month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-lg" style={{ height: `${bar.val}%`, background: i === BOOKING_BARS.length - 1 ? "#4F7DF3" : "#EEF4FF" }} />
                      <span className="text-[8px] text-gray-400">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending + satisfaction */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]/60">
                <p className="text-[12px] font-bold text-gray-700 mb-3">Tren Booking</p>
                <div className="flex items-end gap-1.5 h-[70px] mb-3">
                  {TRENDING_LINE.map((h, i) => (
                    <div key={i} className="flex-1 rounded-md transition-all" style={{ height: `${h}%`, background: i === TRENDING_LINE.length - 1 ? "#10B981" : "#ECFDF5" }} />
                  ))}
                </div>
                <div className="pt-3 border-t border-[#F1F5F9]">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] text-gray-500 font-semibold">Kepuasan Wisatawan</p>
                    <p className="text-[11px] font-black text-[#8B5CF6]">98%</p>
                  </div>
                  <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#8B5CF6]" style={{ width: "98%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {/* Destinasi terpopuler */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB]/60 overflow-hidden">
                <div className="px-4 py-3 border-b border-[#F1F5F9]">
                  <p className="text-[12px] font-bold text-gray-700">Destinasi Terpopuler</p>
                </div>
                <div className="divide-y divide-[#F8FAFF]">
                  {POPULAR_DESTINATIONS.map(d => (
                    <div key={d.dest} className="px-4 py-2.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[10px] font-semibold text-gray-700">{d.dest}</p>
                        <p className="text-[10px] font-bold" style={{ color: d.color }}>{d.bookings}</p>
                      </div>
                      <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${d.pct}%`, background: d.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent booking activity */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]/60">
                <p className="text-[12px] font-bold text-gray-700 mb-3">Aktivitas Terbaru</p>
                <div className="space-y-3">
                  {RECENT_BOOKINGS.map((act, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${act.color}15` }}>
                        <span className="material-symbols-outlined text-[14px]" style={{ color: act.color }}>{act.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-600 leading-snug">{act.text}</p>
                        <p className="text-[9px] text-gray-400 mt-0.5">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
