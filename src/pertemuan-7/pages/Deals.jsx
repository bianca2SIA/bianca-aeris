import { useEffect, useMemo, useState } from "react";

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
  FaPlus,
  FaEdit,
  FaTrash,
  FaCopy,
  FaEye,
  FaPowerOff,
  FaUsers,
  FaDownload,
} from "react-icons/fa";

import dealsData from "../data/deals.json";

const STORAGE_KEY = "travelgo_deals";
const DATA_PER_PAGE = 6;

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";

const DEFAULT_TERMS =
  "Promo berlaku selama periode yang ditentukan dan tidak dapat digabungkan dengan promo lain.";

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "Popular",
  badge: "",
  discount: "",
  period: "",
  code: "",
  image: "",
  status: "Aktif",
  target: "Semua Customer",
  terms: "",
};

const SORT_OPTIONS = [
  "Terbaru",
  "Nama",
  "Kategori",
  "Diskon Terbesar",
  "Paling Banyak Dipakai",
];

const PROMO_CATEGORIES = [
  "Popular",
  "Flash Sale",
  "Member",
  "Couple",
  "Referral",
  "Family",
];

function createDefaultCode(title, index) {
  return `${title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()}${index + 10}`;
}

function createDefaultUsers(index) {
  return [
    {
      id: 1,
      name: "Camellia Swan",
      email: "camellia@gmail.com",
      package: "Venice Dreams",
      discount: "Rp250.000",
      payment: "Lunas",
    },
    {
      id: 2,
      name: "Raphael Goodman",
      email: "raphael@gmail.com",
      package: "Safari Adventure",
      discount: "Rp350.000",
      payment: "Lunas",
    },
    {
      id: 3,
      name: "Armina Raul Meyes",
      email: "armina@gmail.com",
      package: "Caribbean Cruise",
      discount: "Rp180.000",
      payment: index % 2 === 0 ? "Lunas" : "Menunggu",
    },
  ];
}

function normalizeDeals(data) {
  return data.map((item, index) => ({
    ...item,
    id: item.id || Date.now() + index,
    code: item.code || createDefaultCode(item.title, index),
    discount: item.discount || item.badge || "20% OFF",
    status: item.status || "Aktif",
    target: item.target || "Semua Customer",
    terms: item.terms || DEFAULT_TERMS,
    createdAt: item.createdAt || `2024-07-${String(index + 1).padStart(2, "0")}`,
    usedCount: item.usedCount || 10 + index * 3,
    users: item.users || createDefaultUsers(index),
  }));
}

function getInitialDeals() {
  const savedDeals = localStorage.getItem(STORAGE_KEY);

  if (!savedDeals) return normalizeDeals(dealsData);

  try {
    return normalizeDeals(JSON.parse(savedDeals));
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return normalizeDeals(dealsData);
  }
}

function getDiscountNumber(value) {
  return Number(String(value).replace(/\D/g, "")) || 0;
}

function isMatchSearch(item, search) {
  const keyword = search.toLowerCase();

  return (
    item.title?.toLowerCase().includes(keyword) ||
    item.description?.toLowerCase().includes(keyword) ||
    item.category?.toLowerCase().includes(keyword) ||
    item.badge?.toLowerCase().includes(keyword) ||
    item.code?.toLowerCase().includes(keyword) ||
    item.status?.toLowerCase().includes(keyword) ||
    item.target?.toLowerCase().includes(keyword)
  );
}

