import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EnquiryModel, BookingModel, OtpSessionModel, CustomerModel } from './models';

// Fail fast when disconnected rather than hanging
mongoose.set('bufferCommands', false);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_STORE_PATH = path.join(__dirname, 'data_store.json');

// Memory/File-based fallback store structure
interface LocalStoreData {
  enquiries: any[];
  bookings: any[];
  customers?: any[];
}

function readLocalStore(): LocalStoreData {
  try {
    if (!fs.existsSync(LOCAL_STORE_PATH)) {
      const initial: LocalStoreData = { enquiries: [], bookings: [], customers: [] };
      fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(LOCAL_STORE_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local data store:', err);
    return { enquiries: [], bookings: [] };
  }
}

function writeLocalStore(data: LocalStoreData) {
  try {
    fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing local data store:', err);
  }
}

let isMongoConnected = false;
let mongoConnectPromise: Promise<boolean> | null = null;

export async function connectMongoDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    isMongoConnected = false;
    return false;
  }

  if (mongoose.connection.readyState === 1) {
    isMongoConnected = true;
    return true;
  }

  if (mongoConnectPromise) {
    return mongoConnectPromise;
  }

  mongoConnectPromise = (async () => {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      isMongoConnected = true;
      console.log('Successfully connected to MongoDB Database');
      return true;
    } catch (err) {
      console.warn('MongoDB connection attempt failed, using local store fallback:', err);
      isMongoConnected = false;
      return false;
    } finally {
      mongoConnectPromise = null;
    }
  })();

  return mongoConnectPromise;
}

// Check database status
export async function getDatabaseStatus() {
  const isConnected = await connectMongoDB();
  const uri = process.env.MONGODB_URI?.trim();
  
  // Mask URI for security
  const maskedUri = uri 
    ? uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')
    : null;

  return {
    type: isConnected ? 'mongodb' : 'local_store',
    connected: isConnected,
    databaseName: isConnected ? mongoose.connection.name : 'local_store.json',
    uriProvided: !!uri,
    maskedUri: maskedUri,
  };
}

// ----------------- ENQUIRIES CRUD -----------------

export async function createEnquiry(data: any) {
  const isConnected = await connectMongoDB();
  if (isConnected) {
    const doc = new EnquiryModel(data);
    await doc.save();
    return doc.toObject();
  }

  const store = readLocalStore();
  const record = {
    _id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    ...data,
    status: data.status || 'New',
    createdAt: new Date().toISOString(),
  };
  store.enquiries.unshift(record);
  writeLocalStore(store);
  return record;
}

