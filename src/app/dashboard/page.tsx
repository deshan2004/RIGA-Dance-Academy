"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, User as UserIcon, Mail, Settings, Phone, LogOut, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Enrollment {
  _id: string;
  preferred_style?: string;
  student_name?: string;
  age?: number;
  email?: string;
  status?: string;
  [key: string]: unknown;
}



interface UserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: string;
  [key: string]: unknown;
}

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<"classes" | "profile">("classes");
  
  // Profile form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+94");
  const [phone, setPhone] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });

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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCurrentUser(user);
        try {
          // Check if admin or if account is approved
          let data: Record<string, any> | null = null;
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

          if (data?.role?.toLowerCase() === "admin") {
            router.push("/admin");
            return;
          }

          const uStatus = data?.status?.toLowerCase();
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
            setFirstName(data.firstName || "");
            setLastName(data.lastName || "");
            
            const fullPhone = data.phone || "";
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
        return "bg-green-900/30 text-green-400 border-green-500/30";
      case "rejected":
        return "bg-red-900/30 text-red-400 border-red-500/30";
      default:
        return "bg-yellow-900/30 text-yellow-400 border-yellow-500/30";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-academy-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-academy-gold"></div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-academy-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
            <p className="text-gray-400">Welcome back, {userData?.firstName || "Student"}!</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-academy-gray border border-gray-800 px-6 py-4 rounded-xl flex items-center gap-4 shadow-lg">
              <div className="h-12 w-12 rounded-full bg-academy-gold/20 flex items-center justify-center text-academy-gold font-bold text-xl">
                {(userData?.firstName?.charAt(0) || currentUser?.email?.charAt(0))?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-gray-400">Logged in as</p>
                <p className="font-medium text-white truncate max-w-[200px]">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                auth.signOut();
                router.push("/login");
              }}
              className="bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-500/30 px-4 rounded-xl font-medium transition-all flex items-center justify-center"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 border-b border-gray-800 pb-px">
          <button
            onClick={() => setActiveTab("classes")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "classes" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              My Classes
            </div>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "profile" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              My Profile
            </div>
          </button>

        </div>

        {activeTab === "classes" ? (
          <motion.div
            key="classes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
          <h2 className="text-2xl font-bold text-white mb-6">My Classes</h2>
          
          {enrollments.length === 0 ? (
            <div className="bg-academy-gray border border-gray-800 rounded-3xl p-12 text-center shadow-2xl">
              <div className="w-20 h-20 bg-academy-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No enrollments found</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                You haven&apos;t requested to join any classes yet. Browse our schedule and start your journey!
              </p>
              <Link
                href="/classes"
                className="inline-block bg-academy-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-[0_0_15px_rgba(198,40,40,0.4)]"
              >
                Browse Classes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrollments.map((enrollment, index) => (
                <motion.div
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-academy-gray border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(enrollment.status || 'pending')}`}>
                      {(enrollment.status || 'pending').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="mb-6 pr-24">
                    <h3 className="text-xl font-bold text-academy-gold mb-1">{enrollment.preferred_style}</h3>
                    <p className="text-gray-400 text-sm">Class Enrollment</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-300">
                      <UserIcon className="w-4 h-4 mr-3 text-gray-500" />
                      {enrollment.student_name} ({enrollment.age} yrs)
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Mail className="w-4 h-4 mr-3 text-gray-500" />
                      {enrollment.email}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        ) : activeTab === "profile" ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-academy-gray border border-gray-800 rounded-3xl p-8 shadow-2xl max-w-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
            
            {updateMessage.text && (
              <div className={`p-4 rounded-lg mb-6 ${
                updateMessage.type === "success" 
                  ? "bg-green-900/30 text-green-400 border border-green-500/30" 
                  : "bg-red-900/30 text-red-400 border border-red-500/30"
              }`}>
                {updateMessage.text}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={currentUser?.email || ""}
                    disabled
                    className="w-full bg-academy-black/50 border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Email address cannot be changed.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-1/3 bg-academy-black border border-gray-700 rounded-lg px-2 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                  >
                    <option value="+94">+94 (LK)</option>
                    <option value="+1">+1 (US/CA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+971">+971 (UAE)</option>
                  </select>
                  <div className="relative w-2/3">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                      placeholder="77 123 4567"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <button
                  type="submit"
                  disabled={updating}
                  className="bg-academy-gold hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? "Saving Changes..." : "Save Profile"}
                </button>
              </div>
            </form>
          </motion.div>

        ) : null}
      </div>
    </div>
  );
}
