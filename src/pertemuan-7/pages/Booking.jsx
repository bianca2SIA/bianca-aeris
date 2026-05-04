import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Booking() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: "Andi Saputra",
      package: "Bali Tour",
      date: "12 Mei 2026",
      total: "Rp 2.500.000",
      status: "Confirmed",
    },
    {
      id: 2,
      customer: "Siti Rahma",
      package: "Lombok Trip",
      date: "15 Mei 2026",
      total: "Rp 3.200.000",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Budi Santoso",
      package: "Raja Ampat",
      date: "20 Mei 2026",
      total: "Rp 7.800.000",
      status: "Cancelled",
    },
    {
      id: 4,
      customer: "Rina Oktavia",
      package: "Bandung Holiday",
      date: "25 Mei 2026",
      total: "Rp 1.800.000",
      status: "Confirmed",
    },
    {
      id: 5,
      customer: "Dewi Lestari",
      package: "Yogyakarta Trip",
      date: "28 Mei 2026",
      total: "Rp 2.200.000",
      status: "Pending",
    },
    {
      id: 6,
      customer: "Fajar Nugroho",
      package: "Bromo Sunrise",
      date: "30 Mei 2026",
      total: "Rp 1.500.000",
      status: "Confirmed",
    },
    {
      id: 7,
      customer: "Agus Pratama",
      package: "Labuan Bajo",
      date: "02 Juni 2026",
      total: "Rp 5.200.000",
      status: "Confirmed",
    },
    {
      id: 8,
      customer: "Putri Amelia",
      package: "Malang Trip",
      date: "05 Juni 2026",
      total: "Rp 1.900.000",
      status: "Cancelled",
    },
    {
      id: 9,
      customer: "Yoga Prakoso",
      package: "Jakarta City Tour",
      date: "08 Juni 2026",
      total: "Rp 1.200.000",
      status: "Pending",
    },
    {
      id: 10,
      customer: "Lina Marlina",
      package: "Singapore Tour",
      date: "10 Juni 2026",
      total: "Rp 6.500.000",
      status: "Confirmed",
    },
    {
      id: 11,
      customer: "Rizky Hidayat",
      package: "Thailand Trip",
      date: "12 Juni 2026",
      total: "Rp 5.800.000",
      status: "Confirmed",
    },
    {
      id: 12,
      customer: "Nina Kartika",
      package: "Malaysia Tour",
      date: "15 Juni 2026",
      total: "Rp 4.300.000",
      status: "Pending",
    },
    {
      id: 13,
      customer: "Dian Pratama",
      package: "Bali Luxury",
      date: "18 Juni 2026",
      total: "Rp 8.200.000",
      status: "Confirmed",
    },
    {
      id: 14,
      customer: "Wahyu Saputra",
      package: "Medan Trip",
      date: "20 Juni 2026",
      total: "Rp 2.700.000",
      status: "Cancelled",
    },
    {
      id: 15,
      customer: "Intan Sari",
      package: "Padang Tour",
      date: "22 Juni 2026",
      total: "Rp 3.100.000",
      status: "Pending",
    },
    {
      id: 16,
      customer: "Reza Maulana",
      package: "Makassar Trip",
      date: "25 Juni 2026",
      total: "Rp 3.600.000",
      status: "Confirmed",
    },
    {
      id: 17,
      customer: "Farah Nabila",
      package: "Bandung Staycation",
      date: "27 Juni 2026",
      total: "Rp 1.400.000",
      status: "Confirmed",
    },
    {
      id: 18,
      customer: "Hendra Wijaya",
      package: "Jogja Adventure",
      date: "30 Juni 2026",
      total: "Rp 2.900.000",
      status: "Cancelled",
    },
    {
      id: 19,
      customer: "Tika Ramadhani",
      package: "Bali Honeymoon",
      date: "02 Juli 2026",
      total: "Rp 9.500.000",
      status: "Confirmed",
    },
    {
      id: 20,
      customer: "Arif Kurniawan",
      package: "Lombok Explore",
      date: "05 Juli 2026",
      total: "Rp 3.800.000",
      status: "Pending",
    },
  ]);

  const handleDelete = (id) => {
    const confirmDelete = confirm("Yakin mau hapus booking?");
    if (!confirmDelete) return;

    setBookings(bookings.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    alert(`Edit booking: ${item.customer}`);
  };

  return (
    <div className="flex-1 bg-[#f9f9f9] min-h-screen overflow-y-auto">
      <div className="p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* HEADER */}
          <PageHeader
            title="Kelola Booking"
            breadcrumb="TravelGo."
            actions={
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#C49C74] text-white rounded-lg text-sm shadow hover:shadow-md">
                  <span className="material-symbols-outlined text-[18px]">
                    add
                  </span>
                  Tambah Booking
                </button>
              </>
            }
          />

          {/* TABLE */}
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#f9f9f9]">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold">ID</th>
                  <th className="p-4 text-left text-sm font-semibold">
                    Customer
                  </th>
                  <th className="p-4 text-left text-sm font-semibold">Paket</th>
                  <th className="p-4 text-left text-sm font-semibold">
                    Tanggal
                  </th>
                  <th className="p-4 text-left text-sm font-semibold">Total</th>
                  <th className="p-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{item.id}</td>
                    <td className="p-4 font-medium">{item.customer}</td>
                    <td className="p-4">{item.package}</td>
                    <td className="p-4">{item.date}</td>
                    <td className="p-4">{item.total}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "Confirmed"
                            ? "bg-green-100 text-green-600"
                            : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs hover:bg-blue-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-xs hover:bg-red-200"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
