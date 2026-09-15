import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    if (body.status) {
      const newStatus = body.status.toLowerCase();
      if (["approved", "rejected", "pending", "pending_approval"].includes(newStatus)) {
        updateData.status = newStatus;
      }
    }

    if (body.role) {
      const newRole = body.role.toLowerCase();
      if (["admin", "user"].includes(newRole)) {
        updateData.role = newRole;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid parameters provided" },
        { status: 400 }
      );
    }

    const docRef = doc(db, "users", id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      await updateDoc(docRef, updateData);
      const data = snap.data();
      if (data.email && updateData.status) {
        // Also update matching enrollments for this user's email
        const enrollRef = collection(db, "enrollments");
        const q = query(enrollRef, where("email", "==", data.email));
        const enrollSnap = await getDocs(q);
        for (const eDoc of enrollSnap.docs) {
          await updateDoc(doc(db, "enrollments", eDoc.id), { status: updateData.status as string });
        }
      }
    }

    return NextResponse.json({ success: true, message: "User status updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update user status" },
      { status: 500 }
    );
  }
}
