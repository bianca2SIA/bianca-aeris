/**
 * HomeGuest.jsx — Landing Page PRD V2
 *
 * Assembler komponen landing page TravelGo CRM.
 * Semua komponen ada di: src/pertemuan-7/components/landing/
 *
 * PRD V1 sections (tidak diubah):
 *   HeroSection, BenefitSection, DashboardPreview, LandingFooter
 *
 * PRD V2 sections (baru):
 *   StatisticsSection, TestimonialsSection, FAQSection,
 *   TrustedSection, CTASection
 *
 * Dilarang:
 *  - Mengubah routing (App.jsx)
 *  - Mengubah GuestLayout.jsx
 *  - Mengubah halaman Admin / MemberDashboard / Login / Register
 */

/* ── PRD V1 ── */
import HeroSection       from "../../components/landing/HeroSection";
import BenefitSection    from "../../components/landing/BenefitSection";
import DashboardPreview  from "../../components/landing/DashboardPreview";
import LandingFooter     from "../../components/landing/LandingFooter";

/* ── PRD V2 ── */
import StatisticsSection  from "../../components/landing/StatisticsSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import FAQSection         from "../../components/landing/FAQSection";
import TrustedSection     from "../../components/landing/TrustedSection";
import CTASection         from "../../components/landing/CTASection";

export default function HomeGuest() {
  return (
    <main className="overflow-x-hidden">
      {/* 1. Hero — judul CRM + ilustrasi dashboard */}
      <HeroSection />

      {/* 2. Benefit — 4 kartu fitur utama */}
      <BenefitSection />

      {/* 3. Statistics — angka bisnis yang meyakinkan [PRD V2] */}
      <StatisticsSection />

      {/* 4. Dashboard Preview — mockup visual admin panel */}
      <DashboardPreview />

      {/* 5. Testimonials — feedback dari pengguna nyata [PRD V2] */}
      <TestimonialsSection />

      {/* 6. FAQ — pertanyaan umum [PRD V2] */}
      <FAQSection />

      {/* 7. Trusted By — logo partner [PRD V2] */}
      <TrustedSection />

      {/* 8. CTA — ajakan daftar sebelum footer [PRD V2] */}
      <CTASection />

      {/* 9. Footer — logo, copyright, kontak */}
      <LandingFooter />
    </main>
  );
}
