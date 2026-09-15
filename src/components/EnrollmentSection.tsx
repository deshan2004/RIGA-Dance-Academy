"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, AlertCircle, UserPlus, LogIn, Send, Upload, 
  CreditCard, Building, Eye, EyeOff, Lock, Mail, Copy, Check, 
  ChevronRight, ChevronLeft, Sparkles, User, MapPin, X, FileText
} from "lucide-react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const DANCE_STYLES = [
  { id: "Kandyan Traditional", name: "Kandyan Traditional", icon: "🥁", desc: "Heritage traditional drumming & dance" },
  { id: "Pahatharata Low-Country", name: "Pahatharata Low-Country", icon: "🔥", desc: "Ritualistic low-country dance traditions" },
  { id: "Sabaragamuwa Dance", name: "Sabaragamuwa Dance", icon: "✨", desc: "Central Sri Lankan ritual dance styles" },
  { id: "Urban Hip-Hop", name: "Urban Hip-Hop", icon: "🎧", desc: "Street grooves, isolation & choreography" },
  { id: "Contemporary Flow", name: "Contemporary Flow", icon: "🩰", desc: "Fluid lyrical & emotional stage dance" },
  { id: "Latin & Ballroom", name: "Latin & Ballroom", icon: "💃", desc: "Salsa, Cha-Cha & partner routines" },
];

