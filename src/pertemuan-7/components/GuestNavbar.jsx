import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home",        href: "#home"         },
  { label: "Destinasi",   href: "#destinasi"    },
  { label: "Paket Wisata",href: "#paket"        },
  { label: "Promo",       href: "#promo"        },
  { label: "Testimoni",   href: "#testimonials" },
  { label: "Kontak",      href: "#contact"      },
];

const SECTION_IDS = [
  "home", "search", "destinasi", "paket", "promo",
  "why", "member", "admin", "testimonials", "faq", "contact", "cta",
];

export default function GuestNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleOutside = (e) => {
      if (!e.target.closest("#guest-navbar")) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isMenuOpen]);

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    const id = href.replace("#", "");
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const isNavActive = (href) => {
    const id = href.replace("#", "");
    if (id === "home")         return ["home", "search"].includes(activeSection);
    if (id === "destinasi")    return ["destinasi"].includes(activeSection);
    if (id === "paket")        return ["paket"].includes(activeSection);
    if (id === "promo")        return ["promo", "why"].includes(activeSection);
    if (id === "testimonials") return ["member", "admin", "testimonials", "faq"].includes(activeSection);
    if (id === "contact")      return ["contact", "cta"].includes(activeSection);
    return false;
  };

  return (
    <header
      id="guest-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1D3557] shadow-lg shadow-black/15 border-b border-white/8"
          : "bg-[#1D3557]/90 backdrop-blur-md border-b border-white/10"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-[68px] flex items-center justify-between">
        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
          className="flex items-center gap-2.5 flex-shrink-0 group"
          aria-label="TravelGo — Kembali ke beranda"
        >
          <div className="w-9 h-9 rounded-xl bg-[#4F7DF3] flex items-center justify-center shadow-md group-hover:bg-[#3B6AE8] transition-colors duration-200">
            <span className="material-symbols-outlined text-white text-[20px]" aria-hidden="true">flight_takeoff</span>
          </div>
          <span className="text-[20px] font-black tracking-tight text-white">
            Travel<span className="text-[#4F7DF3]">Go</span>
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(item.href);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active ? "text-white bg-white/10" : "text-white/65 hover:text-white hover:bg-white/8"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#4F7DF3]" aria-hidden="true" />}
              </a>
            );
          })}
        </nav>

        {/* DESKTOP CTA */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Link to="/login" className="h-9 px-5 rounded-xl border border-white/20 text-white/80 text-sm font-semibold hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">account_circle</span>
            Login
          </Link>
          <Link to="/register" className="h-9 px-5 rounded-xl bg-[#4F7DF3] text-white text-sm font-bold flex items-center gap-1.5 shadow-md shadow-[#4F7DF3]/25 hover:bg-[#3B6AE8] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
            Daftar Member
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>

        {/* MOBILE */}
        <div className="flex lg:hidden items-center gap-2">
          <Link to="/login" className="h-8 px-3.5 rounded-lg border border-white/20 text-white text-xs font-semibold hover:bg-white/10 transition flex items-center">
            Login
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((p) => !p)}
            className="w-9 h-9 rounded-xl border border-white/20 flex flex-col items-center justify-center gap-[5px] hover:bg-white/10 transition-all"
          >
            <span className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`} aria-hidden="true" />
            <span className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0 w-0" : "w-3.5"}`} aria-hidden="true" />
            <span className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="bg-[#1B2F4A] border-t border-white/8 px-5 py-4 flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              className="h-10 px-4 rounded-xl text-white/75 font-semibold text-sm flex items-center hover:bg-white/8 hover:text-white transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
          <div className="h-px bg-white/10 my-1" aria-hidden="true" />
          <Link
            to="/register"
            onClick={() => setIsMenuOpen(false)}
            className="h-10 rounded-xl bg-[#4F7DF3] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#3B6AE8] transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">flight_takeoff</span>
            Daftar Member Sekarang
          </Link>
        </div>
      </div>
    </header>
  );
}
