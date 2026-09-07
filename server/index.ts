import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiRouter } from './api';

// Loads .env.local and .env when running locally.
dotenv.config({ path: '.env.local' });
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Email OTP login + MongoDB-backed Enquiries/Bookings API
app.use('/api', apiRouter);

// Serve the built frontend (created by `npm run build`, which outputs to /dist)
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Any route that isn't /api/... or a static file falls back to index.html,
// so client-side routing/anchors still work.
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Purva Yatra server running on port ${PORT}`);
});
