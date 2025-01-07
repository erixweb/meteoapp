export const formatHour = (hour: number): string =>
	hour < 12 ? `${hour}am` : `${hour}pm`
