import { FC, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { User } from "entities/user";

import './userProfileData.scss'

interface Props {
    user: User
}

const UserProfileData: FC<Props> = ({user}) => {

    const [userImgLoaded, setUserImgLoaded] = useState<boolean>(false)

    return(
        <div className="userProfileData">
            {!userImgLoaded && (
                <Skeleton width={44} height={44} borderRadius={50} />
            )}

            <img
                src={user.profileImage ?? ''}
                alt="userAvatar"
                style={{ display: userImgLoaded ? 'block' : 'none' }}
                onLoad={() => setUserImgLoaded(true)}
            />

            <div className="userProfileData_container">
                <div className="userProfileData_headerGroup">
                    <span>{user.name}</span>
                </div>
            </div>
        </div>
    )
}

export default UserProfileData