const CACHE_NAME = "arya-nair-portfolio-v1";
const STATIC_CACHE_NAME = "arya-nair-static-v1";
const DYNAMIC_CACHE_NAME = "arya-nair-dynamic-v1";

const STATIC_ASSETS = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  "/favicon.ico",
  "/images/profilePic.png",
  "/images/Background.png",
  "/images/preloader.gif",
];

self.addEventListener("install", event => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log("Service Worker: Caching static assets");
        return cache.addAll(
          STATIC_ASSETS.map(
            url => new Request(url, { credentials: "same-origin" })
          )
        );
      })
      .catch(error => {
        console.log("Service Worker: Cache failed", error);
      })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (
            cacheName !== STATIC_CACHE_NAME &&
            cacheName !== DYNAMIC_CACHE_NAME
          ) {
            console.log("Service Worker: Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
    return;
  }

  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then(response => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(DYNAMIC_CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
        });
    })
  );
});

self.addEventListener("sync", event => {
  console.log("Service Worker: Background sync", event.tag);
  if (event.tag === "background-sync") {
    event.waitUntil(console.log("Service Worker: Performing background sync"));
  }
});

self.addEventListener("push", event => {
  console.log("Service Worker: Push received");

  const options = {
    body: event.data ? event.data.text() : "New update available!",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "View Portfolio",
        icon: "/favicon.ico",
      },
      {
        action: "close",
        title: "Close",
        icon: "/favicon.ico",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Arya Nair Portfolio", options)
  );
});

self.addEventListener("notificationclick", event => {
  console.log("Service Worker: Notification clicked");
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
