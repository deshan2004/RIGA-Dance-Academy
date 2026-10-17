"use client";

import React from "react";

// 1. KANDYAN TRADITIONAL: Authentic Geta Bera Drum with Gold Ropes & Royal Aura
export function KandyanDrumIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="kandyanGold" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="45%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <linearGradient id="kandyanWood" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7e22ce" />
          <stop offset="50%" stopColor="#3b0764" />
          <stop offset="100%" stopColor="#1e0538" />
        </linearGradient>
        <linearGradient id="kandyanGlow" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#facc15" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="kandyanRays" cx="32" cy="32" r="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#eab308" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Radial Aura */}
      <circle cx="32" cy="32" r="28" fill="url(#kandyanRays)" />

      {/* Royal Sparkle Accents */}
      <path d="M32 4L33.5 10L39.5 11.5L33.5 13L32 19L30.5 13L24.5 11.5L30.5 10L32 4Z" fill="#fde047" opacity="0.9" />
      <path d="M52 14L53 17L56 18L53 19L52 22L51 19L48 18L51 17L52 14Z" fill="#fde047" opacity="0.75" />
      <path d="M12 42L13 45L16 46L13 47L12 50L11 47L8 46L11 45L12 42Z" fill="#fde047" opacity="0.75" />

      {/* Drum Body - Tapered Geta Bera Silhouette */}
      <path
        d="M20 18C20 18 22 32 18 46C22 48 42 48 46 46C42 32 44 18 44 18C40 16 24 16 20 18Z"
        fill="url(#kandyanWood)"
        stroke="url(#kandyanGold)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Center Traditional Brass Waistband (Ves motif band) */}
      <path d="M19 32C24 33.5 40 33.5 45 32" stroke="url(#kandyanGold)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="32.5" r="2.5" fill="#fde047" stroke="#854d0e" strokeWidth="1" />
      <circle cx="25" cy="32.5" r="1.5" fill="#fde047" />
      <circle cx="39" cy="32.5" r="1.5" fill="#fde047" />

      {/* Top Head Rim & Skin */}
      <ellipse cx="32" cy="18" rx="12" ry="3.5" fill="#38104a" stroke="url(#kandyanGold)" strokeWidth="2" />
      <ellipse cx="32" cy="18" rx="8" ry="2" fill="#581c87" />

      {/* Bottom Head Rim & Skin */}
      <ellipse cx="32" cy="46" rx="14" ry="4" fill="#38104a" stroke="url(#kandyanGold)" strokeWidth="2" />
      <ellipse cx="32" cy="46" rx="9" ry="2.2" fill="#581c87" />

      {/* Traditional Criss-Cross Warapata Tension Ropes */}
      <path
        d="M22 19L32 46M28 18.5L38 46M36 18.5L26 46M42 19L32 46"
        stroke="#fef08a"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Tension Tuning Rings (Kandyan Weni) */}
      <circle cx="27" cy="27" r="1.8" fill="#ca8a04" stroke="#fde047" strokeWidth="0.8" />
      <circle cx="37" cy="27" r="1.8" fill="#ca8a04" stroke="#fde047" strokeWidth="0.8" />
      <circle cx="29" cy="38" r="1.8" fill="#ca8a04" stroke="#fde047" strokeWidth="0.8" />
      <circle cx="35" cy="38" r="1.8" fill="#ca8a04" stroke="#fde047" strokeWidth="0.8" />

      {/* Shoulder Strap Rings */}
      <path d="M44 26C47 28 47 36 44 38" stroke="url(#kandyanGold)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// 2. PAHATHARATA LOW-COUNTRY: Ritual Pandam Fire Torch & Devil Dance Flames
