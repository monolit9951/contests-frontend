import { SetURLSearchParams } from 'react-router-dom'

import { FiltersObj } from '../types'

import { getParams } from './getSearchParams'

enum participantsParams {
    '1-1k' = '1&1000',
    '1.1k-10k' = '1001&10000',
    '10.1k-50k' = '10001&50000',
    '50.1k-100k' = '50001&100000',
    '100.1k+' = '10001',
}

export const setParams = (
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams,
    sortDirection: any,
    activeFilters: FiltersObj
) => {
    // const category = useAppSelector(selectCategory)

    const { status, prizeType, prizeRange, participants, creators } =
        activeFilters

    const params = getParams()

    const minPrizeAmount = prizeRange[0]
    const maxPrizeAmount = prizeRange[1]
    const prize = prizeType.split(' ')[0]

    const statusInstruction = () => {
        if (status) {
            if (!params.status || params.status !== status) {
                searchParams.set('status', status)
            }
        } else {
            searchParams.delete('status')
        }
    }
    const prizeTypeInstruction = () => {
        if (prizeType) {
            if (!params.prizeType || params.prizeType !== prizeType) {
                searchParams.set('prizeType', prize)
            }
        } else {
            searchParams.delete('prizeType')
        }
    }
    const prizeRangeInstruction = () => {
        if (minPrizeAmount !== 0) {
            searchParams.set('minPrizeAmount', String(minPrizeAmount))
        } else {
            searchParams.delete('minPrizeAmount')
        }
        if (maxPrizeAmount !== 100000) {
            searchParams.set('maxPrizeAmount', String(maxPrizeAmount))
        } else {
            searchParams.delete('maxPrizeAmount')
        }
    }
    const participantsInstruction = () => {
        if (participants) {
            const [minParticipants, maxParticipants] =
                participantsParams[participants].split('&')

            if (
                !params.minParticipants ||
                params.minParticipants !== minParticipants
            ) {
                searchParams.set('minParticipants', minParticipants)
            }
            if (
                !params.maxParticipants ||
                params.maxParticipants !== maxParticipants
            ) {
                if (maxParticipants) {
                    searchParams.set('maxParticipants', maxParticipants)
                } else {
                    searchParams.delete('maxParticipants')
                }
            }
        } else {
            searchParams.delete('minParticipants')
            searchParams.delete('maxParticipants')
        }
    }
    const creatorsInstruction = () => {
        if (creators) {
            if (!params.creators || params.creators !== creators) {
                searchParams.set('verificationStatus', creators)
            }
        } else {
            searchParams.delete('verificationStatus')
        }
    }

    if (!params.sortDirection || params.sortDirection !== sortDirection) {
        searchParams.set('sortDirection', sortDirection)
    }

    participantsInstruction()

    prizeRangeInstruction()

    statusInstruction()

    prizeTypeInstruction()

    creatorsInstruction()

    // if (!params.category && category) {
    //     searchParams.set('category', category)
    // }

    return setSearchParams(searchParams)
}
