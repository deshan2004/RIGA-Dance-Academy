import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  };

  try {
    const classesRef = collection(db, "classes");
    let snapshot;
    try {
      const q = query(classesRef, orderBy("createdAt", "desc"));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(classesRef);
    }
    
    const classes = snapshot.docs.map(d => ({
      _id: d.id,
      ...d.data()
    }));

    return NextResponse.json({ success: true, data: classes }, { status: 200, headers });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json({ success: true, data: [] }, { status: 200, headers });
  }
}

export async function DELETE() {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate",
  };

  try {
    const classesRef = collection(db, "classes");
    const snapshot = await getDocs(classesRef);
    const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, "classes", d.id)));
    await Promise.all(deletePromises);

    return NextResponse.json(
      { success: true, message: `Successfully cleared ${snapshot.docs.length} classes from schedule.` },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error clearing classes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to clear classes from schedule." },
      { status: 500, headers }
    );
  }
}

export async function POST(request: Request) {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate",
  };

  try {
    const body = await request.json();
    const docRef = await addDoc(collection(db, "classes"), {
      ...body,
      createdAt: serverTimestamp(),
    });
    
    return NextResponse.json(
      { success: true, data: { _id: docRef.id, ...body } },
      { status: 201, headers }
    );
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create class" },
      { status: 500, headers }
    );
  }
}
