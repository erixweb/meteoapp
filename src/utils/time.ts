function formatHour(hour: number, run: string) {
	const RUN_HOUR = parseInt(run)

	const currentDate = new Date()

	currentDate.setUTCHours(RUN_HOUR + hour, 0, 0, 0)

	return currentDate.toLocaleString("es-ES", {
		day: "2-digit",
		month: "long",
		hour: "2-digit",
		minute: "2-digit",
		weekday: "long",
	})
}

export { formatHour }