export function PahatharataTorchIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="fireOuter" x1="32" y1="4" x2="32" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="40%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="fireCore" x1="32" y1="12" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="torchHandle" x1="26" y1="34" x2="38" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="50%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
        <radialGradient id="torchAura" cx="32" cy="20" r="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#f97316" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Flame Heat Aura */}
      <circle cx="32" cy="22" r="22" fill="url(#torchAura)" />

      {/* Sparks & Flying Embers */}
      <circle cx="18" cy="14" r="1.5" fill="#fde047" opacity="0.85" />
      <circle cx="46" cy="10" r="2" fill="#fb923c" opacity="0.9" />
      <circle cx="48" cy="24" r="1.2" fill="#fde047" opacity="0.7" />
      <circle cx="15" cy="26" r="1.2" fill="#fb923c" opacity="0.8" />
      <circle cx="38" cy="4" r="1.5" fill="#fde047" opacity="0.95" />

      {/* Outer Ritual Flame */}
      <path
        d="M32 4C35 10 46 16 45 27C44.5 33 39 36 32 36C25 36 19.5 33 19 27C18 16 29 10 32 4Z"
        fill="url(#fireOuter)"
        filter="drop-shadow(0 0 6px rgba(249,115,22,0.8))"
      />

      {/* Secondary Dynamic Flickering Licks */}
      <path
        d="M32 9C37 15 42 20 40 28C38 32 35 34 32 34C29 34 26 32 24 28C22 20 27 15 32 9Z"
        fill="url(#fireCore)"
      />

      {/* Intense White-Hot Core */}
      <path
        d="M32 16C34 20 37 23 36 28C35 30 33.5 31.5 32 31.5C30.5 31.5 29 30 28 28C27 23 30 20 32 16Z"
        fill="#ffffff"
        opacity="0.9"
      />

      {/* Traditional Pandam Torch Cup (Sri Lankan brass brassier) */}
      <path
        d="M20 34C20 34 23 42 32 42C41 42 44 34 44 34L41 32H23L20 34Z"
        fill="#f59e0b"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* Decorative Traditional Carved Bands */}
      <path d="M22 36C26 38.5 38 38.5 42 36" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="38" r="1.5" fill="#fef08a" />

      {/* Torch Shaft / Pole Handle with ritual wraps */}
      <path
        d="M29 42L28 58C28 59 29 60 30 60H34C35 60 36 59 36 58L35 42H29Z"
        fill="url(#torchHandle)"
        stroke="#b45309"
        strokeWidth="1.2"
      />
      <line x1="28.5" y1="46" x2="35.5" y2="46" stroke="#fbbf24" strokeWidth="1.2" />
      <line x1="28.2" y1="51" x2="35.8" y2="51" stroke="#fbbf24" strokeWidth="1.2" />
      <line x1="28" y1="56" x2="36" y2="56" stroke="#fbbf24" strokeWidth="1.2" />
    </svg>
  );
}

// 3. SABARAGAMUWA DANCE: Sacred Davula Drum & Mystic Celestial Star
export function SabaragamuwaDavulaIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="davulaBrass" x1="18" y1="20" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="50%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
        <linearGradient id="davulaPurple" x1="32" y1="18" x2="32" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="50%" stopColor="#581c87" />
          <stop offset="100%" stopColor="#2e1065" />
        </linearGradient>
        <radialGradient id="davulaSpark" cx="32" cy="32" r="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6b21a8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Celestial Mystic Halo */}
      <circle cx="32" cy="32" r="28" fill="url(#davulaSpark)" />

      {/* 8-Point Sacred Temple Starlight Motifs */}
      <g opacity="0.9">
        <path d="M32 4L33.5 10L39.5 11.5L33.5 13L32 19L30.5 13L24.5 11.5L30.5 10L32 4Z" fill="#fde047" />
        <path d="M50 24L51 27L54 28L51 29L50 32L49 29L46 28L49 27L50 24Z" fill="#c084fc" />
        <path d="M14 24L15 27L18 28L15 29L14 32L13 29L10 28L13 27L14 24Z" fill="#c084fc" />
      </g>

      {/* Straight Cylindrical Davula Drum Body */}
      <rect
        x="21"
        y="22"
        width="22"
        height="24"
        rx="2"
        fill="url(#davulaPurple)"
        stroke="url(#davulaBrass)"
        strokeWidth="1.8"
      />

      {/* Vertical Brass Reinforcement Ribs & Cords */}
      <line x1="25" y1="22" x2="25" y2="46" stroke="#fde047" strokeWidth="1.2" opacity="0.8" />
      <line x1="29" y1="22" x2="29" y2="46" stroke="#fde047" strokeWidth="1.2" opacity="0.9" />
      <line x1="35" y1="22" x2="35" y2="46" stroke="#fde047" strokeWidth="1.2" opacity="0.9" />
      <line x1="39" y1="22" x2="39" y2="46" stroke="#fde047" strokeWidth="1.2" opacity="0.8" />

      {/* Top Davula Drum Skin Rim */}
      <ellipse cx="32" cy="22" rx="12" ry="4" fill="#a855f7" stroke="url(#davulaBrass)" strokeWidth="2" />
      <ellipse cx="32" cy="22" rx="7" ry="2.2" fill="#e9d5ff" opacity="0.8" />

      {/* Bottom Drum Rim */}
      <ellipse cx="32" cy="46" rx="12" ry="4" fill="#581c87" stroke="url(#davulaBrass)" strokeWidth="2" />

      {/* Ceremonial Curved Drumstick (Kadippu) in dynamic angle */}
      <path
        d="M45 14C43 14 36 20 38 27L42 28C41 22 47 17 48 16C49 15 48 14 45 14Z"
        fill="#fde047"
        stroke="#ca8a04"
        strokeWidth="1.2"
        filter="drop-shadow(0 0 5px rgba(250,204,21,0.6))"
      />
      <circle cx="38" cy="27" r="2.5" fill="#facc15" stroke="#a16207" strokeWidth="1" />

      {/* Decorative Hanging Silk Tassels */}
      <path d="M21 48L19 55M43 48L45 55" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="19" cy="56" r="1.5" fill="#fde047" />
      <circle cx="45" cy="56" r="1.5" fill="#fde047" />
    </svg>
  );
}

