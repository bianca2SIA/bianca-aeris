import { useState } from "react";

import {
  FaCalendarAlt,
  FaChevronDown,
  FaEllipsisH,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaTrain,
  FaUsers,
} from "react-icons/fa";

const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const eventDetails = {
  "Liburan Romantis": {
    tujuan: "Bali, Indonesia",
    durasi: "6 Hari / 5 Malam",
    tanggal: "2 - 7 Juli 2028",
    peserta: 18,
    meetingTitle: "BANDARA",
    meetingStart: "Bandara Internasional I Gusti Ngurah Rai",
    meetingFinish: "Bandara Internasional I Gusti Ngurah Rai",
    startTime: "2 Juli 2028 - 08:00 WIB",
    finishTime: "7 Juli 2028 - 16:30 WIB",
  },
  "Eksplorasi Budaya": {
    tujuan: "Yogyakarta, Indonesia",
    durasi: "5 Hari / 4 Malam",
    tanggal: "5 - 9 Juli 2028",
    peserta: 22,
    meetingTitle: "STASIUN",
    meetingStart: "Stasiun Tugu Yogyakarta",
    meetingFinish: "Stasiun Tugu Yogyakarta",
    startTime: "5 Juli 2028 - 09:00 WIB",
    finishTime: "9 Juli 2028 - 15:30 WIB",
  },
  "Tur Petualangan": {
    tujuan: "Bandung, Jawa Barat",
    durasi: "2 Hari / 1 Malam",
    tanggal: "8 - 9 Juli 2028",
    peserta: 15,
    meetingTitle: "STASIUN",
    meetingStart: "Stasiun Bandung",
    meetingFinish: "Stasiun Bandung",
    startTime: "8 Juli 2028 - 07:30 WIB",
    finishTime: "9 Juli 2028 - 18:00 WIB",
  },
  "Highlight Kota": {
    tujuan: "Jakarta, Indonesia",
    durasi: "6 Hari / 5 Malam",
    tanggal: "11 - 16 Juli 2028",
    peserta: 25,
    meetingTitle: "BANDARA",
    meetingStart: "Bandara Internasional Soekarno-Hatta",
    meetingFinish: "Bandara Internasional Soekarno-Hatta",
    startTime: "11 Juli 2028 - 08:00 WIB",
    finishTime: "16 Juli 2028 - 16:30 WIB",
  },
  "Wisata Venesia": {
    tujuan: "Venesia, Italia",
    durasi: "6 Hari / 5 Malam",
    tanggal: "15 - 20 Juli 2028",
    peserta: 20,
    meetingTitle: "BANDARA",
    meetingStart: "Bandara Marco Polo Venesia",
    meetingFinish: "Bandara Marco Polo Venesia",
    startTime: "15 Juli 2028 - 09:00",
    finishTime: "20 Juli 2028 - 15:00",
  },
  "Safari Adventure": {
    tujuan: "Taman Safari, Indonesia",
    durasi: "4 Hari / 3 Malam",
    tanggal: "16 - 19 Juli 2028",
    peserta: 17,
    meetingTitle: "STASIUN",
    meetingStart: "Stasiun Bogor",
    meetingFinish: "Stasiun Bogor",
    startTime: "16 Juli 2028 - 08:30 WIB",
    finishTime: "19 Juli 2028 - 17:00 WIB",
  },
  "Alpine Escape": {
    tujuan: "Swiss Alps",
    durasi: "4 Hari / 3 Malam",
    tanggal: "18 - 21 Juli 2028",
    peserta: 16,
    meetingTitle: "BANDARA",
    meetingStart: "Zurich Airport",
    meetingFinish: "Zurich Airport",
    startTime: "18 Juli 2028 - 08:00",
    finishTime: "21 Juli 2028 - 16:00",
  },
  "Budaya Seoul": {
    tujuan: "Seoul, Korea Selatan",
    durasi: "3 Hari / 2 Malam",
    tanggal: "21 - 23 Juli 2028",
    peserta: 19,
    meetingTitle: "BANDARA",
    meetingStart: "Incheon International Airport",
    meetingFinish: "Incheon International Airport",
    startTime: "21 Juli 2028 - 09:00",
    finishTime: "23 Juli 2028 - 17:00",
  },
  "Romansa Paris": {
    tujuan: "Paris, Prancis",
    durasi: "7 Hari / 6 Malam",
    tanggal: "24 - 30 Juli 2028",
    peserta: 21,
    meetingTitle: "BANDARA",
    meetingStart: "Charles de Gaulle Airport",
    meetingFinish: "Charles de Gaulle Airport",
    startTime: "24 Juli 2028 - 08:00",
    finishTime: "30 Juli 2028 - 16:30",
  },
  "Petualangan Tokyo": {
    tujuan: "Tokyo, Jepang",
    durasi: "4 Hari / 3 Malam",
    tanggal: "26 - 29 Juli 2028",
    peserta: 23,
    meetingTitle: "STASIUN",
    meetingStart: "Tokyo Station",
    meetingFinish: "Tokyo Station",
    startTime: "26 Juli 2028 - 09:00",
    finishTime: "29 Juli 2028 - 15:30",
  },
  "Bali Beach Escape": {
    tujuan: "Bali, Indonesia",
    durasi: "5 Hari / 4 Malam",
    tanggal: "30 Juli - 3 Agustus 2028",
    peserta: 20,
    meetingTitle: "BANDARA",
    meetingStart: "Bandara Internasional I Gusti Ngurah Rai",
    meetingFinish: "Bandara Internasional I Gusti Ngurah Rai",
    startTime: "30 Juli 2028 - 08:00 WIB",
    finishTime: "3 Agustus 2028 - 16:30 WIB",
  },
};

