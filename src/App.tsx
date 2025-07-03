import { useEffect, useState } from "react"
import "./App.css"
import { DropletIcon } from "./components/icons/droplet-icon.tsx"
import { UmbrellaIcon } from "./components/icons/umbrella-icon.tsx"
import { WindIcon } from "./components/icons/wind-icon.tsx"
import { Weather, WeatherCodes } from "./types"
import weatherCodes from "./weather-codes.ts"
import { handleWheelScroll } from "./forecast-scroll.ts"

function request_weather() {
	const API_ENDPOINT =
		"https://api.open-meteo.com/v1/forecast?latitude=37.4712&longitude=-5.6461&hourly=temperature_2m,weather_code,relative_humidity_2m,precipitation,wind_speed_10m,apparent_temperature"

	return fetch(API_ENDPOINT)
}

export function App() {
	const [weatherData, setWeatherData] = useState<Weather | null>(null)
	const [weatherCode, setWeatherCode] = useState<WeatherCodes | null>(null)
	const currentHour = new Date().getHours()

	useEffect(() => {
		request_weather()
			.then((response) => {
				response.json().then((data) => {
					setWeatherData(data)
				})
			})
			.catch((error) => {
				console.error("Error fetching weather data:", error)
			})

		// Wait for DOM to be ready before attaching event listener
	}, [])

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
		<main className="from-blue-200 to-blue-700 bg-gradient-to-b">
			<div className="header glass p-5">
				<div className="m-auto w-full text-center py-4">
					<h3 className="text-2xl font-bold from-blue-500 to-blue-700 text-transparent bg-clip-text bg-gradient-to-b">
						Carmona
					</h3>
				</div>
				<div className="text-center flex items-center justify-center w-full">
					<h2 className="text-9xl w-full relative font-bold from-purple-500 to-purple-700 text-transparent bg-clip-text bg-gradient-to-b">
						{weatherData?.hourly?.temperature_2m[currentHour]}º
						<img
							src={weatherCode?.image}
							alt="Weather image"
							className="w-[120px] h-[120px] absolute top-14 left-[60%] m-auto"
						/>
						<img
							src={weatherCode?.image}
							alt="Weather image"
							className="w-[120px] h-[120px] absolute top-14 left-[60%] m-auto blur-3xl"
						/>
					</h2>
				</div>
				<div className="m-auto glass w-full max-w-[600px] p-4 mt-[70px] rounded-full flex text-purple-700">
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

			<section className="w-full m-auto container p-5">
				<h2 className="text-xl font-bold py-2 text-white">
					Today's forecast
				</h2>

				<div>
					{weatherData ? (
						<div className="flex  gap-4 overflow-x-scroll forecast ">
							{weatherData.hourly.time
								.slice(0, 24)
								.map((time, index) => (
									<div
										key={index}
										className="glass p-4 rounded-[16px] shadow-md min-w-26 w-full"
									>
										<h3 className="text-lg font-semibold">
											{new Date(time).toLocaleTimeString(
												[],
												{
													hour: "2-digit",
													minute: "2-digit",
												},
											)}
										</h3>
										<p className="flex items-center justify-center py-2">
											<img
												src={
													weatherCodes()[
														weatherData?.hourly
															?.weather_code[
															index
														]
													].day.image
												}
												className="w-16 h-16"
											></img>
										</p>
										<p className="text-center text-xl text-indigo-800 font-bold">
											{
												weatherData.hourly
													.temperature_2m[index]
											}
											ºC
										</p>
										<p className="text-center">
											{
												weatherData.hourly
													.relative_humidity_2m[index]
											}
											%
										</p>
										<p className="text-center">
											{
												weatherData.hourly
													.wind_speed_10m[index]
											}{" "}
											km/h
										</p>
									</div>
								))}
						</div>
					) : (
						<p>Loading forecast data...</p>
					)}
				</div>
			</section>
		</main>
	)
}
