"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Trophy, Users, ShoppingBag, Music, Zap, ChevronRight, Play } from "lucide-react";

interface NavCategory {
  name: string;
  href: string;
  icon: string;
  badge: string;
  description: string;
}

const navCategories: NavCategory[] = [
  {
    name: "ACADEMY",
    href: "/classes",
    icon: "🎓",
    badge: "12+ Styles",
    description: "Hip-Hop, Kandyan, Salsa, Contemporary, Heels & Ballet"
  },
  {
    name: "CREW",
    href: "/crew",
    icon: "👥",
    badge: "Troupe Team",
    description: "Award-winning professional performance crew"
  },
  {
    name: "RENTALS",
    href: "/rentals",
    icon: "👗",
    badge: "Wardrobe Hub",
    description: "Stage costumes, theatrical props & accessories"
  },
  {
    name: "PRODUCTIONS",
    href: "/productions",
    icon: "🎬",
    badge: "Mega Concerts",
    description: "Grand recitals, TV showcases & live theater"
  },
  {
    name: "EVENTS",
    href: "/events",
    icon: "🎉",
    badge: "Upcoming Galas",
    description: "Competitions, workshops & stage pageants"
  },
];

const quickStats = [
  { icon: "✨", value: "500+", label: "Active Dancers", color: "from-purple-500 to-fuchsia-500" },
  { icon: "🏆", value: "15+", label: "National Trophies", color: "from-amber-400 to-yellow-500" },
  { icon: "👗", value: "100+", label: "Stage Costumes", color: "from-fuchsia-500 to-pink-500" },
  { icon: "⚡", value: "98%", label: "Satisfaction Rate", color: "from-cyan-400 to-blue-500" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<NavCategory | null>(null);
  const [isPlayingPulse, setIsPlayingPulse] = useState(true);

  // Mouse Parallax Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Spring Motion for 3D Tilt Effect
  const springConfig = { damping: 25, stiffness: 200 };
  const tiltX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), springConfig);
  const lightX = useSpring(useTransform(mouseX, [-400, 400], [100, 900]), springConfig);
  const lightY = useSpring(useTransform(mouseY, [-300, 300], [100, 500]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setActiveCategory(null);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#07020e] text-white pt-28 pb-16 select-none"
    >
      {/* Dynamic Cursor Spotlight Following Mouse */}
      <motion.div
        className="pointer-events-none absolute w-[550px] h-[550px] rounded-full bg-gradient-to-r from-purple-600/15 via-fuchsia-600/20 to-pink-600/10 blur-[130px] z-0 mix-blend-screen"
        style={{
          x: lightX,
          y: lightY,
        }}
      />

      {/* Ambient Lighting & Swirling Smoke Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-purple-900/30 rounded-full blur-[160px] mix-blend-screen animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] bg-fuchsia-900/25 rounded-full blur-[170px] mix-blend-screen" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-purple-800/20 rounded-full blur-[140px] mix-blend-screen" />
        
        {/* Animated Dust Sparkle Particle Orbs */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-fuchsia-400 blur-[1px] animate-ping" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-purple-300 blur-[2px] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-pink-400 blur-[1px] animate-bounce" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#07020e]/80 via-transparent to-[#07020e]" />
      </div>

      {/* Main Content Container with 3D Tilt */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">

        {/* --- 3D INTERACTIVE TILT CONTAINER FOR LOGO & SLOGAN --- */}
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl flex flex-col items-center mb-8 px-2 cursor-grab active:cursor-grabbing"
        >
          {/* High-Resolution 3D Metallic RIGA Wordmark Logo with Interactive Parallax Glow */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full relative py-2 mb-2 flex justify-center items-center pointer-events-auto"
          >
            <img 
              src="/images/riga-transparent.png" 
              alt="RIGA" 
              className="w-full max-w-2xl sm:max-w-3xl h-auto object-contain block mx-auto filter drop-shadow-[0_0_50px_rgba(168,85,247,0.75)] transition-all duration-300 hover:drop-shadow-[0_0_70px_rgba(232,121,249,0.95)]"
            />
          </motion.div>

          {/* DANCE ACADEMY TYPOGRAPHY */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full overflow-hidden text-center"
          >
            <h2 className="whitespace-nowrap text-[5.5vw] sm:text-4xl md:text-5xl font-light tracking-[0.35em] sm:tracking-[0.55em] text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-fuchsia-200 to-purple-300 uppercase mt-2 mb-3 font-sans drop-shadow-[0_0_20px_rgba(192,132,252,0.7)]">
              DANCE ACADEMY
            </h2>
          </motion.div>

          {/* DIVIDER LINE & TAGLINE */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full flex items-center justify-center gap-3 sm:gap-5 max-w-2xl my-2"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-purple-500/70 to-purple-400/90" />
            <span className="whitespace-nowrap text-[2.5vw] sm:text-xs md:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.45em] text-purple-200/90 uppercase drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
              DANCE BEYOND LIMITS.
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-purple-500/70 to-purple-400/90" />
          </motion.div>
        </motion.div>

        {/* --- INTERACTIVE CATEGORY NAVIGATION WITH HOVER POPOVERS --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mb-10 w-full"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
            {navCategories.map((cat, index) => (
              <div key={cat.name} className="relative flex items-center">
                <Link
                  href={cat.href}
                  onMouseEnter={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                    activeCategory?.name === cat.name
                      ? "bg-purple-600/40 text-fuchsia-300 border border-fuchsia-500/60 shadow-[0_0_20px_rgba(232,121,249,0.6)] scale-105"
                      : "text-purple-300/80 hover:text-white hover:bg-purple-950/50"
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>

                {index < navCategories.length - 1 && (
                  <span className="text-purple-600/50 font-light ml-2 sm:ml-4 select-none">|</span>
                )}
              </div>
            ))}
          </div>

          {/* Dynamic Interactive Hover Card / Tooltip */}
          <AnimatePresence>
            {activeCategory && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 top-12 z-30 bg-[#15092a]/95 border border-fuchsia-500/50 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.5)] max-w-xs text-center pointer-events-none"
              >
                <div className="flex items-center justify-center gap-2 text-fuchsia-300 text-xs font-black uppercase tracking-wider mb-0.5">
                  <span>{activeCategory.icon}</span>
                  <span>{activeCategory.name}</span>
                  <span className="bg-fuchsia-950 text-fuchsia-200 border border-fuchsia-600 text-[9px] px-2 py-0.5 rounded-full">
                    {activeCategory.badge}
                  </span>
                </div>
                <p className="text-[11px] text-purple-200/80 font-light">
                  {activeCategory.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- MODERN MAGNETIC ACTION BUTTONS --- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-5 w-full"
        >
          <Link
            href="/classes"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-purple-100 transition-all duration-300 bg-purple-950/70 border border-purple-500/60 rounded-full hover:bg-purple-600 hover:text-white hover:border-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] backdrop-blur-md overflow-hidden"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
            <Sparkles className="w-4 h-4 mr-2 text-fuchsia-400 group-hover:rotate-45 transition-transform" />
            Explore Classes
          </Link>

          <Link
            href="/enroll"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-white transition-all duration-300 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 rounded-full hover:from-purple-500 hover:to-fuchsia-500 shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:shadow-[0_0_55px_rgba(232,121,249,0.9)] border border-fuchsia-400/50 hover:scale-105"
          >
            Start Dancing Now
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>

        {/* --- INTERACTIVE STATS BADGES COUNTER BAR --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-12 w-full max-w-3xl"
        >
          {quickStats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.03 }}
              className="bg-[#120624]/80 border border-purple-900/50 hover:border-purple-500/60 backdrop-blur-md p-3 rounded-2xl transition-all shadow-md hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-3"
            >
              <span className="text-2xl">{stat.icon}</span>
              <div className="text-left">
                <span className={`text-sm sm:text-base font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent block leading-tight`}>
                  {stat.value}
                </span>
                <span className="text-[10px] text-purple-300/70 uppercase tracking-wider font-medium block">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* --- SOUNDWAVE AUDIO PULSE & FLOOR REFLECTION LIGHT BEAM --- */}
      <div className="w-full max-w-4xl mt-14 px-4 relative flex flex-col items-center">
        {/* Animated Rhythm Equalizer Bars */}
        <div className="flex items-center gap-1 mb-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setIsPlayingPulse(!isPlayingPulse)}>
          <Music className="w-3.5 h-3.5 text-fuchsia-400 mr-1 animate-spin" style={{ animationDuration: "6s" }} />
          <span className="text-[10px] font-bold text-fuchsia-300 uppercase tracking-widest mr-2">
            Groove Audio Pulse
          </span>
          <div className="flex items-end gap-1 h-4">
            {[40, 70, 30, 90, 60, 100, 45, 80, 50, 85, 35, 95].map((height, i) => (
              <motion.div
                key={i}
                animate={isPlayingPulse ? { height: ["20%", `${height}%`, "20%"] } : { height: "20%" }}
                transition={{
                  duration: 0.8 + (i % 4) * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1 bg-gradient-to-t from-purple-600 via-fuchsia-400 to-pink-500 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Floor Spotlight Reflection Line */}
        <div className="w-3/4 sm:w-1/2 h-[3px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_30px_#e879f9] rounded-full" />
        <div className="w-full h-14 bg-gradient-to-t from-purple-600/25 via-purple-500/5 to-transparent blur-md -mt-3 pointer-events-none" />
      </div>

    </section>
  );
}







