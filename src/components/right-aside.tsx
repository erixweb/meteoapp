import { useEffect } from "react"
import WeatherPreview from "./weather-preview"

export default function LeftAside({
	weather,
	updateHour,
	hour,
	currentHour,
}: {
	weather: any
	updateHour: Function
	hour: number
	currentHour: number
}) {
	const day = new Date().getDate()
	useEffect(() => {
		console.log(hour, currentHour)
	}, [hour, currentHour])

	return (
		<div className="w-full min-h-[100vh] p-9 mt-0">
			<h2>Right Aside</h2>
			<p>This is the Right aside content.</p>
			{weather && currentHour ? (
				<div className="flex gap-5 my-[20px]">
					{new Array(5).fill(0).map((_, i) => (
						<button
							className="w-full p-6 bg-gray-800 rounded-2xl border-2 border-gray-500"
							onClick={() => updateHour((24 - currentHour) - (24-currentHour) + 24 * (i + 1))}
						>
							{day + i}
						</button>
					))}
				</div>
			) : null}
		</div>
	)
}
