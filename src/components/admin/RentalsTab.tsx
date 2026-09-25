"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, X, Upload, ShoppingBag, Sparkles, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export interface RentalItemData {
  _id: string;
  id?: string;
  name: string;
  category: "costumes" | "props" | "accessories";
  categoryLabel?: string;
  description: string;
  icon: string;
  image?: string;
  highlight?: string;
  basePriceLkr: number;
  availableSizes?: string[];
  includedPieces?: string[];
  suitableFor?: string[];
  stockCount?: number;
}

const DEMO_PHOTO_PRESETS = [
  {
    label: "Bollywood Outfit",
    category: "costumes",
    icon: "💃",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    name: "Bollywood Stage Ensemble",
    price: 2500,
    highlight: "Popular"
  },
  {
    label: "Contemporary Silk",
    category: "costumes",
    icon: "🕊️",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    name: "Contemporary Flow Silks",
    price: 1800,
  },
  {
    label: "Hip-Hop Streetwear",
    category: "costumes",
    icon: "🧢",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop",
    name: "Urban Hip-Hop Streetwear",
    price: 2200,
    highlight: "Trending"
  },
  {
    label: "K-Pop Idol Suit",
    category: "costumes",
    icon: "⭐",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    name: "K-Pop Stage Idol Suit",
    price: 3000,
  },
  {
    label: "Latin Salsa Dress",
    category: "costumes",
    icon: "💃",
    image: "https://images.unsplash.com/photo-1545959570-a94467d3a049?q=80&w=800&auto=format&fit=crop",
    name: "Latin Salsa & Ballroom Couture",
    price: 2800,
  },
  {
    label: "Kandyan Ves Regalia",
    category: "costumes",
    icon: "🥁",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800&auto=format&fit=crop",
    name: "Traditional Sri Lankan Regalia",
    price: 4500,
    highlight: "Heritage"
  },
  {
    label: "Stage Feather Fans",
    category: "props",
    icon: "🪭",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    name: "Dramatic Feather & Silk Fans",
    price: 1200,
    highlight: "Popular"
  },
  {
    label: "Broadway Tap Canes",
    category: "props",
    icon: "🦯",
    image: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?q=80&w=800&auto=format&fit=crop",
    name: "Broadway Tap & Cabaret Canes",
    price: 800,
  },
  {
    label: "LED Wings & Glow Props",
    category: "props",
    icon: "💡",
    image: "https://images.unsplash.com/photo-1508997449629-303059a039c0?q=80&w=800&auto=format&fit=crop",
    name: "Programmable LED Glow Props",
    price: 3500,
    highlight: "High-Tech"
  },
  {
    label: "Geta Beraya Drum",
    category: "props",
    icon: "🪘",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop",
    name: "Authentic Sri Lankan Drums",
    price: 3000,
    highlight: "Heritage"
  },
  {
    label: "Kundan Jewelry Set",
    category: "accessories",
    icon: "💎",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
    name: "Kundan & Temple Jewelry Sets",
    price: 1500,
    highlight: "Popular"
  },
  {
    label: "Traditional Raksha Mask",
    category: "accessories",
    icon: "🎭",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
    name: "Raksha & Masquerade Stage Masks",
    price: 1800,
  },
  {
    label: "Ghungroo & Pro Shoes",
    category: "accessories",
    icon: "👠",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
    name: "Ghungroo Anklets & Pro Shoes",
    price: 1600,
    highlight: "Pro Grade"
  }
];

const getFallbackImage = (category: string) => {
  if (category === "props") return "/images/rentals/props_demo.jpg";
  if (category === "accessories") return "/images/rentals/accessories_demo.jpg";
  return "/images/rentals/costume_demo.jpg";
};

