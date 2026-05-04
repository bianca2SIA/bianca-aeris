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
    <div className="flex-1 bg-[#f9f9f9] min-h-screen overflow-y-auto">
      <div className="p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
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

                <button className="flex items-center gap-2 px-4 py-2 bg-[#C49C74] text-white rounded-lg text-sm shadow hover:shadow-md">
                  <span className="material-symbols-outlined text-[18px]">
                    add
                  </span>
                  New Booking
                </button>
              </>
            }
          />

          {/* CARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs uppercase text-stone-500 tracking-wider">
                      {item.label}
                    </p>
                    <h3 className="text-3xl font-semibold mt-2">
                      {item.value}
                    </h3>
                  </div>

                  <div className="bg-[#F2F0EC] p-3 rounded-xl">
                    <span className="material-symbols-outlined text-[#C49C74]">
                      {item.icon}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-sm flex gap-2">
                  <span className="text-green-600 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      trending_up
                    </span>
                    {item.trend}
                  </span>
                  <span className="text-stone-500">vs last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT (TABLE) */}
            <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-semibold">
                  Recent Premium Bookings
                </h3>
                <button className="text-[#C49C74] text-sm">View All</button>
              </div>

              <div className="p-6 flex flex-col gap-4">
                {bookings.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-500">
                          Client: {item.client}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">{item.price}</p>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="bg-[#795835] text-white p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C49C74]/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2">
                  Ready for the season?
                </h3>

                <p className="text-sm mb-6 opacity-90">
                  You have 12 upcoming luxury itineraries starting this week.
                </p>
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <button className="bg-white text-[#795835] py-3 rounded-lg font-semibold">
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
