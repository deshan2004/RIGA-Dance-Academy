"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import FeaturedClassesPreview from "@/components/FeaturedClassesPreview";
import GalleryPreview from "@/components/GalleryPreview";
import CtaBanner from "@/components/CtaBanner";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          let userData: Record<string, any> | null = null;
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) userData = userDoc.data();
          } catch (e) {}

          if (!userData && currentUser.email) {
            try {
              const emailDocId = currentUser.email.replace(/[^a-zA-Z0-9]/g, "_");
              const uByEmail = await getDoc(doc(db, "users", emailDocId));
              if (uByEmail.exists()) userData = uByEmail.data();
            } catch (e) {}
          }

          if (!userData && currentUser.email) {
            try {
              const q = query(collection(db, "users"), where("email", "==", currentUser.email));
              const qSnap = await getDocs(q);
              if (!qSnap.empty) userData = qSnap.docs[0].data();
            } catch (e) {}
          }

          if (!userData && (currentUser.email || currentUser.uid)) {
            try {
              const res = await fetch(`/api/users?email=${encodeURIComponent(currentUser.email || "")}&uid=${currentUser.uid}`);
              const apiData = await res.json();
              if (apiData.success && apiData.user) userData = apiData.user;
            } catch (e) {}
          }

          if (userData?.role?.toLowerCase() === "admin") {
            router.push("/admin");
            return;
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="bg-[#090410] min-h-screen"></div>;

  return (
    <div className="bg-[#090410] text-[#f8f5ff] min-h-screen">
      <Hero />
      <FeaturesSection />
      <FeaturedClassesPreview />
      <GalleryPreview />
      <CtaBanner />
    </div>
  );
}

