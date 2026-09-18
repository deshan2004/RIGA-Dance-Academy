import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await deleteDoc(doc(db, "practice_videos", id));
    return NextResponse.json({ success: true, message: "Practice video deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting practice video:", error);
    return NextResponse.json({ success: false, error: "Failed to delete practice video" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    await updateDoc(doc(db, "practice_videos", id), {
      title: body.title,
      style: body.style,
      duration: body.duration,
      instructor: body.instructor,
      thumbnail: body.thumbnail,
      videoUrl: body.videoUrl,
      desc: body.desc,
    });
    return NextResponse.json({ success: true, message: "Practice video updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating practice video:", error);
    return NextResponse.json({ success: false, error: "Failed to update practice video" }, { status: 500 });
  }
}
