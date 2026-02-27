importScripts("https://www.gstatic.com/firebasejs/12.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.10.0/firebase-messaging-compat.js");

let isMessagingReady = false;

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "FIREBASE_CONFIG") return;

  if (firebase.apps.length === 0) {
    firebase.initializeApp(event.data.payload);
  }

  if (!isMessagingReady) {
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(async (payload) => {
      const clientsList = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      for (const client of clientsList) {
        client.postMessage({
          type: "FIREBASE_BACKGROUND_MESSAGE",
          payload,
        });
      }

      const title = payload.notification?.title || "MyCarApp";
      const options = {
        body: payload.notification?.body || "",
        icon: "/vite.svg",
      };

      self.registration.showNotification(title, options);
    });

    isMessagingReady = true;
  }
});
