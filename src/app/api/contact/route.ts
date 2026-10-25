import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const inquiriesRef = collection(db, "inquiries");
    let snapshot;
    try {
      const q = query(inquiriesRef, orderBy("createdAt", "desc"));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(inquiriesRef);
    }
    
    const inquiries = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: inquiries }, { status: 200 });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { success: true, data: [] },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Directly save to Firestore inquiries collection for Admin Console view
    const docRef = await addDoc(collection(db, "inquiries"), {
      name: body.name.trim(),
      email: body.email.trim(),
      subject: body.subject ? body.subject.trim() : "General Inquiry",
      message: body.message.trim(),
      phone: body.phone ? body.phone.trim() : "",
      status: "unread",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, data: { _id: docRef.id, ...body } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
