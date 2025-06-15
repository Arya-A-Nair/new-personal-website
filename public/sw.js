const CACHE_NAME = "arya-nair-portfolio-v1";
const STATIC_CACHE_NAME = "arya-nair-static-v1";
const DYNAMIC_CACHE_NAME = "arya-nair-dynamic-v1";

// Assets to cache immediately
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

// Install event - cache static assets
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

// Activate event - clean up old caches
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

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", event => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip external requests
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
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache dynamic content
          caches.open(DYNAMIC_CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
        });
    })
  );
});

// Background sync for when connection is restored
self.addEventListener("sync", event => {
  console.log("Service Worker: Background sync", event.tag);
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Perform background sync tasks here
      console.log("Service Worker: Performing background sync")
    );
  }
});

// Push notification handling
self.addEventListener("push", event => {
  console.log("Service Worker: Push received");

  const options = {
    body: event.data ? event.data.text() : "New update available!",
    icon: "/images/profilePic.png",
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
        icon: "/images/profilePic.png",
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

// Notification click handling
self.addEventListener("notificationclick", event => {
  console.log("Service Worker: Notification clicked");
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});

// Handle app updates
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
