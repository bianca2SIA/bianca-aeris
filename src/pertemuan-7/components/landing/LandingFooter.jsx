export default function LandingFooter() {
  return (
    <footer className="bg-[#1D3557] text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10">

        {/* ── Main row ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">

          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#4F7DF3] flex items-center justify-center shadow-md flex-shrink-0">
                <span className="material-symbols-outlined text-white text-[18px]">
                  flight_takeoff
                </span>
              </div>
              <span className="text-[20px] font-black tracking-tight">
                Travel<span className="text-[#4F7DF3]">Go</span>{" "}
                <span className="text-white/60 font-semibold text-[16px]">CRM</span>
              </span>
            </div>
            <p className="text-white/45 text-[13px] max-w-[260px] leading-relaxed">
              Platform CRM modern untuk bisnis travel yang lebih efisien dan terorganisir.
            </p>
          </div>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:hello@travelgo.com"
              className="flex items-center gap-2.5 text-white/65 hover:text-white transition-colors duration-200 group"
            >
              <div className="w-8 h-8 rounded-xl bg-white/8 group-hover:bg-[#4F7DF3]/25 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                <span className="material-symbols-outlined text-[16px]">mail</span>
              </div>
              <span className="text-[13px] font-semibold">hello@travelgo.com</span>
            </a>

            <a
              href="https://wa.me/6270688805620"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-white/65 hover:text-white transition-colors duration-200 group"
            >
              <div className="w-8 h-8 rounded-xl bg-white/8 group-hover:bg-[#4F7DF3]/25 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                <span className="material-symbols-outlined text-[16px]">phone</span>
              </div>
              <span className="text-[13px] font-semibold">+62 706 888 0562</span>
            </a>
          </div>
        </div>

        {/* ── Divider + copyright ── */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/35 text-[11px]">
          <p>© 2026 TravelGo CRM. All rights reserved.</p>
          <p>Dibuat untuk bisnis travel yang lebih modern.</p>
        </div>

      </div>
    </footer>
  );
}
