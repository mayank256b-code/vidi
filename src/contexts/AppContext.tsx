import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from '../i18n/translations';

type UserRole = 'student' | 'teacher' | 'admin' | null;

interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  avatar: string;
}

interface AppState {
  user: User | null;
  language: Language;
  isLoggedIn: boolean;
  showLoading: boolean;
  currentTutorId: string | null;
}

interface AppContextType extends AppState {
  login: (role: UserRole) => void;
  logout: () => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  setShowLoading: (show: boolean) => void;
  setCurrentTutorId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    language: 'en',
    isLoggedIn: false,
    showLoading: false,
    currentTutorId: null,
  });

  const login = (role: UserRole) => {
    const mockUser: User = {
      id: 'u1',
      name: role === 'teacher' ? 'Sita Teacher' : role === 'admin' ? 'Admin' : 'Aarav Student',
      role,
      phone: '+977 9800000000',
      email: 'user@vidi.com',
      avatar: '',
    };
    setState(prev => ({ ...prev, user: mockUser, isLoggedIn: true }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null, isLoggedIn: false }));
  };

  const toggleLanguage = () => {
    setState(prev => ({ ...prev, language: prev.language === 'en' ? 'ne' : 'en' }));
  };

  const t = (key: string): string => {
    const trans = translations[state.language];
    return (trans as any)[key] || key;
  };

  const setShowLoading = (show: boolean) => {
    setState(prev => ({ ...prev, showLoading: show }));
  };

  const setCurrentTutorId = (id: string | null) => {
    setState(prev => ({ ...prev, currentTutorId: id }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      login,
      logout,
      toggleLanguage,
      t,
      setShowLoading,
      setCurrentTutorId,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
