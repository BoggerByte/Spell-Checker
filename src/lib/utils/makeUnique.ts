export default function makeUnique(name: string): string {
	const uniqueString = (Math.random() + 1).toString(36).substring(7)
	return `${name}-${uniqueString}`
}
