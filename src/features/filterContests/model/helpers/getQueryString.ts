export const getQueryString = () => {
    const paramsArr = []

    const params = window.location.search
    const searchParams = new URLSearchParams(params)

    for (const [key, value] of searchParams.entries()) {
        paramsArr.push(`val=${key}=${value}`)
    }

    return paramsArr.slice(1).join('&')
}
