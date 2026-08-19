import { Weather } from "../../types"

export const Temperature = ({
	data,
	code,
}: {
	data: Weather | null
	code: any
}) => (
	<div className="text-center flex flex-col items-center justify-center w-full py-4">
		<div className="flex flex-col items-center justify-center gap-2">
			<div className="relative">
				<img
					src={code?.image}
					alt="Weather image"
					className="w-28 h-28 md:w-40 md:h-40 object-contain animate-bounce-slow"
				/>
				<div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full -z-10 w-full h-full"></div>
			</div>
			<h2 className="text-8xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
				{data?.current?.temperature_2m}º
			</h2>
		</div>
		<p className="text-xl md:text-2xl font-medium text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-widest">
			Temperatura Actual
		</p>
	</div>
)
