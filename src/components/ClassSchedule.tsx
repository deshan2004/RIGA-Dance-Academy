"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, MapPin, User, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface IClass {
  _id?: string;
  title: string;
  style: string;
  day: string;
  time: string;
  instructor_name: string;
  hall_no: string;
  image?: string;
}

const defaultStyleImages: Record<string, string> = {
  kandyan: "https://images.unsplash.com/photo-1542838686-37ed7a956140?auto=format&fit=crop&q=80",
  "hip-hop": "https://images.unsplash.com/photo-1535525153412-5a42439a6e0c?auto=format&fit=crop&q=80",
  classical: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
  contemporary: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&q=80",
  sabaragamuwa: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?auto=format&fit=crop&q=80",
  default: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80",
};

const ClassSchedule = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/classes");
        const json = await res.json();
        if (json.success) {
          setClasses(json.data);
        }
      } catch (error) {
        console.error("Error fetching classes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const getClassPhoto = (style: string, customImg?: string) => {
    if (customImg && customImg.trim().length > 0) return customImg;
    const lower = (style || "").toLowerCase();
    for (const key of Object.keys(defaultStyleImages)) {
      if (lower.includes(key)) return defaultStyleImages[key];
    }
    return defaultStyleImages.default;
  };

  return (
    <section id="classes" className="py-24 bg-[#090410] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-wider"
          >
            Class <span className="text-metallic-purple">Schedule</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "120px" }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 mx-auto rounded-full shadow-[0_0_15px_rgba(232,121,249,0.8)]"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-400"></div>
          </div>
        ) : classes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-purple-950/80 border border-purple-800 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Calendar className="w-10 h-10 text-fuchsia-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Classes Scheduled</h3>
            <p className="text-purple-200/60 max-w-md">Please check back later or contact the academy for the latest schedule.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {classes.map((cls, index) => {
              const photo = getClassPhoto(cls.style, cls.image);
              return (
                <motion.div
                  key={cls._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#140924]/80 border border-purple-900/40 rounded-3xl overflow-hidden hover:border-purple-500/70 hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] transition-all duration-300 group flex flex-col justify-between"
                >
                  {/* Photo Header */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image 
                      src={photo} 
                      alt={cls.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140924] via-[#140924]/40 to-transparent" />
                    
                    {/* Style Badge */}
                    <div className="absolute top-4 right-4 bg-purple-950/90 backdrop-blur-md text-fuchsia-300 border border-purple-500/50 text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_12px_rgba(232,121,249,0.3)] uppercase tracking-wider">
                      {cls.style}
                    </div>

                    <div className="absolute bottom-4 left-6 right-6">
                      <h3 className="text-2xl font-black text-white group-hover:text-fuchsia-300 transition-colors uppercase tracking-wide drop-shadow-md">
                        {cls.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Card Details */}
                  <div className="p-6 pt-2">
                    <div className="grid grid-cols-2 gap-4 text-purple-200/80 mb-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-fuchsia-400 shrink-0" />
                        <span className="truncate">{cls.day}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-fuchsia-400 shrink-0" />
                        <span className="truncate">{cls.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="truncate">{cls.instructor_name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="truncate">{cls.hall_no}</span>
                      </div>
                    </div>

                    <Link 
                      href="/enroll"
                      className="w-full py-3 px-6 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 hover:text-white hover:bg-purple-600 hover:border-purple-400 transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    >
                      <Sparkles className="w-4 h-4 text-fuchsia-400" />
                      Enroll in Class
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassSchedule;
