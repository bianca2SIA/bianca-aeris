import ScrollReveal from "./ScrollReveal";

/* ── Member Dashboard Sidebar ────────── */
const SIDEBAR_ITEMS = [
  { icon: "dashboard",     label: "Dashboard",      active: true  },
  { icon: "calendar_month",label: "Booking Saya",   active: false },
  { icon: "airplane_ticket",label: "Tiket Aktif",   active: false },
  { icon: "favorite",      label: "Wishlist",        active: false },
  { icon: "local_offer",   label: "Promo Member",   active: false },
  { icon: "account_circle",label: "Profil",          active: false },
];

/* ── Stat cards ─────────────────────── */
const MEMBER_STATS = [
  { label: "Booking Aktif",       value: "3",     icon: "calendar_month",  color: "#4F7DF3", bg: "#EEF4FF" },
  { label: "Perjalanan Selesai",  value: "12",    icon: "check_circle",    color: "#10B981", bg: "#ECFDF5" },
  { label: "Poin Reward",         value: "1.280", icon: "stars",           color: "#F59E0B", bg: "#FFFBEB" },
  { label: "Promo Tersedia",      value: "8",     icon: "local_offer",     color: "#EC4899", bg: "#FDF2F8" },
];

/* ── Upcoming trips ─────────────────── */
const UPCOMING = [
  { dest: "Bali Beach Escape",    date: "12 Jul 2026", days: "3D2N",  status: "Terkonfirmasi", color: "#4F7DF3", icon: "wb_sunny"   },
  { dest: "Lombok Eksotis",       date: "20 Agu 2026", days: "2D1N",  status: "Menunggu",      color: "#F59E0B", icon: "waves"      },
  { dest: "Bromo Sunrise Tour",   date: "05 Sep 2026", days: "2D1N",  status: "Terkonfirmasi", color: "#10B981", icon: "landscape"  },
];

/* ── Favorite destinations ──────────── */
const FAVORITES = [
  { name: "Bali",       icon: "wb_sunny",   color: "#4F7DF3" },
  { name: "Lombok",     icon: "waves",      color: "#10B981" },
  { name: "Bromo",      icon: "landscape",  color: "#F59E0B" },
  { name: "Labuan Bajo",icon: "water",      color: "#EC4899" },
];

