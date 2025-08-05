import instance from "shared/api/api"

import { Transaction, WalletBalance } from "../../components/profileWallet/profileWallet"

// получение баланса пользователя
export const fetchWalletBalance = async ( userId: string): Promise<WalletBalance | string> => {
    try {
        const response = await instance.get(`users/balance/${userId}`)

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
export const fetchWalletTransactions = async ( userId: string): Promise<Transaction[] | string> => {
    try {
        const response = await instance.get(`users/transactions/${userId}`)

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