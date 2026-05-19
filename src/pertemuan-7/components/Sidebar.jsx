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
  <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">

    {/* HEADER */}
    <div className="px-6 pt-8 pb-6">

      <div className="flex items-center gap-3">

        <img
          src={logo}
          alt="logo"
          className="w-10 h-10 object-contain"
        />

        <div>

          <h1 className="text-3xl font-bold text-[#4F8FEF]">
            TravelGo.
          </h1>

        </div>

      </div>

    </div>


    {/* MENU */}
    <nav className="flex-1 overflow-y-auto px-4">

      <ul className="flex flex-col gap-2">

        {navItems.map((item) => (

          <li key={item.to}>

            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-[#6EA8FE] text-white shadow"
                    : "text-gray-400 hover:bg-gray-100"
                }`
              }
            >

              <span className="material-symbols-outlined">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.label}
              </span>

            </NavLink>

          </li>

        ))}

      </ul>

    </nav>


    {/* BAWAH */}
    <div className="px-4 pb-6">

      <div className="bg-[#EEF5FF] rounded-3xl p-4 text-center">

        <h2 className="font-bold text-sm text-gray-700 mb-3">
          Enhance Your Travelie Experience!
        </h2>

        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          className="rounded-2xl h-28 w-full object-cover"
        />

        <button className="bg-white mt-4 px-5 py-2 rounded-xl font-semibold shadow-sm">

          Upgrade Now

        </button>

      </div>


      <div className="mt-6 flex items-center gap-3 px-3 text-gray-400 hover:text-black cursor-pointer">

        <span className="material-symbols-outlined">
          logout
        </span>

        <span className="font-medium">
          Logout
        </span>

      </div>

    </div>

  </aside>
);
}