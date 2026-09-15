"use client";

import { motion } from "framer-motion";
import { Star, Trophy, Users, Heart } from "lucide-react";

const features = [
  {
    icon: <Star className="w-8 h-8 text-fuchsia-400" />,
    title: "Expert Instructors",
    description: "Learn from internationally recognized professional dancers with years of industry experience.",
  },
  {
    icon: <Users className="w-8 h-8 text-purple-400" />,
    title: "Small Class Sizes",
    description: "Get personalized attention with limited student numbers to ensure your rapid progression.",
  },
  {
    icon: <Trophy className="w-8 h-8 text-fuchsia-400" />,
    title: "Premium Facilities",
    description: "Train in our state-of-the-art studios equipped with sprung floors and professional sound systems.",
  },
  {
    icon: <Heart className="w-8 h-8 text-purple-400" />,
    title: "Inclusive Community",
    description: "Join a supportive family of passionate dancers who will encourage you every step of the way.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[#090410] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-900/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        


        {/* WHY CHOOSE US */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          >
            Why Choose <span className="text-metallic-purple">RIGA Academy</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-purple-200/70 max-w-2xl mx-auto text-lg font-light"
          >
            We provide an unparalleled dancing experience designed to take your skills to the next level.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#140924] border border-purple-900/50 p-8 rounded-2xl hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full pointer-events-none" />
              <div className="bg-purple-950/60 border border-purple-800/40 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-purple-200/70 leading-relaxed font-light text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


