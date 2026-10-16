import nodemailer from "nodemailer";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "inforigadance@gmail.com",
    pass: process.env.EMAIL_PASS || "kkiyilpnovojdmqx",
  },
});

export async function sendOtpEmail(toEmail: string, otpCode: string, recipientName?: string) {
  const nameDisplay = recipientName || "Student";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RIGA Dance Academy Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #05010b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #05010b; padding: 40px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="520" style="max-width: 520px; background: linear-gradient(180deg, #120524 0%, #080210 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(147, 51, 234, 0.2);">
                <!-- Top Brand Banner -->
                <tr>
                  <td align="center" style="padding: 35px 25px 20px 25px; border-bottom: 1px solid rgba(168, 85, 247, 0.15);">
                    <h1 style="margin: 0; font-size: 26px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #ffffff;">
                      RIGA <span style="color: #c084fc;">DANCE ACADEMY</span>
                    </h1>
                    <p style="margin: 6px 0 0 0; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #a855f7;">
                      Security Verification
                    </p>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 35px 30px 25px 30px; text-align: center;">
                    <p style="margin: 0 0 15px 0; font-size: 16px; color: #e9d5ff; font-weight: 500;">
                      Hello ${nameDisplay},
                    </p>
                    <p style="margin: 0 0 25px 0; font-size: 14px; line-height: 1.6; color: #c4b5fd;">
                      Use the 6-digit verification code below to complete your login / registration on RIGA Dance Academy.
                    </p>

                    <!-- OTP Code Box -->
                    <div style="margin: 30px auto; padding: 18px 24px; background: linear-gradient(135deg, rgba(88, 28, 135, 0.5) 0%, rgba(147, 51, 234, 0.2) 100%); border: 2px dashed #a855f7; border-radius: 14px; display: inline-block;">
                      <span style="font-size: 34px; font-weight: 900; letter-spacing: 0.25em; color: #f5d0fe; font-family: monospace; display: block;">
                        ${otpCode}
                      </span>
                    </div>

                    <p style="margin: 15px 0 0 0; font-size: 12px; color: #a855f7; font-weight: 600;">
                      ⏳ This code is valid for 5 minutes.
                    </p>
                    <p style="margin: 20px 0 0 0; font-size: 11px; line-height: 1.5; color: #7e22ce;">
                      If you did not request this verification code, please ignore this email or contact support. Never share this code with anyone.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 20px 25px; background-color: rgba(5, 1, 11, 0.7); border-top: 1px solid rgba(168, 85, 247, 0.15); font-size: 11px; color: #9333ea;">
                    © ${new Date().getFullYear()} RIGA Dance Academy • inforigadance@gmail.com
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
    from: '"RIGA Dance Academy" <inforigadance@gmail.com>',
    to: toEmail,
    subject: `${otpCode} is your RIGA Dance Academy verification code`,
    html,
  });
}