/* ── Component ──────────────────────── */
export default function DashboardPreview() {
  return (
    <section id="member" className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
              Dashboard Member
            </p>
            <h2 className="text-[30px] md:text-[40px] font-black text-[#1D3557] leading-tight">
              Kelola{" "}
              <span className="text-[#4F7DF3]">Perjalanan Anda</span>
            </h2>
            <p className="mt-4 text-[#64748B] text-[15px] max-w-xl mx-auto leading-relaxed">
              Setelah login, pantau semua booking, tiket aktif, wishlist destinasi,
              dan promo eksklusif member langsung dari dashboard yang intuitif.
            </p>
          </div>
        </ScrollReveal>

        {/* Dashboard mockup */}
        <ScrollReveal delay={100}>
          <div className="rounded-2xl border border-[#E5E7EB] shadow-xl shadow-[#4F7DF3]/8 overflow-hidden">

            {/* Browser bar */}
            <div className="bg-[#F8FAFF] px-4 py-2.5 flex items-center gap-3 border-b border-[#E5E7EB]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-[11px] text-gray-400 border border-[#E5E7EB] font-medium max-w-xs mx-auto text-center">
                travelgo.com/member/dashboard
              </div>
            </div>

            {/* Body: sidebar + main */}
            <div className="flex min-h-[420px] bg-[#F4F5F7]">

              {/* ── Sidebar ── */}
              <aside className="w-52 bg-[#1D3557] flex-shrink-0 flex flex-col py-5 px-3 hidden md:flex">
                {/* User info */}
                <div className="flex items-center gap-2.5 px-2 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#4F7DF3] flex items-center justify-center text-white font-black text-[14px] flex-shrink-0">B</div>
                  <div>
                    <p className="text-[12px] font-bold text-white leading-none">Bianca Bahi</p>
                    <p className="text-[10px] text-white/40 mt-0.5">Gold Member ⭐</p>
                  </div>
                </div>

                {/* Nav items */}
                <nav className="flex flex-col gap-1">
                  {SIDEBAR_ITEMS.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${
                        item.active
                          ? "bg-[#4F7DF3] text-white"
                          : "text-white/45 hover:text-white hover:bg-white/8"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                      <span className="text-[12px] font-semibold">{item.label}</span>
                    </div>
                  ))}
                </nav>

                {/* Member badge */}
                <div className="mt-auto mx-2 p-3 rounded-xl bg-[#4F7DF3]/15 border border-[#4F7DF3]/20">
                  <p className="text-[10px] text-[#4F7DF3] font-bold mb-0.5">Poin Reward</p>
                  <p className="text-[18px] font-black text-white">1.280</p>
                  <p className="text-[9px] text-white/40">Tukar dengan diskon</p>
                </div>
              </aside>

              {/* ── Main content ── */}
              <main className="flex-1 p-4 space-y-4">
                {/* Welcome bar */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#1D3557]">Selamat datang, Bianca! 👋</h3>
                    <p className="text-[11px] text-[#64748B]">Perjalananmu berikutnya sudah menunggu</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EEF4FF] border border-[#4F7DF3]/15">
                    <span className="material-symbols-outlined text-[#4F7DF3] text-[14px]">stars</span>
                    <span className="text-[11px] font-bold text-[#4F7DF3]">Gold Member</span>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {MEMBER_STATS.map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-3 border border-[#E5E7EB] shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                          <span className="material-symbols-outlined text-[14px]" style={{ color: s.color }}>{s.icon}</span>
                        </div>
                      </div>
                      <p className="text-[9px] text-gray-400 font-semibold">{s.label}</p>
                      <p className="text-[16px] font-black" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Two column: upcoming + favorites */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

                  {/* Upcoming trips */}
                  <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                    <div className="px-3 py-2.5 border-b border-[#F1F5F9] flex items-center justify-between">
                      <p className="text-[11px] font-bold text-[#1D3557]">Perjalanan Mendatang</p>
                      <span className="text-[9px] text-[#4F7DF3] font-semibold">Lihat Semua</span>
                    </div>
                    <div className="divide-y divide-[#F8FAFF]">
                      {UPCOMING.map((trip) => (
                        <div key={trip.dest} className="flex items-center gap-3 px-3 py-2.5">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${trip.color}15` }}>
                            <span className="material-symbols-outlined text-[15px]" style={{ color: trip.color }}>{trip.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-[#1D3557] truncate">{trip.dest}</p>
                            <p className="text-[9px] text-gray-400">{trip.date} · {trip.days}</p>
                          </div>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                            trip.status === "Menunggu" ? "bg-yellow-50 text-yellow-600" : "bg-[#EEF4FF] text-[#4F7DF3]"
                          }`}>
                            {trip.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Favorite destinations */}
                  <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                    <div className="px-3 py-2.5 border-b border-[#F1F5F9]">
                      <p className="text-[11px] font-bold text-[#1D3557]">Destinasi Favoritku</p>
                    </div>
                    <div className="p-3 grid grid-cols-2 gap-2">
                      {FAVORITES.map((fav) => (
                        <div key={fav.name} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F8FAFF] border border-[#E5E7EB]">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${fav.color}15` }}>
                            <span className="material-symbols-outlined text-[13px]" style={{ color: fav.color }}>{fav.icon}</span>
                          </div>
                          <p className="text-[10px] font-bold text-[#1D3557]">{fav.name}</p>
                          <span className="material-symbols-outlined text-[12px] text-red-400 ml-auto">favorite</span>
                        </div>
                      ))}
                    </div>
                    {/* Active promo */}
                    <div className="mx-3 mb-3 p-2.5 rounded-lg bg-gradient-to-r from-[#4F7DF3] to-[#3B6AE8] flex items-center gap-2">
                      <span className="material-symbols-outlined text-white text-[14px]">local_offer</span>
                      <div>
                        <p className="text-[9px] font-black text-white">Promo Gold Member aktif!</p>
                        <p className="text-[8px] text-white/70">Diskon 10% untuk semua paket</p>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
