import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaPlaneDeparture,
} from "react-icons/fa";

import paketData from "../data/paket.json";

export default function PaketDetail() {
  const { id } = useParams();

  const [paket, setPaket] = useState(null);

  useEffect(() => {
    const selectedPaket = paketData.find(
      (item) => item.id === Number(id)
    );

    setPaket(selectedPaket);
  }, [id]);

  if (!paket) {
    return (
      <div className="p-6 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-5">

      {/* TITLE */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-700">
          Paket Detail
        </h1>

        <p className="text-gray-400">
          Detail information about this travel package
        </p>

      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT CARD */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">

          <div className="flex flex-col items-center">

            {/* IMAGE */}
            <div className="bg-orange-100 p-3 rounded-full">

              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-orange-400 to-yellow-300 flex items-center justify-center">

                <FaPlaneDeparture className="text-white text-6xl" />

              </div>

            </div>

            {/* TITLE */}
            <h1 className="text-2xl font-bold text-gray-700 mt-5 text-center">
              {paket.name}
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              {paket.location}
            </p>

            {/* STATUS */}
            <span
              className={`px-4 py-2 rounded-full text-xs font-bold mt-4 ${
                paket.status === "Active"
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {paket.status}
            </span>

          </div>

          {/* BUTTON */}
          <div className="grid grid-cols-2 gap-4 mt-8">

            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl font-semibold transition hover:scale-105">
              Edit
            </button>

            <button className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition hover:scale-105">
              Delete
            </button>

          </div>

        </div>

        {/* RIGHT DETAIL */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm relative overflow-hidden">

          {/* BG EFFECT */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">

            {/* HEADER */}
            <div>

              <span className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-xs font-bold">
                TRAVEL PACKAGE
              </span>

              <h1 className="text-3xl font-bold text-gray-700 mt-4">
                {paket.name}
              </h1>

              <p className="text-gray-400 mt-2">
                Complete package information and destination details
              </p>

            </div>

            {/* INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

              {/* LOCATION */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-4">

                  <div className="bg-red-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-red-500" />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Location
                    </p>

                    <h1 className="font-bold text-gray-700 mt-1">
                      {paket.location}
                    </h1>

                  </div>

                </div>

              </div>

              {/* PRICE */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-4">

                  <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <FaMoneyBillWave className="text-green-500" />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Price
                    </p>

                    <h1 className="font-bold text-gray-700 mt-1">
                      {paket.price}
                    </h1>

                  </div>

                </div>

              </div>

              {/* DURATION */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-4">

                  <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <FaClock className="text-blue-500" />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Duration
                    </p>

                    <h1 className="font-bold text-gray-700 mt-1">
                      {paket.duration}
                    </h1>

                  </div>

                </div>

              </div>

              {/* STATUS */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-4">

                  <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <FaCheckCircle className="text-yellow-500" />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Status
                    </p>

                    <h1 className="font-bold text-gray-700 mt-1">
                      {paket.status}
                    </h1>

                  </div>

                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition md:col-span-2">

                <p className="text-sm text-gray-400 mb-2">
                  Description
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Paket wisata {paket.name} menawarkan pengalaman
                  perjalanan terbaik ke {paket.location} selama{" "}
                  {paket.duration}. Nikmati perjalanan nyaman,
                  destinasi menarik, hotel terbaik, dan pengalaman
                  liburan yang menyenangkan bersama TravelGo.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}