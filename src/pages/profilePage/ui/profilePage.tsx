import { TypedUseSelectorHook, useSelector } from 'react-redux'
import PersonInformation from './components/personInformation/personInformation'
import ProfileContests from './components/profileContests/profileContests'
import ProfileWallet from './components/profileWallet/profileWallet'

import './profilePage.scss'

const ProfilePage = () => {



    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    // ТЕСТОВЫЙ ЮЗЕР АЙДИ ДО АВТОРИЗАЦИИ, ВСЕ ПРОПСЫ ПОЧИСТИТЬ

    return (
        <div className="profilePage">
            <div className="profilePage_heading">
                <h2>Personal Dashboard</h2>
                <div className="profilePage_heading_addiional">Manage your profile, wallet and contents</div>
            </div>

            <div className="profilePage_Container">

                <div className="profilePage_leftContainer">
                    <PersonInformation userId = {user.userId}/>
                    <ProfileWallet userId = {user.userId}/>
                </div>

                <div className="profilePage_rightContainer">
                    <ProfileContests userId = {user.userId}/>
                </div>
                
            </div>
        </div>
    )
}

export default ProfilePage