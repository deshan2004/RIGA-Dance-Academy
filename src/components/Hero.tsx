"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar, Zap, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#07020e] text-white pt-16 pb-16">
      
      {/* Background Ambient Lights & Swirling Purple Smoke */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Left Vertical Neon Beams matching image */}
        <div className="absolute top-0 left-4 sm:left-12 w-1 h-full bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent opacity-80 blur-[2px] shadow-[0_0_20px_#e879f9]" />
        <div className="absolute top-0 right-4 sm:right-12 w-1 h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-80 blur-[2px] shadow-[0_0_20px_#a855f7]" />

        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
        <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] bg-fuchsia-900/25 rounded-full blur-[160px] mix-blend-screen" />
        <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-800/20 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07020e]/60 via-transparent to-[#07020e]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        {/* TOP BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        >
          <Zap className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
          <span>Sri Lanka&apos;s #1 Dance Troupe &amp; Academy</span>
        </motion.div>

        {/* --- HERO IMAGE BANNER CARD (EXACT HIGH-RES RIGA DANCE TROUPE IMAGE) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full relative mb-8 rounded-3xl overflow-hidden border border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.45)] bg-[#0e051c] group"
        >
          {/* Main Troupe Image */}
          <img 
            src="/images/riga-troupe-hero.jpg" 
            alt="RIGA Dance Troupe" 
            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 select-none block"
          />

          {/* Interactive Light Flare Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07020e] via-transparent to-purple-950/20 opacity-80 pointer-events-none" />
        </motion.div>

        {/* --- CATEGORY NAVIGATION LINKS (ACADEMY | CREW | RENTALS | PRODUCTIONS | EVENTS) --- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold tracking-[0.25em] text-purple-200 uppercase mb-10 px-4 py-2 rounded-full bg-[#120726]/80 border border-purple-900/50 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.2)]"
        >
          <Link href="/classes" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.9)] transition-all">
            ACADEMY
          </Link>
          <span className="text-purple-600/60 font-light">|</span>
          <Link href="/crew" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.9)] transition-all">
            CREW
          </Link>
          <span className="text-purple-600/60 font-light">|</span>
          <Link href="/rentals" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.9)] transition-all">
            RENTALS
          </Link>
          <span className="text-purple-600/60 font-light">|</span>
          <Link href="/productions" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.9)] transition-all">
            PRODUCTIONS
          </Link>
          <span className="text-purple-600/60 font-light">|</span>
          <Link href="/events" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.9)] transition-all">
            EVENTS
          </Link>
        </motion.div>

        {/* --- ACTION BUTTONS --- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-5 w-full max-w-lg"
        >
          <Link
            href="/events"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white transition-all duration-300 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 rounded-full hover:from-purple-500 hover:to-fuchsia-500 shadow-[0_0_35px_rgba(168,85,247,0.65)] hover:shadow-[0_0_50px_rgba(232,121,249,0.9)] border border-fuchsia-400/40"
          >
            <Calendar className="w-4 h-4 mr-2 text-purple-200 group-hover:scale-110 transition-transform" />
            Book Dance Troupe
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/classes"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-purple-100 transition-all duration-300 bg-purple-950/60 border border-purple-500/50 rounded-full hover:bg-purple-600 hover:text-white hover:border-purple-400 hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 mr-2 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
            Join Academy Classes
          </Link>
        </motion.div>

      </div>

      {/* --- FLOOR LIGHT BEAM REFLECTION (MATCHING IMAGE BOTTOM SPOTLIGHT) --- */}
      <div className="w-full max-w-5xl mt-12 px-4 relative flex flex-col items-center">
        <div className="w-3/4 sm:w-1/2 h-[3px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_25px_#e879f9] rounded-full" />
        <div className="w-full h-12 bg-gradient-to-t from-purple-600/20 via-purple-500/5 to-transparent blur-md -mt-3 pointer-events-none" />
      </div>

    </section>
  );
};

export default Hero;







