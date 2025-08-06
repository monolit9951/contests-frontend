import { FiltersObj } from '../types'


// НОВЫЙ МАССИВ ФИЛЬТЕРС ЛИСТ ВЫГЛЯДИТ ТАК:

export const getQueryString = (filters: FiltersObj) => {


    const statusFilters = filters.filtersList.filter((item) => item.filterName === 'status')
    const prizeTypeFilters = filters.filtersList.filter((item) => item.filterName === 'prizeType')
    const creatorFilters = filters.filtersList.filter((item) => item.filterName === 'creators')
    const paramsArr = []
    
    // console.log(statusFilters)
    // console.log(prizeTypeFilters)
    // console.log(creatorFilters)

    if(statusFilters.length > 0){
        statusFilters.map((item) => paramsArr.push(`status=${item.apiKey}`))
    }

    if(creatorFilters.length > 0){
        creatorFilters.map((item) => 
            paramsArr.push(`creator=${item.apiKey}`)
        )
    }

    if(prizeTypeFilters.length > 0){
        prizeTypeFilters.map((item) => paramsArr.push(`prizeType=${item.apiKey}`))
    }

    if (filters.prizeRange) {
        const minPrizeAmount = filters.prizeRange[0]
        const maxPrizeAmount = filters.prizeRange[1]

        if (minPrizeAmount !== 0) {
            paramsArr.push(`val=minPrizeAmount=${minPrizeAmount}`)
        }
        if (maxPrizeAmount !== 100000) {
            paramsArr.push(`val=maxPrizeAmount=${maxPrizeAmount}`)
        }
    }

    if (filters.coinRange) {
        const minPrizeAmount = filters.coinRange[0]
        const maxPrizeAmount = filters.coinRange[1]

        if (minPrizeAmount !== 0) {
            paramsArr.push(`val=minCoinPrizeAmount=${minPrizeAmount}`)
        }
        if (maxPrizeAmount !== 100000) {
            paramsArr.push(`val=maxCoinPrizeAmount=${maxPrizeAmount}`)
        }
    }

    // console.log(paramsArr.join('&'))

    // if (filters.status) {
    //     paramsArr.push(`val=status=${filters.status}`)
    // }

    // if (filters.prizeType) {
    //     paramsArr.push(`val=prizeType=${filters.prizeType.split(' ')[0]}`)
    // }

    // if (filters.creators) {
    //     paramsArr.push(`val=verificationStatus=${filters.creators}`)
    // }

    // return paramsArr.join('&')
    return paramsArr.join('&')
}
