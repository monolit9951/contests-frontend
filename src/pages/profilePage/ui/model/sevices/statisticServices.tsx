import instance from "shared/api/api"

// слишком много статистики чтоб писать ей интерфейс, там всё типа number
export const fetchUserStatistic = async (userId: string): Promise<any | string> => {
    try {
        const token = localStorage.getItem('userToken')
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await instance.get(`users/statistics/${userId}`, {headers})

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