import { Link } from "react-router-dom";

export default function HomeGuest() {
  const destinations = [
    {
      title: "Bali, Indonesia",
      desc: "Pantai tropis, budaya indah, dan pengalaman liburan yang menenangkan.",
      rating: "4.9",
      tag: "Tropical",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Labuan Bajo",
      desc: "Nikmati pemandangan laut biru, pulau eksotis, dan sunset terbaik.",
      rating: "4.8",
      tag: "Adventure",
      image:
        "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Lombok Eksotis",
      desc: "Destinasi cantik dengan pantai tenang dan suasana yang alami.",
      rating: "4.7",
      tag: "Beach",
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Jogja Heritage",
      desc: "Perjalanan budaya, kuliner, dan wisata sejarah yang berkesan.",
      rating: "4.8",
      tag: "Culture",
      image:
        "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const features = [
    {
      icon: "support_agent",
      title: "Best Service",
      desc: "Tim TravelGo siap membantu perjalanan customer dengan pelayanan cepat dan ramah.",
    },
    {
      icon: "savings",
      title: "Best Price Guarantee",
      desc: "Paket perjalanan disusun dengan harga terbaik dan fasilitas yang sesuai.",
    },
    {
      icon: "verified",
      title: "Handpicked Experiences",
      desc: "Destinasi dan aktivitas dipilih agar perjalanan terasa aman, nyaman, dan berkesan.",
    },
  ];

  const testimonials = [
    {
      name: "Rania Putri",
      city: "Pekanbaru",
      text: "TravelGo membuat rencana liburan jadi lebih mudah. Paketnya jelas dan pelayanannya cepat.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Ahmad Rizky",
      city: "Jakarta",
      text: "Booking paket travel jadi praktis. Informasi destinasi mudah dipahami dan tampilannya menarik.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Salsa Amanda",
      city: "Bandung",
      text: "Saya suka karena pilihan paketnya lengkap dan cocok untuk liburan keluarga.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const partners = ["Wanderly", "Roamio", "JetSetGo", "Tripora", "ExploreX", "Wayfare"];

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#061A38]/95 via-[#061A38]/55 to-[#061A38]/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#061A38]/70 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-[150px] pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold tracking-[0.2em] uppercase mb-7">
              Explore. Dream. Discover.
              <span className="material-symbols-outlined text-[#2FD6E8] text-[18px]">
                flight_takeoff
              </span>
            </div>

            <h1 className="text-white text-[56px] md:text-[76px] leading-[0.95] font-black tracking-tight">
              Discover <br />
              unforgettable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FD6E8] to-[#8BE9FF] italic">
                journeys
              </span>
            </h1>

            <p className="mt-7 text-white/85 text-lg md:text-xl max-w-xl leading-relaxed">
              Jelajahi destinasi impian bersama TravelGo. Temukan paket travel
              terbaik, pengalaman seru, dan perjalanan yang tidak terlupakan.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#destinations"
                className="h-14 px-7 rounded-full bg-gradient-to-r from-[#2FD6E8] to-[#5D8CFF] text-white font-bold flex items-center gap-3 shadow-xl hover:scale-105 transition"
              >
                Explore Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>

              <Link
                to="/login"
                className="h-14 px-7 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-white font-bold flex items-center gap-3 hover:bg-white/25 transition"
              >
                Login Member
              </Link>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="mt-14 bg-white rounded-[28px] shadow-2xl p-4 lg:p-5 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-[#F7FAFF]">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[#2FA9E8]">
                    location_on
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold">Destination</p>
                  <p className="text-sm font-bold text-[#102033]">Where to?</p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-[#F7FAFF]">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[#2FA9E8]">
                    calendar_month
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold">Date</p>
                  <p className="text-sm font-bold text-[#102033]">Select date</p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-[#F7FAFF]">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[#2FA9E8]">
                    groups
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold">Travelers</p>
                  <p className="text-sm font-bold text-[#102033]">2 Adults</p>
                </div>
              </div>

              <button className="rounded-2xl bg-[#061A38] text-white font-bold flex items-center justify-center gap-3 hover:bg-[#0E2A55] transition">
                Search Package
                <span className="material-symbols-outlined">travel_explore</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
            <div>
              <p className="text-[#17A7C8] text-sm font-black tracking-[0.18em] uppercase">
                Explore Top Destinations
              </p>
              <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#102033]">
                Handpicked places for you
              </h2>
            </div>

            <button className="w-fit px-6 h-12 rounded-full border border-[#DDE7F3] text-[#102033] font-bold hover:bg-[#F4FAFF] transition">
              View all destinations
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
            {destinations.map((item) => (
              <div
                key={item.title}
                className="group relative h-[390px] rounded-[28px] overflow-hidden shadow-xl hover:-translate-y-3 transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

                <div className="absolute top-5 left-5 px-3 py-2 bg-white rounded-full text-sm font-black text-[#102033] shadow">
                  ⭐ {item.rating}
                </div>

                <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow">
                  <span className="material-symbols-outlined text-[#EF5B6C]">
                    favorite
                  </span>
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#2FD6E8] text-xs font-bold mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <p className="mt-2 text-white/80 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section
        id="packages"
        className="py-24 bg-gradient-to-br from-[#EAFBFF] via-white to-[#F3F8FF]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[#17A7C8] text-sm font-black tracking-[0.18em] uppercase">
            Why Choose TravelGo
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#102033]">
            Travel with confidence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-12">
            {features.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-[28px] p-8 shadow-xl hover:-translate-y-2 transition"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2FD6E8] to-[#5D8CFF] flex items-center justify-center text-white shadow-lg">
                  <span className="material-symbols-outlined text-[34px]">
                    {item.icon}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-black text-[#102033]">
                  {item.title}
                </h3>

                <p className="mt-3 text-gray-500 leading-relaxed">
                  {item.desc}
                </p>

                <button className="mt-6 font-bold text-[#17A7C8] flex items-center gap-2">
                  Learn more
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-18 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-center text-[#17A7C8] text-sm font-black tracking-[0.18em] uppercase">
            Trusted by leading partners
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner) => (
              <div
                key={partner}
                className="h-20 rounded-2xl border border-[#EEF3F8] flex items-center justify-center text-gray-400 font-black text-xl hover:text-[#17A7C8] hover:shadow-lg transition"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-[#F8FBFF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
            <div>
              <p className="text-[#17A7C8] text-sm font-black tracking-[0.18em] uppercase">
                What travelers say
              </p>

              <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#102033]">
                Memories from our travelers
              </h2>
            </div>

            <button className="w-fit px-6 h-12 rounded-full border border-[#DDE7F3] text-[#102033] font-bold hover:bg-white transition">
              View all reviews
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-[28px] p-8 shadow-lg hover:-translate-y-2 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-black text-[#102033]">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.city}</p>
                    <p className="text-[#F7B731] mt-1">★★★★★</p>
                  </div>
                </div>

                <p className="mt-7 text-gray-500 leading-relaxed">
                  “{item.text}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            className="relative rounded-[36px] overflow-hidden p-9 md:p-14 bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1500&q=90')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#061A38]/95 via-[#061A38]/80 to-[#061A38]/20"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#2FD6E8] text-sm font-black tracking-[0.18em] uppercase">
                  Special offers just for you
                </p>

                <h2 className="mt-3 text-4xl md:text-5xl font-black text-white">
                  Unlock exclusive travel deals
                </h2>

                <p className="mt-4 text-white/80 leading-relaxed max-w-xl">
                  Dapatkan promo spesial, tips perjalanan, dan rekomendasi paket
                  travel terbaru langsung dari TravelGo.
                </p>
              </div>

              <div className="bg-white rounded-full p-2 flex flex-col sm:flex-row gap-2 shadow-xl">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 h-14 px-6 rounded-full outline-none text-gray-600"
                />

                <button className="h-14 px-7 rounded-full bg-gradient-to-r from-[#FF7A59] to-[#FF4F70] text-white font-bold">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#061A38] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2FD6E8] to-[#5D8CFF] flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">
                    flight_takeoff
                  </span>
                </div>

                <h1 className="text-2xl font-black">
                  Travel<span className="text-[#2FD6E8]">Go</span>
                </h1>
              </div>

              <p className="mt-5 text-white/65 leading-relaxed max-w-sm">
                TravelGo membantu customer menemukan destinasi, memilih paket,
                dan merencanakan perjalanan dengan mudah.
              </p>

              <div className="mt-6 flex gap-3">
                {["facebook", "photo_camera", "alternate_email", "smart_display"].map(
                  (icon) => (
                    <button
                      key={icon}
                      className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {icon}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="font-black mb-5">Quick Links</h3>
              <ul className="space-y-3 text-white/65">
                <li>Home</li>
                <li>Destinations</li>
                <li>Packages</li>
                <li>Testimonials</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h3 className="font-black mb-5">Support</h3>
              <ul className="space-y-3 text-white/65">
                <li>FAQs</li>
                <li>Booking Guide</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Refund Policy</li>
              </ul>
            </div>

            <div>
              <h3 className="font-black mb-5">Contact Us</h3>
              <ul className="space-y-4 text-white/65">
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-[#2FD6E8]">
                    location_on
                  </span>
                  Pekanbaru, Indonesia
                </li>

                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-[#2FD6E8]">
                    call
                  </span>
                  +62 706 888 0562
                </li>

                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-[#2FD6E8]">
                    mail
                  </span>
                  hello@travelgo.com
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-7 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-white/50 text-sm">
            <p>© 2026 TravelGo. All rights reserved.</p>
            <p>Made with love for travelers around the world.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}