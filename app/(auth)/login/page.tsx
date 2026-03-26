"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    try {
      // Replace with your actual API call
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials. Please try again.");
      } else {
        // Redirect based on role — adjust to your routing logic
        window.location.href = data.role === "admin" ? "/dashboard" : "/appointments";
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0a1a] flex">
      {/* ── Left panel: decorative ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center px-16">
        {/* Geometric background layers */}
        <div className="absolute inset-0 bg-[#0d0a1a]" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-purple-900/20 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-700/10 blur-3xl" />
          <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] rounded-full bg-amber-900/10 blur-2xl" />
        </div>

        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(167,139,250,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Diagonal accent line */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="mb-10">
            <p className="text-purple-400/60 text-xs tracking-[0.4em] uppercase mb-6 font-light">
              Est. 2024 · Johannesburg
            </p>
            <h1
              className="text-7xl font-light text-white mb-2 leading-none tracking-widest"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              LUXÉ
            </h1>
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
              <span className="text-amber-400/80 text-xs tracking-[0.5em] uppercase">Salon</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
            </div>
            <p className="text-purple-200/40 text-sm tracking-[0.2em] uppercase font-light">
              Premium Hair & Beauty
            </p>
          </div>

          {/* Decorative flourish */}
          <div className="flex flex-col items-center gap-3 mt-16">
            <div className="w-px h-20 bg-gradient-to-b from-purple-500/50 to-transparent" />
            <div className="w-2 h-2 rounded-full border border-purple-500/40" />
            <p className="text-purple-300/30 text-xs tracking-[0.3em] uppercase mt-4">
              Where beauty meets excellence
            </p>
          </div>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 relative">
        <div className="absolute inset-0 bg-[#100d20]" />

        {/* Subtle top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <h1
              className="text-5xl font-light text-white tracking-widest"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              LUXÉ
            </h1>
            <p className="text-amber-400/70 text-xs tracking-[0.4em] uppercase mt-1">Salon</p>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <p className="text-purple-400/60 text-xs tracking-[0.35em] uppercase mb-3">
              Welcome back
            </p>
            <h2
              className="text-4xl font-light text-white leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Sign in to your
              <br />
              <span className="text-purple-300">account</span>
            </h2>
            <div className="mt-4 h-px w-12 bg-amber-400/50" />
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="group">
              <label className="block text-[11px] tracking-[0.2em] uppercase text-purple-300/50 mb-2">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3.5
                             text-white placeholder-white/20 text-sm
                             focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.05]
                             transition-all duration-300
                             hover:border-purple-700/40"
                />
                <div className="absolute inset-0 rounded-xl ring-0 focus-within:ring-1 focus-within:ring-purple-500/20 pointer-events-none transition-all" />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] tracking-[0.2em] uppercase text-purple-300/50">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-purple-400/50 hover:text-purple-300/70 transition-colors tracking-wider"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3.5 pr-12
                             text-white placeholder-white/20 text-sm
                             focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.05]
                             transition-all duration-300
                             hover:border-purple-700/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/40 hover:text-purple-300/60 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-4 rounded-xl font-light text-sm tracking-[0.15em] uppercase
                           bg-gradient-to-r from-purple-700 to-purple-600
                           text-white/90 overflow-hidden
                           hover:from-purple-600 hover:to-purple-500
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all duration-300 group"
              >
                <span className={`transition-opacity duration-200 ${isLoading ? "opacity-0" : "opacity-100"}`}>
                  Sign In
                </span>
                {isLoading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4 text-white/80" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </span>
                )}
                {/* Shimmer effect */}
                <div className="absolute inset-0 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-purple-800/20" />
            <span className="text-purple-400/30 text-xs tracking-widest">or</span>
            <div className="flex-1 h-px bg-purple-800/20" />
          </div>

          {/* Register link */}
          <p className="text-center text-purple-300/40 text-sm">
            New to Luxé?{" "}
            <Link
              href="/register"
              className="text-purple-300/70 hover:text-purple-200 transition-colors underline underline-offset-4 decoration-purple-500/30 hover:decoration-purple-400/60"
            >
              Create an account
            </Link>
          </p>

          {/* Footer */}
          <p className="mt-12 text-center text-purple-400/20 text-[10px] tracking-[0.3em] uppercase">
            © 2025 Luxé Salon · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}