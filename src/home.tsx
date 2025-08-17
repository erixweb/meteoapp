import { use, useCallback, useEffect, useRef, useState } from "react"
import "./App.css"
import { DropletIcon } from "./components/icons/droplet-icon.tsx"
import { UmbrellaIcon } from "./components/icons/umbrella-icon.tsx"
import { WindIcon } from "./components/icons/wind-icon.tsx"
import { Weather, WeatherCodes } from "./types"
import weatherCodes from "./weather-codes.ts"
import { handleWheelScroll } from "./forecast-scroll.ts"
import { TemperatureIcon } from "./components/icons/temperature-icon.tsx"
import { CompassIcon } from "./components/icons/compass-icon.tsx"
import { CloudIcon } from "./components/icons/cloud-icon.tsx"
import { MapForecast } from "./components/map-forecast.tsx"
import { useLocalStorage } from "./hooks/use-storage.tsx"
import { Temperature } from "./components/sections/temperature.tsx"
import { MoreCurrentData } from "./components/sections/more-current-data.tsx"
import { HourlyData } from "./components/sections/hourly-data.tsx"
import { SelectedHourData } from "./components/sections/selected-hour-data.tsx"

type City = {
	latitude: number
	longitude: number
	name: string
}

type CountryCities = {
	flag: string
	cities: Record<string, City>
}

const CITIES: Record<string, CountryCities> = {
	Catalunya: {
		flag: "es-ct",
		cities: {
			barcelona: {
				latitude: 41.3851,
				longitude: 2.1734,
				name: "Barcelona",
			},
			badalona: {
				latitude: 41.437996,
				longitude: 2.226629,
				name: "Badalona",
			},
			santa_coloma_de_gramenet: {
				latitude: 41.4359859,
				longitude: 2.2128992,
				name: "Santa Coloma de Gramenet",
			},
			malgrat: {
				latitude: 41.6436707,
				longitude: 2.7426636,
				name: "Malgrat de Mar",
			},
			sabadell: {
				latitude: 41.537391,
				longitude: 2.125115,
				name: "Sabadell",
			},
		},
	},
	Andorra: {
		flag: "ad",
		cities: {
			andorra_la_vella: {
				latitude: 42.506849,
				longitude: 1.522021,
				name: "Andorra la Vella",
			},
		},
	},
	Inglaterra: {
		flag: "gb-eng",
		cities: {
			london: {
				latitude: 51.5085,
				longitude: -0.1257,
				name: "London",
			},
		},
	},
	España: {
		flag: "es",
		cities: {
			carmona: {
				latitude: 37.4712,
				longitude: -5.6461,
				name: "Carmona",
			},
			sevilla: {
				latitude: 37.3886,
				longitude: -5.9823,
				name: "Sevilla",
			},
		},
	},
	Francia: {
		flag: "fr",
		cities: {
			paris: {
				latitude: 48.8566,
				longitude: 2.3522,
				name: "Paris",
			},
			marseille: {
				latitude: 43.2965,
				longitude: 5.3698,
				name: "Marseille",
			},
		},
	},
}
type ForecastDay = "TODAY" | "TOMORROW" | "THIRD_DAY"

