"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Mail, Phone, Calendar, UserCog, Shield, BookOpen, Plus, Edit, Trash2, X, CheckCircle, Star, FileText, Image as ImageIcon, Upload, Camera } from "lucide-react";
import AttendanceTab from "@/components/admin/AttendanceTab";
import EventsTab from "@/components/admin/EventsTab";

interface FirestoreTimestamp {
  seconds: number;
  nanoseconds?: number;
}

interface EnrollmentItem {
  _id: string;
  student_name?: string;
  studentName?: string;
  age?: number | string;
  phone?: string;
  email?: string;
  userEmail?: string;
  location?: string;
  preferred_style?: string;
  preferred_branch?: string;
  classTitle?: string;
  status?: string;
  payment_slip?: string;
  transaction_ref?: string;
  notes?: string;
  createdAt?: FirestoreTimestamp | string | number | null;
  [key: string]: unknown;
}

interface ClassItem {
  _id: string;
  title: string;
  style: string;
  day: string;
  time: string;
  instructor_name: string;
  hall_no: string;
  image?: string;
  [key: string]: unknown;
}

interface UserItem {
  _id?: string;
  uid?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  status?: string;
  phone?: string;
  createdAt?: FirestoreTimestamp | string | number | null;
}

interface InquiryItem {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  subject?: string;
  createdAt?: FirestoreTimestamp | string | number | null;
}

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  createdAt?: FirestoreTimestamp | string | number | null;
}

