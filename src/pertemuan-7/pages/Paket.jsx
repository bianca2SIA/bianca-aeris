import { useEffect, useMemo, useState } from "react";

import {
  FaMapMarkerAlt,
  FaStar,
  FaRegStar,
  FaPlus,
  FaEllipsisH,
  FaCheckCircle,
  FaUmbrellaBeach,
  FaHotel,
  FaSpa,
  FaSwimmer,
  FaLeaf,
  FaInfoCircle,
  FaSearch,
  FaChevronDown,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaTag,
  FaPowerOff,
  FaUserCheck,
  FaCrown,
  FaHistory,
} from "react-icons/fa";

import paketData from "../data/paket.json";
import bookingData from "../data/booking.json";
import travelerData from "../data/traveler.json";

const STORAGE_KEY = "travelgo_packages_final";

const defaultImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80";

const emptyPackageForm = {
  nama: "",
  lokasi: "",
  harga: "",
  durasi: "",
  gambar: "",
  deskripsi: "",
  rating: "4.8/5",
  kategori: "Umum",
  status: "Aktif",
  promo: "Tidak Aktif",
  diskon: "0%",
  akomodasi: "",
  makan: "",
  ekstra: "",
  aktivitasText: "",
};

const emptyPromoForm = {
  namaPromo: "",
  diskon: "20%",
  periode: "",
  target: "Semua Customer",
  status: "Aktif",
};

const statusOptions = ["Semua Status", "Aktif", "Nonaktif"];

const iconMap = {
  beach: <FaUmbrellaBeach />,
  hotel: <FaHotel />,
  service: <FaSpa />,
  activity: <FaSwimmer />,
  promo: <FaLeaf />,
};

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value || 0));
}

function rupiahToNumber(value) {
  return Number(String(value || "").replace(/[^0-9]/g, ""));
}

function getStatusStyle(status) {
  if (status === "Aktif") return "bg-[#E9FBEF] text-[#31A05F]";
  return "bg-red-50 text-red-500";
}

function getPromoStyle(promo) {
  if (promo === "Aktif") return "bg-[#EAF4FF] text-[#5A91D6]";
  return "bg-[#F1F1F1] text-[#9AA0AA]";
}

