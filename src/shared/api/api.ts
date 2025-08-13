import axios from 'axios'

// ENV
// const baseUrl = 'http://localhost:8080/api'
const realUrl = 'https://darebay.com/api'

const instance = axios.create({
    baseURL: realUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default instance
