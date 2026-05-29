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
} from "react-icons/fa";

import paketData from "../data/paket.json";
import { Link } from "react-router-dom";

const iconMap = {
  beach: <FaUmbrellaBeach />,
  hotel: <FaHotel />,
  service: <FaSpa />,
  activity: <FaSwimmer />,
  promo: <FaLeaf />,
};

export default function Paket() {
  const {
    paketBaru,
    fasilitasUtama,
    paketPopuler,
    paketUnggulan,
    paketRekomendasi,
  } = paketData;

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-8 py-7 text-[#202436]">
      {/* JUDUL KECIL */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[17px] font-bold">Paket Baru</h2>

        <button className="h-[38px] px-5 bg-[#70A9F8] hover:bg-[#5D9AF2] text-white rounded-[8px] text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <FaPlus className="text-xs" />
          Tambah Paket
        </button>
      </div>

      <div className="grid grid-cols-[1fr_310px] gap-6">
        {/* KIRI */}
        <section>
          {/* HERO PACKAGE */}
          <div className="bg-white rounded-[14px] p-5 grid grid-cols-[320px_1fr_255px] gap-6 mb-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-[350px] rounded-[14px] overflow-hidden relative">
              <img
                src={paketBaru.gambar}
                alt={paketBaru.nama}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">
                {paketBaru.preview.map((gambar, index) => (
                  <img
                    key={index}
                    src={gambar}
                    alt="Preview Paket"
                    className="h-[72px] rounded-[8px] object-cover border-2 border-white hover:scale-105 transition duration-300"
                  />
                ))}
              </div>
            </div>

            <div className="py-3">
              <h1 className="text-[31px] font-bold leading-[37px] mb-4">
                Paket Bali <br />
                Beach Escape
              </h1>

              <div className="flex items-center gap-2 text-[#8D929D] text-sm font-semibold mb-7">
                <FaMapMarkerAlt className="text-[#9AA0A8]" />
                {paketBaru.lokasi}
              </div>

              <p className="text-[#8E929D] text-[14px] leading-7 mb-7 max-w-[360px]">
                {paketBaru.deskripsi}
              </p>

              <div className="grid grid-cols-2 mb-6">
                <div>
                  <p className="text-[#B4B6BF] text-xs font-semibold mb-1">
                    Harga:
                  </p>
                  <p className="text-[#6DA5EF] text-[24px] font-bold">
                    {paketBaru.harga}
                  </p>
                  <p className="text-[#9BA0AA] text-sm">per orang</p>
                </div>

                <div>
                  <p className="text-[#B4B6BF] text-xs font-semibold mb-2">
                    Durasi:
                  </p>
                  <p className="text-[#596070] text-[15px] font-bold">
                    {paketBaru.durasi}
                  </p>
                </div>
              </div>

              <button className="w-full h-[48px] rounded-[7px] bg-[#70A9F8] hover:bg-[#5D9AF2] text-white font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                Edit Detail
              </button>
            </div>

            <div className="bg-[#F7F7F8] rounded-[14px] p-5 space-y-5">
              {fasilitasUtama.map((item) => (
                <div key={item.judul} className="flex gap-3 group">
                  <span className="w-6 h-6 rounded-full bg-white text-[#70A9F8] flex items-center justify-center mt-1 group-hover:bg-[#70A9F8] group-hover:text-white transition">
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

          {/* FEATURED */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[17px] font-bold">Paket Unggulan</h3>
            <FaEllipsisH className="text-[#272B36]" />
          </div>

          <div className="space-y-4">
            {paketUnggulan.map((item) => (
              <Link
  to={`/paket/${encodeURIComponent(item.nama)}`}
  key={item.nama}
  className="bg-white rounded-[14px] grid grid-cols-[230px_1fr] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
>
                <div className="relative h-[230px] overflow-hidden">
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />

                  <div className="absolute top-3 right-3 bg-[#FFF4B8] rounded-full px-3 py-1 flex items-center gap-1 text-sm font-bold text-[#77715D]">
                    <FaStar className="text-[#FFD65A]" />
                    {item.rating}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-[21px] font-bold mb-2">
                        {item.nama}
                      </h3>

                      <div className="flex items-center gap-5 text-[#9CA1AA] text-[13px] font-semibold">
                        <span>{item.durasi}</span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {item.lokasi}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[#6DA5EF] font-bold text-[18px]">
                        {item.harga}
                      </p>
                      <p className="text-[#9DA1AA] text-xs">per orang</p>
                    </div>
                  </div>

                  <div className="border-t border-[#EEF0F4] pt-5 grid grid-cols-2 gap-8">
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
                        {item.aktivitas.map((aktivitas) => (
                          <li key={aktivitas} className="flex gap-2">
                            <FaCheckCircle className="text-[#70A9F8] mt-1 shrink-0" />
                            <span>{aktivitas}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* KANAN */}
        <aside>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[17px] font-bold">Paket Populer</h3>
            <FaEllipsisH className="text-[#272B36]" />
          </div>

          <div className="space-y-4 mb-7">
            {paketPopuler.map((item) => (
              <div
                key={item.nama}
                className="bg-white rounded-[12px] p-3 flex items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-[78px] h-[78px] rounded-[8px] object-cover"
                />

                <div>
                  <h4 className="font-bold text-[15px] mb-1">{item.nama}</h4>

                  <p className="text-[#9AA0A8] text-[12px] flex items-center gap-1 mb-2">
                    <FaMapMarkerAlt />
                    {item.lokasi}
                  </p>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <FaStar key={i} className="text-[#FFD85C] text-sm" />
                    ))}
                    <FaRegStar className="text-[#FFD85C] text-sm" />
                    <span className="text-[#9AA0A8] text-xs ml-2">
                      {item.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[14px] p-4 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[17px] font-bold">Rekomendasi Paket</h3>
              <FaEllipsisH className="text-[#272B36]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {paketRekomendasi.map((item) => (
                <div
                  key={item.nama}
                  className="border border-[#E8EBF0] rounded-[12px] overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-[135px] object-cover hover:scale-105 transition duration-500"
                  />

                  <div className="p-3">
                    <h4 className="font-bold text-[15px] leading-5 mb-1">
                      {item.nama}
                    </h4>

                    <p className="text-[#9AA0A8] text-[12px] flex items-center gap-1 mb-2">
                      <FaMapMarkerAlt />
                      {item.lokasi}
                    </p>

                    <p className="text-[#6DA5EF] text-[17px] font-bold">
                      {item.harga}
                      <span className="text-[#9AA0A8] text-xs font-medium">
                        /orang
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
      <footer className="flex items-center gap-8 mt-8 text-[#B0B3BB] text-sm">
        <span>Copyright © 2024 TravelGo</span>
        <span>Privacy Policy</span>
        <span>Term and conditions</span>
        <span>Contact</span>
      </footer>
    </div>
  );
}