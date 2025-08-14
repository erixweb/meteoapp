const CACHE_NAME = "mi-pwa-cache-v1"
const FILES_TO_CACHE = [
	"/",
	"/flags.css",
	"/app.js",
	"/manifest.json",
	"/favicon.jpg",
  "offline.html"
]

// Instalación: cachear los archivos esenciales
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(FILES_TO_CACHE))
			.then(() => self.skipWaiting()), // activar service worker inmediatamente
	)
})

// Activación: eliminar caches antiguos si los hubiera
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) =>
				Promise.all(
					cacheNames.map((cache) => {
						if (cache !== CACHE_NAME) {
							return caches.delete(cache)
						}
					}),
				),
			)
			.then(() => self.clients.claim()), // tomar control inmediato
	)
})

// Interceptar peticiones: responder con cache o fallback offline
self.addEventListener("fetch", (event) => {
	if (event.request.mode === "navigate") {
		// Peticiones de navegación: usar estrategia network first con fallback offline
		event.respondWith(
			fetch(event.request)
				.then((response) => {
					// Guardar actualización en cache
					return caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, response.clone())
						return response
					})
				})
				.catch(() => caches.match("/offline.html")),
		)
	} else {
		// Para otros recursos estáticos: cache first
		event.respondWith(
			caches.match(event.request).then((cachedResponse) => {
				return cachedResponse || fetch(event.request)
			}),
		)
	}
})
