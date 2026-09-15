"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Users, User, MapPin } from "lucide-react";

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

export default function FeaturedClassesPreview() {
  const [dbClasses, setDbClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="py-24 bg-[#090410] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold text-white mb-4"
            >
              Featured <span className="text-metallic-purple">Classes</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-purple-200/70 max-w-xl text-lg font-light"
            >
              Discover our active dance programs with professional instructors.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/classes"
              className="group flex items-center gap-2 text-purple-300 hover:text-fuchsia-300 font-semibold tracking-wider text-sm uppercase transition-colors"
            >
              View Full Schedule
              <ArrowRight className="w-4 h-4 text-fuchsia-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbClasses.map((cls, index) => {
              const classPhoto = getStyleImage(cls.style, cls.image);
              return (
                <Link key={cls._id || index} href="/enroll" className="block h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative rounded-3xl overflow-hidden cursor-pointer border border-purple-900/40 hover:border-purple-500/80 hover:shadow-[0_0_40px_rgba(168,85,247,0.45)] transition-all duration-500 h-full flex flex-col justify-end min-h-[420px]"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={classPhoto} 
                        alt={cls.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090410] via-[#090410]/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-purple-950/20 mix-blend-overlay group-hover:opacity-40 transition-opacity" />

                    {/* Content */}
                    <div className="relative p-8 z-10 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-purple-950/90 backdrop-blur-md rounded-full text-xs font-bold text-fuchsia-300 tracking-widest uppercase border border-purple-500/50 shadow-[0_0_12px_rgba(232,121,249,0.3)]">
                          {cls.style}
                        </span>
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[11px] font-semibold text-purple-200 uppercase border border-purple-800/40">
                          {cls.hall_no}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-black text-white mb-4 group-hover:text-fuchsia-300 transition-colors tracking-wide">
                        {cls.title}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs text-purple-200/90 pt-3 border-t border-purple-900/60">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-fuchsia-400 shrink-0" />
                          <span className="truncate">{cls.day} ({cls.time})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-purple-400 shrink-0" />
                          <span className="truncate">{cls.instructor_name}</span>
                        </div>
                      </div>

                      <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-fuchsia-400 group-hover:text-white transition-colors">
                        Enroll in Class &rarr;
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

