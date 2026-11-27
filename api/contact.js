const RECIPIENTS = ['Pankaj.Srivastava@piousts.com', 'sudhir.srivastava@piousts.com']

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function isValidInquiry(inquiry) {
  const requiredFields = ['name', 'company', 'email', 'advisoryLine', 'message']
  const hasAllRequiredFields = requiredFields.every((field) => typeof inquiry[field] === 'string' && inquiry[field].trim())
  const hasValidEmail = typeof inquiry.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)

  return hasAllRequiredFields && hasValidEmail
}

function buildEmailHtml(inquiry, submittedAt) {
  const rows = [
    ['Full Name', inquiry.name],
    ['Company', inquiry.company],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone || 'Not provided'],
    ['Advisory Line', inquiry.advisoryLine],
    ['Message', inquiry.message],
    ['Submission Timestamp', submittedAt],
  ]

  return `
    <div style="font-family: Arial, sans-serif; color: #1a2332; line-height: 1.6; max-width: 680px; margin: 0 auto;">
      <h2 style="color: #0a1628; margin: 0 0 20px;">New PIOUS Advisory Inquiry</h2>
      <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #d4d3cf;">
        <tbody>
          ${rows.map(([label, value]) => `
            <tr>
              <td style="width: 34%; padding: 12px 16px; border-bottom: 1px solid #d4d3cf; background: #f2f1ed; font-weight: 600; vertical-align: top;">${escapeHtml(label)}</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #d4d3cf; white-space: pre-wrap; vertical-align: top;">${escapeHtml(value)}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  const inquiry = request.body && typeof request.body === 'object' ? request.body : {}

  if (typeof inquiry.website === 'string' && inquiry.website.trim()) {
    return response.status(200).json({ ok: true })
  }

  if (!isValidInquiry(inquiry)) {
    return response.status(400).json({ error: 'Please complete all required fields with valid information.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !from) {
    console.error('Contact email is not configured.')
    return response.status(500).json({ error: 'Unable to send your inquiry right now. Please try again shortly.' })
  }

  const submittedAt = new Date().toISOString()
  const subject = `New PIOUS Advisory Inquiry — ${inquiry.name.trim()} — ${inquiry.advisoryLine.trim()}`

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: RECIPIENTS,
        reply_to: inquiry.email.trim(),
        subject,
        html: buildEmailHtml(inquiry, submittedAt),
      }),
    })

    if (!resendResponse.ok) {
      console.error(`Resend email delivery failed with status ${resendResponse.status}.`)
      return response.status(502).json({ error: 'Unable to send your inquiry right now. Please try again shortly.' })
    }

    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact email delivery failed.', error instanceof Error ? error.message : 'Unknown error')
    return response.status(502).json({ error: 'Unable to send your inquiry right now. Please try again shortly.' })
  }
}
