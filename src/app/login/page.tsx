"use client";

import EnrollmentSection from "@/components/EnrollmentSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#090410] text-white flex flex-col justify-between">
      {/* Top Navigation Back Button & Admin Setup Link */}
      <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:border-purple-500/60 transition-all text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
          Back to Home
        </Link>

        <Link
          href="/admin/setup"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-950/60 border border-fuchsia-800/40 text-fuchsia-300 hover:text-white hover:border-fuchsia-500/60 transition-all text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(217,70,239,0.2)]"
        >
          Setup Admin Account
        </Link>
      </div>

      <EnrollmentSection initialMode="signin" />
    </div>
  );
}
