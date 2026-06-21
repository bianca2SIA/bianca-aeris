import { useEffect, useMemo, useRef, useState } from "react";

import {
  FaSearch,
  FaSlidersH,
  FaEllipsisH,
  FaPaperclip,
  FaPaperPlane,
  FaSmile,
  FaCheckDouble,
  FaPhoneAlt,
  FaVideo,
  FaPlus,
  FaTimes,
  FaUser,
  FaArchive,
  FaTrash,
  FaUndo,
  FaEnvelopeOpen,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

import messagesData from "../data/messages.json";

const quickReplies = [
  "Baik, kami akan bantu cek ketersediaan paket tersebut.",
  "Terima kasih sudah menghubungi TravelGo. Kami akan segera proses permintaan Anda.",
  "Untuk detail itinerary dan harga lengkap, kami akan kirimkan melalui email.",
  "Mohon maaf atas kendalanya. Tim kami akan melakukan pengecekan terlebih dahulu.",
  "Baik, kami akan follow up kembali setelah mendapatkan konfirmasi dari tim terkait.",
];

function normalizeMessages(data) {
  return data.map((item, index) => ({
    ...item,
    id: item.id || index + 1,
    nama: item.nama || "Customer TravelGo",
    email: item.email || `customer${index + 1}@gmail.com`,
    hp: item.hp || `08${String(1234567890 + index).slice(0, 10)}`,
    initial:
      item.initial ||
      item.nama
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() ||
      "TG",
    preview: item.preview || "Belum ada pesan.",
    waktu: item.waktu || "Baru saja",
    unread: item.unread || 0,
    status: item.status || "last seen recently",
    kategori: item.kategori || (index % 2 === 0 ? "Booking" : "Paket Travel"),
    memberLevel:
      item.memberLevel || (index % 3 === 0 ? "Gold Member" : "Regular"),
    lastPackage: item.lastPackage || "Travel Package",
    totalTransaction: item.totalTransaction || 2500000 + index * 750000,
    archived: item.archived || false,
    chat: item.chat || [],
  }));
}

const STORAGE_KEY = "travelgo_messages";

const filterOptions = [
  "Semua Chat",
  "Belum Dibaca",
  "Sudah Dibaca",
  "Butuh Balasan",
  "Booking",
  "Komplain",
  "Diarsipkan",
];

const emptyMessageForm = {
  nama: "",
  email: "",
  hp: "",
  kategori: "Booking",
  pesan: "",
};

const initialColors = [
  "bg-[#5A91D6]",
  "bg-[#70A9F8]",
  "bg-[#F06C7A]",
  "bg-[#C9A94B]",
  "bg-[#8BBEFF]",
];

function loadMessages() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return normalizeMessages(messagesData);

  try {
    return normalizeMessages(JSON.parse(savedData));
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return normalizeMessages(messagesData);
  }
}

