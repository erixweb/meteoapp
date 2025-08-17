import { Weather } from "../../types"
import weatherCodes from "../../weather-codes"

export const HourlyData = ({ data, sliceHours, updateSelectedHour }: { data: Weather | null, sliceHours: number[], updateSelectedHour: (hour: number) => void }) => (
	<div>
		{data ? (
			<div className="flex gap-4 overflow-x-scroll forecast py-2 dark:text-white text-black">
				{data.hourly.time
					.slice(sliceHours[0], sliceHours[1])
					.map((time, idx) => {
						const realIndex = sliceHours[0] + idx
						return (
							<div
								key={realIndex}
								className=" dark:bg-gray-700 bg-gray-200 p-4 rounded-[16px] shadow-md min-w-26 w-full"
								onClick={() => {
									updateSelectedHour(realIndex)
								}}
							>
								<h3 className="text-lg font-semibold text-center">
									{new Date(time).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</h3>
								<p className="flex items-center justify-center py-2">
									<img
										src={
											weatherCodes()[
												data?.hourly
													?.weather_code[realIndex]
											].day.image
										}
										className="w-16 h-16"
									/>
								</p>
								<p className="text-center text-xl text-indigo-600 font-bold">
									{
										data.hourly.temperature_2m[
											realIndex
										]
									}
									ºC
								</p>
								<p className="text-center">
									{
										data.hourly.relative_humidity_2m[
											realIndex
										]
									}
									%
								</p>
								<p className="text-center">
									{
										data.hourly.wind_speed_10m[
											realIndex
										]
									}{" "}
									km/h
								</p>
							</div>
						)
					})}
			</div>
		) : (
			<p>Loading forecast data...</p>
		)}
	</div>
)
