// sw.js

const CACHE_NAME = 'ai-tech-newsletter-v1';

// URLs para cache na instalação. Isso forma o "app shell".
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/index.tsx', 
  // Evitamos o cache direto de scripts de CDN para prevenir problemas com respostas opacas,
  // confiando no cache HTTP padrão do navegador para eles. O service worker
  // focará nos arquivos principais da aplicação para uma experiência offline confiável.
];

// Evento de instalação: armazena o app shell em cache.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Armazenando o app shell em cache');
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(err => {
        console.error('Service Worker: Falha ao armazenar o app shell em cache:', err);
      })
  );
});

// Evento de ativação: limpa caches antigos.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de fetch: serve os recursos do cache, com fallback para a rede.
self.addEventListener('fetch', (event) => {
  // Apenas lidamos com requisições GET.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Encontrado no cache - retorna a resposta do cache.
        if (cachedResponse) {
          return cachedResponse;
        }

        // Não está no cache - busca na rede.
        return fetch(event.request)
          .then((networkResponse) => {
            // Verifica se recebemos uma resposta válida para armazenar em cache
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clona a resposta e a armazena em cache.
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // Se a rede falhar e for uma requisição de navegação, retorna a página offline.
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});
