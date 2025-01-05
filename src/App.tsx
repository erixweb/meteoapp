import "./App.css"
import LeftAside from "./components/left-aside"
import RightAside from "./components/right-aside"


const App = () => {
	return (
		<main className="max-w-[1024px]">
			<LeftAside />
			<RightAside />
		</main>
	)
}

export default App
