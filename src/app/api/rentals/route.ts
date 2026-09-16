import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

export async function GET() {
  try {
    const rentalsRef = collection(db, "rentals");
    let snapshot;
    try {
      const q = query(rentalsRef, orderBy("createdAt", "desc"));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(rentalsRef);
    }
    
    const items = snapshot.docs.map(doc => ({
      _id: doc.id,
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching rental items:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch rental items";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Item name is required" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "rentals"), {
      name: body.name,
      category: body.category || "costumes",
      categoryLabel: body.categoryLabel || (body.category === "props" ? "Props" : body.category === "accessories" ? "Performance Accessories" : "Costumes"),
      description: body.description || "",
      icon: body.icon || (body.category === "props" ? "🎭" : body.category === "accessories" ? "👑" : "👗"),
      image: body.image || "",
      highlight: body.highlight || "",
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
      stockCount: Number(body.stockCount) || 10,
      createdAt: serverTimestamp(),
    });
    
    return NextResponse.json(
      { success: true, data: { _id: docRef.id, id: docRef.id, ...body } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding rental item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add rental item" },
      { status: 500 }
    );
  }
}
