import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

export async function GET() {
  try {
    const annRef = collection(db, "announcements");
    let snapshot;
    try {
      const q = query(annRef, orderBy("createdAt", "desc"));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(annRef);
    }
    
    const items = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching announcements:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch announcements";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: "Announcement title is required" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "announcements"), {
      title: body.title,
      tag: body.tag || "ACADEMY NOTICE",
      date: body.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      desc: body.desc || "",
      createdAt: serverTimestamp(),
    });
    
    return NextResponse.json(
      { success: true, data: { _id: docRef.id, ...body } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding announcement:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add announcement" },
      { status: 500 }
    );
  }
}
