"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, User as UserIcon, Mail, Settings, Phone, LogOut,
  CreditCard, Video, Bell, Clock, MapPin, Sparkles, FileText, Check, Copy,
  Play, Building, Eye, ShieldCheck, X, ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Enrollment {
  _id: string;
  preferred_style?: string;
  student_name?: string;
  age?: number;
  email?: string;
  phone?: string;
  location?: string;
  preferred_branch?: string;
  skill_level?: string;
  payment_slip?: string;
  payment_slip_name?: string;
  transaction_ref?: string;
  status?: string;
  createdAt?: unknown;
  [key: string]: unknown;
}

interface UserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: string;
  [key: string]: unknown;
}

const MOCK_PRACTICE_VIDEOS = [
  {
    id: "1",
    title: "Kandyan Traditional - Fundamental Footwork & Thaithom Exercises",
    style: "Kandyan Traditional",
    duration: "18 mins",
    instructor: "Guru K. Jayawardena",
    thumbnail: "https://images.unsplash.com/photo-1542838686-37ed7a956140?auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    desc: "Master the foundational posture, hand movements (Hastaha), and rhythmic footwork patterns for Kandyan dance.",
  },
  {
    id: "2",
    title: "Urban Hip-Hop - Groove Isolation & Stage Choreography #1",
    style: "Urban Hip-Hop",
    duration: "15 mins",
    instructor: "Alex V. (Street Dance Director)",
    thumbnail: "https://images.unsplash.com/photo-1535525153412-5a42439a6e0c?auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    desc: "Step-by-step breakdown of isolation drills, bounces, and high-energy stage choreography.",
  },
  {
    id: "3",
    title: "Low-Country Pahatharata - Traditional Mask Ritual Rhythm",
    style: "Pahatharata Low-Country",
    duration: "22 mins",
    instructor: "Gurunnanse P. Silva",
    thumbnail: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    desc: "Authentic low-country footwork, body sway, and traditional drum rhythm synchronization.",
  },
  {
    id: "4",
    title: "Contemporary Flow - Fluid Transitions & Floorwork Routine",
    style: "Contemporary Flow",
    duration: "20 mins",
    instructor: "Maya S.",
    thumbnail: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    desc: "Lyrical floor transitions, emotional expression, and breath-control movement exercises.",
  },
];

