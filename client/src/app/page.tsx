import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AuthSystem - Secure Authentication",
  description:
    "A full-stack authentication system with JWT tokens, email verification, and protected routes.",
};

const features = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    label: "JWT Auth",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email Verify",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: "Secure Routes",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    label: "MongoDB",
  },
];

const steps = [
  {
    step: "01",
    title: "Register",
    desc: "Create account with name, email & password",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    active: true,
  },
  {
    step: "02",
    title: "Verify Email",
    desc: "Click the link sent to your inbox",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    active: true,
  },
  {
    step: "03",
    title: "Login",
    desc: "Sign in and receive your JWT token",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    active: true,
  },
  {
    step: "04",
    title: "Access Profile",
    desc: "View protected data with your token",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    active: false,
  },
];

export default function HomePage() {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-50">
      {/* ── Navbar ── */}
      <nav className="flex-none border-b border-gray-100 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-base font-bold text-gray-900 tracking-tight">AuthSystem</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors px-3 py-1.5"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Render Delay Banner (floating capsule) ── */}
      <div className="fixed md:top-[10%] top-[90%] left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-amber-50 border border-red-400 text-red-500 px-4 py-2 rounded-full shadow-lg whitespace-nowrap animate-pulse">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
        <span className="text-xs font-semibold">
          Backend may take <strong>40+ sec</strong> to wake up on first visit
        </span>
      </div>

      {/* ── Main ── */}
      <main className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10 lg:gap-20 py-8 md:py-0">

          {/* Left - Text */}
          <div className="flex-none w-full md:w-1/2 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center self-start gap-2 bg-orange-50 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-orange-100">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Secure · Fast · Production Ready
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Authentication
              <br />
              <span className="text-primary">done right.</span>
            </h1>

            {/* Sub */}
            <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed mb-8">
              A full-stack auth system with JWT tokens, email verification, and
              protected routes - built with Next.js and Express.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity shadow-md text-sm"
            >
                Create Account
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-md hover:border-primary hover:text-primary transition-colors text-sm"
              >
                Sign In
              </Link>
            </div>

            {/* Feature chips - mobile only */}
            <div className="flex flex-wrap gap-2 mt-6 md:hidden">
              {features.map((f) => (
                <span
                  key={f.label}
                  className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
                >
                  <span className="text-primary">{f.icon}</span>
                  {f.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Flow Cards */}
          <div className="hidden md:flex flex-none w-1/2 flex-col justify-center gap-3 relative">
            {/* Decorative blob */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary opacity-5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-primary opacity-5 rounded-full blur-3xl pointer-events-none" />

            {steps.map((item) => (
              <div
                key={item.step}
                className="relative flex items-center gap-4 bg-white rounded-lg px-4 py-3.5 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-100 transition-all"
              >
                <div
                  className={`flex-none w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.active ? "bg-primary" : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${item.active ? "text-white" : "text-gray-400"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] text-gray-400 font-mono font-bold">{item.step}</span>
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  </div>
                  <p className="text-xs text-gray-400 leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Footer / Feature Strip ── */}
      <footer className="flex-none hidden md:block border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-center gap-8 lg:gap-12">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-2 text-gray-400 text-xs font-medium">
              <span className="text-primary">{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