function getSelectedChatId(data) {
  return data[4]?.id || data[0]?.id;
}

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export default function Messages() {
  const [chatData, setChatData] = useState(() => loadMessages());
  const [selectedChatId, setSelectedChatId] = useState(() =>
    getSelectedChatId(loadMessages()),
  );

  const [search, setSearch] = useState("");
  const [messageText, setMessageText] = useState("");
  const [filter, setFilter] = useState("Semua Chat");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  const [modalType, setModalType] = useState("");
  const [notification, setNotification] = useState("");

  const [newMessageForm, setNewMessageForm] = useState(emptyMessageForm);

  const chatBodyRef = useRef(null);
  const messageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const currentChat =
    chatData.find((item) => item.id === selectedChatId) || chatData[0];

  const filteredMessages = useMemo(() => {
    let data = chatData;

    if (filter === "Diarsipkan") {
      data = data.filter((item) => item.archived);
    } else {
      data = data.filter((item) => !item.archived);
    }

    if (filter === "Belum Dibaca") {
      data = data.filter((item) => item.unread > 0);
    }

    if (filter === "Sudah Dibaca") {
      data = data.filter((item) => item.unread === 0);
    }

    if (filter === "Butuh Balasan") {
      data = data.filter((item) => {
        const lastChat = item.chat?.[item.chat.length - 1];
        return lastChat?.from === "customer";
      });
    }

    if (filter === "Komplain") {
      data = data.filter((item) => item.kategori === "Komplain");
    }

    if (filter === "Booking") {
      data = data.filter((item) => item.kategori === "Booking");
    }

    if (search.trim() !== "") {
      const keyword = search.toLowerCase();

      data = data.filter((item) => {
        const matchChat = item.chat?.some((chat) =>
          chat.text?.toLowerCase().includes(keyword),
        );

        return (
          item.nama?.toLowerCase().includes(keyword) ||
          item.preview?.toLowerCase().includes(keyword) ||
          item.email?.toLowerCase().includes(keyword) ||
          item.hp?.toLowerCase().includes(keyword) ||
          item.kategori?.toLowerCase().includes(keyword) ||
          item.lastPackage?.toLowerCase().includes(keyword) ||
          matchChat
        );
      });
    }

    return data;
  }, [search, chatData, filter]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatData));
  }, [chatData]);

  useEffect(() => {
    if (!currentChat && chatData.length > 0) {
      setSelectedChatId(chatData[0].id);
    }
  }, [chatData, currentChat]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }

    messageInputRef.current?.focus();
  }, [selectedChatId, currentChat?.chat?.length]);

  const showNotification = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(""), 2500);
  };

  const updateChat = (chatId, callback) => {
    setChatData((prev) =>
      prev.map((item) => (item.id === chatId ? callback(item) : item)),
    );
  };

  const handleNewMessageChange = (name, value) => {
    setNewMessageForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChat = (item) => {
    setSelectedChatId(item.id);
    setIsActionOpen(false);

    updateChat(item.id, (chat) => ({
      ...chat,
      unread: 0,
    }));
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !currentChat) return;

    const newMessage = {
      from: "admin",
      text: messageText,
      time: "Baru saja",
    };

    updateChat(currentChat.id, (item) => ({
      ...item,
      preview: messageText,
      waktu: "Baru saja",
      unread: 0,
      status: "online",
      chat: [...item.chat, newMessage],
    }));

    setMessageText("");
    setIsTemplateOpen(false);
  };

  const handleEnterSend = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleAttachment = (e) => {
    const file = e.target.files?.[0];
    if (!file || !currentChat) return;

    const newMessage = {
      from: "admin",
      text: `📎 File terkirim: ${file.name}`,
      time: "Baru saja",
    };

    updateChat(currentChat.id, (item) => ({
      ...item,
      preview: `File terkirim: ${file.name}`,
      waktu: "Baru saja",
      unread: 0,
      chat: [...item.chat, newMessage],
    }));

    e.target.value = "";
    showNotification("File berhasil dilampirkan ke chat");
  };

  const handleCall = () => {
    showNotification(`Memulai panggilan dengan ${currentChat.nama}...`);
  };

  const handleVideoCall = () => {
    showNotification(`Memulai video call dengan ${currentChat.nama}...`);
  };

  const handleMarkUnread = () => {
    updateChat(currentChat.id, (item) => ({
      ...item,
      unread: item.unread > 0 ? 0 : 1,
    }));

    setIsActionOpen(false);
  };

  const handleArchive = () => {
    updateChat(currentChat.id, (item) => ({
      ...item,
      archived: !item.archived,
    }));

    setIsActionOpen(false);
    showNotification(
      currentChat.archived
        ? "Chat berhasil dipulihkan"
        : "Chat berhasil diarsipkan",
    );
  };

  const handleDeleteChat = () => {
    const confirmDelete = confirm(
      `Yakin ingin menghapus chat dengan ${currentChat.nama}?`,
    );

    if (!confirmDelete) return;

    const remainingChats = chatData.filter(
      (item) => item.id !== currentChat.id,
    );

    setChatData(remainingChats);
    setSelectedChatId(remainingChats[0]?.id);
    setIsActionOpen(false);

    showNotification("Chat berhasil dihapus");
  };

  const handleCreateNewMessage = (e) => {
    e.preventDefault();

    if (!newMessageForm.nama || !newMessageForm.pesan) {
      alert("Nama customer dan pesan wajib diisi");
      return;
    }

    const initial = newMessageForm.nama
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newChat = {
      id: Date.now(),
      nama: newMessageForm.nama,
      email: newMessageForm.email || "-",
      hp: newMessageForm.hp || "-",
      initial,
      foto: "",
      preview: newMessageForm.pesan,
      waktu: "Baru saja",
      unread: 0,
      status: "online",
      kategori: newMessageForm.kategori,
      memberLevel: "Regular",
      lastPackage: "Belum ada paket",
      totalTransaction: 0,
      archived: false,
      chat: [
        {
          from: "admin",
          text: newMessageForm.pesan,
          time: "Baru saja",
        },
      ],
    };

    setChatData((prev) => [newChat, ...prev]);
    setSelectedChatId(newChat.id);

    setNewMessageForm(emptyMessageForm);

    setModalType("");
    showNotification("Pesan baru berhasil dibuat");
  };

  const handleResetMessages = () => {
    const confirmReset = confirm("Reset data chat ke data awal?");
    if (!confirmReset) return;

    localStorage.removeItem(STORAGE_KEY);

    const defaultData = normalizeMessages(messagesData);
    setChatData(defaultData);
    setSelectedChatId(getSelectedChatId(defaultData));
    setIsActionOpen(false);
  };

  const getInitialColor = (index) => {
    return initialColors[index % initialColors.length];
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-hidden">
      {notification && (
        <div className="fixed top-5 right-5 z-[9999] bg-[#202436] text-white px-5 py-3 rounded-[12px] shadow-xl text-sm font-semibold">
          {notification}
        </div>
      )}

      <div className="h-[calc(100vh-132px)] min-h-[620px] bg-white rounded-[18px] shadow-sm border border-[#E8EDF3] overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="grid grid-cols-[420px_1fr] h-full min-h-0">
          {/* KIRI: LIST CHAT */}
          <aside className="border-r border-[#EEF1F5] bg-white p-5 flex flex-col min-h-0">
            <div className="flex items-center gap-3 mb-5 shrink-0">
              <div className="flex-1 h-[44px] bg-white rounded-[12px] flex items-center px-4 gap-3 border border-[#EEF1F5] shadow-sm hover:shadow-md focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
                <FaSearch className="text-[#B9C0CA] text-sm shrink-0" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama atau chat..."
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
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-[46px] h-[46px] rounded-[12px] bg-[#FAFBFC] border border-[#EEF1F5] text-[#596070] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8] hover:shadow-md transition-all duration-300"
                >
                  <FaSlidersH />
                </button>

                {isFilterOpen && (
                  <div className="absolute right-0 top-[54px] w-[190px] bg-white rounded-[12px] shadow-xl border border-[#E8EDF3] p-2 z-40">
                    {filterOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setFilter(item);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold transition ${
                          filter === item
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
            </div>

            <div className="mb-3 flex items-center justify-between shrink-0">
              <p className="text-[12px] text-[#9AA0AA] font-semibold">
                Filter: {filter}
              </p>

              <p className="text-[12px] text-[#70A9F8] font-bold">
                {filteredMessages.length} chat
              </p>
            </div>

            <div className="space-y-2 flex-1 min-h-0 overflow-y-auto pr-1">
              {filteredMessages.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectChat(item)}
                  className={`w-full rounded-[14px] p-3 grid grid-cols-[54px_1fr_70px] gap-3 text-left transition-all duration-300 hover:shadow-md ${
                    currentChat?.id === item.id
                      ? "bg-[#EAF4FF]"
                      : "bg-white hover:bg-[#F8FBFF]"
                  }`}
                >
                  {item.foto ? (
                    <img
                      src={item.foto}
                      alt={item.nama}
                      className="w-[46px] h-[46px] rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-[46px] h-[46px] rounded-full ${getInitialColor(
                        index,
                      )} text-white flex items-center justify-center text-sm font-bold`}
                    >
                      {item.initial}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-bold text-[#202436] truncate">
                        {item.nama}
                      </h3>

                      {item.archived && (
                        <FaArchive className="text-[#9AA0AA] text-[11px]" />
                      )}
                    </div>

                    <p className="text-[13px] text-[#8F96A3] leading-5 line-clamp-2">
                      {item.preview}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <span className="text-[12px] text-[#70A9F8] font-semibold">
                      {item.waktu}
                    </span>

                    {item.unread > 0 && (
                      <span className="w-[22px] h-[22px] rounded-[6px] bg-[#70A9F8] text-white text-[12px] font-bold flex items-center justify-center">
                        {item.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))}

              {filteredMessages.length === 0 && (
                <div className="text-center text-[#9AA0AA] text-sm py-10">
                  Chat tidak ditemukan.
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setModalType("new")}
              className="mt-4 h-[48px] bg-[#70A9F8] text-white rounded-[10px] font-bold shadow-sm hover:bg-[#5D9AF2] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 shrink-0"
            >
              <FaPlus className="text-xs" />
              Pesan Baru
            </button>
          </aside>

          {/* KANAN: ISI CHAT */}
          <section className="bg-white flex flex-col h-full min-h-0">
            {currentChat ? (
              <>
                {/* HEADER CHAT */}
                <div className="h-[88px] px-6 border-b border-[#EEF1F5] flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-4">
                    {currentChat.foto ? (
                      <img
                        src={currentChat.foto}
                        alt={currentChat.nama}
                        className="w-[48px] h-[48px] rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-[48px] h-[48px] rounded-full bg-[#70A9F8] text-white flex items-center justify-center font-bold">
                        {currentChat.initial}
                      </div>
                    )}

                    <div>
                      <h2 className="text-[18px] font-bold text-[#202436]">
                        {currentChat.nama}
                      </h2>
                      <p className="text-[12px] text-[#8F96A3]">
                        {currentChat.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCall}
                      className="w-[40px] h-[40px] rounded-[10px] bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition"
                    >
                      <FaPhoneAlt />
                    </button>

                    <button
                      type="button"
                      onClick={handleVideoCall}
                      className="w-[40px] h-[40px] rounded-[10px] bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition"
                    >
                      <FaVideo />
                    </button>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsActionOpen(!isActionOpen)}
                        className="w-[40px] h-[40px] rounded-[10px] bg-white text-[#202436] flex items-center justify-center hover:bg-[#F4F5F7] transition"
                      >
                        <FaEllipsisH />
                      </button>

                      {isActionOpen && (
                        <div className="absolute right-0 top-[48px] w-[220px] bg-white rounded-[12px] shadow-xl border border-[#E8EDF3] p-2 z-50">
                          <button
                            type="button"
                            onClick={() => {
                              setModalType("detail");
                              setIsActionOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] flex items-center gap-2"
                          >
                            <FaUser className="text-xs" />
                            Detail Customer
                          </button>

                          <button
                            type="button"
                            onClick={handleMarkUnread}
                            className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] flex items-center gap-2"
                          >
                            {currentChat.unread > 0 ? (
                              <>
                                <FaEnvelopeOpen className="text-xs" />
                                Tandai Sudah Dibaca
                              </>
                            ) : (
                              <>
                                <FaEnvelope className="text-xs" />
                                Tandai Belum Dibaca
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleArchive}
                            className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] flex items-center gap-2"
                          >
                            {currentChat.archived ? (
                              <>
                                <FaUndo className="text-xs" />
                                Pulihkan Chat
                              </>
                            ) : (
                              <>
                                <FaArchive className="text-xs" />
                                Arsipkan Chat
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleResetMessages}
                            className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-[#596070] hover:bg-[#F4F8FF] flex items-center gap-2"
                          >
                            <FaUndo className="text-xs" />
                            Reset Data Chat
                          </button>

                          <div className="h-[1px] bg-[#EEF1F5] my-2"></div>

                          <button
                            type="button"
                            onClick={handleDeleteChat}
                            className="w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center gap-2"
                          >
                            <FaTrash className="text-xs" />
                            Hapus Chat
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* BODY CHAT YANG SCROLL */}
                <div
                  ref={chatBodyRef}
                  className="flex-1 min-h-0 p-6 overflow-y-auto bg-white"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-[#EEF1F5] flex-1"></div>
                    <span className="text-[12px] text-[#A7AFBA] font-semibold">
                      Kemarin
                    </span>
                    <div className="h-px bg-[#EEF1F5] flex-1"></div>
                  </div>

                  <div className="space-y-6">
                    {currentChat.chat.map((chat, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 ${
                          chat.from === "admin"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {chat.from === "customer" && (
                          <>
                            {currentChat.foto ? (
                              <img
                                src={currentChat.foto}
                                alt={currentChat.nama}
                                className="w-[32px] h-[32px] rounded-full object-cover mt-1"
                              />
                            ) : (
                              <div className="w-[32px] h-[32px] rounded-full bg-[#70A9F8] text-white flex items-center justify-center text-xs font-bold mt-1">
                                {currentChat.initial}
                              </div>
                            )}
                          </>
                        )}

                        <div
                          className={`max-w-[560px] ${
                            chat.from === "admin" ? "text-right" : "text-left"
                          }`}
                        >
                          <div
                            className={`px-4 py-3 rounded-[10px] text-[14px] leading-6 shadow-sm ${
                              chat.from === "admin"
                                ? "bg-[#B9D8FF] text-[#36506D]"
                                : "bg-[#F1F2F4] text-[#596070]"
                            }`}
                          >
                            {chat.text}
                          </div>

                          <div
                            className={`mt-2 flex items-center gap-2 text-[12px] text-[#8F96A3] ${
                              chat.from === "admin"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <span>{chat.time}</span>
                            {chat.from === "admin" && (
                              <FaCheckDouble className="text-[11px]" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* INPUT CHAT */}
                <div className="p-5 border-t border-[#EEF1F5] bg-white shrink-0 relative">
                  {isTemplateOpen && (
                    <div className="absolute left-5 bottom-[78px] w-[420px] bg-white rounded-[14px] shadow-xl border border-[#E8EDF3] p-3 z-40">
                      <p className="text-[13px] font-bold text-[#202436] mb-2">
                        Template Balasan Cepat
                      </p>

                      <div className="space-y-2">
                        {quickReplies.map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setMessageText(item);
                              setIsTemplateOpen(false);
                              messageInputRef.current?.focus();
                            }}
                            className="w-full text-left px-3 py-2 rounded-[8px] text-[13px] leading-5 text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="h-[50px] rounded-[12px] bg-[#FAFBFC] border border-[#EEF1F5] flex items-center px-4 gap-3 focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
                    <button
                      type="button"
                      onClick={() => setIsTemplateOpen(!isTemplateOpen)}
                      className="text-[#B9C0CA] hover:text-[#70A9F8] transition"
                    >
                      <FaSmile />
                    </button>

                    <input
                      ref={messageInputRef}
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleEnterSend}
                      placeholder="Ketik pesan..."
                      className="
                        flex-1
                        bg-transparent
                        border-none
                        outline-none
                        ring-0
                        focus:outline-none
                        focus:ring-0
                        focus:border-none
                        focus:shadow-none
                        text-sm
                        placeholder:text-[#B9C0CA]
                      "
                    />

                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleAttachment}
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#B9C0CA] hover:text-[#70A9F8] transition"
                    >
                      <FaPaperclip />
                    </button>

                    <button
                      type="button"
                      onClick={handleSendMessage}
                      className="w-[42px] h-[42px] rounded-[10px] bg-[#70A9F8] text-white flex items-center justify-center hover:bg-[#5D9AF2] hover:shadow-lg transition-all duration-300"
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-[#9AA0AA]">
                Tidak ada chat yang tersedia.
              </div>
            )}
          </section>
        </div>
      </div>

      {/* MODAL PESAN BARU */}
      {modalType === "new" && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="w-full max-w-[620px] bg-white rounded-[18px] shadow-2xl p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[20px] font-bold">Pesan Baru</h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Mulai percakapan baru dengan customer TravelGo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalType("")}
                className="w-[36px] h-[36px] rounded-full bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition"
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={handleCreateNewMessage}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                value={newMessageForm.nama}
                onChange={(e) => handleNewMessageChange("nama", e.target.value)}
                placeholder="Nama customer"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="email"
                value={newMessageForm.email}
                onChange={(e) =>
                  handleNewMessageChange("email", e.target.value)
                }
                placeholder="Email customer"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <input
                type="text"
                value={newMessageForm.hp}
                onChange={(e) => handleNewMessageChange("hp", e.target.value)}
                placeholder="Nomor HP"
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              />

              <select
                value={newMessageForm.kategori}
                onChange={(e) =>
                  handleNewMessageChange("kategori", e.target.value)
                }
                className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8]"
              >
                <option value="Booking">Booking</option>
                <option value="Paket Travel">Paket Travel</option>
                <option value="Komplain">Komplain</option>
                <option value="Corporate Trip">Corporate Trip</option>
              </select>

              <textarea
                value={newMessageForm.pesan}
                onChange={(e) =>
                  handleNewMessageChange("pesan", e.target.value)
                }
                placeholder="Tulis pesan..."
                className="md:col-span-2 min-h-[120px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none"
              />

              <div className="md:col-span-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalType("")}
                  className="h-[44px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] transition"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="h-[44px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition"
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETAIL CUSTOMER */}
      {modalType === "detail" && currentChat && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="w-full max-w-[620px] bg-white rounded-[18px] shadow-2xl p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[20px] font-bold">Detail Customer</h2>
                <p className="text-[13px] text-[#9AA0AA] mt-1">
                  Informasi CRM customer TravelGo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalType("")}
                className="w-[36px] h-[36px] rounded-full bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-5">
              {currentChat.foto ? (
                <img
                  src={currentChat.foto}
                  alt={currentChat.nama}
                  className="w-[58px] h-[58px] rounded-full object-cover"
                />
              ) : (
                <div className="w-[58px] h-[58px] rounded-full bg-[#70A9F8] text-white flex items-center justify-center font-bold">
                  {currentChat.initial}
                </div>
              )}

              <div>
                <h3 className="text-[18px] font-bold text-[#202436]">
                  {currentChat.nama}
                </h3>
                <p className="text-[13px] text-[#9AA0AA]">
                  {currentChat.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
              <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                  Nomor HP
                </p>
                <p className="text-[14px] font-bold text-[#202436]">
                  {currentChat.hp}
                </p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                  Kategori Chat
                </p>
                <p className="text-[14px] font-bold text-[#202436]">
                  {currentChat.kategori}
                </p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                  Membership
                </p>
                <p className="text-[14px] font-bold text-[#202436]">
                  {currentChat.memberLevel}
                </p>
              </div>

              <div className="bg-[#F8FBFF] rounded-[12px] p-4">
                <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                  Total Transaksi
                </p>
                <p className="text-[14px] font-bold text-[#202436]">
                  {formatRupiah(currentChat.totalTransaction)}
                </p>
              </div>

              <div className="md:col-span-2 bg-[#F8FBFF] rounded-[12px] p-4">
                <p className="text-[12px] text-[#9AA0AA] font-semibold mb-1">
                  Paket Terakhir
                </p>
                <p className="text-[14px] font-bold text-[#202436]">
                  {currentChat.lastPackage}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setModalType("");
                  showNotification("Riwayat booking customer sedang dibuka...");
                }}
                className="h-[42px] px-5 rounded-[10px] bg-[#F4F5F7] text-[#596070] text-sm font-bold hover:bg-[#EAF4FF] transition flex items-center gap-2"
              >
                <FaCheckCircle className="text-xs" />
                Riwayat Booking
              </button>

              <button
                type="button"
                onClick={() => setModalType("")}
                className="h-[42px] px-5 rounded-[10px] bg-[#70A9F8] text-white text-sm font-bold hover:bg-[#5D9AF2] transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
