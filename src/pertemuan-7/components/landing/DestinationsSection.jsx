import ScrollReveal from "./ScrollReveal";

const DESTINATIONS = [
  {
    id: 1, name: "Bali", location: "Bali, Indonesia",
    img: "https://picsum.photos/seed/dest-bali/800/500",
    rating: 4.9, reviews: 3840, priceFrom: "Rp 1.800.000", minDays: "3D2N",
    badge: "Terpopuler", badgeColor: "#4F7DF3",
  },
  {
    id: 2, name: "Lombok", location: "Nusa Tenggara Barat",
    img: "https://picsum.photos/seed/dest-lombok/800/500",
    rating: 4.8, reviews: 2150, priceFrom: "Rp 1.500.000", minDays: "2D1N",
    badge: "Hits", badgeColor: "#10B981",
  },
  {
    id: 3, name: "Bromo", location: "Jawa Timur",
    img: "https://picsum.photos/seed/dest-bromo/800/500",
    rating: 4.8, reviews: 1920, priceFrom: "Rp 1.200.000", minDays: "2D1N",
    badge: null, badgeColor: null,
  },
  {
    id: 4, name: "Raja Ampat", location: "Papua Barat",
    img: "https://picsum.photos/seed/dest-raja/800/500",
    rating: 5.0, reviews: 1640, priceFrom: "Rp 5.500.000", minDays: "5D4N",
    badge: "Premium", badgeColor: "#8B5CF6",
  },
  {
    id: 5, name: "Yogyakarta", location: "DI Yogyakarta",
    img: "https://picsum.photos/seed/dest-yogya/800/500",
    rating: 4.7, reviews: 3210, priceFrom: "Rp 800.000", minDays: "2D1N",
    badge: "Budget Friendly", badgeColor: "#10B981",
  },
  {
    id: 6, name: "Komodo", location: "Nusa Tenggara Timur",
    img: "https://picsum.photos/seed/dest-komodo/800/500",
    rating: 4.9, reviews: 1280, priceFrom: "Rp 3.500.000", minDays: "3D2N",
    badge: null, badgeColor: null,
  },
  {
    id: 7, name: "Danau Toba", location: "Sumatera Utara",
    img: "https://picsum.photos/seed/dest-toba/800/500",
    rating: 4.7, reviews: 1580, priceFrom: "Rp 1.400.000", minDays: "3D2N",
    badge: null, badgeColor: null,
  },
  {
    id: 8, name: "Labuan Bajo", location: "Nusa Tenggara Timur",
    img: "https://picsum.photos/seed/dest-labuan/800/500",
    rating: 4.9, reviews: 1920, priceFrom: "Rp 2.800.000", minDays: "3D2N",
    badge: "Trending", badgeColor: "#EC4899",
  },
];

const scrollToPackages = () => {
  const el = document.getElementById("paket");
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
};

function DestCard({ dest }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl cursor-pointer" style={{ height: "220px" }} onClick={scrollToPackages}>
      {/* Image */}
      <img
        src={dest.img}
        alt={dest.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Badge */}
      {dest.badge && (
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 rounded-full text-white text-[9px] font-black" style={{ background: dest.badgeColor }}>
            {dest.badge}
          </span>
        </div>
      )}

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-[17px] font-black text-white leading-tight">{dest.name}</h3>
            <p className="text-white/65 text-[11px]">{dest.location}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[#F59E0B] text-[11px]">★</span>
              <span className="text-white text-[11px] font-bold">{dest.rating}</span>
              <span className="text-white/45 text-[10px]">({dest.reviews.toLocaleString()})</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/55 text-[9px]">Mulai dari</p>
            <p className="text-white font-black text-[13px]">{dest.priceFrom}</p>
            <p className="text-white/55 text-[9px]">{dest.minDays}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DestinationsSection() {
  return (
    <section id="destinasi" className="py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-2">Destinasi Populer</p>
            <h2 className="text-[28px] md:text-[36px] font-black text-[#1D3557] leading-tight">
              Jelajahi destinasi <span className="text-[#4F7DF3]">terbaik Indonesia</span>
            </h2>
            <p className="mt-3 text-[#64748B] text-[14px] max-w-md mx-auto">
              Dari pantai eksotis hingga pegunungan menakjubkan — semuanya ada di TravelGo.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid — image-overlay cards, lebih visual seperti Airbnb */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DESTINATIONS.map((dest, i) => (
            <ScrollReveal key={dest.id} delay={i * 50} direction="up">
              <DestCard dest={dest} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={100}>
          <p className="mt-7 text-center text-[13px] text-[#94A3B8]">
            Klik destinasi untuk lihat paket yang tersedia ·{" "}
            <button type="button" onClick={scrollToPackages} className="text-[#4F7DF3] font-bold hover:underline">
              Lihat semua paket →
            </button>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
