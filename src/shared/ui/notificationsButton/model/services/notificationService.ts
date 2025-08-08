import { Notification } from "entities/notification";
import { PagedRequest } from "entities/request/intex";
import instance from "shared/api/api"


export const fetchAllNotifications = async (): Promise<PagedRequest<Notification> | string> => {
    try {
        const token = localStorage.getItem('userToken')
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await instance.get(`notifications`, {headers})

        if (!response.data) {
            throw new Error("No data received")
        }
        
        return response.data
    } catch (error) {
        return (error as Error).message
    }
}