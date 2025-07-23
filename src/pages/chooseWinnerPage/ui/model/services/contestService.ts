import instance from "shared/api/api"

export const getRuledWorks = async(contestId: string, page: number) => {
    try {
        const token = localStorage.getItem('userToken')
        const response = await instance.get(`works/byContestId/${contestId}?page=${page}&pageSize=${1}`, {headers: {Authorization: `Bearer ${token}`}})

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

export const getPossibleWinners = async(contestId: string) => {
    try {
        const token = localStorage.getItem('userToken')
        const response = await instance.get(`contests/${contestId}/possible-winners`, {headers: {Authorization: `Bearer ${token}`}})

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