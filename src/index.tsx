import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"

const rootEl = document.getElementById("root")
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl)
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
}

// Register the service worker in production
if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
	navigator.serviceWorker.register("/service-worker.js").then((reg) => {
		reg.addEventListener("updatefound", () => {
			const newWorker = reg.installing
			newWorker!.addEventListener("statechange", () => {
				if (
					newWorker!.state === "installed" &&
					navigator.serviceWorker.controller
				) {
					// Aquí le informas al SW que haga skipWaiting
					newWorker!.postMessage({ type: "SKIP_WAITING" })
				}
			})
		})
	})
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/sw.js")
			.then((registration) => {
				console.log("SW registered: ", registration)
			})
			.catch((registrationError) => {
				console.log("SW registration failed: ", registrationError)
			})
	})
}
