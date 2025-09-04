import instance from "shared/api/api"


export const updateUserMainInfo = async (data: any) => {
    const token = localStorage.getItem('userToken')
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try{
        await instance.put('/users', data, {headers})
    } catch(error){
        console.log(error)
    }
}

export const updateUserPasswords = async (data: any) => {
    const token = localStorage.getItem('userToken')
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try{
        await instance.put('/users/change-password', data, {headers})
    } catch(error){
        throw error
    }
}