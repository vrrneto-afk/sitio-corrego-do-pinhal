const CACHE_NAME = "sitio-corrego-v3";

const URLS = [
  "/sitio-corrego-do-pinhal/",
  "/sitio-corrego-do-pinhal/index.html",
  "/sitio-corrego-do-pinhal/manifest.json",
  "/sitio-corrego-do-pinhal/logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
