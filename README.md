# PIOUS

## Contact form email delivery

The contact form posts to the Vercel Function at `/api/contact`, which sends the inquiry through Resend. Add these environment variables in **Vercel → Project → Settings → Environment Variables** for Production (and Preview if you want the form to send from preview deployments):

- `RESEND_API_KEY`: Create a Resend API key with **Sending access** at [Resend API Keys](https://resend.com/api-keys). Keep this server-side value secret.
- `CONTACT_FROM_EMAIL`: Set this to a sender on a domain verified in [Resend Domains](https://resend.com/domains), for example `PIOUS <contact@piousts.com>`.

For development before the production domain is verified, use `PIOUS <onboarding@resend.dev>` as `CONTACT_FROM_EMAIL`. Resend's testing sender can be subject to recipient restrictions, so verify the production domain before launch to send form submissions to both PIOUS recipients reliably.

Copy `.env.example` to `.env.local` for local Vercel development. Never commit a real API key.
