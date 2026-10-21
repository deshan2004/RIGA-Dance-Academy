import nodemailer from "nodemailer";
import crypto from "crypto";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "inforigadance@gmail.com",
    pass: process.env.EMAIL_PASS || "kkiyilpnovojdmqx",
  },
});

const SENDER_EMAIL = process.env.EMAIL_USER || "inforigadance@gmail.com";
const SENDER_NAME = "RIGA Dance Academy";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://rigadanceacademy.com";

/**
 * Send 6-Digit OTP Email
 */
export async function sendOtpEmail(toEmail: string, otpCode: string, recipientName?: string) {
  const nameDisplay = recipientName ? recipientName.trim() : "Student";

  const plainText = `Hello ${nameDisplay},\n\nYour security verification code for RIGA Dance Academy is: ${otpCode}\n\nThis verification code will expire in 5 minutes.\n\nIf you did not request this code, please ignore this email or contact support.\n\nWarm regards,\nRIGA Dance Academy Sri Lanka\nBattaramulla, Sri Lanka\nEmail: ${SENDER_EMAIL}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RIGA Dance Academy Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #05010b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <div style="display: none; font-size: 1px; color: #05010b; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          Your RIGA Dance Academy security code is ${otpCode}. Valid for 5 minutes.
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #05010b; padding: 40px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="520" style="max-width: 520px; background: linear-gradient(180deg, #120524 0%, #080210 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(147, 51, 234, 0.2);">
                <tr>
                  <td align="center" style="padding: 35px 25px 20px 25px; border-bottom: 1px solid rgba(168, 85, 247, 0.15);">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #ffffff;">
                      RIGA <span style="color: #c084fc;">DANCE ACADEMY</span>
                    </h1>
                    <p style="margin: 6px 0 0 0; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #a855f7;">
                      Security Verification
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 35px 30px 25px 30px; text-align: center;">
                    <p style="margin: 0 0 15px 0; font-size: 16px; color: #e9d5ff; font-weight: 500;">
                      Hello ${nameDisplay},
                    </p>
                    <p style="margin: 0 0 25px 0; font-size: 14px; line-height: 1.6; color: #c4b5fd;">
                      Use the 6-digit verification code below to verify your login session on RIGA Dance Academy.
                    </p>

                    <div style="margin: 25px auto; padding: 18px 26px; background: rgba(88, 28, 135, 0.35); border: 2px dashed #a855f7; border-radius: 14px; display: inline-block;">
                      <span style="font-size: 34px; font-weight: 900; letter-spacing: 0.25em; color: #f5d0fe; font-family: monospace; display: block;">
                        ${otpCode}
                      </span>
                    </div>

                    <p style="margin: 15px 0 0 0; font-size: 12px; color: #a855f7; font-weight: 600;">
                      This code is valid for 5 minutes.
                    </p>
                    <p style="margin: 20px 0 0 0; font-size: 11px; line-height: 1.5; color: #94a3b8;">
                      If you did not request this verification code, please ignore this email. Never share this code with anyone.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding: 20px 25px; background-color: rgba(5, 1, 11, 0.85); border-top: 1px solid rgba(168, 85, 247, 0.15); font-size: 11px; color: #94a3b8; line-height: 1.6;">
                    © ${new Date().getFullYear()} RIGA Dance Academy Sri Lanka<br />
                    Battaramulla, Sri Lanka • Official inquiries: <a href="mailto:${SENDER_EMAIL}" style="color: #c084fc; text-decoration: none;">${SENDER_EMAIL}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return await mailTransporter.sendMail({
    from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
    to: toEmail,
    replyTo: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
    subject: `RIGA Dance Academy: Your Verification Code is ${otpCode}`,
    text: plainText,
    html,
    headers: {
      "X-Entity-Ref-ID": crypto.randomUUID(),
      "X-Auto-Response-Suppress": "OOF, AutoReply",
    },
  });
}

/**
 * Send Email Verification Link to User (Primary Inbox Optimized)
 */
export async function sendVerificationLinkEmail(toEmail: string, verifyUrl: string, recipientName?: string) {
  const nameDisplay = recipientName ? recipientName.trim() : "Student";

  // Clean plain text version: Critical for passing Gmail spam filters
  const plainText = `Hello ${nameDisplay},\n\nThank you for registering with RIGA Dance Academy.\n\nPlease verify your email address by visiting the following link:\n${verifyUrl}\n\nThis verification link is valid for 24 hours.\n\nOnce verified, your enrollment and bank payment receipt will be reviewed by our Academy Administration for final activation.\n\nIf you did not create this account, please disregard this email.\n\nWarm regards,\nRIGA Dance Academy Sri Lanka\nBattaramulla Main Studio\nEmail: ${SENDER_EMAIL}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Confirm your email address - RIGA Dance Academy</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #05010b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <!-- Preheader text to optimize inbox preview -->
        <div style="display: none; font-size: 1px; color: #05010b; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          Please confirm your email address to complete your registration at RIGA Dance Academy.
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #05010b; padding: 40px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="540" style="max-width: 540px; background: linear-gradient(180deg, #130526 0%, #070110 100%); border: 1px solid rgba(168, 85, 247, 0.35); border-radius: 24px; overflow: hidden; box-shadow: 0 15px 50px rgba(147, 51, 234, 0.25);">
                <!-- Brand Header -->
                <tr>
                  <td align="center" style="padding: 38px 25px 22px 25px; border-bottom: 1px solid rgba(168, 85, 247, 0.2); background: radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.2) 0%, transparent 70%);">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase; color: #ffffff;">
                      RIGA <span style="color: #c084fc;">DANCE ACADEMY</span>
                    </h1>
                    <div style="display: inline-block; margin-top: 10px; padding: 4px 14px; background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 20px;">
                      <p style="margin: 0; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #d8b4fe; font-weight: 700;">
                        Account Email Verification
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 35px 35px 30px 35px; text-align: center;">
                    <h2 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                      Verify Your Email Address
                    </h2>
                    <p style="margin: 0 0 16px 0; font-size: 15px; color: #e9d5ff; font-weight: 500;">
                      Hello ${nameDisplay}, welcome to RIGA Dance Academy!
                    </p>
                    <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 1.7; color: #c4b5fd;">
                      Thank you for registering with us. To verify that this email address belongs to you, please click the button below:
                    </p>

                    <!-- Verification Button -->
                    <div style="margin: 25px 0 30px 0;">
                      <a href="${verifyUrl}" target="_blank" style="display: inline-block; padding: 16px 36px; background: linear-gradient(135deg, #a855f7 0%, #7e22ce 50%, #6b21a8 100%); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 12px; box-shadow: 0 6px 25px rgba(168, 85, 247, 0.45); border: 1px solid rgba(233, 213, 255, 0.3);">
                        Confirm My Email Address →
                      </a>
                    </div>

                    <!-- Process Steps -->
                    <div style="margin: 25px 0; padding: 16px; background: rgba(88, 28, 135, 0.25); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 12px; text-align: left;">
                      <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #e9d5ff;">
                        Next Steps after email verification:
                      </p>
                      <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #c4b5fd;">
                        • Step 1: Your email address is confirmed.<br/>
                        • Step 2: Academy Administration reviews your application and payment receipt.<br/>
                        • Step 3: You will receive an approval confirmation to log in to your student dashboard.
                      </p>
                    </div>

                    <p style="margin: 22px 0 0 0; font-size: 12px; color: #a855f7;">
                      This verification link will remain valid for 24 hours.
                    </p>
                    
                    <p style="margin: 16px 0 0 0; font-size: 11px; line-height: 1.5; color: #94a3b8; word-break: break-all;">
                      If the button above does not work, copy and paste this link into your browser:<br/>
                      <a href="${verifyUrl}" style="color: #c084fc; text-decoration: underline;">${verifyUrl}</a>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 22px 25px; background-color: rgba(5, 1, 11, 0.85); border-top: 1px solid rgba(168, 85, 247, 0.15); font-size: 11px; color: #94a3b8; line-height: 1.6;">
                    © ${new Date().getFullYear()} RIGA Dance Academy Sri Lanka • Battaramulla, Sri Lanka<br />
                    You received this email because you signed up for student admission at RIGA Dance Academy.<br />
                    Official contact: <a href="mailto:${SENDER_EMAIL}" style="color: #c084fc; text-decoration: none;">${SENDER_EMAIL}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return await mailTransporter.sendMail({
    from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
    to: toEmail,
    replyTo: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
    subject: `Confirm your email address - RIGA Dance Academy`,
    text: plainText,
    html,
    headers: {
      "X-Entity-Ref-ID": crypto.randomUUID(),
      "X-Auto-Response-Suppress": "OOF, AutoReply",
      "List-Unsubscribe": `<mailto:${SENDER_EMAIL}?subject=Unsubscribe>`,
    },
  });
}

