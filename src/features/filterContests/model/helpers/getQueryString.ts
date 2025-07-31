import { FiltersObj } from '../types'


// НОВЫЙ МАССИВ ФИЛЬТЕРС ЛИСТ ВЫГЛЯДИТ ТАК:
// 0: {filterName: 'status', name: 'Active'}
// 1: {filterName: 'status', name: 'Finished'}
// 2: {filterName: 'status', name: 'Upcoming'}
// 3: {filterName: 'status', name: 'Choise winner'}
// 4: {filterName: 'prizeType', name: 'Money prize'}
// 5: {filterName: 'prizeType', name: 'Coins prize'}
// 6: {filterName: 'creators', name: 'Blogger'}
// 7: {filterName: 'creators', name: 'Store'}
// 8: {filterName: 'creators', name: 'Company'}
// 9: {filterName: 'creators', name: 'User'}

export const getQueryString = (filters: FiltersObj) => {


    const statusFilters = filters.filtersList.filter((item) => item.filterName === 'status')
    const prizeTypeFilters = filters.filtersList.filter((item) => item.filterName === 'prizeType')
    const creatorFilters = filters.filtersList.filter((item) => item.filterName === 'creators')
    const paramsArr = []

    console.log(filters.filtersList)
    console.log(filters.prizeRange)
    // console.log(statusFilters)
    // console.log(prizeTypeFilters)
    // console.log(creatorFilters)

    if(statusFilters.length > 0){
        statusFilters.map((item) => paramsArr.push(`status=${item.name}`))
    }

    if(prizeTypeFilters.length > 0){
        prizeTypeFilters.map((item) => paramsArr.push(`prizeType=${item.name}`))
    }

    if(prizeTypeFilters.length > 0){
        creatorFilters.map((item) => paramsArr.push(`creators=${item.name}`))
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
