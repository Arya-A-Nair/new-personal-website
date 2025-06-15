const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL(
      process.env.PUBLIC_URL || "",
      window.location.href
    );
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log("PWA: Service worker is ready for localhost");
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      console.log("PWA: Service worker registered successfully");

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log("PWA: New content available, please refresh");
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log("PWA: Content cached for offline use");
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error("PWA: Service worker registration failed:", error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then(response => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "PWA: No internet connection found. App is running in offline mode."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}

let deferredPrompt: any;

export function initializePWAPrompt() {
  window.addEventListener("beforeinstallprompt", e => {
    console.log("PWA: Install prompt available");
    e.preventDefault();
    deferredPrompt = e;
    showInstallPromotion();
  });

  window.addEventListener("appinstalled", () => {
    console.log("PWA: App was installed");
    hideInstallPromotion();
    deferredPrompt = null;
  });
}

export function showInstallPrompt() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("PWA: User accepted the install prompt");
      } else {
        console.log("PWA: User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  }
}

function showInstallPromotion() {
  if (!document.getElementById("pwa-install-button")) {
    const installButton = document.createElement("button");
    installButton.id = "pwa-install-button";
    installButton.innerHTML = "📱 Install App";
    installButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #007aff, #5856d6);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 122, 255, 0.3);
      z-index: 10000;
      transition: all 0.3s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    installButton.addEventListener("mouseenter", () => {
      installButton.style.transform = "translateY(-2px)";
      installButton.style.boxShadow = "0 6px 20px rgba(0, 122, 255, 0.4)";
    });

    installButton.addEventListener("mouseleave", () => {
      installButton.style.transform = "translateY(0)";
      installButton.style.boxShadow = "0 4px 15px rgba(0, 122, 255, 0.3)";
    });

    installButton.addEventListener("click", showInstallPrompt);
    document.body.appendChild(installButton);
  }
}

function hideInstallPromotion() {
  const installButton = document.getElementById("pwa-install-button");
  if (installButton) {
    installButton.remove();
  }
}

export function isPWA(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone ||
    document.referrer.includes("android-app://")
  );
}
export function initializeNetworkStatus() {
  function updateOnlineStatus() {
    const status = navigator.onLine ? "online" : "offline";
    console.log(`PWA: Network status changed to ${status}`);

    if (!navigator.onLine) {
      showOfflineNotification();
    } else {
      hideOfflineNotification();
    }
  }

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
}

function showOfflineNotification() {
  if (!document.getElementById("offline-notification")) {
    const notification = document.createElement("div");
    notification.id = "offline-notification";
    notification.innerHTML =
      "📡 You are offline. Some features may be limited.";
    notification.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #ff3b30;
      color: white;
      text-align: center;
      padding: 10px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10001;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    document.body.appendChild(notification);
  }
}

function hideOfflineNotification() {
  const notification = document.getElementById("offline-notification");
  if (notification) {
    notification.remove();
  }
}
