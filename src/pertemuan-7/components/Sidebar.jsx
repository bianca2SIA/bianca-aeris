import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  { to: "/", label: "Dashboard", icon: "dashboard" },
  { to: "/paket", label: "Packages", icon: "card_travel" },
  { to: "/booking", label: "Bookings", icon: "check_box" },
  { to: "/calendar", label: "Calendar", icon: "calendar_month" },
  { to: "/travelers", label: "Travelers", icon: "work" },
  { to: "/guides", label: "Guides", icon: "explore" },
  { to: "/gallery", label: "Gallery", icon: "photo_library" },
  { to: "/messages", label: "Messages", icon: "chat_bubble", badge: "7" },
  { to: "/deals", label: "Deals", icon: "local_offer" },
  { to: "/feedback", label: "Feedback", icon: "thumb_up" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    sessionStorage.clear();

    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-[230px] bg-white border-r border-[#E7EAF0] flex flex-col justify-between overflow-hidden">
      {/* ATAS */}
      <div>
        {/* LOGO */}
        <div className="px-7 pt-9 pb-7">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="TravelGo Logo"
              className="w-[26px] h-[26px] object-contain"
            />

            <h1 className="text-[22px] font-bold text-[#202436] tracking-[-0.5px]">
              TravelGo.
            </h1>
          </div>
        </div>

        {/* MENU */}
        <nav className="px-5">
          <ul className="flex flex-col gap-[8px]">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `h-[46px] px-4 rounded-[8px] flex items-center gap-4 transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#75A9F8] text-white shadow-sm"
                        : "text-[#9AA0AA] hover:bg-[#F3F7FF] hover:text-[#75A9F8]"
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-[21px] leading-none">
                    {item.icon}
                  </span>

                  <span className="text-[15px] font-semibold flex-1">
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className="w-[20px] h-[20px] rounded-[6px] bg-[#75A9F8] text-white text-[11px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* BAWAH */}
      <div className="px-5 pb-8">
       
        

        {/* LOGOUT */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full h-[46px] flex items-center gap-4 px-4 rounded-[8px] text-[#9AA0AA] hover:bg-[#FFF1F1] hover:text-[#F06C7A] transition-all duration-300"
        >
          <span className="material-symbols-outlined text-[22px]">
            logout
          </span>

          <span className="text-[15px] font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}