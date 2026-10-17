const CACHE_NAME = "portfolio-static-v2"
const RUNTIME_CACHE = "portfolio-runtime-v2"

const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo.webp",
  "/og-preview.png",
  "/robots.txt",
  "/sitemap.xml",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener("activate", (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE]
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => !currentCaches.includes(cacheName))
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and browser extensions
  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return
  }

  // 1. Navigation requests: Network-First with Cache Fallback to '/'
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request, { signal: AbortSignal.timeout(10_000) })
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone()
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy))
          }
          return response
        })
        .catch(async () => {
          const cached = await caches.match(request)
          if (cached) return cached
          const fallback = await caches.match("/")
          return fallback || Response.error()
        }),
    )
    return
  }

  // 2. Static hashed build assets & images: Cache-First with Stale-While-Revalidate
  const isStaticAsset =
    url.pathname.startsWith("/assets/") ||
    /\.(?:js|css|webp|png|jpg|jpeg|svg|woff2?|ico)$/i.test(url.pathname)

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const copy = networkResponse.clone()
              caches
                .open(RUNTIME_CACHE)
                .then((cache) => cache.put(request, copy))
            }
            return networkResponse
          })
          .catch(() => cachedResponse)

        return cachedResponse || fetchPromise
      }),
    )
    return
  }

  // 3. Other requests (Google fonts, external): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone()
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy))
          }
          return networkResponse
        })
        .catch(() => cachedResponse)

      return cachedResponse || fetchPromise
    }),
  )
})
