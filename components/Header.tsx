
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from './icons';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-10 bg-sky-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex-shrink-0">
            AI Tech Newsletter
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 flex-grow justify-end">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-md py-2 pl-10 pr-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                aria-label="Pesquisar artigos"
              />
            </div>
             <Link
              to="/create"
              className="hidden sm:inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-500 text-white hover:bg-sky-600 h-10 px-4 py-2"
            >
              Criar Edição
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;