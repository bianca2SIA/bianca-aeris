import { Link } from "react-router-dom";

import {
  FaCalendarCheck,
  FaUserPlus,
  FaDollarSign,
  FaPlane,
  FaSearch,
  FaEllipsisH,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaRegCalendarAlt,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaStar,
  FaBuilding,
  FaGlobeAsia,
  FaUserCircle,
  FaCreditCard,
} from "react-icons/fa";

import bookingData from "../data/booking.json";
import paketData from "../data/paket.json";
import travelerData from "../data/traveler.json";

export default function Dashboard() {
  const getStatusStyle = (status) => {
    if (status === "Dikonfirmasi") return "bg-[#5A91D6] text-white";
    if (status === "Menunggu") return "bg-[#EAF4FF] text-[#5A91D6]";
    return "bg-[#FFE5E8] text-[#F06C7A]";
  };

  const rupiahToNumber = (rupiah) => {
    if (!rupiah) return 0;
    return Number(String(rupiah).replace(/[^0-9]/g, ""));
  };

  const formatRupiahSingkat = (angka) => {
    if (angka >= 1000000000) {
      return `Rp ${(angka / 1000000000).toFixed(1).replace(".", ",")} M`;
    }

    if (angka >= 1000000) {
      return `Rp ${(angka / 1000000).toFixed(1).replace(".", ",")} Jt`;
    }

    return `Rp ${angka.toLocaleString("id-ID")}`;
  };

  const formatDurasiPendek = (durasi) => {
    if (!durasi) return "-";
    return durasi
      .replace("Hari", "H")
      .replace("Malam", "M")
      .replaceAll(" ", "");
  };

  const semuaPaket = [
    paketData.paketBaru,
    ...(paketData.paketUnggulan || []),
    ...(paketData.paketPopuler || []),
    ...(paketData.paketRekomendasi || []),
  ].filter(Boolean);

  const paketUnik = Array.from(
    new Map(semuaPaket.map((item) => [item.nama, item])).values()
  );

  const totalBooking = bookingData.length;
  const totalCustomer = travelerData.length;
  const totalPendapatan = bookingData.reduce(
    (total, item) => total + rupiahToNumber(item.harga),
    0
  );

  const totalDikonfirmasi = bookingData.filter(
    (item) => item.status === "Dikonfirmasi"
  ).length;

  const totalMenunggu = bookingData.filter(
    (item) => item.status === "Menunggu"
  ).length;

  const totalDibatalkan = bookingData.filter(
    (item) => item.status === "Dibatalkan"
  ).length;

  const stats = [
    {
      title: "Total Booking",
      value: totalBooking.toLocaleString("id-ID"),
      icon: <FaCalendarCheck />,
      percent: "+2.98%",
      color: "text-[#5A91D6]",
      bg: "bg-[#EAF4FF]",
    },
    {
      title: "Total Customer",
      value: totalCustomer.toLocaleString("id-ID"),
      icon: <FaUserPlus />,
      percent: "+1.45%",
      color: "text-[#5A91D6]",
      bg: "bg-[#EAF4FF]",
    },
    {
      title: "Total Pendapatan",
      value: formatRupiahSingkat(totalPendapatan),
      icon: <FaDollarSign />,
      percent: "+3.75%",
      color: "text-[#5A91D6]",
      bg: "bg-[#EAF4FF]",
    },
  ];

  const travelPackages = paketUnik.slice(0, 3).map((item, index) => ({
    label:
      index === 0
        ? "Paket Terbaru"
        : index === 1
        ? "Favorit Customer"
        : "Rekomendasi",
    nama: item.nama,
    durasi: item.durasi || "5 Hari / 4 Malam",
    harga: item.harga || "Rp 0",
    gambar:
      item.gambar ||
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
  }));

  const recentBookings = bookingData.slice(0, 5);

  const paketCount = bookingData.reduce((result, item) => {
    result[item.paket] = (result[item.paket] || 0) + 1;
    return result;
  }, {});

  const topDestinations = Object.entries(paketCount)
    .map(([paket, jumlah]) => ({
      paket,
      jumlah,
      persen: Math.round((jumlah / totalBooking) * 100),
    }))
    .sort((a, b) => b.jumlah - a.jumlah)
    .slice(0, 4);

  const warnaDestinasi = ["#5A91D6", "#70A9F8", "#B9D8FF", "#E5F1FF"];

  const messages = travelerData.slice(0, 7).map((item, index) => ({
    nama: item.nama,
    pesan: `Tertarik dengan ${item.paket}`,
    waktu: ["11:00", "2:30", "9:45", "10:15", "1:20", "10:00", "12:30"][
      index
    ],
    icon:
      index === 0 ? (
        <FaBuilding />
      ) : index === 1 ? (
        <FaGlobeAsia />
      ) : (
        <FaUserCircle />
      ),
    badge: String((index % 5) + 1),
  }));

  const upcomingTrips = bookingData.slice(0, 4).map((item, index) => {
    const paket = paketUnik.find((paketItem) => paketItem.nama === item.paket);

    return {
      label:
        index === 0
          ? "Trip Customer"
          : index === 1
          ? "Paket Populer"
          : index === 2
          ? "Adventure Tour"
          : "City Highlights",
      nama: item.paket,
      tanggal: item.tanggal,
      gambar:
        paket?.gambar ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",
      orang: "+2",
      active: index === 1,
    };
  });

  const recentActivity = bookingData.slice(0, 5).map((item, index) => ({
    icon:
      item.status === "Dibatalkan" ? (
        <FaCheckCircle />
      ) : item.status === "Menunggu" ? (
        <FaRegCalendarAlt />
      ) : index === 2 ? (
        <FaCreditCard />
      ) : (
        <FaUserCircle />
      ),
    text:
      item.status === "Dibatalkan"
        ? `${item.nama} membatalkan booking ${item.paket}.`
        : item.status === "Menunggu"
        ? `${item.nama} menunggu konfirmasi untuk ${item.paket}.`
        : `${item.nama} melakukan booking ${item.paket}.`,
    time: ["9:30 AM", "10:00 AM", "11:15 AM", "12:45 PM", "2:30 PM"][index],
  }));

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-8 py-7 text-[#202436]">
      <div className="grid grid-cols-[1fr_300px] gap-6">
        {/* KONTEN UTAMA */}
        <section className="space-y-6">
          {/* STAT CARD */}
          <div className="grid grid-cols-3 gap-5">
            {stats.map((item) => (
              <div
                key={item.title}
                className="bg-[#EAF4FF] rounded-[12px] p-4 flex items-center justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-[10px] bg-white flex items-center justify-center text-[#70A9F8] text-[22px]">
                    {item.icon}
                  </div>

                  <div>
                    <p className="text-[#9AA0AA] text-[13px] font-semibold mb-1">
                      {item.title}
                    </p>
                    <h2 className="text-[26px] font-bold leading-none">
                      {item.value}
                    </h2>
                  </div>
                </div>

                <span
                  className={`${item.bg} ${item.color} text-[12px] font-bold px-3 py-1 rounded-[7px]`}
                >
                  {item.percent}
                </span>
              </div>
            ))}
          </div>

          {/* CHART DAN DESTINASI */}
          <div className="grid grid-cols-[1.2fr_0.9fr] gap-5">
            {/* REVENUE */}
            <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[17px]">Ringkasan Pendapatan</h3>

                <button className="h-[34px] px-4 rounded-[8px] bg-[#70A9F8] text-white text-sm font-bold">
                  Mingguan
                </button>
              </div>

              <div className="relative h-[220px]">
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[12px] text-[#8F96A3]">
                  <span>Rp 8Jt</span>
                  <span>Rp 6Jt</span>
                  <span>Rp 4Jt</span>
                  <span>Rp 2Jt</span>
                  <span>Rp 0</span>
                </div>

                <div className="absolute left-12 right-0 top-3 bottom-8 flex flex-col justify-between">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="border-t border-[#EEF1F5]"></div>
                  ))}
                </div>

                <svg
                  viewBox="0 0 520 190"
                  className="absolute left-12 right-0 top-4 w-[calc(100%-48px)] h-[180px]"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="incomeArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#70A9F8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#70A9F8" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M0,125 C50,145 75,95 120,105 C165,118 160,60 210,52 C260,44 245,120 300,102 C350,84 360,45 420,70 C470,92 475,105 520,80 L520,180 L0,180 Z"
                    fill="url(#incomeArea)"
                  />

                  <path
                    d="M0,125 C50,145 75,95 120,105 C165,118 160,60 210,52 C260,44 245,120 300,102 C350,84 360,45 420,70 C470,92 475,105 520,80"
                    fill="none"
                    stroke="#70A9F8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  <line
                    x1="245"
                    y1="25"
                    x2="245"
                    y2="165"
                    stroke="#70A9F8"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />

                  <circle cx="245" cy="52" r="6" fill="#70A9F8" />
                </svg>

                <div className="absolute left-[49%] top-[15px] bg-[#EAF4FF] rounded-[8px] px-3 py-2 text-center text-xs">
                  <p className="font-bold text-[#202436]">
                    {formatRupiahSingkat(totalPendapatan / 10)}
                  </p>
                  <p className="text-[#9AA0AA]">12 Jul 28</p>
                </div>

                <div className="absolute left-12 right-0 bottom-0 grid grid-cols-7 text-[12px] text-[#8F96A3]">
                  {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
                    (hari) => (
                      <span key={hari} className="text-center">
                        {hari}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* TOP DESTINATION */}
            <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[17px]">Paket Teratas</h3>

                <button className="h-[34px] px-4 rounded-[8px] bg-[#70A9F8] text-white text-sm font-bold">
                  Bulan Ini
                </button>
              </div>

              <div className="flex items-center gap-6 h-[220px]">
                <div className="relative w-[150px] h-[150px] rounded-full border-[26px] border-[#EAF4FF]">
                  <div className="absolute inset-[-26px] rounded-full border-[26px] border-transparent border-t-[#70A9F8] border-l-[#5A91D6] border-b-[#B9D8FF] rotate-45"></div>
                </div>

                <div className="space-y-4 text-[13px]">
                  {topDestinations.map((item, index) => (
                    <div key={item.paket}>
                      <p className="font-bold flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-sm"
                          style={{
                            backgroundColor:
                              warnaDestinasi[index] || "#E5F1FF",
                          }}
                        ></span>
                        {item.paket} ({item.persen}%)
                      </p>
                      <p className="text-[#9AA0AA] ml-5">
                        {item.jumlah} Booking
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TOTAL TRIP + MESSAGES */}
          <div className="grid grid-cols-[1.3fr_0.7fr] gap-5">
            <div className="space-y-5">
              {/* TOTAL TRIP */}
              <div className="bg-white rounded-[14px] p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-[50px] h-[50px] rounded-[10px] bg-[#EAF4FF] flex items-center justify-center text-[#70A9F8] text-[24px]">
                    <FaPlane />
                  </div>

                  <div>
                    <p className="text-[13px] text-[#9AA0AA] font-semibold">
                      Total Perjalanan
                    </p>
                    <h2 className="text-[25px] font-bold">{totalBooking}</h2>
                  </div>

                  <div className="flex-1 h-[15px] rounded-full overflow-hidden bg-[#EAF4FF] flex">
                    <div className="w-[52%] bg-[#DCEEFF]"></div>
                    <div className="w-[38%] bg-[#B9D8FF]"></div>
                    <div className="w-[10%] bg-[#70A9F8]"></div>
                  </div>

                  <div className="flex items-center gap-5 text-[13px] font-semibold">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-[#DCEEFF]"></span>
                      Selesai {totalDikonfirmasi}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-[#B9D8FF]"></span>
                      Menunggu {totalMenunggu}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-[#70A9F8]"></span>
                      Batal {totalDibatalkan}
                    </span>
                  </div>
                </div>
              </div>

              {/* TRAVEL PACKAGE */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[17px]">Paket Travel</h3>

                  <div className="flex items-center gap-3">
                    <p className="text-[#B0B3BB] text-sm">Urutkan:</p>

                    <button className="h-[34px] px-4 bg-white rounded-[8px] text-sm font-semibold text-[#596070] hover:shadow-md transition">
                      Terbaru
                    </button>

                    <Link
                      to="/paket"
                      className="h-[34px] px-4 bg-white rounded-[8px] text-sm font-semibold text-[#596070] hover:shadow-md transition flex items-center"
                    >
                      Lihat Semua
                    </Link>
                  </div>
                </div>

                <div className="bg-[#EAF4FF] rounded-[14px] p-4 grid grid-cols-3 gap-4">
                  {travelPackages.map((item) => (
                    <div
                      key={item.nama}
                      className="bg-white rounded-[12px] p-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="h-[165px] rounded-[10px] overflow-hidden relative mb-3">
                        <img
                          src={item.gambar}
                          alt={item.nama}
                          className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        />

                        <span className="absolute left-3 top-3 bg-white/90 text-[#70A9F8] text-[11px] font-bold px-3 py-1 rounded-[6px]">
                          {item.label}
                        </span>
                      </div>

                      <h4 className="font-bold text-[15px] mb-1">
                        {item.nama}
                      </h4>

                      <p className="text-[#9AA0AA] text-[12px] flex items-center gap-1 mb-3">
                        <FaClock />
                        {item.durasi}
                      </p>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[#70A9F8] text-[18px] font-bold">
                            {item.harga}
                          </p>
                          <p className="text-[#9AA0AA] text-[11px]">
                            per orang
                          </p>
                        </div>

                        <Link
                          to={`/paket/${encodeURIComponent(item.nama)}`}
                          className="bg-[#70A9F8] text-white text-[12px] font-bold px-4 py-2 rounded-[7px] hover:bg-[#5D9AF2] transition"
                        >
                          Detail
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[17px]">Pesan Customer</h3>
                <FaEllipsisH />
              </div>

              <div className="space-y-4">
                {messages.map((item) => (
                  <div
                    key={item.nama}
                    className="flex items-center gap-3 hover:bg-[#F8FBFF] rounded-[10px] p-2 transition"
                  >
                    <div className="w-[40px] h-[40px] rounded-full bg-[#EAF4FF] flex items-center justify-center text-[#70A9F8] shrink-0">
                      {item.icon}
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between">
                        <h4 className="font-bold text-[13px] truncate">
                          {item.nama}
                        </h4>
                        <span className="text-[10px] text-[#70A9F8]">
                          {item.waktu}
                        </span>
                      </div>

                      <p className="text-[12px] text-[#9AA0AA] truncate">
                        {item.pesan}
                      </p>
                    </div>

                    <span className="w-[18px] h-[18px] rounded-[5px] bg-[#70A9F8] text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RECENT BOOKINGS */}
          <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[17px]">Booking Terbaru</h3>

              <div className="flex items-center gap-3">
                <div className="w-[250px] h-[38px] bg-[#F8FAFC] rounded-[8px] flex items-center px-4 gap-3">
                  <FaSearch className="text-[#B9C0CA] text-sm" />
                  <input
                    type="text"
                    placeholder="Cari booking"
                    className="w-full outline-none bg-transparent text-sm placeholder:text-[#B9C0CA]"
                  />
                </div>

                <Link
                  to="/booking"
                  className="h-[38px] px-5 rounded-[8px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition flex items-center"
                >
                  Lihat Semua
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-[10px]">
              <table className="w-full">
                <thead className="bg-[#EAF4FF]">
                  <tr className="text-left text-[12px] text-[#9AA0AA]">
                    <th className="px-4 py-3 font-semibold">Nama</th>
                    <th className="px-4 py-3 font-semibold">Paket</th>
                    <th className="px-4 py-3 font-semibold">Durasi</th>
                    <th className="px-4 py-3 font-semibold">Tanggal</th>
                    <th className="px-4 py-3 font-semibold">Harga</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentBookings.map((item) => (
                    <tr
                      key={item.kode}
                      className="border-b border-[#EEF1F5] hover:bg-[#F8FBFF] hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <td className="px-4 py-4 text-[13px] font-semibold">
                        <Link
                          to={`/booking/${item.kode}`}
                          className="hover:text-[#70A9F8] transition"
                        >
                          {item.nama}
                        </Link>
                      </td>

                      <td className="px-4 py-4 text-[13px] font-semibold text-[#596070]">
                        {item.paket}
                      </td>

                      <td className="px-4 py-4 text-[13px] text-[#596070]">
                        {formatDurasiPendek(item.durasi)}
                      </td>

                      <td className="px-4 py-4 text-[13px] text-[#596070]">
                        {item.tanggal}
                      </td>

                      <td className="px-4 py-4 text-[13px] font-bold text-[#596070]">
                        {item.harga}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-[6px] text-[11px] font-bold ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SIDEBAR KANAN */}
        <aside className="space-y-6">
          {/* CALENDAR */}
          <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[17px]">Juli 2028</h3>

              <div className="flex items-center gap-2">
                <button className="w-[32px] h-[32px] rounded-[8px] bg-[#F4F5F7] flex items-center justify-center">
                  <FaChevronLeft />
                </button>

                <button className="w-[32px] h-[32px] rounded-[8px] bg-[#F4F5F7] flex items-center justify-center">
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center text-[11px] text-[#B0B3BB] mb-4">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-3 text-center text-[13px] text-[#596070]">
              {[
                25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
                27, 28, 29, 30, 31, 1, 2, 3, 4, 5,
              ].map((day, index) => (
                <span
                  key={index}
                  className={`w-[28px] h-[28px] mx-auto flex items-center justify-center rounded-[7px] ${
                    day === 12 || day === 19
                      ? "bg-[#70A9F8] text-white font-bold"
                      : day === 3 || day === 30
                      ? "text-[#5A91D6] underline underline-offset-4"
                      : index < 6 || index > 36
                      ? "text-[#C6CBD3]"
                      : ""
                  }`}
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="border-t border-[#EEF1F5] my-5"></div>

            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[17px]">Trip Mendatang</h3>

              <button className="w-[36px] h-[36px] rounded-[10px] bg-[#70A9F8] text-white flex items-center justify-center hover:bg-[#5D9AF2] transition">
                <FaPlus />
              </button>
            </div>

            <div className="space-y-4">
              {upcomingTrips.map((item) => (
                <div
                  key={item.nama}
                  className={`flex gap-3 rounded-[12px] p-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${
                    item.active ? "bg-[#EAF4FF]" : "bg-[#F8FAFC]"
                  }`}
                >
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-[58px] h-[58px] rounded-[9px] object-cover"
                  />

                  <div className="flex-1">
                    <span className="bg-[#EAF4FF] text-[#5A91D6] text-[10px] font-bold px-2 py-1 rounded">
                      {item.label}
                    </span>

                    <h4 className="font-bold text-[14px] mt-1 line-clamp-1">
                      {item.nama}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-[#9AA0AA] mt-1">
                      <FaUsers />
                      <span>{item.orang}</span>
                      <FaRegCalendarAlt />
                      <span>{item.tanggal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[17px]">Aktivitas Terbaru</h3>
              <FaEllipsisH />
            </div>

            <p className="text-[13px] font-bold mb-4">Hari Ini</p>

            <div className="space-y-5">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#70A9F8] text-white flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>

                  <div>
                    <p className="text-[13px] leading-5 text-[#596070] font-semibold">
                      {item.text}
                    </p>
                    <p className="text-[11px] text-[#B0B3BB] mt-1">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
      <footer className="flex items-center justify-between mt-8 text-[#B0B3BB] text-sm">
        <div className="flex items-center gap-8">
          <span>Copyright © 2024 TravelGo</span>
          <span>Privacy Policy</span>
          <span>Term and conditions</span>
          <span>Contact</span>
        </div>

        <div className="flex items-center gap-4 text-[#9AA0AA]">
          <span>ⓕ</span>
          <span>𝕏</span>
          <span>◎</span>
          <span>▶</span>
          <span>in</span>
        </div>
      </footer>
    </div>
  );
}