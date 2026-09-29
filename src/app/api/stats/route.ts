import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const DEFAULT_STATS = {
  livePerformances: "0",
  proTroupeDancers: "0",
  customCostumes: "0",
  nationalAwards: "0",
};

export async function GET() {
  try {
    const statsDocRef = doc(db, "settings", "stats");
    const snapshot = await getDoc(statsDocRef);

    if (snapshot.exists()) {
      return NextResponse.json({ success: true, data: snapshot.data() }, { status: 200 });
    }

    return NextResponse.json({ success: true, data: DEFAULT_STATS }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ success: true, data: DEFAULT_STATS }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const statsDocRef = doc(db, "settings", "stats");

    const updatedData = {
      livePerformances: String(body.livePerformances ?? "0"),
      proTroupeDancers: String(body.proTroupeDancers ?? "0"),
      customCostumes: String(body.customCostumes ?? "0"),
      nationalAwards: String(body.nationalAwards ?? "0"),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(statsDocRef, updatedData, { merge: true });

    return NextResponse.json({ success: true, data: updatedData }, { status: 200 });
  } catch (error) {
    console.error("Error updating stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update stats" },
      { status: 500 }
    );
  }
}
