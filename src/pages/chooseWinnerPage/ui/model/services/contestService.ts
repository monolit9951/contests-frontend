import instance from "shared/api/api"

export const getRuledWorks = async(contestId: string) => {
    try {
        console.log(contestId)
        const token = localStorage.getItem('userToken')
        const response = await instance.get(`works/byContestId/${contestId}`, {headers: {Authorization: `Bearer ${token}`}})

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