const MOCK_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "RIGA Annual Grand Stage Showcase 2026 - Rehearsal Schedule",
    tag: "IMPORTANT EVENT",
    tagColor: "bg-fuchsia-950 text-fuchsia-300 border-fuchsia-700/60",
    date: "October 15, 2026",
    desc: "All approved students across Colombo & Kandy studios are requested to attend the main stage rehearsal on Saturday at Nelum Pokuna Theatre.",
  },
  {
    id: "ann-2",
    title: "Masterclass with Guest International Hip-Hop Choreographer",
    tag: "SPECIAL WORKSHOP",
    tagColor: "bg-purple-950 text-purple-300 border-purple-700/60",
    date: "November 02, 2026",
    desc: "Exclusive 2-day urban street dance workshop for RIGA academy members. Limited slots available.",
  },
  {
    id: "ann-3",
    title: "Monthly Bank Deposit Receipt Submission Reminder",
    tag: "ACADEMY NOTICE",
    tagColor: "bg-amber-950 text-amber-300 border-amber-700/60",
    date: "Monthly Reminder",
    desc: "Please ensure your monthly class fee bank deposit slips are uploaded to the Payments section of your student portal by the 5th of every month.",
  },
];

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<"classes" | "payments" | "videos" | "announcements" | "profile">("classes");
  
  // Dynamic Videos & Announcements state
  const [practiceVideos, setPracticeVideos] = useState<typeof MOCK_PRACTICE_VIDEOS>(MOCK_PRACTICE_VIDEOS);
  const [announcementsList, setAnnouncementsList] = useState<typeof MOCK_ANNOUNCEMENTS>(MOCK_ANNOUNCEMENTS);

  // Profile form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+94");
  const [phone, setPhone] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });

  // Modal / Preview state
  const [activeVideo, setActiveVideo] = useState<(typeof MOCK_PRACTICE_VIDEOS)[0] | null>(null);
  const [viewSlipImage, setViewSlipImage] = useState<string | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const router = useRouter();

  const fetchMyEnrollments = async (email: string | null) => {
    if (!email) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/enroll/user?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.success) {
        setEnrollments(data.data);
      }
    } catch (error) {
      console.error("Error fetching my enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const resV = await fetch("/api/videos");
        const dataV = await resV.json();
        if (isMounted && dataV.success && Array.isArray(dataV.data) && dataV.data.length > 0) {
          setPracticeVideos(dataV.data);
        }
      } catch {}

      try {
        const resA = await fetch("/api/announcements");
        const dataA = await resA.json();
        if (isMounted && dataA.success && Array.isArray(dataA.data) && dataA.data.length > 0) {
          setAnnouncementsList(dataA.data);
        }
      } catch {}
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCurrentUser(user);
        try {
          // Check if admin or if account is approved
          let data: Record<string, unknown> | null = null;
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            data = userDoc.data();
          } else if (user.email) {
            const q = query(collection(db, "users"), where("email", "==", user.email));
            const qSnap = await getDocs(q);
            if (!qSnap.empty) {
              data = qSnap.docs[0].data();
            }
          }

          const roleVal = typeof data?.role === "string" ? data.role : "";
          if (roleVal.toLowerCase() === "admin") {
            router.push("/admin");
            return;
          }

          const statusVal = typeof data?.status === "string" ? data.status : "";
          const uStatus = statusVal.toLowerCase();
          let isApproved = uStatus === "approved" || uStatus === "approval";

          // Double check with enrollment status
          if (!isApproved && user.email) {
            try {
              const res = await fetch(`/api/enroll/user?email=${encodeURIComponent(user.email)}`);
              const enrollData = await res.json();
              if (enrollData.success && Array.isArray(enrollData.data)) {
                isApproved = enrollData.data.some((item: { status?: string }) => {
                  const s = item.status?.toLowerCase();
                  return s === "approved" || s === "approval";
                });
              }
            } catch (err) {
              console.error("Error checking user approval:", err);
            }
          }

          if (!isApproved) {
            // Force sign out and redirect unapproved user
            await auth.signOut();
            router.push("/login?error=pending_approval");
            return;
          }

          if (data) {
            setUserData(data);
            const fName = typeof data.firstName === "string" ? data.firstName : "";
            const lName = typeof data.lastName === "string" ? data.lastName : "";
            setFirstName(fName);
            setLastName(lName);
            
            const fullPhone = typeof data.phone === "string" ? data.phone : "";
            if (fullPhone.startsWith("+") && fullPhone.includes(" ")) {
              const spaceIndex = fullPhone.indexOf(" ");
              setCountryCode(fullPhone.substring(0, spaceIndex));
              setPhone(fullPhone.substring(spaceIndex + 1));
            } else {
              setPhone(fullPhone);
            }
          }

          fetchMyEnrollments(user.email);
        } catch (error) {
          console.error(error);
          fetchMyEnrollments(user.email);
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "approval":
        return "bg-green-950/80 text-green-300 border-green-500/50 shadow-[0_0_12px_rgba(34,197,94,0.3)]";
      case "rejected":
        return "bg-red-950/80 text-red-300 border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.3)]";
      default:
        return "bg-yellow-950/80 text-yellow-300 border-yellow-500/50 shadow-[0_0_12px_rgba(234,179,8,0.3)]";
    }
  };

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setUpdating(true);
    setUpdateMessage({ type: "", text: "" });
    
    try {
      await updateDoc(doc(db, "users", currentUser.uid), {
        firstName,
        lastName,
        phone: `${countryCode} ${phone}`
      });
      setUserData({ ...userData, firstName, lastName, phone: `${countryCode} ${phone}` });
      setUpdateMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setUpdateMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateMessage({ type: "error", text: "Failed to update profile." });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07030e] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07030e] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-purple-900/15 via-fuchsia-900/10 to-transparent rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* TOP USER HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 p-6 rounded-3xl bg-[#120726]/80 border border-purple-900/50 backdrop-blur-xl shadow-[0_0_50px_rgba(9,4,16,0.8)]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 border border-purple-800 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              Verified Student Portal
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-wide text-white">
              My Student <span className="text-metallic-purple">Dashboard</span>
            </h1>
            <p className="text-purple-200/70 text-xs sm:text-sm font-light mt-1">
              Welcome back, <span className="font-bold text-white">{userData?.firstName || "Student"}</span>! Access your schedule, payment receipts, and video lessons.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#080312] border border-purple-900/60 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-inner">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-black text-lg shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                {(userData?.firstName?.charAt(0) || currentUser?.email?.charAt(0))?.toUpperCase()}
              </div>
              <div className="truncate max-w-[180px]">
                <p className="text-[10px] text-purple-400 uppercase font-bold tracking-wider">Logged in as</p>
                <p className="font-semibold text-xs text-white truncate">{currentUser?.email}</p>
              </div>
            </div>

            <button
              onClick={() => {
                auth.signOut();
                router.push("/login");
              }}
              className="p-3.5 bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-800/60 rounded-2xl transition-all shadow-md hover:shadow-red-900/40"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="flex overflow-x-auto gap-2 mb-8 p-1.5 bg-[#080312] border border-purple-900/60 rounded-2xl scrollbar-none">
          
          {/* Tab 1: Classes & Schedule */}
          <button
            onClick={() => setActiveTab("classes")}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "classes"
                ? "bg-gradient-to-r from-purple-700 to-fuchsia-700 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-fuchsia-400/40"
                : "text-purple-300/70 hover:text-white hover:bg-purple-950/40"
            }`}
          >
            <Calendar className="w-4 h-4 text-fuchsia-300" />
            <span>1. My Classes & Schedule</span>
          </button>

          {/* Tab 2: Payments & Slip History */}
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "payments"
                ? "bg-gradient-to-r from-purple-700 to-fuchsia-700 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-fuchsia-400/40"
                : "text-purple-300/70 hover:text-white hover:bg-purple-950/40"
            }`}
          >
            <CreditCard className="w-4 h-4 text-fuchsia-300" />
            <span>2. Bank Deposit & Slips</span>
          </button>

          {/* Tab 3: Practice Videos */}
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "videos"
                ? "bg-gradient-to-r from-purple-700 to-fuchsia-700 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-fuchsia-400/40"
                : "text-purple-300/70 hover:text-white hover:bg-purple-950/40"
            }`}
          >
            <Video className="w-4 h-4 text-fuchsia-300" />
            <span>3. Practice Videos & Lessons</span>
          </button>

          {/* Tab 4: Announcements */}
          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "announcements"
                ? "bg-gradient-to-r from-purple-700 to-fuchsia-700 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-fuchsia-400/40"
                : "text-purple-300/70 hover:text-white hover:bg-purple-950/40"
            }`}
          >
            <Bell className="w-4 h-4 text-fuchsia-300" />
            <span>4. Announcements</span>
          </button>

          {/* Tab 5: Profile */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-purple-700 to-fuchsia-700 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-fuchsia-400/40"
                : "text-purple-300/70 hover:text-white hover:bg-purple-950/40"
            }`}
          >
            <Settings className="w-4 h-4 text-fuchsia-300" />
            <span>My Profile</span>
          </button>
        </div>

        {/* TAB CONTENTS */}

        {/* ========================================================= */}
        {/* TAB 1: MY CLASSES & TIMETABLE SCHEDULE */}
        {/* ========================================================= */}
        {activeTab === "classes" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-wider text-white">Enrolled Dance Classes</h2>
                <p className="text-xs text-purple-300/70 font-light">Your approved class registrations & studio timetable</p>
              </div>
              <Link
                href="/enroll"
                className="py-2.5 px-5 rounded-xl bg-purple-950 border border-purple-700 hover:border-fuchsia-400 text-fuchsia-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                <span>Enroll in Another Class</span>
              </Link>
            </div>

            {enrollments.length === 0 ? (
              <div className="bg-[#120726]/80 border border-purple-900/60 rounded-3xl p-12 text-center shadow-xl">
                <div className="w-16 h-16 bg-purple-950 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-800">
                  <Calendar className="w-8 h-8 text-fuchsia-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">No Active Enrollments Found</h3>
                <p className="text-xs text-purple-300/70 mb-6 max-w-md mx-auto">
                  You haven&apos;t joined any dance classes yet. Browse our traditional and modern choreography programs to start learning!
                </p>
                <Link
                  href="/enroll"
                  className="inline-flex items-center gap-2 py-3 px-8 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                >
                  Browse Dance Programs
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrollments.map((enrollment, index) => (
                  <motion.div
                    key={enrollment._id || index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#120726]/90 border border-purple-900/60 rounded-3xl p-6 shadow-[0_0_30px_rgba(9,4,16,0.9)] relative overflow-hidden group hover:border-purple-600/70 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-[10px] text-purple-400 uppercase font-bold tracking-widest block mb-1">
                          Enrolled Program
                        </span>
                        <h3 className="text-xl font-black text-white group-hover:text-fuchsia-300 transition-colors uppercase tracking-wide">
                          {enrollment.preferred_style || "Dance Class"}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(enrollment.status || "pending")}`}>
                        {(enrollment.status || "PENDING").toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-purple-900/50 text-xs text-purple-200/90">
                      <div className="flex items-center gap-3">
                        <UserIcon className="w-4 h-4 text-fuchsia-400 shrink-0" />
                        <span>Student: <strong className="text-white">{enrollment.student_name}</strong> ({enrollment.age} yrs)</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-fuchsia-400 shrink-0" />
                        <span>Branch & Session: <strong className="text-white">{enrollment.preferred_branch || "Colombo Main Studio"}</strong></span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-fuchsia-400 shrink-0" />
                        <span>Schedule: <strong className="text-white">Saturdays & Sundays (10:00 AM – 12:00 PM)</strong></span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Building className="w-4 h-4 text-fuchsia-400 shrink-0" />
                        <span>Studio Hall: <strong className="text-white">Studio Hall A (Main Stage Floor)</strong></span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-purple-900/50 flex items-center justify-between text-[11px]">
                      <span className="text-purple-400/80 font-medium">Instructor: Guru K. Jayawardena</span>
                      <button
                        onClick={() => setActiveTab("videos")}
                        className="text-fuchsia-400 font-bold hover:text-fuchsia-300 flex items-center gap-1 transition-colors"
                      >
                        <span>Access Practice Lessons</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: BANK DEPOSIT & SLIP VERIFICATION HISTORY */}
        {/* ========================================================= */}
        {activeTab === "payments" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-wider text-white">Bank Payment & Deposit Slips</h2>
              <p className="text-xs text-purple-300/70 font-light">View submitted bank deposit verification slips & payment records</p>
            </div>

            {/* OFFICIAL BANK DETAILS BOX WITH COPY */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#190933] via-[#240b49] to-[#190933] border border-purple-700/60 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-800/50">
                <div className="flex items-center gap-2 text-fuchsia-300 font-extrabold text-xs uppercase tracking-wider">
                  <Building className="w-4 h-4 text-fuchsia-400" />
                  Official RIGA Bank Details for Monthly Fees
                </div>
                <button
                  onClick={() => handleCopyAccount("800293841029")}
                  className="px-3 py-1 rounded-full bg-purple-950 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-800 text-[10px] font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedAccount ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAccount ? "Copied Account!" : "Copy Account No."}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#080312]/80 p-3.5 rounded-2xl border border-purple-900/60">
                  <span className="text-purple-400/70 block text-[10px] uppercase font-bold mb-1">Bank Name</span>
                  <span className="text-white font-bold">Commercial Bank of Ceylon</span>
                </div>
                <div className="bg-[#080312]/80 p-3.5 rounded-2xl border border-purple-900/60">
                  <span className="text-purple-400/70 block text-[10px] uppercase font-bold mb-1">Account Holder</span>
                  <span className="text-white font-bold">RIGA Dance Academy Ltd</span>
                </div>
                <div className="bg-[#080312]/80 p-3.5 rounded-2xl border border-purple-900/60">
                  <span className="text-purple-400/70 block text-[10px] uppercase font-bold mb-1">Account Number</span>
                  <span className="text-fuchsia-300 font-black tracking-wider">8002 9384 1029</span>
                </div>
              </div>
            </div>

            {/* SLIP RECORDS LIST */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300">Submitted Payment Records</h3>
              
              {enrollments.length === 0 ? (
                <p className="text-xs text-purple-300/60">No payment slip records found.</p>
              ) : (
                enrollments.map((enrollment, index) => (
                  <div 
                    key={enrollment._id || index}
                    className="p-5 rounded-2xl bg-[#120726]/90 border border-purple-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {enrollment.payment_slip ? (
                        <div 
                          onClick={() => setViewSlipImage(enrollment.payment_slip as string)}
                          className="w-14 h-14 rounded-xl overflow-hidden border border-purple-600/60 bg-purple-950 cursor-pointer relative group shrink-0"
                        >
                          <Image src={enrollment.payment_slip as string} alt="Slip" fill className="object-cover group-hover:scale-110 transition-transform" unoptimized />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-bold text-white">{enrollment.preferred_style || "Class Registration"}</h4>
                        <p className="text-xs text-purple-300/70">
                          Ref: <span className="font-mono text-fuchsia-300 font-semibold">{enrollment.transaction_ref || "BANK-SLIP-VERIFIED"}</span>
                        </p>
                        <p className="text-[11px] text-purple-400/60 mt-0.5">
                          Submitted for student: {enrollment.student_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(enrollment.status || "pending")}`}>
                        {enrollment.status === "approved" ? "SLIP VERIFIED & APPROVED" : "PENDING VERIFICATION"}
                      </span>

                      {enrollment.payment_slip && (
                        <button
                          onClick={() => setViewSlipImage(enrollment.payment_slip as string)}
                          className="p-2 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-300 hover:text-white transition-colors"
                          title="View Bank Slip Image"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PRACTICE VIDEOS & DANCE LESSONS */}
        {/* ========================================================= */}
        {activeTab === "videos" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-wider text-white">Student Practice Videos & Lessons</h2>
              <p className="text-xs text-purple-300/70 font-light">Exclusive choreography video tutorials & rhythmic practice guides for enrolled students</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practiceVideos.map((vid) => (
                <div 
                  key={vid.id}
                  className="bg-[#120726]/90 border border-purple-900/60 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(9,4,16,0.9)] group hover:border-purple-600/70 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image src={vid.thumbnail} alt={vid.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120726] via-[#120726]/40 to-transparent" />
                    
                    {/* Play Overlay Button */}
                    <button
                      onClick={() => setActiveVideo(vid)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-purple-950/40 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-fuchsia-600 text-white flex items-center justify-center shadow-[0_0_25px_rgba(232,121,249,0.8)] group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </button>

                    <div className="absolute top-3 right-3 bg-purple-950/90 text-fuchsia-300 border border-purple-700/60 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] text-fuchsia-400 uppercase font-bold tracking-widest block mb-1">
                      {vid.style}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-purple-300/70 font-light mb-4 line-clamp-2">
                      {vid.desc}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-purple-900/50">
                      <span className="text-[11px] text-purple-400 font-semibold">{vid.instructor}</span>
                      <button
                        onClick={() => setActiveVideo(vid)}
                        className="py-2 px-4 rounded-xl bg-gradient-to-r from-purple-700 to-fuchsia-700 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Watch Video</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: ACADEMY ANNOUNCEMENTS & NOTICES */}
        {/* ========================================================= */}
        {activeTab === "announcements" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-wider text-white">Academy Announcements & Notices</h2>
              <p className="text-xs text-purple-300/70 font-light">Official announcements, upcoming rehearsals & workshop notices from RIGA Management</p>
            </div>

            <div className="space-y-4">
              {announcementsList.map((ann) => (
                <div 
                  key={ann.id}
                  className="p-6 rounded-3xl bg-[#120726]/90 border border-purple-900/60 shadow-[0_0_30px_rgba(9,4,16,0.9)] hover:border-purple-600/70 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${ann.tagColor}`}>
                      {ann.tag}
                    </span>
                    <span className="text-xs text-purple-400/80 font-semibold">{ann.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{ann.title}</h3>
                  <p className="text-xs text-purple-200/80 font-light leading-relaxed">{ann.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: PROFILE SETTINGS */}
        {/* ========================================================= */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#120726]/90 border border-purple-900/60 rounded-3xl p-8 shadow-[0_0_40px_rgba(9,4,16,0.9)] max-w-2xl"
          >
            <h2 className="text-xl font-extrabold uppercase tracking-wider text-white mb-6">Profile Settings</h2>
            
            {updateMessage.text && (
              <div className={`p-4 rounded-2xl mb-6 text-xs font-semibold ${
                updateMessage.type === "success" 
                  ? "bg-green-950/80 text-green-300 border border-green-500/40" 
                  : "bg-red-950/80 text-red-300 border border-red-500/40"
              }`}>
                {updateMessage.text}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">First Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#080312] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">Last Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#080312] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                  <input
                    type="email"
                    value={currentUser?.email || ""}
                    disabled
                    className="w-full bg-[#080312]/60 border border-purple-900/40 rounded-xl pl-10 pr-4 py-3 text-purple-400/60 text-sm cursor-not-allowed"
                  />
                </div>
                <p className="text-[10px] text-purple-400/50 mt-1">Registered email address cannot be modified.</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-1/3 bg-[#080312] border border-purple-900/60 rounded-xl px-2 py-3 text-white text-xs font-medium focus:outline-none focus:border-purple-500/90"
                  >
                    <option value="+94">+94 (LK)</option>
                    <option value="+1">+1 (US/CA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+971">+971 (UAE)</option>
                  </select>
                  <div className="relative w-2/3">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#080312] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90"
                      placeholder="77 123 4567"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-900/50">
                <button
                  type="submit"
                  disabled={updating}
                  className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-black text-xs uppercase tracking-widest hover:from-purple-500 hover:to-fuchsia-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50"
                >
                  {updating ? "Saving Changes..." : "Save Profile Details"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

      </div>

      {/* ========================================================= */}
      {/* VIDEO PLAYER MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#120726] border border-purple-700/60 rounded-3xl max-w-3xl w-full p-6 relative overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.4)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] text-fuchsia-400 font-extrabold uppercase tracking-widest">{activeVideo.style}</span>
                  <h3 className="text-lg font-bold text-white line-clamp-1">{activeVideo.title}</h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-purple-900/60 mb-4">
                <iframe
                  src={activeVideo.videoUrl}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-300/70">Instructor: {activeVideo.instructor}</span>
                <span className="text-fuchsia-300 font-bold">{activeVideo.duration}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* BANK SLIP VIEW MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {viewSlipImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#120726] border border-purple-700/60 rounded-3xl max-w-lg w-full p-6 relative shadow-[0_0_60px_rgba(168,85,247,0.4)]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Submitted Bank Deposit Slip</h3>
                <button
                  onClick={() => setViewSlipImage(null)}
                  className="p-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-purple-900/60 max-h-[70vh] flex items-center justify-center bg-black relative min-h-[300px] w-full">
                <Image src={viewSlipImage} alt="Bank Deposit Slip" fill className="object-contain" unoptimized />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

