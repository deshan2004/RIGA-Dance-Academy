"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  HeartHandshake,
  Heart,
  X,
  Users,
  MessageCircle,
  Send,
  ShieldCheck,
  Clock,
  ChevronRight,
  ShoppingBag,
  Filter,
  BadgePercent,
  Zap,
  CheckCircle2,
  Sparkle
} from "lucide-react";

interface RentalItem {
  id: string;
  category: "costumes" | "props" | "accessories";
  categoryLabel: string;
  name: string;
  description: string;
  icon: string;
  highlight?: string;
  basePriceLkr: number;
  availableSizes?: string[];
  includedPieces?: string[];
  suitableFor?: string[];
  stockCount?: number;
}

const rentalCategories = [
  { id: "all", label: "All Rental Items", icon: "✨" },
  { id: "costumes", label: "Costumes", icon: "👗" },
  { id: "props", label: "Props", icon: "🎭" },
  { id: "accessories", label: "Performance Accessories", icon: "👑" },
];

const quickTagFilters = [
  { id: "all", label: "All Types" },
  { id: "Popular", label: "🔥 Popular" },
  { id: "Trending", label: "⚡ Trending" },
  { id: "Heritage", label: "🥁 Heritage" },
  { id: "High-Tech", label: "💡 High-Tech" },
  { id: "Bulk Sets", label: "👥 Troupe Sets" },
];

