import { useState } from "react";
import AccordionItem from "./AccordionItem";

const FAQS = [
  {
    question: "Apa itu TravelGo CRM?",
    answer:
      "TravelGo CRM adalah platform Customer Relationship Management yang dirancang khusus untuk bisnis travel. Sistem ini membantu Anda mengelola customer, paket wisata, booking, transaksi, promo, dan laporan bisnis dalam satu dashboard modern yang terintegrasi.",
  },
  {
    question: "Apakah bisa melakukan booking online melalui TravelGo CRM?",
    answer:
      "Ya, TravelGo CRM dilengkapi dengan fitur booking online yang memungkinkan customer melakukan pemesanan paket wisata secara langsung. Setiap booking masuk akan tercatat otomatis di dashboard admin dan dapat dikonfirmasi, diproses, atau dibatalkan sesuai kebutuhan.",
  },
  {
    question: "Apakah tersedia laporan dan analitik bisnis?",
    answer:
      "Tentu saja. TravelGo CRM menyediakan dashboard analitik real-time yang menampilkan grafik pendapatan bulanan, statistik booking, paket wisata terpopuler, dan performa customer. Laporan dapat difilter berdasarkan periode waktu tertentu untuk kebutuhan evaluasi bisnis.",
  },
  {
    question: "Bagaimana sistem membership dan role user bekerja?",
    answer:
      "TravelGo CRM menggunakan sistem role-based access. Admin memiliki akses penuh ke seluruh fitur manajemen. Member (customer) memiliki akses ke dashboard booking pribadi, riwayat perjalanan, wishlist paket, dan fitur feedback. Pendaftaran member dilakukan melalui halaman Register.",
  },
  {
    question: "Apakah TravelGo CRM menyediakan fitur promo dan deals?",
    answer:
      "Ya. Admin dapat membuat dan mengelola promo serta deals langsung dari panel admin. Promo bisa dikategorikan berdasarkan jenis (Flash Sale, Couple, Popular, dll), dilengkapi dengan periode berlaku dan badge diskon. Customer dapat melihat promo aktif di halaman member.",
  },
  {
    question: "Bagaimana cara menghubungi tim support TravelGo CRM?",
    answer:
      "Tim support TravelGo CRM tersedia 24/7. Anda dapat menghubungi kami melalui email di hello@travelgo.com atau WhatsApp di +62 706 888 0562. Tersedia juga fitur pesan langsung dari dalam aplikasi yang memungkinkan customer dan admin berkomunikasi secara real-time.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // buka item pertama by default

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#4F7DF3] text-[11px] font-black tracking-[0.2em] uppercase mb-3">
            Pertanyaan Umum
          </p>
          <h2 className="text-[30px] md:text-[40px] font-black text-[#1D3557] leading-tight">
            Ada yang ingin{" "}
            <span className="text-[#4F7DF3]">ditanyakan?</span>
          </h2>
          <p className="mt-4 text-[#64748B] text-[15px] max-w-lg mx-auto leading-relaxed">
            Kami menjawab pertanyaan yang paling sering diajukan oleh calon pengguna
            TravelGo CRM.
          </p>
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              index={i}
            />
          ))}
        </div>

        {/* Bottom CTA hint */}
        <p className="mt-10 text-center text-[13px] text-[#64748B]">
          Masih ada pertanyaan?{" "}
          <a
            href="mailto:hello@travelgo.com"
            className="text-[#4F7DF3] font-bold hover:underline"
          >
            Hubungi tim kami
          </a>
        </p>
      </div>
    </section>
  );
}
