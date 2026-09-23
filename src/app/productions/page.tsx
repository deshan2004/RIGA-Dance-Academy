"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clapperboard, Clock } from "lucide-react";

export default function ProductionsPage() {
  return (
    <div className="min-h-screen bg-[#04000b] text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-900/20 via-fuchsia-900/15 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/70 border border-purple-800/40 text-purple-300 hover:text-white hover:border-purple-500/60 transition-all text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
          Back to Home
        </Link>
      </div>

      {/* Main Content Card */}
      <div className="max-w-3xl mx-auto px-4 py-16 text-center relative z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-[#120726]/80 border border-purple-500/30 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.25)] flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-purple-950/90 border border-purple-700/60 flex items-center justify-center text-fuchsia-400 mb-6 shadow-[0_0_30px_rgba(232,121,249,0.4)]">
            <Clapperboard className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950 border border-purple-700/60 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Clock className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
            <span>Launching Soon</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-white mb-4">
            RIGA Media <span className="text-metallic-purple">&amp; Productions</span>
          </h1>

          <p className="text-purple-200/80 text-sm sm:text-base font-light leading-relaxed max-w-xl mb-8">
            Our film choreography, music video direction, and grand concert production services will be introduced soon. Get ready for breathtaking dance cinema!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <Link
              href="/events"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-800 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-[1.02] transition-all"
            >
              Book Dance Troupe
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-purple-950/80 border border-purple-700/60 hover:border-purple-400 text-purple-200 hover:text-white font-bold text-xs uppercase tracking-widest transition-all"
            >
              Contact Directing Team
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer copyright space */}
      <div className="pb-8 text-center text-purple-300/40 text-xs relative z-10">
        © {new Date().getFullYear()} RIGA Dance Academy. All rights reserved.
      </div>
    </div>
  );
}
