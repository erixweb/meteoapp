import { Weather } from "../../types";

export const Temperature = ({ data, code }: { data: Weather | null, code: any }) => (
	<div className="text-center flex items-center justify-center w-full ">
		<h2 className="text-9xl w-fit relative font-bold from-gray-200 to-gray-500 text-transparent bg-clip-text bg-gradient-to-b max-md:text-8xl ">
			{data?.current?.temperature_2m}º
			<img
				src={code?.image}
				alt="Weather image"
				className="w-[120px] h-[120px] absolute top-14 right-[-50px] m-auto max-md:scale-75"
			/>
			<img
				src={code?.image}
				alt="Weather image"
				className="w-[120px] h-[120px] absolute top-14 right-[-50px] m-auto blur-3xl max-md:scale-75"
			/>
		</h2>
	</div>
)
