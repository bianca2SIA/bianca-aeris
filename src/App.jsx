import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import MainLayout from "./pertemuan-7/layouts/MainLayout";
import AuthLayout from "./pertemuan-7/layouts/AuthLayout";
import Loading from "./pertemuan-7/components/Loading";

const Dashboard = React.lazy(() => import("./pertemuan-7/pages/Dashboard"));

const Paket = React.lazy(() => import("./pertemuan-7/pages/Paket"));
const PaketDetail = React.lazy(() => import("./pertemuan-7/pages/PaketDetail"));

const Booking = React.lazy(() => import("./pertemuan-7/pages/Booking"));
const BookingDetail = React.lazy(() =>
  import("./pertemuan-7/pages/BookingDetail")
);

const Calendar = React.lazy(() => import("./pertemuan-7/pages/Calendar"));
const Travelers = React.lazy(() => import("./pertemuan-7/pages/Travelers"));
const Guides = React.lazy(() => import("./pertemuan-7/pages/Guides"));
const Gallery = React.lazy(() => import("./pertemuan-7/pages/Gallery"));
const Messages = React.lazy(() => import("./pertemuan-7/pages/Messages"));
const Deals = React.lazy(() => import("./pertemuan-7/pages/Deals"));
const Feedback = React.lazy(() => import("./pertemuan-7/pages/Feedback"));

const Login = React.lazy(() => import("./pertemuan-7/pages/auth/Login"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />

      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        {/* MAIN CRM */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          {/* PACKAGES */}
          <Route path="paket" element={<Paket />} />
          <Route path="paket/:namaPaket" element={<PaketDetail />} />

          {/* BOOKINGS */}
          <Route path="booking" element={<Booking />} />
          <Route path="booking/:kodeBooking" element={<BookingDetail />} />

          {/* MENU SIDEBAR */}
          <Route path="calendar" element={<Calendar />} />
          <Route path="travelers" element={<Travelers />} />
          <Route path="guides" element={<Guides />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="messages" element={<Messages />} />
          <Route path="deals" element={<Deals />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;