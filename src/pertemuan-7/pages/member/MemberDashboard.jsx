import { useEffect, useMemo, useState } from "react";
import {
  FaUserCircle,
  FaCrown,
  FaCalendarCheck,
  FaWallet,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaEdit,
  FaTimes,
  FaEye,
  FaPaperPlane,
  FaGift,
  FaStar,
  FaRegStar,
  FaCreditCard,
  FaHeadset,
  FaCommentDots,
  FaCheckCircle,
  FaSearch,
  FaChevronDown,
  FaPlaneDeparture,
  FaUmbrellaBeach,
  FaClock,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

const STORAGE = {
  profile: "travelgo_member_profile",
  bookings: "travelgo_member_bookings",
  feedbacks: "travelgo_member_feedbacks",
  chat: "travelgo_member_cs_chat",
};

function ambilDataStorage(key, dataAwal) {
  const dataTersimpan = localStorage.getItem(key);

  if (!dataTersimpan) return dataAwal;

  try {
    return JSON.parse(dataTersimpan);
  } catch (error) {
    localStorage.removeItem(key);
    return dataAwal;
  }
}

function simpanDataStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export default function MemberDashboard() {
  const defaultMember = {
    id: 1,
    nama: "Bianca Bahi",
    email: "bianca@gmail.com",
    hp: "081234567890",
    alamat: "Pekanbaru, Riau",
    statusMember: "Member",
    level: "Gold",
    sumberUser: "Website",
    metodePembayaran: "QRIS",
    totalTransaksi: 8750000,
    totalBooking: 3,
    poin: 860,
    tanggalBergabung: "18 Juni 2026",
  };

  const defaultBookings = [
    {
      id: 1,
      kode: "BKG-TRG-001",
      paket: "Paket Bali Beach Escape",
      lokasi: "Bali, Indonesia",
      tanggal: "12 Juni - 16 Juni 2026",
      durasi: "5 Hari / 4 Malam",
      harga: 4500000,
      jumlahTraveler: 2,
      metodePembayaran: "QRIS",
      statusBooking: "Dikonfirmasi",
      statusPembayaran: "Lunas",
      catatan:
        "Booking sudah dikonfirmasi. E-ticket dan detail itinerary akan dikirim melalui customer service.",
    },
    {
      id: 2,
      kode: "BKG-TRG-002",
      paket: "Paket Bromo Sunrise Trip",
      lokasi: "Malang, Jawa Timur",
      tanggal: "20 Juli - 22 Juli 2026",
      durasi: "3 Hari / 2 Malam",
      harga: 2250000,
      jumlahTraveler: 1,
      metodePembayaran: "Transfer Bank",
      statusBooking: "Menunggu",
      statusPembayaran: "Menunggu Verifikasi",
      catatan:
        "Pembayaran sedang menunggu verifikasi admin. Customer service akan menghubungi jika ada data yang kurang.",
    },
    {
      id: 3,
      kode: "BKG-TRG-003",
      paket: "Paket Lombok Eksotis",
      lokasi: "Lombok, Indonesia",
      tanggal: "8 Mei - 12 Mei 2026",
      durasi: "5 Hari / 4 Malam",
      harga: 2000000,
      jumlahTraveler: 1,
      metodePembayaran: "E-Wallet",
      statusBooking: "Selesai",
      statusPembayaran: "Lunas",
      catatan:
        "Perjalanan sudah selesai. Terima kasih sudah menggunakan TravelGo.",
    },
  ];

  const recommendedPackages = [
    {
      id: 1,
      nama: "Paket Labuan Bajo Premium",
      lokasi: "Labuan Bajo",
      harga: 6200000,
      durasi: "4 Hari / 3 Malam",
      rating: 4.9,
      kategori: "Rekomendasi Gold",
      gambar:
        "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=900&q=80",
      deskripsi:
        "Paket premium untuk menikmati Pulau Padar, Pink Beach, snorkeling, dan sailing trip dengan fasilitas nyaman.",
      fasilitas: [
        "Hotel nyaman dekat pelabuhan",
        "Sailing trip dan dokumentasi",
        "Transport lokal",
        "Customer service selama perjalanan",
      ],
    },
    {
      id: 2,
      nama: "Paket Jogja Heritage",
      lokasi: "Yogyakarta",
      harga: 2800000,
      durasi: "3 Hari / 2 Malam",
      rating: 4.7,
      kategori: "Best Seller",
      gambar:
        "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=900&q=80",
      deskripsi:
        "Paket city tour budaya, kuliner, dan wisata populer di Yogyakarta dengan jadwal santai.",
      fasilitas: [
        "Hotel area kota",
        "Transport wisata",
        "Guide lokal",
        "Kunjungan destinasi heritage",
      ],
    },
    {
      id: 3,
      nama: "Paket Bandung Family Trip",
      lokasi: "Bandung",
      harga: 2400000,
      durasi: "3 Hari / 2 Malam",
      rating: 4.8,
      kategori: "Family Choice",
      gambar:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      deskripsi:
        "Paket keluarga untuk menikmati wisata alam, kuliner, dan tempat rekreasi populer di Bandung.",
      fasilitas: [
        "Transport private",
        "Hotel keluarga",
        "Destinasi ramah keluarga",
        "Itinerary fleksibel",
      ],
    },
  ];

  const defaultPromos = [
    {
      id: 1,
      nama: "Gold Member Holiday Deal",
      diskon: "20%",
      status: "Aktif",
      berlaku: "Sampai 31 Juli 2026",
      target: "Khusus Member Gold",
      kode: "GOLDTRIP20",
      deskripsi:
        "Promo khusus member Gold untuk pemesanan paket rekomendasi TravelGo.",
    },
    {
      id: 2,
      nama: "Weekend Escape",
      diskon: "10%",
      status: "Aktif",
      berlaku: "Sampai 15 Agustus 2026",
      target: "Semua Member",
      kode: "WEEKEND10",
      deskripsi:
        "Promo perjalanan singkat untuk liburan akhir pekan bersama TravelGo.",
    },
  ];

  const [member, setMember] = useState(() =>
    ambilDataStorage(STORAGE.profile, defaultMember)
  );

  const [bookings, setBookings] = useState(() =>
    ambilDataStorage(STORAGE.bookings, defaultBookings)
  );

  const [feedbacks, setFeedbacks] = useState(() =>
    ambilDataStorage(STORAGE.feedbacks, [])
  );

  const [searchBooking, setSearchBooking] = useState("");
  const [bookingFilter, setBookingFilter] = useState("Semua Booking");
  const [isBookingFilterOpen, setIsBookingFilterOpen] = useState(false);

  const [modalType, setModalType] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [notification, setNotification] = useState("");

  const [profileForm, setProfileForm] = useState(member);
  const [feedbackForm, setFeedbackForm] = useState({
    jenis: "Feedback",
    paket: defaultBookings[0]?.paket || "",
    pesan: "",
  });

  const pesanAwalCS = [
    {
      from: "cs",
      text: "Halo Bianca, selamat datang di Customer Service TravelGo. Ada yang bisa kami bantu?",
      time: "Baru saja",
    },
  ];

  const [chatText, setChatText] = useState("");
  const [chatList, setChatList] = useState(() =>
    ambilDataStorage(STORAGE.chat, pesanAwalCS)
  );

  useEffect(() => {
    simpanDataStorage(STORAGE.profile, member);
  }, [member]);

  useEffect(() => {
    simpanDataStorage(STORAGE.bookings, bookings);
  }, [bookings]);

  useEffect(() => {
    simpanDataStorage(STORAGE.feedbacks, feedbacks);
  }, [feedbacks]);

  useEffect(() => {
    simpanDataStorage(STORAGE.chat, chatList);
  }, [chatList]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2600);
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value || 0));
  };

  const getStatusStyle = (status) => {
    if (status === "Dikonfirmasi" || status === "Selesai") {
      return "bg-[#EAF4FF] text-[#5A91D6]";
    }

    if (status === "Menunggu") return "bg-[#FFF4D8] text-[#B88700]";

    return "bg-red-50 text-red-500";
  };

  const getPaymentStyle = (status) => {
    if (status === "Lunas") return "bg-[#E9FBEF] text-[#31A05F]";
    if (status === "Refund") return "bg-red-50 text-red-500";
    return "bg-[#FFF4D8] text-[#B88700]";
  };

  const getLevelStyle = (level) => {
    if (level === "Platinum") return "bg-[#D7ECFF] text-[#4B91E8]";
    if (level === "Gold") return "bg-[#C9A94B] text-white";
    if (level === "Silver") return "bg-[#E1E1E1] text-[#555B66]";
    return "bg-[#EAF4FF] text-[#70A9F8]";
  };

  const filteredBookings = useMemo(() => {
    let data = bookings;

    if (bookingFilter !== "Semua Booking") {
      data = data.filter((item) => item.statusBooking === bookingFilter);
    }

    if (searchBooking.trim() !== "") {
      const keyword = searchBooking.toLowerCase();

      data = data.filter((item) => {
        return (
          item.kode?.toLowerCase().includes(keyword) ||
          item.paket?.toLowerCase().includes(keyword) ||
          item.lokasi?.toLowerCase().includes(keyword) ||
          item.tanggal?.toLowerCase().includes(keyword) ||
          item.statusBooking?.toLowerCase().includes(keyword) ||
          item.statusPembayaran?.toLowerCase().includes(keyword)
        );
      });
    }

    return data;
  }, [bookings, bookingFilter, searchBooking]);

  const nextTrip = bookings.find((item) => item.statusBooking === "Dikonfirmasi");
  const totalPaidBooking = bookings.filter(
    (item) => item.statusPembayaran === "Lunas"
  ).length;

  const openModal = (type, data = null) => {
    setModalType(type);
    setSelectedData(data);

    if (type === "profile") {
      setProfileForm(member);
    }
  };

  const closeModal = () => {
    setModalType("");
    setSelectedData(null);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();

    if (!profileForm.nama || !profileForm.email || !profileForm.hp) {
      alert("Nama, email, dan nomor HP wajib diisi");
      return;
    }

    setMember(profileForm);
    closeModal();
    showNotification("Profil member berhasil diperbarui");
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;

    setFeedbackForm({
      ...feedbackForm,
      [name]: value,
    });
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    if (!feedbackForm.pesan.trim()) {
      alert("Isi pesan feedback atau komplain dulu");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      ...feedbackForm,
      status: "Terkirim",
      tanggal: new Date().toISOString().split("T")[0],
    };

    setFeedbacks((prev) => [newFeedback, ...prev]);

    setFeedbackForm({
      jenis: "Feedback",
      paket: bookings[0]?.paket || "",
      pesan: "",
    });

    showNotification(`${newFeedback.jenis} berhasil dikirim ke TravelGo`);
  };

  const handleUsePromo = (promo) => {
    openModal("promo", promo);
  };

  const handleConfirmPromo = () => {
    closeModal();
    showNotification("Promo berhasil dipilih. Kode promo tersimpan untuk booking berikutnya.");
  };

  const handleChatCS = () => {
    openModal("cs");
  };

  const handleSendChat = (e) => {
    e.preventDefault();

    if (!chatText.trim()) {
      return;
    }

    const pesanMember = {
      from: "member",
      text: chatText,
      time: "Baru saja",
    };

    const balasanCS = {
      from: "cs",
      text: "Terima kasih, pesan kamu sudah diterima. Customer Service TravelGo akan membantu dari halaman member ini.",
      time: "Baru saja",
    };

    setChatList([...chatList, pesanMember, balasanCS]);
    setChatText("");
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(Number(rating || 0));

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= fullStars ? (
            <FaStar key={star} className="text-[#FFD85C] text-sm" />
          ) : (
            <FaRegStar key={star} className="text-[#D8DDE5] text-sm" />
          )
        )}
        <span className="text-[#9AA0AA] text-xs ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#202436] font-[Plus_Jakarta_Sans] overflow-x-hidden">
      {notification && (
        <div className="fixed top-5 right-5 z-[99999] bg-[#202436] text-white px-5 py-3 rounded-[12px] shadow-xl text-sm font-semibold">
          {notification}
        </div>
      )}

      {/* TOP NAV MEMBER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#EEF1F5]">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-8 h-[76px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-[44px] h-[44px] rounded-[14px] bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center">
              <FaPlaneDeparture />
            </div>

            <div>
              <h1 className="text-[22px] font-bold leading-none">TravelGo.</h1>
              <p className="text-[11px] text-[#9AA0AA] font-semibold mt-1">
                Member Dashboard
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={handleChatCS}
              className="h-[40px] px-4 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition flex items-center gap-2"
            >
              <FaHeadset className="text-xs" />
              Customer Service
            </button>

            <button
              type="button"
              onClick={() => openModal("profile")}
              className="h-[42px] px-4 rounded-[12px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] hover:shadow-lg transition flex items-center gap-2"
            >
              <FaUserCircle />
              {member.nama}
            </button>
          </div>

          <button
            type="button"
            onClick={() => openModal("profile")}
            className="md:hidden w-[42px] h-[42px] rounded-[12px] bg-[#70A9F8] text-white flex items-center justify-center"
          >
            <FaUserCircle />
          </button>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-8 py-6 xl:py-8">
        {/* WELCOME */}
        <section className="relative overflow-hidden bg-[#70A9F8] rounded-[18px] p-5 md:p-7 mb-6 text-white shadow-sm">
          <div className="absolute right-[-90px] top-[-120px] w-[280px] h-[280px] rounded-full bg-white/20"></div>
          <div className="absolute right-[120px] bottom-[-140px] w-[260px] h-[260px] rounded-full bg-white/10"></div>

          <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-center">
            <div>
              <p className="inline-flex items-center gap-2 bg-white/20 border border-white/25 rounded-full px-4 py-2 text-[12px] font-bold mb-4">
                <FaShieldAlt />
                TravelGo Member Area
              </p>

              <h2 className="text-[28px] md:text-[36px] font-bold leading-tight mb-3">
                Halo, {member.nama}
              </h2>

              <p className="text-white/85 text-[14px] md:text-[15px] leading-7 max-w-[720px]">
                Cek status booking, promo member, rekomendasi paket, dan kirim
                feedback ke customer service TravelGo dari satu halaman.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => openModal("booking", nextTrip || bookings[0])}
                  className="h-[42px] px-5 rounded-[11px] bg-white text-[#70A9F8] text-sm font-bold hover:shadow-lg hover:-translate-y-1 transition flex items-center gap-2"
                >
                  <FaCalendarCheck className="text-xs" />
                  Cek Booking
                </button>

                <button
                  type="button"
                  onClick={handleChatCS}
                  className="h-[42px] px-5 rounded-[11px] bg-white/15 border border-white/25 text-white text-sm font-bold hover:bg-white/25 transition flex items-center gap-2"
                >
                  <FaHeadset className="text-xs" />
                  Chat CS
                </button>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-[16px] p-5">
              <p className="text-white/75 text-[13px] font-semibold mb-2">
                Trip Berikutnya
              </p>

              <h3 className="text-[19px] font-bold mb-2">
                {nextTrip?.paket || "Belum ada trip aktif"}
              </h3>

              <p className="text-white/80 text-[13px] flex items-center gap-2 mb-2">
                <FaMapMarkerAlt />
                {nextTrip?.lokasi || "Pilih paket rekomendasi TravelGo"}
              </p>

              <p className="text-white/80 text-[13px] flex items-center gap-2">
                <FaClock />
                {nextTrip?.tanggal || "Belum ada jadwal"}
              </p>
            </div>
          </div>
        </section>

        {/* SUMMARY CARD */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          <button
            type="button"
            onClick={() => openModal("profile")}
            className="bg-white rounded-[16px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center">
                <FaUserCircle />
              </div>
              <span className="text-[12px] font-bold text-[#31A05F] bg-[#E9FBEF] px-3 py-1 rounded-[7px]">
                {member.statusMember}
              </span>
            </div>
            <p className="text-[#9AA0AA] text-[13px] font-semibold">
              Status Member
            </p>
            <h3 className="text-[24px] font-bold mt-1">{member.statusMember}</h3>
          </button>

          <button
            type="button"
            onClick={() => openModal("membership")}
            className="bg-white rounded-[16px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-[#FFF4D8] text-[#B88700] flex items-center justify-center">
                <FaCrown />
              </div>
              <span
                className={`text-[12px] font-bold px-3 py-1 rounded-[7px] ${getLevelStyle(
                  member.level
                )}`}
              >
                {member.level}
              </span>
            </div>
            <p className="text-[#9AA0AA] text-[13px] font-semibold">
              Level Membership
            </p>
            <h3 className="text-[24px] font-bold mt-1">{member.level}</h3>
          </button>

          <button
            type="button"
            onClick={() => document.getElementById("booking-saya")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white rounded-[16px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center">
                <FaCalendarCheck />
              </div>
              <span className="text-[12px] font-bold text-[#70A9F8] bg-[#EAF4FF] px-3 py-1 rounded-[7px]">
                {totalPaidBooking} Lunas
              </span>
            </div>
            <p className="text-[#9AA0AA] text-[13px] font-semibold">
              Total Booking
            </p>
            <h3 className="text-[24px] font-bold mt-1">{bookings.length}</h3>
          </button>

          <button
            type="button"
            onClick={() => openModal("transaction")}
            className="bg-white rounded-[16px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center">
                <FaWallet />
              </div>
              <span className="text-[12px] font-bold text-[#70A9F8] bg-[#EAF4FF] px-3 py-1 rounded-[7px]">
                {member.poin} poin
              </span>
            </div>
            <p className="text-[#9AA0AA] text-[13px] font-semibold">
              Total Transaksi
            </p>
            <h3 className="text-[22px] font-bold mt-1">
              {formatRupiah(member.totalTransaksi)}
            </h3>
          </button>
        </section>

        {/* PROFILE + PROMO */}
        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6 mb-6">
          <div className="bg-white rounded-[16px] p-5 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-[17px] font-bold">Profil Member</h3>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Data akun dan informasi customer TravelGo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => openModal("profile")}
                className="h-[40px] px-4 rounded-[10px] bg-[#EAF4FF] text-[#70A9F8] text-sm font-bold hover:bg-[#70A9F8] hover:text-white transition flex items-center justify-center gap-2"
              >
                <FaEdit className="text-xs" />
                Edit Profil
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-[12px] text-[#9AA0AA] flex items-center gap-2 mb-1">
                  <FaUserCircle /> Nama
                </p>
                <p className="font-bold">{member.nama}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-[12px] text-[#9AA0AA] flex items-center gap-2 mb-1">
                  <FaEnvelope /> Email
                </p>
                <p className="font-bold truncate">{member.email}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-[12px] text-[#9AA0AA] flex items-center gap-2 mb-1">
                  <FaPhoneAlt /> No HP
                </p>
                <p className="font-bold">{member.hp}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4 md:col-span-2">
                <p className="text-[12px] text-[#9AA0AA] flex items-center gap-2 mb-1">
                  <FaMapMarkerAlt /> Alamat
                </p>
                <p className="font-bold">{member.alamat}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-[12px] text-[#9AA0AA] flex items-center gap-2 mb-1">
                  <FaCreditCard /> Pembayaran Favorit
                </p>
                <p className="font-bold">{member.metodePembayaran}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[16px] p-5 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[17px] font-bold">Promo Member</h3>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Promo aktif untuk akunmu.
                </p>
              </div>

              <FaGift className="text-[#70A9F8]" />
            </div>

            <div className="space-y-3">
              {defaultPromos.map((promo) => (
                <div
                  key={promo.id}
                  className="rounded-[14px] border border-[#EEF1F5] p-4 hover:border-[#70A9F8] hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-bold text-[14px]">{promo.nama}</h4>
                      <p className="text-[12px] text-[#9AA0AA] mt-1">
                        {promo.berlaku}
                      </p>
                    </div>

                    <span className="bg-[#EAF4FF] text-[#70A9F8] text-[12px] font-bold px-3 py-1 rounded-[7px]">
                      {promo.diskon}
                    </span>
                  </div>

                  <p className="text-[12px] text-[#596070] leading-5 mb-3">
                    {promo.deskripsi}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleUsePromo(promo)}
                    className="w-full h-[36px] rounded-[9px] bg-[#70A9F8] text-white text-[12px] font-bold hover:bg-[#5D9AF2] transition"
                  >
                    Gunakan Promo
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOOKING */}
        <section
          id="booking-saya"
          className="bg-white rounded-[16px] p-5 shadow-sm hover:shadow-xl transition-all duration-300 mb-6"
        >
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-[17px] font-bold">Riwayat Booking Saya</h3>
              <p className="text-[13px] text-[#9AA0AA] mt-1">
                Cek status perjalanan dan pembayaran booking TravelGo.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="w-full md:w-[320px] h-[44px] bg-white rounded-[12px] flex items-center px-4 gap-3 border border-[#EEF1F5] shadow-sm hover:shadow-md focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
                <FaSearch className="text-[#B9C0CA] text-sm shrink-0" />

                <input
                  type="text"
                  value={searchBooking}
                  onChange={(e) => setSearchBooking(e.target.value)}
                  placeholder="Cari booking..."
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
                  onClick={() => setIsBookingFilterOpen(!isBookingFilterOpen)}
                  className="h-[44px] min-w-[155px] px-4 bg-white rounded-[12px] flex items-center justify-between gap-2 text-[#596070] border border-[#EEF1F5] shadow-sm hover:border-[#70A9F8] transition-all duration-200 text-sm font-bold"
                >
                  {bookingFilter}
                  <FaChevronDown
                    className={`text-xs text-[#9AA0AA] transition-transform duration-200 ${
                      isBookingFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isBookingFilterOpen && (
                  <div className="absolute right-0 top-[50px] w-[180px] bg-white rounded-[12px] shadow-lg border border-[#E8EDF3] p-2 z-30">
                    {[
                      "Semua Booking",
                      "Dikonfirmasi",
                      "Menunggu",
                      "Selesai",
                      "Dibatalkan",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setBookingFilter(item);
                          setIsBookingFilterOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold transition-all duration-200 ${
                          bookingFilter === item
                            ? "bg-[#70A9F8] text-white"
                            : "text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-[12px]">
            <table className="w-full min-w-[830px]">
              <thead className="bg-[#EAF4FF]">
                <tr className="text-left text-[12px] text-[#8F96A3]">
                  <th className="px-4 py-3 font-semibold">Kode</th>
                  <th className="px-4 py-3 font-semibold">Paket</th>
                  <th className="px-4 py-3 font-semibold">Tanggal</th>
                  <th className="px-4 py-3 font-semibold">Harga</th>
                  <th className="px-4 py-3 font-semibold">Booking</th>
                  <th className="px-4 py-3 font-semibold">Pembayaran</th>
                  <th className="px-4 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-[#EEF1F5] hover:bg-[#F8FBFF] transition"
                    >
                      <td className="px-4 py-4 text-[13px] font-bold">
                        {booking.kode}
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-[13px] font-bold text-[#202436]">
                          {booking.paket}
                        </p>
                        <p className="text-[12px] text-[#9AA0AA]">
                          {booking.lokasi}
                        </p>
                      </td>

                      <td className="px-4 py-4 text-[13px] text-[#596070]">
                        {booking.tanggal}
                      </td>

                      <td className="px-4 py-4 text-[13px] font-bold text-[#596070]">
                        {formatRupiah(booking.harga)}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-[6px] text-[12px] font-bold whitespace-nowrap ${getStatusStyle(
                            booking.statusBooking
                          )}`}
                        >
                          {booking.statusBooking}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-[6px] text-[12px] font-bold whitespace-nowrap ${getPaymentStyle(
                            booking.statusPembayaran
                          )}`}
                        >
                          {booking.statusPembayaran}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => openModal("booking", booking)}
                          className="h-[34px] px-3 rounded-[8px] bg-[#EAF4FF] text-[#70A9F8] text-[12px] font-bold hover:bg-[#70A9F8] hover:text-white transition flex items-center gap-2"
                        >
                          <FaEye className="text-xs" />
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-10 text-center text-[#9AA0AA] text-sm"
                    >
                      Booking tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* RECOMMENDATION */}
        <section className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-[17px] font-bold">Paket Rekomendasi</h3>
              <p className="text-[13px] text-[#9AA0AA] mt-1">
                Rekomendasi paket berdasarkan level dan riwayat booking kamu.
              </p>
            </div>

            <button
              type="button"
              onClick={() => showNotification("Rekomendasi paket sudah diperbarui")}
              className="h-[38px] px-4 rounded-[10px] bg-white text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition"
            >
              Refresh Rekomendasi
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {recommendedPackages.map((paket) => (
              <div
                key={paket.id}
                className="bg-white rounded-[16px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => openModal("package", paket)}
                  className="block w-full text-left"
                >
                  <div className="h-[190px] relative overflow-hidden">
                    <img
                      src={paket.gambar}
                      alt={paket.nama}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />

                    <span className="absolute left-4 top-4 bg-white/90 text-[#70A9F8] text-[11px] font-bold px-3 py-1 rounded-[7px]">
                      {paket.kategori}
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="font-bold text-[16px] mb-2">{paket.nama}</h4>

                    <p className="text-[13px] text-[#9AA0AA] flex items-center gap-2 mb-2">
                      <FaMapMarkerAlt />
                      {paket.lokasi}
                    </p>

                    {renderStars(paket.rating)}

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="text-[12px] text-[#9AA0AA]">Harga</p>
                        <p className="text-[16px] font-bold text-[#70A9F8]">
                          {formatRupiah(paket.harga)}
                        </p>
                      </div>

                      <p className="text-[12px] text-[#596070] font-bold bg-[#F4F5F7] px-3 py-2 rounded-[8px]">
                        {paket.durasi}
                      </p>
                    </div>
                  </div>
                </button>

                <div className="px-5 pb-5">
                  <button
                    type="button"
                    onClick={() => openModal("package", paket)}
                    className="w-full h-[40px] rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition flex items-center justify-center gap-2"
                  >
                    Lihat Paket
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEEDBACK + CS */}
        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
          <div className="bg-white rounded-[16px] p-5 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="mb-5">
              <h3 className="text-[17px] font-bold">Feedback / Komplain</h3>
              <p className="text-[13px] text-[#9AA0AA] mt-1">
                Kirim masukan atau komplain terkait layanan TravelGo.
              </p>
            </div>

            <form
              onSubmit={handleSubmitFeedback}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <select
                name="jenis"
                value={feedbackForm.jenis}
                onChange={handleFeedbackChange}
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              >
                <option value="Feedback">Feedback</option>
                <option value="Komplain">Komplain</option>
              </select>

              <select
                name="paket"
                value={feedbackForm.paket}
                onChange={handleFeedbackChange}
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              >
                {bookings.map((booking) => (
                  <option key={booking.id} value={booking.paket}>
                    {booking.paket}
                  </option>
                ))}
              </select>

              <textarea
                name="pesan"
                value={feedbackForm.pesan}
                onChange={handleFeedbackChange}
                placeholder="Tulis feedback atau komplain kamu di sini..."
                className="md:col-span-2 min-h-[110px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
              />

              <div className="md:col-span-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <p className="text-[12px] text-[#9AA0AA]">
                  Total pesan terkirim: <b>{feedbacks.length}</b>
                </p>

                <button
                  type="submit"
                  className="h-[42px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition flex items-center justify-center gap-2"
                >
                  <FaCommentDots className="text-xs" />
                  Kirim
                </button>
              </div>
            </form>

            {feedbacks.length > 0 && (
              <div className="mt-5 border-t border-[#EEF1F5] pt-4">
                <h4 className="font-bold text-[14px] mb-3">Pesan Terakhir</h4>

                <div className="space-y-3">
                  {feedbacks.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#F8FBFF] rounded-[12px] p-4"
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <p className="font-bold text-[13px]">
                          {item.jenis} • {item.paket}
                        </p>
                        <span className="text-[11px] text-[#70A9F8] font-bold">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[13px] leading-6 text-[#596070]">
                        {item.pesan}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-[16px] p-5 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-[54px] h-[54px] rounded-[16px] bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center text-[22px] mb-4">
              <FaHeadset />
            </div>

            <h3 className="text-[19px] font-bold mb-2">Butuh Bantuan?</h3>

            <p className="text-[13px] leading-6 text-[#596070] mb-5">
              Customer service TravelGo siap membantu pertanyaan booking,
              pembayaran, promo, dan jadwal perjalanan kamu.
            </p>

            <div className="space-y-3 mb-5">
              <div className="bg-[#F8FBFF] rounded-[12px] p-4 flex items-center gap-3">
                <FaCheckCircle className="text-[#70A9F8]" />
                <span className="text-[13px] font-semibold text-[#596070]">
                  Bantuan booking dan pembayaran
                </span>
              </div>

              <div className="bg-[#F8FBFF] rounded-[12px] p-4 flex items-center gap-3">
                <FaGift className="text-[#70A9F8]" />
                <span className="text-[13px] font-semibold text-[#596070]">
                  Info promo dan membership
                </span>
              </div>

              <div className="bg-[#F8FBFF] rounded-[12px] p-4 flex items-center gap-3">
                <FaUmbrellaBeach className="text-[#70A9F8]" />
                <span className="text-[13px] font-semibold text-[#596070]">
                  Rekomendasi paket wisata
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleChatCS}
              className="w-full h-[44px] rounded-[11px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <FaPaperPlane className="text-xs" />
              Chat Customer Service
            </button>
          </div>
        </section>
      </main>

      {/* MODAL PROFILE */}
      {modalType === "profile" && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 md:px-6">
          <div className="w-full max-w-[720px] bg-white rounded-[18px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[22px] font-bold">Edit Profil Member</h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Ubah data profil member TravelGo.
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
              onSubmit={handleSubmitProfile}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="nama"
                value={profileForm.nama}
                onChange={handleProfileChange}
                placeholder="Nama lengkap"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                placeholder="Email"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                name="hp"
                value={profileForm.hp}
                onChange={handleProfileChange}
                placeholder="Nomor HP"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <select
                name="metodePembayaran"
                value={profileForm.metodePembayaran}
                onChange={handleProfileChange}
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              >
                <option value="QRIS">QRIS</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="E-Wallet">E-Wallet</option>
                <option value="Kartu Kredit">Kartu Kredit</option>
                <option value="Virtual Account">Virtual Account</option>
              </select>

              <textarea
                name="alamat"
                value={profileForm.alamat}
                onChange={handleProfileChange}
                placeholder="Alamat"
                className="md:col-span-2 min-h-[90px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
              />

              <div className="md:col-span-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-[42px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="h-[42px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2]"
                >
                  Simpan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL BOOKING */}
      {modalType === "booking" && selectedData && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 md:px-6">
          <div className="w-full max-w-[820px] bg-white rounded-[18px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[22px] font-bold">Detail Booking</h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  {selectedData.kode} • {selectedData.paket}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-[12px] text-[#9AA0AA]">Kode Booking</p>
                <p className="font-bold">{selectedData.kode}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4 md:col-span-2">
                <p className="text-[12px] text-[#9AA0AA]">Nama Paket</p>
                <p className="font-bold">{selectedData.paket}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-[12px] text-[#9AA0AA]">Lokasi</p>
                <p className="font-bold">{selectedData.lokasi}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-[12px] text-[#9AA0AA]">Tanggal</p>
                <p className="font-bold">{selectedData.tanggal}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-[12px] text-[#9AA0AA]">Durasi</p>
                <p className="font-bold">{selectedData.durasi}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-[12px] text-[#9AA0AA]">Harga</p>
                <p className="font-bold">{formatRupiah(selectedData.harga)}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-[12px] text-[#9AA0AA]">Status Booking</p>
                <span
                  className={`inline-flex px-3 py-1 rounded-[6px] text-[12px] font-bold ${getStatusStyle(
                    selectedData.statusBooking
                  )}`}
                >
                  {selectedData.statusBooking}
                </span>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-[12px] text-[#9AA0AA]">Pembayaran</p>
                <span
                  className={`inline-flex px-3 py-1 rounded-[6px] text-[12px] font-bold ${getPaymentStyle(
                    selectedData.statusPembayaran
                  )}`}
                >
                  {selectedData.statusPembayaran}
                </span>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4 md:col-span-3">
                <p className="text-[12px] text-[#9AA0AA]">Catatan</p>
                <p className="text-[13px] leading-6 text-[#596070]">
                  {selectedData.catatan}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleChatCS}
                className="h-[42px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] flex items-center gap-2"
              >
                <FaPaperPlane className="text-xs" />
                Tanya CS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PACKAGE */}
      {modalType === "package" && selectedData && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 md:px-6">
          <div className="w-full max-w-[850px] bg-white rounded-[18px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[22px] font-bold">Detail Paket</h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Rekomendasi paket untuk member TravelGo.
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

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
              <img
                src={selectedData.gambar}
                alt={selectedData.nama}
                className="w-full h-[250px] object-cover rounded-[14px]"
              />

              <div>
                <span className="inline-flex bg-[#EAF4FF] text-[#70A9F8] text-[12px] font-bold px-3 py-1 rounded-[7px] mb-3">
                  {selectedData.kategori}
                </span>

                <h3 className="text-[24px] font-bold mb-2">
                  {selectedData.nama}
                </h3>

                <p className="text-[13px] text-[#9AA0AA] flex items-center gap-2 mb-3">
                  <FaMapMarkerAlt />
                  {selectedData.lokasi}
                </p>

                {renderStars(selectedData.rating)}

                <p className="text-[14px] leading-7 text-[#596070] mt-4 mb-5">
                  {selectedData.deskripsi}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                    <p className="text-[12px] text-[#9AA0AA]">Harga</p>
                    <p className="font-bold text-[#70A9F8]">
                      {formatRupiah(selectedData.harga)}
                    </p>
                  </div>

                  <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                    <p className="text-[12px] text-[#9AA0AA]">Durasi</p>
                    <p className="font-bold">{selectedData.durasi}</p>
                  </div>
                </div>

                <div className="bg-[#F8FBFF] rounded-[12px] p-4 mb-5">
                  <p className="font-bold text-[14px] mb-2">Fasilitas</p>
                  <ul className="space-y-2 text-[13px] text-[#596070]">
                    {selectedData.fasilitas.map((item) => (
                      <li key={item} className="flex gap-2">
                        <FaCheckCircle className="text-[#70A9F8] mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    showNotification(
                      "Paket dipilih. Untuk booking lanjutkan melalui Customer Service."
                    )
                  }
                  className="w-full h-[42px] rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition"
                >
                  Pilih Paket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PROMO */}
      {modalType === "promo" && selectedData && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 md:px-6">
          <div className="w-full max-w-[520px] bg-white rounded-[18px] shadow-2xl p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[22px] font-bold">Gunakan Promo</h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Promo aktif untuk member TravelGo.
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

            <div className="bg-[#EAF4FF] rounded-[16px] p-5 mb-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-bold text-[#70A9F8] mb-1">
                    {selectedData.target}
                  </p>
                  <h3 className="text-[20px] font-bold">{selectedData.nama}</h3>
                  <p className="text-[13px] text-[#596070] mt-2 leading-6">
                    {selectedData.deskripsi}
                  </p>
                </div>

                <div className="w-[70px] h-[70px] rounded-[16px] bg-white text-[#70A9F8] flex items-center justify-center text-[22px] font-bold shrink-0">
                  {selectedData.diskon}
                </div>
              </div>
            </div>

            <div className="bg-[#F8FBFF] rounded-[14px] p-4 mb-5">
              <p className="text-[12px] text-[#9AA0AA] mb-1">Kode Promo</p>
              <p className="text-[22px] font-bold tracking-wider">
                {selectedData.kode}
              </p>
              <p className="text-[12px] text-[#9AA0AA] mt-2">
                {selectedData.berlaku}
              </p>
            </div>

            <button
              type="button"
              onClick={handleConfirmPromo}
              className="w-full h-[42px] rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2]"
            >
              Simpan Promo
            </button>
          </div>
        </div>
      )}

      {/* MODAL CUSTOMER SERVICE */}
      {modalType === "cs" && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 md:px-6">
          <div className="w-full max-w-[760px] bg-white rounded-[18px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-[#EEF1F5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-[46px] h-[46px] rounded-full bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center">
                  <FaHeadset />
                </div>

                <div>
                  <h2 className="text-[20px] font-bold">Customer Service</h2>
                  <p className="text-[13px] text-[#9AA0AA]">
                    Chat CS tetap di halaman member, tidak masuk ke halaman admin Messages.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-[36px] h-[36px] rounded-full bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-5 space-y-3 bg-[#F8FBFF] overflow-y-auto min-h-[340px]">
              {chatList.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.from === "member" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-[14px] px-4 py-3 text-sm leading-6 ${
                      chat.from === "member"
                        ? "bg-[#70A9F8] text-white"
                        : "bg-white text-[#596070] border border-[#EEF1F5]"
                    }`}
                  >
                    <p>{chat.text}</p>
                    <p
                      className={`text-[10px] mt-1 ${
                        chat.from === "member"
                          ? "text-white/75"
                          : "text-[#9AA0AA]"
                      }`}
                    >
                      {chat.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendChat}
              className="p-4 border-t border-[#EEF1F5] flex flex-col md:flex-row gap-3"
            >
              <input
                type="text"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder="Tulis pesan ke customer service..."
                className="flex-1 h-[44px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <button
                type="submit"
                className="h-[44px] px-5 rounded-[12px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] flex items-center justify-center gap-2"
              >
                <FaPaperPlane className="text-xs" />
                Kirim
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MEMBERSHIP / TRANSACTION */}
      {["membership", "transaction"].includes(modalType) && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 md:px-6">
          <div className="w-full max-w-[620px] bg-white rounded-[18px] shadow-2xl p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[22px] font-bold">
                  {modalType === "membership"
                    ? "Status Membership"
                    : "Detail Transaksi"}
                </h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Ringkasan akun member TravelGo.
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

            {modalType === "membership" && (
              <>
                <div className="bg-[#EAF4FF] rounded-[16px] p-5 mb-5">
                  <p className="text-[13px] text-[#70A9F8] font-bold">
                    Level Saat Ini
                  </p>
                  <h3 className="text-[32px] font-bold mt-1">{member.level}</h3>
                  <p className="text-[13px] text-[#596070] mt-2">
                    Kamu memiliki {member.poin} poin. Tingkatkan transaksi untuk
                    naik ke level berikutnya.
                  </p>
                </div>

                <div className="space-y-3">
                  {["Regular", "Silver", "Gold", "Platinum"].map((level) => (
                    <div
                      key={level}
                      className="flex items-center justify-between bg-[#F8FBFF] rounded-[12px] p-4"
                    >
                      <span className="font-bold">{level}</span>
                      <span
                        className={`text-[12px] font-bold px-3 py-1 rounded-[7px] ${getLevelStyle(
                          level
                        )}`}
                      >
                        {member.level === level ? "Level Kamu" : "Benefit"}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {modalType === "transaction" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                  <p className="text-[12px] text-[#9AA0AA]">Total Transaksi</p>
                  <p className="text-[20px] font-bold">
                    {formatRupiah(member.totalTransaksi)}
                  </p>
                </div>

                <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                  <p className="text-[12px] text-[#9AA0AA]">Total Booking</p>
                  <p className="text-[20px] font-bold">{bookings.length}</p>
                </div>

                <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                  <p className="text-[12px] text-[#9AA0AA]">Booking Lunas</p>
                  <p className="text-[20px] font-bold">{totalPaidBooking}</p>
                </div>

                <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                  <p className="text-[12px] text-[#9AA0AA]">Poin Member</p>
                  <p className="text-[20px] font-bold">{member.poin}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
