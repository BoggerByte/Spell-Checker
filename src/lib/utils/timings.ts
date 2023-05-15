function wait(delay: number): Promise<null> {
	return new Promise((resolve) => {
		setTimeout(resolve, delay)
	})
}

function waitFor(func: () => void, delay: number): Promise<null> {
	func()
	return wait(delay)
}

export { wait, waitFor }
