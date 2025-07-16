import { FC } from "react";
import { User } from "entities/user";
import crown from 'shared/assets/icons/crownSimple.svg'
import verified from 'shared/assets/icons/SealCheck.svg'
import star from 'shared/assets/icons/Star.svg'

import './userProfileData.scss'

interface Props {
    user: User
}

const UserProfileData: FC<Props> = ({user}) => {
    return(
        <div className="userProfileData">
            <img src={user.profileImage} alt="userAvatar" />

            <div className="userProfileData_container">
                <div className="userProfileData_headerGroup">
                    <span>{user.name}</span>
                    {/* <img src={verified} alt="verified" /> */}
                </div>

                {/* <div className="userProfileData_itemData">
                    <div className="userProfileData_itemData_top">
                        <img src={crown} alt="crown" />
                        <span>TOP 3</span>
                    </div>

                    <div className="userProfileData_itemData_reating">
                        <span>{user.participantRating}</span>
                        <img src={star} alt="star" />
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default UserProfileData