const calendarCells = [
  { date: "25", muted: true },
  { date: "26", muted: true },
  { date: "27", muted: true },
  { date: "28", muted: true },
  { date: "29", muted: true },
  { date: "30", muted: true },
  { date: "1" },

  {
    date: "2",
    event: "Liburan Romantis",
    range: "2 Jul - 7 Jul",
    light: true,
  },
  { date: "3" },
  { date: "4" },
  {
    date: "5",
    event: "Eksplorasi Budaya",
    range: "5 Jul - 9 Jul",
    light: true,
  },
  { date: "6" },
  { date: "7" },
  {
    date: "8",
    event: "Tur Petualangan",
    range: "8 Jul - 9 Jul",
    light: true,
  },

  { date: "9" },
  { date: "10" },
  {
    date: "11",
    event: "Highlight Kota",
    range: "11 Jul - 16 Jul",
    active: true,
  },
  { date: "12" },
  { date: "13" },
  { date: "14" },
  {
    date: "15",
    event: "Wisata Venesia",
    range: "15 Jul - 20 Jul",
    light: true,
  },

  {
    date: "16",
    event: "Safari Adventure",
    range: "16 Jul - 19 Jul",
    light: true,
  },
  { date: "17" },
  {
    date: "18",
    event: "Alpine Escape",
    range: "18 Jul - 21 Jul",
    light: true,
  },
  { date: "19" },
  { date: "20" },
  {
    date: "21",
    event: "Budaya Seoul",
    range: "21 Jul - 23 Jul",
    light: true,
  },
  { date: "22" },

  { date: "23" },
  {
    date: "24",
    event: "Romansa Paris",
    range: "24 Jul - 30 Jul",
    light: true,
  },
  { date: "25" },
  {
    date: "26",
    event: "Petualangan Tokyo",
    range: "26 Jul - 29 Jul",
    light: true,
  },
  { date: "27" },
  { date: "28" },
  {
    date: "29",
    event: "Liburan Romantis",
    range: "29 Jul - 31 Jul",
    light: true,
  },

  {
    date: "30",
    event: "Bali Beach Escape",
    range: "30 Jul - 3 Agu",
    light: true,
  },
  { date: "31" },
  { date: "1", muted: true },
  { date: "2", muted: true },
  { date: "3", muted: true },
  { date: "4", muted: true },
  { date: "5", muted: true },
];

const avatarList = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/52.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
];

