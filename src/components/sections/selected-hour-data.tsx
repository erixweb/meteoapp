import { Weather } from "../../types";
import { degreesToDirection } from "../../utiils/degrees-to-direction";
import { CloudIcon } from "../icons/cloud-icon";
import { CompassIcon } from "../icons/compass-icon";
import { DropletIcon } from "../icons/droplet-icon";
import { TemperatureIcon } from "../icons/temperature-icon";
import { UmbrellaIcon } from "../icons/umbrella-icon";
import { WindIcon } from "../icons/wind-icon";

export const SelectedHourData = ({ data, selectedHour }: { data: Weather | null, selectedHour: number }) => (
	<section className="w-full m-auto container dark:bg-gray-700 bg-gray-200 dark:text-white grid grid-cols-2 gap-7 px-4 py-4 rounded-xl mt-4">
		<article className="flex gap-2.5 items-center justify-center">
			<TemperatureIcon className="text-red-600" />
			<div className="flex flex-col w-full">
				<span className="text-slate-400">Temperatura</span>
				<span>
					{data?.hourly.temperature_2m[selectedHour]}ºC
				</span>
			</div>
		</article>
		<article className="flex gap-2.5 items-center justify-center">
			<TemperatureIcon className="text-red-600" />
			<div className="flex flex-col w-full">
				<span className="text-slate-400">Sensación térmica</span>
				<span>
					{data?.hourly.apparent_temperature[selectedHour]}
					ºC
				</span>
			</div>
		</article>
		<article className="flex gap-2.5 items-center justify-center">
			<WindIcon />
			<div className="flex flex-col w-full">
				<span className="text-slate-400">Velocidad del viento</span>
				<span>
					{data?.hourly.wind_speed_10m[selectedHour]} km/h{" "}
					{degreesToDirection(
						data?.hourly.wind_direction_10m[selectedHour],
					)}
				</span>
			</div>
		</article>
		<article className="flex gap-2.5 items-center justify-center">
			<UmbrellaIcon />
			<div className="flex flex-col w-full">
				<span className="text-slate-400">Precipitación</span>
				<span>
					{data?.hourly.precipitation[selectedHour]} mm
				</span>
			</div>
		</article>
		<article className="flex gap-2.5 items-center justify-center">
			<DropletIcon />
			<div className="flex flex-col w-full">
				<span className="text-slate-400">Humedad</span>
				<span>
					{data?.hourly.relative_humidity_2m[selectedHour]}%
				</span>
			</div>
		</article>
		<article className="flex gap-2.5 items-center justify-center">
			<CompassIcon />
			<div className="flex flex-col w-full">
				<span className="text-slate-400">Presión</span>
				<span>
					{data?.hourly.surface_pressure[selectedHour]} hPa
				</span>
			</div>
		</article>
		<article className="flex gap-2.5 items-center justify-center">
			<CloudIcon />
			<div className="flex flex-col w-full">
				<span className="text-slate-400">Nubosidad</span>
				<span>{data?.hourly.cloud_cover[selectedHour]}%</span>
			</div>
		</article>
	</section>
)
