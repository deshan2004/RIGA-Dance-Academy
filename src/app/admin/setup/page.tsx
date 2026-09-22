"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, Mail, User, Key, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminSetupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const router = useRouter();

  const handleSetupAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    if (password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setStatus({ type: "error", message: "Password must be at least 6 characters long." });
      setLoading(false);
      return;
    }

    try {
      let uid = "";

      try {
        // Try creating a new Firebase user
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        uid = userCredential.user.uid;
      } catch (authErr: any) {
        // If email already in use, try signing in to promote existing user to admin
        if (authErr.code === "auth/email-already-in-use") {
          const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
          uid = userCredential.user.uid;
        } else {
          throw authErr;
        }
      }

      // Save/Update user role as "admin" in Firestore
      await setDoc(
        doc(db, "users", uid),
        {
          name: name.trim() || "Administrator",
          email: email.trim(),
          role: "admin",
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      setStatus({
        type: "success",
        message: "Admin account successfully created & configured! Redirecting to Admin Dashboard...",
      });

      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setStatus({
        type: "error",
        message: err.message || "Failed to create Admin account. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090410] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:border-purple-500/60 transition-all text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
          Back to Sign In
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-md w-full mx-auto my-8 bg-purple-950/20 border border-purple-800/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 p-0.5 mb-4 shadow-[0_0_20px_rgba(217,70,239,0.4)]">
            <div className="w-full h-full bg-[#090410] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-fuchsia-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-100 to-fuchsia-300 bg-clip-text text-transparent">
            Setup Admin Account
          </h1>
          <p className="text-xs text-purple-300/70 mt-2">
            Create an administrator account to manage student enrollments, approval requests, and academy operations.
          </p>
        </div>

        {status.type && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs font-medium border flex items-start gap-3 ${
              status.type === "success"
                ? "bg-green-950/40 border-green-500/40 text-green-300"
                : "bg-red-950/40 border-red-500/40 text-red-300"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            )}
            <div>{status.message}</div>
          </div>
        )}

        <form onSubmit={handleSetupAdmin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                placeholder="Admin Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white placeholder-purple-400/50 text-sm focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="admin@grooveacademy.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white placeholder-purple-400/50 text-sm focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white placeholder-purple-400/50 text-sm focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white placeholder-purple-400/50 text-sm focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(217,70,239,0.35)] hover:shadow-[0_0_35px_rgba(217,70,239,0.55)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Create Admin Account
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer link */}
      <div className="text-center text-xs text-purple-400/60 pb-4">
        Groove Academy &copy; {new Date().getFullYear()} Management Portal
      </div>
    </div>
  );
}
