import { useMemo, useState } from "react";
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
  FaBuilding,
  FaGlobeAsia,
  FaUserCircle,
  FaCreditCard,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";

import bookingData from "../data/booking.json";
import paketData from "../data/paket.json";
import travelerData from "../data/traveler.json";

const STORAGE_BOOKING = "travelgo_dashboard_bookings";

const NAMA_BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const HARI = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const PERIODE_PENDAPATAN = ["Mingguan", "Bulanan", "Tahunan"];
const WARNA_DESTINASI = ["#5A91D6", "#70A9F8", "#B9D8FF", "#E5F1FF"];

function ambilBookingAwal() {
  const savedData = localStorage.getItem(STORAGE_BOOKING);

  if (!savedData) return bookingData;

  try {
    return JSON.parse(savedData);
  } catch (error) {
    localStorage.removeItem(STORAGE_BOOKING);
    return bookingData;
  }
}

function rupiahToNumber(rupiah) {
  if (!rupiah) return 0;
  return Number(String(rupiah).replace(/[^0-9]/g, ""));
}

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(angka || 0));
}

function formatRupiahSingkat(angka) {
  if (angka >= 1000000000) {
    return `Rp ${(angka / 1000000000).toFixed(1).replace(".", ",")} M`;
  }

  if (angka >= 1000000) {
    return `Rp ${(angka / 1000000).toFixed(1).replace(".", ",")} Jt`;
  }

  return `Rp ${Number(angka || 0).toLocaleString("id-ID")}`;
}

function formatDurasiPendek(durasi) {
  if (!durasi) return "-";
  return durasi.replace("Hari", "H").replace("Malam", "M").replaceAll(" ", "");
}

function getStatusStyle(status) {
  if (status === "Dikonfirmasi" || status === "Selesai") {
    return "bg-[#5A91D6] text-white";
  }

  if (status === "Menunggu" || status === "Diproses") {
    return "bg-[#EAF4FF] text-[#5A91D6]";
  }

  return "bg-[#FFE5E8] text-[#F06C7A]";
}

function getLevelStyle(level) {
  if (level === "Platinum") return "bg-[#D7ECFF] text-[#4B91E8]";
  if (level === "Gold") return "bg-[#C9A94B] text-white";
  if (level === "Silver") return "bg-[#E1E1E1] text-[#555B66]";
  return "bg-[#EAF4FF] text-[#70A9F8]";
}

function getPromoStyle(promo) {
  if (promo === "Aktif") return "bg-[#EAF4FF] text-[#5A91D6]";
  return "bg-[#F1F1F1] text-[#9AA0AA]";
}

function ambilSemuaPaket() {
  const semuaPaket = [
    paketData.paketBaru,
    ...(paketData.paketUnggulan || []),
    ...(paketData.paketPopuler || []),
    ...(paketData.paketRekomendasi || []),
  ].filter(Boolean);

  return Array.from(
    new Map(semuaPaket.map((item) => [item.nama, item])).values(),
  );
}

function buatHariKalender(tahun, bulanIndex) {
  const firstDay = new Date(tahun, bulanIndex, 1).getDay();
  const daysInMonth = new Date(tahun, bulanIndex + 1, 0).getDate();
  const daysInPrevMonth = new Date(tahun, bulanIndex, 0).getDate();
  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, muted: true });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      muted: false,
      trip: [3, 12, 19, 30].includes(i),
      active: [12, 19].includes(i),
    });
  }

  while (days.length < 42) {
    days.push({
      day: days.length - firstDay - daysInMonth + 1,
      muted: true,
    });
  }

  return days;
}

function KartuInfo({ label, value, children, className = "" }) {
  return (
    <div className={`bg-[#F8FBFF] rounded-[14px] p-4 ${className}`}>
      <p className="text-[12px] text-[#9AA0AA] font-semibold">{label}</p>
      {children || <p className="text-[15px] font-bold">{value}</p>}
    </div>
  );
}

