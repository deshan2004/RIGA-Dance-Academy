import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_ACADEMY_PHOTOS = [
  {
    title: "Ves Netuma Traditional Graduation Ceremony",
    category: "Class Practice",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Students demonstrating advanced traditional Kandyan dancing postures and footwork."
  },
  {
    title: "National Theatre Gala - Kandyan Fusion Showcase",
    category: "Special Performances",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Full troupe stage choreography with synchronized drumming & fire effects."
  },
  {
    title: "Junior Batch Folk & Rhythm Practice",
    category: "Kids Dancing",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Young students mastering fundamental Sri Lankan folk dance steps."
  },
  {
    title: "Costumed Stage Production - Lighting Rehearsal",
    category: "Events & Highlights",
    image: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Full troupe stage lighting and costume rehearsal prior to annual concert."
  },
  {
    title: "Young Dancers Drumming & Rhythm Session",
    category: "Kids Dancing",
    image: "https://images.unsplash.com/photo-1542838686-37ed7a956140?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Children discovering traditional Sri Lankan percussion instruments."
  },
  {
    title: "Low-Country Masked Ritual Dance Highlight",
    category: "Events & Highlights",
    image: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Pahatharata ritualistic dance demonstration in traditional costumes."
  },
];

export async function GET() {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  };

  try {
    const galleryRef = collection(db, "gallery");
    let snapshot;
    try {
      const q = query(galleryRef, orderBy("createdAt", "desc"));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(galleryRef);
    }
    
    let items = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    // Auto-seed default academy photos if database collection is empty so all admin accounts see them
    if (items.length === 0) {
      try {
        for (const photo of DEFAULT_ACADEMY_PHOTOS) {
          await addDoc(collection(db, "gallery"), {
            ...photo,
            createdAt: serverTimestamp(),
          });
        }
        const freshSnap = await getDocs(galleryRef);
        items = freshSnap.docs.map(doc => ({
          _id: doc.id,
          ...doc.data()
        }));
      } catch (seedErr) {
        console.warn("Could not write auto-seed to Firestore, returning default items:", seedErr);
        items = DEFAULT_ACADEMY_PHOTOS.map((p, index) => ({
          _id: `seed_${index + 1}`,
          ...p,
        }));
      }
    }

    return NextResponse.json({ success: true, data: items }, { status: 200, headers });
  } catch (error: unknown) {
    console.error("Error fetching gallery items:", error);
    // If Firestore fails completely, still return the default photos so admin and users see them
    const fallbackItems = DEFAULT_ACADEMY_PHOTOS.map((p, index) => ({
      _id: `fallback_${index + 1}`,
      ...p,
    }));
    return NextResponse.json({ success: true, data: fallbackItems }, { status: 200, headers });
  }
}

export async function POST(request: Request) {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate",
  };

  try {
    const body = await request.json();
    
    if (!body.image || !body.title) {
      return NextResponse.json(
        { success: false, error: "Title and Image are required" },
        { status: 400, headers }
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
      { status: 201, headers }
    );
  } catch (error: unknown) {
    console.error("Error adding gallery photo:", error);
    const message = error instanceof Error ? error.message : "Failed to add gallery photo";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500, headers }
    );
  }
}
