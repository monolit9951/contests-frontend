import { FC, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { clearUser } from "widgets/registrationModal/model/slice/userSlice"


const LogoutPage: FC = () =>{

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        // на всякий случай
        if(location.pathname.includes('/logout')){
            dispatch(clearUser)
            localStorage.removeItem('userToken')
            navigate('/')
        }
    }, [location, navigate])    

    return <div>SOME PAGE</div>
}

export default LogoutPage