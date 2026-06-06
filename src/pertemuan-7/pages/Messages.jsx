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
} from "react-icons/fa";

import messagesData from "../data/messages.json";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(messagesData[4]);
  const [search, setSearch] = useState("");
  const [messageText, setMessageText] = useState("");
  const [chatData, setChatData] = useState(messagesData);

  // USE REF
  // chatBodyRef dipakai supaya yang scroll cuma isi chat, bukan halaman web
  const chatBodyRef = useRef(null);

  // input pesan otomatis fokus
  const messageInputRef = useRef(null);

  const filteredMessages = useMemo(() => {
    return chatData.filter((item) => {
      return (
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.preview.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search, chatData]);

  const currentChat = chatData.find((item) => item.id === selectedChat.id);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }

    messageInputRef.current?.focus();
  }, [selectedChat.id, currentChat?.chat.length]);

  const handleSelectChat = (item) => {
    setSelectedChat(item);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage = {
      from: "admin",
      text: messageText,
      time: "Baru saja",
    };

    const updatedChat = chatData.map((item) => {
      if (item.id === selectedChat.id) {
        return {
          ...item,
          preview: messageText,
          waktu: "Baru saja",
          chat: [...item.chat, newMessage],
        };
      }

      return item;
    });

    setChatData(updatedChat);
    setSelectedChat(updatedChat.find((item) => item.id === selectedChat.id));
    setMessageText("");
  };

  const handleEnterSend = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const getInitialColor = (index) => {
    const colors = [
      "bg-[#5A91D6]",
      "bg-[#70A9F8]",
      "bg-[#F06C7A]",
      "bg-[#C9A94B]",
      "bg-[#8BBEFF]",
    ];

    return colors[index % colors.length];
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-hidden">
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

              <button className="w-[46px] h-[46px] rounded-[12px] bg-[#FAFBFC] border border-[#EEF1F5] text-[#596070] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8] hover:shadow-md transition-all duration-300">
                <FaSlidersH />
              </button>
            </div>

            <div className="space-y-2 flex-1 min-h-0 overflow-y-auto pr-1">
              {filteredMessages.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectChat(item)}
                  className={`w-full rounded-[14px] p-3 grid grid-cols-[54px_1fr_70px] gap-3 text-left transition-all duration-300 hover:shadow-md ${
                    selectedChat.id === item.id
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
                        index
                      )} text-white flex items-center justify-center text-sm font-bold`}
                    >
                      {item.initial}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-[#202436] truncate">
                      {item.nama}
                    </h3>

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

            <button className="mt-4 h-[48px] bg-[#70A9F8] text-white rounded-[10px] font-bold shadow-sm hover:bg-[#5D9AF2] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 shrink-0">
              <FaPlus className="text-xs" />
              Pesan Baru
            </button>
          </aside>

          {/* KANAN: ISI CHAT */}
          <section className="bg-white flex flex-col h-full min-h-0">
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
                <button className="w-[40px] h-[40px] rounded-[10px] bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition">
                  <FaPhoneAlt />
                </button>

                <button className="w-[40px] h-[40px] rounded-[10px] bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition">
                  <FaVideo />
                </button>

                <button className="w-[40px] h-[40px] rounded-[10px] bg-white text-[#202436] flex items-center justify-center hover:bg-[#F4F5F7] transition">
                  <FaEllipsisH />
                </button>
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
                      chat.from === "admin" ? "justify-end" : "justify-start"
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
            <div className="p-5 border-t border-[#EEF1F5] bg-white shrink-0">
              <div className="h-[50px] rounded-[12px] bg-[#FAFBFC] border border-[#EEF1F5] flex items-center px-4 gap-3 focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
                <button className="text-[#B9C0CA] hover:text-[#70A9F8] transition">
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

                <button className="text-[#B9C0CA] hover:text-[#70A9F8] transition">
                  <FaPaperclip />
                </button>

                <button
                  onClick={handleSendMessage}
                  className="w-[42px] h-[42px] rounded-[10px] bg-[#70A9F8] text-white flex items-center justify-center hover:bg-[#5D9AF2] hover:shadow-lg transition-all duration-300"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}