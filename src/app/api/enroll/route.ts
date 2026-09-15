import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { Resend } from "resend";

export async function GET() {
  try {
    const enrollRef = collection(db, "enrollments");
    const q = query(enrollRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const enrollments = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: enrollments }, { status: 200 });
  } catch {
    try {
      // Fallback if index doesn't exist
      const enrollRef = collection(db, "enrollments");
      const snapshot = await getDocs(enrollRef);
      const enrollments = snapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
      }));
      return NextResponse.json({ success: true, data: enrollments }, { status: 200 });
    } catch (fallbackError) {
      console.error("Error fetching enrollments:", fallbackError);
      return NextResponse.json(
        { success: false, error: "Failed to fetch enrollments" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');
    const body = await request.json();

    // Basic validation
    if (
      !body.student_name ||
      !body.age ||
      !body.phone ||
      !body.email ||
      !body.location ||
      !body.preferred_style
    ) {
      return NextResponse.json(
        { success: false, error: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "enrollments"), {
      ...body,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    // Also ensure document is created in "users" collection so it appears in Firestore & Admin Panel
    if (body.email) {
      try {
        const usersRef = collection(db, "users");
        const userDocId = body.uid || body.email.replace(/[^a-zA-Z0-9]/g, "_");
        const userDocRef = doc(db, "users", userDocId);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          await setDoc(userDocRef, {
            uid: userDocId,
            email: body.email,
            firstName: body.student_name ? body.student_name.split(" ")[0] : "Student",
            lastName: body.student_name ? body.student_name.split(" ").slice(1).join(" ") : "",
            phone: body.phone || "",
            role: "user",
            status: "pending_approval",
            createdAt: serverTimestamp(),
          });
        }
      } catch (userErr) {
        console.error("Error creating matching user doc:", userErr);
      }
    }

    // Send welcome email to student
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_placeholder_key") {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev', // Use resend's default domain for testing
          to: body.email,
          subject: 'Welcome to RIGA Dance Academy!',
          html: `<h1>Welcome ${body.student_name}!</h1><p>Thank you for enrolling in our <b>${body.preferred_style}</b> class. Your enrollment is currently pending approval. We will contact you soon!</p>`
        });
        
        // Notify admin
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'admin@rigadance.com', // Replace with actual admin email
          subject: 'New Student Enrollment',
          html: `<p>A new student has enrolled:</p><ul><li>Name: ${body.student_name}</li><li>Class: ${body.preferred_style}</li><li>Phone: ${body.phone}</li></ul>`
        });
      } catch (emailError) {
        console.error("Error sending emails:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { success: true, data: { _id: docRef.id, ...body, status: "pending" } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting enrollment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enrollment" },
      { status: 500 }
    );
  }
}
