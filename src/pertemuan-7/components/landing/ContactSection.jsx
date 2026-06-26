import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const CONTACT_INFO = [
  { icon: "location_on", label: "Alamat",          value: "Jl. Umbansari No.1, Pekanbaru, Riau 28265" },
  { icon: "mail",        label: "Email",            value: "hello@travelgo.com",          href: "mailto:hello@travelgo.com" },
  { icon: "phone",       label: "WhatsApp",         value: "+62 706 888 0562",             href: "https://wa.me/6270688805620" },
  { icon: "schedule",    label: "Jam Operasional",  value: "Senin–Jumat, 08.00–17.00 WIB" },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
              Hubungi Kami
            </p>
            <h2 className="text-[30px] md:text-[40px] font-black text-[#1D3557] leading-tight">
              Hubungi{" "}
              <span className="text-[#4F7DF3]">Travel Consultant</span> Kami
            </h2>
            <p className="mt-4 text-[#64748B] text-[15px] max-w-xl mx-auto leading-relaxed">
              Tim travel consultant TravelGo siap membantu merencanakan
              perjalanan impian Anda. Tanyakan apa saja, kami siap menjawab!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── LEFT: Form ── */}
          <ScrollReveal direction="right">
            <div className="bg-[#F8FAFF] rounded-2xl border border-[#E5E7EB] p-7">
              <h3 className="text-[18px] font-bold text-[#1D3557] mb-6">Kirim Pesan ke Travel Consultant</h3>

              {sent && (
                <div className="mb-5 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#ECFDF5] border border-[#10B981]/20 text-[#10B981] text-[13px] font-semibold">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Pesan terkirim! Travel consultant kami akan segera menghubungi Anda.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[12px] font-bold text-[#1D3557] mb-1.5">
                      Nama Lengkap <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Bianca Bahi"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full h-10 px-3.5 rounded-xl border border-[#E5E7EB] bg-white text-[13px] text-[#1D3557] placeholder:text-gray-300 focus:outline-none focus:border-[#4F7DF3] focus:ring-2 focus:ring-[#4F7DF3]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[12px] font-bold text-[#1D3557] mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="bianca@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full h-10 px-3.5 rounded-xl border border-[#E5E7EB] bg-white text-[13px] text-[#1D3557] placeholder:text-gray-300 focus:outline-none focus:border-[#4F7DF3] focus:ring-2 focus:ring-[#4F7DF3]/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-[12px] font-bold text-[#1D3557] mb-1.5">
                    Destinasi yang Diminati
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    placeholder="Bali, Lombok, Bromo, Raja Ampat..."
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full h-10 px-3.5 rounded-xl border border-[#E5E7EB] bg-white text-[13px] text-[#1D3557] placeholder:text-gray-300 focus:outline-none focus:border-[#4F7DF3] focus:ring-2 focus:ring-[#4F7DF3]/10 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[12px] font-bold text-[#1D3557] mb-1.5">
                    Pesan / Pertanyaan <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Ceritakan rencana liburanmu atau tanyakan paket yang tersedia..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-3.5 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[13px] text-[#1D3557] placeholder:text-gray-300 focus:outline-none focus:border-[#4F7DF3] focus:ring-2 focus:ring-[#4F7DF3]/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-[#4F7DF3] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-md shadow-[#4F7DF3]/20 hover:bg-[#3B6AE8] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  Kirim ke Travel Consultant
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* ── RIGHT: Contact info + Map ── */}
          <ScrollReveal direction="left" delay={100}>
            <div className="flex flex-col gap-5 h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTACT_INFO.map(info => (
                  <div key={info.label} className="flex items-start gap-3 p-4 rounded-2xl border border-[#E5E7EB] bg-white hover:border-[#4F7DF3]/20 hover:shadow-sm transition-all group">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF4FF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4F7DF3] transition-colors duration-200">
                      <span className="material-symbols-outlined text-[18px] text-[#4F7DF3] group-hover:text-white transition-colors duration-200">{info.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-[#94A3B8] font-semibold mb-0.5">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-[13px] font-semibold text-[#1D3557] hover:text-[#4F7DF3] transition-colors break-all">{info.value}</a>
                      ) : (
                        <p className="text-[13px] font-semibold text-[#1D3557] leading-snug">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div
                className="flex-1 min-h-[180px] rounded-2xl border border-[#E5E7EB] overflow-hidden relative bg-[#EEF4FF]"
                style={{ backgroundImage: "linear-gradient(rgba(79,125,243,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,125,243,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4F7DF3] flex items-center justify-center shadow-lg shadow-[#4F7DF3]/30">
                    <span className="material-symbols-outlined text-white text-[22px]">location_on</span>
                  </div>
                  <div className="bg-white rounded-xl px-4 py-2 shadow-md border border-[#E5E7EB]">
                    <p className="text-[12px] font-bold text-[#1D3557]">TravelGo Travel</p>
                    <p className="text-[11px] text-[#64748B]">Pekanbaru, Riau, Indonesia</p>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-[#4F7DF3]/10 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-[#4F7DF3]/5 pointer-events-none" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
