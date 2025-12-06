import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon, CheckIcon } from './icons';
import { Theme } from '../types';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Escuro' },
    { value: 'system', label: 'Sistema' },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    // Add listener after a delay to avoid capturing the click that opened the dropdown
    const timerId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timerId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-sky-50 dark:focus:ring-offset-slate-900 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Toggle theme menu"
      >
        {isDarkMode ? (
          <MoonIcon className="h-6 w-6" />
        ) : (
          <SunIcon className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-20">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelectTheme(option.value)}
              className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between transition-colors"
            >
              <span>{option.label}</span>
              {theme === option.value && <CheckIcon className="w-5 h-5 text-sky-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;