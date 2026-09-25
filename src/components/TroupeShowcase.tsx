"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const troupeStyles = [
  {
    id: "kandyan",
    title: "Traditional & Kandyan Fusion",
    badge: "Heritage & Beats",
    description: "Authentic Sri Lankan cultural heritage infused with electronic beats and high-energy percussion.",
    tags: ["Kandyan", "Low Country", "Drum & Beats", "Cultural Fusion"],
    color: "from-purple-600 to-purple-800",
  },
  {
    id: "hiphop",
    title: "Urban & Street Hip-Hop",
    badge: "High-Voltage Power",
    description: "Hard-hitting popping, locking, breaking, and modern commercial urban hip-hop choreographies.",
    tags: ["Hip Hop", "Breakdance", "Popping", "Street Jam"],
    color: "from-purple-700 to-purple-900",
  },
  {
    id: "bollywood",
    title: "Bollywood & Cinematic Spectacles",
    badge: "Grand Stage Acts",
    description: "Extravagant storytelling, high-energy formations, and vibrant cinematic production acts.",
    tags: ["Bollywood", "Tollywood", "Cinematic", "Celebration"],
    color: "from-purple-800 to-purple-600",
  },
  {
    id: "contemporary",
    title: "Classical & Contemporary Fusion",
    badge: "Fluid Elegance",
    description: "Breath-taking acrobatic lifts, emotional storytelling, and expressive lyrical contemporary motion.",
    tags: ["Contemporary", "Ballet Fusion", "Lyrical", "Acrobatic"],
    color: "from-indigo-700 to-purple-800",
  },
  {
    id: "extravaganza",
    title: "Live Concert & Award Shows",
    badge: "Mega Production",
    description: "Full-scale concert backing dancers, pyrotechnic synced acts, and star event performances.",
    tags: ["Concerts", "Award Shows", "TV Broadcast", "Mega Stage"],
    color: "from-purple-900 to-purple-700",
  },
];

const stats = [
  { label: "Live Performances", value: "500+" },
  { label: "Pro Troupe Dancers", value: "50+" },
  { label: "Custom Costumes", value: "100+" },
  { label: "National Awards", value: "15+" },
];

export default function TroupeShowcase() {
  const [selectedStyle, setSelectedStyle] = useState(troupeStyles[0]);

  return (
    <section className="py-24 bg-[#07020e] relative overflow-hidden border-t border-purple-900/30">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            <Trophy className="w-3.5 h-3.5 text-purple-400" />
            <span>Sri Lanka&apos;s Elite Performance Troupe</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4"
          >
            RIGA <span className="text-metallic-purple">Dance Troupe</span> Genres
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-purple-200/70 text-base sm:text-lg font-light leading-relaxed"
          >
            From high-energy traditional fusion to explosive urban hip-hop and grand concert stage productions, RIGA Dance Troupe delivers unforgettable live acts.
          </motion.p>
        </div>

        {/* GENRE SELECTOR TABS & SHOWCASE CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Left Column: Style Buttons */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
            {troupeStyles.map((style, idx) => (
              <motion.button
                key={style.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => setSelectedStyle(style)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between group ${
                  selectedStyle.id === style.id
                    ? "bg-gradient-to-r from-purple-950 via-[#1b0833] to-[#250b44] border-purple-500/70 shadow-[0_0_30px_rgba(168,85,247,0.4)] text-white scale-[1.02]"
                    : "bg-[#100620]/70 border-purple-900/40 text-purple-200/80 hover:bg-[#16082e] hover:border-purple-600/50"
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1">
                    {style.badge}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold tracking-wide">
                    {style.title}
                  </h4>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                  selectedStyle.id === style.id
                    ? "bg-purple-600 text-white shadow-[0_0_15px_#a855f7] rotate-45"
                    : "bg-purple-950 text-purple-400 group-hover:scale-110"
                }`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Column: Display Card */}
          <motion.div
            key={selectedStyle.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 rounded-3xl bg-[#120726] border border-purple-500/40 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)]"
          >
            {/* Background Accent */}
            <div className={`absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br ${selectedStyle.color} opacity-20 blur-[90px] pointer-events-none`} />

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedStyle.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950 border border-purple-800/60 text-purple-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400 block mb-2">Featured Performance Genre</span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                {selectedStyle.title}
              </h3>
              <p className="text-purple-200/80 text-base leading-relaxed font-light mb-8">
                {selectedStyle.description}
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-purple-100 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Custom stage choreography tailored to event themes</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-100 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Includes full high-end costume wardrobe and prop setup</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-100 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Available for Weddings, Corporate Shows, TV &amp; Concerts</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-900/60 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 text-white font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all"
              >
                Inquire For Booking
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/crew"
                className="text-xs uppercase tracking-widest font-bold text-purple-300 hover:text-purple-100 transition-colors"
              >
                Meet Troupe Dancers &rarr;
              </Link>
            </div>
          </motion.div>

        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#120726]/80 border border-purple-900/50 p-6 rounded-2xl text-center shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-purple-500/50 transition-all"
            >
              <h4 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-300 to-purple-400 mb-2">
                {stat.value}
              </h4>
              <p className="text-xs uppercase font-bold tracking-widest text-purple-300/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
