import { useMemo, useState } from "react";

import {
  FaSearch,
  FaPlus,
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
  const [levelFilter, setLevelFilter] = useState("Semua Level");
  const [search, setSearch] = useState("");
  const [isLevelOpen, setIsLevelOpen] = useState(false);

  const dataPerPage = 10;

  const filteredTravelers = useMemo(() => {
    let data = travelers;

    if (activeTab === "member") {
      data = data.filter((traveler) => traveler.statusMember === "Member");
    }

    if (activeTab === "promo") {
      data = data.filter((traveler) => traveler.promo === "Aktif");
    }

    if (levelFilter !== "Semua Level") {
      data = data.filter((traveler) => traveler.level === levelFilter);
    }

    if (search.trim() !== "") {
      data = data.filter((traveler) => {
        const keyword = search.toLowerCase();

        return (
          traveler.nama.toLowerCase().includes(keyword) ||
          traveler.email.toLowerCase().includes(keyword) ||
          traveler.alamat.toLowerCase().includes(keyword) ||
          traveler.paket.toLowerCase().includes(keyword) ||
          traveler.hp.toLowerCase().includes(keyword)
        );
      });
    }

    return data;
  }, [activeTab, levelFilter, search]);

  const totalData = filteredTravelers.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentTravelers = filteredTravelers.slice(startIndex, endIndex);

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handleLevelFilter = (level) => {
    setLevelFilter(level);
    setCurrentPage(1);
    setIsLevelOpen(false);
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
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      {/* TOP ACTION */}
      <div className="flex items-center justify-between mb-6">
        {/* SHADCN TABS */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-auto"
        >
          <TabsList className="bg-transparent p-0 h-auto flex gap-4">
            <TabsTrigger
              value="semua"
              className="
                h-[46px] px-5 rounded-[12px] text-[13px] font-bold
                bg-[#F8FBFF]
                text-[#596070]
                hover:bg-white
                hover:text-[#70A9F8]
                hover:shadow-md
                data-[state=active]:bg-[#70A9F8]
                data-[state=active]:text-white
                data-[state=active]:shadow-md
                transition-all duration-300
              "
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  groups
                </span>
                Semua Customer
                <span className="px-2 py-[2px] rounded-full bg-white text-[#70A9F8] text-[11px] font-bold">
                  {travelers.length}
                </span>
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="member"
              className="
                h-[46px] px-5 rounded-[12px] text-[13px] font-bold
                bg-[#F8FBFF]
                text-[#596070]
                hover:bg-white
                hover:text-[#70A9F8]
                hover:shadow-md
                data-[state=active]:bg-[#70A9F8]
                data-[state=active]:text-white
                data-[state=active]:shadow-md
                transition-all duration-300
              "
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  workspace_premium
                </span>
                Member
                <span className="px-2 py-[2px] rounded-full bg-white text-[#70A9F8] text-[11px] font-bold">
                  {
                    travelers.filter(
                      (item) => item.statusMember === "Member"
                    ).length
                  }
                </span>
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="promo"
              className="
                h-[46px] px-5 rounded-[12px] text-[13px] font-bold
                bg-[#F8FBFF]
                text-[#596070]
                hover:bg-white
                hover:text-[#70A9F8]
                hover:shadow-md
                data-[state=active]:bg-[#70A9F8]
                data-[state=active]:text-white
                data-[state=active]:shadow-md
                transition-all duration-300
              "
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  local_offer
                </span>
                Promo Aktif
                <span className="px-2 py-[2px] rounded-full bg-white text-[#70A9F8] text-[11px] font-bold">
                  {travelers.filter((item) => item.promo === "Aktif").length}
                </span>
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* SEARCH + FILTER + BUTTON */}
        <div className="flex items-center gap-3">
          <div className="w-[330px] h-[44px] bg-white rounded-[12px] flex items-center px-4 gap-3 border border-[#EEF1F5] shadow-sm hover:shadow-md focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
            <FaSearch className="text-[#B9C0CA] text-sm shrink-0" />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari traveler..."
              className="
                w-full
                bg-transparent
                border-none
                outline-none
                ring-0
                focus:outline-none
                focus:ring-0
                focus:border-none
                text-sm
                placeholder:text-[#B9C0CA]
              "
            />
          </div>

          {/* DROPDOWN LEVEL */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLevelOpen(!isLevelOpen)}
              className="h-[44px] min-w-[145px] px-4 bg-white rounded-[12px] flex items-center justify-between gap-2 text-[#596070] border border-[#EEF1F5] shadow-sm hover:border-[#70A9F8] transition-all duration-200 text-sm font-bold"
            >
              {levelFilter}

              <FaChevronDown
                className={`text-xs text-[#9AA0AA] transition-transform duration-200 ${
                  isLevelOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLevelOpen && (
              <div className="absolute right-0 top-[50px] w-[160px] bg-white rounded-[12px] shadow-lg border border-[#E8EDF3] p-2 z-30">
                {["Semua Level", "Gold", "Silver", "Platinum"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleLevelFilter(level)}
                    className={`w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold transition-all duration-200 ${
                      levelFilter === level
                        ? "bg-[#70A9F8] text-white"
                        : "text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8]"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="h-[44px] px-5 bg-[#70A9F8] hover:bg-[#5D9AF2] text-white rounded-[12px] text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <FaPlus className="text-xs" />
            Tambah Traveler
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[14px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full">
        <table className="w-full table-fixed">
          <thead className="bg-[#EAF4FF]">
            <tr className="text-left text-[13px] text-[#8F96A3]">
              <th className="px-6 py-4 font-semibold w-[22%]">
                <div className="flex items-center gap-2 hover:text-[#70A9F8] transition">
                  Nama <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[13%]">
                <div className="flex items-center gap-2 hover:text-[#70A9F8] transition">
                  Nomor HP <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[18%]">
                <div className="flex items-center gap-2 hover:text-[#70A9F8] transition">
                  Alamat <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[17%]">
                <div className="flex items-center gap-2 hover:text-[#70A9F8] transition">
                  Paket Dibeli <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[12%]">
                <div className="flex items-center gap-2 hover:text-[#70A9F8] transition">
                  Status Member <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[9%]">
                <div className="flex items-center gap-2 hover:text-[#70A9F8] transition">
                  Level <FaSort className="text-[10px]" />
                </div>
              </th>

              <th className="px-6 py-4 font-semibold w-[9%]">
                <div className="flex items-center gap-2 hover:text-[#70A9F8] transition">
                  Promo <FaSort className="text-[10px]" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {currentTravelers.map((traveler, index) => (
              <tr
                key={traveler.id}
                className="group border-b border-[#EEF1F5] hover:bg-gradient-to-r hover:from-[#F8FBFF] hover:to-white hover:shadow-md hover:-translate-y-[2px] transition-all duration-300"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/100?img=${
                        startIndex + index + 12
                      }`}
                      alt={traveler.nama}
                      className="w-[38px] h-[38px] rounded-full object-cover bg-[#EAF4FF] ring-2 ring-transparent group-hover:ring-[#70A9F8]/30 group-hover:scale-105 transition-all duration-300"
                    />

                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-[#202436] truncate group-hover:text-[#70A9F8] transition">
                        {traveler.nama}
                      </p>

                      <p className="text-[12px] text-[#9AA0AA] truncate">
                        {traveler.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070] group-hover:text-[#202436] transition">
                  {traveler.hp}
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070] group-hover:text-[#202436] transition">
                  {traveler.alamat}
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070] group-hover:text-[#202436] transition">
                  {traveler.paket}
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070] group-hover:text-[#202436] transition">
                  {traveler.statusMember}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-[6px] text-[12px] font-bold shadow-sm group-hover:shadow-md transition-all duration-300 ${getLevelStyle(
                      traveler.level
                    )}`}
                  >
                    {traveler.level}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-[6px] text-[12px] font-bold shadow-sm group-hover:shadow-md transition-all duration-300 ${getPromoStyle(
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
                  : "bg-[#F4F5F7] hover:bg-[#EAF4FF] hover:text-[#70A9F8] text-[#596070]"
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
                      ? "bg-[#70A9F8] text-white shadow-md"
                      : "bg-[#F4F5F7] hover:bg-[#EAF4FF] hover:text-[#70A9F8] text-[#596070]"
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
                  : "bg-[#F4F5F7] hover:bg-[#EAF4FF] hover:text-[#70A9F8] text-[#596070]"
              }`}
            >
              Berikutnya
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}