import { useState } from "react"
import Code from "./code"

export default function LeftAside() {
    const [globalCode, setGlobalCode] = useState("const users = [...Array(100000).keys()]")
	const [cases, setCases] = useState(["users.find(x => x == 100)", "users.find(x => x == 200)", "users.find(x => x == 400)", "users.find(x => x == 800)"])
    const worker = new Worker("worker.js")
    const duration = 1000

    
    
    function runCases() {

        
        cases.forEach(async (testCase) => {

            worker.postMessage({ code: testCase, globalCode, duration })
            new Promise((resolve) => {
                worker.onmessage = event => {
                    console.log(event.data)
                    resolve(event.data)
                }
            })
        })

        return null
    }
	return (
		<aside className=" text-white w-[60vw] bg-slate-800 min-h-[100vh] p-9">
			<section>
            <div className="flex w-full py-[20px] items-center">
					<h3 className="text-xl font-bold text-gray-400 align-middle">
						Global
					</h3>
					<div className="mr-0">
						<button className="p-2 font-bold rounded-[15px] border-[4px] border-blue-500" onClick={() => runCases()}>
							Run cases
						</button>
					</div>
				</div>
				<Code>{globalCode}</Code>
			</section>
			<section>
				<div className="flex w-full py-[20px] items-center">
					<h3 className="text-xl font-bold text-gray-400 align-middle">
						Test Cases
					</h3>
					<div className="mr-0">
						<button className="p-2 font-bold rounded-[15px] border-[4px] border-blue-500" onClick={() => setCases((current) => [...current, "e"])} >
							Add case
						</button>
					</div>
				</div>
				<div>
					{cases.map((testCase, i) => (
                        <Code key={i}>{testCase}</Code>
                    ))}
				</div>
			</section>
		</aside>
	)
}
