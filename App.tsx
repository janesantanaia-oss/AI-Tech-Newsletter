
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import Article from './pages/Article';
import CreateArticle from './pages/CreateArticle';
import Admin from './pages/Admin';
import NewsletterForm from './pages/NewsletterForm';
import { BeforeInstallPromptEvent } from './types';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA prompt');
        } else {
          console.log('User dismissed the PWA prompt');
        }
        setInstallPromptEvent(null);
      });
    }
  };

  const handleDismissInstall = () => {
    setInstallPromptEvent(null);
  };

  return (
    <ThemeProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-sky-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="/create" element={<CreateArticle />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/new" element={<NewsletterForm />} />
              <Route path="/admin/edit/:id" element={<NewsletterForm />} />
            </Routes>
          </main>
          <Footer />
          {installPromptEvent && (
            <PWAInstallPrompt onInstall={handleInstallClick} onDismiss={handleDismissInstall} />
          )}
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
