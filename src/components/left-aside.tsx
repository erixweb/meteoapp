import { useEffect, useState } from "react"
import type { WeatherCodes } from "../types.d.ts"
import weatherCodes from "../weather-codes.ts"
import WeatherPreview from "./weather-preview.tsx"

export default function LeftAside({
	weather,
	updateHour,
	hour,
	currentHour,
	currentDay,
}: {
	weather: any
	updateHour: Function
	hour: number
	currentHour: number
	currentDay: number
}) {
	const date = new Date()
	const [weatherCode, setWeatherCode] = useState<WeatherCodes | null>(null)

	useEffect(() => {
		if (weather) {
			setWeatherCode(
				weatherCodes()[weather?.hourly?.weather_code[hour]].day,
			)
		}
		// console.log(currentDay * 24, currentHour)
	}, [hour, weather, currentDay, currentHour])

	return (
		<div className="min-h-[100vh] mt-0 p-9 w-full">
			<h2 className="text-4xl font-bold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text">
				Badalona
			</h2>
			<time className="text-gray-300 italic">
				{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
			</time>

			<div className="text-center w-full my-[40px]">
				<div className="relative ">
					<img
						src={`${weatherCode?.image}`}
						alt=""
						className="w-[144px] h-[144px]"
					/>
					<img
						src={`${weatherCode?.image}`}
						alt=""
						className="w-[144px] h-[144px] absolute top-0 left-0 right-0 blur-2xl text-center scale-110"
					/>
				</div>

				<data className="text-5xl">
					{weather?.hourly?.temperature_2m[hour] || 0}
					<span className="text-gray-500">ºC</span>
				</data>

				<h4 className="text-gray-400 my-[20px] text-2xl font-normal">
					{weatherCode?.description}
				</h4>

				<div className="w-full bg-slate-800 rounded-[12px] flex p-4">
					<div className="flex flex-col">
						<strong className="w-full text-start">Viento</strong>
						<data className="w-full text-start">
							{weather?.hourly?.wind_speed_10m[hour]}
							<span className="text-gray-500">km/h</span>
						</data>
					</div>
					<hr className="border-[1.5px] border-gray-400 h-auto" />
					<div className="flex flex-col">
						<strong className="w-full text-start">Humedad</strong>
						<data className="w-full text-start">
							{weather?.hourly?.relative_humidity_2m[hour]}
							<span className="text-gray-500">%</span>
						</data>
					</div>
					<hr className="border-[1.5px] border-gray-400 h-auto" />
					<div className="flex flex-col">
						<strong className="w-full text-start">Lluvia</strong>
						<data className="w-full text-start">
							{weather?.hourly?.precipitation[hour]}
							<span className="text-gray-500">mm</span>
						</data>
					</div>
				</div>
				<div className="grid grid-cols-4 gap-[20px] my-[30px]">
					{new Array(currentDay * 24 - currentHour)
						.fill(0)
						.map((_, i) => (
							<WeatherPreview
								data={weather}
								hour={currentHour}
								previewTime={i}
								updateHour={updateHour}
								currentDay={currentDay}
							/>
						))}
				</div>
			</div>
		</div>
	)
}