/**
 * Send Account Approved Confirmation Email to Student (Primary Inbox Optimized)
 */
export async function sendAccountApprovedEmail(toEmail: string, recipientName?: string) {
  const nameDisplay = recipientName ? recipientName.trim() : "Student";
  const loginUrl = `${APP_URL}/login`;

  const plainText = `Hello ${nameDisplay},\n\nGreat news! Your application and payment details have been officially reviewed and approved by the RIGA Dance Academy Administration.\n\nYou now have full access to your Student Portal, class schedules, and troupe rehearsals.\n\nYou can log in to your account here:\n${loginUrl}\n\nIf you have any questions, feel free to reply to this email or visit our academy studio.\n\nWarm regards,\nRIGA Dance Academy Sri Lanka\nBattaramulla, Sri Lanka\nEmail: ${SENDER_EMAIL}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Account is Approved - RIGA Dance Academy</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #05010b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <div style="display: none; font-size: 1px; color: #05010b; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          Your student admission at RIGA Dance Academy has been approved. You can now log in to your portal.
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #05010b; padding: 40px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="540" style="max-width: 540px; background: linear-gradient(180deg, #130526 0%, #070110 100%); border: 1px solid rgba(34, 197, 94, 0.4); border-radius: 24px; overflow: hidden; box-shadow: 0 15px 50px rgba(34, 197, 94, 0.2);">
                <!-- Brand Header -->
                <tr>
                  <td align="center" style="padding: 38px 25px 22px 25px; border-bottom: 1px solid rgba(34, 197, 94, 0.2); background: radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.18) 0%, transparent 70%);">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase; color: #ffffff;">
                      RIGA <span style="color: #4ade80;">DANCE ACADEMY</span>
                    </h1>
                    <div style="display: inline-block; margin-top: 10px; padding: 4px 14px; background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.5); border-radius: 20px;">
                      <p style="margin: 0; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #86efac; font-weight: 700;">
                        Enrollment Approved
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 35px 35px 30px 35px; text-align: center;">
                    <div style="width: 60px; height: 60px; margin: 0 auto 18px auto; background: rgba(34, 197, 94, 0.15); border: 2px solid #22c55e; border-radius: 50%; line-height: 60px; font-size: 28px; text-align: center; color: #4ade80;">
                      ✓
                    </div>
                    <h2 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 800; color: #ffffff;">
                      Welcome to the Academy!
                    </h2>
                    <p style="margin: 0 0 16px 0; font-size: 15px; color: #dcfce7; font-weight: 500;">
                      Hello ${nameDisplay},
                    </p>
                    <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 1.7; color: #c4b5fd;">
                      Your application and bank payment details have been verified and approved by the RIGA Dance Academy Administration. You now have full access to your Student Portal, class schedules, and rehearsal details.
                    </p>

                    <!-- Login Button -->
                    <div style="margin: 25px 0 30px 0;">
                      <a href="${loginUrl}" target="_blank" style="display: inline-block; padding: 16px 36px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 12px; box-shadow: 0 6px 25px rgba(34, 197, 94, 0.45); border: 1px solid rgba(220, 252, 231, 0.4);">
                        Log In to Student Portal →
                      </a>
                    </div>

                    <p style="margin: 18px 0 0 0; font-size: 12px; line-height: 1.5; color: #94a3b8;">
                      If you have questions regarding your class schedule or studio locations, simply reply to this email or visit our reception desk.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 22px 25px; background-color: rgba(5, 1, 11, 0.85); border-top: 1px solid rgba(34, 197, 94, 0.15); font-size: 11px; color: #94a3b8; line-height: 1.6;">
                    © ${new Date().getFullYear()} RIGA Dance Academy Sri Lanka • Battaramulla, Sri Lanka<br />
                    Official inquiries: <a href="mailto:${SENDER_EMAIL}" style="color: #4ade80; text-decoration: none;">${SENDER_EMAIL}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return await mailTransporter.sendMail({
    from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
    to: toEmail,
    replyTo: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
    subject: `Your student account has been approved - RIGA Dance Academy`,
    text: plainText,
    html,
    headers: {
      "X-Entity-Ref-ID": crypto.randomUUID(),
      "X-Auto-Response-Suppress": "OOF, AutoReply",
      "List-Unsubscribe": `<mailto:${SENDER_EMAIL}?subject=Unsubscribe>`,
    },
  });
}

/**
 * Send Alert to Academy Admin when a new student enrolls
 */
export async function sendAdminNewRegistrationAlert(details: {
  studentName: string;
  studentEmail: string;
  phone: string;
  preferredStyle?: string;
  preferredBranch?: string;
}) {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || SENDER_EMAIL;
  const adminUrl = `${APP_URL}/admin`;

  const plainText = `New Student Registration Pending Approval:\n\nName: ${details.studentName}\nEmail: ${details.studentEmail}\nPhone: ${details.phone}\nStyle: ${details.preferredStyle || "N/A"}\nBranch: ${details.preferredBranch || "N/A"}\n\nReview in Admin Portal: ${adminUrl}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <body style="background-color: #05010b; color: #ffffff; font-family: sans-serif; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #120524; border: 1px solid #a855f7; border-radius: 16px; padding: 25px;">
          <h2 style="color: #c084fc; margin-top: 0;">New Student Registration Pending Approval</h2>
          <p style="color: #e9d5ff;">A new student has registered and submitted payment details:</p>
          <ul style="color: #c4b5fd; line-height: 1.8;">
            <li><strong>Name:</strong> ${details.studentName}</li>
            <li><strong>Email:</strong> ${details.studentEmail}</li>
            <li><strong>Phone:</strong> ${details.phone}</li>
            <li><strong>Style:</strong> ${details.preferredStyle || "N/A"}</li>
            <li><strong>Branch:</strong> ${details.preferredBranch || "N/A"}</li>
          </ul>
          <div style="margin-top: 25px;">
            <a href="${adminUrl}" style="background: #a855f7; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
              Open Admin Dashboard
            </a>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    return await mailTransporter.sendMail({
      from: `"${SENDER_NAME} Notifications" <${SENDER_EMAIL}>`,
      to: adminEmail,
      replyTo: details.studentEmail,
      subject: `New Student Registration: ${details.studentName}`,
      text: plainText,
      html,
    });
  } catch (err) {
    console.error("Could not send admin alert email:", err);
  }
}
