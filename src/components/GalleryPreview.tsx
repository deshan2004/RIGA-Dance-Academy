"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Camera, ZoomIn, X } from "lucide-react";

interface GalleryPhoto {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

const defaultPhotos: GalleryPhoto[] = [
  {
    id: "g1",
    title: "Kids Kandyan Dance Practice",
    category: "Kids Dancing",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80",
    description: "Our young students practicing traditional Kandyan dance rhythms."
  },
  {
    id: "g2",
    title: "Urban Hip-Hop Choreography",
    category: "Class Practice",
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a6e0c?auto=format&fit=crop&q=80",
    description: "High energy street grooves & group routine training in studio."
  },
  {
    id: "g3",
    title: "Stage Performance Highlight",
    category: "Events & Highlights",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
    description: "Live show at Nelum Pokuna Theater."
  },
  {
    id: "g4",
    title: "Contemporary Flow Masterclass",
    category: "Special Performances",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&q=80",
    description: "Lyrical movement & stage expression workshop."
  },
];

export default function GalleryPreview() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPhotos(json.data);
        } else {
          setPhotos(defaultPhotos);
        }
      } catch (err) {
        console.error("Error loading gallery preview:", err);
        setPhotos(defaultPhotos);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  return (
    <section className="py-24 bg-[#07020e] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-fuchsia-300 text-xs font-extrabold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(232,121,249,0.3)]"
            >
              <Camera className="w-4 h-4 text-fuchsia-400" />
              Life At RIGA
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold text-white"
            >
              Academy <span className="text-metallic-purple">Photo Gallery</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-purple-200/70 max-w-xl text-lg font-light mt-2"
            >
              Real moments from our class practices, kids dancing, and live performances.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/gallery"
              className="group flex items-center gap-2 text-purple-300 hover:text-fuchsia-300 font-semibold tracking-wider text-sm uppercase transition-colors"
            >
              Explore Full Gallery
              <ArrowRight className="w-4 h-4 text-fuchsia-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Photos Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.slice(0, 8).map((item, idx) => (
              <motion.div
                key={item._id || item.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => setSelectedPhoto(item)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer border border-purple-900/40 hover:border-purple-500/80 hover:shadow-[0_0_35px_rgba(168,85,247,0.45)] transition-all duration-500 bg-[#140924] h-[280px] flex flex-col justify-end"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#090410] via-[#090410]/50 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 bg-purple-950/90 backdrop-blur-md rounded-full text-[10px] font-bold text-fuchsia-300 tracking-wider uppercase border border-purple-500/50 shadow-[0_0_10px_rgba(232,121,249,0.3)]">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-purple-950/90 border border-purple-500/60 flex items-center justify-center text-fuchsia-300 shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="relative z-10 p-5 transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-fuchsia-300 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-purple-200/70 font-light line-clamp-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[#140924] border border-purple-500/50 rounded-3xl max-w-4xl w-full overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.5)] flex flex-col"
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-black/70 hover:bg-red-900/80 text-white rounded-full transition-colors border border-purple-500/40"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="w-full h-full max-h-[70vh] object-contain"
                  />
                </div>

                <div className="p-6 bg-[#090410] border-t border-purple-900/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="px-3 py-1 bg-purple-950 text-fuchsia-300 border border-purple-700/60 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
                      {selectedPhoto.category}
                    </span>
                    <h2 className="text-2xl font-black text-white">{selectedPhoto.title}</h2>
                    {selectedPhoto.description && (
                      <p className="text-sm text-purple-200/80 mt-1 font-light">{selectedPhoto.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
