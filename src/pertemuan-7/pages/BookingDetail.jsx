import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaUser,
  FaSuitcaseRolling,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

import bookingsData from "../data/booking.json";

export default function BookingDetail() {

  const { id } = useParams();

  const [booking, setBooking] = useState(null);

  useEffect(() => {

    const selectedBooking = bookingsData.find(
      (item) => item.id === Number(id)
    );

    setBooking(selectedBooking);

  }, [id]);

  if (!booking) {
    return (
      <div className="p-6 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-6">

      {/* TITLE */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-700">
          Booking Detail
        </h1>

        <p className="text-gray-400">
          Detail informasi booking customer
        </p>

      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT CARD */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

          <div className="flex flex-col items-center">

            {/* ICON */}
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#C49C74] to-orange-300 flex items-center justify-center shadow-lg">

              <FaSuitcaseRolling className="text-white text-6xl" />

            </div>

            {/* CUSTOMER */}
            <h1 className="text-2xl font-bold text-gray-700 mt-5 text-center">
              {booking.customer}
            </h1>

            <p className="text-gray-400 mt-1">
              Customer Booking
            </p>

            {/* STATUS */}
            <span
              className={`px-4 py-2 rounded-full text-xs font-bold mt-5 ${
                booking.status === "Confirmed"
                  ? "bg-green-100 text-green-500"
                  : booking.status === "Pending"
                  ? "bg-yellow-100 text-yellow-500"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {booking.status}
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
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">

          {/* EFFECT */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">

            {/* HEADER */}
            <div>

              <span className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-xs font-bold">
                BOOKING INFORMATION
              </span>

              <h1 className="text-3xl font-bold text-gray-700 mt-4">
                {booking.package}
              </h1>

              <p className="text-gray-400 mt-2">
                Complete booking information from customer
              </p>

            </div>

            {/* DETAIL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

              {/* CUSTOMER */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-4">

                  <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <FaUser className="text-blue-500" />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Customer
                    </p>

                    <h1 className="font-bold text-gray-700 mt-1">
                      {booking.customer}
                    </h1>

                  </div>

                </div>

              </div>

              {/* PACKAGE */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-4">

                  <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <FaSuitcaseRolling className="text-orange-500" />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Package
                    </p>

                    <h1 className="font-bold text-gray-700 mt-1">
                      {booking.package}
                    </h1>

                  </div>

                </div>

              </div>

              {/* DATE */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-4">

                  <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <FaCalendarAlt className="text-purple-500" />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Booking Date
                    </p>

                    <h1 className="font-bold text-gray-700 mt-1">
                      {booking.date}
                    </h1>

                  </div>

                </div>

              </div>

              {/* TOTAL */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-4">

                  <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <FaMoneyBillWave className="text-green-500" />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Total Payment
                    </p>

                    <h1 className="font-bold text-gray-700 mt-1">
                      {booking.total}
                    </h1>

                  </div>

                </div>

              </div>

              {/* STATUS */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition md:col-span-2">

                <div className="flex items-center gap-4">

                  <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <FaCheckCircle className="text-yellow-500" />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Booking Status
                    </p>

                    <h1 className="font-bold text-gray-700 mt-1">
                      {booking.status}
                    </h1>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}