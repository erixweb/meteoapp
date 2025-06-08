export default function Option({
    value,
    selected,
    children,
    onChange,
}: {
    value: string
    selected?: boolean,
    children: React.ReactNode
    onChange?: (value: string) => void
}) {
    return (
        <option
            value={value}
            className={`text-xl bg-gray-700 text-white border-2 border-gray-500 outline-none hover:bg-gray-400 focus:bg-gray-400 checked:font-bold ${
                selected ? "bg-gray-800" : ""
            }`}
            onClick={() => onChange && onChange(value)}
        >
            {children}
        </option>
    )
}