"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Star, ArrowLeft, Heart, Sparkles, CheckCircle2, MessageCircle, Bus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

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

interface WeddingPackage {
  id: string;
  dancerCount: number;
  dancersLabel: string;
  actsLabel: string;
  priceLkr: number;
  priceFormatted: string;
  transport: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
}

const weddingPackages: WeddingPackage[] = [
  {
    id: "pkg-4d-3a",
    dancerCount: 4,
    dancersLabel: "4 Dancers",
    actsLabel: "3 Dance Acts",
    priceLkr: 70000,
    priceFormatted: "70,000 LKR",
    transport: "Without Transport",
    badge: "Popular Starter",
    features: [
      "4 Professional Troupe Dancers",
      "3 High-Energy Stage Dance Acts",
      "Authentic / Modern Custom Costumes",
      "Customized Music & Song Selection",
      "Without Transport (Transport charged separately for outstation)"
    ]
  },
  {
    id: "pkg-4d-w3a",
    dancerCount: 4,
    dancersLabel: "4 Dancers",
    actsLabel: "Welcome Dance + 3 Dance Acts",
    priceLkr: 80000,
    priceFormatted: "80,000 LKR",
    transport: "Without Transport",
    badge: "Welcome Special",
    highlighted: true,
    features: [
      "4 Professional Troupe Dancers",
      "Traditional / Modern Welcome Entry Dance",
      "3 High-Energy Stage Dance Acts",
      "Bespoke Wedding Regalia & Accessories",
      "Customized Music & Entrance Choreography",
      "Without Transport (Transport charged separately)"
    ]
  },
  {
    id: "pkg-4d-4a",
    dancerCount: 4,
    dancersLabel: "4 Dancers",
    actsLabel: "4 Dance Acts",
    priceLkr: 90000,
    priceFormatted: "90,000 LKR",
    transport: "Without Transport",
    badge: "Full 4-Act Set",
    features: [
      "4 Professional Troupe Dancers",
      "4 Complete Grand Stage Acts",
      "Multi-Style Costume Changes",
      "Customized Theme Choreography",
      "Without Transport (Transport charged separately)"
    ]
  },
  {
    id: "pkg-5d-3a",
    dancerCount: 5,
    dancersLabel: "5 Dancers",
    actsLabel: "3 Dance Acts",
    priceLkr: 85000,
    priceFormatted: "85,000 LKR",
    transport: "Without Transport",
    badge: "Ensemble Choice",
    features: [
      "5 Professional Troupe Dancers",
      "3 High-Energy Stage Dance Acts",
      "Premium Stage Costumes & Props",
      "Center-Stage Solo & Formation Acts",
      "Without Transport (Transport charged separately)"
    ]
  },
  {
    id: "pkg-5d-4a",
    dancerCount: 5,
    dancersLabel: "5 Dancers",
    actsLabel: "4 Dance Acts",
    priceLkr: 95000,
    priceFormatted: "95,000 LKR",
    transport: "Without Transport",
    badge: "Deluxe 5-Dancer Set",
    highlighted: true,
    features: [
      "5 Professional Troupe Dancers",
      "4 Complete Grand Stage Acts",
      "Multi-Genre Fusion Performance",
      "Full Accessory & Prop Package",
      "Without Transport (Transport charged separately)"
    ]
  },
  {
    id: "pkg-6d-3a",
    dancerCount: 6,
    dancersLabel: "6 Dancers",
    actsLabel: "3 Dance Acts",
    priceLkr: 90000,
    priceFormatted: "90,000 LKR",
    transport: "Without Transport",
    badge: "Grand Ensemble",
    features: [
      "6 Professional Troupe Dancers",
      "3 High-Impact Stage Dance Acts",
      "Grand Formation & Visual Impact",
      "Matching Uniform Troupe Outfits",
      "Without Transport (Transport charged separately)"
    ]
  },
  {
    id: "pkg-6d-4a",
    dancerCount: 6,
    dancersLabel: "6 Dancers",
    actsLabel: "4 Dance Acts",
    priceLkr: 100000,
    priceFormatted: "100,000 LKR",
    transport: "Without Transport",
    badge: "Ultimate Mega Set",
    highlighted: true,
    features: [
      "6 Professional Troupe Dancers",
      "4 Grand Full Stage Performances",
      "Complete Multi-Style Wardrobe Changes",
      "Max Impact Stage Sync & Lighting Cue Sync",
      "Dedicated Stage Manager & Coordinator",
      "Without Transport (Transport charged separately)"
    ]
  }
];

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
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

  const filteredPackages = selectedDancerFilter === "all"
    ? weddingPackages
    : weddingPackages.filter(p => p.dancerCount === selectedDancerFilter);

  const getWhatsAppLink = (pkg: WeddingPackage) => {
    const message = `Hi RIGA Dance Academy! I would like to inquire about booking the Wedding Package: ${pkg.dancersLabel} - ${pkg.actsLabel} (${pkg.priceFormatted}). Please share availability and details!`;
    return `https://wa.me/94777123456?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="min-h-screen bg-[#07020e] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 filter blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#07020e]/60 via-[#07020e] to-[#07020e]"></div>
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-900/30 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 hover:text-white hover:border-purple-400/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all text-xs font-bold uppercase tracking-widest backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
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
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-metallic-purple">Troupe Bookings & Events</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase"
          >
            Wedding & Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-400 to-purple-500 drop-shadow-[0_0_25px_rgba(192,132,252,0.4)]">Dance Packages</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-purple-200/80 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Make your special day unforgettable with Sri Lanka’s premier performance troupe. Explore our official Wedding Troupe Packages with customized choreography, authentic stage regalia, and high-energy live acts.
          </motion.p>
        </div>
      </section>

      {/* --- WEDDING PACKAGES SECTION --- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 text-fuchsia-300 mb-2 font-bold tracking-widest uppercase text-xs">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500/30" />
            Official Pricing & Troupe Sets
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide uppercase mb-6">
            Wedding Troupe Packages
          </h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#130728]/80 border border-purple-500/30 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setSelectedDancerFilter("all")}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                selectedDancerFilter === "all"
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  : "text-purple-300/80 hover:text-white hover:bg-purple-500/20"
              }`}
            >
              All Packages ({weddingPackages.length})
            </button>
            {[4, 5, 6].map((dancers) => (
              <button
                key={dancers}
                onClick={() => setSelectedDancerFilter(dancers)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  selectedDancerFilter === dancers
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    : "text-purple-300/80 hover:text-white hover:bg-purple-500/20"
                }`}
              >
                {dancers} Dancers
              </button>
            ))}
          </div>
        </div>

        {/* Wedding Packages Grid */}
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
                    <span>💃 {pkg.dancersLabel}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide mb-3">
                    {pkg.actsLabel}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-fuchsia-300 drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]">
                      Rs. {pkg.priceLkr.toLocaleString()}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                    <Bus className="w-3.5 h-3.5" />
                    <span>{pkg.transport}</span>
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

              {/* Action Button */}
              <a
                href={getWhatsAppLink(pkg)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-widest transition-all duration-300 ${
                  pkg.highlighted
                    ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-[0_0_25px_rgba(192,132,252,0.5)] hover:shadow-[0_0_40px_rgba(192,132,252,0.8)] border border-purple-300/40"
                    : "bg-purple-950/80 hover:bg-purple-600 border border-purple-500/40 hover:border-purple-400 text-purple-100 hover:text-white shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Book Package via WhatsApp</span>
              </a>
            </motion.div>
          ))}
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
              href="https://wa.me/94777123456?text=Hi%20RIGA%20Dance%20Academy%2C%20I%20want%20to%20inquire%20about%20upcoming%20workshops%20or%20troupe%20shows!"
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
    </main>
  );
}

