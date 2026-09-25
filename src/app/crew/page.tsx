"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Users2, Trophy, Flame, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const crewMembers = [
  {
    name: "Sri Lankan Fusion Troupe",
    role: "Kandyan & Modern Fusion",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80",
    tag: "Championship Winner"
  },
  {
    name: "RIGA Mega Crew",
    role: "Hip-Hop & Urban Street",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80",
    tag: "International Showcase"
  },
  {
    name: "Lyrical & Contemporary Team",
    role: "Stage & Theatre Drama",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80",
    tag: "Award Winning"
  }
];

const achievements = [
  { icon: <Trophy className="w-6 h-6 text-fuchsia-400" />, title: "1st Place National Dance Cup", desc: "Recognized as Sri Lanka's premier pro performance ensemble." },
  { icon: <Flame className="w-6 h-6 text-purple-400" />, title: "50+ Live Stage Shows", desc: "Toured major concerts, award ceremonies & music festivals." },
  { icon: <Video className="w-6 h-6 text-fuchsia-400" />, title: "Featured in Music Videos", desc: "Professional choreography for top South Asian recording artists." },
];

export default function CrewPage() {
  return (
    <div className="min-h-screen bg-[#090410] text-white">
      {/* Back Button */}
      <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:border-purple-500/60 transition-all text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/50 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
        >
          <Users2 className="w-4 h-4 text-fuchsia-400" />
          RIGA Pro Performance Troupe
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-black uppercase text-white tracking-wide mb-6"
        >
          The Pro <span className="text-metallic-purple">Dance Crew</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-purple-200/70 max-w-3xl mx-auto text-base sm:text-lg font-light leading-relaxed mb-12"
        >
          Sri Lanka&apos;s elite dance ensemble blending Kandyan traditional mastery with modern Hip-Hop, Latin, and Contemporary stage showmanship. Available for concerts, brand launches, and international tours.
        </motion.p>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {achievements.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#140924] border border-purple-900/40 text-left">
              <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-800/40 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
              <p className="text-xs text-purple-300/70 font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Troupe Showcase */}
        <div className="text-left mb-8">
          <h2 className="text-2xl font-black uppercase text-white tracking-wider">Performance Troupes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {crewMembers.map((team, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden bg-[#140924] border border-purple-900/40 group hover:border-purple-500/60 transition-all shadow-[0_0_20px_rgba(9,4,16,0.8)]"
            >
              <div className="relative h-64 overflow-hidden">
                <Image src={team.image} alt={team.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-700/60 text-fuchsia-300 text-[10px] font-black uppercase">
                  {team.tag}
                </div>
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-white mb-1">{team.name}</h3>
                <p className="text-xs text-purple-300/70 uppercase tracking-widest font-semibold">{team.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-900/40 via-fuchsia-900/30 to-purple-900/40 border border-purple-800/50 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h3 className="text-2xl font-black text-white mb-2">Book RIGA Pro Crew For Your Next Event</h3>
            <p className="text-xs sm:text-sm text-purple-200/70 font-light">Custom stage choreography, backup dancers, award show openers & TV commercials.</p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(168,85,247,0.5)] whitespace-nowrap"
          >
            Hire RIGA Crew
          </Link>
        </div>
      </section>
    </div>
  );
}
