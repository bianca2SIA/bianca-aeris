import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ── Countdown ── */
function useCountdown() {
  const [secs, setSecs] = useState(() => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 0);
    return Math.max(0, Math.floor((end - now) / 1000));
  });
  useEffect(() => {
    const t = setInterval(() => setSecs(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = n => String(n).padStart(2, "0");
  return {
    h: pad(Math.floor(secs / 3600)),
    m: pad(Math.floor((secs % 3600) / 60)),
    s: pad(secs % 60),
  };
}

/* ── Promo cards data ── */
const PROMOS = [
  {
    id: "p1", tag: "Flash Sale", discount: "50%",
    title: "Paket Pilihan Terbaik",
    desc: "Diskon besar untuk paket Bali, Lombok, dan Bromo. Terbatas 20 pembeli pertama.",
    accent: "#EC4899",
  },
  {
    id: "p2", tag: "Early Bird", discount: "25%",
    title: "Booking Jauh Hari",
    desc: "Book 30 hari sebelum berangkat, hemat 25% + free airport transfer.",
    accent: "#10B981",
  },
  {
    id: "p3", tag: "Family Deal", discount: "20%",
    title: "Liburan Keluarga",
    desc: "Anak di bawah 5 tahun gratis. Diskon 20% untuk rombongan 5 orang ke atas.",
    accent: "#8B5CF6",
  },
  {
    id: "p4", tag: "Weekend", discount: "30%",
    title: "Weekend Getaway",
    desc: "Paket akhir pekan hemat 30% untuk semua destinasi domestik.",
    accent: "#F59E0B",
  },
];

const VOUCHERS = [
  { code: "TRAVELGO10", desc: "Diskon 10% booking pertama", color: "#4F7DF3" },
  { code: "MEMBER20",   desc: "Khusus Member Gold & Platinum", color: "#F59E0B" },
  { code: "WEEKEND30",  desc: "Flash sale akhir pekan",     color: "#EC4899" },
];

export default function PromoSection() {
  const navigate = useNavigate();
  const { h, m, s } = useCountdown();
  const [copied, setCopied] = useState("");

  const copy = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <section id="promo" className="py-14 md:py-16 bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* ── Heading ── */}
        <div className="text-center mb-10">
          <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-2">
            Promo &amp; Penawaran
          </p>
          <h2 className="text-[28px] md:text-[36px] font-black text-[#1D3557] leading-tight">
            Jangan lewatkan{" "}
            <span className="text-[#4F7DF3]">penawaran hari ini</span>
          </h2>
        </div>

        {/* ── Flash Sale Banner — solid card, no gradient opacity tricks ── */}
        <div
          className="mb-8 rounded-2xl p-6 md:p-7"
          style={{ backgroundColor: "#EC4899" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            {/* Left: Badge + Title */}
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <span className="material-symbols-outlined text-white text-[24px]">flash_on</span>
              </div>
              <div>
                <span
                  className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}
                >
                  Flash Sale Hari Ini
                </span>
                <h3 className="text-white font-black text-[22px] md:text-[26px] leading-tight">
                  Diskon 50% Paket Pilihan!
                </h3>
                <p className="text-white text-[13px] mt-1" style={{ opacity: 0.85 }}>
                  Terbatas 20 pembeli pertama — jangan sampai kehabisan
                </p>
              </div>
            </div>

            {/* Right: Countdown + CTA */}
            <div className="flex flex-col items-start sm:items-end gap-3 flex-shrink-0">
              {/* Countdown */}
              <div>
                <p className="text-white text-[10px] font-semibold mb-2" style={{ opacity: 0.85 }}>
                  Berakhir dalam:
                </p>
                <div className="flex items-center gap-2">
                  {[
                    { val: h, label: "JAM" },
                    { val: m, label: "MNT" },
                    { val: s, label: "DTK" },
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div
                        className="rounded-xl px-3 py-2 text-center min-w-[44px]"
                        style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                      >
                        <p className="text-white font-black text-[20px] leading-none tabular-nums">
                          {item.val}
                        </p>
                        <p className="text-white text-[9px] font-bold mt-1" style={{ opacity: 0.85 }}>
                          {item.label}
                        </p>
                      </div>
                      {i < 2 && (
                        <span className="text-white font-black text-[18px]">:</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="h-10 px-6 rounded-xl font-black text-[13px] transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#fff", color: "#EC4899" }}
              >
                Ambil Sekarang →
              </button>
            </div>

          </div>
        </div>

        {/* ── Promo Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {PROMOS.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Colored top bar */}
              <div
                className="h-2 w-full"
                style={{ backgroundColor: p.accent }}
              />
              <div className="p-4">
                {/* Tag + Discount */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: p.accent + "18", color: p.accent }}
                  >
                    {p.tag}
                  </span>
                  <span className="text-[24px] font-black leading-none" style={{ color: p.accent }}>
                    -{p.discount}
                  </span>
                </div>

                <h4 className="text-[13px] font-bold text-[#1D3557] mb-1">{p.title}</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed mb-4">{p.desc}</p>

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="w-full h-8 rounded-xl text-[11px] font-bold transition-all duration-200"
                  style={{
                    backgroundColor: p.accent + "12",
                    color: p.accent,
                    border: `1.5px solid ${p.accent}30`,
                  }}
                >
                  Klaim Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Voucher Strip ── */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="material-symbols-outlined text-[#4F7DF3] text-[20px]">
              confirmation_number
            </span>
            <div>
              <p className="text-[14px] font-black text-[#1D3557]">Voucher Eksklusif</p>
              <p className="text-[11px] text-[#94A3B8]">Salin kode, gunakan saat checkout</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {VOUCHERS.map(v => (
              <div
                key={v.code}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl border-2 border-dashed"
                style={{ borderColor: v.color + "40", backgroundColor: v.color + "08" }}
              >
                <div>
                  <p className="text-[13px] font-black" style={{ color: v.color }}>{v.code}</p>
                  <p className="text-[10px] text-[#94A3B8]">{v.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => copy(v.code)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: v.color + "15" }}
                  aria-label={`Salin ${v.code}`}
                >
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ color: v.color }}
                  >
                    {copied === v.code ? "check_circle" : "content_copy"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
