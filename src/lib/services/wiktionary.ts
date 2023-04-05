import axios from "axios";


const BASE_URL: string = 'https://ru.wiktionary.org'
const API_URL: string = BASE_URL + '/w/api.php'


async function checkIfExists(word: string): Promise<boolean> {
    let url = new URL(API_URL)
    url.searchParams.append('action', 'query')
    url.searchParams.append('format', 'json')
    url.searchParams.append('titles', word)

    const response = await fetch(url, { method: "GET" })
    const data = await response.json()

    return !("-1" in data.query.pages)
}


async function getPage(word: string): Promise<any> {
    return axios.get(BASE_URL + '/w/index.php', {
        params: {
            printable: 'yes',
            title: word
        }
    }).then(response => {
        console.log(response.data)
        return response.data
    })
}


export {
    checkIfExists,
    getPage
}
