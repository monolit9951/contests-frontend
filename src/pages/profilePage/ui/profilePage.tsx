import { FC } from 'react'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import PersonInformation from './components/personInformation/personInformation'
import ProfileContests from './components/profileContests/profileContests'
import ProfileStatistics from './components/profileStatistics/profileStatistics'
import ProfileWallet from './components/profileWallet/profileWallet'

import './profilePage.scss'



const ProfilePage: FC = () => {

    const {id} = useParams()
    
    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    

    return (
        <div className="profilePage">

            {/* HELMET INSIDE PERSONAL INFORMATION */}

            <div className="profilePage_inner">
                <div className="profilePage_heading">
                    <h2>Personal Dashboard</h2>
                    <div className="profilePage_heading_addiional">Manage your profile, wallet and contents</div>
                </div>

                <div className="profilePage_container">

                    <div className="profilePage_leftContainer">
                        <PersonInformation userId = {id ?? user.userId}/>
                        {!id && <ProfileWallet userId = {user.userId}/>}
                    </div>

                    <div className="profilePage_rightContainer">
                        <ProfileContests userId = {id ?? user.userId}/>
                        <ProfileStatistics userId = {id ?? user.userId}/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ProfilePage