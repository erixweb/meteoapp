import { useEffect, useState } from "react"
import "./App.css"
import LeftAside from "./components/left-aside"
import RightAside from "./components/right-aside"
import { Weather } from "./types"

type City = {
	[objectName: string]: {
		lat: number
		lon: number
	}
}

const CITIES: City = {
	Badalona: {
		lat: 41.3888,
		lon: 2.159,
	},
	Carmona: {
		lat: 37.4712,
		lon: -5.6461,
	},
}

const OPEN_METEO_URL =
	"https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&models=best_match"

async function fetchWeatherData(url: string): Promise<Weather> {
	const response = await fetch(url)
	const data = await response.json()
	return data
}

const App = () => {
	const date = new Date()
	const [weather, setWeather] = useState<Weather | null>(null)
	const [hour, setHour] = useState<number>(date.getHours() || 12)
	const [currentHour, setCurrentHour] = useState(new Date().getHours())
	const [currentDay, setCurrentDay] = useState(1)

	async function updateCity(newCity: string) {
		if (!CITIES[newCity]) {
			throw new Error("City not found")
		}
		const { lat, lon } = CITIES[newCity]
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&models=best_match`
		const response = await fetch(url)
		const data = await response.json()

		setWeather(data)
		return data
	}

	function changeHour(newHour: number, newCurrentDay: number = 1) {
		if (newCurrentDay === 1) {
			// setHour(newHour)
			setCurrentDay(1)
			setCurrentHour(new Date().getHours())
			setHour(newHour)

			return
		}
		if (newCurrentDay !== 1 && newHour === 0) {
			setCurrentDay(newCurrentDay)

			setHour(newCurrentDay * 24)
			setCurrentHour(newCurrentDay * 24 - 24)

			return
		}
		// setCurrentHour(new Date().getHours())
		setHour(newHour)
		setCurrentDay(newCurrentDay)
	}

	useEffect(() => {
		new Promise(async (resolve) => {
			const data = await fetchWeatherData(OPEN_METEO_URL)

			resolve(data)
		}).then((data: Weather | unknown) => {
			// @ts-ignore
			setWeather(data)
		})
	}, [])

	return (
		<main className="max-w-[1024px] m-auto">
			<RightAside
				weather={weather}
				updateHour={changeHour}
				hour={hour}
				currentHour={currentHour}
			/>
			<LeftAside
				weather={weather}
				updateHour={changeHour}
				updateCity={updateCity}
				hour={hour}
				currentHour={currentHour}
				currentDay={currentDay}
			/>
		</main>
	)
}

export default App
