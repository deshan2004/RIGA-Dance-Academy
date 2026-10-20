import { NextResponse } from "next/server";
import { doc, getDoc, deleteDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = (body.token || "").toString().trim();
    const email = (body.email || "").toLowerCase().trim();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Verification token is required." },
        { status: 400 }
      );
    }

    const emailDocId = email ? email.replace(/[^a-zA-Z0-9]/g, "_") : "";

    // First check if user is already verified in Firestore
    if (email) {
      const uRef = doc(db, "users", emailDocId);
      const uSnap = await getDoc(uRef);
      if (uSnap.exists()) {
        const uData = uSnap.data();
        if (uData.emailVerified === true) {
          return NextResponse.json({
            success: true,
            alreadyVerified: true,
            email,
            status: uData.status || "pending_approval",
            firstName: uData.firstName || "Student",
            message: "Your email address is already verified.",
          });
        }
      }
    }

    // Lookup token in verification_tokens
    const tokenRef = doc(db, "verification_tokens", token);
    const tokenSnap = await getDoc(tokenRef);

    if (!tokenSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "This verification link is invalid or has already been used." },
        { status: 400 }
      );
    }

    const tokenData = tokenSnap.data();

    // Check expiry (24 hours)
    if (Date.now() > tokenData.expiresAt) {
      await deleteDoc(tokenRef);
      return NextResponse.json(
        { success: false, message: "This verification link has expired. Please request a new verification link." },
        { status: 400 }
      );
    }

    const targetEmail = (tokenData.email || email).toLowerCase().trim();
    const targetDocId = targetEmail.replace(/[^a-zA-Z0-9]/g, "_");

    // Delete token so it cannot be re-used
    await deleteDoc(tokenRef);

    let userStatus = "pending_approval";
    let userName = tokenData.name || "Student";

    // 1. Update direct doc in users collection by emailDocId
    try {
      const userRef = doc(db, "users", targetDocId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        userStatus = data.status || "pending_approval";
        userName = data.firstName || userName;
        await updateDoc(userRef, {
          emailVerified: true,
          emailVerifiedAt: Date.now(),
        });
      }
    } catch (uErr) {
      console.warn("Direct user doc update error:", uErr);
    }

    // 2. Query any other user docs matching this email (e.g. UID-keyed docs)
    try {
      const q = query(collection(db, "users"), where("email", "==", targetEmail));
      const qSnap = await getDocs(q);
      for (const d of qSnap.docs) {
        const dData = d.data();
        userStatus = dData.status || userStatus;
        userName = dData.firstName || userName;
        await updateDoc(doc(db, "users", d.id), {
          emailVerified: true,
          emailVerifiedAt: Date.now(),
        });
      }
    } catch (qErr) {
      console.warn("Query user doc update error:", qErr);
    }

    // 3. Update enrollments collection matching email
    try {
      const eq = query(collection(db, "enrollments"), where("email", "==", targetEmail));
      const eqSnap = await getDocs(eq);
      for (const ed of eqSnap.docs) {
        await updateDoc(doc(db, "enrollments", ed.id), {
          emailVerified: true,
          emailVerifiedAt: Date.now(),
        });
      }
    } catch (eErr) {
      console.warn("Enrollment doc update error:", eErr);
    }

    return NextResponse.json({
      success: true,
      email: targetEmail,
      status: userStatus,
      firstName: userName,
      message: "Email verified successfully!",
    });
  } catch (error: unknown) {
    console.error("Error in /api/auth/verify-link:", error);
    const errMessage = error instanceof Error ? error.message : "Verification failed.";
    return NextResponse.json(
      { success: false, message: errMessage },
      { status: 500 }
    );
  }
}
