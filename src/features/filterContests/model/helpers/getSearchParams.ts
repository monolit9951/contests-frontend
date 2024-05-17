export const getParams = () => {
    const params = window.location.search
    const searchParams = new URLSearchParams(params)

    const sortDirection = searchParams.get('sortDirection')
    const minParticipants = searchParams.get('minParticipants')
    const maxParticipants = searchParams.get('maxParticipants')
    const minPrizeAmount = searchParams.get('minPrizeAmount')
    const maxPrizeAmount = searchParams.get('maxPrizeAmount')
    const status = searchParams.get('status')
    const prizeType = searchParams.get('prizeType')
    const creators = searchParams.get('verificationStatus')
    const category = searchParams.get('category')

    return {
        sortDirection,
        status,
        prizeType,
        minPrizeAmount,
        maxPrizeAmount,
        minParticipants,
        maxParticipants,
        creators,
        category,
    }
}
