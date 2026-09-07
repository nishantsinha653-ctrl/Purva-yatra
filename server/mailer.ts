import { Resend } from 'resend';

// RESEND_API_KEY comes from your Resend.com dashboard (free tier: 3000 emails/month).
// Add it to Render's Environment Variables — never commit it to the code.
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Purva Yatra <onboarding@resend.dev>';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export function isMailerConfigured(): boolean {
  return !!resend;
}

export async function sendOtpEmail(toEmail: string, otp: string): Promise<{ success: boolean; message?: string }> {
  if (!resend) {
    return { success: false, message: 'Email service is not configured on the server (missing RESEND_API_KEY).' };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
      subject: `${otp} is your Purva Yatra verification code`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="color: #926017;">Purva Yatra 🙏</h2>
          <p>Namaste! Use the code below to sign in:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; background: #fdfaf3; color: #926017; padding: 16px; text-align: center; border-radius: 8px; margin: 16px 0;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 13px;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, message: 'Failed to send email. Please try again.' };
    }
    return { success: true };
  } catch (err) {
    console.error('sendOtpEmail error:', err);
    return { success: false, message: 'Something went wrong while sending the email.' };
  }
}
