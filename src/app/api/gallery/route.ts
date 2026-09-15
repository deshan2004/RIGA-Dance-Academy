import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

export async function GET() {
  try {
    const galleryRef = collection(db, "gallery");
    let snapshot;
    try {
      const q = query(galleryRef, orderBy("createdAt", "desc"));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(galleryRef);
    }
    
    const items = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching gallery items:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch gallery items";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.image || !body.title) {
      return NextResponse.json(
        { success: false, error: "Title and Image are required" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "gallery"), {
      title: body.title,
      category: body.category || "General",
      image: body.image,
      description: body.description || "",
      createdAt: serverTimestamp(),
    });
    
    return NextResponse.json(
      { success: true, data: { _id: docRef.id, ...body } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding gallery photo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add gallery photo" },
      { status: 500 }
    );
  }
}
