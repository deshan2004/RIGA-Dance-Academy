import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteDoc(doc(db, "announcements", id));
    return NextResponse.json({ success: true, message: "Announcement deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json({ success: false, error: "Failed to delete announcement" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await updateDoc(doc(db, "announcements", id), {
      title: body.title,
      tag: body.tag,
      date: body.date,
      desc: body.desc,
    });
    return NextResponse.json({ success: true, message: "Announcement updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json({ success: false, error: "Failed to update announcement" }, { status: 500 });
  }
}
