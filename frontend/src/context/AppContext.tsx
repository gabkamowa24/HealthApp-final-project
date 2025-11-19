import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { setAuthToken } from '../services/api';

type AppContextState = {
  token: string | null;
  setToken: (token: string | null) => void;
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

const AppContext = createContext<AppContextState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const setToken = (value: string | null) => {
    setTokenState(value);
    if (typeof window !== 'undefined') {
      if (value) {
        localStorage.setItem('token', value);
      } else {
        localStorage.removeItem('token');
      }
    }
    setAuthToken(value);
  };

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const value = useMemo(
    () => ({ token, setToken, search, setSearch, selectedCategory, setSelectedCategory }),
    [token, search, selectedCategory]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

