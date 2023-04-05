export default function (cb: (file: File) => void) {
    const input = document.createElement('input')
    input.type = 'file'

    input.onchange = (e) => {
        if (e.target.files) cb(e.target.files[0])
    }

    input.click()
}
