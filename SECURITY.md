# Purva Yatra security

## Admin portal

The admin dashboard is available at `/admin` and is intentionally not linked from the public website.

- Admin password is `ADMIN_SECRET_KEY` on the server only.
- Successful login creates a short-lived server-side session.
- The browser receives only an `HttpOnly`, `SameSite=Strict` session cookie.
- The secret is never sent to or stored in the frontend.
- Customers, bookings, enquiries and database-status APIs require the admin session.
- OTP verification creates/updates a customer record in MongoDB.

## Production requirements

Set these environment variables on the server/Render:

```env
MONGODB_URI=...
RESEND_API_KEY=...
FROM_EMAIL=...
ADMIN_SECRET_KEY=<long-random-secret>
NODE_ENV=production
```

Use a long random admin secret (at least 32 random characters). Do not commit `.env` files or secrets to GitHub.
