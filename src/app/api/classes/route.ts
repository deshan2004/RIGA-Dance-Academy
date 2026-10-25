import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_CLASSES = [
  {
    title: "Kandyan Traditional & Ves Netuma",
    style: "Kandyan Traditional",
    day: "Saturday",
    time: "08:30 AM - 11:30 AM",
    instructor_name: "Guru K. Jayawardena",
    hall_no: "Main Hall A",
    image: "https://images.unsplash.com/photo-1542838686-37ed7a956140?auto=format&fit=crop&q=80",
  },
  {
    title: "Urban Hip-Hop & Commercial Choreography",
    style: "Hip-Hop / Street",
    day: "Sunday",
    time: "01:00 PM - 03:30 PM",
    instructor_name: "Alex V.",
    hall_no: "Studio B (Mirrored)",
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a6e0c?auto=format&fit=crop&q=80",
  },
  {
    title: "Contemporary Flow & Stage Expression",
    style: "Contemporary",
    day: "Wednesday",
    time: "05:00 PM - 07:00 PM",
    instructor_name: "Niluka S.",
    hall_no: "Studio C",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&q=80",
  },
  {
    title: "Latin Fusion & Ballroom Dynamics",
    style: "Latin / Ballroom",
    day: "Friday",
    time: "06:00 PM - 08:30 PM",
    instructor_name: "Carlos & Maria",
    hall_no: "Main Hall A",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
  },
];

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
    
    let classes = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    if (classes.length === 0) {
      try {
        for (const c of DEFAULT_CLASSES) {
          await addDoc(collection(db, "classes"), {
            ...c,
            createdAt: serverTimestamp(),
          });
        }
        const freshSnap = await getDocs(classesRef);
        classes = freshSnap.docs.map(doc => ({
          _id: doc.id,
          ...doc.data()
        }));
      } catch (seedErr) {
        console.warn("Could not write auto-seed classes to Firestore:", seedErr);
        classes = DEFAULT_CLASSES.map((c, index) => ({
          _id: `cls_${index + 1}`,
          ...c,
        }));
      }
    }

    return NextResponse.json({ success: true, data: classes }, { status: 200, headers });
  } catch (fallbackError) {
    console.error("Error fetching classes:", fallbackError);
    const fallback = DEFAULT_CLASSES.map((c, index) => ({
      _id: `fallback_${index + 1}`,
      ...c,
    }));
    return NextResponse.json({ success: true, data: fallback }, { status: 200, headers });
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
