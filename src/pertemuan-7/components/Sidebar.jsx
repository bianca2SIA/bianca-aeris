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
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-stone-50 text-stone-900 border-r border-stone-200 flex flex-col">
      {/* HEADER */}
      <div className="px-8 py-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="text-2xl font-black text-[#C49C74]">TravelGo.</h1>
            <p className="text-sm text-stone-500 mt-1">Travel Agent</p>
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
                      ? "text-stone-900 bg-white border-l-4 border-[#C49C74] font-semibold"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`
                }
              >
                <span className="material-symbols-outlined text-[#C49C74]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* BAWAH (AUTO NEMPER KE BAWAH) */}
      <div className="px-6 pb-8 flex flex-col gap-4">
        <button className="bg-[#C49C74] text-white w-full py-3 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition">
          Create New Itinerary
        </button>

        <div className="border-t border-stone-200 pt-4 flex flex-col gap-2">
          <NavLink
            to="/"
            className="flex items-center gap-3 text-stone-500 py-2 px-2 hover:text-stone-900"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Account Settings</span>
          </NavLink>

          <NavLink
            to="/login"
            className="flex items-center gap-3 text-stone-500 py-2 px-2 hover:text-stone-900"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
