import instance from "shared/api/api"

const token = localStorage.getItem('userToken')
const headers = token ? { Authorization: `Bearer ${token}` } : {};

export const getWorkById = async(workId: string) => {
    try {
        const response = await instance.get(`works/${workId}`, {headers})

        if (!response.data) {
            throw new Error("No data received")
        }

        return response.data
    } catch (error) {
        if (error instanceof Error) {
            return `Request error: ${error.message}`
        }

        return "Unknown request error"
    }
}