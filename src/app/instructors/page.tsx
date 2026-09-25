"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Video, Music } from "lucide-react";
import Image from "next/image";

const instructors = [
  {
    id: 1,
    name: "Alex Vance",
    specialty: "Hip-Hop",
    bio: "With over 10 years of experience in street dance and choreography, Alex brings unparalleled energy to every class.",
    image: "https://images.unsplash.com/photo-1535579710123-3c0f261c474e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Senaka Perera",
    specialty: "Kandyan",
    bio: "A master of traditional Sri Lankan dance, Senaka preserves the ancient techniques while making them accessible to modern students.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Elena Rostova",
    specialty: "Contemporary",
    bio: "Elena's fluid movements and emotional storytelling through dance have won her numerous international awards.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Priya Sharma",
    specialty: "Classical",
    bio: "Trained in Bharatanatyam and Kathak, Priya instills discipline, grace, and rhythm in all her students.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

export default function InstructorsPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-academy-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-academy-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-academy-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Meet Our <span className="text-academy-gold">Instructors</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.2 }}
            className="h-1 w-24 bg-academy-red mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Learn from the best. Our world-class instructors are here to guide you every step of the way.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-academy-gray border border-gray-800 rounded-3xl overflow-hidden group hover:border-academy-gold/50 transition-colors"
            >
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-academy-black via-transparent to-transparent z-10" />
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  unoptimized
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-academy-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                    {instructor.specialty}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-academy-gold transition-colors">{instructor.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {instructor.bio}
                </p>
                <div className="flex items-center gap-4 text-gray-500">
                  <button className="hover:text-academy-gold transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                  <button className="hover:text-academy-gold transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="hover:text-academy-gold transition-colors">
                    <Music className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
