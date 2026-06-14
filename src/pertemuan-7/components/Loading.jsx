import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white/80 backdrop-blur-sm">
      <ImSpinner2 className="animate-spin text-4xl text-[#70A9F8]" />
      <p className="mt-3 text-[#70A9F8] font-semibold">Loading...</p>
    </div>
  );
}
