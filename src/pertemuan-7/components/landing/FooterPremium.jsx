import { Link } from "react-router-dom";

const FOOTER_COLS = [
  {
    title: "Destinasi",
    links: [
      { label: "Bali",        href: "#destinasi" },
      { label: "Lombok",      href: "#destinasi" },
      { label: "Bromo",       href: "#destinasi" },
      { label: "Raja Ampat",  href: "#destinasi" },
      { label: "Yogyakarta",  href: "#destinasi" },
      { label: "Labuan Bajo", href: "#destinasi" },
    ],
  },
  {
    title: "Paket Wisata",
    links: [
      { label: "Best Seller",  href: "#paket" },
      { label: "Paket Pantai", href: "#paket" },
      { label: "Paket Gunung", href: "#paket" },
      { label: "Paket Family", href: "#paket" },
      { label: "Honeymoon",    href: "#paket" },
      { label: "Promo Hari Ini", href: "#promo" },
    ],
  },
  {
    title: "Tentang",
    links: [
      { label: "Tentang TravelGo", href: "#" },
      { label: "Cara Booking",     href: "#" },
      { label: "FAQ",              href: "#faq" },
      { label: "Hubungi Kami",     href: "#contact" },
      { label: "Login",            href: "/login",    isRoute: true },
      { label: "Daftar Member",    href: "/register", isRoute: true },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: "mail",  label: "Email",    href: "mailto:hello@travelgo.com" },
  { icon: "phone", label: "WhatsApp", href: "https://wa.me/6270688805620" },
  { icon: "open_in_new", label: "Website", href: "#" },
];

const scrollTo = (href) => {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
};

export default function FooterPremium() {
  return (
    <footer className="bg-[#1D3557] text-white" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* ── Main grid ── */}
        <div className="pt-12 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Col 1: Company */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#4F7DF3] flex items-center justify-center shadow-md flex-shrink-0">
                <span className="material-symbols-outlined text-white text-[18px]">flight_takeoff</span>
              </div>
              <span className="text-[20px] font-black tracking-tight">
                Travel<span className="text-[#4F7DF3]">Go</span>
              </span>
            </div>

            <p className="text-white/45 text-[12px] leading-relaxed max-w-[220px] mb-4">
              Partner liburan terpercaya untuk menemukan destinasi impian dan
              memesan paket wisata terbaik di Indonesia.
            </p>

            {/* Contact info */}
            <div className="space-y-1.5 mb-4">
              {[
                { icon: "location_on", text: "Pekanbaru, Riau 28265" },
                { icon: "mail",        text: "hello@travelgo.com" },
                { icon: "phone",       text: "+62 706 888 0562" },
              ].map(c => (
                <div key={c.text} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4F7DF3] text-[13px] flex-shrink-0">{c.icon}</span>
                  <span className="text-white/45 text-[11px]">{c.text}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-xl bg-white/8 hover:bg-[#4F7DF3] flex items-center justify-center transition-all duration-200 group"
                >
                  <span className="material-symbols-outlined text-[14px] text-white/50 group-hover:text-white transition-colors">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Cols 2–4: Links */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <p className="text-[10px] font-black tracking-[0.15em] uppercase text-white/35 mb-4">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-[12px] text-white/50 hover:text-white font-medium transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : link.href.startsWith("#") ? (
                      <button
                        type="button"
                        onClick={() => scrollTo(link.href)}
                        className="text-[12px] text-white/50 hover:text-white font-medium transition-colors duration-200 text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} className="text-[12px] text-white/50 hover:text-white font-medium transition-colors duration-200">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-4 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/25 text-[11px]">
          <p>© 2026 TravelGo · Partner Liburan Terpercaya</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white/50 cursor-default transition-colors">Kebijakan Privasi</span>
            <span className="hover:text-white/50 cursor-default transition-colors">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
