import PageHeader from "../components/PageHeader";

const stats = [
  {
    label: "Total Bookings",
    value: "1,284",
    icon: "confirmation_number",
    trend: "+12%",
  },
  {
    label: "Active Itineraries",
    value: "842",
    icon: "flight_takeoff",
    trend: "+8%",
  },
  {
    label: "Pending Approvals",
    value: "24",
    icon: "pending_actions",
    trend: "-2%",
  },
  {
    label: "Total Revenue",
    value: "$428.5k",
    icon: "account_balance_wallet",
    trend: "+24%",
  },
];

const bookings = [
  {
    title: "Maldives Overwater Villa",
    client: "Eleanor Vane",
    price: "$12,400",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    title: "Parisian Boutique Retreat",
    client: "Marcus Thorne",
    price: "$8,950",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

export default function Dashboard() {
  return (
    <div className="flex-1 bg-white min-h-screen overflow-y-auto">
      <div className="p-8">
        <div className="w-full flex flex-col gap-10">
          {/* HEADER */}
          <PageHeader
            title="Dashboard Overview"
            breadcrumb="TravelGo."
            actions={
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-100">
                  <span className="material-symbols-outlined text-[18px]">
                    download
                  </span>
                  Export Report
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-[#3689CC] hover:bg-[#2f78b5] text-white rounded-lg text-sm shadow hover:shadow-md">
                  <span className="material-symbols-outlined text-[18px]">
                    add
                  </span>
                  New Booking
                </button>
              </>
            }
          />

          {/* CARD */}
          {/* CARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-white  border border-[#BAC4CB]/40 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs uppercase text-[#BAC4CB] tracking-wider">
                      {item.label}
                    </p>
                    <h3 className="text-3xl font-semibold mt-2 text-[#0D0B14]">
                      {item.value}
                    </h3>
                  </div>

                  <div className="bg-[#94B3CC]/20 p-3 rounded-xl">
                    <span className="material-symbols-outlined text-[#3689CC]">
                      {item.icon}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-sm flex gap-2">
                  <span className="text-[#3689CC] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      trending_up
                    </span>
                    {item.trend}
                  </span>
                  <span className="text-[#BAC4CB]">vs last month</span>
                </div>
              </div>
            ))}
          </div>
          {/* TOP CONTENT */}
          <div className="grid grid-cols-12 gap-6">
            {/* REVENUE */}
            <div className="col-span-5 bg-white border border-[#BAC4CB]/30 rounded-3xl p-5 h-[290px] shadow-sm transition-all duration-500 hover:shadow-[0_15px_35px_rgba(54,137,204,0.18)] hover:-translate-y-2 hover:border-[#6EA8FE] cursor-pointer">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Revenue Overview</h3>

                <button className="bg-[#6EA8FE] text-white px-4 py-1 rounded-lg text-sm">
                  Weekly
                </button>
              </div>

              <div className="relative h-[200px]">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border-t border-[#EEF1F5]"></div>
                  ))}
                </div>

                <div className="absolute top-5 left-[52%] bg-[#F5F8FC] px-3 py-2 rounded-xl shadow z-20">
                  <h4 className="font-semibold text-sm">$635</h4>

                  <p className="text-xs text-[#BAC4CB]">12 Jul 28</p>
                </div>

                <div className="absolute h-[110px] border-l border-dashed border-[#6EA8FE] left-[54%] top-[45px]"></div>

                <svg
                  viewBox="0 0 400 160"
                  className="w-full h-full relative z-10"
                >
                  <path
                    d="M0,120 C50,140 80,60 120,110
C170,180 220,10 260,70
C320,150 340,70 400,90"
                    fill="none"
                    stroke="#6EA8FE"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            </div>

            {/* DONUT */}
            <div className="col-span-4 bg-white border border-[#BAC4CB]/30 rounded-3xl p-5 h-[290px] shadow-sm transition-all duration-500 hover:shadow-[0_15px_35px_rgba(54,137,204,0.18)] hover:-translate-y-2 hover:border-[#6EA8FE] cursor-pointer">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Top Destinations</h3>

                <button className="bg-[#6EA8FE] text-white px-4 py-1 rounded-lg text-sm">
                  This Month
                </button>
              </div>

              <div className="flex items-center gap-5 h-[190px]">
                <div
                  className="
w-36
h-36
rounded-full
border-[18px]
border-[#6EA8FE]
border-r-[#DCEAFF]
border-b-[#BCD8FF]
shrink-0
"
                ></div>

                <div className="space-y-3 text-sm">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 bg-[#6EA8FE] rounded-full"></div>
                    Tokyo, Japan (35%)
                  </div>

                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 bg-[#8CB9FF] rounded-full"></div>
                    Sydney (28%)
                  </div>

                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 bg-[#BCD8FF] rounded-full"></div>
                    Paris (22%)
                  </div>

                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 bg-[#DCEAFF] rounded-full"></div>
                    Venice (15%)
                  </div>
                </div>
              </div>
            </div>

            {/* KANAN */}
            {/* KANAN */}
            <div className="col-span-3">
              <div className="bg-white border border-[#BAC4CB]/30 rounded-3xl p-6 h-full shadow-sm transition-all duration-500 hover:shadow-[0_15px_35px_rgba(54,137,204,0.18)] hover:-translate-y-2 hover:border-[#6EA8FE] cursor-pointer">
                {/* HEADER KALENDER */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-xl text-[#0D0B14]">
                    July 2028
                  </h3>

                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg bg-[#F4F7FB]">
                      ←
                    </button>

                    <button className="w-8 h-8 rounded-lg bg-[#F4F7FB]">
                      →
                    </button>
                  </div>
                </div>

                {/* HARI */}
                <div className="grid grid-cols-7 text-center text-xs text-[#BAC4CB] mb-4">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* TANGGAL */}
                <div className="grid grid-cols-7 gap-y-4 text-center text-[#0D0B14]">
                  {[
                    25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
                    27, 28, 29,
                  ].map((day, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 mx-auto flex items-center justify-center rounded-lg
          ${day === 12 || day === 19 ? "bg-[#6EA8FE] text-white" : ""}`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="border-t my-8"></div>

                {/* UPCOMING */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-xl">Upcoming Trips</h3>

                  <button className="w-10 h-10 bg-[#6EA8FE] rounded-xl text-white">
                    +
                  </button>
                </div>

                {/* ITEM */}
                <div className="space-y-4">
                  <div className="flex gap-3 bg-[#F6F8FC] rounded-2xl p-3">
                  <img
  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80"
  className="w-16 h-16 rounded-xl object-cover"
  alt="Paris"
/>

                    <div>
                      <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                        Romantic Gateway
                      </span>

                      <h4 className="font-semibold mt-2">Paris, France</h4>

                      <p className="text-xs text-[#BAC4CB]">5–10 July</p>
                    </div>
                  </div>

                  <div className="flex gap-3 bg-[#EEF5FF] rounded-2xl p-3">
                   <img
  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&q=80"
  className="w-16 h-16 rounded-xl object-cover"
  alt="Tokyo"
/>

                    <div>
                      <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                        Cultural Exploration
                      </span>

                      <h4 className="font-semibold mt-2">Tokyo, Japan</h4>

                      <p className="text-xs text-[#BAC4CB]">12–19 July</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT (TABLE) */}
            <div className="lg:col-span-2 bg-white border  border-[#BAC4CB]/40 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex justify-between items-center p-6 border-b border border-[#BAC4CB]/40">
                <h3 className="text-xl font-semibold text-[#0D0B14]">
                  Recent Premium Bookings
                </h3>
                <button className="text-[#3689CC] text-sm">View All</button>
              </div>

              <div className="p-6 flex flex-col gap-4">
                {bookings.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 rounded-xl hover:bg-[#94B3CC]/10 transition"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div>
                        <h4 className="font-semibold text-[#0D0B14]">
                          {item.title}
                        </h4>
                        <p className="text-sm text-[#BAC4CB]">
                          Client: {item.client}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-[#0D0B14]">
                        {item.price}
                      </p>
                      <span className="text-xs bg-[#94B3CC]/20 text-[#3689CC] px-2 py-1 rounded-full">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="bg-[#3689CC] text-white p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2">
                  Ready for the season?
                </h3>

                <p className="text-sm mb-6 opacity-90">
                  You have 12 upcoming luxury itineraries starting this week.
                </p>
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <button className="bg-white text-[#3689CC] py-3 rounded-lg font-semibold">
                  Review Itineraries
                </button>

                <button className="border border-white py-3 rounded-lg">
                  Message Clients
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
