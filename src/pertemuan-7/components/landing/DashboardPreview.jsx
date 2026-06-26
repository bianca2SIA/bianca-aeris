/* ─────────────────────────────────────────────
   DashboardPreview — Mockup visual admin panel
   Dibuat murni dengan Tailwind, tanpa gambar.
───────────────────────────────────────────── */

const SIDEBAR_NAV = [
  { icon: "dashboard", label: "Dashboard", active: true },
  { icon: "card_travel", label: "Packages", active: false },
  { icon: "check_box", label: "Bookings", active: false },
  { icon: "group", label: "Travelers", active: false },
  { icon: "chat_bubble", label: "Messages", active: false },
  { icon: "local_offer", label: "Deals", active: false },
];

const STAT_CARDS = [
  { label: "Total Booking", value: "1,284", change: "+12%", icon: "calendar_month", bg: "#EEF4FF", color: "#4F7DF3" },
  { label: "Pendapatan",    value: "Rp 48,6Jt", change: "+24%", icon: "payments",      bg: "#ECFDF5", color: "#10B981" },
  { label: "Customer Baru", value: "346",    change: "+8%",  icon: "person_add",   bg: "#FFFBEB", color: "#F59E0B" },
  { label: "Paket Aktif",   value: "28",     change: "+3",   icon: "card_travel",  bg: "#FDF2F8", color: "#EC4899" },
];

const BOOKING_ROWS = [
  { code: "BKG-001", name: "Bianca Bahi",   package: "Bali Beach Escape",    price: "Rp 4.500.000", status: "Dikonfirmasi" },
  { code: "BKG-002", name: "Ahmad Rizky",   package: "Lombok Eksotis",       price: "Rp 3.750.000", status: "Menunggu"     },
  { code: "BKG-003", name: "Salsa Amanda",  package: "Bromo Sunrise",        price: "Rp 2.800.000", status: "Dikonfirmasi" },
  { code: "BKG-004", name: "Fajar Nugroho", package: "Labuan Bajo Premium",  price: "Rp 6.200.000", status: "Dibatalkan"   },
];

const CHART_DATA = [
  { month: "Jan", value: 55 },
  { month: "Feb", value: 70 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 85 },
  { month: "Mei", value: 60 },
  { month: "Jun", value: 95 },
  { month: "Jul", value: 75 },
];

