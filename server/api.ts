import express from 'express';
import crypto from 'crypto';
import { 
  getDatabaseStatus, createEnquiry, getEnquiries, updateEnquiryStatus, deleteEnquiry,
  createBooking, getBookings, updateBookingStatus, deleteBooking,
  saveOtpSession, getOtpSession, clearOtpSession, upsertCustomer, getCustomers,
} from './db';
import { sendOtpEmail, isMailerConfigured } from './mailer';

function isValidEmail(email: string): boolean { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function generateOtp(): string { return crypto.randomInt(100000, 1000000).toString(); }
function missingMailerResponse(res: express.Response) { return res.status(500).json({ success:false, message:'Server is missing RESEND_API_KEY. Add it to your environment variables and redeploy.' }); }

export const apiRouter = express.Router();
apiRouter.use(express.json());
apiRouter.use((req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next(); });

// Admin sessions live only on the server. The browser receives an HttpOnly cookie,
// never the ADMIN_SECRET_KEY itself.
const adminSessions = new Map<string, number>();
const ADMIN_SESSION_TTL = 8 * 60 * 60 * 1000;
function pruneAdminSessions() { const now=Date.now(); for (const [token, expires] of adminSessions) if (expires <= now) adminSessions.delete(token); }
function safeEqual(a: string, b: string) {
  const aa=Buffer.from(a), bb=Buffer.from(b);
  return aa.length===bb.length && crypto.timingSafeEqual(aa,bb);
}
function getCookie(req: express.Request, name: string) {
  const raw=String(req.headers.cookie||'');
  for (const part of raw.split(';')) { const [k,...v]=part.trim().split('='); if(k===name) return decodeURIComponent(v.join('=')); }
  return '';
}
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  pruneAdminSessions();
  const token=getCookie(req,'py_admin_session');
  const expires=token ? adminSessions.get(token) : undefined;
  if (!expires || expires <= Date.now()) return res.status(401).json({success:false,message:'Unauthorized admin request.'});
  return next();
}

// ---------- ADMIN AUTH ----------
apiRouter.post('/admin/login', (req,res)=>{
  const secret=String(process.env.ADMIN_SECRET_KEY||'').trim();
  const password=String(req.body?.password||'');
  if(!secret) return res.status(503).json({success:false,message:'Admin access is not configured. Set ADMIN_SECRET_KEY on the server.'});
  if(!password || !safeEqual(secret,password)) return res.status(401).json({success:false,message:'Invalid admin password.'});
  const token=crypto.randomBytes(32).toString('hex');
  adminSessions.set(token,Date.now()+ADMIN_SESSION_TTL);
  res.setHeader('Set-Cookie', `py_admin_session=${encodeURIComponent(token)}; Max-Age=${ADMIN_SESSION_TTL/1000}; Path=/; HttpOnly; SameSite=Strict${process.env.NODE_ENV==='production' ? '; Secure' : ''}`);
  return res.json({success:true});
});
apiRouter.get('/admin/me', requireAdmin, (_req,res)=>res.json({success:true}));
apiRouter.post('/admin/logout', (req,res)=>{
  const token=getCookie(req,'py_admin_session'); if(token) adminSessions.delete(token);
  res.setHeader('Set-Cookie','py_admin_session=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict');
  return res.json({success:true});
});

// ---------- CUSTOMER OTP ----------
apiRouter.post('/otp/send', async (req,res)=>{ try {
  if(!isMailerConfigured()) return missingMailerResponse(res);
  const email=String(req.body?.email||'').trim().toLowerCase(), name=String(req.body?.name||'').trim();
  if(!isValidEmail(email)) return res.status(400).json({success:false,message:'Enter a valid email address.'});
  const otp=generateOtp(); await saveOtpSession(email,otp,name); const result=await sendOtpEmail(email,otp);
  if(!result.success) return res.status(400).json({success:false,message:result.message||'Failed to send OTP email.'});
  return res.json({success:true});
} catch(err){ console.error('OTP send error:',err); return res.status(500).json({success:false,message:'Something went wrong while sending OTP.'}); }});

apiRouter.post('/otp/verify', async (req,res)=>{ try {
  const email=String(req.body?.email||'').trim().toLowerCase(), code=String(req.body?.otp||'').replace(/\D/g,'');
  if(!isValidEmail(email)||code.length!==6) return res.status(400).json({success:false,message:'Missing email or OTP.'});
  const session=await getOtpSession(email); if(!session || !safeEqual(session.otp,code)) return res.status(400).json({success:false,message:'Invalid or expired OTP.'});
  await clearOtpSession(email); await upsertCustomer(email,session.name||'');
  return res.json({success:true,name:session.name||''});
} catch(err){ console.error('OTP verify error:',err); return res.status(500).json({success:false,message:'Something went wrong while verifying OTP.'}); }});

