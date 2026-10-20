"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  ShieldCheck,
  RefreshCw,
  Mail,
  ArrowRight,
  HelpCircle,
  Home,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

function PendingApprovalContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const nameParam = searchParams.get("name") || "";

  const [email, setEmail] = useState(emailParam);
  const [studentName, setStudentName] = useState(nameParam);
  const [status, setStatus] = useState<string>("pending_approval");
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(true);
  const [checking, setChecking] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Resend verification link states
  const [resending, setResending] = useState(false);
  const [resendNotice, setResendNotice] = useState("");

  const checkCurrentStatus = async (targetEmail = email) => {
    if (!targetEmail) return;
    setChecking(true);
    setStatusMessage("");

    try {
      const res = await fetch(`/api/users?email=${encodeURIComponent(targetEmail)}`);
      const data = await res.json();

      if (res.ok && data.success && data.user) {
        const uStatus = (data.user.status || "pending_approval").toLowerCase();
        setStatus(uStatus);
        setIsEmailVerified(data.user.emailVerified === true);
        if (data.user.firstName) setStudentName(data.user.firstName);

        if (uStatus === "approved") {
          setStatusMessage("🎉 Great news! Your account has been approved by the Administrator. You can now log in!");
        } else {
          setStatusMessage("⏳ Your application is still pending administrator approval. Please check back shortly.");
        }
      } else {
        setStatusMessage("Could not retrieve status. Please ensure your email is correct.");
      }
    } catch {
      setStatusMessage("Network error while checking status.");
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (emailParam) {
      checkCurrentStatus(emailParam);
    }
  }, [emailParam]);

  const handleResendVerification = async () => {
    if (!email) return;
    setResending(true);
    setResendNotice("");
    try {
      const res = await fetch("/api/auth/send-verification-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: studentName || "Student" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResendNotice("✅ Verification link has been sent to your Gmail inbox! Please check and click the link.");
      } else {
        setResendNotice(`❌ ${data.message || "Failed to send link."}`);
      }
    } catch {
      setResendNotice("❌ Network error sending link.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07020d] text-white flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-900/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-950/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-xl w-full relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <h1 className="text-2xl sm:text-3xl font-black tracking-widest uppercase text-white group-hover:scale-105 transition-transform">
              RIGA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">DANCE ACADEMY</span>
            </h1>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-purple-400/80 mt-1 font-semibold">
              Student Enrollment Status
            </p>
          </Link>
        </div>

        {/* Status Card */}
        <div className="bg-[#120722]/85 backdrop-blur-xl border border-purple-800/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(147,51,234,0.18)]">
          {status === "approved" ? (
            /* Approved State */
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">
                Account Approved! 🎉
              </h2>
              <p className="text-sm text-purple-200/80 max-w-md mx-auto mb-6">
                Your admission and enrollment have been approved by RIGA Dance Academy. You now have full access to your student dashboard.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm tracking-wide uppercase transition-all shadow-[0_6px_25px_rgba(34,197,94,0.35)] hover:scale-105"
              >
                Log In to Student Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Pending State */
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-purple-800/30 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    Pending Admin Approval
                  </h2>
                  <p className="text-xs text-purple-300/70 mt-0.5">
                    {studentName ? `Applicant: ${studentName}` : "Student Enrollment Application"}
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Review in Progress
                </div>
              </div>

              {/* Email Verification Status Alert */}
              {!isEmailVerified ? (
                <div className="p-4 rounded-2xl bg-fuchsia-950/40 border border-fuchsia-500/30 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-fuchsia-200">Email Verification Required</h4>
                      <p className="text-xs text-purple-200/70 mt-1">
                        Please check your Gmail inbox and click the verification link we sent to verify your email address.
                      </p>
                      <button
                        onClick={handleResendVerification}
                        disabled={resending}
                        className="mt-3 px-3.5 py-1.5 rounded-lg bg-fuchsia-600/40 hover:bg-fuchsia-600/60 border border-fuchsia-500/50 text-fuchsia-200 text-xs font-semibold transition-all disabled:opacity-50"
                      >
                        {resending ? "Sending..." : "Resend Verification Link"}
                      </button>
                      {resendNotice && (
                        <p className="text-xs text-purple-300 mt-2">{resendNotice}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 mb-6 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs text-emerald-300 font-medium">
                    Email Verified: <strong className="text-white">{email || "Your Gmail"}</strong> ✅
                  </span>
                </div>
              )}

              {/* Explanation Note */}
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/25 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-purple-200/90 leading-relaxed">
                    <strong className="text-amber-200 block mb-1">Admin Approval Processing:</strong>
                    Admin approval eka labenakal account ekt log wenna baha. RIGA Dance Academy පරිපාලනය විසින් ඔබගේ admission details හා bank payment slip පරීක්ෂා කර අනුමත කළ වහාම ඔබට Gmail හරහා confirmation email එකක් ලැබෙනු ඇත.
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="bg-purple-950/40 border border-purple-800/30 rounded-2xl p-5 mb-6">
                <h4 className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Application Status
                </h4>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">1. Account Details Submitted</p>
                      <p className="text-[11px] text-purple-300/60">Profile and bank receipt saved</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isEmailVerified 
                        ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400" 
                        : "bg-amber-500/20 border border-amber-500 text-amber-400"
                    }`}>
                      {isEmailVerified ? "✓" : "2"}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isEmailVerified ? "text-white" : "text-amber-300"}`}>
                        2. Gmail Verification {isEmailVerified ? "✅" : "⏳"}
                      </p>
                      <p className="text-[11px] text-purple-300/60">
                        {isEmailVerified ? "Email confirmed" : "Verification link sent to your inbox"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 animate-pulse">
                      3
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-300">3. Academy Admin Approval ⏳</p>
                      <p className="text-[11px] text-purple-300/60">Payment verification in progress</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-7 h-7 rounded-full bg-purple-950 border border-purple-800 text-purple-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="text-xs font-bold text-purple-300">4. Student Dashboard Unlocked 🔒</p>
                      <p className="text-[11px] text-purple-400/50">Full class schedules & troupe access</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className="p-3.5 mb-5 rounded-xl bg-purple-950/80 border border-purple-700/50 text-xs text-purple-200 text-center font-medium">
                  {statusMessage}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                <button
                  onClick={() => checkCurrentStatus()}
                  disabled={checking}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
                  {checking ? "Checking..." : "Refresh Approval Status"}
                </button>

                <Link
                  href="/login"
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/40 text-purple-200 font-semibold text-xs tracking-wider uppercase transition-all text-center"
                >
                  Sign In Page
                </Link>
              </div>

              {/* Contact Notice */}
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-900/40 text-center">
                <p className="text-xs text-purple-300/80 flex items-center justify-center gap-1.5 mb-1 font-medium">
                  <HelpCircle className="w-3.5 h-3.5 text-purple-400" /> Need rapid approval or have a question?
                </p>
                <p className="text-[11px] text-purple-400/70">
                  Contact our studio reception at{" "}
                  <a href="mailto:inforigadance@gmail.com" className="text-fuchsia-400 hover:underline font-semibold">
                    inforigadance@gmail.com
                  </a>{" "}
                  or send your slip receipt via WhatsApp.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer links */}
        <div className="mt-8 text-center text-xs text-purple-400/60">
          <Link href="/" className="hover:text-purple-300 transition-colors mx-2">
            Home
          </Link>
          •
          <Link href="/classes" className="hover:text-purple-300 transition-colors mx-2">
            Class Schedule
          </Link>
          •
          <Link href="/contact" className="hover:text-purple-300 transition-colors mx-2">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PendingApprovalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07020d] text-white flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-purple-500 border-r-fuchsia-500 border-b-transparent border-l-transparent animate-spin" />
        </div>
      }
    >
      <PendingApprovalContent />
    </Suspense>
  );
}
