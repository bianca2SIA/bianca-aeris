import TestimonialCard from "./TestimonialCard";

const TESTIMONIALS = [
  {
    name: "Rina Kusumawati",
    position: "CEO",
    company: "Nusantara Travel",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    comment:
      "TravelGo CRM benar-benar mengubah cara kami mengelola bisnis. Booking lebih terorganisir, data customer tersimpan rapi, dan laporan bisa kami akses kapan saja. Sangat direkomendasikan!",
  },
  {
    name: "Budi Santoso",
    position: "Operations Manager",
    company: "Garuda Trip",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    comment:
      "Sebelum pakai TravelGo, kami kelola booking manual via spreadsheet. Sekarang semua otomatis. Tim kami lebih produktif dan customer lebih puas. Dashboard-nya intuitif dan mudah dipelajari.",
  },
  {
    name: "Sari Anggraeni",
    position: "Marketing Director",
    company: "Pesona Wisata",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    comment:
      "Fitur promo dan deals sangat membantu kami meningkatkan konversi. Support tim TravelGo juga responsif. Dalam 3 bulan, pendapatan kami naik 24%. Platform terbaik untuk bisnis travel.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-20 bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
            Apa Kata Mereka?
          </p>
          <h2 className="text-[30px] md:text-[40px] font-black text-[#1D3557] leading-tight">
            Dipercaya para{" "}
            <span className="text-[#4F7DF3]">profesional travel</span>
          </h2>
          <p className="mt-4 text-[#64748B] text-[15px] max-w-xl mx-auto leading-relaxed">
            Lebih dari 1000 perusahaan travel telah merasakan manfaat langsung
            dari TravelGo CRM dalam operasional sehari-hari mereka.
          </p>
        </div>

        {/* Cards grid — items-stretch for equal height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        {/* Bottom summary bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          {[
            { value: "4.9/5", label: "Rating rata-rata" },
            { value: "1000+", label: "Review positif" },
            { value: "99%", label: "Rekomendasikan ke rekan" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <p className="text-[22px] font-black text-[#4F7DF3]">{item.value}</p>
              <p className="text-[13px] text-[#64748B] font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
