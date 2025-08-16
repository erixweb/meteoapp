import {  useState, useEffect } from "react"

export function useLocalStorage(key: string, defaultValue: string) {
    return useStorage(key, defaultValue, window.localStorage)
}

function useStorage(key: string, defaultValue: any, storageObject: Storage) {
    const [value, setValue] = useState(() => {
        const storageValue = storageObject.getItem(key)
        if (storageValue != null) return storageValue

        return defaultValue
    })

    useEffect(() => {
        storageObject.setItem(key, value)
    }, [value])

    return [value, setValue]
}