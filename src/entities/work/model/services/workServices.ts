import instance from "shared/api/api"

export const getWorkById = async(workId: string) => {
    try {
        const token = localStorage.getItem('userToken')
        const response = await instance.get(`works/${workId}`, {headers: {Authorization: `Bearer ${token}`}})

        if (!response.data) {
            throw new Error("No data received")
        }

        console.log(response.data)

        return response.data
    } catch (error) {
        if (error instanceof Error) {
            return `Request error: ${error.message}`
        }

        return "Unknown request error"
    }
}