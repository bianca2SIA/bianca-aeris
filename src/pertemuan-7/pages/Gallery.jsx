import { useMemo, useState } from "react";

import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisH,
  FaMapMarkerAlt,
  FaSearch,
  FaThLarge,
  FaList,
  FaTimes,
  FaPlus,
} from "react-icons/fa";

import galleryData from "../data/gallery.json";

export default function Gallery() {
 const [search, setSearch] = useState("");
const [kategori, setKategori] = useState("All");
const [tanggal, setTanggal] = useState("1 - 30 June 28");
const [sortBy, setSortBy] = useState("Name");
const [viewMode, setViewMode] = useState("grid");
const [selectedImage, setSelectedImage] = useState(null);
const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 12;

  const kategoriList = [
    "All",
    "Package",
    "City",
    "Culture",
    "Adventure",
    "Beach",
  ];

  const tanggalList = [
    "1 - 30 June 28",
    "1 - 31 July 28",
    "1 - 31 August 28",
  ];

  const sortList = ["Name", "Location", "Category"];

  const filteredGallery = useMemo(() => {
    let data = galleryData.filter((item) => {
      const cocokSearch =
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.lokasi.toLowerCase().includes(search.toLowerCase()) ||
        item.kategori.toLowerCase().includes(search.toLowerCase());

      const cocokKategori = kategori === "All" || item.kategori === kategori;
      const cocokTanggal = item.tanggal === tanggal;

      return cocokSearch && cocokKategori && cocokTanggal;
    });

    if (sortBy === "Name") {
      data = [...data].sort((a, b) => a.nama.localeCompare(b.nama));
    }

    if (sortBy === "Location") {
      data = [...data].sort((a, b) => a.lokasi.localeCompare(b.lokasi));
    }

    if (sortBy === "Category") {
      data = [...data].sort((a, b) => a.kategori.localeCompare(b.kategori));
    }

    return data;
  }, [search, kategori, tanggal, sortBy]);

  const totalPages = Math.ceil(filteredGallery.length / dataPerPage);
  const startIndex = (currentPage - 1) * dataPerPage;
  const currentGallery = filteredGallery.slice(
    startIndex,
    startIndex + dataPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const Dropdown = ({ value, list, onChange, icon }) => (
    <div className="relative group">
      <button className="h-[38px] px-4 rounded-[9px] bg-white border border-[#E8EDF3] text-[#8F96A3] text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 hover:text-[#70A9F8] transition-all duration-300">
        {icon}
        {value}
        <FaChevronDown className="text-xs" />
      </button>

      <div className="absolute left-0 top-[44px] min-w-[170px] bg-white rounded-[12px] shadow-xl border border-[#E8EDF3] p-2 hidden group-hover:block z-30">
        {list.map((item) => (
          <button
            key={item}
            onClick={() => {
              onChange(item);
              setCurrentPage(1);
            }}
            className={`w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold transition ${
              value === item
                ? "bg-[#70A9F8] text-white"
                : "text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      {/* FILTER ATAS */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Dropdown
            value={tanggal}
            list={tanggalList}
            onChange={setTanggal}
            icon={<FaCalendarAlt className="text-xs" />}
          />

          <Dropdown value={kategori} list={kategoriList} onChange={setKategori} />

         <div className="w-[330px] h-[44px] bg-white rounded-[12px] flex items-center px-4 gap-3 border border-[#EEF1F5] shadow-sm hover:shadow-md focus-within:border-[#70A9F8] focus-within:shadow-md transition-all duration-300">
  <FaSearch className="text-[#B9C0CA] text-sm shrink-0" />

  <input
    type="text"
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
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-[#B0B3BB] font-semibold">
            Urutkan:
          </span>

          <Dropdown value={sortBy} list={sortList} onChange={setSortBy} />

          <div className="h-[38px] bg-white rounded-[9px] p-1 flex items-center gap-1 border border-[#E8EDF3]">
            <button
              onClick={() => setViewMode("grid")}
              className={`w-[32px] h-[30px] rounded-[7px] flex items-center justify-center transition ${
                viewMode === "grid"
                  ? "bg-[#70A9F8] text-white"
                  : "text-[#8F96A3] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
              }`}
            >
              <FaThLarge />
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`w-[32px] h-[30px] rounded-[7px] flex items-center justify-center transition ${
                viewMode === "list"
                  ? "bg-[#70A9F8] text-white"
                  : "text-[#8F96A3] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
              }`}
            >
              <FaList />
            </button>
          </div>

          <button className="h-[38px] px-5 bg-[#70A9F8] hover:bg-[#5D9AF2] text-white rounded-[9px] text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <FaPlus className="text-xs" />
            Tambah Gambar
          </button>
        </div>
      </div>

      {/* GALLERY GRID / LIST */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {currentGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-[14px] overflow-hidden border border-[#E8EDF3] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative h-[245px] overflow-hidden">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

                <span className="absolute top-4 left-4 bg-white/90 text-[#70A9F8] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition duration-300">
                  {item.kategori}
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#202436] leading-5 group-hover:text-[#70A9F8] transition">
                      {item.nama}
                    </h3>

                    <p className="text-[12px] text-[#8F96A3] flex items-center gap-2 mt-2">
                      <FaMapMarkerAlt className="text-[#9AA0AA]" />
                      {item.lokasi}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(item);
                    }}
                    className="text-[#8F96A3] hover:text-[#70A9F8] transition"
                  >
                    <FaEllipsisH />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[16px] border border-[#E8EDF3] overflow-hidden shadow-sm">
          {currentGallery.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="w-full p-4 flex items-center gap-4 border-b border-[#EEF1F5] hover:bg-[#F8FBFF] hover:-translate-y-[1px] transition-all duration-300 text-left"
            >
              <img
                src={item.gambar}
                alt={item.nama}
                className="w-[96px] h-[70px] rounded-[10px] object-cover"
              />

              <div className="flex-1">
                <h3 className="text-[16px] font-bold text-[#202436]">
                  {item.nama}
                </h3>

                <p className="text-[12px] text-[#8F96A3] flex items-center gap-2 mt-1">
                  <FaMapMarkerAlt />
                  {item.lokasi}
                </p>
              </div>

              <span className="bg-[#EAF4FF] text-[#70A9F8] text-[12px] font-bold px-3 py-1 rounded-full">
                {item.kategori}
              </span>
            </button>
          ))}
        </div>
      )}

      {currentGallery.length === 0 && (
        <div className="bg-white rounded-[16px] p-10 text-center text-[#9AA0AA] mt-6">
          Data gambar tidak ditemukan.
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-7 text-sm text-[#9AA0AA]">
        <div className="flex items-center gap-2">
          <span>Menampilkan</span>

          <button className="h-[34px] px-3 rounded-[8px] bg-white font-semibold text-[#596070] flex items-center gap-2 shadow-sm">
            {currentGallery.length}
            <FaChevronDown className="text-xs" />
          </button>

          <span>dari {filteredGallery.length} gambar</span>
        </div>

        <div className="flex items-center gap-2">
          <button
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

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
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

      {/* MODAL PREVIEW */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="bg-white rounded-[18px] w-full max-w-[760px] overflow-hidden shadow-2xl">
            <div className="relative h-[430px]">
              <img
                src={selectedImage.gambar}
                alt={selectedImage.nama}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-[38px] h-[38px] rounded-full bg-white/90 text-[#596070] flex items-center justify-center hover:bg-white hover:text-[#70A9F8] transition"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] font-bold text-[#202436]">
                  {selectedImage.nama}
                </h2>

                <p className="text-[13px] text-[#8F96A3] flex items-center gap-2 mt-2">
                  <FaMapMarkerAlt />
                  {selectedImage.lokasi}
                </p>
              </div>

              <span className="bg-[#EAF4FF] text-[#70A9F8] text-[13px] font-bold px-4 py-2 rounded-full">
                {selectedImage.kategori}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}