const CACHE_NAME = "v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon/favicon.svg",
  "/favicon/favicon-96x96.png",
  "/fonts/Angella-White.ttf",
  "/fonts/Birthstone-Regular.ttf",
  "/fonts/Breathing.ttf",
  "/fonts/Catchy-Mager.ttf",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request)),
  );
});
