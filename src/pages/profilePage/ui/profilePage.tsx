import PersonInformation from './components/personInformation/personInformation'
import ProfileWallet from './components/profileWallet/profileWallet'
import './profilePage.scss'

const ProfilePage = () => {
    return (
        <div className="profilePage">
            <div className="profilePage_heading">
                <h2>Personal Dashboard</h2>
                <div className="profilePage_heading_addiional">Manage your profile, wallet and contents</div>
            </div>

            <div className="profilePage_leftContainer">
                <PersonInformation />
                <ProfileWallet />
            </div>
        </div>
    )
}

export default ProfilePage