"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#07020e] text-white pt-24 pb-16">
      
      {/* Background Ambient Lights & Swirling Smoke */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
        <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] bg-fuchsia-900/25 rounded-full blur-[160px] mix-blend-screen" />
        <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-800/20 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07020e]/80 via-transparent to-[#07020e]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        {/* --- RIGA WORDMARK LOGO IMAGE (100% TRANSPARENT PNG) + NATIVE HTML TYPOGRAPHY --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl flex flex-col items-center mb-8 px-2"
        >
          {/* High-Resolution 3D Metallic RIGA Wordmark - Pure Transparent PNG */}
          <div className="w-full relative py-2 mb-2 flex justify-center items-center pointer-events-none select-none">
            <img 
              src="/images/riga-transparent.png" 
              alt="RIGA" 
              className="w-full max-w-2xl sm:max-w-3xl h-auto object-contain block mx-auto filter drop-shadow-[0_0_40px_rgba(168,85,247,0.7)]"
            />
          </div>


          {/* DANCE ACADEMY TEXT - GUARANTEED NON-WRAPPING */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full overflow-hidden text-center"
          >
            <h2 className="whitespace-nowrap select-none text-[5.5vw] sm:text-4xl md:text-5xl font-light tracking-[0.35em] sm:tracking-[0.55em] text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-fuchsia-200 to-purple-300 uppercase mt-2 mb-3 font-sans drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]">
              DANCE ACADEMY
            </h2>
          </motion.div>


          {/* DIVIDER LINE & TAGLINE - GUARANTEED NON-WRAPPING */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full flex items-center justify-center gap-3 sm:gap-5 max-w-2xl my-2"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-purple-500/60 to-purple-400/80" />
            <span className="whitespace-nowrap select-none text-[2.5vw] sm:text-xs md:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.45em] text-purple-200/90 uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
              DANCE BEYOND LIMITS.
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-purple-500/60 to-purple-400/80" />
          </motion.div>
        </motion.div>

        {/* --- CATEGORY NAVIGATION LINKS (ACADEMY | CREW | RENTALS | PRODUCTIONS | EVENTS) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold tracking-[0.25em] text-purple-300/90 uppercase mb-10"
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
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-5"
        >
          <Link
            href="/classes"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-purple-100 transition-all duration-300 bg-purple-950/60 border border-purple-500/50 rounded-full hover:bg-purple-600 hover:text-white hover:border-purple-400 hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 mr-2 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
            Explore Classes
          </Link>
          <Link
            href="/enroll"
            className="group inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white transition-all duration-300 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 rounded-full hover:from-purple-500 hover:to-fuchsia-500 shadow-[0_0_30px_rgba(168,85,247,0.55)] hover:shadow-[0_0_45px_rgba(232,121,249,0.85)] border border-fuchsia-400/40"
          >
            Start Dancing Now
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>

      {/* --- FLOOR LIGHT BEAM REFLECTION (MATCHING IMAGE BOTTOM SPOTLIGHT) --- */}
      <div className="w-full max-w-4xl mt-16 px-4 relative flex flex-col items-center">
        <div className="w-3/4 sm:w-1/2 h-[3px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_25px_#e879f9] rounded-full" />
        <div className="w-full h-12 bg-gradient-to-t from-purple-600/20 via-purple-500/5 to-transparent blur-md -mt-3 pointer-events-none" />
      </div>

    </section>
  );
};

export default Hero;