const rentalItems: RentalItem[] = [
  // 👗 COSTUMES
  {
    id: "c1",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Bollywood Stage Ensemble",
    description: "Vibrant ghagra cholis, embroidered fusion outfits, and sequined dupattas designed for high-energy routines.",
    icon: "💃",
    highlight: "Popular",
    basePriceLkr: 2500,
    availableSizes: ["S", "M", "L", "Custom Troupe"],
    includedPieces: ["Embroidered Top", "Flared Skirt / Lehenga", "Matching Dupatta", "Waist sash"],
    suitableFor: ["Stage Concerts", "Wedding Sangeet", "TV Productions", "Music Videos"],
    stockCount: 24
  },
  {
    id: "c2",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Contemporary Flow Silks",
    description: "Fluid, breathable silks, mesh tunics, and minimalist drapes for expressive lyrical performances.",
    icon: "🕊️",
    basePriceLkr: 1800,
    availableSizes: ["S", "M", "L", "XL"],
    includedPieces: ["Asymmetric Silk Tunic", "Matching Flow Trousers", "Expressive Drape Ribbon"],
    suitableFor: ["Lyrical Dance", "Contemporary Solos", "Artistic Showcases"],
    stockCount: 18
  },
  {
    id: "c3",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Urban Hip-Hop Streetwear",
    description: "Urban streetwear, oversized metallic jackets, cargo sets, and custom varsity gear.",
    icon: "🧢",
    highlight: "Trending",
    basePriceLkr: 2200,
    availableSizes: ["M", "L", "XL", "Over-sized"],
    includedPieces: ["Metallic Crop / Windbreaker", "Cargo Dance Pants", "Reflective Straps"],
    suitableFor: ["Crew Battles", "Street Dance Videos", "Hip-hop Showcases"],
    stockCount: 30
  },
  {
    id: "c4",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "K-Pop Stage Idol Suit",
    description: "Sleek, matching idol team outfits, futuristic harnesses, and concept stage suits.",
    icon: "⭐",
    basePriceLkr: 3000,
    availableSizes: ["S", "M", "L"],
    includedPieces: ["Tailored Stage Blazer", "Tactical Body Harness", "Fitted Dance Trousers"],
    suitableFor: ["K-Pop Covers", "Commercial Shoots", "Idol Concept Tours"],
    stockCount: 15
  },
  {
    id: "c5",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Latin Salsa & Ballroom Couture",
    description: "Fringed salsa dresses, ballroom gowns, and tailored Latin dance trousers with beaded detailing.",
    icon: "💃",
    basePriceLkr: 2800,
    availableSizes: ["XS", "S", "M", "L"],
    includedPieces: ["Tiered Fringe Latin Dress", "Rhinestone Arm Cuffs", "Matching Hairpiece"],
    suitableFor: ["Salsa Competitions", "Ballroom Galas", "Latin Night Showcases"],
    stockCount: 12
  },
  {
    id: "c6",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Traditional Sri Lankan Regalia",
    description: "Authentic Kandyan Ves attire, Pahatharata low-country costumes, and Sabaragamuwa dance regalia.",
    icon: "🥁",
    highlight: "Heritage",
    basePriceLkr: 4500,
    availableSizes: ["Custom Fitted"],
    includedPieces: ["Traditional Chest Plate (Deva Aabharana)", "Waist Cloth & Hangala", "Headpiece (Nalalpata)", "Brass Accessories"],
    suitableFor: ["Cultural Pageants", "State Ceremonies", "Traditional Pageantry"],
    stockCount: 10
  },
  {
    id: "c7",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Pageant & High-Glamour Gowns",
    description: "High-glamour couture stage gowns, crystal-embellished bodysuits, and dramatic wings.",
    icon: "👑",
    basePriceLkr: 5000,
    availableSizes: ["S", "M", "L"],
    includedPieces: ["Crystal Bodysuit", "Detachable Feathered Cape/Wings", "Matching Choker"],
    suitableFor: ["Pageant Opening Numbers", "Carnival Parades", "Grand Finale Shoots"],
    stockCount: 8
  },
  {
    id: "c8",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Junior & Kids Stage Costumes",
    description: "Tailored mini stage costumes for junior dance troupes, competitions, and school recitals.",
    icon: "🧸",
    basePriceLkr: 1500,
    availableSizes: ["Kids 4-6", "Kids 7-9", "Kids 10-12"],
    includedPieces: ["Junior Dance Top", "Skirt/Shorts", "Sparkle Headband"],
    suitableFor: ["School Recitals", "Junior Competitions", "Kids Troupe Shows"],
    stockCount: 40
  },
  {
    id: "c9",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Themed & Theatrical Wardrobe",
    description: "Custom theatrical wardrobe for conceptual storylines, period pieces, and fantasy themes.",
    icon: "🎨",
    basePriceLkr: 3200,
    availableSizes: ["S", "M", "L", "Custom"],
    includedPieces: ["Character Robe/Tunic", "Themed Props Overlay", "Custom Head Ornament"],
    suitableFor: ["Drama Dance Plays", "Fantasy Shoots", "Concept Videos"],
    stockCount: 16
  },
  {
    id: "c10",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Mega Ensemble Troupe Sets",
    description: "Synchronized ensemble wardrobe sets (10 to 50+ dancers) ensuring visual stage perfection.",
    icon: "👥",
    highlight: "Bulk Sets",
    basePriceLkr: 12000,
    availableSizes: ["Full Troupe Sizing (10-50 Sets)"],
    includedPieces: ["Multi-set Uniform Costumes", "Color-coordinated Accessories", "Troupe Storage Bags"],
    suitableFor: ["Mega TV Shows", "Corporate Award Recitals", "Stadium Opening Ceremonies"],
    stockCount: 50
  },

  // 🎭 PROPS
  {
    id: "p1",
    category: "props",
    categoryLabel: "Props",
    name: "Dramatic Feather & Silk Fans",
    description: "Feather fan veils, silk folding fans, and oversized theatrical hand fans for dramatic reveals.",
    icon: "🪭",
    highlight: "Popular",
    basePriceLkr: 1200,
    includedPieces: ["Pair of 1.8m Silk Veil Fans (Left + Right)"],
    suitableFor: ["Burlesque/Cabaret", "Bellydance", "Dramatic Stage Intros"],
    stockCount: 20
  },
  {
    id: "p2",
    category: "props",
    categoryLabel: "Props",
    name: "Broadway Tap & Cabaret Canes",
    description: "Broadway tap canes, dazzle sticks, and traditional cabaret performance walking canes.",
    icon: "🦯",
    basePriceLkr: 800,
    includedPieces: ["Heavy-duty Gloss Finish Dance Cane"],
    suitableFor: ["Jazz Routines", "Tap Dance", "Cabaret Numbers"],
    stockCount: 35
  },
  {
    id: "p3",
    category: "props",
    categoryLabel: "Props",
    name: "Theatrical Top Hats & Headdresses",
    description: "Fedora hats, top hats, Sri Lankan traditional headdresses, and glitter bowler hats.",
    icon: "🎩",
    basePriceLkr: 900,
    includedPieces: ["Glitter Satin Top Hat with Metallic Ribbon"],
    suitableFor: ["Jazz & Tap", "Gentleman Troupe Themes"],
    stockCount: 30
  },
  {
    id: "p4",
    category: "props",
    categoryLabel: "Props",
    name: "LED Lit & Vintage Umbrellas",
    description: "Traditional Sri Lankan parasols, LED lit umbrellas, and lace vintage rain props.",
    icon: "☂️",
    basePriceLkr: 1400,
    includedPieces: ["Programmable LED Fiber Umbrella"],
    suitableFor: ["Night Stage Routines", "Music Videos", "Rain Dance Concepts"],
    stockCount: 15
  },
  {
    id: "p5",
    category: "props",
    categoryLabel: "Props",
    name: "Gymnastics Satin Ribbons",
    description: "Rhythmic gymnastics satin ribbons, aerial silks, and long color-wave streamers.",
    icon: "🎗️",
    basePriceLkr: 600,
    includedPieces: ["6m Satin Ribbon with Fiber Wand"],
    suitableFor: ["Rhythmic Solos", "Stage Wave Routines"],
    stockCount: 25
  },
  {
    id: "p6",
    category: "props",
    categoryLabel: "Props",
    name: "Bellydance Silk Veils & Drapes",
    description: "Bellydance silk veils, mystery shrouds, and multi-layered tulle performance drapes.",
    icon: "🌌",
    basePriceLkr: 1000,
    includedPieces: ["100% Habotai Gradient Silk Veil"],
    suitableFor: ["Oriental Dance", "Airy Flow Pieces"],
    stockCount: 18
  },
  {
    id: "p7",
    category: "props",
    categoryLabel: "Props",
    name: "Color Guard & Metallic Flags",
    description: "Color guard flags, giant metallic team banners, and silk motion flags.",
    icon: "🚩",
    basePriceLkr: 1500,
    includedPieces: ["Poly-silk Flag + Lightweight Aluminum Pole"],
    suitableFor: ["Troupe Opening March", "Stadium Events"],
    stockCount: 14
  },
  {
    id: "p8",
    category: "props",
    categoryLabel: "Props",
    name: "Sleek Metallic Performance Chairs",
    description: "Sleek metallic performance chairs, vintage wooden props, and cabaret dance seating.",
    icon: "🪑",
    basePriceLkr: 1800,
    includedPieces: ["Reinforced Chrome Dance Chair"],
    suitableFor: ["Chair Heels Choreography", "Cabaret Solos"],
    stockCount: 12
  },
  {
    id: "p9",
    category: "props",
    categoryLabel: "Props",
    name: "Programmable LED Glow Props",
    description: "Programmable LED light whips, glow poi, illuminated wings, and neon stage props.",
    icon: "💡",
    highlight: "High-Tech",
    basePriceLkr: 3500,
    includedPieces: ["Pair of Multi-mode LED Wings + Controller"],
    suitableFor: ["Futuristic Concepts", "EDM Festivals", "Laser Light Shows"],
    stockCount: 10
  },
  {
    id: "p10",
    category: "props",
    categoryLabel: "Props",
    name: "Authentic Sri Lankan Drums & Raban",
    description: "Authentic Sri Lankan drums (Geta Beraya, Yak Beraya), Raban, and ceremonial brass items.",
    icon: "🪘",
    highlight: "Heritage",
    basePriceLkr: 3000,
    includedPieces: ["Authentic Hand-carved Geta Beraya + Straps"],
    suitableFor: ["Traditional Percussion Acts", "Cultural Pageants"],
    stockCount: 8
  },
  {
    id: "p11",
    category: "props",
    categoryLabel: "Props",
    name: "Large Portable Stage Backdrops",
    description: "Large-scale portable backdrop elements, throne chairs, and custom concert set pieces.",
    icon: "🎪",
    basePriceLkr: 8000,
    includedPieces: ["Collapsible Stage Arch & Props Frame"],
    suitableFor: ["Concert Set Designs", "Theatre Stage Productions"],
    stockCount: 4
  },

  // 👑 PERFORMANCE ACCESSORIES
  {
    id: "a1",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Kundan & Temple Jewelry Sets",
    description: "Stage-ready Kundan sets, temple jewellery, sparkling rhinestone necklaces, and earrings.",
    icon: "💎",
    highlight: "Popular",
    basePriceLkr: 1500,
    includedPieces: ["Heavy Necklace", "Matching Earrings", "Maang Tikka", "Armlets (Vanki)"],
    suitableFor: ["Classical Dance", "Bollywood Stage", "Bride/Troupe Sangeet"],
    stockCount: 30
  },
  {
    id: "a2",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Satin Opera & LED Gloves",
    description: "Satin opera gloves, fingerless leather street gloves, and LED glowing performance gloves.",
    icon: "🧤",
    basePriceLkr: 700,
    includedPieces: ["Pair of Elbow-length Satin Gloves"],
    suitableFor: ["High Fashion Dance", "Voguing", "Stage Jazz"],
    stockCount: 40
  },
  {
    id: "a3",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Royal Crown Tiaras & Nalalpata",
    description: "Ornate Kandyan Nalalpata, crown tiaras, feather headdresses, and crystal forehead chains.",
    icon: "👑",
    highlight: "Heritage",
    basePriceLkr: 2000,
    includedPieces: ["Brass Gold Plated Nalalpata Head Chain"],
    suitableFor: ["Royal Pageants", "Kandyan Acts", "Queen Character Solos"],
    stockCount: 15
  },
  {
    id: "a4",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Raksha & Masquerade Stage Masks",
    description: "Traditional Sri Lankan Raksha masks, Venetian masquerade masks, and futuristic cyber visors.",
    icon: "🎭",
    basePriceLkr: 1800,
    includedPieces: ["Authentic Wooden Hand-painted Gurulu/Maru Raksha Mask"],
    suitableFor: ["Traditional Ritual Dance", "Masquerade Balls", "Cyberpunk Themes"],
    stockCount: 12
  },
  {
    id: "a5",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Bellydance Coin Belts & Chains",
    description: "Coin bellydance belts, metallic waist chains, traditional silver waistbands, and leather harnesses.",
    icon: "⛓️",
    basePriceLkr: 1100,
    includedPieces: ["Velvet Coin Hip Scarf with Jingle Bells"],
    suitableFor: ["Bellydance", "Fusion Latin", "Street Style"],
    stockCount: 25
  },
  {
    id: "a6",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Gajra Garlands & Hair Cages",
    description: "Gajra flower garlands, bun cages, decorative hair pins, and metallic braided extensions.",
    icon: "🌺",
    basePriceLkr: 500,
    includedPieces: ["Reusable Silk Flower Gajra Ring + Golden Pins"],
    suitableFor: ["Bharatanatyam", "Traditional Hair Styling"],
    stockCount: 50
  },
  {
    id: "a7",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Ghungroo Anklets & Pro Shoes",
    description: "Ghungroo anklets, Latin salsa heels, character shoes, jazz boots, and tap footwear.",
    icon: "👠",
    highlight: "Pro Grade",
    basePriceLkr: 1600,
    includedPieces: ["Pair of 100-bell Brass Ghungroo Pad Straps"],
    suitableFor: ["Kathak", "Kandyan", "Flamenco Tap"],
    stockCount: 22
  }
];

