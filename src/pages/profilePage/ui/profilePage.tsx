import PersonInformation from './components/personInformation/personInformation'
import ProfileContests from './components/profileContests/profileContests'
import ProfileWallet from './components/profileWallet/profileWallet'
import './profilePage.scss'

const ProfilePage = () => {

    // ТЕСТОВЫЙ ЮЗЕР АЙДИ ДО АВТОРИЗАЦИИ, ВСЕ ПРОПСЫ ПОЧИСТИТЬ
    const userId = '68665fe42ee7c1049206af72'

    return (
        <div className="profilePage">
            <div className="profilePage_heading">
                <h2>Personal Dashboard</h2>
                <div className="profilePage_heading_addiional">Manage your profile, wallet and contents</div>
            </div>

            <div className="profilePage_Container">

                <div className="profilePage_leftContainer">
                    <PersonInformation userId = {userId}/>
                    <ProfileWallet userId = {userId}/>
                </div>

                <div className="profilePage_rightContainer">
                    <ProfileContests userId = {userId}/>
                </div>
                
            </div>
        </div>
    )
}

export default ProfilePage