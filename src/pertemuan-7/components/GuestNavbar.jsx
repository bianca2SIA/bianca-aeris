import { Link } from "react-router-dom";

export default function GuestNavbar() {
  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Destinations", href: "#destinations" },
    { label: "Packages", href: "#packages" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#071C3D]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[78px] flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2FD6E8] to-[#5D8CFF] flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-[25px]">
              flight_takeoff
            </span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white">
            Travel<span className="text-[#2FD6E8]">Go</span>
          </h1>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-white/80 hover:text-[#2FD6E8] transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:flex items-center gap-2 h-11 px-5 rounded-full border border-white/20 text-white text-sm font-bold hover:bg-white/10 transition"
          >
            <span className="material-symbols-outlined text-[19px]">
              account_circle
            </span>
            Login
          </Link>

          <Link
            to="/register"
            className="h-11 px-5 rounded-full bg-gradient-to-r from-[#2FD6E8] to-[#5D8CFF] text-white text-sm font-bold flex items-center justify-center shadow-lg hover:scale-105 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