// Interactive Card Component with Spotlight Mouse Tracking Effect
function RentalCard({
  item,
  isLiked,
  onToggleLike,
  onOpenModal
}: {
  item: RentalItem;
  isLiked: boolean;
  onToggleLike: (e: React.MouseEvent, id: string) => void;
  onOpenModal: (item: RentalItem) => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenModal(item)}
      className="group relative cursor-pointer p-6 rounded-2xl bg-[#120722]/90 border border-purple-900/40 hover:border-purple-500/80 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Interactive Cursor Spotlight Glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(192, 132, 252, 0.15), transparent 80%)`
          }}
        />
      )}

      {/* Ambient Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />

      <div className="relative z-10">
        {/* Header Row: Icon + Tag + Heart Bookmark */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <span className="w-14 h-14 rounded-2xl bg-purple-950/90 border border-purple-700/40 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(168,85,247,0.25)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              {item.icon}
            </span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#120722] shadow-[0_0_8px_rgba(16,185,129,0.8)]" title="Available for rent" />
          </div>

          <div className="flex items-center gap-2">
            {item.highlight ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-fuchsia-950/90 border border-fuchsia-600/70 text-fuchsia-300 shadow-[0_0_12px_rgba(232,121,249,0.4)]">
                {item.highlight}
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-widest text-purple-300/60 font-semibold px-2 py-0.5 rounded-md bg-purple-950/50 border border-purple-900/30">
                {item.categoryLabel}
              </span>
            )}

            {/* Bookmark / Wishlist Heart Button */}
            <button
              onClick={(e) => onToggleLike(e, item.id)}
              className={`p-2 rounded-xl border transition-all duration-200 z-20 ${
                isLiked
                  ? "bg-fuchsia-600 text-white border-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,0.6)] scale-110"
                  : "bg-purple-950/60 text-purple-400/70 border-purple-800/40 hover:text-white hover:border-purple-500/60"
              }`}
              title={isLiked ? "Remove from Inquiry List" : "Add to Inquiry List"}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-white text-white" : ""}`} />
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-white group-hover:text-fuchsia-300 transition-colors mb-2 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-xs text-purple-200/70 leading-relaxed font-light mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Included Items preview */}
        {item.includedPieces && item.includedPieces.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.includedPieces.slice(0, 2).map((piece, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-950/70 border border-purple-800/40 text-purple-300/80">
                ✓ {piece}
              </span>
            ))}
            {item.includedPieces.length > 2 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-purple-900/30 text-purple-400/80">
                +{item.includedPieces.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Price & Action */}
      <div className="relative z-10 pt-3 border-t border-purple-900/40 flex items-center justify-between gap-2 mt-2">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-purple-400/60 block">Est. Rental</span>
          <span className="text-xs sm:text-sm font-extrabold text-fuchsia-300">
            LKR {item.basePriceLkr.toLocaleString()} <span className="text-[10px] font-normal text-purple-300/60">/ day</span>
          </span>
        </div>

        <div className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-purple-900/80 to-fuchsia-900/80 group-hover:from-purple-600 group-hover:to-fuchsia-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 shadow-[0_0_12px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_20px_rgba(232,121,249,0.5)]">
          <span>Quick View</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-fuchsia-200" />
        </div>
      </div>
    </motion.div>
  );
}

