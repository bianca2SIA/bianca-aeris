import { useMemo, useState } from "react";

import {
  FaSearch,
  FaChevronDown,
  FaPlus,
  FaEnvelopeOpenText,
  FaPhoneAlt,
  FaCommentDots,
  FaBriefcase,
  FaChartBar,
  FaIdBadge,
  FaUserCheck,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
} from "react-icons/fa";

import guidesData from "../data/guides.json";

export default function Guides() {
  const [selectedGuide, setSelectedGuide] = useState(guidesData[0]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua Role");
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 9;

  const roleList = ["Semua Role", "Senior", "Middle", "Junior"];

  const filteredGuides = useMemo(() => {
    return guidesData.filter((guide) => {
      const cocokSearch =
        guide.nama.toLowerCase().includes(search.toLowerCase()) ||
        guide.email.toLowerCase().includes(search.toLowerCase()) ||
        guide.role.toLowerCase().includes(search.toLowerCase());

      const cocokRole =
        roleFilter === "Semua Role" || guide.level === roleFilter;

      return cocokSearch && cocokRole;
    });
  }, [search, roleFilter]);

  const totalPages = Math.ceil(filteredGuides.length / dataPerPage);
  const startIndex = (currentPage - 1) * dataPerPage;
  const currentGuides = filteredGuides.slice(startIndex, startIndex + dataPerPage);

  const handleSelectGuide = (guide) => {
    setSelectedGuide(guide);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      <div className="grid grid-cols-[1fr_500px] gap-6">
        {/* KIRI */}
        <section className="bg-white rounded-[18px] p-4 shadow-sm border border-[#E8EDF3] hover:shadow-xl transition-all duration-300">
          {/* FILTER */}
          <div className="flex items-center justify-between mb-5">
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

            <div className="flex items-center gap-3">
              <div className="relative group">
                <button className="h-[42px] px-4 bg-[#FAFBFC] rounded-[10px] border border-[#E8EDF3] text-[#8F96A3] text-sm font-bold flex items-center gap-2 hover:bg-[#EAF4FF] hover:text-[#70A9F8] hover:shadow-md transition-all duration-300">
                  <FaFilter className="text-xs" />
                  {roleFilter}
                  <FaChevronDown className="text-xs" />
                </button>

                <div className="absolute right-0 top-[48px] w-[160px] bg-white rounded-[12px] shadow-xl border border-[#E8EDF3] p-2 hidden group-hover:block z-30">
                  {roleList.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setRoleFilter(role);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[8px] text-sm font-semibold transition ${
                        roleFilter === role
                          ? "bg-[#70A9F8] text-white"
                          : "text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <button className="h-[42px] px-5 bg-[#70A9F8] text-white rounded-[10px] text-sm font-bold flex items-center gap-2 hover:bg-[#5D9AF2] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <FaPlus className="text-xs" />
                Tambah Guide
              </button>
            </div>
          </div>

          {/* LIST GUIDE */}
          <div className="space-y-4">
            {currentGuides.map((guide) => (
              <button
                key={guide.id}
                onClick={() => handleSelectGuide(guide)}
                className={`w-full rounded-[13px] p-3 grid grid-cols-[62px_1fr_180px_150px] gap-3 items-center text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  selectedGuide.id === guide.id
                    ? "bg-[#EAF4FF] shadow-sm"
                    : "bg-white border border-[#F0F2F5]"
                }`}
              >
                <img
                  src={guide.foto}
                  alt={guide.nama}
                  className="w-[54px] h-[54px] rounded-[10px] object-cover bg-[#EAF4FF]"
                />

                <div>
                  <h3 className="text-[16px] font-bold text-[#202436]">
                    {guide.nama}
                  </h3>

                  <p className="text-[12px] text-[#9AA0AA] flex items-center gap-2 mt-1">
                    <FaEnvelopeOpenText className="text-[10px]" />
                    {guide.email}
                  </p>
                </div>

                <p className="text-[12px] text-[#9AA0AA] flex items-center gap-2">
                  <FaPhoneAlt className="text-[10px]" />
                  {guide.telepon}
                </p>

                <span className="justify-self-end bg-[#EAF4FF] text-[#596070] px-3 py-2 rounded-[8px] text-[12px] font-semibold">
                  {guide.role}
                </span>
              </button>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between mt-5 text-sm text-[#9AA0AA]">
            <div className="flex items-center gap-2">
              <span>Menampilkan</span>

              <button className="h-[34px] px-3 rounded-[8px] bg-[#F4F5F7] font-semibold text-[#596070] flex items-center gap-2">
                {currentGuides.length}
                <FaChevronDown className="text-xs" />
              </button>

              <span>dari {guidesData.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`w-[34px] h-[34px] rounded-[8px] flex items-center justify-center transition ${
                  currentPage === 1
                    ? "bg-[#F4F5F7] text-[#C0C4CC] cursor-not-allowed"
                    : "bg-[#F4F5F7] text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
                }`}
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-[34px] h-[34px] rounded-[8px] font-bold transition ${
                      currentPage === page
                        ? "bg-[#70A9F8] text-white shadow-md"
                        : "bg-[#F4F5F7] text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`w-[34px] h-[34px] rounded-[8px] flex items-center justify-center transition ${
                  currentPage === totalPages
                    ? "bg-[#F4F5F7] text-[#C0C4CC] cursor-not-allowed"
                    : "bg-[#F4F5F7] text-[#596070] hover:bg-[#EAF4FF] hover:text-[#70A9F8]"
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </section>

        {/* KANAN DETAIL */}
        <aside className="bg-white rounded-[18px] border border-[#E8EDF3] shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="h-[120px] bg-[linear-gradient(135deg,#EAF4FF_25%,#D9ECFF_25%,#D9ECFF_50%,#EAF4FF_50%,#EAF4FF_75%,#D9ECFF_75%,#D9ECFF_100%)] bg-[length:32px_32px]"></div>

          <div className="px-6 pb-6">
            <div className="-mt-10 flex items-end justify-between mb-5">
              <img
                src={selectedGuide.foto}
                alt={selectedGuide.nama}
                className="w-[76px] h-[76px] rounded-[12px] object-cover border-4 border-white shadow-md bg-[#EAF4FF]"
              />

              <div className="flex items-center gap-3 mb-2">
                <button className="w-[42px] h-[42px] rounded-[10px] bg-[#F4F5F7] text-[#596070] flex items-center justify-center hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition">
                  <FaCommentDots />
                </button>

                <button className="w-[42px] h-[42px] rounded-[10px] bg-[#70A9F8] text-white flex items-center justify-center hover:bg-[#5D9AF2] hover:shadow-lg transition">
                  <FaPhoneAlt />
                </button>
              </div>
            </div>

            <div className="mb-7">
              <h2 className="text-[22px] font-bold text-[#202436]">
                {selectedGuide.nama}
              </h2>
              <p className="text-[13px] text-[#8F96A3] font-semibold mt-1">
                {selectedGuide.role}
              </p>
            </div>

            <div className="bg-[#F8F9FB] rounded-[14px] p-5 grid grid-cols-2 gap-5 mb-7">
              <div className="flex items-center gap-3">
                <span className="w-[40px] h-[40px] rounded-[10px] bg-white text-[#70A9F8] flex items-center justify-center">
                  <FaBriefcase />
                </span>
                <div>
                  <p className="text-[12px] text-[#A7AFBA] font-semibold">
                    Pengalaman Kerja
                  </p>
                  <p className="text-[15px] font-bold">{selectedGuide.pengalaman}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-[40px] h-[40px] rounded-[10px] bg-white text-[#70A9F8] flex items-center justify-center">
                  <FaChartBar />
                </span>
                <div>
                  <p className="text-[12px] text-[#A7AFBA] font-semibold">
                    Level Pengalaman
                  </p>
                  <p className="text-[15px] font-bold">{selectedGuide.level}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-[40px] h-[40px] rounded-[10px] bg-white text-[#70A9F8] flex items-center justify-center">
                  <FaIdBadge />
                </span>
                <div>
                  <p className="text-[12px] text-[#A7AFBA] font-semibold">
                    Tipe Kerja
                  </p>
                  <p className="text-[15px] font-bold">{selectedGuide.tipeKerja}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-[40px] h-[40px] rounded-[10px] bg-white text-[#70A9F8] flex items-center justify-center">
                  <FaUserCheck />
                </span>
                <div>
                  <p className="text-[12px] text-[#A7AFBA] font-semibold">
                    Status Guide
                  </p>
                  <p className="text-[15px] font-bold">{selectedGuide.status}</p>
                </div>
              </div>
            </div>

            <div className="mb-7">
              <h3 className="text-[17px] font-bold mb-4">Skill</h3>

              <ul className="space-y-3">
                {selectedGuide.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-start gap-3 text-[14px] text-[#596070] font-semibold"
                  >
                    <FaCheckCircle className="text-[#70A9F8] mt-1 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-7">
              <h3 className="text-[17px] font-bold mb-4">Pengalaman</h3>

              <div className="space-y-5">
                {selectedGuide.experiences.map((item, index) => (
                  <div key={item.jabatan} className="flex gap-4">
                    <div
                      className={`w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0 ${
                        index === 0
                          ? "bg-[#EAF4FF] text-[#70A9F8]"
                          : "bg-[#FFE8E8] text-[#F06C7A]"
                      }`}
                    >
                      <FaBriefcase />
                    </div>

                    <div>
                      <h4 className="text-[14px] font-bold text-[#202436]">
                        {item.jabatan}
                      </h4>

                      <p className="text-[12px] text-[#8F96A3] font-semibold mt-1">
                        {item.tempat} • {item.periode}
                      </p>

                      <p className="text-[12px] leading-5 text-[#596070] mt-2">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full h-[46px] rounded-[10px] bg-[#F4F5F7] hover:bg-[#EAF4FF] hover:text-[#70A9F8] text-[#8F96A3] text-sm font-bold transition-all duration-300">
              Edit Profil
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}