import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../types';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Escuro' },
    { value: 'system', label: 'Sistema' },
  ];

  return (
    <div className="flex items-center p-1 space-x-1 rounded-full bg-slate-200 dark:bg-slate-800">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={`px-3 py-1 text-sm font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-sky-50 dark:focus:ring-offset-slate-900 ${
            theme === option.value
              ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-500 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-700/50'
          }`}
          aria-pressed={theme === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
