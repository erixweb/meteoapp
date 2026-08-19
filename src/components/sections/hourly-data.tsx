import { Weather } from "../../types"
import weatherCodes from "../../weather-codes"

export const HourlyData = ({
	data,
	sliceHours,
	updateSelectedHour,
}: {
	data: Weather | null
	sliceHours: number[]
	updateSelectedHour: (hour: number) => void
}) => (
	<div>
		{data ? (
			<div className="flex gap-4 overflow-x-auto forecast-scroll py-4 dark:text-white text-black snap-x">
				{data.hourly.time
					.slice(sliceHours[0], sliceHours[1])
					.map((time, idx) => {
						const realIndex = sliceHours[0] + idx
						return (
							<div
								key={realIndex}
								className="glass p-4 rounded-2xl shadow-sm min-w-[110px] flex flex-col items-center justify-between gap-3 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 snap-start border border-white/10"
								onClick={() => {
									updateSelectedHour(realIndex)
								}}
							>
								<h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">
									{new Date(time).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</h3>
								<div className="relative">
									<img
										src={
											weatherCodes()[
												data?.hourly?.weather_code[
													realIndex
												]
											].day.image
										}
										className="w-12 h-12 object-contain"
									/>
								</div>
								<div className="flex flex-col items-center gap-1">
									<p className="text-lg font-black text-blue-600 dark:text-blue-400">
										{data.hourly.temperature_2m[realIndex]}º
									</p>
									<p className="text-xs text-slate-400 font-medium">
										{
											data.hourly.relative_humidity_2m[
												realIndex
											]
										}%
									</p>
								</div>
							</div>
						)
					})}
			</div>
		) : (
			<div className="flex items-center justify-center py-12">
				<p className="text-slate-500 animate-pulse">Cargando pronóstico...</p>
			</div>
		)}
	</div>
)
