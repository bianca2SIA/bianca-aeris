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
  FaKey,
  FaPowerOff,
  FaUserCheck,
  FaHistory,
  FaPaperPlane,
} from "react-icons/fa";

import AlertBox from "../components/AlertBox";
import { usersAPI } from "../../services/usersAPI.js";

const DATA_PER_PAGE = 10;
const STORAGE_KEY = "travelgo_users_final";

const defaultUsers = [
  {
    id: 14,
    name: "bianca bahi",
    email: "bianca@gmail.com",
    role: "User",
    phone: "052629629",
    address: "pekanbaru",
    status: "Aktif",
    createdAt: "2026-06-18",
    lastLogin: "Hari ini",
  },
];

const sourceOptions = [
  "Website",
  "Instagram Ads",
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

const levelOptions = ["Regular", "Silver", "Gold", "Platinum"];

const packageOptions = [
  "Paket Bali Beach Escape",
  "Paket Bromo Sunrise Trip",
  "Paket Lombok Eksotis",
  "Paket Jogja Heritage",
  "Paket Labuan Bajo",
];

const emptyForm = {
  name: "",
  email: "",
  role: "User",
  phone: "",
  address: "",
  status: "Aktif",
  password: "",
};

function createTravelerProfile(user, index) {
  const isMember = user.role === "User";

  return {
    statusMember: isMember ? "Member" : "Admin",
    level: isMember ? levelOptions[index % levelOptions.length] : "-",
    promo: isMember ? (index % 2 === 0 ? "Aktif" : "Tidak Aktif") : "-",
    paket: isMember ? packageOptions[index % packageOptions.length] : "-",
    sourceUser: sourceOptions[index % sourceOptions.length],
    paymentMethod: paymentOptions[index % paymentOptions.length],
    totalTransaksi: 2500000 + index * 750000,
    jumlahBooking: index + 1,
    tanggalBergabung: user.createdAt || "2026-06-18",
    feedback: isMember
      ? "Customer puas dengan informasi paket dan pelayanan TravelGo."
      : "Tidak ada feedback traveler untuk akun admin.",
    komplain: isMember
      ? "Tidak ada komplain aktif."
      : "Tidak ada komplain traveler untuk akun admin.",
    catatan: isMember
      ? "Customer cocok untuk ditawarkan promo member dan paket keluarga."
      : "Akun digunakan untuk mengelola data TravelGo.",
    bookingHistory: isMember
      ? [
          {
            id: 1,
            paket: packageOptions[index % packageOptions.length],
            tanggal: "12 Juni 2026",
            pembayaran: paymentOptions[index % paymentOptions.length],
            total: 2500000 + index * 750000,
            status: "Selesai",
          },
          {
            id: 2,
            paket: "Paket City Tour",
            tanggal: "20 Mei 2026",
            pembayaran: "QRIS",
            total: 1250000 + index * 350000,
            status: index % 2 === 0 ? "Selesai" : "Diproses",
          },
        ]
      : [],
  };
}

function normalizeUsers(data) {
  return data.map((item, index) => {
    const user = {
      ...item,
      id: item.id || Date.now() + index,
      name: item.name || item.nama || "User TravelGo",
      email: item.email || `user${index + 1}@travelgo.com`,
      role: item.role || "User",
      phone: item.phone || item.hp || "-",
      address: item.address || item.alamat || "-",
      status: item.status || "Aktif",
      createdAt: item.createdAt || "2026-06-18",
      lastLogin: item.lastLogin || "Belum ada data",
    };

    return {
      ...user,
      travelerProfile: item.travelerProfile || createTravelerProfile(user, index),
    };
  });
}

function getSavedUsers() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return normalizeUsers(defaultUsers);

  try {
    return normalizeUsers(JSON.parse(savedData));
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return normalizeUsers(defaultUsers);
  }
}

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value || 0));
}

function getRoleStyle(role) {
  if (role === "Admin") return "bg-[#D7ECFF] text-[#4B91E8]";
  return "bg-[#EAF4FF] text-[#70A9F8]";
}

function getStatusStyle(status) {
  if (status === "Aktif") return "bg-[#E9FBEF] text-[#31A05F]";
  return "bg-red-50 text-red-500";
}

