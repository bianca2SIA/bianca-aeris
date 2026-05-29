import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCalendarCheck,
  FaUsers,
  FaMoneyBillWave,
  FaEllipsisH,
  FaSearch,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import dataBooking from "../data/booking.json";
import paketTeratas from "../data/paketTeratas.json";

export default function Booking() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 8;
  const totalData = dataBooking.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentBookings = dataBooking.slice(startIndex, endIndex);

  const totalBooking = dataBooking.length;
  const totalDikonfirmasi = dataBooking.filter(
    (item) => item.status === "Dikonfirmasi"
  ).length;

  const getStatusStyle = (status) => {
    if (status === "Dikonfirmasi") return "bg-[#5A91D6] text-white";
    if (status === "Menunggu") return "bg-[#EAF4FF] text-[#5A91D6]";
    return "bg-[#FFE5E8] text-[#F06C7A]";
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleRowClick = (kode) => {
    navigate(`/booking/${kode}`);
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-8 py-7 text-[#202436]">
      <div className="grid grid-cols-[1fr_300px] gap-6 mb-7">
        <section>
          <div className="bg-[#EAF4FF] rounded-[14px] p-4 grid grid-cols-3 gap-5 mb-6">
            <div className="bg-white rounded-[12px] p-4 flex items-center justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-[42px] h-[42px] rounded-[8px] bg-[#EAF4FF] flex items-center justify-center text-[#70A9F8]">
                    <FaCalendarCheck />
                  </div>
                  <p className="text-[#9AA0AA] text-sm font-medium">
                    Total Booking
                  </p>
                </div>

                <h2 className="text-[26px] font-bold">{totalBooking}</h2>

                <p className="text-[12px] text-[#9AA0AA] mt-2">
                  <span className="text-[#5A91D6] font-bold">↗ +2.98%</span>{" "}
                  dari minggu lalu
                </p>
              </div>

              <FaEllipsisH className="text-[#9AA0AA]" />
            </div>

            <div className="bg-white rounded-[12px] p-4 flex items-center justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-[42px] h-[42px] rounded-[8px] bg-[#EAF4FF] flex items-center justify-center text-[#70A9F8]">
                    <FaUsers />
                  </div>
                  <p className="text-[#9AA0AA] text-sm font-medium">
                    Booking Dikonfirmasi
                  </p>
                </div>

                <h2 className="text-[26px] font-bold">{totalDikonfirmasi}</h2>

                <p className="text-[12px] text-[#9AA0AA] mt-2">
                  <span className="text-[#5A91D6] font-bold">↗ stabil</span>{" "}
                  dari data booking
                </p>
              </div>

              <FaEllipsisH className="text-[#9AA0AA]" />
            </div>

            <div className="bg-white rounded-[12px] p-4 flex items-center justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-[42px] h-[42px] rounded-[8px] bg-[#EAF4FF] flex items-center justify-center text-[#70A9F8]">
                    <FaMoneyBillWave />
                  </div>
                  <p className="text-[#9AA0AA] text-sm font-medium">
                    Total Pendapatan
                  </p>
                </div>

                <h2 className="text-[26px] font-bold">Rp 147,9 Jt</h2>

                <p className="text-[12px] text-[#9AA0AA] mt-2">
                  <span className="text-[#5A91D6] font-bold">↗ +3.75%</span>{" "}
                  dari minggu lalu
                </p>
              </div>

              <FaEllipsisH className="text-[#9AA0AA]" />
            </div>
          </div>

          <div className="bg-white rounded-[14px] p-5 mb-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-[17px]">Ringkasan Perjalanan</h3>

                <div className="flex items-center gap-4 mt-4 text-sm text-[#9AA0AA]">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-[3px] bg-[#70A9F8] rounded-full"></span>
                    Selesai
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="w-3 h-[3px] bg-[#8C949E] rounded-full"></span>
                    Dibatalkan
                  </span>
                </div>
              </div>

              <button className="h-[36px] px-4 bg-[#70A9F8] text-white rounded-[8px] text-sm font-bold hover:bg-[#5D9AF2] transition">
                12 Bulan Terakhir
              </button>
            </div>

            <div className="relative h-[250px]">
              <div className="absolute inset-0 flex flex-col justify-between py-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="border-t border-[#EEF1F5]"></div>
                ))}
              </div>

              <div className="absolute left-0 top-2 bottom-8 flex flex-col justify-between text-[12px] text-[#8F96A3]">
                <span>2.000</span>
                <span>1.500</span>
                <span>1.000</span>
                <span>500</span>
                <span>0</span>
              </div>

              <svg
                viewBox="0 0 820 220"
                className="absolute left-10 right-0 top-2 w-[calc(100%-40px)] h-[210px]"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="bookingBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#70A9F8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#70A9F8" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0,150 C55,150 55,70 115,70 C170,70 175,35 235,55 C300,80 300,95 365,70 C430,45 420,10 485,42 C545,72 540,95 610,78 C670,60 675,10 735,35 C780,55 775,85 820,85 L820,210 L0,210 Z"
                  fill="url(#bookingBlue)"
                />

                <path
                  d="M0,150 C55,150 55,70 115,70 C170,70 175,35 235,55 C300,80 300,95 365,70 C430,45 420,10 485,42 C545,72 540,95 610,78 C670,60 675,10 735,35 C780,55 775,85 820,85"
                  fill="none"
                  stroke="#70A9F8"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <path
                  d="M0,170 C70,170 80,195 145,170 C210,145 240,130 305,145 C370,160 390,170 455,150 C520,130 545,105 610,125 C670,145 680,125 735,120 C780,116 785,110 820,110"
                  fill="none"
                  stroke="#8C949E"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                />

                <line
                  x1="410"
                  y1="15"
                  x2="410"
                  y2="205"
                  stroke="#70A9F8"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                <circle cx="410" cy="35" r="6" fill="#70A9F8" />
              </svg>

              <div className="absolute left-[50%] top-[20px] bg-[#EAF4FF] rounded-[8px] px-3 py-2 text-center text-xs">
                <p className="font-bold text-[#202436]">1.780</p>
                <p className="text-[#9AA0AA]">Juli 2027</p>
              </div>

              <div className="absolute left-10 right-0 bottom-0 grid grid-cols-12 text-[12px] text-[#8F96A3]">
                {[
                  "Agu",
                  "Sep",
                  "Okt",
                  "Nov",
                  "Des",
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "Mei",
                  "Jun",
                  "Jul",
                ].map((bulan) => (
                  <span key={bulan}>{bulan}</span>
                ))}
              </div>
            </div>
          </div>

         <div className="flex items-center justify-between mb-3">
  <h3 className="font-bold text-[17px]">Data Booking</h3>

            <div className="flex items-center gap-3">
              <div className="w-[250px] h-[38px] bg-white rounded-[8px] flex items-center px-4 gap-3">
                <FaSearch className="text-[#B9C0CA] text-sm" />
                <input
                  type="text"
                  placeholder="Cari nama, paket, dll"
                  className="w-full outline-none text-sm placeholder:text-[#B9C0CA]"
                />
              </div>

              <button className="h-[38px] px-4 bg-white rounded-[8px] text-sm font-semibold text-[#8F96A3] flex items-center gap-2 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <FaCalendarAlt />
                Hari Ini
              </button>

              <button className="h-[38px] px-4 bg-[#70A9F8] hover:bg-[#5D9AF2] text-white rounded-[8px] text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                + Tambah Booking
              </button>
            </div>
          </div>
        </section>

        <aside className="row-span-2">
          <div className="bg-white rounded-[14px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[17px]">Paket Teratas</h3>
              <FaEllipsisH className="text-[#272B36]" />
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-[170px] h-[170px] rounded-full border-[18px] border-[#EAF4FF] flex items-center justify-center">
                <div className="absolute inset-[-18px] rounded-full border-[18px] border-transparent border-t-[#70A9F8] border-l-[#5A91D6] rotate-45"></div>

                <div className="text-center">
                  <p className="text-[12px] text-[#9AA0AA]">Minggu Ini</p>
                  <h2 className="text-[27px] font-bold">1,856</h2>
                  <p className="text-[12px] text-[#9AA0AA]">Customer</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {paketTeratas.map((item) => (
                <div
                  key={item.paket}
                  className="flex items-center gap-3 hover:bg-[#F4F8FF] rounded-[10px] p-2 transition"
                >
                  <div
                    className={`w-[42px] h-[36px] rounded-[8px] ${item.warna} flex items-center justify-center text-white text-sm font-bold`}
                  >
                    {item.persen}
                  </div>

                  <div>
                    <p className="text-[14px] font-bold">{item.paket}</p>
                    <p className="text-[12px] text-[#9AA0AA]">{item.jumlah}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="bg-white rounded-[14px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 -mt-8">
        <table className="w-full">
          <thead className="bg-[#EAF4FF]">
            <tr className="text-left text-[13px] text-[#8F96A3]">
              <th className="px-6 py-4 font-semibold">Nama Customer</th>
              <th className="px-6 py-4 font-semibold">Kode Booking</th>
              <th className="px-6 py-4 font-semibold">Paket</th>
              <th className="px-6 py-4 font-semibold">Durasi</th>
              <th className="px-6 py-4 font-semibold">Tanggal</th>
              <th className="px-6 py-4 font-semibold">Harga</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {currentBookings.map((item) => (
              <tr
                key={item.kode}
                onClick={() => handleRowClick(item.kode)}
                className="border-b border-[#EEF1F5] hover:bg-[#F8FBFF] hover:shadow-md hover:-translate-y-[2px] transition-all duration-300 cursor-pointer"
              >
                <td className="px-6 py-4 text-[14px] font-semibold hover:text-[#70A9F8] transition">
                  {item.nama}
                </td>

                <td className="px-6 py-4 text-[14px] text-[#596070]">
                  {item.kode}
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070]">
                  {item.paket}
                </td>

                <td className="px-6 py-4 text-[14px] text-[#596070]">
                  {item.durasi}
                </td>

                <td className="px-6 py-4 text-[14px] text-[#596070]">
                  {item.tanggal}
                </td>

                <td className="px-6 py-4 text-[14px] font-bold text-[#596070]">
                  {item.harga}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-[6px] text-[12px] font-bold ${getStatusStyle(
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

        <div className="flex items-center justify-between px-6 py-5 text-sm text-[#9AA0AA]">
          <div className="flex items-center gap-2">
            <span>Menampilkan</span>

            <button className="h-[34px] px-3 rounded-[8px] bg-[#F4F5F7] font-semibold text-[#596070]">
              {startIndex + 1} - {Math.min(endIndex, totalData)}
            </button>

            <span>dari {totalData} booking</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`h-[34px] px-3 rounded-[8px] flex items-center gap-2 transition ${
                currentPage === 1
                  ? "bg-[#F4F5F7] text-[#C0C4CC] cursor-not-allowed"
                  : "bg-[#F4F5F7] hover:bg-[#EAF4FF] text-[#596070]"
              }`}
            >
              <FaChevronLeft />
              Sebelumnya
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-[34px] h-[34px] rounded-[8px] font-bold transition ${
                    currentPage === page
                      ? "bg-[#70A9F8] text-white"
                      : "bg-[#F4F5F7] hover:bg-[#EAF4FF] text-[#596070]"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`h-[34px] px-3 rounded-[8px] flex items-center gap-2 transition ${
                currentPage === totalPages
                  ? "bg-[#F4F5F7] text-[#C0C4CC] cursor-not-allowed"
                  : "bg-[#F4F5F7] hover:bg-[#EAF4FF] text-[#596070]"
              }`}
            >
              Berikutnya
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      <footer className="flex items-center gap-8 mt-8 text-[#B0B3BB] text-sm">
        <span>Copyright © 2024 TravelGo</span>
        <span>Privacy Policy</span>
        <span>Term and conditions</span>
        <span>Contact</span>
      </footer>
    </div>
  );
}