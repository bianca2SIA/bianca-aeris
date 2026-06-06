import { Link, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaCircle,
} from "react-icons/fa";

import paketData from "../data/paket.json";
import paketDetailData from "../data/paketDetail.json";

export default function PaketDetail() {
  const { namaPaket } = useParams();
  const decodedNama = decodeURIComponent(namaPaket || "");

  const semuaPaket = [
    paketData.paketBaru,
    ...paketData.paketUnggulan,
    ...paketData.paketPopuler,
    ...paketData.paketRekomendasi,
  ];

  const paketDasar =
    semuaPaket.find((item) => item.nama === decodedNama) || paketData.paketBaru;

  const detail =
    paketDetailData[paketDasar.nama] || paketDetailData.default;

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      <div className="flex items-center justify-between mb-5">
        <Link
          to="/paket"
          className="flex items-center gap-3 text-[14px] font-semibold text-[#596070] hover:text-[#70A9F8] transition"
        >
          <span className="w-[38px] h-[38px] rounded-[8px] bg-white flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <FaArrowLeft />
          </span>
          Kembali ke Daftar Paket
        </Link>

        <button className="h-[40px] px-6 rounded-[8px] bg-[#70A9F8] hover:bg-[#5D9AF2] text-white text-sm font-bold shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          Edit Data
        </button>
      </div>

      <div className="bg-white rounded-[16px] p-6 grid grid-cols-[1fr_360px] gap-6 shadow-sm hover:shadow-xl transition-all duration-300">
        <section>
          <div className="grid grid-cols-[1.1fr_1fr] gap-4 mb-6">
            <div className="h-[405px] rounded-[14px] overflow-hidden shadow-sm group">
              <img
                src={detail.gambarUtama}
                alt={paketDasar.nama}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="grid grid-rows-2 gap-4">
              <div className="h-[195px] rounded-[14px] overflow-hidden shadow-sm group">
                <img
                  src={detail.galeri[0]}
                  alt="Galeri Paket"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-[195px] rounded-[14px] overflow-hidden shadow-sm group">
                  <img
                    src={detail.galeri[1]}
                    alt="Galeri Paket"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="h-[195px] rounded-[14px] overflow-hidden shadow-sm group">
                  <img
                    src={detail.galeri[2]}
                    alt="Galeri Paket"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-[30px] font-bold tracking-[-0.5px] mb-3">
                {paketDasar.nama}
              </h1>

              <div className="flex items-center gap-5 text-[#8F96A3] text-[14px] font-semibold">
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#B9C0CA]" />
                  {paketDasar.lokasi}
                </span>

                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#B9C0CA]" />
                  {paketDasar.durasi || "5 Hari / 4 Malam"}
                </span>

                <span className="flex items-center gap-2">
                  <FaUsers className="text-[#B9C0CA]" />
                  {detail.peserta}
                </span>
              </div>
            </div>

            <div className="text-right">
              <h2 className="text-[28px] font-bold text-[#5A91D6]">
                {paketDasar.harga}
              </h2>
              <p className="text-[13px] text-[#9AA0AA]">per orang</p>
            </div>
          </div>

          <div className="mt-6 mb-6">
            <p className="text-[13px] text-[#B0B3BB] font-bold mb-2">
              Tentang
            </p>
            <p className="text-[14px] leading-6 text-[#596070] max-w-[900px]">
              {detail.deskripsi}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-[13px] text-[#B0B3BB] font-bold mb-2">
              Jadwal Perjalanan
            </p>

            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#596070]">
              <FaCalendarAlt className="text-[#B9C0CA]" />
              {detail.tanggal}
            </div>
          </div>

          <div className="border-t border-[#E8EBF0] pt-6 grid grid-cols-[1fr_1fr_0.9fr] gap-6">
            <div>
              <h3 className="text-[13px] font-bold text-[#9AA0AA] mb-4">
                TERMASUK
              </h3>

              <div className="space-y-4">
                {detail.termasuk.slice(0, 4).map((item) => (
                  <div key={item} className="flex items-start gap-3 group">
                    <FaCheckCircle className="text-[#70A9F8] mt-1 shrink-0 group-hover:scale-125 transition" />
                    <p className="text-[14px] leading-5 font-semibold text-[#596070]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[13px] font-bold text-transparent mb-4">
                TERMASUK
              </h3>

              <div className="space-y-4">
                {detail.termasuk.slice(4).map((item) => (
                  <div key={item} className="flex items-start gap-3 group">
                    <FaCheckCircle className="text-[#70A9F8] mt-1 shrink-0 group-hover:scale-125 transition" />
                    <p className="text-[14px] leading-5 font-semibold text-[#596070]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-l border-[#E8EBF0] pl-6">
              <h3 className="text-[13px] font-bold text-[#9AA0AA] mb-4">
                TIDAK TERMASUK
              </h3>

              <div className="space-y-4">
                {detail.tidakTermasuk.map((item) => (
                  <div key={item} className="flex items-start gap-3 group">
                    <FaTimesCircle className="text-[#B9C0CA] mt-1 shrink-0 group-hover:text-[#F06C7A] group-hover:scale-125 transition" />
                    <p className="text-[14px] leading-5 font-semibold text-[#596070]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="bg-[#F7F7F8] rounded-[14px] p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-[24px] font-bold text-[#8A8F9A] mb-7">
            Rencana Perjalanan
          </h2>

          <div className="relative">
            <div className="absolute left-[92px] top-3 bottom-4 w-[2px] bg-[#E1E4EA]"></div>

            <div className="space-y-8">
              {detail.rencanaPerjalanan.map((item) => (
                <div
                  key={item.hari}
                  className="grid grid-cols-[70px_24px_1fr] gap-3 relative group"
                >
                  <div>
                    <p className="text-[15px] font-bold text-[#202436]">
                      {item.hari}
                    </p>
                    <p className="text-[13px] text-[#9AA0AA] mt-2">
                      {item.tanggal}
                    </p>
                  </div>

                  <div className="relative z-10 flex justify-center">
                    <FaCircle className="text-[#D9DCE2] text-[17px] mt-1 group-hover:text-[#70A9F8] group-hover:scale-125 transition-all duration-300" />
                  </div>

                  <div className="hover:bg-white rounded-[10px] p-2 -mt-2 transition-all duration-300">
                    <h3 className="text-[15px] font-bold text-[#596070] mb-2">
                      {item.tempat}
                    </h3>
                    <p className="text-[14px] leading-6 text-[#8F96A3]">
                      {item.aktivitas}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

    
    </div>
  );
}