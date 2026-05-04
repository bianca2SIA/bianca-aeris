import { Outlet } from "react-router-dom";
import bgLogin from "../assets/bg-login.jpg";

export default function AuthLayout() {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgLogin})`,
      }}
    >
      {/* overlay gelap */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* konten login */}
      <main className="relative h-full flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
