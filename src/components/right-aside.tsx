import { useEffect } from "react"

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
		// console.log(hour, currentHour)
	}, [hour, currentHour])

	return (
		<div className="w-full py-[15px]">
			{weather && currentHour ? (
				<div className="flex gap-5 my-[20px]">
					{new Array(5).fill(0).map((_, i) => (
						<button
							onClick={() => updateHour(0, i + 1)}
							className="w-full p-6 bg-gray-800 rounded-2xl border-2 border-gray-500"
						>
							{day + i}
						</button>
					))}
				</div>
			) : null}
		</div>
	)
}
