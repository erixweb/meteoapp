export const handleWheelScroll = (event: WheelEvent) => {
	event.preventDefault()
	const forecast = document.querySelector(".forecast") as HTMLElement | null
	if (forecast) {
		forecast.scrollLeft += event.deltaY
	}
}