// Quick View & Booking Inquiry Modal
function RentalDetailModal({
  item,
  onClose,
  isLiked,
  onToggleLike
}: {
  item: RentalItem;
  onClose: () => void;
  isLiked: boolean;
  onToggleLike: (e: React.MouseEvent, id: string) => void;
}) {
  const [days, setDays] = useState<number>(1);
  const [troupeQuantity, setTroupeQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    item.availableSizes ? item.availableSizes[0] : "Standard"
  );
  const [inquiryType, setInquiryType] = useState<"whatsapp" | "form">("whatsapp");
  
  // Quick form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Dynamic Quote Calculation
  const totalEstQuote = useMemo(() => {
    let rate = item.basePriceLkr * days * troupeQuantity;
    if (troupeQuantity >= 10) {
      rate *= 0.85; // 15% discount for 10+ dancers
    } else if (troupeQuantity >= 5) {
      rate *= 0.90; // 10% discount for 5+ dancers
    }
    return Math.round(rate);
  }, [item.basePriceLkr, days, troupeQuantity]);

  const whatsappMessage = encodeURIComponent(
    `Hello RIGA Dance Academy! 👋\n\nI would like to inquire about renting:\n` +
    `📌 *Item:* ${item.name} (${item.categoryLabel})\n` +
    `📏 *Size/Variant:* ${selectedSize}\n` +
    `🗓️ *Rental Duration:* ${days} Day(s)\n` +
    `👥 *Troupe Quantity:* ${troupeQuantity} Set(s)\n` +
    `💰 *Estimated Rate:* LKR ${totalEstQuote.toLocaleString()}\n\n` +
    `Could you please confirm availability for my performance date? Thank you!`
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] rounded-3xl bg-[#120722] border border-purple-600/50 shadow-[0_0_50px_rgba(168,85,247,0.4)] my-auto flex flex-col overflow-hidden"
      >
        {/* Modal Sticky Header with Close & Heart Buttons */}
        <div className="relative p-5 sm:p-6 border-b border-purple-900/50 shrink-0 flex items-start justify-between gap-4 bg-[#120722]/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3.5 min-w-0 pr-16">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-950 to-fuchsia-950 border border-purple-700/50 flex items-center justify-center text-3xl sm:text-4xl shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0">
              {item.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-purple-950 border border-purple-700 text-fuchsia-300">
                  {item.categoryLabel}
                </span>
                {item.highlight && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-fuchsia-950 border border-fuchsia-600 text-fuchsia-200">
                    🔥 {item.highlight}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Booking
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white truncate">
                {item.name}
              </h2>
            </div>
          </div>

          {/* Top Controls: Heart & Close */}
          <div className="absolute top-5 right-5 z-30 flex items-center gap-2">
            <button
              onClick={(e) => onToggleLike(e, item.id)}
              className={`p-2 sm:p-2.5 rounded-full border transition-all ${
                isLiked
                  ? "bg-fuchsia-600 text-white border-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.7)]"
                  : "bg-purple-950/80 text-purple-300 border-purple-800/60 hover:text-white hover:border-purple-500/80"
              }`}
              title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-purple-800/60 text-purple-300 hover:text-white transition-all"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-light">
            {item.description}
          </p>

          {/* Included Items & Suitable For Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {item.includedPieces && item.includedPieces.length > 0 && (
              <div className="p-4 rounded-xl bg-[#1a0b33]/80 border border-purple-900/50 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-fuchsia-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
                  Included Rental Pieces
                </h4>
                <ul className="space-y-1">
                  {item.includedPieces.map((piece, i) => (
                    <li key={i} className="text-xs text-purple-200/90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                      {piece}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.suitableFor && item.suitableFor.length > 0 && (
              <div className="p-4 rounded-xl bg-[#1a0b33]/80 border border-purple-900/50 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-fuchsia-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-fuchsia-400" />
                  Recommended For
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.suitableFor.map((use, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-800/60 text-purple-300">
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Rental Estimator Controls */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#1e0e38] to-purple-950/60 border border-purple-700/50 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Interactive Rental Estimator
              </h3>
              {troupeQuantity >= 5 && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-600 text-amber-300 flex items-center gap-1">
                  <BadgePercent className="w-3.5 h-3.5" />
                  {troupeQuantity >= 10 ? "15% Troupe Discount Applied!" : "10% Group Discount Applied!"}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Duration selector */}
              <div>
                <label className="text-xs font-medium text-purple-300/80 block mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  Duration
                </label>
                <select
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#120722] border border-purple-800 text-white text-xs font-semibold focus:outline-none focus:border-purple-500"
                >
                  <option value={1}>1 Day (Single Show)</option>
                  <option value={2}>2 Days (Shoot + Show)</option>
                  <option value={3}>3 Days (Weekend Event)</option>
                  <option value={7}>7 Days (Full Tour)</option>
                </select>
              </div>

              {/* Troupe Quantity selector */}
              <div>
                <label className="text-xs font-medium text-purple-300/80 block mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  Sets / Dancers
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTroupeQuantity(Math.max(1, troupeQuantity - 1))}
                    className="w-8 h-8 rounded-lg bg-purple-900/60 border border-purple-700 text-white font-bold text-sm hover:bg-purple-800 shrink-0"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 bg-[#120722] border border-purple-800 rounded-lg text-white font-bold text-xs flex-1 text-center">
                    {troupeQuantity} {troupeQuantity === 1 ? "Set" : "Sets"}
                  </span>
                  <button
                    onClick={() => setTroupeQuantity(troupeQuantity + 1)}
                    className="w-8 h-8 rounded-lg bg-purple-900/60 border border-purple-700 text-white font-bold text-sm hover:bg-purple-800 shrink-0"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Sizes selector */}
              {item.availableSizes && item.availableSizes.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-purple-300/80 block mb-1.5">
                    Size / Fit
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#120722] border border-purple-800 text-white text-xs font-semibold focus:outline-none focus:border-purple-500"
                  >
                    {item.availableSizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Total Estimated Rate Display */}
            <div className="pt-3 border-t border-purple-800/40 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-purple-300/80">Estimated Rental Total:</span>
              <div className="text-right">
                <span className="text-xl font-black text-fuchsia-300">
                  LKR {totalEstQuote.toLocaleString()}
                </span>
                <span className="text-[10px] text-purple-300/50 block">Refundable security deposit applies</span>
              </div>
            </div>
          </div>

          {/* Action Tabs & Inquiry Options */}
          <div className="space-y-4 pb-2">
            <div className="flex items-center gap-2 border-b border-purple-900/50 pb-2">
              <button
                onClick={() => setInquiryType("whatsapp")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  inquiryType === "whatsapp"
                    ? "bg-emerald-950 border border-emerald-600 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : "bg-purple-950/40 text-purple-300/60 hover:text-white"
                }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Instant WhatsApp Inquiry
              </button>
              <button
                onClick={() => setInquiryType("form")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  inquiryType === "form"
                    ? "bg-purple-900 border border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    : "bg-purple-950/40 text-purple-300/60 hover:text-white"
                }`}
              >
                <Send className="w-4 h-4 text-fuchsia-400" />
                Submit Reservation Form
              </button>
            </div>

            {inquiryType === "whatsapp" ? (
              <div className="space-y-3">
                <a
                  href={`https://wa.me/94777123456?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600 shrink-0" />
                  <span>Send WhatsApp Inquiry Now</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </a>
                <p className="text-[11px] text-center text-purple-300/60">
                  ⚡ Response time usually under 15 minutes during working hours (9 AM - 8 PM)
                </p>
              </div>
            ) : formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Inquiry Received!</h4>
                <p className="text-xs text-emerald-200">Our wardrobe master will contact you at {customerPhone} shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a0b33] border border-purple-800 text-white text-xs placeholder:text-purple-400/50 focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a0b33] border border-purple-800 text-white text-xs placeholder:text-purple-400/50 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a0b33] border border-purple-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                >
                  Submit Rental Inquiry Request
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RentalsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [likedItemIds, setLikedItemIds] = useState<string[]>([]);
  const [selectedModalItem, setSelectedModalItem] = useState<RentalItem | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: rentalItems.length };
    rentalItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered items logic
  const filteredItems = useMemo(() => {
    return rentalItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesTag = activeTag === "all" || item.highlight === activeTag;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.includedPieces && item.includedPieces.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [activeCategory, activeTag, searchQuery]);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedLikedItems = useMemo(() => {
    return rentalItems.filter((item) => likedItemIds.includes(item.id));
  }, [likedItemIds]);

  const handleBatchInquiryWhatsApp = () => {
    if (selectedLikedItems.length === 0) return;
    const itemNames = selectedLikedItems.map((i) => i.name).join(", ");
    const text = encodeURIComponent(
      `Hello RIGA Dance Academy! 👋\n\nI am interested in inquiring about multiple rental items:\n` +
      `📋 *Selected Items (${selectedLikedItems.length}):* ${itemNames}\n\n` +
      `Could you please let me know availability and multi-item package pricing?`
    );
    window.open(`https://wa.me/94777123456?text=${text}`, "_blank");
  };

  return (
    <section id="rentals" className="py-24 bg-[#080312] relative overflow-hidden scroll-mt-20">
      {/* Dynamic Background Glowing Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-700/50 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            <Sparkles className="w-4 h-4 text-fuchsia-400 animate-pulse" />
            RIGA Wardrobe & Stage Rentals Desk
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-6xl font-black uppercase text-white tracking-tight mb-4"
          >
            Costumes, Props & <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Accessories</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-purple-200/70 max-w-3xl mx-auto text-base sm:text-lg font-light leading-relaxed"
          >
            Rent premium stage costumes, authentic cultural regalia, LED props, and sparkling accessories tailored for dance productions, TV shows, and high-energy music videos.
          </motion.p>
        </div>

        {/* CONTROLS: CATEGORY TABS, QUICK TAG FILTERS & SEARCH */}
        <div className="space-y-6 mb-12">
          {/* Main Category Tabs */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:w-auto">
              {rentalCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-900 to-fuchsia-900 text-white border border-purple-500/80 shadow-[0_0_25px_rgba(168,85,247,0.45)] scale-105"
                        : "bg-[#140926]/90 text-purple-300/70 border border-purple-900/40 hover:border-purple-600/50 hover:text-white"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-fuchsia-500/30 text-fuchsia-200 border border-fuchsia-400/50"
                          : "bg-purple-950 text-purple-400/60"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Search Bar */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                type="text"
                placeholder="Search costumes, props, sizes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#140926] border border-purple-900/60 text-white text-xs placeholder:text-purple-400/50 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-purple-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Secondary Quick Tag Chips */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 border-t border-purple-900/30">
            <span className="text-xs text-purple-400/60 font-medium flex items-center gap-1 mr-2">
              <Filter className="w-3 h-3" /> Quick Filter:
            </span>
            {quickTagFilters.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setActiveTag(tag.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                  activeTag === tag.id
                    ? "bg-purple-900 border border-purple-500 text-fuchsia-200 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                    : "bg-[#140926]/60 border border-purple-900/40 text-purple-400/70 hover:text-white hover:border-purple-700/50"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS FEEDBACK BAR */}
        <div className="flex items-center justify-between text-xs text-purple-300/60 mb-6 px-1">
          <span>
            Showing <strong className="text-fuchsia-300 font-bold">{filteredItems.length}</strong> rental item(s)
          </span>
          {likedItemIds.length > 0 && (
            <span className="text-fuchsia-400 font-semibold flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-fuchsia-400" />
              {likedItemIds.length} item(s) in your Inquiry Bag
            </span>
          )}
        </div>

        {/* ITEMS GRID */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <RentalCard
                key={item.id}
                item={item}
                isLiked={likedItemIds.includes(item.id)}
                onToggleLike={toggleLike}
                onOpenModal={(selected) => setSelectedModalItem(selected)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* EMPTY STATE */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-[#140926]/50 rounded-3xl border border-purple-900/40 space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-3xl mx-auto">
              🔍
            </div>
            <h3 className="text-lg font-bold text-white">No rental items match your criteria</h3>
            <p className="text-purple-300/70 text-xs max-w-md mx-auto">
              Try adjusting your search query or reset your category filters to view all available wardrobe sets.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveTag("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-xl bg-purple-900 border border-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:bg-purple-800 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* BOTTOM TROUPE TAILORING & BULK RENTAL CTA BANNER */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#140926] via-[#1f0d3d] to-[#140926] border border-purple-700/50 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_50px_rgba(168,85,247,0.2)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="space-y-3 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/60 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkle className="w-3.5 h-3.5" />
              Bespoke Troupe Customization
            </div>
            <h4 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center md:justify-start gap-2">
              <HeartHandshake className="w-7 h-7 text-fuchsia-400" />
              Need Custom Troupe Costumes or Bulk Sets?
            </h4>
            <p className="text-xs sm:text-sm text-purple-200/70 max-w-xl font-light leading-relaxed">
              We offer custom costume stitching, color coordination for 50+ dancers, and long-term rental packages for school recitals, corporate galas & international tours.
            </p>
          </div>

          <a
            href="https://wa.me/94777123456?text=Hi%20RIGA%20Dance%20Academy%2C%20I%20need%20a%20custom%20troupe%20costume%20rental%20quote!"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(232,121,249,0.8)] transition-all transform hover:-translate-y-1 whitespace-nowrap flex items-center gap-2"
          >
            <span>Contact Wardrobe Desk</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* FLOATING WISHLIST / INQUIRY BAG BAR */}
      <AnimatePresence>
        {likedItemIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl p-4 rounded-2xl bg-[#17092e]/95 border border-fuchsia-500/70 backdrop-blur-xl shadow-[0_0_40px_rgba(232,121,249,0.5)] flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-fuchsia-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(232,121,249,0.6)]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span>{likedItemIds.length} Rental Item(s) Selected</span>
                  <span className="px-2 py-0.5 rounded-full bg-fuchsia-950 text-fuchsia-300 text-[10px] border border-fuchsia-700">
                    Inquiry Bag
                  </span>
                </h5>
                <p className="text-[11px] text-purple-300/70 line-clamp-1">
                  {selectedLikedItems.map((i) => i.name).join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setLikedItemIds([])}
                className="px-3 py-2 rounded-xl text-xs text-purple-300/70 hover:text-white hover:bg-purple-900/50 transition-all"
              >
                Clear
              </button>
              <button
                onClick={handleBatchInquiryWhatsApp}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire All</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK VIEW & RENTAL ESTIMATOR MODAL */}
      <AnimatePresence>
        {selectedModalItem && (
          <RentalDetailModal
            item={selectedModalItem}
            onClose={() => setSelectedModalItem(null)}
            isLiked={likedItemIds.includes(selectedModalItem.id)}
            onToggleLike={toggleLike}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
