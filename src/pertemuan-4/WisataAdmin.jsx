import wisataData from "./wisata.json";

export default function WisataAdmin() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-indigo-100 p-6 md:p-10 font-sans selection:bg-blue-200 selection:text-blue-900">

      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight drop-shadow-sm pb-2">
          ⚙️ Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1 text-base font-medium">
          Kelola data destinasi wisata Indonesia dengan mudah.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Container Tabel dengan efek Glassmorphism */}
        <div className="overflow-x-auto bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-gray-100/80">
          
          <table className="w-full text-left border-collapse whitespace-nowrap">
            
            <thead className="bg-indigo-50/80 border-b border-indigo-100">
              <tr>
                <th className="p-4 text-sm font-semibold text-indigo-900 uppercase tracking-wider text-center">No</th>
                <th className="p-4 text-sm font-semibold text-indigo-900 uppercase tracking-wider">Nama</th>
                <th className="p-4 text-sm font-semibold text-indigo-900 uppercase tracking-wider">Kategori</th>
                <th className="p-4 text-sm font-semibold text-indigo-900 uppercase tracking-wider">Lokasi</th>
                <th className="p-4 text-sm font-semibold text-indigo-900 uppercase tracking-wider text-center">Rating</th>
                <th className="p-4 text-sm font-semibold text-indigo-900 uppercase tracking-wider">Kontak</th>
                <th className="p-4 text-sm font-semibold text-indigo-900 uppercase tracking-wider">Tags</th>
                {/* Tambahan Kolom Aksi */}
                <th className="p-4 text-sm font-semibold text-indigo-900 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100/80">
              
              {wisataData.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-blue-50/40 transition duration-200"
                >
                  
                  <td className="p-4 text-gray-700 font-medium text-center">
                    {item.id}
                  </td>

                  <td className="p-4 text-gray-800 font-bold">
                    {item.name}
                  </td>

                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold">
                      {item.category}
                    </span>
                  </td>

                  <td className="p-4 text-indigo-600 text-sm font-medium">
                    📍 {item.location.city}
                  </td>

                  <td className="p-4 text-center">
                    <span className="bg-amber-50 border border-amber-100 text-amber-500 px-2.5 py-1 rounded-lg text-sm font-bold shadow-sm">
                      ⭐ {item.rating.score}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600 text-sm">
                    📞 {item.contact.phone}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-indigo-50 border border-indigo-100 text-indigo-600 px-2.5 py-1 text-xs font-semibold rounded-lg shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Tambahan Tombol Edit & Hapus */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 shadow-sm">
                        Edit
                      </button>
                      <button className="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 shadow-sm">
                        Hapus
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
  );
}