import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  const [NavOpen, IsNavOpen] = useState(true);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT AREA */}
      <div className="transition-all duration-300 ml-64">
        {/* HEADER */}
        <Header NavOpen={NavOpen} IsNavOpen={IsNavOpen} />

        {/* PAGE CONTENT */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
