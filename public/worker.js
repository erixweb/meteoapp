onmessage = async (event) => {
	const { code, globalCode, duration } = event.data

	let result

	try {
		result = await eval(`
        (() => {
            const __PERF_START__ = Date.now()
            const __PERF_END__ = Date.now() + ${duration}
            let __PERF_OPS__ = 0
            ${globalCode}

            while (__PERF_END__ > Date.now()) {
                ${code}
                __PERF_OPS__++
            }

            return __PERF_OPS__
})()
        `)
	} catch (err) {
		console.error(err)
		result = 0
	}

	postMessage(result)
}
