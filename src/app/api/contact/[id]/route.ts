import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const inquiryRef = doc(db, "inquiries", id);
    const snap = await getDoc(inquiryRef);

    if (!snap.exists()) {
      return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 });
    }

    await deleteDoc(inquiryRef);

    return NextResponse.json({ success: true, message: "Inquiry deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