export default function EnrollmentSection({ initialMode = "signup" }: { initialMode?: "signin" | "signup" }) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(initialMode);
  const [signupStep, setSignupStep] = useState<1 | 2 | 3>(1);
  const router = useRouter();

  // Sign In State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Sign Up State
  const [formData, setFormData] = useState({
    student_name: "",
    age: "",
    phone: "",
    email: "",
    password: "",
    emergency_contact: "",
    location: "",
    preferred_style: "Kandyan Traditional",
    skill_level: "Beginner",
    preferred_branch: "Colombo Main Studio - Weekend Morning",
    transaction_ref: "",
    notes: "",
  });
  const [countryCode, setCountryCode] = useState("+94");
  const [paymentSlip, setPaymentSlip] = useState<string>("");
  const [paymentSlipName, setPaymentSlipName] = useState<string>("");
  const [signupLoading, setSignupLoading] = useState(false);

  // Copy Feedback State
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Notification Status
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentSlipName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentSlip(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSlip = () => {
    setPaymentSlip("");
    setPaymentSlipName("");
  };

  // Sign In Submission (with pending admin approval check)
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;

      // 1. Look up user document using multi-tier fallback (UID doc, Sanitized Email doc, Query, API fallback)
      let userData: Record<string, any> | null = null;

      try {
        const userDocById = await getDoc(doc(db, "users", user.uid));
        if (userDocById.exists()) {
          userData = userDocById.data();
        }
      } catch (err) {}

      if (!userData && user.email) {
        try {
          const emailDocId = user.email.replace(/[^a-zA-Z0-9]/g, "_");
          const userDocByEmail = await getDoc(doc(db, "users", emailDocId));
          if (userDocByEmail.exists()) {
            userData = userDocByEmail.data();
          }
        } catch (err) {}
      }

      if (!userData && user.email) {
        try {
          const q = query(collection(db, "users"), where("email", "==", user.email));
          const qSnap = await getDocs(q);
          if (!qSnap.empty) {
            userData = qSnap.docs[0].data();
          }
        } catch (err) {}
      }

      if (!userData && (user.email || user.uid)) {
        try {
          const res = await fetch(`/api/users?email=${encodeURIComponent(user.email || "")}&uid=${user.uid}`);
          const apiData = await res.json();
          if (apiData.success && apiData.user) {
            userData = apiData.user;
          }
        } catch (err) {}
      }

      const userRole = userData?.role?.toLowerCase() || "user";

      // ADMIN BYPASSES ALL APPROVAL CHECKS!
      if (userRole === "admin") {
        router.push("/admin");
        return;
      }

      // 2. Check approval status for students
      const uStatus = userData?.status?.toLowerCase();
      const isDocApproved = uStatus === "approved" || uStatus === "approval";

      // Also check enrollment status via API
      let isEnrollmentApproved = false;
      try {
        const res = await fetch(`/api/enroll/user?email=${encodeURIComponent(loginEmail)}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          isEnrollmentApproved = data.data.some((item: { status?: string }) => {
            const s = item.status?.toLowerCase();
            return s === "approved" || s === "approval";
          });
        }
      } catch (err) {
        console.error("Error checking user approval:", err);
      }

      if (!isDocApproved && !isEnrollmentApproved) {
        // Block sign in for unapproved students!
        await auth.signOut();
        setStatus({
          type: "error",
          message: "🚫 Account Pending Approval: Your registration is pending Admin verification. Please wait for approval.",
        });
        return;
      }

      // Account is approved!
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error(err);
      const errorObj = err as { code?: string; message?: string };
      if (
        errorObj.code === "auth/invalid-credential" ||
        errorObj.code === "auth/user-not-found" ||
        errorObj.code === "auth/wrong-password"
      ) {
        setStatus({ type: "error", message: "Invalid email or password. Please verify your credentials." });
      } else {
        setStatus({ type: "error", message: errorObj.message || "Sign In failed. Please try again." });
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // Step 1 Validation before moving to Step 2
  const validateStep1 = () => {
    if (
      !formData.student_name.trim() ||
      !formData.age ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.location.trim() ||
      !formData.password
    ) {
      setStatus({ type: "error", message: "Please fill in all required student details and account password before proceeding." });
      return false;
    }
    if (formData.password.length < 6) {
      setStatus({ type: "error", message: "Account password must be at least 6 characters long." });
      return false;
    }
    setStatus({ type: null, message: "" });
    return true;
  };

  // Sign Up Submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setStatus({ type: null, message: "" });

    if (!paymentSlip && !formData.transaction_ref) {
      setStatus({
        type: "error",
        message: "Please upload your bank payment slip image or enter the transaction reference number to proceed.",
      });
      setSignupLoading(false);
      return;
    }

    try {
      // 1. Create Firebase Auth User & Firestore user doc with status: "pending_approval"
      try {
        const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await setDoc(doc(db, "users", userCred.user.uid), {
          uid: userCred.user.uid,
          email: formData.email,
          firstName: formData.student_name.split(" ")[0] || formData.student_name,
          lastName: formData.student_name.split(" ").slice(1).join(" ") || "",
          phone: `${countryCode} ${formData.phone}`,
          role: "user",
          status: "pending_approval",
          createdAt: new Date(),
        });
      } catch (authErr: unknown) {
        const errorObj = authErr as { code?: string; message?: string };
        if (errorObj.code === "auth/email-already-in-use") {
          // Email already registered in Firebase Auth, proceed to save enrollment
        } else {
          throw authErr;
        }
      }

      // 2. Submit enrollment record to Firestore
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: `${countryCode} ${formData.phone}`,
          age: parseInt(formData.age) || 0,
          payment_slip: paymentSlip,
          payment_slip_name: paymentSlipName,
          status: "pending_approval",
        }),
      });

      const data = await res.json();

      // 3. Immediately Sign Out so the user cannot log in until Admin approves!
      await auth.signOut();

      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message: "Account created & Bank Slip submitted! Account status: 'Pending Admin Approval'. Admin dashboard eken approve krnakal account ekt log wenn baha.",
        });
        setFormData({
          student_name: "",
          age: "",
          phone: "",
          email: "",
          password: "",
          emergency_contact: "",
          location: "",
          preferred_style: "Kandyan Traditional",
          skill_level: "Beginner",
          preferred_branch: "Colombo Main Studio - Weekend Morning",
          transaction_ref: "",
          notes: "",
        });
        setPaymentSlip("");
        setPaymentSlipName("");
        setSignupStep(1);
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to submit registration. Please check details and try again.",
        });
      }
    } catch (error: unknown) {
      console.error(error);
      const errObj = error as { message?: string };
      setStatus({
        type: "error",
        message: errObj.message || "Network error occurred. Please try again later.",
      });
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <section id="enroll" className="py-20 bg-[#07030e] relative overflow-hidden text-white">
      {/* Dynamic Background Ambient Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-900/20 via-fuchsia-900/15 to-transparent rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/60 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
          >
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            RIGA Student & Member Portal
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-white mb-3"
          >
            Join <span className="text-metallic-purple">RIGA Dance Academy</span>
          </motion.h1>
          <p className="text-purple-200/70 max-w-xl mx-auto text-sm sm:text-base font-light">
            Sign in to access your student dashboard or submit a quick registration with bank deposit verification.
          </p>
        </div>

        {/* MAIN GLASS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#120726]/85 backdrop-blur-2xl border border-purple-800/50 p-6 sm:p-10 rounded-3xl shadow-[0_0_60px_rgba(9,4,16,0.95)] relative overflow-hidden"
        >
          {/* TAB SWITCHER (SIGN IN | SIGN UP) */}
          <div className="relative flex bg-[#080312] p-1.5 rounded-2xl border border-purple-900/60 mb-8 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => { setActiveTab("signin"); setStatus({ type: null, message: "" }); }}
              className={`relative flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors z-10 flex items-center justify-center gap-2 ${
                activeTab === "signin" ? "text-white" : "text-purple-300/60 hover:text-purple-200"
              }`}
            >
              <LogIn className="w-4 h-4 text-fuchsia-400" />
              Sign In (Member)
              {activeTab === "signin" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-purple-800 to-fuchsia-800 rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.5)] -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab("signup"); setStatus({ type: null, message: "" }); }}
              className={`relative flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors z-10 flex items-center justify-center gap-2 ${
                activeTab === "signup" ? "text-white" : "text-purple-300/60 hover:text-purple-200"
              }`}
            >
              <UserPlus className="w-4 h-4 text-fuchsia-400" />
              New Registration
              {activeTab === "signup" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-purple-800 to-fuchsia-800 rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.5)] -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          </div>

          {/* STATUS NOTIFICATION ALERT */}
          <AnimatePresence mode="wait">
            {status.type && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`mb-6 p-4 rounded-2xl flex items-start gap-3 text-xs sm:text-sm font-medium ${
                  status.type === "success"
                    ? "bg-green-950/70 border border-green-500/50 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.25)]"
                    : "bg-red-950/70 border border-red-500/50 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                )}
                <p className="leading-relaxed">{status.message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========================================================= */}
          {/* TAB 1: SIGN IN FORM */}
          {/* ========================================================= */}
          {activeTab === "signin" && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSignIn} 
              className="space-y-5 max-w-md mx-auto"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-black uppercase text-white mb-1">Student & Staff Portal Sign In</h3>
                <p className="text-xs text-purple-300/70 font-light">Enter your credentials to access your portal</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#080312] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-purple-400/40"
                    placeholder="student@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#080312] border border-purple-900/60 rounded-xl pl-10 pr-10 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-purple-400/40"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-0.5 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_45px_rgba(232,121,249,0.8)] border border-fuchsia-400/40 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
              >
                {loginLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <LogIn className="w-4 h-4 text-fuchsia-300" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="text-xs text-purple-300/80 hover:text-fuchsia-300 font-semibold transition-colors"
                >
                  Need a new student registration? Register & Deposit &rarr;
                </button>
              </div>
            </motion.form>
          )}

          {/* ========================================================= */}
          {/* TAB 2: SIGN UP / MULTI-STEP NEW STUDENT REGISTRATION */}
          {/* ========================================================= */}
          {activeTab === "signup" && (
            <div>
              {/* STEP PROGRESS INDICATOR BAR */}
              <div className="mb-8 max-w-xl mx-auto">
                <div className="flex justify-between items-center relative mb-2">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-purple-950/80 -translate-y-1/2 -z-10 rounded-full" />
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 -translate-y-1/2 -z-10 rounded-full transition-all duration-500"
                    style={{ width: signupStep === 1 ? "0%" : signupStep === 2 ? "50%" : "100%" }}
                  />

                  {/* Step 1 Circle */}
                  <button 
                    type="button"
                    onClick={() => setSignupStep(1)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                      signupStep >= 1 
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-fuchsia-400/50" 
                        : "bg-[#080312] text-purple-400/60 border border-purple-900/60"
                    }`}
                  >
                    1
                  </button>

                  {/* Step 2 Circle */}
                  <button 
                    type="button"
                    onClick={() => { if (validateStep1()) setSignupStep(2); }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                      signupStep >= 2 
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-fuchsia-400/50" 
                        : "bg-[#080312] text-purple-400/60 border border-purple-900/60"
                    }`}
                  >
                    2
                  </button>

                  {/* Step 3 Circle */}
                  <button 
                    type="button"
                    onClick={() => { if (validateStep1()) setSignupStep(3); }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                      signupStep === 3 
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-fuchsia-400/50" 
                        : "bg-[#080312] text-purple-400/60 border border-purple-900/60"
                    }`}
                  >
                    3
                  </button>
                </div>

                <div className="flex justify-between text-[11px] font-bold text-purple-300/70 uppercase tracking-wider px-1">
                  <span className={signupStep === 1 ? "text-fuchsia-300" : ""}>1. Student Details</span>
                  <span className={signupStep === 2 ? "text-fuchsia-300" : ""}>2. Program Style</span>
                  <span className={signupStep === 3 ? "text-fuchsia-300" : ""}>3. Bank Deposit & Slip</span>
                </div>
              </div>

              <form onSubmit={handleSignUp}>
                {/* STEP 1: PERSONAL INFORMATION */}
                {signupStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-black uppercase text-white mb-1">Step 1: Student Information</h3>
                      <p className="text-xs text-purple-300/70 font-light">Enter basic personal contact details</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                          Full Name of Student *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
                          <input
                            type="text"
                            name="student_name"
                            required
                            value={formData.student_name}
                            onChange={handleChange}
                            className="w-full bg-[#080312] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-purple-400/40"
                            placeholder="e.g. Ama Perera"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                          Age *
                        </label>
                        <input
                          type="number"
                          name="age"
                          required
                          min="4"
                          max="90"
                          value={formData.age}
                          onChange={handleChange}
                          className="w-full bg-[#080312] border border-purple-900/60 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-purple-400/40"
                          placeholder="e.g. 18"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                          Contact Phone Number *
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-1/3 bg-[#080312] border border-purple-900/60 rounded-xl px-2 py-3.5 text-white text-xs font-medium focus:outline-none focus:border-purple-500/90"
                          >
                            <option value="+94">+94 (LK)</option>
                            <option value="+1">+1 (US)</option>
                            <option value="+44">+44 (UK)</option>
                            <option value="+61">+61 (AU)</option>
                            <option value="+91">+91 (IN)</option>
                            <option value="+971">+971 (UAE)</option>
                          </select>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-2/3 bg-[#080312] border border-purple-900/60 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-purple-400/40"
                            placeholder="77 123 4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[#080312] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-purple-400/40"
                            placeholder="student@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                          Account Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            minLength={6}
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-[#080312] border border-purple-900/60 rounded-xl pl-10 pr-10 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-purple-400/40"
                            placeholder="•••••••• (Min 6 chars)"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                        City / Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full bg-[#080312] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-purple-400/40"
                          placeholder="e.g. Colombo 07"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => { if (validateStep1()) setSignupStep(2); }}
                      className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 mt-4"
                    >
                      <span>Next: Select Dance Program</span>
                      <ChevronRight className="w-4 h-4 text-fuchsia-300" />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: DANCE PROGRAM SELECTION */}
                {signupStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-black uppercase text-white mb-1">Step 2: Choose Dance Program</h3>
                      <p className="text-xs text-purple-300/70 font-light">Select your preferred style and studio branch</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-3">
                        Preferred Dance Style *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {DANCE_STYLES.map((style) => (
                          <div
                            key={style.id}
                            onClick={() => setFormData({ ...formData, preferred_style: style.id })}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                              formData.preferred_style === style.id
                                ? "bg-gradient-to-br from-purple-950 via-purple-900/60 to-fuchsia-950 border-fuchsia-500 shadow-[0_0_20px_rgba(232,121,249,0.35)]"
                                : "bg-[#080312] border-purple-900/60 hover:border-purple-600/60"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-2xl">{style.icon}</span>
                              {formData.preferred_style === style.id && (
                                <Check className="w-4 h-4 text-fuchsia-400" />
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-white mb-0.5">{style.name}</h4>
                            <p className="text-[11px] text-purple-300/60 font-light">{style.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                        Preferred Branch & Timetable *
                      </label>
                      <select
                        name="preferred_branch"
                        required
                        value={formData.preferred_branch}
                        onChange={handleChange}
                        className="w-full bg-[#080312] border border-purple-900/60 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/90"
                      >
                        <option value="Colombo Main Studio - Weekend Morning">Colombo Main Studio - Weekend Morning</option>
                        <option value="Colombo Main Studio - Weekday Evening">Colombo Main Studio - Weekday Evening</option>
                        <option value="Kandy Studio - Saturday Morning">Kandy Studio - Saturday Morning</option>
                        <option value="Galle Studio - Sunday Afternoon">Galle Studio - Sunday Afternoon</option>
                      </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSignupStep(1)}
                        className="py-4 px-6 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-800/60 text-purple-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSignupStep(3)}
                        className="flex-1 py-4 px-8 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
                      >
                        <span>Next: Bank Deposit & Slip</span>
                        <ChevronRight className="w-4 h-4 text-fuchsia-300" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PAYMENT & BANK SLIP UPLOAD */}
                {signupStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-black uppercase text-white mb-1">Step 3: Deposit & Slip Verification</h3>
                      <p className="text-xs text-purple-300/70 font-light">Deposit registration fees & upload bank slip for approval</p>
                    </div>

                    {/* INTERACTIVE COPYABLE BANK DETAILS CARD */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-[#190933] via-[#240b49] to-[#190933] border border-purple-700/60 shadow-[0_0_25px_rgba(168,85,247,0.2)]">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-800/50">
                        <div className="flex items-center gap-2 text-fuchsia-300 font-extrabold text-xs uppercase tracking-wider">
                          <Building className="w-4 h-4 text-fuchsia-400" />
                          Official RIGA Bank Deposit Info
                        </div>
                        <span className="text-[10px] text-purple-300/70 bg-purple-950 px-2.5 py-1 rounded-full border border-purple-800/60 font-semibold">
                          1-Click Copy Supported
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-[#080312]/80 p-3 rounded-xl border border-purple-900/50">
                          <span className="text-purple-400/60 block text-[9px] uppercase font-bold mb-0.5">Bank</span>
                          <span className="text-white font-bold text-xs">Commercial Bank</span>
                        </div>

                        <div className="bg-[#080312]/80 p-3 rounded-xl border border-purple-900/50 flex items-center justify-between">
                          <div>
                            <span className="text-purple-400/60 block text-[9px] uppercase font-bold mb-0.5">Account Name</span>
                            <span className="text-white font-bold text-xs truncate max-w-[110px] block">RIGA Dance Academy</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy("RIGA Dance Academy", "name")}
                            className="p-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-800/60 transition-colors"
                            title="Copy Account Name"
                          >
                            {copiedField === "name" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <div className="bg-[#080312]/80 p-3 rounded-xl border border-purple-900/50 flex items-center justify-between">
                          <div>
                            <span className="text-purple-400/60 block text-[9px] uppercase font-bold mb-0.5">Account No.</span>
                            <span className="text-fuchsia-300 font-black tracking-wider text-xs">8002 9384 1029</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy("800293841029", "no")}
                            className="p-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-800/60 transition-colors"
                            title="Copy Account Number"
                          >
                            {copiedField === "no" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <div className="bg-[#080312]/80 p-3 rounded-xl border border-purple-900/50">
                          <span className="text-purple-400/60 block text-[9px] uppercase font-bold mb-0.5">Branch</span>
                          <span className="text-white font-bold text-xs">Colombo Main</span>
                        </div>
                      </div>
                    </div>

                    {/* SLIP UPLOAD DROPZONE WITH IMAGE PREVIEW */}
                    <div className="p-5 rounded-2xl bg-[#080312] border border-purple-800/60 space-y-4">
                      <div className="flex items-center gap-2 text-fuchsia-300 font-bold text-xs uppercase tracking-wider">
                        <CreditCard className="w-4 h-4 text-fuchsia-400" />
                        Attach Payment Deposit Slip / Reference *
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-purple-200/80 mb-2">
                            Bank Slip Image / PDF *
                          </label>

                          {paymentSlip ? (
                            <div className="relative rounded-xl overflow-hidden border border-purple-500/60 bg-[#120726] p-3 flex items-center justify-between">
                              <div className="flex items-center gap-3 truncate">
                                {paymentSlip.startsWith("data:image") ? (
                                  <img src={paymentSlip} alt="Slip Preview" className="w-10 h-10 object-cover rounded-lg border border-purple-800" />
                                ) : (
                                  <div className="w-10 h-10 bg-purple-950 rounded-lg flex items-center justify-center text-fuchsia-400">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                )}
                                <div className="truncate">
                                  <span className="text-xs font-bold text-white truncate block">{paymentSlipName}</span>
                                  <span className="text-[10px] text-green-400 font-semibold">Ready to upload</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={handleRemoveSlip}
                                className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-400 border border-red-800/60 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-purple-800/80 rounded-2xl cursor-pointer hover:border-fuchsia-500/80 hover:bg-purple-950/20 transition-all text-center group">
                              <Upload className="w-6 h-6 text-fuchsia-400 mb-1.5 group-hover:scale-110 transition-transform" />
                              <span className="text-xs text-purple-200 font-bold mb-0.5">
                                Drag & Drop or Click to Upload Slip
                              </span>
                              <span className="text-[10px] text-purple-400/60">Supports PNG, JPG, JPEG, PDF</span>
                              <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                            </label>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-purple-200/80 mb-2">
                            Transaction Reference Number
                          </label>
                          <input
                            type="text"
                            name="transaction_ref"
                            value={formData.transaction_ref}
                            onChange={handleChange}
                            className="w-full bg-[#120726] border border-purple-900/60 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/90 placeholder:text-purple-400/40"
                            placeholder="e.g. REF-80029384"
                          />
                          <span className="text-[10px] text-purple-300/50 mt-1 block">Optional if bank slip image is attached above</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSignupStep(2)}
                        className="py-4 px-6 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-800/60 text-purple-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        disabled={signupLoading}
                        className="flex-1 py-4 px-8 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-0.5 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_45px_rgba(232,121,249,0.8)] border border-fuchsia-400/40 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {signupLoading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                        ) : (
                          <>
                            <span>Submit Registration & Bank Slip</span>
                            <Send className="w-4 h-4 text-fuchsia-300" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