export default function RentalsTab() {
  const [rentals, setRentals] = useState<RentalItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<RentalItemData | null>(null);

  const [formState, setFormState] = useState({
    name: "",
    category: "costumes",
    description: "",
    icon: "👗",
    image: "",
    highlight: "",
    basePriceLkr: "2500",
    includedPieces: "",
    suitableFor: "",
    availableSizes: "S, M, L, Custom",
  });

  const fetchRentals = async () => {
    try {
      const res = await fetch("/api/rentals");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRentals(json.data);
      }
    } catch (err) {
      console.error("Error fetching rentals in admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const initFetch = async () => {
      try {
        const res = await fetch("/api/rentals");
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data)) {
          setRentals(json.data);
        }
      } catch (err) {
        console.error("Error fetching rentals in admin:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    void initFetch();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const seedDemoData = async () => {
    if (!confirm("This will add high-res demo items with photos to your wardrobe database. Proceed?")) return;
    try {
      setSeeding(true);
      for (const preset of DEMO_PHOTO_PRESETS) {
        await fetch("/api/rentals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: preset.name,
            category: preset.category,
            categoryLabel: preset.category === "props" ? "Props" : preset.category === "accessories" ? "Performance Accessories" : "Costumes",
            description: `Professional performance grade ${preset.name.toLowerCase()} equipped for stage productions, video shoots, and live concerts.`,
            icon: preset.icon,
            image: preset.image,
            highlight: preset.highlight || "",
            basePriceLkr: preset.price,
            includedPieces: ["Full Stage Set", "Matching Accessories"],
            suitableFor: ["Stage Shows", "TV Shoots", "Competitions"],
            availableSizes: ["S", "M", "L", "Troupe Sizing"]
          })
        });
      }
      fetchRentals();
      alert("Successfully seeded demo items with photos!");
    } catch (err) {
      console.error("Error seeding demo items:", err);
    } finally {
      setSeeding(false);
    }
  };

  const openModalForNew = () => {
    setEditingItem(null);
    setFormState({
      name: "",
      category: "costumes",
      description: "",
      icon: "👗",
      image: "",
      highlight: "",
      basePriceLkr: "2500",
      includedPieces: "",
      suitableFor: "",
      availableSizes: "S, M, L, Custom",
    });
    setShowModal(true);
  };

  const openModalForEdit = (item: RentalItemData) => {
    setEditingItem(item);
    setFormState({
      name: item.name || "",
      category: item.category || "costumes",
      description: item.description || "",
      icon: item.icon || "👗",
      image: item.image || "",
      highlight: item.highlight || "",
      basePriceLkr: String(item.basePriceLkr || 2500),
      includedPieces: Array.isArray(item.includedPieces) ? item.includedPieces.join(", ") : "",
      suitableFor: Array.isArray(item.suitableFor) ? item.suitableFor.join(", ") : "",
      availableSizes: Array.isArray(item.availableSizes) ? item.availableSizes.join(", ") : "S, M, L",
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name) {
      alert("Please provide an item name.");
      return;
    }

    try {
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem ? `/api/rentals/${editingItem._id}` : "/api/rentals";

      const payload = {
        name: formState.name,
        category: formState.category,
        categoryLabel:
          formState.category === "props"
            ? "Props"
            : formState.category === "accessories"
            ? "Performance Accessories"
            : "Costumes",
        description: formState.description,
        icon: formState.icon || "👗",
        image: formState.image,
        highlight: formState.highlight,
        basePriceLkr: Number(formState.basePriceLkr) || 2000,
        includedPieces: formState.includedPieces.split(",").map((s) => s.trim()).filter(Boolean),
        suitableFor: formState.suitableFor.split(",").map((s) => s.trim()).filter(Boolean),
        availableSizes: formState.availableSizes.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        setEditingItem(null);
        fetchRentals();
      } else {
        const errJson = await res.json();
        alert(errJson.error || "Failed to save rental item");
      }
    } catch (err) {
      console.error("Error saving rental item:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this rental item?")) return;
    try {
      const res = await fetch(`/api/rentals/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRentals(rentals.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Error deleting rental item:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl p-6 overflow-hidden"
    >
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-fuchsia-400" />
            Manage Wardrobe & Rental Items
          </h2>
          <p className="text-xs text-purple-300/70 mt-1">
            Add, update, or upload photos for costumes, theatrical props, and stage accessories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={seedDemoData}
            disabled={seeding}
            className="bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 text-fuchsia-300 font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            {seeding ? "Seeding..." : "Seed Demo Photos Items"}
          </button>
          <button
            onClick={openModalForNew}
            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Rental Item
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-purple-300/60 text-sm">
          Loading wardrobe items...
        </div>
      ) : rentals.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-purple-900/50 rounded-2xl bg-black/40">
          <ShoppingBag className="w-12 h-12 text-purple-400/50 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Custom Rental Items Found</h3>
          <p className="text-xs text-purple-300/60 mb-6 max-w-md mx-auto">
            Click &quot;Add Rental Item&quot; to upload costume photos and define pricing so they display on the student/user page.
          </p>
          <button
            onClick={openModalForNew}
            className="px-5 py-2.5 rounded-xl bg-purple-950 border border-purple-700 text-fuchsia-300 text-xs font-bold uppercase tracking-wider hover:bg-purple-900 transition-all"
          >
            + Add First Rental Photo Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rentals.map((item) => (
            <div
              key={item._id}
              className="bg-black/60 border border-purple-900/40 rounded-2xl overflow-hidden group relative flex flex-col justify-between hover:border-purple-500/60 transition-all"
            >
              {/* Photo or Fallback Demo Photo */}
              <div className="relative h-44 w-full bg-purple-950/50 overflow-hidden flex items-center justify-center">
                <Image
                  src={item.image || getFallbackImage(item.category)}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />

                <span className="absolute top-2 left-2 bg-purple-950/90 text-fuchsia-300 border border-purple-500/50 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {item.category}
                </span>

                {item.highlight && (
                  <span className="absolute top-2 right-2 bg-fuchsia-950/90 text-fuchsia-200 border border-fuchsia-600/70 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    {item.highlight}
                  </span>
                )}
              </div>

              {/* Item Info */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 line-clamp-1 flex items-center gap-1.5">
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </h4>
                  <p className="text-xs text-purple-200/70 line-clamp-2 mb-3 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-purple-400/60 uppercase block">Daily Rate</span>
                    <span className="text-xs font-black text-fuchsia-300">
                      LKR {item.basePriceLkr?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openModalForEdit(item)}
                      className="p-1.5 bg-blue-900/30 text-blue-400 hover:bg-blue-900/70 rounded-lg transition-colors"
                      title="Edit Item"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 bg-red-900/30 text-red-400 hover:bg-red-900/70 rounded-lg transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Rental Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#140924] border border-purple-800/60 rounded-3xl w-full max-w-xl p-6 sm:p-8 relative shadow-[0_0_50px_rgba(168,85,247,0.4)] max-h-[90vh] overflow-y-auto my-auto"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 p-2 rounded-full bg-purple-950 text-purple-300 hover:text-white border border-purple-800/50"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-fuchsia-400" />
              {editingItem ? "Edit Wardrobe Item" : "Add Rental Costume / Prop"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Item Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-[#090410] border border-purple-900/70 rounded-xl px-4 py-2.5 text-white text-xs placeholder:text-purple-400/40 focus:outline-none focus:border-purple-500"
                  placeholder="e.g. Royal Kandyan Ves Costume Set"
                />
              </div>

              {/* Category & Icon */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        category: e.target.value as "costumes" | "props" | "accessories",
                        icon:
                          e.target.value === "props"
                            ? "🎭"
                            : e.target.value === "accessories"
                            ? "👑"
                            : "💃",
                      })
                    }
                    className="w-full bg-[#090410] border border-purple-900/70 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="costumes">Costumes (👗)</option>
                    <option value="props">Props (🎭)</option>
                    <option value="accessories">Accessories (👑)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                    Emoji Icon
                  </label>
                  <input
                    type="text"
                    value={formState.icon}
                    onChange={(e) => setFormState({ ...formState, icon: e.target.value })}
                    className="w-full bg-[#090410] border border-purple-900/70 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500 text-center"
                    placeholder="💃"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                    Daily Rate (LKR)
                  </label>
                  <input
                    type="number"
                    value={formState.basePriceLkr}
                    onChange={(e) => setFormState({ ...formState, basePriceLkr: e.target.value })}
                    className="w-full bg-[#090410] border border-purple-900/70 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                    placeholder="2500"
                  />
                </div>
              </div>

              {/* Photo Upload or URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-fuchsia-400" />
                  Item Photo Image (Upload File or Paste Link) *
                </label>

                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-950/90 hover:bg-purple-900 border border-purple-700/60 rounded-xl text-purple-200 text-xs font-bold cursor-pointer transition-all shrink-0">
                      <Upload className="w-4 h-4 text-fuchsia-400" />
                      Upload Photo File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[10px] text-purple-400/60 font-semibold uppercase text-center">
                      OR
                    </span>
                    <input
                      type="text"
                      value={formState.image}
                      onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                      className="flex-1 bg-[#090410] border border-purple-900/70 rounded-xl px-3 py-2.5 text-white text-xs placeholder:text-purple-400/40 focus:outline-none focus:border-purple-500"
                      placeholder="Paste Image URL (https://...)"
                    />
                  </div>

                  {/* Photo Live Preview */}
                  {formState.image && (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden border border-purple-500/50 mt-2 bg-black">
                      <Image
                        src={formState.image}
                        alt="Photo Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={() => setFormState({ ...formState, image: "" })}
                        className="absolute top-2 right-2 p-1.5 bg-black/80 hover:bg-red-900 text-white rounded-full transition-colors"
                        title="Remove Photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Quick Select Demo Photos */}
                  <div className="mt-3">
                    <label className="block text-[11px] font-bold text-purple-300/90 mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                      Quick Pick Demo Photo Presets:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto p-2 bg-[#090410] border border-purple-900/60 rounded-xl">
                      {DEMO_PHOTO_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setFormState((prev) => ({
                              ...prev,
                              image: preset.image,
                              name: prev.name ? prev.name : preset.name,
                              category: (preset.category as "costumes" | "props" | "accessories"),
                              icon: preset.icon,
                              basePriceLkr: String(preset.price),
                              highlight: preset.highlight || prev.highlight
                            }));
                          }}
                          className={`group relative h-14 rounded-lg overflow-hidden border transition-all text-left ${
                            formState.image === preset.image
                              ? "border-fuchsia-500 ring-2 ring-fuchsia-500/50"
                              : "border-purple-900/40 hover:border-purple-500"
                          }`}
                        >
                          <Image
                            src={preset.image}
                            alt={preset.label}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-1 flex flex-col justify-end">
                            <span className="text-[9px] font-bold text-white line-clamp-1 flex items-center gap-0.5">
                              <span>{preset.icon}</span>
                              <span>{preset.label}</span>
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlight Tag */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                  Highlight Tag (Optional)
                </label>
                <select
                  value={formState.highlight}
                  onChange={(e) => setFormState({ ...formState, highlight: e.target.value })}
                  className="w-full bg-[#090410] border border-purple-900/70 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="">None</option>
                  <option value="Popular">Popular 🔥</option>
                  <option value="Trending">Trending ⚡</option>
                  <option value="Heritage">Heritage 🥁</option>
                  <option value="High-Tech">High-Tech 💡</option>
                  <option value="Bulk Sets">Bulk Sets 👥</option>
                  <option value="Pro Grade">Pro Grade 👠</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full bg-[#090410] border border-purple-900/70 rounded-xl px-4 py-2.5 text-white text-xs placeholder:text-purple-400/40 focus:outline-none focus:border-purple-500"
                  placeholder="Detailed description of the wardrobe items..."
                />
              </div>

              {/* Included Pieces & Recommended For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                    Included Pieces (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formState.includedPieces}
                    onChange={(e) => setFormState({ ...formState, includedPieces: e.target.value })}
                    className="w-full bg-[#090410] border border-purple-900/70 rounded-xl px-3 py-2.5 text-white text-xs placeholder:text-purple-400/40 focus:outline-none focus:border-purple-500"
                    placeholder="Top, Skirt, Dupatta, Waistband"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                    Recommended For (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formState.suitableFor}
                    onChange={(e) => setFormState({ ...formState, suitableFor: e.target.value })}
                    className="w-full bg-[#090410] border border-purple-900/70 rounded-xl px-3 py-2.5 text-white text-xs placeholder:text-purple-400/40 focus:outline-none focus:border-purple-500"
                    placeholder="Stage Shows, TV Shoots, Competitions"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-purple-900/60">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-purple-300/80 hover:text-white bg-purple-950/60 border border-purple-800/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  {editingItem ? "Update Rental Photo Item" : "Save & Publish Rental Item"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
