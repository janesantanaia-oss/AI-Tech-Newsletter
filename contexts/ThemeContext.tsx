import React, { createContext, useState, useEffect } from 'react';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Placeholder for Supabase integration
const saveThemeToSupabase = async (theme: Theme) => {
  // TODO: Implement Supabase call to save the user's theme preference.
  // This will require user authentication and a 'user_preferences' table.
  // Example: await supabase.from('user_preferences').update({ theme }).eq('user_id', userId);
  console.log(`Saving theme "${theme}" to Supabase (placeholder).`);
  return Promise.resolve();
};


const getInitialTheme = (): Theme => {
  // TODO: When Supabase and user auth are integrated, this could be extended
  // to fetch the user's saved preference from the database after login.
  // For now, it prioritizes localStorage to ensure a fast, flicker-free theme load.
  if (typeof window === 'undefined') {
    return 'system';
  }
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
    return storedTheme;
  }
  return 'system';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isDarkMode = theme === 'dark' || (theme === 'system' && systemPrefersDark);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
    // Asynchronously save the theme to the backend without blocking the UI update.
    saveThemeToSupabase(newTheme).catch(error => {
        console.error("Failed to save theme to Supabase:", error);
    });
  };

  const value = { theme, setTheme, isDarkMode };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
