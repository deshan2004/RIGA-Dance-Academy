import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { sendOtpEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email || "").toLowerCase().trim();
    const name = body.name || "";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Generate random 6-digit numeric OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    // Store in Firestore: otps collection, keyed by sanitized email
    const docId = email.replace(/[^a-zA-Z0-9]/g, "_");
    await setDoc(doc(db, "otps", docId), {
      email,
      otp: otpCode,
      createdAt: Date.now(),
      expiresAt,
    });

    // Send the email via Gmail SMTP
    await sendOtpEmail(email, otpCode, name);

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully.",
    });
  } catch (error: unknown) {
    console.error("Error in /api/auth/send-otp:", error);
    const errMessage = error instanceof Error ? error.message : "Failed to send verification email.";
    return NextResponse.json(
      { success: false, message: errMessage },
      { status: 500 }
    );
  }
}
