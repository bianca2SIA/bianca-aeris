import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] overflow-x-hidden">
      <Sidebar />

      <div className="ml-[230px] min-h-screen flex flex-col">
        <Header />

        <main className="pt-[76px] flex-1 bg-[#F4F5F7] p-0 m-0 overflow-x-hidden">
          <div className="w-full max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>

        <footer className="px-4 md:px-6 xl:px-8 py-6 flex flex-wrap items-center justify-between gap-4 text-[#B0B3BB] text-sm">
          <div className="flex flex-wrap items-center gap-4 xl:gap-8">
            <span>Copyright © 2024 TravelGo</span>
            <span>Privacy Policy</span>
            <span>Term and conditions</span>
            <span>Contact</span>
          </div>

          <span className="font-semibold text-[#8F96A3]">
            Created by Bianca Bahi
          </span>
        </footer>
      </div>
    </div>
  );
}