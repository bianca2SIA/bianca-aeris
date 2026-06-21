import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCheckCircle,
  FaCommentDots,
  FaCrown,
  FaEdit,
  FaEnvelope,
  FaEye,
  FaGift,
  FaHeadset,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaPlaneDeparture,
  FaRegStar,
  FaSearch,
  FaStar,
  FaTimes,
  FaUserCircle,
  FaWallet,
} from "react-icons/fa";
import paketData from "../../data/paket.json";

const defaultImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80";

function ambilUserLogin() {
  const dataUser =
    localStorage.getItem("currentUser") || localStorage.getItem("user");

  if (!dataUser) {
    return {};
  }

  try {
    const user = JSON.parse(dataUser);

    return {
      id: user.id || user.user_id || "",
      name:
        user.name || user.nama || user.user_metadata?.name || "Member TravelGo",
      email: user.email || "-",
      phone: user.phone || user.hp || "-",
      address: user.address || user.alamat || "-",
    };
  } catch (error) {
    return {};
  }
}

function ambilStorage(key, dataAwal) {
  const data = localStorage.getItem(key);

  if (!data) {
    return dataAwal;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    localStorage.removeItem(key);
    return dataAwal;
  }
}

function simpanStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function hargaKeAngka(harga) {
  if (typeof harga === "number") {
    return harga;
  }

  return Number(String(harga || 0).replace(/[^\d]/g, "")) || 0;
}

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(angka || 0));
}

