export default function LeftAside() {
	const date = new Date()
	return (
		<div className="h-[100vh] mt-0 p-9 w-full">
			<h2 className="text-4xl font-bold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text">Badalona</h2>
			<time className="text-gray-300 italic">{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</time>

			<div className="text-center w-full my-[40px]">
				<img src="icons/day-clear.png" alt="" className="w-[144px] h-[144px]" />

				<data className="text-5xl">10<span className="text-gray-500">ºC</span></data>

				<h4 className="text-gray-400 my-[20px] text-2xl font-normal">Despejado</h4>

				<div className="w-full bg-slate-800 rounded-[12px] flex p-4">
					<div>Viento</div>
					<hr className="border-[1.5px] border-gray-400 h-auto"/>
					<div>Humedad</div>
					<hr className="border-[1.5px] border-gray-400 h-auto"/>
					<div>Lluvia</div>
				</div>
			</div>
		</div>
	)
}