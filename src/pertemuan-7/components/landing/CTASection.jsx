import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section id="cta" className="py-16 md:py-20 bg-[#1D3557] overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#4F7DF3]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#4F7DF3]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 lg:px-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F7DF3]/20 border border-[#4F7DF3]/30 text-[#7BA8F7] text-[11px] font-bold tracking-[0.15em] uppercase mb-7">
          <span className="material-symbols-outlined text-[13px]">rocket_launch</span>
          Mulai Sekarang — Gratis
        </div>

        {/* Heading */}
        <h2 className="text-[32px] md:text-[44px] font-black text-white leading-tight mb-5">
          Siap Mengembangkan{" "}
          <span className="text-[#4F7DF3]">Bisnis Travel</span> Anda?
        </h2>

        {/* Description */}
        <p className="text-white/60 text-[15px] leading-relaxed max-w-xl mx-auto mb-10">
          Bergabunglah bersama 1000+ perusahaan travel yang sudah merasakan
          manfaat TravelGo CRM. Daftar gratis hari ini, tanpa perlu kartu kredit.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="h-12 px-8 rounded-2xl bg-[#4F7DF3] text-white font-bold flex items-center gap-2.5 shadow-lg shadow-[#4F7DF3]/30 hover:bg-[#3B6AE8] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-[14px]"
          >
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            Mulai Gratis
          </Link>

          <a
            href="mailto:hello@travelgo.com"
            className="h-12 px-8 rounded-2xl border-2 border-white/20 text-white font-bold flex items-center gap-2.5 hover:bg-white/10 hover:border-white/35 transition-all duration-300 text-[14px]"
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
            Hubungi Kami
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-white/35 text-[12px]">
          ✓ Gratis selamanya untuk paket dasar &nbsp;·&nbsp; ✓ Tidak perlu kartu kredit &nbsp;·&nbsp; ✓ Setup dalam 5 menit
        </p>
      </div>
    </section>
  );
}
