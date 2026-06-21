import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import MainLayout from "./pertemuan-7/layouts/MainLayout";
import AuthLayout from "./pertemuan-7/layouts/AuthLayout";
import Loading from "./pertemuan-7/components/Loading";

const Dashboard = React.lazy(() =>
  import("./pertemuan-7/pages/Dashboard")
);

const Paket = React.lazy(() =>
  import("./pertemuan-7/pages/Paket")
);

const PaketDetail = React.lazy(() =>
  import("./pertemuan-7/pages/PaketDetail")
);

const Booking = React.lazy(() =>
  import("./pertemuan-7/pages/Booking")
);

const BookingDetail = React.lazy(() =>
  import("./pertemuan-7/pages/BookingDetail")
);

const Travelers = React.lazy(() =>
  import("./pertemuan-7/pages/Travelers")
);

const Users = React.lazy(() =>
  import("./pertemuan-7/pages/Users")
);

const Messages = React.lazy(() =>
  import("./pertemuan-7/pages/Messages")
);

const Deals = React.lazy(() =>
  import("./pertemuan-7/pages/Deals")
);

const Feedback = React.lazy(() =>
  import("./pertemuan-7/pages/Feedback")
);

const GuestLayout = React.lazy(() =>
  import("./pertemuan-7/layouts/GuestLayout")
);

const HomeGuest = React.lazy(() =>
  import("./pertemuan-7/pages/guest/HomeGuest")
);

const Login = React.lazy(() =>
  import("./pertemuan-7/pages/auth/Login")
);

const Register = React.lazy(() =>
  import("./pertemuan-7/pages/auth/Register")
);

const MemberDashboard = React.lazy(() =>
  import("./pertemuan-7/pages/member/MemberDashboard")
);

function ProtectedRoute({ children, roleYangBoleh }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roleYangBoleh === "Admin" && role !== "Admin") {
    return <Navigate to="/member" replace />;
  }

  if (roleYangBoleh === "User" && role === "Admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

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
        {/* HALAMAN AWAL */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* HALAMAN GUEST */}
        <Route path="/home" element={<GuestLayout />}>
          <Route index element={<HomeGuest />} />
        </Route>

        {/* LOGIN */}
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        {/* REGISTER */}
        <Route path="/register" element={<AuthLayout />}>
          <Route index element={<Register />} />
        </Route>

        {/* HALAMAN MEMBER */}
        <Route
          path="/member"
          element={
            <ProtectedRoute roleYangBoleh="User">
              <MemberDashboard />
            </ProtectedRoute>
          }
        />

        {/* HALAMAN ADMIN */}
        <Route
          element={
            <ProtectedRoute roleYangBoleh="Admin">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/paket" element={<Paket />} />
          <Route path="/paket/:namaPaket" element={<PaketDetail />} />

          <Route path="/booking" element={<Booking />} />
          <Route
            path="/booking/:kodeBooking"
            element={<BookingDetail />}
          />

          <Route path="/travelers" element={<Travelers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>

        {/* URL SALAH */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;