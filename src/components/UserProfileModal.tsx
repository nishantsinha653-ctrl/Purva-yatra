import React, { useState } from 'react';
import { X, User, Phone, Mail, MapPin, LogOut, CheckCircle2, Bookmark, ArrowRight, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { YATRA_PACKAGES } from '../data/yatras';
import { YatraPackage } from '../types';

interface UserProfileModalProps {
  lang: 'en' | 'hi';
  onSelectPackage: (pkg: YatraPackage) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ lang, onSelectPackage }) => {
  const { user, isProfileModalOpen, closeProfileModal, logout, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [city, setCity] = useState(user?.city || '');

  if (!isProfileModalOpen || !user) return null;

  const savedPackages = YATRA_PACKAGES.filter((p) => user.savedYatras?.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, city });
    setEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="fixed inset-0" onClick={closeProfileModal} />

      <div 
        className="relative z-10 bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-200 text-gray-900 font-sans animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b1224] text-white p-6 relative">
          <button
            onClick={closeProfileModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#cca042] text-black font-serif font-bold text-lg flex items-center justify-center shadow-md">
              {(user.name ? user.name[0] : 'Y').toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-serif font-medium text-white">
                  {user.name || (lang === 'hi' ? 'तीर्थयात्री' : 'Pilgrim Devotee')}
                </h2>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" title="Verified Email" />
              </div>
              <p className="text-xs text-gray-300 font-mono tracking-wider flex items-center gap-1 mt-0.5">
                <Mail className="w-3 h-3 text-[#cca042]" />
                <span>{user.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Profile Details */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {lang === 'hi' ? 'यात्री विवरण' : 'Devotee Profile'}
              </span>
              <button
                type="button"
                onClick={() => setEditing(!editing)}
                className="text-xs text-[#926017] font-semibold hover:underline cursor-pointer"
              >
                {editing ? (lang === 'hi' ? 'रद्द करें' : 'Cancel') : (lang === 'hi' ? 'संपादित करें' : 'Edit')}
              </button>
            </div>

            {editing ? (
              <form onSubmit={handleSaveProfile} className="space-y-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 uppercase mb-1">
                    {lang === 'hi' ? 'नाम' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded border border-gray-300 focus:outline-none focus:border-[#cca042]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 uppercase mb-1">
                    {lang === 'hi' ? 'शहर / राज्य' : 'City / State'}
                  </label>
                  <input
                    type="text"
                    value={city}
                    placeholder="e.g. Patna, Kolkata, Varanasi"
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded border border-gray-300 focus:outline-none focus:border-[#cca042]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#cca042] hover:bg-[#b88c34] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  {lang === 'hi' ? 'सुरक्षित करें' : 'Save Details'}
                </button>
              </form>
            ) : (
              <div className="bg-[#faf8f5] p-3.5 rounded-xl border border-gray-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">{lang === 'hi' ? 'स्थिति:' : 'Status:'}</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified OTP Member
                  </span>
                </div>
                {user.city && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{lang === 'hi' ? 'स्थान:' : 'Location:'}</span>
                    <span className="font-medium text-gray-800 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#cca042]" />
                      <span>{user.city}</span>
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-200">
                  <span>{lang === 'hi' ? 'सक्रिय सत्र:' : 'Logged In:'}</span>
                  <span>{new Date(user.loggedInAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            )}
          </div>

          {/* Saved Yatras / Bookmarks */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-[#cca042]" />
              <span>{lang === 'hi' ? 'सहेजी गई यात्राएं (Saved Yatras)' : 'Saved Pilgrimages & Trips'}</span>
              <span className="ml-auto text-[11px] text-gray-400 font-normal">({savedPackages.length})</span>
            </span>

            {savedPackages.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {savedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => {
                      closeProfileModal();
                      onSelectPackage(pkg);
                    }}
                    className="p-2.5 rounded-lg border border-gray-200 hover:border-[#cca042] bg-white hover:bg-gray-50 flex items-center justify-between gap-2 cursor-pointer transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-10 h-10 rounded object-cover shrink-0"
                      />
                      <div className="truncate">
                        <h4 className="text-xs font-serif font-medium text-gray-900 truncate">
                          {pkg.title}
                        </h4>
                        <span className="text-[10px] text-gray-500 block">
                          {pkg.duration} • {pkg.category}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg text-center text-xs text-gray-500 border border-dashed border-gray-300">
                {lang === 'hi' ? 'अभी कोई यात्रा सहेजी नहीं गई है।' : 'No saved pilgrimages yet.'}
              </div>
            )}
          </div>

          {/* Logout button */}
          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full py-2.5 px-4 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-600" />
              <span>{lang === 'hi' ? 'लॉगआउट करें (Sign Out)' : 'Log Out'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
