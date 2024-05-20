import { FiltersObj } from '../types'

export const getQueryString = (filters: FiltersObj) => {
    const paramsArr = []

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

    if (filters.status) {
        paramsArr.push(`val=status=${filters.status}`)
    }

    if (filters.prizeType) {
        paramsArr.push(`val=prizeType=${filters.prizeType.split(' ')[0]}`)
    }

    if (filters.creators) {
        paramsArr.push(`val=verificationStatus=${filters.creators}`)
    }

    return paramsArr.join('&')
}
