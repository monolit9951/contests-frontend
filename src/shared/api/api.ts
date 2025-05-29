import axios from 'axios'

const baseUrl =
    import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_API_URL
        : 'http://localhost:8080/api'

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default instance