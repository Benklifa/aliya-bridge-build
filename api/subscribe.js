// Vercel Serverless Function for lead-magnet subscriptions
// ("The 18-Month Aliyah Countdown" checklist capture on the homepage).
// Follows the same nodemailer/Gmail SMTP pattern as the event-registration
// function, with credentials read from environment variables:
//   GMAIL_USER          — sending Gmail address (default michael@aliyafinancial.com)
//   GMAIL_APP_PASSWORD  — Gmail app password (required)
import nodemailer from 'nodemailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const gmailUser = process.env.GMAIL_USER || 'michael@aliyafinancial.com';
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailPassword) {
    console.error('GMAIL_APP_PASSWORD is not set');
    return res.status(500).json({ error: 'Server is not configured' });
  }

  try {
    const { name, email, source } = req.body || {};

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide your name' });
    }
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().slice(0, 200);
    const cleanSource = (typeof source === 'string' ? source : 'unknown').trim().slice(0, 50);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    const notificationHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9fafb; padding: 30px; }
          .lead-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { margin: 10px 0; padding: 10px; border-bottom: 1px solid #e5e7eb; }
          .label { font-weight: bold; color: #1e3a8a; display: inline-block; width: 120px; }
          .value { color: #374151; }
          .reminder { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📥 New Checklist Lead</h1>
          </div>

          <div class="content">
            <h2 style="color: #1e3a8a;">New request for The 18-Month Aliyah Countdown</h2>

            <div class="lead-details">
              <div class="detail-row">
                <span class="label">Name:</span>
                <span class="value">${cleanName}</span>
              </div>

              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${cleanEmail}">${cleanEmail}</a></span>
              </div>

              <div class="detail-row">
                <span class="label">Source:</span>
                <span class="value">${cleanSource}</span>
              </div>

              <div class="detail-row" style="border-bottom: none;">
                <span class="label">Requested:</span>
                <span class="value">${new Date().toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}</span>
              </div>
            </div>

            <div class="reminder">
              The site told this lead the checklist is on its way to their inbox —
              follow up with the checklist email.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Aliya Financial Website" <${gmailUser}>`,
      to: 'michael@aliyafinancial.com',
      replyTo: cleanEmail,
      subject: `New Checklist Lead: ${cleanName} (${cleanSource})`,
      html: notificationHTML,
    });

    console.log('New subscriber:', {
      name: cleanName,
      email: cleanEmail,
      source: cleanSource,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: 'Thanks — the checklist is on its way to your inbox.',
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ error: 'Subscription failed. Please try again.' });
  }
}
