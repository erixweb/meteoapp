import { useState } from "react"

export function MapForecast () {
    const [hour, setHour] = useState(1)
    const date = new Date()
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const folderName = `${year}${month}${day}06`;

    return (
        <div className="flex flex-wrap justify-center w-full max-w-[100vh] mx-auto relative">
            <img src={`https://modeles7.meteociel.fr/modeles/arome/tiles/${folderName}/3/1/3/101-${hour}-0.png`} alt="Weather map part 1" className="w-1/2" />
            <img src={`https://modeles7.meteociel.fr/modeles/arome/tiles/${folderName}/3/2/3/101-${hour}-0.png`} alt="Weather map part 2" className="w-1/2 " />
            
            <div className="w-full absolute bottom-0 left-0 p-4">
                <span className="text-black font-bold text-xl">{hour}</span>
                <input type="range" min={1} max={51} className="w-full" onChange={(e) => setHour(parseInt(e.target.value))}/>
            </div>

        </div>
    )
}