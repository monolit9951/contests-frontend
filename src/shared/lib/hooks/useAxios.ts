import { useEffect, useState } from 'react'
import instance from 'shared/api/api'

interface AxiosResponse<T> {
    data: T
}

const useAxios = <T>(
    path: string
): { data: T | null; isLoading: boolean; error: Error | null } => {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const token = localStorage.getItem('userToken')
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<T> = await instance.get<T>(
                    `${path}`, {headers}
                )

                setData(response.data)
            } catch (err) {
                setError(err as Error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [path])

    return { data, isLoading, error }
}

export default useAxios
