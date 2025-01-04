
export default function Code({ children }: { children: string }) {
	return <textarea className="text-black w-full" defaultValue={children}></textarea>
}
