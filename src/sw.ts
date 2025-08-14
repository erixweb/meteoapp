/// <reference lib="webworker" />

import { ExpirationPlugin } from "workbox-expiration"
import { precacheAndRoute } from "workbox-precaching"
import { registerRoute } from "workbox-routing"
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies"

declare const self: ServiceWorkerGlobalScope

// This is a placeholder that will be replaced by the InjectManifest plugin
// with the list of assets to precache.
precacheAndRoute(self.__WB_MANIFEST)

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
	({ url }) => url.origin === "https://fonts.googleapis.com",
	new StaleWhileRevalidate({
		cacheName: "google-fonts-stylesheets",
	}),
)

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
	({ url }) => url.origin === "https://fonts.gstatic.com",
	new CacheFirst({
		cacheName: "google-fonts-webfonts",
		plugins: [
			new ExpirationPlugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30,
			}),
		],
	}),
)

// Example runtime caching for API calls
registerRoute(
	({ url }) => url.origin === "https://api.open-meteo.com",
	new StaleWhileRevalidate({
		cacheName: "weather-api-cache",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 50,
				maxAgeSeconds: 5 * 60, // 5 minutes
			}),
		],
	}),
)

// Example runtime caching for images not in the precache manifest
registerRoute(
	({ request }) => request.destination === "image",
	new CacheFirst({
		cacheName: "image-cache",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
			}),
		],
	}),
)

self.addEventListener("message", event => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting()
	}
})