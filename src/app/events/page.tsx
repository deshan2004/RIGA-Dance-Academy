"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, Star, ArrowLeft, Heart, Sparkles, CheckCircle2, MessageCircle, Video, PartyPopper, Flame, Zap, Crown, Users, Radio, X, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export interface ChoreographyPackage {
  id: string;
  category: "weddings" | "events" | "music_video";
  dancerCount: number;
  dancersLabel: string;
  actsLabel: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
}

const choreographyPackages: ChoreographyPackage[] = [
  // --- WEDDINGS ---
  {
    id: "pkg-w-4d-3a",
    category: "weddings",
    dancerCount: 4,
    dancersLabel: "4 Dancers",
    actsLabel: "3 Dance Acts",
    badge: "Popular Starter",
    features: [
      "4 Professional Troupe Dancers",
      "3 High-Energy Stage Dance Acts",
      "Authentic & Modern Bespoke Costumes",
      "Customized Music & Song Selection",
      "Islandwide Performance Coverage (Travel quoted per venue)"
    ]
  },
  {
    id: "pkg-w-4d-w3a",
    category: "weddings",
    dancerCount: 4,
    dancersLabel: "4 Dancers",
    actsLabel: "Welcome Dance + 3 Dance Acts",
    badge: "Welcome Special",
    highlighted: true,
    features: [
      "4 Professional Troupe Dancers",
      "Traditional / Modern Welcome Entry Dance",
      "3 High-Energy Stage Dance Acts",
      "Bespoke Wedding Regalia & Accessories",
      "Customized Music & Entrance Choreography",
      "Islandwide Performance Coverage (Travel quoted per venue)"
    ]
  },
  {
    id: "pkg-w-4d-4a",
    category: "weddings",
    dancerCount: 4,
    dancersLabel: "4 Dancers",
    actsLabel: "4 Dance Acts",
    badge: "Full 4-Act Set",
    features: [
      "4 Professional Troupe Dancers",
      "4 Complete Grand Stage Acts",
      "Multi-Style Costume Changes",
      "Customized Theme Choreography",
      "Islandwide Performance Coverage (Travel quoted per venue)"
    ]
  },
  {
    id: "pkg-w-5d-3a",
    category: "weddings",
    dancerCount: 5,
    dancersLabel: "5 Dancers",
    actsLabel: "3 Dance Acts",
    badge: "Ensemble Choice",
    features: [
      "5 Professional Troupe Dancers",
      "3 High-Energy Stage Dance Acts",
      "Premium Stage Costumes & Props",
      "Center-Stage Solo & Formation Acts",
      "Islandwide Performance Coverage (Travel quoted per venue)"
    ]
  },
  {
    id: "pkg-w-5d-4a",
    category: "weddings",
    dancerCount: 5,
    dancersLabel: "5 Dancers",
    actsLabel: "4 Dance Acts",
    badge: "Deluxe 5-Dancer Set",
    highlighted: true,
    features: [
      "5 Professional Troupe Dancers",
      "4 Complete Grand Stage Acts",
      "Multi-Genre Fusion Performance",
      "Full Accessory & Prop Package",
      "Islandwide Performance Coverage (Travel quoted per venue)"
    ]
  },
  {
    id: "pkg-w-6d-3a",
    category: "weddings",
    dancerCount: 6,
    dancersLabel: "6 Dancers",
    actsLabel: "3 Dance Acts",
    badge: "Grand Ensemble",
    features: [
      "6 Professional Troupe Dancers",
      "3 High-Impact Stage Dance Acts",
      "Grand Formation & Visual Impact",
      "Matching Uniform Troupe Outfits",
      "Islandwide Performance Coverage (Travel quoted per venue)"
    ]
  },
  {
    id: "pkg-w-6d-4a",
    category: "weddings",
    dancerCount: 6,
    dancersLabel: "6 Dancers",
    actsLabel: "4 Dance Acts",
    badge: "Ultimate Mega Set",
    highlighted: true,
    features: [
      "6 Professional Troupe Dancers",
      "4 Grand Full Stage Performances",
      "Complete Multi-Style Wardrobe Changes",
      "Max Impact Stage Sync & Lighting Cue Sync",
      "Dedicated Stage Manager & Coordinator",
      "Islandwide Performance Coverage (Travel quoted per venue)"
    ]
  },

  // --- EVENTS ---
  {
    id: "pkg-e-4d-3a",
    category: "events",
    dancerCount: 4,
    dancersLabel: "4 Dancers",
    actsLabel: "3 Dance Acts",
    badge: "Corporate & Stage",
    features: [
      "4 Professional Troupe Dancers",
      "3 High-Impact Event Stage Acts",
      "Custom Corporate & Concert Outfits",
      "High-Energy Group Choreography",
      "Islandwide Performance Coverage (Travel quoted per venue)"
    ]
  },
  {
    id: "pkg-e-4d-4a",
    category: "events",
    dancerCount: 4,
    dancersLabel: "4 Dancers",
    actsLabel: "4 Dance Acts",
    badge: "Full Stage Set",
    highlighted: true,
    features: [
      "4 Professional Troupe Dancers",
      "4 Complete Stage Performances",
      "Multi-Style Costume Wardrobe Changes",
      "Pyrotechnic & Lighting Cue Coordination",
      "Islandwide Performance Coverage (Travel quoted per venue)"
    ]
  },
  {
    id: "pkg-e-5d-3a",
    category: "events",
    dancerCount: 5,
    dancersLabel: "5 Dancers",
    actsLabel: "3 Dance Acts",
    badge: "Grand Show",
    features: [
      "5 Professional Troupe Dancers",
      "3 High-Voltage Stage Dance Acts",
      "Custom Concert / Festival Theme Outfits",
      "Center-Stage Formations & Solo Sequences",
      "Islandwide Performance Coverage (Travel quoted per venue)"
    ]
  },
  {
    id: "pkg-e-5d-4a",
    category: "events",
    dancerCount: 5,
    dancersLabel: "5 Dancers",
    actsLabel: "4 Dance Acts",
    badge: "Mega Event Set",
    highlighted: true,
    features: [
      "5 Professional Troupe Dancers",
      "4 Complete Mega Stage Acts",
      "Multi-Genre Fusion (Kandyan / Urban / Bollywood)",
      "Full Wardrobe & Prop Production",
      "Dedicated Troupe Director & Coordinator",
      "Islandwide Performance Coverage (Travel quoted per venue)"
    ]
  },

  // --- MUSIC VIDEO ---
  {
    id: "pkg-mv-4d-wc",
    category: "music_video",
    dancerCount: 4,
    dancersLabel: "4 Dancers",
    actsLabel: "With Choreography",
    badge: "Full Choreography",
    highlighted: true,
    features: [
      "4 Professional Music Video Dancers",
      "Full Original Video Choreography Creation",
      "Concept & Routine Rehearsal Sessions",
      "Styled Video Shoot Costumes",
      "Islandwide Location & Studio Shoot Coverage"
    ]
  },
  {
    id: "pkg-mv-4d-woc",
    category: "music_video",
    dancerCount: 4,
    dancersLabel: "4 Dancers",
    actsLabel: "Without Choreography",
    badge: "Dancers Only",
    features: [
      "4 Professional Backing Dancers",
      "Execution of Director's Routine / Placement",
      "On-Set Costume Wardrobe Coordination",
      "Full Shoot Day Availability",
      "Islandwide Location & Studio Shoot Coverage"
    ]
  },
  {
    id: "pkg-mv-5d-wc",
    category: "music_video",
    dancerCount: 5,
    dancersLabel: "5 Dancers",
    actsLabel: "With Choreography",
    badge: "Full Choreography",
    highlighted: true,
    features: [
      "5 Professional Music Video Dancers",
      "Bespoke Video Choreography & Hook Step Creation",
      "Group Formation & Solo Framing Sequences",
      "Themed Costume Wardrobe",
      "Islandwide Location & Studio Shoot Coverage"
    ]
  },
  {
    id: "pkg-mv-5d-woc",
    category: "music_video",
    dancerCount: 5,
    dancersLabel: "5 Dancers",
    actsLabel: "Without Choreography",
    badge: "Dancers Only",
    features: [
      "5 Professional Backing Dancers",
      "Execution of Pre-existing Choreography",
      "Camera Blocking & Placement Readiness",
      "Full Shoot Day Coverage",
      "Islandwide Location & Studio Shoot Coverage"
    ]
  },
  {
    id: "pkg-mv-6d-wc",
    category: "music_video",
    dancerCount: 6,
    dancersLabel: "6 Dancers",
    actsLabel: "With Choreography",
    badge: "Grand Video Set",
    highlighted: true,
    features: [
      "6 Professional Music Video Dancers",
      "Master Choreography & Hook Movement Design",
      "Pre-Production Rehearsals & Camera Blocking",
      "Premium Styling & Wardrobe Outfits",
      "Islandwide Location & Studio Shoot Coverage"
    ]
  },
  {
    id: "pkg-mv-6d-woc",
    category: "music_video",
    dancerCount: 6,
    dancersLabel: "6 Dancers",
    actsLabel: "Without Choreography",
    badge: "Dancers Only",
    features: [
      "6 Professional Backing Dancers",
      "High-Impact Group Formations for Camera",
      "Flexible Movement Adaptation to Director Cues",
      "Full Shoot Day Coverage",
      "Islandwide Location & Studio Shoot Coverage"
    ]
  }
];

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<"weddings" | "events" | "music_video">("weddings");
  const [selectedDancerFilter, setSelectedDancerFilter] = useState<number | "all">("all");

  useEffect(() => {
    let ignore = false;
    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (!ignore && data.success) {
          setEvents(data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    loadEvents();
    return () => {
      ignore = true;
    };
  }, []);

  const categoryPackages = choreographyPackages.filter(p => p.category === selectedCategory);

  const filteredPackages = selectedDancerFilter === "all"
    ? categoryPackages
    : categoryPackages.filter(p => p.dancerCount === selectedDancerFilter);

  // Booking Popup Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingCategory, setBookingCategory] = useState<"weddings" | "events" | "music_video" | "custom">("weddings");
  const [bookingDancers, setBookingDancers] = useState("4 Dancers");
  const [bookingActs, setBookingActs] = useState("3 Dance Acts");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["Traditional Kandyan", "Bollywood"]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingLocation, setBookingLocation] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");

  const openBookingModal = (pkg?: ChoreographyPackage) => {
    if (pkg) {
      setBookingCategory(pkg.category);
      setBookingDancers(pkg.dancersLabel);
      setBookingActs(pkg.actsLabel);
    }
    setIsBookingModalOpen(true);
  };

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      if (selectedStyles.length > 1) {
        setSelectedStyles(selectedStyles.filter((s) => s !== style));
      }
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleSendBookingToWhatsApp = () => {
    const categoryTitle =
      bookingCategory === "weddings"
        ? "Wedding Choreography"
        : bookingCategory === "events"
        ? "Corporate & Stage Event"
        : bookingCategory === "music_video"
        ? "Music Video Production"
        : "Custom Grand Performance";

    const stylesText = selectedStyles.length > 0 ? selectedStyles.join(", ") : "All Genres";

    const message = `Hello RIGA Dance Academy! 🌟

I would like to book / inquire about a Choreography Troupe:

📋 *Booking Details:*
• *Event Category:* ${categoryTitle}
• *Troupe Size:* ${bookingDancers}
• *Routine / Program:* ${bookingActs}
• *Selected Styles:* ${stylesText}${bookingDate ? `\n• *Event Date:* ${bookingDate}` : ""}${bookingLocation ? `\n• *Location / Venue:* ${bookingLocation}` : ""}${bookingNotes ? `\n• *Special Requests:* ${bookingNotes}` : ""}

Please share a customized quotation, troupe availability, and booking procedure. Thank you!`;

    const url = `https://wa.me/94763401285?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsBookingModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#07020e] text-white">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 filter blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#07020e]/60 via-[#07020e] to-[#07020e]"></div>
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-900/30 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-start mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 hover:text-white hover:border-purple-400/70 hover:bg-purple-900/80 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 backdrop-blur-md"
              aria-label="Back to Home"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5 text-purple-300" />
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 px-4 py-2 rounded-full mb-6 border border-purple-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-metallic-purple">Official RIGA Choreography Packages</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase"
          >
            Troupe &amp; Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-400 to-purple-500 drop-shadow-[0_0_25px_rgba(192,132,252,0.4)]">Choreography Packages</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-purple-200/80 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Book Sri Lanka&apos;s premier dance ensemble for Weddings, Corporate Events, and Music Video Shoots. Explore our curated troupe packages with customized choreography, authentic stage regalia, and high-energy live performances.
          </motion.p>

          {/* PRIMARY BOOKING CTA BUTTON (TRIGGER POPUP MODAL) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_35px_rgba(192,132,252,0.6)] hover:shadow-[0_0_50px_rgba(232,121,249,0.9)] border border-purple-300/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-fuchsia-300 animate-pulse" />
              <span>Inquire &amp; Book Choreography</span>
              <MessageCircle className="w-5 h-5 text-emerald-400" />
            </button>
          </motion.div>

          {/* --- MAIN TROUPE VISUAL ARTWORK (ZERO BOX OUTLINE - SEAMLESS INTEGRATION) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
            className="w-full relative mt-6 flex justify-center items-center select-none"
          >
            {/* Main Troupe Artwork with Radial Edge Vignette to match #07020e */}
            <div className="relative w-full max-w-5xl overflow-hidden [mask-image:radial-gradient(ellipse_85%_85%_at_50%_50%,black_65%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_85%_85%_at_50%_50%,black_65%,transparent_100%)]">
              <Image 
                src="/riga.jpeg" 
                alt="RIGA Dance Troupe" 
                width={1200}
                height={700}
                className="w-full h-auto object-contain block mx-auto opacity-100 filter contrast-105 brightness-105 drop-shadow-[0_0_50px_rgba(168,85,247,0.6)]"
                unoptimized
              />
              {/* Seamless Edge Gradient Overlays matching section background #07020e */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07020e] via-[#07020e]/70 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#07020e] via-[#07020e]/70 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#07020e] via-[#07020e]/70 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#07020e] via-[#07020e]/90 to-transparent pointer-events-none z-10" />
            </div>
          </motion.div>

          {/* Performance Genres Bar matching Poster Artwork */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 relative z-20"
          >
            {[
              { label: "TRADITIONAL", icon: Sparkles, color: "text-amber-400" },
              { label: "LATIN", icon: Flame, color: "text-rose-400" },
              { label: "FREESTYLE", icon: Zap, color: "text-fuchsia-400" },
              { label: "BOLLYWOOD", icon: Crown, color: "text-yellow-400" },
              { label: "HIP HOP", icon: Radio, color: "text-purple-400" },
            ].map((genre) => {
              const IconComponent = genre.icon;
              return (
                <span
                  key={genre.label}
                  className="px-4 py-2 rounded-xl bg-purple-950/70 border border-purple-500/40 text-purple-200 text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:border-purple-400 hover:text-white transition-all backdrop-blur-md flex items-center gap-2"
                >
                  <IconComponent className={`w-3.5 h-3.5 ${genre.color}`} />
                  <span>{genre.label}</span>
                </span>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* --- CHOREOGRAPHY PACKAGES SECTION --- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header & Main Category Selector */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 text-fuchsia-300 mb-2 font-bold tracking-widest uppercase text-xs">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500/30" />
            Official Troupe Packages
          </div>
          
          {/* Main Category Tabs: WEDDINGS | EVENTS | MUSIC VIDEO */}
          <div className="flex flex-wrap items-center justify-center gap-3 p-2 rounded-2xl bg-[#130728] border border-purple-500/40 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] mb-8">
            <button
              onClick={() => { setSelectedCategory("weddings"); setSelectedDancerFilter("all"); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === "weddings"
                  ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white shadow-[0_0_25px_rgba(192,132,252,0.6)] border border-purple-300/40"
                  : "text-purple-300/80 hover:text-white hover:bg-purple-500/20"
              }`}
            >
              <Heart className="w-4 h-4 text-pink-400" />
              <span>Weddings</span>
            </button>

            <button
              onClick={() => { setSelectedCategory("events"); setSelectedDancerFilter("all"); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === "events"
                  ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white shadow-[0_0_25px_rgba(192,132,252,0.6)] border border-purple-300/40"
                  : "text-purple-300/80 hover:text-white hover:bg-purple-500/20"
              }`}
            >
              <PartyPopper className="w-4 h-4 text-amber-400" />
              <span>Events</span>
            </button>

            <button
              onClick={() => { setSelectedCategory("music_video"); setSelectedDancerFilter("all"); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === "music_video"
                  ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white shadow-[0_0_25px_rgba(192,132,252,0.6)] border border-purple-300/40"
                  : "text-purple-300/80 hover:text-white hover:bg-purple-500/20"
              }`}
            >
              <Video className="w-4 h-4 text-cyan-400" />
              <span>Music Video</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide uppercase mb-6 flex items-center justify-center gap-3">
            {selectedCategory === "weddings" && (
              <>
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500/20 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)] shrink-0" />
                <span>Wedding Troupe Packages</span>
              </>
            )}
            {selectedCategory === "events" && (
              <>
                <PartyPopper className="w-8 h-8 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] shrink-0" />
                <span>Event & Stage Acts Packages</span>
              </>
            )}
            {selectedCategory === "music_video" && (
              <>
                <Video className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] shrink-0" />
                <span>Music Video Choreography Packages</span>
              </>
            )}
          </h2>

          {/* Secondary Dancer Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#130728]/80 border border-purple-500/30 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setSelectedDancerFilter("all")}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                selectedDancerFilter === "all"
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  : "text-purple-300/80 hover:text-white hover:bg-purple-500/20"
              }`}
            >
              All ({categoryPackages.length})
            </button>
            {[4, 5, 6].map((dancers) => {
              const count = categoryPackages.filter(p => p.dancerCount === dancers).length;
              if (count === 0) return null;
              return (
                <button
                  key={dancers}
                  onClick={() => setSelectedDancerFilter(dancers)}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    selectedDancerFilter === dancers
                      ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                      : "text-purple-300/80 hover:text-white hover:bg-purple-500/20"
                  }`}
                >
                  {dancers} Dancers ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.highlighted
                  ? "bg-gradient-to-b from-[#1c0a3a] to-[#100424] border-2 border-fuchsia-500/60 shadow-[0_0_35px_rgba(192,132,252,0.3)] hover:shadow-[0_0_50px_rgba(192,132,252,0.5)]"
                  : "bg-[#120626]/80 border border-purple-500/30 hover:border-purple-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
              } backdrop-blur-xl group`}
            >
              {/* Badge Tag */}
              {pkg.badge && (
                <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 border border-purple-300/40 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(192,132,252,0.6)]">
                  {pkg.badge}
                </div>
              )}

              <div>
                {/* Header Info */}
                <div className="mb-6 border-b border-purple-500/20 pb-6">
                  <div className="flex items-center gap-2 text-fuchsia-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Users className="w-4 h-4 text-fuchsia-400 shrink-0" />
                    <span>{pkg.dancersLabel}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide mb-4">
                    {pkg.actsLabel}
                  </h3>
                  
                  {/* Quote on Request Badge */}
                  <div className="py-2.5 px-3.5 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300/70 block">
                        Booking &amp; Pricing
                      </span>
                      <span className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-purple-200 to-white">
                        Quote on Request
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Direct WhatsApp</span>
                    </div>
                  </div>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-purple-200/90">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button: Opens Modal with pre-selected package */}
              <button
                type="button"
                onClick={() => openBookingModal(pkg)}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  pkg.highlighted
                    ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-[0_0_20px_rgba(192,132,252,0.4)] hover:shadow-[0_0_30px_rgba(192,132,252,0.7)] border border-purple-300/40 hover:scale-[1.02]"
                    : "bg-purple-950/70 hover:bg-purple-900 border border-purple-500/30 hover:border-purple-400 text-purple-200 hover:text-white shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:scale-[1.02]"
                }`}
              >
                <Sparkles className="w-4 h-4 text-fuchsia-300" />
                <span>Select &amp; Inquire Booking</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Custom Inquiry WhatsApp Banner */}
        <div className="mt-12 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#170833] via-[#210947] to-[#170833] border border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-fuchsia-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              Bespoke Routines &amp; Full Troupe Production
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Need a Custom Routine or Large Ensemble?
            </h3>
            <p className="text-sm text-purple-200/80 max-w-xl mt-1">
              Have a unique wedding entrance concept, corporate theme, or music video shoot? Contact our Troupe Director on WhatsApp for tailored choreography planning and a direct quotation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setBookingCategory("custom");
              setBookingDancers("8+ Mega Troupe");
              setBookingActs("Full Concert Lineup");
              setIsBookingModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-xs font-black uppercase tracking-widest shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:scale-105 transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Customize Troupe Booking</span>
          </button>
        </div>
      </section>

      {/* --- UPCOMING WORKSHOPS & SHOWCASES SECTION --- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-purple-500/20 mt-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-purple-300 text-xs font-bold tracking-widest uppercase mb-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            Academy Calendar
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-400">Showcases</span> & Workshops
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-[#120626]/60 border border-purple-500/20 rounded-3xl max-w-2xl mx-auto backdrop-blur-md">
            <Calendar className="w-12 h-12 text-purple-400/60 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Scheduled Public Workshops Right Now</h3>
            <p className="text-sm text-purple-200/70 mb-6">Contact our Troupe team directly for private bookings and masterclasses!</p>
            <a
              href="https://wa.me/94763401285?text=Hi%20RIGA%20Dance%20Academy%2C%20I%20want%20to%20inquire%20about%20upcoming%20workshops%20or%20troupe%20shows!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600/30 border border-purple-400/40 text-purple-200 hover:text-white hover:bg-purple-600 transition-all text-xs font-bold uppercase tracking-widest"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              Inquire General Bookings
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((ev, index) => (
              <motion.div
                key={ev._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#120626]/80 border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl hover:border-purple-400/70 transition-all group flex flex-col backdrop-blur-md"
              >
                <div className="h-48 bg-black relative overflow-hidden">
                  {ev.imageUrl ? (
                    <Image 
                      src={ev.imageUrl} 
                      alt={ev.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-black flex items-center justify-center">
                      <Star className="w-12 h-12 text-purple-400/50" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-purple-600 text-white font-bold text-xs px-3 py-1 rounded-lg shadow-lg border border-purple-400/40">
                    {new Date(ev.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{ev.title}</h3>
                  <p className="text-purple-200/70 mb-6 text-sm line-clamp-3 flex-1">{ev.description}</p>
                  
                  <div className="space-y-2 mt-auto pt-6 border-t border-purple-500/20">
                    <div className="flex items-center text-purple-200/90 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-purple-400" />
                      {ev.time}
                    </div>
                    <div className="flex items-center text-purple-200/90 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                      {ev.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* CHOREOGRAPHY BOOKING POPUP MODAL (POPUP MESSAGE)          */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#190a36] via-[#100424] to-[#0a0217] border border-purple-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.4)] my-8 text-white max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 text-purple-300 hover:text-white transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 border-b border-purple-500/30 pb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-fuchsia-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                  Direct Troupe Booking
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Customize Your Choreography
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
                  Choose your event type, troupe size, and dance preferences. We will connect you instantly with our Troupe Coordinator on WhatsApp with a personalized quote.
                </p>
              </div>

              {/* Form Options */}
              <div className="space-y-6">
                
                {/* 1. Event Category */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-purple-300 mb-2.5">
                    1. Select Event Type *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "weddings", label: "Wedding", icon: Heart },
                      { id: "events", label: "Corporate / Stage", icon: PartyPopper },
                      { id: "music_video", label: "Music Video", icon: Video },
                      { id: "custom", label: "Custom Show", icon: Crown },
                    ].map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = bookingCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setBookingCategory(cat.id as "weddings" | "events" | "music_video" | "custom")}
                          className={`p-3 rounded-2xl border text-xs font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 border-purple-300 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                              : "bg-[#140728]/80 border-purple-900/60 text-purple-300 hover:border-purple-600 hover:text-white"
                          }`}
                        >
                          <Icon className="w-5 h-5 shrink-0" />
                          <span className="text-center">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Troupe Size */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-purple-300 mb-2.5">
                    2. Troupe Size (Dancers) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {["4 Dancers", "5 Dancers", "6 Dancers", "8+ Mega Troupe"].map((dancers) => {
                      const isSelected = bookingDancers === dancers;
                      return (
                        <button
                          key={dancers}
                          type="button"
                          onClick={() => setBookingDancers(dancers)}
                          className={`py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-purple-600 border-fuchsia-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                              : "bg-[#140728]/80 border-purple-900/60 text-purple-300 hover:border-purple-600 hover:text-white"
                          }`}
                        >
                          {dancers}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Program / Acts Count */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-purple-300 mb-2.5">
                    3. Dance Acts / Routines *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      "Welcome Dance Entry",
                      "3 Dance Acts",
                      "4 Grand Stage Acts",
                      "Full Concert Lineup",
                    ].map((acts) => {
                      const isSelected = bookingActs === acts;
                      return (
                        <button
                          key={acts}
                          type="button"
                          onClick={() => setBookingActs(acts)}
                          className={`py-2.5 px-3 rounded-xl border text-[11px] font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-fuchsia-600 border-purple-300 text-white shadow-[0_0_15px_rgba(232,121,249,0.5)]"
                              : "bg-[#140728]/80 border-purple-900/60 text-purple-300 hover:border-purple-600 hover:text-white"
                          }`}
                        >
                          {acts}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Preferred Dance Genres */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-purple-300 mb-2.5">
                    4. Preferred Dance Style(s) (Select multiple)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Traditional Kandyan",
                      "Bollywood",
                      "Hip-Hop / Urban",
                      "Latin / Ballroom",
                      "Freestyle Fusion",
                      "Contemporary",
                    ].map((style) => {
                      const isSelected = selectedStyles.includes(style);
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => toggleStyle(style)}
                          className={`px-3.5 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? "bg-purple-600/90 border-fuchsia-400 text-white shadow-[0_0_12px_rgba(192,132,252,0.4)]"
                              : "bg-[#140728] border-purple-900 text-purple-300/80 hover:border-purple-600 hover:text-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                          <span>{style}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Date & Venue */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-purple-300 mb-2">
                      Event Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-[#140728] border border-purple-900/80 focus:border-purple-500 rounded-xl px-4 py-3 text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-purple-300 mb-2">
                      Location / Venue (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Colombo, Kandy, Galle, etc."
                      value={bookingLocation}
                      onChange={(e) => setBookingLocation(e.target.value)}
                      className="w-full bg-[#140728] border border-purple-900/80 focus:border-purple-500 rounded-xl px-4 py-3 text-white text-xs placeholder:text-purple-400/40 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 6. Special Requests */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-purple-300 mb-2">
                    Special Notes or Song Selection (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us any specific requirements, costume themes, or music..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full bg-[#140728] border border-purple-900/80 focus:border-purple-500 rounded-xl px-4 py-2.5 text-white text-xs placeholder:text-purple-400/40 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer / WhatsApp Send CTA */}
              <div className="mt-8 pt-6 border-t border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-purple-950/60 hover:bg-purple-900 border border-purple-800/60 text-purple-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSendBookingToWhatsApp}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#25D366] via-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:shadow-[0_0_40px_rgba(37,211,102,0.8)] hover:scale-102 active:scale-98 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Send Booking to WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

