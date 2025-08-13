import { useEffect, useState } from "react"

// УЛУЧШЕННЫЙ ХУК ДЛЯ ГЕТ ЗАПРОСОВ
// key - для динамического запроса. При изменении параметра, при нужде нового запуска того же запроса нужно менять ключ
// enabled - true, если нужно сделать запрос по первому рендеру, false, если нужно отложить запрос (а затем снова true и поменять key, чтоб запрос выплнить запрос)
// mutationFunc - если с сервера пришли данные, которые необходимо тут же преобразовать (ИСПОЛЬЗУЕТСЯ РЕДКО)
// fetchFunc - функция запроса

interface UseGetRequestInterface<T> {
    enabled: boolean
    key: any
    mutationFunc?: (data: any) => any
    fetchFunc: () => Promise<T>
}

// ОТСУТСТВУЕТ ДЖЕНЕРИК, ПОКА НЕ ПЕРЕДАЁТСЯ 
export const useGetRequest = <T>({enabled, key, fetchFunc, mutationFunc}: UseGetRequestInterface<T>) => {
    const [data, setData] = useState<T | undefined>(undefined)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    // const [error, setError] = useState<Error | null>(null)
    
    useEffect(() => {
        
        if(enabled){
            fetchFunc().then((fetchedData: T) => {

                // если нужно обрабатывать данные
                let mutatedData = fetchedData

                if(mutationFunc){
                    mutatedData = mutationFunc(fetchedData)
                }

                setIsLoaded(true)
                setData(mutatedData)
            })
        }
    }, key)

    return {isLoaded, data}

}