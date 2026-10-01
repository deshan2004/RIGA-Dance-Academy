import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    const uid = request.nextUrl.searchParams.get("uid");
    
    if (!email && !uid) {
      return NextResponse.json({ success: false, error: "Email or UID is required" }, { status: 400 });
    }

    const enrollRef = collection(db, "enrollments");
    const snapshot = await getDocs(enrollRef);
    
    const targetEmail = (email || "").toLowerCase().trim();

    const enrollments = snapshot.docs
      .map(doc => ({
        _id: doc.id,
        ...doc.data()
      }))
      .filter((item: Record<string, unknown>) => {
        const itemEmail = (typeof item.email === "string" ? item.email : "").toLowerCase().trim();
        const itemUserEmail = (typeof item.userEmail === "string" ? item.userEmail : "").toLowerCase().trim();
        const itemUid = typeof item.uid === "string" ? item.uid : typeof item.user_id === "string" ? item.user_id : "";

        if (uid && itemUid === uid) return true;
        if (targetEmail && (itemEmail === targetEmail || itemUserEmail === targetEmail)) return true;
        return false;
      });

    interface EnrollmentRecord {
      createdAt?: { toMillis: () => number } | number | string;
      [key: string]: unknown;
    }

    (enrollments as EnrollmentRecord[]).sort((a, b) => {
      const getMillis = (val: unknown) => {
        if (!val) return 0;
        if (typeof val === "object" && val !== null && "toMillis" in val && typeof (val as { toMillis: () => number }).toMillis === "function") {
          return (val as { toMillis: () => number }).toMillis();
        }
        if (typeof val === "number") return val;
        return 0;
      };
      return getMillis(b.createdAt) - getMillis(a.createdAt);
    });

    return NextResponse.json({ success: true, data: enrollments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user enrollments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user enrollments" },
      { status: 500 }
    );
  }
}
