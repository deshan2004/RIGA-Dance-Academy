"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, User, Sparkles, BookOpen, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface ClassItem {
  _id?: string;
  title: string;
  style: string;
  day: string;
  time: string;
  instructor_name: string;
  hall_no: string;
  image?: string;
}

const defaultImages: Record<string, string> = {
  kandyan: "https://images.unsplash.com/photo-1542838686-37ed7a956140?auto=format&fit=crop&q=80",
  "hip-hop": "https://images.unsplash.com/photo-1535525153412-5a42439a6e0c?auto=format&fit=crop&q=80",
  classical: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
  contemporary: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&q=80",
  sabaragamuwa: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?auto=format&fit=crop&q=80",
  default: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80",
};

const filterCategories = [
  "ALL PROGRAMS",
  "KANDYAN & TRADITIONAL",
  "HIP HOP & STREET",
  "CONTEMPORARY & LYRICAL",
  "LATIN & SALSA",
  "BOLLYWOOD",
];

export default function FeaturedClassesPreview() {
  const [dbClasses, setDbClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("ALL PROGRAMS");

  useEffect(() => {
    async function loadClasses() {
      try {
        const res = await fetch("/api/classes");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setDbClasses(json.data);
        }
      } catch (err) {
        console.error("Error fetching featured classes:", err);
      } finally {
        setLoading(false);
      }
    }
    loadClasses();
  }, []);

  const getStyleImage = (style: string, customImg?: string) => {
    if (customImg && customImg.trim().length > 0) return customImg;
    const lower = (style || "").toLowerCase();
    for (const key of Object.keys(defaultImages)) {
      if (lower.includes(key)) return defaultImages[key];
    }
    return defaultImages.default;
  };

  const filteredClasses = selectedFilter === "ALL PROGRAMS"
    ? dbClasses
    : dbClasses.filter(c => {
        const s = (c.style || "").toLowerCase();
        const f = selectedFilter.toLowerCase();
        if (f.includes("kandyan") && (s.includes("kandyan") || s.includes("traditional"))) return true;
        if (f.includes("hip hop") && (s.includes("hip") || s.includes("street") || s.includes("urban"))) return true;
        if (f.includes("contemporary") && (s.includes("contemporary") || s.includes("lyrical"))) return true;
        if (f.includes("latin") && (s.includes("latin") || s.includes("salsa"))) return true;
        if (f.includes("bollywood") && (s.includes("bollywood") || s.includes("cinema"))) return true;
        return s.includes(f);
      });

  return (
    <section className="py-24 bg-[#07020e] relative overflow-hidden">
      {/* Ambient Smoke & Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-extrabold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(168,85,247,0.3)] backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              <span>Academy Dance Programs</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-3"
            >
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-400 to-purple-500 drop-shadow-[0_0_25px_rgba(192,132,252,0.4)]">Classes</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-purple-200/70 max-w-xl text-base sm:text-lg font-light leading-relaxed"
            >
              Discover our active dance programs trained by professional Sri Lankan choreographers.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="shrink-0"
          >
            <Link 
              href="/classes"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 hover:text-white hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] font-bold tracking-widest text-xs uppercase transition-all backdrop-blur-md"
            >
              View Full Schedule
              <ArrowRight className="w-4 h-4 text-fuchsia-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Quick Style Filter Pills Bar (Fills up empty space with sleek modern control) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2.5 mb-12 pb-2 overflow-x-auto no-scrollbar"
        >
          {filterCategories.map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 border ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white shadow-[0_0_20px_rgba(192,132,252,0.6)] border-purple-300/50 scale-[1.02]"
                    : "bg-[#120626]/80 text-purple-300/80 border-purple-900/40 hover:text-white hover:bg-purple-900/40 hover:border-purple-500/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Class Cards Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(filteredClasses.length > 0 ? filteredClasses : dbClasses).map((cls, index) => {
              const classPhoto = getStyleImage(cls.style, cls.image);
              return (
                <Link key={cls._id || index} href="/enroll" className="block h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative rounded-3xl overflow-hidden cursor-pointer border border-purple-500/35 hover:border-purple-400 hover:shadow-[0_0_45px_rgba(168,85,247,0.5)] transition-all duration-500 h-full flex flex-col justify-end min-h-[420px] bg-[#120726] transform hover:-translate-y-1.5"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image 
                        src={classPhoto} 
                        alt={cls.title} 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07020e] via-[#07020e]/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-purple-950/20 mix-blend-overlay group-hover:opacity-40 transition-opacity" />

                    {/* Content */}
                    <div className="relative p-8 z-10 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3.5 py-1.5 bg-purple-950/90 backdrop-blur-md rounded-full text-[11px] font-black text-purple-200 tracking-wider uppercase border border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.35)]">
                          {cls.style}
                        </span>
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[11px] font-extrabold text-purple-200 uppercase border border-purple-800/50">
                          {cls.hall_no}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-black text-white mb-4 group-hover:text-purple-300 transition-colors tracking-tight uppercase">
                        {cls.title}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs text-purple-200/90 pt-4 border-t border-purple-900/60 font-semibold">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                          <span className="truncate">{cls.day} ({cls.time})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-purple-400 shrink-0" />
                          <span className="truncate">{cls.instructor_name}</span>
                        </div>
                      </div>

                      <div className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-fuchsia-400 group-hover:text-white transition-colors">
                        <span>Enroll In Class</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}


