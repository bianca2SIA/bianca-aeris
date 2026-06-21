import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import paketData from "../../data/paket.json";

const defaultImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80";

const fallbackPackages = [
  {
    id: "bali",
    nama: "Paket Bali Beach Escape",
    lokasi: "Bali",
    harga: 4500000,
    durasi: "5 Hari / 4 Malam",
    rating: 4.9,
    kategori: "Beach Trip",
    gambar:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    deskripsi:
      "Nikmati pantai Bali, sunset, wisata budaya, dan pengalaman liburan santai.",
    fasilitas: [
      "Hotel dekat pantai",
      "Transport wisata",
      "Tiket destinasi",
      "Sarapan hotel",
    ],
  },
  {
    id: "labuan-bajo",
    nama: "Paket Labuan Bajo Premium",
    lokasi: "Labuan Bajo",
    harga: 6200000,
    durasi: "4 Hari / 3 Malam",
    rating: 4.9,
    kategori: "Premium",
    gambar:
      "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=900&q=80",
    deskripsi:
      "Nikmati Pulau Padar, Pink Beach, snorkeling, dan sailing trip dengan fasilitas nyaman.",
    fasilitas: [
      "Hotel dekat pelabuhan",
      "Sailing trip",
      "Transport lokal",
      "Customer service",
    ],
  },
  {
    id: "lombok",
    nama: "Paket Lombok Eksotis",
    lokasi: "Lombok",
    harga: 3900000,
    durasi: "4 Hari / 3 Malam",
    rating: 4.8,
    kategori: "Island Trip",
    gambar:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
    deskripsi: "Eksplor pantai, Gili, wisata laut, dan keindahan alam Lombok.",
    fasilitas: ["Hotel", "Island hopping", "Transport wisata", "Dokumentasi"],
  },
];

function ambilStorage(key, dataAwal) {
  const data = localStorage.getItem(key);

  if (!data) {
    return dataAwal;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    localStorage.removeItem(key);
    return dataAwal;
  }
}

function simpanStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function ambilUserLogin() {
  const dataUser =
    localStorage.getItem("currentUser") || localStorage.getItem("user");

  if (!dataUser) {
    return {};
  }

  try {
    return JSON.parse(dataUser);
  } catch (error) {
    return {};
  }
}

function ubahHargaKeAngka(harga) {
  if (typeof harga === "number") {
    return harga;
  }

  return Number(String(harga || 0).replace(/[^\d]/g, "")) || 0;
}

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(angka || 0));
}

function ambilRating(rating) {
  const hasil = String(rating || "4.8").match(/\d+(\.\d+)?/);

  return hasil ? Number(hasil[0]) : 4.8;
}

function normalisasiPaket(item, index, kategoriDefault = "Travel") {
  const fasilitasDariAktivitas = Array.isArray(item?.aktivitas)
    ? item.aktivitas
    : [];

  const fasilitasLain = [item?.akomodasi, item?.makan, item?.ekstra].filter(
    Boolean,
  );

  return {
    id:
      item?.id ||
      `${kategoriDefault}-${item?.nama || index}`
        .toLowerCase()
        .replaceAll(" ", "-"),

    nama: item?.nama || item?.title || `Paket Travel ${index + 1}`,

    lokasi: item?.lokasi || item?.location || item?.destination || "Indonesia",

    harga: ubahHargaKeAngka(item?.harga || item?.price),

    durasi: item?.durasi || item?.duration || "3 Hari / 2 Malam",

    rating: ambilRating(item?.rating),

    kategori: item?.kategori || item?.category || kategoriDefault,

    gambar: item?.gambar || item?.image || item?.foto || defaultImage,

    deskripsi:
      item?.deskripsi ||
      item?.description ||
      "Nikmati perjalanan nyaman bersama TravelGo dengan itinerary rapi dan fasilitas terbaik.",

    fasilitas:
      Array.isArray(item?.fasilitas) && item.fasilitas.length > 0
        ? item.fasilitas
        : fasilitasDariAktivitas.length > 0
          ? fasilitasDariAktivitas
          : fasilitasLain.length > 0
            ? fasilitasLain
            : [
                "Transport perjalanan",
                "Hotel nyaman",
                "Guide lokal",
                "Customer service",
              ],
  };
}

