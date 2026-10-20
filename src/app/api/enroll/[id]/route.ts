import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { sendAccountApprovedEmail } from "@/lib/mailer";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const newStatus = body.status ? body.status.toLowerCase() : "";

    if (!newStatus || !["approved", "rejected", "pending", "pending_approval"].includes(newStatus)) {
      return NextResponse.json(
        { success: false, error: "Invalid status provided" },
        { status: 400 }
      );
    }

    const docRef = doc(db, "enrollments", id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      await updateDoc(docRef, { status: newStatus });
      if (data.email) {
        // Also update matching user in users collection
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", data.email));
        const userSnap = await getDocs(q);
        for (const uDoc of userSnap.docs) {
          await updateDoc(doc(db, "users", uDoc.id), { status: newStatus });
        }

        // If newly approved, send congratulatory approval email
        if (newStatus === "approved" && data.status !== "approved") {
          try {
            await sendAccountApprovedEmail(data.email, data.student_name || "Student");
          } catch (mailErr) {
            console.error("Failed to send approval email:", mailErr);
          }
        }
      }
    }

    return NextResponse.json({ success: true, message: "Status updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating enrollment status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update status" },
      { status: 500 }
    );
  }
}
