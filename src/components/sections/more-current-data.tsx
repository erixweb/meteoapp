import { Weather } from "../../types"
import { DropletIcon } from "../icons/droplet-icon"
import { UmbrellaIcon } from "../icons/umbrella-icon"
import { WindIcon } from "../icons/wind-icon"

export const MoreCurrentData = ({
	data,
	currentHour,
}: {
	data: Weather | null
	currentHour: number
}) => (
	<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mx-auto">
		<div className="glass p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105">
			<div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
				<UmbrellaIcon />
			</div>
			<div className="text-center">
				<p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Precipitación</p>
				<p className="text-xl font-bold">{data?.hourly?.precipitation[currentHour]}mm</p>
			</div>
		</div>
		<div className="glass p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105">
			<div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl text-cyan-600 dark:text-cyan-400">
				<DropletIcon />
			</div>
			<div className="text-center">
				<p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Humedad</p>
				<p className="text-xl font-bold">{data?.hourly?.relative_humidity_2m[currentHour]}%</p>
			</div>
		</div>
		<div className="glass p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105">
			<div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
				<WindIcon />
			</div>
			<div className="text-center">
				<p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Velocidad del Viento</p>
				<p className="text-xl font-bold">
					{data?.hourly?.wind_speed_10m[currentHour]}
					km/h
				</p>
			</div>
		</div>
	</div>
)
