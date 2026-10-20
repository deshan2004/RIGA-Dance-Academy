"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  RefreshCw, 
  Mail, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  Sparkles,
  ExternalLink
} from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const emailParam = searchParams.get("email") || "";

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [studentName, setStudentName] = useState("");
  const [userEmail, setUserEmail] = useState(emailParam);
  const [approvalStatus, setApprovalStatus] = useState<"pending_approval" | "approved" | "rejected" | string>("pending_approval");
  
  // Re-check status state
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [checkMessage, setCheckMessage] = useState("");

  // Resend state
  const [resendEmail, setResendEmail] = useState(emailParam);
  const [resending, setResending] = useState(false);
  const [resendSent, setResendSent] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setErrorMessage("No verification token provided in link.");
      return;
    }

    const performVerification = async () => {
      try {
        const res = await fetch("/api/auth/verify-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, email: emailParam }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setSuccess(true);
          setUserEmail(data.email || emailParam);
          setStudentName(data.firstName || "Student");
          setApprovalStatus(data.status || "pending_approval");
        } else {
          setErrorMessage(data.message || "Failed to verify email.");
        }
      } catch (err: unknown) {
        console.error(err);
        setErrorMessage("Network error occurred while verifying email.");
      } finally {
        setLoading(false);
      }
    };

    performVerification();
  }, [token, emailParam]);

  // Handle re-checking approval status
  const handleCheckApprovalStatus = async () => {
    if (!userEmail) return;
    setCheckingStatus(true);
    setCheckMessage("");

    try {
      const res = await fetch(`/api/users?email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();

      if (res.ok && data.success && data.user) {
        const curStatus = (data.user.status || "pending_approval").toLowerCase();
        setApprovalStatus(curStatus);

        if (curStatus === "approved") {
          setCheckMessage("🎉 Great news! Your account has been officially approved! You can now log in.");
        } else {
          setCheckMessage("⏳ Your application is still currently under review by our administration. Please check back shortly.");
        }
      } else {
        setCheckMessage("Could not retrieve current status. Please try again in a moment.");
      }
    } catch (err) {
      console.error(err);
      setCheckMessage("Error contacting server. Please try again.");
    } finally {
      setCheckingStatus(false);
    }
  };

  // Handle resend verification link
  const handleResendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail) return;
    setResending(true);
    try {
      const res = await fetch("/api/auth/send-verification-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail, name: studentName || "Student" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResendSent(true);
      } else {
        alert(data.message || "Failed to resend verification link.");
      }
    } catch {
      alert("Error sending verification link.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07020d] text-white flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-900/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-950/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-xl w-full relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <h1 className="text-2xl sm:text-3xl font-black tracking-widest uppercase text-white group-hover:scale-105 transition-transform">
              RIGA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">DANCE ACADEMY</span>
            </h1>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-purple-400/80 mt-1 font-semibold">
              Official Student Verification Portal
            </p>
          </Link>
        </div>

        {/* Verification Card */}
        <div className="bg-[#120722]/80 backdrop-blur-xl border border-purple-800/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(147,51,234,0.18)]">
          {/* 1. Loading State */}
          {loading && (
            <div className="py-12 text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-ping" />
                <div className="w-20 h-20 rounded-full border-4 border-t-purple-500 border-r-fuchsia-500 border-b-transparent border-l-transparent animate-spin" />
                <Mail className="w-8 h-8 text-purple-300 absolute inset-0 m-auto" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Verifying Your Email...</h2>
              <p className="text-purple-300/70 text-sm max-w-sm mx-auto">
                Validating security credentials with RIGA Dance Academy servers. Please hold on a moment.
              </p>
            </div>
          )}

          {/* 2. Error State */}
          {!loading && !success && (
            <div className="text-center py-4">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.25)]">
                <XCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-red-300/80 text-sm mb-6 max-w-md mx-auto">
                {errorMessage}
              </p>

              <div className="bg-purple-950/40 border border-purple-800/30 rounded-2xl p-5 mb-8 text-left">
                <h3 className="text-sm font-semibold text-purple-200 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" /> Resend Verification Link
                </h3>
                <p className="text-xs text-purple-300/70 mb-4">
                  If your link expired (valid for 24 hours) or was already used, enter your email address to receive a fresh verification link.
                </p>

                {resendSent ? (
                  <div className="p-3 bg-green-950/50 border border-green-500/30 rounded-xl text-green-300 text-xs text-center font-medium">
                    ✅ A new verification link has been sent to your Gmail inbox!
                  </div>
                ) : (
                  <form onSubmit={handleResendLink} className="flex gap-2">
                    <input
                      type="email"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      placeholder="your.email@gmail.com"
                      required
                      className="flex-1 bg-purple-950/80 border border-purple-800/50 rounded-xl px-3 py-2 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="submit"
                      disabled={resending}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md disabled:opacity-50"
                    >
                      {resending ? "Sending..." : "Resend Link"}
                    </button>
                  </form>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-700/40 text-purple-200 text-sm font-semibold transition-all"
                >
                  Return to Sign In
                </Link>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-transparent hover:bg-purple-950/40 border border-purple-800/30 text-purple-400 text-sm font-medium transition-all"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}

          {/* 3. Success & Status State */}
          {!loading && success && (
            <div>
              {/* Top Banner: Email Verified */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-purple-950/60 border border-emerald-500/40 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">Email Address Verified!</h2>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Verified ✅
                    </span>
                  </div>
                  <p className="text-xs text-purple-200/80 mt-0.5">
                    Your Gmail account <strong className="text-white">{userEmail}</strong> has been successfully confirmed.
                  </p>
                </div>
              </div>

              {/* Status Section: Pending Approval or Approved */}
              {approvalStatus === "approved" ? (
                /* Account Already Approved */
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">
                    Account is Officially Approved! 🎉
                  </h3>
                  <p className="text-sm text-purple-200/80 max-w-md mx-auto mb-6">
                    Welcome to RIGA Dance Academy, {studentName}! Your admission and enrollment pass are active. You can now access your student dashboard.
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm tracking-wide uppercase transition-all shadow-[0_6px_25px_rgba(34,197,94,0.35)] hover:scale-105"
                  >
                    Log In to Student Portal <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                /* Pending Admin Approval Screen */
                <div>
                  {/* Status Banner */}
                  <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 mb-6 relative overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex-shrink-0 mt-0.5">
                        <Clock className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                          <h3 className="text-base font-bold text-amber-200">
                            Current Stage: Pending Admin Approval
                          </h3>
                          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                            Under Review
                          </span>
                        </div>
                        <p className="text-xs text-amber-200/80 leading-relaxed">
                          Your registration and bank payment receipt are currently under review by our administration. You will be notified via email once your account has been approved and activated.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Process Stepper */}
                  <div className="bg-purple-950/40 border border-purple-800/30 rounded-2xl p-5 mb-6">
                    <h4 className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Enrollment Verification Steps
                    </h4>

                    <div className="space-y-3.5">
                      {/* Step 1 */}
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          ✓
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white">1. Account Registration Created</p>
                          <p className="text-[11px] text-purple-300/60">Form submitted with details & bank slip</p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          ✓
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white">2. Email Address Verified</p>
                          <p className="text-[11px] text-purple-300/60">Gmail link confirmed successfully</p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 animate-pulse">
                          3
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-amber-300">3. Admin Review & Payment Slip Verification</p>
                            <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.2 rounded bg-amber-500/20 text-amber-300">
                              Current
                            </span>
                          </div>
                          <p className="text-[11px] text-purple-300/60">Academy administration verification</p>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div className="flex items-center gap-3 opacity-60">
                        <div className="w-7 h-7 rounded-full bg-purple-950 border border-purple-800 text-purple-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          4
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-purple-300">4. Portal Access & Student ID Activation</p>
                          <p className="text-[11px] text-purple-400/50">Unlocks dashboard, schedules & troupe rehearsals</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Check Feedback message */}
                  {checkMessage && (
                    <div className="p-3.5 mb-5 rounded-xl bg-purple-950/80 border border-purple-700/50 text-xs text-purple-200 text-center font-medium animate-fadeIn">
                      {checkMessage}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                    <button
                      onClick={handleCheckApprovalStatus}
                      disabled={checkingStatus}
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <RefreshCw className={`w-4 h-4 ${checkingStatus ? "animate-spin" : ""}`} />
                      {checkingStatus ? "Checking Status..." : "Check Approval Status"}
                    </button>

                    <Link
                      href="/login"
                      className="w-full sm:w-auto py-3 px-6 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/40 text-purple-200 font-semibold text-xs tracking-wider uppercase transition-all text-center"
                    >
                      Sign In Page
                    </Link>
                  </div>

                  {/* Notice & Contact */}
                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-900/40 text-center">
                    <p className="text-xs text-purple-300/80 flex items-center justify-center gap-1.5 mb-1 font-medium">
                      <HelpCircle className="w-3.5 h-3.5 text-purple-400" /> Have questions or urgent inquiry?
                    </p>
                    <p className="text-[11px] text-purple-400/70">
                      You will receive an automated email once approved. For expedited verification, contact{" "}
                      <a href="mailto:inforigadance@gmail.com" className="text-fuchsia-400 hover:underline font-semibold">
                        inforigadance@gmail.com
                      </a>{" "}
                      or reach out on WhatsApp.
                    </p>
                  </div>
                </div>
              )}
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

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07020d] text-white flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-purple-500 border-r-fuchsia-500 border-b-transparent border-l-transparent animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
