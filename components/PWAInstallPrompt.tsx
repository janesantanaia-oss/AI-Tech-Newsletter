import React from 'react';
import { XIcon } from './icons';

interface PWAInstallPromptProps {
  onInstall: () => void;
  onDismiss: () => void;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onInstall, onDismiss }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-md z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-4 flex items-center justify-between gap-4 border border-slate-200 dark:border-slate-700">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sky-500 rounded-md flex items-center justify-center text-white font-bold text-xl">
                    AI
                </div>
            </div>
            <div className="flex-grow">
                <p className="font-bold text-slate-900 dark:text-slate-100">Instale o App</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Acesse rapidamente a newsletter.</p>
            </div>
            <div className="flex items-center gap-2">
                 <button 
                    onClick={onDismiss}
                    className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Dispensar"
                >
                    <XIcon className="w-5 h-5" />
                </button>
                <button 
                    onClick={onInstall}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Instalar
                </button>
            </div>
        </div>
    </div>
  );
};

export default PWAInstallPrompt;
