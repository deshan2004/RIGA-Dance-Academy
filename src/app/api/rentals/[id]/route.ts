import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const docRef = doc(db, "rentals", id);
    const snap = await getDoc(docRef);
    
    if (!snap.exists()) {
      return NextResponse.json({ success: false, error: "Rental item not found" }, { status: 404 });
    }

    const updatedFields = {
      ...body,
      basePriceLkr: Number(body.basePriceLkr) || 2000,
      includedPieces: Array.isArray(body.includedPieces) 
        ? body.includedPieces 
        : (typeof body.includedPieces === "string" ? body.includedPieces.split(",").map((s: string) => s.trim()).filter(Boolean) : []),
      suitableFor: Array.isArray(body.suitableFor) 
        ? body.suitableFor 
        : (typeof body.suitableFor === "string" ? body.suitableFor.split(",").map((s: string) => s.trim()).filter(Boolean) : []),
      availableSizes: Array.isArray(body.availableSizes) 
        ? body.availableSizes 
        : (typeof body.availableSizes === "string" ? body.availableSizes.split(",").map((s: string) => s.trim()).filter(Boolean) : ["Standard"]),
    };

    await updateDoc(docRef, updatedFields);
    
    return NextResponse.json({ success: true, message: "Rental item updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating rental item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update rental item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const docRef = doc(db, "rentals", id);
    const snap = await getDoc(docRef);
    
    if (!snap.exists()) {
      return NextResponse.json({ success: false, error: "Rental item not found" }, { status: 404 });
    }

    await deleteDoc(docRef);
    
    return NextResponse.json({ success: true, message: "Rental item deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting rental item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete rental item" },
      { status: 500 }
    );
  }
}
