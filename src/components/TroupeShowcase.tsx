"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Trophy, ArrowRight, CheckCircle2, Flame, Sparkles } from "lucide-react";
import Link from "next/link";

const troupeStyles = [
  {
    id: "traditional",
    title: "Traditional & Kandyan Fusion",
    badge: "Heritage & Beats",
    description: "Authentic Sri Lankan cultural heritage infused with electronic beats and high-energy percussion.",
    tags: ["Kandyan", "Low Country", "Drum & Beats", "Cultural Fusion"],
    color: "from-purple-600 via-fuchsia-600 to-purple-800",
  },
  {
    id: "latin",
    title: "Latin & Commercial Fusion",
    badge: "Salsa & Passion",
    description: "Sizzling Latin rhythms, Salsa, Bachata, and explosive high-tempo Latin commercial fusion stage acts.",
    tags: ["Latin", "Salsa", "Bachata", "Rumba", "Commercial Fusion"],
    color: "from-fuchsia-600 via-pink-600 to-purple-900",
  },
  {
    id: "freestyle",
    title: "Freestyle & Open Expression",
    badge: "Dynamic Energy",
    description: "Unbound creative choreography mixing popping, tutting, waacking, and high-impact freestyle stage battles.",
    tags: ["Freestyle", "Popping", "Open Style", "Expressive"],
    color: "from-violet-600 via-purple-600 to-indigo-900",
  },
  {
    id: "bollywood",
    title: "Bollywood & Cinematic Spectacles",
    badge: "Grand Stage Acts",
    description: "Extravagant storytelling, high-energy formations, and vibrant cinematic production acts.",
    tags: ["Bollywood", "Tollywood", "Cinematic", "Celebration"],
    color: "from-amber-600 via-purple-600 to-purple-800",
  },
  {
    id: "hiphop",
    title: "Urban & Street Hip-Hop",
    badge: "High-Voltage Power",
    description: "Hard-hitting popping, locking, breaking, and modern commercial urban hip-hop choreographies.",
    tags: ["Hip Hop", "Breakdance", "Popping", "Street Jam"],
    color: "from-purple-700 via-violet-700 to-purple-950",
  },
];

export default function TroupeShowcase() {
  const [selectedStyle, setSelectedStyle] = useState(troupeStyles[0]);
  const [statsData, setStatsData] = useState([
    { label: "LIVE PERFORMANCES", value: "0" },
    { label: "PRO TROUPE DANCERS", value: "0" },
    { label: "CUSTOM COSTUMES", value: "0" },
    { label: "NATIONAL AWARDS", value: "0" },
  ]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (json.success && json.data) {
          setStatsData([
            { label: "LIVE PERFORMANCES", value: String(json.data.livePerformances ?? "0") },
            { label: "PRO TROUPE DANCERS", value: String(json.data.proTroupeDancers ?? "0") },
            { label: "CUSTOM COSTUMES", value: String(json.data.customCostumes ?? "0") },
            { label: "NATIONAL AWARDS", value: String(json.data.nationalAwards ?? "0") },
          ]);
        }
      } catch (err) {
        console.error("Error fetching troupe stats:", err);
      }
    }
    fetchStats();
  }, []);

  return (
    <section className="py-24 bg-[#07020e] relative overflow-hidden border-t border-purple-900/30">
      {/* Background Lighting & Ambient Smoke */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-900/20 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-fuchsia-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(168,85,247,0.35)] backdrop-blur-md"
          >
            <Trophy className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Sri Lanka&apos;s Elite Performance Troupe</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4"
          >
            RIGA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-400 to-purple-500 drop-shadow-[0_0_25px_rgba(192,132,252,0.4)]">Dance Troupe</span> Genres
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
            {troupeStyles.map((style, idx) => {
              const isSelected = selectedStyle.id === style.id;
              return (
                <motion.button
                  key={style.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => setSelectedStyle(style)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between group cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-950 via-[#1e0a38] to-[#2b0d4d] border-purple-400/80 shadow-[0_0_35px_rgba(168,85,247,0.5)] text-white scale-[1.02]"
                      : "bg-[#0e051b]/80 border-purple-900/40 text-purple-200/80 hover:bg-[#16082e] hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                  }`}
                >
                  {/* Subtle active indicator glow line */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-400 via-fuchsia-400 to-purple-600 shadow-[0_0_12px_#a855f7]" />
                  )}

                  <div className="pl-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-purple-400 block mb-1">
                      {style.badge}
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold tracking-wide">
                      {style.title}
                    </h4>
                  </div>

                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(192,132,252,0.8)] rotate-45"
                      : "bg-purple-950/80 border border-purple-800/60 text-purple-400 group-hover:scale-110 group-hover:border-purple-400/50"
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Display Card */}
          <motion.div
            key={selectedStyle.id}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-[#14082b] via-[#100624] to-[#0d041c] border border-purple-500/40 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.35)] backdrop-blur-xl"
          >
            {/* Background Light Beam Accent */}
            <div className={`absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br ${selectedStyle.color} opacity-25 blur-[100px] pointer-events-none`} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_60%)] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedStyle.tags.map((tag) => (
                  <span key={tag} className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-950/90 border border-purple-700/60 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-[0.25em] text-purple-400">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                Featured Performance Genre
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tight uppercase">
                {selectedStyle.title}
              </h3>

              <p className="text-purple-200/80 text-base leading-relaxed font-light mb-8">
                {selectedStyle.description}
              </p>

              <div className="space-y-3.5 mb-8">
                <div className="flex items-center gap-3 text-sm text-purple-100 font-semibold bg-purple-950/40 border border-purple-900/40 p-3 rounded-xl backdrop-blur-md">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Custom stage choreography tailored to event themes</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-100 font-semibold bg-purple-950/40 border border-purple-900/40 p-3 rounded-xl backdrop-blur-md">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Includes full high-end costume wardrobe and prop setup</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-100 font-semibold bg-purple-950/40 border border-purple-900/40 p-3 rounded-xl backdrop-blur-md">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Available for Weddings, Corporate Shows, TV &amp; Concerts</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-purple-900/60 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-800 text-white font-extrabold text-xs uppercase tracking-widest hover:shadow-[0_0_35px_rgba(168,85,247,0.85)] hover:scale-[1.02] transition-all border border-purple-300/40"
              >
                Inquire For Booking
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/crew"
                className="text-xs uppercase tracking-widest font-extrabold text-purple-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                Meet Troupe Dancers &rarr;
              </Link>
            </div>
          </motion.div>

        </div>

        {/* DYNAMIC STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-b from-[#130728]/90 to-[#0c0419]/90 border border-purple-500/35 p-6 rounded-2xl text-center shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:border-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all duration-300 backdrop-blur-md group"
            >
              <div className="w-8 h-8 rounded-full bg-purple-950 border border-purple-500/40 mx-auto mb-3 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4" />
              </div>
              <h4 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400 mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(192,132,252,0.4)]">
                {stat.value}
              </h4>
              <p className="text-[11px] uppercase font-extrabold tracking-widest text-purple-300/80">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