function sortDeals(data, sortBy) {
  const sortedData = [...data];

  if (sortBy === "Terbaru") {
    return sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (sortBy === "Nama") {
    return sortedData.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortBy === "Kategori") {
    return sortedData.sort((a, b) => a.category.localeCompare(b.category));
  }

  if (sortBy === "Diskon Terbesar") {
    return sortedData.sort(
      (a, b) => getDiscountNumber(b.discount) - getDiscountNumber(a.discount)
    );
  }

  if (sortBy === "Paling Banyak Dipakai") {
    return sortedData.sort((a, b) => b.usedCount - a.usedCount);
  }

  return sortedData;
}

export default function Deals() {
  const dataPerPage = DATA_PER_PAGE;
  const [deals, setDeals] = useState(getInitialDeals);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("Terbaru");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDeal, setSelectedDeal] = useState(null);
  const [modalType, setModalType] = useState("");
  const [openActionId, setOpenActionId] = useState(null);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
  }, [deals]);

  const categories = useMemo(() => {
    const dataCategories = deals.map((item) => item.category);
    return ["Semua", ...new Set(dataCategories)];
  }, [deals]);

  const filteredDeals = useMemo(() => {
    const filteredData = deals.filter((item) => {
      const matchSearch = isMatchSearch(item, search);
      const matchCategory = category === "Semua" || item.category === category;

      return matchSearch && matchCategory;
    });

    return sortDeals(filteredData, sortBy);
  }, [deals, search, category, sortBy]);

  const totalPages = Math.ceil(filteredDeals.length / dataPerPage);
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentDeals = filteredDeals.slice(startIndex, endIndex);

  const resetForm = () => {
    setFormData(EMPTY_FORM);
  };

  const closeModal = () => {
    setSelectedDeal(null);
    setModalType("");
    setOpenActionId(null);
    resetForm();
  };

  const openAddModal = () => {
    resetForm();
    setSelectedDeal(null);
    setModalType("form");
    setOpenActionId(null);
  };

  const openDetailModal = (deal) => {
    setSelectedDeal(deal);
    setModalType("detail");
    setOpenActionId(null);
  };

  const openEditModal = (deal) => {
    setSelectedDeal(deal);
    setFormData({
      title: deal.title || "",
      description: deal.description || "",
      category: deal.category || "Popular",
      badge: deal.badge || "",
      discount: deal.discount || "",
      period: deal.period || "",
      code: deal.code || "",
      image: deal.image || "",
      status: deal.status || "Aktif",
      target: deal.target || "Semua Customer",
      terms: deal.terms || "",
    });
    setModalType("form");
    setOpenActionId(null);
  };

  const openUsersModal = (deal) => {
    setSelectedDeal(deal);
    setModalType("users");
    setOpenActionId(null);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setCurrentPage(1);
    setIsCategoryOpen(false);
  };

  const handleSort = (value) => {
    setSortBy(value);
    setCurrentPage(1);
    setIsSortOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitPromo = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.period) {
      alert("Judul promo, deskripsi, dan periode wajib diisi");
      return;
    }

    const payload = {
      ...formData,
      badge: formData.badge || formData.discount || "Promo",
      discount: formData.discount || formData.badge || "Promo",
      code: formData.code || createDefaultCode(formData.title, deals.length),
      image: formData.image || DEFAULT_IMAGE,
      terms: formData.terms || DEFAULT_TERMS,
    };

    if (selectedDeal) {
      setDeals((prev) =>
        prev.map((item) =>
          item.id === selectedDeal.id
            ? {
                ...item,
                ...payload,
              }
            : item
        )
      );
    } else {
      setDeals((prev) => [
        {
          id: Date.now(),
          ...payload,
          createdAt: new Date().toISOString().split("T")[0],
          usedCount: 0,
          users: [],
        },
        ...prev,
      ]);
    }

    closeModal();
  };

  const toggleStatus = (deal) => {
    const newStatus = deal.status === "Aktif" ? "Nonaktif" : "Aktif";

    setDeals((prev) =>
      prev.map((item) =>
        item.id === deal.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    setOpenActionId(null);
  };

  const duplicateDeal = (deal) => {
    const duplicatedDeal = {
      ...deal,
      id: Date.now(),
      title: `${deal.title} Copy`,
      code: `${deal.code}-COPY`,
      status: "Nonaktif",
      createdAt: new Date().toISOString().split("T")[0],
      usedCount: 0,
      users: [],
    };

    setDeals((prev) => [duplicatedDeal, ...prev]);
    setCurrentPage(1);
    setOpenActionId(null);
  };

  const deleteDeal = (deal) => {
    const confirmDelete = confirm(`Yakin ingin menghapus promo "${deal.title}"?`);
    if (!confirmDelete) return;

    setDeals((prev) => prev.filter((item) => item.id !== deal.id));
    setOpenActionId(null);
  };

  const handleExportCSV = () => {
    const header = [
      "Judul Promo",
      "Kode Promo",
      "Kategori",
      "Diskon",
      "Periode",
      "Status",
      "Target",
      "Jumlah Pengguna",
      "Deskripsi",
    ];

    const rows = filteredDeals.map((item) => [
      item.title,
      item.code,
      item.category,
      item.discount,
      item.period,
      item.status,
      item.target,
      item.usedCount,
      item.description,
    ]);

    const csvContent = [header, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "laporan-promo-travelgo.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    const confirmReset = confirm("Reset data promo ke data awal?");
    if (!confirmReset) return;

    localStorage.removeItem(STORAGE_KEY);
    setDeals(normalizeDeals(dealsData));
    setCurrentPage(1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getStatusStyle = (status) => {
    if (status === "Aktif") return "bg-[#EAF4FF] text-[#5A91D6]";
    return "bg-red-50 text-red-500";
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      {/* HEADER FILTER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-6 gap-4">
        <div className="w-full xl:w-[330px] h-[44px] bg-white rounded-[12px] flex items-center px-4 gap-3 border border-[#EEF1F5] shadow-sm hover:shadow-md focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
          <FaSearch className="text-[#B9C0CA] text-sm shrink-0" />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
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

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="h-[40px] px-4 rounded-[10px] bg-white border border-[#E8EDF3] text-[#8F96A3] text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 hover:text-[#70A9F8] transition-all duration-300"
            >
              <FaFilter className="text-xs" />
              {category}
              <FaChevronDown
                className={`text-xs transition ${isCategoryOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isCategoryOpen && (
              <div className="absolute right-0 top-[46px] w-[170px] bg-white rounded-[12px] shadow-xl border border-[#E8EDF3] p-2 z-30">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
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
            )}
          </div>

          <span className="text-sm text-[#B0B3BB] font-semibold">Urutkan:</span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="h-[40px] px-4 rounded-[10px] bg-white border border-[#E8EDF3] text-[#596070] text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {sortBy}
              <FaChevronDown
                className={`text-xs transition ${isSortOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-[46px] w-[190px] bg-white rounded-[12px] shadow-xl border border-[#E8EDF3] p-2 z-30">
                {SORT_OPTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSort(item)}
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
            )}
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="h-[40px] px-4 bg-white border border-[#E8EDF3] text-[#596070] rounded-[10px] text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-1 hover:text-[#70A9F8] transition-all duration-300 flex items-center gap-2"
          >
            <FaDownload className="text-xs" />
            Export
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="h-[40px] px-5 bg-[#70A9F8] hover:bg-[#5D9AF2] text-white rounded-[10px] text-sm font-bold shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <FaPlus className="text-xs" />
            Tambah Promo
          </button>
        </div>
      </div>

      {/* DEAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentDeals.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-[15px] overflow-hidden border border-[#E8EDF3] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${
              item.status === "Nonaktif" ? "opacity-75" : ""
            }`}
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

              <span
                className={`absolute right-5 bottom-7 px-3 py-1 rounded-full text-[12px] font-bold shadow-sm ${getStatusStyle(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#F4F8FF] text-[#70A9F8] text-[12px] font-bold">
                  {item.category}
                </span>

                <span className="px-3 py-1 rounded-full bg-[#F4F5F7] text-[#8F96A3] text-[12px] font-bold">
                  {item.code}
                </span>
              </div>

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
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenActionId(openActionId === item.id ? null : item.id)
                    }
                    className="w-[44px] h-[44px] rounded-[10px] bg-[#F4F5F7] flex items-center justify-center text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition-all duration-300"
                  >
                    <FaEllipsisH />
                  </button>

                  {openActionId === item.id && (
                    <div className="absolute left-0 bottom-[52px] w-[210px] bg-white rounded-[12px] shadow-xl border border-[#E8EDF3] p-2 z-40">
                      <button
                        type="button"
                        onClick={() => openDetailModal(item)}
                        className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] flex items-center gap-2"
                      >
                        <FaEye className="text-xs" />
                        Lihat Detail
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] flex items-center gap-2"
                      >
                        <FaEdit className="text-xs" />
                        Edit Promo
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleStatus(item)}
                        className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#FFF4D8] hover:text-[#B88700] flex items-center gap-2"
                      >
                        <FaPowerOff className="text-xs" />
                        {item.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                      </button>

                      <button
                        type="button"
                        onClick={() => duplicateDeal(item)}
                        className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] flex items-center gap-2"
                      >
                        <FaCopy className="text-xs" />
                        Duplikat Promo
                      </button>

                      <button
                        type="button"
                        onClick={() => openUsersModal(item)}
                        className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] flex items-center gap-2"
                      >
                        <FaUsers className="text-xs" />
                        Lihat Pengguna
                      </button>

                      <div className="h-[1px] bg-[#EEF1F5] my-2"></div>

                      <button
                        type="button"
                        onClick={() => deleteDeal(item)}
                        className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center gap-2"
                      >
                        <FaTrash className="text-xs" />
                        Hapus Promo
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => openDetailModal(item)}
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
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mt-7 gap-4 text-sm text-[#9AA0AA]">
        <div className="flex items-center gap-2">
          <span>Menampilkan</span>

          <button className="h-[34px] px-3 rounded-[8px] bg-white font-semibold text-[#596070] flex items-center gap-2 shadow-sm">
            {filteredDeals.length === 0 ? 0 : startIndex + 1} -{" "}
            {Math.min(endIndex, filteredDeals.length)}
            <FaChevronDown className="text-xs" />
          </button>

          <span>dari {filteredDeals.length} promo</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
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

          {Array.from({ length: totalPages || 1 }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
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
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`h-[34px] px-3 rounded-[8px] flex items-center gap-2 transition ${
              currentPage === totalPages || totalPages === 0
                ? "bg-white text-[#C0C4CC] cursor-not-allowed"
                : "bg-white text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
            }`}
          >
            Berikutnya
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleResetData}
          className="text-[12px] font-semibold text-[#9AA0AA] hover:text-red-500 transition"
        >
          Reset data promo
        </button>
      </div>

      {/* MODAL DETAIL */}
      {selectedDeal && modalType === "detail" && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="bg-white rounded-[18px] w-full max-w-[560px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="relative h-[230px]">
              <img
                src={selectedDeal.image}
                alt={selectedDeal.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-[#70A9F8]/70 to-black/10"></div>

              <button
                type="button"
                onClick={closeModal}
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
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="flex items-center gap-2 text-[#70A9F8] text-sm font-bold">
                  <FaTag />
                  {selectedDeal.category}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-[12px] font-bold ${getStatusStyle(
                    selectedDeal.status
                  )}`}
                >
                  {selectedDeal.status}
                </span>

                <span className="px-3 py-1 rounded-full bg-[#F4F5F7] text-[#8F96A3] text-[12px] font-bold">
                  {selectedDeal.code}
                </span>
              </div>

              <p className="text-[#596070] text-[14px] leading-6 mb-5">
                {selectedDeal.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                  <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                    Periode Promo
                  </p>

                  <p className="text-[14px] font-bold text-[#202436] flex items-center gap-2">
                    <FaCalendarAlt className="text-[#70A9F8]" />
                    {selectedDeal.period}
                  </p>
                </div>

                <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                  <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                    Target Promo
                  </p>

                  <p className="text-[14px] font-bold text-[#202436]">
                    {selectedDeal.target}
                  </p>
                </div>

                <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                  <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                    Diskon
                  </p>

                  <p className="text-[14px] font-bold text-[#202436]">
                    {selectedDeal.discount}
                  </p>
                </div>

                <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                  <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                    Digunakan
                  </p>

                  <p className="text-[14px] font-bold text-[#202436]">
                    {selectedDeal.usedCount} customer
                  </p>
                </div>
              </div>

              <div className="bg-[#F8FBFF] rounded-[12px] p-4 mb-5">
                <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                  Syarat dan Ketentuan
                </p>

                <p className="text-[14px] leading-6 text-[#596070]">
                  {selectedDeal.terms}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openEditModal(selectedDeal)}
                  className="flex-1 h-[44px] rounded-[10px] bg-[#70A9F8] hover:bg-[#5D9AF2] text-white text-sm font-bold transition"
                >
                  Edit Promo
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 h-[44px] rounded-[10px] bg-[#F4F5F7] hover:bg-[#EAF4FF] text-[#596070] text-sm font-bold transition"
                >
                  Tutup Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORM TAMBAH / EDIT */}
      {modalType === "form" && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="bg-white rounded-[18px] w-full max-w-[760px] shadow-2xl p-6 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[20px] font-bold">
                  {selectedDeal ? "Edit Promo" : "Tambah Promo"}
                </h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Isi data promo TravelGo dengan lengkap.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-[36px] h-[36px] rounded-full bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitPromo} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Judul promo"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Kode promo, contoh: SUMMER20"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              >
                {PROMO_CATEGORIES.map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>

              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="Badge, contoh: 20% OFF"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Diskon, contoh: 20% OFF"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="period"
                value={formData.period}
                onChange={handleChange}
                placeholder="Periode, contoh: 1 Juli 2024 - 31 Juli 2024"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="target"
                value={formData.target}
                onChange={handleChange}
                placeholder="Target, contoh: Gold Member"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="URL gambar promo"
                className="md:col-span-2 h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsi promo"
                className="md:col-span-2 min-h-[90px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
              />

              <textarea
                name="terms"
                value={formData.terms}
                onChange={handleChange}
                placeholder="Syarat dan ketentuan promo"
                className="md:col-span-2 min-h-[90px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
              />

              <div className="md:col-span-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-[44px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] transition"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="h-[44px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition"
                >
                  {selectedDeal ? "Update Promo" : "Simpan Promo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PENGGUNA PROMO */}
      {selectedDeal && modalType === "users" && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="bg-white rounded-[18px] w-full max-w-[760px] shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[20px] font-bold">Pengguna Promo</h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Daftar customer yang menggunakan promo {selectedDeal.code}.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-[36px] h-[36px] rounded-full bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition"
              >
                <FaTimes />
              </button>
            </div>

            {selectedDeal.users.length === 0 ? (
              <div className="min-h-[180px] flex flex-col items-center justify-center text-center bg-[#F8FBFF] rounded-[14px]">
                <FaUsers className="text-[#70A9F8] text-[28px] mb-3" />
                <h3 className="font-bold text-[#202436]">Belum ada pengguna</h3>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Promo ini belum digunakan customer.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#EAF4FF]">
                    <tr className="text-left text-[13px] text-[#8F96A3]">
                      <th className="px-4 py-3 font-semibold">Nama</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="px-4 py-3 font-semibold">Paket</th>
                      <th className="px-4 py-3 font-semibold">Diskon</th>
                      <th className="px-4 py-3 font-semibold">Pembayaran</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedDeal.users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-[#EEF1F5] hover:bg-[#F8FBFF] transition"
                      >
                        <td className="px-4 py-4 font-bold text-[#202436]">
                          {user.name}
                        </td>
                        <td className="px-4 py-4 text-[#596070]">
                          {user.email}
                        </td>
                        <td className="px-4 py-4 text-[#596070]">
                          {user.package}
                        </td>
                        <td className="px-4 py-4 text-[#596070]">
                          {user.discount}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-3 py-1 rounded-[6px] text-[12px] font-bold ${
                              user.payment === "Lunas"
                                ? "bg-[#EAF4FF] text-[#5A91D6]"
                                : "bg-[#FFF4D8] text-[#B88700]"
                            }`}
                          >
                            {user.payment}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <button
              type="button"
              onClick={closeModal}
              className="w-full h-[44px] rounded-[10px] bg-[#70A9F8] hover:bg-[#5D9AF2] text-white text-sm font-bold transition mt-5"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}