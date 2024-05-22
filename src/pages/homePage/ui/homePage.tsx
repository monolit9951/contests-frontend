import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './homePage.scss'

export const HomePage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/feed')
    }, [])

    return <div>Homepage</div>
}
