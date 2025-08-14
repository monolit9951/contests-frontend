import { PagedRequest } from "entities/request/intex"
import instance from "shared/api/api"

import { Transaction } from "../../components/profileWallet/profileWallet"

export interface WalletBalance {
    balance: number,
    bonusBalance: number,
    updatedAt: string,
    userId: string,
    walletId: string
}

const token = localStorage.getItem('userToken')
const headers = token ? { Authorization: `Bearer ${token}` } : {};

// получение баланса пользователя
export const fetchWalletBalance = async ( userId: string): Promise<WalletBalance | string> => {
    try {
        const response = await instance.get(`users/balance/${userId}`, {headers})

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
export const fetchWalletTransactions = async (userId: string, page: number, pageSize: number): Promise<PagedRequest<Transaction> | string> => {
    try {
        const response = await instance.get(`users/transactions/${userId}?page=${page}&pageSize=${pageSize}`, {headers})

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