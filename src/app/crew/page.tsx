"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Users2, Phone, PhoneCall, MessageSquare, Calendar, ArrowRight, Sparkles, MapPin, Music } from "lucide-react";
import Link from "next/link";

export default function CrewPage() {
  return (
    <div className="min-h-screen bg-[#090410] text-white">
      {/* Back Button */}
      <div className="pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <Link
          href="/"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:border-purple-500/60 hover:bg-purple-900/80 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:scale-105"
          aria-label="Back to Home"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5 text-fuchsia-400" />
        </Link>
      </div>

      {/* Hero Section */}
      <section className="pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/50 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
        >
          <Users2 className="w-4 h-4 text-fuchsia-400" />
          RIGA Pro Performance Troupe
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-black uppercase text-white tracking-wide mb-6"
        >
          The Pro <span className="text-metallic-purple">Dance Crew</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-purple-200/70 max-w-3xl mx-auto text-base sm:text-lg font-light leading-relaxed mb-12"
        >
          Sri Lanka&apos;s elite dance ensemble blending Kandyan traditional mastery with modern Hip-Hop, Latin, and Contemporary stage showmanship. Available for concerts, brand launches, and island-wide tours across Sri Lanka.
        </motion.p>

        {/* Crew Contact & Booking Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 mb-12 text-left">
          {/* WhatsApp & Phone Direct Contact */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#140924] border border-purple-900/50 hover:border-emerald-500/50 transition-all shadow-[0_0_20px_rgba(9,4,16,0.6)] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                  Direct Contact
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                Contact Crew via WhatsApp & Call
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/70 font-light leading-relaxed mb-6">
                Talk directly with our troupe coordinator for urgent performance dates, package rates, and custom choreography.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-2">
              <a
                href="https://wa.me/94763401285?text=Hello%20RIGA%20Dance%20Academy,%20I%20would%20like%20to%20hire/inquire%20about%20the%20Pro%20Dance%20Crew."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                Chat WhatsApp
              </a>
              <a
                href="tel:+94763401285"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700/50 text-purple-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                +94 76 340 1285
              </a>
            </div>
          </div>

          {/* Official Booking Inquiry Form */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#140924] border border-purple-900/50 hover:border-fuchsia-500/50 transition-all shadow-[0_0_20px_rgba(9,4,16,0.6)] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-700/40 flex items-center justify-center text-fuchsia-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-950/70 border border-purple-600/40 text-fuchsia-300 text-[10px] font-black uppercase tracking-wider">
                  Event Booking
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-fuchsia-300 transition-colors">
                Book Crew For Your Event
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/70 font-light leading-relaxed mb-6">
                Reserve the crew for stage shows, music videos, TV commercials, concerts, corporate events, or wedding grand entrances.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-[1.01]"
              >
                Send Booking Inquiry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Crew Booking Perks */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-900/30 flex items-center justify-center gap-3 text-purple-300 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
            <span>Custom Show Choreography</span>
          </div>
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-900/30 flex items-center justify-center gap-3 text-purple-300 text-xs font-medium">
            <MapPin className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
            <span>Available Island-wide in Sri Lanka</span>
          </div>
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-900/30 flex items-center justify-center gap-3 text-purple-300 text-xs font-medium">
            <Music className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
            <span>Concerts, Videos & Stage Shows</span>
          </div>
        </div>
      </section>
    </div>
  );
}
