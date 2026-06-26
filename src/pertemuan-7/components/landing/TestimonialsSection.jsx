import TestimonialCard from "./TestimonialCard";
import ScrollReveal from "./ScrollReveal";

const TESTIMONIALS = [
  {
    name: "Rina Kusuma",
    position: "Wisatawan — Bali Tour",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment:
      "Pengalaman liburan ke Bali bersama TravelGo benar-benar luar biasa! Proses bookingnya mudah, tour guide-nya profesional, dan semua jadwal berjalan tepat waktu. Pasti akan booking lagi!",
  },
  {
    name: "Budi Santoso",
    position: "Wisatawan — Lombok Eksotis",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    comment:
      "Paket Lombok yang saya pesan sangat worth it. Harga terjangkau tapi fasilitas hotel bintang 4, termasuk snorkeling di Gili Trawangan. Tim TravelGo responsif dan sangat membantu selama perjalanan.",
  },
  {
    name: "Salsa Amelia",
    position: "Wisatawan — Bromo Sunrise Tour",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    comment:
      "Bromo Sunrise Tour-nya seru banget! Berangkat pagi-pagi, lihat sunrise di atas kawah, dan kembali dengan kenangan yang tak terlupakan. TravelGo memang juara dalam mengurus detail perjalanan.",
  },
];

const SUMMARY_STATS = [
  { value: "15.000+", label: "Wisatawan Puas" },
  { value: "4.9/5",   label: "Rating Rata-rata" },
  { value: "98%",     label: "Rekomendasikan ke Teman" },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-14 md:py-16 bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
              Testimoni
            </p>
            <h2 className="text-[30px] md:text-[40px] font-black text-[#1D3557] leading-tight">
              Apa kata{" "}
              <span className="text-[#4F7DF3]">wisatawan TravelGo?</span>
            </h2>
            <p className="mt-4 text-[#64748B] text-[15px] max-w-xl mx-auto leading-relaxed">
              Ribuan wisatawan telah mempercayai TravelGo untuk merencanakan
              liburan mereka. Inilah cerita mereka.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards — 3 col, consistent height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 80}>
              <TestimonialCard {...t} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