function ModalWrapper({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-[900px] bg-white rounded-[18px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-[20px] font-bold">{title}</h2>
            <p className="text-[13px] text-[#9AA0AA] mt-1">
              Ringkasan data TravelGo dalam tampilan dashboard.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-[36px] h-[36px] rounded-full bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition"
          >
            <FaTimes />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function StatCard({ item, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-[#EAF4FF] rounded-[12px] p-4 flex items-center justify-between text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-[52px] h-[52px] rounded-[10px] bg-white flex items-center justify-center text-[#70A9F8] text-[22px] shrink-0">
          {item.icon}
        </div>

        <div className="min-w-0">
          <p className="text-[#9AA0AA] text-[13px] font-semibold mb-1">
            {item.title}
          </p>
          <h2 className="text-[24px] xl:text-[26px] font-bold leading-none truncate">
            {item.value}
          </h2>
          <p className="text-[11px] text-[#9AA0AA] mt-1 truncate">
            {item.desc}
          </p>
        </div>
      </div>

      <span className="bg-[#EAF4FF] text-[#5A91D6] text-[12px] font-bold px-3 py-1 rounded-[7px] shrink-0">
        {item.percent}
      </span>
    </button>
  );
}

function DashboardChart({ periode, setPeriode, totalPendapatan, onDetail }) {
  return (
    <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h3 className="font-bold text-[17px]">Ringkasan Pendapatan</h3>

        <div className="flex items-center gap-2">
          {PERIODE_PENDAPATAN.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setPeriode(item)}
              className={`h-[34px] px-4 rounded-[8px] text-sm font-bold transition ${
                periode === item
                  ? "bg-[#70A9F8] text-white"
                  : "bg-[#F4F5F7] text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onDetail}
        className="relative h-[220px] w-full text-left"
      >
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

        <div className="absolute left-[48%] top-[15px] bg-[#EAF4FF] rounded-[8px] px-3 py-2 text-center text-xs shadow-sm">
          <p className="font-bold text-[#202436]">
            {formatRupiahSingkat(totalPendapatan / 10)}
          </p>
          <p className="text-[#9AA0AA]">12 Jul 28</p>
        </div>

        <div className="absolute left-12 right-0 bottom-0 grid grid-cols-7 text-[12px] text-[#8F96A3]">
          {HARI.map((hari) => (
            <span key={hari} className="text-center">
              {hari}
            </span>
          ))}
        </div>
      </button>
    </div>
  );
}

function PaketTeratas({ periode, setPeriode, topDestinations, onDetail }) {
  return (
    <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h3 className="font-bold text-[17px]">Paket Teratas</h3>

        <button
          type="button"
          onClick={() =>
            setPeriode(periode === "Bulan Ini" ? "Tahun Ini" : "Bulan Ini")
          }
          className="h-[34px] px-4 rounded-[8px] bg-[#70A9F8] text-white text-sm font-bold"
        >
          {periode}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 min-h-[220px]">
        <button
          type="button"
          onClick={() => topDestinations[0] && onDetail(topDestinations[0])}
          className="relative w-[150px] h-[150px] rounded-full border-[26px] border-[#EAF4FF] shrink-0"
        >
          <div className="absolute inset-[-26px] rounded-full border-[26px] border-transparent border-t-[#70A9F8] border-l-[#5A91D6] border-b-[#B9D8FF] rotate-45"></div>
        </button>

        <div className="space-y-4 text-[13px] w-full">
          {topDestinations.map((item, index) => (
            <button
              type="button"
              key={item.paket}
              onClick={() => onDetail(item)}
              className="w-full text-left hover:bg-[#F8FBFF] rounded-[10px] p-2 transition"
            >
              <p className="font-bold flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{
                    backgroundColor: WARNA_DESTINASI[index] || "#E5F1FF",
                  }}
                ></span>
                <span className="line-clamp-1">
                  {item.paket} ({item.persen}%)
                </span>
              </p>
              <p className="text-[#9AA0AA] ml-5">{item.jumlah} Booking</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaketTravel({ travelPackages, onDetail }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="font-bold text-[17px]">Paket Travel</h3>

        <div className="flex items-center gap-3">
          <p className="text-[#B0B3BB] text-sm">Urutkan:</p>

          <button
            type="button"
            className="h-[34px] px-4 bg-white rounded-[8px] text-sm font-semibold text-[#596070] hover:shadow-md transition"
          >
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

      <div className="bg-[#EAF4FF] rounded-[14px] p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {travelPackages.map((item) => (
          <div
            key={item.nama}
            className="bg-white rounded-[12px] p-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <button
              type="button"
              onClick={() => onDetail(item)}
              className="w-full text-left"
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

              <h4 className="font-bold text-[15px] mb-1 line-clamp-1">
                {item.nama}
              </h4>

              <p className="text-[#9AA0AA] text-[12px] flex items-center gap-1 mb-3">
                <FaClock />
                {item.durasi}
              </p>
            </button>

            <button
              type="button"
              onClick={() => onDetail(item)}
              className="w-full h-[38px] bg-[#70A9F8] text-white text-[12px] font-bold rounded-[8px] hover:bg-[#5D9AF2] transition flex items-center justify-center"
            >
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingTerbaru({
  search,
  setSearch,
  bookings,
  onBookingDetail,
  onTravelerDetail,
}) {
  return (
    <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-5">
        <h3 className="font-bold text-[17px]">Booking Terbaru</h3>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="w-full sm:w-[330px] h-[44px] bg-white rounded-[12px] flex items-center px-4 gap-3 border border-[#EEF1F5] shadow-sm hover:shadow-md focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
            <FaSearch className="text-[#B9C0CA] text-sm shrink-0" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, alamat, paket, dll"
              className="w-full bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none text-sm placeholder:text-[#B9C0CA]"
            />
          </div>

          <Link
            to="/booking"
            className="h-[38px] px-5 rounded-[8px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition flex items-center justify-center"
          >
            Lihat Semua
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[10px]">
        <table className="w-full min-w-[760px]">
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
            {bookings.map((item, index) => (
              <tr
                key={item.kode || index}
                onClick={() => onBookingDetail(item)}
                className="border-b border-[#EEF1F5] hover:bg-[#F8FBFF] hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <td className="px-4 py-4 text-[13px] font-semibold">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTravelerDetail(item.nama);
                    }}
                    className="hover:text-[#70A9F8] transition text-left"
                  >
                    {item.nama}
                  </button>
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
                    className={`px-3 py-1 rounded-[6px] text-[11px] font-bold whitespace-nowrap ${getStatusStyle(
                      item.status,
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

      {bookings.length === 0 && (
        <div className="min-h-[160px] flex flex-col items-center justify-center text-center">
          <div className="w-[54px] h-[54px] rounded-full bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center mb-3">
            <FaSearch />
          </div>
          <h3 className="font-bold text-[#202436]">Booking tidak ditemukan</h3>
          <p className="text-[13px] text-[#9AA0AA] mt-1">
            Coba ubah kata kunci pencarian.
          </p>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [bookingSearch, setBookingSearch] = useState("");
  const [periodePendapatan, setPeriodePendapatan] = useState("Mingguan");
  const [periodePaket, setPeriodePaket] = useState("Bulan Ini");
  const [calendarMonthIndex, setCalendarMonthIndex] = useState(6);
  const [calendarYear, setCalendarYear] = useState(2028);
  const [modalType, setModalType] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [bookingList, setBookingList] = useState(ambilBookingAwal);

  const paketUnik = useMemo(() => ambilSemuaPaket(), []);

  const totalBooking = bookingList.length;
  const totalCustomer = travelerData.length;
  const totalPendapatan = bookingList.reduce(
    (total, item) => total + rupiahToNumber(item.harga),
    0,
  );
  const totalDikonfirmasi = bookingList.filter(
    (item) => item.status === "Dikonfirmasi",
  ).length;
  const totalMenunggu = bookingList.filter(
    (item) => item.status === "Menunggu",
  ).length;
  const totalDibatalkan = bookingList.filter(
    (item) => item.status === "Dibatalkan",
  ).length;

  const ringkasanPendapatan = {
    totalPendapatan,
    totalBooking,
    totalDikonfirmasi,
    totalMenunggu,
    totalDibatalkan,
  };

  const stats = [
    {
      title: "Total Booking",
      value: totalBooking.toLocaleString("id-ID"),
      icon: <FaCalendarCheck />,
      percent: "+2.98%",
      action: "booking",
      desc: "Lihat semua data booking TravelGo",
    },
    {
      title: "Total Customer",
      value: totalCustomer.toLocaleString("id-ID"),
      icon: <FaUserPlus />,
      percent: "+1.45%",
      action: "customer",
      desc: "Lihat semua customer dan traveler",
    },
    {
      title: "Total Pendapatan",
      value: formatRupiahSingkat(totalPendapatan),
      icon: <FaDollarSign />,
      percent: "+3.75%",
      action: "revenue",
      desc: "Lihat detail ringkasan pendapatan",
    },
  ];

  const travelPackages = paketUnik.slice(0, 3).map((item, index) => ({
    ...item,
    label:
      index === 0
        ? "Paket Terbaru"
        : index === 1
          ? "Favorit Customer"
          : "Rekomendasi",
    nama: item.nama,
    durasi: item.durasi || "5 Hari / 4 Malam",
    harga: item.harga || "Rp 0",
    rating: item.rating || "4.8",
    gambar:
      item.gambar ||
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
  }));

  const topDestinations = useMemo(() => {
    const paketCount = bookingList.reduce((result, item) => {
      result[item.paket] = (result[item.paket] || 0) + 1;
      return result;
    }, {});

    return Object.entries(paketCount)
      .map(([paket, jumlah]) => ({
        paket,
        jumlah,
        persen: Math.round((jumlah / Math.max(totalBooking, 1)) * 100),
        packageData: paketUnik.find((item) => item.nama === paket),
      }))
      .sort((a, b) => b.jumlah - a.jumlah)
      .slice(0, 4);
  }, [bookingList, paketUnik, totalBooking]);

  const messages = travelerData.slice(0, 7).map((item, index) => ({
    nama: item.nama,
    pesan: `Tertarik dengan ${item.paket}`,
    waktu: ["11:00", "2:30", "9:45", "10:15", "1:20", "10:00", "12:30"][index],
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

  const upcomingTrips = bookingList.slice(0, 4).map((item, index) => {
    const paket = paketUnik.find((paketItem) => paketItem.nama === item.paket);

    return {
      ...item,
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

  const recentActivity = bookingList.slice(0, 5).map((item, index) => ({
    booking: item,
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

  const filteredBookings = useMemo(() => {
    if (!bookingSearch.trim()) return bookingList.slice(0, 5);

    const keyword = bookingSearch.toLowerCase();

    return bookingList
      .filter((item) =>
        [item.nama, item.paket, item.tanggal, item.status, item.harga]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      )
      .slice(0, 5);
  }, [bookingList, bookingSearch]);

  const calendarDays = useMemo(
    () => buatHariKalender(calendarYear, calendarMonthIndex),
    [calendarMonthIndex, calendarYear],
  );

  function openModal(type, data) {
    setModalType(type);
    setSelectedData(data);
  }

  function closeModal() {
    setModalType("");
    setSelectedData(null);
  }

  function getTravelerByName(name) {
    const found = travelerData.find(
      (item) => item.nama?.toLowerCase() === name?.toLowerCase(),
    );

    if (found) return found;

    return {
      id: Date.now(),
      nama: name || "Customer TravelGo",
      email: `${String(name || "customer")
        .toLowerCase()
        .replaceAll(" ", "")}@gmail.com`,
      hp: "08xxxxxxxxxx",
      alamat: "Indonesia",
      paket: "Belum ada data paket",
      statusMember: "Member",
      level: "Regular",
      promo: "Tidak Aktif",
    };
  }

  function getTravelerBookings(name) {
    return bookingList.filter(
      (item) => item.nama?.toLowerCase() === name?.toLowerCase(),
    );
  }

  function buildTravelerDetail(name) {
    const traveler = getTravelerByName(name);
    const history = getTravelerBookings(name);
    const totalTransaksi = history.reduce(
      (total, item) => total + rupiahToNumber(item.harga),
      0,
    );

    return {
      ...traveler,
      statusMember: traveler.statusMember || "Member",
      level: traveler.level || "Regular",
      promo: traveler.promo || "Tidak Aktif",
      totalTransaksi: traveler.totalTransaksi || totalTransaksi,
      jumlahBooking: traveler.jumlahBooking || history.length,
      sourceUser: traveler.sourceUser || "Website",
      paymentMethod: traveler.paymentMethod || "Transfer Bank",
      feedback:
        traveler.feedback ||
        "Customer tertarik dengan paket TravelGo dan membutuhkan informasi lanjutan.",
      komplain: traveler.komplain || "Tidak ada komplain aktif.",
      catatan:
        traveler.catatan ||
        "Customer bisa difollow up untuk promo member dan rekomendasi paket.",
      bookingHistory: history.map((item, index) => ({
        id: item.kode || index + 1,
        paket: item.paket,
        tanggal: item.tanggal,
        durasi: item.durasi,
        pembayaran: item.metodePembayaran || "Transfer Bank",
        total: rupiahToNumber(item.harga),
        status: item.status,
      })),
    };
  }

  function handleStatClick(action) {
    if (action === "booking") {
      window.location.href = "/booking";
      return;
    }

    if (action === "customer") {
      window.location.href = "/travelers";
      return;
    }

    openModal("revenue", ringkasanPendapatan);
  }

  function handlePackageDetail(packageItem) {
    const namaPaket = packageItem.nama || packageItem.paket;
    const paket =
      paketUnik.find((item) => item.nama === namaPaket) || packageItem;
    const bookings = bookingList.filter((item) => item.paket === namaPaket);

    openModal("package", {
      ...paket,
      label: packageItem.label,
      gambar: packageItem.gambar || paket.gambar,
      durasi: packageItem.durasi || paket.durasi,
      harga: packageItem.harga || paket.harga,
      bookings,
      totalBooking: bookings.length,
      totalRevenue: bookings.reduce(
        (total, item) => total + rupiahToNumber(item.harga),
        0,
      ),
    });
  }

  function handleBookingDetail(booking) {
    openModal("booking", {
      ...booking,
      traveler: buildTravelerDetail(booking.nama),
      packageData: paketUnik.find((item) => item.nama === booking.paket),
    });
  }

  function handleTravelerDetail(name) {
    openModal("traveler", buildTravelerDetail(name));
  }

  function handleTripDetail(trip) {
    openModal("trip", {
      ...trip,
      traveler: buildTravelerDetail(trip.nama || trip.namaCustomer),
      packageData: paketUnik.find(
        (item) => item.nama === trip.paket || item.nama === trip.nama,
      ),
    });
  }

  function handleActivityDetail(activity) {
    openModal("activity", activity);
  }

  function updateBookingStatus(kode, status) {
    const updatedBookings = bookingList.map((item) =>
      item.kode === kode ? { ...item, status } : item,
    );

    setBookingList(updatedBookings);
    localStorage.setItem(STORAGE_BOOKING, JSON.stringify(updatedBookings));

    if (selectedData?.kode === kode) {
      setSelectedData({ ...selectedData, status });
    }
  }

  function handleSendMessage(traveler) {
    const customer = {
      id: `dashboard-${traveler.id || traveler.nama}`,
      nama: traveler.nama,
      email: traveler.email,
      hp: traveler.hp,
      initial: traveler.nama
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      foto: "",
      preview: `Halo ${traveler.nama}, ada yang bisa TravelGo bantu?`,
      waktu: "Baru saja",
      unread: 0,
      status: "online",
      kategori: "Customer",
      memberLevel: traveler.level || "Regular",
      lastPackage: traveler.paket || "Belum ada paket",
      totalTransaction: traveler.totalTransaksi || 0,
      archived: false,
      chat: [
        {
          from: "admin",
          text: `Halo ${traveler.nama}, ada yang bisa TravelGo bantu?`,
          time: "Baru saja",
        },
      ],
    };

    localStorage.setItem(
      "travelgo_selected_message_customer",
      JSON.stringify(customer),
    );
    window.location.href = "/messages";
  }

  function changeMonth(direction) {
    if (direction === "prev") {
      if (calendarMonthIndex === 0) {
        setCalendarMonthIndex(11);
        setCalendarYear(calendarYear - 1);
      } else {
        setCalendarMonthIndex(calendarMonthIndex - 1);
      }

      return;
    }

    if (calendarMonthIndex === 11) {
      setCalendarMonthIndex(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonthIndex(calendarMonthIndex + 1);
    }
  }

  const modalTitle = {
    booking: "Detail Booking",
    traveler: "Detail Traveler",
    package: "Detail Paket Travel",
    trip: "Detail Trip Mendatang",
    revenue: "Detail Pendapatan",
    calendar: "Trip di Kalender",
    activity: "Detail Aktivitas",
    activityList: "Semua Aktivitas Hari Ini",
    addTrip: "Tambah Trip Baru",
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
        <section className="min-w-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {stats.map((item) => (
              <StatCard
                key={item.title}
                item={item}
                onClick={() => handleStatClick(item.action)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.9fr] gap-5">
            <DashboardChart
              periode={periodePendapatan}
              setPeriode={setPeriodePendapatan}
              totalPendapatan={totalPendapatan}
              onDetail={() => openModal("revenue", ringkasanPendapatan)}
            />

            <PaketTeratas
              periode={periodePaket}
              setPeriode={setPeriodePaket}
              topDestinations={topDestinations}
              onDetail={handlePackageDetail}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-5 items-start">
            <div className="space-y-5 min-w-0">
              <div className="bg-white rounded-[14px] p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-[50px] h-[50px] rounded-[10px] bg-[#EAF4FF] flex items-center justify-center text-[#70A9F8] text-[24px]">
                      <FaPlane />
                    </div>

                    <div>
                      <p className="text-[13px] text-[#9AA0AA] font-semibold">
                        Total Perjalanan
                      </p>
                      <h2 className="text-[25px] font-bold">{totalBooking}</h2>
                    </div>
                  </div>

                  <div className="flex-1 h-[15px] rounded-full overflow-hidden bg-[#EAF4FF] flex min-w-[160px]">
                    <div className="w-[52%] bg-[#DCEEFF]"></div>
                    <div className="w-[38%] bg-[#B9D8FF]"></div>
                    <div className="w-[10%] bg-[#70A9F8]"></div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-[13px] font-semibold">
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

              <PaketTravel
                travelPackages={travelPackages}
                onDetail={handlePackageDetail}
              />
            </div>

            <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[17px]">Pesan Customer</h3>
                <button
                  type="button"
                  onClick={() => (window.location.href = "/messages")}
                  className="text-[#202436] hover:text-[#70A9F8] transition"
                >
                  <FaEllipsisH />
                </button>
              </div>

              <div className="space-y-3">
                {messages.map((item) => (
                  <button
                    type="button"
                    key={item.nama}
                    onClick={() => handleTravelerDetail(item.nama)}
                    className="w-full flex items-center gap-3 hover:bg-[#F8FBFF] rounded-[10px] p-2 transition text-left"
                  >
                    <div className="w-[40px] h-[40px] rounded-full bg-[#EAF4FF] flex items-center justify-center text-[#70A9F8] shrink-0">
                      {item.icon}
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between gap-2">
                        <h4 className="font-bold text-[13px] truncate">
                          {item.nama}
                        </h4>
                        <span className="text-[10px] text-[#70A9F8] shrink-0">
                          {item.waktu}
                        </span>
                      </div>

                      <p className="text-[12px] text-[#9AA0AA] truncate">
                        {item.pesan}
                      </p>
                    </div>

                    <span className="w-[18px] h-[18px] rounded-[5px] bg-[#70A9F8] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {item.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <BookingTerbaru
            search={bookingSearch}
            setSearch={setBookingSearch}
            bookings={filteredBookings}
            onBookingDetail={handleBookingDetail}
            onTravelerDetail={handleTravelerDetail}
          />
        </section>

        <aside className="space-y-6 min-w-0">
          <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[17px]">
                {NAMA_BULAN[calendarMonthIndex]} {calendarYear}
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => changeMonth("prev")}
                  className="w-[32px] h-[32px] rounded-[8px] bg-[#F4F5F7] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
                >
                  <FaChevronLeft />
                </button>

                <button
                  type="button"
                  onClick={() => changeMonth("next")}
                  className="w-[32px] h-[32px] rounded-[8px] bg-[#F4F5F7] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center text-[11px] text-[#B0B3BB] mb-4">
              {HARI.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-3 text-center text-[13px] text-[#596070]">
              {calendarDays.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() =>
                    item.trip &&
                    openModal("calendar", {
                      day: item.day,
                      month: NAMA_BULAN[calendarMonthIndex],
                      year: calendarYear,
                      trips: upcomingTrips,
                    })
                  }
                  className={`w-[28px] h-[28px] mx-auto flex items-center justify-center rounded-[7px] transition ${
                    item.active
                      ? "bg-[#70A9F8] text-white font-bold"
                      : item.trip
                        ? "text-[#5A91D6] underline underline-offset-4 hover:bg-[#EAF4FF]"
                        : item.muted
                          ? "text-[#C6CBD3]"
                          : "hover:bg-[#F4F5F7]"
                  }`}
                >
                  {item.day}
                </button>
              ))}
            </div>

            <div className="border-t border-[#EEF1F5] my-5"></div>

            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[17px]">Trip Mendatang</h3>

              <button
                type="button"
                onClick={() => openModal("addTrip", null)}
                className="w-[36px] h-[36px] rounded-[10px] bg-[#70A9F8] text-white flex items-center justify-center hover:bg-[#5D9AF2] transition"
              >
                <FaPlus />
              </button>
            </div>

            <div className="space-y-4">
              {upcomingTrips.map((item, index) => (
                <button
                  type="button"
                  key={`${item.nama}-${index}`}
                  onClick={() => handleTripDetail(item)}
                  className={`w-full flex gap-3 rounded-[12px] p-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left ${
                    item.active ? "bg-[#EAF4FF]" : "bg-[#F8FAFC]"
                  }`}
                >
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-[58px] h-[58px] rounded-[9px] object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
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
                      <span className="line-clamp-1">{item.tanggal}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[17px]">Aktivitas Terbaru</h3>
              <button
                type="button"
                onClick={() => openModal("activityList", recentActivity)}
                className="hover:text-[#70A9F8] transition"
              >
                <FaEllipsisH />
              </button>
            </div>

            <p className="text-[13px] font-bold mb-4">Hari Ini</p>

            <div className="space-y-5">
              {recentActivity.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleActivityDetail(item)}
                  className="w-full flex gap-3 text-left hover:bg-[#F8FBFF] rounded-[10px] p-2 transition"
                >
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
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {modalType && (
        <ModalWrapper title={modalTitle[modalType]} onClose={closeModal}>
          {modalType === "revenue" && selectedData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <KartuInfo
                  label="Total Pendapatan"
                  value={formatRupiah(selectedData.totalPendapatan)}
                />
                <KartuInfo label="Booking" value={selectedData.totalBooking} />
                <KartuInfo
                  label="Dikonfirmasi"
                  value={selectedData.totalDikonfirmasi}
                />
                <KartuInfo
                  label="Menunggu/Batal"
                  value={`${selectedData.totalMenunggu}/${selectedData.totalDibatalkan}`}
                />
              </div>

              <div className="bg-[#EAF4FF] rounded-[14px] p-4 text-[13px] leading-6 text-[#596070]">
                Pendapatan dihitung dari total harga booking pada data
                dashboard. Filter periode saat ini: <b>{periodePendapatan}</b>.
              </div>
            </>
          )}

          {modalType === "package" && selectedData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-5 mb-5">
                <img
                  src={selectedData.gambar}
                  alt={selectedData.nama || selectedData.paket}
                  className="w-full h-[220px] object-cover rounded-[14px]"
                />

                <div className="space-y-4">
                  <div>
                    <p className="text-[12px] text-[#70A9F8] font-bold mb-1">
                      {selectedData.label || "Paket TravelGo"}
                    </p>
                    <h3 className="text-[22px] font-bold">
                      {selectedData.nama || selectedData.paket}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <KartuInfo
                      label="Durasi"
                      value={selectedData.durasi || "-"}
                    />
                    <KartuInfo
                      label="Harga"
                      value={selectedData.harga || "-"}
                    />
                    <KartuInfo
                      label="Booking"
                      value={`${selectedData.totalBooking || 0} booking`}
                    />
                  </div>

                  <KartuInfo
                    label="Revenue Paket"
                    value={formatRupiah(selectedData.totalRevenue || 0)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Link
                  to="/paket"
                  className="h-[42px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition flex items-center"
                >
                  Buka Halaman Packages
                </Link>
              </div>
            </>
          )}

          {modalType === "booking" && selectedData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <KartuInfo label="Nama Traveler">
                  <button
                    type="button"
                    onClick={() => handleTravelerDetail(selectedData.nama)}
                    className="text-[15px] font-bold hover:text-[#70A9F8]"
                  >
                    {selectedData.nama}
                  </button>
                </KartuInfo>
                <KartuInfo label="Paket" value={selectedData.paket} />
                <KartuInfo label="Status">
                  <span
                    className={`inline-flex px-3 py-1 rounded-[6px] text-[12px] font-bold ${getStatusStyle(
                      selectedData.status,
                    )}`}
                  >
                    {selectedData.status}
                  </span>
                </KartuInfo>
                <KartuInfo label="Durasi" value={selectedData.durasi} />
                <KartuInfo label="Tanggal" value={selectedData.tanggal} />
                <KartuInfo label="Harga" value={selectedData.harga} />
              </div>

              <div className="flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    updateBookingStatus(selectedData.kode, "Menunggu")
                  }
                  className="h-[40px] px-4 rounded-[10px] bg-[#EAF4FF] text-[#5A91D6] text-sm font-bold"
                >
                  Jadikan Menunggu
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateBookingStatus(selectedData.kode, "Dikonfirmasi")
                  }
                  className="h-[40px] px-4 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold"
                >
                  Konfirmasi
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateBookingStatus(selectedData.kode, "Dibatalkan")
                  }
                  className="h-[40px] px-4 rounded-[10px] bg-red-50 text-red-500 text-sm font-bold"
                >
                  Batalkan
                </button>
              </div>
            </>
          )}

          {modalType === "traveler" && selectedData && (
            <>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-[62px] h-[62px] rounded-full bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center text-[24px]">
                  <FaUserCircle />
                </div>

                <div>
                  <h3 className="text-[22px] font-bold">{selectedData.nama}</h3>
                  <p className="text-[13px] text-[#9AA0AA]">
                    {selectedData.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
                <KartuInfo label="No HP" value={selectedData.hp} />
                <KartuInfo label="Alamat" value={selectedData.alamat} />
                <KartuInfo label="Level">
                  <span
                    className={`inline-flex px-3 py-1 rounded-[6px] text-[12px] font-bold ${getLevelStyle(
                      selectedData.level,
                    )}`}
                  >
                    {selectedData.level}
                  </span>
                </KartuInfo>
                <KartuInfo label="Promo">
                  <span
                    className={`inline-flex min-w-[96px] justify-center px-3 py-1 rounded-[6px] text-[12px] font-bold ${getPromoStyle(
                      selectedData.promo,
                    )}`}
                  >
                    {selectedData.promo}
                  </span>
                </KartuInfo>
                <KartuInfo label="Paket Terakhir" value={selectedData.paket} />
                <KartuInfo
                  label="Total Transaksi"
                  value={formatRupiah(selectedData.totalTransaksi)}
                />
                <KartuInfo
                  label="Jumlah Booking"
                  value={selectedData.jumlahBooking}
                />
                <KartuInfo
                  label="Sumber User"
                  value={selectedData.sourceUser}
                />
              </div>

              <div className="bg-white rounded-[14px] border border-[#EEF1F5] overflow-x-auto mb-5">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-[#EAF4FF]">
                    <tr className="text-left text-[12px] text-[#9AA0AA]">
                      <th className="px-4 py-3">Paket</th>
                      <th className="px-4 py-3">Tanggal</th>
                      <th className="px-4 py-3">Pembayaran</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedData.bookingHistory.length > 0 ? (
                      selectedData.bookingHistory.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-b border-[#EEF1F5]"
                        >
                          <td className="px-4 py-3 text-[13px] font-bold">
                            {booking.paket}
                          </td>
                          <td className="px-4 py-3 text-[13px] text-[#596070]">
                            {booking.tanggal}
                          </td>
                          <td className="px-4 py-3 text-[13px] text-[#596070]">
                            {booking.pembayaran}
                          </td>
                          <td className="px-4 py-3 text-[13px] text-[#596070]">
                            {formatRupiah(booking.total)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-[6px] text-[12px] font-bold ${getStatusStyle(
                                booking.status,
                              )}`}
                            >
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-4 py-8 text-center text-[#9AA0AA]"
                        >
                          Belum ada riwayat booking.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <KartuInfo label="Feedback">
                  <p className="text-[13px] leading-6 text-[#596070]">
                    {selectedData.feedback}
                  </p>
                </KartuInfo>
                <KartuInfo label="Komplain">
                  <p className="text-[13px] leading-6 text-[#596070]">
                    {selectedData.komplain}
                  </p>
                </KartuInfo>
                <KartuInfo label="Catatan Admin">
                  <p className="text-[13px] leading-6 text-[#596070]">
                    {selectedData.catatan}
                  </p>
                </KartuInfo>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => handleSendMessage(selectedData)}
                  className="h-[42px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition flex items-center gap-2"
                >
                  <FaPaperPlane className="text-xs" />
                  Kirim Pesan
                </button>

                <Link
                  to="/travelers"
                  className="h-[42px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] transition flex items-center"
                >
                  Buka Travelers
                </Link>
              </div>
            </>
          )}

          {modalType === "trip" && selectedData && (
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-5 mb-5">
              <img
                src={selectedData.gambar}
                alt={selectedData.nama}
                className="w-full h-[220px] object-cover rounded-[14px]"
              />

              <div className="space-y-4">
                <div>
                  <p className="text-[12px] text-[#70A9F8] font-bold mb-1">
                    {selectedData.label}
                  </p>
                  <h3 className="text-[22px] font-bold">{selectedData.nama}</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <KartuInfo label="Tanggal" value={selectedData.tanggal} />
                  <KartuInfo label="Peserta" value={selectedData.orang} />
                  <KartuInfo
                    label="Customer"
                    value={selectedData.namaCustomer || selectedData.nama}
                  />
                  <KartuInfo label="Status">
                    <span
                      className={`inline-flex px-3 py-1 rounded-[6px] text-[12px] font-bold ${getStatusStyle(
                        selectedData.status,
                      )}`}
                    >
                      {selectedData.status || "Dikonfirmasi"}
                    </span>
                  </KartuInfo>
                </div>
              </div>
            </div>
          )}

          {modalType === "calendar" && selectedData && (
            <div>
              <div className="bg-[#EAF4FF] rounded-[14px] p-4 mb-5">
                <h3 className="font-bold text-[17px]">
                  {selectedData.day} {selectedData.month} {selectedData.year}
                </h3>
                <p className="text-[13px] text-[#596070] mt-1">
                  Tanggal ini memiliki jadwal trip TravelGo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedData.trips.map((trip, index) => (
                  <button
                    type="button"
                    key={`${trip.nama}-${index}`}
                    onClick={() => handleTripDetail(trip)}
                    className="flex gap-3 rounded-[12px] p-3 bg-[#F8FBFF] hover:shadow-md transition text-left"
                  >
                    <img
                      src={trip.gambar}
                      alt={trip.nama}
                      className="w-[64px] h-[64px] rounded-[10px] object-cover"
                    />
                    <div>
                      <p className="text-[11px] font-bold text-[#70A9F8]">
                        {trip.label}
                      </p>
                      <h4 className="font-bold">{trip.nama}</h4>
                      <p className="text-[12px] text-[#9AA0AA]">
                        {trip.tanggal}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {modalType === "activity" && selectedData && (
            <div className="bg-[#F8FBFF] rounded-[14px] p-5">
              <div className="flex gap-4">
                <div className="w-[46px] h-[46px] rounded-full bg-[#70A9F8] text-white flex items-center justify-center shrink-0">
                  {selectedData.icon}
                </div>

                <div>
                  <h3 className="font-bold text-[17px] mb-1">
                    Aktivitas Booking
                  </h3>
                  <p className="text-[14px] leading-6 text-[#596070]">
                    {selectedData.text}
                  </p>
                  <p className="text-[12px] text-[#9AA0AA] mt-2">
                    Waktu: {selectedData.time}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleBookingDetail(selectedData.booking)}
                    className="mt-4 h-[40px] px-4 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold"
                  >
                    Lihat Booking
                  </button>
                </div>
              </div>
            </div>
          )}

          {modalType === "activityList" && Array.isArray(selectedData) && (
            <div className="space-y-3">
              {selectedData.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleActivityDetail(item)}
                  className="w-full flex gap-3 bg-[#F8FBFF] rounded-[12px] p-4 text-left hover:shadow-md transition"
                >
                  <div className="w-[38px] h-[38px] rounded-full bg-[#70A9F8] text-white flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#596070]">
                      {item.text}
                    </p>
                    <p className="text-[11px] text-[#9AA0AA] mt-1">
                      {item.time}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {modalType === "addTrip" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama paket trip"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />
              <input
                type="text"
                placeholder="Tanggal perjalanan"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />
              <input
                type="text"
                placeholder="Jumlah peserta"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />
              <select className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]">
                <option>Dikonfirmasi</option>
                <option>Menunggu</option>
                <option>Dibatalkan</option>
              </select>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-[42px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-[42px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold"
                >
                  Simpan Trip
                </button>
              </div>
            </div>
          )}
        </ModalWrapper>
      )}

      <footer className="flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-[#A5ABB5] mt-7">
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <span>Copyright © 2024 TravelGo</span>
          <span>Privacy Policy</span>
          <span>Term and conditions</span>
          <span>Contact</span>
        </div>

        <span>Created by Bianca Bahi</span>
      </footer>
    </div>
  );
}
