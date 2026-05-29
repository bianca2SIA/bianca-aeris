import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const titles = {
    "/": "Dashboard",
    "/paket": "Packages",
    "/booking": "Bookings",
    "/user": "Travelers",
    "/paket/1": "Package Details",
  };

  const pageTitle = titles[location.pathname] || "Dashboard";

  return (
    <header className="fixed top-0 left-[230px] right-0 z-40 bg-white border-b border-[#EEF1F5] h-[76px] px-8">
      <div className="h-full flex items-center justify-between">
        {/* KIRI */}
        <h1 className="text-[20px] font-bold text-[#1E293B]">
          {pageTitle}
        </h1>

        {/* KANAN */}
        <div className="flex items-center gap-7">
          {/* SEARCH */}
          <div className="relative">
            <span
              className="
                material-symbols-outlined
                absolute
                left-4
                top-[80%]
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
                w-[260px]
                h-[46px]
                bg-[#FAFBFC]
                border
                border-[#E9EDF2]
                rounded-xl
                pl-12
                pr-4
                text-[14px]
                text-[#9AA6B2]
                outline-none
                focus:border-[#6EA8FE]
                transition
              "
            />
          </div>

          {/* NOTIF */}
          <button className="relative">
            <span className="material-symbols-outlined text-[24px] text-[#B8C0CC] hover:text-[#6EA8FE]">
              notifications
            </span>

            <span className="absolute top-[2px] right-[2px] h-[8px] w-[8px] rounded-full bg-[#F19999]"></span>
          </button>

          <div className="h-10 border-r border-[#EEF2F6]"></div>

          {/* PROFILE */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Admin"
              className="w-11 h-11 rounded-xl object-cover border border-[#EEF2F6]"
            />

            <div>
              <h3 className="text-[15px] font-semibold text-[#222]">
                Bianca Bahi
              </h3>

              <p className="text-[13px] text-[#AAB2BF]">Admin</p>
            </div>

            <span className="material-symbols-outlined text-[#BAC4CB]">
              keyboard_arrow_down
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}