function request_weather(lat: number, long: number) {
	const API_ENDPOINT = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,weather_code,cloud_cover,wind_speed_10m,surface_pressure,wind_direction_10m&models=meteofrance_seamless&current=temperature_2m`

	return fetch(API_ENDPOINT)
}

export function Home() {
	const [lastCity, setLastCity] = useLocalStorage("lastCity", "barcelona")
	const [weatherData, setWeatherData] = useState<Weather | null>(null)
	const [weatherCode, setWeatherCode] = useState<WeatherCodes | null>(null)
	const [city, setCity] = useState(lastCity || "barcelona")
	const [forecastDay, setForecastDay] = useState<ForecastDay>("TODAY")
	const currentHour = new Date().getHours()
	const [selectedHour, setSelectedHour] = useState(new Date().getHours())
	const [sliceHours, setSliceHours] = useState([0, 24])


	function updateSelectedHour(hour: number) {
		setSelectedHour(hour)
	}

	useEffect(()  => {
		const $el = document.getElementById("city") as HTMLSelectElement

		if (!$el) return

		$el.value = city 
	}, [window])
	useEffect(() => {
		// Find the city object from all countries
		setLastCity(city)
		let selectedCityObj: City | undefined
		for (const country of Object.keys(CITIES)) {
			if (CITIES[country].cities[city]) {
				selectedCityObj = CITIES[country].cities[city]
				break
			}
		}
		if (selectedCityObj) {
			request_weather(selectedCityObj.latitude, selectedCityObj.longitude)
				.then((response) => {
					response.json().then((data) => {
						setWeatherData(data)
					})
				})
				.catch((error) => {
					console.error("Error fetching weather data:", error)
				})
		}

		// Wait for DOM to be ready before attaching event listener
	}, [city])
	useEffect(() => {
		if (forecastDay === "TODAY") {
			setSliceHours([0, 24])
		} else if (forecastDay === "TOMORROW") {
			setSliceHours([24, 48])
		} else if (forecastDay === "THIRD_DAY") {
			setSliceHours([48, 72])
		}
	}, [forecastDay])

	const forecast = document.querySelector(".forecast")

	if (forecast) {
		// @ts-ignore
		forecast.addEventListener("wheel", handleWheelScroll)
	}

	useEffect(() => {
		if (weatherData !== null && weatherData !== undefined) {
			setWeatherCode(
				weatherCodes()[weatherData?.hourly?.weather_code[1]].day,
			)
		}
	}, [weatherData])

	return (
		<main className="dark:bg-gray-950 bg-gray-100 text-black dark:text-white min-h-screen py-4 px-5">
			<div className="container m-auto  rounded-2xl dark:bg-gray-700 bg-gray-200 px-5 py-10">
				<div className="m-auto w-full text-center py-4">
					<select
						className="text-2xl font-bold from-blue-500 to-blue-700 text-transparent bg-clip-text bg-gradient-to-b bg-white/10 rounded p-2"
						id="city"
						onChange={() => {
							const selectedCity = (
								document.getElementById(
									"city",
								) as HTMLSelectElement
							).value
							setCity(selectedCity)
						}}
					>
						{Object.entries(CITIES).map(([country, cities]) => (
							<optgroup
								key={country}
								label=""
								className="font-medium text-start ml-0 w-full px-4"
								style={{ paddingLeft: 0 }}
							>
								<div className="flex pl-4">
									<span
										className={`w-fit rounded-sm fi fi-${cities.flag}`}
									></span>
									<option
										disabled
										className="bg-transparent text-blue-400 font-semibold text-left my-2"
										style={{
											cursor: "default",
											border: "none",
											background: "none",
											paddingLeft: "8px",
										}}
									>
										{country}
									</option>
								</div>
								{Object.entries(cities.cities).map(
									([cityKey, cityObj]) => (
										<option
											key={cityKey}
											value={cityKey}
											className="py-1 font-bold px-4"
										>
											{cityObj.name}
										</option>
									),
								)}
							</optgroup>
						))}
					</select>
				</div>
				<Temperature 
					data={weatherData}
					code={weatherCode}
				/>
				<MoreCurrentData 
					data={weatherData}
					currentHour={currentHour}
				/>
			</div>

			<section className="w-full m-auto container">
				<h2 className="text-xl font-bold py-2">
					<select
						className="text-xl font-bold   rounded p-2"
						value={forecastDay}
						onChange={(e) =>
							setForecastDay(e.target.value as ForecastDay)
						}
					>
						<option value="TODAY">Hoy</option>
						<option value="TOMORROW">Mañana</option>
						<option value="THIRD_DAY">Pasado mañana</option>
					</select>
				</h2>

				<HourlyData 
					data={weatherData}
					sliceHours={sliceHours}
					updateSelectedHour={updateSelectedHour}
				/>
			</section>
			<SelectedHourData 
				data={weatherData}
				selectedHour={selectedHour}
			/>
			<section className="w-full m-auto container px-4 py-4 ">
				<MapForecast />
			</section>
		</main>
	)
}
