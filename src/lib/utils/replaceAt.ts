export default function replaceAt(str: string, idx: number, val: string) {
    return str.substring(0, idx) + val + str.substring(idx + 1)
}
