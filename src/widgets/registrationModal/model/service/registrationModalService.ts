import instance from "shared/api/api"

export const userLogin = async() => {
    return('login')
}


export const userRegistration = async() => {
    return('login')
}

export const userByToken = async(token: string) => {
    try{
        const response = await instance.get('users/info', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return (response.data)
    } catch (error){
        if (error instanceof Error) {
            return `Request error: ${error.message}`
        }

        return "Unknown request error"
    }
}