apiRouter.post('/otp/resend', async (req,res)=>{ try {
  if(!isMailerConfigured()) return missingMailerResponse(res);
  const email=String(req.body?.email||'').trim().toLowerCase(); if(!isValidEmail(email)) return res.status(400).json({success:false,message:'Enter a valid email address.'});
  const previous=await getOtpSession(email), otp=generateOtp(); await saveOtpSession(email,otp,previous?.name);
  const result=await sendOtpEmail(email,otp); if(!result.success) return res.status(400).json({success:false,message:result.message||'Failed to resend OTP.'});
  return res.json({success:true});
} catch(err){ console.error('OTP resend error:',err); return res.status(500).json({success:false,message:'Something went wrong while resending OTP.'}); }});

// ---------- ADMIN DATA ----------
apiRouter.get('/database/status', requireAdmin, async (_req,res)=>{ try{return res.json({success:true,...await getDatabaseStatus()});}catch{ return res.status(500).json({success:false,message:'Failed to inspect database status'}); }});
apiRouter.get('/customers', requireAdmin, async (_req,res)=>{ try { const list=await getCustomers(); return res.json({success:true,data:list,count:list.length}); } catch(err){ console.error(err); return res.status(500).json({success:false,message:'Failed to retrieve customers'}); }});

apiRouter.post('/enquiries', async (req,res)=>{ try { const {fullName,phone,email,selectedYatra,travelersCount,travelDate,vehicleType,specialRequirements,needPandit,seniorCitizenAssistance}=req.body||{}; if(!fullName||!phone)return res.status(400).json({success:false,message:'Name and Phone number are required'}); const saved=await createEnquiry({fullName:String(fullName).trim(),phone:String(phone).trim(),email:String(email||'').trim(),selectedYatra:String(selectedYatra||'General Pilgrimage').trim(),travelersCount:Number(travelersCount)||2,travelDate:String(travelDate||'').trim(),vehicleType:String(vehicleType||'Sedan (Dzire)'),specialRequirements:String(specialRequirements||'').trim(),needPandit:Boolean(needPandit),seniorCitizenAssistance:Boolean(seniorCitizenAssistance),status:'New'}); return res.status(201).json({success:true,data:saved}); } catch(err){console.error(err);return res.status(500).json({success:false,message:'Failed to save enquiry to database'});} });
apiRouter.get('/enquiries',requireAdmin,async(_req,res)=>{try{const list=await getEnquiries();return res.json({success:true,data:list,count:list.length});}catch{ return res.status(500).json({success:false,message:'Failed to retrieve enquiries'});}});
apiRouter.patch('/enquiries/:id',requireAdmin,async(req,res)=>{try{const {status}=req.body;if(!status)return res.status(400).json({success:false,message:'Status is required'});const updated=await updateEnquiryStatus(req.params.id,status);return res.json({success:true,data:updated});}catch{return res.status(500).json({success:false,message:'Failed to update enquiry'});}});
apiRouter.delete('/enquiries/:id',requireAdmin,async(req,res)=>{try{await deleteEnquiry(req.params.id);return res.json({success:true});}catch{return res.status(500).json({success:false,message:'Failed to delete enquiry'});}});

apiRouter.post('/bookings',async(req,res)=>{try{const {id,bookingId,yatraId,yatraTitle,customerName,customerPhone,customerEmail,travelDate,guestsCount,tier,unitPrice,totalEstimatedAmount,pickupPoint,needPandit,seniorAssistance,satvikMeals,specialRequests}=req.body||{};const code=bookingId||id||`PY-2026-${crypto.randomInt(10000,100000)}`;if(!customerName||!customerPhone||!yatraTitle)return res.status(400).json({success:false,message:'Name, Phone, and Yatra Title are required'});const saved=await createBooking({bookingId:code,yatraId:yatraId||'',yatraTitle:String(yatraTitle).trim(),customerName:String(customerName).trim(),customerPhone:String(customerPhone).trim(),customerEmail:String(customerEmail||'').trim(),travelDate:String(travelDate||'').trim(),guestsCount:Number(guestsCount)||1,tier:String(tier||'Standard'),unitPrice:Number(unitPrice)||0,totalEstimatedAmount:Number(totalEstimatedAmount)||0,pickupPoint:String(pickupPoint||'Direct Arrival'),needPandit:Boolean(needPandit),seniorAssistance:Boolean(seniorAssistance),satvikMeals:Boolean(satvikMeals),specialRequests:String(specialRequests||'').trim(),status:'Confirmed'});return res.status(201).json({success:true,data:saved});}catch(err){console.error(err);return res.status(500).json({success:false,message:'Failed to save booking to database'});}});
apiRouter.get('/bookings',requireAdmin,async(_req,res)=>{try{const list=await getBookings();return res.json({success:true,data:list,count:list.length});}catch{return res.status(500).json({success:false,message:'Failed to retrieve bookings'});}});
apiRouter.patch('/bookings/:id',requireAdmin,async(req,res)=>{try{const {status,notes}=req.body;if(!status)return res.status(400).json({success:false,message:'Status is required'});const updated=await updateBookingStatus(req.params.id,status,notes);return res.json({success:true,data:updated});}catch{return res.status(500).json({success:false,message:'Failed to update booking'});}});
apiRouter.delete('/bookings/:id',requireAdmin,async(req,res)=>{try{await deleteBooking(req.params.id);return res.json({success:true});}catch{return res.status(500).json({success:false,message:'Failed to delete booking'});}});
