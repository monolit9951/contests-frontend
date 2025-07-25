import { Notification } from "entities/notification";
import instance from "shared/api/api"

const token = localStorage.getItem('userToken')

const headers = token ? { Authorization: `Bearer ${token}` } : {};

export const fetchAllContests = async (): Promise<Notification[] | string> => {
    try {
        const response = await instance.get(`notifications`, {headers})

        if (!response.data) {
            throw new Error("No data received")
        }
        
        return response.data
    } catch (error) {
        console.error("Error fetching contests:", error);
        return error
    }
}