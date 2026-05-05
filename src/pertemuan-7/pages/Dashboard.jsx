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
