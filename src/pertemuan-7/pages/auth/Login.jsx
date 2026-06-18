import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../../services/authAPI.js";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  setError("");

  if (!email || !password) {
    setError("Email dan password wajib diisi");
    return;
  }

  try {
    setLoading(true);

    const response = await authAPI.login({
      email: email,
      password: password,
    });

    const user = response?.user || response?.data?.user || response?.data || response;
    const role = user?.role?.toLowerCase();

    if (role === "admin" || email.toLowerCase() === "admin@gmail.com") {
      navigate("/dashboard");
    } else {
      navigate("/member");
    }
  } catch (err) {
    setError("Email atau password salah");
    console.error(err);
  } finally {
    setLoading(false);
  }

};
  

  return (
    <div className="flex w-full h-screen overflow-hidden font-[Plus_Jakarta_Sans]">
      {/* LEFT */}
      <div
        className="hidden lg:flex w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        <div className="absolute inset-0 bg-[var(--primary)]/20 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Discover Your Next Adventure
          </h2>
          <p className="text-lg opacity-90">
            Explore the world's most beautiful destinations with TravelGo.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-24 bg-white">
        <div className="w-full max-w-md">
          {/* HEADER */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-[var(--primary)] text-3xl">
                location_on
              </span>

              <span className="text-2xl font-bold text-[var(--dark)]">
                TravelGo.
              </span>
            </div>

            <h1 className="text-3xl font-bold text-[var(--dark)] mb-2">
              Welcome back
            </h1>

            <p className="text-[var(--secondary)]">
              Please enter your details to sign in.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 p-4 bg-[var(--error)]/20 text-[var(--error)] rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">
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
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--secondary)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none disabled:opacity-60"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-[var(--dark)]">
                  Password
                </label>

                <span className="text-[var(--primary)] text-sm cursor-pointer">
                  Forgot?
                </span>
              </div>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-[var(--secondary)]">
                  lock
                </span>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--secondary)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none disabled:opacity-60"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* REMEMBER */}
            <div className="flex items-center gap-2">
              <input type="checkbox" disabled={loading} />
              <span className="text-sm text-[var(--secondary)]">
                Remember me
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center text-sm text-[var(--secondary)]">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-[var(--primary)] cursor-pointer font-semibold"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}