// 4. URBAN HIP-HOP: Pro Studio DJ Headphones & Equalizer Neon Waves
export function UrbanHipHopIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="hiphopHeadband" x1="14" y1="10" x2="50" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="eqGlow" x1="16" y1="56" x2="48" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <radialGradient id="hiphopAura" cx="32" cy="30" r="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Neon Glow */}
      <circle cx="32" cy="30" r="26" fill="url(#hiphopAura)" />

      {/* Headband Arch */}
      <path
        d="M16 34C16 20 22 10 32 10C42 10 48 20 48 34"
        stroke="url(#hiphopHeadband)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Top Headband Cushion */}
      <path
        d="M22 17C26 14.5 38 14.5 42 17"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Left Ear Cushion */}
      <rect
        x="11"
        y="30"
        width="8"
        height="18"
        rx="4"
        fill="#0f172a"
        stroke="#06b6d4"
        strokeWidth="2"
        filter="drop-shadow(0 0 6px rgba(6,182,212,0.7))"
      />
      <circle cx="15" cy="39" r="2" fill="#22d3ee" />

      {/* Right Ear Cushion */}
      <rect
        x="45"
        y="30"
        width="8"
        height="18"
        rx="4"
        fill="#0f172a"
        stroke="#8b5cf6"
        strokeWidth="2"
        filter="drop-shadow(0 0 6px rgba(139,92,246,0.7))"
      />
      <circle cx="49" cy="39" r="2" fill="#c084fc" />

      {/* Dynamic Audio Equalizer Beat Waves */}
      <g filter="drop-shadow(0 0 4px rgba(34,211,238,0.8))">
        <rect x="23" y="44" width="3" height="12" rx="1.5" fill="#06b6d4" />
        <rect x="28" y="38" width="3" height="18" rx="1.5" fill="#38bdf8" />
        <rect x="33" y="34" width="3" height="22" rx="1.5" fill="#c084fc" />
        <rect x="38" y="40" width="3" height="16" rx="1.5" fill="#e879f9" />
      </g>

      {/* Electric Lightning Accent */}
      <path
        d="M32 18L30 24H33L31 30L36 23H33L35 18H32Z"
        fill="#facc15"
        filter="drop-shadow(0 0 4px rgba(250,204,21,0.9))"
      />
    </svg>
  );
}

