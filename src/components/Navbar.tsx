"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Sparkles, 
  Users, 
  ShoppingBag, 
  Clapperboard, 
  Music, 
  ArrowRight,
  ChevronRight
} from "lucide-react";

const navItems = [
  { 
    label: "ACADEMY", 
    href: "/login", 
    desc: "Student Portal & Enrollment",
    icon: Sparkles
  },
  { 
    label: "CREW", 
    href: "/crew", 
    desc: "Pro Performance Troupe & Mega Crew",
    icon: Users
  },
  { 
    label: "RENTALS", 
    href: "/rentals", 
    desc: "Costumes & Accessories",
    icon: ShoppingBag
  },
  { 
    label: "PRODUCTIONS", 
    href: "/productions", 
    desc: "Media, Film & Grand Concerts",
    icon: Clapperboard
  },
  { 
    label: "CHOREOGRAPHY", 
    href: "/events", 
    desc: "Weddings, Stage & Custom Acts",
    icon: Music
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // On the home page, desktop header smoothly reveals when scrolling down past the hero
  // On other pages, desktop header is always visible
  const isHomePage = pathname === "/";
  const showDesktopHeader = !isHomePage || isScrolled;

  // Do not render public Navbar in Admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* ========================================================= */}
      {/* MAIN TOP BAR (Mobile Always Visible, Desktop Conditional) */}
      {/* ========================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          showDesktopHeader
            ? "md:translate-y-0 md:opacity-100"
            : "md:-translate-y-full md:opacity-0 pointer-events-none md:pointer-events-none"
        }`}
      >
        <div className="w-full bg-gradient-to-r from-[#130427]/75 via-[#0a0117]/65 to-[#16042e]/75 backdrop-blur-2xl border-b border-purple-500/30 shadow-[inset_0_1px_0_0_rgba(192,132,252,0.18),0_10px_35px_-5px_rgba(147,51,234,0.25)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            
            {/* BRAND LOGO */}
            <Link 
              href="/" 
              className="group flex items-center gap-3 relative z-10 pointer-events-auto"
              aria-label="RIGA Dance Academy Home"
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-purple-900/80 to-purple-700/40 p-1 border border-purple-500/40 group-hover:border-purple-300 transition-all shadow-[0_0_15px_rgba(168,85,247,0.35)] flex items-center justify-center">
                <Image
                  src="/images/riga-original-transparent.png"
                  alt="RIGA"
                  width={44}
                  height={44}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-widest text-metallic-purple uppercase group-hover:text-white transition-colors leading-none">
                  RIGA
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-purple-300/80 uppercase">
                  Dance Academy
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav 
              aria-label="Main Navigation" 
              className="hidden md:flex items-center gap-1 lg:gap-2 pointer-events-auto"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-3.5 py-2 text-xs font-extrabold tracking-[0.2em] uppercase transition-all duration-300 rounded-lg group ${
                      isActive 
                        ? "text-white" 
                        : "text-purple-200/80 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10 drop-shadow-[0_0_8px_rgba(192,132,252,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">
                      {item.label}
                    </span>
                    {isActive ? (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-500 shadow-[0_0_10px_#c084fc] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-purple-400 group-hover:w-3/4 transition-all duration-300 opacity-60 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* DESKTOP RIGHT CTA */}
            <div className="hidden md:flex items-center gap-3 pointer-events-auto">
              <Link
                href="/login"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.16em] text-white bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-800 hover:from-purple-600 hover:to-fuchsia-500 shadow-[0_0_20px_rgba(168,85,247,0.45)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] border border-purple-400/40 hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-300" />
                <span>Join Classes</span>
                <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* MOBILE HAMBURGER TOGGLE BUTTON */}
            <div className="flex md:hidden items-center pointer-events-auto">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2.5 rounded-2xl bg-purple-950/70 border border-purple-500/40 text-purple-200 hover:text-white hover:border-purple-300 hover:bg-purple-900/80 active:scale-95 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <span className="sr-only">Toggle navigation</span>
                {isOpen ? (
                  <X className="w-6 h-6 text-fuchsia-300 transition-transform duration-200 rotate-90" />
                ) : (
                  <Menu className="w-6 h-6 text-purple-200" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE LUXURY SLIDE-OUT DRAWER                            */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md md:hidden"
              aria-hidden="true"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm sm:max-w-md bg-[#070112]/95 backdrop-blur-2xl border-l border-purple-500/30 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-y-auto md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              {/* Subtle ambient light effects */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none" />

              {/* Drawer Top Bar */}
              <div className="relative z-10 px-6 pt-6 pb-4 flex items-center justify-between border-b border-purple-900/40">
                <Link 
                  href="/" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-950/80 p-1 border border-purple-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <Image
                      src="/images/riga-original-transparent.png"
                      alt="RIGA"
                      width={40}
                      height={40}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xl font-black tracking-widest text-metallic-purple uppercase block leading-none">
                      RIGA
                    </span>
                    <span className="text-[10px] font-semibold tracking-wider text-purple-300/80 uppercase">
                      Dance Academy
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 hover:text-white hover:border-purple-300 flex items-center justify-center active:scale-95 transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-fuchsia-300" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="relative z-10 px-6 py-6 flex-1 flex flex-col justify-center gap-3">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? "bg-purple-900/40 border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                            : "bg-[#120726]/60 border-purple-900/40 hover:bg-purple-950/70 hover:border-purple-500/50"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                            isActive
                              ? "bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white border-purple-300 shadow-[0_0_15px_rgba(192,132,252,0.6)]"
                              : "bg-purple-950/80 text-fuchsia-400 border-purple-800/50 group-hover:border-purple-400 group-hover:scale-105"
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-extrabold uppercase tracking-[0.18em] text-white group-hover:text-fuchsia-300 transition-colors">
                              {item.label}
                            </div>
                            <div className="text-xs text-purple-300/60 font-medium">
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                          isActive 
                            ? "text-fuchsia-300 translate-x-0" 
                            : "text-purple-400/40 group-hover:text-purple-200 group-hover:translate-x-1"
                        }`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer Bottom Footer */}
              <div className="relative z-10 px-6 pb-6 text-center">
                <p className="text-[10px] text-purple-300/40 tracking-wider">
                  © {new Date().getFullYear()} RIGA Dance Academy. All rights reserved.
                </p>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
