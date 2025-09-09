import instance from "shared/api/api"

export const getRuledWorks = async(contestId: string, page: number, pageSize: number) => {
    try {
        const token = localStorage.getItem('userToken')
        const response = await instance.get(`works/byContestId/${contestId}?page=${page}&pageSize=${pageSize}`, {headers: {Authorization: `Bearer ${token}`}})

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

export const getPossibleWinners = async(contestId: string, page: number, pageSize: number) => {
    try {
        const token = localStorage.getItem('userToken')
        const response = await instance.get(`winners/possible/${contestId}?page=${page}&pageSize=${pageSize}`, {headers: {Authorization: `Bearer ${token}`}})

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