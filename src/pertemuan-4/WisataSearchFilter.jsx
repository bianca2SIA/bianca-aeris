import { useState } from "react";
import wisataData from "./wisata.json";

export default function WisataSearchFilter() {

  /* Inisialisasi DataForm */
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
    selectedTag: ""
  });

  /* Handle perubahan input */
  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setDataForm({
      ...dataForm,
      [name]: value
    });
  };

  /* Logic Search & Filter */
  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const filteredWisata = wisataData.filter((item) => {

    const matchesSearch =
      item.name.toLowerCase().includes(_searchTerm) ||
      item.description.toLowerCase().includes(_searchTerm);

    const matchesCategory =
      dataForm.selectedCategory
        ? item.category === dataForm.selectedCategory
        : true;

    const matchesTag =
      dataForm.selectedTag
        ? item.tags.includes(dataForm.selectedTag)
        : true;

    return matchesSearch && matchesCategory && matchesTag;
  });

  /* Ambil Category unik */
  const allCategory = [
    ...new Set(wisataData.map((item) => item.category))
  ];

  /* Ambil Tags unik */
  const allTags = [
    ...new Set(wisataData.flatMap((item) => item.tags))
  ];

  return (

    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-indigo-100 p-6 md:p-10 font-sans selection:bg-blue-200 selection:text-blue-900">

      <div className="text-center mb-12 max-w-3xl mx-auto">
      <h1 className="flex items-center justify-center gap-3 text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm pb-2">
  <span className="text-gray-800 drop-shadow-none">🌍</span>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
    Explore Wisata Indonesia
  </span>
</h1>

        <p className="text-gray-500 mt-3 text-lg font-medium">
          Temukan destinasi wisata terbaik di Indonesia
        </p>
      </div>

      {/* Search + Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 max-w-5xl mx-auto">

        <input
          type="text"
          name="searchTerm"
          placeholder="🔍 Search wisata..."
          className="w-full p-3.5 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 hover:bg-white hover:shadow-md"
          onChange={handleChange}
        />

        <select
          name="selectedCategory"
          className="w-full p-3.5 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 outline-none transition-all duration-300 text-gray-700 hover:bg-white hover:shadow-md appearance-none cursor-pointer"
          onChange={handleChange}
        >
          <option value="">✨ All Category</option>

          {allCategory.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}

        </select>

        <select
          name="selectedTag"
          className="w-full p-3.5 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 outline-none transition-all duration-300 text-gray-700 hover:bg-white hover:shadow-md appearance-none cursor-pointer"
          onChange={handleChange}
        >
          <option value="">🏷️ All Tags</option>

          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}

        </select>

      </div>


      {/* Card Guest */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

        {filteredWisata.map((item) => (

          <div 
            key={item.id} 
            className="group flex flex-col border border-gray-100/80 rounded-2xl shadow-lg bg-white/95 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
          >

            <div className="relative w-full h-52 overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="p-5 flex flex-col flex-grow">

              <h2 className="font-bold text-xl text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                {item.name}
              </h2>

              <p className="text-sm text-gray-600 mt-2 mb-4 line-clamp-3 flex-grow leading-relaxed">
                {item.description}
              </p>

              <p className="text-sm font-semibold text-indigo-500 mt-2 flex items-center">
                📍 {item.location.city}
              </p>

              <p className="text-sm font-bold text-amber-500 bg-amber-50 border border-amber-100 w-fit px-2.5 py-1 rounded-lg mt-2 mb-2 flex items-center shadow-sm">
                ⭐ {item.rating.score}
              </p>

              <div className="mt-auto pt-4 border-t border-gray-100/80 flex flex-wrap gap-2">

                {item.tags.map((tag, index) => (

                  <span
                    key={index}
                    className="bg-indigo-50 border border-indigo-100 text-indigo-600 px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-sm"
                  >
                    {tag}
                  </span>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}