function getLevelStyle(level) {
  if (level === "Platinum") return "bg-[#D7ECFF] text-[#4B91E8]";
  if (level === "Gold") return "bg-[#C9A94B] text-white";
  if (level === "Silver") return "bg-[#E1E1E1] text-[#555B66]";
  return "bg-[#EAF4FF] text-[#70A9F8]";
}

function getPromoStyle(promo) {
  if (promo === "Aktif") return "bg-[#EAF4FF] text-[#5A91D6]";
  return "bg-[#F1F1F1] text-[#9AA0AA]";
}

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-[6px] text-[12px] font-bold whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}

function InfoBox({ title, children, className = "" }) {
  return (
    <div className={`bg-[#F8FBFF] rounded-[14px] p-4 ${className}`}>
      <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">{title}</p>
      {children}
    </div>
  );
}

export default function Users() {
  const [users, setUsers] = useState(getSavedUsers);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua Role");
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [dataForm, setDataForm] = useState(emptyForm);

  const [actionMenu, setActionMenu] = useState({ id: null, x: 0, y: 0 });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) return;

    usersAPI
      .fetchUsers()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setUsers(normalizeUsers(data));
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Data API user gagal dimuat, sementara memakai data lokal.");
      });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const filteredUsers = useMemo(() => {
    let data = users;

    if (roleFilter !== "Semua Role") {
      data = data.filter((user) => user.role === roleFilter);
    }

    if (search.trim() !== "") {
      const keyword = search.toLowerCase();

      data = data.filter((user) => {
        return (
          user.name?.toLowerCase().includes(keyword) ||
          user.email?.toLowerCase().includes(keyword) ||
          user.role?.toLowerCase().includes(keyword) ||
          user.phone?.toLowerCase().includes(keyword) ||
          user.address?.toLowerCase().includes(keyword) ||
          user.status?.toLowerCase().includes(keyword) ||
          user.travelerProfile?.paket?.toLowerCase().includes(keyword) ||
          user.travelerProfile?.level?.toLowerCase().includes(keyword)
        );
      });
    }

    return data;
  }, [users, roleFilter, search]);

  const totalData = filteredUsers.length;
  const totalPages = Math.ceil(totalData / DATA_PER_PAGE);
  const startIndex = (currentPage - 1) * DATA_PER_PAGE;
  const endIndex = startIndex + DATA_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
  const selectedActionUser = users.find((item) => item.id === actionMenu.id);

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };

  const closeActionMenu = () => {
    setActionMenu({ id: null, x: 0, y: 0 });
  };

  const openActionMenu = (e, user) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 235;

    if (actionMenu.id === user.id) {
      closeActionMenu();
      return;
    }

    setActionMenu({
      id: user.id,
      x: Math.max(12, rect.right - menuWidth),
      y: rect.bottom + 8,
    });
  };

  const closeModal = () => {
    setModalType("");
    setSelectedUser(null);
    setDataForm(emptyForm);
    closeActionMenu();
  };

  const openCreateForm = () => {
    setDataForm(emptyForm);
    setSelectedUser(null);
    setModalType("form");
    setError("");
    setSuccess("");
    closeActionMenu();
  };

  const openDetailModal = (user) => {
    setSelectedUser(user);
    setModalType("detail");
    closeActionMenu();
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setDataForm({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "User",
      phone: user.phone || "",
      address: user.address || "",
      status: user.status || "Aktif",
      password: "",
    });
    setModalType("form");
    setError("");
    setSuccess("");
    closeActionMenu();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
    closeActionMenu();
  };

  const handleRoleFilter = (role) => {
    setRoleFilter(role);
    setCurrentPage(1);
    setIsRoleOpen(false);
    closeActionMenu();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dataForm.name || !dataForm.email) {
      setError("Nama dan email wajib diisi");
      return;
    }

    const payload = {
      name: dataForm.name,
      email: dataForm.email,
      role: dataForm.role,
      phone: dataForm.phone,
      address: dataForm.address,
      status: dataForm.status,
    };

    if (selectedUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                ...payload,
                travelerProfile: {
                  ...user.travelerProfile,
                  statusMember: payload.role === "User" ? "Member" : "Admin",
                },
              }
            : user
        )
      );
      showSuccess("Data user berhasil diperbarui");
    } else {
      const newUser = {
        id: Date.now(),
        ...payload,
        createdAt: new Date().toISOString().split("T")[0],
        lastLogin: "Belum pernah login",
      };

      setUsers((prev) => [
        {
          ...newUser,
          travelerProfile: createTravelerProfile(newUser, prev.length),
        },
        ...prev,
      ]);
      setCurrentPage(1);
      showSuccess("Data user berhasil ditambahkan");
    }

    closeModal();
  };

  const handleDelete = (user) => {
    const confirmDelete = confirm(`Yakin ingin menghapus user "${user.name}"?`);
    if (!confirmDelete) return;

    setUsers((prev) => prev.filter((item) => item.id !== user.id));
    closeModal();
    showSuccess("Data user berhasil dihapus");
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === "Aktif" ? "Nonaktif" : "Aktif";

    setUsers((prev) =>
      prev.map((item) =>
        item.id === user.id ? { ...item, status: newStatus } : item
      )
    );

    closeActionMenu();
    showSuccess(`Status akun ${user.name} menjadi ${newStatus}`);
  };

  const handleResetPassword = (user) => {
    closeActionMenu();
    showSuccess(`Link reset password untuk ${user.name} berhasil dibuat`);
  };

  const handleSendMessage = (user) => {
    const customer = {
      id: `user-${user.id}`,
      userId: user.id,
      nama: user.name,
      email: user.email,
      hp: user.phone,
      initial: user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      foto: "",
      preview: `Halo ${user.name}, ada yang bisa TravelGo bantu?`,
      waktu: "Baru saja",
      unread: 0,
      status: "online",
      kategori: "Customer",
      memberLevel: user.travelerProfile?.level || "Regular",
      lastPackage: user.travelerProfile?.paket || "Belum ada paket",
      totalTransaction: user.travelerProfile?.totalTransaksi || 0,
      archived: false,
      chat: [
        {
          from: "admin",
          text: `Halo ${user.name}, ada yang bisa TravelGo bantu?`,
          time: "Baru saja",
        },
      ],
    };

    localStorage.setItem(
      "travelgo_selected_message_customer",
      JSON.stringify(customer)
    );

    closeActionMenu();
    showSuccess(`Membuka halaman Messages untuk ${user.name}...`);

    setTimeout(() => {
      window.location.href = "/messages";
    }, 500);
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
      <div className="mb-5">
        <h2 className="text-[17px] font-bold">Kelola Users</h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="w-[330px] h-[44px] bg-white rounded-[12px] flex items-center px-4 gap-3 border border-[#EEF1F5] shadow-sm hover:shadow-md focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
          <FaSearch className="text-[#B9C0CA] text-sm shrink-0" />

          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Cari user..."
            className="w-full bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none text-sm placeholder:text-[#B9C0CA]"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRoleOpen(!isRoleOpen)}
              className="h-[44px] min-w-[145px] px-4 bg-white rounded-[12px] flex items-center justify-between gap-2 text-[#596070] border border-[#EEF1F5] shadow-sm hover:border-[#70A9F8] transition-all duration-200 text-sm font-bold"
            >
              {roleFilter}

              <FaChevronDown
                className={`text-xs text-[#9AA0AA] transition-transform duration-200 ${
                  isRoleOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isRoleOpen && (
              <div className="absolute right-0 top-[50px] w-[160px] bg-white rounded-[12px] shadow-lg border border-[#E8EDF3] p-2 z-30">
                {["Semua Role", "Admin", "User"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleFilter(role)}
                    className={`w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold transition-all duration-200 ${
                      roleFilter === role
                        ? "bg-[#70A9F8] text-white"
                        : "text-[#596070] hover:bg-[#F4F8FF] hover:text-[#70A9F8]"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="h-[44px] px-5 bg-[#70A9F8] hover:bg-[#5D9AF2] text-white rounded-[12px] text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <FaPlus className="text-xs" />
            Tambah User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[14px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full">
        <table className="w-full table-fixed">
          <thead className="bg-[#EAF4FF]">
            <tr className="text-left text-[13px] text-[#8F96A3]">
              {["Nama", "Email", "Role", "Status", "No HP", "Alamat"].map(
                (title, index) => (
                  <th
                    key={title}
                    className={`px-6 py-4 font-semibold ${
                      ["w-[23%]", "w-[21%]", "w-[11%]", "w-[13%]", "w-[14%]", "w-[11%]"][index]
                    }`}
                  >
                    <div className="flex items-center gap-2 hover:text-[#70A9F8] transition">
                      {title} <FaSort className="text-[10px]" />
                    </div>
                  </th>
                )
              )}

              <th className="px-6 py-4 font-semibold w-[7%]">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={user.id}
                className="group border-b border-[#EEF1F5] hover:bg-gradient-to-r hover:from-[#F8FBFF] hover:to-white hover:shadow-md hover:-translate-y-[2px] transition-all duration-300"
              >
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => openDetailModal(user)}
                    className="flex items-center gap-3 text-left w-full"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${
                        startIndex + index + 20
                      }`}
                      alt={user.name}
                      className="w-[38px] h-[38px] rounded-full object-cover bg-[#EAF4FF] ring-2 ring-transparent group-hover:ring-[#70A9F8]/30 group-hover:scale-105 transition-all duration-300"
                    />

                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-[#202436] truncate group-hover:text-[#70A9F8] transition">
                        {user.name}
                      </p>
                      <p className="text-[12px] text-[#9AA0AA] truncate">
                        ID User: {user.id}
                      </p>
                    </div>
                  </button>
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070] group-hover:text-[#202436] transition truncate">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <Badge
                    className={`shadow-sm group-hover:shadow-md transition-all duration-300 ${getRoleStyle(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </Badge>
                </td>

                <td className="px-6 py-4">
                  <Badge
                    className={`min-w-[76px] shadow-sm group-hover:shadow-md transition-all duration-300 ${getStatusStyle(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </Badge>
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070] group-hover:text-[#202436] transition whitespace-nowrap">
                  {user.phone || "-"}
                </td>

                <td className="px-6 py-4 text-[14px] font-semibold text-[#596070] group-hover:text-[#202436] transition truncate">
                  {user.address || "-"}
                </td>

                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={(e) => openActionMenu(e, user)}
                    className="w-[34px] h-[34px] rounded-[8px] bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition"
                  >
                    <FaEllipsisH />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentUsers.length === 0 && (
          <div className="min-h-[220px] flex flex-col items-center justify-center text-center">
            <div className="w-[54px] h-[54px] rounded-full bg-[#EAF4FF] text-[#70A9F8] flex items-center justify-center mb-3">
              <FaSearch />
            </div>
            <h3 className="font-bold text-[#202436]">User tidak ditemukan</h3>
            <p className="text-[13px] text-[#9AA0AA] mt-1">
              Coba ubah keyword pencarian atau filter role.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between px-6 py-5 text-sm text-[#9AA0AA]">
          <div className="flex items-center gap-2">
            <span>Menampilkan</span>

            <button className="h-[34px] px-3 rounded-[8px] bg-[#F4F5F7] font-semibold text-[#596070]">
              {totalData === 0 ? 0 : startIndex + 1} -{" "}
              {Math.min(endIndex, totalData)}
            </button>

            <span>dari {totalData} user</span>
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

            {Array.from({ length: totalPages || 1 }, (_, index) => index + 1).map(
              (page) => (
                <button
                  type="button"
                  key={page}
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
              )
            )}

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

      {actionMenu.id && selectedActionUser && (
        <div
          className="fixed w-[235px] bg-white rounded-[14px] shadow-2xl border border-[#E8EDF3] p-2 z-[99999]"
          style={{
            top: `${actionMenu.y}px`,
            left: `${actionMenu.x}px`,
          }}
        >
          <ActionButton icon={<FaEye />} onClick={() => openDetailModal(selectedActionUser)}>
            Lihat Detail
          </ActionButton>

          <ActionButton icon={<FaEdit />} onClick={() => openEditModal(selectedActionUser)}>
            Edit User
          </ActionButton>

          {selectedActionUser.role === "User" && (
            <ActionButton icon={<FaPaperPlane />} onClick={() => handleSendMessage(selectedActionUser)}>
              Kirim Pesan
            </ActionButton>
          )}

          <ActionButton
            icon={<FaKey />}
            onClick={() => handleResetPassword(selectedActionUser)}
            className="hover:bg-[#FFF4D8] hover:text-[#B88700]"
          >
            Reset Password
          </ActionButton>

          <ActionButton
            icon={selectedActionUser.status === "Aktif" ? <FaPowerOff /> : <FaUserCheck />}
            onClick={() => handleToggleStatus(selectedActionUser)}
          >
            {selectedActionUser.status === "Aktif" ? "Nonaktifkan Akun" : "Aktifkan Akun"}
          </ActionButton>

          <div className="h-[1px] bg-[#EEF1F5] my-2"></div>

          <ActionButton
            icon={<FaTrash />}
            onClick={() => handleDelete(selectedActionUser)}
            className="text-red-500 hover:bg-red-50"
          >
            Hapus User
          </ActionButton>
        </div>
      )}

      {modalType === "form" && (
        <UserFormModal
          selectedUser={selectedUser}
          dataForm={dataForm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}

      {selectedUser && modalType === "detail" && (
        <UserDetailModal
          user={selectedUser}
          closeModal={closeModal}
          openEditModal={openEditModal}
          handleSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}

function ActionButton({ children, icon, onClick, className = "hover:bg-[#EAF4FF] hover:text-[#70A9F8]" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-[10px] text-sm font-semibold text-[#596070] flex items-center gap-3 transition ${className}`}
    >
      <span className="text-sm shrink-0">{icon}</span>
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
}

function UserFormModal({ selectedUser, dataForm, handleChange, handleSubmit, closeModal }) {
  return (
    <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-6">
      <div className="w-full max-w-[760px] bg-white rounded-[18px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-[20px] font-bold">
              {selectedUser ? "Edit User" : "Tambah User"}
            </h2>
            <p className="text-[13px] text-[#9AA0AA] mt-1">
              {selectedUser
                ? "Ubah data akun user TravelGo."
                : "Isi data akun user baru TravelGo."}
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={dataForm.name}
            onChange={handleChange}
            placeholder="Nama lengkap"
            className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
          />

          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="Email"
            className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
          />

          <select
            name="role"
            value={dataForm.role}
            onChange={handleChange}
            className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <select
            name="status"
            value={dataForm.status}
            onChange={handleChange}
            className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
          >
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>

          <input
            type="text"
            name="phone"
            value={dataForm.phone}
            onChange={handleChange}
            placeholder="Nomor HP"
            className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
          />

          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder={selectedUser ? "Password baru (opsional)" : "Password akun"}
            className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
          />

          <textarea
            name="address"
            value={dataForm.address}
            onChange={handleChange}
            placeholder="Alamat"
            className="md:col-span-2 min-h-[90px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
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
              {selectedUser ? "Update User" : "Simpan User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UserDetailModal({ user, closeModal, openEditModal, handleSendMessage }) {
  const profile = user.travelerProfile;

  return (
    <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-6">
      <div className="w-full max-w-[880px] bg-white rounded-[18px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <img
              src={`https://i.pravatar.cc/100?u=${user.email}`}
              alt={user.name}
              className="w-[62px] h-[62px] rounded-full object-cover"
            />

            <div>
              <h2 className="text-[22px] font-bold text-[#202436]">{user.name}</h2>
              <p className="text-[13px] text-[#9AA0AA]">{user.email}</p>

              <div className="flex items-center gap-2 mt-2">
                <Badge className={getRoleStyle(user.role)}>{user.role}</Badge>
                <Badge className={`min-w-[76px] ${getStatusStyle(user.status)}`}>
                  {user.status}
                </Badge>
              </div>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <InfoBox title="Nomor HP">
            <p className="text-[14px] font-bold text-[#202436]">{user.phone || "-"}</p>
          </InfoBox>

          <InfoBox title="Tanggal Dibuat">
            <p className="text-[14px] font-bold text-[#202436]">{user.createdAt}</p>
          </InfoBox>

          <InfoBox title="Terakhir Login">
            <p className="text-[14px] font-bold text-[#202436]">{user.lastLogin}</p>
          </InfoBox>

          <InfoBox title="Alamat" className="md:col-span-3">
            <p className="text-[14px] font-bold text-[#202436]">{user.address || "-"}</p>
          </InfoBox>
        </div>

        {user.role === "User" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
              <InfoBox title="Membership">
                <p className="text-[14px] font-bold text-[#202436]">{profile.statusMember}</p>
              </InfoBox>

              <InfoBox title="Level">
                <Badge className={getLevelStyle(profile.level)}>{profile.level}</Badge>
              </InfoBox>

              <InfoBox title="Promo">
                <Badge className={`min-w-[96px] ${getPromoStyle(profile.promo)}`}>
                  {profile.promo}
                </Badge>
              </InfoBox>

              <InfoBox title="Sumber User">
                <p className="text-[14px] font-bold text-[#202436]">{profile.sourceUser}</p>
              </InfoBox>

              <InfoBox title="Paket Terakhir">
                <p className="text-[14px] font-bold text-[#202436]">{profile.paket}</p>
              </InfoBox>

              <InfoBox title="Total Transaksi">
                <p className="text-[14px] font-bold text-[#202436]">
                  {formatRupiah(profile.totalTransaksi)}
                </p>
              </InfoBox>

              <InfoBox title="Jumlah Booking">
                <p className="text-[14px] font-bold text-[#202436]">
                  {profile.jumlahBooking} booking
                </p>
              </InfoBox>

              <InfoBox title="Pembayaran">
                <p className="text-[14px] font-bold text-[#202436]">
                  {profile.paymentMethod}
                </p>
              </InfoBox>
            </div>

            <div className="bg-white rounded-[14px] border border-[#EEF1F5] overflow-hidden mb-5">
              <div className="px-4 py-3 bg-[#EAF4FF] flex items-center gap-2">
                <FaHistory className="text-[#70A9F8]" />
                <h3 className="text-[15px] font-bold text-[#202436]">
                  Riwayat Booking
                </h3>
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
                    {profile.bookingHistory.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-[#EEF1F5] hover:bg-[#F8FBFF] transition"
                      >
                        <td className="px-4 py-3 text-[13px] font-bold text-[#202436]">
                          {booking.paket}
                        </td>
                        <td className="px-4 py-3 text-[13px] text-[#596070]">
                          {booking.tanggal}
                        </td>
                        <td className="px-4 py-3 text-[13px] text-[#596070]">
                          {booking.pembayaran}
                        </td>
                        <td className="px-4 py-3 text-[13px] text-[#596070]">
                          {formatRupiah(booking.total)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            className={
                              booking.status === "Selesai"
                                ? "bg-[#EAF4FF] text-[#5A91D6]"
                                : "bg-[#FFF4D8] text-[#B88700]"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <InfoBox title="Feedback Terakhir">
                <p className="text-[13px] leading-6 text-[#596070]">{profile.feedback}</p>
              </InfoBox>

              <InfoBox title="Komplain">
                <p className="text-[13px] leading-6 text-[#596070]">{profile.komplain}</p>
              </InfoBox>

              <InfoBox title="Catatan Admin">
                <p className="text-[13px] leading-6 text-[#596070]">{profile.catatan}</p>
              </InfoBox>
            </div>
          </>
        ) : (
          <div className="bg-[#F8FBFF] rounded-[14px] p-5 mb-6">
            <h3 className="font-bold text-[#202436] mb-2">Akun Admin</h3>
            <p className="text-[13px] leading-6 text-[#596070]">
              User ini adalah akun admin, jadi tidak memiliki data traveler,
              riwayat booking, promo member, atau komplain customer.
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          {user.role === "User" && (
            <button
              type="button"
              onClick={() => handleSendMessage(user)}
              className="h-[42px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition flex items-center gap-2"
            >
              <FaPaperPlane className="text-xs" />
              Kirim Pesan
            </button>
          )}

          <button
            type="button"
            onClick={() => openEditModal(user)}
            className="h-[42px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition flex items-center gap-2"
          >
            <FaEdit className="text-xs" />
            Edit User
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="h-[42px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
