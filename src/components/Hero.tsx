"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";

const navItems = [
  { label: "ACADEMY", href: "/classes" },
  { label: "CREW", href: "/crew" },
  { label: "RENTALS", href: "/rentals" },
  { label: "PRODUCTIONS", href: "/productions" },
  { label: "EVENTS", href: "/events" },
];

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#07020e] text-white pt-12 pb-16">
      
      {/* Background Ambient Lights & Swirling Purple Smoke */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Left & Right Vertical Neon Light Beams - Symmetrical Glowing Purple */}
        <div className="absolute top-0 left-4 sm:left-12 w-1 h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-80 blur-[2px] shadow-[0_0_20px_#a855f7]" />
        <div className="absolute top-0 right-4 sm:right-12 w-1 h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-80 blur-[2px] shadow-[0_0_20px_#a855f7]" />

        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
        <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[160px] mix-blend-screen" />
        <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-800/20 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07020e]/60 via-transparent to-[#07020e]" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        {/* --- MAIN HERO VISUAL ARTWORK (VIVID, CRISP & SEAMLESS BORDER FADE) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full relative mb-8 flex justify-center items-center select-none"
        >
          {/* Main Troupe Artwork with 70% Solid Center for Maximum Clarity */}
          <div className="relative w-full max-w-5xl overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_72%,transparent_98%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_72%,transparent_98%)]">
            <img 
              src="/images/riga-troupe-hero.jpg" 
              alt="RIGA Dance Troupe" 
              className="w-full h-auto object-contain block mx-auto opacity-100 filter contrast-105 brightness-105 drop-shadow-[0_0_50px_rgba(168,85,247,0.7)]"
            />
            {/* Seamless Edge Gradient Fades to blend into #07020e background */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07020e] via-[#07020e]/60 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#07020e] via-[#07020e]/60 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#07020e] via-[#07020e]/60 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#07020e] via-[#07020e]/80 to-transparent pointer-events-none z-10" />
          </div>
        </motion.div>

        {/* --- CATEGORY NAVIGATION LINKS (ACADEMY • CREW • RENTALS • PRODUCTIONS • EVENTS) --- */}
        <motion.nav
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          aria-label="Category Navigation"
          className="relative inline-flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 mb-10 rounded-full bg-[#120626]/75 border border-purple-500/35 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(168,85,247,0.25)] ring-1 ring-white/10"
        >
          {navItems.map((item, index) => (
            <React.Fragment key={item.label}>
              {index > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50 shadow-[0_0_8px_rgba(192,132,252,0.8)] mx-1 hidden sm:inline-block pointer-events-none" />
              )}
              <Link
                href={item.href}
                className="group relative px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold tracking-[0.22em] text-purple-200/90 uppercase transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-fuchsia-600/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.45)] hover:border-purple-400/40 border border-transparent"
              >
                <span className="relative z-10 drop-shadow-[0_0_8px_rgba(192,132,252,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]">
                  {item.label}
                </span>
              </Link>
            </React.Fragment>
          ))}
        </motion.nav>

        {/* --- ACTION BUTTONS --- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full max-w-xl"
        >
          {/* PRIMARY CTA: BOOK DANCE TROUPE */}
          <Link
            href="/events"
            className="group relative overflow-hidden inline-flex items-center justify-between px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-white transition-all duration-300 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-violet-700 hover:from-purple-600 hover:via-fuchsia-500 hover:to-violet-600 shadow-[0_0_35px_rgba(168,85,247,0.55),0_0_60px_rgba(192,132,252,0.25)] hover:shadow-[0_0_50px_rgba(168,85,247,0.85),0_0_80px_rgba(232,121,249,0.4)] border border-purple-300/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Shimmer Light Sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

            <div className="relative z-10 flex items-center">
              <span className="p-1.5 rounded-full bg-white/15 border border-white/25 mr-3 group-hover:scale-110 group-hover:bg-white/25 transition-all shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                <Calendar className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Book Dance Troupe</span>
            </div>

            <span className="relative z-10 p-1.5 rounded-full bg-white/15 border border-white/25 ml-3.5 group-hover:translate-x-1 group-hover:bg-white/25 transition-all shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </span>
          </Link>

          {/* SECONDARY CTA: JOIN ACADEMY CLASSES */}
          <Link
            href="/classes"
            className="group relative inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-purple-100 transition-all duration-300 bg-[#130728]/85 hover:bg-purple-900/40 border border-purple-400/40 hover:border-purple-300/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_40px_rgba(192,132,252,0.5)] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="p-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 mr-3 group-hover:scale-110 group-hover:bg-purple-500/40 group-hover:rotate-12 transition-all shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-300" />
            </span>
            <span>Join Academy Classes</span>
          </Link>
        </motion.div>

      </div>

      {/* --- FLOOR LIGHT BEAM REFLECTION --- */}
      <div className="w-full max-w-5xl mt-12 px-4 relative flex flex-col items-center pointer-events-none">
        <div className="w-3/4 sm:w-1/2 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_30px_#c084fc,0_0_10px_#a855f7] rounded-full" />
        <div className="w-full h-16 bg-gradient-to-t from-purple-600/20 via-fuchsia-500/5 to-transparent blur-xl -mt-4" />
      </div>

    </section>
  );
};

export default Hero;









