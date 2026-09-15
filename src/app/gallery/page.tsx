"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, X, Filter, ZoomIn, Calendar } from "lucide-react";

interface GalleryPhoto {
  _id?: string;
  id?: number | string;
  title: string;
  category: string;
  image: string;
  description?: string;
  createdAt?: { seconds: number } | string | number | null;
}

const defaultGalleryItems: GalleryPhoto[] = [
  {
    id: "d1",
    title: "Kids Kandyan Dance Practice",
    category: "Kids Dancing",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Young students learning traditional Kandyan dance rhythms and hand gestures in our studio."
  },
  {
    id: "d2",
    title: "Urban Hip-Hop Choreography Showcase",
    category: "Class Practice",
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a6e0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "High energy street grooves and group routine practice at Colombo Main Studio."
  },
  {
    id: "d3",
    title: "Annual Stage Performance Highlights",
    category: "Events & Highlights",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Live performance under stage lighting at Nelum Pokuna Theater."
  },
  {
    id: "d4",
    title: "Contemporary Flow Masterclass",
    category: "Special Performances",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Lyrical movement & emotional stage dance workshop with guest instructor."
  },
  {
    id: "d5",
    title: "Young Dancers Drumming & Rhythm Session",
    category: "Kids Dancing",
    image: "https://images.unsplash.com/photo-1542838686-37ed7a956140?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Children discovering traditional Sri Lankan percussion instruments."
  },
  {
    id: "d6",
    title: "Low-Country Masked Ritual Dance Highlight",
    category: "Events & Highlights",
    image: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Pahatharata ritualistic dance demonstration in traditional costumes."
  },
];

const CATEGORIES = ["All", "Class Practice", "Kids Dancing", "Events & Highlights", "Special Performances"];

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPhotos(json.data);
        } else {
          setPhotos(defaultGalleryItems);
        }
      } catch (err) {
        console.error("Error fetching gallery photos:", err);
        setPhotos(defaultGalleryItems);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const filteredPhotos = activeCategory === "All"
    ? photos
    : photos.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-[#090410] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-fuchsia-900/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-fuchsia-300 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(232,121,249,0.3)]"
          >
            <Camera className="w-4 h-4 text-fuchsia-400" />
            RIGA Media & Visual Gallery
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-black text-white uppercase tracking-wider mb-4"
          >
            Class & Event <span className="text-metallic-purple">Moments</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "120px" }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 mx-auto rounded-full shadow-[0_0_15px_rgba(232,121,249,0.8)] mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-purple-200/70 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed"
          >
            Explore live photos of our kids dancing, class training sessions, behind-the-scenes practice, and special performance highlights.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-2.5 mb-14"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(232,121,249,0.6)] border border-fuchsia-400/50"
                    : "bg-[#140924]/80 text-purple-300/80 border border-purple-900/50 hover:border-purple-500/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-400"></div>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-[#140924]/50 rounded-3xl border border-purple-900/40">
            <Camera className="w-12 h-12 text-purple-400/60 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-1">No Photos Found</h3>
            <p className="text-purple-300/60 text-sm">There are no photos under &quot;{activeCategory}&quot; category yet.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPhotos.map((item, idx) => (
                <motion.div
                  key={item._id || item.id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setSelectedPhoto(item)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer border border-purple-900/40 hover:border-purple-500/80 hover:shadow-[0_0_35px_rgba(168,85,247,0.45)] transition-all duration-500 bg-[#140924] h-[320px] flex flex-col justify-end"
                >
                  {/* Photo Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090410] via-[#090410]/50 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1 bg-purple-950/90 backdrop-blur-md rounded-full text-[11px] font-bold text-fuchsia-300 tracking-wider uppercase border border-purple-500/50 shadow-[0_0_12px_rgba(232,121,249,0.3)]">
                      {item.category}
                    </span>
                  </div>

                  {/* Zoom Icon Button */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 rounded-full bg-purple-950/90 border border-purple-500/60 flex items-center justify-center text-fuchsia-300 shadow-lg">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Caption & Content */}
                  <div className="relative z-10 p-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-fuchsia-300 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-purple-200/70 font-light line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Lightbox Preview Modal */}
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
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-black/70 hover:bg-red-900/80 text-white rounded-full transition-colors border border-purple-500/40"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* High Res Image */}
                <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="w-full h-full max-h-[70vh] object-contain"
                  />
                </div>

                {/* Details Bar */}
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
    </div>
  );
}
