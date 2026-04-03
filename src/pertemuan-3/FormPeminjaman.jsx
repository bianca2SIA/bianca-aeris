import { useState } from "react";
import InputField from "./components/InputField";

export default function UserForm() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [judul, setJudul] = useState("");
  const [jenis, setJenis] = useState("");
  const [lama, setLama] = useState("");

  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newError = {};

    if (!nama) newError.nama = "Nama wajib diisi";
    else if (!isNaN(nama)) newError.nama = "Nama tidak boleh angka";

    if (!nim) newError.nim = "NIM wajib diisi";
    else if (isNaN(nim)) newError.nim = "NIM harus angka";

    if (!judul) newError.judul = "Judul buku wajib diisi";

    if (!jenis) newError.jenis = "Jenis buku wajib dipilih";

    if (!lama) newError.lama = "Lama peminjaman wajib dipilih";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-to-br from-blue-50 to-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Form Peminjaman Buku
        </h2>

        <InputField
          label="Nama"
          type="text"
          placeholder="Masukkan Nama"
          value={nama}
          onChange={(e) => {
            setNama(e.target.value);
            setSubmitted(false);
          }}
        />
        {error.nama && <div className="text-red-500 text-sm">{error.nama}</div>}

        <InputField
          label="NIM"
          type="text"
          placeholder="Masukkan NIM"
          value={nim}
          onChange={(e) => {
            setNim(e.target.value);
            setSubmitted(false);
          }}
        />
        {error.nim && <div className="text-red-500 text-sm">{error.nim}</div>}

        <InputField
          label="Judul Buku"
          type="text"
          placeholder="Masukkan Judul Buku"
          value={judul}
          onChange={(e) => {
            setJudul(e.target.value);
            setSubmitted(false);
          }}
        />
        {error.judul && (
          <div className="text-red-500 text-sm">{error.judul}</div>
        )}

        <label className="block text-gray-700 mt-3">Jenis Buku</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => {
            setJenis(e.target.value);
            setSubmitted(false);
          }}
        >
          <option value="">Pilih Jenis</option>
          <option>Novel</option>
          <option>Pendidikan</option>
          <option>Teknologi</option>
        </select>

        {error.jenis && (
          <div className="text-red-500 text-sm">{error.jenis}</div>
        )}

        <label className="block text-gray-700 mt-3">Lama Peminjaman</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => {
            setLama(e.target.value);
            setSubmitted(false);
          }}
        >
          <option value="">Pilih Lama</option>
          <option>3 Hari</option>
          <option>5 Hari</option>
          <option>7 Hari</option>
        </select>
        {error.lama && <div className="text-red-500 text-sm">{error.lama}</div>}
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg mt-4 transition duration-200"
        >
          Simpan
        </button>

        {/* Conditional Rendering */}
        {submitted && (
          <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">
              Data Peminjaman
            </h3>
            <p>Nama : {nama}</p>
            <p>NIM : {nim}</p>
            <p>Judul Buku : {judul}</p>
            <p>Jenis Buku : {jenis}</p>
            <p>Lama Pinjam : {lama}</p>
          </div>
        )}
      </div>
    </div>
  );
}
