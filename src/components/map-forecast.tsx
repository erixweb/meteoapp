import { useState } from "react"
import { formatHour } from "../utils/time"

export type Regions = "catalonia" | "spain"

export function MapForecast({ region }: { region: Regions }) {
	const [hour, setHour] = useState(1)
	const date = new Date()
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, "0")
	const day = date.getDate().toString().padStart(2, "0")
	const folderName = `${year}${month}${day}06`

	const isSpain = region === "spain"
	const maxHour = isSpain ? 36 : 51

	return (
		<div className="flex flex-wrap justify-center w-full max-w-[100vh] mx-auto relative">
			{isSpain ? (
				<img
					src={`https://modeles16.meteociel.fr/modeles/wrfnmm/nmm_sp1-1-${hour}-0.png`}
					alt="Weather map Spain"
					className="w-full"
				/>
			) : (
				<>
					<img
						src={`https://modeles7.meteociel.fr/modeles/arome/tiles/${folderName}/3/1/3/101-${hour}-0.png`}
						alt="Weather map Catalonia part 1"
						className="w-1/2"
					/>
					<img
						src={`https://modeles7.meteociel.fr/modeles/arome/tiles/${folderName}/3/2/3/101-${hour}-0.png`}
						alt="Weather map Catalonia part 2"
						className="w-1/2"
					/>
				</>
			)}

			<div className="w-full absolute bottom-0 left-0 p-4">
				<span className="text-black">{formatHour(hour, "06Z")}</span>
				<input
					type="range"
					min={1}
					max={maxHour}
					className="w-full"
					onChange={(e) => setHour(parseInt(e.target.value))}
					defaultValue={1}
				/>
			</div>
		</div>
	)
}
