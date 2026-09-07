import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  fullName: string;
  phone: string;
  email?: string;
  selectedYatra: string;
  travelersCount: number;
  travelDate: string;
  vehicleType?: string;
  specialRequirements?: string;
  needPandit: boolean;
  seniorCitizenAssistance: boolean;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Closed';
  createdAt: Date;
}

const EnquirySchema: Schema = new Schema({
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: '' },
  selectedYatra: { type: String, required: true, trim: true },
  travelersCount: { type: Number, default: 2 },
  travelDate: { type: String, default: '' },
  vehicleType: { type: String, default: 'Standard' },
  specialRequirements: { type: String, default: '' },
  needPandit: { type: Boolean, default: false },
  seniorCitizenAssistance: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Confirmed', 'Closed'], 
    default: 'New' 
  },
  createdAt: { type: Date, default: Date.now }
});

export interface IBooking extends Document {
  bookingId: string;
  yatraId?: string;
  yatraTitle: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  travelDate: string;
  guestsCount: number;
  tier?: string;
  unitPrice: number;
  totalEstimatedAmount: number;
  pickupPoint: string;
  needPandit: boolean;
  seniorAssistance: boolean;
  satvikMeals: boolean;
  specialRequests?: string;
  status: 'New' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: Date;
}

const BookingSchema: Schema = new Schema({
  bookingId: { type: String, required: true, unique: true, index: true },
  yatraId: { type: String, default: '' },
  yatraTitle: { type: String, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String, default: '' },
  travelDate: { type: String, required: true },
  guestsCount: { type: Number, default: 1 },
  tier: { type: String, default: 'Standard' },
  unitPrice: { type: Number, default: 0 },
  totalEstimatedAmount: { type: Number, default: 0 },
  pickupPoint: { type: String, default: '' },
  needPandit: { type: Boolean, default: true },
  seniorAssistance: { type: Boolean, default: false },
  satvikMeals: { type: Boolean, default: true },
  specialRequests: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['New', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'], 
    default: 'New' 
  },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Guard against compiling models multiple times in dev
export const EnquiryModel: mongoose.Model<IEnquiry> =
  (mongoose.models.Enquiry as mongoose.Model<IEnquiry>) ||
  mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

export const BookingModel: mongoose.Model<IBooking> =
  (mongoose.models.Booking as mongoose.Model<IBooking>) ||
  mongoose.model<IBooking>('Booking', BookingSchema);

// ----------------- EMAIL OTP SESSIONS -----------------

export interface IOtpSession extends Document {
  email: string;
  otp: string;
  name?: string;
  createdAt: Date;
}

const OtpSessionSchema: Schema = new Schema({
  email: { type: String, required: true, index: true, trim: true, lowercase: true },
  otp: { type: String, required: true },
  name: { type: String, default: '' },
  // Auto-deletes this document 10 minutes (600s) after creation.
  createdAt: { type: Date, default: Date.now, expires: 600 },
});


// ----------------- REGISTERED CUSTOMERS -----------------

export interface ICustomer extends Document {
  email: string;
  name: string;
  createdAt: Date;
  lastLoginAt: Date;
  loginCount: number;
}

const CustomerSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
  name: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date, default: Date.now },
  loginCount: { type: Number, default: 1 },
});

export const CustomerModel: mongoose.Model<ICustomer> =
  (mongoose.models.Customer as mongoose.Model<ICustomer>) ||
  mongoose.model<ICustomer>('Customer', CustomerSchema);

export const OtpSessionModel: mongoose.Model<IOtpSession> =
  (mongoose.models.OtpSession as mongoose.Model<IOtpSession>) ||
  mongoose.model<IOtpSession>('OtpSession', OtpSessionSchema);
