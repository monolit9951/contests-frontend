import { FC } from "react";
import { User } from "entities/user";

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
                </div>
            </div>
        </div>
    )
}

export default UserProfileData