export default function AdminDashboard() {
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<UserItem[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"enrollments" | "users" | "classes" | "inquiries" | "attendance" | "events" | "gallery">("enrollments");
  const [loading, setLoading] = useState(true);
  const [selectedSlip, setSelectedSlip] = useState<EnrollmentItem | null>(null);
  
  // Class Form State
  const [showClassModal, setShowClassModal] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [classForm, setClassForm] = useState({
    title: "",
    style: "Kandyan",
    day: "Monday",
    time: "",
    instructor_name: "",
    hall_no: "",
    image: "",
  });

  // Gallery Form State
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "Class Practice",
    image: "",
    description: "",
  });

  const router = useRouter();

  const handleClassImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClassForm(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryForm(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await fetch("/api/enroll");
      const data = await res.json();
      if (data.success) {
        setEnrollments(data.data);
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success) {
        setRegisteredUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/classes");
      const data = await res.json();
      if (data.success) {
        setClasses(data.data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const fetchGalleryItems = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        setGalleryItems(data.data);
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    }
  };

  useEffect(() => {
    // Check if user is logged in and is admin
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        try {
          let userData: Record<string, any> | null = null;
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) userData = userDoc.data();
          } catch (e) {}

          if (!userData && user.email) {
            try {
              const emailDocId = user.email.replace(/[^a-zA-Z0-9]/g, "_");
              const uByEmail = await getDoc(doc(db, "users", emailDocId));
              if (uByEmail.exists()) userData = uByEmail.data();
            } catch (e) {}
          }

          if (!userData && user.email) {
            try {
              const q = query(collection(db, "users"), where("email", "==", user.email));
              const qSnap = await getDocs(q);
              if (!qSnap.empty) userData = qSnap.docs[0].data();
            } catch (e) {}
          }

          if (!userData && (user.email || user.uid)) {
            try {
              const res = await fetch(`/api/users?email=${encodeURIComponent(user.email || "")}&uid=${user.uid}`);
              const apiData = await res.json();
              if (apiData.success && apiData.user) userData = apiData.user;
            } catch (e) {}
          }

          if (userData?.role?.toLowerCase() === "admin") {
            fetchEnrollments();
          } else {
            router.push("/");
          }
        } catch {
          router.push("/");
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    async function loadTabData() {
      if (activeTab === "users" && registeredUsers.length === 0) {
        await fetchUsers();
      } else if (activeTab === "classes" && classes.length === 0) {
        await fetchClasses();
      } else if (activeTab === "inquiries" && inquiries.length === 0) {
        await fetchInquiries();
      } else if (activeTab === "gallery" && galleryItems.length === 0) {
        await fetchGalleryItems();
      }
    }
    loadTabData();
  }, [activeTab, registeredUsers.length, classes.length, inquiries.length, galleryItems.length]);

  const handleSaveGalleryPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.image || !galleryForm.title) {
      alert("Please provide a photo title and upload an image or paste URL.");
      return;
    }
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryForm),
      });
      if (res.ok) {
        setShowGalleryModal(false);
        setGalleryForm({ title: "", category: "Class Practice", image: "", description: "" });
        fetchGalleryItems();
      }
    } catch (error) {
      console.error("Error saving gallery photo:", error);
    }
  };

  const handleDeleteGalleryPhoto = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setGalleryItems(galleryItems.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting gallery photo:", error);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enroll/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnrollments(enrollments.map(e => e._id === id ? { ...e, status: newStatus } : e));
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleUpdateUserStatus = async (userId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setRegisteredUsers(registeredUsers.map(u => (u.uid === userId || u._id === userId) ? { ...u, status: newStatus } : u));
        fetchEnrollments();
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleSaveClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingClass ? "PUT" : "POST";
      const url = editingClass ? `/api/classes/${editingClass._id}` : "/api/classes";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classForm)
      });
      
      if (res.ok) {
        setShowClassModal(false);
        setEditingClass(null);
        fetchClasses(); // Refresh list
      }
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };

  const handleDeleteClass = async (id: string) => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    try {
      const res = await fetch(`/api/classes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setClasses(classes.filter(c => c._id !== id));
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const openClassModal = (cls: ClassItem | null = null) => {
    if (cls) {
      setEditingClass(cls);
      setClassForm({
        title: cls.title,
        style: cls.style,
        day: cls.day,
        time: cls.time,
        instructor_name: cls.instructor_name,
        hall_no: cls.hall_no,
        image: cls.image || "",
      });
    } else {
      setEditingClass(null);
      setClassForm({
        title: "",
        style: "Kandyan",
        day: "Monday",
        time: "",
        instructor_name: "",
        hall_no: "",
        image: "",
      });
    }
    setShowClassModal(true);
  };

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage student enrollments and applications.</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
            <div className="bg-academy-gray border border-gray-800 px-6 py-3 rounded-xl flex items-center gap-4 shadow-lg w-full sm:w-auto">
              <div className="p-3 bg-academy-gold/10 rounded-lg">
                <Users className="text-academy-gold w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Enrollments</p>
                <p className="text-2xl font-bold text-white">{enrollments.length}</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                auth.signOut();
                router.push("/login");
              }}
              className="bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-500/30 px-6 py-3 rounded-xl font-medium transition-all w-full sm:w-auto h-full"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 border-b border-gray-800 pb-px">
          <button
            onClick={() => setActiveTab("enrollments")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "enrollments" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Enrollments
            </div>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "users" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <UserCog className="w-4 h-4" />
              Registered Students
            </div>
          </button>
          <button
            onClick={() => setActiveTab("classes")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "classes" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Manage Classes
            </div>
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "inquiries" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Inquiries
            </div>
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "attendance" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Attendance
            </div>
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "events" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Events
            </div>
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "gallery" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Gallery & Photos
            </div>
          </button>
        </div>

        {activeTab === "enrollments" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Student</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Contact</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Location</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Style & Branch</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Payment Slip</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Status</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No enrollments found yet.
                    </td>
                  </tr>
                ) : (
                  enrollments.map((student) => (
                    <tr key={student._id} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-fuchsia-400 font-bold">
                            {(student.student_name || "S").charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{student.student_name}</div>
                            <div className="text-xs text-purple-300/60">{student.age} yrs</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-purple-400" /> {student.email}
                        </div>
                        <div className="text-sm text-gray-300 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-purple-400" /> {student.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{student.location || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-950 text-fuchsia-300 border border-purple-800/60 mb-1">
                          {student.preferred_style}
                        </span>
                        {student.preferred_branch && (
                          <div className="text-[10px] text-purple-300/60">{student.preferred_branch}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {student.payment_slip || student.transaction_ref ? (
                          <button
                            onClick={() => setSelectedSlip(student)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fuchsia-950/80 border border-fuchsia-700/60 text-fuchsia-300 hover:text-white text-xs font-bold transition-all shadow-[0_0_10px_rgba(232,121,249,0.2)]"
                          >
                            <FileText className="w-3.5 h-3.5 text-fuchsia-400" />
                            View Slip
                          </button>
                        ) : (
                          <span className="text-xs text-gray-500 italic">No Slip</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                          student.status === "approved" ? "bg-green-900/30 text-green-400 border-green-500/30" :
                          student.status === "rejected" ? "bg-red-900/30 text-red-400 border-red-500/30" :
                          "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
                        }`}>
                          {(student.status || "pending_approval").toUpperCase().replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {(!student.status || student.status === "pending" || student.status === "pending_approval") && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUpdateStatus(student._id, "approved")}
                              className="text-xs bg-green-900/40 hover:bg-green-800/80 text-green-300 border border-green-500/40 px-3 py-1.5 rounded-lg transition-colors font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(student._id, "rejected")}
                              className="text-xs bg-red-900/40 hover:bg-red-800/80 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-lg transition-colors font-bold"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : activeTab === "users" ? (
        <motion.div
          key="users"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">User</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Contact</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Role</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Approval Status</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Joined</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {registeredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No registered users found.
                    </td>
                  </tr>
                ) : (
                  registeredUsers.map((user, idx) => (
                    <tr key={user.uid || user._id || idx} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-academy-black flex items-center justify-center text-academy-gold font-bold">
                            {(user.firstName || user.email || "U").charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {user.firstName || user.lastName ? `${user.firstName || ""} ${user.lastName || ""}` : "Unknown"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-gray-500" /> {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-gray-300 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" /> {user.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.role === "admin" ? (
                          <span className="px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full bg-red-900/30 text-red-400 border border-red-500/30">
                            <Shield className="w-3 h-3" /> Admin
                          </span>
                        ) : (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                            Student
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.role === "admin" ? (
                          <span className="text-xs text-gray-400 italic">N/A (Admin)</span>
                        ) : (
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                            user.status === "approved" ? "bg-green-900/30 text-green-400 border-green-500/30" :
                            user.status === "rejected" ? "bg-red-900/30 text-red-400 border-red-500/30" :
                            "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
                          }`}>
                            {(user.status || "pending_approval").toUpperCase().replace("_", " ")}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {typeof user.createdAt === "object" && user.createdAt && "seconds" in user.createdAt
                          ? new Date(user.createdAt.seconds * 1000).toLocaleDateString()
                          : "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {user.role !== "admin" && (user.status !== "approved") && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUpdateUserStatus(user.uid || user._id || "", "approved")}
                              className="text-xs bg-green-900/40 hover:bg-green-800/80 text-green-300 border border-green-500/40 px-3 py-1.5 rounded-lg transition-colors font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateUserStatus(user.uid || user._id || "", "rejected")}
                              className="text-xs bg-red-900/40 hover:bg-red-800/80 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-lg transition-colors font-bold"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : activeTab === "classes" ? (
        <motion.div
          key="classes"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Class Schedule</h2>
            <button
              onClick={() => openClassModal()}
              className="bg-academy-gold hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Class
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Photo</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Title</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Style</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Schedule</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Instructor</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Hall</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {classes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No classes found. Add one to get started.
                    </td>
                  </tr>
                ) : (
                  classes.map((cls) => (
                    <tr key={cls._id} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-purple-950 border border-purple-800/60 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                          {cls.image ? (
                            <img src={cls.image} alt={cls.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-purple-400">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{cls.title}</td>
                      <td className="px-6 py-4 text-academy-gold text-sm">{cls.style}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">
                        {cls.day} <br />
                        <span className="text-gray-500">{cls.time}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{cls.instructor_name}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{cls.hall_no}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openClassModal(cls)}
                            className="p-2 bg-blue-900/30 text-blue-400 hover:bg-blue-900/60 rounded-md transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClass(cls._id)}
                            className="p-2 bg-red-900/30 text-red-400 hover:bg-red-900/60 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : activeTab === "inquiries" ? (
        <motion.div
          key="inquiries"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Sender</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Subject</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Message</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No inquiries found.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inq) => (
                    <tr key={inq._id} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{inq.name}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" /> {inq.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white text-sm font-medium">
                        {inq.subject}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                        {inq.message}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {typeof inq.createdAt === "object" && inq.createdAt && "seconds" in inq.createdAt
                          ? new Date(inq.createdAt.seconds * 1000).toLocaleDateString()
                          : "Unknown"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : activeTab === "attendance" ? (
          <AttendanceTab classes={classes} enrollments={enrollments} />
        ) : activeTab === "events" ? (
          <EventsTab />
        ) : activeTab === "gallery" ? (
        <motion.div
          key="gallery"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-academy-gold" />
                Academy Photo Gallery
              </h2>
              <p className="text-xs text-gray-400 mt-1">Upload photos of kids dancing, class practices, and special academy highlights.</p>
            </div>
            <button
              onClick={() => {
                setGalleryForm({ title: "", category: "Class Practice", image: "", description: "" });
                setShowGalleryModal(true);
              }}
              className="bg-academy-gold hover:bg-yellow-600 text-black font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Photo to Gallery
            </button>
          </div>

          {galleryItems.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-gray-800 rounded-2xl">
              <Camera className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">No Gallery Photos Yet</h3>
              <p className="text-sm text-gray-500 mb-6">Upload photos of kids dancing, class practices, and special events for students to view.</p>
              <button
                onClick={() => setShowGalleryModal(true)}
                className="bg-purple-950 border border-purple-700 text-purple-300 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                + Add First Photo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryItems.map((photo) => (
                <div key={photo._id} className="bg-black/60 border border-gray-800 rounded-2xl overflow-hidden group relative flex flex-col justify-between">
                  <div className="relative h-44 w-full overflow-hidden">
                    <img src={photo.image} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 left-2 bg-purple-950/90 text-fuchsia-300 border border-purple-500/50 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {photo.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{photo.title}</h4>
                      {photo.description && (
                        <p className="text-xs text-gray-400 line-clamp-2 mb-3">{photo.description}</p>
                      )}
                    </div>
                    <div className="pt-3 border-t border-gray-900 flex justify-between items-center text-xs text-gray-500">
                      <span>{typeof photo.createdAt === "object" && photo.createdAt && "seconds" in photo.createdAt ? new Date(photo.createdAt.seconds * 1000).toLocaleDateString() : ""}</span>
                      <button
                        onClick={() => handleDeleteGalleryPhoto(photo._id)}
                        className="p-1.5 bg-red-900/30 text-red-400 hover:bg-red-900/70 rounded-lg transition-colors"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
        ) : null}

        {/* Gallery Upload Modal */}
        {showGalleryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-academy-gray border border-gray-800 rounded-2xl w-full max-w-lg p-6 relative"
            >
              <button 
                onClick={() => setShowGalleryModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-6">Upload Gallery Photo</h2>
              
              <form onSubmit={handleSaveGalleryPhoto} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Photo Title / Caption *</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})}
                    className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    placeholder="e.g. Kids Kandyan Practice Session"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})}
                    className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                  >
                    <option value="Class Practice">Class Practice</option>
                    <option value="Kids Dancing">Kids Dancing</option>
                    <option value="Events & Highlights">Events & Highlights</option>
                    <option value="Special Performances">Special Performances</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Photo (Upload File or Paste Link) *</label>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <label className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 rounded-lg text-purple-200 text-xs font-bold cursor-pointer transition-all shrink-0">
                        <Upload className="w-4 h-4 text-fuchsia-400" />
                        Upload Image File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleGalleryImageUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-gray-500 font-semibold uppercase text-center">OR</span>
                      <input
                        type="text"
                        value={galleryForm.image}
                        onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                        className="flex-1 bg-academy-black border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                        placeholder="Paste Image Link (https://...)"
                      />
                    </div>
                    {galleryForm.image && (
                      <div className="relative w-full h-36 rounded-xl overflow-hidden border border-purple-500/40 mt-2">
                        <img src={galleryForm.image} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setGalleryForm({ ...galleryForm, image: "" })}
                          className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-900 text-white rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description / Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({...galleryForm, description: e.target.value})}
                    className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    placeholder="Brief detail about this photo..."
                  />
                </div>
                
                <div className="pt-4 flex justify-end gap-3 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowGalleryModal(false)}
                    className="px-4 py-2 rounded-lg font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-academy-gold hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {activeTab === "enrollments" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Student</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Contact</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Location</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Style & Branch</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Payment Slip</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Status</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No enrollments found yet.
                    </td>
                  </tr>
                ) : (
                  enrollments.map((student) => (
                    <tr key={student._id} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-fuchsia-400 font-bold">
                            {(student.student_name || "S").charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{student.student_name}</div>
                            <div className="text-xs text-purple-300/60">{student.age} yrs</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-purple-400" /> {student.email}
                        </div>
                        <div className="text-sm text-gray-300 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-purple-400" /> {student.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{student.location || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-950 text-fuchsia-300 border border-purple-800/60 mb-1">
                          {student.preferred_style}
                        </span>
                        {student.preferred_branch && (
                          <div className="text-[10px] text-purple-300/60">{student.preferred_branch}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {student.payment_slip || student.transaction_ref ? (
                          <button
                            onClick={() => setSelectedSlip(student)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fuchsia-950/80 border border-fuchsia-700/60 text-fuchsia-300 hover:text-white text-xs font-bold transition-all shadow-[0_0_10px_rgba(232,121,249,0.2)]"
                          >
                            <FileText className="w-3.5 h-3.5 text-fuchsia-400" />
                            View Slip
                          </button>
                        ) : (
                          <span className="text-xs text-gray-500 italic">No Slip</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                          student.status === "approved" ? "bg-green-900/30 text-green-400 border-green-500/30" :
                          student.status === "rejected" ? "bg-red-900/30 text-red-400 border-red-500/30" :
                          "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
                        }`}>
                          {(student.status || "pending_approval").toUpperCase().replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {(!student.status || student.status === "pending" || student.status === "pending_approval") && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUpdateStatus(student._id, "approved")}
                              className="text-xs bg-green-900/40 hover:bg-green-800/80 text-green-300 border border-green-500/40 px-3 py-1.5 rounded-lg transition-colors font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(student._id, "rejected")}
                              className="text-xs bg-red-900/40 hover:bg-red-800/80 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-lg transition-colors font-bold"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : activeTab === "users" ? (
        <motion.div
          key="users"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">User</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Contact</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Role</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Approval Status</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Joined</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {registeredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No registered users found.
                    </td>
                  </tr>
                ) : (
                  registeredUsers.map((user, idx) => (
                    <tr key={user.uid || user._id || idx} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-academy-black flex items-center justify-center text-academy-gold font-bold">
                            {(user.firstName || user.email || "U").charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {user.firstName || user.lastName ? `${user.firstName || ""} ${user.lastName || ""}` : "Unknown"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-gray-500" /> {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-gray-300 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" /> {user.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.role === "admin" ? (
                          <span className="px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full bg-red-900/30 text-red-400 border border-red-500/30">
                            <Shield className="w-3 h-3" /> Admin
                          </span>
                        ) : (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                            Student
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.role === "admin" ? (
                          <span className="text-xs text-gray-400 italic">N/A (Admin)</span>
                        ) : (
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                            user.status === "approved" ? "bg-green-900/30 text-green-400 border-green-500/30" :
                            user.status === "rejected" ? "bg-red-900/30 text-red-400 border-red-500/30" :
                            "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
                          }`}>
                            {(user.status || "pending_approval").toUpperCase().replace("_", " ")}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {typeof user.createdAt === "object" && user.createdAt && "seconds" in user.createdAt
                          ? new Date(user.createdAt.seconds * 1000).toLocaleDateString()
                          : "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {user.role !== "admin" && (user.status !== "approved") && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUpdateUserStatus(user.uid || user._id || "", "approved")}
                              className="text-xs bg-green-900/40 hover:bg-green-800/80 text-green-300 border border-green-500/40 px-3 py-1.5 rounded-lg transition-colors font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateUserStatus(user.uid || user._id || "", "rejected")}
                              className="text-xs bg-red-900/40 hover:bg-red-800/80 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-lg transition-colors font-bold"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : activeTab === "classes" ? (
        <motion.div
          key="classes"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Class Schedule</h2>
            <button
              onClick={() => openClassModal()}
              className="bg-academy-gold hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Class
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Photo</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Title</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Style</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Schedule</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Instructor</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Hall</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {classes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No classes found. Add one to get started.
                    </td>
                  </tr>
                ) : (
                  classes.map((cls) => (
                    <tr key={cls._id} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-purple-950 border border-purple-800/60 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                          {cls.image ? (
                            <img src={cls.image} alt={cls.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-purple-400">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{cls.title}</td>
                      <td className="px-6 py-4 text-academy-gold text-sm">{cls.style}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">
                        {cls.day} <br />
                        <span className="text-gray-500">{cls.time}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{cls.instructor_name}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{cls.hall_no}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openClassModal(cls)}
                            className="p-2 bg-blue-900/30 text-blue-400 hover:bg-blue-900/60 rounded-md transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClass(cls._id)}
                            className="p-2 bg-red-900/30 text-red-400 hover:bg-red-900/60 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : activeTab === "inquiries" ? (
        <motion.div
          key="inquiries"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Sender</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Subject</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Message</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No inquiries found.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inq) => (
                    <tr key={inq._id} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{inq.name}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" /> {inq.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white text-sm font-medium">
                        {inq.subject}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                        {inq.message}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {typeof inq.createdAt === "object" && inq.createdAt && "seconds" in inq.createdAt
                          ? new Date(inq.createdAt.seconds * 1000).toLocaleDateString()
                          : "Unknown"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : activeTab === "attendance" ? (
          <AttendanceTab classes={classes} enrollments={enrollments} />
        ) : activeTab === "events" ? (
          <EventsTab />
        ) : null}

        {/* Class Modal */}
        {showClassModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-academy-gray border border-gray-800 rounded-2xl w-full max-w-lg p-6 relative"
            >
              <button 
                onClick={() => setShowClassModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingClass ? "Edit Class" : "Add New Class"}
              </h2>
              
              <form onSubmit={handleSaveClass} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Class Title</label>
                  <input
                    type="text"
                    required
                    value={classForm.title}
                    onChange={(e) => setClassForm({...classForm, title: e.target.value})}
                    className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    placeholder="e.g. Beginner Hip-Hop"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Dance Style</label>
                    <select
                      value={classForm.style}
                      onChange={(e) => setClassForm({...classForm, style: e.target.value})}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    >
                      <option value="Kandyan">Kandyan</option>
                      <option value="Hip-Hop">Hip-Hop</option>
                      <option value="Classical">Classical</option>
                      <option value="Contemporary">Contemporary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Instructor</label>
                    <input
                      type="text"
                      required
                      value={classForm.instructor_name}
                      onChange={(e) => setClassForm({...classForm, instructor_name: e.target.value})}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Day</label>
                    <select
                      value={classForm.day}
                      onChange={(e) => setClassForm({...classForm, day: e.target.value})}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    >
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                    <input
                      type="text"
                      required
                      value={classForm.time}
                      onChange={(e) => setClassForm({...classForm, time: e.target.value})}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                      placeholder="18:00 - 19:30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Hall No.</label>
                    <input
                      type="text"
                      required
                      value={classForm.hall_no}
                      onChange={(e) => setClassForm({...classForm, hall_no: e.target.value})}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Class Photo (Upload or URL)</label>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <label className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 rounded-lg text-purple-200 text-xs font-bold cursor-pointer transition-all shrink-0">
                        <Upload className="w-4 h-4 text-fuchsia-400" />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleClassImageUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-gray-500 font-semibold uppercase text-center">OR</span>
                      <input
                        type="text"
                        value={classForm.image}
                        onChange={(e) => setClassForm({ ...classForm, image: e.target.value })}
                        className="flex-1 bg-academy-black border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                        placeholder="Paste Image URL (https://...)"
                      />
                    </div>
                    {classForm.image && (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden border border-purple-500/40 mt-2">
                        <img src={classForm.image} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setClassForm({ ...classForm, image: "" })}
                          className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-900 text-white rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end gap-3 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowClassModal(false)}
                    className="px-4 py-2 rounded-lg font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-academy-gold hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    {editingClass ? "Save Changes" : "Create Class"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Payment Slip Inspection Modal */}
        {selectedSlip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#140924] border border-purple-800/60 rounded-3xl w-full max-w-xl p-6 sm:p-8 relative shadow-[0_0_50px_rgba(168,85,247,0.3)] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedSlip(null)}
                className="absolute right-5 top-5 p-2 rounded-full bg-purple-950 text-purple-300 hover:text-white border border-purple-800/50"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                <FileText className="w-5 h-5 text-fuchsia-400" />
                Payment Slip Verification
              </h2>
              <p className="text-xs text-purple-300/70 mb-6">
                Student: <span className="text-white font-bold">{selectedSlip.student_name}</span> ({selectedSlip.phone})
              </p>

              {/* Transaction Ref */}
              {selectedSlip.transaction_ref && (
                <div className="mb-4 p-3 bg-[#090410] rounded-xl border border-purple-900/60 flex items-center justify-between text-xs">
                  <span className="text-purple-400/70 uppercase font-semibold">Transaction Reference ID:</span>
                  <span className="text-fuchsia-300 font-mono font-bold text-sm">{selectedSlip.transaction_ref}</span>
                </div>
              )}

              {/* Payment Slip Image Preview */}
              {selectedSlip.payment_slip ? (
                <div className="mb-6 rounded-2xl overflow-hidden border border-purple-800/60 bg-[#090410] max-h-96 flex items-center justify-center p-2">
                  <img
                    src={selectedSlip.payment_slip}
                    alt="Payment Slip"
                    className="max-h-80 w-auto object-contain rounded-xl"
                  />
                </div>
              ) : (
                <div className="mb-6 p-8 rounded-2xl bg-[#090410] text-center border border-purple-900/60 text-purple-300/60 text-xs">
                  No image slip attached. Verify via Transaction Reference ID above.
                </div>
              )}

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-900/60">
                <button
                  type="button"
                  onClick={() => setSelectedSlip(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-purple-300/80 hover:text-white bg-purple-950/60 border border-purple-800/40"
                >
                  Close
                </button>
                {selectedSlip.status !== "approved" && (
                  <button
                    type="button"
                    onClick={() => {
                      handleUpdateStatus(selectedSlip._id, "approved");
                      setSelectedSlip(null);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                  >
                    Approve Payment & Student
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
