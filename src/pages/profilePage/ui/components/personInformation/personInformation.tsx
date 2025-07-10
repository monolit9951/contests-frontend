import { FC } from 'react'
import { Link } from 'react-router-dom'
import calendar from 'shared/assets/icons/calendar.svg'
import email from 'shared/assets/icons/email.svg'
import mapMark from 'shared/assets/icons/mapMark.svg'
import pencil from 'shared/assets/icons/pencil.svg'
import profilePerson from 'shared/assets/icons/profilePerson.svg'
import useAxios from 'shared/lib/hooks/useAxios'

import './personInformation.scss'

// НЕТУ ПОЛУЧЕНИЯ ДАННЫХ
// ЧАСТЬ ДАННЫХ ПОЛУЧАТЬ ПО СЕЛЕКТОРАМ РЕДАКСА

// ТЕСТОВЫЙ ЮЗЕР АЙДИ ДО АВТОРИЗАЦИИ, ВСЕ ПРОПСЫ ПОЧИСТИТ

interface PersonInformationInterface {
    userId: string
}

const PersonInformation: FC <PersonInformationInterface>= ({userId}) =>{

    const { data, isLoading, error } = useAxios<any>(`users/${userId}`)

    return(
        <div className="personInformation">
            <div className="personInformation_header">
                <div className="personInformation_header_heading">Personal Information</div>
                <Link to='/profile/settings'>
                    <img src={pencil} alt="pencil" />
                </Link>
            </div>

            <div className="personInformation_logoGroup">
                <div className="personInformation_logoGroup">
                    {!isLoading && !error && <img src={data.profileImage} alt="userImg" />}
                </div>
            </div>

            <div className="personInformation_infoGroup">
                <div className="personInformation_infoGroup_info">
                    <div className="personInformation_infoGroup_info_heading">
                        <img src={profilePerson} alt="type" />
                        <span>Full Name</span>
                    </div>

                    {!isLoading && !error && <div className="personInformation_infoGroup_info_data">{data.name}</div>}
                </div>

                <div className="personInformation_infoGroup_info">
                    <div className="personInformation_infoGroup_info_heading">
                        <img src={email} alt="type" />
                        <span>Email Address</span>
                    </div>

                    {!isLoading && !error && <div className="personInformation_infoGroup_info_data">NO EMAIL</div>}
                </div>

                <div className="personInformation_infoGroup_info">
                    <div className="personInformation_infoGroup_info_heading">
                        <img src={mapMark} alt="type" />
                        <span>Country</span>
                    </div>

                    {!isLoading && !error && <div className="personInformation_infoGroup_info_data">NO COUNTRY</div>}
                </div>

                <div className="personInformation_infoGroup_info">
                    <div className="personInformation_infoGroup_info_heading">
                        <img src={calendar} alt="type" />
                        <span>Member Since</span>
                    </div>

                    {!isLoading && !error && <div className="personInformation_infoGroup_info_data">{data.createdAt}</div>}
                </div>
            </div>            
        </div>
    )
}

export default PersonInformation