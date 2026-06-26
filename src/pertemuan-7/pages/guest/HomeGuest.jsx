/**
 * HomeGuest.jsx — Landing Page PRD V1
 *
 * Assembler komponen landing page TravelGo CRM.
 * Komponen detail ada di: src/pertemuan-7/components/landing/
 *
 * Dilarang:
 *  - Mengubah routing (App.jsx)
 *  - Mengubah GuestLayout.jsx
 *  - Mengubah halaman Admin / MemberDashboard
 */

import HeroSection from "../../components/landing/HeroSection";
import BenefitSection from "../../components/landing/BenefitSection";
import DashboardPreview from "../../components/landing/DashboardPreview";
import LandingFooter from "../../components/landing/LandingFooter";

export default function HomeGuest() {
  return (
    <main className="overflow-x-hidden">
      {/* 1. Hero — judul CRM + ilustrasi dashboard */}
      <HeroSection />

      {/* 2. Benefit — 4 kartu fitur utama */}
      <BenefitSection />

      {/* 3. Dashboard Preview — mockup visual admin panel */}
      <DashboardPreview />

      {/* 4. Footer — logo, copyright, kontak */}
      <LandingFooter />
    </main>
  );
}