export async function getEnquiries() {
  const isConnected = await connectMongoDB();
  if (isConnected) {
    return await EnquiryModel.find().sort({ createdAt: -1 }).lean();
  }

  const store = readLocalStore();
  return store.enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateEnquiryStatus(id: string, status: string) {
  const isConnected = await connectMongoDB();
  if (isConnected) {
    return await EnquiryModel.findByIdAndUpdate(id, { status }, { new: true }).lean();
  }

  const store = readLocalStore();
  const index = store.enquiries.findIndex((e) => e._id === id || e.id === id);
  if (index !== -1) {
    store.enquiries[index].status = status;
    writeLocalStore(store);
    return store.enquiries[index];
  }
  return null;
}

export async function deleteEnquiry(id: string) {
  const isConnected = await connectMongoDB();
  if (isConnected) {
    return await EnquiryModel.findByIdAndDelete(id);
  }

  const store = readLocalStore();
  store.enquiries = store.enquiries.filter((e) => e._id !== id && e.id !== id);
  writeLocalStore(store);
  return true;
}

// ----------------- BOOKINGS CRUD -----------------

export async function createBooking(data: any) {
  const isConnected = await connectMongoDB();
  if (isConnected) {
    const doc = new BookingModel(data);
    await doc.save();
    return doc.toObject();
  }

  const store = readLocalStore();
  const record = {
    _id: `bk_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    ...data,
    status: data.status || 'New',
    createdAt: new Date().toISOString(),
  };
  store.bookings.unshift(record);
  writeLocalStore(store);
  return record;
}

export async function getBookings() {
  const isConnected = await connectMongoDB();
  if (isConnected) {
    return await BookingModel.find().sort({ createdAt: -1 }).lean();
  }

  const store = readLocalStore();
  return store.bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateBookingStatus(id: string, status: string, notes?: string) {
  const isConnected = await connectMongoDB();
  if (isConnected) {
    const updateData: any = { status };
    if (notes !== undefined) updateData.notes = notes;
    return await BookingModel.findOneAndUpdate(
      { $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { bookingId: id }] },
      updateData,
      { new: true }
    ).lean();
  }

  const store = readLocalStore();
  const index = store.bookings.findIndex((b) => b._id === id || b.bookingId === id);
  if (index !== -1) {
    store.bookings[index].status = status;
    if (notes !== undefined) store.bookings[index].notes = notes;
    writeLocalStore(store);
    return store.bookings[index];
  }
  return null;
}

export async function deleteBooking(id: string) {
  const isConnected = await connectMongoDB();
  if (isConnected) {
    return await BookingModel.findOneAndDelete({
      $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { bookingId: id }]
    });
  }

  const store = readLocalStore();
  store.bookings = store.bookings.filter((b) => b._id !== id && b.bookingId !== id);
  writeLocalStore(store);
  return true;
}

// ----------------- EMAIL OTP SESSIONS -----------------
// OTP codes live for a short time (10 minutes) and don't need to survive a
// server restart, so when MongoDB isn't configured we fall back to a simple
// in-memory map instead of the JSON file (keeps things fast and avoids
// leaving OTP codes lying around on disk).

interface MemoryOtpEntry {
  email: string;
  otp: string;
  name?: string;
  createdAt: number;
}

const memoryOtpStore = new Map<string, MemoryOtpEntry>();
const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

function pruneExpiredMemoryOtps() {
  const now = Date.now();
  for (const [key, entry] of memoryOtpStore.entries()) {
    if (now - entry.createdAt > OTP_TTL_MS) {
      memoryOtpStore.delete(key);
    }
  }
}

export async function saveOtpSession(email: string, otp: string, name?: string) {
  const isConnected = await connectMongoDB();
  if (isConnected) {
    await OtpSessionModel.deleteMany({ email });
    await OtpSessionModel.create({ email, otp, name });
    return;
  }

  pruneExpiredMemoryOtps();
  memoryOtpStore.set(email, { email, otp, name, createdAt: Date.now() });
}

export async function getOtpSession(email: string): Promise<{ otp: string; name?: string } | null> {
  const isConnected = await connectMongoDB();
  if (isConnected) {
    const doc = await OtpSessionModel.findOne({ email }).sort({ createdAt: -1 }).lean();
    return doc ? { otp: doc.otp, name: doc.name } : null;
  }

  pruneExpiredMemoryOtps();
  const entry = memoryOtpStore.get(email);
  return entry ? { otp: entry.otp, name: entry.name } : null;
}

export async function clearOtpSession(email: string) {
  const isConnected = await connectMongoDB();
  if (isConnected) {
    await OtpSessionModel.deleteMany({ email });
    return;
  }
  memoryOtpStore.delete(email);
}


// ----------------- CUSTOMERS CRUD -----------------

export async function upsertCustomer(email: string, name = '') {
  const normalizedEmail = email.trim().toLowerCase();
  const now = new Date();
  const isConnected = await connectMongoDB();
  if (isConnected) {
    return await CustomerModel.findOneAndUpdate(
      { email: normalizedEmail },
      {
        $set: { lastLoginAt: now, ...(name.trim() ? { name: name.trim() } : {}) },
        $setOnInsert: { createdAt: now },
        $inc: { loginCount: 1 },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();
  }

  // Customer records are intentionally kept in MongoDB in production.
  // For local development without MongoDB, use the existing JSON store.
  const store = readLocalStore() as LocalStoreData & { customers?: any[] };
  store.customers ||= [];
  const existing = store.customers.find((c) => c.email === normalizedEmail);
  if (existing) {
    existing.lastLoginAt = now.toISOString();
    existing.loginCount = (existing.loginCount || 0) + 1;
    if (name.trim()) existing.name = name.trim();
    writeLocalStore(store);
    return existing;
  }
  const record = {
    _id: `cus_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    email: normalizedEmail,
    name: name.trim(),
    createdAt: now.toISOString(),
    lastLoginAt: now.toISOString(),
    loginCount: 1,
  };
  store.customers.unshift(record);
  writeLocalStore(store);
  return record;
}

export async function getCustomers() {
  const isConnected = await connectMongoDB();
  if (isConnected) return await CustomerModel.find().sort({ lastLoginAt: -1 }).lean();
  const store = readLocalStore() as LocalStoreData & { customers?: any[] };
  return (store.customers || []).sort((a, b) => new Date(b.lastLoginAt).getTime() - new Date(a.lastLoginAt).getTime());
}
