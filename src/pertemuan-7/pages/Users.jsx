import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { usersAPI } from "../../services/usersAPI.js";

export default function Users() {
const [users, setUsers] = useState([]);

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const [editId, setEditId] = useState(null);

const [dataForm, setDataForm] = useState({
  name: "",
  email: "",
  role: "User",
  phone: "",
  address: "",
});

const loadUsers = async () => {
  try {
    setLoading(true);
    setError("");

    const data = await usersAPI.fetchUsers();
    setUsers(data);
  } catch (err) {
    setError("Gagal memuat data user");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadUsers();
}, []);

const handleChange = (evt) => {
  const { name, value } = evt.target;

  setDataForm({
    ...dataForm,
    [name]: value,
  });
};

const resetForm = () => {
  setDataForm({
    name: "",
    email: "",
    role: "User",
    phone: "",
    address: "",
  });

  setEditId(null);
};

const handleEdit = (user) => {
  setEditId(user.id);

  setDataForm({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "User",
    phone: user.phone || "",
    address: user.address || "",
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!dataForm.name || !dataForm.email) {
    setError("Nama dan email wajib diisi");
    return;
  }

  try {
    setLoading(true);
    setError("");
    setSuccess("");

    if (editId) {
      await usersAPI.updateUser(editId, dataForm);
      setSuccess("Data user berhasil diperbarui");
    } else {
      await usersAPI.createUser(dataForm);
      setSuccess("Data user berhasil ditambahkan");
    }

    resetForm();
    loadUsers();

    setTimeout(() => setSuccess(""), 3000);
  } catch (err) {
    setError(`Terjadi kesalahan: ${err.message}`);
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  const konfirmasi = confirm("Yakin ingin menghapus user ini?");
  if (!konfirmasi) return;

  try {
    setLoading(true);
    setError("");
    setSuccess("");

    await usersAPI.deleteUser(id);

    setSuccess("Data user berhasil dihapus");
    loadUsers();

    setTimeout(() => setSuccess(""), 3000);
  } catch (err) {
    setError(`Terjadi kesalahan: ${err.message}`);
  } finally {
    setLoading(false);
  }
};

return (
  <div className="min-h-[calc(100vh-76px)] bg-[#F4F5F7] px-8 py-7 text-[#202436]">
    <div className="mb-6">

      <h2 className="text-[17px] font-bold">Kelola Users</h2>
    </div>

    {error && <AlertBox type="error">{error}</AlertBox>}
    {success && <AlertBox type="success">{success}</AlertBox>}

    <div className="bg-white rounded-[16px] shadow-sm p-6 mb-7">
      <h2 className="font-bold text-[18px] mb-5">
        {editId ? "Edit User" : "Tambah User"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          value={dataForm.name}
          onChange={handleChange}
          placeholder="Nama lengkap"
          disabled={loading}
          className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] disabled:opacity-60"
        />

        <input
          type="email"
          name="email"
          value={dataForm.email}
          onChange={handleChange}
          placeholder="Email"
          disabled={loading}
          className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] disabled:opacity-60"
        />

        <select
          name="role"
          value={dataForm.role}
          onChange={handleChange}
          disabled={loading}
          className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] disabled:opacity-60"
        >
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>

        <input
          type="text"
          name="phone"
          value={dataForm.phone}
          onChange={handleChange}
          placeholder="Nomor HP"
          disabled={loading}
          className="h-[46px] px-4 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] disabled:opacity-60"
        />

        <textarea
          name="address"
          value={dataForm.address}
          onChange={handleChange}
          placeholder="Alamat"
          disabled={loading}
          className="md:col-span-2 min-h-[90px] px-4 py-3 rounded-[12px] border border-[#E8EDF3] outline-none focus:border-[#70A9F8] resize-none disabled:opacity-60"
        />

        <div className="md:col-span-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="h-[44px] px-5 bg-[#70A9F8] text-white rounded-[12px] text-sm font-bold hover:bg-[#5D9AF2] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Mohon Tunggu..."
              : editId
                ? "Update User"
                : "Tambah User"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="h-[44px] px-5 bg-[#F4F5F7] text-[#596070] rounded-[12px] text-sm font-bold hover:bg-[#EAF4FF]"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>

    <div className="bg-white rounded-[16px] shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-[#EEF1F5] flex items-center justify-between">
        <h2 className="font-bold text-[18px]">Daftar Users ({users.length})</h2>
      </div>

      {loading && <LoadingSpinner text="Memuat data user..." />}

      {!loading && users.length === 0 && !error && (
        <EmptyState text="Belum ada data user. Tambah user pertama!" />
      )}

      {!loading && users.length === 0 && error && (
        <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />
      )}

      {!loading && users.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <GenericTable
            columns={["#", "Nama", "Email", "Role", "No HP", "Alamat", "Aksi"]}
            data={users}
            renderRow={(user, index) => (
              <>
                <td className="px-6 py-4 font-medium text-gray-700">
                  {index + 1}.
                </td>

                <td className="px-6 py-4 font-semibold text-[#202436]">
                  {user.name}
                </td>

                <td className="px-6 py-4 text-[#596070]">{user.email}</td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-[6px] bg-[#EAF4FF] text-[#5A91D6] text-[12px] font-bold">
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-[#596070]">
                  {user.phone || "-"}
                </td>

                <td className="px-6 py-4 text-[#596070]">
                  {user.address || "-"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(user)}
                      disabled={loading}
                      className="w-[34px] h-[34px] rounded-[8px] bg-[#EAF4FF] text-[#5A91D6] flex items-center justify-center hover:bg-[#70A9F8] hover:text-white transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={loading}
                      className="w-[34px] h-[34px] rounded-[8px] bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        </div>
      ) : null}
    </div>
  </div>
);
}