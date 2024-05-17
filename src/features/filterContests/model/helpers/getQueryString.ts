import { FiltersObj } from '../types'

enum participantsParams {
    '1-1k' = '1&1000',
    '1.1k-10k' = '1001&10000',
    '10.1k-50k' = '10001&50000',
    '50.1k-100k' = '50001&100000',
    '100.1k+' = '10001',
}

export const getQueryString = (filters: FiltersObj) => {
    const paramsArr = []

    if (filters.participants) {
        const value = filters.participants as keyof typeof participantsParams
        const [minParticipants, maxParticipants] =
            participantsParams[value].split('&')

        paramsArr.push(`val=minParticipants=${minParticipants}`)
        if (maxParticipants) {
            paramsArr.push(`val=maxParticipants=${maxParticipants}`)
        }
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

    if (filters.status) {
        paramsArr.push(`val=status=${filters.status}`)
    }

    if (filters.prizeType) {
        paramsArr.push(`val=prizeType=${filters.prizeType.split(' ')[0]}`)
    }

    if (filters.creators) {
        paramsArr.push(`val=verificationStatus=${filters.creators}`)
    }

    // if (filters.category) {
    //     paramsArr.push(`val=category=${filters.category}`)
    // }

    return paramsArr.join('&')
}
