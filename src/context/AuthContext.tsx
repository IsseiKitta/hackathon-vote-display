"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  checkAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  checkAuth: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/mypage', {
        credentials: 'include',
      });
      setIsLoggedIn(res.ok);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const performAuthCheck = async () => {
      try {
        const res = await fetch('/api/mypage', {
          credentials: 'include',
        });
        if (isMounted) {
          setIsLoggedIn(res.ok);
        }
      } catch {
        if (isMounted) {
          setIsLoggedIn(false);
        }
      }
    };

    performAuthCheck();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
