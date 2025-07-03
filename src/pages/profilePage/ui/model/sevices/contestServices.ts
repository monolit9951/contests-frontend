import instance from "shared/api/api"

// получение всех контестов связанных с пользователем (БЕЗ ПАГИНАЦИИ, НЕТ ДЖЕНЕРИКА)
export const fetchAllContests = async (userId: string): Promise<any | string> => {
    try {
        const response = await instance.get(`contests/user-all/${userId}`)

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

// получение всех контестов связанных с пользователем (БЕЗ ПАГИНАЦИИ, НЕТ ДЖЕНЕРИКА)
export const fetchParticipatingContests = async (userId: string): Promise<any | string> => {
    try {
        const response = await instance.get(`contests/user-participant/${userId}`)

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

// получение всех контестов связанных с пользователем (БЕЗ ПАГИНАЦИИ, НЕТ ДЖЕНЕРИКА)
export const fetchWinningContests = async (userId: string): Promise<any | string> => {
    try {
        const response = await instance.get(`contests/user-all/${userId}`)

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

// получение всех контестов связанных с пользователем (БЕЗ ПАГИНАЦИИ, НЕТ ДЖЕНЕРИКА)
export const fetchOrganizingContests = async (userId: string): Promise<any | string> => {
    try {
        const response = await instance.get(`contests/user-owned/${userId}`)

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

// ОДНА ФУНКЦИЯ ДЛЯ ВСЕХ КОНТЕСТОВ ПРОФИЛЯ
export const fetchProfileContests = async (extraPath: string, userId: string): Promise<any | string> => {
    try {
        const response = await instance.get(`contests/${extraPath}/${userId}`)

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