export default function Paket() {
  const {
    paketBaru,
    fasilitasUtama,
    paketPopuler,
    paketUnggulan,
    paketRekomendasi,
  } = paketData;

  const normalizePackage = (item, index, group = "Umum") => {
    const nama = item?.nama || `Paket TravelGo ${index + 1}`;
    const lokasi = item?.lokasi || "Indonesia";
    const harga = item?.harga || "Rp 0";
    const durasi = item?.durasi || "3 Hari / 2 Malam";
    const gambar = item?.gambar || defaultImage;

    return {
      id: item?.id || `${group}-${nama}`.toLowerCase().replaceAll(" ", "-"),
      nama,
      lokasi,
      harga,
      durasi,
      gambar,
      preview: item?.preview || [gambar, gambar, gambar],
      deskripsi:
        item?.deskripsi ||
        "Paket wisata TravelGo dengan fasilitas lengkap, jadwal perjalanan rapi, dan layanan customer service selama perjalanan.",
      rating: item?.rating || "4.8/5",
      akomodasi:
        item?.akomodasi ||
        "Menginap di hotel nyaman dekat destinasi wisata utama.",
      makan:
        item?.makan ||
        "Sarapan setiap hari dan pilihan makan sesuai paket.",
      ekstra:
        item?.ekstra ||
        "Dokumentasi perjalanan dan bantuan customer service.",
      aktivitas: item?.aktivitas || [
        "Mengunjungi destinasi wisata utama",
        "Aktivitas budaya dan kuliner lokal",
        "Waktu bebas untuk belanja dan dokumentasi",
      ],
      status: item?.status || "Aktif",
      kategori: item?.kategori || group,
      promo: item?.promo || "Tidak Aktif",
      diskon: item?.diskon || "0%",
      isPopular: group === "Populer" || item?.isPopular || false,
      isFeatured: group === "Unggulan" || item?.isFeatured || false,
      isRecommended: group === "Rekomendasi" || item?.isRecommended || false,
      createdAt: item?.createdAt || "2026-06-18",
    };
  };

  const buildInitialPackages = () => {
    const allPackages = [
      normalizePackage(paketBaru, 0, "Baru"),
      ...(paketUnggulan || []).map((item, index) =>
        normalizePackage(item, index + 1, "Unggulan")
      ),
      ...(paketPopuler || []).map((item, index) =>
        normalizePackage(item, index + 20, "Populer")
      ),
      ...(paketRekomendasi || []).map((item, index) =>
        normalizePackage(item, index + 40, "Rekomendasi")
      ),
    ];

    const uniquePackages = Array.from(
      new Map(allPackages.map((item) => [item.nama, item])).values()
    );

    return uniquePackages;
  };

  const getInitialPackages = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
        return buildInitialPackages();
      }
    }

    return buildInitialPackages();
  };

  const [packages, setPackages] = useState(getInitialPackages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const [modalType, setModalType] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [actionMenu, setActionMenu] = useState({
    id: null,
    x: 0,
    y: 0,
  });

  const [formData, setFormData] = useState({ ...emptyPackageForm });

  const [promoForm, setPromoForm] = useState({ ...emptyPromoForm });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
  }, [packages]);

  const closeActionMenu = () => {
    setActionMenu({
      id: null,
      x: 0,
      y: 0,
    });
  };

  const openActionMenu = (e, paket) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 250;
    const x = Math.max(12, rect.right - menuWidth);
    const y = rect.bottom + 8;

    if (actionMenu.id === paket.id) {
      closeActionMenu();
      return;
    }

    setActionMenu({
      id: paket.id,
      x,
      y,
    });
  };

  const selectedActionPackage = packages.find((item) => item.id === actionMenu.id);

  const closeModal = () => {
    setModalType("");
    setSelectedPackage(null);
    closeActionMenu();
  };

  const openModal = (type, paket = null) => {
    setModalType(type);
    setSelectedPackage(paket);
    closeActionMenu();
  };

  const resetForm = () => {
    setFormData({ ...emptyPackageForm });
  };

  const openCreateForm = () => {
    resetForm();
    setSelectedPackage(null);
    setModalType("form");
    closeActionMenu();
  };

  const openEditForm = (paket) => {
    setSelectedPackage(paket);
    setFormData({
      nama: paket.nama || "",
      lokasi: paket.lokasi || "",
      harga: paket.harga || "",
      durasi: paket.durasi || "",
      gambar: paket.gambar || "",
      deskripsi: paket.deskripsi || "",
      rating: paket.rating || "4.8/5",
      kategori: paket.kategori || "Umum",
      status: paket.status || "Aktif",
      promo: paket.promo || "Tidak Aktif",
      diskon: paket.diskon || "0%",
      akomodasi: paket.akomodasi || "",
      makan: paket.makan || "",
      ekstra: paket.ekstra || "",
      aktivitasText: (paket.aktivitas || []).join("\n"),
    });
    setModalType("form");
    closeActionMenu();
  };

  const openPromoForm = (paket) => {
    setSelectedPackage(paket);
    setPromoForm({
      namaPromo: `Promo ${paket.nama}`,
      diskon: paket.diskon && paket.diskon !== "0%" ? paket.diskon : "20%",
      periode: "1 Juli 2026 - 31 Juli 2026",
      target: "Semua Customer",
      status: "Aktif",
    });
    setModalType("promo");
    closeActionMenu();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePromoChange = (e) => {
    const { name, value } = e.target;

    setPromoForm({
      ...promoForm,
      [name]: value,
    });
  };

  const handleSubmitPackage = (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.lokasi || !formData.harga) {
      alert("Nama paket, lokasi, dan harga wajib diisi");
      return;
    }

    const payload = {
      nama: formData.nama,
      lokasi: formData.lokasi,
      harga: formData.harga,
      durasi: formData.durasi || "3 Hari / 2 Malam",
      gambar: formData.gambar || defaultImage,
      preview: [formData.gambar || defaultImage, defaultImage, defaultImage],
      deskripsi: formData.deskripsi,
      rating: formData.rating,
      kategori: formData.kategori,
      status: formData.status,
      promo: formData.promo,
      diskon: formData.diskon,
      akomodasi: formData.akomodasi,
      makan: formData.makan,
      ekstra: formData.ekstra,
      aktivitas: formData.aktivitasText
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (selectedPackage) {
      setPackages((prev) =>
        prev.map((item) =>
          item.id === selectedPackage.id
            ? {
                ...item,
                ...payload,
              }
            : item
        )
      );
    } else {
      setPackages((prev) => [
        {
          id: Date.now(),
          ...payload,
          isPopular: false,
          isFeatured: false,
          isRecommended: false,
          createdAt: new Date().toISOString().split("T")[0],
        },
        ...prev,
      ]);
    }

    closeModal();
  };

  const handleSubmitPromo = (e) => {
    e.preventDefault();

    if (!selectedPackage) return;

    setPackages((prev) =>
      prev.map((item) =>
        item.id === selectedPackage.id
          ? {
              ...item,
              promo: promoForm.status,
              diskon: promoForm.diskon,
              namaPromo: promoForm.namaPromo,
              periodePromo: promoForm.periode,
              targetPromo: promoForm.target,
            }
          : item
      )
    );

    closeModal();
  };

  const handleDeletePackage = (paket) => {
    const confirmDelete = confirm(`Yakin ingin menghapus "${paket.nama}"?`);
    if (!confirmDelete) return;

    setPackages((prev) => prev.filter((item) => item.id !== paket.id));
    closeModal();
  };

  const updatePackageFlag = (paket, key, label) => {
    setPackages((prev) =>
      prev.map((item) =>
        item.id === paket.id
          ? {
              ...item,
              [key]: !item[key],
            }
          : item
      )
    );

    closeActionMenu();
  };

  const toggleStatus = (paket) => {
    const newStatus = paket.status === "Aktif" ? "Nonaktif" : "Aktif";

    setPackages((prev) =>
      prev.map((item) =>
        item.id === paket.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    closeActionMenu();
  };

  const getBookingByPackage = (namaPaket) => {
    return bookingData.filter(
      (booking) => booking.paket?.toLowerCase() === namaPaket?.toLowerCase()
    );
  };

  const getTravelersByPackage = (namaPaket) => {
    const bookings = getBookingByPackage(namaPaket);
    const names = bookings.map((booking) => booking.nama?.toLowerCase());

    return travelerData.filter((traveler) =>
      names.includes(traveler.nama?.toLowerCase())
    );
  };

  const getPackageRevenue = (namaPaket) => {
    return getBookingByPackage(namaPaket).reduce(
      (total, booking) => total + rupiahToNumber(booking.harga),
      0
    );
  };

  const filteredPackages = useMemo(() => {
    let data = packages;

    if (statusFilter !== "Semua Status") {
      data = data.filter((item) => item.status === statusFilter);
    }

    if (search.trim() !== "") {
      const keyword = search.toLowerCase();

      data = data.filter((item) => {
        return (
          item.nama?.toLowerCase().includes(keyword) ||
          item.lokasi?.toLowerCase().includes(keyword) ||
          item.harga?.toLowerCase().includes(keyword) ||
          item.durasi?.toLowerCase().includes(keyword) ||
          item.kategori?.toLowerCase().includes(keyword) ||
          item.status?.toLowerCase().includes(keyword) ||
          item.promo?.toLowerCase().includes(keyword)
        );
      });
    }

    return data;
  }, [packages, search, statusFilter]);

  const heroPackage =
    filteredPackages.find((item) => item.kategori === "Baru") ||
    filteredPackages[0] ||
    packages[0];

  const featuredPackages = filteredPackages
    .filter((item) => item.isFeatured || item.kategori === "Unggulan")
    .slice(0, 6);

  const popularPackages = filteredPackages
    .filter((item) => item.isPopular || item.kategori === "Populer")
    .slice(0, 8);

  const recommendedPackages = filteredPackages
    .filter((item) => item.isRecommended || item.kategori === "Rekomendasi")
    .slice(0, 4);

  const shownFeaturedPackages =
    featuredPackages.length > 0 ? featuredPackages : filteredPackages.slice(0, 4);

  const shownPopularPackages =
    popularPackages.length > 0 ? popularPackages : filteredPackages.slice(0, 6);

  const shownRecommendedPackages =
    recommendedPackages.length > 0 ? recommendedPackages : filteredPackages.slice(0, 3);

  const renderStars = (rating) => {
    const numericRating = Number(String(rating || "4").split("/")[0]) || 4;
    const fullStars = Math.floor(numericRating);

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= fullStars ? (
            <FaStar key={star} className="text-[#FFD85C] text-sm" />
          ) : (
            <FaRegStar key={star} className="text-[#FFD85C] text-sm" />
          )
        )}
        <span className="text-[#9AA0A8] text-xs ml-2">{rating}</span>
      </div>
    );
  };

  const PackageActionButton = ({ paket }) => (
    <button
      type="button"
      onClick={(e) => openActionMenu(e, paket)}
      className="w-[34px] h-[34px] rounded-[8px] bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition"
    >
      <FaEllipsisH />
    </button>
  );

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      {/* HEADER ACTION */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-5">
        <h2 className="text-[17px] font-bold">Paket Baru</h2>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="w-full md:w-[330px] h-[44px] bg-white rounded-[12px] flex items-center px-4 gap-3 border border-[#EEF1F5] shadow-sm hover:shadow-md focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
            <FaSearch className="text-[#B9C0CA] text-sm shrink-0" />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                closeActionMenu();
              }}
              placeholder="Cari paket..."
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
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="h-[44px] min-w-[145px] px-4 bg-white rounded-[12px] flex items-center justify-between gap-2 text-[#596070] border border-[#EEF1F5] shadow-sm hover:border-[#70A9F8] transition-all duration-200 text-sm font-bold"
            >
              {statusFilter}

              <FaChevronDown
                className={`text-xs text-[#9AA0AA] transition-transform duration-200 ${
                  isStatusOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isStatusOpen && (
              <div className="absolute right-0 top-[50px] w-[165px] bg-white rounded-[12px] shadow-lg border border-[#E8EDF3] p-2 z-30">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setStatusFilter(status);
                      setIsStatusOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold transition-all duration-200 ${
                      statusFilter === status
                        ? "bg-[#70A9F8] text-white"
                        : "text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8]"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="h-[44px] px-5 bg-[#70A9F8] hover:bg-[#5D9AF2] text-white rounded-[12px] text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <FaPlus className="text-xs" />
            Tambah Paket
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_310px] gap-6">
        {/* KIRI */}
        <section className="min-w-0">
          {/* HERO PACKAGE */}
          {heroPackage ? (
            <div className="bg-white rounded-[14px] p-5 grid grid-cols-1 lg:grid-cols-[320px_1fr] 2xl:grid-cols-[320px_1fr_255px] gap-6 mb-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-[350px] rounded-[14px] overflow-hidden relative">
                <img
                  src={heroPackage.gambar}
                  alt={heroPackage.nama}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />

                <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">
                  {(heroPackage.preview || [heroPackage.gambar]).slice(0, 3).map((gambar, index) => (
                    <img
                      key={index}
                      src={gambar}
                      alt="Preview Paket"
                      className="h-[72px] rounded-[8px] object-cover border-2 border-white hover:scale-105 transition duration-300"
                    />
                  ))}
                </div>
              </div>

              <div className="py-3 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h1 className="text-[31px] font-bold leading-[37px] mb-4">
                    {heroPackage.nama}
                  </h1>

                  <PackageActionButton paket={heroPackage} />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[#8D929D] text-sm font-semibold mb-5">
                  <FaMapMarkerAlt className="text-[#9AA0A8]" />
                  {heroPackage.lokasi}

                  <span
                    className={`ml-2 inline-flex items-center justify-center min-w-[70px] px-3 py-1 rounded-[6px] text-[12px] font-bold whitespace-nowrap ${getStatusStyle(
                      heroPackage.status
                    )}`}
                  >
                    {heroPackage.status}
                  </span>

                  <span
                    className={`inline-flex items-center justify-center min-w-[96px] px-3 py-1 rounded-[6px] text-[12px] font-bold whitespace-nowrap ${getPromoStyle(
                      heroPackage.promo
                    )}`}
                  >
                    {heroPackage.promo}
                  </span>
                </div>

                <p className="text-[#8E929D] text-[14px] leading-7 mb-7 max-w-[440px]">
                  {heroPackage.deskripsi}
                </p>

                <div className="grid grid-cols-2 mb-6">
                  <div>
                    <p className="text-[#B4B6BF] text-xs font-semibold mb-1">
                      Harga:
                    </p>
                    <p className="text-[#6DA5EF] text-[24px] font-bold">
                      {heroPackage.harga}
                    </p>
                    <p className="text-[#9BA0AA] text-sm">per orang</p>
                  </div>

                  <div>
                    <p className="text-[#B4B6BF] text-xs font-semibold mb-2">
                      Durasi:
                    </p>
                    <p className="text-[#596070] text-[15px] font-bold">
                      {heroPackage.durasi}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openModal("detail", heroPackage)}
                  className="w-full h-[48px] rounded-[7px] bg-[#70A9F8] hover:bg-[#5D9AF2] text-white font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                >
                  Lihat Detail
                </button>
              </div>

              <div className="bg-[#F7F7F8] rounded-[14px] p-5 space-y-5 lg:col-span-2 2xl:col-span-1">
                {fasilitasUtama.map((item) => (
                  <div key={item.judul} className="flex gap-3 group">
                    <span className="w-6 h-6 rounded-full bg-white text-[#70A9F8] flex items-center justify-center mt-1 group-hover:bg-[#70A9F8] group-hover:text-white transition shrink-0">
                      {iconMap[item.icon]}
                    </span>

                    <div>
                      <p className="text-[14px] font-bold text-[#5B606B]">
                        {item.judul}
                      </p>
                      <p className="text-[12px] leading-5 text-[#9B9FA8]">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[14px] p-8 text-center mb-8">
              <h3 className="font-bold text-[18px]">Paket tidak ditemukan</h3>
              <p className="text-[#9AA0AA] text-sm mt-1">
                Coba ubah pencarian atau filter status.
              </p>
            </div>
          )}

          {/* FEATURED */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[17px] font-bold">Paket Unggulan</h3>
            <button
              type="button"
              onClick={() => setStatusFilter("Semua Status")}
              className="text-[#272B36] hover:text-[#70A9F8] transition"
            >
              <FaEllipsisH />
            </button>
          </div>

          <div className="space-y-4">
            {shownFeaturedPackages.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[14px] grid grid-cols-1 lg:grid-cols-[230px_1fr] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => openModal("detail", item)}
                  className="relative h-[230px] overflow-hidden block text-left"
                >
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />

                  <div className="absolute top-3 right-3 bg-[#FFF4B8] rounded-full px-3 py-1 flex items-center gap-1 text-sm font-bold text-[#77715D]">
                    <FaStar className="text-[#FFD65A]" />
                    {item.rating}
                  </div>
                </button>

                <div className="p-5 min-w-0">
                  <div className="flex justify-between gap-4 mb-4">
                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => openModal("detail", item)}
                        className="text-left"
                      >
                        <h3 className="text-[21px] font-bold mb-2 hover:text-[#70A9F8] transition line-clamp-1">
                          {item.nama}
                        </h3>
                      </button>

                      <div className="flex flex-wrap items-center gap-5 text-[#9CA1AA] text-[13px] font-semibold">
                        <span>{item.durasi}</span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {item.lokasi}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex items-start gap-3">
                      <div>
                        <p className="text-[#6DA5EF] font-bold text-[18px]">
                          {item.harga}
                        </p>
                        <p className="text-[#9DA1AA] text-xs">per orang</p>
                      </div>

                      <PackageActionButton paket={item} />
                    </div>
                  </div>

                  <div className="border-t border-[#EEF0F4] pt-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div>
                        <p className="text-[#C4C6CC] text-xs font-bold mb-1">
                          Akomodasi
                        </p>
                        <p className="text-[13px] leading-5 text-[#555B66]">
                          {item.akomodasi}
                        </p>
                      </div>

                      <div>
                        <p className="text-[#C4C6CC] text-xs font-bold mb-1">
                          Makan
                        </p>
                        <p className="text-[13px] leading-5 text-[#555B66]">
                          {item.makan}
                        </p>
                      </div>

                      <div>
                        <p className="text-[#C4C6CC] text-xs font-bold mb-1">
                          Tambahan
                        </p>
                        <p className="text-[13px] leading-5 text-[#555B66]">
                          {item.ekstra}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[#C4C6CC] text-xs font-bold mb-2">
                        Aktivitas
                      </p>
                      <ul className="space-y-1 text-[13px] leading-5 text-[#555B66]">
                        {(item.aktivitas || []).slice(0, 4).map((aktivitas) => (
                          <li key={aktivitas} className="flex gap-2">
                            <FaCheckCircle className="text-[#70A9F8] mt-1 shrink-0" />
                            <span>{aktivitas}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => openModal("info", item)}
                      className="h-[38px] px-4 rounded-[9px] bg-[#EAF4FF] text-[#70A9F8] text-[13px] font-bold flex items-center gap-2 hover:bg-[#70A9F8] hover:text-white hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    >
                      <FaInfoCircle className="text-[13px]" />
                      Info Paket
                    </button>

                    <button
                      type="button"
                      onClick={() => openModal("detail", item)}
                      className="h-[38px] px-4 rounded-[9px] bg-[#70A9F8] text-white text-[13px] font-bold flex items-center justify-center hover:bg-[#5D9AF2] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KANAN */}
        <aside className="min-w-0">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[17px] font-bold">Paket Populer</h3>
            <button
              type="button"
              onClick={() => setStatusFilter("Semua Status")}
              className="text-[#272B36] hover:text-[#70A9F8] transition"
            >
              <FaEllipsisH />
            </button>
          </div>

          <div className="space-y-4 mb-7">
            {shownPopularPackages.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[12px] p-3 flex items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => openModal("detail", item)}
                  className="flex items-center gap-4 min-w-0 text-left flex-1"
                >
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-[78px] h-[78px] rounded-[8px] object-cover shrink-0"
                  />

                  <div className="min-w-0">
                    <h4 className="font-bold text-[15px] mb-1 line-clamp-1">
                      {item.nama}
                    </h4>

                    <p className="text-[#9AA0A8] text-[12px] flex items-center gap-1 mb-2 line-clamp-1">
                      <FaMapMarkerAlt />
                      {item.lokasi}
                    </p>

                    {renderStars(item.rating)}
                  </div>
                </button>

                <PackageActionButton paket={item} />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[14px] p-4 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[17px] font-bold">Rekomendasi Paket</h3>
              <button
                type="button"
                onClick={() => setStatusFilter("Semua Status")}
                className="text-[#272B36] hover:text-[#70A9F8] transition"
              >
                <FaEllipsisH />
              </button>
            </div>

            <div className="space-y-4">
              {shownRecommendedPackages.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#E8EBF0] rounded-[14px] bg-white p-3 flex gap-3 hover:shadow-xl hover:-translate-y-1 hover:border-[#70A9F8] transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => openModal("detail", item)}
                    className="flex gap-3 text-left flex-1 min-w-0"
                  >
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="w-[88px] h-[88px] rounded-[10px] object-cover shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-[14px] leading-5 mb-1 text-[#202436] hover:text-[#70A9F8] transition line-clamp-2">
                        {item.nama}
                      </h4>

                      <p className="text-[#9AA0A8] text-[12px] flex items-start gap-1 mb-2 leading-4">
                        <FaMapMarkerAlt className="mt-[2px] shrink-0" />
                        <span className="leading-4 line-clamp-1">
                          {item.lokasi}
                        </span>
                      </p>

                      <p className="text-[#6DA5EF] text-[15px] font-bold leading-5 break-words">
                        {item.harga}
                        <span className="text-[#9AA0A8] text-[11px] font-medium ml-1">
                          /orang
                        </span>
                      </p>
                    </div>
                  </button>

                  <PackageActionButton paket={item} />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ACTION OVERLAY */}
      {actionMenu.id && (
        <button
          type="button"
          onClick={closeActionMenu}
          className="fixed inset-0 z-[99998] cursor-default bg-transparent"
        />
      )}

      {actionMenu.id && selectedActionPackage && (
        <div
          className="fixed w-[250px] bg-white rounded-[14px] shadow-2xl border border-[#E8EDF3] p-2 z-[99999]"
          style={{
            top: `${actionMenu.y}px`,
            left: `${actionMenu.x}px`,
          }}
        >
          <button
            type="button"
            onClick={() => openModal("detail", selectedActionPackage)}
            className="w-full text-left px-4 py-3 rounded-[10px] text-sm font-semibold text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] flex items-center gap-3 transition"
          >
            <FaEye className="text-sm shrink-0" />
            <span className="whitespace-nowrap">Lihat Detail</span>
          </button>

          <button
            type="button"
            onClick={() => openEditForm(selectedActionPackage)}
            className="w-full text-left px-4 py-3 rounded-[10px] text-sm font-semibold text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] flex items-center gap-3 transition"
          >
            <FaEdit className="text-sm shrink-0" />
            <span className="whitespace-nowrap">Edit Paket</span>
          </button>

          <button
            type="button"
            onClick={() => openPromoForm(selectedActionPackage)}
            className="w-full text-left px-4 py-3 rounded-[10px] text-sm font-semibold text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] flex items-center gap-3 transition"
          >
            <FaTag className="text-sm shrink-0" />
            <span className="whitespace-nowrap">Tambah Promo</span>
          </button>

          <button
            type="button"
            onClick={() =>
              updatePackageFlag(
                selectedActionPackage,
                "isPopular",
                "Populer"
              )
            }
            className="w-full text-left px-4 py-3 rounded-[10px] text-sm font-semibold text-[#596070] hover:bg-[#FFF4D8] hover:text-[#B88700] flex items-center gap-3 transition"
          >
            <FaStar className="text-sm shrink-0" />
            <span className="whitespace-nowrap">
              {selectedActionPackage.isPopular
                ? "Hapus dari Populer"
                : "Jadikan Populer"}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              updatePackageFlag(
                selectedActionPackage,
                "isRecommended",
                "Rekomendasi"
              )
            }
            className="w-full text-left px-4 py-3 rounded-[10px] text-sm font-semibold text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8] flex items-center gap-3 transition"
          >
            <FaCrown className="text-sm shrink-0" />
            <span className="whitespace-nowrap">
              {selectedActionPackage.isRecommended
                ? "Hapus Rekomendasi"
                : "Jadikan Rekomendasi"}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              updatePackageFlag(
                selectedActionPackage,
                "isFeatured",
                "Unggulan"
              )
            }
            className="w-full text-left px-4 py-3 rounded-[10px] text-sm font-semibold text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8] flex items-center gap-3 transition"
          >
            <FaUmbrellaBeach className="text-sm shrink-0" />
            <span className="whitespace-nowrap">
              {selectedActionPackage.isFeatured
                ? "Hapus Unggulan"
                : "Jadikan Unggulan"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => toggleStatus(selectedActionPackage)}
            className="w-full text-left px-4 py-3 rounded-[10px] text-sm font-semibold text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8] flex items-center gap-3 transition"
          >
            {selectedActionPackage.status === "Aktif" ? (
              <FaPowerOff className="text-sm shrink-0" />
            ) : (
              <FaUserCheck className="text-sm shrink-0" />
            )}

            <span className="whitespace-nowrap">
              {selectedActionPackage.status === "Aktif"
                ? "Nonaktifkan Paket"
                : "Aktifkan Paket"}
            </span>
          </button>

          <div className="h-[1px] bg-[#EEF1F5] my-2"></div>

          <button
            type="button"
            onClick={() => handleDeletePackage(selectedActionPackage)}
            className="w-full text-left px-4 py-3 rounded-[10px] text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center gap-3 transition"
          >
            <FaTrash className="text-sm shrink-0" />
            <span className="whitespace-nowrap">Hapus Paket</span>
          </button>
        </div>
      )}

      {/* MODAL DETAIL / INFO */}
      {(modalType === "detail" || modalType === "info") && selectedPackage && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 md:px-6">
          <div className="w-full max-w-[940px] bg-white rounded-[18px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[22px] font-bold text-[#202436]">
                  {modalType === "info" ? "Info Paket" : "Detail Paket"}
                </h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Kelola detail paket travel, promo, booking, dan customer.
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

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 mb-5">
              <img
                src={selectedPackage.gambar}
                alt={selectedPackage.nama}
                className="w-full h-[250px] object-cover rounded-[14px]"
              />

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center justify-center min-w-[70px] px-3 py-1 rounded-[6px] text-[12px] font-bold whitespace-nowrap ${getStatusStyle(
                      selectedPackage.status
                    )}`}
                  >
                    {selectedPackage.status}
                  </span>

                  <span
                    className={`inline-flex items-center justify-center min-w-[96px] px-3 py-1 rounded-[6px] text-[12px] font-bold whitespace-nowrap ${getPromoStyle(
                      selectedPackage.promo
                    )}`}
                  >
                    {selectedPackage.promo}
                  </span>

                  {selectedPackage.isPopular && (
                    <span className="inline-flex items-center px-3 py-1 rounded-[6px] text-[12px] font-bold bg-[#FFF4D8] text-[#B88700]">
                      Populer
                    </span>
                  )}

                  {selectedPackage.isRecommended && (
                    <span className="inline-flex items-center px-3 py-1 rounded-[6px] text-[12px] font-bold bg-[#EAF4FF] text-[#5A91D6]">
                      Rekomendasi
                    </span>
                  )}
                </div>

                <h3 className="text-[25px] font-bold leading-tight mb-2">
                  {selectedPackage.nama}
                </h3>

                <p className="text-[13px] text-[#9AA0AA] flex items-center gap-2 mb-4">
                  <FaMapMarkerAlt className="text-[#70A9F8]" />
                  {selectedPackage.lokasi}
                </p>

                <p className="text-[14px] leading-7 text-[#596070] mb-5">
                  {selectedPackage.deskripsi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                    <p className="text-[12px] text-[#9AA0AA] font-semibold">
                      Harga
                    </p>
                    <p className="font-bold text-[#70A9F8]">
                      {selectedPackage.harga}
                    </p>
                  </div>

                  <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                    <p className="text-[12px] text-[#9AA0AA] font-semibold">
                      Durasi
                    </p>
                    <p className="font-bold">{selectedPackage.durasi}</p>
                  </div>

                  <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                    <p className="text-[12px] text-[#9AA0AA] font-semibold">
                      Rating
                    </p>
                    <p className="font-bold">{selectedPackage.rating}</p>
                  </div>

                  <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                    <p className="text-[12px] text-[#9AA0AA] font-semibold">
                      Diskon
                    </p>
                    <p className="font-bold">{selectedPackage.diskon}</p>
                  </div>
                </div>
              </div>
            </div>

            {modalType === "detail" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
                  <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                    <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                      Jumlah Booking
                    </p>
                    <p className="text-[18px] font-bold">
                      {getBookingByPackage(selectedPackage.nama).length}
                    </p>
                  </div>

                  <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                    <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                      Total Revenue
                    </p>
                    <p className="text-[18px] font-bold">
                      {formatRupiah(getPackageRevenue(selectedPackage.nama))}
                    </p>
                  </div>

                  <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                    <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                      Customer
                    </p>
                    <p className="text-[18px] font-bold">
                      {getTravelersByPackage(selectedPackage.nama).length}
                    </p>
                  </div>

                  <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                    <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                      Kategori
                    </p>
                    <p className="text-[18px] font-bold">
                      {selectedPackage.kategori}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                    <h4 className="font-bold text-[15px] mb-3">Fasilitas</h4>

                    <div className="space-y-3 text-[13px] text-[#596070]">
                      <p>
                        <b>Akomodasi:</b> {selectedPackage.akomodasi}
                      </p>
                      <p>
                        <b>Makan:</b> {selectedPackage.makan}
                      </p>
                      <p>
                        <b>Tambahan:</b> {selectedPackage.ekstra}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                    <h4 className="font-bold text-[15px] mb-3">Aktivitas</h4>

                    <ul className="space-y-2 text-[13px] text-[#596070]">
                      {(selectedPackage.aktivitas || []).map((item) => (
                        <li key={item} className="flex gap-2">
                          <FaCheckCircle className="text-[#70A9F8] mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-[14px] border border-[#EEF1F5] overflow-x-auto mb-5">
                  <div className="px-4 py-3 bg-[#EAF4FF] flex items-center gap-2">
                    <FaHistory className="text-[#70A9F8]" />
                    <h4 className="font-bold text-[15px]">Booking Paket</h4>
                  </div>

                  <table className="w-full min-w-[720px]">
                    <thead>
                      <tr className="text-left text-[12px] text-[#9AA0AA] border-b border-[#EEF1F5]">
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Tanggal</th>
                        <th className="px-4 py-3">Durasi</th>
                        <th className="px-4 py-3">Harga</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {getBookingByPackage(selectedPackage.nama).length > 0 ? (
                        getBookingByPackage(selectedPackage.nama).map((booking) => (
                          <tr
                            key={booking.kode || `${booking.nama}-${booking.tanggal}`}
                            className="border-b border-[#EEF1F5] hover:bg-[#F8FBFF]"
                          >
                            <td className="px-4 py-3 text-[13px] font-bold">
                              {booking.nama}
                            </td>
                            <td className="px-4 py-3 text-[13px] text-[#596070]">
                              {booking.tanggal}
                            </td>
                            <td className="px-4 py-3 text-[13px] text-[#596070]">
                              {booking.durasi}
                            </td>
                            <td className="px-4 py-3 text-[13px] font-bold text-[#596070]">
                              {booking.harga}
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-3 py-1 rounded-[6px] bg-[#EAF4FF] text-[#5A91D6] text-[12px] font-bold">
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
                            Belum ada booking untuk paket ini.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => openEditForm(selectedPackage)}
                    className="h-[42px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition flex items-center gap-2"
                  >
                    <FaEdit className="text-xs" />
                    Edit Paket
                  </button>

                  <button
                    type="button"
                    onClick={() => openPromoForm(selectedPackage)}
                    className="h-[42px] px-5 rounded-[10px] bg-[#EAF4FF] text-[#70A9F8] text-sm font-bold hover:bg-[#70A9F8] hover:text-white transition flex items-center gap-2"
                  >
                    <FaTag className="text-xs" />
                    Tambah Promo
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleStatus(selectedPackage)}
                    className="h-[42px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition"
                  >
                    {selectedPackage.status === "Aktif"
                      ? "Nonaktifkan"
                      : "Aktifkan"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL FORM */}
      {modalType === "form" && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 md:px-6">
          <div className="w-full max-w-[850px] bg-white rounded-[18px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[22px] font-bold">
                  {selectedPackage ? "Edit Paket" : "Tambah Paket"}
                </h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Isi data paket TravelGo dengan lengkap.
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

            <form
              onSubmit={handleSubmitPackage}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleFormChange}
                placeholder="Nama paket"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleFormChange}
                placeholder="Lokasi"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="harga"
                value={formData.harga}
                onChange={handleFormChange}
                placeholder="Harga, contoh Rp 4.500.000"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="durasi"
                value={formData.durasi}
                onChange={handleFormChange}
                placeholder="Durasi, contoh 5 Hari / 4 Malam"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="gambar"
                value={formData.gambar}
                onChange={handleFormChange}
                placeholder="URL gambar paket"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="rating"
                value={formData.rating}
                onChange={handleFormChange}
                placeholder="Rating, contoh 4.8/5"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleFormChange}
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              >
                <option value="Baru">Baru</option>
                <option value="Unggulan">Unggulan</option>
                <option value="Populer">Populer</option>
                <option value="Rekomendasi">Rekomendasi</option>
                <option value="Umum">Umum</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>

              <select
                name="promo"
                value={formData.promo}
                onChange={handleFormChange}
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              >
                <option value="Aktif">Promo Aktif</option>
                <option value="Tidak Aktif">Promo Tidak Aktif</option>
              </select>

              <input
                type="text"
                name="diskon"
                value={formData.diskon}
                onChange={handleFormChange}
                placeholder="Diskon, contoh 20%"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleFormChange}
                placeholder="Deskripsi paket"
                className="md:col-span-2 min-h-[90px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
              />

              <textarea
                name="akomodasi"
                value={formData.akomodasi}
                onChange={handleFormChange}
                placeholder="Akomodasi"
                className="min-h-[80px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
              />

              <textarea
                name="makan"
                value={formData.makan}
                onChange={handleFormChange}
                placeholder="Makan"
                className="min-h-[80px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
              />

              <textarea
                name="ekstra"
                value={formData.ekstra}
                onChange={handleFormChange}
                placeholder="Tambahan"
                className="min-h-[80px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
              />

              <textarea
                name="aktivitasText"
                value={formData.aktivitasText}
                onChange={handleFormChange}
                placeholder="Aktivitas, tulis per baris"
                className="min-h-[80px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
              />

              <div className="md:col-span-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-[44px] px-5 bg-[#F4F5F7] text-[#596070] rounded-[12px] text-sm font-bold hover:bg-[#EAF4FF]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="h-[44px] px-5 bg-[#70A9F8] text-white rounded-[12px] text-sm font-bold hover:bg-[#5D9AF2]"
                >
                  {selectedPackage ? "Update Paket" : "Simpan Paket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PROMO */}
      {modalType === "promo" && selectedPackage && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 md:px-6">
          <div className="w-full max-w-[620px] bg-white rounded-[18px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[22px] font-bold">Tambah Promo Paket</h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  {selectedPackage.nama}
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
                name="namaPromo"
                value={promoForm.namaPromo}
                onChange={handlePromoChange}
                placeholder="Nama promo"
                className="md:col-span-2 h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="diskon"
                value={promoForm.diskon}
                onChange={handlePromoChange}
                placeholder="Diskon"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <select
                name="status"
                value={promoForm.status}
                onChange={handlePromoChange}
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              >
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>

              <input
                type="text"
                name="periode"
                value={promoForm.periode}
                onChange={handlePromoChange}
                placeholder="Periode promo"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <select
                name="target"
                value={promoForm.target}
                onChange={handlePromoChange}
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              >
                <option value="Semua Customer">Semua Customer</option>
                <option value="Member">Khusus Member</option>
                <option value="Customer Baru">Customer Baru</option>
              </select>

              <div className="md:col-span-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-[44px] px-5 bg-[#F4F5F7] text-[#596070] rounded-[12px] text-sm font-bold hover:bg-[#EAF4FF]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="h-[44px] px-5 bg-[#70A9F8] text-white rounded-[12px] text-sm font-bold hover:bg-[#5D9AF2]"
                >
                  Simpan Promo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
