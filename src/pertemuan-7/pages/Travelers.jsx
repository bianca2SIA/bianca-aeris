import { useEffect, useMemo, useState } from "react";

import {
  FaSearch,
  FaPlus,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaSort,
  FaEllipsisH,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaPaperPlane,
  FaGift,
  FaCrown,
  FaUserCheck,
  FaHistory,
} from "react-icons/fa";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import travelers from "../data/traveler.json";

const DATA_PER_PAGE = 10;
const STORAGE_KEY = "travelgo_travelers";

const sourceOptions = [
  "Website",
  "Instagram Ads",
  "Facebook Ads",
  "Google Search",
  "Referral",
  "Walk-in Customer",
];

const paymentOptions = [
  "Transfer Bank",
  "QRIS",
  "E-Wallet",
  "Kartu Kredit",
  "Virtual Account",
];

const levelOptions = ["Semua Level", "Regular", "Gold", "Silver", "Platinum"];
const memberLevels = ["Regular", "Silver", "Gold", "Platinum"];

const inputClass =
  "h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]";

const emptyForm = {
  nama: "",
  email: "",
  hp: "",
  alamat: "",
  paket: "",
  statusMember: "Member",
  level: "Regular",
  promo: "Tidak Aktif",
  sourceUser: "Website",
  paymentMethod: "Transfer Bank",
  totalTransaksi: "",
  jumlahBooking: "",
  catatan: "",
};

const tableHeaders = [
  { label: "Nama", width: "w-[20%]" },
  { label: "Nomor HP", width: "w-[12%]" },
  { label: "Alamat", width: "w-[15%]" },
  { label: "Paket Dibeli", width: "w-[15%]" },
  { label: "Status Member", width: "w-[11%]" },
  { label: "Level", width: "w-[8%]" },
  { label: "Promo", width: "w-[11%]" },
  { label: "Aksi", width: "w-[8%]", noSort: true },
];

const formInputs = [
  { name: "nama", type: "text", placeholder: "Nama traveler" },
  { name: "email", type: "email", placeholder: "Email traveler" },
  { name: "hp", type: "text", placeholder: "Nomor HP" },
  { name: "alamat", type: "text", placeholder: "Alamat" },
  { name: "paket", type: "text", placeholder: "Paket dibeli" },
];

const numberInputs = [
  { name: "totalTransaksi", placeholder: "Total transaksi" },
  { name: "jumlahBooking", placeholder: "Jumlah booking" },
];

const normalizeTraveler = (data) => {
  return data.map((item, index) => {
    const paket = item.paket || "Paket TravelGo";
    const pembayaran = item.paymentMethod || paymentOptions[index % paymentOptions.length];

    return {
      ...item,
      id: item.id || index + 1,
      nama: item.nama || "Traveler TravelGo",
      email: item.email || `traveler${index + 1}@gmail.com`,
      hp: item.hp || `08${String(1234567890 + index).slice(0, 10)}`,
      alamat: item.alamat || "Indonesia",
      paket,
      statusMember: item.statusMember || "Non-Member",
      level: item.level || "Regular",
      promo: item.promo || "Tidak Aktif",
      sourceUser: item.sourceUser || sourceOptions[index % sourceOptions.length],
      paymentMethod: pembayaran,
      totalTransaksi: item.totalTransaksi || 2500000 + index * 850000,
      jumlahBooking: item.jumlahBooking || index + 1,
      tanggalBergabung:
        item.tanggalBergabung ||
        `2024-${String((index % 9) + 1).padStart(2, "0")}-${String(
          (index % 25) + 1
        ).padStart(2, "0")}`,
      catatan:
        item.catatan ||
        "Customer memiliki ketertarikan pada paket wisata keluarga dan promo musiman.",
      feedback:
        item.feedback ||
        "Pelayanan TravelGo cukup membantu dan informasi paket mudah dipahami.",
      komplain:
        item.komplain ||
        (index % 4 === 0
          ? "Pernah menanyakan keterlambatan konfirmasi pembayaran."
          : "Tidak ada komplain aktif."),
      bookingHistory:
        item.bookingHistory || createBookingHistory(paket, pembayaran, index),
    };
  });
};

