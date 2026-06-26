import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ChatbotButton — Floating support button kanan bawah
 *
 * Popup berisi 2 channel:
 *  1. WhatsApp  — untuk guest / calon customer (sebelum daftar)
 *  2. Messages Member — fitur internal TravelGo setelah login
 */
export default function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const WA_NUMBER = "6281234567890"; // ganti dengan nomor WA TravelGo
  const WA_TEXT   = encodeURIComponent("Halo TravelGo! Saya ingin mengetahui lebih lanjut tentang paket wisata yang tersedia.");

  return (
    <>
      {/* ── Popup ── */}
      {open && (
        <>
          {/* Backdrop — tutup popup saat klik luar */}
          <div
            className="fixed inset-0 z-[55]"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />

          <div
            className="fixed bottom-24 right-6 z-[60] w-72 bg-white rounded-2xl shadow-2xl shadow-black/15 border border-[#E5E7EB] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="TravelGo Support"
          >
            {/* Header */}
            <div className="bg-[#4F7DF3] px-4 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-[18px]">support_agent</span>
              </div>
              <div>
                <p className="text-white font-black text-[15px] leading-tight">TravelGo Support</p>
                <p className="text-white/75 text-[11px] mt-0.5">Siap membantu 24/7</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p className="text-[13px] text-[#475569] leading-relaxed">
                Halo! Ada yang bisa kami bantu?
              </p>

              {/* ── WhatsApp — untuk guest ── */}
              <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="px-3.5 py-2 bg-[#F0FDF4] border-b border-[#E5E7EB]">
                  <p className="text-[11px] font-black text-[#16A34A] flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#16A34A]" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.1 1.523 5.817L.057 23.27a.75.75 0 0 0 .918.905l5.65-1.482A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.719 9.719 0 0 1-4.952-1.353l-.355-.213-3.652.958.974-3.555-.232-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                    </svg>
                    Chat via WhatsApp
                  </p>
                </div>
                <div className="px-3.5 py-2.5">
                  <p className="text-[11px] text-[#64748B] mb-2.5 leading-relaxed">
                    Untuk calon pelanggan yang belum memiliki akun. Tanya apa saja seputar paket wisata langsung ke tim kami.
                  </p>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-9 rounded-lg bg-[#25D366] text-white font-bold text-[12px] hover:bg-[#1EBD5B] transition-colors duration-200"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.1 1.523 5.817L.057 23.27a.75.75 0 0 0 .918.905l5.65-1.482A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.719 9.719 0 0 1-4.952-1.353l-.355-.213-3.652.958.974-3.555-.232-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                    </svg>
                    Mulai Chat WhatsApp
                  </a>
                </div>
              </div>

              {/* ── Messages Member — untuk member ── */}
              <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="px-3.5 py-2 bg-[#EEF4FF] border-b border-[#E5E7EB]">
                  <p className="text-[11px] font-black text-[#4F7DF3] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[13px]">chat</span>
                    Messages Member
                  </p>
                </div>
                <div className="px-3.5 py-2.5">
                  <p className="text-[11px] text-[#64748B] mb-2.5 leading-relaxed">
                    Sudah punya akun? Login sebagai member untuk menghubungi Customer Service melalui fitur <strong className="text-[#1D3557]">Messages</strong> yang terhubung langsung dengan tim TravelGo.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setOpen(false); navigate("/login"); }}
                    className="flex items-center justify-center gap-2 w-full h-9 rounded-lg bg-[#EEF4FF] text-[#4F7DF3] font-bold text-[12px] hover:bg-[#E0ECFF] transition-colors duration-200 border border-[#4F7DF3]/20"
                  >
                    <span className="material-symbols-outlined text-[15px]">login</span>
                    Login &amp; Buka Messages
                  </button>
                </div>
              </div>

              {/* Tutup */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full h-8 rounded-xl border border-[#E5E7EB] text-[#94A3B8] font-semibold text-[11px] hover:bg-[#F8FAFF] hover:text-[#475569] transition-colors duration-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Floating Button ── */}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? "Tutup support" : "Buka TravelGo Support"}
        aria-expanded={open}
        className="fixed right-6 bottom-6 z-50 w-14 h-14 rounded-2xl bg-[#4F7DF3] text-white shadow-lg shadow-[#4F7DF3]/35 flex items-center justify-center hover:bg-[#3B6AE8] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
      >
        <span
          className="material-symbols-outlined text-[24px] transition-transform duration-300"
          style={{ transform: open ? "rotate(15deg)" : "rotate(0deg)" }}
        >
          {open ? "close" : "support_agent"}
        </span>
      </button>
    </>
  );
}
