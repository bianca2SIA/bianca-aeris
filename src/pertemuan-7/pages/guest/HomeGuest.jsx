/**
 * HomeGuest.jsx — Landing Page Final Polish
 *
 * 13 section — clean, focused, professional.
 *
 * FLOW (Traveloka-inspired):
 *  Hero → Search → Paket Wisata ★ → Destinasi
 *  → Promo → Why Choose → Member Dashboard
 *  → Admin Preview → Testimoni → FAQ → Contact → CTA → Footer
 *
 * Tidak diubah: Routing, API, Layout, Login, Register,
 *               Dashboard Member, Dashboard Admin.
 */

import HeroSection         from "../../components/landing/HeroSection";
import SearchTripSection   from "../../components/landing/SearchTripSection";
import PackagesSection     from "../../components/landing/PackagesSection";
import DestinationsSection from "../../components/landing/DestinationsSection";
import PromoSection        from "../../components/landing/PromoSection";
import WhyChooseSection    from "../../components/landing/WhyChooseSection";
import DashboardPreview    from "../../components/landing/DashboardPreview";
import AdminPreviewSection from "../../components/landing/AdminPreviewSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import FAQSection          from "../../components/landing/FAQSection";
import ContactSection      from "../../components/landing/ContactSection";
import CTASection          from "../../components/landing/CTASection";
import FooterPremium       from "../../components/landing/FooterPremium";
import ScrollProgress      from "../../components/landing/ScrollProgress";

export default function HomeGuest() {
  return (
    <main className="overflow-x-hidden" id="main-content">

      {/* Utilities */}
      <ScrollProgress />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Search Trip */}
      <SearchTripSection />

      {/* 3. Paket Wisata ★ — produk utama, tampilkan lebih awal */}
      <PackagesSection />

      {/* 4. Destinasi Populer — setelah paket agar user tahu opsi lokasi */}
      <DestinationsSection />

      {/* 5. Promo */}
      <PromoSection />

      {/* 6. Kenapa Memilih TravelGo */}
      <WhyChooseSection />

      {/* 7. Dashboard Member — preview fitur setelah login */}
      <DashboardPreview />

      {/* 8. Dashboard Admin — sistem CRM internal (mini) */}
      <AdminPreviewSection />

      {/* 9. Testimoni */}
      <TestimonialsSection />

      {/* 10. FAQ */}
      <FAQSection />

      {/* 11. Kontak */}
      <ContactSection />

      {/* 12. CTA */}
      <CTASection />

      {/* 13. Footer */}
      <FooterPremium />

    </main>
  );
}
