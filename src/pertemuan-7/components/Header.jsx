import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/") return "Dashboard";

    if (path === "/paket") return "Packages";
    if (path.startsWith("/paket/")) return "Package Details";

    if (path === "/booking") return "Bookings";
    if (path.startsWith("/booking/")) return "Booking Details";

    if (path === "/calendar") return "Calendar";
    if (path === "/travelers") return "Travelers";
    if (path === "/guides") return "Guides";
    if (path === "/gallery") return "Gallery";
    if (path === "/messages") return "Messages";
    if (path === "/deals") return "Deals";
    if (path === "/feedback") return "Feedback";
    if (path === "/users") return "Users";

    return "Dashboard";
  };

  const pageTitle = getPageTitle();

  useEffect(() => {
    document.title = `${pageTitle} - TravelGo.`;
  }, [pageTitle]);

  return (
    <header className="fixed top-0 left-[230px] right-0 z-40 h-[76px] bg-white border-b border-[#EEF1F5] px-8">
      <div className="h-full flex items-center justify-between">
        {/* KIRI */}
        <h1 className="text-[20px] font-bold text-[#1E293B]">{pageTitle}</h1>

        {/* KANAN */}
        <div className="flex items-center gap-7">
          {/* SEARCH */}
          <div className="relative">
            <span
              className="
                material-symbols-outlined
                absolute
                left-4
                top-[75%]
                -translate-y-1/2
                text-[#B8C0CC]
                text-[22px]
              "
            >
              search
            </span>

            <input
              type="text"
              placeholder="Search anything"
              className="
               w-[180px] xl:w-[260px]
                h-[46px]
                bg-[#FAFBFC]
                border
                border-[#E9EDF2]
                rounded-xl
                pl-12
                pr-4
                text-[14px]
                text-[#596070]
                placeholder:text-[#9AA6B2]
                outline-none
                focus:border-[#6EA8FE]
                focus:shadow-sm
                transition-all
                duration-300
              "
            />
          </div>

          {/* NOTIFICATION */}
          <button className="relative w-[42px] h-[42px] rounded-xl flex items-center justify-center hover:bg-[#F4F7FA] transition">
            <span className="material-symbols-outlined text-[24px] text-[#B8C0CC] hover:text-[#6EA8FE]">
              notifications
            </span>

            <span className="absolute top-[9px] right-[9px] h-[8px] w-[8px] rounded-full bg-[#F19999]"></span>
          </button>

          <div className="h-10 border-r border-[#EEF2F6]"></div>

          {/* PROFILE */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Admin"
              className="w-11 h-11 rounded-xl object-cover border border-[#EEF2F6]"
            />

            <div>
              <h3 className="text-[15px] font-semibold text-[#222] group-hover:text-[#6EA8FE] transition">
                Bianca Bahi
              </h3>

              <p className="text-[13px] text-[#AAB2BF]">Admin</p>
            </div>

            <span className="material-symbols-outlined text-[#BAC4CB] group-hover:text-[#6EA8FE] transition">
              keyboard_arrow_down
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
