"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/lib/axios";
import Card from "@/components/Card";
import Button from "@/components/Button";

type Status = "loading" | "success" | "error";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found.");
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.get(`/api/auth/verify/${token}`);
        setStatus("success");
        setMessage(res.data.message);
        setTimeout(() => router.push("/login"), 3000);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed.");
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Email Verification</h1>
        </div>

        <Card>
          <div className="text-center py-4">
            {status === "loading" && (
              <div className="flex flex-col items-center gap-4">
                <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-gray-600">Verifying your email...</p>
              </div>
            )}

            {status === "success" && (
              <>
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Email Verified!</h2>
                <p className="text-gray-600 text-sm mb-4">{message}</p>
                <p className="text-gray-400 text-xs mb-4">Redirecting to login in 3 seconds...</p>
                <Button onClick={() => router.push("/login")} className="w-full">
                  Go to Login
                </Button>
              </>
            )}

            {status === "error" && (
              <>
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Verification Failed</h2>
                <p className="text-gray-600 text-sm mb-4">{message}</p>
                <Button onClick={() => router.push("/register")} variant="outline" className="w-full">
                  Back to Register
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
