import { Weather } from "../../types"
import { DropletIcon } from "../icons/droplet-icon"
import { UmbrellaIcon } from "../icons/umbrella-icon"
import { WindIcon } from "../icons/wind-icon"

export const MoreCurrentData = ({ data, currentHour }: { data: Weather | null, currentHour: number }) => (
	<div className="m-auto border-2 border-slate-500 dark:bg-gray-900 bg-gray-100 w-full max-w-[600px] p-4 mt-[70px] rounded-full flex dark:text-slate-300 text-slate-500">
		<div className="text-center w-full">
			<UmbrellaIcon />
			<p>{data?.hourly?.precipitation[currentHour]}mm</p>
		</div>
		<div className="text-center w-full">
			<DropletIcon />
			<p>{data?.hourly?.relative_humidity_2m[currentHour]}%</p>
		</div>
		<div className="text-center w-full">
			<WindIcon />
			<p>
				{data?.hourly?.wind_speed_10m[currentHour]}
				km/h
			</p>
		</div>
	</div>
)
