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
    
    // Permanently purge any remaining demo classes from Firestore
    const realClasses: Record<string, unknown>[] = [];
    for (const d of snapshot.docs) {
      const data = d.data() as { title?: string; instructor_name?: string; style?: string };
      const title = (data.title || "").toLowerCase();
      const instructor = (data.instructor_name || "").toLowerCase();
      const isDemo = 
        title.includes("ves netuma") ||
        title.includes("commercial choreography") ||
        title.includes("contemporary flow") ||
        title.includes("stage expression") ||
        title.includes("ballroom dynamics") ||
        title.includes("latin fusion") ||
        title.includes("urban hip-hop") ||
        instructor.includes("jayawardena") ||
        instructor.includes("carlos") ||
        instructor.includes("maria") ||
        instructor.includes("alex") ||
        instructor.includes("niluka");

      if (isDemo) {
        try {
          await deleteDoc(doc(db, "classes", d.id));
        } catch {
          // ignore error
        }
      } else {
        realClasses.push({
          _id: d.id,
          ...data
        });
      }
    }

    return NextResponse.json({ success: true, data: realClasses }, { status: 200, headers });
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
