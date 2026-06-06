import { useMemo, useState } from "react";

import {
  FaSearch,
  FaChevronDown,
  FaEllipsisH,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaCalendarAlt,
  FaTag,
  FaTimes,
} from "react-icons/fa";

import dealsData from "../data/deals.json";

export default function Deals() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("Terbaru");
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 6;

  const categories = ["Semua", "Popular", "Flash Sale", "Member", "Couple", "Referral", "Family"];

  const filteredDeals = useMemo(() => {
    let data = dealsData.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category === "Semua" || item.category === category;

      return matchSearch && matchCategory;
    });

    if (sortBy === "Nama") {
      data = [...data].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "Kategori") {
      data = [...data].sort((a, b) => a.category.localeCompare(b.category));
    }

    return data;
  }, [search, category, sortBy]);

  const totalPages = Math.ceil(filteredDeals.length / dataPerPage);
  const startIndex = (currentPage - 1) * dataPerPage;
  const currentDeals = filteredDeals.slice(startIndex, startIndex + dataPerPage);

  const handleCategory = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      {/* HEADER FILTER */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-[330px] h-[44px] bg-white rounded-[12px] flex items-center px-4 gap-3 border border-[#EEF1F5] shadow-sm hover:shadow-md focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
  <FaSearch className="text-[#B9C0CA] text-sm shrink-0" />

  <input
    type="text"
    placeholder="Cari nama, alamat, paket, dll"
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

        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="h-[40px] px-4 rounded-[10px] bg-white border border-[#E8EDF3] text-[#8F96A3] text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 hover:text-[#70A9F8] transition-all duration-300">
              <FaFilter className="text-xs" />
              {category}
              <FaChevronDown className="text-xs" />
            </button>

            <div className="absolute right-0 top-[46px] w-[170px] bg-white rounded-[12px] shadow-xl border border-[#E8EDF3] p-2 hidden group-hover:block z-20">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => handleCategory(item)}
                  className={`w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold transition ${
                    category === item
                      ? "bg-[#70A9F8] text-white"
                      : "text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <span className="text-sm text-[#B0B3BB] font-semibold">Urutkan:</span>

          <div className="relative group">
            <button className="h-[40px] px-4 rounded-[10px] bg-white border border-[#E8EDF3] text-[#596070] text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              {sortBy}
              <FaChevronDown className="text-xs" />
            </button>

            <div className="absolute right-0 top-[46px] w-[140px] bg-white rounded-[12px] shadow-xl border border-[#E8EDF3] p-2 hidden group-hover:block z-20">
              {["Terbaru", "Nama", "Kategori"].map((item) => (
                <button
                  key={item}
                  onClick={() => setSortBy(item)}
                  className={`w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold transition ${
                    sortBy === item
                      ? "bg-[#70A9F8] text-white"
                      : "text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button className="h-[40px] px-5 bg-[#70A9F8] hover:bg-[#5D9AF2] text-white rounded-[10px] text-sm font-bold shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            + Tambah Promo
          </button>
        </div>
      </div>

      {/* DEAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentDeals.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[15px] overflow-hidden border border-[#E8EDF3] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative h-[245px] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-[#70A9F8]/55 via-black/10 to-transparent"></div>

              <h2 className="absolute left-6 top-7 text-white text-[42px] leading-[43px] font-light drop-shadow-md max-w-[260px]">
                {item.title.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className={index % 2 === 1 ? "font-bold block" : "block"}
                  >
                    {word}
                  </span>
                ))}
              </h2>

              <span className="absolute left-6 bottom-7 bg-white/90 text-[#5A91D6] px-3 py-1 rounded-full text-[12px] font-bold shadow-sm">
                {item.badge}
              </span>
            </div>

            <div className="p-5">
              <p className="text-[14px] leading-6 text-[#596070] font-semibold mb-5 min-h-[48px]">
                {item.description}
              </p>

              <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                Periode Promo
              </p>

              <p className="text-[14px] text-[#596070] font-bold mb-5 flex items-center gap-2">
                <FaCalendarAlt className="text-[#70A9F8]" />
                {item.period}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedDeal(item)}
                  className="w-[44px] h-[44px] rounded-[10px] bg-[#F4F5F7] flex items-center justify-center text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition-all duration-300"
                >
                  <FaEllipsisH />
                </button>

                <button
                  onClick={() => setSelectedDeal(item)}
                  className="flex-1 h-[44px] rounded-[10px] bg-[#70A9F8] hover:bg-[#5D9AF2] text-white text-sm font-bold shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  Lihat Promo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {currentDeals.length === 0 && (
        <div className="bg-white rounded-[16px] p-10 text-center text-[#9AA0AA] mt-6">
          Promo tidak ditemukan.
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-7 text-sm text-[#9AA0AA]">
        <div className="flex items-center gap-2">
          <span>Menampilkan</span>

          <button className="h-[34px] px-3 rounded-[8px] bg-white font-semibold text-[#596070] flex items-center gap-2 shadow-sm">
            {currentDeals.length}
            <FaChevronDown className="text-xs" />
          </button>

          <span>dari {filteredDeals.length} promo</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`h-[34px] px-3 rounded-[8px] flex items-center gap-2 transition ${
              currentPage === 1
                ? "bg-white text-[#C0C4CC] cursor-not-allowed"
                : "bg-white text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
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
                    : "bg-white text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`h-[34px] px-3 rounded-[8px] flex items-center gap-2 transition ${
              currentPage === totalPages
                ? "bg-white text-[#C0C4CC] cursor-not-allowed"
                : "bg-white text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
            }`}
          >
            Berikutnya
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* MODAL DETAIL */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="bg-white rounded-[18px] w-full max-w-[520px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="relative h-[230px]">
              <img
                src={selectedDeal.image}
                alt={selectedDeal.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-[#70A9F8]/70 to-black/10"></div>

              <button
                onClick={() => setSelectedDeal(null)}
                className="absolute top-4 right-4 w-[36px] h-[36px] rounded-full bg-white/90 text-[#596070] flex items-center justify-center hover:bg-white hover:text-[#70A9F8] transition"
              >
                <FaTimes />
              </button>

              <div className="absolute left-6 bottom-6">
                <span className="bg-white text-[#70A9F8] px-3 py-1 rounded-full text-[12px] font-bold">
                  {selectedDeal.badge}
                </span>

                <h2 className="text-white text-[30px] font-bold mt-3">
                  {selectedDeal.title}
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-[#70A9F8] text-sm font-bold mb-4">
                <FaTag />
                {selectedDeal.category}
              </div>

              <p className="text-[#596070] text-[14px] leading-6 mb-5">
                {selectedDeal.description}
              </p>

              <div className="bg-[#F8FBFF] rounded-[12px] p-4 mb-5">
                <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                  Periode Promo
                </p>

                <p className="text-[15px] font-bold text-[#202436] flex items-center gap-2">
                  <FaCalendarAlt className="text-[#70A9F8]" />
                  {selectedDeal.period}
                </p>
              </div>

              <button
                onClick={() => setSelectedDeal(null)}
                className="w-full h-[44px] rounded-[10px] bg-[#70A9F8] hover:bg-[#5D9AF2] text-white text-sm font-bold transition"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}