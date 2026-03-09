import Link from "next/link";

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    label: "JWT Auth",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email Verify",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: "Secure Routes",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    label: "MongoDB",
  },
];

export default function HomePage() {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-50">
      {/* ── Navbar ── */}
      <nav className="flex-none flex items-center justify-between px-4 sm:px-8 lg:px-12 h-16 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E96326] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="text-base font-bold text-gray-900 tracking-tight">AuthSystem</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-[#E96326] transition-colors px-2 py-1.5"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold bg-[#E96326] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Main Hero ── */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left — Text Content */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-6 md:py-0">
          {/* Badge */}
          <div className="inline-flex items-center self-start gap-2 bg-orange-50 text-[#E96326] text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-orange-100">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E96326]"></span>
            Secure · Fast · Production Ready
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Authentication
            <br />
            <span className="text-[#E96326]">done right.</span>
          </h1>

          {/* Sub-heading */}
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed mb-7">
            A full-stack auth system with JWT tokens, email verification, and
            protected routes — built with Next.js and Express.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-[#E96326] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md text-sm sm:text-base"
            >
              Create Account
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:border-[#E96326] hover:text-[#E96326] transition-colors text-sm sm:text-base"
            >
              Sign In
            </Link>
          </div>

          {/* Feature chips — visible on mobile below CTAs */}
          <div className="flex flex-wrap gap-2 mt-6 md:hidden">
            {features.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
              >
                <span className="text-[#E96326]">{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Visual Panel (hidden on mobile) */}
        <div className="hidden md:flex flex-none w-[46%] lg:w-[48%] items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden px-8 lg:px-12">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E96326] opacity-5 rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E96326] opacity-5 rounded-full -translate-x-1/3 translate-y-1/3" />

          {/* Flow cards */}
          <div className="relative w-full max-w-xs space-y-3 z-10">
            {[
              { step: "01", title: "Register", desc: "Create account with name, email & password", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", done: true },
              { step: "02", title: "Verify Email", desc: "Click the link sent to your inbox", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", done: true },
              { step: "03", title: "Login", desc: "Sign in and receive your JWT token", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", done: true },
              { step: "04", title: "Access Profile", desc: "View protected data with your token", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", done: false },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100"
              >
                <div className={`flex-none w-9 h-9 rounded-xl flex items-center justify-center ${item.done ? "bg-[#E96326]" : "bg-gray-100"}`}>
                  <svg className={`w-4 h-4 ${item.done ? "text-white" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">{item.step}</span>
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  </div>
                  <p className="text-xs text-gray-400 leading-tight truncate">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Feature Strip (desktop only) ── */}
      <footer className="hidden md:flex flex-none items-center justify-center gap-6 lg:gap-10 h-14 bg-white border-t border-gray-100 px-6">
        {features.map((f) => (
          <div key={f.label} className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="text-[#E96326]">{f.icon}</span>
            <span className="font-medium">{f.label}</span>
          </div>
        ))}
      </footer>
    </div>
  );
}
