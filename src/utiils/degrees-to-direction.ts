export function degreesToDirection(degrees: number | undefined): string {
	if (!degrees) return "0º"

	const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
	const index = Math.round(degrees / 45) % 8
	return directions[index]
}
