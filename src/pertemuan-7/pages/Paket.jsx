import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Paket() {
  const [paket, setPaket] = useState([
    {
      id: 1,
      name: "Bali Tour 3D2N",
      location: "Bali",
      price: "Rp 2.500.000",
      duration: "3 Hari",
      status: "Active",
    },
    {
      id: 2,
      name: "Lombok Trip",
      location: "Lombok",
      price: "Rp 3.200.000",
      duration: "4 Hari",
      status: "Active",
    },
    {
      id: 3,
      name: "Raja Ampat Explore",
      location: "Papua",
      price: "Rp 7.800.000",
      duration: "5 Hari",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Bandung Holiday",
      location: "Bandung",
      price: "Rp 1.800.000",
      duration: "2 Hari",
      status: "Active",
    },
    {
      id: 5,
      name: "Yogyakarta Trip",
      location: "Jogja",
      price: "Rp 2.200.000",
      duration: "3 Hari",
      status: "Active",
    },
    {
      id: 6,
      name: "Bromo Sunrise",
      location: "Malang",
      price: "Rp 1.500.000",
      duration: "2 Hari",
      status: "Active",
    },
    {
      id: 7,
      name: "Labuan Bajo",
      location: "NTT",
      price: "Rp 5.200.000",
      duration: "4 Hari",
      status: "Active",
    },
    {
      id: 8,
      name: "Malang Trip",
      location: "Malang",
      price: "Rp 1.900.000",
      duration: "3 Hari",
      status: "Inactive",
    },
    {
      id: 9,
      name: "Jakarta City Tour",
      location: "Jakarta",
      price: "Rp 1.200.000",
      duration: "1 Hari",
      status: "Active",
    },
    {
      id: 10,
      name: "Singapore Tour",
      location: "Singapore",
      price: "Rp 6.500.000",
      duration: "3 Hari",
      status: "Active",
    },
    {
      id: 11,
      name: "Thailand Trip",
      location: "Thailand",
      price: "Rp 5.800.000",
      duration: "4 Hari",
      status: "Active",
    },
    {
      id: 12,
      name: "Malaysia Tour",
      location: "Malaysia",
      price: "Rp 4.300.000",
      duration: "3 Hari",
      status: "Inactive",
    },
    {
      id: 13,
      name: "Bali Luxury",
      location: "Bali",
      price: "Rp 8.200.000",
      duration: "5 Hari",
      status: "Active",
    },
    {
      id: 14,
      name: "Medan Trip",
      location: "Medan",
      price: "Rp 2.700.000",
      duration: "3 Hari",
      status: "Inactive",
    },
    {
      id: 15,
      name: "Padang Tour",
      location: "Padang",
      price: "Rp 3.100.000",
      duration: "3 Hari",
      status: "Active",
    },
    {
      id: 16,
      name: "Makassar Trip",
      location: "Makassar",
      price: "Rp 3.600.000",
      duration: "4 Hari",
      status: "Active",
    },
    {
      id: 17,
      name: "Bandung Staycation",
      location: "Bandung",
      price: "Rp 1.400.000",
      duration: "2 Hari",
      status: "Active",
    },
    {
      id: 18,
      name: "Jogja Adventure",
      location: "Jogja",
      price: "Rp 2.900.000",
      duration: "3 Hari",
      status: "Inactive",
    },
    {
      id: 19,
      name: "Bali Honeymoon",
      location: "Bali",
      price: "Rp 9.500.000",
      duration: "5 Hari",
      status: "Active",
    },
    {
      id: 20,
      name: "Lombok Explore",
      location: "Lombok",
      price: "Rp 3.800.000",
      duration: "4 Hari",
      status: "Active",
    },
  ]);

  const handleDelete = (id) => {
    const confirmDelete = confirm("Yakin mau hapus paket?");
    if (!confirmDelete) return;

    setPaket(paket.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    alert(`Edit paket: ${item.name}`);
  };

  return (
    <div className="flex-1 bg-[#f9f9f9] min-h-screen overflow-y-auto">
      <div className="p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* HEADER */}
          <PageHeader
            title="Kelola Paket Wisata"
            breadcrumb="TravelGo."
            actions={
              <button className="flex items-center gap-2 px-4 py-2 bg-[#C49C74] text-white rounded-lg text-sm shadow hover:shadow-md">
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                Tambah Paket
              </button>
            }
          />

          {/* TABLE */}
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#f9f9f9]">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold">ID</th>
                  <th className="p-4 text-left text-sm font-semibold">
                    Nama Paket
                  </th>
                  <th className="p-4 text-left text-sm font-semibold">
                    Lokasi
                  </th>
                  <th className="p-4 text-left text-sm font-semibold">
                    Durasi
                  </th>
                  <th className="p-4 text-left text-sm font-semibold">Harga</th>
                  <th className="p-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {paket.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{item.id}</td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4">{item.location}</td>
                    <td className="p-4">{item.duration}</td>
                    <td className="p-4">{item.price}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-600"
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
