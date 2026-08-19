import { Weather } from "../../types"
import { degreesToDirection } from "../../utils/degrees-to-direction"
import { CloudIcon } from "../icons/cloud-icon"
import { CompassIcon } from "../icons/compass-icon"
import { DropletIcon } from "../icons/droplet-icon"
import { TemperatureIcon } from "../icons/temperature-icon"
import { UmbrellaIcon } from "../icons/umbrella-icon"
import { WindIcon } from "../icons/wind-icon"

export const SelectedHourData = ({
	data,
	selectedHour,
}: {
	data: Weather | null
	selectedHour: number
}) => (
	<section className="w-full m-auto container glass grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-6 rounded-3xl mt-8 shadow-lg border border-white/10">
		{[
			{
				icon: <TemperatureIcon className="text-red-500" />,
				label: "Temperatura",
				value: `${data?.hourly.temperature_2m[selectedHour]}ºC`,
			},
			{
				icon: <TemperatureIcon className="text-orange-500" />,
				label: "Sensación Térmica",
				value: `${data?.hourly.apparent_temperature[selectedHour]}ºC`,
			},
			{
				icon: <WindIcon className="text-blue-500" />,
				label: "Velocidad del Viento",
				value: `${data?.hourly.wind_speed_10m[selectedHour]} km/h ${degreesToDirection(
					data?.hourly.wind_direction_10m[selectedHour],
				)}`,
			},
			{
				icon: <UmbrellaIcon className="text-cyan-500" />,
				label: "Precipitación",
				value: `${data?.hourly.precipitation[selectedHour]} mm`,
			},
			{
				icon: <DropletIcon className="text-indigo-500" />,
				label: "Humedad",
				value: `${data?.hourly.relative_humidity_2m[selectedHour]}%`,
			},
			{
				icon: <CompassIcon className="text-slate-500" />,
				label: "Presión",
				value: `${data?.hourly.surface_pressure[selectedHour]} hPa`,
			},
			{
				icon: <CloudIcon className="text-gray-500" />,
				label: "Nubosidad",
				value: `${data?.hourly.cloud_cover[selectedHour]}%`,
			},
		].map((item, idx) => (
			<article key={idx} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 dark:bg-black/20 border border-white/5">
				<div className="p-2 bg-white/10 rounded-lg">
					{item.icon}
				</div>
				<div className="flex flex-col overflow-hidden">
					<span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
						{item.label}
					</span>
					<span className="font-bold truncate">{item.value}</span>
				</div>
			</article>
		))}
	</section>
)
