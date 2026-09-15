import { NextResponse } from "next/server";
import { collection, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const usersRef = collection(db, "users");
    let snapshot;
    try {
      snapshot = await getDocs(usersRef);
    } catch {
      snapshot = { docs: [] };
    }
    
    let users = snapshot.docs.map(d => ({
      uid: d.id,
      ...d.data(),
    }));

    // Auto sync/backfill if users collection is empty
    if (users.length === 0) {
      try {
        const enrollSnap = await getDocs(collection(db, "enrollments"));
        for (const eDoc of enrollSnap.docs) {
          const data = eDoc.data();
          if (data.email) {
            const userDocId = (data.uid as string) || data.email.replace(/[^a-zA-Z0-9]/g, "_");
            const uRef = doc(db, "users", userDocId);
            await setDoc(uRef, {
              uid: userDocId,
              email: data.email,
              firstName: data.student_name ? data.student_name.split(" ")[0] : "Student",
              lastName: data.student_name ? data.student_name.split(" ").slice(1).join(" ") : "",
              phone: data.phone || "",
              role: "user",
              status: data.status || "pending_approval",
              createdAt: data.createdAt || serverTimestamp(),
            });
          }
        }
        const newSnap = await getDocs(usersRef);
        users = newSnap.docs.map(d => ({
          uid: d.id,
          ...d.data(),
        }));
      } catch (syncErr) {
        console.error("Error auto-syncing users from enrollments:", syncErr);
      }
    }

    return NextResponse.json({ success: true, data: users });
  } catch (error: unknown) {
    console.error("Error fetching users:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch users";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
