import { useEffect, useRef, useState } from "react"
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

type City = {
	latitude: number
	longitude: number
}

const CITIES: Record<string, City> = {
	carmona: {
		latitude: 37.4712,
		longitude: -5.6461,
	},
	malgrat: {
		latitude: 41.6436707,
		longitude: 2.7426636,
	},
	badalona: {
		latitude: 41.437996,
		longitude: 2.226629,
	},
	barcelona: {
		latitude: 41.3851,
		longitude: 2.1734,
	},
	sevilla: {
		latitude: 37.3886,
		longitude: -5.9823,
	},
}
type ForecastDay = "TODAY" | "TOMORROW" | "THIRD_DAY"

function request_weather(lat: number, long: number) {
	const API_ENDPOINT = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,weather_code,cloud_cover,wind_speed_10m,surface_pressure,wind_direction_10m&models=dmi_seamless`

	return fetch(API_ENDPOINT)
}

export function App() {
	const [weatherData, setWeatherData] = useState<Weather | null>(null)
	const [weatherCode, setWeatherCode] = useState<WeatherCodes | null>(null)
	const [city, setCity] = useState("barcelona")
	const [forecastDay, setForecastDay] = useState<ForecastDay>("TODAY")
	const currentHour = new Date().getHours()
	const [selectedHour, setSelectedHour] = useState(new Date().getHours())
	const [sliceHours, setSliceHours] = useState([0, 24])

	useEffect(() => {
		request_weather(CITIES[city].latitude, CITIES[city].longitude)
			.then((response) => {
				response.json().then((data) => {
					setWeatherData(data)
				})
			})
			.catch((error) => {
				console.error("Error fetching weather data:", error)
			})

		// Wait for DOM to be ready before attaching event listener
	}, [city])

	function degreesToDirection(degrees: number | undefined): string {
		if (!degrees) return "0º"

		const directions = [
			"N",
			"NE",
			"E",
			"SE",
			"S",
			"SW",
			"W",
			"NW",
		]
		const index = Math.round(degrees / 45) % 8
		return directions[index]
	}

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
			console.log(weatherCode)
		}
	}, [weatherData])

	return (
		<main className="bg-gray-950 min-h-screen py-4 px-5">
			<div className="container m-auto border-2 rounded-2xl border-slate-500 px-5 py-10">
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
						<option value="barcelona">Barcelona</option>
						<option value="malgrat">Malgrat de Mar</option>
						<option value="badalona">Badalona</option>
						<option value="sevilla">Sevilla</option>
						<option value="carmona">Carmona</option>
					</select>
				</div>
				<div className="text-center flex items-center justify-center w-full">
					<h2 className="text-9xl w-full relative font-bold from-gray-200 to-gray-500 text-transparent bg-clip-text bg-gradient-to-b">
						{weatherData?.hourly?.temperature_2m[currentHour]}º
						<img
							src={weatherCode?.image}
							alt="Weather image"
							className="w-[120px] h-[120px] absolute top-14 left-[60%] m-auto max-md:scale-75"
						/>
						<img
							src={weatherCode?.image}
							alt="Weather image"
							className="w-[120px] h-[120px] absolute top-14 left-[60%] m-auto blur-3xl max-md:scale-75"
						/>
					</h2>
				</div>
				<div className="m-auto border-2 border-slate-500 bg-gray-900 w-full max-w-[600px] p-4 mt-[70px] rounded-full flex text-slate-300">
					<div className="text-center w-full">
						<UmbrellaIcon />
						<p>
							{weatherData?.hourly?.precipitation[currentHour]}mm
						</p>
					</div>
					<div className="text-center w-full">
						<DropletIcon />
						<p>
							{
								weatherData?.hourly?.relative_humidity_2m[
									currentHour
								]
							}
							%
						</p>
					</div>
					<div className="text-center w-full">
						<WindIcon />
						<p>
							{weatherData?.hourly?.wind_speed_10m[currentHour]}
							km/h
						</p>
					</div>
				</div>
			</div>

			<section className="w-full m-auto container">
				<h2 className="text-xl font-bold py-2 text-white">
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

				<div>
					{weatherData ? (
						<div className="flex gap-4 overflow-x-scroll forecast py-2">
							{weatherData.hourly.time
								.slice(sliceHours[0], sliceHours[1])
								.map((time, idx) => {
									const realIndex = sliceHours[0] + idx
									return (
										<div
											key={realIndex}
											className=" border-2 border-slate-500 text-white p-4 rounded-[16px] shadow-md min-w-26 w-full"
											onClick={() => {
												setSelectedHour(realIndex)
											}}

										>
											<h3 className="text-lg font-semibold text-center">
												{new Date(
													time,
												).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</h3>
											<p className="flex items-center justify-center py-2">
												<img
													src={
														weatherCodes()[
															weatherData?.hourly
																?.weather_code[
																realIndex
															]
														].day.image
													}
													className="w-16 h-16"
												/>
											</p>
											<p className="text-center text-xl text-indigo-800 font-bold">
												{
													weatherData.hourly
														.temperature_2m[
														realIndex
													]
												}
												ºC
											</p>
											<p className="text-center">
												{
													weatherData.hourly
														.relative_humidity_2m[
														realIndex
													]
												}
												%
											</p>
											<p className="text-center">
												{
													weatherData.hourly
														.wind_speed_10m[
														realIndex
													]
												}{" "}
												km/h
											</p>
										</div>
									)
								})}
						</div>
					) : (
						<p>Loading forecast data...</p>
					)}
				</div>
			</section>
			<section className="w-full m-auto container border-2 border-slate-500 text-white grid grid-cols-2 gap-7 px-4 py-4 rounded-xl mt-4">
				<article className="flex gap-2.5 items-center justify-center">
					<TemperatureIcon />
					<div className="flex flex-col w-full">
						<span className="text-slate-400">Temperatura</span>
						<span>{weatherData?.hourly.temperature_2m[selectedHour]}ºC</span>
					</div>
				</article>
				<article className="flex gap-2.5 items-center justify-center">
					<TemperatureIcon />
					<div className="flex flex-col w-full">
						<span className="text-slate-400">Sensación térmica</span>
						<span>{weatherData?.hourly.apparent_temperature[selectedHour]}ºC</span>
					</div>
				</article>
				<article className="flex gap-2.5 items-center justify-center">
					<WindIcon />
					<div className="flex flex-col w-full">
						<span className="text-slate-400">Velocidad del viento</span>
						<span>{weatherData?.hourly.wind_speed_10m[selectedHour]} km/h {degreesToDirection(weatherData?.hourly.wind_direction_10m[selectedHour])}</span>
					</div>
				</article>
				<article className="flex gap-2.5 items-center justify-center">
					<UmbrellaIcon />
					<div className="flex flex-col w-full">
						<span className="text-slate-400">Precipitación</span>
						<span>{weatherData?.hourly.precipitation[selectedHour]} mm</span>
					</div>
				</article>
				<article className="flex gap-2.5 items-center justify-center">
					<DropletIcon />
					<div className="flex flex-col w-full">
						<span className="text-slate-400">Humedad</span>
						<span>{weatherData?.hourly.relative_humidity_2m[selectedHour]}%</span>
					</div>
				</article>
				<article className="flex gap-2.5 items-center justify-center">
					<CompassIcon />
					<div className="flex flex-col w-full">
						<span className="text-slate-400">Presión</span>
						<span>{weatherData?.hourly.surface_pressure[selectedHour]} hPa</span>
					</div>
				</article>
				<article className="flex gap-2.5 items-center justify-center">
					<CloudIcon />
					<div className="flex flex-col w-full">
						<span className="text-slate-400">Nubosidad</span>
						<span>{weatherData?.hourly.cloud_cover[selectedHour]}%</span>
					</div>
				</article>
			</section>
		</main>
	)
}
