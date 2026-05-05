import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  { to: "/", label: "Dashboard", icon: "dashboard" },
  { to: "/paket", label: "Packages", icon: "travel_explore" },
  { to: "/booking", label: "Bookings", icon: "confirmation_number" },
  { to: "/user", label: "Users", icon: "group" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-white text-[#0D0B14] border-r  border-[#BAC4CB]/40 flex flex-col">

      {/* HEADER */}
      <div className="px-8 py-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
          <div>
            <h1 className="text-2xl font-black text-[#3689CC]">
              TravelGo.
            </h1>
            <p className="text-sm text-[#BAC4CB] mt-1">
              Travel Agent
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3 px-6 transition-all duration-300 ${
                    isActive
                      ? "text-[#0D0B14] bg-[#94B3CC]/20 border-l-4 border-[#3689CC] font-semibold"
                      : "text-[#BAC4CB] hover:text-[#0D0B14] hover:bg-[#94B3CC]/10"
                  }`
                }
              >
                <span className="material-symbols-outlined text-[#3689CC]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* BAWAH */}
      <div className="px-6 pb-8 flex flex-col gap-4">

        <button className="bg-[#3689CC] text-white w-full py-3 rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 transition">
          Create New Itinerary
        </button>

        <div className="border-t border-[#BAC4CB] pt-4 flex flex-col gap-2">

          <NavLink
            to="/"
            className="flex items-center gap-3 text-[#BAC4CB] py-2 px-2 hover:text-[#0D0B14]"
          >
            <span className="material-symbols-outlined">
              settings
            </span>
            <span className="text-sm font-medium">
              Account Settings
            </span>
          </NavLink>

          <NavLink
            to="/login"
            className="flex items-center gap-3 text-[#BAC4CB] py-2 px-2 hover:text-[#0D0B14]"
          >
            <span className="material-symbols-outlined">
              logout
            </span>
            <span className="text-sm font-medium">
              Logout
            </span>
          </NavLink>

        </div>
      </div>

    </aside>
  );
}