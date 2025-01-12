import { useEffect, useState } from "react"
import "./App.css"
import LeftAside from "./components/left-aside"
import RightAside from "./components/right-aside"
import { Weather } from "./types"


const OPEN_METEO_URL =
	"https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&models=best_match"

async function fetchWeatherData(): Promise<Weather> {
	const response = await fetch(OPEN_METEO_URL)
	const data = await response.json()
	return data
}


const App = () => {
	const date = new Date()
	const [weather, setWeather] = useState<Weather | null>(null)
	const [hour, setHour] = useState<number>(date.getHours() || 12)
	const currentHour = new Date().getHours()

	function changeHour(newHour: number) {
		setHour(newHour)
	}
	useEffect(() => {
		new Promise(async (resolve) => {
			const data = await fetchWeatherData()

			resolve(data)
		}).then((data: Weather | unknown) => {
			// @ts-ignore
			setWeather(data)
		})
	}, [])

	return (
		<main className="max-w-[1024px]">
			<LeftAside weather={weather} updateHour={changeHour} hour={hour} currentHour={currentHour} />
			<RightAside weather={weather} updateHour={changeHour} hour={hour} currentHour={currentHour} />
		</main>
	)
}

export default App
