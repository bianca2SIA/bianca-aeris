import {
  FaChevronDown,
  FaEllipsisH,
  FaSearch,
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
} from "react-icons/fa";

import feedbackData from "../data/feedback.json";

function Stars({ value }) {
  const fullStars = Math.floor(Number(value));

  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= fullStars ? (
          <FaStar key={star} className="text-[#FFD85C] text-[15px]" />
        ) : (
          <FaRegStar key={star} className="text-[#D8DDE5] text-[15px]" />
        )
      )}
    </div>
  );
}

export default function Feedback() {
  const { reviewStats, ratings, feedbacks } = feedbackData;

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436] overflow-x-hidden">
      <div className="grid grid-cols-[1fr_300px] gap-6 mb-7">
        {/* CHART */}
        <section className="bg-white rounded-[16px] border border-[#E8EDF3] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[17px] font-bold">Statistik Review</h2>

              <div className="flex items-center gap-5 mt-4 text-[13px] text-[#8F96A3] font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[3px] bg-[#70A9F8]"></span>
                  Positif
                </span>

                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-[3px] bg-[#DADCE0]"></span>
                  Negatif
                </span>
              </div>
            </div>

            <button className="h-[38px] px-4 rounded-[9px] bg-[#70A9F8] text-white text-[13px] font-bold flex items-center gap-2 hover:bg-[#5D9AF2] hover:shadow-md transition-all duration-300">
              12 Bulan Terakhir
              <FaChevronDown className="text-xs" />
            </button>
          </div>

          <div className="relative h-[285px] pl-10 pt-5">
            <div className="absolute left-0 top-6 bottom-10 flex flex-col justify-between text-[12px] text-[#8F96A3]">
              <span>1.200</span>
              <span>900</span>
              <span>600</span>
              <span>300</span>
              <span>0</span>
            </div>

            <div className="absolute left-10 right-0 top-8 bottom-11 flex flex-col justify-between">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border-t border-[#EEF1F5]"></div>
              ))}
            </div>

            <div className="relative h-full grid grid-cols-12 items-end gap-5">
              {reviewStats.map((item) => (
                <div key={item.bulan} className="h-full flex flex-col justify-end">
                  <div className="flex items-end justify-center gap-2 h-[215px]">
                    <div
                      className="w-[18px] rounded-t-[8px] bg-[#70A9F8] hover:bg-[#5D9AF2] transition-all duration-300"
                      style={{ height: `${(item.positif / 1200) * 215}px` }}
                    ></div>

                    <div
                      className="w-[18px] rounded-t-[8px] bg-[#DADCE0] hover:bg-[#C7CBD2] transition-all duration-300"
                      style={{ height: `${(item.negatif / 1200) * 215}px` }}
                    ></div>
                  </div>

                  <p className="text-[12px] text-[#8F96A3] text-center mt-3">
                    {item.bulan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RATINGS */}
        <aside className="bg-white rounded-[16px] border border-[#E8EDF3] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[17px] font-bold">Rating</h2>
            <FaEllipsisH className="text-[#202436]" />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-[52px] px-4 rounded-[10px] bg-[#F4F7FA] flex items-center gap-2">
              <FaStar className="text-[#FFD85C] text-[21px]" />
              <span className="text-[30px] font-bold text-[#70A9F8]">4.5</span>
              <span className="text-[#70A9F8] text-[15px] font-bold">/5</span>
            </div>

            <div>
              <p className="text-[18px] font-bold text-[#70A9F8]">
                Sangat Baik
              </p>
              <p className="text-[12px] text-[#9AA0AA]">
                Dari 1.250 review
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {ratings.map((item) => (
              <div
                key={item.nama}
                className="flex items-center justify-between hover:bg-[#F8FBFF] p-1 rounded-[8px] transition"
              >
                <p className="text-[13px] font-semibold text-[#8F96A3]">
                  {item.nama}
                </p>

                <div className="flex items-center gap-2">
                  <Stars value={item.nilai} />
                  <span className="text-[12px] text-[#8F96A3] w-6">
                    {item.nilai}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* LIST FEEDBACK */}
      <section className="bg-white rounded-[16px] p-5 shadow-sm border border-[#E8EDF3] hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[17px] font-bold">Feedback Traveler</h2>

          <div className="flex items-center gap-3">
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
            <button className="h-[38px] px-4 rounded-[9px] bg-[#FAFBFC] border border-[#E8EDF3] text-[#8F96A3] text-[13px] font-semibold flex items-center gap-2 hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition">
              Semua Paket
              <FaChevronDown className="text-xs" />
            </button>

            <button className="h-[38px] px-4 rounded-[9px] bg-[#70A9F8] text-white text-[13px] font-bold flex items-center gap-2 hover:bg-[#5D9AF2] hover:shadow-md transition">
              <FaCalendarAlt className="text-xs" />
              1 Juni 28 - 15 Juli 28
              <FaChevronDown className="text-xs" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {feedbacks.map((item) => (
            <div
              key={item.nama}
              className="bg-white rounded-[14px] p-5 border border-[#EEF1F5] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.nama}
                    className="w-[38px] h-[38px] rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[38px] h-[38px] rounded-full bg-[#D7ECFF] text-[#5A91D6] flex items-center justify-center text-sm font-bold">
                    {item.avatar}
                  </div>
                )}

                <div>
                  <h3 className="text-[14px] font-bold text-[#202436]">
                    {item.nama}
                  </h3>
                  <p className="text-[12px] text-[#9AA0AA]">{item.paket}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Stars value={item.rating} />
                <span className="text-[13px] text-[#596070]">
                  {item.rating}
                </span>
              </div>

              <p className="text-[13px] leading-6 text-[#596070]">
                {item.teks}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6 text-sm text-[#9AA0AA]">
          <div className="flex items-center gap-2">
            <span>Menampilkan</span>

            <button className="h-[34px] px-3 rounded-[8px] bg-[#F4F5F7] font-semibold text-[#596070] flex items-center gap-2">
              8
              <FaChevronDown className="text-xs" />
            </button>

            <span>dari 286</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="h-[34px] px-3 rounded-[8px] bg-[#F4F5F7] text-[#596070] flex items-center gap-2 hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition">
              <FaChevronLeft />
              Sebelumnya
            </button>

            <button className="w-[34px] h-[34px] rounded-[8px] bg-[#70A9F8] text-white font-bold shadow-md">
              1
            </button>

            <button className="w-[34px] h-[34px] rounded-[8px] bg-[#F4F5F7] hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition">
              2
            </button>

            <button className="w-[34px] h-[34px] rounded-[8px] bg-[#F4F5F7] hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition">
              3
            </button>

            <span>...</span>

            <button className="w-[34px] h-[34px] rounded-[8px] bg-[#F4F5F7] hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition">
              16
            </button>

            <button className="h-[34px] px-3 rounded-[8px] bg-[#F4F5F7] text-[#596070] flex items-center gap-2 hover:bg-[#EAF4FF] hover:text-[#70A9F8] transition">
              Berikutnya
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}