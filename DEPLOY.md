# Deploying Purva Yatra for a Real Client

This covers what you need before real customers can log in with real
Email OTPs on a live website:
1. Push your code to GitHub
2. Deploy on Render (free tier)
3. Set up MongoDB Atlas (free) for storing enquiries, bookings & OTPs
4. Set up Resend (free) for sending OTP emails

No DLT/SMS registration is needed anymore — email OTP works immediately
with no business document approval process.

---

## Part 1: Push your code to GitHub

1. Go to https://github.com and sign in (or create a free account).
2. Click the **+** icon (top-right) → **New repository**.
3. Name it `purva-yatra` → keep it **Private** (recommended for a client
   project) → **Create repository**. Leave it empty (no README).
4. In VS Code, open the **Source Control** tab (icon on the left sidebar,
   looks like a branch/fork icon).
5. Click **Initialize Repository** if prompted.
6. Type a message like "Initial commit" in the message box → click the
   **✓ Commit** button.
7. Click **Publish Branch** (or "Publish to GitHub") → choose the repo
   you just created (or let VS Code create it for you if it offers to).
8. Sign in with GitHub if asked. Your code is now on GitHub.

## Part 2: Set up MongoDB Atlas (free database)

1. Go to https://www.mongodb.com/cloud/atlas/register and sign up (free,
   no card required).
2. Create a free "M0" cluster (follow the setup wizard, any region close
   to India works fine).
3. Under **Database Access**, create a database user with a username and
   password (save these — you'll need them).
4. Under **Network Access**, click **Add IP Address** → **Allow Access
   from Anywhere** (0.0.0.0/0) — this lets Render connect to it.
5. Click **Connect** on your cluster → **Drivers** → copy the connection
   string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```
6. Replace `<username>` and `<password>` with the ones from step 3, and
   add a database name at the end, e.g.:
   ```
   mongodb+srv://myuser:mypass@cluster0.xxxxx.mongodb.net/purvayatra
   ```
   This full string is your `MONGODB_URI`.

## Part 3: Set up Resend (free email OTP)

See `OTP_SETUP.md` for full details. Short version:
1. Sign up free at https://resend.com
2. Create an API Key under **API Keys** → copy it (starts with `re_`).
   This is your `RESEND_API_KEY`.

## Part 4: Deploy on Render

1. Go to https://render.com and sign up (you can sign up with your GitHub
   account directly — easiest option).
2. On the dashboard, click **New +** → **Web Service**.
3. Connect your GitHub account if asked, then select your `purva-yatra`
   repository.
4. Fill in these settings:
   - **Name**: `purva-yatra` (or anything you like)
   - **Region**: pick one close to India (e.g. Singapore)
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**
5. Scroll to **Environment Variables** → click **Add Environment Variable**
   and add all of these (same values as your `.env.local`):
   ```
   MONGODB_URI = your-mongodb-atlas-connection-string
   RESEND_API_KEY = re_your_resend_key
   FROM_EMAIL = Purva Yatra <onboarding@resend.dev>
   ADMIN_SECRET_KEY = choose-your-own-password
   GEMINI_API_KEY = your-gemini-key (if you use AI features)
   ```
6. Click **Create Web Service**. Render will build and deploy — this
   takes a few minutes the first time.

**Admin security:** The public website has no Admin button. The secure Admin Dashboard is available at `/admin`. It uses the server-only `ADMIN_SECRET_KEY` to create an HttpOnly session cookie; the secret is never exposed to the browser. Private customer/booking/enquiry/database APIs require that session.
7. Once done, Render gives you a live URL like
   `https://purva-yatra.onrender.com` — this is your real, live website.

**Free tier note**: Render's free web services "sleep" after 15 minutes
of no traffic, so the very first visit after a quiet period takes
~30-50 seconds to wake up. This is fine for a small business site; if
it ever becomes a problem, Render's paid tier ($7/month) removes the
sleep delay.

---

## After deployment: quick checklist
- [ ] Test the live URL end-to-end (browse site, log in with a real
      email, check the OTP arrives, verify)
- [ ] Test the enquiry/booking forms and confirm entries appear in your
      MongoDB Atlas dashboard (Collections → purvayatra database)
- [ ] Point your custom domain (e.g. `purvayatra.com`) at Render, if the
      client has one (Render → your service → Settings → Custom Domain)
- [ ] Keep `.env.local` only on your own machine — never commit it or
      share it (it's already in `.gitignore`)
- [ ] Open `https://YOUR-RENDER-URL/admin` and sign in with the `ADMIN_SECRET_KEY`.
- [ ] Keep your `ADMIN_SECRET_KEY` private — it protects the admin session and private data APIs.