function formatTanggal(tanggal) {
  if (!tanggal) {
    return "-";
  }

  return new Date(`${tanggal}T00:00:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ambilRating(rating) {
  const hasil = String(rating || "4.8").match(/\d+(\.\d+)?/);

  if (!hasil) {
    return 4.8;
  }

  return Number(hasil[0]);
}

function normalisasiPaket(item, index, kategoriDefault) {
  const gambar = item?.gambar || defaultImage;

  const fasilitasDariAktivitas = Array.isArray(item?.aktivitas)
    ? item.aktivitas
    : [];

  const fasilitasDasar = [item?.akomodasi, item?.makan, item?.ekstra].filter(
    Boolean,
  );

  return {
    id:
      item?.id ||
      `${kategoriDefault}-${item?.nama || index}`
        .toLowerCase()
        .replaceAll(" ", "-"),

    nama: item?.nama || `Paket TravelGo ${index + 1}`,

    lokasi: item?.lokasi || "Indonesia",

    harga: hargaKeAngka(item?.harga),

    durasi: item?.durasi || "3 Hari / 2 Malam",

    gambar,

    rating: ambilRating(item?.rating),

    kategori: item?.kategori || kategoriDefault,

    deskripsi:
      item?.deskripsi ||
      "Paket perjalanan TravelGo dengan fasilitas lengkap, itinerary rapi, dan customer service selama perjalanan.",

    fasilitas:
      fasilitasDariAktivitas.length > 0
        ? fasilitasDariAktivitas
        : fasilitasDasar.length > 0
          ? fasilitasDasar
          : [
              "Transport perjalanan",
              "Hotel nyaman",
              "Guide lokal",
              "Customer service",
            ],
  };
}

function ambilDaftarPaket() {
  const paketTersimpan = ambilStorage("travelgo_packages_final", null);

  if (Array.isArray(paketTersimpan) && paketTersimpan.length > 0) {
    return paketTersimpan.map((item, index) =>
      normalisasiPaket(item, index, item.kategori || "Travel"),
    );
  }

  const daftarAwal = [
    {
      data: paketData?.paketBaru,
      kategori: "Paket Baru",
    },

    ...(paketData?.paketUnggulan || []).map((item) => ({
      data: item,
      kategori: "Unggulan",
    })),

    ...(paketData?.paketPopuler || []).map((item) => ({
      data: item,
      kategori: "Populer",
    })),

    ...(paketData?.paketRekomendasi || []).map((item) => ({
      data: item,
      kategori: "Rekomendasi",
    })),
  ].filter((item) => item.data);

  const paketNormal = daftarAwal.map((item, index) =>
    normalisasiPaket(item.data, index, item.kategori),
  );

  return Array.from(
    new Map(paketNormal.map((paket) => [paket.nama, paket])).values(),
  );
}

function styleStatusBooking(status) {
  if (status === "Dikonfirmasi") {
    return "bg-[#E9FBEF] text-[#31A05F]";
  }

  if (status === "Selesai") {
    return "bg-[#EAF4FF] text-[#5A91D6]";
  }

  return "bg-[#FFF4D8] text-[#B88700]";
}

function styleStatusBayar(status) {
  if (status === "Lunas") {
    return "bg-[#E9FBEF] text-[#31A05F]";
  }

  return "bg-[#FFF4D8] text-[#B88700]";
}

export default function MemberDashboard() {
  const navigate = useNavigate();
  const userLogin = ambilUserLogin();
  const kodeUser = userLogin.id || userLogin.email || "member";

  const STORAGE = {
    profile: `travelgo_member_profile_${kodeUser}`,
    bookings: `travelgo_member_bookings_${kodeUser}`,
    feedbacks: `travelgo_member_feedback_${kodeUser}`,
    chats: `travelgo_member_chat_${kodeUser}`,
  };

  const defaultMember = {
    id: userLogin.id,
    nama: userLogin.name,
    email: userLogin.email,
    hp: userLogin.phone,
    alamat: userLogin.address,
    metodePembayaran: "QRIS",
  };

  const [packages] = useState(() => ambilDaftarPaket());

  const [member, setMember] = useState(() =>
    ambilStorage(STORAGE.profile, defaultMember),
  );

  const [bookings, setBookings] = useState(() =>
    ambilStorage(STORAGE.bookings, []),
  );

  const [feedbacks, setFeedbacks] = useState(() =>
    ambilStorage(STORAGE.feedbacks, []),
  );

  const [chats, setChats] = useState(() =>
    ambilStorage(STORAGE.chats, [
      {
        from: "cs",
        text: `Halo ${defaultMember.nama}, ada yang bisa TravelGo bantu?`,
        time: "Baru saja",
      },
    ]),
  );

  const [modalType, setModalType] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [notification, setNotification] = useState("");

  const [searchPackage, setSearchPackage] = useState("");
  const [searchBooking, setSearchBooking] = useState("");
  const [chatText, setChatText] = useState("");

  const [profileForm, setProfileForm] = useState(member);

  const [bookingForm, setBookingForm] = useState({
    tanggal: "",
    jumlahTraveler: 1,
    metodePembayaran: "QRIS",
    catatan: "",
  });

  const [feedbackForm, setFeedbackForm] = useState({
    jenis: "Feedback",
    paket: "",
    pesan: "",
  });

  useEffect(() => {
    simpanStorage(STORAGE.profile, member);
  }, [member]);

  useEffect(() => {
    simpanStorage(STORAGE.bookings, bookings);
  }, [bookings]);

  useEffect(() => {
    simpanStorage(STORAGE.feedbacks, feedbacks);
  }, [feedbacks]);

  useEffect(() => {
    simpanStorage(STORAGE.chats, chats);
  }, [chats]);

  const tampilkanNotifikasi = (pesan) => {
    setNotification(pesan);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  const bukaModal = (jenis, data = null) => {
    setSelectedData(data);
    setModalType(jenis);

    if (jenis === "profile") {
      setProfileForm(member);
    }

    if (jenis === "booking") {
      setBookingForm({
        tanggal: "",
        jumlahTraveler: 1,
        metodePembayaran: "QRIS",
        catatan: "",
      });
    }
  };

  const tutupModal = () => {
    setModalType("");
    setSelectedData(null);
  };

  const paketTampil = useMemo(() => {
    const keyword = searchPackage.toLowerCase().trim();

    if (!keyword) {
      return packages;
    }

    return packages.filter((paket) => {
      return (
        paket.nama.toLowerCase().includes(keyword) ||
        paket.lokasi.toLowerCase().includes(keyword) ||
        paket.kategori.toLowerCase().includes(keyword)
      );
    });
  }, [packages, searchPackage]);

  const bookingTampil = useMemo(() => {
    const keyword = searchBooking.toLowerCase().trim();

    if (!keyword) {
      return bookings;
    }

    return bookings.filter((booking) => {
      return (
        booking.kode.toLowerCase().includes(keyword) ||
        booking.paket.toLowerCase().includes(keyword) ||
        booking.lokasi.toLowerCase().includes(keyword) ||
        booking.statusBooking.toLowerCase().includes(keyword)
      );
    });
  }, [bookings, searchBooking]);

  const totalTransaksi = bookings.reduce((total, booking) => {
    return total + Number(booking.harga || 0);
  }, 0);

  const bookingLunas = bookings.filter((booking) => {
    return booking.statusPembayaran === "Lunas";
  }).length;

  const tripBerikutnya = bookings.find((booking) => {
    return (
      booking.statusBooking === "Menunggu" ||
      booking.statusBooking === "Dikonfirmasi"
    );
  });

  const simpanProfil = (e) => {
    e.preventDefault();

    if (!profileForm.nama || !profileForm.email || !profileForm.hp) {
      alert("Nama, email, dan nomor HP wajib diisi");
      return;
    }

    const userBaru = {
      ...userLogin,
      name: profileForm.nama,
      email: profileForm.email,
      phone: profileForm.hp,
      address: profileForm.alamat,
    };

    localStorage.setItem("currentUser", JSON.stringify(userBaru));

    setMember(profileForm);
    tutupModal();
    tampilkanNotifikasi("Profil berhasil diperbarui");
  };

  const buatBooking = (e) => {
    e.preventDefault();

    if (!bookingForm.tanggal) {
      alert("Pilih tanggal keberangkatan dulu");
      return;
    }

    const jumlahTraveler = Number(bookingForm.jumlahTraveler);

    if (jumlahTraveler < 1) {
      alert("Jumlah traveler minimal 1 orang");
      return;
    }

    const bookingBaru = {
      id: Date.now(),
      kode: `BKG-TRG-${Date.now().toString().slice(-6)}`,
      userId: userLogin.id || "",
      namaCustomer: member.nama,
      emailCustomer: member.email,
      paket: selectedData.nama,
      lokasi: selectedData.lokasi,
      tanggal: formatTanggal(bookingForm.tanggal),
      durasi: selectedData.durasi,
      harga: selectedData.harga * jumlahTraveler,
      jumlahTraveler,
      metodePembayaran: bookingForm.metodePembayaran,
      statusBooking: "Menunggu",
      statusPembayaran: "Menunggu Verifikasi",
      catatan:
        bookingForm.catatan ||
        "Booking berhasil dibuat dan sedang menunggu verifikasi admin.",
    };

    setBookings((dataLama) => [bookingBaru, ...dataLama]);

    const semuaBooking = ambilStorage("travelgo_all_bookings", []);

    simpanStorage("travelgo_all_bookings", [bookingBaru, ...semuaBooking]);

    setFeedbackForm({
      jenis: "Feedback",
      paket: bookingBaru.paket,
      pesan: "",
    });

    tutupModal();
    tampilkanNotifikasi("Booking berhasil dibuat");
  };

  const kirimFeedback = (e) => {
    e.preventDefault();

    if (!feedbackForm.pesan.trim()) {
      alert("Isi feedback atau komplain dulu");
      return;
    }

    const feedbackBaru = {
      id: Date.now(),
      jenis: feedbackForm.jenis,
      paket: feedbackForm.paket || "Umum",
      pesan: feedbackForm.pesan,
      tanggal: new Date().toLocaleDateString("id-ID"),
      status: "Terkirim",
    };

    setFeedbacks((dataLama) => [feedbackBaru, ...dataLama]);

    setFeedbackForm({
      jenis: "Feedback",
      paket: "",
      pesan: "",
    });

    tampilkanNotifikasi("Feedback berhasil dikirim");
  };

  const kirimChat = (e) => {
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
      text: "Pesan kamu sudah diterima. Customer Service TravelGo akan segera membantu.",
      time: "Baru saja",
    };

    setChats((dataLama) => [...dataLama, pesanMember, balasanCS]);
    setChatText("");
  };

  const PackageCard = ({ paket, popup = false }) => {
    return (
      <div className="border border-[#EEF1F5] rounded-[16px] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition">
        <img
          src={paket.gambar}
          alt={paket.nama}
          className={`w-full object-cover ${popup ? "h-[180px]" : "h-[185px]"}`}
        />

        <div className="p-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="bg-[#EAF4FF] text-[#70A9F8] text-xs font-bold px-3 py-1 rounded-[7px]">
              {paket.kategori}
            </span>

            <span className="text-xs font-bold flex items-center gap-1 text-[#B88700]">
              <FaStar />
              {paket.rating}
            </span>
          </div>

          <h4 className="font-bold text-[16px]">{paket.nama}</h4>

          <p className="text-sm text-[#9AA0AA] flex items-center gap-2 mt-2">
            <FaMapMarkerAlt />
            {paket.lokasi}
          </p>

          {popup && (
            <p className="text-sm text-[#596070] leading-6 mt-3 line-clamp-2">
              {paket.deskripsi}
            </p>
          )}

          <div className="flex items-end justify-between mt-5">
            <div>
              <p className="text-xs text-[#9AA0AA]">Mulai dari</p>

              <p className="text-[17px] font-bold text-[#70A9F8]">
                {formatRupiah(paket.harga)}
              </p>
            </div>

            <p className="text-xs font-bold bg-[#F4F5F7] text-[#596070] px-3 py-2 rounded-[8px]">
              {paket.durasi}
            </p>
          </div>

          <button
            type="button"
            onClick={() => bukaModal("packageDetail", paket)}
            className="w-full h-10 mt-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] flex items-center justify-center gap-2"
          >
            Lihat Paket
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#202436] font-[Plus_Jakarta_Sans]">
      {notification && (
        <div className="fixed top-5 right-5 z-[9999] bg-[#202436] text-white px-5 py-3 rounded-xl shadow-xl text-sm font-semibold">
          {notification}
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#EEF1F5]">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 h-[76px] flex items-center justify-between gap-4">
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

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="hidden md:flex h-[40px] px-4 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] hover:text-[#70A9F8] items-center gap-2"
            >
              <FaArrowRight className="text-xs rotate-180" />
              Kembali ke Beranda
            </button>
            <button
              type="button"
              onClick={() => bukaModal("chat")}
              className="hidden md:flex h-[40px] px-4 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] hover:text-[#70A9F8] items-center gap-2"
            >
              <FaHeadset className="text-xs" />
              Customer Service
            </button>

            <button
              type="button"
              onClick={() => bukaModal("profile")}
              className="h-[42px] px-4 rounded-[12px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] flex items-center gap-2"
            >
              <FaUserCircle />
              <span className="hidden md:inline">{member.nama}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto px-4 md:px-6 py-6 xl:py-8">
        <section className="relative overflow-hidden bg-[#70A9F8] rounded-[18px] p-6 md:p-8 mb-6 text-white">
          <div className="absolute right-[-80px] top-[-100px] w-[280px] h-[280px] rounded-full bg-white/20"></div>
          <div className="absolute right-[120px] bottom-[-150px] w-[280px] h-[280px] rounded-full bg-white/10"></div>

          <div className="relative grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-center">
            <div>
              <p className="inline-flex items-center gap-2 bg-white/20 border border-white/25 rounded-full px-4 py-2 text-xs font-bold mb-4">
                <FaPlaneDeparture />
                TravelGo Member Area
              </p>

              <h2 className="text-[30px] md:text-[38px] font-bold mb-3">
                Halo, {member.nama}
              </h2>

              <p className="text-white/85 text-sm md:text-[15px] leading-7 max-w-[700px]">
                Lihat paket travel, buat booking, cek status perjalanan, dan
                hubungi customer service dari satu halaman.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => bukaModal("allPackages")}
                  className="h-[42px] px-5 rounded-[11px] bg-white text-[#70A9F8] text-sm font-bold hover:shadow-lg flex items-center gap-2"
                >
                  <FaPlaneDeparture className="text-xs" />
                  Lihat Semua Paket
                </button>

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("booking-saya")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="h-[42px] px-5 rounded-[11px] bg-white/15 border border-white/25 text-white text-sm font-bold hover:bg-white/25 flex items-center gap-2"
                >
                  <FaCalendarCheck className="text-xs" />
                  Riwayat Booking
                </button>
              </div>
            </div>

            <div className="bg-white/15 border border-white/20 rounded-[16px] p-5">
              <p className="text-white/75 text-sm font-semibold mb-2">
                Trip Berikutnya
              </p>

              <h3 className="text-[19px] font-bold mb-2">
                {tripBerikutnya?.paket || "Belum ada trip aktif"}
              </h3>

              <p className="text-white/80 text-sm flex items-center gap-2 mb-2">
                <FaMapMarkerAlt />
                {tripBerikutnya?.lokasi || "Pilih paket TravelGo"}
              </p>

              <p className="text-white/80 text-sm flex items-center gap-2">
                <FaCalendarCheck />
                {tripBerikutnya?.tanggal || "Belum ada jadwal"}
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-[16px] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center">
                <FaUserCircle />
              </div>

              <span className="text-xs font-bold bg-[#E9FBEF] text-[#31A05F] px-3 py-1 rounded-[7px]">
                Aktif
              </span>
            </div>

            <p className="text-[#9AA0AA] text-sm">Status Member</p>
            <h3 className="text-2xl font-bold mt-1">Member</h3>
          </div>

          <div className="bg-white rounded-[16px] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-[#FFF4D8] text-[#B88700] flex items-center justify-center">
                <FaCrown />
              </div>

              <span className="text-xs font-bold bg-[#EAF4FF] text-[#70A9F8] px-3 py-1 rounded-[7px]">
                Regular
              </span>
            </div>

            <p className="text-[#9AA0AA] text-sm">Level Membership</p>
            <h3 className="text-2xl font-bold mt-1">Regular</h3>
          </div>

          <div className="bg-white rounded-[16px] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center">
                <FaCalendarCheck />
              </div>

              <span className="text-xs font-bold bg-[#EAF4FF] text-[#70A9F8] px-3 py-1 rounded-[7px]">
                {bookingLunas} Lunas
              </span>
            </div>

            <p className="text-[#9AA0AA] text-sm">Total Booking</p>
            <h3 className="text-2xl font-bold mt-1">{bookings.length}</h3>
          </div>

          <div className="bg-white rounded-[16px] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center">
                <FaWallet />
              </div>

              <span className="text-xs font-bold bg-[#EAF4FF] text-[#70A9F8] px-3 py-1 rounded-[7px]">
                {Math.floor(totalTransaksi / 100000)} poin
              </span>
            </div>

            <p className="text-[#9AA0AA] text-sm">Total Transaksi</p>

            <h3 className="text-[20px] font-bold mt-1">
              {formatRupiah(totalTransaksi)}
            </h3>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 mb-6">
          <div className="bg-white rounded-[16px] p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-[17px] font-bold">Profil Member</h3>

                <p className="text-sm text-[#9AA0AA] mt-1">
                  Identitas akun yang sedang login.
                </p>
              </div>

              <button
                type="button"
                onClick={() => bukaModal("profile")}
                className="h-10 px-4 rounded-[10px] bg-[#EAF4FF] text-[#70A9F8] text-sm font-bold hover:bg-[#70A9F8] hover:text-white flex items-center gap-2"
              >
                <FaEdit className="text-xs" />
                Edit Profil
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-xs text-[#9AA0AA] flex items-center gap-2 mb-1">
                  <FaUserCircle /> Nama
                </p>

                <p className="font-bold">{member.nama}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-xs text-[#9AA0AA] flex items-center gap-2 mb-1">
                  <FaEnvelope /> Email
                </p>

                <p className="font-bold truncate">{member.email}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-xs text-[#9AA0AA] flex items-center gap-2 mb-1">
                  <FaPhoneAlt /> No HP
                </p>

                <p className="font-bold">{member.hp}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4 md:col-span-2">
                <p className="text-xs text-[#9AA0AA] flex items-center gap-2 mb-1">
                  <FaMapMarkerAlt /> Alamat
                </p>

                <p className="font-bold">{member.alamat}</p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-4">
                <p className="text-xs text-[#9AA0AA] flex items-center gap-2 mb-1">
                  <FaWallet /> Pembayaran Favorit
                </p>

                <p className="font-bold">{member.metodePembayaran}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[16px] p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center">
                <FaGift />
              </div>

              <div>
                <h3 className="text-[17px] font-bold">Promo Member</h3>

                <p className="text-sm text-[#9AA0AA]">
                  Promo untuk booking berikutnya.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="border border-[#EEF1F5] rounded-[14px] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-sm">Weekend Escape</p>

                    <p className="text-xs text-[#9AA0AA] mt-1">
                      Sampai 15 Agustus 2026
                    </p>
                  </div>

                  <span className="text-sm font-bold bg-[#EAF4FF] text-[#70A9F8] px-3 py-1 rounded-[7px]">
                    10%
                  </span>
                </div>

                <p className="mt-3 text-xs text-[#596070]">
                  Kode: <b>WEEKEND10</b>
                </p>
              </div>

              <div className="border border-[#EEF1F5] rounded-[14px] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-sm">Member Holiday Deal</p>

                    <p className="text-xs text-[#9AA0AA] mt-1">
                      Sampai 31 Agustus 2026
                    </p>
                  </div>

                  <span className="text-sm font-bold bg-[#EAF4FF] text-[#70A9F8] px-3 py-1 rounded-[7px]">
                    15%
                  </span>
                </div>

                <p className="mt-3 text-xs text-[#596070]">
                  Kode: <b>TRAVELGO15</b>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[16px] p-5 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-[17px] font-bold">Daftar Paket Travel</h3>

              <p className="text-sm text-[#9AA0AA] mt-1">
                Pilihan paket TravelGo untuk perjalanan bibi.
              </p>
            </div>

            <button
              type="button"
              onClick={() => bukaModal("allPackages")}
              className="h-10 px-4 rounded-[10px] bg-[#EAF4FF] text-[#70A9F8] text-sm font-bold hover:bg-[#70A9F8] hover:text-white flex items-center justify-center gap-2"
            >
              Lihat Semua
              <FaArrowRight className="text-xs" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {packages.slice(0, 3).map((paket) => (
              <PackageCard key={paket.id} paket={paket} />
            ))}
          </div>

          {packages.length === 0 && (
            <p className="py-10 text-center text-sm text-[#9AA0AA]">
              Data paket belum tersedia.
            </p>
          )}
        </section>

        <section
          id="booking-saya"
          className="bg-white rounded-[16px] p-5 shadow-sm mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-[17px] font-bold">Riwayat Booking Saya</h3>

              <p className="text-sm text-[#9AA0AA] mt-1">
                Booking baru akan langsung tampil di sini.
              </p>
            </div>

            <div className="w-full lg:w-[300px] h-11 rounded-[12px] border border-[#E8EDF3] flex items-center gap-3 px-4">
              <FaSearch className="text-[#9AA0AA]" />

              <input
                type="text"
                value={searchBooking}
                onChange={(e) => setSearchBooking(e.target.value)}
                placeholder="Cari booking..."
                className="w-full bg-transparent !border-none !outline-none !ring-0 focus:!border-none focus:!outline-none focus:!ring-0 text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead className="bg-[#EAF4FF] text-left text-xs text-[#8F96A3]">
                <tr>
                  <th className="px-4 py-3">Kode</th>
                  <th className="px-4 py-3">Paket</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Harga</th>
                  <th className="px-4 py-3">Booking</th>
                  <th className="px-4 py-3">Pembayaran</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {bookingTampil.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-[#EEF1F5] hover:bg-[#F8FBFF]"
                  >
                    <td className="px-4 py-4 text-sm font-bold">
                      {booking.kode}
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-sm font-bold">{booking.paket}</p>

                      <p className="text-xs text-[#9AA0AA]">{booking.lokasi}</p>
                    </td>

                    <td className="px-4 py-4 text-sm text-[#596070]">
                      {booking.tanggal}
                    </td>

                    <td className="px-4 py-4 text-sm font-bold">
                      {formatRupiah(booking.harga)}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-[7px] ${styleStatusBooking(
                          booking.statusBooking,
                        )}`}
                      >
                        {booking.statusBooking}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-[7px] ${styleStatusBayar(
                          booking.statusPembayaran,
                        )}`}
                      >
                        {booking.statusPembayaran}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => bukaModal("bookingDetail", booking)}
                        className="h-8 px-3 rounded-[8px] bg-[#EAF4FF] text-[#70A9F8] text-xs font-bold hover:bg-[#70A9F8] hover:text-white flex items-center gap-2"
                      >
                        <FaEye />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}

                {bookingTampil.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-sm text-[#9AA0AA]"
                    >
                      Belum ada booking. Klik Lihat Semua untuk memilih paket.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
          <div className="bg-white rounded-[16px] p-5 shadow-sm">
            <h3 className="text-[17px] font-bold">Feedback / Komplain</h3>

            <p className="text-sm text-[#9AA0AA] mt-1 mb-5">
              Kirim masukan atau komplain terkait layanan TravelGo.
            </p>

            <form
              onSubmit={kirimFeedback}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <select
                value={feedbackForm.jenis}
                onChange={(e) =>
                  setFeedbackForm({
                    ...feedbackForm,
                    jenis: e.target.value,
                  })
                }
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none"
              >
                <option value="Feedback">Feedback</option>
                <option value="Komplain">Komplain</option>
              </select>

              <select
                value={feedbackForm.paket}
                onChange={(e) =>
                  setFeedbackForm({
                    ...feedbackForm,
                    paket: e.target.value,
                  })
                }
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none"
              >
                <option value="">Pilih paket (opsional)</option>

                {bookings.map((booking) => (
                  <option key={booking.id} value={booking.paket}>
                    {booking.paket}
                  </option>
                ))}
              </select>

              <textarea
                value={feedbackForm.pesan}
                onChange={(e) =>
                  setFeedbackForm({
                    ...feedbackForm,
                    pesan: e.target.value,
                  })
                }
                placeholder="Tulis feedback atau komplain di sini..."
                className="md:col-span-2 min-h-[110px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none resize-none"
              />

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="h-10 px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] flex items-center gap-2"
                >
                  <FaCommentDots className="text-xs" />
                  Kirim Pesan
                </button>
              </div>
            </form>

            {feedbacks.length > 0 && (
              <div className="mt-5 border-t border-[#EEF1F5] pt-4">
                <p className="font-bold text-sm mb-3">Pesan Terakhir</p>

                {feedbacks.slice(0, 2).map((feedback) => (
                  <div
                    key={feedback.id}
                    className="bg-[#F8FBFF] rounded-[12px] p-4 mb-3"
                  >
                    <p className="font-bold text-sm">
                      {feedback.jenis} • {feedback.paket}
                    </p>

                    <p className="text-sm text-[#596070] mt-2">
                      {feedback.pesan}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-[16px] p-5 shadow-sm">
            <div className="w-[52px] h-[52px] rounded-[16px] bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center text-xl mb-4">
              <FaHeadset />
            </div>

            <h3 className="text-[19px] font-bold">Butuh Bantuan?</h3>

            <p className="text-sm text-[#596070] leading-6 mt-2 mb-5">
              Customer service siap membantu pertanyaan booking, pembayaran,
              promo, dan jadwal perjalanan.
            </p>

            <button
              type="button"
              onClick={() => bukaModal("chat")}
              className="w-full h-11 rounded-[11px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] flex items-center justify-center gap-2"
            >
              <FaPaperPlane className="text-xs" />
              Chat Customer Service
            </button>
          </div>
        </section>
      </main>

      {modalType === "profile" && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[680px] bg-white rounded-[18px] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between gap-4 mb-5">
              <div>
                <h2 className="text-[22px] font-bold">Edit Profil Member</h2>

                <p className="text-sm text-[#9AA0AA] mt-1">
                  Ubah data profil member.
                </p>
              </div>

              <button
                type="button"
                onClick={tutupModal}
                className="w-9 h-9 rounded-full bg-[#F4F5F7] flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={simpanProfil}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                value={profileForm.nama}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    nama: e.target.value,
                  })
                }
                placeholder="Nama lengkap"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none"
              />

              <input
                type="email"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none"
              />

              <input
                type="text"
                value={profileForm.hp}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    hp: e.target.value,
                  })
                }
                placeholder="Nomor HP"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none"
              />

              <select
                value={profileForm.metodePembayaran}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    metodePembayaran: e.target.value,
                  })
                }
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none"
              >
                <option value="QRIS">QRIS</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="E-Wallet">E-Wallet</option>
                <option value="Kartu Kredit">Kartu Kredit</option>
              </select>

              <textarea
                value={profileForm.alamat}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    alamat: e.target.value,
                  })
                }
                placeholder="Alamat"
                className="md:col-span-2 min-h-[90px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none resize-none"
              />

              <div className="md:col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={tutupModal}
                  className="h-10 px-5 rounded-[10px] bg-[#F4F5F7] text-sm font-bold"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="h-10 px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold"
                >
                  Simpan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === "allPackages" && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[1240px] max-h-[90vh] overflow-y-auto bg-white rounded-[18px] p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-[22px] font-bold">
                  Daftar Semua Paket Travel
                </h2>

                <p className="text-sm text-[#9AA0AA] mt-1">
                  Pilih paket, lihat detail, lalu buat booking.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-full md:w-[310px] h-11 rounded-[12px] border border-[#E8EDF3] flex items-center gap-3 px-4">
                  <FaSearch className="text-[#9AA0AA]" />

                  <input
                    type="text"
                    value={searchPackage}
                    onChange={(e) => setSearchPackage(e.target.value)}
                    placeholder="Cari nama atau lokasi..."
                    className="w-full bg-transparent !border-none !outline-none !ring-0 focus:!border-none focus:!outline-none focus:!ring-0 text-sm"
                  />
                </div>

                <button
                  type="button"
                  onClick={tutupModal}
                  className="w-10 h-10 shrink-0 rounded-full bg-[#F4F5F7] flex items-center justify-center"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {paketTampil.map((paket) => (
                <PackageCard key={paket.id} paket={paket} popup />
              ))}
            </div>

            {paketTampil.length === 0 && (
              <p className="text-center py-12 text-sm text-[#9AA0AA]">
                Paket tidak ditemukan.
              </p>
            )}
          </div>
        </div>
      )}

      {modalType === "packageDetail" && selectedData && (
        <div className="fixed inset-0 z-[1000] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[850px] bg-white rounded-[18px] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between gap-4 mb-5">
              <div>
                <h2 className="text-[22px] font-bold">Detail Paket</h2>

                <p className="text-sm text-[#9AA0AA] mt-1">
                  Pilih paket untuk melanjutkan booking.
                </p>
              </div>

              <button
                type="button"
                onClick={tutupModal}
                className="w-9 h-9 rounded-full bg-[#F4F5F7] flex items-center justify-center"
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
                <span className="inline-flex bg-[#EAF4FF] text-[#70A9F8] text-xs font-bold px-3 py-1 rounded-[7px]">
                  {selectedData.kategori}
                </span>

                <h3 className="text-[24px] font-bold mt-3">
                  {selectedData.nama}
                </h3>

                <p className="text-sm text-[#9AA0AA] flex items-center gap-2 mt-2">
                  <FaMapMarkerAlt />
                  {selectedData.lokasi}
                </p>

                <div className="flex items-center gap-1 mt-3 text-[#B88700]">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= Math.round(selectedData.rating) ? (
                      <FaStar key={star} className="text-sm" />
                    ) : (
                      <FaRegStar key={star} className="text-sm" />
                    ),
                  )}

                  <span className="text-sm font-bold ml-2">
                    {selectedData.rating}
                  </span>
                </div>

                <p className="text-sm text-[#596070] leading-7 mt-4">
                  {selectedData.deskripsi}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="bg-[#F8FBFF] p-4 rounded-[12px]">
                    <p className="text-xs text-[#9AA0AA]">Harga</p>

                    <p className="font-bold text-[#70A9F8]">
                      {formatRupiah(selectedData.harga)}
                    </p>
                  </div>

                  <div className="bg-[#F8FBFF] p-4 rounded-[12px]">
                    <p className="text-xs text-[#9AA0AA]">Durasi</p>

                    <p className="font-bold">{selectedData.durasi}</p>
                  </div>
                </div>

                <div className="bg-[#F8FBFF] p-4 rounded-[12px] mt-4">
                  <p className="font-bold text-sm mb-2">Fasilitas</p>

                  {selectedData.fasilitas.map((fasilitas, index) => (
                    <p
                      key={`${fasilitas}-${index}`}
                      className="text-sm text-[#596070] flex gap-2 mt-2"
                    >
                      <FaCheckCircle className="text-[#70A9F8] mt-1" />
                      {fasilitas}
                    </p>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => bukaModal("booking", selectedData)}
                  className="w-full h-11 mt-5 rounded-[11px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2]"
                >
                  Booking Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalType === "booking" && selectedData && (
        <div className="fixed inset-0 z-[1001] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[600px] bg-white rounded-[18px] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between gap-4 mb-5">
              <div>
                <h2 className="text-[22px] font-bold">Buat Booking</h2>

                <p className="text-sm text-[#9AA0AA] mt-1">
                  {selectedData.nama}
                </p>
              </div>

              <button
                type="button"
                onClick={tutupModal}
                className="w-9 h-9 rounded-full bg-[#F4F5F7] flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </div>

            <div className="bg-[#F8FBFF] rounded-[14px] p-4 mb-5">
              <p className="font-bold">{selectedData.nama}</p>

              <p className="text-sm text-[#596070] mt-1">
                {selectedData.lokasi} • {selectedData.durasi}
              </p>

              <p className="font-bold text-[#70A9F8] mt-2">
                {formatRupiah(selectedData.harga)} / orang
              </p>
            </div>

            <form onSubmit={buatBooking} className="space-y-4">
              <div>
                <label className="text-sm font-bold block mb-2">
                  Tanggal Keberangkatan
                </label>

                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={bookingForm.tanggal}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      tanggal: e.target.value,
                    })
                  }
                  className="w-full h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-bold block mb-2">
                  Jumlah Traveler
                </label>

                <input
                  type="number"
                  min="1"
                  value={bookingForm.jumlahTraveler}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      jumlahTraveler: e.target.value,
                    })
                  }
                  className="w-full h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-bold block mb-2">
                  Metode Pembayaran
                </label>

                <select
                  value={bookingForm.metodePembayaran}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      metodePembayaran: e.target.value,
                    })
                  }
                  className="w-full h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none"
                >
                  <option value="QRIS">QRIS</option>
                  <option value="Transfer Bank">Transfer Bank</option>
                  <option value="E-Wallet">E-Wallet</option>
                  <option value="Kartu Kredit">Kartu Kredit</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold block mb-2">
                  Catatan Tambahan
                </label>

                <textarea
                  value={bookingForm.catatan}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      catatan: e.target.value,
                    })
                  }
                  placeholder="Contoh: meminta kamar twin bed"
                  className="w-full min-h-[90px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none resize-none"
                />
              </div>

              <div className="bg-[#EAF4FF] rounded-[12px] p-4">
                <p className="text-xs text-[#9AA0AA]">
                  Estimasi Total Pembayaran
                </p>

                <p className="text-xl font-bold text-[#70A9F8] mt-1">
                  {formatRupiah(
                    selectedData.harga *
                      Number(bookingForm.jumlahTraveler || 1),
                  )}
                </p>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-[11px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2]"
              >
                Buat Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {modalType === "bookingDetail" && selectedData && (
        <div className="fixed inset-0 z-[1000] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[720px] bg-white rounded-[18px] p-6">
            <div className="flex justify-between gap-4 mb-5">
              <div>
                <h2 className="text-[22px] font-bold">Detail Booking</h2>

                <p className="text-sm text-[#9AA0AA] mt-1">
                  {selectedData.kode}
                </p>
              </div>

              <button
                type="button"
                onClick={tutupModal}
                className="w-9 h-9 rounded-full bg-[#F4F5F7] flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F8FBFF] p-4 rounded-[12px]">
                <p className="text-xs text-[#9AA0AA]">Paket</p>
                <p className="font-bold">{selectedData.paket}</p>
              </div>

              <div className="bg-[#F8FBFF] p-4 rounded-[12px]">
                <p className="text-xs text-[#9AA0AA]">Tanggal</p>
                <p className="font-bold">{selectedData.tanggal}</p>
              </div>

              <div className="bg-[#F8FBFF] p-4 rounded-[12px]">
                <p className="text-xs text-[#9AA0AA]">Jumlah Traveler</p>

                <p className="font-bold">{selectedData.jumlahTraveler} orang</p>
              </div>

              <div className="bg-[#F8FBFF] p-4 rounded-[12px]">
                <p className="text-xs text-[#9AA0AA]">Total Harga</p>

                <p className="font-bold">{formatRupiah(selectedData.harga)}</p>
              </div>

              <div className="bg-[#F8FBFF] p-4 rounded-[12px]">
                <p className="text-xs text-[#9AA0AA]">Status Booking</p>

                <p className="font-bold">{selectedData.statusBooking}</p>
              </div>

              <div className="bg-[#F8FBFF] p-4 rounded-[12px]">
                <p className="text-xs text-[#9AA0AA]">Pembayaran</p>

                <p className="font-bold">{selectedData.statusPembayaran}</p>
              </div>

              <div className="bg-[#F8FBFF] p-4 rounded-[12px] md:col-span-2">
                <p className="text-xs text-[#9AA0AA]">Catatan</p>

                <p className="text-sm text-[#596070] mt-1">
                  {selectedData.catatan}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalType === "chat" && (
        <div className="fixed inset-0 z-[1000] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[720px] bg-white rounded-[18px] overflow-hidden">
            <div className="p-5 border-b border-[#EEF1F5] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center">
                  <FaHeadset />
                </div>

                <div>
                  <h2 className="font-bold text-[20px]">Customer Service</h2>

                  <p className="text-xs text-[#9AA0AA]">
                    TravelGo siap membantu
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={tutupModal}
                className="w-9 h-9 rounded-full bg-[#F4F5F7] flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </div>

            <div className="min-h-[320px] max-h-[400px] overflow-y-auto p-5 bg-[#F8FBFF] space-y-3">
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.from === "member" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-[14px] px-4 py-3 text-sm ${
                      chat.from === "member"
                        ? "bg-[#70A9F8] text-white"
                        : "bg-white text-[#596070] border border-[#EEF1F5]"
                    }`}
                  >
                    <p>{chat.text}</p>

                    <p
                      className={`text-[10px] mt-1 ${
                        chat.from === "member"
                          ? "text-white/70"
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
              onSubmit={kirimChat}
              className="p-4 border-t border-[#EEF1F5] flex gap-3"
            >
              <input
                type="text"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder="Tulis pesan..."
                className="flex-1 h-11 px-4 rounded-[12px] border border-[#E8EDF3] outline-none"
              />

              <button
                type="submit"
                className="h-11 px-5 rounded-[12px] bg-[#70A9F8] text-white font-bold text-sm"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
