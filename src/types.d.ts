export interface Weather {
	latitude: number
	longitude: number
	generationtime_ms: number
	utc_offset_seconds: number
	timezone: string
	timezone_abbreviation: string
	elevation: number
	hourly_units: HourlyUnits
	hourly: Hourly
	current: any
}

export interface Hourly {
	time: string[]
	temperature_2m: number[]
	apparent_temperature: number[]
	precipitation: number[]
	relative_humidity_2m: number[]
	weather_code: number[]
	cloud_cover: number[]
	wind_speed_10m: number[]
	surface_pressure: number[]
	wind_direction_10m: number[]
}

export interface HourlyUnits {
	time: string
	temperature_2m: string
	apparent_temperature: string
	precipitation: string
	relative_humidity_2m: string
	weather_code: string
	cloud_cover: string
	wind_speed_10m: string
	surface_pressure: string
	wind_direction_10m: string
}

export interface WeatherCodes {
	description: string
	image: string
}
