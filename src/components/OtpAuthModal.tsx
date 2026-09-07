import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, ShieldCheck, ArrowRight, RefreshCw, CheckCircle2, Sparkles, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface OtpAuthModalProps {
  lang: 'en' | 'hi';
}

async function postJson(url: string, body: object): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch {
    return { success: false, message: 'network-error' };
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const OtpAuthModal: React.FC<OtpAuthModalProps> = ({ lang }) => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();

  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  // 6 digit OTP boxes
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function friendlyError(message: string | undefined): string {
    if (message === 'network-error') {
      return lang === 'hi'
        ? 'सर्वर से जुड़ नहीं पाए। कृपया दोबारा प्रयास करें।'
        : 'Could not reach the server. Please try again.';
    }
    return (
      message ||
      (lang === 'hi'
        ? 'ओटीपी भेजने/जांचने में कुछ गड़बड़ हुई। कृपया दोबारा प्रयास करें।'
        : 'Something went wrong while sending/verifying OTP. Please try again.')
    );
  }

  // Reset when modal opens/closes
  useEffect(() => {
    if (isLoginModalOpen) {
      setStep('email');
      setEmail('');
      setFullName('');
      setOtpDigits(['', '', '', '', '', '']);
      setErrorMessage('');
      setResendTimer(30);
    }
  }, [isLoginModalOpen]);

  // Resend countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isLoginModalOpen) return null;

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    if (!isValidEmail(cleanEmail)) {
      setErrorMessage(
        lang === 'hi' ? 'कृपया एक वैध ईमेल पता दर्ज करें' : 'Please enter a valid email address'
      );
      return;
    }

    setIsSending(true);
    const result = await postJson('/api/otp/send', { email: cleanEmail, name: fullName });
    setIsSending(false);

    if (result.success) {
      setStep('otp');
      setResendTimer(30);
      setOtpDigits(['', '', '', '', '', '']);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    } else {
      setErrorMessage(friendlyError(result.message));
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    setErrorMessage('');
    const digit = val.replace(/\D/g, '').slice(-1);

    const newOtp = [...otpDigits];
    newOtp[index] = digit;
    setOtpDigits(newOtp);

    // Auto advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit if all 6 digits entered
    if (digit && index === 5) {
      const fullCode = newOtp.join('');
      if (fullCode.length === 6) {
        verifyOtp(fullCode);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || '';
    }
    setOtpDigits(newOtp);

    if (pastedData.length === 6) {
      verifyOtp(pastedData);
    } else {
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const verifyOtp = async (codeToVerify?: string) => {
    const code = codeToVerify || otpDigits.join('');
    if (code.length < 6) {
      setErrorMessage(
        lang === 'hi' ? 'कृपया पूरा ओटीपी दर्ज करें' : 'Please enter the full OTP'
      );
      return;
    }

    setIsVerifying(true);
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const result = await postJson('/api/otp/verify', { email: cleanEmail, otp: code });
    setIsVerifying(false);

    if (result.success) {
      setStep('success');
      setTimeout(() => {
        login(cleanEmail, fullName || (lang === 'hi' ? 'तीर्थयात्री' : 'Pilgrim'));
      }, 1200);
    } else {
      setErrorMessage(friendlyError(result.message));
    }
  };

  const handleResend = async () => {
    setErrorMessage('');
    const cleanEmail = email.trim().toLowerCase();
    setIsSending(true);
    const result = await postJson('/api/otp/resend', { email: cleanEmail });
    setIsSending(false);

    if (result.success) {
      setResendTimer(30);
      setOtpDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } else {
      setErrorMessage(friendlyError(result.message));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">

      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={closeLoginModal} />

      {/* Modal Card */}
      <div
        className="relative z-10 bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-200 text-gray-900 font-sans animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header with Temple Motif */}
        <div className="bg-[#0b1224] text-white p-6 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#cca042]/15 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#cca042] to-[#f4deb2] flex items-center justify-center p-0.5 shadow-sm">
              <div className="w-full h-full bg-[#0b1224] rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#cca042]" />
              </div>
            </div>
            <div>
              <span className="text-sm font-serif tracking-widest text-[#cca042] font-semibold uppercase">
                PURVA YATRA
              </span>
              <p className="text-[10px] text-gray-400 font-light tracking-wider">
                {lang === 'hi' ? 'आस्था से यात्रा, आशीर्वाद के साथ वापसी' : 'Travel with Faith, Return with Blessings'}
              </p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif text-white mt-2 font-medium tracking-wide">
            {step === 'otp'
              ? (lang === 'hi' ? 'ओटीपी सत्यापन' : 'Verify Email OTP')
              : step === 'success'
              ? (lang === 'hi' ? 'लॉगिन संपन्न' : 'Welcome to Purva Yatra')
              : (lang === 'hi' ? 'लॉगिन / साइन इन' : 'Devotee & Traveler Login')}
          </h2>

          <p className="text-xs text-gray-300 mt-1 font-light">
            {step === 'otp'
              ? (lang === 'hi' ? `${email} पर 6-अंकों का कोड भेजा गया है` : `Enter 6-digit code sent to ${email}`)
              : step === 'success'
              ? (lang === 'hi' ? 'आपकी तीर्थ यात्रा आईडी सक्रिय हो गई है' : 'Your spiritual journey account is ready')
              : (lang === 'hi' ? 'अपने ईमेल से 1-क्लिक सुरक्षित ओटीपी लॉगिन करें' : 'Seamless 1-Click OTP Login with your email')}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">

          {/* STEP 1: EMAIL INPUT */}
          {step === 'email' && (
            <form onSubmit={handleSendOtp} className="space-y-4">

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  {lang === 'hi' ? 'ईमेल पता' : 'Email Address'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setErrorMessage('');
                      setEmail(e.target.value);
                    }}
                    autoFocus
                    className="w-full px-3.5 py-2.5 pl-9 rounded-lg border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#cca042] focus:ring-1 focus:ring-[#cca042] placeholder-gray-400"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>{lang === 'hi' ? 'यात्री का नाम (वैकल्पिक)' : 'Full Name (Optional)'}</span>
                  <span className="text-[10px] text-gray-400 font-normal">{lang === 'hi' ? 'सुझाव' : 'Personalize experience'}</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={lang === 'hi' ? 'उदा. राजेश शर्मा' : 'e.g. Rajesh Sharma'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 pl-9 rounded-lg border border-gray-300 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#cca042] focus:ring-1 focus:ring-[#cca042] placeholder-gray-400"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span>
                  {lang === 'hi'
                    ? 'ओटीपी आपके ईमेल पर भेजा जाएगा'
                    : 'OTP will be sent to your email inbox'}
                </span>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSending || !isValidEmail(email)}
                className="w-full py-3 px-4 bg-[#cca042] hover:bg-[#b88c34] disabled:bg-gray-200 disabled:text-gray-400 text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{lang === 'hi' ? 'ओटीपी भेजा जा रहा है...' : 'Sending OTP...'}</span>
                  </>
                ) : (
                  <>
                    <span>{lang === 'hi' ? 'ओटीपी भेजें (Send OTP)' : 'Send OTP'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'hi' ? 'सुरक्षित • कोई स्पैम नहीं' : '100% Secure • No spam or marketing emails'}</span>
              </div>
            </form>
          )}

          {/* STEP 2: ENTER & VERIFY OTP */}
          {step === 'otp' && (
            <div className="space-y-4">

              {/* 6 Digit Segmented Inputs */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 text-center">
                  {lang === 'hi' ? '6-अंकों का ओटीपी दर्ज करें' : 'Enter 6-Digit Verification Code'}
                </label>

                <div className="flex items-center justify-center gap-2 sm:gap-2.5" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className={`w-11 h-12 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-bold rounded-lg border transition-all ${
                        digit
                          ? 'border-[#cca042] bg-[#fdfaf3] text-[#926017]'
                          : 'border-gray-300 bg-white text-gray-900'
                      } focus:outline-none focus:border-[#cca042] focus:ring-2 focus:ring-[#cca042]/30 shadow-xs`}
                    />
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium text-center">
                  {errorMessage}
                </div>
              )}

              {/* Verify CTA */}
              <button
                type="button"
                onClick={() => verifyOtp()}
                disabled={isVerifying || otpDigits.join('').length < 6}
                className="w-full py-3 px-4 bg-[#cca042] hover:bg-[#b88c34] disabled:bg-gray-200 disabled:text-gray-400 text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{lang === 'hi' ? 'सत्यापित हो रहा है...' : 'Verifying...'}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'ओटीपी सत्यापित करें (Verify OTP)' : 'Verify & Sign In'}</span>
                  </>
                )}
              </button>

              {/* Resend Timer & Edit Email */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-gray-600 hover:text-black underline cursor-pointer"
                >
                  ← {lang === 'hi' ? 'ईमेल बदलें' : 'Change Email'}
                </button>

                {resendTimer > 0 ? (
                  <span className="text-gray-400">
                    {lang === 'hi' ? `पुनः भेजें (${resendTimer}s)` : `Resend in ${resendTimer}s`}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#926017] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{lang === 'hi' ? 'ओटीपी दोबारा भेजें' : 'Resend OTP'}</span>
                  </button>
                )}
              </div>

            </div>
          )}

          {/* STEP 3: SUCCESS ANIMATION */}
          {step === 'success' && (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-900">
                {lang === 'hi' ? 'लॉगिन सफल!' : 'Login Successful!'}
              </h3>
              <p className="text-xs text-gray-600">
                {lang === 'hi'
                  ? `नमस्ते ${fullName || 'यात्री'}! पूर्वा यात्रा में आपका स्वागत है।`
                  : `Namaste ${fullName || 'Devotee'}! Welcome to Purva Yatra.`}
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
