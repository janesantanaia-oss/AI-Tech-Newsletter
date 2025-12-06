
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {currentYear} AI Tech Newsletter. Todos os direitos reservados.
        </p>
        <div className="mt-2">
            <Link to="/admin" className="text-xs text-slate-500 dark:text-slate-400 hover:text-sky-500 hover:underline">
                Painel de Administração
            </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
