import { useEffect, useMemo, useState } from "react";

import {
  FaChevronDown,
  FaEllipsisH,
  FaSearch,
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaEye,
  FaReply,
  FaArchive,
  FaUndo,
  FaCheckCircle,
  FaTimes,
  FaDownload,
  FaFlag,
} from "react-icons/fa";

import feedbackData from "../data/feedback.json";

const STORAGE_KEY = "travelgo_feedback_list";
const DATA_PER_PAGE = 8;
const BASE_DATE = "2028-07-15";

const dateOptions = [
  { value: "all", label: "Semua Tanggal" },
  { value: "7", label: "7 Hari Terakhir" },
  { value: "30", label: "30 Hari Terakhir" },
  { value: "90", label: "90 Hari Terakhir" },
];

function Stars({ value }) {
  const fullStars = Math.floor(Number(value || 0));

  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= fullStars ? (
          <FaStar key={star} className="text-[#FFD85C] text-[15px]" />
        ) : (
          <FaRegStar key={star} className="text-[#D8DDE5] text-[15px]" />
        ),
      )}
    </div>
  );
}

function buatTanggalDefault(index) {
  const date = new Date(BASE_DATE);
  date.setDate(date.getDate() - index * 5);
  return date.toISOString().split("T")[0];
}

function rapikanFeedback(data) {
  return data.map((item, index) => {
    const nama = item.nama || "Traveler TravelGo";

    return {
      ...item,
      id: item.id || index + 1,
      nama,
      tanggal: item.tanggal || buatTanggalDefault(index),
      status: item.status || "Baru",
      prioritas: item.prioritas || "Normal",
      tipe: item.tipe || (index % 4 === 3 ? "Komplain" : "Feedback"),
      balasan: item.balasan || "",
      archived: item.archived || false,
      email:
        item.email || `${nama.toLowerCase().replaceAll(" ", ".")}@gmail.com`,
      hp: item.hp || `08${String(1234567890 + index).slice(0, 10)}`,
      alamat: item.alamat || "Indonesia",
    };
  });
}

function ambilDataAwal(feedbacks) {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    return rapikanFeedback(feedbacks);
  }

  try {
    return rapikanFeedback(JSON.parse(savedData));
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return rapikanFeedback(feedbacks);
  }
}

function cocokDenganPencarian(item, keyword) {
  return (
    item.nama?.toLowerCase().includes(keyword) ||
    item.paket?.toLowerCase().includes(keyword) ||
    item.teks?.toLowerCase().includes(keyword) ||
    item.alamat?.toLowerCase().includes(keyword) ||
    item.email?.toLowerCase().includes(keyword) ||
    item.status?.toLowerCase().includes(keyword) ||
    item.prioritas?.toLowerCase().includes(keyword) ||
    item.tipe?.toLowerCase().includes(keyword)
  );
}

