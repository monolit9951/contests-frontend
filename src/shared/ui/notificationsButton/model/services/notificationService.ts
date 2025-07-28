import { Notification } from "entities/notification";
import instance from "shared/api/api"


export const fetchAllNotifications = async (): Promise<Notification[] | string> => {
    try {
        const token = localStorage.getItem('userToken')
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await instance.get(`notifications`, {headers})

        if (!response.data) {
            throw new Error("No data received")
        }
        
        return response.data
    } catch (error) {
        console.error("Error fetching notifications:", error);
        console.log(error)
        return error
    }
}