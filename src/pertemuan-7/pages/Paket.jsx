import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import paketData from "../data/paket.json";

import {
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaSuitcaseRolling,
} from "react-icons/fa";

export default function Paket() {

  const [paket, setPaket] = useState(paketData);

  const handleDelete = (id) => {
    const confirmDelete = confirm("Yakin mau hapus paket?");
    if (!confirmDelete) return;

    setPaket(paket.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    alert(`Edit paket: ${item.name}`);
  };

  return (
    <div className="flex-1 bg-[#f6f6f6] min-h-screen overflow-y-auto">

      <div className="p-8">

       <div className="w-full flex flex-col gap-8">

          {/* HEADER */}
          <PageHeader
            title="Kelola Paket Wisata"
            breadcrumb="TravelGo."
            actions={
              <button className="flex items-center gap-2 px-5 py-3 bg-[#C49C74] hover:bg-[#b58b63] text-white rounded-2xl text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">

                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>

                Tambah Paket

              </button>
            }
          />

          {/* TOP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* CARD 1 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-xl transition duration-300 group">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">
                    Total Paket
                  </p>

                  <h1 className="text-4xl font-bold text-gray-700 mt-2">
                    {paket.length}
                  </h1>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:scale-110 transition">
                  <FaSuitcaseRolling className="text-2xl text-[#C49C74]" />
                </div>

              </div>

            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-xl transition duration-300 group">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">
                    Active Paket
                  </p>

                  <h1 className="text-4xl font-bold text-green-500 mt-2">
                    {
                      paket.filter(
                        (item) => item.status === "Active"
                      ).length
                    }
                  </h1>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition">
                  <FaMapMarkerAlt className="text-2xl text-green-500" />
                </div>

              </div>

            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-xl transition duration-300 group">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">
                    Total Revenue
                  </p>

                  <h1 className="text-3xl font-bold text-[#C49C74] mt-2">
                    Rp 85JT
                  </h1>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center group-hover:scale-110 transition">
                  <FaMoneyBillWave className="text-2xl text-yellow-500" />
                </div>

              </div>

            </div>

          </div>

          {/* TABLE */}
          <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">

            {/* TABLE HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">

              <div>

                <h1 className="text-2xl font-bold text-gray-700">
                  Data Paket Wisata
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                  Kelola seluruh data paket travel
                </p>

              </div>

              <button className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-sm font-medium transition">
                Filter
              </button>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-[#fafafa]">

                  <tr>

                    <th className="p-5 text-left text-sm font-bold text-gray-500">
                      ID
                    </th>

                    <th className="p-5 text-left text-sm font-bold text-gray-500">
                      Nama Paket
                    </th>

                    <th className="p-5 text-left text-sm font-bold text-gray-500">
                      Lokasi
                    </th>

                    <th className="p-5 text-left text-sm font-bold text-gray-500">
                      Durasi
                    </th>

                    <th className="p-5 text-left text-sm font-bold text-gray-500">
                      Harga
                    </th>

                    <th className="p-5 text-left text-sm font-bold text-gray-500">
                      Status
                    </th>

                    <th className="p-5 text-left text-sm font-bold text-gray-500">
                      Aksi
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {paket.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-stone-100 hover:bg-stone-50 transition duration-200"
                    >

                      <td className="p-5 font-semibold text-gray-500">
                        #{item.id}
                      </td>

                      <td className="p-5">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-full bg-[#C49C74] text-white flex items-center justify-center font-bold">
                            {item.name.charAt(0)}
                          </div>

                          <div>

                            <Link
                              to={`/paket/${item.id}`}
                              className="font-semibold text-gray-700 hover:text-[#C49C74] transition"
                            >
                              {item.name}
                            </Link>

                            <p className="text-xs text-gray-400">
                              Travel Package
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="p-5 font-medium text-gray-600">
                        {item.location}
                      </td>

                      <td className="p-5 text-gray-500">
                        {item.duration}
                      </td>

                      <td className="p-5 font-semibold text-[#C49C74]">
                        {item.price}
                      </td>

                      <td className="p-5">

                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold ${
                            item.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td className="p-5">

                        <div className="flex items-center gap-3">

                          {/* EDIT */}
                          <button
                            onClick={() => handleEdit(item)}
                            className="w-10 h-10 rounded-xl bg-blue-100 hover:bg-blue-500 text-blue-500 hover:text-white flex items-center justify-center transition duration-300 hover:scale-110"
                          >
                            <FaEdit />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition duration-300 hover:scale-110"
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}