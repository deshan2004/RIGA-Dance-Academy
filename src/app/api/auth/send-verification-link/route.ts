import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { sendVerificationLinkEmail } from "@/lib/mailer";
import crypto from "crypto";

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

    // Generate high-entropy secure verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours validity

    // Store in Firestore: verification_tokens collection
    await setDoc(doc(db, "verification_tokens", token), {
      token,
      email,
      name,
      createdAt: Date.now(),
      expiresAt,
    });

    // Also store token reference in email doc for quick lookup or resend tracking
    const emailDocId = email.replace(/[^a-zA-Z0-9]/g, "_");
    await setDoc(
      doc(db, "user_email_verifications", emailDocId),
      {
        latestToken: token,
        email,
        name,
        updatedAt: Date.now(),
      },
      { merge: true }
    );

    // Resolve base application URL
    const origin = request.headers.get("origin") || request.headers.get("host") || "";
    const protocol = origin.includes("localhost") || origin.includes("127.0.0.1") ? "http" : "https";
    const cleanHost = origin.replace(/^https?:\/\//, "");
    const computedBase = origin.startsWith("http") ? origin : `${protocol}://${cleanHost}`;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (cleanHost ? computedBase : "http://localhost:3000");

    const verifyUrl = `${baseUrl}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    // Send the email via Gmail SMTP
    await sendVerificationLinkEmail(email, verifyUrl, name);

    return NextResponse.json({
      success: true,
      message: "Verification link sent to your email successfully.",
    });
  } catch (error: unknown) {
    console.error("Error in /api/auth/send-verification-link:", error);
    const errMessage = error instanceof Error ? error.message : "Failed to send verification link.";
    return NextResponse.json(
      { success: false, message: errMessage },
      { status: 500 }
    );
  }
}
