"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, HeartPulse, Sparkles, AlertTriangle, ShieldCheck, Scale, Award } from "lucide-react";

export default function TermsOfServicePage() {
  const terms = [
    {
      icon: BookOpen,
      title: "1. Enrollment & Studio Membership",
      content:
        "Enrollment in RIGA Dance Academy classes is subject to availability, completion of the official registration form, and receipt of required tuition fees. Membership grants admission to designated training batches and studio sessions conducted by our certified faculty."
    },
    {
      icon: Clock,
      title: "2. Punctuality, Attendance & Studio Etiquette",
      content:
        "Students are expected to arrive 10 minutes before scheduled class times with suitable dance attire and non-marking dance footwear to preserve mirrored studio sprung floors. Food and sweet drinks are strictly prohibited inside the main dance halls; only capped water bottles are permitted."
    },
    {
      icon: Scale,
      title: "3. Tuition Fees & Cancellation Policy",
      content:
        "Tuition fees must be settled at the start of each month or term. Fees are non-refundable. Missed classes may only be rescheduled as makeup classes within the same calendar term upon advance written notice and valid medical certificate justification."
    },
    {
      icon: HeartPulse,
      title: "4. Physical Health & Injury Liability Waiver",
      content:
        "Dance training, acrobatics, and intensive choreography require rigorous physical exertion. By enrolling, students and guardians affirm that the participant is medically fit to undertake dance training. RIGA Dance Academy and its instructors operate under professional safety protocols, but are not liable for pre-existing medical complications or unavoidable accidents sustained during standard dance exercises."
    },
    {
      icon: Sparkles,
      title: "5. Costume Rentals & Production Wardrobe",
      content:
        "Wardrobe, traditional Ves ornaments, and costumes rented from RIGA Dance Academy must be returned on the agreed date in pristine condition. A refundable security deposit is required for all rentals. Any irreversible damage, tears, or lost components will result in forfeiture of the deposit and repair costs assessed accordingly."
    },
    {
      icon: Award,
      title: "6. Intellectual Property & Choreography Rights",
      content:
        "All original routines, stage choreography, custom music mixes, and artistic concepts created by RIGA Dance Academy instructors remain the intellectual property of RIGA Dance Academy. Students may not teach, sell, or commercially perform RIGA choreography outside academy sanction without prior written authorization."
    },
    {
      icon: AlertTriangle,
      title: "7. Code of Conduct & Right to Terminate",
      content:
        "RIGA Dance Academy fosters an inclusive, safe, and respectful environment for all ages. Any form of harassment, bullying, property vandalism, or repeated disruptive behavior may result in immediate suspension or termination of academy enrollment without tuition refund."
    },
    {
      icon: ShieldCheck,
      title: "8. Governing Law & Jurisdiction",
      content:
        "These Terms of Service are governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising in connection with academy services shall be subject to the exclusive jurisdiction of the courts of Colombo, Sri Lanka."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07020e] text-[#f8f5ff] relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 relative z-10">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:border-purple-500/60 hover:bg-purple-900/80 transition-all text-xs font-bold tracking-wider uppercase group shadow-[0_0_15px_rgba(168,85,247,0.15)]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-fuchsia-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
            <Scale className="w-4 h-4 text-fuchsia-400" />
            <span>Studio Policies & Rules</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-400 to-purple-500">Service</span>
          </h1>
          <p className="text-purple-200/70 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
            Welcome to RIGA Dance Academy. These terms outline the rules and guidelines ensuring an inspiring, disciplined, and safe environment for our dancers, crew, and studio visitors.
          </p>
          <p className="text-xs text-purple-400/60 mt-3 font-mono">
            Effective Date: October 2026 • Battaramulla, Sri Lanka
          </p>
        </motion.div>

        {/* Terms Articles Grid */}
        <div className="space-y-6">
          {terms.map((term, idx) => {
            const Icon = term.icon;
            return (
              <motion.article
                key={term.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 sm:p-8 rounded-3xl bg-[#110524]/70 border border-purple-500/25 hover:border-purple-500/50 transition-all backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] group hover:shadow-[0_8px_35px_rgba(168,85,247,0.15)]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.25)] group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-fuchsia-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-wide">
                      {term.title}
                    </h2>
                    <p className="text-purple-200/80 text-sm sm:text-base leading-relaxed font-light">
                      {term.content}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Contact / Enrollment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-purple-950/80 via-[#15062c]/90 to-fuchsia-950/70 border border-purple-500/40 text-center shadow-[0_10px_35px_rgba(168,85,247,0.25)]"
        >
          <h3 className="text-xl font-black uppercase text-white mb-2">Ready to Dance With Us?</h3>
          <p className="text-sm text-purple-200/70 max-w-md mx-auto mb-6">
            Review our upcoming class schedules or reach out directly to join Sri Lanka&apos;s premier dance academy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/enroll"
              className="px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Enroll Now
            </Link>
            <Link
              href="/privacy-policy"
              className="px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-purple-200 hover:text-white bg-purple-950/80 border border-purple-600/50 hover:border-purple-400 transition-all"
            >
              Read Privacy Policy
            </Link>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
