import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomeGuest() {
  const destinations = [
    {
      title: "Bali, Indonesia",
      desc: "Pantai tropis, budaya indah, dan pengalaman liburan yang menenangkan.",
      rating: "4.9",
      tag: "Tropical",
      harga: "Rp 4.500.000",
      durasi: "5 Hari / 4 Malam",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Labuan Bajo",
      desc: "Nikmati pemandangan laut biru, pulau eksotis, dan sunset terbaik.",
      rating: "4.8",
      tag: "Adventure",
      harga: "Rp 6.500.000",
      durasi: "4 Hari / 3 Malam",
      image:
        "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Lombok Eksotis",
      desc: "Destinasi cantik dengan pantai tenang dan suasana yang alami.",
      rating: "4.7",
      tag: "Beach",
      harga: "Rp 3.750.000",
      durasi: "4 Hari / 3 Malam",
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Jogja Heritage",
      desc: "Perjalanan budaya, kuliner, dan wisata sejarah yang berkesan.",
      rating: "4.8",
      tag: "Culture",
      harga: "Rp 2.200.000",
      durasi: "3 Hari / 2 Malam",
      image:
        "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const features = [
    {
      icon: "support_agent",
      title: "Best Service",
      desc: "Tim TravelGo siap membantu perjalanan customer dengan pelayanan cepat dan ramah.",
      detail:
        "Customer bisa bertanya tentang paket, jadwal, promo, pembayaran, dan kebutuhan perjalanan sebelum melakukan booking.",
    },
    {
      icon: "savings",
      title: "Best Price Guarantee",
      desc: "Paket perjalanan disusun dengan harga terbaik dan fasilitas yang sesuai.",
      detail:
        "TravelGo menampilkan harga, durasi, destinasi, dan fasilitas secara jelas agar customer mudah membandingkan paket.",
    },
    {
      icon: "verified",
      title: "Handpicked Experiences",
      desc: "Destinasi dan aktivitas dipilih agar perjalanan terasa aman, nyaman, dan berkesan.",
      detail:
        "Paket rekomendasi dipilih berdasarkan destinasi populer, rating traveler, dan pengalaman perjalanan yang paling diminati.",
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

  const partners = [
    "Wanderly",
    "Roamio",
    "JetSetGo",
    "Tripora",
    "ExploreX",
    "Wayfare",
  ];

  const [searchData, setSearchData] = useState({
    destination: "",
    date: "",
    travelers: "2 Adults",
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [guestChat, setGuestChat] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [favoriteList, setFavoriteList] = useState(() => {
    const saved = localStorage.getItem("travelgo_guest_wishlist");

    if (!saved) return [];

    try {
      return JSON.parse(saved);
    } catch (error) {
      localStorage.removeItem("travelgo_guest_wishlist");
      return [];
    }
  });

  const [modalType, setModalType] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  const openModal = (type, data = null) => {
    setModalType(type);
    setSelectedData(data);
  };

  const closeModal = () => {
    setModalType("");
    setSelectedData(null);
  };

  const handleSearchChange = (field, value) => {
    setSearchData({
      ...searchData,
      [field]: value,
    });
  };

  const handleSearchPackage = () => {
    const keyword = searchData.destination.toLowerCase();

    const result = keyword
      ? destinations.filter((item) =>
          item.title.toLowerCase().includes(keyword)
        )
      : destinations;

    openModal("search", {
      result,
      destination: searchData.destination || "Semua destinasi",
      date: searchData.date || "Belum dipilih",
      travelers: searchData.travelers,
    });
  };

  const handleFavorite = (destination) => {
    const alreadySaved = favoriteList.some(
      (item) => item.title === destination.title
    );

    if (alreadySaved) {
      const updated = favoriteList.filter(
        (item) => item.title !== destination.title
      );

      setFavoriteList(updated);
      localStorage.setItem("travelgo_guest_wishlist", JSON.stringify(updated));
      showNotification("Destinasi dihapus dari wishlist guest");
      return;
    }

    const updated = [...favoriteList, destination];

    setFavoriteList(updated);
    localStorage.setItem("travelgo_guest_wishlist", JSON.stringify(updated));
    showNotification("Destinasi berhasil disimpan ke wishlist guest");
  };

  const handleNewsletter = (e) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) {
      showNotification("Email wajib diisi dulu");
      return;
    }

    const saved = localStorage.getItem("travelgo_newsletter_list");
    let newsletterList = [];

    if (saved) {
      try {
        newsletterList = JSON.parse(saved);
      } catch (error) {
        newsletterList = [];
      }
    }

    newsletterList.push({
      email: newsletterEmail,
      date: new Date().toISOString().split("T")[0],
    });

    localStorage.setItem(
      "travelgo_newsletter_list",
      JSON.stringify(newsletterList)
    );

    setNewsletterEmail("");
    showNotification("Email berhasil terdaftar untuk promo TravelGo");
  };

  const handleGuestChatChange = (field, value) => {
    setGuestChat({
      ...guestChat,
      [field]: value,
    });
  };

  const handleSendGuestChat = (e) => {
    e.preventDefault();

    if (!guestChat.name || !guestChat.email || !guestChat.message) {
      showNotification("Nama, email, dan pesan wajib diisi");
      return;
    }

    const saved = localStorage.getItem("travelgo_guest_messages");
    let messages = [];

    if (saved) {
      try {
        messages = JSON.parse(saved);
      } catch (error) {
        messages = [];
      }
    }

    messages.push({
      id: Date.now(),
      ...guestChat,
      status: "Terkirim",
      date: new Date().toISOString().split("T")[0],
    });

    localStorage.setItem("travelgo_guest_messages", JSON.stringify(messages));

    setGuestChat({
      name: "",
      email: "",
      message: "",
    });

    closeModal();
    showNotification("Pesan berhasil dikirim ke TravelGo");
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const isFavorite = (destination) => {
    return favoriteList.some((item) => item.title === destination.title);
  };

  return (
    <main className="overflow-hidden">
      {notification && (
        <div className="fixed top-5 right-5 z-[99999] bg-[#061A38] text-white px-5 py-3 rounded-[12px] shadow-xl text-sm font-bold">
          {notification}
        </div>
      )}

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
              <button
                type="button"
                onClick={() => scrollToSection("destinations")}
                className="h-14 px-7 rounded-full bg-gradient-to-r from-[#2FD6E8] to-[#5D8CFF] text-white font-bold flex items-center gap-3 shadow-xl hover:scale-105 transition"
              >
                Explore Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              
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
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-bold">Destination</p>
                  <input
                    type="text"
                    value={searchData.destination}
                    onChange={(e) =>
                      handleSearchChange("destination", e.target.value)
                    }
                    placeholder="Where to?"
                    className="w-full bg-transparent border-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0 text-sm font-bold text-[#102033] placeholder:text-[#102033]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-[#F7FAFF]">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[#2FA9E8]">
                    calendar_month
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-bold">Date</p>
                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => handleSearchChange("date", e.target.value)}
                  className="w-full bg-transparent border-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0 text-sm font-bold text-[#102033] appearance-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-[#F7FAFF]">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[#2FA9E8]">
                    groups
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-bold">Travelers</p>
                  <select
                    value={searchData.travelers}
                    onChange={(e) =>
                      handleSearchChange("travelers", e.target.value)
                    }
                    className="w-full bg-transparent border-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0 text-sm font-bold text-[#102033] appearance-none"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4 Adults</option>
                    <option>Family Trip</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSearchPackage}
                className="rounded-2xl bg-[#061A38] text-white font-bold flex items-center justify-center gap-3 hover:bg-[#0E2A55] transition"
              >
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

            <button
              type="button"
              onClick={() => openModal("allDestinations", destinations)}
              className="w-fit px-6 h-12 rounded-full border border-[#DDE7F3] text-[#102033] font-bold hover:bg-[#F4FAFF] transition"
            >
              View all destinations
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
            {destinations.map((item) => (
              <div
                key={item.title}
                className="group relative h-[390px] rounded-[28px] overflow-hidden shadow-xl hover:-translate-y-3 transition duration-300"
              >
                <button
                  type="button"
                  onClick={() => openModal("destination", item)}
                  className="absolute inset-0 z-10 text-left"
                >
                  <span className="sr-only">Lihat detail {item.title}</span>
                </button>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

                <div className="absolute top-5 left-5 px-3 py-2 bg-white rounded-full text-sm font-black text-[#102033] shadow">
                  ⭐ {item.rating}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(item);
                  }}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow z-20"
                >
                  <span
                    className={`material-symbols-outlined ${
                      isFavorite(item) ? "text-[#EF5B6C]" : "text-[#EF5B6C]"
                    }`}
                  >
                    {isFavorite(item) ? "favorite" : "favorite_border"}
                  </span>
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 pointer-events-none">
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
                <div className="w-16 h-16 rounded-2xl bg-[#EAF4FF] flex items-center justify-center shadow-md">
  <span className="material-symbols-outlined text-[#70A9F8] text-[34px]">
    {item.icon}
  </span>
</div>

                <h3 className="mt-6 text-xl font-black text-[#102033]">
                  {item.title}
                </h3>

                <p className="mt-3 text-gray-500 leading-relaxed">
                  {item.desc}
                </p>

                <button
                  type="button"
                  onClick={() => openModal("feature", item)}
                  className="mt-6 font-bold text-[#17A7C8] flex items-center gap-2"
                >
                  Learn more
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-center text-[#17A7C8] text-sm font-black tracking-[0.18em] uppercase">
            Trusted by leading partners
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner) => (
              <button
                type="button"
                key={partner}
                onClick={() => openModal("partner", partner)}
                className="h-20 rounded-2xl border border-[#EEF3F8] flex items-center justify-center text-gray-400 font-black text-xl hover:text-[#17A7C8] hover:shadow-lg transition"
              >
                {partner}
              </button>
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

            <button
              type="button"
              onClick={() => openModal("reviews", testimonials)}
              className="w-fit px-6 h-12 rounded-full border border-[#DDE7F3] text-[#102033] font-bold hover:bg-white transition"
            >
              View all reviews
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((item) => (
              <button
                type="button"
                key={item.name}
                onClick={() => openModal("reviewDetail", item)}
                className="bg-white rounded-[28px] p-8 shadow-lg hover:-translate-y-2 transition text-left"
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
              </button>
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

              <form
  onSubmit={handleNewsletter}
  className="w-full max-w-[620px] bg-white rounded-[28px] p-3 flex flex-col sm:flex-row sm:items-center gap-3 shadow-xl"
>
  <input
    type="email"
    value={newsletterEmail}
    onChange={(e) => setNewsletterEmail(e.target.value)}
    placeholder="Enter your email address"
    className="flex-1 h-14 px-6 rounded-[18px] border border-[#DDE7F3] outline-none focus:border-[#2FD6E8] text-gray-600 placeholder:text-gray-400"
  />

  <button
    type="submit"
    className="h-14 min-w-[170px] px-6 rounded-[18px] bg-[#061A38] text-white font-bold hover:bg-[#0E2A55] hover:shadow-lg transition flex items-center justify-center gap-2 shrink-0"
  >
    Subscribe
    <span className="material-symbols-outlined text-[19px]">
      send
    </span>
  </button>
</form>
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
                {[
                  "facebook",
                  "photo_camera",
                  "alternate_email",
                  "smart_display",
                ].map((icon) => (
                  <button
                    type="button"
                    key={icon}
                    onClick={() => showNotification("Sosial media TravelGo dibuka")}
                    className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black mb-5">Quick Links</h3>
              <ul className="space-y-3 text-white/65">
                <li>
                  <button type="button" onClick={() => scrollToSection("home")}>
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("destinations")}
                  >
                    Destinations
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("packages")}
                  >
                    Packages
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("testimonials")}
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => scrollToSection("contact")}>
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-black mb-5">Support</h3>
              <ul className="space-y-3 text-white/65">
                {[
                  "FAQs",
                  "Booking Guide",
                  "Terms & Conditions",
                  "Privacy Policy",
                  "Refund Policy",
                ].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => openModal("support", item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
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

      {/* FLOATING CHAT */}
    {/* FLOATING CHAT */}
<div className="fixed right-5 bottom-5 z-[99999] pointer-events-auto">
  <button
    type="button"
    onClick={() => openModal("guestChat")}
    className="group flex items-center gap-3 h-[56px] px-3 pr-5 rounded-full bg-[#061A38] text-white shadow-2xl hover:bg-[#0E2A55] hover:-translate-y-1 transition-all duration-300"
  >
    <span className="w-[40px] h-[40px] rounded-full bg-[#2FD6E8] text-[#061A38] flex items-center justify-center shadow-md">
      <span className="material-symbols-outlined text-[23px]">
        support_agent
      </span>
    </span>

    <span className="hidden sm:block text-left leading-tight">
      <span className="block text-[11px] text-white/70 font-semibold">
        Butuh bantuan?
      </span>
      <span className="block text-[14px] font-bold">
        Chat TravelGo
      </span>
    </span>
  </button>
</div>

      {/* MODAL */}
      {modalType && (
        <div className="fixed inset-0 z-[999] bg-black/35 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-[820px] bg-white rounded-[28px] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#EEF3F8] flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#102033]">
                  {modalType === "destination" && selectedData?.title}
                  {modalType === "allDestinations" && "Semua Destinasi TravelGo"}
                  {modalType === "search" && "Hasil Pencarian Paket"}
                  {modalType === "feature" && selectedData?.title}
                  {modalType === "reviews" && "Semua Review Traveler"}
                  {modalType === "reviewDetail" && "Detail Review"}
                  {modalType === "support" && selectedData}
                  {modalType === "partner" && `Partner ${selectedData}`}
                  {modalType === "guestChat" && "Customer Service Guest"}
                </h2>

                <p className="text-gray-400 mt-1">
                  TravelGo membantu pengunjung memilih paket sebelum login.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-[#F4FAFF] text-[#102033] flex items-center justify-center hover:bg-red-50 hover:text-red-500"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6">
              {modalType === "destination" && selectedData && (
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
                  <img
                    src={selectedData.image}
                    alt={selectedData.title}
                    className="w-full h-[260px] object-cover rounded-[24px]"
                  />

                  <div>
                    <span className="inline-flex px-3 py-1 rounded-full bg-[#2FD6E8] text-white text-xs font-bold mb-3">
                      {selectedData.tag}
                    </span>

                    <h3 className="text-3xl font-black text-[#102033]">
                      {selectedData.title}
                    </h3>

                    <p className="text-gray-500 leading-7 mt-3">
                      {selectedData.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <div className="bg-[#F7FAFF] rounded-2xl p-4">
                        <p className="text-xs text-gray-400 font-bold">
                          Harga Mulai
                        </p>
                        <p className="font-black text-[#17A7C8]">
                          {selectedData.harga}
                        </p>
                      </div>

                      <div className="bg-[#F7FAFF] rounded-2xl p-4">
                        <p className="text-xs text-gray-400 font-bold">
                          Durasi
                        </p>
                        <p className="font-black text-[#102033]">
                          {selectedData.durasi}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">
                      <Link
                        to="/login"
                        className="h-11 px-5 rounded-full bg-[#061A38] text-white text-sm font-bold flex items-center justify-center"
                      >
                        Login untuk Booking
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleFavorite(selectedData)}
                        className="h-11 px-5 rounded-full bg-[#F4FAFF] text-[#102033] text-sm font-bold"
                      >
                        Simpan Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {(modalType === "allDestinations" || modalType === "reviews") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedData.map((item) =>
                    modalType === "allDestinations" ? (
                      <button
                        type="button"
                        key={item.title}
                        onClick={() => openModal("destination", item)}
                        className="flex gap-4 bg-[#F7FAFF] rounded-2xl p-4 text-left hover:shadow-md transition"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 rounded-2xl object-cover"
                        />
                        <div>
                          <h3 className="font-black text-[#102033]">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.desc}
                          </p>
                          <p className="text-sm font-bold text-[#17A7C8] mt-2">
                            ⭐ {item.rating}
                          </p>
                        </div>
                      </button>
                    ) : (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => openModal("reviewDetail", item)}
                        className="bg-[#F7FAFF] rounded-2xl p-4 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-black text-[#102033]">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-400">{item.city}</p>
                          </div>
                        </div>
                        <p className="text-gray-500 mt-4 leading-6">
                          “{item.text}”
                        </p>
                      </button>
                    )
                  )}
                </div>
              )}

              {modalType === "search" && selectedData && (
                <div>
                  <div className="bg-[#F7FAFF] rounded-2xl p-4 mb-5">
                    <p className="text-sm text-gray-500">
                      Destinasi: <b>{selectedData.destination}</b> • Tanggal:{" "}
                      <b>{selectedData.date}</b> • Travelers:{" "}
                      <b>{selectedData.travelers}</b>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedData.result.length > 0 ? (
                      selectedData.result.map((item) => (
                        <button
                          type="button"
                          key={item.title}
                          onClick={() => openModal("destination", item)}
                          className="flex gap-4 bg-[#F7FAFF] rounded-2xl p-4 text-left hover:shadow-md transition"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-24 h-24 rounded-2xl object-cover"
                          />
                          <div>
                            <h3 className="font-black text-[#102033]">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.desc}
                            </p>
                            <p className="text-sm font-bold text-[#17A7C8] mt-2">
                              {item.harga}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="md:col-span-2 text-center py-10 text-gray-400">
                        Paket tidak ditemukan.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {modalType === "feature" && selectedData && (
                <div className="bg-[#F7FAFF] rounded-3xl p-6">
                 <div className="w-16 h-16 rounded-2xl bg-[#EAF4FF] border border-[#DCEBFF] flex items-center justify-center text-[#70A9F8] shadow-md mb-5">
  <span className="material-symbols-outlined text-[34px] leading-none">
    {selectedData.icon}
  </span>
</div>

                  <h3 className="text-2xl font-black text-[#102033]">
                    {selectedData.title}
                  </h3>

                  <p className="text-gray-500 leading-7 mt-3">
                    {selectedData.detail}
                  </p>
                </div>
              )}

              {modalType === "reviewDetail" && selectedData && (
                <div className="bg-[#F7FAFF] rounded-3xl p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedData.image}
                      alt={selectedData.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-black text-[#102033]">
                        {selectedData.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {selectedData.city}
                      </p>
                      <p className="text-[#F7B731] mt-1">★★★★★</p>
                    </div>
                  </div>

                  <p className="text-gray-500 leading-7 mt-6">
                    “{selectedData.text}”
                  </p>
                </div>
              )}

              {(modalType === "support" || modalType === "partner") && (
                <div className="bg-[#F7FAFF] rounded-3xl p-6">
                  <h3 className="text-xl font-black text-[#102033] mb-3">
                    {selectedData}
                  </h3>

                  <p className="text-gray-500 leading-7">
                    Informasi ini dapat dikembangkan menjadi halaman khusus
                    nanti. Untuk sementara, guest bisa membaca info singkat ini
                    atau menghubungi TravelGo melalui chat guest.
                  </p>

                  <button
                    type="button"
                    onClick={() => openModal("guestChat")}
                    className="mt-5 h-11 px-5 rounded-full bg-[#061A38] text-white text-sm font-bold"
                  >
                    Hubungi TravelGo
                  </button>
                </div>
              )}

              {modalType === "guestChat" && (
                <form onSubmit={handleSendGuestChat} className="space-y-4">
                  <div className="bg-[#F7FAFF] rounded-2xl p-4 text-gray-500 leading-6">
                    Halo, silakan kirim pertanyaan ke TravelGo.
                  </div>

                  <input
                    type="text"
                    value={guestChat.name}
                    onChange={(e) =>
                      handleGuestChatChange("name", e.target.value)
                    }
                    placeholder="Nama"
                    className="w-full h-12 px-4 rounded-2xl border border-[#DDE7F3] outline-none focus:border-[#17A7C8]"
                  />

                  <input
                    type="email"
                    value={guestChat.email}
                    onChange={(e) =>
                      handleGuestChatChange("email", e.target.value)
                    }
                    placeholder="Email"
                    className="w-full h-12 px-4 rounded-2xl border border-[#DDE7F3] outline-none focus:border-[#17A7C8]"
                  />

                  <textarea
                    value={guestChat.message}
                    onChange={(e) =>
                      handleGuestChatChange("message", e.target.value)
                    }
                    placeholder="Tulis pesan..."
                    className="w-full min-h-[120px] px-4 py-3 rounded-2xl border border-[#DDE7F3] outline-none focus:border-[#17A7C8] resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full h-12 rounded-2xl bg-[#061A38] text-white font-bold"
                  >
                    Kirim Pesan
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
