import { useEffect } from "react"
import type { Weather } from "../types.d.ts"
import { formatHour } from "../utils.ts"
import weatherCodes from "../weather-codes"

export default function WeatherPreview({
	data,
	hour,
	previewTime,
	updateHour,
	currentDay,
}: {
	data: Weather | null
	hour: number
	previewTime: number
	updateHour: Function
	currentDay: number
}) {
	return data ? (
		<button
			onClick={() => updateHour(hour + previewTime, currentDay)}
			className="p-4 cursor-pointer bg-gray-700 rounded-xl border-2 border-gray-400 w-full"
		>
			<span className="text-gray-400">
				{formatHour(hour + previewTime)}
			</span>
			<img
				src={`${weatherCodes()[data.hourly.weather_code[hour + previewTime]].day.image}`}
				alt=""
				className="w-[48px] h-[48px] m-auto"
			/>
			<data value={data.hourly.temperature_2m[hour + previewTime]}>
				{data.hourly.temperature_2m[hour + previewTime]}ºC
			</data>
		</button>
	) : null
}
