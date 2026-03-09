"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { getToken, removeToken } from "@/lib/auth";
import Card from "@/components/Card";
import Button from "@/components/Button";

interface Profile {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const { data, isLoading, isError, error } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = getToken();
      const res = await axios.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    retry: false,
  });

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-500 text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    const err = error as { response?: { data?: { message?: string } } };
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md text-center">
          <Card>
            <div className="py-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h2>
              <p className="text-gray-600 text-sm mb-6">
                {err?.response?.data?.message || "Unable to load profile. Please login again."}
              </p>
              <Button onClick={() => router.push("/login")} className="w-full">
                Go to Login
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your account information</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="self-start sm:self-auto">
            Sign Out
          </Button>
        </div>

        {/* Profile Card */}
        <Card>
          <div className="flex flex-col xs:flex-row items-start gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  {data?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 truncate">{data?.name}</h2>
              <p className="text-gray-500 text-sm truncate">{data?.email}</p>

              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Verified Account
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Details Card */}
        <Card className="mt-4 sm:mt-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Account Details</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Full Name</p>
                <p className="text-gray-900 font-medium mt-0.5">{data?.name}</p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Email Address</p>
                <p className="text-gray-900 font-medium mt-0.5">{data?.email}</p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