// 5. CONTEMPORARY FLOW: Lyrical Silk Ribbon & Fluid Stage Motion
export function ContemporaryFlowIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="flowRibbon" x1="10" y1="12" x2="54" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="45%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <radialGradient id="flowGlow" cx="32" cy="32" r="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ethereal Glow Backing */}
      <circle cx="32" cy="32" r="26" fill="url(#flowGlow)" />

      {/* Twinkling Stage Dust */}
      <circle cx="18" cy="18" r="1.5" fill="#fbcfe8" opacity="0.9" />
      <circle cx="48" cy="14" r="2" fill="#f472b6" opacity="0.95" />
      <circle cx="50" cy="42" r="1.2" fill="#fbcfe8" opacity="0.8" />
      <circle cx="14" cy="46" r="1.8" fill="#e879f9" opacity="0.85" />

      {/* Graceful Fluid Dancing Figure Silhouette */}
      <g fill="#fdf2f8" filter="drop-shadow(0 0 6px rgba(244,114,182,0.8))">
        {/* Head */}
        <circle cx="34" cy="14" r="3.5" />
        {/* Arched Body & Extended Lyrical Legs */}
        <path d="M33 18C33 22 35 28 32 35C29 42 22 48 18 52C21 50 28 43 33 36C36 31 38 25 36 18H33Z" />
        <path d="M33 35C35 40 40 46 47 48C44 45 40 40 37 34L33 35Z" />
        {/* Graceful Arms Reaching */}
        <path d="M34 20C38 18 44 16 50 14C45 18 40 22 35 23L34 20Z" />
        <path d="M32 20C28 19 22 20 16 23C21 23 26 23 31 23L32 20Z" />
      </g>

      {/* Spiraling Silk Dance Ribbon with Gradient Trail */}
      <path
        d="M12 28C14 18 28 10 38 14C48 18 52 28 46 38C40 48 24 52 16 44C8 36 18 24 30 26C42 28 48 38 52 48"
        stroke="url(#flowRibbon)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        filter="drop-shadow(0 0 5px rgba(236,72,153,0.7))"
      />
      <path
        d="M18 26C24 16 38 14 44 22"
        stroke="#ffffff"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
        fill="none"
      />
    </svg>
  );
}

// 6. LATIN & BALLROOM: Passionate Salsa Rhythm & Fiery Elegance
export function LatinBallroomIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="latinGrad" x1="14" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="40%" stopColor="#e11d48" />
          <stop offset="80%" stopColor="#be123c" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <radialGradient id="latinGlow" cx="32" cy="32" r="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#881337" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Passion Crimson Glow */}
      <circle cx="32" cy="32" r="26" fill="url(#latinGlow)" />

      {/* Rhythm Sparks & Gold Accents */}
      <circle cx="16" cy="18" r="1.5" fill="#fde047" opacity="0.9" />
      <circle cx="48" cy="18" r="1.8" fill="#fbbf24" opacity="0.85" />
      <circle cx="16" cy="46" r="1.5" fill="#fb7185" opacity="0.8" />
      <circle cx="48" cy="46" r="2" fill="#fde047" opacity="0.95" />

      {/* Swirling Ballroom & Salsa Dress Ruffles */}
      <path
        d="M26 28C22 34 16 42 16 48C18 52 30 54 36 52C44 50 50 44 48 38C46 32 38 28 34 26L26 28Z"
        fill="url(#latinGrad)"
        filter="drop-shadow(0 0 8px rgba(244,63,94,0.7))"
      />
      {/* Tiered Dress Swirl Petals */}
      <path
        d="M20 44C26 47 38 47 44 42"
        stroke="#fde047"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 38C28 41 36 41 40 37"
        stroke="#fef08a"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Elegant Female Salsa Dancer Torso & Arm Flare */}
      <g fill="#ffe4e6">
        {/* Head */}
        <circle cx="30" cy="14" r="3.2" />
        {/* Flower in Hair */}
        <circle cx="33" cy="13" r="1.8" fill="#f43f5e" />
        {/* Arching Back */}
        <path d="M29 18C31 22 32 26 29 30C32 30 35 28 35 24C35 20 33 18 29 18Z" />
        {/* High Dramatic Arm Extension */}
        <path d="M31 19C34 16 38 12 43 8C41 12 38 16 34 20L31 19Z" />
        <path d="M28 20C24 18 19 19 14 22C18 22 23 21 27 22L28 20Z" />
      </g>

      {/* Sparkling Passion Flame Motif */}
      <path
        d="M48 20L49 23L52 24L49 25L48 28L47 25L44 24L47 23L48 20Z"
        fill="#fde047"
        filter="drop-shadow(0 0 4px rgba(253,224,71,0.9))"
      />
    </svg>
  );
}

// Master Render Component for Dance Styles
export function DanceStyleIcon({
  styleId,
  className = "w-8 h-8",
}: {
  styleId: string;
  className?: string;
}) {
  switch (styleId) {
    case "Kandyan Traditional":
      return <KandyanDrumIcon className={className} />;
    case "Pahatharata Low-Country":
      return <PahatharataTorchIcon className={className} />;
    case "Sabaragamuwa Dance":
      return <SabaragamuwaDavulaIcon className={className} />;
    case "Urban Hip-Hop":
      return <UrbanHipHopIcon className={className} />;
    case "Contemporary Flow":
      return <ContemporaryFlowIcon className={className} />;
    case "Latin & Ballroom":
      return <LatinBallroomIcon className={className} />;
    default:
      return <KandyanDrumIcon className={className} />;
  }
}
