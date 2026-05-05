export default function Header({ NavOpen, IsNavOpen }) {
  return (
    <header className="sticky top-0 z-40 border-b  border-[#BAC4CB]/40 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between gap-4 px-8 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-4 flex-1">
          <button
            type="button"
            onClick={() => IsNavOpen(!NavOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-[#BAC4CB] bg-white p-2 text-[#BAC4CB] shadow-sm transition hover:bg-[#94B3CC]/20"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* SEARCH */}
          <div className="hidden md:flex items-center relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 text-[#BAC4CB]">
              search
            </span>
            <input
              type="text"
              className="w-full rounded-xl border border-[#BAC4CB] bg-white py-2 pl-10 pr-4 text-sm text-[#0D0B14] focus:border-[#3689CC] focus:outline-none focus:ring-1 focus:ring-[#3689CC]"
              placeholder="Search itineraries, bookings..."
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* NOTIF */}
          <button className="relative rounded-full p-2 text-[#BAC4CB] hover:text-[#0D0B14] hover:bg-[#94B3CC]/20 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#CB8A8E]" />
          </button>

          {/* SETTINGS */}
          <button className="rounded-full p-2 text-[#BAC4CB] hover:text-[#0D0B14] hover:bg-[#94B3CC]/20 transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>

          {/* SUPPORT */}
          <button className="hidden md:flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#BAC4CB] hover:text-[#0D0B14] transition-colors">
            Support
          </button>

          {/* PROFILE */}
          <div className="flex items-center gap-3 border-l border-[#BAC4CB] pl-6">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
              alt="Travel Admin Profile"
              className="h-10 w-10 rounded-full object-cover border border-[#BAC4CB]"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-[#0D0B14]">Admin User</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
