import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./pertemuan-7/layouts/MainLayout";
import AuthLayout from "./pertemuan-7/layouts/AuthLayout";
import Loading from "./pertemuan-7/components/Loading";

// Lazy Pages
const Dashboard = React.lazy(() => import("./pertemuan-7/pages/Dashboard"));
const Paket = React.lazy(() => import("./pertemuan-7/pages/Paket"));
const Booking = React.lazy(() => import("./pertemuan-7/pages/Booking"));
const User = React.lazy(() => import("./pertemuan-7/pages/User"));
const Login = React.lazy(() => import("./pertemuan-7/pages/auth/Login"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="paket" element={<Paket />} />
          <Route path="booking" element={<Booking />} />
          <Route path="user" element={<User />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
