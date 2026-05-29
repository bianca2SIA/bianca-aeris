import { useState } from "react";

import {
  FaSearch,
  FaPlus,
  FaSlidersH,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaSort,
} from "react-icons/fa";

import travelers from "../data/traveler.json";

export default function User() {
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 10;
  const totalData = travelers.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentTravelers = travelers.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getLevelStyle = (level) => {
    if (level === "Platinum") return "bg-[#D7ECFF] text-[#4B91E8]";
    if (level === "Gold") return "bg-[#C9A94B] text-white";
    if (level === "Silver") return "bg-[#E1E1E1] text-[#555B66]";
    return "bg-[#EAF4FF] text-[#70A9F8]";
  };

  const getPromoStyle = (promo) => {
    if (promo === "Aktif") return "bg-[#EAF4FF] text-[#5A91D6]";
    return "bg-[#F1F1F1] text-[#9AA0AA]";
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-8 py-7 text-[#202436]">
      {/* FILTER BAR */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button className="h-[38px] px-4 bg-white rounded-[8px] text-[13px] font-semibold text-[#8F96A3] flex items-center gap-2 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            Paket
            <FaChevronDown className="text-xs" />
          </button>

          <button className="h-[38px] px-4 bg-white rounded-[8px] text-[13px] font-semibold text-[#8F96A3] flex items-center gap-2 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            Level Member
            <FaChevronDown className="text-xs" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-[290px] h-[38px] bg-white rounded-[8px] flex items-center px-4 gap-3">
            <FaSearch className="text-[#B9C0CA] text-sm" />
            <input
              type="text"
              placeholder="Cari nama, alamat, paket, dll"
              className="w-full outline-none text-sm placeholder:text-[#B9C0CA]"
            />
          </div>

          <button className="w-[38px] h-[38px] bg-white rounded-[8px] flex items-center justify-center text-[#596070] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <FaSlidersH />
          </button>

          <button className="h-[38px] px-5 bg-[#70A9F8] hover:bg-[#5D9AF2] text-white rounded-[8px] text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <FaPlus className="text-xs" />
            Tambah Traveler
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[14px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        <table className="w-full">
          <thead className="bg-[#EAF4FF]">
            <tr className="text-left text-[13px] text-[#8F96A3]">
              <th className="px-6 py-4 font-semibold">
                <div className="flex items-center gap-2">
                  Nama <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold">
                <div className="flex items-center gap-2">
                  Nomor HP <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold">
                <div className="flex items-center gap-2">
                  Alamat <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold">
                <div className="flex items-center gap-2">
                  Paket Dibeli <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold">
                <div className="flex items-center gap-2">
                  Status Member <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold">
                <div className="flex items-center gap-2">
                  Level <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold">
                <div className="flex items-center gap-2">
                  Promo <FaSort className="text-[10px]" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {currentTravelers.map((traveler, index) => (
              <tr
                key={traveler.id}
                className="border-b border-[#EEF1F5] hover:bg-[#F8FBFF] hover:shadow-md hover:-translate-y-[2px] transition-all duration-300"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/100?img=${
                        startIndex + index + 12
                      }`}
                      alt={traveler.nama}
                      className="w-[38px] h-[38px] rounded-full object-cover bg-[#EAF4FF]"
                    />

                    <div>
                      <p className="text-[14px] font-bold text-[#202436]">
                        {traveler.nama}
                      </p>

                      <p className="text-[12px] text-[#9AA0AA]">
                        {traveler.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070]">
                  {traveler.hp}
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070]">
                  {traveler.alamat}
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070]">
                  {traveler.paket}
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070]">
                  {traveler.statusMember}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-[6px] text-[12px] font-bold ${getLevelStyle(
                      traveler.level
                    )}`}
                  >
                    {traveler.level}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-[6px] text-[12px] font-bold ${getPromoStyle(
                      traveler.promo
                    )}`}
                  >
                    {traveler.promo}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex items-center justify-between px-6 py-5 text-sm text-[#9AA0AA]">
          <div className="flex items-center gap-2">
            <span>Menampilkan</span>

            <button className="h-[34px] px-3 rounded-[8px] bg-[#F4F5F7] font-semibold text-[#596070]">
              {startIndex + 1} - {Math.min(endIndex, totalData)}
            </button>

            <span>dari {totalData} traveler</span>
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

      {/* FOOTER */}
      <footer className="flex items-center justify-between mt-8 text-[#B0B3BB] text-sm">
        <div className="flex items-center gap-8">
          <span>Copyright © 2024 TravelGo</span>
          <span>Privacy Policy</span>
          <span>Term and conditions</span>
          <span>Contact</span>
        </div>
      </footer>
    </div>
  );
}