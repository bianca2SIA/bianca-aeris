import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

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

const Travelers = React.lazy(() => import("./pertemuan-7/pages/Travelers"));
const Guides = React.lazy(() => import("./pertemuan-7/pages/Guides"));
const Users = React.lazy(() => import("./pertemuan-7/pages/Users"));
const Messages = React.lazy(() => import("./pertemuan-7/pages/Messages"));
const Deals = React.lazy(() => import("./pertemuan-7/pages/Deals"));
const Feedback = React.lazy(() => import("./pertemuan-7/pages/Feedback"));

const GuestLayout = React.lazy(() =>
  import("./pertemuan-7/layouts/GuestLayout")
);

const HomeGuest = React.lazy(() =>
  import("./pertemuan-7/pages/guest/HomeGuest")
);

const Login = React.lazy(() => import("./pertemuan-7/pages/auth/Login"));
const Register = React.lazy(() => import("./pertemuan-7/pages/auth/Register"));

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
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* GUEST */}
        <Route path="/home" element={<GuestLayout />}>
          <Route index element={<HomeGuest />} />
        </Route>

        {/* AUTH */}
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/register" element={<AuthLayout />}>
          <Route index element={<Register />} />
        </Route>

        {/* SEMENTARA MEMBER DIARAHKAN KE ADMIN */}
        <Route path="/member" element={<Navigate to="/dashboard" replace />} />

        {/* ADMIN */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/paket" element={<Paket />} />
          <Route path="/paket/:namaPaket" element={<PaketDetail />} />

          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:kodeBooking" element={<BookingDetail />} />

          <Route path="/travelers" element={<Travelers />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>

        {/* KALAU URL SALAH */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;