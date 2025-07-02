import PersonInformation from './components/personInformation/personInformation'
import ProfileContests from './components/profileContests/profileContests'
import ProfileWallet from './components/profileWallet/profileWallet'
import './profilePage.scss'

const ProfilePage = () => {

    // ТЕСТОВЫЙ ЮЗЕР АЙДИ ДО АВТОРИЗАЦИИ, ВСЕ ПРОПСЫ ПОЧИСТИТЬ
    const userId = '68650e0c6ac63a470aef466d'

    return (
        <div className="profilePage">
            <div className="profilePage_heading">
                <h2>Personal Dashboard</h2>
                <div className="profilePage_heading_addiional">Manage your profile, wallet and contents</div>
            </div>

            <div className="profilePage_Container">

                <div className="profilePage_leftContainer">
                    <PersonInformation />
                    <ProfileWallet />
                </div>

                <div className="profilePage_rightContainer">
                    <ProfileContests />
                </div>
                
            </div>
        </div>
    )
}

export default ProfilePage