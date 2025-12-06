import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const isSupabaseConfigured = (): boolean => {
  const supabaseUrl = localStorage.getItem('supabaseUrl');
  const supabaseAnonKey = localStorage.getItem('supabaseAnonKey');
  return !!supabaseUrl && !!supabaseAnonKey;
};

let supabaseClientInstance: SupabaseClient | null = null;

const getClient = (): SupabaseClient => {
    if (supabaseClientInstance) {
        return supabaseClientInstance;
    }

    const supabaseUrl = localStorage.getItem('supabaseUrl');
    const supabaseAnonKey = localStorage.getItem('supabaseAnonKey');

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase has not been configured yet. Please provide the URL and Anon Key.');
    }

    supabaseClientInstance = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseClientInstance;
}

// Usando um Proxy para inicializar o cliente de forma "preguiçosa" (lazy).
// Isso impede que o aplicativo trave na inicialização se o Supabase não estiver configurado.
// O cliente só será criado na primeira vez que um de seus métodos for chamado.
export const supabase = new Proxy({}, {
    get(_, prop) {
        return Reflect.get(getClient(), prop);
    },
}) as SupabaseClient;

if (!isSupabaseConfigured()) {
  console.warn("Supabase URL and/or Anon Key not provided. The application will display a setup component.");
}
