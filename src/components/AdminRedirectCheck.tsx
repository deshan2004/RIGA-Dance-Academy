"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

/**
 * Background check for authenticated admin users.
 * Runs non-blocking on the client so search crawlers can index the home page SSR HTML.
 */
export default function AdminRedirectCheck() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return;

      try {
        let userData: Record<string, unknown> | null = null;
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) userData = userDoc.data();
        } catch {}

        if (!userData && currentUser.email) {
          try {
            const emailDocId = currentUser.email.replace(/[^a-zA-Z0-9]/g, "_");
            const uByEmail = await getDoc(doc(db, "users", emailDocId));
            if (uByEmail.exists()) userData = uByEmail.data();
          } catch {}
        }

        if (!userData && currentUser.email) {
          try {
            const q = query(collection(db, "users"), where("email", "==", currentUser.email));
            const qSnap = await getDocs(q);
            if (!qSnap.empty) userData = qSnap.docs[0].data();
          } catch {}
        }

        if (!userData && (currentUser.email || currentUser.uid)) {
          try {
            const res = await fetch(
              `/api/users?email=${encodeURIComponent(currentUser.email || "")}&uid=${currentUser.uid}`
            );
            const apiData = await res.json();
            if (apiData.success && apiData.user) userData = apiData.user;
          } catch {}
        }

        const roleStr = typeof userData?.role === "string" ? userData.role : "";
        if (roleStr.toLowerCase() === "admin") {
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return null;
}
