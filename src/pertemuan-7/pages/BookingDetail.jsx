import { Link, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaSuitcaseRolling,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";

import bookingsData from "../data/booking.json";

export default function BookingDetail() {
  const { kodeBooking } = useParams();

  const booking =
    bookingsData.find((item) => item.kode === kodeBooking) || bookingsData[0];

  const getStatusStyle = (status) => {
    if (status === "Dikonfirmasi") return "bg-[#EAF4FF] text-[#5A91D6]";
    if (status === "Menunggu") return "bg-[#FFF4D8] text-[#C49A35]";
    return "bg-[#FFE5E8] text-[#F06C7A]";
  };

  const customerEmail = `${booking.nama
    .toLowerCase()
    .replaceAll(" ", "")}@gmail.com`;

  const customerDetail = {
    hp: "081234567890",
    email: customerEmail,
    alamat: "Pekanbaru, Riau",
    metode: "Transfer Bank",
    jumlahPeserta: "2 orang",
    tipeBooking: "Paket Travel",
  };

  const timelineBooking = [
    {
      tahap: "Tahap 1",
      tanggal: "12 Jun",
      judul: "Booking Dibuat",
      deskripsi:
        "Customer memilih paket travel dan mengisi data pemesanan melalui website TravelGo.",
    },
    {
      tahap: "Tahap 2",
      tanggal: "12 Jun",
      judul: "Konfirmasi Admin",
      deskripsi:
        "Admin mengecek ketersediaan paket, jadwal perjalanan, dan data customer.",
    },
    {
      tahap: "Tahap 3",
      tanggal: "13 Jun",
      judul: "Pembayaran",
      deskripsi:
        "Customer melakukan pembayaran sesuai metode pembayaran yang dipilih.",
    },
    {
      tahap: "Tahap 4",
      tanggal: "14 Jun",
      judul: "Tiket dan Jadwal Dikirim",
      deskripsi:
        "Admin mengirim detail jadwal perjalanan, fasilitas, dan informasi keberangkatan.",
    },
    {
      tahap: "Tahap 5",
      tanggal: booking.tanggal,
      judul: "Perjalanan Berlangsung",
      deskripsi:
        "Customer mengikuti perjalanan sesuai paket yang sudah dibooking.",
    },
  ];

  const informasiBooking = [
    "Data customer sudah tercatat di sistem CRM",
    "Paket travel sudah dipilih customer",
    "Jadwal perjalanan sudah ditentukan",
    "Metode pembayaran sudah tersedia",
    "Customer bisa dihubungi melalui WhatsApp/email",
    "Status booking dapat dipantau admin",
  ];

  const catatanAdmin = [
    "Pastikan customer menerima jadwal perjalanan",
    "Cek ulang status pembayaran customer",
    "Konfirmasi jumlah peserta sebelum keberangkatan",
    "Hubungi customer jika ada perubahan jadwal",
  ];

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-4 md:px-6 xl:px-8 py-5 xl:py-7 text-[#202436]">
      <div className="flex items-center justify-between mb-5">
        <Link
          to="/booking"
          className="flex items-center gap-3 text-[14px] font-semibold text-[#596070] hover:text-[#70A9F8] transition"
        >
          <span className="w-[38px] h-[38px] rounded-[8px] bg-white flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <FaArrowLeft />
          </span>
          Kembali ke Daftar Booking
        </Link>

        <button className="h-[40px] px-6 rounded-[8px] bg-[#70A9F8] hover:bg-[#5D9AF2] text-white text-sm font-bold shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          Edit Data
        </button>
      </div>

      <div className="bg-white rounded-[16px] p-6 grid grid-cols-[1fr_360px] gap-6 shadow-sm hover:shadow-xl transition-all duration-300">
        <section>
          <div className="grid grid-cols-[1.1fr_1fr] gap-4 mb-6">
            <div className="h-[405px] rounded-[14px] overflow-hidden shadow-sm group bg-[#EAF4FF] relative">
              <img
                src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80"
                alt={booking.paket}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute left-6 bottom-6 bg-white/90 backdrop-blur rounded-[14px] p-4 shadow-sm">
                <p className="text-[13px] text-[#9AA0AA] font-semibold">
                  Kode Booking
                </p>
                <h2 className="text-[25px] font-bold text-[#202436]">
                  {booking.kode}
                </h2>
              </div>
            </div>

            <div className="grid grid-rows-2 gap-4">
              <div className="bg-[#F7F7F8] rounded-[14px] p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-[50px] h-[50px] rounded-[12px] bg-[#EAF4FF] flex items-center justify-center text-[#70A9F8]">
                    <FaUser />
                  </div>

                  <div>
                    <p className="text-[13px] text-[#9AA0AA] font-semibold">
                      Nama Customer
                    </p>
                    <h3 className="text-[20px] font-bold">{booking.nama}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px] text-[#596070] font-semibold">
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-[#B9C0CA]" />
                    {customerDetail.hp}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-[#B9C0CA]" />
                    {customerDetail.email}
                  </p>

                  <p className="flex items-center gap-2 col-span-2">
                    <FaMapMarkerAlt className="text-[#B9C0CA]" />
                    {customerDetail.alamat}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#F7F7F8] rounded-[14px] p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-[44px] h-[44px] rounded-[10px] bg-[#EAF4FF] flex items-center justify-center text-[#70A9F8] mb-4">
                    <FaCalendarAlt />
                  </div>
                  <p className="text-[13px] text-[#9AA0AA] font-semibold">
                    Tanggal Trip
                  </p>
                  <h3 className="text-[16px] font-bold mt-1">
                    {booking.tanggal}
                  </h3>
                </div>

                <div className="bg-[#F7F7F8] rounded-[14px] p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-[44px] h-[44px] rounded-[10px] bg-[#EAF4FF] flex items-center justify-center text-[#70A9F8] mb-4">
                    <FaCreditCard />
                  </div>
                  <p className="text-[13px] text-[#9AA0AA] font-semibold">
                    Pembayaran
                  </p>
                  <h3 className="text-[16px] font-bold mt-1">
                    {customerDetail.metode}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-[30px] font-bold tracking-[-0.5px] mb-3">
                {booking.paket}
              </h1>

              <div className="flex items-center gap-5 text-[#8F96A3] text-[14px] font-semibold">
                <span className="flex items-center gap-2">
                  <FaSuitcaseRolling className="text-[#B9C0CA]" />
                  {customerDetail.tipeBooking}
                </span>

                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#B9C0CA]" />
                  {booking.durasi}
                </span>

                <span className="flex items-center gap-2">
                  <FaUser className="text-[#B9C0CA]" />
                  {customerDetail.jumlahPeserta}
                </span>
              </div>
            </div>

            <div className="text-right">
              <h2 className="text-[28px] font-bold text-[#5A91D6]">
                {booking.harga}
              </h2>

              <p className="text-[13px] text-[#9AA0AA]">total pembayaran</p>

              <span
                className={`inline-block mt-3 px-4 py-2 rounded-[8px] text-[12px] font-bold ${getStatusStyle(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>
          </div>

          <div className="mt-6 mb-6">
            <p className="text-[13px] text-[#B0B3BB] font-bold mb-2">
              Detail Booking
            </p>
            <p className="text-[14px] leading-6 text-[#596070] max-w-[900px]">
              Booking ini merupakan pemesanan paket travel atas nama{" "}
              <span className="font-bold">{booking.nama}</span> untuk paket{" "}
              <span className="font-bold">{booking.paket}</span>. Data ini
              digunakan admin TravelGo untuk memantau status pemesanan,
              pembayaran, jadwal perjalanan, dan kebutuhan follow-up customer.
            </p>
          </div>

          <div className="mb-6">
            <p className="text-[13px] text-[#B0B3BB] font-bold mb-2">
              Jadwal Booking
            </p>

            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#596070]">
              <FaCalendarAlt className="text-[#B9C0CA]" />
              {booking.tanggal}
            </div>
          </div>

          <div className="border-t border-[#E8EBF0] pt-6 grid grid-cols-[1fr_1fr_0.9fr] gap-6">
            <div>
              <h3 className="text-[13px] font-bold text-[#9AA0AA] mb-4">
                INFORMASI BOOKING
              </h3>

              <div className="space-y-4">
                {informasiBooking.slice(0, 3).map((item) => (
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
                INFORMASI
              </h3>

              <div className="space-y-4">
                {informasiBooking.slice(3).map((item) => (
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
                CATATAN ADMIN
              </h3>

              <div className="space-y-4">
                {catatanAdmin.map((item) => (
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
            Alur Booking
          </h2>

          <div className="relative">
            <div className="absolute left-[92px] top-3 bottom-4 w-[2px] bg-[#E1E4EA]"></div>

            <div className="space-y-8">
              {timelineBooking.map((item) => (
                <div
                  key={item.tahap}
                  className="grid grid-cols-[70px_24px_1fr] gap-3 relative group"
                >
                  <div>
                    <p className="text-[15px] font-bold text-[#202436]">
                      {item.tahap}
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
                      {item.judul}
                    </h3>
                    <p className="text-[14px] leading-6 text-[#8F96A3]">
                      {item.deskripsi}
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