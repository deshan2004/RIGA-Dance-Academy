"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import EnrollmentSection from "@/components/EnrollmentSection";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const role = userDoc.exists() ? userDoc.data()?.role : "";
          const isAdmin =
            user.email === "deshandhakshitha16@gmail.com" ||
            (typeof role === "string" && role.toLowerCase() === "admin");

          if (isAdmin) {
            router.replace("/admin");
            return;
          } else {
            router.replace("/dashboard");
            return;
          }
        } catch {
          if (user.email === "deshandhakshitha16@gmail.com") {
            router.replace("/admin");
            return;
          }
          router.replace("/dashboard");
          return;
        }
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#07020e] flex flex-col items-center justify-center text-white px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.35)]">
            <Loader2 className="w-7 h-7 text-fuchsia-400 animate-spin" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">Resuming Session</h2>
            <p className="text-xs text-purple-300/70 mt-1 font-light">
              Taking you back to your portal...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090410] text-white flex flex-col justify-between">
      {/* Top Navigation Back Button */}
      <div className="pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <Link
          href="/"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:border-purple-500/60 hover:bg-purple-900/80 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:scale-105"
          aria-label="Back to Home"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5 text-fuchsia-400" />
        </Link>
      </div>

      <EnrollmentSection initialMode="signin" />
    </div>
  );
}
