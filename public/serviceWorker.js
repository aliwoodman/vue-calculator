self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("vue-calculator").then(function(cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/favicon.ico",
        "/refresh.png",
        "/runner.gif",
        "/css/app.css",
        "/js/app.js",
        "/js/chunk-vendors.js",
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
