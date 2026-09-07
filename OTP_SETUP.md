# Real Email OTP Login Setup (Resend)

Your login sends **real OTP codes over email** using Resend (a simple,
generous free-tier email API — no phone/SMS approval process needed).
The Resend secret key lives only on the server (a small Express API
that runs alongside your website) — it is never sent to the browser.

## 1. Create a Resend account
1. Go to https://resend.com and sign up (free, no card required).
2. Verify your email as prompted.

## 2. Get your API Key
1. Once logged in, go to **API Keys** in the left sidebar.
2. Click **Create API Key**, give it any name (e.g. "Purva Yatra"),
   and copy the key — it starts with `re_`. Keep it secret.

## 3. (Optional) Verify your own sending domain
By default, OTP emails are sent from `onboarding@resend.dev` (Resend's
shared test address) — this works immediately with no setup, but may
occasionally land in spam. For a more professional look, you can later
add and verify your own domain under **Domains** in the Resend
dashboard, then set `FROM_EMAIL` to something like
`Purva Yatra <login@yourdomain.com>`. This step is optional and can be
done anytime — the site works fine without it.

## 4. Add your keys to the project
1. Open (or create) `.env.local` in the project root (same folder as
   `package.json`).
2. Add these lines:
   ```
   RESEND_API_KEY=re_your_key_here
   FROM_EMAIL=Purva Yatra <onboarding@resend.dev>
   MONGODB_URI=your-mongodb-atlas-connection-string
   ADMIN_SECRET_KEY=choose-your-own-password
   ```
3. Save the file.
   (`.env.local` is already in `.gitignore`, so these secrets are never
   committed.)

On real hosting (Render, etc.), add these same variables under the
platform's "Environment Variables" settings instead of a `.env.local`
file.

## 5. Install dependencies and run
```
npm install
npm run dev
```
A single `npm run dev` now starts **both** the website and the small
OTP backend together — no second terminal needed. Open the printed
`http://localhost:3000` link, click Login, enter your email address,
and you should receive a 6-digit OTP in your inbox within a few
seconds.

## How it works (for your understanding)
- `server/api.ts` is a small Express API with 3 OTP routes:
  `/api/otp/send`, `/api/otp/verify`, `/api/otp/resend`, plus the
  existing `/api/enquiries` and `/api/bookings` routes.
- `server/mailer.ts` uses the Resend SDK to actually send the OTP
  email.
- OTP codes are stored in MongoDB (`OtpSession` collection, auto-
  expires after 10 minutes) when `MONGODB_URI` is set, or in a simple
  in-memory store during local development if it isn't.
- `vite.config.ts` mounts that API directly inside Vite's dev server,
  so it runs on the same `localhost:3000` — the frontend just calls
  `fetch('/api/otp/send', ...)`.

## Notes / gotchas
- **Free tier**: Resend's free plan includes 3,000 emails/month and
  100/day — more than enough for a login flow on a small site.
- **Spam folder**: emails sent from the shared `onboarding@resend.dev`
  address occasionally land in spam for some providers. Verifying your
  own domain (step 3) fixes this.
- **No MONGODB_URI?** OTP still works using an in-memory store, but
  codes are lost if the server restarts (fine for local testing, not
  recommended for production — add MONGODB_URI on Render for real use).
