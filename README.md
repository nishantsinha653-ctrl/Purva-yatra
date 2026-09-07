# Purva Yatra

React + Vite + Express + MongoDB pilgrimage travel website with email OTP login and a secure server-authenticated admin dashboard.

## Admin

Open `/admin`. The admin password is the server-only `ADMIN_SECRET_KEY` environment variable.

Dashboard sections:
- Overview
- Customers (registered/login users)
- Bookings
- Enquiries
- Database status

## Run

```bash
npm install
npm run dev
```

Production:

```bash
npm install
npm run build
npm start
```

See `DEPLOY.md`, `OTP_SETUP.md`, and `SECURITY.md` for deployment and configuration.
