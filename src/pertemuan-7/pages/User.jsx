import { useMemo, useState } from "react";

import {
  FaSearch,
  FaPlus,
  FaSlidersH,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaSort,
} from "react-icons/fa";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import travelers from "../data/traveler.json";

export default function User() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("semua");

  const dataPerPage = 10;

  const filteredTravelers = useMemo(() => {
    if (activeTab === "member") {
      return travelers.filter((traveler) => traveler.statusMember === "Member");
    }

    if (activeTab === "promo") {
      return travelers.filter((traveler) => traveler.promo === "Aktif");
    }

    return travelers;
  }, [activeTab]);

  const totalData = filteredTravelers.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentTravelers = filteredTravelers.slice(startIndex, endIndex);

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
      {/* HEADER AREA */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-[#202436]">
            Data Traveler
          </h2>

          <p className="text-[13px] text-[#9AA0AA] mt-1">
            Kelola data customer, status member, level membership, dan promo.
          </p>
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

      {/* FILTER + SHADCN TABS */}
      <div className="flex items-center justify-between mb-5">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-auto"
        >
          <TabsList className="bg-white rounded-[14px] p-2 shadow-sm h-auto border border-[#EEF1F5] flex gap-2">
  <TabsTrigger
    value="semua"
    className="
      h-[46px] px-5 rounded-[10px] text-[13px] font-bold
      text-[#596070]
      data-[state=active]:bg-[#70A9F8]
      data-[state=active]:text-white
      data-[state=active]:shadow-md
      transition-all duration-300
    "
  >
    <span className="flex items-center gap-2">
      <span className="material-symbols-outlined text-[18px]">
        groups
      </span>
      Semua Customer
      <span className="px-2 py-[2px] rounded-full bg-[#EAF4FF] text-[#70A9F8] text-[11px] font-bold data-[state=active]:bg-white">
        {travelers.length}
      </span>
    </span>
  </TabsTrigger>

  <TabsTrigger
    value="member"
    className="
      h-[46px] px-5 rounded-[10px] text-[13px] font-bold
      text-[#596070]
      data-[state=active]:bg-[#70A9F8]
      data-[state=active]:text-white
      data-[state=active]:shadow-md
      transition-all duration-300
    "
  >
    <span className="flex items-center gap-2">
      <span className="material-symbols-outlined text-[18px]">
        workspace_premium
      </span>
      Member
      <span className="px-2 py-[2px] rounded-full bg-[#EAF4FF] text-[#70A9F8] text-[11px] font-bold">
        {travelers.filter((item) => item.statusMember === "Member").length}
      </span>
    </span>
  </TabsTrigger>

  <TabsTrigger
    value="promo"
    className="
      h-[46px] px-5 rounded-[10px] text-[13px] font-bold
      text-[#596070]
      data-[state=active]:bg-[#70A9F8]
      data-[state=active]:text-white
      data-[state=active]:shadow-md
      transition-all duration-300
    "
  >
    <span className="flex items-center gap-2">
      <span className="material-symbols-outlined text-[18px]">
        local_offer
      </span>
      Promo Aktif
      <span className="px-2 py-[2px] rounded-full bg-[#EAF4FF] text-[#70A9F8] text-[11px] font-bold">
        {travelers.filter((item) => item.promo === "Aktif").length}
      </span>
    </span>
  </TabsTrigger>
</TabsList>
        </Tabs>

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
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[14px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full">
        <table className="w-full table-fixed">
          <thead className="bg-[#EAF4FF]">
            <tr className="text-left text-[13px] text-[#8F96A3]">
              <th className="px-6 py-4 font-semibold w-[22%]">
                <div className="flex items-center gap-2">
                  Nama <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[13%]">
                <div className="flex items-center gap-2">
                  Nomor HP <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[18%]">
                <div className="flex items-center gap-2">
                  Alamat <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[17%]">
                <div className="flex items-center gap-2">
                  Paket Dibeli <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[12%]">
                <div className="flex items-center gap-2">
                  Status Member <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[9%]">
                <div className="flex items-center gap-2">
                  Level <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[9%]">
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

                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-[#202436] truncate">
                        {traveler.nama}
                      </p>

                      <p className="text-[12px] text-[#9AA0AA] truncate">
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
              {totalData === 0 ? 0 : startIndex + 1} -{" "}
              {Math.min(endIndex, totalData)}
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
              disabled={currentPage === totalPages || totalPages === 0}
              className={`h-[34px] px-3 rounded-[8px] flex items-center gap-2 transition ${
                currentPage === totalPages || totalPages === 0
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