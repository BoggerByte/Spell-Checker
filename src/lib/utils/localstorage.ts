function getFromLocalstorage<T extends object>(key: string): T | null {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) as T : null
}

function setToLocalstorage(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
}

function removeFromLocalstorage(key: string): void {
    localStorage.removeItem(key)
}

export {
    getFromLocalstorage,
    setToLocalstorage,
    removeFromLocalstorage
}
