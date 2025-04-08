export const formatHour = (hour: number): string => {
	const displayHour =
		hour < 12 || hour > 23 ? `${hour % 12}am` : `${hour % 12}pm`

	return hour % 12 ? displayHour : "12am"
}
