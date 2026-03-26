"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/actions/auth";

// Isolated submit button so useFormStatus works correctly —
// it must be a child of the <form> to read its pending state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="relative w-full py-4 rounded-xl font-light text-sm tracking-[0.15em] uppercase
                 bg-gradient-to-r from-purple-700 to-purple-600
                 text-white/90 overflow-hidden
                 hover:from-purple-600 hover:to-purple-500
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-all duration-300 group"
    >
      <span className={`transition-opacity duration-200 ${pending ? "opacity-0" : "opacity-100"}`}>
        Sign In
      </span>
      {pending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-4 w-4 text-white/80" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      )}
      <div className="absolute inset-0 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </button>
  );
}

// Server action wrapper compatible with useActionState —
// must return state as first arg
async function loginAction(
  _prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const result = await signIn(formData);

  if (result?.error) {
    return { error: result.error };
  }

  // Redirect happens client-side via router after success
  // We encode the role in the returned state
  return { role: result?.role } as { error?: string; role?: string };
}

export default function LoginPage() {
  // Only 1 useState — for the show/hide password toggle
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [state, formAction] = useActionState(
    async (prevState: { error?: string; role?: string }, formData: FormData) => {
      const result = await signIn(formData);

      if (result?.error) {
        return { error: result.error };
      }

      // Navigate based on role — do this outside the action using router
      const role = result?.role;
      router.push(role === "admin" ? "/dashboard" : "/appointments");

      return {};
    },
    {}
  );

  return (
    <div className="min-h-screen bg-[#0d0a1a] flex">

      {/* ── Left panel: decorative ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center px-16">
        <div className="absolute inset-0 bg-[#0d0a1a]" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-purple-900/20 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-700/10 blur-3xl" />
          <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] rounded-full bg-amber-900/10 blur-2xl" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(167,139,250,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent" />

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
              Premium Hair &amp; Beauty
            </p>
          </div>
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

          {/* Error — driven by useActionState, no useState needed */}
          {state?.error && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-purple-300/50 mb-2">
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3.5
                           text-white placeholder-white/20 text-sm
                           focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.05]
                           hover:border-purple-700/40 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
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
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3.5 pr-20
                             text-white placeholder-white/20 text-sm
                             focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.05]
                             hover:border-purple-700/40 transition-all duration-300"
                />
                {/* show/hide — the only useState in this file */}
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/40 hover:text-purple-300/60 transition-colors text-xs tracking-wider"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <SubmitButton />
            </div>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-purple-800/20" />
            <span className="text-purple-400/30 text-xs tracking-widest">or</span>
            <div className="flex-1 h-px bg-purple-800/20" />
          </div>

          <p className="text-center text-purple-300/40 text-sm">
            New to Luxé?{" "}
            <Link
              href="/register"
              className="text-purple-300/70 hover:text-purple-200 transition-colors underline underline-offset-4 decoration-purple-500/30 hover:decoration-purple-400/60"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-12 text-center text-purple-400/20 text-[10px] tracking-[0.3em] uppercase">
            © 2025 Luxé Salon · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}