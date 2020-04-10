self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("vue-calculator").then(function(cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/app.095a27f9.css",
        "/js/app.a2deb0df.js",
        "/js/chunk-vendors.b33916fc.js",
        "/__/firebase/6.3.4/firebase-app.js",
        "/__/firebase/init.js",
        "/favicon.ico"
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
