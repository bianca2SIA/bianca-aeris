import StatisticCard from "./StatisticCard";

const STATS = [
  {
    icon: "group",
    value: "15.000+",
    label: "Wisatawan",
    description: "Wisatawan puas yang sudah mempercayai TravelGo",
    color: "#4F7DF3",
    bgColor: "#EEF4FF",
  },
  {
    icon: "card_travel",
    value: "300+",
    label: "Paket Wisata",
    description: "Paket destinasi tersedia di seluruh Indonesia",
    color: "#10B981",
    bgColor: "#ECFDF5",
  },
  {
    icon: "thumb_up",
    value: "98%",
    label: "Kepuasan Pelanggan",
    description: "Rating kepuasan dari wisatawan TravelGo",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
  },
  {
    icon: "support_agent",
    value: "24/7",
    label: "Customer Support",
    description: "Tim siap membantu perjalanan Anda kapan saja",
    color: "#EC4899",
    bgColor: "#FDF2F8",
  },
];

export default function StatisticsSection() {
  return (
    <section id="statistics" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
            Dipercaya Ribuan Wisatawan
          </p>
          <h2 className="text-[30px] md:text-[40px] font-black text-[#1D3557] leading-tight">
            Angka yang{" "}
            <span className="text-[#4F7DF3]">berbicara sendiri</span>
          </h2>
          <p className="mt-4 text-[#64748B] text-[15px] max-w-xl mx-auto leading-relaxed">
            TravelGo telah membantu ribuan wisatawan menemukan destinasi impian
            dan menikmati liburan terbaik di Indonesia.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat) => (
            <StatisticCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
