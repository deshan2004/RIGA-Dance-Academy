"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#090410]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-950 via-[#1e0938] to-purple-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.25)] border border-purple-500/40"
        >
          {/* Decorative Elements inside banner */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=70')] bg-cover mix-blend-overlay opacity-15"></div>
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-fuchsia-600/30 rounded-full mix-blend-screen filter blur-[90px]"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[90px]"></div>

          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center p-3.5 bg-purple-900/60 backdrop-blur-md rounded-2xl mb-8 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <Sparkles className="w-8 h-8 text-fuchsia-400" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Ready to take the floor?
            </h2>
            <p className="text-purple-200/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Join RIGA Dance Academy today and discover your true potential. Transform your passion into breathtaking performances.
            </p>
            
            <Link
              href="/enroll"
              className="inline-block bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-extrabold text-base uppercase tracking-wider py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:shadow-[0_0_50px_rgba(232,121,249,0.8)] border border-fuchsia-400/40"
            >
              Start Your Journey Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

