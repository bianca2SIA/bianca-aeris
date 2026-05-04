import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    // VALIDASI KOSONG
    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    // CEK LOGIN
    setTimeout(() => {
      if (
        email === "bianca24si@mahasiswa.pcr.ac.id" &&
        password === "travelagent"
      ) {
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md flex flex-col overflow-hidden glass-panel shadow-2xl rounded-3xl p-8 lg:p-12">
      {/* Logo */}
      <div className="flex items-center justify-center flex-col mb-8">
        <span className="text-2xl font-bold tracking-tight">TravelGo.</span>
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-brand-dark mb-2">
          Welcome Back
        </h2>
        <p className="text-brand-gray text-sm">
          Please enter your details to sign in.
        </p>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-200 mb-4 px-4 py-3 text-sm text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-100 border border-gray-200 mb-4 px-4 py-3 text-sm text-gray-600 rounded-lg">
          Please wait, logging in...
        </div>
      )}
      {/* Form */}
      <form className="space-y-5" onSubmit={handleLogin}>
        {/* Email Input */}
        <div>
          <label
            className="block text-sm font-semibold text-brand-dark mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className="flex items-center bg-brand-lightGray rounded-xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-brand-accent transition-all border border-transparent focus-within:bg-white">
            <i className="fa-regular fa-envelope text-brand-gray mr-3"></i>
            <input
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-brand-dark placeholder-brand-gray"
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label
            className="block text-sm font-semibold text-brand-dark mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex items-center bg-brand-lightGray rounded-xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-brand-accent transition-all border border-transparent focus-within:bg-white">
            <i className="fa-solid fa-lock text-brand-gray mr-3"></i>
            <input
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-brand-dark placeholder-brand-gray tracking-wider"
              id="password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Forgot Password & Remember Me */}
        <div className="flex justify-between items-center pt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              className="rounded border-brand-border text-brand-accent focus:ring-brand-accent w-4 h-4"
              type="checkbox"
            />
            <span className="text-sm text-brand-gray">Remember me</span>
          </label>
          <a
            className="text-sm text-brand-accent hover:text-brand-accentHover font-semibold transition-colors"
            href="#"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-brand-dark hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-dark/20 transition-all focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2 mt-4"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