function StatusBadge({ status }) {
  const styles = {
    Dikonfirmasi: "bg-[#EEF4FF] text-[#4F7DF3]",
    Menunggu:     "bg-yellow-50 text-yellow-600",
    Dibatalkan:   "bg-red-50 text-red-500",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles[status] ?? "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
}

export default function DashboardPreview() {
  return (
    <section className="py-16 md:py-20 bg-[#1D3557] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 lg:px-10">

        {/* ── Heading ── */}
        <div className="text-center mb-10">
          <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
            Tampilan Dashboard
          </p>
          <h2 className="text-[30px] md:text-[40px] font-black text-white leading-tight">
            Satu dashboard untuk{" "}
            <span className="text-[#4F7DF3]">semua operasional</span>
          </h2>
          <p className="mt-4 text-white/55 text-[15px] max-w-xl mx-auto leading-relaxed">
            Antarmuka yang intuitif dan informatif. Semua data bisnis travel
            Anda tersaji dalam satu layar yang rapi dan mudah dibaca.
          </p>
        </div>

        {/* ── Browser frame ── */}
        <div className="relative">
          {/* Soft glow */}
          <div className="absolute inset-x-0 top-6 bottom-0 bg-[#4F7DF3]/15 blur-2xl rounded-3xl pointer-events-none" />

          <div className="relative bg-white rounded-2xl shadow-xl border border-white/8 overflow-hidden">

            {/* Browser chrome */}
            <div className="bg-[#F0F4F8] px-5 py-3 flex items-center gap-3 border-b border-[#E5E7EB]">
              <div className="flex gap-1.5 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex-1 max-w-xs bg-white rounded-lg px-4 py-1.5 text-[11px] text-gray-400 border border-[#E5E7EB] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-gray-300 text-[13px]">lock</span>
                app.travelgo.com/dashboard
              </div>
            </div>

            {/* ── Dashboard UI ── */}
            <div className="flex h-[420px] overflow-hidden">

              {/* Sidebar */}
              <aside className="w-[180px] bg-white border-r border-[#E5E7EB] flex flex-col flex-shrink-0">
                {/* Logo area */}
                <div className="px-4 py-4 border-b border-[#E5E7EB] flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#4F7DF3] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-[14px]">flight_takeoff</span>
                  </div>
                  <span className="text-[14px] font-black text-[#1D3557]">TravelGo.</span>
                </div>

                {/* Nav items */}
                <nav className="px-3 py-3 flex flex-col gap-1 flex-1">
                  {SIDEBAR_NAV.map((item) => (
                    <div
                      key={item.label}
                      className={`h-8 px-2.5 rounded-xl flex items-center gap-2 transition-colors ${
                        item.active
                          ? "bg-[#4F7DF3] text-white"
                          : "text-gray-400"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
                      <span className="text-[11px] font-semibold">{item.label}</span>
                    </div>
                  ))}
                </nav>

                {/* Logout */}
                <div className="px-3 pb-4">
                  <div className="h-8 px-2.5 rounded-xl flex items-center gap-2 text-gray-300">
                    <span className="material-symbols-outlined text-[15px]">logout</span>
                    <span className="text-[11px] font-semibold">Logout</span>
                  </div>
                </div>
              </aside>

              {/* Main content */}
              <div className="flex-1 bg-[#F4F5F7] flex flex-col min-w-0 overflow-hidden">

                {/* Topbar */}
                <header className="h-12 bg-white border-b border-[#E5E7EB] px-5 flex items-center justify-between flex-shrink-0">
                  <p className="text-[14px] font-bold text-[#1E293B]">Dashboard</p>
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-36 bg-gray-50 border border-[#E5E7EB] rounded-lg px-3 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-gray-300 text-[13px]">search</span>
                      <span className="text-[10px] text-gray-300">Search...</span>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined text-gray-400 text-[18px]">notifications</span>
                      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-400" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        className="w-6 h-6 rounded-lg object-cover"
                        alt="admin"
                        loading="lazy"
                      />
                      <div className="hidden sm:block">
                        <p className="text-[10px] font-bold text-gray-700 leading-none">Bianca B.</p>
                        <p className="text-[9px] text-gray-400">Admin</p>
                      </div>
                    </div>
                  </div>
                </header>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">

                  {/* Stat cards */}
                  <div className="grid grid-cols-4 gap-2.5">
                    {STAT_CARDS.map((stat) => (
                      <div key={stat.label} className="bg-white rounded-2xl p-3 shadow-sm border border-[#E5E7EB]/60">
                        <div className="flex items-start justify-between mb-2">
                          <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                            <span className="material-symbols-outlined text-[14px]" style={{ color: stat.color }}>{stat.icon}</span>
                          </div>
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: stat.bg, color: stat.color }}>
                            {stat.change}
                          </span>
                        </div>
                        <p className="text-[9px] text-gray-400 font-semibold">{stat.label}</p>
                        <p className="text-[13px] font-black" style={{ color: stat.color }}>{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Chart row */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Bar chart */}
                    <div className="col-span-2 bg-white rounded-2xl p-3.5 shadow-sm border border-[#E5E7EB]/60">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[11px] font-bold text-gray-700">Pendapatan Bulanan</p>
                        <span className="text-[9px] font-semibold text-[#4F7DF3] bg-[#EEF4FF] px-2 py-0.5 rounded-lg">2026</span>
                      </div>
                      <div className="flex items-end gap-2 h-[72px]">
                        {CHART_DATA.map((bar, i) => (
                          <div key={bar.month} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full rounded-t-md"
                              style={{
                                height: `${bar.value}%`,
                                background: i === CHART_DATA.length - 1 ? "#4F7DF3" : "#EEF4FF",
                              }}
                            />
                            <span className="text-[8px] text-gray-400">{bar.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Top packages */}
                    <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#E5E7EB]/60">
                      <p className="text-[11px] font-bold text-gray-700 mb-3">Paket Teratas</p>
                      <div className="space-y-2.5">
                        {["Bali Beach", "Lombok Trip", "Bromo Tour"].map((pkg, i) => (
                          <div key={pkg} className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-md flex items-center justify-center text-[8px] font-black text-white bg-[#4F7DF3]">
                                {i + 1}
                              </div>
                              <span className="text-[10px] text-gray-600 font-medium">{pkg}</span>
                            </div>
                            <span className="text-[9px] text-[#4F7DF3] font-bold">{[240, 198, 145][i]} bkng</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking table */}
                  <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB]/60 overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#E5E7EB] flex items-center justify-between">
                      <p className="text-[11px] font-bold text-gray-700">Booking Terbaru</p>
                      <span className="text-[10px] font-semibold text-[#4F7DF3]">Lihat Semua</span>
                    </div>
                    <table className="w-full text-left">
                      <thead className="bg-[#F8FAFF]">
                        <tr>
                          {["Kode", "Customer", "Paket", "Harga", "Status"].map((col) => (
                            <th key={col} className="px-4 py-2 text-[9px] font-bold text-gray-400 uppercase tracking-wide">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F5F9]">
                        {BOOKING_ROWS.map((row) => (
                          <tr key={row.code} className="hover:bg-[#F8FBFF] transition-colors">
                            <td className="px-4 py-2 text-[10px] font-bold text-[#4F7DF3]">{row.code}</td>
                            <td className="px-4 py-2 text-[10px] text-gray-700 font-semibold">{row.name}</td>
                            <td className="px-4 py-2 text-[10px] text-gray-500">{row.package}</td>
                            <td className="px-4 py-2 text-[10px] font-bold text-gray-700">{row.price}</td>
                            <td className="px-4 py-2"><StatusBadge status={row.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
