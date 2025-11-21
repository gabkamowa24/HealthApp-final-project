import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { setAuthToken } from '../services/api';

type AppContextState = {
  token: string | null;
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

const AppContext = createContext<AppContextState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    let isMounted = true;

    const syncToken = async () => {
      if (!isSignedIn) {
        if (isMounted) {
          setToken(null);
          setAuthToken(null);
        }
        return;
      }

      try {
        const authToken = await getToken();
        if (isMounted) {
          setToken(authToken ?? null);
          setAuthToken(authToken);
        }
      } catch (error) {
        console.error('Unable to fetch Clerk token', error);
        if (isMounted) {
          setToken(null);
          setAuthToken(null);
        }
      }
    };

    void syncToken();

    return () => {
      isMounted = false;
    };
  }, [isSignedIn, getToken]);

  const value = useMemo(
    () => ({
      token,
      search,
      setSearch,
      selectedCategory,
      setSelectedCategory,
    }),
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

