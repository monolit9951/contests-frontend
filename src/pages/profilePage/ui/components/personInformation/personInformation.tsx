import { FC } from 'react'
import { Helmet } from "react-helmet";
import { Link, useParams } from 'react-router-dom'
import { User } from 'entities/user'
import moment from 'moment'
import calendar from 'shared/assets/icons/calendar.svg'
import email from 'shared/assets/icons/email.svg'
// import mapMark from 'shared/assets/icons/mapMark.svg'
// import pencil from 'shared/assets/icons/pencil.svg'
import profilePerson from 'shared/assets/icons/profilePerson.svg'
import useAxios from 'shared/lib/hooks/useAxios'

import './personInformation.scss'

interface PersonInformationInterface {
    userId: string
}

const PersonInformation: FC <PersonInformationInterface>= ({userId}) =>{

    const { data, isLoading } = useAxios<User>(`users/${userId}`)

    const {id} = useParams()

    return(
        <div className="personInformation">

            <Helmet>
                <title>DareBay | Profile | {!isLoading && data? data.name : 'Loading...'}</title>
                <meta property="og:title" content={!isLoading && data? data.name : 'Profile page'} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta name="description"  content={!isLoading && data? data.name?.slice(0, 160) : 'Profile page'} />
                <meta property="og:description" content={!isLoading && data? data.name?.slice(0, 160) : 'Profile page'} />
            </Helmet>

            <div className="personInformation_header">
                <div className="personInformation_header_heading">Personal Information</div>

                {!id && <Link to='/profile/settings'>Edit</Link>}
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

                        <div className="personInformation_data_content">{ moment.utc(data.createdAt).local().format("YYYY.MM.DD")}</div>
                    </div>

                </div>
            </div>}

            <div className="personInformation_bio">
                <div className="personInformation_bio_heading">About me</div>

                <div className="personInformation_bio_text">
                    This section is still under construction. More information about my activities, 
                    experience, goals and interests will be available soon.I am working on presenting 
                    myself as honestly and openly as possible, so please be patient:An 
                    update will be coming soon — thanks for stopping by!
                </div>
            </div>
        </div>
    )
}

export default PersonInformation