import ScrollReveal from "./ScrollReveal";

/* ── Admin CRM features — compact 6 chip ── */
const ADMIN_FEATURES = [
  { icon: "calendar_month", label: "Kelola Booking"     },
  { icon: "group",          label: "Manajemen Customer" },
  { icon: "card_travel",    label: "Paket Wisata"       },
  { icon: "local_offer",    label: "Manajemen Promo"    },
  { icon: "bar_chart",      label: "Laporan & Analitik" },
  { icon: "support_agent",  label: "Customer Support"   },
];

export default function AdminPreviewSection() {
  return (
    <section
      id="admin"
      className="py-10 md:py-12 bg-[#1D3557]"
      aria-label="Sistem CRM TravelGo"
    >
      <div className="max-w-5xl mx-auto px-5 lg:px-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            {/* Left: Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-[#4F7DF3]/70 text-[10px] font-bold tracking-[0.15em] uppercase mb-3">
                <span className="material-symbols-outlined text-[12px]">admin_panel_settings</span>
                Sistem Internal
              </div>

              <h3 className="text-[18px] md:text-[20px] font-black text-white leading-tight mb-3">
                CRM{" "}
                <span className="text-[#4F7DF3]">di Balik Layar</span>
              </h3>

              <p className="text-white/55 text-[13px] leading-relaxed max-w-xs mx-auto md:mx-0">
                Tim TravelGo menggunakan sistem CRM untuk mengelola booking,
                customer, promo, paket wisata, dan layanan pelanggan — semua
                dalam satu platform terintegrasi.
              </p>
            </div>

            {/* Right: Feature chips — 2×3 grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 flex-shrink-0 w-full md:w-auto">
              {ADMIN_FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/6 border border-white/10"
                >
                  <span className="material-symbols-outlined text-[#4F7DF3] text-[15px] flex-shrink-0">
                    {f.icon}
                  </span>
                  <span className="text-[11px] text-white/65 font-medium whitespace-nowrap">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
