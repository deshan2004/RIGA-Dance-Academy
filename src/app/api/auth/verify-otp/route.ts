import { NextResponse } from "next/server";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email || "").toLowerCase().trim();
    const otp = (body.otp || "").toString().trim();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and verification code are required." },
        { status: 400 }
      );
    }

    const docId = email.replace(/[^a-zA-Z0-9]/g, "_");
    const otpRef = doc(db, "otps", docId);
    const otpSnap = await getDoc(otpRef);

    if (!otpSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "No active verification code found. Please request a new code." },
        { status: 400 }
      );
    }

    const data = otpSnap.data();

    if (Date.now() > data.expiresAt) {
      await deleteDoc(otpRef);
      return NextResponse.json(
        { success: false, message: "Verification code has expired. Please request a new code." },
        { status: 400 }
      );
    }

    if (data.otp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid verification code. Please check your email and try again." },
        { status: 400 }
      );
    }

    // OTP matched! Remove it so it cannot be used again
    await deleteDoc(otpRef);

    // Update user document if uid or email is known
    try {
      const userRef = doc(db, "users", docId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        await updateDoc(userRef, {
          emailVerified: true,
          twoFactorVerified: true,
          lastVerifiedAt: Date.now(),
        });
      }
    } catch (uErr) {
      console.warn("Could not update user doc verified flag:", uErr);
    }

    return NextResponse.json({
      success: true,
      message: "Verification successful.",
    });
  } catch (error: unknown) {
    console.error("Error in /api/auth/verify-otp:", error);
    const errMessage = error instanceof Error ? error.message : "Verification failed.";
    return NextResponse.json(
      { success: false, message: errMessage },
      { status: 500 }
    );
  }
}
