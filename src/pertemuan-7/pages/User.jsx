import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function User() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Andi Saputra",
      email: "andi@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 2,
      name: "Siti Rahma",
      email: "siti@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budi@mail.com",
      role: "Customer",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Rina Oktavia",
      email: "rina@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 5,
      name: "Dewi Lestari",
      email: "dewi@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 6,
      name: "Fajar Nugroho",
      email: "fajar@mail.com",
      role: "Customer",
      status: "Inactive",
    },
    {
      id: 7,
      name: "Agus Pratama",
      email: "agus@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 8,
      name: "Putri Amelia",
      email: "putri@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 9,
      name: "Yoga Prakoso",
      email: "yoga@mail.com",
      role: "Customer",
      status: "Inactive",
    },
    {
      id: 10,
      name: "Lina Marlina",
      email: "lina@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 11,
      name: "Rizky Hidayat",
      email: "rizky@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 12,
      name: "Nina Kartika",
      email: "nina@mail.com",
      role: "Customer",
      status: "Inactive",
    },
    {
      id: 13,
      name: "Dian Pratama",
      email: "dian@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 14,
      name: "Wahyu Saputra",
      email: "wahyu@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 15,
      name: "Intan Sari",
      email: "intan@mail.com",
      role: "Customer",
      status: "Inactive",
    },
    {
      id: 16,
      name: "Reza Maulana",
      email: "reza@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 17,
      name: "Farah Nabila",
      email: "farah@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 18,
      name: "Hendra Wijaya",
      email: "hendra@mail.com",
      role: "Customer",
      status: "Inactive",
    },
    {
      id: 19,
      name: "Tika Ramadhani",
      email: "tika@mail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 20,
      name: "Arif Kurniawan",
      email: "arif@mail.com",
      role: "Customer",
      status: "Active",
    },
  ]);

  // DELETE
  const handleDelete = (id) => {
    const confirmDelete = confirm("Yakin mau hapus user?");
    if (!confirmDelete) return;

    setUsers(users.filter((user) => user.id !== id));
  };

  // EDIT (sementara alert dulu)
  const handleEdit = (user) => {
    alert(`Edit user: ${user.name}`);
  };

  return (
    <div className="flex-1 bg-[#f9f9f9] min-h-screen overflow-y-auto">
      <div className="p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* HEADER */}
          <PageHeader
            title="Kelola User"
            breadcrumb="TravelGo. "
            actions={
              <button className="flex items-center gap-2 px-4 py-2 bg-[#C49C74] text-white rounded-lg text-sm shadow hover:shadow-md">
                <span className="material-symbols-outlined text-[18px]">
                  person_add
                </span>
                Tambah User
              </button>
            }
          />

          {/* TABLE */}
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#f9f9f9]">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold">ID</th>
                  <th className="p-4 text-left text-sm font-semibold">Nama</th>
                  <th className="p-4 text-left text-sm font-semibold">Email</th>
                  <th className="p-4 text-left text-sm font-semibold">Role</th>
                  <th className="p-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{user.id}</td>
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-[#81756a]">{user.email}</td>
                    <td className="p-4">{user.role}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs hover:bg-blue-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
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
