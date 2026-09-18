import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

export async function GET() {
  try {
    const videosRef = collection(db, "practice_videos");
    let snapshot;
    try {
      const q = query(videosRef, orderBy("createdAt", "desc"));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(videosRef);
    }
    
    const items = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching practice videos:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch practice videos";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title || !body.videoUrl) {
      return NextResponse.json(
        { success: false, error: "Title and Video URL are required" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "practice_videos"), {
      title: body.title,
      style: body.style || "Kandyan Traditional",
      duration: body.duration || "15 mins",
      instructor: body.instructor || "Guru K. Jayawardena",
      thumbnail: body.thumbnail || "https://images.unsplash.com/photo-1542838686-37ed7a956140?auto=format&fit=crop&q=80",
      videoUrl: body.videoUrl,
      desc: body.desc || "",
      createdAt: serverTimestamp(),
    });
    
    return NextResponse.json(
      { success: true, data: { _id: docRef.id, ...body } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding practice video:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add practice video" },
      { status: 500 }
    );
  }
}
