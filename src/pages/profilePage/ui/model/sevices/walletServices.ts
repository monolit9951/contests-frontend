import instance from "shared/api/api"

// получение баланса пользователя
export const fetchWalletBalance = async ( userId: string): Promise<any | string> => {
    try {
        const response = await instance.get(`wallet/balance?userId=${userId}`)

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

// получение транзакций пользователя
export const fetchWalletTransactions = async ( userId: string): Promise<any | string> => {
    try {
        const response = await instance.get(`wallet/balance?userId=${userId}`)

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