import ReactDOM from "react-dom/client"
import { Home } from "./home.tsx"

const rootEl = document.getElementById("root")
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl)
	root.render(<Home />)
}

navigator.serviceWorker.getRegistrations().then((registrations) => {
	for (const registration of registrations) {
		registration.unregister()
	}
})
