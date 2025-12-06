import React, { useState } from 'react';

const SupabaseSetup: React.FC = () => {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    const trimmedUrl = url.trim();
    const trimmedAnonKey = anonKey.trim();

    if (!trimmedUrl || !trimmedAnonKey) {
      setError('Ambos os campos são obrigatórios.');
      return;
    }

    // Regex to validate the Supabase URL format: https://<project-ref>.supabase.co
    const supabaseUrlRegex = /^https:\/\/[a-zA-Z0-9-]+\.supabase\.co$/;

    if (!supabaseUrlRegex.test(trimmedUrl)) {
      setError('URL do Supabase inválida. O formato esperado é: https://<ref>.supabase.co');
      return;
    }

    localStorage.setItem('supabaseUrl', trimmedUrl);
    localStorage.setItem('supabaseAnonKey', trimmedAnonKey);
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Configuração do Supabase
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Para começar, insira as credenciais do seu projeto Supabase.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="supabase-url" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              URL do Projeto
            </label>
            <input
              id="supabase-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemplo.supabase.co"
              className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 dark:bg-slate-900 dark:border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="supabase-key" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Chave Anônima (Pública)
            </label>
            <input
              id="supabase-key"
              type="text"
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOi..."
              className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 dark:bg-slate-900 dark:border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              required
            />
          </div>
        </div>
        {error && <p className="text-sm text-center text-red-600 dark:text-red-400">{error}</p>}
        <div>
          <button
            onClick={handleSave}
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-500 text-white hover:bg-sky-600 h-10 px-4 py-2"
          >
            Salvar e Conectar
          </button>
        </div>
         <div className="text-xs text-center text-slate-500 dark:text-slate-400 space-y-1">
            <p>
                Suas chaves são salvas com segurança no seu navegador.
            </p>
             <a href="https://supabase.com/docs/guides/api#api-url-and-keys" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-500">
                Onde encontrar essas chaves?
            </a>
        </div>
      </div>
    </div>
  );
};

export default SupabaseSetup;
