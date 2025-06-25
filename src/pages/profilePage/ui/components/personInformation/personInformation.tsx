import { FC } from 'react'
import './personInformation.scss'
import { Link } from 'react-router-dom'
import pencil from 'shared/assets/icons/pencil.svg'
import userImg from 'shared/assets/img/userIMG.jpg'
import profilePerson from 'shared/assets/icons/profilePerson.svg'
import calendar from 'shared/assets/icons/calendar.svg'
import mapMark from 'shared/assets/icons/mapMark.svg'
import email from 'shared/assets/icons/email.svg'

// НЕТУ ПОЛУЧЕНИЯ ДАННЫХ
// ЧАСТЬ ДАННЫХ ПОЛУЧАТЬ ПО СЕЛЕКТОРАМ РЕДАКСА

const PersonInformation: FC = () =>{
    return(
        <div className="personInformation">
            <div className="personInformation_header">
                <div className="personInformation_header_heading">Personal Information</div>
                <Link to='/settings'>
                    <img src={pencil} alt="pencil" />
                </Link>
            </div>

            <div className="personInformation_logoGroup">
                <div className="personInformation_logoGroup">
                    <img src={userImg} alt="userImg" />
                </div>
            </div>

            <div className="personInformation_infoGroup">
                <div className="personInformation_infoGroup_info">
                    <div className="personInformation_infoGroup_info_heading">
                        <img src={profilePerson} alt="type" />
                        <span>Full Name</span>
                    </div>

                    <div className="personInformation_infoGroup_info_data">Deborah Kertzmann</div>
                </div>

                <div className="personInformation_infoGroup_info">
                    <div className="personInformation_infoGroup_info_heading">
                        <img src={email} alt="type" />
                        <span>Email Address</span>
                    </div>

                    <div className="personInformation_infoGroup_info_data">Deborahkertzmann@gmail.com</div>
                </div>

                <div className="personInformation_infoGroup_info">
                    <div className="personInformation_infoGroup_info_heading">
                        <img src={mapMark} alt="type" />
                        <span>Country</span>
                    </div>

                    <div className="personInformation_infoGroup_info_data">United State</div>
                </div>

                <div className="personInformation_infoGroup_info">
                    <div className="personInformation_infoGroup_info_heading">
                        <img src={calendar} alt="type" />
                        <span>Member Since</span>
                    </div>

                    <div className="personInformation_infoGroup_info_data">01/09/1939</div>
                </div>
            </div>            
        </div>
    )
}

export default PersonInformation