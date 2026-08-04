// Vercel Serverless Function for the Client Risk Profile questionnaire
// ("Send full profile to advisor" button on /risk-profile).
// Follows the same nodemailer/Gmail SMTP pattern as api/subscribe.js, with
// credentials read from environment variables:
//   GMAIL_USER          — sending Gmail address (default michael@aliyafinancial.com)
//   GMAIL_APP_PASSWORD  — Gmail app password (required)
import nodemailer from 'nodemailer';

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
    const {
      clientEmail,
      modelName,
      modelLevel,
      capacity,
      tolerance,
      flags,
      divergence,
      relocationCap,
      summary,
    } = req.body || {};

    if (!summary || typeof summary !== 'string' || summary.trim().length < 10) {
      return res.status(400).json({ error: 'Missing response summary' });
    }
    if (typeof modelName !== 'string' || typeof capacity !== 'number' || typeof tolerance !== 'number') {
      return res.status(400).json({ error: 'Missing profile results' });
    }

    const cleanEmail = typeof clientEmail === 'string' ? clientEmail.trim().slice(0, 200) : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({ error: 'A valid client email is required' });
    }
    const cleanFlags = Array.isArray(flags) ? flags.slice(0, 20) : [];
    const cleanSummary = summary.slice(0, 20000);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    const flagsHTML = cleanFlags.length
      ? `
        <div class="flags">
          <strong>Cross-border items for adviser review:</strong>
          <ul>${cleanFlags.map((f) => `<li>${f}</li>`).join('')}</ul>
        </div>
      `
      : '';

    const notificationHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 640px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9fafb; padding: 30px; }
          .profile-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { margin: 10px 0; padding: 10px; border-bottom: 1px solid #e5e7eb; }
          .label { font-weight: bold; color: #1e3a8a; display: inline-block; width: 160px; }
          .value { color: #374151; }
          .flags { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; font-size: 14px; }
          .flags ul { margin: 8px 0 0; padding-left: 20px; }
          pre { white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 12.5px; background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 New Client Risk Profile</h1>
          </div>

          <div class="content">
            <h2 style="color: #1e3a8a;">Preliminary profile for ${cleanEmail}</h2>

            <div class="profile-details">
              <div class="detail-row">
                <span class="label">Client email:</span>
                <span class="value">${cleanEmail}</span>
              </div>
              <div class="detail-row">
                <span class="label">Preliminary model:</span>
                <span class="value">${modelName} (Level ${modelLevel} of 5)</span>
              </div>
              <div class="detail-row">
                <span class="label">Risk capacity:</span>
                <span class="value">${capacity.toFixed(1)} / 5.0</span>
              </div>
              <div class="detail-row">
                <span class="label">Risk tolerance:</span>
                <span class="value">${tolerance.toFixed(1)} / 5.0</span>
              </div>
              ${divergence ? '<div class="detail-row"><span class="label">Note:</span><span class="value">Capacity and tolerance diverge meaningfully — adviser review recommended.</span></div>' : ''}
              ${relocationCap ? '<div class="detail-row"><span class="label">Note:</span><span class="value">Model capped at Balanced pending near-term relocation review.</span></div>' : ''}
              <div class="detail-row" style="border-bottom: none;">
                <span class="label">Submitted:</span>
                <span class="value">${new Date().toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}</span>
              </div>
            </div>

            ${flagsHTML}

            <p style="color: #6b7280; font-size: 14px;">Full response record below:</p>
            <pre>${cleanSummary.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Aliya Financial Website" <${gmailUser}>`,
      to: 'michael@aliyafinancial.com',
      replyTo: cleanEmail,
      subject: `New Risk Profile: ${cleanEmail} — ${modelName}`,
      html: notificationHTML,
    });

    console.log('Risk profile submitted:', {
      clientEmail: cleanEmail,
      modelName,
      modelLevel,
      capacity,
      tolerance,
      flagCount: cleanFlags.length,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: 'Profile sent to your advisor.',
    });
  } catch (error) {
    console.error('Risk profile submission error:', error);
    return res.status(500).json({ error: 'Submission failed. Please try again.' });
  }
}