function ambilSemuaPaket() {
  const paketAdmin = ambilStorage("travelgo_packages_final", []);

  if (Array.isArray(paketAdmin) && paketAdmin.length > 0) {
    return paketAdmin.map((item, index) =>
      normalisasiPaket(item, index, item.kategori || "Travel"),
    );
  }

  if (Array.isArray(paketData)) {
    return paketData.map((item, index) =>
      normalisasiPaket(item, index, item.kategori || "Travel"),
    );
  }

  const dataJson = [
    {
      data: paketData?.paketBaru,
      kategori: "Paket Baru",
    },

    ...(paketData?.paketUnggulan || []).map((item) => ({
      data: item,
      kategori: "Unggulan",
    })),

    ...(paketData?.paketPopuler || []).map((item) => ({
      data: item,
      kategori: "Populer",
    })),

    ...(paketData?.paketRekomendasi || []).map((item) => ({
      data: item,
      kategori: "Rekomendasi",
    })),
  ].filter((item) => item.data);

  const hasilPaket = dataJson.map((item, index) =>
    normalisasiPaket(item.data, index, item.kategori),
  );

  if (hasilPaket.length === 0) {
    return fallbackPackages;
  }

  return Array.from(
    new Map(hasilPaket.map((paket) => [paket.nama, paket])).values(),
  );
}

