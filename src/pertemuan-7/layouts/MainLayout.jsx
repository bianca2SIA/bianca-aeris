import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] overflow-x-hidden">
      <Sidebar />

      <div className="ml-[230px] min-h-screen">
        <Header />

        <main className="pt-[76px] min-h-screen bg-[#F4F5F7] p-0 m-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}