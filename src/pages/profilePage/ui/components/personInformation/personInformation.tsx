import { FC } from 'react'
import { Link } from 'react-router-dom'
import calendar from 'shared/assets/icons/calendar.svg'
import email from 'shared/assets/icons/email.svg'
import mapMark from 'shared/assets/icons/mapMark.svg'
import pencil from 'shared/assets/icons/pencil.svg'
import profilePerson from 'shared/assets/icons/profilePerson.svg'
import useAxios from 'shared/lib/hooks/useAxios'

import './personInformation.scss'
import { User } from 'entities/user'

// НЕТУ ПОЛУЧЕНИЯ ДАННЫХ
// ЧАСТЬ ДАННЫХ ПОЛУЧАТЬ ПО СЕЛЕКТОРАМ РЕДАКСА

// ТЕСТОВЫЙ ЮЗЕР АЙДИ ДО АВТОРИЗАЦИИ, ВСЕ ПРОПСЫ ПОЧИСТИТ

interface PersonInformationInterface {
    userId: string
}

const PersonInformation: FC <PersonInformationInterface>= ({userId}) =>{

    // нету типизации
    const { data, isLoading, error } = useAxios<User>(`users/${userId}`)

    // console.log(data)

    return(
        <div className="personInformation">
            <div className="personInformation_header">
                <div className="personInformation_header_heading">Personal Information</div>

                <Link to='/profile/settings'><img src={pencil} alt='settings' /></Link>
            </div>

            {!isLoading && data && <div className="personInformation_content">
                <div className="personInformation_logoGroup">
                    <img src={data.profileImage} alt="avatar" />
                </div>

                <div className="personInformation_data">

                    <div className="personInformation_data_item">
                        <div className="personInformation_data_header">
                            <img src={profilePerson} alt="profile" />
                            <div className="personInformation_data_header_heading">Full Name</div>
                        </div>

                        <div className="personInformation_data_content">{data.name}</div>
                    </div>

                    <div className="personInformation_data_item">
                        <div className="personInformation_data_header">
                            <img src={email} alt="profile" />
                            <div className="personInformation_data_header_heading">Email Adress</div>
                        </div>

                        <div className="personInformation_data_content">{data.email}</div>
                    </div>

                    <div className="personInformation_data_item">
                        <div className="personInformation_data_header">
                            <img src={calendar} alt="profile" />
                            <div className="personInformation_data_header_heading">Member Since</div>
                        </div>

                        <div className="personInformation_data_content">{data.createdAt}</div>
                    </div>

                </div>
            </div>}
        </div>
    )
}

export default PersonInformation