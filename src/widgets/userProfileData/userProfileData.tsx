import { FC } from "react";
import crown from 'shared/assets/icons/crownSimple.svg'
import verified from 'shared/assets/icons/SealCheck.svg'
import star from 'shared/assets/icons/Star.svg'
import avatar from 'shared/assets/img/userIMG.jpg'

import './userProfileData.scss'

const UserProfileData: FC = () => {
    return(
        <div className="userProfileData">
            <img src={avatar} alt="userAvatar" />

            <div className="userProfileData_container">
                <div className="userProfileData_headerGroup">
                    <span>Deborah Kertzmann</span>
                    <img src={verified} alt="verified" />
                </div>

                <div className="userProfileData_itemData">
                    <div className="userProfileData_itemData_top">
                        <img src={crown} alt="crown" />
                        <span>TOP 3</span>
                    </div>

                    <div className="userProfileData_itemData_reating">
                        <span>4,5</span>
                        <img src={star} alt="star" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileData