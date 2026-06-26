import { useState } from "react";

/* ──────────────────────────────────────────
   Data
────────────────────────────────────────── */
const CATEGORIES = [
  "Semua Kategori", "Alam & Petualangan", "Pantai & Laut",
  "Budaya & Sejarah", "City Tour", "Bulan Madu", "Family Trip",
];
const PERSONS = ["1 Orang", "2 Orang", "3–5 Orang", "6–10 Orang", "10+ Orang"];
const BUDGETS = ["Semua Budget", "< Rp 1 Juta", "Rp 1–3 Juta", "Rp 3–5 Juta", "Rp 5–10 Juta", "> Rp 10 Juta"];
const POPULAR_TAGS = ["Bali", "Lombok", "Bromo", "Raja Ampat", "Yogyakarta"];

const scrollToPackages = () => {
  const el = document.getElementById("paket");
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
};

/* ──────────────────────────────────────────
   Reusable sub-components
────────────────────────────────────────── */
function FieldLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-white/60 text-[11px] font-bold uppercase tracking-wide mb-1.5">
      {children}
    </label>
  );
}

function TextInput({ id, placeholder, value, onChange }) {
  return (
    <input
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full h-12 px-4 rounded-xl bg-white text-[13px] text-[#1D3557] placeholder:text-gray-300 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#4F7DF3]/40"
    />
  );
}

function DateInput({ id, value, onChange }) {
  return (
    <input
      id={id}
      type="date"
      value={value}
      onChange={onChange}
      className="w-full h-12 px-4 rounded-xl bg-white text-[13px] text-[#1D3557] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#4F7DF3]/40"
    />
  );
}

function SelectInput({ id, value, onChange, options }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full h-12 px-4 rounded-xl bg-white text-[13px] text-[#1D3557] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#4F7DF3]/40 appearance-none"
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

/* ──────────────────────────────────────────
   Main component
────────────────────────────────────────── */
export default function SearchTripSection() {
  const [form, setForm] = useState({
    dest: "", departure: "", returnDate: "",
    persons: "2 Orang", category: "Semua Kategori", budget: "Semua Budget",
  });

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSearch = (e) => {
    e.preventDefault();
    scrollToPackages();
  };

  return (
    <section
      id="search"
      className="relative bg-[#1D3557] py-10 lg:py-12 overflow-hidden"
      aria-label="Cari paket wisata"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-5 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-7">
          <h2 className="text-[20px] md:text-[24px] font-black text-white">
            Cari Paket Wisata Impianmu
          </h2>
          <p className="text-white/45 text-[13px] mt-1">
            300+ paket wisata tersedia — temukan yang terbaik untukmu
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSearch}
          className="bg-white/8 border border-white/10 rounded-2xl p-5 md:p-6"
        >
          {/* Row 1: 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <FieldLabel htmlFor="s-dest">Destinasi</FieldLabel>
              <TextInput
                id="s-dest"
                placeholder="Bali, Lombok, Bromo..."
                value={form.dest}
                onChange={set("dest")}
              />
            </div>
            <div>
              <FieldLabel htmlFor="s-dep">Tanggal Berangkat</FieldLabel>
              <DateInput id="s-dep" value={form.departure} onChange={set("departure")} />
            </div>
            <div>
              <FieldLabel htmlFor="s-ret">Tanggal Pulang</FieldLabel>
              <DateInput id="s-ret" value={form.returnDate} onChange={set("returnDate")} />
            </div>
          </div>

          {/* Row 2: 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <FieldLabel htmlFor="s-per">Jumlah Orang</FieldLabel>
              <SelectInput id="s-per" value={form.persons} onChange={set("persons")} options={PERSONS} />
            </div>
            <div>
              <FieldLabel htmlFor="s-cat">Kategori</FieldLabel>
              <SelectInput id="s-cat" value={form.category} onChange={set("category")} options={CATEGORIES} />
            </div>
            <div>
              <FieldLabel htmlFor="s-bud">Budget</FieldLabel>
              <SelectInput id="s-bud" value={form.budget} onChange={set("budget")} options={BUDGETS} />
            </div>
          </div>

          {/* Submit — centered, not full-width */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="h-11 px-10 rounded-xl bg-[#4F7DF3] text-white font-bold text-[14px] flex items-center gap-2 shadow-lg shadow-[#4F7DF3]/30 hover:bg-[#3B6AE8] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Cari Paket
            </button>
          </div>
        </form>

        {/* Popular tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2 justify-center">
          <span className="text-white/30 text-[11px]">Populer:</span>
          {POPULAR_TAGS.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => { setForm(f => ({ ...f, dest: tag })); scrollToPackages(); }}
              className="px-3 py-1 rounded-full bg-white/6 border border-white/10 text-white/50 text-[11px] font-medium hover:bg-white/15 hover:text-white transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
