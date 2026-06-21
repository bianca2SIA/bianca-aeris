import { Outlet } from "react-router-dom";
import GuestNavbar from "../components/GuestNavbar";
import ChatbotButton from "../components/ChatbotButton";

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-white font-[Plus_Jakarta_Sans] text-[#102033]">
      <GuestNavbar />
      <Outlet />
      <ChatbotButton />
    </div>
  );
}
