export default function wait(delay: number, func?: () => void): Promise<null> {
	return new Promise((resolve) => {
		func && func()
		setTimeout(resolve, delay)
	})
}
