import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../../services/authAPI.js";
import { usersAPI } from "../../../services/usersAPI.js";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (name === "" || email === "" || password === "") {
      setError("Nama, email, dan password wajib diisi");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      setLoading(true);

      // Semua akun dari Register otomatis menjadi Member
      await authAPI.register({
        name: name,
        email: email,
        password: password,
        role: "member",
      });

      // Data member untuk halaman Users/Admin
      await usersAPI.createUser({
        name: name,
        email: email,
        role: "Member",
        phone: phone,
        address: address,
      });

      setSuccess("Pendaftaran berhasil. Silakan login.");

      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      const pesanError =
        err.response?.data?.message ||
        err.response?.data?.msg ||
        err.message ||
        "Terjadi kesalahan saat mendaftar";

      setError(`Pendaftaran gagal: ${pesanError}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden font-[Plus_Jakarta_Sans]">
      {/* LEFT */}
      <div
        className="hidden lg:flex w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        {" "}
        <div className="absolute inset-0 bg-[var(--primary)]/20 backdrop-blur-sm"></div>{" "}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        ```
        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Start Your Travel Journey
          </h2>

          <p className="text-lg opacity-90">
            Create your TravelGo account and explore beautiful destinations.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-24 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-10">
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-[var(--primary)] text-3xl">
                location_on
              </span>

              <span className="text-2xl font-bold text-[var(--dark)]">
                TravelGo.
              </span>
            </div>

            <h1 className="text-3xl font-bold text-[var(--dark)] mb-2">
              Create account
            </h1>

            <p className="text-[var(--secondary)]">
              Please fill your details to register.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 p-4 bg-[var(--error)]/20 text-[var(--error)] rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined">check_circle</span>
              <span>{success}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* NAME */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--dark)]">
                Full Name
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-[var(--secondary)]">
                  person
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--secondary)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--dark)]">
                Email Address
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-[var(--secondary)]">
                  mail
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--secondary)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--dark)]">
                Phone Number
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-[var(--secondary)]">
                  call
                </span>

                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--secondary)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--dark)]">
                Address
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-[var(--secondary)]">
                  home
                </span>

                <input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--secondary)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--dark)]">
                Password
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-[var(--secondary)]">
                  lock
                </span>

                <input
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--secondary)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center text-sm text-[var(--secondary)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--primary)] cursor-pointer font-semibold"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
