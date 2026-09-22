"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#07020e] text-white pt-20 pb-16">
      
      {/* --- FULL-BLEED SEAMLESS DANCERS TROUPE BACKGROUND SCENE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Background Visual Scene */}
        <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
          <img 
            src="/images/riga-troupe-hero.jpg" 
            alt="RIGA Troupe Scene" 
            className="w-full h-full object-cover sm:object-contain opacity-40 sm:opacity-50 scale-105 filter drop-shadow-[0_0_60px_rgba(168,85,247,0.5)] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"
          />
        </div>

        {/* Ambient Neon Purple Flares & Vertical Beams */}
        <div className="absolute top-0 left-6 sm:left-16 w-1 h-full bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent opacity-80 blur-[2px] shadow-[0_0_25px_#e879f9]" />
        <div className="absolute top-0 right-6 sm:right-16 w-1 h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-80 blur-[2px] shadow-[0_0_25px_#a855f7]" />

        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[160px] mix-blend-screen animate-pulse" />
        <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] bg-fuchsia-900/25 rounded-full blur-[170px] mix-blend-screen" />
        <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-800/25 rounded-full blur-[140px] mix-blend-screen" />
        
        {/* Directional Vignettes (Top, Bottom, Left, Right) */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07020e] via-[#07020e]/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#07020e] via-[#07020e]/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07020e] via-[#07020e]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#07020e] via-[#07020e]/90 to-transparent" />
      </div>

      {/* --- NATIVE WEB HERO UI CONTENT --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        {/* NATIVE RIGA WORDMARK LOGO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl flex flex-col items-center mb-6 px-2 pointer-events-none select-none"
        >
          <img 
            src="/images/riga-transparent.png" 
            alt="RIGA" 
            className="w-full max-w-xl sm:max-w-2xl h-auto object-contain block mx-auto filter drop-shadow-[0_0_40px_rgba(168,85,247,0.85)]"
          />

          {/* DANCE TROUPE NATIVE HEADING */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="whitespace-nowrap select-none text-[6vw] sm:text-4xl md:text-6xl font-light tracking-[0.35em] sm:tracking-[0.55em] text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-fuchsia-200 to-purple-300 uppercase mt-4 mb-2 font-sans drop-shadow-[0_0_20px_rgba(192,132,252,0.7)]"
          >
            DANCE TROUPE
          </motion.h2>

          {/* DIVIDER & TAGLINE */}
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

        {/* CATEGORY LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold tracking-[0.25em] text-purple-200 uppercase mb-10 px-6 py-2.5 rounded-full bg-[#120726]/80 border border-purple-900/50 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.2)]"
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

        {/* ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-5 w-full max-w-lg z-20"
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

      {/* FLOOR REFLECTION SPOTLIGHT */}
      <div className="w-full max-w-5xl mt-12 px-4 relative flex flex-col items-center pointer-events-none">
        <div className="w-3/4 sm:w-1/2 h-[3px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_25px_#e879f9] rounded-full" />
        <div className="w-full h-12 bg-gradient-to-t from-purple-600/20 via-purple-500/5 to-transparent blur-md -mt-3" />
      </div>

    </section>
  );
};

export default Hero;








