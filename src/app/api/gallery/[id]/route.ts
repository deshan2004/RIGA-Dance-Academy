import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const docRef = doc(db, "gallery", id);
    const snap = await getDoc(docRef);
    
    if (!snap.exists()) {
      return NextResponse.json({ success: false, error: "Photo not found" }, { status: 404 });
    }

    await deleteDoc(docRef);
    
    return NextResponse.json({ success: true, message: "Photo deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting gallery photo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete gallery photo" },
      { status: 500 }
    );
  }
}
