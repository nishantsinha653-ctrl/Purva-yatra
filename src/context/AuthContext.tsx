import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  toggleSavedYatra: (yatraId: string) => void;
  isYatraSaved: (yatraId: string) => boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

const STORAGE_KEY = 'purva_yatra_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save user to localStorage', e);
    }
  }, [user]);

  const login = (email: string, name?: string) => {
    const existing = user?.email === email ? user : null;
    const newUser: UserProfile = {
      email,
      name: name || existing?.name || '',
      phone: existing?.phone || '',
      city: existing?.city || '',
      loggedInAt: new Date().toISOString(),
      savedYatras: existing?.savedYatras || ['gaya-ji'],
    };
    setUser(newUser);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsProfileModalOpen(false);
  };

  const updateUser = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const toggleSavedYatra = (yatraId: string) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    const current = user.savedYatras || [];
    const updated = current.includes(yatraId)
      ? current.filter((id) => id !== yatraId)
      : [...current, yatraId];
    updateUser({ savedYatras: updated });
  };

  const isYatraSaved = (yatraId: string) => {
    return !!user?.savedYatras?.includes(yatraId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        updateUser,
        toggleSavedYatra,
        isYatraSaved,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        isProfileModalOpen,
        openProfileModal: () => setIsProfileModalOpen(true),
        closeProfileModal: () => setIsProfileModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