export default function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState("Highlight Kota");
  const [viewMode, setViewMode] = useState("Bulan");

  const detail = eventDetails[selectedEvent];

  const handleClickEvent = (eventName) => {
    setSelectedEvent(eventName);
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      <div className="bg-white rounded-[18px] border border-[#E7ECF2] shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="grid grid-cols-[1fr_315px] min-h-[780px]">
          {/* KIRI: KALENDER */}
          <section className="p-5">
            <div className="flex items-center justify-between mb-5">
              <button
                type="button"
                className="flex items-center gap-2 text-[16px] font-bold text-[#3B4450] hover:text-[#70A9F8] transition"
              >
                Juli 2028
                <FaChevronDown className="text-[12px]" />
              </button>

              <div className="bg-[#F4F7FA] rounded-[10px] p-1 flex items-center gap-1">
                {["Hari", "Minggu", "Bulan"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    className={`h-[34px] px-7 rounded-[8px] text-[13px] font-semibold transition-all duration-300 ${
                      viewMode === mode
                        ? "bg-[#70A9F8] text-white shadow-sm"
                        : "text-[#8F96A3] hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* HEADER HARI */}
            <div className="grid grid-cols-7 rounded-t-[10px] overflow-hidden">
              {days.map((day) => (
                <div
                  key={day}
                  className="h-[34px] bg-[#EAF4FF] border-r border-white flex items-center justify-center text-[13px] font-bold text-[#596070]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* GRID KALENDER */}
            <div className="grid grid-cols-7 border-l border-t border-[#EEF1F5]">
              {calendarCells.map((cell, index) => (
                <div
                  key={index}
                  className={`relative h-[128px] border-r border-b border-[#EEF1F5] bg-white p-2 transition-all duration-300 hover:bg-[#F8FBFF] ${
                    cell.muted
                      ? "bg-[repeating-linear-gradient(-45deg,#fff,#fff_14px,#F1F3F6_15px,#F1F3F6_16px)]"
                      : ""
                  }`}
                >
                  <span
                    className={`text-[12px] font-semibold ${
                      cell.muted
                        ? "text-[#C8CED6]"
                        : cell.date === "11"
                        ? "text-[#70A9F8]"
                        : "text-[#A0A7B2]"
                    }`}
                  >
                    {cell.date}
                  </span>

                  {cell.event && (
                    <button
                      type="button"
                      onClick={() => handleClickEvent(cell.event)}
                      className={`absolute left-2 right-2 bottom-2 rounded-[8px] p-3 h-[92px] flex flex-col justify-between text-left shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] ${
                        selectedEvent === cell.event
                          ? "bg-[#70A9F8] text-white"
                          : "bg-[#EAF4FF] text-[#4A5360] hover:bg-[#DDEEFF]"
                      }`}
                    >
                      <p className="text-[13px] font-bold leading-5">
                        {cell.event}
                      </p>

                      <p
                        className={`text-[11px] flex items-center gap-1 ${
                          selectedEvent === cell.event
                            ? "text-white/90"
                            : "text-[#596070]"
                        }`}
                      >
                        <FaCalendarAlt className="text-[10px]" />
                        {cell.range}
                      </p>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* KANAN: DETAIL JADWAL */}
          <aside className="border-l border-[#EEF1F5] bg-[#FAFBFC] p-5">
            <div className="flex items-center justify-between mb-7">
              <h3 className="text-[16px] font-bold text-[#202436]">
                Detail Jadwal
              </h3>

              <FaEllipsisH className="text-[#202436]" />
            </div>

            <h2 className="text-[23px] font-bold text-[#5A91D6] mb-5">
              {selectedEvent}
            </h2>

            <div className="space-y-5 mb-6">
              <div>
                <p className="text-[12px] font-semibold text-[#A7AFBA] mb-1">
                  Tujuan
                </p>
                <p className="text-[14px] font-semibold text-[#596070] flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#70A9F8]" />
                  {detail.tujuan}
                </p>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-[#A7AFBA] mb-1">
                  Durasi
                </p>
                <p className="text-[14px] font-bold text-[#596070]">
                  {detail.durasi}
                </p>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-[#A7AFBA] mb-1">
                  Tanggal
                </p>
                <p className="text-[14px] font-semibold text-[#596070]">
                  {detail.tanggal}
                </p>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-[#A7AFBA] mb-3">
                  Total Peserta
                </p>

                <p className="text-[15px] font-bold text-[#596070] mb-3 flex items-center gap-2">
                  <FaUsers className="text-[#70A9F8]" />
                  {detail.peserta} peserta
                </p>

                <div className="flex items-center">
                  {avatarList.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt="Peserta"
                      className="w-[30px] h-[30px] rounded-full border-2 border-white object-cover -ml-2 first:ml-0 hover:scale-110 transition-all duration-300"
                    />
                  ))}

                  <span className="text-[12px] text-[#8F96A3] ml-3">
                    & lainnya
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E2E6EC] pt-5">
              <h4 className="text-[14px] font-bold text-[#202436] mb-4">
                Titik Pertemuan
              </h4>

              <div className="bg-white rounded-[12px] p-4 mb-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <p className="text-[12px] font-bold text-[#A7AFBA] mb-4">
                  {detail.meetingTitle}
                </p>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    {detail.meetingTitle === "BANDARA" ? (
                      <FaPlaneDeparture className="text-[#70A9F8] mt-1 shrink-0" />
                    ) : (
                      <FaTrain className="text-[#70A9F8] mt-1 shrink-0" />
                    )}

                    <div>
                      <p className="text-[12px] text-[#A7AFBA]">Mulai</p>
                      <p className="text-[14px] font-semibold text-[#596070] leading-5">
                        {detail.meetingStart}
                      </p>
                      <p className="text-[12px] text-[#A7AFBA] mt-1">
                        {detail.startTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {detail.meetingTitle === "BANDARA" ? (
                      <FaPlaneDeparture className="text-[#70A9F8] mt-1 shrink-0" />
                    ) : (
                      <FaTrain className="text-[#70A9F8] mt-1 shrink-0" />
                    )}

                    <div>
                      <p className="text-[12px] text-[#A7AFBA]">Selesai</p>
                      <p className="text-[14px] font-semibold text-[#596070] leading-5">
                        {detail.meetingFinish}
                      </p>
                      <p className="text-[12px] text-[#A7AFBA] mt-1">
                        {detail.finishTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Jadwal dipilih: ${selectedEvent}`)}
                className="w-full h-[42px] rounded-[10px] bg-[#70A9F8] hover:bg-[#5D9AF2] text-white text-sm font-bold shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                Pilih Jadwal Ini
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}