export default function HomeGuest() {
  const navigate = useNavigate();

  const userLogin = ambilUserLogin();

  const role = String(
    localStorage.getItem("role") || userLogin.role || "",
  ).toLowerCase();

  const sudahLoginSebagaiUser =
    Boolean(localStorage.getItem("token")) && role === "user";

  const [packages] = useState(() => ambilSemuaPaket());

  const [searchData, setSearchData] = useState({
    destination: "",
    date: "",
    travelers: "2 Adults",
  });

  const [searchPackage, setSearchPackage] = useState("");

  const [wishlist, setWishlist] = useState(() =>
    ambilStorage("travelgo_guest_wishlist", []),
  );

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const [guestChat, setGuestChat] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [modalType, setModalType] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [notification, setNotification] = useState("");

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

  const fiturTravelGo = [
    {
      icon: "support_agent",
      title: "Best Service",
      desc: "TravelGo membantu customer memilih paket, memahami jadwal, dan menyiapkan perjalanan dengan lebih mudah.",
    },
    {
      icon: "savings",
      title: "Best Price",
      desc: "Harga, durasi, fasilitas, dan detail paket ditampilkan dengan jelas agar mudah dibandingkan.",
    },
    {
      icon: "verified",
      title: "Trusted Trip",
      desc: "Paket travel dipilih untuk memberi perjalanan yang aman, nyaman, dan berkesan.",
    },
  ];

  const tampilkanNotifikasi = (pesan) => {
    setNotification(pesan);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  const bukaModal = (jenis, paket = null) => {
    setModalType(jenis);
    setSelectedPackage(paket);
  };

  const tutupModal = () => {
    setModalType("");
    setSelectedPackage(null);
  };

  const scrollKe = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const paketTampil = useMemo(() => {
    const keyword = searchPackage.toLowerCase().trim();

    if (!keyword) {
      return packages;
    }

    return packages.filter((paket) => {
      return (
        paket.nama.toLowerCase().includes(keyword) ||
        paket.lokasi.toLowerCase().includes(keyword) ||
        paket.kategori.toLowerCase().includes(keyword)
      );
    });
  }, [packages, searchPackage]);

  const isWishlist = (paket) => {
    return wishlist.some((item) => item.id === paket.id);
  };

  const toggleWishlist = (paket) => {
    const sudahAda = isWishlist(paket);

    const dataBaru = sudahAda
      ? wishlist.filter((item) => item.id !== paket.id)
      : [...wishlist, paket];

    setWishlist(dataBaru);
    simpanStorage("travelgo_guest_wishlist", dataBaru);

    tampilkanNotifikasi(
      sudahAda
        ? "Paket dihapus dari wishlist"
        : "Paket berhasil disimpan ke wishlist",
    );
  };

  const handleSearch = () => {
    setSearchPackage(searchData.destination);
    bukaModal("allPackages");
  };

  const handleBooking = (paket) => {
    const paketUntukBooking = {
      ...paket,
      tanggalPilihan: searchData.date,
      travelersPilihan: searchData.travelers,
    };

    localStorage.setItem(
      "travelgo_pending_booking",
      JSON.stringify(paketUntukBooking),
    );

    localStorage.setItem("travelgo_after_login", "/member");

    if (!sudahLoginSebagaiUser) {
      tampilkanNotifikasi("Silakan login dulu untuk melanjutkan booking");

      setTimeout(() => {
        navigate("/login");
      }, 500);

      return;
    }

    navigate("/member");
  };

  const handleNewsletter = (e) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) {
      tampilkanNotifikasi("Email wajib diisi dulu");
      return;
    }

    const daftarEmail = ambilStorage("travelgo_newsletter_list", []);

    simpanStorage("travelgo_newsletter_list", [
      ...daftarEmail,
      {
        email: newsletterEmail,
        tanggal: new Date().toISOString().split("T")[0],
      },
    ]);

    setNewsletterEmail("");
    tampilkanNotifikasi("Email berhasil terdaftar untuk promo TravelGo");
  };

  const handleGuestChat = (e) => {
    e.preventDefault();

    if (!guestChat.name || !guestChat.email || !guestChat.message) {
      tampilkanNotifikasi("Nama, email, dan pesan wajib diisi");
      return;
    }

    const messages = ambilStorage("travelgo_guest_messages", []);

    simpanStorage("travelgo_guest_messages", [
      ...messages,
      {
        id: Date.now(),
        ...guestChat,
        status: "Terkirim",
        tanggal: new Date().toISOString().split("T")[0],
      },
    ]);

    setGuestChat({
      name: "",
      email: "",
      message: "",
    });

    tutupModal();
    tampilkanNotifikasi("Pesan berhasil dikirim ke TravelGo");
  };

  const PackageCard = ({ paket, popup = false }) => {
    return (
      <div className="group bg-white rounded-[24px] overflow-hidden border border-[#EAF0F6] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300">
        <div
          className={`relative overflow-hidden ${
            popup ? "h-[185px]" : "h-[210px]"
          }`}
        >
          <img
            src={paket.gambar}
            alt={paket.nama}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>

          <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 text-[#0C719E] text-xs font-black">
            {paket.kategori}
          </span>

          <button
            type="button"
            onClick={() => toggleWishlist(paket)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-[#EF5B6C] flex items-center justify-center shadow-md hover:scale-110 transition"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isWishlist(paket) ? "favorite" : "favorite_border"}
            </span>
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[#7F8A9A] flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#2FA9E8]" />
              {paket.lokasi}
            </p>

            <span className="text-sm font-bold text-[#B88700] flex items-center gap-1">
              <FaStar />
              {paket.rating}
            </span>
          </div>

          <h3 className="text-[19px] font-black text-[#102033] mt-3">
            {paket.nama}
          </h3>

          {popup && (
            <p className="text-sm leading-6 text-[#647084] mt-3 min-h-[48px]">
              {paket.deskripsi}
            </p>
          )}

          <div className="flex items-end justify-between gap-3 mt-5">
            <div>
              <p className="text-xs text-[#9AA0AA] font-bold">Mulai dari</p>

              <p className="text-[17px] text-[#0C9FC0] font-black">
                {formatRupiah(paket.harga)}
              </p>
            </div>

            <span className="text-xs font-bold text-[#596070] bg-[#F4F7FA] px-3 py-2 rounded-[9px]">
              {paket.durasi}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              onClick={() => bukaModal("packageDetail", paket)}
              className="h-10 rounded-[10px] border border-[#DDE7F3] text-[#102033] text-sm font-bold hover:bg-[#F4FAFF] transition"
            >
              Detail
            </button>

            <button
              type="button"
              onClick={() => handleBooking(paket)}
              className="h-10 rounded-[10px] bg-[#061A38] text-white text-sm font-bold hover:bg-[#0E2A55] transition"
            >
              Booking
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="overflow-hidden bg-white">
      {notification && (
        <div className="fixed top-5 right-5 z-[99999] bg-[#061A38] text-white px-5 py-3 rounded-[12px] shadow-xl text-sm font-bold">
          {notification}
        </div>
      )}

      {/* HOME */}
      <section
        id="home"
        className="scroll-mt-[110px] relative min-h-[calc(100vh-96px)] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#061A38]/95 via-[#061A38]/60 to-[#061A38]/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#061A38]/70 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-[120px] lg:py-[145px]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold tracking-[0.18em] uppercase mb-7">
              Explore. Dream. Discover.
              <span className="material-symbols-outlined text-[#2FD6E8] text-[18px]">
                flight_takeoff
              </span>
            </div>

            <h1 className="text-white text-[52px] md:text-[76px] leading-[0.95] font-black tracking-tight">
              Discover <br />
              unforgettable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FD6E8] to-[#8BE9FF] italic">
                journeys
              </span>
            </h1>

            <p className="mt-7 text-white/85 text-lg md:text-xl max-w-xl leading-relaxed">
              Temukan paket travel terbaik, destinasi impian, dan pengalaman
              liburan yang lebih mudah bersama TravelGo.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollKe("packages")}
                className="h-14 px-7 rounded-full bg-gradient-to-r from-[#2FD6E8] to-[#5D8CFF] text-white font-bold flex items-center gap-3 shadow-xl hover:scale-105 transition"
              >
                Explore Package
                <FaArrowRight />
              </button>

              {sudahLoginSebagaiUser && (
                <button
                  type="button"
                  onClick={() => navigate("/member")}
                  className="h-14 px-7 rounded-full bg-white text-[#061A38] font-bold hover:bg-[#EAFBFF] transition"
                >
                  Kembali ke Member
                </button>
              )}
            </div>
          </div>

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
                      setSearchData({
                        ...searchData,
                        destination: e.target.value,
                      })
                    }
                    placeholder="Where to?"
                    className="w-full bg-transparent !border-none !outline-none !ring-0 focus:!border-none focus:!outline-none focus:!ring-0 text-sm font-bold text-[#102033] placeholder:text-[#102033]"
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
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        date: e.target.value,
                      })
                    }
                    className="w-full bg-transparent !border-none !outline-none !ring-0 focus:!border-none focus:!outline-none focus:!ring-0 text-sm font-bold text-[#102033]"
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
                      setSearchData({
                        ...searchData,
                        travelers: e.target.value,
                      })
                    }
                    className="w-full bg-transparent !border-none !outline-none !ring-0 focus:!border-none focus:!outline-none focus:!ring-0 text-sm font-bold text-[#102033]"
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
                onClick={handleSearch}
                className="rounded-2xl bg-[#061A38] text-white font-bold flex items-center justify-center gap-3 hover:bg-[#0E2A55] transition"
              >
                Search Package
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section
        id="destinations"
        className="scroll-mt-[110px] py-24 bg-[#F8FBFF]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
            <div>
              <p className="text-[#17A7C8] text-sm font-black tracking-[0.18em] uppercase">
                Popular Destinations
              </p>

              <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#102033]">
                Destinasi impian pilihanmu
              </h2>
            </div>

            <button
              type="button"
              onClick={() => bukaModal("allPackages")}
              className="w-fit h-12 px-6 rounded-full border border-[#DDE7F3] text-[#102033] font-bold hover:bg-white transition flex items-center gap-2"
            >
              Lihat Semua Paket
              <FaArrowRight className="text-sm" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {packages.slice(0, 3).map((paket) => (
              <button
                type="button"
                key={paket.id}
                onClick={() => bukaModal("packageDetail", paket)}
                className="relative h-[330px] rounded-[28px] overflow-hidden text-left shadow-lg hover:-translate-y-2 hover:shadow-2xl transition"
              >
                <img
                  src={paket.gambar}
                  alt={paket.nama}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

                <div className="absolute left-0 right-0 bottom-0 p-7 text-white">
                  <span className="inline-flex px-3 py-1 rounded-full bg-[#2FD6E8] text-[#061A38] text-xs font-black">
                    {paket.kategori}
                  </span>

                  <h3 className="text-[25px] font-black mt-4">
                    {paket.lokasi}
                  </h3>

                  <p className="text-white/80 mt-2 text-sm">{paket.nama}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="scroll-mt-[110px] py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
            <div>
              <p className="text-[#17A7C8] text-sm font-black tracking-[0.18em] uppercase">
                Explore Travel Packages
              </p>

              <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#102033]">
                Paket pilihan untuk liburanmu
              </h2>

              <p className="mt-4 text-[#647084] max-w-xl leading-7">
                Pilih paket favorit TravelGo atau tekan Lihat Semua Paket untuk
                membuka seluruh daftar dalam popup.
              </p>
            </div>

            <button
              type="button"
              onClick={() => bukaModal("allPackages")}
              className="w-fit px-6 h-12 rounded-full border border-[#DDE7F3] text-[#102033] font-bold hover:bg-[#F4FAFF] transition flex items-center gap-2"
            >
              Lihat Semua Paket
              <FaArrowRight className="text-sm" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {packages.slice(0, 3).map((paket) => (
              <PackageCard key={paket.id} paket={paket} />
            ))}
          </div>

          {packages.length === 0 && (
            <div className="py-14 text-center text-[#9AA0AA]">
              Data paket belum tersedia.
            </div>
          )}
        </div>
      </section>

      {/* FEATURE */}
      <section className="py-24 bg-gradient-to-br from-[#EAFBFF] via-white to-[#F3F8FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[#17A7C8] text-sm font-black tracking-[0.18em] uppercase">
            Why Choose TravelGo
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#102033]">
            Travel with confidence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-12">
            {fiturTravelGo.map((item) => (
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        className="scroll-mt-[110px] py-24 bg-[#F8FBFF]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-[#17A7C8] text-sm font-black tracking-[0.18em] uppercase">
              What travelers say
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#102033]">
              Memories from our travelers
            </h2>
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
                  terbaru langsung dari TravelGo.
                </p>
              </div>

              <form
                onSubmit={handleNewsletter}
                className="w-full bg-white rounded-[28px] p-3 flex flex-col sm:flex-row sm:items-center gap-3 shadow-xl"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 h-14 px-6 rounded-[18px] !border-none !outline-none !ring-0 focus:!border-none focus:!outline-none focus:!ring-0 text-gray-600 placeholder:text-gray-400"
                />

                <button
                  type="submit"
                  className="h-14 min-w-[170px] px-6 rounded-[18px] bg-[#061A38] text-white font-bold hover:bg-[#0E2A55] transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <footer
        id="contact"
        className="scroll-mt-[110px] bg-[#061A38] text-white pt-16 pb-8"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
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

              <p className="mt-5 text-white/65 leading-relaxed">
                TravelGo membantu customer menemukan paket, memilih destinasi,
                dan merencanakan perjalanan dengan mudah.
              </p>
            </div>

            <div>
              <h3 className="font-black mb-5">Quick Links</h3>

              <div className="space-y-3 text-white/65 flex flex-col items-start">
                <button type="button" onClick={() => scrollKe("home")}>
                  Home
                </button>

                <button type="button" onClick={() => scrollKe("destinations")}>
                  Destinations
                </button>

                <button type="button" onClick={() => scrollKe("packages")}>
                  Packages
                </button>

                <button type="button" onClick={() => scrollKe("testimonials")}>
                  Testimonials
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-black mb-5">Support</h3>

              <div className="space-y-3 text-white/65 flex flex-col items-start">
                <button type="button" onClick={() => bukaModal("guestChat")}>
                  Customer Service
                </button>

                <button
                  type="button"
                  onClick={() =>
                    tampilkanNotifikasi(
                      "Panduan booking tersedia setelah login",
                    )
                  }
                >
                  Booking Guide
                </button>

                <button
                  type="button"
                  onClick={() =>
                    tampilkanNotifikasi(
                      "Informasi refund dapat ditanyakan ke Customer Service",
                    )
                  }
                >
                  Refund Policy
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-black mb-5">Contact Us</h3>

              <div className="space-y-4 text-white/65">
                <p className="flex gap-3">
                  <span className="material-symbols-outlined text-[#2FD6E8]">
                    location_on
                  </span>
                  Pekanbaru, Indonesia
                </p>

                <p className="flex gap-3">
                  <span className="material-symbols-outlined text-[#2FD6E8]">
                    call
                  </span>
                  +62 706 888 0562
                </p>

                <p className="flex gap-3">
                  <span className="material-symbols-outlined text-[#2FD6E8]">
                    mail
                  </span>
                  hello@travelgo.com
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-7 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-white/50 text-sm">
            <p>© 2026 TravelGo. All rights reserved.</p>
            <p>Made with love for travelers.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING CHAT */}
      <div className="fixed right-5 bottom-5 z-[999]">
        <button
          type="button"
          onClick={() => bukaModal("guestChat")}
          className="group flex items-center gap-3 h-[56px] px-3 pr-5 rounded-full bg-[#061A38] text-white shadow-2xl hover:bg-[#0E2A55] hover:-translate-y-1 transition"
        >
          <span className="w-[40px] h-[40px] rounded-full bg-[#2FD6E8] text-[#061A38] flex items-center justify-center">
            <span className="material-symbols-outlined text-[23px]">
              support_agent
            </span>
          </span>

          <span className="hidden sm:block text-left leading-tight">
            <span className="block text-[11px] text-white/70 font-semibold">
              Butuh bantuan?
            </span>

            <span className="block text-[14px] font-bold">Chat TravelGo</span>
          </span>
        </button>
      </div>

      {/* POPUP SEMUA PAKET */}
      {modalType === "allPackages" && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[1280px] max-h-[90vh] overflow-y-auto bg-white rounded-[28px] p-5 md:p-7 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
              <div>
                <h2 className="text-[25px] font-black text-[#102033]">
                  Daftar Semua Paket Travel
                </h2>

                <p className="text-sm text-[#7F8A9A] mt-1">
                  Pilih paket, lihat detail, lalu lanjutkan booking.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-full md:w-[310px] h-11 rounded-[12px] border border-[#E8EDF3] flex items-center gap-3 px-4">
                  <FaSearch className="text-[#9AA0AA]" />

                  <input
                    type="text"
                    value={searchPackage}
                    onChange={(e) => setSearchPackage(e.target.value)}
                    placeholder="Cari paket atau lokasi..."
                    className="w-full bg-transparent !border-none !outline-none !ring-0 focus:!border-none focus:!outline-none focus:!ring-0 text-sm"
                  />
                </div>

                <button
                  type="button"
                  onClick={tutupModal}
                  className="w-10 h-10 rounded-full bg-[#F4F7FA] text-[#102033] flex items-center justify-center hover:bg-red-50 hover:text-red-500"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paketTampil.map((paket) => (
                <PackageCard key={paket.id} paket={paket} popup />
              ))}
            </div>

            {paketTampil.length === 0 && (
              <p className="py-12 text-center text-sm text-[#9AA0AA]">
                Paket tidak ditemukan.
              </p>
            )}
          </div>
        </div>
      )}

      {/* POPUP DETAIL PAKET */}
      {modalType === "packageDetail" && selectedPackage && (
        <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[900px] max-h-[90vh] overflow-y-auto bg-white rounded-[28px] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-[25px] font-black text-[#102033]">
                  Detail Paket
                </h2>

                <p className="text-sm text-[#7F8A9A] mt-1">
                  Lihat fasilitas paket sebelum melanjutkan booking.
                </p>
              </div>

              <button
                type="button"
                onClick={tutupModal}
                className="w-10 h-10 rounded-full bg-[#F4F7FA] flex items-center justify-center hover:bg-red-50 hover:text-red-500"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
              <img
                src={selectedPackage.gambar}
                alt={selectedPackage.nama}
                className="w-full h-[280px] object-cover rounded-[20px]"
              />

              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex px-3 py-1.5 rounded-full bg-[#EAF4FF] text-[#0C719E] text-xs font-bold">
                    {selectedPackage.kategori}
                  </span>

                  <span className="text-sm text-[#B88700] font-bold flex items-center gap-1">
                    <FaStar />
                    {selectedPackage.rating}
                  </span>
                </div>

                <h3 className="text-[28px] font-black text-[#102033] mt-4">
                  {selectedPackage.nama}
                </h3>

                <p className="text-sm text-[#7F8A9A] flex items-center gap-2 mt-3">
                  <FaMapMarkerAlt className="text-[#2FA9E8]" />
                  {selectedPackage.lokasi}
                </p>

                <p className="text-[#596070] leading-7 mt-5">
                  {selectedPackage.deskripsi}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="bg-[#F7FAFF] rounded-[14px] p-4">
                    <p className="text-xs text-[#9AA0AA] font-bold">Harga</p>

                    <p className="font-black text-[#0C9FC0] mt-1">
                      {formatRupiah(selectedPackage.harga)}
                    </p>
                  </div>

                  <div className="bg-[#F7FAFF] rounded-[14px] p-4">
                    <p className="text-xs text-[#9AA0AA] font-bold">Durasi</p>

                    <p className="font-black text-[#102033] mt-1">
                      {selectedPackage.durasi}
                    </p>
                  </div>
                </div>

                <div className="bg-[#F7FAFF] rounded-[14px] p-4 mt-4">
                  <p className="font-black text-sm text-[#102033] mb-3">
                    Fasilitas
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedPackage.fasilitas.map((fasilitas, index) => (
                      <p
                        key={`${fasilitas}-${index}`}
                        className="text-sm text-[#596070] flex items-start gap-2"
                      >
                        <FaCheckCircle className="text-[#2FA9E8] mt-1" />
                        {fasilitas}
                      </p>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleBooking(selectedPackage)}
                  className="w-full h-12 mt-5 rounded-[14px] bg-[#061A38] text-white font-bold hover:bg-[#0E2A55] transition"
                >
                  Booking Sekarang
                </button>

                {!sudahLoginSebagaiUser && (
                  <p className="text-center text-xs text-[#9AA0AA] mt-3">
                    Booking membutuhkan akun TravelGo.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP CHAT GUEST */}
      {modalType === "guestChat" && (
        <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[560px] bg-white rounded-[28px] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-[24px] font-black text-[#102033]">
                  Customer Service TravelGo
                </h2>

                <p className="text-sm text-[#7F8A9A] mt-1">
                  Kirim pertanyaan sebelum melakukan booking.
                </p>
              </div>

              <button
                type="button"
                onClick={tutupModal}
                className="w-10 h-10 rounded-full bg-[#F4F7FA] flex items-center justify-center hover:bg-red-50 hover:text-red-500"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleGuestChat} className="space-y-4">
              <input
                type="text"
                value={guestChat.name}
                onChange={(e) =>
                  setGuestChat({
                    ...guestChat,
                    name: e.target.value,
                  })
                }
                placeholder="Nama"
                className="w-full h-12 px-4 rounded-[14px] border border-[#DDE7F3] !outline-none !ring-0 focus:!border-[#2FA9E8]"
              />

              <input
                type="email"
                value={guestChat.email}
                onChange={(e) =>
                  setGuestChat({
                    ...guestChat,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
                className="w-full h-12 px-4 rounded-[14px] border border-[#DDE7F3] !outline-none !ring-0 focus:!border-[#2FA9E8]"
              />

              <textarea
                value={guestChat.message}
                onChange={(e) =>
                  setGuestChat({
                    ...guestChat,
                    message: e.target.value,
                  })
                }
                placeholder="Tulis pertanyaan..."
                className="w-full min-h-[130px] px-4 py-3 rounded-[14px] border border-[#DDE7F3] !outline-none !ring-0 focus:!border-[#2FA9E8] resize-none"
              />

              <button
                type="submit"
                className="w-full h-12 rounded-[14px] bg-[#061A38] text-white font-bold hover:bg-[#0E2A55] transition"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
