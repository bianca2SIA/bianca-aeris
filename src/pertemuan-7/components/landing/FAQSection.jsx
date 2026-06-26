import ScrollReveal from "./ScrollReveal";
import AccordionItem from "./AccordionItem";
import { useState } from "react";

const FAQS = [
  {
    question: "Bagaimana cara booking paket wisata di TravelGo?",
    answer:
      "Pilih paket wisata yang kamu inginkan, klik 'Booking Sekarang', daftar atau login sebagai member, isi data peserta, lakukan pembayaran, dan e-tiket dikirim langsung ke emailmu. Prosesnya hanya 5 menit.",
  },
  {
    question: "Metode pembayaran apa yang tersedia?",
    answer:
      "TravelGo menerima transfer bank (BCA, Mandiri, BNI, BRI), dompet digital (GoPay, OVO, DANA), kartu kredit/debit, dan QRIS. Semua transaksi dilindungi enkripsi SSL 256-bit.",
  },
  {
    question: "Apakah bisa reschedule atau membatalkan booking?",
    answer:
      "Pembatalan lebih dari 14 hari sebelum keberangkatan mendapat refund 100%. Pembatalan 7–14 hari mendapat refund 50%. Kurang dari 7 hari dikenakan biaya penuh. Reschedule dapat dilakukan maksimal 7 hari sebelum keberangkatan.",
  },
  {
    question: "Apakah ada promo khusus untuk member TravelGo?",
    answer:
      "Ya! Member TravelGo mendapatkan akses ke flash sale eksklusif, early bird promo, diskon khusus, dan voucher yang tidak tersedia untuk tamu. Daftar gratis dan nikmati semua keuntungan member.",
  },
  {
    question: "Apakah tour guide sudah termasuk dalam semua paket?",
    answer:
      "Tour guide profesional sudah termasuk dalam paket Premium dan Exclusive. Untuk paket Regular, penambahan tour guide tersedia sebagai add-on. Semua tour guide TravelGo bersertifikat dan berpengalaman.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-14 md:py-18 bg-[#F8FAFF]">
      <div className="max-w-3xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">FAQ</p>
            <h2 className="text-[28px] md:text-[36px] font-black text-[#1D3557] leading-tight">
              Pertanyaan yang{" "}
              <span className="text-[#4F7DF3]">sering ditanyakan</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Accordion — 5 items */}
        <ScrollReveal delay={80}>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                index={i}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom link */}
        <ScrollReveal delay={100}>
          <p className="mt-7 text-center text-[13px] text-[#64748B]">
            Masih ada pertanyaan?{" "}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
              }}
              className="text-[#4F7DF3] font-bold hover:underline"
            >
              Hubungi travel consultant kami →
            </button>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
