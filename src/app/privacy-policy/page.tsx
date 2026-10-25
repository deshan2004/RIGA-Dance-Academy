"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Bell, Users, Mail, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Users,
      title: "1. Information We Collect",
      content:
        "When you enroll in dance programs, rent studio halls, or submit inquiries through RIGA Dance Academy, we may collect personal details including student full name, date of birth, contact number, email address, residential address, emergency contact details, preferred dance styles, and any relevant physical injury or health notes to ensure physical dance safety in class."
    },
    {
      icon: Bell,
      title: "2. How We Use Your Information",
      content:
        "Your details are strictly utilized to manage course schedules, send studio announcements, process enrollment verification, generate official student IDs, organize recital performances, and provide critical updates regarding masterclasses, faculty changes, or weather-related studio closures."
    },
    {
      icon: Eye,
      title: "3. Media, Photography & Performance Filming",
      content:
        "Dance training, recitals, and workshop sessions may occasionally be photographed or filmed for educational technique reviews, performance showcases, and RIGA Dance Academy official social media or archives. Students and parents have the right to request media exclusion by notifying academy administration in writing."
    },
    {
      icon: Lock,
      title: "4. Data Security & Storage",
      content:
        "We implement industry-grade encryption and access-controlled databases to safeguard your personal data. We do not sell, rent, or trade student or guardian contact details to any third-party marketing agencies or commercial entities under any circumstances."
    },
    {
      icon: FileText,
      title: "5. Third-Party Service Providers",
      content:
        "We may engage secure, trusted service partners (such as transactional email providers, verification gateways, and cloud hosting infrastructure) strictly to execute essential operational functions. These providers are bound by strict non-disclosure obligations."
    },
    {
      icon: CheckCircle2,
      title: "6. Your Rights & Access",
      content:
        "You retain the right to inspect, correct, or request the deletion of your personal records from our active academy registry at any time, subject to legal record retention requirements for financial and child-safety compliance in Sri Lanka."
    },
    {
      icon: Mail,
      title: "7. Contact Privacy Officer",
      content:
        "For any privacy inquiries, data rectification requests, or questions regarding this Privacy Policy, please reach our administration at inforigadance@gmail.com or visit our Battaramulla studio office."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07020e] text-[#f8f5ff] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 relative z-10">
        
        {/* Back to Home Button */}
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
            <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
            <span>Legal & Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-400 to-purple-500">Policy</span>
          </h1>
          <p className="text-purple-200/70 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
            At RIGA Dance Academy, we value your trust. This Privacy Policy details how we handle student records, guardian communications, and multimedia with transparency and high-level protection.
          </p>
          <p className="text-xs text-purple-400/60 mt-3 font-mono">
            Last Updated: October 2026 • Battaramulla, Sri Lanka
          </p>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.article
                key={section.title}
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
                      {section.title}
                    </h2>
                    <p className="text-purple-200/80 text-sm sm:text-base leading-relaxed font-light">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Contact Help Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-purple-950/80 via-[#15062c]/90 to-fuchsia-950/70 border border-purple-500/40 text-center shadow-[0_10px_35px_rgba(168,85,247,0.25)]"
        >
          <h3 className="text-xl font-black uppercase text-white mb-2">Have Questions About Your Data?</h3>
          <p className="text-sm text-purple-200/70 max-w-md mx-auto mb-6">
            Our academy management desk is here to clarify any aspect of our privacy standards.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Contact Academy Desk
            </Link>
            <Link
              href="/terms-of-service"
              className="px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-purple-200 hover:text-white bg-purple-950/80 border border-purple-600/50 hover:border-purple-400 transition-all"
            >
              View Terms of Service
            </Link>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