function buatFileCSV(fileName, header, rows) {
  const csvContent = [header, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

export default function Feedback() {
  const { reviewStats, ratings, feedbacks } = feedbackData;

  const [search, setSearch] = useState("");
  const [packageFilter, setPackageFilter] = useState("Semua Paket");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isRatingMenuOpen, setIsRatingMenuOpen] = useState(false);
  const [openActionId, setOpenActionId] = useState(null);

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [modalType, setModalType] = useState("");
  const [replyText, setReplyText] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const [feedbackList, setFeedbackList] = useState(() =>
    ambilDataAwal(feedbacks),
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackList));
  }, [feedbackList]);

  const packageOptions = useMemo(() => {
    const packages = feedbackList.map((item) => item.paket);
    return ["Semua Paket", ...new Set(packages)];
  }, [feedbackList]);

  const filteredFeedbacks = useMemo(() => {
    let data = feedbackList.filter((item) => item.archived === showArchived);

    if (packageFilter !== "Semua Paket") {
      data = data.filter((item) => item.paket === packageFilter);
    }

    if (dateFilter !== "all") {
      const baseDate = new Date(BASE_DATE);
      const minDate = new Date(baseDate);
      minDate.setDate(baseDate.getDate() - Number(dateFilter));

      data = data.filter((item) => {
        const itemDate = new Date(item.tanggal);
        return itemDate >= minDate && itemDate <= baseDate;
      });
    }

    if (search.trim() !== "") {
      const keyword = search.toLowerCase();
      data = data.filter((item) => cocokDenganPencarian(item, keyword));
    }

    return data;
  }, [feedbackList, search, packageFilter, dateFilter, showArchived]);

  const totalData = filteredFeedbacks.length;
  const totalPages = Math.ceil(totalData / DATA_PER_PAGE);

  const startIndex = (currentPage - 1) * DATA_PER_PAGE;
  const endIndex = startIndex + DATA_PER_PAGE;
  const currentFeedbacks = filteredFeedbacks.slice(startIndex, endIndex);

  const selectedDateLabel =
    dateOptions.find((item) => item.value === dateFilter)?.label ||
    "Semua Tanggal";

  const updateFeedback = (id, dataBaru) => {
    setFeedbackList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...dataBaru } : item)),
    );
    setOpenActionId(null);
  };

  const closeModal = () => {
    setSelectedFeedback(null);
    setModalType("");
    setReplyText("");
  };

  const openDetailModal = (item) => {
    setSelectedFeedback(item);
    setModalType("detail");
    setOpenActionId(null);
  };

  const openReplyModal = (item) => {
    setSelectedFeedback(item);
    setReplyText(item.balasan || "");
    setModalType("reply");
    setOpenActionId(null);
  };

  const handleSaveReply = () => {
    if (!replyText.trim()) {
      alert("Balasan tidak boleh kosong");
      return;
    }

    updateFeedback(selectedFeedback.id, {
      balasan: replyText,
      status: "Dibalas",
    });

    closeModal();
  };

  const updateStatus = (id, status) => {
    updateFeedback(id, { status });
  };

  const updatePriority = (id, prioritas) => {
    updateFeedback(id, { prioritas });
  };

  const toggleArchive = (id) => {
    const feedback = feedbackList.find((item) => item.id === id);
    if (!feedback) return;

    updateFeedback(id, { archived: !feedback.archived });
  };

  const handleResetData = () => {
    const konfirmasi = confirm("Reset data feedback ke data awal?");
    if (!konfirmasi) return;

    localStorage.removeItem(STORAGE_KEY);
    setFeedbackList(rapikanFeedback(feedbacks));
    setCurrentPage(1);
    setIsRatingMenuOpen(false);
  };

  const handleExportCSV = () => {
    const header = [
      "Nama",
      "Email",
      "No HP",
      "Paket",
      "Tanggal",
      "Rating",
      "Tipe",
      "Status",
      "Prioritas",
      "Feedback",
      "Balasan",
    ];

    const rows = filteredFeedbacks.map((item) => [
      item.nama,
      item.email,
      item.hp,
      item.paket,
      item.tanggal,
      item.rating,
      item.tipe,
      item.status,
      item.prioritas,
      item.teks,
      item.balasan || "-",
    ]);

    buatFileCSV("laporan-feedback-travelgo.csv", header, rows);
    setIsRatingMenuOpen(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getStatusStyle = (status) => {
    if (status === "Baru") return "bg-[#EAF4FF] text-[#5A91D6]";
    if (status === "Diproses") return "bg-[#FFF4D8] text-[#B88700]";
    if (status === "Dibalas") return "bg-[#E9FBEF] text-[#31A05F]";
    if (status === "Selesai") return "bg-[#E9FBEF] text-[#31A05F]";
    if (status === "Ditutup") return "bg-[#F1F1F1] text-[#8F96A3]";
    return "bg-[#EAF4FF] text-[#5A91D6]";
  };

  const getPriorityStyle = (prioritas) => {
    if (prioritas === "Urgent") return "bg-red-100 text-red-500";
    if (prioritas === "Penting") return "bg-[#FFF4D8] text-[#B88700]";
    return "bg-[#F1F1F1] text-[#8F96A3]";
  };

  const getTypeStyle = (tipe) => {
    if (tipe === "Komplain") return "bg-red-50 text-red-500";
    return "bg-[#EAF4FF] text-[#5A91D6]";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 mb-7">
        {/* CHART */}
        <section className="bg-white rounded-[16px] border border-[#E8EDF3] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[17px] font-bold">Statistik Review</h2>

              <div className="flex items-center gap-5 mt-4 text-[13px] text-[#8F96A3] font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[3px] bg-[#70A9F8]"></span>
                  Positif
                </span>

                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[3px] bg-[#DADCE0]"></span>
                  Negatif
                </span>
              </div>
            </div>

            <button className="h-[38px] px-4 rounded-[9px] bg-[#70A9F8] text-white text-[13px] font-bold flex items-center gap-2 hover:bg-[#5D9AF2] hover:shadow-md transition-all duration-300">
              12 Bulan Terakhir
              <FaChevronDown className="text-xs" />
            </button>
          </div>

          <div className="relative h-[285px] pl-10 pt-5">
            <div className="absolute left-0 top-6 bottom-10 flex flex-col justify-between text-[12px] text-[#8F96A3]">
              <span>1.200</span>
              <span>900</span>
              <span>600</span>
              <span>300</span>
              <span>0</span>
            </div>

            <div className="absolute left-10 right-0 top-8 bottom-11 flex flex-col justify-between">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border-t border-[#EEF1F5]"></div>
              ))}
            </div>

            <div className="relative h-full grid grid-cols-12 items-end gap-5">
              {reviewStats.map((item) => (
                <div
                  key={item.bulan}
                  className="h-full flex flex-col justify-end"
                >
                  <div className="flex items-end justify-center gap-2 h-[215px]">
                    <div
                      className="w-[18px] rounded-t-[8px] bg-[#70A9F8] hover:bg-[#5D9AF2] transition-all duration-300"
                      style={{ height: `${(item.positif / 1200) * 215}px` }}
                    ></div>

                    <div
                      className="w-[18px] rounded-t-[8px] bg-[#DADCE0] hover:bg-[#C7CBD2] transition-all duration-300"
                      style={{ height: `${(item.negatif / 1200) * 215}px` }}
                    ></div>
                  </div>

                  <p className="text-[12px] text-[#8F96A3] text-center mt-3">
                    {item.bulan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RATINGS */}
        <aside className="bg-white rounded-[16px] border border-[#E8EDF3] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[17px] font-bold">Rating</h2>

            <button
              type="button"
              onClick={() => setIsRatingMenuOpen(!isRatingMenuOpen)}
              className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center hover:bg-[#F4F8FF] transition"
            >
              <FaEllipsisH className="text-[#202436]" />
            </button>

            {isRatingMenuOpen && (
              <div className="absolute right-5 top-[50px] w-[170px] bg-white rounded-[12px] shadow-lg border border-[#E8EDF3] p-2 z-40">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8] flex items-center gap-2"
                >
                  <FaDownload className="text-xs" />
                  Export CSV
                </button>

                <button
                  type="button"
                  onClick={handleResetData}
                  className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center gap-2"
                >
                  <FaUndo className="text-xs" />
                  Reset Data
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-[52px] px-4 rounded-[10px] bg-[#F4F7FA] flex items-center gap-2">
              <FaStar className="text-[#FFD85C] text-[21px]" />
              <span className="text-[30px] font-bold text-[#70A9F8]">4.5</span>
              <span className="text-[#70A9F8] text-[15px] font-bold">/5</span>
            </div>

            <div>
              <p className="text-[18px] font-bold text-[#70A9F8]">
                Sangat Baik
              </p>
              <p className="text-[12px] text-[#9AA0AA]">Dari 1.250 review</p>
            </div>
          </div>

          <div className="space-y-3">
            {ratings.map((item) => (
              <div
                key={item.nama}
                className="flex items-center justify-between hover:bg-[#F8FBFF] p-1 rounded-[8px] transition"
              >
                <p className="text-[13px] font-semibold text-[#8F96A3]">
                  {item.nama}
                </p>

                <div className="flex items-center gap-2">
                  <Stars value={item.nilai} />
                  <span className="text-[12px] text-[#8F96A3] w-6">
                    {item.nilai}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* LIST FEEDBACK */}
      <section className="bg-white rounded-[16px] p-5 shadow-sm border border-[#E8EDF3] hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-5 gap-4">
          <div>
            <h2 className="text-[17px] font-bold">Feedback Traveler</h2>
            <p className="text-[12px] text-[#9AA0AA] mt-1">
              {showArchived
                ? "Menampilkan feedback yang sudah diarsipkan"
                : "Kelola feedback dan komplain traveler TravelGo"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="w-[330px] h-[44px] bg-white rounded-[12px] flex items-center px-4 gap-3 border border-[#EEF1F5] shadow-sm hover:shadow-md focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
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

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPackageOpen(!isPackageOpen)}
                className="h-[38px] px-4 rounded-[9px] bg-[#FAFBFC] border border-[#E8EDF3] text-[#8F96A3] text-[13px] font-semibold flex items-center gap-2 hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition"
              >
                {packageFilter}
                <FaChevronDown
                  className={`text-xs transition ${
                    isPackageOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isPackageOpen && (
                <div className="absolute right-0 top-[46px] w-[200px] bg-white rounded-[12px] shadow-lg border border-[#E8EDF3] p-2 z-40">
                  {packageOptions.map((paket) => (
                    <button
                      key={paket}
                      type="button"
                      onClick={() => {
                        setPackageFilter(paket);
                        setCurrentPage(1);
                        setIsPackageOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold transition ${
                        packageFilter === paket
                          ? "bg-[#70A9F8] text-white"
                          : "text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8]"
                      }`}
                    >
                      {paket}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDateOpen(!isDateOpen)}
                className="h-[38px] px-4 rounded-[9px] bg-[#70A9F8] text-white text-[13px] font-bold flex items-center gap-2 hover:bg-[#5D9AF2] hover:shadow-md transition"
              >
                <FaCalendarAlt className="text-xs" />
                {selectedDateLabel}
                <FaChevronDown
                  className={`text-xs transition ${
                    isDateOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDateOpen && (
                <div className="absolute right-0 top-[46px] w-[190px] bg-white rounded-[12px] shadow-lg border border-[#E8EDF3] p-2 z-40">
                  {dateOptions.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setDateFilter(item.value);
                        setCurrentPage(1);
                        setIsDateOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold transition ${
                        dateFilter === item.value
                          ? "bg-[#70A9F8] text-white"
                          : "text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowArchived(!showArchived);
                setCurrentPage(1);
              }}
              className={`h-[38px] px-4 rounded-[9px] text-[13px] font-bold flex items-center gap-2 transition ${
                showArchived
                  ? "bg-[#70A9F8] text-white"
                  : "bg-[#FAFBFC] border border-[#E8EDF3] text-[#8F96A3] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
              }`}
            >
              <FaArchive className="text-xs" />
              Arsip
            </button>
          </div>
        </div>

        {currentFeedbacks.length === 0 ? (
          <div className="min-h-[220px] flex flex-col items-center justify-center text-center">
            <div className="w-[56px] h-[56px] rounded-full bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center mb-3">
              <FaSearch />
            </div>
            <h3 className="font-bold text-[#202436]">Data tidak ditemukan</h3>
            <p className="text-[13px] text-[#9AA0AA] mt-1">
              Coba ubah keyword pencarian, paket, atau filter tanggal.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {currentFeedbacks.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-[14px] p-5 border border-[#EEF1F5] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.nama}
                        className="w-[38px] h-[38px] rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-[38px] h-[38px] rounded-full bg-[#D7ECFF] text-[#5A91D6] flex items-center justify-center text-sm font-bold shrink-0">
                        {item.avatar}
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="text-[14px] font-bold text-[#202436] truncate">
                        {item.nama}
                      </h3>
                      <p className="text-[12px] text-[#9AA0AA] truncate">
                        {item.paket}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenActionId(
                          openActionId === item.id ? null : item.id,
                        )
                      }
                      className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center hover:bg-[#F4F8FF] text-[#8F96A3] hover:text-[#70A9F8] transition"
                    >
                      <FaEllipsisH />
                    </button>

                    {openActionId === item.id && (
                      <div className="absolute right-0 top-[36px] w-[190px] bg-white rounded-[12px] shadow-lg border border-[#E8EDF3] p-2 z-50">
                        <button
                          type="button"
                          onClick={() => openDetailModal(item)}
                          className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8] flex items-center gap-2"
                        >
                          <FaEye className="text-xs" />
                          Detail
                        </button>

                        <button
                          type="button"
                          onClick={() => openReplyModal(item)}
                          className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8] flex items-center gap-2"
                        >
                          <FaReply className="text-xs" />
                          Balas
                        </button>

                        <button
                          type="button"
                          onClick={() => updateStatus(item.id, "Diproses")}
                          className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#FFF4D8] hover:text-[#B88700] flex items-center gap-2"
                        >
                          <FaFlag className="text-xs" />
                          Proses
                        </button>

                        <button
                          type="button"
                          onClick={() => updateStatus(item.id, "Selesai")}
                          className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#E9FBEF] hover:text-[#31A05F] flex items-center gap-2"
                        >
                          <FaCheckCircle className="text-xs" />
                          Selesaikan
                        </button>

                        <div className="h-[1px] bg-[#EEF1F5] my-2"></div>

                        <button
                          type="button"
                          onClick={() => updatePriority(item.id, "Penting")}
                          className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#FFF4D8] hover:text-[#B88700]"
                        >
                          Prioritas Penting
                        </button>

                        <button
                          type="button"
                          onClick={() => updatePriority(item.id, "Urgent")}
                          className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-red-500 hover:bg-red-50"
                        >
                          Prioritas Urgent
                        </button>

                        <button
                          type="button"
                          onClick={() => updatePriority(item.id, "Normal")}
                          className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#F4F8FF]"
                        >
                          Prioritas Normal
                        </button>

                        <div className="h-[1px] bg-[#EEF1F5] my-2"></div>

                        <button
                          type="button"
                          onClick={() => toggleArchive(item.id)}
                          className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8] flex items-center gap-2"
                        >
                          {item.archived ? (
                            <>
                              <FaUndo className="text-xs" />
                              Pulihkan
                            </>
                          ) : (
                            <>
                              <FaArchive className="text-xs" />
                              Arsipkan
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Stars value={item.rating} />
                  <span className="text-[13px] text-[#596070]">
                    {item.rating}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`px-2 py-[4px] rounded-[6px] text-[11px] font-bold ${getTypeStyle(
                      item.tipe,
                    )}`}
                  >
                    {item.tipe}
                  </span>

                  <span
                    className={`px-2 py-[4px] rounded-[6px] text-[11px] font-bold ${getStatusStyle(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>

                  <span
                    className={`px-2 py-[4px] rounded-[6px] text-[11px] font-bold ${getPriorityStyle(
                      item.prioritas,
                    )}`}
                  >
                    {item.prioritas}
                  </span>
                </div>

                <p className="text-[13px] leading-6 text-[#596070] line-clamp-4">
                  {item.teks}
                </p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#EEF1F5]">
                  <span className="text-[12px] text-[#9AA0AA]">
                    {formatDate(item.tanggal)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openDetailModal(item)}
                      className="h-[30px] px-3 rounded-[8px] bg-[#EAF4FF] text-[#5A91D6] text-[12px] font-bold hover:bg-[#70A9F8] hover:text-white transition"
                    >
                      Detail
                    </button>

                    <button
                      type="button"
                      onClick={() => openReplyModal(item)}
                      className="h-[30px] px-3 rounded-[8px] bg-[#F4F5F7] text-[#596070] text-[12px] font-bold hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition"
                    >
                      Balas
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mt-6 gap-4 text-sm text-[#9AA0AA]">
          <div className="flex items-center gap-2">
            <span>Menampilkan</span>

            <button className="h-[34px] px-3 rounded-[8px] bg-[#F4F5F7] font-semibold text-[#596070] flex items-center gap-2">
              {totalData === 0 ? 0 : startIndex + 1} -{" "}
              {Math.min(endIndex, totalData)}
            </button>

            <span>dari {totalData}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`h-[34px] px-3 rounded-[8px] flex items-center gap-2 transition ${
                currentPage === 1
                  ? "bg-[#F4F5F7] text-[#C0C4CC] cursor-not-allowed"
                  : "bg-[#F4F5F7] text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
              }`}
            >
              <FaChevronLeft />
              Sebelumnya
            </button>

            {Array.from(
              { length: totalPages || 1 },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-[34px] h-[34px] rounded-[8px] font-bold transition ${
                  currentPage === page
                    ? "bg-[#70A9F8] text-white shadow-md"
                    : "bg-[#F4F5F7] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`h-[34px] px-3 rounded-[8px] flex items-center gap-2 transition ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-[#F4F5F7] text-[#C0C4CC] cursor-not-allowed"
                  : "bg-[#F4F5F7] text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
              }`}
            >
              Berikutnya
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* MODAL DETAIL */}
      {selectedFeedback && modalType === "detail" && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="w-full max-w-[620px] bg-white rounded-[18px] shadow-2xl p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[20px] font-bold">Detail Feedback</h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Informasi lengkap feedback traveler.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-[34px] h-[34px] rounded-[8px] bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              {selectedFeedback.image ? (
                <img
                  src={selectedFeedback.image}
                  alt={selectedFeedback.nama}
                  className="w-[46px] h-[46px] rounded-full object-cover"
                />
              ) : (
                <div className="w-[46px] h-[46px] rounded-full bg-[#D7ECFF] text-[#5A91D6] flex items-center justify-center text-sm font-bold">
                  {selectedFeedback.avatar}
                </div>
              )}

              <div>
                <h3 className="font-bold text-[#202436]">
                  {selectedFeedback.nama}
                </h3>
                <p className="text-[13px] text-[#9AA0AA]">
                  {selectedFeedback.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5 text-[13px]">
              <div className="bg-[#F8FBFF] rounded-[12px] p-3">
                <p className="text-[#9AA0AA]">Paket</p>
                <p className="font-bold text-[#202436]">
                  {selectedFeedback.paket}
                </p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[12px] p-3">
                <p className="text-[#9AA0AA]">Tanggal</p>
                <p className="font-bold text-[#202436]">
                  {formatDate(selectedFeedback.tanggal)}
                </p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[12px] p-3">
                <p className="text-[#9AA0AA]">Status</p>
                <p className="font-bold text-[#202436]">
                  {selectedFeedback.status}
                </p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[12px] p-3">
                <p className="text-[#9AA0AA]">Prioritas</p>
                <p className="font-bold text-[#202436]">
                  {selectedFeedback.prioritas}
                </p>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-[13px] text-[#9AA0AA] mb-2">Rating</p>
              <div className="flex items-center gap-2">
                <Stars value={selectedFeedback.rating} />
                <span className="font-bold text-[#596070]">
                  {selectedFeedback.rating}
                </span>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-[13px] text-[#9AA0AA] mb-2">Isi Feedback</p>
              <p className="text-[14px] leading-7 text-[#596070] bg-[#F8FBFF] rounded-[12px] p-4">
                {selectedFeedback.teks}
              </p>
            </div>

            <div>
              <p className="text-[13px] text-[#9AA0AA] mb-2">Balasan Admin</p>
              <p className="text-[14px] leading-7 text-[#596070] bg-[#F8FBFF] rounded-[12px] p-4">
                {selectedFeedback.balasan || "Belum ada balasan dari admin."}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => openReplyModal(selectedFeedback)}
                className="h-[40px] px-4 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition"
              >
                Balas Feedback
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="h-[40px] px-4 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BALAS */}
      {selectedFeedback && modalType === "reply" && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="w-full max-w-[560px] bg-white rounded-[18px] shadow-2xl p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[20px] font-bold">Balas Feedback</h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Balasan akan disimpan sebagai respons admin.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-[34px] h-[34px] rounded-[8px] bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition"
              >
                <FaTimes />
              </button>
            </div>

            <div className="bg-[#F8FBFF] rounded-[12px] p-4 mb-4">
              <p className="font-bold text-[#202436]">
                {selectedFeedback.nama}
              </p>
              <p className="text-[13px] text-[#9AA0AA] mt-1">
                {selectedFeedback.paket}
              </p>
              <p className="text-[13px] leading-6 text-[#596070] mt-3">
                {selectedFeedback.teks}
              </p>
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Tulis balasan untuk traveler..."
              className="w-full min-h-[140px] rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] px-4 py-3 text-sm resize-none"
            />

            <div className="flex items-center justify-end gap-3 mt-5">
              <button
                type="button"
                onClick={handleSaveReply}
                className="h-[40px] px-4 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition"
              >
                Simpan Balasan
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="h-[40px] px-4 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
