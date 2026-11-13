const VERSION = "v4";
const CORE_CACHE = `canvas-craft-core-${VERSION}`;
const FONT_CACHE = `canvas-craft-fonts-${VERSION}`;

const CORE_ASSETS = [
  "/",
  "/index.html",
  "/assets/css/styles.css",
  "/assets/js/app.js",
  "/manifest.webmanifest",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png",
  "/assets/icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CORE_CACHE && k !== FONT_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: cache after first load, serve from cache afterwards.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) =>
        cache.match(req).then(
          (hit) =>
            hit ||
            fetch(req).then((res) => {
              cache.put(req, res.clone());
              return res;
            })
        )
      )
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Same-origin: network first so every online visit gets the latest build.
  // Falls back to the cache when offline or the network is too slow.
  event.respondWith(
    fetchFresh(req).catch(() =>
      caches
        .match(req, { ignoreSearch: true })
        .then((hit) => hit || caches.match("/index.html"))
    )
  );
});

function fetchFresh(req) {
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 4000));
  const network = fetch(req, { cache: "no-cache" }).then((res) => {
    if (res.ok) {
      const copy = res.clone();
      caches.open(CORE_CACHE).then((c) => c.put(req, copy));
    }
    return res;
  });
  return Promise.race([network, timeout]);
}
