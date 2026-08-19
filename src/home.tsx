import { useEffect, useState, useRef } from "react"
import "./App.css"
import { Weather, WeatherCodes } from "./types"
import weatherCodes from "./weather-codes.ts"
import { handleWheelScroll } from "./forecast-scroll.ts"
import { MapForecast } from "./components/map-forecast.tsx"
import { useLocalStorage } from "./hooks/use-storage.tsx"
import { Temperature } from "./components/sections/temperature.tsx"
import { MoreCurrentData } from "./components/sections/more-current-data.tsx"
import { HourlyData } from "./components/sections/hourly-data.tsx"
import { SelectedHourData } from "./components/sections/selected-hour-data.tsx"
import { TemperatureMaxIcon } from "./components/icons/temperature-max-icon.tsx"
import { TemperatureMinIcon } from "./components/icons/temperature-min-icon.tsx"

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
			calella: {
				latitude: 41.6134853,
				longitude: 2.652006,
				name: "Calella",
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
	const API_ENDPOINT = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,weather_code,cloud_cover,wind_speed_10m,surface_pressure,wind_direction_10m&current=temperature_2m&timezone=Europe/Berlin`

	return fetch(API_ENDPOINT)
}

	export function Home() {
		const currentHour = new Date().getHours()
		// const currentDay = new Date().getDay() - 1
		const [lastCity, setLastCity] = useLocalStorage("lastCity", "barcelona")
		const [weatherData, setWeatherData] = useState<Weather | null>(null)
		const [weatherCode, setWeatherCode] = useState<WeatherCodes | null>(null)
		const [city, setCity] = useState(lastCity || "barcelona")
		const [forecastDay, setForecastDay] = useState<ForecastDay>("TODAY")
		const [selectedHour, setSelectedHour] = useState(currentHour)
		const [sliceHours, setSliceHours] = useState([0, 24])
		const [temperatureRange, setTemperatureRange] = useState<number[]>([0, 0])
		const [isDropdownOpen, setIsDropdownOpen] = useState(false)
		const dropdownRef = useRef<HTMLDivElement>(null)
	
		/* const days = [
			"Lunes",
			"Martes",
			"Miércoles",
			"Jueves",
			"Viernes",
			"Sábado",
			"Domingo",
		] */
	
		function updateSelectedHour(hour: number) {
			setSelectedHour(hour)
		}
	
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
					setIsDropdownOpen(false)
				}
			}
			document.addEventListener("mousedown", handleClickOutside)
			return () => document.removeEventListener("mousedown", handleClickOutside)
		}, [])
	
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
				const temperatures = weatherData.hourly.temperature_2m.slice(0, 24)
				// Remove null or undefined values before calculating min/max
	
				const validTemperatures = temperatures.filter(
					(temp) => temp !== null && temp !== undefined,
				) as number[]
	
				const minTemp = Math.min(...validTemperatures)
				const maxTemp = Math.max(...validTemperatures)
	
				setTemperatureRange([minTemp, maxTemp])
			}
		}, [weatherData])

		let currentCityName = "Seleccionando..."
		for (const country of Object.values(CITIES)) {
			if (country.cities[city]) {
				currentCityName = country.cities[city].name
				break
			}
		}
	
		return (
			<main className="dark:bg-slate-950 bg-slate-50 text-slate-900 dark:text-slate-100 min-h-screen py-6 px-4 transition-colors duration-500">
				<div className="max-w-4xl mx-auto space-y-8">
				<header className="flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="relative group w-full md:w-72" ref={dropdownRef}>
						<button 
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="w-full flex items-center justify-between pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all cursor-pointer font-medium shadow-sm"
						>
							<div className="flex items-center gap-3 truncate">
								<span className="text-slate-400">📍</span>
								<span className="truncate">{currentCityName}</span>
							</div>
							<span className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>▾</span>
						</button>

						{isDropdownOpen && (
							<div className="absolute z-50 w-full mt-2 bg-black rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 max-h-80 overflow-y-auto py-2 custom-scrollbar">
								{Object.entries(CITIES).map(([country, data]) => (
									<div key={country} className="mb-2">
										<div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
											<span className={`w-4 h-3 rounded-sm fi fi-${data.flag}`}></span>
											{country}
										</div>
										<div className="px-2">
											{Object.entries(data.cities).map(([cityKey, cityObj]) => (
												<div
													key={cityKey}
													onClick={() => {
														setCity(cityKey)
														setIsDropdownOpen(false)
													}}
													className={`px-4 py-2 rounded-xl cursor-pointer transition-colors text-sm font-medium ${
														city === cityKey 
															? "bg-blue-500 text-white" 
															: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
													}`}
												>
													{cityObj.name}
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="text-right hidden md:block">
						<p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Hora Local</p>
						<p className="text-lg font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
					</div>
				</header>

				<div className="glass rounded-3xl p-8 shadow-xl border border-white/20 dark:border-white/10">
					<Temperature data={weatherData} code={weatherCode} />
					
					<div className="flex flex-wrap justify-center gap-6 mt-12">
						<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold transition-transform hover:scale-105">
							<TemperatureMaxIcon /> {temperatureRange[1]}ºC
						</div>
						<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold transition-transform hover:scale-105">
							<TemperatureMinIcon /> {temperatureRange[0]}ºC
						</div>
					</div>
					
					<div className="mt-10">
						<MoreCurrentData data={weatherData} currentHour={currentHour} />
					</div>
				</div>

				<section className="space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold tracking-tight">
							{forecastDay === "TODAY"
								? "Hoy"
								: forecastDay === "TOMORROW"
									? "Mañana"
									: "Pasado Mañana"}
						</h2>
						<div className="flex p-1 bg-slate-200 dark:bg-slate-900 rounded-xl">
							<DateSelector
								forecastDay={"TODAY"}
								setForecastDay={setForecastDay}
								active={forecastDay === "TODAY"}
							>
								Hoy
							</DateSelector>
							<DateSelector
								forecastDay={"TOMORROW"}
								setForecastDay={setForecastDay}
								active={forecastDay === "TOMORROW"}
							>
								Mañana
							</DateSelector>
							<DateSelector
								forecastDay={"THIRD_DAY"}
								setForecastDay={setForecastDay}
								active={forecastDay === "THIRD_DAY"}
							>
								Pasado Mañana
							</DateSelector>
						</div>
					</div>

					<HourlyData
						data={weatherData}
						sliceHours={sliceHours}
						updateSelectedHour={updateSelectedHour}
					/>
				</section>

				<SelectedHourData data={weatherData} selectedHour={selectedHour} />
				
				<section className="w-full py-6">
					<div className="glass rounded-3xl p-4 shadow-lg border border-white/20 dark:border-white/10">
						<MapForecast />
					</div>
				</section>
			</div>
		</main>
	)
}

function DateSelector({
	forecastDay,
	setForecastDay,
	children,
	active,
}: {
	forecastDay: ForecastDay
	setForecastDay: (forecastDay: ForecastDay) => void
	children: string
	active: boolean
}) {
	return (
		<button
			onClick={() => setForecastDay(forecastDay)}
			className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
				active 
					? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" 
					: "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
			}`}
		>
			{children}
		</button>
	)
}