const createBookingHistory = (paket, pembayaran, index) => [
  {
    id: 1,
    paket,
    tanggal: "12 Juni 2026",
    pembayaran,
    total: 2500000 + index * 500000,
    status: "Selesai",
  },
  {
    id: 2,
    paket: "Paket City Tour",
    tanggal: "20 Mei 2026",
    pembayaran: "QRIS",
    total: 1250000 + index * 250000,
    status: index % 3 === 0 ? "Diproses" : "Selesai",
  },
];

const getInitialTravelers = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return normalizeTraveler(travelers);

  try {
    return normalizeTraveler(JSON.parse(savedData));
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return normalizeTraveler(travelers);
  }
};

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value || 0));
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

const getMemberStyle = (status) => {
  if (status === "Member") return "text-[#596070]";
  return "text-[#8F96A3]";
};

function InfoCard({ title, children, className = "" }) {
  return (
    <div className={`bg-[#F8FBFF] rounded-[14px] p-4 ${className}`}>
      <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">{title}</p>
      {children}
    </div>
  );
}

function Badge({ children, className }) {
  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-[6px] text-[12px] font-bold whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}

function TextInput({ name, type = "text", value, placeholder, onChange }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputClass}
    />
  );
}

function SelectInput({ name, value, onChange, options }) {
  return (
    <select name={name} value={value} onChange={onChange} className={inputClass}>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default function User() {
  const [travelerData, setTravelerData] = useState(getInitialTravelers);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("semua");
  const [levelFilter, setLevelFilter] = useState("Semua Level");
  const [search, setSearch] = useState("");
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const [modalType, setModalType] = useState("");
  const [notification, setNotification] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  const [actionMenu, setActionMenu] = useState({ id: null, x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(travelerData));
  }, [travelerData]);

  const filteredTravelers = useMemo(() => {
    let data = travelerData;

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
      const keyword = search.toLowerCase();

      data = data.filter((traveler) => {
        return (
          traveler.nama?.toLowerCase().includes(keyword) ||
          traveler.email?.toLowerCase().includes(keyword) ||
          traveler.alamat?.toLowerCase().includes(keyword) ||
          traveler.paket?.toLowerCase().includes(keyword) ||
          traveler.hp?.toLowerCase().includes(keyword) ||
          traveler.statusMember?.toLowerCase().includes(keyword) ||
          traveler.level?.toLowerCase().includes(keyword) ||
          traveler.promo?.toLowerCase().includes(keyword) ||
          traveler.sourceUser?.toLowerCase().includes(keyword)
        );
      });
    }

    return data;
  }, [activeTab, levelFilter, search, travelerData]);

  const totalData = filteredTravelers.length;
  const totalPages = Math.ceil(totalData / DATA_PER_PAGE);
  const startIndex = (currentPage - 1) * DATA_PER_PAGE;
  const endIndex = startIndex + DATA_PER_PAGE;
  const currentTravelers = filteredTravelers.slice(startIndex, endIndex);

  const selectedActionTraveler = travelerData.find(
    (item) => item.id === actionMenu.id
  );

  const memberCount = travelerData.filter(
    (item) => item.statusMember === "Member"
  ).length;

  const promoCount = travelerData.filter((item) => item.promo === "Aktif").length;

  const showNotification = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(""), 2500);
  };

  const closeActionMenu = () => {
    setActionMenu({ id: null, x: 0, y: 0 });
  };

  const resetForm = () => {
    setFormData(emptyForm);
  };

  const closeModal = () => {
    setSelectedTraveler(null);
    setModalType("");
    closeActionMenu();
    resetForm();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openActionMenu = (e, traveler) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 240;
    const spaceRight = window.innerWidth - rect.right;
    const x =
      spaceRight < menuWidth
        ? Math.max(12, rect.left - menuWidth + 34)
        : rect.right - menuWidth;
    const y = rect.bottom + 8;

    if (actionMenu.id === traveler.id) {
      closeActionMenu();
      return;
    }

    setActionMenu({ id: traveler.id, x, y });
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
    closeActionMenu();
  };

  const handleLevelFilter = (level) => {
    setLevelFilter(level);
    setCurrentPage(1);
    setIsLevelOpen(false);
    closeActionMenu();
  };

  const openDetailModal = (traveler) => {
    setSelectedTraveler(traveler);
    setModalType("detail");
    closeActionMenu();
  };

  const openAddModal = () => {
    resetForm();
    setSelectedTraveler(null);
    setModalType("form");
    closeActionMenu();
  };

  const openEditModal = (traveler) => {
    setSelectedTraveler(traveler);
    setFormData({
      nama: traveler.nama || "",
      email: traveler.email || "",
      hp: traveler.hp || "",
      alamat: traveler.alamat || "",
      paket: traveler.paket || "",
      statusMember: traveler.statusMember || "Member",
      level: traveler.level || "Regular",
      promo: traveler.promo || "Tidak Aktif",
      sourceUser: traveler.sourceUser || "Website",
      paymentMethod: traveler.paymentMethod || "Transfer Bank",
      totalTransaksi: traveler.totalTransaksi || "",
      jumlahBooking: traveler.jumlahBooking || "",
      catatan: traveler.catatan || "",
    });

    setModalType("form");
    closeActionMenu();
  };

  const updateTraveler = (id, getNewData) => {
    let result = null;

    setTravelerData((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        result = getNewData(item);
        return result;
      })
    );

    if (selectedTraveler?.id === id && result) {
      setSelectedTraveler(result);
    }
  };

  const handleSubmitTraveler = (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.email || !formData.hp) {
      alert("Nama, email, dan nomor HP wajib diisi");
      return;
    }

    const payload = {
      ...formData,
      totalTransaksi: Number(formData.totalTransaksi || 0),
      jumlahBooking: Number(formData.jumlahBooking || 0),
    };

    if (selectedTraveler) {
      setTravelerData((prev) =>
        prev.map((item) =>
          item.id === selectedTraveler.id ? { ...item, ...payload } : item
        )
      );
      showNotification("Data traveler berhasil diperbarui");
    } else {
      const newTraveler = {
        id: Date.now(),
        ...payload,
        tanggalBergabung: new Date().toISOString().split("T")[0],
        feedback: "Belum ada feedback.",
        komplain: "Tidak ada komplain aktif.",
        bookingHistory: [
          {
            id: 1,
            paket: payload.paket || "Belum ada paket",
            tanggal: "Baru ditambahkan",
            pembayaran: payload.paymentMethod,
            total: Number(payload.totalTransaksi || 0),
            status: "Diproses",
          },
        ],
      };

      setTravelerData((prev) => [newTraveler, ...prev]);
      setCurrentPage(1);
      showNotification("Traveler baru berhasil ditambahkan");
    }

    closeModal();
  };

  const handleDeleteTraveler = (traveler) => {
    const confirmDelete = confirm(
      `Yakin ingin menghapus traveler "${traveler.nama}"?`
    );

    if (!confirmDelete) return;

    setTravelerData((prev) => prev.filter((item) => item.id !== traveler.id));
    closeActionMenu();
    closeModal();
    showNotification("Traveler berhasil dihapus");
  };

  const handleUpgradeLevel = (traveler) => {
    const currentIndex = memberLevels.indexOf(traveler.level);
    const nextLevel =
      currentIndex === -1 || currentIndex === memberLevels.length - 1
        ? "Platinum"
        : memberLevels[currentIndex + 1];

    updateTraveler(traveler.id, (item) => ({
      ...item,
      level: nextLevel,
      statusMember: "Member",
    }));

    closeActionMenu();
    showNotification(`${traveler.nama} berhasil di-upgrade ke ${nextLevel}`);
  };

  const handleTogglePromo = (traveler) => {
    const newPromo = traveler.promo === "Aktif" ? "Tidak Aktif" : "Aktif";

    updateTraveler(traveler.id, (item) => ({ ...item, promo: newPromo }));
    closeActionMenu();
    showNotification(`Status promo ${traveler.nama} menjadi ${newPromo}`);
  };

  const handleToggleMember = (traveler) => {
    const newStatus =
      traveler.statusMember === "Member" ? "Non-Member" : "Member";

    updateTraveler(traveler.id, (item) => ({
      ...item,
      statusMember: newStatus,
      level: newStatus === "Member" ? item.level : "Regular",
    }));

    closeActionMenu();
    showNotification(`Status ${traveler.nama} menjadi ${newStatus}`);
  };

  const handleSendMessage = (traveler) => {
    const selectedCustomer = {
      id: `traveler-${traveler.id}`,
      travelerId: traveler.id,
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
      memberLevel: traveler.level,
      lastPackage: traveler.paket,
      totalTransaction: traveler.totalTransaksi,
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
      JSON.stringify(selectedCustomer)
    );

    closeActionMenu();
    showNotification(`Membuka halaman Messages untuk ${traveler.nama}...`);

    setTimeout(() => {
      window.location.href = "/messages";
    }, 500);
  };

  const handleResetData = () => {
    const confirmReset = confirm("Reset data traveler ke data awal?");
    if (!confirmReset) return;

    localStorage.removeItem(STORAGE_KEY);
    setTravelerData(normalizeTraveler(travelers));
    setCurrentPage(1);
    closeActionMenu();
    showNotification("Data traveler berhasil direset");
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      closeActionMenu();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      closeActionMenu();
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      {notification && (
        <div className="fixed top-5 right-5 z-[999999] bg-[#202436] text-white px-5 py-3 rounded-[12px] shadow-xl text-sm font-semibold">
          {notification}
        </div>
      )}

      <div className="flex items-center justify-between mb-6 gap-4">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-auto">
          <TabsList className="bg-transparent p-0 h-auto flex gap-4">
            <TabButton value="semua" icon="groups" label="Semua Customer" total={travelerData.length} />
            <TabButton value="member" icon="workspace_premium" label="Member" total={memberCount} />
            <TabButton value="promo" icon="local_offer" label="Promo Aktif" total={promoCount} />
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3">
          <div className="w-[330px] h-[44px] bg-white rounded-[12px] flex items-center px-4 gap-3 border border-[#EEF1F5] shadow-sm hover:shadow-md focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
            <FaSearch className="text-[#B9C0CA] text-sm shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
                closeActionMenu();
              }}
              placeholder="Cari traveler..."
              className="w-full bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none text-sm placeholder:text-[#B9C0CA]"
            />
          </div>

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
                {levelOptions.map((level) => (
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

          <button
            type="button"
            onClick={openAddModal}
            className="h-[44px] px-5 bg-[#70A9F8] hover:bg-[#5D9AF2] text-white rounded-[12px] text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <FaPlus className="text-xs" />
            Tambah Traveler
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[14px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full">
        <table className="w-full table-fixed">
          <thead className="bg-[#EAF4FF]">
            <tr className="text-left text-[13px] text-[#8F96A3]">
              {tableHeaders.map((header) => (
                <th key={header.label} className={`px-6 py-4 font-semibold ${header.width}`}>
                  {header.noSort ? (
                    header.label
                  ) : (
                    <div className="flex items-center gap-2 hover:text-[#70A9F8] transition">
                      {header.label} <FaSort className="text-[10px]" />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentTravelers.map((traveler, index) => (
              <tr
                key={traveler.id}
                className="group border-b border-[#EEF1F5] hover:bg-gradient-to-r hover:from-[#F8FBFF] hover:to-white hover:shadow-md hover:-translate-y-[2px] transition-all duration-300"
              >
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => openDetailModal(traveler)}
                    className="flex items-center gap-3 text-left w-full"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${startIndex + index + 12}`}
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
                  </button>
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070] group-hover:text-[#202436] transition whitespace-nowrap">
                  {traveler.hp}
                </td>
                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070] group-hover:text-[#202436] transition truncate">
                  {traveler.alamat}
                </td>
                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070] group-hover:text-[#202436] transition truncate">
                  {traveler.paket}
                </td>
                <td
                  className={`px-6 py-4 text-[14px] font-semibold group-hover:text-[#202436] transition whitespace-nowrap ${getMemberStyle(
                    traveler.statusMember
                  )}`}
                >
                  {traveler.statusMember}
                </td>
                <td className="px-6 py-4">
                  <Badge className={`shadow-sm group-hover:shadow-md transition-all duration-300 ${getLevelStyle(traveler.level)}`}>
                    {traveler.level}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge className={`min-w-[96px] shadow-sm group-hover:shadow-md transition-all duration-300 ${getPromoStyle(traveler.promo)}`}>
                    {traveler.promo}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={(e) => openActionMenu(e, traveler)}
                    className="w-[34px] h-[34px] rounded-[8px] bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition"
                  >
                    <FaEllipsisH />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentTravelers.length === 0 && (
          <div className="min-h-[220px] flex flex-col items-center justify-center text-center">
            <div className="w-[54px] h-[54px] rounded-full bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center mb-3">
              <FaSearch />
            </div>
            <h3 className="font-bold text-[#202436]">Traveler tidak ditemukan</h3>
            <p className="text-[13px] text-[#9AA0AA] mt-1">
              Coba ubah keyword pencarian, tab, atau filter level.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between px-6 py-5 text-sm text-[#9AA0AA]">
          <div className="flex items-center gap-2">
            <span>Menampilkan</span>
            <button className="h-[34px] px-3 rounded-[8px] bg-[#F4F5F7] font-semibold text-[#596070]">
              {totalData === 0 ? 0 : startIndex + 1} - {Math.min(endIndex, totalData)}
            </button>
            <span>dari {totalData} traveler</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
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

            {Array.from({ length: totalPages || 1 }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => {
                  setCurrentPage(page);
                  closeActionMenu();
                }}
                className={`w-[34px] h-[34px] rounded-[8px] font-bold transition ${
                  currentPage === page
                    ? "bg-[#70A9F8] text-white shadow-md"
                    : "bg-[#F4F5F7] hover:bg-[#EAF4FF] hover:text-[#70A9F8] text-[#596070]"
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
                  : "bg-[#F4F5F7] hover:bg-[#EAF4FF] hover:text-[#70A9F8] text-[#596070]"
              }`}
            >
              Berikutnya
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {actionMenu.id && (
        <button
          type="button"
          onClick={closeActionMenu}
          className="fixed inset-0 z-[99998] cursor-default bg-transparent"
        />
      )}

      {actionMenu.id && selectedActionTraveler && (
        <ActionMenu
          actionMenu={actionMenu}
          traveler={selectedActionTraveler}
          onDetail={openDetailModal}
          onEdit={openEditModal}
          onMessage={handleSendMessage}
          onUpgrade={handleUpgradeLevel}
          onPromo={handleTogglePromo}
          onMember={handleToggleMember}
          onDelete={handleDeleteTraveler}
        />
      )}

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleResetData}
          className="text-[12px] font-semibold text-[#9AA0AA] hover:text-red-500 transition"
        >
          Reset data traveler
        </button>
      </div>

      {selectedTraveler && modalType === "detail" && (
        <DetailModal
          traveler={selectedTraveler}
          onClose={closeModal}
          onEdit={openEditModal}
          onMessage={handleSendMessage}
        />
      )}

      {modalType === "form" && (
        <FormModal
          traveler={selectedTraveler}
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmitTraveler}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

function TabButton({ value, icon, label, total }) {
  return (
    <TabsTrigger
      value={value}
      className="h-[46px] px-5 rounded-[12px] text-[13px] font-bold bg-[#F8FBFF] text-[#596070] hover:bg-white hover:text-[#70A9F8] hover:shadow-md data-[state=active]:bg-[#70A9F8] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
    >
      <span className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
        {label}
        <span className="px-2 py-[2px] rounded-full bg-white text-[#70A9F8] text-[11px] font-bold">
          {total}
        </span>
      </span>
    </TabsTrigger>
  );
}

function ActionMenu({
  actionMenu,
  traveler,
  onDetail,
  onEdit,
  onMessage,
  onUpgrade,
  onPromo,
  onMember,
  onDelete,
}) {
  const itemClass =
    "w-full text-left px-4 py-3 rounded-[10px] text-sm font-semibold text-[#596070] flex items-center gap-3 transition";

  return (
    <div
      className="fixed w-[240px] bg-white rounded-[14px] shadow-2xl border border-[#E8EDF3] p-2 z-[99999]"
      style={{ top: `${actionMenu.y}px`, left: `${actionMenu.x}px` }}
    >
      <button type="button" onClick={() => onDetail(traveler)} className={`${itemClass} hover:bg-[#EAF4FF] hover:text-[#70A9F8]`}>
        <FaEye className="text-sm shrink-0" />
        <span className="whitespace-nowrap">Lihat Detail</span>
      </button>

      <button type="button" onClick={() => onEdit(traveler)} className={`${itemClass} hover:bg-[#EAF4FF] hover:text-[#70A9F8]`}>
        <FaEdit className="text-sm shrink-0" />
        <span className="whitespace-nowrap">Edit Traveler</span>
      </button>

      <button type="button" onClick={() => onMessage(traveler)} className={`${itemClass} hover:bg-[#EAF4FF] hover:text-[#70A9F8]`}>
        <FaPaperPlane className="text-sm shrink-0" />
        <span className="whitespace-nowrap">Kirim Pesan</span>
      </button>

      <button type="button" onClick={() => onUpgrade(traveler)} className={`${itemClass} hover:bg-[#FFF4D8] hover:text-[#B88700]`}>
        <FaCrown className="text-sm shrink-0" />
        <span className="whitespace-nowrap">Upgrade Level</span>
      </button>

      <button type="button" onClick={() => onPromo(traveler)} className={`${itemClass} hover:bg-[#EAF4FF] hover:text-[#70A9F8]`}>
        <FaGift className="text-sm shrink-0" />
        <span className="whitespace-nowrap">
          {traveler.promo === "Aktif" ? "Nonaktifkan Promo" : "Aktifkan Promo"}
        </span>
      </button>

      <button type="button" onClick={() => onMember(traveler)} className={`${itemClass} hover:bg-[#F4F8FF] hover:text-[#70A9F8]`}>
        <FaUserCheck className="text-sm shrink-0" />
        <span className="whitespace-nowrap">
          {traveler.statusMember === "Member" ? "Jadikan Non-Member" : "Jadikan Member"}
        </span>
      </button>

      <div className="h-[1px] bg-[#EEF1F5] my-2"></div>

      <button type="button" onClick={() => onDelete(traveler)} className={`${itemClass} text-red-500 hover:bg-red-50`}>
        <FaTrash className="text-sm shrink-0" />
        <span className="whitespace-nowrap">Hapus Traveler</span>
      </button>
    </div>
  );
}

function DetailModal({ traveler, onClose, onEdit, onMessage }) {
  return (
    <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-6">
      <div className="w-full max-w-[860px] bg-white rounded-[18px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <img
              src={`https://i.pravatar.cc/100?u=${traveler.email}`}
              alt={traveler.nama}
              className="w-[62px] h-[62px] rounded-full object-cover"
            />

            <div>
              <h2 className="text-[22px] font-bold text-[#202436]">{traveler.nama}</h2>
              <p className="text-[13px] text-[#9AA0AA]">{traveler.email}</p>

              <div className="flex items-center gap-2 mt-2">
                <Badge className={getLevelStyle(traveler.level)}>{traveler.level}</Badge>
                <Badge className={`min-w-[96px] ${getPromoStyle(traveler.promo)}`}>
                  {traveler.promo}
                </Badge>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-[36px] h-[36px] rounded-full bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition"
          >
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <InfoCard title="Nomor HP">
            <p className="text-[14px] font-bold text-[#202436]">{traveler.hp}</p>
          </InfoCard>
          <InfoCard title="Status Member">
            <p className="text-[14px] font-bold text-[#202436]">{traveler.statusMember}</p>
          </InfoCard>
          <InfoCard title="Sumber User">
            <p className="text-[14px] font-bold text-[#202436]">{traveler.sourceUser}</p>
          </InfoCard>
          <InfoCard title="Alamat" className="md:col-span-2">
            <p className="text-[14px] font-bold text-[#202436]">{traveler.alamat}</p>
          </InfoCard>
          <InfoCard title="Tanggal Bergabung">
            <p className="text-[14px] font-bold text-[#202436]">{traveler.tanggalBergabung}</p>
          </InfoCard>
          <InfoCard title="Total Transaksi">
            <p className="text-[14px] font-bold text-[#202436]">{formatRupiah(traveler.totalTransaksi)}</p>
          </InfoCard>
          <InfoCard title="Jumlah Booking">
            <p className="text-[14px] font-bold text-[#202436]">{traveler.jumlahBooking} booking</p>
          </InfoCard>
          <InfoCard title="Pembayaran Terakhir">
            <p className="text-[14px] font-bold text-[#202436]">{traveler.paymentMethod}</p>
          </InfoCard>
        </div>

        <div className="bg-white rounded-[14px] border border-[#EEF1F5] overflow-hidden mb-5">
          <div className="px-4 py-3 bg-[#EAF4FF] flex items-center gap-2">
            <FaHistory className="text-[#70A9F8]" />
            <h3 className="text-[15px] font-bold text-[#202436]">Riwayat Booking</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[13px] text-[#8F96A3] border-b border-[#EEF1F5]">
                  <th className="px-4 py-3">Paket</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Pembayaran</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {traveler.bookingHistory.map((booking) => (
                  <tr key={booking.id} className="border-b border-[#EEF1F5] hover:bg-[#F8FBFF] transition">
                    <td className="px-4 py-3 text-[13px] font-bold text-[#202436]">{booking.paket}</td>
                    <td className="px-4 py-3 text-[13px] text-[#596070]">{booking.tanggal}</td>
                    <td className="px-4 py-3 text-[13px] text-[#596070]">{booking.pembayaran}</td>
                    <td className="px-4 py-3 text-[13px] text-[#596070]">{formatRupiah(booking.total)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-[6px] text-[12px] font-bold whitespace-nowrap ${
                          booking.status === "Selesai"
                            ? "bg-[#EAF4FF] text-[#5A91D6]"
                            : "bg-[#FFF4D8] text-[#B88700]"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InfoCard title="Paket Terakhir">
            <p className="text-[14px] font-bold text-[#202436]">{traveler.paket}</p>
          </InfoCard>
          <InfoCard title="Feedback Terakhir">
            <p className="text-[13px] leading-6 text-[#596070]">{traveler.feedback}</p>
          </InfoCard>
          <InfoCard title="Komplain">
            <p className="text-[13px] leading-6 text-[#596070]">{traveler.komplain}</p>
          </InfoCard>
          <InfoCard title="Catatan Admin" className="md:col-span-3">
            <p className="text-[13px] leading-6 text-[#596070]">{traveler.catatan}</p>
          </InfoCard>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onMessage(traveler)}
            className="h-[42px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition flex items-center gap-2"
          >
            <FaPaperPlane className="text-xs" />
            Kirim Pesan
          </button>

          <button
            type="button"
            onClick={() => onEdit(traveler)}
            className="h-[42px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition flex items-center gap-2"
          >
            <FaEdit className="text-xs" />
            Edit Traveler
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-[42px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

function FormModal({ traveler, formData, onChange, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-6">
      <div className="w-full max-w-[760px] bg-white rounded-[18px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-[20px] font-bold">
              {traveler ? "Edit Traveler" : "Tambah Traveler"}
            </h2>
            <p className="text-[13px] text-[#9AA0AA] mt-1">
              Isi data customer TravelGo dengan lengkap.
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

        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formInputs.map((field) => (
            <TextInput
              key={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              placeholder={field.placeholder}
              onChange={onChange}
            />
          ))}

          <SelectInput
            name="statusMember"
            value={formData.statusMember}
            onChange={onChange}
            options={["Member", "Non-Member"]}
          />
          <SelectInput
            name="level"
            value={formData.level}
            onChange={onChange}
            options={memberLevels}
          />
          <SelectInput
            name="promo"
            value={formData.promo}
            onChange={onChange}
            options={["Aktif", "Tidak Aktif"]}
          />
          <SelectInput
            name="sourceUser"
            value={formData.sourceUser}
            onChange={onChange}
            options={sourceOptions}
          />
          <SelectInput
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={onChange}
            options={paymentOptions}
          />

          {numberInputs.map((field) => (
            <TextInput
              key={field.name}
              name={field.name}
              type="number"
              value={formData[field.name]}
              placeholder={field.placeholder}
              onChange={onChange}
            />
          ))}

          <textarea
            name="catatan"
            value={formData.catatan}
            onChange={onChange}
            placeholder="Catatan admin"
            className="md:col-span-2 min-h-[100px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
          />

          <div className="md:col-span-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-[44px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] transition"
            >
              Batal
            </button>

            <button
              type="submit"
              className="h-[44px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition"
            >
              {traveler ? "Update Traveler" : "Simpan Traveler"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
