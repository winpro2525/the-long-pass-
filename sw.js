/* THE LONG PASS — Service Worker */
const VERSION = 'tlp-v2';
const SHELL = [
  './',
  './index.html',
  './students.html',
  './announcements.html',
  './content.html',
  './members.html',
  './hall.html',
  './chat.html',
  './assets/app.css',
  './assets/app.js',
  './offline.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(VERSION).then((c) => Promise.all(
      SHELL.map((u) => c.add(new Request(u, { cache: 'reload' })).catch(() => null))
    ))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

const isApi = (url) => /supabase\.co/.test(url.host);

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // لا نتدخّل في طلبات Supabase (بيانات حيّة دائماً)
  if (isApi(url)) return;

  // التنقّل بين الصفحات: الشبكة أولاً ثم الذاكرة ثم صفحة عدم الاتصال
  if (req.mode === 'navigate' || (req.destination === 'document')) {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const c = await caches.open(VERSION);
        c.put(req, fresh.clone()).catch(() => {});
        return fresh;
      } catch {
        const cached = await caches.match(req, { ignoreSearch: true });
        return cached || caches.match('./offline.html');
      }
    })());
    return;
  }

  // بقية الملفات (خطوط، سكربتات CDN، أيقونات): ذاكرة أولاً مع تحديث خلفي
  e.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    const network = fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    }).catch(() => null);
    return cached || (await network) || new Response('', { status: 504 });
  })());
});
